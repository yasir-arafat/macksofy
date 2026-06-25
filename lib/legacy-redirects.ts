// Legacy PHP → Next.js URL map for the macksofy.com migration.
// See /root/macksofy-new-seo/migration/php_to_nextjs_redirects.md for rationale.
//
// Two lists:
//   PHP_REDIRECTS  — permanent 301s wired into next.config.ts
//   PHP_GONE       — 410 Gone responses returned by middleware.ts
// Adding/removing entries here updates both layers.

export type PhpRedirect = { source: string; destination: string };

export const PHP_REDIRECTS: PhpRedirect[] = [
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
