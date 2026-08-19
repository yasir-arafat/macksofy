"use client";

import { motion } from "framer-motion";
import { Landmark, Building2, ShieldCheck, Scale, Globe2 } from "lucide-react";

/**
 * Who the vCISO sits across the table from, and what each one asks for.
 *
 * Regulator list comes from content/services.ts (CERT-In, RBI, SEBI, IRDAI,
 * DPDP, DESC, NCA). Obligations are stated at the level the published
 * directions state them — no filing deadlines or thresholds are invented here.
 */

interface Reg {
  short: string;
  full: string;
  region: "India" | "GCC";
  asks: string;
  icon: typeof Landmark;
}

const REGULATORS: Reg[] = [
  {
    short: "CERT-In",
    full: "Indian Computer Emergency Response Team, MeitY",
    region: "India",
    asks: "Incident reporting under the 2022 directions, log retention, and an annual audit by an empanelled organisation.",
    icon: ShieldCheck,
  },
  {
    short: "RBI",
    full: "Reserve Bank of India",
    region: "India",
    asks: "Cyber-security framework compliance, System Audit reporting, and board-level oversight for regulated entities.",
    icon: Landmark,
  },
  {
    short: "SEBI",
    full: "Securities and Exchange Board of India",
    region: "India",
    asks: "CSCRF alignment for market intermediaries, with periodic audit evidence and governance sign-off.",
    icon: Building2,
  },
  {
    short: "IRDAI",
    full: "Insurance Regulatory and Development Authority of India",
    region: "India",
    asks: "Information and cyber-security guidelines for insurers, with inspection response and observation closure.",
    icon: Scale,
  },
  {
    short: "DPDP",
    full: "Data Protection Board of India, under the DPDP Act",
    region: "India",
    asks: "Lawful processing, breach notification and data-principal rights handling across your systems and processors.",
    icon: Scale,
  },
  {
    short: "DESC",
    full: "Dubai Electronic Security Center",
    region: "GCC",
    asks: "Dubai Cyber Security Standard alignment for entities operating in the emirate.",
    icon: Globe2,
  },
  {
    short: "NCA",
    full: "National Cybersecurity Authority, Saudi Arabia",
    region: "GCC",
    asks: "Essential Cybersecurity Controls compliance for in-scope organisations.",
    icon: Globe2,
  },
];

const REGION_STYLE = {
  India: "text-cyan-300 ring-cyan-400/40 bg-cyan-400/10",
  GCC: "text-amber-300 ring-amber-400/40 bg-amber-400/10",
} as const;

export function RegulatorInterlocutor() {
  return (
    <div className="rounded-2xl glass p-5 sm:p-7">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line/60 pb-5">
        <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-fg-faint">
          Regulator interlocutor · India + GCC
        </div>
        <div className="flex items-center gap-4 font-mono text-[9px] uppercase tracking-[0.14em] text-fg-faint">
          <span className="inline-flex items-center gap-1.5">
            <span className="size-2.5 rounded bg-cyan-400/60" /> India
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span className="size-2.5 rounded bg-amber-400/60" /> GCC
          </span>
        </div>
      </div>

      <div className="mt-5 space-y-2.5">
        {REGULATORS.map((r, i) => {
          const Icon = r.icon;
          return (
            <motion.div
              key={r.short}
              initial={{ opacity: 0, x: -8 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: i * 0.06, duration: 0.32 }}
              className="grid gap-2 rounded-xl bg-white/[0.02] p-4 ring-1 ring-line/60 sm:grid-cols-12 sm:items-center"
            >
              <div className="flex items-center gap-3 sm:col-span-4">
                <div className={`grid size-10 shrink-0 place-items-center rounded-lg ring-1 ${REGION_STYLE[r.region]}`}>
                  <Icon className="size-[18px]" />
                </div>
                <div className="min-w-0">
                  <div className="font-display text-[13px] font-bold leading-tight text-fg">
                    {r.short}
                  </div>
                  <div className="mt-0.5 text-[10.5px] leading-snug text-fg-faint">{r.full}</div>
                </div>
              </div>
              <p className="text-[12.5px] leading-relaxed text-fg-muted sm:col-span-8">{r.asks}</p>
            </motion.div>
          );
        })}
      </div>

      <p className="mt-5 border-t border-line/60 pt-4 text-[11px] leading-relaxed text-fg-faint">
        Obligations summarised at the level the published directions state them.
        Which apply to you depends on your licence, sector and where you operate —
        establishing that map is month-one work.
      </p>
    </div>
  );
}
