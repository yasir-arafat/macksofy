"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Compass, Dot } from "lucide-react";
import { ACCENT_TOKEN, type MethodologyAccent, type MethodologyPhase } from "./Methodology";

interface Props {
  phases: MethodologyPhase[];
  accent: MethodologyAccent;
  subjectLabel?: string;
}

/**
 * Style 3 — RADIAL
 * Phase nodes orbit a central hub. Click a petal to load its activities into
 * the hub. Auto-rotating sweep ring + petal pulse for an interactive feel.
 */
export function MethodologyRadial({ phases, accent }: Props) {
  const [active, setActive] = useState(0);
  const tone = ACCENT_TOKEN[accent];
  const current = phases[active];
  const n = phases.length;

  const radius = 180;
  const cx = 250;
  const cy = 250;

  const petalPositions = phases.map((_, i) => {
    const angle = (i / n) * Math.PI * 2 - Math.PI / 2;
    return {
      x: cx + Math.cos(angle) * radius,
      y: cy + Math.sin(angle) * radius,
      angle,
    };
  });

  return (
    <div className="grid gap-8 lg:grid-cols-12 items-center">
      {/* RADIAL DIAGRAM */}
      <div className="lg:col-span-7 relative">
        <div className="relative mx-auto" style={{ maxWidth: 540 }}>
          <svg viewBox="0 0 500 500" className="w-full" role="img">
            <defs>
              <radialGradient id="rad-glow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor={tone.hex} stopOpacity="0.35" />
                <stop offset="60%" stopColor={tone.hex} stopOpacity="0.05" />
                <stop offset="100%" stopColor={tone.hex} stopOpacity="0" />
              </radialGradient>
              <linearGradient id="rad-spoke" x1="0" x2="1">
                <stop offset="0%" stopColor={tone.hex} stopOpacity="0.7" />
                <stop offset="100%" stopColor={tone.hex} stopOpacity="0.05" />
              </linearGradient>
            </defs>

            {/* Background glow */}
            <circle cx={cx} cy={cy} r={220} fill="url(#rad-glow)" />

            {/* Outer rings */}
            <circle cx={cx} cy={cy} r={radius} fill="none" stroke="rgba(255,255,255,0.08)" />
            <circle cx={cx} cy={cy} r={radius - 30} fill="none" stroke="rgba(255,255,255,0.05)" strokeDasharray="2 6" />

            {/* Sweep ring (animated) */}
            <motion.circle
              cx={cx}
              cy={cy}
              r={radius + 14}
              fill="none"
              stroke={tone.hex}
              strokeOpacity="0.25"
              strokeWidth="1.5"
              strokeDasharray="20 800"
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              style={{ transformOrigin: `${cx}px ${cy}px` }}
            />

            {/* Spokes */}
            {petalPositions.map((p, i) => (
              <line
                key={i}
                x1={cx}
                y1={cy}
                x2={p.x}
                y2={p.y}
                stroke="url(#rad-spoke)"
                strokeWidth="1"
                opacity={active === i ? 0.9 : 0.25}
              />
            ))}

            {/* Active highlight arc */}
            {petalPositions[active] && (
              <motion.line
                key={`arc-${active}`}
                x1={cx}
                y1={cy}
                x2={petalPositions[active].x}
                y2={petalPositions[active].y}
                stroke={tone.hex}
                strokeWidth="3"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.4 }}
              />
            )}

            {/* Hub */}
            <circle cx={cx} cy={cy} r={70} fill="rgba(8,8,20,0.95)" stroke={tone.hex} strokeWidth="2" />
            <circle cx={cx} cy={cy} r={60} fill="none" stroke={tone.hex} strokeOpacity="0.25" strokeDasharray="3 4" />
            <text
              x={cx}
              y={cy - 8}
              textAnchor="middle"
              className="font-mono"
              fontSize="11"
              fontWeight="700"
              fill={tone.hex}
              opacity="0.85"
            >
              PHASE
            </text>
            <text
              x={cx}
              y={cy + 20}
              textAnchor="middle"
              className="font-display"
              fontSize="38"
              fontWeight="900"
              fill="#f6f7fb"
            >
              {String(active + 1).padStart(2, "0")}
            </text>

            {/* Petals (rendered last so they layer above lines) */}
            {petalPositions.map((p, i) => {
              const isActive = active === i;
              return (
                <g key={i}>
                  {isActive && (
                    <circle
                      cx={p.x}
                      cy={p.y}
                      r={32}
                      fill={tone.hex}
                      opacity="0.18"
                    >
                      <animate
                        attributeName="r"
                        from="28"
                        to="38"
                        dur="1.6s"
                        repeatCount="indefinite"
                      />
                      <animate
                        attributeName="opacity"
                        from="0.25"
                        to="0"
                        dur="1.6s"
                        repeatCount="indefinite"
                      />
                    </circle>
                  )}
                  <circle
                    cx={p.x}
                    cy={p.y}
                    r={isActive ? 26 : 22}
                    fill="rgba(8,8,20,0.95)"
                    stroke={isActive ? tone.hex : "rgba(255,255,255,0.2)"}
                    strokeWidth={isActive ? 2.5 : 1.5}
                    onClick={() => setActive(i)}
                    style={{ cursor: "pointer" }}
                  />
                  <text
                    x={p.x}
                    y={p.y + 5}
                    textAnchor="middle"
                    className="font-display pointer-events-none"
                    fontSize="14"
                    fontWeight="900"
                    fill={isActive ? tone.hex : "rgba(255,255,255,0.7)"}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </text>
                  {/* Outer label */}
                  <text
                    x={p.x + Math.cos(p.angle) * 38}
                    y={p.y + Math.sin(p.angle) * 38 + 4}
                    textAnchor={
                      Math.abs(p.angle + Math.PI / 2) < 0.1
                        ? "middle"
                        : Math.cos(p.angle) > 0
                        ? "start"
                        : "end"
                    }
                    fontSize="10"
                    fontFamily="monospace"
                    fontWeight="600"
                    fill={isActive ? tone.hex : "rgba(232,238,247,0.5)"}
                    style={{ textTransform: "uppercase", letterSpacing: "0.08em" }}
                  >
                    {phases[i].phase
                      .replace(/^[\dWk\s.·-]+[·.]\s*/, "")
                      .slice(0, 16)}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>

        {/* Phase chips below for quick nav (mobile-friendly) */}
        <div className="mt-4 flex flex-wrap justify-center gap-2 lg:hidden">
          {phases.map((p, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setActive(i)}
              className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-semibold transition-all ${
                active === i
                  ? `${tone.bgSoft} ring-1 ${tone.ring} ${tone.text}`
                  : "bg-bg-2 ring-1 ring-line text-fg-muted"
              }`}
            >
              <span className="font-mono">{String(i + 1).padStart(2, "0")}</span>
              <span className="line-clamp-1 max-w-[12ch]">
                {p.phase.replace(/^[\dWk\s.·-]+[·.]\s*/, "")}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* PANEL */}
      <div className="lg:col-span-5">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={current.phase}
            initial={{ opacity: 0, x: 12 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -8 }}
            transition={{ duration: 0.25 }}
            className="rounded-3xl bg-bg-2/40 ring-1 ring-line p-6 sm:p-7"
          >
            <div className={`inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.22em] font-bold ${tone.text}`}>
              <Compass className="size-3.5" />
              Phase {String(active + 1).padStart(2, "0")} of {phases.length}
            </div>
            <h4 className="mt-3 font-display text-xl sm:text-2xl font-bold text-fg leading-tight">
              {current.phase}
            </h4>
            <ul className="mt-5 space-y-2.5">
              {current.activities.map((a, i) => (
                <motion.li
                  key={a}
                  initial={false}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.06 + i * 0.05 }}
                  className="flex gap-2.5 text-sm text-fg-muted leading-relaxed"
                >
                  <Dot className={`size-5 ${tone.text} shrink-0`} />
                  <span>{a}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
