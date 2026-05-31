"use client";

import { usePathname } from "next/navigation";
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

  if (bare) {
    return (
      <main id="main" className="flex-1">
        {children}
      </main>
    );
  }

  return (
    <>
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
    </>
  );
}
