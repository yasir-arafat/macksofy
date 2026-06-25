/**
 * Cookie-consent contract shared by the banner (CookieConsent), the Consent
 * Mode v2 bootstrap (ConsentMode) and the gated Meta Pixel (MetaPixel).
 *
 * Centralised so the storage key / schema version can never drift between the
 * component that WRITES consent and the scripts that READ it — a drift here
 * would silently re-enable tracking before opt-in (the M-04 finding).
 */

export const CONSENT_STORAGE_KEY = "macksofy-cookie-consent";
export const CONSENT_VERSION = "v1";

export interface ConsentChoice {
  necessary: true;
  functional: boolean;
  analytics: boolean;
  marketing: boolean;
}

export interface StoredConsent extends ConsentChoice {
  version: string;
  decidedAt: string;
}

/** Browser CustomEvent name the banner dispatches on every decision. */
export const CONSENT_EVENT = "macksofy:cookie-consent";

/**
 * Push a Google Consent Mode v2 update to the live gtag instance when the user
 * makes/changes a choice. Calls the global `gtag` defined by the analytics
 * inline scripts so the `arguments` object is forwarded exactly as Google
 * expects. No-op on the server or before gtag has initialised.
 */
export function updateGtagConsent(choice: ConsentChoice): void {
  if (typeof window === "undefined") return;
  const gtag = (
    window as unknown as { gtag?: (...args: unknown[]) => void }
  ).gtag;
  if (typeof gtag !== "function") return;
  gtag("consent", "update", {
    analytics_storage: choice.analytics ? "granted" : "denied",
    ad_storage: choice.marketing ? "granted" : "denied",
    ad_user_data: choice.marketing ? "granted" : "denied",
    ad_personalization: choice.marketing ? "granted" : "denied",
  });
}
