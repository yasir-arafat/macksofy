"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { ShieldCheck } from "lucide-react";

/**
 * Defers the contact form's dependency graph until the visitor is near it.
 *
 * ContactForm pulls react-hook-form + @hookform/resolvers/zod + zod, which
 * together are ~300 KB of the initial JS. LeadCapture renders that form as a
 * closing CTA on 43 route files (~249 prerendered pages), so every one of them
 * was paying for a form sitting far below the fold.
 *
 * Loading is gated on an IntersectionObserver with a generous rootMargin, so
 * the chunk is already fetched by the time the section scrolls into view.
 *
 * The placeholder mirrors the real form's geometry field-for-field and the
 * wrapper reserves the measured height, so the swap costs no layout shift.
 *
 * Reserved heights are the settled maxima of the real form, measured at
 * 360-1920px AFTER the Turnstile widget renders — measuring before it does
 * understates the form by ~35-45px. The bands follow the form's own
 * `sm:grid-cols-2` switch at 640px, not `md`:
 *
 *   <640px   981-1013px (single column)   -> reserve 1016
 *   >=640px  752-768px  (two column)      -> reserve 768
 *
 * NOT used on /contact — there the form is the point of the page, so it stays
 * server-rendered and works without JS.
 */
const ContactForm = dynamic(
  () => import("./ContactForm").then((m) => m.ContactForm),
  { ssr: false, loading: () => <FormSkeleton /> },
);

export function ContactFormLazy() {
  const ref = useRef<HTMLDivElement>(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // No IntersectionObserver (older than our browserslist floor) — just load
    // it, rather than leaving the visitor with a form that never arrives.
    // Deferred by a tick because setting state synchronously in an effect
    // triggers a cascading render.
    if (typeof IntersectionObserver === "undefined") {
      const t = setTimeout(() => setShow(true), 0);
      return () => clearTimeout(t);
    }

    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setShow(true);
          io.disconnect();
        }
      },
      { rootMargin: "600px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className="min-h-[1016px] sm:min-h-[768px]">
      {show ? <ContactForm /> : <FormSkeleton />}
      <noscript>
        <p className="text-sm text-fg-muted">
          This form needs JavaScript.{" "}
          <a href="/contact" className="text-neon-cyan underline">
            Use the contact page
          </a>{" "}
          or email{" "}
          <a href="mailto:info@macksofy.com" className="text-neon-cyan underline">
            info@macksofy.com
          </a>
          .
        </p>
      </noscript>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Placeholder — same field rhythm and spacing as ContactForm, no interactivity */
/* -------------------------------------------------------------------------- */

const BAR = "block w-full rounded-xl bg-bg-1 border border-line";

function SkeletonField({ label, tall = false }: { label: string; tall?: boolean }) {
  return (
    <div className="block">
      <span className="block text-sm font-semibold text-fg-muted">{label}</span>
      <div className="mt-1.5">
        <div
          className={BAR}
          style={{ height: tall ? "9.75rem" : "2.875rem" }}
          aria-hidden="true"
        />
      </div>
    </div>
  );
}

function FormSkeleton() {
  return (
    <div className="space-y-5" aria-hidden="true">
      <div className="grid gap-5 sm:grid-cols-2">
        <SkeletonField label="Full name *" />
        <SkeletonField label="Work email *" />
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <SkeletonField label="Phone (with country code) *" />
        <SkeletonField label="Company" />
      </div>
      <SkeletonField label="I'm interested in *" />
      <SkeletonField label="Tell us about your requirement *" tall />

      <div className="rounded-xl border border-line bg-bg-1/60 p-4">
        <div className="flex items-center justify-between gap-3 mb-3">
          <div className="inline-flex items-center gap-2 text-xs text-fg-muted">
            <ShieldCheck className="size-4 text-neon-cyan" />
            <span className="font-semibold">Human verification</span>
            <span className="text-fg-faint">· Cloudflare Turnstile</span>
          </div>
        </div>
        <div className={BAR} style={{ height: "4.0625rem" }} />
      </div>

      <div className="rounded-full bg-bg-1 border border-line" style={{ height: "3.25rem" }} />
    </div>
  );
}
