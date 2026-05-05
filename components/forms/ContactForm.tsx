"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Send, CheckCircle2, AlertTriangle, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Turnstile } from "./Turnstile";

const Schema = z.object({
  name: z.string().min(2, "Please enter your full name"),
  email: z.string().email("Enter a valid email"),
  phone: z.string().min(7, "Enter a valid phone number"),
  company: z.string().optional(),
  interest: z.string().min(1, "Pick what you're interested in"),
  message: z.string().min(10, "Tell us a bit about your requirement"),
  // Honeypot — accepted as any string client-side; server checks it's empty.
  website: z.string().optional(),
});
type FormValues = z.infer<typeof Schema>;

const INTERESTS = [
  { group: "Services", items: ["Penetration Testing", "VAPT", "SOC Setup & SIEM", "Web & API Security", "Cloud Security", "Red Teaming", "DFIR", "Malware Analysis", "Threat Intelligence"] },
  { group: "Audit & Compliance", items: ["Cybersecurity Audit", "CERT-In Audit", "RBI / PCI VAPT", "ISO 27001", "Risk Assessment", "Compliance (multi-framework)"] },
  { group: "Training", items: ["CEH v13", "OSCP", "SOC Analyst", "Web App Security", "Corporate Training", "Training (OSCP/CEH)"] },
  { group: "Other", items: ["Sales conversation", "Partnership", "Press / Media", "Careers"] },
];

// Cloudflare Turnstile site key.
// Test key "1x00000000000000000000AA" always passes (use in dev).
// Set NEXT_PUBLIC_TURNSTILE_SITE_KEY in .env.local for production.
const TURNSTILE_SITE_KEY =
  process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || "1x00000000000000000000AA";

export function ContactForm({ initialInterest = "" }: { initialInterest?: string }) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormValues>({
    resolver: zodResolver(Schema),
    defaultValues: { interest: initialInterest, website: "" },
  });
  const [status, setStatus] = useState<"idle" | "ok" | "error">("idle");
  const [message, setMessage] = useState("");
  const [cfToken, setCfToken] = useState("");
  const [cfError, setCfError] = useState(false);
  const [resetKey, setResetKey] = useState(0);

  async function onSubmit(values: FormValues) {
    setStatus("idle");
    setCfError(false);

    if (!cfToken) {
      setStatus("error");
      setMessage("Please complete the human-verification check below.");
      return;
    }

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, cfToken }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error ?? "Submission failed");
      setStatus("ok");
      setMessage(data.message ?? "Thanks — we'll be in touch shortly.");
      reset();
      // Force the widget to remount + re-issue a fresh token next time
      setCfToken("");
      setResetKey((k) => k + 1);
    } catch (err) {
      setStatus("error");
      setMessage(err instanceof Error ? err.message : "Something went wrong");
      // Bump key so the user can re-challenge after a failure
      setCfToken("");
      setResetKey((k) => k + 1);
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Full name *" error={errors.name?.message}>
          <input type="text" autoComplete="name" className={inputCls(!!errors.name)} {...register("name")} />
        </Field>
        <Field label="Work email *" error={errors.email?.message}>
          <input type="email" autoComplete="email" className={inputCls(!!errors.email)} {...register("email")} />
        </Field>
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Phone (with country code) *" error={errors.phone?.message}>
          <input type="tel" autoComplete="tel" placeholder="+91 99308 24239" className={inputCls(!!errors.phone)} {...register("phone")} />
        </Field>
        <Field label="Company" error={errors.company?.message}>
          <input type="text" autoComplete="organization" className={inputCls(!!errors.company)} {...register("company")} />
        </Field>
      </div>
      <Field label="I'm interested in *" error={errors.interest?.message}>
        <select className={inputCls(!!errors.interest)} {...register("interest")}>
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
      <Field label="Tell us about your requirement *" error={errors.message?.message}>
        <textarea rows={5} className={inputCls(!!errors.message)} {...register("message")} />
      </Field>

      {/* HONEYPOT — invisible to humans, irresistible to bots. */}
      <div
        aria-hidden
        className="absolute h-px w-px -m-px overflow-hidden p-0 border-0"
        style={{ position: "absolute", left: "-9999px", top: "auto" }}
      >
        <label>
          Website (leave blank)
          <input
            type="text"
            tabIndex={-1}
            autoComplete="off"
            {...register("website")}
          />
        </label>
      </div>

      {/* CAPTCHA */}
      <div className="rounded-xl border border-line bg-bg-1/60 p-4">
        <div className="flex items-center justify-between gap-3 mb-3">
          <div className="inline-flex items-center gap-2 text-xs text-fg-muted">
            <ShieldCheck className="size-4 text-neon-cyan" />
            <span className="font-semibold">Human verification</span>
            <span className="text-fg-faint">· Cloudflare Turnstile</span>
          </div>
          {cfToken && !cfError && (
            <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 ring-1 ring-emerald-500/30 px-2.5 py-0.5 text-[10px] font-mono text-emerald-300">
              <CheckCircle2 className="size-3" /> Verified
            </span>
          )}
        </div>
        <Turnstile
          siteKey={TURNSTILE_SITE_KEY}
          theme="dark"
          resetKey={resetKey}
          onVerify={(token) => {
            setCfToken(token);
            setCfError(false);
          }}
          onError={() => {
            setCfError(true);
            setCfToken("");
          }}
          onExpire={() => {
            setCfToken("");
          }}
        />
        {cfError && (
          <p className="mt-2 text-xs text-rose-300">
            Verification failed. Reload the widget or refresh the page.
          </p>
        )}
      </div>

      <Button
        type="submit"
        size="lg"
        className="w-full"
        disabled={isSubmitting || !cfToken}
      >
        {isSubmitting ? "Sending…" : "Send enquiry"}
        {!isSubmitting && <Send className="size-4" />}
      </Button>

      {status === "ok" && (
        <div className="flex items-start gap-3 rounded-xl border border-emerald-400/30 bg-emerald-500/10 p-4 text-emerald-300">
          <CheckCircle2 className="size-5 mt-0.5 shrink-0" />
          <div className="text-sm">{message}</div>
        </div>
      )}
      {status === "error" && (
        <div className="flex items-start gap-3 rounded-xl border border-red-400/30 bg-red-500/10 p-4 text-red-300">
          <AlertTriangle className="size-5 mt-0.5 shrink-0" />
          <div className="text-sm">{message}</div>
        </div>
      )}

      <p className="text-xs text-fg-faint">
        By submitting this form you agree to be contacted by Macksofy. We typically respond within
        a few business hours and never share your details. Protected by Cloudflare Turnstile and rate limiting.
      </p>
    </form>
  );
}

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

function inputCls(hasError: boolean) {
  return [
    "block w-full rounded-xl bg-bg-1 border px-4 py-2.5 text-base text-fg placeholder:text-fg-faint transition-colors",
    "focus:outline-none focus:border-neon-cyan focus:ring-2 focus:ring-neon-cyan/30",
    hasError ? "border-red-400/40" : "border-line hover:border-line-strong",
  ].join(" ");
}
