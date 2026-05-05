"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Bug,
  ShieldCheck,
  GraduationCap,
  Crosshair,
  Zap,
  Cloud,
} from "lucide-react";
import { cn } from "@/lib/utils";

const CHIPS = [
  { label: "Penetration Testing", icon: Bug, tone: "cyan" },
  { label: "VAPT", icon: Crosshair, tone: "purple" },
  { label: "CERT-In Audit", icon: ShieldCheck, tone: "amber" },
  { label: "Red Teaming", icon: Zap, tone: "rose" },
  { label: "Cloud Security", icon: Cloud, tone: "cyan" },
  { label: "Training (OSCP/CEH)", icon: GraduationCap, tone: "purple" },
] as const;

const tones = {
  cyan: "hover:border-neon-cyan/60 hover:text-neon-cyan hover:bg-neon-cyan/5",
  purple: "hover:border-neon-purple/60 hover:text-neon-purple hover:bg-neon-purple/5",
  amber: "hover:border-amber-400/60 hover:text-amber-300 hover:bg-amber-500/5",
  rose: "hover:border-rose-400/60 hover:text-rose-300 hover:bg-rose-500/5",
} as const;

export function EngagementChips({ active }: { active?: string }) {
  return (
    <div className="flex flex-wrap gap-2">
      {CHIPS.map((c, i) => {
        const Icon = c.icon;
        const isActive = active === c.label;
        return (
          <motion.div
            key={c.label}
            initial={{ opacity: 0, y: 6 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.04, duration: 0.3 }}
          >
            <Link
              href={`/contact?interest=${encodeURIComponent(c.label)}#enquiry`}
              scroll={false}
              className={cn(
                "inline-flex items-center gap-2 rounded-full border bg-bg-2/40 px-3.5 py-2 text-xs font-semibold text-fg-muted transition-all",
                isActive
                  ? "border-neon-cyan/60 text-neon-cyan bg-neon-cyan/10"
                  : `border-line ${tones[c.tone]}`
              )}
            >
              <Icon className="size-3.5" />
              {c.label}
            </Link>
          </motion.div>
        );
      })}
    </div>
  );
}
