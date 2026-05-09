"use client";

import { motion } from "framer-motion";
import { HardDrive, Cpu, FileSearch, Lock, Gavel, ArrowRight } from "lucide-react";

const STAGES = [
  { icon: HardDrive, label: "Acquisition", note: "FTK Imager · write-blocker · SHA-256 captured" },
  { icon: Cpu, label: "Live capture", note: "Volatility 3 memory · network state · open handles" },
  { icon: Lock, label: "Sealed evidence", note: "Encrypted storage · access log · custodian signed" },
  { icon: FileSearch, label: "Examination", note: "Air-gapped lab · Autopsy · Plaso timeline" },
  { icon: Gavel, label: "Court-admissible", note: "Chain log · expert testimony · CERT-In format" },
];

export function ChainOfCustody() {
  return (
    <div className="rounded-2xl glass p-6 sm:p-8">
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        {STAGES.map((s, i) => {
          const Icon = s.icon;
          return (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.4 }}
              className="relative"
            >
              <div className="rounded-xl ring-1 ring-line bg-bg/60 p-4 h-full">
                <div className="grid size-9 place-items-center rounded-lg bg-bg-1 ring-1 ring-neon-cyan/30 text-neon-cyan">
                  <Icon className="size-4" />
                </div>
                <div className="mt-3 font-mono text-[9px] uppercase tracking-wider text-fg-faint">
                  Stage {String(i + 1).padStart(2, "0")}
                </div>
                <div className="font-display text-sm font-bold text-fg leading-tight">
                  {s.label}
                </div>
                <p className="mt-1 text-[11px] text-fg-muted leading-snug">{s.note}</p>
              </div>
              {i < STAGES.length - 1 && (
                <ArrowRight
                  aria-hidden
                  className="hidden lg:block absolute top-1/2 -right-3 -translate-y-1/2 size-4 text-neon-cyan/40"
                />
              )}
            </motion.div>
          );
        })}
      </div>

      <div className="mt-6 pt-5 border-t border-line/60 flex flex-wrap items-center gap-x-6 gap-y-2 text-[10px] font-mono uppercase tracking-wider text-fg-faint">
        <span className="inline-flex items-center gap-2">
          <span className="size-1.5 rounded-full bg-emerald-400 animate-pulse" />
          court-admissible since 2014
        </span>
        <span>· accepted by RBI · CERT-In · India courts</span>
      </div>
    </div>
  );
}
