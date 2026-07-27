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
 * INP detail — mounting must never happen INSIDE the interaction that triggers
 * it. The previous version called setReady(true) straight from the
 * `pointerdown` listener, so the first tap on the page synchronously mounted
 * five dynamic components: that work landed in the same task as the tap and
 * was charged directly to INP (this is the classic "first interaction is the
 * slowest" pattern). Now the interaction only *schedules* the mount, one frame
 * later, after the browser has painted the tap's own visual response.
 *
 * The widgets are also mounted in two waves so the five chunk evaluations
 * don't merge into a single long task:
 *   wave 1 — the two the visitor may need immediately (cookie banner, WhatsApp)
 *   wave 2 — the rest, on the next idle slot
 *
 * The idle timeout / interaction fallback guarantees the cookie banner and
 * WhatsApp button still appear promptly on every device, including ones
 * without requestIdleCallback.
 */
function useDeferredMount() {
  const [wave, setWave] = useState(0);

  useEffect(() => {
    if (wave > 0) return;
    let done = false;

    /**
     * Yield before mounting. rAF gets us past the current task and lets the
     * browser paint the interaction's own feedback first; the nested timeout
     * then runs the mount in a fresh task rather than in the frame's critical
     * path. This is the "yield to main thread" pattern — the interaction stays
     * short, the expensive work happens after it has been measured.
     */
    const go = () => {
      if (done) return;
      done = true;
      requestAnimationFrame(() => {
        setTimeout(() => setWave(1), 0);
      });
    };

    // First interaction should surface the widgets promptly (but not inside
    // the interaction itself — see go()).
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
  }, [wave]);

  // Second wave: the non-urgent widgets, on the next idle slot after wave 1.
  useEffect(() => {
    if (wave !== 1) return;
    let idleId: number | undefined;
    let timerId: ReturnType<typeof setTimeout> | undefined;
    const promote = () => setWave(2);
    if (typeof window.requestIdleCallback === "function") {
      idleId = window.requestIdleCallback(promote, { timeout: 4000 });
    } else {
      timerId = setTimeout(promote, 1200);
    }
    return () => {
      if (idleId !== undefined && typeof window.cancelIdleCallback === "function") {
        window.cancelIdleCallback(idleId);
      }
      if (timerId !== undefined) clearTimeout(timerId);
    };
  }, [wave]);

  return wave;
}

export function LazyClientWidgets() {
  const wave = useDeferredMount();
  if (wave === 0) return null;

  return (
    <>
      {/* Wave 1 — consent banner (legal) + the primary contact affordance. */}
      <CookieConsent />
      <StickyWhatsApp />
      {/* Wave 2 — nice-to-haves, mounted on a later idle slot. */}
      {wave >= 2 && (
        <>
          <BackToTop />
          <Chatbot />
          <LeadMagnetPopup />
        </>
      )}
    </>
  );
}
