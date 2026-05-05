"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { VENDOR_LOGOS } from "@/content/vendorLogos";

const EXTRA = [
  { label: "CERT-In Empanelled", body: "Govt of India · MeitY", color: "from-neon-cyan/30 to-neon-blue/15" },
  { label: "ISO 27001:2022", body: "Information Security Mgmt", color: "from-neon-purple/30 to-neon-pink/15" },
  { label: "Startup India", body: "DPIIT-recognized", color: "from-amber-300/30 to-amber-300/5" },
];

export function AccreditationsBadgeWall() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {VENDOR_LOGOS.map((v, i) => (
        <motion.div
          key={v.vendor}
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.06, duration: 0.4 }}
          className="group rounded-2xl glass p-5 lift"
        >
          <div className="relative aspect-[1024/699] overflow-hidden rounded-xl bg-white">
            <Image
              src={v.src}
              alt={v.alt}
              fill
              sizes="(max-width:768px) 50vw, 240px"
              className="object-contain p-2"
            />
          </div>
          <div className="mt-3 text-center">
            <div className="font-display text-sm font-bold text-fg">{v.label}</div>
            <div className="font-mono text-[10px] uppercase tracking-wider text-fg-faint mt-0.5">
              {v.vendor}
            </div>
          </div>
        </motion.div>
      ))}

      {/* Non-image accreditation cards */}
      {EXTRA.map((e, i) => (
        <motion.div
          key={e.label}
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: (VENDOR_LOGOS.length + i) * 0.06, duration: 0.4 }}
          className="rounded-2xl gradient-border p-5 lift relative overflow-hidden"
        >
          <div className={`absolute inset-0 bg-gradient-to-br ${e.color}`} />
          <div className="relative h-full flex flex-col items-center justify-center text-center min-h-[152px]">
            <div className="grid size-12 place-items-center rounded-full bg-bg/60 backdrop-blur ring-2 ring-neon-cyan/40 mb-3">
              <CheckCircle2 className="size-6 text-neon-cyan" />
            </div>
            <div className="font-display text-base font-bold text-fg">{e.label}</div>
            <div className="font-mono text-[10px] uppercase tracking-wider text-fg-muted mt-1">
              {e.body}
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
