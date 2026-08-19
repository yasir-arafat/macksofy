"use client";

import { motion } from "framer-motion";
import {
  Globe,
  Server,
  KeyRound,
  Users,
  Database,
  Crown,
  type LucideIcon,
} from "lucide-react";

/**
 * The perimeter → domain-controller path, as a network pentest report draws it.
 *
 * Composite narrative assembled from the anonymised manufacturer engagement in
 * content/services.ts (external Citrix → kerberoast → DA via misconfigured
 * constrained delegation). Hop elapsed-times are illustrative of that single
 * engagement, not an average — the label on the graph says so.
 */

type Zone = "internet" | "dmz" | "user" | "server" | "core";

interface Hop {
  zone: Zone;
  icon: LucideIcon;
  title: string;
  technique: string;
  detail: string;
  elapsed: string;
  attckId: string;
}

const HOPS: Hop[] = [
  {
    zone: "internet",
    icon: Globe,
    title: "External recon",
    technique: "Attack-surface mapping",
    detail:
      "ASN + certificate-transparency sweep surfaces a Citrix StoreFront portal outside the documented asset inventory.",
    elapsed: "T+0h",
    attckId: "T1595",
  },
  {
    zone: "dmz",
    icon: Server,
    title: "Perimeter foothold",
    technique: "Exposed service exploitation",
    detail:
      "Unpatched gateway plus a reused local credential yields a session on a DMZ host. No phishing required.",
    elapsed: "T+1h",
    attckId: "T1190",
  },
  {
    zone: "user",
    icon: Users,
    title: "Domain enumeration",
    technique: "BloodHound / SharpHound",
    detail:
      "Any authenticated domain user can read the directory. The graph exposes every delegation edge and nested admin group.",
    elapsed: "T+2h",
    attckId: "T1087",
  },
  {
    zone: "user",
    icon: KeyRound,
    title: "Credential access",
    technique: "Kerberoasting",
    detail:
      "A service account with an SPN and a weak, never-rotated password cracks offline in under an hour.",
    elapsed: "T+3h",
    attckId: "T1558.003",
  },
  {
    zone: "server",
    icon: Database,
    title: "Delegation abuse",
    technique: "Constrained delegation (S4U2Self)",
    detail:
      "That same service account is trusted for delegation to a host it never needed — impersonate any user to it, including a domain admin.",
    elapsed: "T+5h",
    attckId: "T1550.003",
  },
  {
    zone: "core",
    icon: Crown,
    title: "Domain compromise",
    technique: "Demonstrated, not exercised",
    detail:
      "Domain-admin access proven against a Macksofy-planted canary account. Client credentials are never dumped or used.",
    elapsed: "T+6h",
    attckId: "T1078.002",
  },
];

const ZONE_STYLE: Record<Zone, { label: string; ring: string; text: string; dot: string }> = {
  internet: {
    label: "Internet",
    ring: "ring-sky-400/40 bg-sky-400/10",
    text: "text-sky-300",
    dot: "bg-sky-400",
  },
  dmz: {
    label: "DMZ",
    ring: "ring-cyan-400/40 bg-cyan-400/10",
    text: "text-cyan-300",
    dot: "bg-cyan-400",
  },
  user: {
    label: "User VLAN",
    ring: "ring-violet-400/40 bg-violet-400/10",
    text: "text-violet-300",
    dot: "bg-violet-400",
  },
  server: {
    label: "Server VLAN",
    ring: "ring-amber-400/40 bg-amber-400/10",
    text: "text-amber-300",
    dot: "bg-amber-400",
  },
  core: {
    label: "Domain core",
    ring: "ring-red-400/40 bg-red-400/10",
    text: "text-red-300",
    dot: "bg-red-400",
  },
};

export function AttackPathGraph() {
  return (
    <div className="rounded-2xl glass p-5 sm:p-7">
      <div className="flex flex-wrap items-center justify-between gap-3 pb-5 border-b border-line/60">
        <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-fg-faint">
          Attack path · perimeter to domain admin
        </div>
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5">
          {(Object.keys(ZONE_STYLE) as Zone[]).map((z) => (
            <span
              key={z}
              className="inline-flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-[0.14em] text-fg-faint"
            >
              <span className={`size-2 rounded-full ${ZONE_STYLE[z].dot}`} />
              {ZONE_STYLE[z].label}
            </span>
          ))}
        </div>
      </div>

      <ol className="relative mt-6">
        {/* the spine */}
        <div
          aria-hidden
          className="absolute left-[21px] top-2 bottom-2 w-px bg-gradient-to-b from-sky-400/50 via-violet-400/40 to-red-400/50"
        />

        {HOPS.map((hop, i) => {
          const Icon = hop.icon;
          const z = ZONE_STYLE[hop.zone];
          return (
            <motion.li
              key={`${hop.title}-${i}`}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ delay: i * 0.09, duration: 0.4 }}
              className="relative flex gap-4 pb-7 last:pb-0"
            >
              <div
                className={`relative z-10 grid size-11 shrink-0 place-items-center rounded-xl ring-1 ${z.ring} ${z.text}`}
              >
                <Icon className="size-5" />
              </div>

              <div className="min-w-0 flex-1 pt-0.5">
                <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  <span className="font-display text-sm font-bold text-fg">
                    {hop.title}
                  </span>
                  <span
                    className={`font-mono text-[10px] uppercase tracking-[0.14em] ${z.text}`}
                  >
                    {hop.elapsed}
                  </span>
                  <span className="font-mono text-[10px] tracking-wider text-fg-faint rounded-full border border-line px-2 py-0.5">
                    {hop.attckId}
                  </span>
                </div>
                <div className="mt-1 font-mono text-[11px] uppercase tracking-[0.12em] text-fg-dim">
                  {hop.technique}
                </div>
                <p className="mt-2 text-[13px] leading-relaxed text-fg-muted">
                  {hop.detail}
                </p>
              </div>
            </motion.li>
          );
        })}
      </ol>

      <p className="mt-5 border-t border-line/60 pt-4 text-[11px] leading-relaxed text-fg-faint">
        Composite of one anonymised engagement against a listed Indian
        manufacturer. Elapsed times are what that path actually took, not an
        average — yours depends on patch level, delegation hygiene and tiering.
      </p>
    </div>
  );
}
