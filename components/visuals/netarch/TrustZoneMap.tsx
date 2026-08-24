"use client";

import { ArrowRight, Unplug, GitFork } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";

/**
 * Current state versus target state, in the terms a segmentation memo uses.
 *
 * Trust zones are the ones named in content/services.ts (tier-0, OT, PCI/CDE,
 * DMZ, corporate, vendor/BYOD). The "before" column is the recurring pattern
 * those engagements describe — flat reachability, an engineering workstation
 * sharing a VLAN with a plant historian, a CDE a sandbox can route to.
 */

interface Zone {
  name: string;
  before: string;
  after: string;
  tone: string;
}

const ZONES: Zone[] = [
  {
    name: "Tier-0 / domain core",
    before: "Reachable from the BYOD VLAN",
    after: "Isolated, jump-host only, admin sessions recorded",
    tone: "text-red-300 ring-red-400/40 bg-red-400/10",
  },
  {
    name: "PCI / cardholder data",
    before: "Sandbox environments can route to it",
    after: "Scoped CDE with a documented boundary the QSA can walk",
    tone: "text-amber-300 ring-amber-400/40 bg-amber-400/10",
  },
  {
    name: "OT / plant",
    before: "Engineering laptops share a VLAN with the historian",
    after: "IEC 62443 zones and conduits, dedicated realm, brokered access",
    tone: "text-orange-300 ring-orange-400/40 bg-orange-400/10",
  },
  {
    name: "DMZ",
    before: "Legacy jump-host permits inbound SMB",
    after: "Single-direction publishing, no inbound path to internal",
    tone: "text-cyan-300 ring-cyan-400/40 bg-cyan-400/10",
  },
  {
    name: "Corporate",
    before: "Flat east-west, any workstation to any server",
    after: "Microsegmented by application, default-deny between tiers",
    tone: "text-violet-300 ring-violet-400/40 bg-violet-400/10",
  },
  {
    name: "Vendor & BYOD",
    before: "On the corporate VLAN with a shared PSK",
    after: "Brokered through ZTNA, per-session and per-application",
    tone: "text-emerald-300 ring-emerald-400/40 bg-emerald-400/10",
  },
];

export function TrustZoneMap() {
  return (
    <div className="rounded-2xl glass p-5 sm:p-7">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line/60 pb-5">
        <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-fg-faint">
          Trust zones · current state → target state
        </div>
        <div className="flex items-center gap-4 font-mono text-[9px] uppercase tracking-[0.14em] text-fg-faint">
          <span className="inline-flex items-center gap-1.5">
            <Unplug className="size-3 text-red-300" /> as found
          </span>
          <span className="inline-flex items-center gap-1.5">
            <GitFork className="size-3 text-emerald-300" /> as designed
          </span>
        </div>
      </div>

      <div className="mt-5 space-y-2.5">
        {ZONES.map((z, i) => (
          <Reveal as="div" y={10} delay={i * 0.07} duration={0.32} margin="-40px"
            key={z.name}
            className="grid gap-3 rounded-xl bg-white/[0.02] p-4 ring-1 ring-line/60 sm:grid-cols-12 sm:items-center"
          >
            <div className="sm:col-span-3">
              <span
                className={`inline-block rounded-full px-2.5 py-1 font-mono text-[10.5px] tracking-wider ring-1 ${z.tone}`}
              >
                {z.name}
              </span>
            </div>

            <div className="flex items-start gap-2 sm:col-span-4">
              <span className="mt-0.5 shrink-0 text-red-300/70">▸</span>
              <p className="text-[12px] leading-relaxed text-fg-muted">{z.before}</p>
            </div>

            <div className="hidden justify-center sm:col-span-1 sm:flex">
              <ArrowRight className="size-4 text-fg-faint" />
            </div>

            <div className="flex items-start gap-2 sm:col-span-4">
              <span className="mt-0.5 shrink-0 text-emerald-300/70">▸</span>
              <p className="text-[12px] leading-relaxed text-fg-muted">{z.after}</p>
            </div>
          </Reveal>
        ))}
      </div>

      <p className="mt-5 border-t border-line/60 pt-4 text-[11px] leading-relaxed text-fg-faint">
        The target column is only useful if it can be reached from the left one on
        a real change calendar. Every zone ships with a phased rollout, documented
        exceptions and the change windows to get there.
      </p>
    </div>
  );
}
