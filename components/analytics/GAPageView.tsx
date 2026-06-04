"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useRef } from "react";

/**
 * Fires a GA4 `page_view` on each *subsequent* App Router navigation.
 *
 * The initial pageview is sent by gtag's own `config` command (which runs as
 * soon as gtag.js loads, independent of React timing — see GoogleAnalytics.tsx).
 * gtag.js does NOT re-fire on client-side navigations, though: in the App
 * Router every link click swaps the route without a document reload, so without
 * this listener GA4 would only ever record each session's landing page.
 *
 * We deliberately SKIP the first effect run so we don't double-count the
 * landing page (config already counted it), then emit one page_view per route
 * change after that.
 *
 * Must be rendered inside a <Suspense> boundary: useSearchParams() opts the
 * subtree into client-side rendering and Next requires the boundary at build.
 */
export function GAPageView({ gaId }: { gaId: string }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  // gtag's `config` already sent the landing pageview — skip the mount run.
  const firstRun = useRef(true);

  useEffect(() => {
    if (firstRun.current) {
      firstRun.current = false;
      return;
    }

    const w = window as unknown as {
      dataLayer?: unknown[];
      gtag?: (...args: unknown[]) => void;
    };
    // Defensive: ensure a gtag stub exists so the event is queued into
    // dataLayer even in the rare case the library hasn't finished loading.
    w.dataLayer = w.dataLayer || [];
    if (typeof w.gtag !== "function") {
      w.gtag = function gtag() {
        // eslint-disable-next-line prefer-rest-params
        w.dataLayer!.push(arguments);
      };
    }

    const qs = searchParams?.toString();
    const page_path = qs ? `${pathname}?${qs}` : pathname;

    w.gtag("event", "page_view", {
      page_path,
      page_location: window.location.href,
      page_title: document.title,
      send_to: gaId,
    });
  }, [pathname, searchParams, gaId]);

  return null;
}
