"use client";

import { motion } from "framer-motion";
import { BadgeCheck, ArrowUpRight, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";
import { CERT_IN } from "@/components/visuals/CertInLogo";

export function CertInBadge({
  size = "md",
  className,
}: {
  size?: "sm" | "md" | "lg";
  className?: string;
}) {
  const sizes = {
    sm: { wrap: "p-3", title: "text-xs", sub: "text-[10px]", icon: "size-5" },
    md: { wrap: "p-4", title: "text-sm", sub: "text-[11px]", icon: "size-6" },
    lg: { wrap: "p-5", title: "text-base", sub: "text-xs", icon: "size-7" },
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
      <ShieldCheck className={cn("relative shrink-0 text-emerald-400", s.icon)} />
      <div className="relative">
        <div className={cn("font-display font-bold text-fg", s.title)}>
          CERT-In Empanelled
        </div>
        <div className={cn("font-mono text-fg-muted uppercase tracking-wider", s.sub)}>
          <BadgeCheck className="inline-block size-3 mr-1 -mt-0.5 text-emerald-400" />
          Auditing Firm · India
        </div>
      </div>
    </motion.div>
  );
}

export function CertInHero({ className }: { className?: string }) {
  return (
    <div className={cn("relative", className)}>
      <div className="absolute inset-0 bg-gradient-to-r from-neon-cyan/20 via-neon-blue/15 to-neon-purple/20 blur-3xl rounded-full" />
      <div className="relative gradient-border rounded-3xl p-8 sm:p-10 glow-blend">
        <div className="flex flex-col items-start gap-6">
          <div className="relative">
            <div className="absolute inset-0 bg-neon-cyan/30 blur-2xl rounded-full" />
            <ShieldCheck className="relative size-12 sm:size-14 text-emerald-400" />
          </div>
          <div>
            <div className="font-mono text-xs uppercase tracking-[0.22em] text-neon-cyan">
              Government of India · Ministry of Electronics &amp; IT
            </div>
            <div className="mt-2 font-display text-xl sm:text-2xl font-black text-fg leading-snug">
              {CERT_IN.statement}
            </div>
            <ul className="mt-4 space-y-1.5 text-xs text-fg-muted">
              <li className="flex items-start gap-2">
                <BadgeCheck className="size-4 shrink-0 text-emerald-400" />
                <span>Authorized to perform regulator-grade audits in India</span>
              </li>
              <li className="pl-6 font-mono">SEBI · RBI · UIDAI · IRDAI accepted</li>
              <li className="pl-6">
                Empanelled since {CERT_IN.since} · re-empanelled {CERT_IN.renewed}
              </li>
            </ul>
            <a
              href={CERT_IN.verifyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 ml-6 inline-flex items-center gap-0.5 text-xs font-semibold text-neon-cyan hover:text-fg transition-colors"
            >
              Verify on CERT-In&rsquo;s list
              <ArrowUpRight className="size-3.5" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
