"use client";

import { motion } from "framer-motion";
import { TrendingDown, Flag, Mail, MousePointerClick, KeyRound, ShieldAlert } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";

/**
 * What the telemetry report contains, and the three anonymised programmes we
 * can put numbers against.
 *
 * CLAIM DISCIPLINE: every percentage on this component comes from a case study
 * in content/services.ts — the listed NBFC (19% → 4.1% over four quarters,
 * finance/ops 28%), the Series-C SaaS (engineering 23% → 6%) and the pharma
 * manufacturer (plant engineers 31% → 8% in six months). The funnel stages are
 * deliberately unnumbered: they describe what we measure, and inventing a
 * plausible-looking rate for each would be fabricating a benchmark.
 */

const STAGES = [
  {
    icon: Mail,
    label: "Delivered & opened",
    note: "Allow-listed with your mail-security vendor during scoping, so delivery is not the variable being tested. Opens on their own are not a failure signal.",
  },
  {
    icon: MousePointerClick,
    label: "Clicked",
    note: "The headline number, segmented by role and risk tier — because an org-wide average hides the population that needs the coaching.",
  },
  {
    icon: KeyRound,
    label: "Credentials or MFA granted",
    note: "The stage that would have been a real incident. Tracked separately from clicks, including OAuth consent grants and MFA-fatigue approvals.",
  },
  {
    icon: ShieldAlert,
    label: "Reported to the SOC",
    note: "The positive-behaviour metric. Time-to-first-report matters more than click-rate once a programme matures.",
  },
];

interface Programme {
  who: string;
  scope: string;
  cohort: string;
  before: number;
  after: number;
  span: string;
  outcome: string;
}

const PROGRAMMES: Programme[] = [
  {
    who: "Listed NBFC",
    scope: "4,200 staff, quarterly",
    cohort: "Whole organisation",
    before: 19,
    after: 4.1,
    span: "4 quarters",
    outcome: "SEBI awareness-control evidence passed first-pass",
  },
  {
    who: "B2B SaaS (Series C)",
    scope: "Pre-SOC 2 Type II baseline",
    cohort: "Engineering, internal-IT lures",
    before: 23,
    after: 6,
    span: "2 quarters",
    outcome: "SOC 2 CC1.4 + ISO A.6.3 evidence cleared",
  },
  {
    who: "Pharma manufacturer",
    scope: "Plant floor + corporate",
    cohort: "Plant engineers, vendor-portal lure",
    before: 31,
    after: 8,
    span: "6 months",
    outcome: "Local-language coaching for the plant population",
  },
];

const MAX = 32;

export function ClickRateFunnel() {
  return (
    <div className="rounded-2xl glass p-5 sm:p-7">
      <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-fg-faint">
        Per-campaign telemetry · what gets measured
      </div>

      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        {STAGES.map((s, i) => {
          const Icon = s.icon;
          return (
            <Reveal as="div" y={10} delay={i * 0.07} duration={0.32} margin="-40px"
              key={s.label}
              className="rounded-xl bg-white/[0.02] p-4 ring-1 ring-line/60"
            >
              <div className="flex items-center gap-2.5">
                <div className="grid size-9 shrink-0 place-items-center rounded-lg bg-amber-400/10 text-amber-300 ring-1 ring-amber-400/30">
                  <Icon className="size-4" />
                </div>
                <span className="font-display text-[13px] font-bold leading-tight text-fg">
                  {s.label}
                </span>
              </div>
              <p className="mt-2.5 text-[12px] leading-relaxed text-fg-muted">{s.note}</p>
            </Reveal>
          );
        })}
      </div>

      {/* measured outcomes */}
      <div className="mt-8 border-t border-line/60 pt-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-fg-faint">
            Three anonymised programmes · click-rate before → after
          </div>
          <div className="flex items-center gap-4 font-mono text-[9px] uppercase tracking-[0.14em] text-fg-faint">
            <span className="inline-flex items-center gap-1.5">
              <span className="size-2.5 rounded bg-red-400/60" /> at baseline
            </span>
            <span className="inline-flex items-center gap-1.5">
              <span className="size-2.5 rounded bg-emerald-400/60" /> at close
            </span>
          </div>
        </div>

        <div className="mt-5 space-y-5">
          {PROGRAMMES.map((p, i) => (
            <div key={p.who}>
              <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
                <span className="font-display text-sm font-bold text-fg">{p.who}</span>
                <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-fg-faint">
                  {p.scope} · {p.span}
                </span>
              </div>
              <div className="mt-0.5 font-mono text-[10px] uppercase tracking-[0.12em] text-fg-dim">
                {p.cohort}
              </div>

              <div className="mt-2.5 space-y-1.5">
                <div className="flex items-center gap-3">
                  <div className="h-2.5 flex-1 overflow-hidden rounded-full bg-white/5">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${(p.before / MAX) * 100}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.65, delay: i * 0.12 }}
                      className="h-full bg-red-400/60"
                    />
                  </div>
                  <span className="w-12 text-right font-display text-xs font-bold text-red-300">
                    {p.before}%
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="h-2.5 flex-1 overflow-hidden rounded-full bg-white/5">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${(p.after / MAX) * 100}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.65, delay: i * 0.12 + 0.08 }}
                      className="h-full bg-emerald-400/60"
                    />
                  </div>
                  <span className="w-12 text-right font-display text-xs font-bold text-emerald-300">
                    {p.after}%
                  </span>
                </div>
              </div>

              <p className="mt-2 flex gap-2 text-[11.5px] leading-relaxed text-fg-faint">
                <Flag className="mt-0.5 size-3.5 shrink-0 text-emerald-300/70" />
                {p.outcome}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-6 flex items-center gap-2 rounded-lg bg-emerald-500/10 px-3 py-2 text-[12px] text-emerald-200 ring-1 ring-emerald-500/25">
          <TrendingDown className="size-4 shrink-0" />
          Every one of these started above the 15–22% band we typically see at baseline
        </div>
      </div>

      <p className="mt-5 border-t border-line/60 pt-4 text-[11px] leading-relaxed text-fg-faint">
        Three anonymised client programmes, not a benchmark. Your starting
        click-rate depends on sector, prior awareness work and mail-gateway
        posture — the trajectory is what we design for, not a number we guarantee.
      </p>
    </div>
  );
}
