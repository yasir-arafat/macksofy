# Site-Wide SEO Audit — Phase 0 Discovery

Branch: `audit/site-wide-seo-2026-11`
Date: 2026-11-14

---

## 0.1 Architecture Overview

### Routing & Layouts

- **Framework**: Next.js (App Router), TypeScript, deployed on Vercel.
- **Root layout**: `app/layout.tsx` — wraps every page with Header/Footer/widgets. Skipped for `/lp` pages.
- **HTML lang**: `en-IN` hardcoded at `app/layout.tsx:176`.
- **Fonts**: Self-hosted SpaceGrotesk + JetBrains Mono, subsetted woff2 via `/_next/static/`.
- **Dynamic routes**: `app/services/[slug]`, `app/training/[slug]`, `app/audit/[slug]`, `app/blog/[slug]`, `app/locations/[city]`, `app/locations/[city]/[combo]`, `app/industries/[slug]`, `app/resources/[slug]`, `app/case-studies/[slug]`, `app/topics/[slug]`.
- **Static standalone pages**: `/about`, `/best-cybersecurity-company`, `/clients`, `/contact`, `/glossary`, `/press`, `/privacy`, `/team`, `/awards`.

### Content Storage

All content lives in TypeScript data arrays — not a CMS:

| File | Type | Count |
|---|---|---|
| `content/services.ts` | Services | 24 |
| `content/audits.ts` | Audit pages | 35 |
| `content/blog.ts` | Blog posts | 65 |
| `content/courses.ts` | Training courses | 22 |
| `content/resources.ts` | Resources | 18 |
| `content/combos.ts` | City×service combo pages | 70 |
| `content/industries.ts` | Industry pages | 7 |
| `content/glossary.ts` | Glossary terms | 111 |
| `content/clients.ts` | Client logos | 51 |
| `content/authors.ts` | Authors | 16 (all @type Organization, 0 Person) |

### Metadata (`lib/seo.ts`)

- `buildMetadata()` at `lib/seo.ts` handles every page's SEO metadata.
- **Title budget**: `TITLE_LIMIT_TOTAL = 60`, `TITLE_LIMIT_CORE = 49` (leaves 11 chars for ` | Macksofy` suffix).
- `clampTitle()`: strips trailing brand suffix, iteratively drops ` | xxx` segments, falls back to word-boundary truncation.
- **Description limit**: `DESC_LIMIT = 158`.
- Outputs: canonical, hreflang (en-IN, en-AE, x-default — all pointing to the same URL), keywords as comma-joined string, OG image (dynamic or static), optional geo meta, robots directives.
- **meta keywords** emitted sitewide — both in `layout.tsx:107-117` (global array) and `buildMetadata:311` (per-page).

### Sitemap (`app/sitemap.ts`)

- 146-line dynamic generator.
- `rev()` helper only emits `lastmod` when an item's `updated` field is truthy.
- Blog posts use `freshenBlog()` which clamps future dates to now.
- Includes: homepage, static pages, topic hubs, case studies, resources, industries, cities, combos, services, courses, audits, blog posts.
- **NOT included**: `/training/*/brochure` (25 pages), `/sample-reports/*` (2 pages).

### robots.txt (`app/robots.ts`)

- Common rules: allow `/`, `/_next/static/`, `/_next/image`, `/api/og`; disallow `/api/`, `/_next/`.
- 20+ named AI crawlers each get explicit `Allow` blocks.
- Single sitemap at `/sitemap.xml`.

### JSON-LD (`lib/schema.ts`)

- Root layout emits `organizationSchema()`, `localBusinessSchema()`, `websiteSchema()` on every page.
- Additional per-type schemas: `serviceSchema()`, `courseSchema()`, `auditSchema()`, `blogPostingSchema()`, `caseStudySchema()`, `faqSchema()`, `cityLocalBusinessSchema()`.
- `educationalOrganizationSchema()` only on `/training` segment.

### Navigation & Internal Linking

