"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const StickyWhatsApp = dynamic(
  () => import("./StickyWhatsApp").then((m) => m.StickyWhatsApp),
  { ssr: false }
);
const Chatbot = dynamic(
  () => import("./Chatbot").then((m) => m.Chatbot),
  { ssr: false }
);
const LeadMagnetPopup = dynamic(
  () => import("./LeadMagnetPopup").then((m) => m.LeadMagnetPopup),
  { ssr: false }
);
const BackToTop = dynamic(
  () => import("./BackToTop").then((m) => m.BackToTop),
  { ssr: false }
);
const CookieConsent = dynamic(
  () => import("./CookieConsent").then((m) => m.CookieConsent),
  { ssr: false }
);

/**
 * Defer mounting the floating widgets until the main thread is idle (or the
 * visitor first interacts). Each widget is already `ssr: false`, but a bare
 * `dynamic()` still starts fetching + hydrating its chunk during the initial
 * hydration pass — five framer-motion widgets' worth of work competing with the
 * page becoming interactive, which inflates TBT/INP on mobile.
 *
 * Gating the mount behind requestIdleCallback (with a first-interaction escape
 * hatch and a hard timeout) keeps all five chunks off the critical path: none
 * of them is needed for first paint or first interaction. The idle timeout /
 * interaction fallback guarantees the cookie banner and WhatsApp button still
 * appear promptly on every device, including ones without rIC.
 */
function useDeferredMount() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (ready) return;
    let done = false;
    const go = () => {
      if (done) return;
      done = true;
      setReady(true);
    };

    // First interaction should surface the widgets immediately.
    const events = ["pointerdown", "keydown", "touchstart", "scroll"] as const;
    events.forEach((e) =>
      window.addEventListener(e, go, { once: true, passive: true })
    );

    // Otherwise mount once the browser is idle (capped so it always happens).
    let idleId: number | undefined;
    let timerId: ReturnType<typeof setTimeout> | undefined;
    if (typeof window.requestIdleCallback === "function") {
      idleId = window.requestIdleCallback(go, { timeout: 3000 });
    } else {
      timerId = setTimeout(go, 2000);
    }

    return () => {
      events.forEach((e) => window.removeEventListener(e, go));
      if (idleId !== undefined && typeof window.cancelIdleCallback === "function") {
        window.cancelIdleCallback(idleId);
      }
      if (timerId !== undefined) clearTimeout(timerId);
    };
  }, [ready]);

  return ready;
}

export function LazyClientWidgets() {
  const ready = useDeferredMount();
  if (!ready) return null;

  return (
    <>
      <StickyWhatsApp />
      <Chatbot />
      <LeadMagnetPopup />
      <BackToTop />
      <CookieConsent />
    </>
  );
}
