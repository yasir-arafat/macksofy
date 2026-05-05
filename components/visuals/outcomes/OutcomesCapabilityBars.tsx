"use client";

import { motion } from "framer-motion";
import { Gauge, BarChart3 } from "lucide-react";
import {
  ACCENT_TOKEN,
  CATEGORY_META,
  type OutcomesBaseProps,
} from "./Outcomes";

const SKILL_LEVEL = ["Foundational", "Practitioner", "Specialist", "Expert"] as const;

/**
 * Style 2 — CAPABILITY BARS
 * Each outcome rendered as a horizontal progress bar with category icon,
 * skill-level label, and animated fill on view. Right rail summarises the
 * full capability mix as a stacked-category breakdown + career roles.
 */
export function OutcomesCapabilityBars({
  outcomes,
  careerRoles,
  accent,
}: OutcomesBaseProps) {
  const tone = ACCENT_TOKEN[accent];

  // Distribute "level" pseudo-randomly but deterministic by index for visual variety.
  const leveledOutcomes = outcomes.map((o, i) => ({
    ...o,
    level: 60 + ((i * 17) % 40), // 60-99% fill
    levelLabel: SKILL_LEVEL[Math.min(SKILL_LEVEL.length - 1, Math.floor((i * 17) % 40 / 12))],
  }));

  // Tally categories
  const categoryCounts = outcomes.reduce<Record<string, number>>((acc, o) => {
    acc[o.category] = (acc[o.category] ?? 0) + 1;
    return acc;
  }, {});
  const sortedCats = Object.entries(categoryCounts).sort((a, b) => b[1] - a[1]);

  return (
    <div className="grid gap-6 lg:grid-cols-12">
      {/* BARS */}
      <div className="lg:col-span-8 rounded-3xl bg-bg-2/40 ring-1 ring-line p-6 sm:p-7 relative overflow-hidden">
        <div
          aria-hidden
          className={`absolute -top-20 -left-20 size-72 rounded-full ${tone.bgSoft} blur-3xl pointer-events-none`}
        />
        <div className="relative flex items-center gap-2 mb-6">
          <Gauge className={`size-4 ${tone.text}`} />
          <span className={`font-mono text-[10px] uppercase tracking-[0.22em] font-bold ${tone.text}`}>
            Capability Profile
          </span>
        </div>
        <ul className="relative space-y-4">
          {leveledOutcomes.map((o, i) => {
            const meta = CATEGORY_META[o.category];
            const Icon = meta.icon;
            return (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
              >
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div className="flex items-start gap-3 min-w-0 flex-1">
                    <div
                      className={`grid size-9 shrink-0 place-items-center rounded-lg ${tone.bgSoft} ring-1 ${tone.ring} ${tone.text}`}
                    >
                      <Icon className="size-4" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="font-display text-sm font-bold text-fg leading-snug">
                        {o.text}
                      </div>
                      <div className="mt-1 flex items-center gap-2 font-mono text-[10px] uppercase tracking-wider text-fg-faint">
                        <span>{meta.label}</span>
                        <span>·</span>
                        <span className={tone.text}>{o.levelLabel}</span>
                      </div>
                    </div>
                  </div>
                  <div className={`font-mono text-xs font-bold ${tone.text} shrink-0 mt-2`}>
                    {o.level}%
                  </div>
                </div>
                <div className="relative h-2 rounded-full bg-bg-1 overflow-hidden ml-12">
                  <motion.div
                    className={`absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-${accent === "rose" ? "rose-400" : accent === "amber" ? "amber-300" : accent === "purple" ? "neon-purple" : accent === "green" ? "emerald-400" : "neon-cyan"} via-current to-transparent`}
                    style={{
                      background: `linear-gradient(90deg, ${tone.hex}, ${tone.hex}90 70%, ${tone.hex}30)`,
                      width: 0,
                    }}
                    initial={{ width: 0 }}
                    whileInView={{ width: `${o.level}%` }}
                    viewport={{ once: true, margin: "-10%" }}
                    transition={{
                      duration: 1.1,
                      delay: 0.15 + i * 0.06,
                      ease: "easeOut",
                    }}
                  />
                </div>
              </motion.li>
            );
          })}
        </ul>
      </div>

      {/* RIGHT RAIL */}
      <div className="lg:col-span-4 space-y-4">
        {/* Category mix */}
        <div className="rounded-2xl bg-bg-2/40 ring-1 ring-line p-5">
          <div className={`flex items-center gap-2 ${tone.text}`}>
            <BarChart3 className="size-4" />
            <span className="font-mono text-[10px] uppercase tracking-[0.22em] font-bold">
              Capability Mix
            </span>
          </div>
          {/* Stacked bar */}
          <div className="mt-4 h-2 w-full rounded-full overflow-hidden flex bg-bg-1">
            {sortedCats.map(([cat, count], i) => {
              const meta = CATEGORY_META[cat as keyof typeof CATEGORY_META];
              const accentTone = ACCENT_TOKEN[meta.accent];
              const pct = (count / outcomes.length) * 100;
              return (
                <motion.span
                  key={cat}
                  initial={{ width: 0 }}
                  whileInView={{ width: `${pct}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 + i * 0.08 }}
                  className={`block h-full ${accentTone.bg}`}
                />
              );
            })}
          </div>
          <ul className="mt-4 space-y-2">
            {sortedCats.map(([cat, count]) => {
              const meta = CATEGORY_META[cat as keyof typeof CATEGORY_META];
              const accentTone = ACCENT_TOKEN[meta.accent];
              return (
                <li key={cat} className="flex items-center justify-between gap-2 text-xs">
                  <div className="flex items-center gap-2 min-w-0">
                    <span className={`size-2 shrink-0 rounded-full ${accentTone.bg}`} />
                    <span className="text-fg-muted">{meta.label}</span>
                  </div>
                  <span className={`font-mono font-bold ${accentTone.text}`}>
                    {count}
                  </span>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Career payoff */}
        {careerRoles && careerRoles.length > 0 && (
          <div className="rounded-2xl bg-gradient-to-br from-bg-2/80 to-bg-1/40 ring-1 ring-line p-5">
            <div className={`font-mono text-[10px] uppercase tracking-[0.22em] font-bold ${tone.text}`}>
              Roles & salary bands
            </div>
            <ul className="mt-3 space-y-2.5">
              {careerRoles.slice(0, 5).map((r, i) => (
                <motion.li
                  key={r.role}
                  initial={{ opacity: 0, x: 6 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + i * 0.06 }}
                  className="rounded-lg bg-bg-1/70 ring-1 ring-line/60 p-3"
                >
                  <div className="flex items-baseline justify-between gap-2">
                    <div className="font-display text-xs font-bold text-fg leading-tight">
                      {r.role}
                    </div>
                    <div className={`font-mono text-xs font-bold ${tone.text}`}>
                      {r.salaryINR}
                    </div>
                  </div>
                  <div className="mt-1 font-mono text-[10px] text-fg-faint">
                    {r.experience}
                  </div>
                </motion.li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
