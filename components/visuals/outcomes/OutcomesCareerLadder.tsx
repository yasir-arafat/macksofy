"use client";

import { motion } from "framer-motion";
import { Briefcase, TrendingUp, Sparkles } from "lucide-react";
import {
  ACCENT_TOKEN,
  CATEGORY_META,
  type OutcomesBaseProps,
} from "./Outcomes";

/**
 * Style 4 — CAREER LADDER
 * Combines outcomes (skills earned) with career roles (jobs unlocked) in a
 * vertical-journey infographic. Left column = animated skill stack with
 * category icons; right column = ladder of career roles with rising salary
 * bands. Connected by a gradient rail.
 */
export function OutcomesCareerLadder({
  outcomes,
  careerRoles,
  accent,
  duration,
}: OutcomesBaseProps) {
  const tone = ACCENT_TOKEN[accent];

  return (
    <div className="space-y-6">
      <div className="grid gap-6 lg:grid-cols-12">
        {/* SKILL STACK */}
        <div className="lg:col-span-7 rounded-3xl bg-bg-2/40 ring-1 ring-line p-6 sm:p-7 relative overflow-hidden">
          <div
            aria-hidden
            className={`absolute -top-20 -right-20 size-72 rounded-full ${tone.bgSoft} blur-3xl pointer-events-none`}
          />
          <div className="relative">
            <div className={`inline-flex items-center gap-2 ${tone.text}`}>
              <Sparkles className="size-4" />
              <span className="font-mono text-[10px] uppercase tracking-[0.22em] font-bold">
                Skills you earn
              </span>
            </div>
            <h3 className="mt-2 font-display text-xl sm:text-2xl font-black text-fg leading-tight">
              From day 1 to the {duration ?? "course"} finish line.
            </h3>

            <ol className="mt-6 relative space-y-3">
              <span
                aria-hidden
                className={`absolute left-[18px] top-3 bottom-3 w-px`}
                style={{
                  background: `linear-gradient(to bottom, ${tone.hex}55, ${tone.hex}10, transparent)`,
                }}
              />
              {outcomes.map((o, i) => {
                const meta = CATEGORY_META[o.category];
                const Icon = meta.icon;
                const ms = ((i + 1) / outcomes.length) * 100;
                return (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -12 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-10%" }}
                    transition={{ duration: 0.4, delay: i * 0.06 }}
                    className="relative flex items-start gap-3 rounded-xl bg-bg-1/60 ring-1 ring-line/60 p-3 pl-12"
                  >
                    <div
                      className={`absolute left-2 grid size-9 place-items-center rounded-full bg-bg ring-2 ${tone.ring} z-10 ${tone.text}`}
                    >
                      <Icon className="size-4" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2 font-mono text-[9px] uppercase tracking-wider text-fg-faint">
                        <span>SKILL {String(i + 1).padStart(2, "0")}</span>
                        <span>·</span>
                        <span className={tone.text}>{meta.label}</span>
                        <span className="ml-auto text-fg-faint">{Math.round(ms)}% in</span>
                      </div>
                      <div className="mt-1 text-sm font-semibold text-fg leading-snug">
                        {o.text}
                      </div>
                      <div className="mt-2 h-1 rounded-full bg-bg overflow-hidden">
                        <motion.div
                          className={`h-full ${tone.bg}`}
                          initial={{ width: 0 }}
                          whileInView={{ width: `${ms}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.8, delay: 0.15 + i * 0.05 }}
                        />
                      </div>
                    </div>
                  </motion.li>
                );
              })}
            </ol>
          </div>
        </div>

        {/* CAREER LADDER */}
        <div className="lg:col-span-5 rounded-3xl bg-gradient-to-br from-bg-2/80 to-bg-1/40 ring-1 ring-line p-6 sm:p-7 relative overflow-hidden">
          <div
            aria-hidden
            className={`absolute -bottom-20 -left-20 size-64 rounded-full ${tone.bgSoft} blur-3xl pointer-events-none opacity-50`}
          />
          <div className="relative">
            <div className={`inline-flex items-center gap-2 ${tone.text}`}>
              <Briefcase className="size-4" />
              <span className="font-mono text-[10px] uppercase tracking-[0.22em] font-bold">
                Roles you unlock
              </span>
            </div>
            <h3 className="mt-2 font-display text-xl sm:text-2xl font-black text-fg leading-tight">
              Salary climbs with experience.
            </h3>

            {careerRoles && careerRoles.length > 0 ? (
              <ol className="mt-6 space-y-3 relative">
                <span
                  aria-hidden
                  className="absolute left-3 top-3 bottom-3 w-0.5 bg-gradient-to-b from-current via-current/50 to-transparent opacity-30"
                  style={{ color: tone.hex }}
                />
                {careerRoles.map((r, i) => (
                  <motion.li
                    key={r.role}
                    initial={{ opacity: 0, y: 8 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.1 + i * 0.08 }}
                    className="relative pl-10"
                  >
                    {/* Step marker */}
                    <span
                      className={`absolute left-0 top-1 grid size-7 place-items-center rounded-full ${tone.bg} text-bg font-mono text-[10px] font-bold z-10`}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div className="rounded-xl bg-bg-1/60 ring-1 ring-line/60 p-3">
                      <div className="font-display text-sm font-bold text-fg leading-tight">
                        {r.role}
                      </div>
                      <div className="mt-2 flex items-center justify-between gap-2 text-xs">
                        <span className="text-fg-faint font-mono">
                          {r.experience}
                        </span>
                        <span
                          className={`inline-flex items-center gap-1 font-mono font-bold ${tone.text}`}
                        >
                          <TrendingUp className="size-3" />
                          {r.salaryINR}
                        </span>
                      </div>
                    </div>
                  </motion.li>
                ))}
              </ol>
            ) : (
              <p className="mt-6 text-sm text-fg-muted">
                Career role data will appear here once the curriculum is finalised.
              </p>
            )}

            {/* Salary trajectory chart */}
            {careerRoles && careerRoles.length >= 2 && (
              <div className="mt-6 pt-5 border-t border-line/60">
                <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-fg-faint font-semibold mb-3">
                  Salary trajectory
                </div>
                <SalaryChart roles={careerRoles} accent={accent} />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function SalaryChart({
  roles,
  accent,
}: {
  roles: OutcomesBaseProps["careerRoles"];
  accent: OutcomesBaseProps["accent"];
}) {
  if (!roles || roles.length < 2) return null;
  const tone = ACCENT_TOKEN[accent];

  // Parse low end of "₹4–7 LPA" → 4
  const points = roles.map((r) => {
    const match = r.salaryINR.match(/(\d+)/);
    return match ? Number(match[1]) : 0;
  });
  const max = Math.max(...points);
  const min = Math.min(...points);
  const range = max - min || 1;

  const W = 320;
  const H = 80;
  const stepX = W / (points.length - 1);
  const path = points
    .map((p, i) => {
      const x = i * stepX;
      const y = H - ((p - min) / range) * H;
      return `${i === 0 ? "M" : "L"} ${x} ${y}`;
    })
    .join(" ");
  const areaPath = `${path} L ${W} ${H} L 0 ${H} Z`;

  return (
    <svg viewBox={`0 0 ${W} ${H + 16}`} className="w-full h-auto">
      <defs>
        <linearGradient id={`sal-area-${accent}`} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor={tone.hex} stopOpacity="0.4" />
          <stop offset="100%" stopColor={tone.hex} stopOpacity="0" />
        </linearGradient>
      </defs>
      <motion.path
        d={areaPath}
        fill={`url(#sal-area-${accent})`}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.3 }}
      />
      <motion.path
        d={path}
        fill="none"
        stroke={tone.hex}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: "easeOut" }}
      />
      {points.map((p, i) => {
        const x = i * stepX;
        const y = H - ((p - min) / range) * H;
        return (
          <motion.circle
            key={i}
            cx={x}
            cy={y}
            r="3.5"
            fill={tone.hex}
            stroke="rgba(8,8,20,0.95)"
            strokeWidth="2"
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 + i * 0.1 }}
          />
        );
      })}
      {/* X labels */}
      {roles.map((r, i) => (
        <text
          key={r.role}
          x={i * stepX}
          y={H + 14}
          textAnchor={i === 0 ? "start" : i === roles.length - 1 ? "end" : "middle"}
          fontSize="8"
          fontFamily="monospace"
          fill="rgba(232,238,247,0.5)"
        >
          {r.experience.split(/[\s–-]/)[0]}y
        </text>
      ))}
    </svg>
  );
}
