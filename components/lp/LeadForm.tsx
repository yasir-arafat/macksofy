"use client";

import { useState, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Send, CheckCircle2, AlertTriangle, ShieldCheck, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Turnstile } from "@/components/forms/Turnstile";

// ---------------------------------------------------------------------------
// Schema — short, high-conversion lead form. The shared /api/contact endpoint
// requires `interest` + a >=10-char `message`; we synthesise both from the
// course + preferred-mode so the visitor only fills 4 fields.
// ---------------------------------------------------------------------------
const Schema = z.object({
  name: z.string().min(2, "Please enter your full name"),
  email: z.string().email("Enter a valid email"),
  phone: z.string().min(7, "Enter a valid phone number"),
  mode: z.string().min(1, "Pick a preferred mode"),
  website: z.string().optional(), // honeypot — must stay empty
});
type FormValues = z.infer<typeof Schema>;

const MODES = [
  "Live online (instructor-led)",
  "Classroom — Mumbai (BKC)",
  "Either / not sure yet",
];

// Cloudflare test key in dev; real key via env in production.
const TURNSTILE_SITE_KEY =
  process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ?? "1x00000000000000000000AA";

const THANK_YOU_PATH = "/lp/ceh-certification/thank-you";

export function LeadForm() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, touchedFields },
    trigger,
  } = useForm<FormValues>({
    resolver: zodResolver(Schema),
    defaultValues: { mode: "", website: "" },
    mode: "onChange",
  });

  const [status, setStatus] = useState<"idle" | "error">("idle");
  const [statusMessage, setStatusMessage] = useState("");

  // --- Turnstile state (mirrors the main ContactForm pattern) ---
  const cfTokenRef = useRef("");
  const [cfToken, setCfToken] = useState("");
  const [cfError, setCfError] = useState(false);
  const [cfExpired, setCfExpired] = useState(false);
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

  async function onSubmit(values: FormValues) {
    setStatus("idle");

    if (values.website) return; // honeypot — silent drop

    const token = cfTokenRef.current;
    if (!token) {
      setStatus("error");
      setStatusMessage("Please complete the human-verification check below.");
      return;
    }

    const payload = {
      name: values.name,
      email: values.email,
      phone: values.phone,
      interest: "CEH v13 Training",
      message: `CEH v13 enquiry via Google Ads landing page. Preferred mode: ${values.mode}.`,
      cfToken: token,
      website: "",
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error ?? "Submission failed");

      // Lightweight submit signal (conversion itself fires on the thank-you
      // page, so reaching that URL is the single source of truth).
      const w = window as unknown as { dataLayer?: Record<string, unknown>[] };
      w.dataLayer = w.dataLayer || [];
      w.dataLayer.push({ event: "lead_submit", form: "ceh_lp" });

      router.push(THANK_YOU_PATH);
    } catch (err) {
      setStatus("error");
      setStatusMessage(err instanceof Error ? err.message : "Something went wrong");
      bumpWidget();
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
      <Field label="Full name *" error={errors.name?.message}>
        <input
          type="text"
          autoComplete="name"
          className={inputCls(!!errors.name, touchedFields.name && !errors.name)}
          {...register("name")}
          onBlur={() => trigger("name")}
        />
      </Field>

      <Field label="Email *" error={errors.email?.message}>
        <input
          type="email"
          autoComplete="email"
          className={inputCls(!!errors.email, touchedFields.email && !errors.email)}
          {...register("email")}
          onBlur={() => trigger("email")}
        />
      </Field>

      <Field label="Phone / WhatsApp (with country code) *" error={errors.phone?.message}>
        <input
          type="tel"
          autoComplete="tel"
          placeholder="+91 99308 24239"
          className={inputCls(!!errors.phone, touchedFields.phone && !errors.phone)}
          {...register("phone")}
          onBlur={() => trigger("phone")}
        />
      </Field>

      <Field label="Preferred mode *" error={errors.mode?.message}>
        <select
          className={inputCls(!!errors.mode, touchedFields.mode && !errors.mode)}
          {...register("mode")}
          onBlur={() => trigger("mode")}
        >
          <option value="">Choose an option</option>
          {MODES.map((m) => (
            <option key={m} value={m}>
              {m}
            </option>
          ))}
        </select>
      </Field>

      {/* Honeypot — invisible to real users */}
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

      {/* Turnstile */}
      <div className="rounded-xl border border-line bg-bg-1/60 p-3">
        <div className="mb-2 flex items-center justify-between gap-3">
          <div className="inline-flex items-center gap-2 text-xs text-fg-muted">
            <ShieldCheck className="size-4 text-neon-cyan" />
            <span className="font-semibold">Human verification</span>
          </div>
          <div className="flex items-center gap-2">
            {cfToken && !cfError && !cfExpired && (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-[10px] font-mono text-emerald-300 ring-1 ring-emerald-500/30">
                <CheckCircle2 className="size-3" /> Verified
              </span>
            )}
            {(cfError || cfExpired) && (
              <button
                type="button"
                onClick={bumpWidget}
                className="inline-flex items-center gap-1 text-xs text-fg-muted transition-colors hover:text-fg"
              >
                <RefreshCw className="size-3" /> Retry
              </button>
            )}
          </div>
        </div>
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
      </div>

      <Button type="submit" size="lg" className="w-full" disabled={isSubmitting || !cfToken}>
        {isSubmitting ? "Sending…" : "Get fees, batch dates & syllabus"}
        {!isSubmitting && <Send className="size-4" />}
      </Button>

      {status === "error" && (
        <div className="flex items-start gap-3 rounded-xl border border-red-400/30 bg-red-500/10 p-4 text-red-300">
          <AlertTriangle className="mt-0.5 size-5 shrink-0" />
          <div className="text-sm">{statusMessage}</div>
        </div>
      )}

      <p className="text-xs leading-relaxed text-fg-faint">
        By submitting this form you agree to be contacted by Macksofy by phone, email or WhatsApp
        about CEH v13 training. We respond within a few business hours and never share your details.
        See our{" "}
        <a href="/privacy" className="underline hover:text-fg-muted">
          Privacy Policy
        </a>
        . Protected by Cloudflare Turnstile.
      </p>
    </form>
  );
}

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
