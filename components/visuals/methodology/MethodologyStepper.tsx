"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";
import { ACCENT_TOKEN, type MethodologyAccent, type MethodologyPhase } from "./Methodology";

interface Props {
  phases: MethodologyPhase[];
  accent: MethodologyAccent;
  subjectLabel?: string;
}

/**
 * Style 2 — STEPPER
 * Tabbed phase navigation. Left rail of clickable phase tabs, right side shows
 * a rich detail panel with activities, progress bar, and a "next phase" CTA.
 */
export function MethodologyStepper({ phases, accent }: Props) {
  const [active, setActive] = useState(0);
  const tone = ACCENT_TOKEN[accent];
  const current = phases[active];
  const progressPct = ((active + 1) / phases.length) * 100;

  return (
    <div className="rounded-3xl bg-bg-2/40 ring-1 ring-line overflow-hidden">
      {/* Top progress bar */}
      <div className="h-1 bg-bg relative">
        <motion.div
          className={`absolute inset-y-0 left-0 ${tone.bg}`}
          initial={false}
          animate={{ width: `${progressPct}%` }}
          transition={{ type: "spring", stiffness: 220, damping: 28 }}
        />
        <div
          className="absolute inset-y-0 right-0 bg-gradient-to-l from-bg via-transparent pointer-events-none"
          style={{ width: `${100 - progressPct}%` }}
        />
      </div>

      <div className="grid lg:grid-cols-12 gap-0 min-h-[440px]">
        {/* LEFT — phase tabs */}
        <div className="lg:col-span-4 border-b lg:border-b-0 lg:border-r border-line">
          <ol className="grid lg:block">
            {phases.map((p, i) => {
              const isActive = active === i;
              const isCompleted = i < active;
              return (
                <li key={i}>
                  <button
                    type="button"
                    onClick={() => setActive(i)}
                    className={`group w-full flex items-start gap-3 px-5 py-4 text-left border-b border-line/50 last:border-b-0 transition-all ${
                      isActive ? "bg-white/[0.04]" : "hover:bg-white/[0.02]"
                    }`}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="stepper-rail"
                        className={`absolute left-0 w-1 ${tone.bg} h-12 rounded-r`}
                      />
                    )}
                    <div
                      className={`relative grid size-9 place-items-center rounded-lg shrink-0 transition-all ${
                        isCompleted
                          ? `${tone.bgSoft} ${tone.text} ring-1 ${tone.ring}`
                          : isActive
                          ? `${tone.bg} text-bg ${tone.glow}`
                          : "bg-bg ring-1 ring-line text-fg-muted group-hover:ring-white/30"
                      }`}
                    >
                      {isCompleted ? (
                        <Check className="size-4" strokeWidth={3} />
                      ) : (
                        <span className="font-display text-sm font-black">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                      )}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div
                        className={`font-display text-sm font-bold leading-tight transition-colors ${
                          isActive ? tone.text : "text-fg"
                        }`}
                      >
                        {p.phase}
                      </div>
                      <div className="mt-1 text-[11px] font-mono text-fg-faint">
                        {p.activities.length} actions
                      </div>
                    </div>
                    {isActive && (
                      <ArrowRight className={`size-4 ${tone.text} shrink-0 mt-2`} />
                    )}
                  </button>
                </li>
              );
            })}
          </ol>
        </div>

        {/* RIGHT — detail panel */}
        <div className="lg:col-span-8 p-6 sm:p-8 relative">
          <div
            aria-hidden
            className={`absolute -top-20 -right-20 size-72 rounded-full ${tone.bgSoft} blur-3xl pointer-events-none`}
          />
          <AnimatePresence mode="wait">
            <motion.div
              key={current.phase}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
              className="relative h-full flex flex-col"
            >
              <div className="flex items-baseline justify-between gap-3 flex-wrap">
                <div className={`font-mono text-[10px] uppercase tracking-[0.22em] font-bold ${tone.text}`}>
                  Phase {String(active + 1).padStart(2, "0")} / {phases.length}
                </div>
                <div className="font-mono text-[10px] text-fg-faint">
                  {Math.round(progressPct)}% complete
                </div>
              </div>
              <h4 className="mt-2 font-display text-2xl sm:text-3xl font-black text-fg leading-tight">
                {current.phase}
              </h4>

              <ul className="mt-6 grid gap-3 flex-1">
                {current.activities.map((a, i) => (
                  <motion.li
                    key={a}
                    initial={{ opacity: 0, x: -6 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.06 }}
                    className="flex gap-3 rounded-lg bg-bg-1/60 ring-1 ring-line/60 p-3"
                  >
                    <div
                      className={`grid size-7 shrink-0 place-items-center rounded-md ${tone.bgSoft} ring-1 ${tone.ring}`}
                    >
                      <span className={`font-mono text-[11px] font-bold ${tone.text}`}>
                        {String(i + 1).padStart(2, "0")}
                      </span>
                    </div>
                    <span className="text-sm text-fg-muted leading-relaxed pt-0.5">
                      {a}
                    </span>
                  </motion.li>
                ))}
              </ul>

              {active < phases.length - 1 && (
                <div className="mt-6 pt-4 border-t border-line/60 flex justify-between items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setActive((v) => Math.max(0, v - 1))}
                    disabled={active === 0}
                    className="text-xs font-semibold text-fg-muted hover:text-fg disabled:opacity-30 transition-colors"
                  >
                    ← Previous
                  </button>
                  <button
                    type="button"
                    onClick={() => setActive((v) => Math.min(phases.length - 1, v + 1))}
                    className={`inline-flex items-center gap-2 rounded-full ${tone.bgSoft} ring-1 ${tone.ring} px-3 py-1.5 text-xs font-bold ${tone.text} hover:opacity-90 transition-opacity`}
                  >
                    Next: {phases[active + 1].phase} <ArrowRight className="size-3" />
                  </button>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
