#!/usr/bin/env python3
"""Build a privacy-safe Search Console inventory for every sitemap URL."""

from __future__ import annotations

import argparse
import csv
import datetime as dt
import os
import time
import xml.etree.ElementTree as ET
from collections import Counter
from pathlib import Path
from urllib.parse import quote, urlsplit

import requests
from google.auth.transport.requests import AuthorizedSession, Request
from google.oauth2 import service_account

from gsc_client import DATA_LAG_DAYS, DEFAULT_KEY, DEFAULT_SITE


NEUTRAL_USER_AGENT = (
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) "
    "AppleWebKit/537.36 (KHTML, like Gecko) "
    "Chrome/140.0.0.0 Safari/537.36"
)
SCOPES = ["https://www.googleapis.com/auth/webmasters.readonly"]


def authorized_session(key_path: str) -> AuthorizedSession:
    base = requests.Session()
    base.headers.update({"User-Agent": NEUTRAL_USER_AGENT})
    credentials = service_account.Credentials.from_service_account_file(
        key_path, scopes=SCOPES
    )
    session = AuthorizedSession(credentials, auth_request=Request(session=base))
    session.headers.update({"User-Agent": NEUTRAL_USER_AGENT})
    return session


def comparable_host(value: str) -> str:
    return (
        value.replace("sc-domain:", "")
        .replace("https://", "")
        .replace("http://", "")
        .strip("/")
        .removeprefix("www.")
        .lower()
    )


def resolve_property(session: AuthorizedSession) -> str:
    response = session.get(
        "https://www.googleapis.com/webmasters/v3/sites", timeout=30
    )
    response.raise_for_status()
    wanted = comparable_host(DEFAULT_SITE)
    for entry in response.json().get("siteEntry", []):
        candidate = entry.get("siteUrl", "")
        if comparable_host(candidate) == wanted:
            return candidate
    raise RuntimeError("The configured site is not available to this account.")


def sitemap_rows(session: AuthorizedSession) -> list[dict[str, str]]:
    response = session.get(f"{DEFAULT_SITE.rstrip('/')}/sitemap.xml", timeout=60)
    response.raise_for_status()
    root = ET.fromstring(response.content)
    namespace = {"sm": "http://www.sitemaps.org/schemas/sitemap/0.9"}
    rows: list[dict[str, str]] = []
    for node in root.findall("sm:url", namespace):
        location = node.findtext("sm:loc", default="", namespaces=namespace)
        last_modified = node.findtext("sm:lastmod", default="", namespaces=namespace)
        if location:
            rows.append({"url": location, "last_modified": last_modified})
    return rows


def performance_rows(
    session: AuthorizedSession, site: str, start: dt.date, end: dt.date
) -> dict[str, dict[str, float]]:
    endpoint = (
        "https://www.googleapis.com/webmasters/v3/sites/"
        f"{quote(site, safe='')}/searchAnalytics/query"
    )
    response = session.post(
        endpoint,
        json={
            "startDate": start.isoformat(),
            "endDate": end.isoformat(),
            "dimensions": ["page"],
            "rowLimit": 25000,
        },
        timeout=60,
    )
    response.raise_for_status()
    return {
        row["keys"][0]: {
            "clicks": row.get("clicks", 0),
            "impressions": row.get("impressions", 0),
            "ctr": row.get("ctr", 0),
            "position": row.get("position", 0),
        }
        for row in response.json().get("rows", [])
    }


def inspect_url(
    session: AuthorizedSession, site: str, url: str
) -> dict[str, str]:
    response = session.post(
        "https://searchconsole.googleapis.com/v1/urlInspection/index:inspect",
        json={"inspectionUrl": url, "siteUrl": site, "languageCode": "en-US"},
        timeout=60,
    )
    response.raise_for_status()
    return response.json().get("inspectionResult", {}).get("indexStatusResult", {})


def canonical_path(value: str, inspected_url: str) -> str:
    if not value:
        return ""
    parsed = urlsplit(value)
    inspected = urlsplit(inspected_url)
    if comparable_host(parsed.netloc) != comparable_host(inspected.netloc):
        return "external"
    return parsed.path or "/"


