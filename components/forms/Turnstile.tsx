"use client";

import { useEffect, useRef } from "react";

declare global {
  interface Window {
    turnstile?: {
      render: (
        container: string | HTMLElement,
        options: {
          sitekey: string;
          theme?: "auto" | "dark" | "light";
          size?: "normal" | "compact" | "flexible";
          appearance?: "always" | "execute" | "interaction-only";
          callback?: (token: string) => void;
          "error-callback"?: () => void;
          "expired-callback"?: () => void;
          "timeout-callback"?: () => void;
        }
      ) => string;
      reset: (widgetId: string) => void;
      remove: (widgetId: string) => void;
      execute: (widgetId: string) => void;
    };
  }
}

const SCRIPT_SRC =
  "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";

interface Props {
  siteKey: string;
  onVerify: (token: string) => void;
  onError?: () => void;
  onExpire?: () => void;
  theme?: "auto" | "dark" | "light";
  /** Bumping this value re-mounts the widget (use after a failed submit) */
  resetKey?: number;
}

/**
 * Cloudflare Turnstile widget — free, privacy-respecting bot challenge.
 * Falls back to Cloudflare's "always-passes" test keys when no env var is set,
 * so the form works in dev without configuration.
 *
 * Production keys: https://dash.cloudflare.com/?to=/:account/turnstile
 */
export function Turnstile({
  siteKey,
  onVerify,
  onError,
  onExpire,
  theme = "dark",
  resetKey = 0,
}: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    const loadScript = (): Promise<void> =>
      new Promise((resolve) => {
        if (typeof window === "undefined") return;
        if (window.turnstile) return resolve();
        const existing = document.querySelector<HTMLScriptElement>(
          `script[src="${SCRIPT_SRC}"]`
        );
        if (existing) {
          if (window.turnstile) {
            resolve();
          } else {
            existing.addEventListener("load", () => resolve(), { once: true });
          }
          return;
        }
        const script = document.createElement("script");
        script.src = SCRIPT_SRC;
        script.async = true;
        script.defer = true;
        script.onload = () => resolve();
        document.head.appendChild(script);
      });

    loadScript().then(() => {
      if (cancelled || !containerRef.current || !window.turnstile) return;
      // Clear previous widget when resetKey changes
      if (widgetIdRef.current) {
        try {
          window.turnstile.remove(widgetIdRef.current);
        } catch {
          /* ignore */
        }
        widgetIdRef.current = null;
      }
      widgetIdRef.current = window.turnstile.render(containerRef.current, {
        sitekey: siteKey,
        theme,
        size: "flexible",
        callback: onVerify,
        "error-callback": onError,
        "expired-callback": onExpire,
      });
    });

    return () => {
      cancelled = true;
      if (widgetIdRef.current && window.turnstile) {
        try {
          window.turnstile.remove(widgetIdRef.current);
        } catch {
          /* ignore */
        }
        widgetIdRef.current = null;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [siteKey, theme, resetKey]);

  return (
    <div
      ref={containerRef}
      className="cf-turnstile min-h-[65px]"
      data-testid="turnstile-widget"
    />
  );
}
