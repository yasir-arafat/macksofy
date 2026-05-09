"use client";

import { motion } from "framer-motion";
import {
  Globe,
  Server,
  Cloud,
  Smartphone,
  Cpu,
  Network,
  Check,
  Bug,
  type LucideIcon,
} from "lucide-react";

type CellState = "deep" | "scan" | "manual" | "off";

const ASSETS: { label: string; icon: LucideIcon }[] = [
  { label: "External perimeter", icon: Globe },
  { label: "Internal network", icon: Network },
  { label: "Web app + API", icon: Server },
  { label: "Mobile (iOS / Android)", icon: Smartphone },
  { label: "Cloud (AWS / Azure / GCP)", icon: Cloud },
  { label: "Containers / IaC", icon: Cpu },
];

const COLS = ["Authenticated scan", "Unauthenticated scan", "Manual exploitation", "Chain analysis"] as const;

// Each row: 4 cells matching COLS order
const MATRIX: CellState[][] = [
  ["deep", "deep", "manual", "manual"],   // External perimeter
  ["deep", "scan", "manual", "manual"],   // Internal
  ["deep", "deep", "manual", "manual"],   // Web/API
  ["deep", "off", "manual", "manual"],    // Mobile
  ["deep", "scan", "manual", "manual"],   // Cloud
  ["deep", "scan", "manual", "off"],      // Containers
];

const CELL_STYLE: Record<CellState, { bg: string; ring: string; label: string; icon: LucideIcon | null }> = {
  deep:   { bg: "bg-neon-cyan/15",   ring: "ring-neon-cyan/40",   label: "✓",     icon: Check },
  scan:   { bg: "bg-emerald-500/15", ring: "ring-emerald-400/40", label: "scan",  icon: Check },
  manual: { bg: "bg-red-500/15",     ring: "ring-red-400/40",     label: "manual",icon: Bug },
  off:    { bg: "bg-bg-2",           ring: "ring-line/40",        label: "—",     icon: null },
};

export function CoverageMatrix() {
  return (
    <div className="rounded-2xl glass p-3 sm:p-5 overflow-x-auto">
      <table className="w-full min-w-[640px] text-sm border-separate border-spacing-1.5">
        <thead>
          <tr>
            <th className="text-left font-mono text-[10px] uppercase tracking-[0.2em] text-fg-faint pb-2 pl-2">
              Asset class \ Test depth
            </th>
            {COLS.map((c) => (
              <th
                key={c}
                className="text-center font-mono text-[10px] uppercase tracking-[0.2em] text-fg-faint pb-2"
              >
                {c}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {ASSETS.map((row, ri) => {
            const RowIcon = row.icon;
            return (
              <tr key={row.label}>
                <th
                  scope="row"
                  className="text-left font-semibold text-fg pl-2 pr-3 align-middle"
                >
                  <span className="inline-flex items-center gap-2">
                    <RowIcon className="size-4 text-neon-cyan" />
                    {row.label}
                  </span>
                </th>
                {MATRIX[ri].map((state, ci) => {
                  const s = CELL_STYLE[state];
                  const Icon = s.icon;
                  return (
                    <td key={ci} className="p-0">
                      <motion.div
                        initial={{ opacity: 0, scale: 0.92 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: ri * 0.05 + ci * 0.04, duration: 0.35 }}
                        className={`mx-auto flex h-10 items-center justify-center rounded-lg ring-1 ${s.bg} ${s.ring}`}
                      >
                        {Icon ? (
                          <span className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-wider text-fg">
                            <Icon className="size-3.5" />
                            {state !== "deep" && s.label}
                          </span>
                        ) : (
                          <span className="font-mono text-[11px] text-fg-faint">{s.label}</span>
                        )}
                      </motion.div>
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-[10px] font-mono uppercase tracking-wider text-fg-faint pl-2">
        <span className="inline-flex items-center gap-1.5">
          <span className="size-2 rounded-sm bg-neon-cyan/60" /> deep coverage
        </span>
        <span className="inline-flex items-center gap-1.5">
          <span className="size-2 rounded-sm bg-emerald-400/60" /> scanner pass
        </span>
        <span className="inline-flex items-center gap-1.5">
          <span className="size-2 rounded-sm bg-red-400/60" /> manual exploitation
        </span>
        <span className="inline-flex items-center gap-1.5">
          <span className="size-2 rounded-sm bg-line" /> not applicable
        </span>
      </div>
    </div>
  );
}