def decision_for(verdict: str, coverage: str) -> tuple[str, str]:
    combined = f"{verdict} {coverage}".lower()
    if verdict == "PASS":
        return "keep", "Indexed canonical URL"
    if "blocked by robots" in combined:
        return "unblock_or_remove", "Blocked by robots"
    if "not found" in combined or "soft 404" in combined:
        return "remove_or_redirect", "Missing or soft-404 URL"
    if "noindex" in combined:
        return "validate_exclusion", "Excluded by noindex"
    if "duplicate" in combined or "alternate page" in combined:
        return "consolidate", "Duplicate or alternate canonical"
    if "crawled" in combined and "not indexed" in combined:
        return "improve_or_consolidate", "Crawled but not indexed"
    if "discovered" in combined and "not indexed" in combined:
        return "strengthen_discovery", "Discovered but not indexed"
    return "investigate", coverage or verdict or "No inspection verdict"


def parse_args() -> argparse.Namespace:
    today = dt.date.today()
    parser = argparse.ArgumentParser()
    parser.add_argument("--key", default=os.environ.get("GSC_SA_KEY", DEFAULT_KEY))
    parser.add_argument(
        "--output",
        default=f"seo-audit/index-inventory-{today.isoformat()}.csv",
    )
    parser.add_argument("--days", type=int, default=28)
    parser.add_argument("--delay", type=float, default=0.05)
    return parser.parse_args()


def main() -> None:
    args = parse_args()
    key_path = Path(args.key)
    if not key_path.is_file():
        raise SystemExit("Set GSC_SA_KEY to the local service-account key path.")

    session = authorized_session(str(key_path))
    site = resolve_property(session)
    sitemap = sitemap_rows(session)
    end = dt.date.today() - dt.timedelta(days=DATA_LAG_DAYS)
    start = end - dt.timedelta(days=args.days - 1)
    performance = performance_rows(session, site, start, end)

    output = Path(args.output)
    output.parent.mkdir(parents=True, exist_ok=True)
    fieldnames = [
        "path",
        "sitemap_last_modified",
        "clicks",
        "impressions",
        "ctr_percent",
        "average_position",
        "verdict",
        "coverage_state",
        "robots_state",
        "indexing_state",
        "fetch_state",
        "user_canonical_path",
        "selected_canonical_path",
        "last_crawl_time",
        "decision",
        "decision_reason",
    ]
    decisions: Counter[str] = Counter()
    with output.open("w", newline="", encoding="utf-8") as handle:
        writer = csv.DictWriter(handle, fieldnames=fieldnames, lineterminator="\n")
        writer.writeheader()
        for number, item in enumerate(sitemap, start=1):
            url = item["url"]
            metrics = performance.get(url, {})
            try:
                status = inspect_url(session, site, url)
                verdict = status.get("verdict", "")
                coverage = status.get("coverageState", "")
                decision, reason = decision_for(verdict, coverage)
            except requests.RequestException as exc:
                status = {}
                verdict = "ERROR"
                coverage = "Inspection request failed"
                decision, reason = "retry_inspection", type(exc).__name__
            decisions[decision] += 1
            writer.writerow(
                {
                    "path": urlsplit(url).path or "/",
                    "sitemap_last_modified": item["last_modified"],
                    "clicks": int(metrics.get("clicks", 0)),
                    "impressions": int(metrics.get("impressions", 0)),
                    "ctr_percent": round(metrics.get("ctr", 0) * 100, 2),
                    "average_position": round(metrics.get("position", 0), 2),
                    "verdict": verdict,
                    "coverage_state": coverage,
                    "robots_state": status.get("robotsTxtState", ""),
                    "indexing_state": status.get("indexingState", ""),
                    "fetch_state": status.get("pageFetchState", ""),
                    "user_canonical_path": canonical_path(
                        status.get("userCanonical", ""), url
                    ),
                    "selected_canonical_path": canonical_path(
                        status.get("googleCanonical", ""), url
                    ),
                    "last_crawl_time": status.get("lastCrawlTime", ""),
                    "decision": decision,
                    "decision_reason": reason,
                }
            )
            if number % 10 == 0:
                handle.flush()
            if number % 25 == 0 or number == len(sitemap):
                print(f"Inspected {number}/{len(sitemap)} URLs", flush=True)
            if number < len(sitemap):
                time.sleep(args.delay)

    summary = ", ".join(f"{key}={value}" for key, value in sorted(decisions.items()))
    print(f"Inventory complete: {len(sitemap)} URLs; {summary}")


if __name__ == "__main__":
    main()
