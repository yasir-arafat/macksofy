"use client";

import { motion } from "framer-motion";
import { Building2, Handshake, ServerCog } from "lucide-react";

/**
 * Who owns what, across the two engagement shapes.
 *
 * Both shapes come from content/services.ts — fully managed, and the co-managed
 * split where the in-house team keeps Tier-1 plus business context while
 * Macksofy holds Tier-2/3, detection engineering and 24×7 cover. Ownership of
 * the SIEM, data and detection content stays with the client in both.
 */

type Owner = "client" | "macksofy" | "shared";

interface Row {
  fn: string;
  managed: Owner;
  cosourced: Owner;
}

const ROWS: Row[] = [
  { fn: "SIEM, data and detection content ownership", managed: "client", cosourced: "client" },
  { fn: "Business context and asset criticality", managed: "shared", cosourced: "client" },
  { fn: "Tier-1 alert triage", managed: "macksofy", cosourced: "client" },
  { fn: "Tier-2 investigation", managed: "macksofy", cosourced: "macksofy" },
  { fn: "Tier-3 detection engineering", managed: "macksofy", cosourced: "macksofy" },
  { fn: "Threat hunting", managed: "macksofy", cosourced: "macksofy" },
  { fn: "24×7 out-of-hours cover", managed: "macksofy", cosourced: "macksofy" },
  { fn: "Vulnerability operations", managed: "macksofy", cosourced: "shared" },
  { fn: "Containment execution", managed: "shared", cosourced: "client" },
  { fn: "Incident command (High / Critical)", managed: "macksofy", cosourced: "shared" },
  { fn: "Board and regulator reporting", managed: "shared", cosourced: "shared" },
];

const OWNER_STYLE: Record<Owner, { cls: string; label: string }> = {
  client: { cls: "bg-cyan-400/15 text-cyan-200 ring-cyan-400/30", label: "You" },
  macksofy: { cls: "bg-emerald-400/15 text-emerald-200 ring-emerald-400/30", label: "Macksofy" },
  shared: { cls: "bg-violet-400/15 text-violet-200 ring-violet-400/30", label: "Joint" },
};

export function CoSourceSplit() {
  return (
    <div className="rounded-2xl glass p-5 sm:p-7">
      <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-fg-faint">
        Responsibility split · fully managed vs co-managed
      </div>

      <div className="mt-5 overflow-x-auto">
        <table className="w-full min-w-[520px] border-separate border-spacing-y-1.5">
          <thead>
            <tr>
              <th className="pb-2 text-left font-mono text-[9px] font-normal uppercase tracking-[0.12em] text-fg-faint">
                Function
              </th>
              <th className="pb-2 font-mono text-[9px] font-normal uppercase tracking-[0.12em] text-fg-faint">
                <span className="inline-flex items-center gap-1.5">
                  <ServerCog className="size-3" /> Fully managed
                </span>
              </th>
              <th className="pb-2 font-mono text-[9px] font-normal uppercase tracking-[0.12em] text-fg-faint">
                <span className="inline-flex items-center gap-1.5">
                  <Handshake className="size-3" /> Co-managed
                </span>
              </th>
            </tr>
          </thead>
          <tbody>
            {ROWS.map((r, i) => (
              <motion.tr
                key={r.fn}
                initial={{ opacity: 0, x: -8 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{ delay: i * 0.04, duration: 0.28 }}
              >
                <td className="rounded-l-lg bg-white/[0.02] px-3 py-2.5 text-[12.5px] leading-snug text-fg-muted">
                  {r.fn}
                </td>
                {([r.managed, r.cosourced] as Owner[]).map((o, j) => (
                  <td
                    key={j}
                    className={`bg-white/[0.02] px-2 py-2.5 text-center ${j === 1 ? "rounded-r-lg" : ""}`}
                  >
                    <span
                      className={`inline-block rounded-full px-2.5 py-0.5 font-mono text-[10px] tracking-wider ring-1 ${OWNER_STYLE[o].cls}`}
                    >
                      {OWNER_STYLE[o].label}
                    </span>
                  </td>
                ))}
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-5 flex gap-2.5 rounded-lg bg-cyan-500/[0.08] px-3 py-2.5 ring-1 ring-cyan-400/25">
        <Building2 className="mt-0.5 size-4 shrink-0 text-cyan-300" />
        <p className="text-[12px] leading-relaxed text-fg-muted">
          <span className="font-semibold text-cyan-200">No lock-in, by design · </span>
          the SIEM runs in your tenancy and the rules, dashboards, historical logs
          and runbooks are yours. If the engagement ends, the capability stays.
        </p>
      </div>
    </div>
  );
}