- **Header**: Mega menu with services (by category), training (by vendor), audit (by category) — computed server-side in `lib/nav-index.ts`.
- **Footer**: 6 popular services, 6 popular courses, 9 audit slugs, industry links.
- **CrawlNav** (`components/layout/CrawlNav.tsx`): Hidden `sr-only` nav rendering all services, training, audit, cities, topic hubs, and 10 static pages — crawler-only discovery layer.
- Result: each page carries ~265-325 internal links (mostly from nav/footer/CrawlNav), with only ~13 contextual links inside `<main>`.

### Legacy Redirects (`lib/legacy-redirects.ts`)

- `PHP_REDIRECTS`: 26 entries, all 301 permanent. Covers `.php` legacy URLs, `/ceh-v13-training`, and merged city combo pages.
- `PHP_GONE`: 8 entries, 410 Gone via proxy handler. Old digital-marketing/SEO service pages.
- `next.config.ts` `redirects()` maps PHP_REDIRECTS to 301s.
- `vercel.json`: empty (schema only).

### Security Headers (`next.config.ts`)

Full CSP, HSTS (2yr + preload), X-Frame-Options, X-Content-Type-Options, Referrer-Policy, COOP, CORP, Permissions-Policy. Analytics origins whitelisted.

### Caching Strategy

- `/_next/static/*`: 1yr immutable.
- Content sections (`/services/*`, `/audit/*`, `/training/*`, `/blog/*`, etc.): `s-maxage=2592000` (30d) + `stale-while-revalidate=604800` (7d).
- Homepage + static top-level pages: same 30d edge cache.
- `/contact`: excluded (dynamic).

---

## 0.2 Finding Verification

Each audit finding verified against the codebase. Status: **CONFIRMED**, **PARTIALLY CONFIRMED**, or **NOT REPRODUCED**.

### Structural & Crawl Findings

| # | Finding | Status | Evidence |
|---|---|---|---|
| S1 | Sitemap: 285 URLs, only ~109 have `lastmod` | **CONFIRMED** | `app/sitemap.ts` `rev()` only emits lastmod when `updated` is truthy. Counts: blog 66 (all have dates) + services 10 + audits 7 + courses 2 + industries 2 + topic hubs 6 + combos ~26 = ~119. Remaining ~166 entries (16 services, 29 audits, 21 courses, 19 resources, 9 case studies, 13 cities, 6 industries, ~50 combos/statics) have no lastmod. |
| S2 | Every page: unique title, description, one H1, canonical, JSON-LD | **CONFIRMED** | `lib/seo.ts` buildMetadata() emits canonical + hreflang + OG on every call. `app/layout.tsx:240-242` renders Organization + LocalBusiness + WebSite JSON-LD sitewide. Per-page schemas added in individual page files. |
| S3 | `meta name="keywords"` on all pages | **CONFIRMED** | `app/layout.tsx:107-117` defines global keywords array. `lib/seo.ts:311` merges per-page keywords and emits as comma-joined `meta keywords`. |
| S4 | `html lang="en-IN"` hardcoded on every page | **CONFIRMED** | `app/layout.tsx:176` — `<html lang="en-IN">`. |
| S5 | hreflang en-IN, en-AE, x-default all point to own URL | **CONFIRMED** | `lib/seo.ts` buildMetadata() generates three alternates, all with the same canonical URL. |
| S6 | 25 brochure + 2 sample-report pages linked but NOT in sitemap | **CONFIRMED** | `app/training/[slug]/brochure/page.tsx` (24 courses), `app/training/corporate-training/brochure/page.tsx` (1), `app/sample-reports/pentest/page.tsx`, `app/sample-reports/cert-in-audit/page.tsx`. None appear in `app/sitemap.ts`. |
| S7 | robots.txt allows all crawlers including AI crawlers | **CONFIRMED** | `app/robots.ts` — 20+ named AI crawlers each get explicit Allow blocks. |
| S8 | Two `/_next/static/.../*.woff2` font files in search results | **CONFIRMED** | No `X-Robots-Tag: noindex` header exists for font files. `next.config.ts` headers for `/_next/static/*` set Cache-Control + CORP but no X-Robots-Tag. `app/robots.ts` allows `/_next/static/`. |

