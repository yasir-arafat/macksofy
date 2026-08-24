"use client";

import { FileX2, Crosshair, FileScan, ShieldCheck, Users, Layers, ArrowRight } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";

/**
 * Why one contract beats five: the findings converge instead of scattering.
 *
 * Assessment types are the ones the programme runs (pentest, VAPT, code review,
 * configuration audit, tabletop). The "eleven disconnected PDFs" framing is the
 * problem statement from content/services.ts. No counts or scores are asserted.
 */

const SOURCES = [
  { icon: Crosshair, label: "Pentest & red team", tone: "text-red-300 ring-red-400/40 bg-red-400/10" },
  { icon: ShieldCheck, label: "Configuration audits", tone: "text-cyan-300 ring-cyan-400/40 bg-cyan-400/10" },
  { icon: FileScan, label: "Source code review", tone: "text-emerald-300 ring-emerald-400/40 bg-emerald-400/10" },
  { icon: Layers, label: "Web & API VAPT", tone: "text-violet-300 ring-violet-400/40 bg-violet-400/10" },
  { icon: Users, label: "Tabletop exercises", tone: "text-amber-300 ring-amber-400/40 bg-amber-400/10" },
];

const OUTCOMES = [
  "Severity and ownership assigned once, not per-report",
  "Duplicates across assessment types collapsed rather than double-counted",
  "Remediation chased between quarters, not handed over and forgotten",
  "Unlimited free retests inside the contract window",
  "One trend chart for the board instead of a stack of PDFs",
];

export function RiskRegisterFlow() {
  return (
    <div className="rounded-2xl glass p-5 sm:p-7">
      <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-fg-faint">
        Findings flow · five assessment types, one register
      </div>

      <div className="mt-5 grid gap-4 lg:grid-cols-12 lg:items-center">
        {/* sources */}
        <div className="space-y-2 lg:col-span-5">
          {SOURCES.map((s, i) => {
            const Icon = s.icon;
            return (
              <Reveal as="div" y={0} delay={i * 0.07} duration={0.3} margin="-40px"
                key={s.label}
                className="flex items-center gap-2.5 rounded-lg bg-white/[0.02] px-3 py-2.5 ring-1 ring-line/60"
              >
                <div className={`grid size-8 shrink-0 place-items-center rounded-md ring-1 ${s.tone}`}>
                  <Icon className="size-[15px]" />
                </div>
                <span className="text-[12.5px] text-fg-muted">{s.label}</span>
              </Reveal>
            );
          })}
        </div>

        {/* arrow */}
        <div className="flex justify-center lg:col-span-1">
          <ArrowRight className="size-5 rotate-90 text-fg-faint lg:rotate-0" />
        </div>

        {/* register */}
        <Reveal as="div" y={0} delay={0.35} duration={0.4}
          className="rounded-xl bg-amber-400/[0.07] p-4 ring-1 ring-amber-400/30 lg:col-span-6"
        >
          <div className="font-display text-sm font-bold text-fg">One risk register</div>
          <ul className="mt-3 space-y-2">
            {OUTCOMES.map((o) => (
              <li key={o} className="flex gap-2 text-[12px] leading-relaxed text-fg-muted">
                <span className="mt-0.5 shrink-0 text-amber-300/80">▸</span>
                <span>{o}</span>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>

      <div className="mt-5 flex gap-2.5 rounded-lg bg-red-500/[0.07] px-3 py-2.5 ring-1 ring-red-400/25">
        <FileX2 className="mt-0.5 size-4 shrink-0 text-red-300" />
        <p className="text-[12px] leading-relaxed text-fg-muted">
          <span className="font-semibold text-red-300">The alternative · </span>
          the same scope bought as separate engagements produces eleven
          disconnected reports, three severity scales and nobody chasing anything
          between them.
        </p>
      </div>
    </div>
  );
}
