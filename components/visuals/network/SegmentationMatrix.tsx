"use client";

import { motion } from "framer-motion";
import { Check, X, AlertTriangle } from "lucide-react";

/**
 * Segmentation validation matrix — the deliverable that answers "does the
 * network actually segment the way the diagram says it does?".
 *
 * Illustrative of the matrix shape we ship, populated with a realistic failure
 * pattern (flat user→server reachability, forgotten jump-host, hybrid cloud
 * trust). Not a specific client's result.
 */

type Verdict = "intended" | "blocked" | "gap";

interface Row {
  from: string;
  cells: { to: string; verdict: Verdict; note?: string }[];
}

const ZONES = ["DMZ", "User VLAN", "Server VLAN", "DB tier", "OT / plant", "Cloud VPC"];

const ROWS: Row[] = [
  {
    from: "DMZ",
    cells: [
      { to: "DMZ", verdict: "intended" },
      { to: "User VLAN", verdict: "blocked" },
      { to: "Server VLAN", verdict: "gap", note: "Legacy jump-host permits SMB from the DMZ" },
      { to: "DB tier", verdict: "blocked" },
      { to: "OT / plant", verdict: "blocked" },
      { to: "Cloud VPC", verdict: "blocked" },
    ],
  },
  {
    from: "User VLAN",
    cells: [
      { to: "DMZ", verdict: "intended" },
      { to: "User VLAN", verdict: "intended" },
      { to: "Server VLAN", verdict: "intended" },
      { to: "DB tier", verdict: "gap", note: "Any workstation reaches TCP/1433 directly" },
      { to: "OT / plant", verdict: "blocked" },
      { to: "Cloud VPC", verdict: "intended" },
    ],
  },
  {
    from: "Server VLAN",
    cells: [
      { to: "DMZ", verdict: "intended" },
      { to: "User VLAN", verdict: "blocked" },
      { to: "Server VLAN", verdict: "intended" },
      { to: "DB tier", verdict: "intended" },
      { to: "OT / plant", verdict: "gap", note: "Historian bridges IT and the Purdue L3 boundary" },
      { to: "Cloud VPC", verdict: "intended" },
    ],
  },
  {
    from: "Cloud VPC",
    cells: [
      { to: "DMZ", verdict: "blocked" },
      { to: "User VLAN", verdict: "blocked" },
      { to: "Server VLAN", verdict: "gap", note: "Site-to-site tunnel has no return-path ACL" },
      { to: "DB tier", verdict: "blocked" },
      { to: "OT / plant", verdict: "blocked" },
      { to: "Cloud VPC", verdict: "intended" },
    ],
  },
];

const STYLE: Record<Verdict, { cls: string; label: string }> = {
  intended: {
    cls: "bg-white/[0.03] text-fg-faint ring-line/50",
    label: "Reachable by design",
  },
  blocked: {
    cls: "bg-emerald-500/10 text-emerald-300 ring-emerald-500/30",
    label: "Correctly blocked",
  },
  gap: {
    cls: "bg-red-500/15 text-red-300 ring-red-400/40",
    label: "Reachable — should not be",
  },
};

function Glyph({ verdict }: { verdict: Verdict }) {
  if (verdict === "blocked") return <Check className="size-3.5" />;
  if (verdict === "gap") return <AlertTriangle className="size-3.5" />;
  return <X className="size-3 opacity-40" />;
}

export function SegmentationMatrix() {
  const gaps = ROWS.flatMap((r) => r.cells.filter((c) => c.verdict === "gap").map((c) => ({ from: r.from, ...c })));

  return (
    <div className="rounded-2xl glass p-5 sm:p-7">
      <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-fg-faint">
        Segmentation validation · source → destination
      </div>

      <div className="mt-5 overflow-x-auto">
        <table className="w-full min-w-[560px] border-separate border-spacing-1">
          <thead>
            <tr>
              <th className="w-28" />
              {ZONES.map((z) => (
                <th
                  key={z}
                  className="pb-2 font-mono text-[9px] font-normal uppercase tracking-[0.12em] text-fg-faint"
                >
                  {z}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {ROWS.map((row, ri) => (
              <tr key={row.from}>
                <th className="pr-3 text-right font-mono text-[10px] font-normal uppercase tracking-[0.12em] text-fg-dim">
                  {row.from}
                </th>
                {row.cells.map((cell, ci) => (
                  <td key={cell.to}>
                    <motion.div
                      initial={{ opacity: 0, scale: 0.88 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: ri * 0.08 + ci * 0.03, duration: 0.28 }}
                      title={cell.note ?? STYLE[cell.verdict].label}
                      className={`grid h-10 place-items-center rounded-lg ring-1 ${STYLE[cell.verdict].cls}`}
                    >
                      <Glyph verdict={cell.verdict} />
                    </motion.div>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 font-mono text-[10px] uppercase tracking-wider text-fg-faint">
        {(Object.keys(STYLE) as Verdict[]).map((v) => (
          <span key={v} className="inline-flex items-center gap-1.5">
            <span className={`size-2.5 rounded ring-1 ${STYLE[v].cls}`} />
            {STYLE[v].label}
          </span>
        ))}
      </div>

      <div className="mt-6 space-y-2 border-t border-line/60 pt-5">
        <div className="font-mono text-[10px] uppercase tracking-[0.16em] text-red-300">
          {gaps.length} segmentation gaps in this sample
        </div>
        {gaps.map((g) => (
          <p key={`${g.from}-${g.to}`} className="text-[12px] leading-relaxed text-fg-muted">
            <span className="font-mono text-[11px] text-fg-dim">
              {g.from} → {g.to}
            </span>{" "}
            — {g.note}
          </p>
        ))}
      </div>
    </div>
  );
}
