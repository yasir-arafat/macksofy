"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Send, CheckCircle2, AlertTriangle, ShieldCheck, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Turnstile } from "./Turnstile";

// ---------------------------------------------------------------------------
// Schema
// ---------------------------------------------------------------------------
const Schema = z.object({
  name: z.string().min(2, "Please enter your full name"),
  email: z.string().email("Enter a valid email"),
  phone: z.string().min(7, "Enter a valid phone number"),
  company: z.string().optional(),
  interest: z.string().min(1, "Pick what you're interested in"),
  message: z.string().min(10, "Tell us a bit about your requirement"),
  website: z.string().optional(), // honeypot — must be empty
});
type FormValues = z.infer<typeof Schema>;

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------
const INTERESTS = [
  {
    group: "Services",
    items: [
      "Penetration Testing", "VAPT", "SOC Setup & SIEM", "Web & API Security",
      "Cloud Security", "Red Teaming", "DFIR", "Malware Analysis", "Threat Intelligence",
    ],
  },
  {
    group: "Audit & Compliance",
    items: [
      "Cybersecurity Audit", "CERT-In Audit", "RBI / PCI VAPT",
      "ISO 27001", "Risk Assessment", "Compliance (multi-framework)",
    ],
  },
  {
    group: "Training",
    items: ["CEH v13", "OSCP", "SOC Analyst", "Web App Security", "Corporate Training"],
  },
  {
    group: "Other",
    items: ["Sales conversation", "Partnership", "Press / Media", "Careers"],
  },
];

// Use the test key in dev. Set NEXT_PUBLIC_TURNSTILE_SITE_KEY in .env.local for production.
// Test key "1x00000000000000000000AA" always verifies successfully on the client.
// IMPORTANT: pair it with the test secret "1x0000000000000000000000000000000AA" on the server.
const TURNSTILE_SITE_KEY =
  process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ?? "1x00000000000000000000AA";

