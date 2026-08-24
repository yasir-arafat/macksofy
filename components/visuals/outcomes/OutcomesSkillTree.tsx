"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Lock, Unlock, Sparkles, ArrowRight } from "lucide-react";
import {
  ACCENT_TOKEN,
  CATEGORY_META,
  type OutcomesAccent,
  type OutcomesBaseProps,
} from "./Outcomes";

/**
 * Style 1 — SKILL TREE (rebuilt)
 * Outcomes are HTML tiles arranged in a grid; SVG curves connect tile
 * centres into a serpentine "skill graph". Tiles fade and scale in cleanly,
 * the active tile glows with a gradient border, and the inspector panel
 * crossfades on hover/click.
 */
export function OutcomesSkillTree({
  outcomes,
  careerRoles,
  accent,
}: OutcomesBaseProps) {
  const [active, setActive] = useState(0);
  const tone = ACCENT_TOKEN[accent];

  return (
    <div className="grid gap-6 lg:grid-cols-12">
      {/* GRAPH */}
      <div className="lg:col-span-7 relative rounded-3xl bg-bg-2/40 ring-1 ring-line p-5 sm:p-6 overflow-hidden">
        {/* Grid bg */}
        <div
          aria-hidden
          className="absolute inset-0 opacity-50"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />
        {/* Soft accent halo */}
        <div
          aria-hidden
          className={`absolute -top-20 -right-20 size-72 rounded-full ${tone.bgSoft} blur-3xl pointer-events-none`}
        />

        {/* Header */}
        <div className="relative flex items-center justify-between mb-5">
          <div className={`inline-flex items-center gap-2 ${tone.text}`}>
            <Sparkles className="size-3.5" />
            <span className="font-mono text-[10px] uppercase tracking-[0.22em] font-bold">
              SKILL GRAPH · {outcomes.length} CAPABILITIES
            </span>
          </div>
          <div className="font-mono text-[10px] text-fg-faint">
            {String(active + 1).padStart(2, "0")} / {String(outcomes.length).padStart(2, "0")}
          </div>
        </div>

        <SkillGraph
          outcomes={outcomes}
          activeIndex={active}
          onSelect={setActive}
          accent={accent}
        />
      </div>

      {/* INSPECTOR */}
      <div className="lg:col-span-5">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.22 }}
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
                  Skill {String(active + 1).padStart(2, "0")} ·{" "}
                  {CATEGORY_META[outcomes[active].category].label}
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

              {careerRoles && careerRoles.length > 0 && (
                <div className="mt-5 pt-5 border-t border-line/60">
                  <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-fg-faint font-semibold mb-2 flex items-center gap-2">
                    <ArrowRight className="size-3" />
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
        </AnimatePresence>
      </div>
    </div>
  );
}

/* ============================================================ */
/*  Skill graph — HTML tiles + SVG connector path                */
/* ============================================================ */

