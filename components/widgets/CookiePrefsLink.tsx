"use client";

import { useCallback } from "react";

/**
 * Footer trigger that re-opens the CookieConsent banner (in customise mode)
 * without clearing the user's stored decision. Fires a CustomEvent that the
 * banner listens for — no Redux, no global state.
 */
export function CookiePrefsLink({
  className = "",
  children = "Cookie preferences",
}: {
  className?: string;
  children?: React.ReactNode;
}) {
  const onClick = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (typeof window === "undefined") return;
    window.dispatchEvent(new CustomEvent("macksofy:cookie-consent-open"));
  }, []);

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label="Open cookie preferences"
      className={className}
    >
      {children}
    </button>
  );
}
