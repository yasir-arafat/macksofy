"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useEffect } from "react";

/**
 * Fires a GA4 `page_view` on every App Router navigation.
 *
 * gtag.js only auto-sends a pageview on the initial document load. In the Next
 * App Router, every link click is a client-side navigation that never reloads
 * the document, so without this listener GA4 would record only the landing page
 * of each session. We disable the automatic pageview in the gtag `config`
 * (send_page_view:false in GoogleAnalytics.tsx) and emit every pageview here —
 * including the first — so each route change is counted exactly once.
 *
 * Must be rendered inside a <Suspense> boundary: useSearchParams() opts the
 * subtree into client-side rendering and Next requires the boundary at build.
 */
export function GAPageView({ gaId }: { gaId: string }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const w = window as unknown as { gtag?: (...args: unknown[]) => void };
    if (typeof w.gtag !== "function") return;

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
