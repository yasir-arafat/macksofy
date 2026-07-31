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
 *                                instance — one <Script> tag, not two. Conversion
 *                                actions still fire via gtag 'event' calls / GTM
 *                                triggers; this only registers the Ads tag so
 *                                those events have a destination.
 *
 *                                It is NOT free, and an earlier version of this
 *                                comment claimed it was ("no second script, no
 *                                extra CSP origin"). Measured on the homepage,
 *                                the gtag('config','AW-…') call makes gtag.js go
 *                                and fetch a second container script of its own
 *                                (gtag/js?id=AW-…&cx=c) and beacon to a third
 *                                origin, pagead2.googlesyndication.com:
 *
 *                                  3903–4188 ms  gtag/js?id=G-…      (GA4)
 *                                  4418–4641 ms  gtag/js?id=AW-…     (Ads)
 *                                  5297–5403 ms  pagead2…/ccm/collect
 *                                  5332–5459 ms  google-analytics…/g/collect
 *
 *                                That second fetch happens on EVERY route, not
 *                                just the conversion pages. If remarketing
 *                                coverage doesn't actually need site-wide reach,
 *                                scoping the Ads config to /lp + /contact removes
 *                                it everywhere else.
 */
const GA4_ID = process.env.NEXT_PUBLIC_GA4_ID ?? "G-CMLLDWEPC3";
const ADS_ID = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID ?? "AW-959458305";

export function GoogleAnalytics() {
  if (!GA4_ID) return null;

  return (
    <>
      {/* lazyOnload: gtag.js is deferred until the browser is idle after
          `load`, so its parse/exec doesn't compete with hydration.
          Consent Mode defaults are applied first (ConsentMode.tsx runs
          beforeInteractive and defines window.gtag + dataLayer), so the landing
          page_view is queued with correct consent and fires the moment gtag.js
          finishes loading.

          Measured, homepage, desktop 1440x900 @4x CPU throttle, 5 runs, so the
          next person doesn't have to re-derive the tradeoff:

            • gtag costs ~483 ms of ScriptDuration (1535 ms live vs 1052 ms with
              googletagmanager/google-analytics/googleadservices blocked).
            • It does NOT show up in INP. Worst INP-eligible interaction was
              216 ms live vs 224 ms blocked, with a click dispatched at 4000 ms
              i.e. deliberately inside gtag's own execution window. The ranges
              overlap; there is no effect to find. Deferring it is *why* — don't
              read this as "gtag is cheap".
            • The cost is data, not latency: the first request doesn't leave
              until ~3.9 s (load fires at ~0.7 s), so sessions that end before
              then are never counted.

          So if GA4 numbers ever look low against server logs, that gap is this
          line, and moving to afterInteractive buys the sessions back at roughly
          483 ms of main-thread work during hydration. INP is not the reason to
          keep lazyOnload; TBT is. */}
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
