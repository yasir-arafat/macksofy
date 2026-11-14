# Site-Wide SEO Audit — QUESTIONS

Items that require owner input before implementation. Updated with answers as received.

---

### Q1. Client count to show sitewide
**ANSWERED**: 100+ clients. (Currently shows "250+" in Hero, StatsInfographic, and /clients page. Will update all to 100+.)

### Q2. Author names, roles, credentials and bios; which posts each wrote
**ANSWERED**: Use "Macksofy Technical Editorial Team" as the author across all posts. No individual person authors.

### Q3. Publishable INR price ranges for VAPT and main audits; course fees
**ANSWERED**: Web application VAPT starts from ₹40,000. Red teaming starts from ₹2,00,000.

### Q4. Scope of the USD 1,000 US web application penetration test
**ANSWERED**: All web applications up to 300 web pages and 4 user roles.

### Q5. US address, phone number or legal entity to show
**ANSWERED**: No US office. Do not show any US address or phone number.

### Q6. Publish AED prices for UAE, or "request a quote"?
**ANSWERED**: Request a quote.

### Q7. Homepage strategy: India page or neutral global homepage?
**ANSWERED**: Neutral global homepage.

### Q8. Should brochure and sample-report pages be indexed?
**ANSWERED**: Yes, they should be indexed. (Will add to sitemap.)

### Q9. Redirect targets for legacy URLs
**ANSWERED**: Yes, set up redirects.

Current behavior of the four audit URLs:
| URL | Current response | Proposed action |
|---|---|---|
| `/digital-marketing-company-in-mumbai.php` | **410 Gone** (`PHP_GONE` in legacy-redirects.ts) | No change — 410 is correct for a service Macksofy no longer offers |
| `/best-penetration-testing-company-in-mumbai.php` | **301 → /services/penetration-testing** | No change — already redirected correctly |
| `/ceh-v13-training` | **301 → /training/ceh** | No change — already redirected correctly |
| `/best-cyber-security-company` | **404** (no route, no redirect) | **Add 301 → /best-cybersecurity-company** (the existing page, just missing the hyphen) |

Only action needed: add one redirect for `/best-cyber-security-company`. Will add to `PHP_REDIRECTS` in `lib/legacy-redirects.ts`.

### Q10. Which site owns each course keyword: macksofy.com vs macksofytrainings.com
**ANSWERED**: macksofy.com focuses on services and top courses only. macksofytrainings.com owns the full training catalog.

---

### Q11. Homepage title — brand suffix options (from 1.2)
Current title: `CERT-In Empanelled Cybersecurity Company in India` (49 chars).
With ` | Macksofy` suffix: 62 chars — exceeds the 60-char budget by 2.

**Option A**: `CERT-In Empanelled Cybersecurity Company India | Macksofy` (59 chars — drops "in")
**Option B**: `CERT-In Empanelled Cybersecurity Firm India | Macksofy` (55 chars — "Firm" instead of "Company")

Note: Q7 answer says "Neutral Global Homepage", so this title will change again in a later phase (removing the India-specific framing). Pick whichever works for the interim.
**ANSWERED**: Option A — `CERT-In Empanelled Cybersecurity Company India | Macksofy` (59 chars).
