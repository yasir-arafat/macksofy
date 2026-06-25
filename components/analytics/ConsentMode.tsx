import Script from "next/script";
import { CONSENT_STORAGE_KEY, CONSENT_VERSION } from "@/lib/consent";

/**
 * Google Consent Mode v2 — MUST run before gtag.js / GTM so the very first hit
 * is consent-aware. Defaults every non-essential storage to "denied"
 * (GDPR / ePrivacy / India DPDP: no analytics or advertising cookies/identifiers
 * until the visitor opts in via the cookie banner).
 *
 * While denied, Google sends cookieless "consent pings" (no identifiers stored)
 * — the recommended compliant pattern, so aggregate measurement still works
 * without violating consent. CookieConsent.save() later calls
 * gtag('consent','update', …) (see lib/consent.ts) when the user decides.
 *
 * Returning visitors who already chose get their stored decision applied here,
 * before the first page_view, so they aren't tracked/untracked incorrectly on
 * the landing hit. Keys are JSON.stringified into the inline script defensively.
 */
export function ConsentMode() {
  return (
    // beforeInteractive in the ROOT LAYOUT is the App-Router-sanctioned place
    // for this (it must execute before gtag.js / GTM). The lint rule targets the
    // legacy pages/_document.js model and is a false positive here.
    // eslint-disable-next-line @next/next/no-before-interactive-script-outside-document
    <Script id="consent-mode-default" strategy="beforeInteractive">
      {`
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('consent','default',{
          ad_storage:'denied',
          ad_user_data:'denied',
          ad_personalization:'denied',
          analytics_storage:'denied',
          functionality_storage:'denied',
          personalization_storage:'denied',
          security_storage:'granted',
          wait_for_update:500
        });
        try{
          var c = JSON.parse(localStorage.getItem(${JSON.stringify(
            CONSENT_STORAGE_KEY
          )})||'null');
          if(c && c.version===${JSON.stringify(CONSENT_VERSION)}){
            gtag('consent','update',{
              analytics_storage:c.analytics?'granted':'denied',
              ad_storage:c.marketing?'granted':'denied',
              ad_user_data:c.marketing?'granted':'denied',
              ad_personalization:c.marketing?'granted':'denied'
            });
          }
        }catch(e){}
      `}
    </Script>
  );
}
