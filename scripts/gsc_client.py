#!/usr/bin/env python3
"""
Google Search Console client for macksofy.com.

Auth is the `gsc-audit` service account (granted siteOwner on this property
on 2026-08-07). The private key is NOT stored in this repo — it lives at one
canonical path outside the repo and is read from there. This repo auto-deploys
to Vercel on push to `main`, so a key committed here would ship to a public
remote; keeping it out of the tree is deliberate, not incidental.

    key path : $GSC_SA_KEY, else /root/audit/gsc/service-account.json
    property : https://www.macksofy.com/   <-- WITH www. The .ae property has
                                               NO www. Passing the wrong form
                                               returns an EMPTY result set that
                                               is indistinguishable from "this
                                               site has no data", so this module
                                               always resolves the property
                                               against sites().list() first.

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

from google.oauth2 import service_account
from googleapiclient.discovery import build

DEFAULT_SITE = 'https://www.macksofy.com/'
DEFAULT_KEY = '/root/audit/gsc/service-account.json'
SCOPES = ['https://www.googleapis.com/auth/webmasters']

# Search Console data lags ~2-3 days. Anchoring a window to `today` silently
# averages in empty days, which reads as a traffic drop that never happened.
DATA_LAG_DAYS = 3


def client(key_path: str | None = None):
    """Build an authorised Search Console service."""
    key = key_path or os.environ.get('GSC_SA_KEY', DEFAULT_KEY)
    if not os.path.exists(key):
        raise SystemExit(
            f'GSC service-account key not found at {key}.\n'
            f'Set GSC_SA_KEY to its location, or restore it to {DEFAULT_KEY}.'
        )
    creds = service_account.Credentials.from_service_account_file(key, scopes=SCOPES)
    return build('searchconsole', 'v1', credentials=creds, cache_discovery=False)


def resolve_property(svc, hint: str = DEFAULT_SITE) -> str:
    """Return the exact property string this account owns.

    Matches on registrable host so http/https, www/non-www and sc-domain:
    variants all resolve to whatever form is actually granted.
    """
    granted = [s['siteUrl'] for s in svc.sites().list().execute().get('siteEntry', [])]
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
                     **body_extra):
    """Run a Search Analytics query and return its rows."""
    site = site or resolve_property(svc)
    start, end = date_window(days)
    body = {
        'startDate': start,
        'endDate': end,
        'dimensions': list(dimensions),
        'rowLimit': row_limit,
        **body_extra,
    }
    return svc.searchanalytics().query(siteUrl=site, body=body).execute().get('rows', [])


def inspect_url(svc, url: str, site: str | None = None):
    """URL Inspection API result for one URL (requires Owner - this SA has it)."""
    site = site or resolve_property(svc)
    return svc.urlInspection().index().inspect(body={
        'inspectionUrl': url,
        'siteUrl': site,
        'languageCode': 'en-US',
    }).execute()['inspectionResult']


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
