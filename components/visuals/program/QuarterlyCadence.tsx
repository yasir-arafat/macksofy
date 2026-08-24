"use client";

import { CalendarClock } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";

/**
 * The twelve-month cadence, with the regulatory calendar it is built around.
 *
 * Quarterly activity comes from phases 2–5 of the methodology in
 * content/services.ts. Regulator names are those the same file lists as the
 * calendar we map against — no filing dates are asserted here, because which
 * ones bind you depends on your licence and financial year.
 */

const QUARTERS = [
  {
    q: "Q1",
    theme: "Establish the baseline",
    tone: "text-cyan-300 ring-cyan-400/40 bg-cyan-400/10",
    bar: "bg-cyan-400/60",
    runs: [
      "External + internal penetration test",
      "Cloud configuration audit against CIS and the Macksofy hardening pack",
      "Identity hygiene and privileged-access review",
    ],
  },
  {
    q: "Q2",
    theme: "Go after the build",
    tone: "text-violet-300 ring-violet-400/40 bg-violet-400/10",
    bar: "bg-violet-400/60",
    runs: [
      "Web and API VAPT across the releases that shipped since Q1",
      "Source code review on crown-jewel modules",
      "Tabletop exercise — incident response and business continuity",
    ],
  },
  {
    q: "Q3",
    theme: "Test the assumptions",
    tone: "text-amber-300 ring-amber-400/40 bg-amber-400/10",
    bar: "bg-amber-400/60",
    runs: [
      "Assumed-breach red team exercise",
      "Mobile and thick-client testing",
      "Vendor and third-party risk spot-checks",
    ],
  },
  {
    q: "Q4",
    theme: "Close and evidence",
    tone: "text-emerald-300 ring-emerald-400/40 bg-emerald-400/10",
    bar: "bg-emerald-400/60",
    runs: [
      "Re-test of remediated findings — closure validation",
      "ISO 27001 and SOC 2 readiness sweep",
      "Annual maturity assessment and next-year planning",
    ],
  },
];

const CALENDAR = [
  "RBI System Audit",
  "SEBI CSCRF",
  "CERT-In annual VAPT",
  "ISO 27001 surveillance",
  "SOC 2 Type II window",
  "PCI-DSS assessment",
];

export function QuarterlyCadence() {
  return (
    <div className="rounded-2xl glass p-5 sm:p-7">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line/60 pb-5">
        <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-fg-faint">
          Twelve-month cadence · template, then re-balanced with your CISO
        </div>
        <div className="inline-flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-[0.14em] text-fg-faint">
          <CalendarClock className="size-3" />
          Sequenced around your deadlines
        </div>
      </div>

      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        {QUARTERS.map((q, i) => (
          <Reveal as="div" y={10} delay={i * 0.08} duration={0.34} margin="-40px"
            key={q.q}
            className="relative overflow-hidden rounded-xl bg-white/[0.02] p-4 ring-1 ring-line/60"
          >
            <div aria-hidden className={`absolute inset-x-0 top-0 h-0.5 ${q.bar}`} />
            <div className="flex items-center gap-2.5">
              <span
                className={`grid size-9 shrink-0 place-items-center rounded-lg font-display text-[13px] font-black ring-1 ${q.tone}`}
              >
                {q.q}
              </span>
              <span className="font-display text-[13px] font-bold leading-tight text-fg">
                {q.theme}
              </span>
            </div>
            <ul className="mt-3 space-y-1.5">
              {q.runs.map((r) => (
                <li key={r} className="flex gap-2 text-[12px] leading-relaxed text-fg-muted">
                  <span className="mt-0.5 shrink-0 text-fg-faint">▸</span>
                  <span>{r}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        ))}
      </div>

      <div className="mt-5 rounded-xl bg-white/[0.02] p-4 ring-1 ring-line/60">
        <div className="font-mono text-[10px] uppercase tracking-[0.16em] text-fg-faint">
          Mapped against the calendar that actually sets the dates
        </div>
        <div className="mt-3 flex flex-wrap gap-1.5">
          {CALENDAR.map((c) => (
            <span
              key={c}
              className="rounded-full bg-amber-400/10 px-2.5 py-0.5 font-mono text-[10px] tracking-wider text-amber-200/90 ring-1 ring-amber-400/25"
            >
              {c}
            </span>
          ))}
        </div>
        <p className="mt-3 text-[11.5px] leading-relaxed text-fg-muted">
          The point of the cadence is that evidence exists before the auditor asks
          for it. Which of these bind you — and when — is the first thing scoping
          establishes.
        </p>
      </div>
    </div>
  );
}
