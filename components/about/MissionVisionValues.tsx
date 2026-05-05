"use client";

import { motion } from "framer-motion";
import { Compass, Telescope, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

const ITEMS = [
  {
    label: "Mission",
    title: "Make Indian cybersecurity world-class.",
    body:
      "Build the talent, deliver the assurance, and harden the institutions that India and the GCC depend on — through training that produces practitioners and consulting that produces measurable outcomes.",
    icon: Compass,
    accent: "cyan",
  },
  {
    label: "Vision",
    title: "Be the partner regulators trust and attackers respect.",
    body:
      "A cybersecurity firm whose reports are accepted by every Indian regulator on the first read, and whose alumni are running the SOCs, red teams and AppSec functions of every major Indian bank, fintech and government body.",
    icon: Telescope,
    accent: "purple",
  },
  {
    label: "Values",
    title: "Excellence. Mentorship. Vendor-true.",
    body:
      "Ship work we are proud to put our name on. Stay with the customer past sign-off. Stay with the student past the exam. Never resell what we cannot teach.",
    icon: Sparkles,
    accent: "amber",
  },
] as const;

const ACCENT = {
  cyan: { text: "text-neon-cyan", grad: "from-neon-cyan/20 to-transparent", ring: "ring-neon-cyan/40", glow: "shadow-[0_0_60px_rgba(0,229,255,0.35)]" },
  purple: { text: "text-neon-purple", grad: "from-neon-purple/20 to-transparent", ring: "ring-neon-purple/40", glow: "shadow-[0_0_60px_rgba(168,85,247,0.35)]" },
  amber: { text: "text-amber-300", grad: "from-amber-300/20 to-transparent", ring: "ring-amber-300/40", glow: "shadow-[0_0_60px_rgba(252,211,77,0.35)]" },
} as const;

export function MissionVisionValues() {
  return (
    <div className="grid gap-6 lg:grid-cols-3">
      {ITEMS.map((it, i) => {
        const a = ACCENT[it.accent];
        const Icon = it.icon;
        return (
          <motion.article
            key={it.label}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.5 }}
            className="relative group"
          >
            <div className="relative h-full rounded-3xl gradient-border overflow-hidden lift">
              <div className={cn("absolute inset-0 bg-gradient-to-br opacity-60", a.grad)} />
              <div className="absolute inset-0 bg-grid opacity-30" />

              <div className="relative p-7 h-full flex flex-col">
                <div
                  className={cn(
                    "grid size-14 place-items-center rounded-2xl bg-bg-2 ring-2 mb-5 transition-all group-hover:scale-110",
                    a.ring,
                    a.glow
                  )}
                >
                  <Icon className={cn("size-7", a.text)} />
                </div>
                <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-fg-faint">
                  {it.label}
                </div>
                <h3 className="mt-2 font-display text-xl font-black text-fg leading-tight text-balance">
                  {it.title}
                </h3>
                <p className="mt-4 text-fg-muted text-sm leading-relaxed text-pretty">
                  {it.body}
                </p>
              </div>
            </div>
          </motion.article>
        );
      })}
    </div>
  );
}
