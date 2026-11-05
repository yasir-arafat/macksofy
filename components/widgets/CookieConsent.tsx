"use client";

import { useEffect, useState, type ComponentType } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  Cookie,
  X,
  ShieldCheck,
  LineChart,
  Megaphone,
  Settings2,
  type LucideIcon,
} from "lucide-react";

import {
  CONSENT_STORAGE_KEY,
  CONSENT_VERSION,
  CONSENT_EVENT,
  updateGtagConsent,
  type StoredConsent as Consent,
} from "@/lib/consent";

// Re-export the shared contract under the local names this component already
// uses, so the banner can never drift from ConsentMode / MetaPixel.
const STORAGE_KEY = CONSENT_STORAGE_KEY;
const VERSION = CONSENT_VERSION;

const ACCEPT_ALL = {
  necessary: true as const,
  functional: true,
  analytics: true,
  marketing: true,
};
const REJECT_NON_ESSENTIAL = {
  necessary: true as const,
  functional: false,
  analytics: false,
  marketing: false,
};

// Reject and Accept share one style so neither choice is visually favoured:
// same size, weight, colour and emphasis. Consent should be as easy to refuse
// as to give.
const CHOICE_BUTTON =
  "inline-flex items-center justify-center rounded-full bg-neon-cyan/15 ring-1 ring-neon-cyan/50 px-3.5 sm:px-4 h-9 text-xs font-bold text-neon-cyan hover:bg-neon-cyan/25 transition-colors";

