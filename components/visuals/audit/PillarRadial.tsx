"use client";

import { motion } from "framer-motion";
import { useId } from "react";
import { Reveal } from "@/components/motion/Reveal";

interface Pillar {
  title: string;
  points: string[];
}

interface Props {
  pillars: Pillar[];
}

// Same accent palette as the AuditDeepDive pillar cards so the legend matches.
const COLORS = [
  "#22d3ee", // cyan
  "#a78bfa", // violet
  "#fbbf24", // amber
  "#34d399", // emerald
  "#f472b6", // rose
  "#60a5fa", // sky
];

const SIZE = 280;
const CENTER = SIZE / 2;
const R = 92;
const STROKE = 32;
const GAP_DEG = 4;
const C = 2 * Math.PI * R;

export function PillarRadial({ pillars }: Props) {
  const id = useId();
  const n = pillars.length;
  if (n === 0) return null;

  const totalPoints = pillars.reduce((s, p) => s + p.points.length, 0);
  const segDeg = 360 / n;
  const arcLen = ((segDeg - GAP_DEG) / 360) * C;

  return (
    <div className="grid gap-8 md:grid-cols-12 items-center">
      <div className="md:col-span-5 flex justify-center">
        <svg
          width={SIZE}
          height={SIZE}
          viewBox={`0 0 ${SIZE} ${SIZE}`}
          role="img"
          aria-label={`Audit coverage across ${n} pillars`}
          className="overflow-visible"
        >
          <defs>
            {COLORS.map((c, i) => (
              <linearGradient
                key={`${id}-${i}`}
                id={`${id}-grad-${i}`}
                x1="0%"
                y1="0%"
                x2="100%"
                y2="100%"
              >
                <stop offset="0%" stopColor={c} stopOpacity="1" />
                <stop offset="100%" stopColor={c} stopOpacity="0.55" />
              </linearGradient>
            ))}
          </defs>

          <g transform={`translate(${CENTER} ${CENTER})`}>
            {/* Track ring */}
            <circle
              r={R}
              fill="none"
              stroke="rgba(255,255,255,0.06)"
              strokeWidth={STROKE}
            />

            {/* Animated segments */}
            {pillars.map((p, i) => {
              const rotation = i * segDeg - 90 + GAP_DEG / 2;
              const colorIdx = i % COLORS.length;
              return (
                <motion.circle
                  key={p.title}
                  r={R}
                  fill="none"
                  stroke={`url(#${id}-grad-${colorIdx})`}
                  strokeWidth={STROKE}
                  strokeLinecap="butt"
                  strokeDasharray={`${arcLen} ${C}`}
                  initial={{ strokeDashoffset: arcLen, opacity: 0 }}
                  whileInView={{ strokeDashoffset: 0, opacity: 1 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{
                    delay: 0.2 + i * 0.12,
                    duration: 0.85,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  transform={`rotate(${rotation})`}
                  style={{
                    filter: `drop-shadow(0 0 6px ${COLORS[colorIdx]}55)`,
                  }}
                />
              );
            })}

            {/* Inner disc to keep the centre text readable */}
            <circle r={R - STROKE / 2 - 4} fill="rgba(10,12,20,0.55)" />

            {/* Centre count-up + label */}
            <motion.g
              initial={{ opacity: 0, scale: 0.85 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: 0.4 + n * 0.1, duration: 0.5 }}
            >
              <text
                x={0}
                y={-2}
                textAnchor="middle"
                style={{
                  fill: "#ffffff",
                  font: "900 44px var(--font-display, system-ui)",
                }}
              >
                {totalPoints}
              </text>
              <text
                x={0}
                y={22}
                textAnchor="middle"
                style={{
                  fill: "rgba(255,255,255,0.45)",
                  font: '700 9px ui-monospace, monospace',
                  letterSpacing: "0.22em",
                }}
              >
                CONTROLS MAPPED
              </text>
              <text
                x={0}
                y={40}
                textAnchor="middle"
                style={{
                  fill: "rgba(255,255,255,0.6)",
                  font: "500 10px system-ui",
                }}
              >
                across {n} pillars
              </text>
            </motion.g>
          </g>
        </svg>
      </div>

      {/* Legend / percentage bars */}
      <div className="md:col-span-7">
        <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-fg-faint mb-3">
          Coverage breakdown
        </div>
        <ul className="grid sm:grid-cols-2 gap-3">
          {pillars.map((p, i) => {
            const colorIdx = i % COLORS.length;
            const pct = totalPoints
              ? Math.round((p.points.length / totalPoints) * 100)
              : 0;
            return (
              <Reveal as="li" y={0} delay={0.3 + i * 0.06} duration={0.4} margin="-40px"
                key={p.title}
                className="rounded-xl bg-bg-2/40 ring-1 ring-line px-3 py-2.5"
              >
                <div className="flex items-center gap-3">
                  <span
                    className="size-3 rounded shrink-0"
                    style={{ background: COLORS[colorIdx] }}
                  />
                  <span className="font-display text-sm font-semibold text-fg flex-1 leading-tight">
                    {p.title}
                  </span>
                  <span className="font-mono text-[10px] font-bold text-fg-faint tabular-nums">
                    {p.points.length} pts
                  </span>
                </div>
                <div
                  className="mt-2 h-1 rounded-full bg-white/5 overflow-hidden"
                  aria-hidden
                >
                  <motion.span
                    className="block h-full rounded-full"
                    style={{ background: COLORS[colorIdx] }}
                    initial={{ width: 0 }}
                    whileInView={{ width: `${pct}%` }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{
                      delay: 0.45 + i * 0.06,
                      duration: 0.7,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                  />
                </div>
              </Reveal>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
