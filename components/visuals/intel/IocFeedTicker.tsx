"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import { Radar } from "lucide-react";

const IOC_POOL = [
  { type: "domain", value: "update-secure-microsoft[.]com", sev: "high", source: "MISP-FS-ISAC" },
  { type: "ip", value: "185.234.218.198", sev: "crit", source: "Macksofy honeynet" },
  { type: "hash", value: "5e1f9c…cobalt-beacon-v4", sev: "crit", source: "VirusTotal Premium" },
  { type: "domain", value: "okta-login-helpdesk[.]net", sev: "high", source: "OpenCTI" },
  { type: "ip", value: "203.0.113.41", sev: "med", source: "Shodan watch" },
  { type: "url", value: "hxxps://cdn[.]xn--google-…/auth", sev: "high", source: "URLscan" },
  { type: "hash", value: "a3b2…sliver-implant-x86", sev: "high", source: "Macksofy IR" },
  { type: "cve", value: "CVE-2024-49138 · CLFS LPE", sev: "crit", source: "ZDI" },
  { type: "domain", value: "kpmg-india-careers[.]com", sev: "med", source: "Industry sharing" },
  { type: "ip", value: "45.61.142.91", sev: "high", source: "FS-ISAC" },
];

const SEV_COLORS: Record<string, string> = {
  crit: "text-red-300 bg-red-500/15 ring-red-400/40",
  high: "text-amber-300 bg-amber-400/15 ring-amber-400/40",
  med: "text-violet-300 bg-violet-400/15 ring-violet-400/40",
  low: "text-fg-muted bg-bg-1 ring-line/40",
};

export function IocFeedTicker() {
  const reduce = useReducedMotion();
  const [liveItems, setLiveItems] = useState<{ id: number; ioc: typeof IOC_POOL[number]; ts: string }[]>([]);

  const staticItems = useMemo(
    () =>
      IOC_POOL.slice(0, 6).map((ioc, i) => ({
        id: i,
        ioc,
        ts: "—",
      })),
    []
  );

  useEffect(() => {
    if (reduce) return;
    let id = 0;
    const tick = () => {
      const ioc = IOC_POOL[Math.floor(Math.random() * IOC_POOL.length)];
      const ts = new Date().toLocaleTimeString("en-IN", { hour12: false });
      id += 1;
      setLiveItems((cur) => [{ id, ioc, ts }, ...cur].slice(0, 6));
    };
    tick();
    const it = window.setInterval(tick, 1900);
    return () => window.clearInterval(it);
  }, [reduce]);

  const items = reduce ? staticItems : liveItems;

  return (
    <div className="rounded-2xl ring-1 ring-line bg-bg/80 overflow-hidden backdrop-blur-sm">
      <div className="flex items-center gap-3 px-5 py-3 border-b border-line bg-bg-1/80">
        <Radar className="size-4 text-neon-cyan" />
        <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-fg-faint">
          curated IOC feed · MISP + OpenCTI + industry sharing
        </span>
        <span className="ml-auto inline-flex items-center gap-1.5 text-[10px] text-emerald-400">
          <span className="size-1.5 rounded-full bg-emerald-400 animate-pulse" />
          live
        </span>
      </div>
      <ul className="p-3 space-y-1.5 min-h-[280px] font-mono text-[12px]">
        {items.map((row, i) => (
          <motion.li
            key={row.id}
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1 - i * 0.13, y: 0 }}
            transition={{ duration: 0.3 }}
            className={`flex items-center gap-3 rounded-lg ring-1 px-3 py-2 ${SEV_COLORS[row.ioc.sev]}`}
          >
            <span className="font-mono text-[9px] uppercase tracking-wider w-12 shrink-0">
              {row.ioc.sev}
            </span>
            <span className="text-fg-faint w-20 shrink-0">{row.ts}</span>
            <span className="font-mono text-[9px] uppercase tracking-wider w-14 shrink-0 text-fg-muted">
              {row.ioc.type}
            </span>
            <span className="flex-1 truncate text-fg">{row.ioc.value}</span>
            <span className="text-[10px] text-fg-faint hidden sm:inline-block">
              {row.ioc.source}
            </span>
          </motion.li>
        ))}
      </ul>
      <div className="flex items-center justify-between px-5 py-2.5 border-t border-line bg-bg-1/40 text-[10px] font-mono uppercase tracking-wider text-fg-faint">
        <span>auto-pushed to SIEM · firewall · EDR</span>
        <span className="text-emerald-400">confidence ≥ 70 only</span>
      </div>
    </div>
  );
}
