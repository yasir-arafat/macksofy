"use client";

import { motion } from "framer-motion";
import { Headphones, SearchCode, Brain, Siren, Clock } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";

/**
 * The analyst pod and its SLA ladder.
 *
 * Tier-1 15-minute triage and Tier-2 30-minute investigation SLAs come from
 * phase 3 of the methodology in content/services.ts. Tier-3 and IR on-call are
 * described without an invented clock, because the source does not state one.
 */

const TIERS = [
  {
    icon: Headphones,
    tier: "Tier 1",
    role: "Triage",
    sla: "15 min",
    tone: "text-cyan-300 ring-cyan-400/40 bg-cyan-400/10",
    bar: "bg-cyan-400/60",
    width: 100,
    does: [
      "Alert triage against the agreed runbook",
      "Enrichment, dedup and false-positive suppression",
      "Escalation with context attached, not a ticket number",
    ],
  },
  {
    icon: SearchCode,
    tier: "Tier 2",
    role: "Investigation",
    sla: "30 min",
    tone: "text-violet-300 ring-violet-400/40 bg-violet-400/10",
    bar: "bg-violet-400/60",
    width: 66,
    does: [
      "Scoping: one host or a foothold?",
      "Timeline reconstruction across endpoint, identity and cloud logs",
      "Containment recommendation against pre-approved playbooks",
    ],
  },
  {
    icon: Brain,
    tier: "Tier 3",
    role: "Detection engineering & hunting",
    sla: "Continuous",
    tone: "text-amber-300 ring-amber-400/40 bg-amber-400/10",
    bar: "bg-amber-400/60",
    width: 42,
    does: [
      "Use-case backlog worked by risk, not by vendor roadmap",
      "Threat hunts aligned to your sector's actors",
      "Noise tuning measured against the false-positive ratio",
    ],
  },
  {
    icon: Siren,
    tier: "IR on-call",
    role: "Incident command",
    sla: "Retained hours",
    tone: "text-red-300 ring-red-400/40 bg-red-400/10",
    bar: "bg-red-400/60",
    width: 24,
    does: [
      "DFIR hours rolled into the contract, not quoted mid-incident",
      "Forensic preservation and chain of custody where litigation is likely",
      "Regulator notification support",
    ],
  },
];

export function SocPod() {
  return (
    <div className="rounded-2xl glass p-5 sm:p-7">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line/60 pb-5">
        <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-fg-faint">
          The pod · 24×7 across four tiers
        </div>
        <div className="inline-flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-[0.14em] text-fg-faint">
          <Clock className="size-3" />
          Bar width = volume reaching that tier
        </div>
      </div>

      <div className="mt-5 space-y-3">
        {TIERS.map((t, i) => {
          const Icon = t.icon;
          return (
            <Reveal as="div" y={10} delay={i * 0.08} duration={0.34} margin="-40px"
              key={t.tier}
              className="rounded-xl bg-white/[0.02] p-4 ring-1 ring-line/60"
            >
              <div className="flex flex-wrap items-center gap-3">
                <div className={`grid size-10 shrink-0 place-items-center rounded-lg ring-1 ${t.tone}`}>
                  <Icon className="size-[18px]" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-baseline gap-x-2.5 gap-y-0.5">
                    <span className="font-display text-[13px] font-bold text-fg">{t.tier}</span>
                    <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-fg-faint">
                      {t.role}
                    </span>
                  </div>
                </div>
                <span className="rounded-full border border-line px-2 py-0.5 font-mono text-[10px] tracking-wider text-fg-muted">
                  {t.sla}
                </span>
              </div>

              <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/5">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${t.width}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: i * 0.08 + 0.1 }}
                  className={`h-full ${t.bar}`}
                />
              </div>

              <ul className="mt-3 grid gap-1.5 sm:grid-cols-3">
                {t.does.map((d) => (
                  <li key={d} className="flex gap-2 text-[11.5px] leading-relaxed text-fg-muted">
                    <span className="mt-0.5 shrink-0 text-fg-faint">▸</span>
                    <span>{d}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          );
        })}
      </div>

      <p className="mt-5 border-t border-line/60 pt-4 text-[11px] leading-relaxed text-fg-faint">
        Tier-1 and Tier-2 response times are contracted SLAs. Tier-3 and hunting
        run continuously against an agreed backlog rather than a clock.
      </p>
    </div>
  );
}
