"use client";

import { motion } from "framer-motion";
import { Reveal } from "@/components/motion/Reveal";

const STAGES = [
  { label: "Raw events ingested", value: 12_400_000, suffix: "/day", widthPct: 100, color: "from-neon-cyan/30 to-neon-cyan/0", text: "text-neon-cyan" },
  { label: "Correlated to detection rules", value: 18_400, suffix: "/day", widthPct: 75, color: "from-violet-400/30 to-violet-400/0", text: "text-violet-300" },
  { label: "Analyst-triaged alerts", value: 412, suffix: "/day", widthPct: 48, color: "from-amber-400/30 to-amber-400/0", text: "text-amber-300" },
  { label: "Incidents declared", value: 11, suffix: "/day", widthPct: 24, color: "from-orange-400/30 to-orange-400/0", text: "text-orange-300" },
  { label: "Escalated to client CISO", value: 2, suffix: "/day", widthPct: 12, color: "from-red-400/30 to-red-400/0", text: "text-red-400" },
];

const fmt = (n: number) =>
  n >= 1_000_000 ? (n / 1_000_000).toFixed(1) + "M" : n >= 1_000 ? (n / 1_000).toFixed(1) + "K" : String(n);

export function AlertFunnel() {
  return (
    <div className="rounded-2xl glass p-6 sm:p-8">
      <div className="space-y-3">
        {STAGES.map((s, i) => (
          <Reveal as="div" y={10} delay={i * 0.12} duration={0.45}
            key={s.label}
            className="relative"
          >
            <div className="flex items-baseline justify-between mb-1.5 gap-3 flex-wrap">
              <div className="flex items-baseline gap-2">
                <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-fg-faint">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="text-sm font-semibold text-fg">{s.label}</span>
              </div>
              <span className={`font-mono text-lg font-black tabular-nums ${s.text}`}>
                {fmt(s.value)}
                <span className="text-xs text-fg-faint font-normal ml-1">{s.suffix}</span>
              </span>
            </div>
            <div className="h-9 rounded-lg ring-1 ring-line/40 bg-bg-2/40 overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: `${s.widthPct}%` }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12 + 0.15, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className={`h-full bg-gradient-to-r ${s.color}`}
              />
            </div>
          </Reveal>
        ))}
      </div>

      {/* gauge readouts */}
      <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6 border-t border-line/60">
        {[
          { v: "8 min", k: "MTTD" },
          { v: "47 min", k: "MTTR" },
          { v: "24×7", k: "shift coverage" },
          { v: "92%", k: "true-positive rate" },
        ].map((m) => (
          <div key={m.k} className="text-center">
            <div className="font-display text-xl sm:text-2xl font-black gradient-text leading-none">
              {m.v}
            </div>
            <div className="mt-1.5 font-mono text-[9px] uppercase tracking-wider text-fg-faint">
              {m.k}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