export function CookieConsent() {
  const [show, setShow] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [prefs, setPrefs] = useState({
    functional: true,
    analytics: false,
    marketing: false,
  });

  // First-visit check + slide-up delay so the banner doesn't fight hero load.
  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const c = JSON.parse(stored) as Consent;
        if (c?.version === VERSION) return;
      }
    } catch {
      /* localStorage unavailable — still show the banner */
    }
    const t = window.setTimeout(() => setShow(true), 800);
    return () => window.clearTimeout(t);
  }, []);

  // Re-open hook: footer "Cookie preferences" link dispatches this event so
  // the user can revisit / change their decision without clearing storage.
  useEffect(() => {
    if (typeof window === "undefined") return;
    const onReopen = () => {
      try {
        const stored = window.localStorage.getItem(STORAGE_KEY);
        if (stored) {
          const c = JSON.parse(stored) as Consent;
          if (c?.version === VERSION) {
            setPrefs({
              functional: !!c.functional,
              analytics: !!c.analytics,
              marketing: !!c.marketing,
            });
          }
        }
      } catch {
        /* ignore */
      }
      setExpanded(true);
      setShow(true);
    };
    window.addEventListener("macksofy:cookie-consent-open", onReopen);
    return () =>
      window.removeEventListener("macksofy:cookie-consent-open", onReopen);
  }, []);

  const save = (choice: Omit<Consent, "version" | "decidedAt">) => {
    const c: Consent = {
      ...choice,
      version: VERSION,
      decidedAt: new Date().toISOString(),
    };
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(c));
    } catch {
      /* ignore */
    }
    setShow(false);
    // Tell Google Consent Mode v2 about the decision so GA4 / Ads switch
    // between cookieless pings and full measurement (M-04).
    updateGtagConsent(choice);
    // Broadcast to other listeners (e.g., the consent-gated Meta Pixel).
    window.dispatchEvent(new CustomEvent(CONSENT_EVENT, { detail: c }));
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          role="dialog"
          aria-modal="false"
          aria-labelledby="cookie-consent-title"
          aria-describedby="cookie-consent-desc"
          initial={{ y: 120, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 120, opacity: 0 }}
          transition={{ type: "spring", stiffness: 240, damping: 28 }}
          className="fixed inset-x-2 bottom-2 sm:inset-x-6 sm:bottom-6 z-[60] mx-auto max-w-3xl"
        >
          {/* Compact on phones: the first-visit banner covered ~37% of a 390x844
              viewport (icon + 6-line copy + wrapped buttons). It now stays under
              ~20%, and the Customise view scrolls instead of outgrowing the screen. */}
          <div className="relative max-h-[calc(100dvh-1rem)] overflow-x-hidden overflow-y-auto rounded-2xl glass-strong ring-1 ring-line shadow-[0_24px_60px_-12px_rgba(0,0,0,0.7)] backdrop-blur-xl">
            {/* Decorative glow strip */}
            <div
              aria-hidden
              className="absolute -top-20 -right-20 size-60 rounded-full bg-neon-cyan/15 blur-3xl pointer-events-none"
            />

            <div className="relative p-3.5 sm:p-6">
              <div className="flex items-start gap-3 sm:gap-4">
                <div className="hidden sm:grid size-10 place-items-center rounded-xl bg-neon-cyan/15 ring-1 ring-neon-cyan/40 text-neon-cyan shrink-0">
                  <Cookie className="size-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <h2
                    id="cookie-consent-title"
                    className="sr-only sm:not-sr-only font-display text-base font-bold text-fg"
                  >
                    Cookies — your choice.
                  </h2>
                  <p
                    id="cookie-consent-desc"
                    className="sm:mt-1 text-[13px] sm:text-sm text-fg-muted leading-snug sm:leading-relaxed"
                  >
                    We use cookies to keep the site working and remember your
                    preferences, and — only with your consent — to measure how
                    it is used. See our{" "}
                    <Link
                      href="/privacy"
                      className="text-neon-cyan font-semibold hover:underline"
                    >
                      privacy &amp; cookie policy
                    </Link>
                    .
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => save(REJECT_NON_ESSENTIAL)}
                  aria-label="Reject non-essential cookies and close"
                  className="grid size-8 shrink-0 place-items-center rounded-lg text-fg-faint hover:text-fg hover:bg-white/5 transition-colors"
                >
                  <X className="size-4" />
                </button>
              </div>

              {!expanded ? (
                <div className="mt-3 sm:mt-5 flex flex-wrap items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setExpanded(true)}
                    className="inline-flex items-center gap-1.5 rounded-full border border-line bg-bg-2/60 px-3.5 sm:px-4 h-9 text-xs font-semibold text-fg-muted hover:text-fg hover:border-line-strong transition-colors"
                  >
                    <Settings2 className="size-3.5" /> Customise
                  </button>
                  <div className="ml-auto flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => save(REJECT_NON_ESSENTIAL)}
                      aria-label="Reject non-essential cookies"
                      className={CHOICE_BUTTON}
                    >
                      <span className="sm:hidden">Reject</span>
                      <span className="hidden sm:inline">Reject non-essential</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => save(ACCEPT_ALL)}
                      className={CHOICE_BUTTON}
                    >
                      Accept all
                    </button>
                  </div>
                </div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden"
                >
                  <div className="mt-5 grid gap-3 sm:grid-cols-2">
                    <Category
                      icon={ShieldCheck}
                      title="Strictly necessary"
                      desc="Session, security and CSRF — needed for the site to work. These can't be switched off."
                      checked
                      locked
                    />
                    <Category
                      icon={Settings2}
                      title="Functional"
                      desc="Remembers preferences like dismissed widgets, region toggles and theme."
                      checked={prefs.functional}
                      onChange={(v) =>
                        setPrefs((p) => ({ ...p, functional: v }))
                      }
                    />
                    <Category
                      icon={LineChart}
                      title="Analytics"
                      desc="Aggregated, anonymised usage metrics so we can spot broken pages and prioritise content."
                      checked={prefs.analytics}
                      onChange={(v) =>
                        setPrefs((p) => ({ ...p, analytics: v }))
                      }
                    />
                    <Category
                      icon={Megaphone}
                      title="Marketing"
                      desc="Helps us measure which content drove your visit. Never sold to third parties."
                      checked={prefs.marketing}
                      onChange={(v) =>
                        setPrefs((p) => ({ ...p, marketing: v }))
                      }
                    />
                  </div>
                  <div className="mt-5 flex flex-wrap items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setExpanded(false)}
                      className="text-xs font-semibold text-fg-muted hover:text-fg"
                    >
                      ← Back
                    </button>
                    <button
                      type="button"
                      onClick={() => save(REJECT_NON_ESSENTIAL)}
                      className={`ml-auto ${CHOICE_BUTTON}`}
                    >
                      Reject non-essential
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        save({ necessary: true, ...prefs })
                      }
                      className={CHOICE_BUTTON}
                    >
                      Save preferences
                    </button>
                    <button
                      type="button"
                      onClick={() => save(ACCEPT_ALL)}
                      className={CHOICE_BUTTON}
                    >
                      Accept all
                    </button>
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function Category({
  icon: Icon,
  title,
  desc,
  checked,
  onChange,
  locked,
}: {
  icon: LucideIcon | ComponentType<{ className?: string }>;
  title: string;
  desc: string;
  checked: boolean;
  onChange?: (v: boolean) => void;
  locked?: boolean;
}) {
  return (
    <div
      className={`flex items-start gap-3 rounded-xl bg-bg-2/40 ring-1 ring-line p-3 ${
        locked ? "opacity-90" : "hover:ring-neon-cyan/40"
      } transition-all`}
    >
      <Icon className="size-5 text-neon-cyan shrink-0 mt-0.5" />
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-2">
          <span className="font-display text-sm font-bold text-fg leading-tight">
            {title}
          </span>
          {locked ? (
            <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-emerald-400 font-bold">
              Always on
            </span>
          ) : (
            <Toggle checked={checked} onChange={onChange!} label={title} />
          )}
        </div>
        <p className="mt-1.5 text-[12px] text-fg-muted leading-snug">{desc}</p>
      </div>
    </div>
  );
}

function Toggle({
  checked,
  onChange,
  label,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
  label: string;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={`Toggle ${label}`}
      onClick={() => onChange(!checked)}
      className={`relative inline-flex h-5 w-9 shrink-0 items-center rounded-full transition-colors ${
        checked ? "bg-neon-cyan" : "bg-bg-2 ring-1 ring-line"
      }`}
    >
      <span
        className={`inline-block size-4 transform rounded-full bg-white shadow transition-transform ${
          checked ? "translate-x-[18px]" : "translate-x-0.5"
        }`}
      />
    </button>
  );
}

/**
 * Small helper for other components to check the current consent on demand.
 * Returns null until a decision is stored. Returns a partial consent object
 * once decided.
 */
export function getCookieConsent():
  | (Omit<Consent, "version" | "decidedAt"> & { decidedAt: string })
  | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const c = JSON.parse(raw) as Consent;
    if (c.version !== VERSION) return null;
    return {
      necessary: true,
      functional: c.functional,
      analytics: c.analytics,
      marketing: c.marketing,
      decidedAt: c.decidedAt,
    };
  } catch {
    return null;
  }
}