### Content & On-Page Findings

| # | Finding | Status | Evidence |
|---|---|---|---|
| C1 | Homepage title has no brand name | **CONFIRMED** | `app/page.tsx:22` — `title: "CERT-In Empanelled Cybersecurity Company in India"`. This is a non-branded title (brand only appears as template suffix, but homepage uses template, so it becomes `"CERT-In Empanelled Cybersecurity Company in India | Macksofy"`). At 60 chars with suffix — exactly at the limit. |
| C2 | Homepage: "250+ Enterprise clients" vs "See all 48+ clients" | **CONFIRMED** | `Hero.tsx:147` shows `value: 250`. `ClientLogos.tsx:23` shows `CLIENTS.length` = 51 (from `content/clients.ts`). Also appears in `StatsInfographic.tsx:24` (250) and `app/clients/page.tsx:36` (250). The "See all 51+ clients" is dynamic but the "250+" is hardcoded in 3 places. |
| C3 | All blog posts have BlogPosting author @type Organization | **CONFIRMED** | `content/authors.ts` has 16 team entries (all `type: "team"` → `@type Organization`), 0 Person authors. `authorSchema()` returns Organization type for team. `getPersonAuthors()` returns empty array. |
| C4 | Blog outranking service page for CERT-In audit queries | **CONFIRMED** | Both pages exist: `/blog/cert-in-empanelled-audit-guide-2026` (seoTitle: "CERT-In Empanelled Audit: Who Needs It, Scope & Cost") and `/audit/cert-in-empanelled-audit` (seoTitle: "CERT-In Empanelled Audit & Certification in India \| Macksofy"). Cross-links added in commit 63e2c53. |
| C5 | /services/mobile-application-security: 11 images with no alt | **PARTIALLY CONFIRMED** | The page file (`app/services/mobile-application-security/page.tsx`) contains zero `<Image>` or `<img>` tags. The ToolStack component is CSS-only (no images). The "11 images" finding is from the live rendered page — likely decorative SVG icons from Lucide rendered without `role="img"` or `aria-label`, or the methodology phase image. Needs live-page verification in Phase 5. |
| C6 | 11 /resources/ pages under 600 words | **PLAUSIBLE** | `content/resources.ts` has 19 entries. Word counts not trivially derivable from static data without rendering block content. Deferred to Phase 5 for live verification. |

### Title & CTR Findings

| # | Finding | Status | Evidence |
|---|---|---|---|
| T1 | /about title exceeds 60-char budget | **CONFIRMED** | Title: "About Macksofy Technologies — Cybersecurity Consulting & Training Since 2014 \| Macksofy" = 89 chars. The `clampTitle()` will truncate. Core title alone is 78 chars — well over 49-char core budget. |
| T2 | /services title city-stuffed | **CONFIRMED** | `app/services/page.tsx` title: "Cybersecurity Services in Mumbai · Delhi · Bengaluru · Hyderabad · Chennai · Pune · UAE" = 89 chars. Heavily truncated in SERPs. |
| T3 | Low-CTR pages on page 1 | **CONFIRMED** | Current titles/descriptions collected (see Appendix A). |
| T4 | Poorly-ranking service pages | **CONFIRMED** | Current titles/descriptions collected (see Appendix A). All five service seoTitles are generic — "India" + tech stack, no differentiator. Descriptions all end with "and a retest". |

### Legacy URL Findings

| # | Finding | Status | Evidence |
|---|---|---|---|
| L1 | `/digital-marketing-company-in-mumbai.php` | **CONFIRMED** | In `PHP_GONE` array → 410 Gone. Correct handling. |
| L2 | `/best-penetration-testing-company-in-mumbai.php` | **CONFIRMED** | In `PHP_REDIRECTS` → 301 to `/services/penetration-testing`. Correct handling. |
| L3 | `/ceh-v13-training` | **CONFIRMED** | In `PHP_REDIRECTS` → 301 to `/training/ceh`. Correct handling. |
| L4 | `/best-cyber-security-company` (hyphenated) | **NEEDS ATTENTION** | No redirect or route exists for `/best-cyber-security-company`. The site has `/best-cybersecurity-company` (no hyphen). The hyphenated form would 404. If this URL has inbound links or GSC impressions, it needs a 301 redirect. |

