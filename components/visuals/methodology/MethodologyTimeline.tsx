"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, ChevronRight } from "lucide-react";
import { ACCENT_TOKEN, type MethodologyAccent, type MethodologyPhase } from "./Methodology";
import { Reveal } from "@/components/motion/Reveal";

interface Props {
  phases: MethodologyPhase[];
  accent: MethodologyAccent;
  subjectLabel?: string;
}

/**
 * Style 1 — TIMELINE
 * Horizontal flow of phase nodes connected by an animated gradient path.
 * Click / hover a node to surface that phase's activities below.
 * Mobile: stacks vertically with a gradient rail.
 */
export function MethodologyTimeline({ phases, accent }: Props) {
  const [active, setActive] = useState(0);
  const tone = ACCENT_TOKEN[accent];
  const current = phases[active];

  return (
    <div className="relative">
      {/* DESKTOP — horizontal flow */}
      <div className="hidden lg:block">
        <div className="relative">
          {/* Animated gradient backbone */}
          <svg
            className="absolute inset-x-0 top-12 -z-10 h-2 w-full"
            viewBox="0 0 1000 8"
            preserveAspectRatio="none"
          >
            <defs>
              <linearGradient id="tl-grad" x1="0" x2="1" y1="0" y2="0">
                <stop offset="0%" stopColor={tone.hex} stopOpacity="0.05" />
                <stop offset="50%" stopColor={tone.hex} stopOpacity="0.5" />
                <stop offset="100%" stopColor={tone.hex} stopOpacity="0.05" />
              </linearGradient>
            </defs>
            <line
              x1="0"
              y1="4"
              x2="1000"
              y2="4"
              stroke="rgba(255,255,255,0.08)"
              strokeWidth="2"
            />
            <motion.line
              x1="0"
              y1="4"
              x2="1000"
              y2="4"
              stroke="url(#tl-grad)"
              strokeWidth="2"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.4, ease: "easeOut" }}
            />
          </svg>

          <div
            className="grid gap-4"
            style={{
              gridTemplateColumns: `repeat(${phases.length}, minmax(0, 1fr))`,
            }}
          >
            {phases.map((p, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setActive(i)}
                onMouseEnter={() => setActive(i)}
                className="group flex flex-col items-center text-center focus:outline-none"
              >
                <div className="relative">
                  <Reveal as="div" y={0} delay={i * 0.08}
                    className={`relative grid size-24 place-items-center rounded-full bg-bg-2 ring-2 transition-all ${
                      active === i
                        ? `${tone.ring} ${tone.glow}`
                        : "ring-line group-hover:ring-white/30"
                    }`}
                  >
                    <span
                      className={`font-display text-3xl font-black leading-none transition-colors ${
                        active === i ? tone.text : "text-fg-muted"
                      }`}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {active === i && (
                      <motion.span
                        layoutId="tl-ring"
                        className={`absolute inset-0 rounded-full ${tone.bg} opacity-20 blur-xl`}
                      />
                    )}
                  </Reveal>
                </div>
                <div
                  className={`mt-4 font-display text-sm font-bold leading-tight transition-colors max-w-[12ch] ${
                    active === i ? tone.text : "text-fg group-hover:text-fg"
                  }`}
                >
                  {p.phase.replace(/^[\dWk\s.·-]+[·.]\s*/, "")}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Active panel */}
        <motion.div
          key={current.phase}
          initial={false}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="mt-12 rounded-2xl bg-bg-2/40 ring-1 ring-line p-6 sm:p-7"
        >
          <div className="flex items-baseline justify-between gap-4 flex-wrap">
            <div>
              <div className={`font-mono text-[10px] uppercase tracking-[0.22em] font-semibold ${tone.text}`}>
                Phase {String(active + 1).padStart(2, "0")} of {phases.length}
              </div>
              <h4 className="mt-1 font-display text-xl font-bold text-fg leading-tight">
                {current.phase}
              </h4>
            </div>
            <div className="text-xs text-fg-faint font-mono">
              {current.activities.length} activities
            </div>
          </div>
          <ul className="mt-5 grid gap-2.5 sm:grid-cols-2">
            {current.activities.map((a, i) => (
              <motion.li
                key={a}
                initial={false}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.04 }}
                className="flex gap-2.5 text-sm text-fg-muted leading-relaxed"
              >
                <CheckCircle2 className={`size-4 ${tone.text} shrink-0 mt-0.5`} />
                <span>{a}</span>
              </motion.li>
            ))}
          </ul>
        </motion.div>
      </div>

      {/* MOBILE — vertical stacked */}
      <ol className="lg:hidden relative space-y-4 pl-2">
        <span
          aria-hidden
          className={`absolute left-[26px] top-2 bottom-2 w-px bg-gradient-to-b from-${accent === "rose" ? "rose-400" : accent}-500/40 via-${accent === "rose" ? "rose-400" : accent}-500/20 to-transparent`}
          style={{ background: `linear-gradient(to bottom, ${tone.hex}55, ${tone.hex}10, transparent)` }}
        />
        {phases.map((p, i) => (
          <Reveal as="li" y={0} delay={i * 0.05}
            key={i}
            className="relative flex gap-4"
          >
            <div className={`relative grid size-12 place-items-center rounded-full bg-bg ring-2 ${tone.ring} z-10`}>
              <span className={`font-display text-base font-black ${tone.text}`}>
                {String(i + 1).padStart(2, "0")}
              </span>
            </div>
            <div className="flex-1 min-w-0 pt-1">
              <div className="font-display text-sm font-bold text-fg">{p.phase}</div>
              <ul className="mt-2 space-y-1.5 text-xs text-fg-muted">
                {p.activities.map((a) => (
                  <li key={a} className="flex gap-2">
                    <ChevronRight className={`size-3 ${tone.text} shrink-0 mt-0.5`} />
                    <span>{a}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </ol>
    </div>
  );
}
