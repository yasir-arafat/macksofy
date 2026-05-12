"use client";

import { motion } from "framer-motion";
import {
  Compass,
  Search,
  Bug,
  ShieldCheck,
  FileText,
  type LucideIcon,
} from "lucide-react";

interface Phase {
  phase: string;
  activities: string[];
}

const ICONS: LucideIcon[] = [Compass, Search, Bug, ShieldCheck, FileText];
const ACCENTS = [
  "text-neon-cyan ring-neon-cyan/40 bg-neon-cyan/10",
  "text-violet-300 ring-violet-400/40 bg-violet-400/10",
  "text-amber-300 ring-amber-400/40 bg-amber-400/10",
  "text-rose-300 ring-rose-400/40 bg-rose-400/10",
  "text-emerald-300 ring-emerald-400/40 bg-emerald-400/10",
];

export function ComboTimeline({ phases }: { phases: Phase[] }) {
  const n = phases.length;
  return (
    <div className="relative">
      {/* horizontal flow on lg+, stacked on mobile */}
      <div className="relative overflow-x-auto pb-4 lg:overflow-visible">
        <div
          className="relative min-w-[720px] lg:min-w-0"
          style={{
            display: "grid",
            gridTemplateColumns: `repeat(${n}, minmax(0, 1fr))`,
            columnGap: "1rem",
          }}
        >
          {/* sweeping gradient rail */}
          <motion.span
            aria-hidden
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
            style={{ originX: 0 }}
            className="absolute left-0 right-0 top-[22px] h-px bg-gradient-to-r from-neon-cyan via-amber-300 to-emerald-300"
          />
          {phases.map((p, i) => {
            const Icon = ICONS[i % ICONS.length];
            const accent = ACCENTS[i % ACCENTS.length];
            return (
              <motion.div
                key={p.phase}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ delay: 0.25 + i * 0.1, duration: 0.45 }}
                className="relative flex flex-col items-stretch text-center"
              >
                {/* station marker */}
                <div className="relative flex justify-center">
                  <div
                    className={`relative grid size-12 place-items-center rounded-full bg-bg-2 ring-2 ${accent}`}
                  >
                    <Icon className="size-5" />
                    <span className="absolute -top-1.5 -right-1.5 grid size-5 place-items-center rounded-full bg-bg ring-1 ring-line font-mono text-[9px] font-bold text-fg-muted">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                </div>
                <div className="mt-4 font-mono text-[10px] uppercase tracking-[0.18em] text-fg-faint">
                  Phase {String(i + 1).padStart(2, "0")}
                </div>
                <div className="mt-1.5 font-display text-sm font-bold text-fg leading-tight line-clamp-2 min-h-[2.5em]">
                  {p.phase.replace(/^\d+\s*[·.\-]\s*/, "")}
                </div>
                {/* activity bullets */}
                <ul className="mt-3 text-left space-y-1.5 px-1">
                  {p.activities.slice(0, 4).map((a) => (
                    <li
                      key={a}
                      className="text-[11px] leading-snug text-fg-muted flex gap-1.5"
                    >
                      <span className={`mt-1 size-1 shrink-0 rounded-full bg-current opacity-70 ${accent.split(" ")[0]}`} />
                      <span>{a}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
