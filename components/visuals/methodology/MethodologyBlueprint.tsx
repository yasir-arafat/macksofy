"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Cpu, ArrowRight } from "lucide-react";
import { ACCENT_TOKEN, type MethodologyAccent, type MethodologyPhase } from "./Methodology";

interface Props {
  phases: MethodologyPhase[];
  accent: MethodologyAccent;
  subjectLabel?: string;
}

/**
 * Style 6 — BLUEPRINT
 * Technical schematic feel — phases laid out on a grid background, connected
 * by orthogonal SVG paths with corners. Hover reveals activities in a side
 * inspector panel. Engineering / circuit-board vibe.
 */
export function MethodologyBlueprint({ phases, accent }: Props) {
  const [active, setActive] = useState(0);
  const tone = ACCENT_TOKEN[accent];
  const current = phases[active];

  return (
    <div className="grid gap-6 lg:grid-cols-12">
      {/* SCHEMATIC */}
      <div className="lg:col-span-7 relative rounded-3xl bg-bg-2/40 ring-1 ring-line overflow-hidden p-5 sm:p-6">
        {/* Grid background */}
        <svg className="absolute inset-0 size-full opacity-50" aria-hidden>
          <defs>
            <pattern
              id="bp-grid"
              width="32"
              height="32"
              patternUnits="userSpaceOnUse"
            >
              <path d="M 32 0 L 0 0 0 32" fill="none" stroke="rgba(255,255,255,0.05)" />
            </pattern>
            <pattern
              id="bp-grid-coarse"
              width="160"
              height="160"
              patternUnits="userSpaceOnUse"
            >
              <path d="M 160 0 L 0 0 0 160" fill="none" stroke="rgba(255,255,255,0.08)" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#bp-grid)" />
          <rect width="100%" height="100%" fill="url(#bp-grid-coarse)" />
        </svg>

        {/* Corner registration marks */}
        {([
          ["top-2 left-2", "border-t-2 border-l-2"],
          ["top-2 right-2", "border-t-2 border-r-2"],
          ["bottom-2 left-2", "border-b-2 border-l-2"],
          ["bottom-2 right-2", "border-b-2 border-r-2"],
        ] as const).map(([pos, brd]) => (
          <span
            key={pos}
            aria-hidden
            className={`absolute size-4 ${pos} ${brd} ${tone.text} opacity-50`}
          />
        ))}

        {/* Header strip */}
        <div className="relative flex items-center justify-between mb-5">
          <div className={`inline-flex items-center gap-2 ${tone.text}`}>
            <Cpu className="size-4" />
            <span className="font-mono text-[10px] uppercase tracking-[0.22em] font-bold">
              REV.01 · METHODOLOGY SCHEMATIC
            </span>
          </div>
          <span className="font-mono text-[10px] text-fg-faint">
            NODES {String(phases.length).padStart(2, "0")}
          </span>
        </div>

        {/* Node grid + connectors */}
        <div className="relative">
          {/* Connector overlay */}
          <svg
            className="absolute inset-0 size-full pointer-events-none"
            viewBox="0 0 600 360"
            preserveAspectRatio="none"
          >
            {phases.slice(0, -1).map((_, i) => {
              const total = phases.length;
              const cols = Math.min(3, total);
              const x1 = ((i % cols) + 0.5) * (600 / cols);
              const y1 = (Math.floor(i / cols) + 0.5) * (360 / Math.ceil(total / cols));
              const x2 = (((i + 1) % cols) + 0.5) * (600 / cols);
              const y2 = (Math.floor((i + 1) / cols) + 0.5) * (360 / Math.ceil(total / cols));
              const midX = (x1 + x2) / 2;
              const path = `M ${x1} ${y1} L ${midX} ${y1} L ${midX} ${y2} L ${x2} ${y2}`;
              return (
                <motion.path
                  key={i}
                  d={path}
                  fill="none"
                  stroke={tone.hex}
                  strokeWidth="1"
                  strokeOpacity={
                    i === active - 1 || i === active ? 0.7 : 0.18
                  }
                  strokeDasharray="4 3"
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                />
              );
            })}
          </svg>

          {/* Node grid */}
          <div
            className="relative grid gap-3"
            style={{
              gridTemplateColumns: `repeat(${Math.min(3, phases.length)}, minmax(0, 1fr))`,
            }}
          >
            {phases.map((p, i) => (
              <motion.button
                key={i}
                type="button"
                onClick={() => setActive(i)}
                onMouseEnter={() => setActive(i)}
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 + i * 0.08 }}
                className={`group relative rounded-xl bg-bg-2 ring-1 transition-all p-3 text-left ${
                  active === i
                    ? `${tone.ring} ${tone.glow}`
                    : "ring-line hover:ring-white/30"
                }`}
              >
                <div className="flex items-start gap-2">
                  <div
                    className={`grid size-7 place-items-center rounded-md font-mono text-[11px] font-bold transition-all shrink-0 ${
                      active === i
                        ? `${tone.bg} text-bg`
                        : `${tone.bgSoft} ${tone.text}`
                    }`}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div
                      className={`font-mono text-[10px] uppercase tracking-wider font-bold leading-tight ${
                        active === i ? tone.text : "text-fg-muted"
                      }`}
                    >
                      NODE-{String(i + 1).padStart(2, "0")}
                    </div>
                    <div className="mt-0.5 text-[12px] font-bold text-fg leading-tight line-clamp-2">
                      {p.phase}
                    </div>
                  </div>
                </div>
                <div className="mt-2 font-mono text-[9px] text-fg-faint">
                  {p.activities.length} ACTS · ENABLED
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      </div>

      {/* INSPECTOR */}
      <div className="lg:col-span-5">
        <motion.div
          key={current.phase}
          initial={{ opacity: 0, x: 12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.25 }}
          className="rounded-3xl bg-gradient-to-br from-bg-2/80 to-bg-1/40 ring-1 ring-line p-6 sm:p-7 h-full relative overflow-hidden"
        >
          <div
            aria-hidden
            className={`absolute -bottom-16 -right-16 size-56 rounded-full ${tone.bgSoft} blur-3xl pointer-events-none`}
          />
          <div className={`flex items-center gap-2 ${tone.text}`}>
            <Cpu className="size-3.5" />
            <span className="font-mono text-[10px] uppercase tracking-[0.22em] font-bold">
              INSPECTOR · NODE-{String(active + 1).padStart(2, "0")}
            </span>
          </div>
          <h4 className="mt-3 font-display text-xl sm:text-2xl font-bold text-fg leading-tight">
            {current.phase}
          </h4>

          {/* Wire-style activity list */}
          <ul className="mt-5 space-y-2 relative">
            <span
              aria-hidden
              className={`absolute left-3 top-3 bottom-3 w-px ${tone.bg} opacity-30`}
            />
            {current.activities.map((a, i) => (
              <motion.li
                key={a}
                initial={{ opacity: 0, x: 6 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.08 + i * 0.05 }}
                className="relative flex items-center gap-3 rounded-lg bg-bg/40 ring-1 ring-line/60 px-3 py-2 ml-1"
              >
                <span className={`absolute -left-1 size-2 rounded-full ${tone.bg}`} />
                <ArrowRight className={`size-3.5 ${tone.text} shrink-0`} />
                <span className="text-sm text-fg-muted leading-snug">{a}</span>
              </motion.li>
            ))}
          </ul>
        </motion.div>
      </div>
    </div>
  );
}
