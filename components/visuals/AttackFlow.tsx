"use client";

import { motion } from "framer-motion";
import {
  Search,
  Crosshair,
  Bug,
  Lock,
  Network,
  FileText,
} from "lucide-react";
import { cn } from "@/lib/utils";

const STAGES = [
  { icon: Search, label: "Recon", desc: "OSINT, ASN/IP mapping, subdomain enumeration" },
  { icon: Crosshair, label: "Threat Modeling", desc: "Attack surface mapping + attacker profile" },
  { icon: Bug, label: "Exploitation", desc: "Manual + tooled (Burp, Metasploit, custom payloads)" },
  { icon: Lock, label: "Privilege Escalation", desc: "Linux / Win, AD abuse, kernel exploits" },
  { icon: Network, label: "Lateral Movement", desc: "Pivoting, BloodHound paths, persistence" },
  { icon: FileText, label: "Reporting", desc: "Executive summary + dev-ready remediation" },
] as const;

export function AttackFlow({ className }: { className?: string }) {
  return (
    <div className={cn("relative w-full max-w-5xl mx-auto", className)}>
      {/* Connecting line */}
      <div
        aria-hidden
        className="hidden lg:block absolute top-[42px] left-12 right-12 h-px bg-gradient-to-r from-transparent via-neon-cyan/30 to-transparent"
      />

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6 lg:gap-4 items-stretch">
        {STAGES.map((stage, i) => (
          <motion.div
            key={stage.label}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08, duration: 0.45 }}
            className="relative h-full"
          >
            <div className="glass rounded-xl p-4 h-full flex flex-col hover:border-neon-cyan/40 transition-colors lift">
              <div className="relative grid size-11 place-items-center rounded-lg bg-bg ring-1 ring-neon-cyan/30 mb-3 shrink-0">
                <div className="absolute inset-0 bg-neon-cyan/15 rounded-lg blur-md" />
                <stage.icon className="relative size-5 text-neon-cyan" />
              </div>
              <div className="font-mono text-[10px] uppercase tracking-[0.16em] text-fg-faint mb-1">
                Phase {String(i + 1).padStart(2, "0")}
              </div>
              <div className="font-display font-bold text-sm text-fg leading-tight min-h-[2.5em]">
                {stage.label}
              </div>
              <div className="mt-2 text-[11px] text-fg-muted leading-snug">
                {stage.desc}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