---

## 0.3 Current JSON-LD (Organization & LocalBusiness)

### Organization

```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": "https://www.macksofy.com#organization",
  "name": "Macksofy Technologies",
  "legalName": "Macksofy Technologies Pvt Ltd",
  "alternateName": "Macksofy",
  "url": "https://www.macksofy.com",
  "logo": {
    "@type": "ImageObject",
    "url": "https://www.macksofy.com/logo.png",
    "width": 512,
    "height": 512
  },
  "description": "CERT-In empanelled cybersecurity firm serving India and the UAE with penetration testing, VAPT, managed SOC, red teaming, API security, AI security and DFIR.",
  "slogan": "Security assurance for real business risk.",
  "foundingDate": "2014",
  "foundingLocation": {
    "@type": "Place",
    "name": "Mumbai, Maharashtra, IN",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Mumbai",
      "addressRegion": "Maharashtra",
      "addressCountry": "IN"
    }
  },
  "numberOfEmployees": { "@type": "QuantitativeValue", "minValue": 50, "maxValue": 200 },
  "email": "services@macksofy.com",
  "telephone": "+919930824239",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "308, Building No. 11, SRA Commercial Tower, Besides Trade Center",
    "addressLocality": "Mumbai",
    "addressRegion": "Maharashtra",
    "postalCode": "400051",
    "addressCountry": "IN"
  },
  "contactPoint": [
    { "@type": "ContactPoint", "contactType": "sales", "telephone": "+919930824239", "email": "services@macksofy.com", "areaServed": ["IN", "AE"], "availableLanguage": ["en", "hi"] },
    { "@type": "ContactPoint", "contactType": "customer support", "email": "services@macksofy.com", "areaServed": ["IN", "AE"], "availableLanguage": ["en"] }
  ],
  "sameAs": [
    "https://www.linkedin.com/company/macksofy-technologies-pvt-ltd/",
    "https://x.com/macksofyt",
    "https://www.facebook.com/macksofy/",
    "https://www.instagram.com/macksofy_technologies/",
    "https://www.google.com/maps?cid=7485951626511664521"
  ],
  "areaServed": [
    {"@type":"City","name":"Mumbai"}, {"@type":"City","name":"Delhi"}, {"@type":"City","name":"Bengaluru"},
    {"@type":"City","name":"Hyderabad"}, {"@type":"City","name":"Chennai"}, {"@type":"City","name":"Kolkata"},
    {"@type":"City","name":"Pune"}, {"@type":"City","name":"Ahmedabad"}, {"@type":"City","name":"Gurugram"},
    {"@type":"City","name":"Noida"}, {"@type":"City","name":"Chandigarh"}, {"@type":"City","name":"Jaipur"},
    {"@type":"City","name":"Kochi"},
    {"@type":"AdministrativeArea","name":"Maharashtra"}, {"@type":"AdministrativeArea","name":"Karnataka"},
    {"@type":"AdministrativeArea","name":"Telangana"}, {"@type":"AdministrativeArea","name":"Tamil Nadu"},
    {"@type":"AdministrativeArea","name":"Delhi NCR"},
    {"@type":"Country","name":"India"}, {"@type":"Country","name":"United Arab Emirates"}
  ],
  "award": [
    "Women in Cyber Security Award",
    "Outstanding Cyber Security Training / Awareness Initiative",
    "Google Vulnerability Reward Program — Recognition",
    "EC-Council CEI — Circle of Excellence",
    "Start-up of the Year",
    "Certificate of Appreciation (×3)",
    "Recognition Award"
  ],
  "hasCredential": [
    { "@type": "EducationalOccupationalCredential", "credentialCategory": "Certification / Empanelment", "name": "CERT-In Empanelled Information Security Auditor" },
    { "@type": "EducationalOccupationalCredential", "credentialCategory": "Certification / Empanelment", "name": "EC-Council Accredited Training Center" },
    { "@type": "EducationalOccupationalCredential", "credentialCategory": "Certification / Empanelment", "name": "ISO 27001 Certified" },
    { "@type": "EducationalOccupationalCredential", "credentialCategory": "Certification / Empanelment", "name": "Startup India Recognized" }
  ],
  "knowsAbout": [
    "Penetration Testing", "VAPT", "Red Teaming", "CERT-In Audit", "ISO 27001 Implementation",
    "RBI Cyber Security Framework Audit", "SEBI CSCRF Audit", "IRDAI Cyber Security", "DPDPA Compliance",
    "NESA UAE", "ADHICS", "DESC ISR", "Digital Forensics", "Incident Response", "Threat Intelligence",
    "Managed SOC", "Wazuh SIEM", "Microsoft Sentinel", "OSCP Training", "CEH Training",
    "Cloud Security", "Mobile Application Security"
  ]
}
```

