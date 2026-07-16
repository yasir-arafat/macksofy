"use client";

import { useCallback, useEffect, useRef, useState } from "react";

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
  // Defer loading Cloudflare's api.js (≈73 KB + widget render work) until the
  // form is actually near the viewport. On long marketing pages the form sits
  // far below the fold (e.g. the homepage LeadCapture section), so eager-loading
  // the challenge on mount added a third-party script + main-thread work to
  // every page for visitors who never scroll to the form. IntersectionObserver
  // with a 400px rootMargin means the widget is ready by the time the user
  // reaches it, and never loads at all otherwise.
  const [inView, setInView] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);

  // Callback ref: wire up the IntersectionObserver the instant the container
  // node attaches to the DOM. A plain useEffect([]) can run before the ref is
  // populated during the production hydration pass and then never retry (its
  // deps never change), leaving the observer un-armed — which is exactly why an
  // effect-based version worked in dev but silently no-op'd in the prod build.
  // A callback ref fires deterministically on mount/unmount, so it's immune to
  // that mount-timing difference.
  const setContainer = useCallback((node: HTMLDivElement | null) => {
    containerRef.current = node;
    observerRef.current?.disconnect();
    observerRef.current = null;
    if (!node) return;
    if (typeof IntersectionObserver === "undefined") {
      setInView(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setInView(true);
          io.disconnect();
        }
      },
      { rootMargin: "400px" }
    );
    io.observe(node);
    observerRef.current = io;
  }, []);

  useEffect(() => {
    if (!inView) return;
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
  }, [inView, siteKey, theme, resetKey]);

  return (
    <div
      ref={setContainer}
      className="cf-turnstile min-h-[65px]"
      data-testid="turnstile-widget"
    />
  );
}
