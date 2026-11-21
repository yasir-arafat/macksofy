# Site-Wide SEO Audit — CHANGES

One entry per commit, added after each numbered item lands.

---

## Phase 0 — Discovery (no code changes)

- Created `PLAN.md` — architecture overview, finding verification, JSON-LD snapshot.
- Created `QUESTIONS.md` — 10 owner-decision items, answers recorded as received.
- Created `CHANGES.md` — this file.

## Phase 1 — Technical Cleanup

- **1.1** `994d7d1` — Removed `<meta name="keywords">` sitewide (layout.tsx global array + buildMetadata output).
- **1.2** `7cf3d9c` — Homepage title + brand suffix exceeds 60 chars; two options added to QUESTIONS.md (Q11).
- **1.3** `dffb144` — Every sitemap entry now has `<lastmod>` from per-entry `updated` or per-content-type git dates.
- **1.4** No change needed — all 11 images on /services/mobile-application-security already have `alt=""` with `aria-hidden="true"` (correct for decorative images adjacent to text labels). 10 are OWASP Mobile icons in `MobileTopTen.tsx`, 1 is a methodology phase image in `MethodologyStepper.tsx`.
- **1.5** `3535f24` — Added `X-Robots-Tag: noindex` header for font files (woff2/woff/ttf/otf) in `next.config.ts`.
- **1.6** `8761bdb` — Legacy URL audit: 3 of 4 already handled (two 301s, one 410). Added 301 from `/best-cyber-security-company` → `/best-cybersecurity-company`.
- **1.7** `d49b446` — Removed `noIndex: true` from brochure (25) and sample-report (2) pages; added all to sitemap. Owner confirmed indexing in Q8.
- **1.8** "250+" → "100+" clients in all 5 places (owner Q1, go-ahead 2026-11-17): Hero.tsx stat, AboutHero.tsx stat, StatsInfographic.tsx, /clients stat block and /clients body text ("over 100 organizations").
- **1.2 fix** — Homepage `<title>` rendered without " | Macksofy": the root layout's title template does not apply to `app/page.tsx` (same route segment). The homepage now sets the Option A title as an absolute title: `CERT-In Empanelled Cybersecurity Company India | Macksofy` (57 chars).

## CERT-In "empanelment process" cannibalization (2026-11-17)

- GSC 11-09..11-15: `/audit/cert-in-empanelled-audit` ranked ~p16 for "cert-in empanelment process" (was p24-33, intermittent) while `/blog/cert-in-empanelment-process-2026` fell from p1-3 to p7-9; the shift started 11-07/08.
- Audit page: FAQ "How does a CERT-In empanelled audit differ from the empanelment process itself?" (63e2c53) reworded to the buyer question "Does a CERT-In empanelled audit make my organisation CERT-In empanelled?"; its markdown link never rendered (FAQAccordion prints plain text) and is removed. "CERT-In certification refers to the process by which…" reworded. Page now has 0 "empanelment process" mentions apart from the link below; `updated` 2026-11-17.
- New optional `intentNote` on audits (rendered under the hero verify line): CERT-In audit page links to the process guide with anchor "CERT-In empanelment process".
- Two links to the audit page with anchor "CERT-In empanelment" (vapt-cost-india-2026, penetration-testing-rfp-checklist-india-2026) now read "CERT-In empanelled auditor(s)".

## Laptops guide ranking drop (2026-11-17)

- GSC: page held ~p4 until 11-11, then 4.9/5.1/6.7/5.9 on 11-12..11-15; core queries "best laptop for cyber security students" p2.0 -> p7.9, "laptop for cyber security students" p2.4 -> p6.2. Rest of the site's non-brand queries flat (p18.5-20). Page healthy (indexed, crawled 11-14, canonical OK).
- Reverted the 11-08 CTR test (944cc81): search title and description back to the originals. The test showed no CTR lift and is the only change to the page before the slip.
- Not changed: on-page H1, content, `updated` date (2026-09-18). If positions do not recover within ~2 weeks of the next crawl, the next step is a real content refresh (current models and verified prices).

## Phase 2 — Title & Description Rewrites

- **2.1** — Rewrote 5 poorly-ranking service page titles + descriptions. All had generic "[Tech] India | [Stack]" format with no differentiator and near-identical "and a retest" description tails:
  - `/services/penetration-testing`: "Manual Pentest" → "CERT-In Empanelled" (key trust signal for buyers comparing vendors)
  - `/services/vapt`: was 59 chars (over budget, clamped). Now "Pricing from ₹40,000" (owner-confirmed price, only service page with a price in the SERP)
  - `/services/web-application-security`: title kept (46 chars, fits budget). Description rewritten with CERT-In mention.
  - `/services/api-security`: title kept (40 chars). Description rewritten with CERT-In mention.
  - `/services/mobile-application-security`: title kept (40 chars). Description rewritten.
  - All 5 `updated` dates set to 2026-11-20.
- **2.2** — `/services` index title: was 89 chars (city-stuffed, heavily truncated in SERPs). Now "Cybersecurity Services India & UAE" (34 chars + 11 = 45 total). Cities moved to description.
- **2.3** — `/about` title: was 89 chars ("About Macksofy Technologies — Cybersecurity Consulting & Training Since 2014", truncated). Now "About Macksofy — CERT-In Empanelled Since 2014" (46 chars, self-branded absolute title). Description rewritten.
- **2.4** — hreflang reviewed, left as-is: all three alternates (en-IN, en-AE, x-default) point to the same URL. This is technically valid per Google's docs (one URL serving multiple locales) and the site has no separate locale pages.

## Cloud-security indexing (2026-11-17)

- GSC: `/services/cloud-security` is still "Crawled - currently not indexed", last crawl 2026-07-18. The page is fine: 200, self-canonical, index/follow, in the sitemap, ~3,300 words, little text shared with the city cloud pages. The 11-08 fixes (sitemap `lastmod`, CSPM post link, sitemap resubmitted) have not triggered a recrawl. Google crawls this site's service pages slowly (8 of 24 last crawled in July, though indexed), and pages it has judged not worth indexing get revisited even less often.
- More crawl paths from pages Google visits: the VAPT coverage table rows now link to the matching service pages (network, web app, mobile, cloud, containers -> `/services/cloud-security#containers`). `/audit/iso-27017` and `/audit/iso-27018` now list Cloud Security first under related services (new `Audit.relatedServices` pin; before, the keyword matcher found no overlap and fell back to Pentest/VAPT/Web app). Other audit pages are unchanged.
- Page quality: H2 "Cloud audit accepted by every framework" -> "Cloud findings mapped to the frameworks you report against" (same softening as a5b9837). ISO/IEC 27017 added to the page's references.
- Sitemap `lastmod` 2026-11-17 for the four changed pages.
- Owner: GSC -> URL Inspection -> `/services/cloud-security` -> Request indexing. This is the only direct recrawl trigger; the API cannot do it.
