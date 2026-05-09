"use client";

import { motion } from "framer-motion";
import { Cloud, Server, Lock, Database, AlertTriangle, Network } from "lucide-react";

const PROVIDERS = [
  {
    name: "AWS",
    color: "text-amber-300 ring-amber-400/40 bg-amber-400/10",
    components: [
      { icon: Server, label: "EC2", findings: 2 },
      { icon: Database, label: "S3", findings: 1, severity: "high" },
      { icon: Lock, label: "IAM", findings: 3, severity: "crit" },
      { icon: Network, label: "VPC", findings: 0 },
    ],
  },
  {
    name: "Azure",
    color: "text-sky-300 ring-sky-400/40 bg-sky-400/10",
    components: [
      { icon: Server, label: "VMs", findings: 1 },
      { icon: Database, label: "Blob", findings: 1, severity: "high" },
      { icon: Lock, label: "Entra ID", findings: 2 },
      { icon: Network, label: "NSG", findings: 1 },
    ],
  },
  {
    name: "GCP",
    color: "text-emerald-300 ring-emerald-400/40 bg-emerald-400/10",
    components: [
      { icon: Server, label: "GCE", findings: 0 },
      { icon: Database, label: "GCS", findings: 0 },
      { icon: Lock, label: "IAM", findings: 1 },
      { icon: Network, label: "VPC", findings: 1 },
    ],
  },
];

export function CloudArchitecture() {
  return (
    <div className="grid gap-5 lg:grid-cols-3">
      {PROVIDERS.map((p, i) => (
        <motion.div
          key={p.name}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.12, duration: 0.5 }}
          className={`relative rounded-2xl glass-strong p-5 ring-1 ${p.color.replace("text-", "ring-").replace(/-\d{3}/g, "-400/30")}`}
        >
          <div className="flex items-center gap-3 mb-5">
            <div className={`grid size-10 place-items-center rounded-lg ring-1 ${p.color}`}>
              <Cloud className="size-5" />
            </div>
            <span className="font-display text-xl font-black text-fg">{p.name}</span>
          </div>

          <div className="grid grid-cols-2 gap-2.5">
            {p.components.map((c, ci) => {
              const CIcon = c.icon;
              const sev = c.severity;
              return (
                <motion.div
                  key={c.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.12 + ci * 0.06 + 0.2, duration: 0.35 }}
                  className={`relative rounded-lg ring-1 px-3 py-2.5 ${
                    c.findings === 0
                      ? "ring-emerald-400/20 bg-emerald-500/5"
                      : sev === "crit"
                      ? "ring-red-400/40 bg-red-500/10 shadow-[0_0_20px_rgba(248,113,113,0.18)]"
                      : sev === "high"
                      ? "ring-amber-400/40 bg-amber-400/10"
                      : "ring-line/40 bg-bg-1/40"
                  }`}
                >
                  <div className="flex items-center gap-1.5">
                    <CIcon className={`size-3.5 ${c.findings === 0 ? "text-emerald-400" : "text-fg"}`} />
                    <span className="font-mono text-[10px] uppercase tracking-wider text-fg">
                      {c.label}
                    </span>
                  </div>
                  {c.findings > 0 ? (
                    <div className="mt-1 flex items-center gap-1">
                      <AlertTriangle
                        className={`size-3 ${sev === "crit" ? "text-red-400" : sev === "high" ? "text-amber-300" : "text-fg-faint"}`}
                      />
                      <span className="font-mono text-[10px] text-fg-muted">
                        {c.findings} finding{c.findings > 1 ? "s" : ""}
                      </span>
                    </div>
                  ) : (
                    <div className="mt-1 font-mono text-[10px] text-emerald-400">clean</div>
                  )}
                </motion.div>
              );
            })}
          </div>

          <div className="mt-4 pt-3 border-t border-line/40 flex items-center justify-between text-[10px] font-mono uppercase tracking-wider text-fg-faint">
            <span>CIS benchmark</span>
            <span className="text-fg">
              {p.components.reduce((s, c) => s + c.findings, 0)} gaps
            </span>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
