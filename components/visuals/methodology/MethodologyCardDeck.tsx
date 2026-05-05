"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Play, Pause } from "lucide-react";
import { ACCENT_TOKEN, type MethodologyAccent, type MethodologyPhase } from "./Methodology";

interface Props {
  phases: MethodologyPhase[];
  accent: MethodologyAccent;
  subjectLabel?: string;
}

const SLIDE_MS = 6000;

/**
 * Style 5 — CARDDECK
 * Stacked card carousel with auto-advance, manual nav, pause/play, and a
 * progress ring around the slide counter. Behind cards peek through.
 */
export function MethodologyCardDeck({ phases, accent }: Props) {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [direction, setDirection] = useState(0);

  const tone = ACCENT_TOKEN[accent];
  const current = phases[active];

  // Auto-advance
  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => {
      setDirection(1);
      setActive((v) => (v + 1) % phases.length);
    }, SLIDE_MS);
    return () => clearInterval(id);
  }, [paused, phases.length]);

  const go = (delta: number) => {
    setDirection(delta);
    setPaused(true);
    setActive((v) => (v + delta + phases.length) % phases.length);
  };

  return (
    <div className="rounded-3xl bg-gradient-to-br from-bg-2/60 to-bg-1/40 ring-1 ring-line p-5 sm:p-7 relative overflow-hidden">
      <div
        aria-hidden
        className={`absolute -top-20 -right-20 size-72 rounded-full ${tone.bgSoft} blur-3xl pointer-events-none`}
      />
      <div
        aria-hidden
        className={`absolute -bottom-32 -left-20 size-72 rounded-full ${tone.bgSoft} blur-3xl pointer-events-none opacity-50`}
      />

      {/* TOP STRIP: counter + controls */}
      <div className="relative flex items-center justify-between gap-3 mb-5">
        <div className="flex items-center gap-3">
          <div className="relative grid place-items-center size-12">
            {/* Progress ring */}
            <svg className="absolute inset-0 -rotate-90" viewBox="0 0 48 48">
              <circle
                cx="24"
                cy="24"
                r="20"
                fill="none"
                stroke="rgba(255,255,255,0.08)"
                strokeWidth="2"
              />
              {!paused && (
                <motion.circle
                  key={`progress-${active}`}
                  cx="24"
                  cy="24"
                  r="20"
                  fill="none"
                  stroke={tone.hex}
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeDasharray="125.6"
                  initial={{ strokeDashoffset: 125.6 }}
                  animate={{ strokeDashoffset: 0 }}
                  transition={{ duration: SLIDE_MS / 1000, ease: "linear" }}
                />
              )}
            </svg>
            <span className={`font-display text-sm font-black ${tone.text}`}>
              {String(active + 1).padStart(2, "0")}
            </span>
          </div>
          <div>
            <div className={`font-mono text-[10px] uppercase tracking-[0.22em] font-bold ${tone.text}`}>
              Methodology · slide {active + 1} of {phases.length}
            </div>
            <div className="text-[11px] text-fg-faint mt-0.5">
              {paused ? "Paused — use arrows to navigate" : "Auto-advancing"}
            </div>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => go(-1)}
            className="grid size-9 place-items-center rounded-full bg-bg ring-1 ring-line text-fg-muted hover:text-fg hover:ring-white/30 transition-all"
            aria-label="Previous phase"
          >
            <ChevronLeft className="size-4" />
          </button>
          <button
            type="button"
            onClick={() => setPaused((v) => !v)}
            className={`grid size-9 place-items-center rounded-full ring-1 transition-all ${
              paused
                ? `${tone.bgSoft} ${tone.ring} ${tone.text}`
                : "bg-bg ring-line text-fg-muted hover:text-fg"
            }`}
            aria-label={paused ? "Play" : "Pause"}
          >
            {paused ? <Play className="size-3.5" /> : <Pause className="size-3.5" />}
          </button>
          <button
            type="button"
            onClick={() => go(1)}
            className="grid size-9 place-items-center rounded-full bg-bg ring-1 ring-line text-fg-muted hover:text-fg hover:ring-white/30 transition-all"
            aria-label="Next phase"
          >
            <ChevronRight className="size-4" />
          </button>
        </div>
      </div>

      {/* CARD STACK — overlapping peek + animated active card */}
      <div className="relative h-[360px] sm:h-[320px]">
        {/* Background peek cards */}
        {phases.map((_, i) => {
          const offset = i - active;
          if (offset === 0) return null;
          if (Math.abs(offset) > 2) return null;
          const dir = offset > 0 ? 1 : -1;
          return (
            <div
              key={`peek-${i}`}
              className="absolute inset-x-0 inset-y-0 rounded-2xl bg-bg-2/80 ring-1 ring-line"
              style={{
                transform: `translate(${dir * 18}px, ${Math.abs(offset) * 12}px) scale(${1 - Math.abs(offset) * 0.04})`,
                opacity: 1 - Math.abs(offset) * 0.4,
                zIndex: 5 - Math.abs(offset),
              }}
            />
          );
        })}
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={current.phase}
            custom={direction}
            initial={{ opacity: 0, x: direction * 60, scale: 0.96 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: direction * -60, scale: 0.96 }}
            transition={{ type: "spring", stiffness: 280, damping: 30 }}
            className="absolute inset-0 rounded-2xl bg-bg-2 ring-1 ring-line p-6 sm:p-7 z-10 overflow-y-auto"
          >
            <div className="flex items-baseline justify-between gap-3 flex-wrap">
              <div className={`font-mono text-[10px] uppercase tracking-[0.22em] font-bold ${tone.text}`}>
                Phase {String(active + 1).padStart(2, "0")} / {phases.length}
              </div>
              <div className="font-mono text-[10px] text-fg-faint">
                {current.activities.length} activities
              </div>
            </div>
            <h4 className="mt-2 font-display text-2xl sm:text-3xl font-black text-fg leading-tight">
              {current.phase}
            </h4>
            <ul className="mt-5 grid gap-2.5 sm:grid-cols-2">
              {current.activities.map((a, i) => (
                <motion.li
                  key={a}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.06 + i * 0.05 }}
                  className="flex gap-2.5 rounded-lg bg-bg-1/60 p-3"
                >
                  <span className={`mt-1.5 size-1.5 shrink-0 rounded-full ${tone.bg}`} />
                  <span className="text-sm text-fg-muted leading-relaxed">{a}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* DOT NAV */}
      <div className="relative mt-5 flex items-center justify-center gap-1.5">
        {phases.map((p, i) => (
          <button
            key={i}
            type="button"
            onClick={() => {
              setDirection(i > active ? 1 : -1);
              setActive(i);
              setPaused(true);
            }}
            aria-label={`Go to phase ${i + 1}: ${p.phase}`}
            className="group p-1"
          >
            <span
              className={`block transition-all rounded-full ${
                active === i
                  ? `${tone.bg} w-8 h-1.5`
                  : "bg-fg-faint/40 w-1.5 h-1.5 group-hover:bg-fg-muted"
              }`}
            />
          </button>
        ))}
      </div>
    </div>
  );
}
