"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Lock, Unlock, Sparkles } from "lucide-react";
import {
  ACCENT_TOKEN,
  CATEGORY_META,
  type OutcomesBaseProps,
} from "./Outcomes";

/**
 * Style 1 — SKILL TREE
 * Game-like skill graph: outcomes are nodes connected by SVG branches that
 * "unlock" sequentially on view. Hover/click any node to focus it; the
 * inspector panel shows category, text, and unlock status.
 */
export function OutcomesSkillTree({
  outcomes,
  careerRoles,
  accent,
}: OutcomesBaseProps) {
  const [active, setActive] = useState(0);
  const tone = ACCENT_TOKEN[accent];

  // Lay out nodes in a 2-3 column grid pattern alternating
  // Compute positions in a 1000x520 viewBox
  const cols = Math.min(3, Math.max(2, Math.ceil(Math.sqrt(outcomes.length))));
  const rows = Math.ceil(outcomes.length / cols);
  const W = 1000;
  const H = 110 * rows + 60;
  const colW = W / cols;
  const rowH = (H - 80) / Math.max(1, rows);

  const nodes = outcomes.map((o, i) => {
    const r = Math.floor(i / cols);
    const c = r % 2 === 0 ? i % cols : cols - 1 - (i % cols); // serpentine
    return {
      ...o,
      x: c * colW + colW / 2,
      y: 60 + r * rowH + rowH / 2,
      idx: i,
    };
  });

  return (
    <div className="grid gap-6 lg:grid-cols-12">
      {/* GRAPH */}
      <div className="lg:col-span-7 relative rounded-3xl bg-bg-2/40 ring-1 ring-line p-4 sm:p-6 overflow-hidden">
        {/* Grid bg */}
        <svg className="absolute inset-0 size-full opacity-40" aria-hidden>
          <defs>
            <pattern id="st-grid" width="32" height="32" patternUnits="userSpaceOnUse">
              <path d="M 32 0 L 0 0 0 32" fill="none" stroke="rgba(255,255,255,0.05)" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#st-grid)" />
        </svg>

        {/* Header */}
        <div className="relative flex items-center justify-between mb-4">
          <div className={`inline-flex items-center gap-2 ${tone.text}`}>
            <Sparkles className="size-3.5" />
            <span className="font-mono text-[10px] uppercase tracking-[0.22em] font-bold">
              SKILL GRAPH · {outcomes.length} CAPABILITIES
            </span>
          </div>
          <div className="font-mono text-[10px] text-fg-faint">
            {active + 1} / {outcomes.length} UNLOCKED
          </div>
        </div>

        {/* SVG graph */}
        <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto" role="img">
          <defs>
            <linearGradient id="branch-grad" x1="0" x2="1">
              <stop offset="0%" stopColor={tone.hex} stopOpacity="0.7" />
              <stop offset="100%" stopColor={tone.hex} stopOpacity="0.15" />
            </linearGradient>
            <radialGradient id="node-glow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor={tone.hex} stopOpacity="0.55" />
              <stop offset="100%" stopColor={tone.hex} stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Branch connectors */}
          {nodes.slice(0, -1).map((n, i) => {
            const next = nodes[i + 1];
            const midX = (n.x + next.x) / 2;
            const path = `M ${n.x} ${n.y} C ${midX} ${n.y}, ${midX} ${next.y}, ${next.x} ${next.y}`;
            return (
              <motion.path
                key={`p-${i}`}
                d={path}
                fill="none"
                stroke="url(#branch-grad)"
                strokeWidth="2"
                strokeLinecap="round"
                initial={{ pathLength: 0, opacity: 0 }}
                whileInView={{ pathLength: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.15 + i * 0.08 }}
              />
            );
          })}

          {/* Nodes */}
          {nodes.map((n) => {
            const isActive = active === n.idx;
            const meta = CATEGORY_META[n.category];
            return (
              <g
                key={n.idx}
                onClick={() => setActive(n.idx)}
                onMouseEnter={() => setActive(n.idx)}
                style={{ cursor: "pointer" }}
              >
                {isActive && <circle cx={n.x} cy={n.y} r="46" fill="url(#node-glow)" />}
                <motion.circle
                  cx={n.x}
                  cy={n.y}
                  r={isActive ? 32 : 26}
                  fill="rgba(8,8,20,0.95)"
                  stroke={isActive ? tone.hex : "rgba(255,255,255,0.18)"}
                  strokeWidth={isActive ? 2.5 : 1.5}
                  initial={{ scale: 0, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{
                    delay: 0.2 + n.idx * 0.08,
                    type: "spring",
                    stiffness: 280,
                    damping: 20,
                  }}
                />
                {/* Number */}
                <text
                  x={n.x}
                  y={n.y - 4}
                  textAnchor="middle"
                  className="font-mono pointer-events-none"
                  fontSize="10"
                  fontWeight="700"
                  fill={isActive ? tone.hex : "rgba(255,255,255,0.5)"}
                >
                  {String(n.idx + 1).padStart(2, "0")}
                </text>
                {/* Category label */}
                <text
                  x={n.x}
                  y={n.y + 10}
                  textAnchor="middle"
                  className="font-display pointer-events-none"
                  fontSize="9"
                  fontWeight="700"
                  fill={isActive ? "#f6f7fb" : "rgba(232,238,247,0.7)"}
                  style={{ textTransform: "uppercase", letterSpacing: "0.06em" }}
                >
                  {meta.label}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      {/* INSPECTOR */}
      <div className="lg:col-span-5">
        <motion.div
          key={active}
          initial={{ opacity: 0, x: 12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.25 }}
          className="rounded-3xl bg-gradient-to-br from-bg-2/80 to-bg-1/40 ring-1 ring-line p-6 sm:p-7 h-full relative overflow-hidden"
        >
          <div
            aria-hidden
            className={`absolute -top-12 -right-12 size-56 rounded-full ${tone.bgSoft} blur-3xl pointer-events-none`}
          />
          <div className="relative">
            <div className={`inline-flex items-center gap-2 ${tone.text}`}>
              <Unlock className="size-3.5" />
              <span className="font-mono text-[10px] uppercase tracking-[0.22em] font-bold">
                Skill {String(active + 1).padStart(2, "0")} · {CATEGORY_META[outcomes[active].category].label}
              </span>
            </div>
            <p className="mt-4 font-display text-lg sm:text-xl font-bold text-fg leading-snug text-balance">
              {outcomes[active].text}
            </p>

            {/* Mini status */}
            <div className="mt-5 grid grid-cols-3 gap-2">
              <Stat label="Status" value="Unlocked" tone={tone} />
              <Stat
                label="Position"
                value={`${active + 1}/${outcomes.length}`}
                tone={tone}
              />
              <Stat
                label="Category"
                value={CATEGORY_META[outcomes[active].category].label}
                tone={tone}
              />
            </div>

            {/* Locked preview of next */}
            {active < outcomes.length - 1 && (
              <div className="mt-5 rounded-xl border border-dashed border-line/60 p-3 flex gap-3">
                <Lock className="size-4 text-fg-faint shrink-0 mt-0.5" />
                <div className="min-w-0">
                  <div className="font-mono text-[10px] uppercase tracking-wider text-fg-faint font-bold">
                    Up next · skill {String(active + 2).padStart(2, "0")}
                  </div>
                  <div className="text-xs text-fg-muted leading-snug mt-1 line-clamp-2">
                    {outcomes[active + 1].text}
                  </div>
                </div>
              </div>
            )}

            {/* Career payoff */}
            {careerRoles && careerRoles.length > 0 && (
              <div className="mt-5 pt-5 border-t border-line/60">
                <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-fg-faint font-semibold mb-2">
                  This unlocks roles like
                </div>
                <ul className="space-y-1.5">
                  {careerRoles.slice(0, 3).map((r) => (
                    <li
                      key={r.role}
                      className="flex items-center justify-between gap-2 text-xs"
                    >
                      <span className="text-fg-muted">{r.role}</span>
                      <span className={`font-mono font-bold ${tone.text}`}>
                        {r.salaryINR}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

function Stat({
  label,
  value,
  tone,
}: {
  label: string;
  value: string;
  tone: ReturnType<typeof Object.values>[0] extends infer T ? T : never;
}) {
  const t = tone as (typeof ACCENT_TOKEN)[keyof typeof ACCENT_TOKEN];
  return (
    <div className="rounded-lg bg-bg-1/60 ring-1 ring-line/60 p-2">
      <div className="font-mono text-[8px] uppercase tracking-wider text-fg-faint">
        {label}
      </div>
      <div className={`mt-0.5 text-[11px] font-bold ${t.text}`}>{value}</div>
    </div>
  );
}