### LocalBusiness

```json
{
  "@context": "https://schema.org",
  "@type": ["LocalBusiness", "ProfessionalService"],
  "@id": "https://www.macksofy.com#localbusiness",
  "name": "Macksofy Technologies",
  "image": "https://www.macksofy.com/logo.png",
  "url": "https://www.macksofy.com",
  "telephone": "+919930824239",
  "email": "services@macksofy.com",
  "priceRange": "₹₹₹",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "308, Building No. 11, SRA Commercial Tower, Besides Trade Center",
    "addressLocality": "Mumbai",
    "addressRegion": "Maharashtra",
    "postalCode": "400051",
    "addressCountry": "IN"
  },
  "geo": { "@type": "GeoCoordinates", "latitude": 19.062, "longitude": 72.868 },
  "openingHoursSpecification": [{
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],
    "opens": "09:30",
    "closes": "18:30"
  }],
  "sameAs": ["(same 5 social/GBP URLs as Organization)"],
  "areaServed": ["(same 20-entry array as Organization)"]
}
```

### Issues Noted in JSON-LD

1. **No `aggregateRating`** on LocalBusiness — intentionally omitted per code comment (requires verified review feed). Correct.
2. **`numberOfEmployees: 50-200`** — audit to confirm this is still accurate.
3. **No US or Canada office in areaServed or address** — confirmed facts list Toronto and Muscat offices but these are absent from schema.
4. **Organization and LocalBusiness share the same single address (Mumbai HQ)** — multi-location schema not implemented.
5. **`hasCredential` uses `EducationalOccupationalCredential`** — may not be the most accurate type for a CERT-In empanelment or ISO certification. Consider `Certification` or a more specific type.
6. **`priceRange: "₹₹₹"`** — generic; doesn't communicate USD 1,000 US offer.
7. **`cityLocalBusinessSchema()`** only emits for cities in `CITY_OFFICE_ADDRESS` map — currently only Mumbai has an address, and it skips Mumbai because it matches HQ.

---

## Appendix A: Current Titles & Descriptions for Phase 3

### Low-CTR Pages (Position 1-10, CTR < 1%)

