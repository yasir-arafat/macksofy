import type { Metadata } from "next";

/**
 * Layout for paid-ad landing pages (/lp/*).
 *
 *  • Marks every landing page `noindex` (follow) — these are dedicated paid
 *    pages and should stay out of the organic Search index. They are NOT in
 *    sitemap.ts (which is built from explicit content arrays), so no extra
 *    exclusion is needed.
 *
 * Tagging is all inherited from the root layout and NOT re-loaded here (doing so
 * would double-fire): Google Tag Manager (components/analytics/GoogleTagManager),
 * Google Analytics 4 + the Google Ads Google tag (GoogleAnalytics.tsx), and the
 * Meta Pixel (root <head>) are all site-wide. The `generate_lead` conversion on
 * the thank-you page is caught by the site-wide GTM container.
 */

export const metadata: Metadata = {
  // Neutralise the root layout's "%s | Macksofy" title template for all
  // landing pages — each page sets its own full, self-contained title.
  title: { template: "%s", default: "Macksofy" },
  robots: { index: false, follow: true },
};

export default function LandingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