// ---------------------------------------------------------------------------
// ContactForm
// ---------------------------------------------------------------------------
export function ContactForm({ initialInterest = "" }: { initialInterest?: string }) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting, touchedFields },
    reset,
    trigger,
  } = useForm<FormValues>({
    resolver: zodResolver(Schema),
    defaultValues: { interest: initialInterest, website: "" },
    mode: "onChange", // validate on every keystroke for realtime feedback
  });

  const [status, setStatus] = useState<"idle" | "ok" | "error">("idle");
  const [statusMessage, setStatusMessage] = useState("");

  // --- Turnstile state ---
  // BUG FIX: track the token in a ref AND state so the submit handler always
  // reads the latest value without needing it in useCallback deps.
  const cfTokenRef = useRef("");
  const [cfToken, setCfToken] = useState("");
  const [cfError, setCfError] = useState(false);
  const [cfExpired, setCfExpired] = useState(false);
  // Incrementing this key unmounts + remounts the Turnstile widget, forcing a
  // fresh challenge. We bump it after every submit (success or failure) and
  // whenever the user manually requests a retry.
  const [resetKey, setResetKey] = useState(0);

  const setToken = useCallback((token: string) => {
    cfTokenRef.current = token;
    setCfToken(token);
  }, []);

  const clearToken = useCallback(() => {
    cfTokenRef.current = "";
    setCfToken("");
  }, []);

  const bumpWidget = useCallback(() => {
    clearToken();
    setCfError(false);
    setCfExpired(false);
    setResetKey((k) => k + 1);
  }, [clearToken]);

  // Warn the user when the token expires mid-session
  useEffect(() => {
    if (cfExpired) {
      setStatus("error");
      setStatusMessage("Verification expired — please complete the check again.");
    }
  }, [cfExpired]);

  // --- Submit ---
  async function onSubmit(values: FormValues) {
    setStatus("idle");
    setCfError(false);

    // Honeypot check (belt-and-braces; server also checks)
    if (values.website) {
      // Silent drop — don't tell a bot it failed
      return;
    }

    // Read from ref so we never use a stale closure value
    const token = cfTokenRef.current;
    if (!token) {
      setStatus("error");
      setStatusMessage("Please complete the human-verification check below.");
      return;
    }

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, cfToken: token }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error ?? "Submission failed");

      setStatus("ok");
      setStatusMessage(data.message ?? "Thanks — we'll be in touch shortly.");
      reset();
      bumpWidget();
    } catch (err) {
      setStatus("error");
      setStatusMessage(err instanceof Error ? err.message : "Something went wrong");
      // Always issue a fresh challenge after a failure so the token can't be
      // replayed and the user isn't stuck with a permanently-disabled button.
      bumpWidget();
    }
  }

  // Watch fields so the "verified" badge / button state reacts in real time
  const watchedValues = watch();

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
      {/* Name + Email */}
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Full name *" error={errors.name?.message}>
          <input
            type="text"
            autoComplete="name"
            className={inputCls(!!errors.name, touchedFields.name && !errors.name)}
            {...register("name")}
            onBlur={() => trigger("name")}
          />
        </Field>
        <Field label="Work email *" error={errors.email?.message}>
          <input
            type="email"
            autoComplete="email"
            className={inputCls(!!errors.email, touchedFields.email && !errors.email)}
            {...register("email")}
            onBlur={() => trigger("email")}
          />
        </Field>
      </div>

      {/* Phone + Company */}
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Phone (with country code) *" error={errors.phone?.message}>
          <input
            type="tel"
            autoComplete="tel"
            placeholder="+91 99308 24239"
            className={inputCls(!!errors.phone, touchedFields.phone && !errors.phone)}
            {...register("phone")}
            onBlur={() => trigger("phone")}
          />
        </Field>
        <Field label="Company" error={errors.company?.message}>
          <input
            type="text"
            autoComplete="organization"
            className={inputCls(false, !!(touchedFields.company && watchedValues.company))}
            {...register("company")}
          />
        </Field>
      </div>

      {/* Interest */}
      <Field label="I'm interested in *" error={errors.interest?.message}>
        <select
          className={inputCls(!!errors.interest, touchedFields.interest && !errors.interest)}
          {...register("interest")}
          onBlur={() => trigger("interest")}
        >
          <option value="">Choose an option</option>
          {INTERESTS.map((g) => (
            <optgroup key={g.group} label={g.group}>
              {g.items.map((i) => (
                <option key={i} value={i}>
                  {i}
                </option>
              ))}
            </optgroup>
          ))}
        </select>
      </Field>

      {/* Message */}
      <Field label="Tell us about your requirement *" error={errors.message?.message}>
        <textarea
          rows={5}
          className={inputCls(!!errors.message, touchedFields.message && !errors.message)}
          {...register("message")}
          onBlur={() => trigger("message")}
        />
      </Field>

      {/* ------------------------------------------------------------------ */}
      {/* HONEYPOT — invisible to real users, irresistible to bots.           */}
      {/* BUG FIX: use only inline style (not className="absolute …") so the  */}
      {/* element is taken out of normal flow without affecting parent layout. */}
      {/* ------------------------------------------------------------------ */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          left: "-9999px",
          top: "auto",
          height: "1px",
          width: "1px",
          overflow: "hidden",
        }}
      >
        <label>
          Website (leave blank)
          <input type="text" tabIndex={-1} autoComplete="off" {...register("website")} />
        </label>
      </div>

      {/* ------------------------------------------------------------------ */}
      {/* CAPTCHA — Cloudflare Turnstile                                       */}
      {/* ------------------------------------------------------------------ */}
      <div className="rounded-xl border border-line bg-bg-1/60 p-4">
        <div className="flex items-center justify-between gap-3 mb-3">
          <div className="inline-flex items-center gap-2 text-xs text-fg-muted">
            <ShieldCheck className="size-4 text-neon-cyan" />
            <span className="font-semibold">Human verification</span>
            <span className="text-fg-faint">· Cloudflare Turnstile</span>
          </div>

          <div className="flex items-center gap-2">
            {/* Realtime verification badge */}
            {cfToken && !cfError && !cfExpired && (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 ring-1 ring-emerald-500/30 px-2.5 py-0.5 text-[10px] font-mono text-emerald-300">
                <CheckCircle2 className="size-3" /> Verified
              </span>
            )}
            {cfExpired && (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-500/10 ring-1 ring-amber-500/30 px-2.5 py-0.5 text-[10px] font-mono text-amber-300">
                Expired
              </span>
            )}
            {cfError && (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-red-500/10 ring-1 ring-red-500/30 px-2.5 py-0.5 text-[10px] font-mono text-red-300">
                Failed
              </span>
            )}

            {/* Manual retry button — shown when the widget has errored or expired */}
            {(cfError || cfExpired) && (
              <button
                type="button"
                onClick={bumpWidget}
                className="inline-flex items-center gap-1 text-xs text-fg-muted hover:text-fg transition-colors"
              >
                <RefreshCw className="size-3" /> Retry
              </button>
            )}
          </div>
        </div>

        {/*
          BUG FIX: the `key` prop on <Turnstile> forces React to fully unmount
          and remount the widget whenever resetKey changes. This guarantees a
          fresh iframe + fresh challenge token rather than relying on the
          widget's own internal reset logic (which can silently no-op).
        */}
        <Turnstile
          key={resetKey}
          siteKey={TURNSTILE_SITE_KEY}
          theme="dark"
          onVerify={(token) => {
            setToken(token);
            setCfError(false);
            setCfExpired(false);
          }}
          onError={() => {
            setCfError(true);
            clearToken();
          }}
          onExpire={() => {
            setCfExpired(true);
            clearToken();
          }}
        />

        {cfError && (
          <p className="mt-2 text-xs text-rose-300">
            Verification failed. Click Retry or refresh the page.
          </p>
        )}
        {cfExpired && (
          <p className="mt-2 text-xs text-amber-300">
            Verification expired. Please click Retry.
          </p>
        )}
      </div>

      {/* Submit */}
      <Button
        type="submit"
        size="lg"
        className="w-full"
        disabled={isSubmitting || !cfToken}
      >
        {isSubmitting ? "Sending…" : "Send enquiry"}
        {!isSubmitting && <Send className="size-4" />}
      </Button>

      {/* Status messages */}
      {status === "ok" && (
        <div className="flex items-start gap-3 rounded-xl border border-emerald-400/30 bg-emerald-500/10 p-4 text-emerald-300">
          <CheckCircle2 className="size-5 mt-0.5 shrink-0" />
          <div className="text-sm">{statusMessage}</div>
        </div>
      )}
      {status === "error" && (
        <div className="flex items-start gap-3 rounded-xl border border-red-400/30 bg-red-500/10 p-4 text-red-300">
          <AlertTriangle className="size-5 mt-0.5 shrink-0" />
          <div className="text-sm">{statusMessage}</div>
        </div>
      )}

      <p className="text-xs text-fg-faint">
        By submitting this form you agree to be contacted by Macksofy. We typically respond within
        a few business hours and never share your details. Protected by Cloudflare Turnstile and
        rate limiting.
      </p>
    </form>
  );
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------
function Field({
  label,
  children,
  error,
}: {
  label: string;
  children: React.ReactNode;
  error?: string;
}) {
  return (
    <label className="block">
      <span className="block text-sm font-semibold text-fg-muted">{label}</span>
      <div className="mt-1.5">{children}</div>
      {error && <span className="mt-1 block text-xs text-red-400">{error}</span>}
    </label>
  );
}

function inputCls(hasError: boolean, isValid = false) {
  return [
    "block w-full rounded-xl bg-bg-1 border px-4 py-2.5 text-base text-fg placeholder:text-fg-faint transition-colors",
    "focus:outline-none focus:border-neon-cyan focus:ring-2 focus:ring-neon-cyan/30",
    hasError
      ? "border-red-400/40"
      : isValid
      ? "border-emerald-500/50"
      : "border-line hover:border-line-strong",
  ].join(" ");
}