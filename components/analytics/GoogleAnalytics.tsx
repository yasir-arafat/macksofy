import Script from "next/script";
import { Suspense } from "react";
import { GAPageView } from "./GAPageView";

/**
 * Site-wide Google Analytics 4 (gtag.js).
 *
 * Loaded once in the root layout so every page — marketing pages, blog, audits,
 * locations and the /lp paid landing pages nested below — reports to GA4. The
 * `generate_lead` conversion on the /lp thank-you page (components/lp/
 * ConversionPing.tsx) reuses the same gtag instance, so GA4 must NOT be loaded a
 * second time inside app/lp/layout.tsx.
 *
 * `send_page_view:false` defers all pageview accounting to <GAPageView/>, which
 * fires one page_view per App Router navigation (the initial load included).
 *
 * The Measurement ID is env-overridable so it can rotate without a code change:
 *    NEXT_PUBLIC_GA4_ID — GA4 Measurement ID (defaults to the live property).
 */
const GA4_ID = process.env.NEXT_PUBLIC_GA4_ID ?? "G-DYZL44TQ73";

export function GoogleAnalytics() {
  if (!GA4_ID) return null;

  return (
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
          gtag('config', '${GA4_ID}', { send_page_view: false });
        `}
      </Script>
      <Suspense fallback={null}>
        <GAPageView gaId={GA4_ID} />
      </Suspense>
    </>
  );
}
