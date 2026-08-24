"use client";

import { Phone, FolderSearch, Activity, ShieldCheck, FileText, Wrench } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";

const STAGES = [
  { t: "T+0", title: "Triage call", desc: "30-min bridge · scope · isolate · engagement letter", icon: Phone, color: "text-red-400 ring-red-400/40" },
  { t: "T+2h", title: "Evidence collection", desc: "Velociraptor agents · KAPE offline · cloud log preservation", icon: FolderSearch, color: "text-amber-300 ring-amber-400/40" },
  { t: "T+8h", title: "Live analysis", desc: "Volatility 3 memory · Plaso timeline · IOC extraction", icon: Activity, color: "text-violet-300 ring-violet-400/40" },
  { t: "T+24h", title: "Containment", desc: "Attacker eviction · persistence removal · cred reset", icon: ShieldCheck, color: "text-orange-300 ring-orange-400/40" },
  { t: "T+72h", title: "CERT-In report", desc: "6-hour-rule compliant · insurance · legal-ready", icon: FileText, color: "text-neon-cyan ring-neon-cyan/40" },
  { t: "T+7d", title: "Recovery + lessons", desc: "Hardening plan · detection upgrades · tabletop replay", icon: Wrench, color: "text-emerald-400 ring-emerald-400/40" },
];

export function IncidentTimeline() {
  return (
    <div className="relative">
      <div
        aria-hidden
        className="absolute left-[20px] sm:left-[28px] top-3 bottom-3 w-px bg-gradient-to-b from-red-400/40 via-amber-400/40 to-emerald-400/40"
      />
      <ol className="space-y-3">
        {STAGES.map((s, i) => {
          const Icon = s.icon;
          return (
            <Reveal as="li" y={0} delay={i * 0.08} duration={0.45} margin="-60px"
              key={s.t}
              className="relative flex gap-4 sm:gap-5"
            >
              <div className={`relative shrink-0 grid size-10 sm:size-14 place-items-center rounded-xl bg-bg-1/60 ring-1 ${s.color}`}>
                <Icon className="size-4 sm:size-5" />
              </div>
              <div className="flex-1 rounded-xl glass p-4">
                <div className="flex items-baseline justify-between gap-3 flex-wrap">
                  <h3 className="font-display text-base font-bold text-fg">{s.title}</h3>
                  <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-fg-faint">
                    {s.t}
                  </span>
                </div>
                <p className="mt-1 text-sm text-fg-muted leading-relaxed">{s.desc}</p>
              </div>
            </Reveal>
          );
        })}
      </ol>
    </div>
  );
}
