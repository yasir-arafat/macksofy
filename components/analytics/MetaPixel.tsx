"use client";

import { useEffect } from "react";
import {
  CONSENT_STORAGE_KEY,
  CONSENT_VERSION,
  CONSENT_EVENT,
  type StoredConsent,
} from "@/lib/consent";

type FbqArgs = unknown[];
interface Fbq {
  (...args: FbqArgs): void;
  callMethod?: (...args: FbqArgs) => void;
  queue: FbqArgs[];
  push: Fbq;
  loaded: boolean;
  version: string;
}
declare global {
  interface Window {
    fbq?: Fbq;
    _fbq?: Fbq;
  }
}

// Module-scoped guard: initialise the pixel at most once per page load no
// matter how many times consent fires.
let pixelLoaded = false;

function loadPixel(id: string) {
  if (pixelLoaded || typeof window === "undefined" || window.fbq) return;
  pixelLoaded = true;

  // Standard Meta Pixel bootstrap, reimplemented in typed TS (no inline-script
  // injection — stays compatible with a future nonce-based CSP, see L-02).
  // fbevents.js loads from connect.facebook.net, already in the CSP allowlist.
  const fbq = function (...args: FbqArgs) {
    if (fbq.callMethod) fbq.callMethod(...args);
    else fbq.queue.push(args);
  } as Fbq;
  fbq.queue = [];
  fbq.push = fbq;
  fbq.loaded = true;
  fbq.version = "2.0";
  window.fbq = fbq;
  window._fbq = fbq;

  const script = document.createElement("script");
  script.async = true;
  script.src = "https://connect.facebook.net/en_US/fbevents.js";
  document.head.appendChild(script);

  window.fbq("init", id);
  window.fbq("track", "PageView");
}

function marketingGranted(): boolean {
  try {
    const c = JSON.parse(
      localStorage.getItem(CONSENT_STORAGE_KEY) || "null"
    ) as StoredConsent | null;
    return Boolean(c && c.version === CONSENT_VERSION && c.marketing);
  } catch {
    return false;
  }
}

/**
 * Consent-gated Meta (Facebook) Pixel. Loads ONLY after the visitor grants
 * "marketing" consent via the cookie banner (GDPR / ePrivacy / DPDP). Replaces
 * the previous unconditional inline pixel in the root layout that fired
 * PageView on every load regardless of consent (M-04).
 */
export function MetaPixel({ pixelId }: { pixelId: string }) {
  useEffect(() => {
    if (!pixelId) return;
    if (marketingGranted()) loadPixel(pixelId);

    const onConsent = (e: Event) => {
      const detail = (e as CustomEvent<StoredConsent>).detail;
      if (detail?.marketing) loadPixel(pixelId);
    };
    window.addEventListener(CONSENT_EVENT, onConsent);
    return () => window.removeEventListener(CONSENT_EVENT, onConsent);
  }, [pixelId]);

  return null;
}
