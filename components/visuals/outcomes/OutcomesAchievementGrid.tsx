"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Trophy, Award, Star } from "lucide-react";
import {
  ACCENT_TOKEN,
  CATEGORY_META,
  type OutcomesBaseProps,
} from "./Outcomes";

/**
 * Style 3 — ACHIEVEMENT GRID
 * Outcomes presented as collectible badges in a tilted hex-style grid.
 * Each badge has its own glow + tier ring. Click any badge to bring it to a
 * featured panel with full details and the careers it unlocks.
 */
export function OutcomesAchievementGrid({
  outcomes,
  careerRoles,
  accent,
}: OutcomesBaseProps) {
  const [active, setActive] = useState(0);
  const tone = ACCENT_TOKEN[accent];
  const current = outcomes[active];
  const currentMeta = CATEGORY_META[current.category];
  const CurrentIcon = currentMeta.icon;

  return (
    <div className="space-y-6">
      {/* Header strip */}
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div className={`inline-flex items-center gap-2 ${tone.text}`}>
          <Trophy className="size-4" />
          <span className="font-mono text-[10px] uppercase tracking-[0.22em] font-bold">
            Achievement Wall · {outcomes.length} skills earned
          </span>
        </div>
        <div className="font-mono text-[10px] text-fg-faint">
          Tap any badge to inspect
        </div>
      </div>

      {/* Featured badge — large active panel */}
      <AnimatePresence mode="wait">
        <motion.div
          key={active}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.25 }}
          className="rounded-3xl bg-gradient-to-br from-bg-2/80 to-bg-1/40 ring-1 ring-line p-6 sm:p-8 relative overflow-hidden"
        >
          <div
            aria-hidden
            className={`absolute -top-24 -right-24 size-72 rounded-full ${tone.bgSoft} blur-3xl pointer-events-none`}
          />
          <div className="relative grid gap-6 sm:grid-cols-12 items-start">
            {/* Badge medallion */}
            <div className="sm:col-span-4 lg:col-span-3 flex sm:block justify-center">
              <BadgeMedallion
                index={active}
                category={current.category}
                accent={accent}
                size="lg"
              />
            </div>
            {/* Detail */}
            <div className="sm:col-span-8 lg:col-span-9">
              <div className={`inline-flex items-center gap-1.5 rounded-full ${tone.bgSoft} ring-1 ${tone.ring} px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ${tone.text}`}>
                <CurrentIcon className="size-3" /> {currentMeta.label}
              </div>
              <h3 className="mt-3 font-display text-xl sm:text-2xl font-black text-fg leading-snug text-balance">
                {current.text}
              </h3>
              <div className="mt-4 flex flex-wrap items-center gap-3">
                <div className="inline-flex items-center gap-1 text-xs text-fg-faint">
                  <Star className={`size-3.5 ${tone.text}`} fill="currentColor" />
                  <Star className={`size-3.5 ${tone.text}`} fill="currentColor" />
                  <Star className={`size-3.5 ${tone.text}`} fill="currentColor" />
                  <Star className="size-3.5 text-fg-faint" />
                  <Star className="size-3.5 text-fg-faint" />
                </div>
                <span className="text-xs text-fg-muted">
                  Skill {String(active + 1).padStart(2, "0")} of {outcomes.length}
                </span>
              </div>

              {careerRoles && careerRoles.length > 0 && (
                <div className="mt-5 grid gap-2 sm:grid-cols-2">
                  {careerRoles.slice(0, 4).map((r) => (
                    <div
                      key={r.role}
                      className="rounded-lg bg-bg-1/70 ring-1 ring-line/60 p-2.5"
                    >
                      <div className="font-display text-xs font-bold text-fg leading-tight">
                        {r.role}
                      </div>
                      <div className="mt-1 flex items-center justify-between gap-2 text-[10px] font-mono">
                        <span className="text-fg-faint">{r.experience}</span>
                        <span className={`font-bold ${tone.text}`}>{r.salaryINR}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Badge grid */}
      <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-3">
        {outcomes.map((o, i) => {
          const meta = CATEGORY_META[o.category];
          const Icon = meta.icon;
          const isActive = i === active;
          return (
            <motion.button
              key={i}
              type="button"
              onClick={() => setActive(i)}
              initial={{ opacity: 0, scale: 0.85, y: 12 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                delay: 0.05 + i * 0.04,
                type: "spring",
                stiffness: 260,
                damping: 22,
              }}
              whileHover={{ y: -4 }}
              className={`group relative aspect-square rounded-2xl bg-bg-2 ring-1 transition-all p-3 flex flex-col items-center justify-center text-center ${
                isActive
                  ? `${tone.ring} ${tone.glow}`
                  : "ring-line hover:ring-white/30"
              }`}
            >
              {isActive && (
                <span
                  className={`absolute inset-0 rounded-2xl ${tone.bg} opacity-15 blur-md`}
                />
              )}
              <div
                className={`relative grid size-9 place-items-center rounded-full ${tone.bgSoft} ring-1 ${tone.ring} ${tone.text} mb-1.5`}
              >
                <Icon className="size-4" />
              </div>
              <div className="font-mono text-[9px] uppercase tracking-wider font-bold text-fg-faint">
                {String(i + 1).padStart(2, "0")}
              </div>
              <div className="font-display text-[10px] font-bold text-fg leading-tight line-clamp-2 mt-0.5">
                {meta.label}
              </div>
              {isActive && (
                <Award className={`absolute top-1 right-1 size-3 ${tone.text}`} />
              )}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}

function BadgeMedallion({
  index,
  category,
  accent,
}: {
  index: number;
  category: OutcomesBaseProps["outcomes"][0]["category"];
  accent: OutcomesBaseProps["accent"];
  size?: "sm" | "lg";
}) {
  const tone = ACCENT_TOKEN[accent];
  const meta = CATEGORY_META[category];
  const Icon = meta.icon;
  return (
    <div className="relative">
      {/* Outer glow */}
      <div
        className={`absolute inset-0 rounded-full ${tone.bg} opacity-25 blur-xl scale-110`}
      />
      {/* Outer ring with rotating decoration */}
      <svg
        className="relative size-32 sm:size-36"
        viewBox="0 0 144 144"
      >
        <defs>
          <linearGradient id={`med-grad-${index}`} x1="0" x2="1" y1="0" y2="1">
            <stop offset="0%" stopColor={tone.hex} stopOpacity="0.9" />
            <stop offset="100%" stopColor={tone.hex} stopOpacity="0.3" />
          </linearGradient>
        </defs>
        <circle
          cx="72"
          cy="72"
          r="68"
          fill="none"
          stroke="rgba(255,255,255,0.08)"
          strokeWidth="1"
        />
        <circle
          cx="72"
          cy="72"
          r="68"
          fill="none"
          stroke={`url(#med-grad-${index})`}
          strokeWidth="1.5"
          strokeDasharray="2 5"
        >
          <animateTransform
            attributeName="transform"
            type="rotate"
            from="0 72 72"
            to="360 72 72"
            dur="40s"
            repeatCount="indefinite"
          />
        </circle>
        <circle cx="72" cy="72" r="58" fill="rgba(8,8,20,0.95)" stroke={tone.hex} strokeWidth="2" />
        <circle cx="72" cy="72" r="50" fill="none" stroke={tone.hex} strokeOpacity="0.25" strokeDasharray="3 3" />
      </svg>
      {/* Center icon + number */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <div className={`grid size-12 place-items-center rounded-full ${tone.bgSoft} ring-1 ${tone.ring} ${tone.text} mb-1`}>
          <Icon className="size-6" />
        </div>
        <div className={`font-display text-base font-black ${tone.text}`}>
          {String(index + 1).padStart(2, "0")}
        </div>
      </div>
    </div>
  );
}
