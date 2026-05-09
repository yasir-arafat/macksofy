"use client";

import { motion } from "framer-motion";
import {
  Eye,
  KeyRound,
  Cpu,
  Network,
  Database,
  ChevronRight,
  Skull,
} from "lucide-react";

const STEPS = [
  {
    icon: Eye,
    label: "Reconnaissance",
    detail: "OSINT · employee profiling · attack surface mapping",
    accent: "text-neon-cyan ring-neon-cyan/40 from-neon-cyan/10 to-transparent",
    note: "Day 1–7",
  },
  {
    icon: KeyRound,
    label: "Initial Access",
    detail: "Spear-phish with custom macro · zero AV detection",
    accent: "text-violet-300 ring-violet-400/40 from-violet-400/10 to-transparent",
    note: "Day 8–10",
  },
  {
    icon: Cpu,
    label: "Foothold + EDR Evasion",
    detail: "Indirect syscalls · process hollowing · Cobalt Strike beacon",
    accent: "text-orange-300 ring-orange-400/40 from-orange-400/10 to-transparent",
    note: "Day 11–14",
  },
  {
    icon: Network,
    label: "Lateral Movement",
    detail: "Kerberoast · RBCD · pass-the-ticket · BloodHound paths",
    accent: "text-red-400 ring-red-400/40 from-red-400/10 to-transparent",
    note: "Day 15–24",
  },
  {
    icon: Skull,
    label: "Privilege Escalation",
    detail: "Domain Admin via NoPac · DCSync · golden ticket",
    accent: "text-pink-400 ring-pink-400/40 from-pink-400/10 to-transparent",
    note: "Day 25–32",
  },
  {
    icon: Database,
    label: "Objective + Exfil",
    detail: "Customer DB exfil · DNS tunnel · 4 GB across 11 days",
    accent: "text-amber-300 ring-amber-400/40 from-amber-400/10 to-transparent",
    note: "Day 33–44",
  },
];

export function KillChainGraph() {
  return (
    <div className="relative">
      {/* vertical glow line */}
      <div
        aria-hidden
        className="absolute left-[27px] sm:left-[35px] top-4 bottom-4 w-px bg-gradient-to-b from-neon-cyan/0 via-red-400/40 to-amber-400/0"
      />

      <ol className="space-y-4">
        {STEPS.map((s, i) => {
          const Icon = s.icon;
          return (
            <motion.li
              key={s.label}
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              className="relative flex gap-4 sm:gap-5"
            >
              <div className="relative shrink-0">
                <div
                  className={`relative grid size-14 sm:size-[70px] place-items-center rounded-2xl bg-gradient-to-br ${s.accent} ring-1`}
                >
                  <Icon className="size-6 sm:size-7" />
                </div>
                <div className="absolute -top-2 -right-2 grid size-6 place-items-center rounded-full bg-bg ring-1 ring-line font-mono text-[10px] font-bold text-fg-muted">
                  {String(i + 1).padStart(2, "0")}
                </div>
              </div>
              <div className="flex-1 pt-1 pb-4">
                <div className="flex items-baseline gap-3 flex-wrap">
                  <h3 className="font-display text-lg font-bold text-fg">{s.label}</h3>
                  <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-fg-faint">
                    · {s.note}
                  </span>
                </div>
                <p className="mt-1.5 text-sm text-fg-muted leading-relaxed">{s.detail}</p>
                {i < STEPS.length - 1 && (
                  <div className="mt-3 flex items-center gap-1 text-fg-faint text-xs">
                    <ChevronRight className="size-3" />
                    <span className="font-mono uppercase tracking-wider">chained</span>
                  </div>
                )}
              </div>
            </motion.li>
          );
        })}
      </ol>
    </div>
  );
}
