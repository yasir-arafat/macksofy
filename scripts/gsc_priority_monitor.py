#!/usr/bin/env python3
"""Compare priority service-page performance before and after an SEO release.

The report contains page-level Search Console metrics, so it is written only
to the ignored scripts/gsc-snapshots directory and must not be committed.
"""

from __future__ import annotations

import argparse
import datetime as dt
import json
from pathlib import Path
from urllib.parse import urlsplit

from gsc_client import DATA_LAG_DAYS, client, resolve_property, search_analytics


HERE = Path(__file__).resolve().parent
DEFAULT_CONFIG = HERE / "gsc-priority-pages.json"
DEFAULT_OUTPUT_DIR = HERE / "gsc-snapshots"


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser()
    parser.add_argument("--config", type=Path, default=DEFAULT_CONFIG)
    parser.add_argument("--output-dir", type=Path, default=DEFAULT_OUTPUT_DIR)
    return parser.parse_args()


def normalise_path(value: str) -> str:
    path = urlsplit(value).path.rstrip("/")
    return path or "/"


def query_window(session, site: str, start: dt.date, end: dt.date) -> dict[str, dict]:
    rows = search_analytics(
        session,
        dimensions=["page"],
        row_limit=25000,
        site=site,
        start_date=start.isoformat(),
        end_date=end.isoformat(),
    )
    return {
        normalise_path(row["keys"][0]): {
            "clicks": int(row.get("clicks", 0)),
            "impressions": int(row.get("impressions", 0)),
            "ctrPercent": round(float(row.get("ctr", 0)) * 100, 2),
            "averagePosition": round(float(row.get("position", 0)), 2),
        }
        for row in rows
    }


def select_pages(metrics: dict[str, dict], paths: list[str]) -> dict[str, dict]:
    empty = {"clicks": 0, "impressions": 0, "ctrPercent": 0.0, "averagePosition": 0.0}
    return {path: metrics.get(path, empty) for path in paths}


def totals(pages: dict[str, dict]) -> dict[str, float | int]:
    clicks = sum(row["clicks"] for row in pages.values())
    impressions = sum(row["impressions"] for row in pages.values())
    weighted_position = sum(
        row["averagePosition"] * row["impressions"] for row in pages.values()
    )
    return {
        "clicks": clicks,
        "impressions": impressions,
        "ctrPercent": round(clicks / impressions * 100, 2) if impressions else 0.0,
        "averagePosition": round(weighted_position / impressions, 2) if impressions else 0.0,
    }


def comparison(before: dict, after: dict) -> dict[str, float | int | None]:
    def percent_change(old: float, new: float) -> float | None:
        return round((new - old) / old * 100, 2) if old else None

    return {
        "clickChange": after["clicks"] - before["clicks"],
        "clickChangePercent": percent_change(before["clicks"], after["clicks"]),
        "impressionChange": after["impressions"] - before["impressions"],
        "impressionChangePercent": percent_change(
            before["impressions"], after["impressions"]
        ),
        "ctrPointChange": round(after["ctrPercent"] - before["ctrPercent"], 2),
        "positionImprovement": round(
            before["averagePosition"] - after["averagePosition"], 2
        ),
    }


def main() -> None:
    args = parse_args()
    config = json.loads(args.config.read_text(encoding="utf-8"))
    launch = dt.date.fromisoformat(config["launchDate"])
    paths = [normalise_path(path) for path in config["pages"]]

    # Leave the normal reporting lag before launch out of the baseline so the
    # baseline can be captured accurately on release day.
    baseline_end = launch - dt.timedelta(days=DATA_LAG_DAYS)
    baseline_start = baseline_end - dt.timedelta(days=27)
    post_start = launch
    post_end = launch + dt.timedelta(days=27)
    ready_on = post_end + dt.timedelta(days=DATA_LAG_DAYS)

    session = client()
    site = resolve_property(session)
    baseline_pages = select_pages(
        query_window(session, site, baseline_start, baseline_end), paths
    )
    baseline_totals = totals(baseline_pages)

    report: dict[str, object] = {
        "generatedOn": dt.date.today().isoformat(),
        "launchDate": launch.isoformat(),
        "evaluationReadyOn": ready_on.isoformat(),
        "baseline": {
            "start": baseline_start.isoformat(),
            "end": baseline_end.isoformat(),
            "totals": baseline_totals,
            "pages": baseline_pages,
        },
        "postRelease": None,
        "comparison": None,
    }

    if dt.date.today() >= ready_on:
        post_pages = select_pages(query_window(session, site, post_start, post_end), paths)
        post_totals = totals(post_pages)
        report["postRelease"] = {
            "start": post_start.isoformat(),
            "end": post_end.isoformat(),
            "totals": post_totals,
            "pages": post_pages,
        }
        report["comparison"] = comparison(baseline_totals, post_totals)

    args.output_dir.mkdir(parents=True, exist_ok=True)
    output = args.output_dir / f'{dt.date.today().isoformat()}.json'
    output.write_text(json.dumps(report, indent=2) + "\n", encoding="utf-8")

    print(
        "Baseline saved: "
        f'{baseline_totals["clicks"]} clicks, '
        f'{baseline_totals["impressions"]} impressions, '
        f'{baseline_totals["ctrPercent"]:.2f}% CTR.'
    )
    if report["postRelease"] is None:
        print(f"The complete 28-day comparison will be available on {ready_on}.")
    else:
        print("The complete 28-day comparison is included in the private snapshot.")


if __name__ == "__main__":
    main()
