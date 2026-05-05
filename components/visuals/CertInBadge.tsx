"use client";

import { motion } from "framer-motion";
import { ShieldCheck, BadgeCheck } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Prominent CERT-In Empanelled Auditor badge.
 * Used on home, audit, services pages — wherever credibility needs anchoring.
 */
export function CertInBadge({
  size = "md",
  className,
}: {
  size?: "sm" | "md" | "lg";
  className?: string;
}) {
  const sizes = {
    sm: { wrap: "p-3", icon: "size-7", title: "text-xs", sub: "text-[10px]" },
    md: { wrap: "p-4", icon: "size-9", title: "text-sm", sub: "text-[11px]" },
    lg: { wrap: "p-5", icon: "size-12", title: "text-base", sub: "text-xs" },
  } as const;
  const s = sizes[size];

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className={cn(
        "relative inline-flex items-center gap-3 rounded-2xl gradient-border glow-cyan",
        s.wrap,
        className
      )}
    >
      <div className="absolute -inset-px rounded-2xl bg-gradient-to-r from-neon-cyan/20 to-neon-purple/20 blur-md opacity-50" />
      <div className="relative grid place-items-center rounded-xl bg-bg p-2 ring-1 ring-neon-cyan/40">
        <ShieldCheck className={cn(s.icon, "text-neon-cyan")} />
      </div>
      <div className="relative">
        <div className={cn("font-display font-bold text-fg", s.title)}>
          CERT-In Empanelled
        </div>
        <div className={cn("font-mono text-fg-muted uppercase tracking-wider", s.sub)}>
          <BadgeCheck className="inline-block size-3 mr-1 -mt-0.5 text-emerald-400" />
          Information Security Auditor · India
        </div>
      </div>
    </motion.div>
  );
}

/** Bigger hero/section variant — the centerpiece for the audit page. */
export function CertInHero({ className }: { className?: string }) {
  return (
    <div className={cn("relative", className)}>
      <div className="absolute inset-0 bg-gradient-to-r from-neon-cyan/20 via-neon-blue/15 to-neon-purple/20 blur-3xl rounded-full" />
      <div className="relative gradient-border rounded-3xl p-8 sm:p-10 glow-blend">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
          <div className="relative">
            <div className="absolute inset-0 bg-neon-cyan/30 blur-2xl rounded-full" />
            <div className="relative grid place-items-center size-24 rounded-2xl bg-bg-2 ring-2 ring-neon-cyan/60">
              <ShieldCheck className="size-12 text-neon-cyan" />
            </div>
          </div>
          <div className="flex-1">
            <div className="font-mono text-xs uppercase tracking-[0.22em] text-neon-cyan">
              Government of India · Ministry of Electronics &amp; IT
            </div>
            <div className="mt-2 font-display text-2xl sm:text-3xl font-black text-fg">
              CERT-In Empanelled
              <br />
              Information Security Auditor
            </div>
            <div className="mt-3 flex flex-wrap items-center gap-2 text-xs text-fg-muted">
              <BadgeCheck className="size-4 text-emerald-400" />
              <span>Authorized to perform regulator-grade audits in India</span>
              <span className="text-fg-faint">·</span>
              <span className="font-mono">SEBI · RBI · UIDAI · IRDAI accepted</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
