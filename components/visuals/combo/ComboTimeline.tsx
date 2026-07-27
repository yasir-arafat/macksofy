"use client";

import { motion } from "framer-motion";
import {
  Compass,
  Search,
  Bug,
  ShieldCheck,
  FileText,
  Clock,
  type LucideIcon,
} from "lucide-react";

interface Phase {
  phase: string;
  activities: string[];
  duration?: string;
}

const ICONS: LucideIcon[] = [Compass, Search, Bug, ShieldCheck, FileText];
const ACCENTS = [
  "text-neon-cyan ring-neon-cyan/40 bg-neon-cyan/10",
  "text-violet-300 ring-violet-400/40 bg-violet-400/10",
  "text-amber-300 ring-amber-400/40 bg-amber-400/10",
  "text-rose-300 ring-rose-400/40 bg-rose-400/10",
  "text-emerald-300 ring-emerald-400/40 bg-emerald-400/10",
];

/** Typical pentest engagement cadence — used when a phase has no explicit duration. */
const DEFAULT_DURATIONS = ["Week 1", "Weeks 1–2", "Weeks 2–4", "Weeks 4–5", "Weeks 5–6"];

const cleanLabel = (s: string) => s.replace(/^\d+\s*[·.\-]\s*/, "");
const pad = (i: number) => String(i + 1).padStart(2, "0");
const durationOf = (p: Phase, i: number) => p.duration ?? DEFAULT_DURATIONS[i] ?? null;

export function ComboTimeline({ phases }: { phases: Phase[] }) {
  const n = phases.length;
  // inset the connecting rail so it runs marker-center → marker-center (gap-4 = 1rem)
  const railInset = `calc((100% - ${n - 1}rem) / ${2 * n})`;

  return (
    <div className="relative">
      {/* ─── DESKTOP (lg+): horizontal connected card-stepper ─── */}
      <div className="hidden lg:block">
        <ol
          className="relative grid gap-4"
          style={{ gridTemplateColumns: `repeat(${n}, minmax(0, 1fr))` }}
        >
          {/* connecting rail — terminates at the first and last station markers */}
          <motion.span
            aria-hidden
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            style={{ originX: 0, left: railInset, right: railInset }}
            className="pointer-events-none absolute top-7 z-0 h-px bg-gradient-to-r from-neon-cyan via-amber-300 to-emerald-300 opacity-60"
          />
          {phases.map((p, i) => {
            const Icon = ICONS[i % ICONS.length];
            const accent = ACCENTS[i % ACCENTS.length];
            const dot = accent.split(" ")[0];
            const dur = durationOf(p, i);
            return (
              <motion.li
                key={p.phase}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{
                  delay: 0.1 + i * 0.09,
                  duration: 0.5,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="relative z-10 pt-7"
              >
                {/* station marker straddling the card's top edge */}
                <div className="absolute left-1/2 top-0 -translate-x-1/2">
                  <div
                    className={`grid size-14 place-items-center rounded-2xl bg-bg-2 ring-1 ${accent}`}
                  >
                    <Icon className="size-6" />
                  </div>
                </div>
                {/* phase card */}
                <div className="flex h-full flex-col rounded-2xl glass px-5 pb-5 pt-10 text-center transition-[color,background-color,border-color,box-shadow] ring-1 ring-transparent hover:ring-line lift">
                  <span
                    className={`font-mono text-[10px] font-semibold uppercase tracking-[0.2em] ${dot}`}
                  >
                    Phase {pad(i)}
                  </span>
                  <h3 className="mt-1.5 font-display text-[15px] font-bold leading-tight text-fg">
                    {cleanLabel(p.phase)}
                  </h3>
                  {dur && (
                    <span className="mx-auto mt-2.5 inline-flex items-center gap-1 rounded-full border border-line/70 bg-bg-2/60 px-2.5 py-0.5 font-mono text-[10px] text-fg-muted">
                      <Clock className="size-3 opacity-70" />
                      {dur}
                    </span>
                  )}
                  <span
                    className={`mx-auto mt-3 block h-px w-8 bg-current opacity-40 ${dot}`}
                  />
                  <ul className="mt-4 space-y-2 text-left">
                    {p.activities.slice(0, 5).map((act) => (
                      <li
                        key={act}
                        className="flex gap-2 text-[12px] leading-snug text-fg-muted"
                      >
                        <span
                          className={`mt-[6px] size-1 shrink-0 rounded-full bg-current ${dot}`}
                        />
                        <span>{act}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.li>
            );
          })}
        </ol>
      </div>

      {/* ─── MOBILE / TABLET (<lg): vertical timeline ─── */}
      <div className="lg:hidden">
        <ol>
          {phases.map((p, i) => {
            const Icon = ICONS[i % ICONS.length];
            const accent = ACCENTS[i % ACCENTS.length];
            const dot = accent.split(" ")[0];
            const dur = durationOf(p, i);
            const last = i === n - 1;
            return (
              <motion.li
                key={p.phase}
                initial={{ opacity: 0, x: 12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ delay: i * 0.06, duration: 0.4 }}
                className="flex gap-4"
              >
                {/* gutter: marker + connector that grows to the next marker */}
                <div className="flex flex-col items-center">
                  <div
                    className={`grid size-12 shrink-0 place-items-center rounded-2xl bg-bg-2 ring-1 ${accent}`}
                  >
                    <Icon className="size-5" />
                  </div>
                  {!last && (
                    <span
                      aria-hidden
                      className={`my-1.5 w-px flex-1 bg-current opacity-30 ${dot}`}
                    />
                  )}
                </div>
                {/* card */}
                <div className={`min-w-0 flex-1 ${last ? "" : "pb-5"}`}>
                  <div className="rounded-2xl glass p-4">
                    <div className="flex items-center justify-between gap-3">
                      <span
                        className={`font-mono text-[10px] font-semibold uppercase tracking-[0.2em] ${dot}`}
                      >
                        Phase {pad(i)}
                      </span>
                      {dur && (
                        <span className="inline-flex items-center gap-1 rounded-full border border-line/70 bg-bg-2/60 px-2 py-0.5 font-mono text-[10px] text-fg-muted">
                          <Clock className="size-3 opacity-70" />
                          {dur}
                        </span>
                      )}
                    </div>
                    <h3 className="mt-1.5 font-display text-sm font-bold leading-tight text-fg">
                      {cleanLabel(p.phase)}
                    </h3>
                    <ul className="mt-2.5 space-y-1.5">
                      {p.activities.slice(0, 5).map((act) => (
                        <li
                          key={act}
                          className="flex gap-2 text-[12px] leading-snug text-fg-muted"
                        >
                          <span
                            className={`mt-[6px] size-1 shrink-0 rounded-full bg-current ${dot}`}
                          />
                          <span>{act}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.li>
            );
          })}
        </ol>
      </div>
    </div>
  );
}
