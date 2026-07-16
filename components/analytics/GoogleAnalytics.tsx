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
 * The IDs are env-overridable so they can rotate without a code change:
 *    NEXT_PUBLIC_GA4_ID        — GA4 Measurement ID (defaults to the live property).
 *    NEXT_PUBLIC_GOOGLE_ADS_ID — Google Ads Google tag (G-/AW- prefix). Configured
 *                                as a second destination on the SAME gtag.js
 *                                instance, so Ads conversions + remarketing share
 *                                the one tag load (no second script, no extra CSP
 *                                origin). Conversion actions still fire via gtag
 *                                'event' calls / GTM triggers — this only registers
 *                                the Ads tag so those events have a destination.
 */
const GA4_ID = process.env.NEXT_PUBLIC_GA4_ID ?? "G-CMLLDWEPC3";
const ADS_ID = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID ?? "AW-959458305";

export function GoogleAnalytics() {
  if (!GA4_ID) return null;

  return (
    <>
      {/* lazyOnload: gtag.js (≈0.5–1 MB across the GA4 + Google Ads tags) is
          deferred until the browser is idle after `load`, so its parse/exec no
          longer competes with hydration on the main thread — a major TBT/INP
          win on mobile. Consent Mode defaults are still applied first
          (ConsentMode.tsx runs beforeInteractive and defines window.gtag +
          dataLayer), so the landing page_view is queued with correct consent
          and fires the moment gtag.js finishes loading. */}
      <Script
        id="ga4-src"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA4_ID}`}
        strategy="lazyOnload"
      />
      <Script id="ga4-init" strategy="lazyOnload">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA4_ID}');
          ${ADS_ID && ADS_ID !== GA4_ID ? `gtag('config', '${ADS_ID}');` : ""}
        `}
      </Script>
      <Suspense fallback={null}>
        <GAPageView gaId={GA4_ID} />
      </Suspense>
    </>
  );
}
