"use client";

import { CalendarDays, CalendarRange, CalendarCheck, CalendarClock } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";

/**
 * What a fractional CISO's calendar actually contains.
 *
 * Every item is drawn from the deliverables and methodology in
 * content/services.ts — the point being that "fractional" describes the day
 * count, not the scope of the role.
 */

const CADENCE = [
  {
    icon: CalendarDays,
    period: "Weekly",
    tone: "text-cyan-300 ring-cyan-400/40 bg-cyan-400/10",
    bar: "bg-cyan-400/60",
    items: [
      "Leadership stand-up, in your calendar not ours",
      "Architecture review on every material change",
      "Security-team 1:1s and mentoring",
      "Vendor and third-party risk decisions",
    ],
  },
  {
    icon: CalendarRange,
    period: "Monthly",
    tone: "text-violet-300 ring-violet-400/40 bg-violet-400/10",
    bar: "bg-violet-400/60",
    items: [
      "Risk-committee meeting, chaired",
      "Risk register reviewed and signed off",
      "KRI / KPI pack against agreed thresholds",
      "Remediation-progress escalation where it has stalled",
    ],
  },
  {
    icon: CalendarCheck,
    period: "Quarterly",
    tone: "text-amber-300 ring-amber-400/40 bg-amber-400/10",
    bar: "bg-amber-400/60",
    items: [
      "Board pack: trend chart, top risks, regulator status, hiring plan",
      "Policy-stack review against what actually changed",
      "Audit and certification readiness checkpoint",
      "Budget re-forecast",
    ],
  },
  {
    icon: CalendarClock,
    period: "Annual",
    tone: "text-emerald-300 ring-emerald-400/40 bg-emerald-400/10",
    bar: "bg-emerald-400/60",
    items: [
      "Maturity reassessment against NIST CSF and ISO 27001",
      "Twelve-month strategy and budget refreshed for board sign-off",
      "Audit-readiness sign-off",
      "Succession planning toward a full-time hire, where that is the goal",
    ],
  },
];

const ON_CALL = [
  "Incident Commander during High and Critical events",
  "Breach communications and regulator notification",
  "Macksofy DFIR forensics pulled in under the same contract",
];

export function OperatingRhythm() {
  return (
    <div className="rounded-2xl glass p-5 sm:p-7">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line/60 pb-5">
        <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-fg-faint">
          Operating rhythm · 1, 2 or 4 days a week
        </div>
        <div className="font-mono text-[9px] uppercase tracking-[0.14em] text-fg-faint">
          Reports to your CEO or COO, not to us
        </div>
      </div>

      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        {CADENCE.map((c, i) => {
          const Icon = c.icon;
          return (
            <Reveal as="div" y={10} delay={i * 0.08} duration={0.34} margin="-40px"
              key={c.period}
              className="relative overflow-hidden rounded-xl bg-white/[0.02] p-4 ring-1 ring-line/60"
            >
              <div aria-hidden className={`absolute inset-x-0 top-0 h-0.5 ${c.bar}`} />
              <div className="flex items-center gap-2.5">
                <div className={`grid size-9 shrink-0 place-items-center rounded-lg ring-1 ${c.tone}`}>
                  <Icon className="size-4" />
                </div>
                <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-fg-dim">
                  {c.period}
                </span>
              </div>
              <ul className="mt-3 space-y-1.5">
                {c.items.map((it) => (
                  <li key={it} className="flex gap-2 text-[12px] leading-relaxed text-fg-muted">
                    <span className="mt-0.5 shrink-0 text-fg-faint">▸</span>
                    <span>{it}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          );
        })}
      </div>

      <div className="mt-5 rounded-xl bg-red-500/[0.07] p-4 ring-1 ring-red-400/25">
        <div className="font-mono text-[10px] uppercase tracking-[0.16em] text-red-300">
          And whenever it goes wrong
        </div>
        <ul className="mt-2.5 grid gap-1.5 sm:grid-cols-3">
          {ON_CALL.map((o) => (
            <li key={o} className="flex gap-2 text-[12px] leading-relaxed text-fg-muted">
              <span className="mt-0.5 shrink-0 text-red-300/70">▸</span>
              <span>{o}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
