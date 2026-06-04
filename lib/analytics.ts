/**
 * Client-side analytics helpers.
 *
 * GA4 (gtag.js) is loaded site-wide in components/analytics/GoogleAnalytics.tsx.
 * These helpers fire conversion events into the same gtag/dataLayer instance.
 *
 * In GA4, mark the `generate_lead` event as a "key event" (Admin → Events) once
 * and every lead source below counts as a conversion — segment by the
 * `form_location` parameter (e.g. "contact_page" vs "google_ads_lp").
 */

type LeadParams = {
  /** Where the lead came from, e.g. "contact_page", "google_ads_lp". */
  form_location: string;
  /** Free-form lead category, e.g. the selected interest / course. */
  lead_type?: string;
  /** What the user is interested in (contact form "interest" field). */
  interest?: string;
  /** Optional monetary value for value-based bidding / reporting. */
  value?: number;
  currency?: string;
};

/**
 * Fire a GA4 `generate_lead` conversion. Safe to call from any client event
 * handler — no-ops on the server and degrades gracefully if gtag hasn't loaded
 * yet (the event is still queued into dataLayer for GTM consumers).
 */
export function trackGenerateLead(params: LeadParams): void {
  if (typeof window === "undefined") return;

  const w = window as unknown as {
    dataLayer?: Record<string, unknown>[];
    gtag?: (...args: unknown[]) => void;
  };

  // dataLayer push — consumed by GTM (and queued for gtag before it loads).
  w.dataLayer = w.dataLayer || [];
  w.dataLayer.push({ event: "generate_lead", ...params });

  // Direct GA4 event — works even before any GTM container is configured.
  if (typeof w.gtag === "function") {
    w.gtag("event", "generate_lead", params);
  }
}
