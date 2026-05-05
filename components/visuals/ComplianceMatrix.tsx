"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

const FRAMEWORKS = [
  { name: "CERT-In", desc: "Information security audit empanelled by Indian CERT" },
  { name: "RBI CSF", desc: "RBI Cyber Security Framework + System Audit Reports" },
  { name: "SEBI CSCRF", desc: "Cybersecurity & Cyber Resilience Framework for capital markets" },
  { name: "ISO 27001", desc: "ISMS implementation, internal audit and certification support" },
  { name: "PCI-DSS", desc: "Payment card industry — ASV scans, internal audit, pentest" },
  { name: "GDPR", desc: "Article 32 controls, DPIA, data flow mapping" },
  { name: "HIPAA", desc: "Healthcare data protection (relevant for India + UAE health-tech)" },
  { name: "UAE NESA / SIA", desc: "UAE National Electronic Security Authority compliance" },
];

export function ComplianceMatrix({ className }: { className?: string }) {
  return (
    <div className={cn("grid gap-3 sm:grid-cols-2 lg:grid-cols-4", className)}>
      {FRAMEWORKS.map((f, i) => (
        <motion.div
          key={f.name}
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.04 }}
          className="glass rounded-xl p-4 lift"
        >
          <div className="flex items-start justify-between mb-2">
            <div className="font-display font-bold text-fg">{f.name}</div>
            <div className="grid size-5 place-items-center rounded-full bg-emerald-500/15 text-emerald-400">
              <Check className="size-3" />
            </div>
          </div>
          <p className="text-xs text-fg-muted leading-snug">{f.desc}</p>
        </motion.div>
      ))}
    </div>
  );
}
