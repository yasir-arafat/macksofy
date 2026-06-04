import type { Metadata } from "next";
import Script from "next/script";

/**
 * Layout for paid-ad landing pages (/lp/*).
 *
 *  • Loads an optional Google Tag Manager container so Google Ads can measure
 *    the `generate_lead` conversion fired on the thank-you page.
 *  • Marks every landing page `noindex` (follow) — these are dedicated paid
 *    pages and should stay out of the organic Search index. They are NOT in
 *    sitemap.ts (which is built from explicit content arrays), so no extra
 *    exclusion is needed.
 *
 * Note: Google Analytics 4 (gtag.js) is loaded site-wide in the root layout
 * (components/analytics/GoogleAnalytics.tsx) and inherited here — it is NOT
 * loaded again, to avoid a double gtag instance. The Meta Pixel likewise lives
 * site-wide in the root layout's <head>. Only GTM is /lp-scoped.
 *
 * GTM ID is read from env so it can rotate without a deploy:
 *    NEXT_PUBLIC_GTM_ID  — GTM container ID  (optional; e.g. GTM-XXXXXXX)
 */
const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID ?? "";

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
