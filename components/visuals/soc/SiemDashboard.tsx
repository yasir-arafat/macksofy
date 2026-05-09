"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Activity, AlertTriangle, ShieldCheck, Eye } from "lucide-react";

const SOURCES = [
  "edr.host-453",
  "wazuh.agent-118",
  "aws.cloudtrail",
  "ad.dc-mum-01",
  "k8s.prod-eks",
  "okta.audit",
  "pan-fw.east",
  "sysmon.host-921",
];

const RULES = [
  { sev: "high", text: "Kerberoast pattern · TGS-REQ for SPN with weak crypto" },
  { sev: "med", text: "Suspicious PowerShell · base64 encoded · -EncodedCommand" },
  { sev: "low", text: "Unusual login geography · IN → BR · user.id 4815" },
  { sev: "high", text: "LSASS access from non-Microsoft binary" },
  { sev: "crit", text: "Domain Admin add · NEW user.principal · outside change window" },
  { sev: "med", text: "Outbound DNS to newly-registered domain · age 12h" },
  { sev: "low", text: "Failed authn × 14 · single source IP · plateaued" },
  { sev: "crit", text: "S3 bucket policy changed · public-read enabled · prod-data-eu" },
  { sev: "med", text: "Office macro spawning powershell.exe · finance-OU" },
  { sev: "high", text: "AD enumeration · Bloodhound-style query pattern detected" },
] as const;

const SEV_STYLES: Record<string, string> = {
  crit: "text-red-300 ring-red-400/40 bg-red-500/10",
  high: "text-amber-300 ring-amber-400/40 bg-amber-400/10",
  med: "text-violet-300 ring-violet-400/40 bg-violet-400/10",
  low: "text-neon-cyan ring-neon-cyan/30 bg-neon-cyan/5",
};

export function SiemDashboard() {
  const reduce = useReducedMotion();
  const [feed, setFeed] = useState<{ id: number; rule: typeof RULES[number]; src: string; ts: string }[]>([]);
  const idRef = useRef(0);

  useEffect(() => {
    if (reduce) return;
    const tick = () => {
      idRef.current += 1;
      const rule = RULES[Math.floor(Math.random() * RULES.length)];
      const src = SOURCES[Math.floor(Math.random() * SOURCES.length)];
      const ts = new Date().toLocaleTimeString("en-IN", { hour12: false });
      setFeed((cur) => [{ id: idRef.current, rule, src, ts }, ...cur].slice(0, 7));
    };
    tick();
    const id = window.setInterval(tick, 1500);
    return () => window.clearInterval(id);
  }, [reduce]);

  return (
    <div className="rounded-2xl ring-1 ring-line bg-bg/80 shadow-2xl overflow-hidden backdrop-blur-sm">
      <div className="flex items-center gap-3 px-5 py-3 border-b border-line bg-bg-1/80">
        <Activity className="size-4 text-emerald-400" />
        <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-fg-faint">
          macksofy-mdr · siem · live feed
        </span>
        <span className="ml-auto inline-flex items-center gap-1.5 text-[10px] text-emerald-400">
          <span className="size-1.5 rounded-full bg-emerald-400 animate-pulse" />
          12.4K eps
        </span>
      </div>

      {/* stat tiles */}
      <div className="grid grid-cols-3 gap-3 p-5 border-b border-line">
        {[
          { v: "12.4K", k: "events / sec", icon: Activity, color: "text-neon-cyan" },
          { v: "47", k: "alerts (1h)", icon: Eye, color: "text-amber-300" },
          { v: "2", k: "incidents (1h)", icon: AlertTriangle, color: "text-red-400" },
        ].map((s) => {
          const Icon = s.icon;
          return (
            <div key={s.k} className="rounded-lg ring-1 ring-line bg-bg-1/50 px-3 py-2">
              <div className="flex items-center gap-2">
                <Icon className={`size-3.5 ${s.color}`} />
                <span className="font-mono text-[9px] uppercase tracking-wider text-fg-faint">
                  {s.k}
                </span>
              </div>
              <div className={`mt-1 font-display text-xl font-black ${s.color} font-mono tabular-nums`}>
                {s.v}
              </div>
            </div>
          );
        })}
      </div>

      {/* live feed */}
      <ul className="p-3 space-y-1.5 min-h-[280px]">
        {feed.length === 0 && (
          <li className="px-3 py-2 font-mono text-xs text-fg-faint">awaiting events…</li>
        )}
        {feed.map((row, i) => (
          <motion.li
            key={row.id}
            initial={{ opacity: 0, y: -6, scale: 0.98 }}
            animate={{ opacity: 1 - i * 0.12, y: 0, scale: 1 }}
            transition={{ duration: 0.3 }}
            className={`flex items-start gap-3 rounded-lg ring-1 px-3 py-2 ${SEV_STYLES[row.rule.sev]}`}
          >
            <span className="font-mono text-[9px] uppercase tracking-wider w-12 shrink-0 mt-0.5">
              {row.rule.sev}
            </span>
            <span className="font-mono text-[10px] text-fg-faint w-20 shrink-0 mt-0.5">
              {row.ts}
            </span>
            <span className="font-mono text-[10px] text-fg-muted w-28 shrink-0 mt-0.5 hidden sm:inline-block">
              {row.src}
            </span>
            <span className="text-xs leading-relaxed">{row.rule.text}</span>
          </motion.li>
        ))}
      </ul>

      <div className="flex items-center justify-between px-5 py-2.5 border-t border-line bg-bg-1/40 text-[10px] font-mono uppercase tracking-wider text-fg-faint">
        <span className="inline-flex items-center gap-2">
          <ShieldCheck className="size-3.5 text-emerald-400" />
          MITRE ATT&CK · 142 detections live
        </span>
        <span>analyst on shift · n.s</span>
      </div>
    </div>
  );
}
