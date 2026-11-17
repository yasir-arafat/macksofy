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
