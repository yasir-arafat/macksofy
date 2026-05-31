import type { Metadata } from "next";
import Script from "next/script";

/**
 * Layout for paid-ad landing pages (/lp/*).
 *
 *  • Loads Google Analytics 4 (gtag.js) and — when configured — a Google Tag
 *    Manager container, so Google Ads can measure the `generate_lead`
 *    conversion fired on the thank-you page.
 *  • Marks every landing page `noindex` (follow) — these are dedicated paid
 *    pages and should stay out of the organic Search index. They are NOT in
 *    sitemap.ts (which is built from explicit content arrays), so no extra
 *    exclusion is needed.
 *
 * IDs are read from env so they can rotate without a deploy:
 *    NEXT_PUBLIC_GA4_ID  — GA4 Measurement ID  (defaults to the live property)
 *    NEXT_PUBLIC_GTM_ID  — GTM container ID     (optional; e.g. GTM-XXXXXXX)
 */
const GA4_ID = process.env.NEXT_PUBLIC_GA4_ID ?? "G-EM9DC46JX3";
const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID ?? "";
// Note: the Meta Pixel base code lives site-wide in the root layout's <head>
// (app/layout.tsx). It is intentionally NOT duplicated here — the /lp pages
// inherit it. The `Lead` conversion still fires on the thank-you page.

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
  return (
    <>
      {/* Google Analytics 4 — gtag.js */}
      {GA4_ID && (
        <>
          <Script
            id="ga4-src"
            src={`https://www.googletagmanager.com/gtag/js?id=${GA4_ID}`}
            strategy="afterInteractive"
          />
          <Script id="ga4-init" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GA4_ID}');
            `}
          </Script>
        </>
      )}

      {/* Google Tag Manager (optional — set NEXT_PUBLIC_GTM_ID to enable) */}
      {GTM_ID && (
        <>
          <Script id="gtm-init" strategy="afterInteractive">
            {`
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','${GTM_ID}');
            `}
          </Script>
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
              height="0"
              width="0"
              style={{ display: "none", visibility: "hidden" }}
            />
          </noscript>
        </>
      )}

      {children}
    </>
  );
}
