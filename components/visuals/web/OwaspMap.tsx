"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Reveal } from "@/components/motion/Reveal";

interface Item {
  code: string;
  name: string;
  detail: string;
  manual: number;
  scanner: number;
}

const ITEMS: Item[] = [
  { code: "A01", name: "Broken Access Control", detail: "BOLA, IDOR, mass-assignment, role bypass", manual: 95, scanner: 18 },
  { code: "A02", name: "Cryptographic Failures", detail: "JWT alg=none, weak hash, exposed creds", manual: 75, scanner: 35 },
  { code: "A03", name: "Injection", detail: "SQLi, XSS, SSTI, NoSQL, header injection", manual: 70, scanner: 75 },
  { code: "A04", name: "Insecure Design", detail: "Missing rate-limit, business-logic abuse", manual: 90, scanner: 5 },
  { code: "A05", name: "Security Misconfig", detail: "Default creds, verbose errors, exposed admin", manual: 60, scanner: 55 },
  { code: "A06", name: "Vulnerable Components", detail: "Outdated libs, transitive CVE chains", manual: 40, scanner: 90 },
  { code: "A07", name: "Auth & Session", detail: "Weak MFA, session fixation, OAuth flow hijack", manual: 88, scanner: 22 },
  { code: "A08", name: "Software & Data Integrity", detail: "Unsigned updates, supply chain, deserialization", manual: 78, scanner: 30 },
  { code: "A09", name: "Logging & Monitoring", detail: "Missing audit trail, evasion-friendly logs", manual: 80, scanner: 10 },
  { code: "A10", name: "SSRF", detail: "Internal network access, metadata endpoint", manual: 85, scanner: 25 },
];

export function OwaspMap() {
  const [active, setActive] = useState(0);
  const item = ITEMS[active];

  return (
    <div className="grid gap-6 lg:grid-cols-12">
      <div className="lg:col-span-7">
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
          {ITEMS.map((it, i) => {
            const isActive = i === active;
            return (
              <Reveal as="button" y={0} delay={i * 0.04}
                key={it.code}
                onClick={() => setActive(i)}
                onMouseEnter={() => setActive(i)}
                className={`relative rounded-xl p-3 text-left ring-1 transition-all ${
                  isActive
                    ? "bg-neon-cyan/15 ring-neon-cyan/50 shadow-[0_0_30px_rgba(0,229,255,0.18)]"
                    : "glass ring-line/40 hover:ring-neon-cyan/30"
                }`}
              >
                <div className={`font-mono text-[9px] uppercase tracking-wider ${isActive ? "text-neon-cyan" : "text-fg-faint"}`}>
                  OWASP
                </div>
                <div className={`font-display font-black text-base ${isActive ? "text-neon-cyan" : "text-fg"}`}>
                  {it.code}
                </div>
                <div className="mt-1 text-[10px] leading-tight font-semibold text-fg">
                  {it.name}
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>

      <div className="lg:col-span-5">
        <motion.div
          key={item.code}
          initial={false}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="rounded-2xl glass-strong p-6 h-full"
        >
          <div className="flex items-baseline gap-3">
            <span className="font-display text-3xl font-black gradient-text">{item.code}</span>
            <span className="font-display text-lg font-bold text-fg">{item.name}</span>
          </div>
          <p className="mt-3 text-sm text-fg-muted leading-relaxed">{item.detail}</p>

          {/* coverage bars */}
          <div className="mt-6 space-y-3">
            <div>
              <div className="flex items-center justify-between mb-1.5 text-[11px] font-mono uppercase tracking-wider">
                <span className="text-neon-cyan">Macksofy manual coverage</span>
                <span className="text-neon-cyan font-bold">{item.manual}%</span>
              </div>
              <div className="h-2 rounded-full bg-bg-2 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${item.manual}%` }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  className="h-full bg-gradient-to-r from-neon-cyan to-neon-cyan/40"
                />
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between mb-1.5 text-[11px] font-mono uppercase tracking-wider">
                <span className="text-amber-300">Scanner-only</span>
                <span className="text-amber-300 font-bold">{item.scanner}%</span>
              </div>
              <div className="h-2 rounded-full bg-bg-2 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${item.scanner}%` }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  className="h-full bg-gradient-to-r from-amber-400 to-amber-400/30"
                />
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-line/60 text-xs text-fg-muted">
            <span className="text-neon-cyan font-semibold">Delta:</span> the gap between
            scanner output and reality is where business-logic exploitation lives.
          </div>
        </motion.div>
      </div>
    </div>
  );
}