function SkillGraph({
  outcomes,
  activeIndex,
  onSelect,
  accent,
}: {
  outcomes: OutcomesBaseProps["outcomes"];
  activeIndex: number;
  onSelect: (i: number) => void;
  accent: OutcomesAccent;
}) {
  const tone = ACCENT_TOKEN[accent];
  const containerRef = useRef<HTMLDivElement>(null);
  const tileRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const [paths, setPaths] = useState<string[]>([]);
  const [containerSize, setContainerSize] = useState({ w: 0, h: 0 });

  // Measure tile centers and recompute connector paths
  const measure = () => {
    const cont = containerRef.current;
    if (!cont) return;
    const cb = cont.getBoundingClientRect();
    setContainerSize({ w: cb.width, h: cb.height });
    const centers = tileRefs.current.map((el) => {
      if (!el) return null;
      const r = el.getBoundingClientRect();
      return {
        x: r.left + r.width / 2 - cb.left,
        y: r.top + r.height / 2 - cb.top,
      };
    });
    const newPaths: string[] = [];
    for (let i = 0; i < centers.length - 1; i++) {
      const a = centers[i];
      const b = centers[i + 1];
      if (!a || !b) continue;
      const midX = (a.x + b.x) / 2;
      // Smooth horizontal-leaning bezier
      const path = `M ${a.x} ${a.y} C ${midX} ${a.y}, ${midX} ${b.y}, ${b.x} ${b.y}`;
      newPaths.push(path);
    }
    setPaths(newPaths);
  };

  useLayoutEffect(() => {
    measure();
  }, [outcomes.length]);

  useEffect(() => {
    const onResize = () => measure();
    window.addEventListener("resize", onResize);
    // Re-measure shortly after mount in case fonts/layout shift
    const t = setTimeout(measure, 60);
    return () => {
      window.removeEventListener("resize", onResize);
      clearTimeout(t);
    };
  }, []);

  return (
    <div ref={containerRef} className="relative">
      {/* Connector SVG (sits behind tiles) */}
      {containerSize.w > 0 && (
        <svg
          className="pointer-events-none absolute inset-0 size-full"
          width={containerSize.w}
          height={containerSize.h}
          aria-hidden
        >
          <defs>
            <linearGradient id={`branch-grad-${accent}`} x1="0" x2="1">
              <stop offset="0%" stopColor={tone.hex} stopOpacity="0.85" />
              <stop offset="100%" stopColor={tone.hex} stopOpacity="0.2" />
            </linearGradient>
          </defs>
          {paths.map((d, i) => (
            <motion.path
              key={i}
              d={d}
              fill="none"
              stroke={`url(#branch-grad-${accent})`}
              strokeWidth="2"
              strokeLinecap="round"
              strokeDasharray="6 5"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.15 + i * 0.06 }}
            />
          ))}
        </svg>
      )}

      {/* Tile grid */}
      <div className="relative grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
        {outcomes.map((o, i) => {
          const meta = CATEGORY_META[o.category];
          const Icon = meta.icon;
          const isActive = i === activeIndex;
          return (
            // NOT a <Reveal>: this tile passes its own ref (tileRefs drives the
            // connector-line geometry) and Reveal owns the ref slot. initial={false}
            // still fixes the SSR side — the tile ships visible instead of opacity:0.
            <motion.button
              initial={false}
              key={i}
              ref={(el) => {
                tileRefs.current[i] = el;
              }}
              type="button"
              onClick={() => onSelect(i)}
              onMouseEnter={() => onSelect(i)}
              whileHover={{ y: -3 }}
              className={`group relative flex flex-col items-start gap-2 rounded-2xl ring-1 p-3.5 text-left transition-all overflow-hidden ${
                isActive
                  ? `${tone.bgSoft} ${tone.ring} ${tone.glow}`
                  : "bg-bg-2/70 ring-line hover:ring-white/25"
              }`}
            >
              {isActive && (
                <span
                  aria-hidden
                  className={`pointer-events-none absolute inset-0 rounded-2xl ${tone.bg} opacity-[0.05]`}
                />
              )}
              <div className="relative w-full flex items-center justify-between">
                <div
                  className={`grid size-8 place-items-center rounded-lg ring-1 transition-all ${
                    isActive
                      ? `${tone.bg} text-bg`
                      : `${tone.bgSoft} ${tone.ring} ${tone.text} group-hover:scale-110`
                  }`}
                >
                  <Icon className="size-4" />
                </div>
                <span
                  className={`font-mono text-[10px] font-bold uppercase tracking-wider ${
                    isActive ? tone.text : "text-fg-faint"
                  }`}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>
              <div className="relative">
                <div
                  className={`font-mono text-[9px] uppercase tracking-[0.18em] font-bold ${
                    isActive ? tone.text : "text-fg-faint"
                  }`}
                >
                  {meta.label}
                </div>
                <div
                  className={`mt-1 font-display text-[12.5px] font-bold leading-tight line-clamp-3 transition-colors ${
                    isActive ? "text-fg" : "text-fg-muted group-hover:text-fg"
                  }`}
                >
                  {o.text}
                </div>
              </div>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}

/* ============================================================ */
/*  Stat helper                                                  */
/* ============================================================ */

function Stat({
  label,
  value,
  tone,
}: {
  label: string;
  value: string;
  tone: (typeof ACCENT_TOKEN)[keyof typeof ACCENT_TOKEN];
}) {
  return (
    <div className="rounded-lg bg-bg-1/60 ring-1 ring-line/60 p-2">
      <div className="font-mono text-[8px] uppercase tracking-wider text-fg-faint">
        {label}
      </div>
      <div className={`mt-0.5 text-[11px] font-bold ${tone.text}`}>{value}</div>
    </div>
  );
}
