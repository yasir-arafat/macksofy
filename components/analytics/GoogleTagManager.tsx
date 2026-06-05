import Script from "next/script";

/**
 * Site-wide Google Tag Manager container.
 *
 * Loaded once in the root layout so GTM is present on EVERY page — the contact
 * form (anywhere on the site) and the /lp paid landing pages both push a
 * `generate_lead` event to `window.dataLayer`, and a GTM "Custom Event" trigger
 * on that event fires the Google Ads Conversion tag. Loading GTM only on /lp
 * (the old behaviour) missed every contact-page conversion.
 *
 * Inert until configured: renders nothing unless NEXT_PUBLIC_GTM_ID is set, so
 * the container ID can be added in Vercel env without a code change.
 *    NEXT_PUBLIC_GTM_ID — GTM container ID (e.g. GTM-XXXXXXX).
 *
 * Note on double-counting: GA4 + the Google Ads *Google tag* are loaded via
 * gtag.js (components/analytics/GoogleAnalytics.tsx). Keep this GTM container
 * scoped to the Ads *Conversion* tag (+ Conversion Linker) only — do NOT also
 * configure GA4/pageview tags inside it, or hits double-fire.
 */
const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID ?? "";

export function GoogleTagManager() {
  if (!GTM_ID) return null;

  return (
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
          title="gtm"
        />
      </noscript>
    </>
  );
}
