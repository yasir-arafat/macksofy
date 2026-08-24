"use client";

import { motion } from "framer-motion";
import { Monitor, Crosshair, Award, ClipboardCheck, UserCog, ShieldCheck } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";

/**
 * Bench composition.
 *
 * Every headcount below is the approximate figure stated in
 * content/services.ts — roughly 80 SOC analysts, 25 OSCP pentesters, 15 senior
 * OSCP+/OSWE/OSEP consultants, 12 ISO 27001 Lead Auditors and 6 fractional
 * CISOs. They are shown as approximate because that is how the source states
 * them and because a bench moves.
 */

interface Pool {
  icon: typeof Monitor;
  role: string;
  count: number;
  skills: string;
  tone: string;
  bar: string;
}

const POOLS: Pool[] = [
  {
    icon: Monitor,
    role: "SOC analysts, L1–L4",
    count: 80,
    skills: "Wazuh · ELK · Splunk · Sentinel · CrowdStrike · SentinelOne · Defender XDR",
    tone: "text-cyan-300 ring-cyan-400/40 bg-cyan-400/10",
    bar: "bg-cyan-400/60",
  },
  {
    icon: Crosshair,
    role: "OSCP-certified pentesters",
    count: 25,
    skills: "Web · network · mobile · cloud, Burp Pro and Metasploit as baseline",
    tone: "text-red-300 ring-red-400/40 bg-red-400/10",
    bar: "bg-red-400/60",
  },
  {
    icon: Award,
    role: "Senior offensive consultants",
    count: 15,
    skills: "OSCP+ · OSWE · OSEP · CRTP · CRTO, red team and AD depth",
    tone: "text-violet-300 ring-violet-400/40 bg-violet-400/10",
    bar: "bg-violet-400/60",
  },
  {
    icon: ClipboardCheck,
    role: "ISO 27001 Lead Auditors",
    count: 12,
    skills: "ISO 27001 · SOC 2 · CERT-In · RBI · SEBI · PCI-DSS · HIPAA · GDPR · DPDP",
    tone: "text-emerald-300 ring-emerald-400/40 bg-emerald-400/10",
    bar: "bg-emerald-400/60",
  },
  {
    icon: UserCog,
    role: "Fractional CISOs",
    count: 6,
    skills: "Prior in-house CISO or Deputy CISO roles at regulated firms",
    tone: "text-amber-300 ring-amber-400/40 bg-amber-400/10",
    bar: "bg-amber-400/60",
  },
];

const MAX = 80;

const CLEARANCE = [
  "Indian PoS clearance for government engagements",
  "UAE police clearance for GCC deployments",
  "Multi-shift rosters with leave cover held by Macksofy",
];

export function BenchDepth() {
  return (
    <div className="rounded-2xl glass p-5 sm:p-7">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line/60 pb-5">
        <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-fg-faint">
          Bench depth · approximate, and it moves
        </div>
        <div className="font-mono text-[9px] uppercase tracking-[0.14em] text-fg-faint">
          Deployed under your management, on your tooling
        </div>
      </div>

      <div className="mt-5 space-y-3">
        {POOLS.map((p, i) => {
          const Icon = p.icon;
          return (
            <Reveal as="div" y={10} delay={i * 0.08} duration={0.34} margin="-40px"
              key={p.role}
              className="rounded-xl bg-white/[0.02] p-4 ring-1 ring-line/60"
            >
              <div className="flex items-center gap-3">
                <div className={`grid size-10 shrink-0 place-items-center rounded-lg ring-1 ${p.tone}`}>
                  <Icon className="size-[18px]" />
                </div>
                <span className="font-display text-[13px] font-bold leading-tight text-fg">
                  {p.role}
                </span>
                <span className="ml-auto font-display text-lg font-black text-fg">~{p.count}</span>
              </div>

              <div className="mt-2.5 h-1.5 overflow-hidden rounded-full bg-white/5">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${(p.count / MAX) * 100}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: i * 0.08 + 0.1 }}
                  className={`h-full ${p.bar}`}
                />
              </div>

              <p className="mt-2.5 text-[11.5px] leading-relaxed text-fg-muted">{p.skills}</p>
            </Reveal>
          );
        })}
      </div>

      <div className="mt-5 rounded-xl bg-white/[0.02] p-4 ring-1 ring-line/60">
        <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.16em] text-fg-faint">
          <ShieldCheck className="size-3.5" />
          Also available
        </div>
        <ul className="mt-2.5 grid gap-1.5 sm:grid-cols-3">
          {CLEARANCE.map((c) => (
            <li key={c} className="flex gap-2 text-[11.5px] leading-relaxed text-fg-muted">
              <span className="mt-0.5 shrink-0 text-fg-faint">▸</span>
              <span>{c}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
