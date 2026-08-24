"use client";

import { Reveal } from "@/components/motion/Reveal";

type Intensity = 0 | 1 | 2 | 3;

interface Tactic {
  name: string;
  techniques: { name: string; intensity: Intensity }[];
}

const TACTICS: Tactic[] = [
  {
    name: "Initial Access",
    techniques: [
      { name: "Spearphish", intensity: 3 },
      { name: "Valid Accts", intensity: 2 },
      { name: "Public-facing", intensity: 2 },
    ],
  },
  {
    name: "Execution",
    techniques: [
      { name: "User Exec", intensity: 3 },
      { name: "PowerShell", intensity: 2 },
      { name: "WMI", intensity: 1 },
    ],
  },
  {
    name: "Persistence",
    techniques: [
      { name: "Sched Task", intensity: 2 },
      { name: "Reg Run Key", intensity: 2 },
      { name: "Service", intensity: 1 },
    ],
  },
  {
    name: "Priv Esc",
    techniques: [
      { name: "Token Theft", intensity: 3 },
      { name: "UAC Bypass", intensity: 2 },
      { name: "DLL Hijack", intensity: 1 },
    ],
  },
  {
    name: "Defense Evasion",
    techniques: [
      { name: "Indirect Syscall", intensity: 3 },
      { name: "Process Hollowing", intensity: 3 },
      { name: "AMSI Bypass", intensity: 2 },
    ],
  },
  {
    name: "Credential Access",
    techniques: [
      { name: "Kerberoast", intensity: 3 },
      { name: "DCSync", intensity: 2 },
      { name: "LSASS Dump", intensity: 2 },
    ],
  },
  {
    name: "Discovery",
    techniques: [
      { name: "AD Recon", intensity: 3 },
      { name: "BloodHound", intensity: 3 },
      { name: "Net Scan", intensity: 2 },
    ],
  },
  {
    name: "Lateral",
    techniques: [
      { name: "Pass-the-Hash", intensity: 2 },
      { name: "RBCD", intensity: 3 },
      { name: "WMI Exec", intensity: 1 },
    ],
  },
  {
    name: "C2",
    techniques: [
      { name: "Cobalt Strike", intensity: 3 },
      { name: "DNS Tunnel", intensity: 2 },
      { name: "HTTPS Beacon", intensity: 3 },
    ],
  },
  {
    name: "Exfiltration",
    techniques: [
      { name: "DNS Exfil", intensity: 2 },
      { name: "Cloud Storage", intensity: 1 },
      { name: "Encrypted Tunnel", intensity: 2 },
    ],
  },
];

const COLOR: Record<Intensity, string> = {
  0: "bg-bg-2 text-fg-faint ring-line/40",
  1: "bg-neon-cyan/10 text-neon-cyan/70 ring-neon-cyan/20",
  2: "bg-amber-400/15 text-amber-200 ring-amber-400/30",
  3: "bg-red-500/20 text-red-300 ring-red-400/40",
};

export function AttackHeatmap() {
  return (
    <div className="rounded-2xl glass p-3 sm:p-5 overflow-x-auto">
      <div className="grid grid-flow-col auto-cols-[140px] sm:auto-cols-[150px] gap-2 min-w-full">
        {TACTICS.map((t, ci) => (
          <div key={t.name}>
            <Reveal as="div" y={8} delay={ci * 0.05}
              className="text-center font-mono text-[10px] uppercase tracking-[0.16em] text-fg-faint pb-2 border-b border-line/40"
            >
              {t.name}
            </Reveal>
            <div className="mt-2 space-y-1.5">
              {t.techniques.map((tech, ri) => (
                <Reveal as="div" y={0} delay={ci * 0.05 + ri * 0.04} duration={0.3}
                  key={tech.name}
                  className={`rounded-lg ring-1 px-2 py-2 text-[10px] font-mono leading-tight text-center ${COLOR[tech.intensity]}`}
                >
                  {tech.name}
                </Reveal>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 pl-1 text-[10px] font-mono uppercase tracking-wider text-fg-faint">
        <span>TTPs used in this engagement:</span>
        <span className="inline-flex items-center gap-1.5">
          <span className="size-2.5 rounded bg-red-500/40" /> heavy use
        </span>
        <span className="inline-flex items-center gap-1.5">
          <span className="size-2.5 rounded bg-amber-400/40" /> moderate
        </span>
        <span className="inline-flex items-center gap-1.5">
          <span className="size-2.5 rounded bg-neon-cyan/40" /> light
        </span>
      </div>
    </div>
  );
}
