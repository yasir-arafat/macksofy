"use client";

import { Swords, Eye, Wrench, RotateCcw, BellRing } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";

/**
 * The purple-team loop, per technique.
 *
 * This is the mechanic that separates purple from red: the exercise does not
 * move on until the alert fires. Steps mirror phase 2 and 3 of the methodology
 * in content/services.ts.
 */

const LOOP = [
  {
    icon: Swords,
    side: "red" as const,
    label: "Execute",
    detail:
      "Red runs one ATT&CK technique against the live estate, announced to the room but not to the tooling.",
  },
  {
    icon: Eye,
    side: "blue" as const,
    label: "Observe",
    detail:
      "Blue works their normal queue. Did anything fire — and did it reach a human, or die in a connector?",
  },
  {
    icon: Wrench,
    side: "both" as const,
    label: "Tune together",
    detail:
      "On a miss we stop and write the rule with your analysts — Sigma, SPL, KQL or Wazuh, in your repo.",
  },
  {
    icon: RotateCcw,
    side: "red" as const,
    label: "Replay",
    detail:
      "The same technique is executed again, plus a variant, so the rule catches behaviour rather than one literal.",
  },
  {
    icon: BellRing,
    side: "blue" as const,
    label: "Confirm",
    detail:
      "The alert fires, is triaged, and false-positive rate is checked against your real noise baseline before moving on.",
  },
];

const SIDE_STYLE = {
  red: { ring: "ring-red-400/40 bg-red-400/10", text: "text-red-300", tag: "Red" },
  blue: { ring: "ring-cyan-400/40 bg-cyan-400/10", text: "text-cyan-300", tag: "Blue" },
  both: { ring: "ring-violet-400/40 bg-violet-400/10", text: "text-violet-300", tag: "Together" },
} as const;

export function DetectionLoop() {
  return (
    <div className="rounded-2xl glass p-5 sm:p-7">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line/60 pb-5">
        <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-fg-faint">
          The loop · repeated per technique
        </div>
        <div className="flex items-center gap-3 font-mono text-[9px] uppercase tracking-[0.14em] text-fg-faint">
          <span className="inline-flex items-center gap-1.5">
            <span className="size-2.5 rounded bg-red-400/60" /> red
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span className="size-2.5 rounded bg-cyan-400/60" /> blue
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span className="size-2.5 rounded bg-violet-400/60" /> together
          </span>
        </div>
      </div>

      <ol className="relative mt-6">
        <div
          aria-hidden
          className="absolute left-[21px] top-2 bottom-2 w-px bg-gradient-to-b from-red-400/50 via-violet-400/40 to-cyan-400/50"
        />
        {LOOP.map((s, i) => {
          const Icon = s.icon;
          const st = SIDE_STYLE[s.side];
          return (
            <Reveal as="li" y={0} delay={i * 0.09} duration={0.4} margin="-60px"
              key={s.label}
              className="relative flex gap-4 pb-6 last:pb-0"
            >
              <div
                className={`relative z-10 grid size-11 shrink-0 place-items-center rounded-xl ring-1 ${st.ring} ${st.text}`}
              >
                <Icon className="size-5" />
              </div>
              <div className="min-w-0 flex-1 pt-1">
                <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  <span className="font-display text-sm font-bold text-fg">{s.label}</span>
                  <span className={`font-mono text-[10px] uppercase tracking-[0.14em] ${st.text}`}>
                    {st.tag}
                  </span>
                </div>
                <p className="mt-1.5 text-[13px] leading-relaxed text-fg-muted">{s.detail}</p>
              </div>
            </Reveal>
          );
        })}
      </ol>

      <Reveal as="div" y={0} delay={0.5}
        className="mt-2 flex items-center gap-2 rounded-lg bg-violet-500/10 px-3 py-2.5 text-[12px] leading-relaxed text-violet-100/90 ring-1 ring-violet-400/25"
      >
        <RotateCcw className="size-4 shrink-0" />
        The exercise does not advance to the next technique until the alert fires
        reliably. That is the whole difference from a red team report.
      </Reveal>
    </div>
  );
}
