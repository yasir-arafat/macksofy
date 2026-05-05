"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { Counter } from "@/components/motion/Counter";
import {
  Users,
  Target,
  ShieldCheck,
  Trophy,
} from "lucide-react";

const STATS = [
  {
    value: 20000,
    suffix: "+",
    label: "Professionals trained",
    icon: Users,
    sub: "India · UAE · GCC",
  },
  {
    value: 500,
    suffix: "+",
    label: "Pentests delivered",
    icon: Target,
    sub: "Web · API · network · cloud",
  },
  {
    value: 50,
    suffix: "+",
    label: "Audits per year",
    icon: ShieldCheck,
    sub: "CERT-In · RBI · SEBI · ISO",
  },
  {
    value: 11,
    suffix: "+",
    label: "Years in business",
    icon: Trophy,
    sub: "Founded 2014 · Mumbai HQ",
  },
];

export function StatsBand() {
  return (
    <section className="relative border-y border-line bg-bg-1 overflow-hidden">
      <div
        aria-hidden
        className="absolute inset-0 opacity-40"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(0,229,255,0.08) 30%, rgba(168,85,247,0.08) 70%, transparent)",
        }}
      />
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-neon-cyan/40 to-transparent"
      />
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-neon-purple/40 to-transparent"
      />

      <Container className="relative py-14 sm:py-16">
        <div className="grid grid-cols-2 gap-x-4 gap-y-10 sm:grid-cols-4 sm:gap-x-6">
          {STATS.map((s, i) => {
            const Icon = s.icon;
            return (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{
                  duration: 0.5,
                  delay: 0.05 + i * 0.08,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="group relative"
              >
                <span
                  aria-hidden
                  className="hidden sm:block absolute -left-3 inset-y-2 w-px bg-gradient-to-b from-neon-cyan/0 via-neon-cyan/40 to-neon-cyan/0"
                />
                <div className="flex items-center gap-2 mb-3">
                  <span className="inline-flex size-6 items-center justify-center rounded-md bg-neon-cyan/10 ring-1 ring-neon-cyan/30 text-neon-cyan group-hover:scale-110 transition-transform">
                    <Icon className="size-3" />
                  </span>
                  <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-fg-faint">
                    {s.sub}
                  </span>
                </div>
                <div className="font-display text-4xl sm:text-5xl font-black gradient-text leading-none tracking-tighter">
                  <Counter value={s.value} suffix={s.suffix} />
                </div>
                <div className="mt-2 font-mono text-[11px] sm:text-xs uppercase tracking-[0.18em] text-fg-muted">
                  {s.label}
                </div>
              </motion.div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
