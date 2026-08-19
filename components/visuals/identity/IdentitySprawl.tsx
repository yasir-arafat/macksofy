"use client";

import { motion } from "framer-motion";
import { Server, Cloud, KeyRound, Boxes, AlertTriangle, ArrowRight } from "lucide-react";

/**
 * The hybrid-identity estate as it actually is, and where privilege leaks
 * across the seams.
 *
 * Shape is the one described in content/services.ts: on-prem AD still
 * authoritative, Entra ID syncing a partial estate, a SaaS federation layer,
 * and multiple PAM vaults owned by different teams. Illustrative of the pattern
 * rather than any one client's topology.
 */

interface Store {
  icon: typeof Server;
  name: string;
  holds: string;
  tone: string;
  note: string;
}

const STORES: Store[] = [
  {
    icon: Server,
    name: "On-prem Active Directory",
    holds: "Still authoritative for tier-0",
    tone: "text-cyan-300 ring-cyan-400/40 bg-cyan-400/10",
    note: "Delegation, ACLs and service accounts accumulated over a decade",
  },
  {
    icon: Cloud,
    name: "Entra ID",
    holds: "Syncs a partial estate",
    tone: "text-violet-300 ring-violet-400/40 bg-violet-400/10",
    note: "The sync boundary is where on-prem admin becomes cloud admin",
  },
  {
    icon: Boxes,
    name: "SaaS federation",
    holds: "Okta or Ping in front of the app estate",
    tone: "text-emerald-300 ring-emerald-400/40 bg-emerald-400/10",
    note: "Stale OAuth grants and app-to-app scopes nobody reviews",
  },
  {
    icon: KeyRound,
    name: "PAM vaults",
    holds: "Often more than one, owned separately",
    tone: "text-amber-300 ring-amber-400/40 bg-amber-400/10",
    note: "Dormant safes and standing admin that no single team can see whole",
  },
];

const LEAKS = [
  {
    path: "On-prem admin → cloud Global Admin",
    via: "Privilege inherited across the directory-sync boundary",
  },
  {
    path: "Phished user → tier-0 service account",
    via: "Kerberoastable SPN with a password older than the policy that governs it",
  },
  {
    path: "Public app → admin app",
    via: "A shared OAuth client trusted by both",
  },
  {
    path: "IT workstation → OT realm",
    via: "Engineering laptops domain-joined to the corporate forest",
  },
];

export function IdentitySprawl() {
  return (
    <div className="rounded-2xl glass p-5 sm:p-7">
      <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-fg-faint">
        Hybrid identity estate · where the seams are
      </div>

      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        {STORES.map((s, i) => {
          const Icon = s.icon;
          return (
            <motion.div
              key={s.name}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: i * 0.08, duration: 0.34 }}
              className="rounded-xl bg-white/[0.02] p-4 ring-1 ring-line/60"
            >
              <div className="flex items-center gap-2.5">
                <div className={`grid size-10 shrink-0 place-items-center rounded-lg ring-1 ${s.tone}`}>
                  <Icon className="size-[18px]" />
                </div>
                <div className="min-w-0">
                  <div className="font-display text-[13px] font-bold leading-tight text-fg">
                    {s.name}
                  </div>
                  <div className="mt-0.5 font-mono text-[10px] uppercase tracking-[0.12em] text-fg-faint">
                    {s.holds}
                  </div>
                </div>
              </div>
              <p className="mt-2.5 text-[12px] leading-relaxed text-fg-muted">{s.note}</p>
            </motion.div>
          );
        })}
      </div>

      <div className="mt-6 border-t border-line/60 pt-5">
        <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-red-300">
          <AlertTriangle className="size-3.5" />
          Paths the attack-path map goes looking for
        </div>
        <div className="mt-3 space-y-2">
          {LEAKS.map((l, i) => (
            <motion.div
              key={l.path}
              initial={{ opacity: 0, x: -8 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07, duration: 0.3 }}
              className="rounded-lg bg-red-500/[0.07] px-3.5 py-2.5 ring-1 ring-red-400/25"
            >
              <div className="flex flex-wrap items-center gap-2 font-mono text-[11.5px] text-red-200">
                <span>{l.path.split(" → ")[0]}</span>
                <ArrowRight className="size-3.5 shrink-0 opacity-70" />
                <span>{l.path.split(" → ")[1]}</span>
              </div>
              <p className="mt-1 text-[11.5px] leading-relaxed text-fg-muted">{l.via}</p>
            </motion.div>
          ))}
        </div>
      </div>

      <p className="mt-5 border-t border-line/60 pt-4 text-[11px] leading-relaxed text-fg-faint">
        Hybrid is the norm in India, not an edge case. The assessment enumerates
        every identity provider, directory, federation and break-glass account
        before it maps a single path.
      </p>
    </div>
  );
}
