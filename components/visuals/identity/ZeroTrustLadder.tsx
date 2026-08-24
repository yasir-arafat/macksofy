"use client";

import { Fingerprint, Laptop, Network, AppWindow, Database } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";

/**
 * The Zero Trust roadmap, staged against the CISA maturity model pillars.
 *
 * Pillar names and the four maturity stages (Traditional → Initial → Advanced →
 * Optimal) are CISA's Zero Trust Maturity Model; the target-state framing is
 * NIST SP 800-207, both cited as published. What sits in the 90-day column
 * versus the 12-month column is Macksofy's sequencing recommendation, labelled
 * as such — no client's current maturity is depicted.
 */

const STAGES = ["Traditional", "Initial", "Advanced", "Optimal"];

interface Pillar {
  icon: typeof Fingerprint;
  name: string;
  tone: string;
  bar: string;
  first90: string;
  months12: string;
}

const PILLARS: Pillar[] = [
  {
    icon: Fingerprint,
    name: "Identity",
    tone: "text-violet-300 ring-violet-400/40 bg-violet-400/10",
    bar: "bg-violet-400/60",
    first90: "Phishing-resistant MFA on tier-0 and every admin population",
    months12: "Passwordless as default, continuous risk-based re-authentication",
  },
  {
    icon: Laptop,
    name: "Devices",
    tone: "text-cyan-300 ring-cyan-400/40 bg-cyan-400/10",
    bar: "bg-cyan-400/60",
    first90: "Compliance signal enforced in conditional access for admin sessions",
    months12: "Device posture as a first-class input to every access decision",
  },
  {
    icon: Network,
    name: "Networks",
    tone: "text-emerald-300 ring-emerald-400/40 bg-emerald-400/10",
    bar: "bg-emerald-400/60",
    first90: "Tier-0 isolated, break-glass paths documented and alerted",
    months12: "Microsegmentation across east-west, ZTNA replacing flat VPN",
  },
  {
    icon: AppWindow,
    name: "Applications & workloads",
    tone: "text-amber-300 ring-amber-400/40 bg-amber-400/10",
    bar: "bg-amber-400/60",
    first90: "Stale OAuth grants revoked, shared clients split by trust level",
    months12: "Per-app authorisation with workload identity, no long-lived secrets",
  },
  {
    icon: Database,
    name: "Data",
    tone: "text-pink-300 ring-pink-400/40 bg-pink-400/10",
    bar: "bg-pink-400/60",
    first90: "Crown-jewel stores identified and standing access removed",
    months12: "Classification-driven access with JIT elevation and full session record",
  },
];

export function ZeroTrustLadder() {
  return (
    <div className="rounded-2xl glass p-5 sm:p-7">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line/60 pb-5">
        <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-fg-faint">
          Zero Trust roadmap · by pillar
        </div>
        <div className="font-mono text-[9px] uppercase tracking-[0.14em] text-fg-faint">
          NIST SP 800-207 · CISA ZTMM
        </div>
      </div>

      {/* stage scale */}
      <div className="mt-5 flex items-center gap-1.5">
        {STAGES.map((s, i) => (
          <div key={s} className="flex-1">
            <div
              className={`h-1 rounded-full ${
                i === 0 ? "bg-white/10" : i === 1 ? "bg-white/20" : i === 2 ? "bg-white/35" : "bg-white/50"
              }`}
            />
            <div className="mt-1.5 font-mono text-[9px] uppercase tracking-[0.12em] text-fg-faint">
              {s}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-5 space-y-2.5">
        {PILLARS.map((p, i) => {
          const Icon = p.icon;
          return (
            <Reveal as="div" y={10} delay={i * 0.07} duration={0.34} margin="-40px"
              key={p.name}
              className="relative overflow-hidden rounded-xl bg-white/[0.02] ring-1 ring-line/60"
            >
              <div aria-hidden className={`absolute inset-y-0 left-0 w-1 ${p.bar}`} />
              <div className="grid gap-3 p-4 pl-5 sm:grid-cols-12 sm:items-start">
                <div className="flex items-center gap-2.5 sm:col-span-3">
                  <div className={`grid size-9 shrink-0 place-items-center rounded-lg ring-1 ${p.tone}`}>
                    <Icon className="size-4" />
                  </div>
                  <span className="font-display text-[13px] font-bold leading-tight text-fg">
                    {p.name}
                  </span>
                </div>

                <div className="sm:col-span-4">
                  <div className="font-mono text-[9px] uppercase tracking-[0.14em] text-emerald-300">
                    First 90 days
                  </div>
                  <p className="mt-1 text-[12px] leading-relaxed text-fg-muted">{p.first90}</p>
                </div>

                <div className="sm:col-span-5">
                  <div className="font-mono text-[9px] uppercase tracking-[0.14em] text-fg-faint">
                    Twelve-month target
                  </div>
                  <p className="mt-1 text-[12px] leading-relaxed text-fg-muted">{p.months12}</p>
                </div>
              </div>
            </Reveal>
          );
        })}
      </div>

      <p className="mt-5 border-t border-line/60 pt-4 text-[11px] leading-relaxed text-fg-faint">
        Sequencing recommendation, not a maturity score. Where your estate
        actually sits on each pillar is the output of the assessment — and the
        90-day column is deliberately the part that survives a change-advisory
        board.
      </p>
    </div>
  );
}
