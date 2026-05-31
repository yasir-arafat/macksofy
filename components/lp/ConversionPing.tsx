"use client";

import { useEffect } from "react";

const GA4_ID = process.env.NEXT_PUBLIC_GA4_ID ?? "G-EM9DC46JX3";

/**
 * Fires the lead conversion exactly once, on mount of the thank-you page.
 *
 * Reaching the thank-you URL == a real, server-accepted lead, so this is the
 * canonical "conversion" signal:
 *   • dataLayer push `generate_lead`  → wire a GTM trigger (Custom Event =
 *     generate_lead) to your Google Ads conversion tag.
 *   • gtag('event', 'generate_lead')  → also records it directly in GA4, so it
 *     works even before GTM is configured.
 *
 * Configure the Google Ads conversion either as a GTM-fired event on
 * `generate_lead`, or as a destination conversion on the thank-you URL.
 */
export function ConversionPing({
  value = 50000,
  currency = "INR",
  course = "CEH v13",
}: {
  value?: number;
  currency?: string;
  course?: string;
}) {
  useEffect(() => {
    const w = window as unknown as {
      dataLayer?: Record<string, unknown>[];
      gtag?: (...args: unknown[]) => void;
      fbq?: (...args: unknown[]) => void;
    };
    w.dataLayer = w.dataLayer || [];
    w.dataLayer.push({
      event: "generate_lead",
      lead_type: "ceh_v13",
      form_location: "google_ads_lp",
      currency,
      value,
      course,
    });
    if (typeof w.gtag === "function") {
      w.gtag("event", "generate_lead", { currency, value, course });
    }
    // Meta (Facebook/Instagram) Pixel conversion.
    if (typeof w.fbq === "function") {
      w.fbq("track", "Lead", { content_name: course, currency, value });
    }
  }, [value, currency, course]);

  return null;
}
