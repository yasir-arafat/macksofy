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
 * The `config` command sends the reliable initial pageview (it fires whenever
 * gtag.js finishes loading, with no dependency on React effect timing).
 * <GAPageView/> then sends one page_view per *subsequent* App Router navigation
 * (it skips the first run so the landing page isn't double-counted).
 *
 * The Measurement ID is env-overridable so it can rotate without a code change:
 *    NEXT_PUBLIC_GA4_ID — GA4 Measurement ID (defaults to the live property).
 */
const GA4_ID = process.env.NEXT_PUBLIC_GA4_ID ?? "G-CMLLDWEPC3";

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
          gtag('config', '${GA4_ID}');
        `}
      </Script>
      <Suspense fallback={null}>
        <GAPageView gaId={GA4_ID} />
      </Suspense>
    </>
  );
}
