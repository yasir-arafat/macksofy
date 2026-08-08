// Legacy PHP → Next.js URL map for the macksofy.com migration.
// See /root/macksofy-new-seo/migration/php_to_nextjs_redirects.md for rationale.
//
// SINGLE SOURCE OF TRUTH for all redirects/gone-responses. Two lists:
//   PHP_REDIRECTS  — permanent 301s wired into next.config.ts `redirects()`
//   PHP_GONE       — 410 Gone responses returned by proxy.ts middleware
// Adding/removing entries here updates both prod layers. Do NOT re-declare any
// of these in vercel.json — a hand-maintained edge duplicate drifted out of
// sync (stale destinations + missing entries) and was removed on 2026-07-25;
// next.config redirects + the proxy 410 handler cover everything below.

export type PhpRedirect = { source: string; destination: string };

export const PHP_REDIRECTS: PhpRedirect[] = [
  // Non-.php route rename + a renamed lead-magnet PDF. Previously these two
  // lived only in vercel.json; folded in here on 2026-07-25 so this file is the
  // complete source of truth.
  { source: "/services/dfir", destination: "/services/digital-forensics-incident-response" },
  { source: "/cert-in-12-hour-patch-mandate-macksofy-brief.pdf", destination: "/cert-in-12-hour-patch-mandate.pdf" },

  // The legacy PHP site's homepage. Unmapped .php paths are answered by the
  // Vercel WAF with 403 + x-vercel-mitigated: deny, which is the wrong answer
  // for this one specifically: /index.php is the single most-linked and
  // most-crawled URL any PHP site has, so a 403 both discards whatever link
  // equity points at it and invites crawlers to keep retrying. A mapped entry
  // here is answered by next.config redirects() BEFORE the WAF sees it —
  // that ordering is already proven by the other entries in this list.
  { source: "/index.php", destination: "/" },

  { source: "/about-us.php", destination: "/about" },
  { source: "/clients.php", destination: "/clients" },
  { source: "/contact-macksofy.php", destination: "/contact" },

  { source: "/best-ethical-hacking-training-in-mumbai.php", destination: "/training/ceh" },
  { source: "/best-ethical-hacking-course-in-mumbai.php", destination: "/training/ceh" },
  { source: "/best-certified-ethical-hacking-training-in-mumbai.php", destination: "/training/ceh" },
  { source: "/best-certified-forensic-investigator-training-in-mumbai.php", destination: "/training/chfi" },
  { source: "/best-security-analyst-training-in-mumbai.php", destination: "/training/csa" },

  { source: "/best-penetration-testing-company-in-mumbai.php", destination: "/services/penetration-testing" },
  { source: "/best-web-application-penetration-company-in-mumbai.php", destination: "/services/web-application-security" },
  { source: "/cloud-penetration-testing-in-mumbai.php", destination: "/services/cloud-security" },
  { source: "/mobile-penetration-testing-in-mumbai.php", destination: "/services/penetration-testing" },
  { source: "/code-review-company-in-mumbai.php", destination: "/services" },

  // Was 410 Gone, but it surfaced in GSC as "Not found (404)". Redirect the
  // residual link equity to the closest live page (we no longer offer web
  // design; /services is the nearest intent match). 2026-06-26.
  { source: "/best-website-designing-company-in-mumbai.php", destination: "/services" },

  { source: "/cehv9-brochure.pdf", destination: "/training/ceh/brochure" },
  { source: "/ecsa-v9-brochure.pdf", destination: "/training/cpent/brochure" },
  { source: "/chfi-brochure.pdf", destination: "/training/chfi/brochure" },
];

export const PHP_GONE: string[] = [
  "/best-graphic-designing-company-in-mumbai.php",
  "/best-search-engine-optimization-company-in-mumbai.php",
  "/online-reputation-management-company-in-mumbai.php",
  "/best-email-marketing-company-in-mumbai.php",
  "/internet-website-designers-in-mumbai.php",
  // "/best-website-designing-company-in-mumbai.php" — moved to PHP_REDIRECTS
  // (301 → /services) on 2026-06-26 to clear a GSC "Not found (404)".
  "/best-social-media-marketing-company-in-mumbai.php",
  "/web-application-development-in-mumbai.php",
  "/software-application.php",
  "/digital-marketing-company-in-mumbai.php",
  "/best-ecommerce-website-developers-in-mumbai.php",
  "/professional-graphic-designing-in-mumbai.php",
  "/js/style-switcher/color-switcher.html",
  "/js/style-switcher/styleselector.html",
];

export const PHP_GONE_SET: ReadonlySet<string> = new Set(PHP_GONE);
