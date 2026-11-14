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
- **1.8** Report only — "250+" client count appears in 5 places:
  1. `components/home/Hero.tsx:147` — homepage stat counter
  2. `components/about/AboutHero.tsx:28` — about page stat counter
  3. `components/about/StatsInfographic.tsx:24` — about page infographic
  4. `app/clients/page.tsx:36` — clients page stat counter
  5. `app/clients/page.tsx:79` — body text ("over 250 organizations")
  Owner answered Q1 with "100+ clients". Waiting for confirmation before changing all five.