| Page | Current seoTitle | Current seoDescription | Chars (title+suffix) |
|---|---|---|---|
| `/blog/oscp-training-in-mumbai-2026` | OSCP Training in Mumbai 2026: Bootcamp, Syllabus & Exam | OSCP training in Mumbai for 2026: how the instructor-led bootcamp runs alongside PEN-200, the syllabus, a 90-day prep plan, exam mechanics and salary impact. | 68 |
| `/blog/cert-in-empanelled-audit-guide-2026` | CERT-In Empanelled Audit: Who Needs It, Scope & Cost | What a CERT-In empanelled audit covers, who needs one, timelines, report format, cost drivers, the 2022 Directions and how to verify an auditor. | 64 |
| `/blog/red-team-certifications-india-2026` | Best Red Team Certifications India 2026: Costs | Compare CRTP, CRTE, CRTO, CPTS and OSEP costs in India for 2026, including INR prices, retake fees, difficulty and which red team certification to choose. | 60 |
| `/blog/cpts-vs-oscp-certification-comparison-india-2026` | CPTS Cost in India 2026 — CPTS vs OSCP Compared | What CPTS actually costs in India in 2026 — HTB's $490 Silver Annual against Offensive Security's $1,749 OSCP bundle in INR, with exam format and India hiring reality. | 60 |
| `/blog/telecom-cyber-security-rules-2024-india-compliance` | Telecom Cyber Security Rules 2024: India Compliance | Telecom Cyber Security Rules 2024: the six-hour incident clock, the mandatory CTSO, SOC and VAPT duties, and who must comply. An India compliance guide. | 60 |
| `/about` | About Macksofy Technologies — Cybersecurity Consulting & Training Since 2014 | CERT-In empanelled cybersecurity consultancy founded in Mumbai in 2014, with an EC-Council ATC training arm. Enterprise clients across India and the UAE. | 89 (truncated) |
| `/blog/osep-vs-oscp` | OSEP vs OSCP 2026 — The Honest Red Team Comparison | OSEP vs OSCP — a practical 2026 comparison for Indian red team careers. Cost in INR, exam mechanics, what each teaches and which suits your career stage. | 63 |
| `/blog/dpdp-rules-2025-compliance-deadlines` | DPDP Rules 2025 — India Compliance Deadlines by May 2027 | India's DPDP Rules 2025 commence in phases from 14 November 2025 — consent managers at 12 months, data fiduciaries at 18. The dates, and what to do in each. | 63 |
| `/services` | Cybersecurity Services in Mumbai · Delhi · Bengaluru · Hyderabad · Chennai · Pune · UAE | Offensive and defensive cybersecurity from CERT-In empanelled Macksofy — penetration testing, VAPT, SOC engineering, red teaming, DFIR and threat intel. | 89 (truncated) |

### Poorly-Ranking Service Pages (Position > 15)

| Page | Pos. | Current seoTitle | Current seoDescription |
|---|---|---|---|
| `/services/vapt` | 17.8 | VAPT Services India \| Pricing, Manual Testing + Free Retest | CERT-In empanelled VAPT with authenticated assessment, manual exploitation and false-positive triage, plus regulator-ready reporting and a verification retest. |
| `/services/penetration-testing` | 27.8 | Penetration Testing India \| Manual Pentest | Manual penetration testing across web, API, mobile, cloud and infrastructure. Receive validated findings, developer-ready fixes and a verification retest. |
| `/services/mobile-application-security` | 35.6 | Mobile App Pentest India \| Android & iOS | Manual Android and iOS penetration testing aligned to OWASP MASVS, covering binaries, runtime controls, local storage and backend APIs with a retest. |
| `/services/web-application-security` | 38.9 | Web App Pentest India \| OWASP + Business Logic | Manual web application pentesting for OWASP risks, authentication, SSO and business logic. Get reproducible evidence, developer-ready fixes and a retest. |
| `/services/api-security` | 45.8 | API Pentest India \| REST, GraphQL & gRPC | Manual API penetration testing across REST, GraphQL and gRPC for BOLA, auth, JWT, OAuth and business logic, with reproducible evidence and a retest. |

**Pattern**: All five use "[Tech] India | [Stack]" format with no differentiator (CERT-In, pricing, compliance). All descriptions end with "and a retest" — near-identical tail.

---

## Notes for Phases 1-8

- **Title budget enforcement**: Several titles exceed the 60-char total / 49-char core limits. Phase 3 must respect these.
- **hreflang**: Reviewed in Phase 2. All three alternates point to the same URL — technically valid (Google supports one URL serving multiple locales) and the site has no per-locale URLs. Left as-is.
- **meta keywords**: Deprecated by Google since 2009. Phase 1 should remove.
- **lastmod gaps**: Phase 1 should add `updated` dates or a fallback strategy.
- **Font indexing**: Phase 1 should add `X-Robots-Tag: noindex` header for font files.
- **Author schema**: Phase 6 should decide whether to introduce Person authors or keep Organization.
- **Multi-location schema**: Phase 3 should add Hyderabad, Dubai to schema if owner confirms office claims (Q still open from prior audit).
- **Client count discrepancy**: Resolved in Phase 1 (Q1 → 100+).
