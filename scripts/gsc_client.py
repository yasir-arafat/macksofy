#!/usr/bin/env python3
"""
Google Search Console client for macksofy.com.

Authentication uses a local service-account key supplied through GSC_SA_KEY or
GOOGLE_APPLICATION_CREDENTIALS. The key is never stored in this repository.
The property is resolved against sites().list() so URL-prefix and domain
properties cannot silently produce an empty result set.

Usage as a CLI (prints a live access check + 28-day summary):
    python3 scripts/gsc_client.py

Usage as a module:
    from gsc_client import client, search_analytics, inspect_url
    svc = client()
    rows = search_analytics(svc, dimensions=['query'], days=28)
    verdict = inspect_url(svc, 'https://www.macksofy.com/courses/ceh/')
"""
import datetime as dt
import os
from urllib.parse import quote

import requests
from google.auth.transport.requests import AuthorizedSession, Request
from google.oauth2 import service_account

DEFAULT_SITE = 'https://www.macksofy.com/'
DEFAULT_KEY = (
    os.environ.get('GSC_SA_KEY')
    or os.environ.get('GOOGLE_APPLICATION_CREDENTIALS')
    or ''
)
SCOPES = ['https://www.googleapis.com/auth/webmasters']

# Search Console data lags ~2-3 days. Anchoring a window to `today` silently
# averages in empty days, which reads as a traffic drop that never happened.
DATA_LAG_DAYS = 3
NEUTRAL_USER_AGENT = (
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) '
    'AppleWebKit/537.36 (KHTML, like Gecko) '
    'Chrome/140.0.0.0 Safari/537.36'
)


def client(key_path: str | None = None):
    """Build an authorised Search Console service."""
    key = key_path or DEFAULT_KEY
    if not key or not os.path.isfile(key):
        raise SystemExit(
            'Search Console credentials are not configured. Set GSC_SA_KEY '
            'or GOOGLE_APPLICATION_CREDENTIALS to the local key path.'
        )
    base = requests.Session()
    base.headers.update({'User-Agent': NEUTRAL_USER_AGENT})
    creds = service_account.Credentials.from_service_account_file(key, scopes=SCOPES)
    session = AuthorizedSession(creds, auth_request=Request(session=base))
    session.headers.update({'User-Agent': NEUTRAL_USER_AGENT})
    return session


def resolve_property(svc, hint: str = DEFAULT_SITE) -> str:
    """Return the exact property string this account owns.

    Matches on registrable host so http/https, www/non-www and sc-domain:
    variants all resolve to whatever form is actually granted.
    """
    response = svc.get('https://www.googleapis.com/webmasters/v3/sites', timeout=30)
    response.raise_for_status()
    granted = [s['siteUrl'] for s in response.json().get('siteEntry', [])]
    if hint in granted:
        return hint

    def host(u):
        return (u.replace('sc-domain:', '')
                 .replace('https://', '').replace('http://', '')
                 .rstrip('/').removeprefix('www.').lower())

    for candidate in granted:
        if host(candidate) == host(hint):
            return candidate
    raise SystemExit(
        f'No Search Console property matching {hint!r} is granted to this '
        f'service account. Granted: {granted or "(none)"}'
    )


def date_window(days: int = 28):
    """(start, end) ISO dates ending at the newest day likely to have data."""
    end = dt.date.today() - dt.timedelta(days=DATA_LAG_DAYS)
    return (end - dt.timedelta(days=days - 1)).isoformat(), end.isoformat()


def search_analytics(svc, dimensions=('date',), days: int = 28,
                     row_limit: int = 1000, site: str | None = None,
                     start_date: str | None = None,
                     end_date: str | None = None,
                     **body_extra):
    """Run a Search Analytics query and return its rows."""
    site = site or resolve_property(svc)
    start, end = (
        (start_date, end_date)
        if start_date and end_date
        else date_window(days)
    )
    body = {
        'startDate': start,
        'endDate': end,
        'dimensions': list(dimensions),
        'rowLimit': row_limit,
        **body_extra,
    }
    endpoint = (
        'https://www.googleapis.com/webmasters/v3/sites/'
        f'{quote(site, safe="")}/searchAnalytics/query'
    )
    response = svc.post(endpoint, json=body, timeout=60)
    response.raise_for_status()
    return response.json().get('rows', [])


def inspect_url(svc, url: str, site: str | None = None):
    """URL Inspection API result for one URL (requires Owner - this SA has it)."""
    site = site or resolve_property(svc)
    response = svc.post(
        'https://searchconsole.googleapis.com/v1/urlInspection/index:inspect',
        json={
        'inspectionUrl': url,
        'siteUrl': site,
        'languageCode': 'en-US',
        },
        timeout=60,
    )
    response.raise_for_status()
    return response.json()['inspectionResult']


def _main():
    svc = client()
    site = resolve_property(svc)
    print(f'property : {site}')

    rows = search_analytics(svc, dimensions=['date'], days=28)
    if rows:
        clicks = int(sum(r['clicks'] for r in rows))
        impr = int(sum(r['impressions'] for r in rows))
        ctr = (clicks / impr * 100) if impr else 0.0
        print(f'window   : {rows[0]["keys"][0]} .. {rows[-1]["keys"][0]} '
              f'({len(rows)} days with data)')
        print(f'28 days  : {clicks} clicks / {impr} impressions / {ctr:.2f}% CTR')
    else:
        print('28 days  : no rows returned for this window')

    top = search_analytics(svc, dimensions=['query'], days=28, row_limit=5)
    if top:
        print('top queries:')
        for r in top:
            print(f'  {int(r["impressions"]):>6} impr  {int(r["clicks"]):>3} clk  '
                  f'{r["keys"][0]}')

    verdict = inspect_url(svc, site)['indexStatusResult']
    print(f'homepage : {verdict.get("verdict")} / {verdict.get("coverageState")}')
    print('ACCESS OK')


if __name__ == '__main__':
    _main()
