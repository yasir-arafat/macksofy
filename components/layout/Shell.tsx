"use client";

import { usePathname } from "next/navigation";
import { MotionConfig } from "framer-motion";
import type { ReactNode } from "react";

/**
 * Shell — decides whether to render the global site chrome (Header / Footer /
 * floating widgets) around the page.
 *
 * Paid-ad landing pages live under `/lp/*`. They render chrome-free for a
 * distraction-free, single-CTA experience (better ad Quality Score and
 * conversion rate). Every landing page supplies its own minimal header +
 * footer so business identity, contact info and the privacy-policy link
 * (required by Google Ads when collecting personal data) are still present.
 *
 * The Header/Footer/widget nodes are rendered by the (server) root layout and
 * passed in as props — the standard RSC pattern for conditionally mounting
 * server-rendered subtrees from a Client Component.
 */
export function Shell({
  header,
  footer,
  widgets,
  children,
}: {
  header: ReactNode;
  footer: ReactNode;
  widgets: ReactNode;
  children: ReactNode;
}) {
  const pathname = usePathname();
  const bare = pathname?.startsWith("/lp") ?? false;

  // reducedMotion="user": make every framer-motion animation on the site honour
  // the visitor's OS "reduce motion" setting (snap transform/opacity animations
  // to their end state). Pairs with the CSS @media (prefers-reduced-motion)
  // block in globals.css that handles plain CSS transitions/animations.
  if (bare) {
    return (
      <MotionConfig reducedMotion="user">
        <main id="main" className="flex-1">
          {children}
        </main>
      </MotionConfig>
    );
  }

  return (
    <MotionConfig reducedMotion="user">
      {header}
      <main
        id="main"
        className="flex-1"
        style={{ paddingTop: "var(--header-h, 80px)" }}
      >
        {children}
      </main>
      {footer}
      {widgets}
    </MotionConfig>
  );
}
