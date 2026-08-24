"use client";

import { Users, ShieldCheck, Trophy, Globe2 } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Counter } from "@/components/motion/Counter";
import { Reveal } from "@/components/motion/Reveal";

/**
 * "Professionals trained" (20,000+) and "Pentests delivered" (500+) were removed:
 * both were unsourced counts. A count-up counter cannot state an unquantified
 * claim, so the tiles go rather than carry an invented number. Re-add only with
 * a figure that can be evidenced from enrolment / engagement records.
 */
const STATS = [
  {
    value: 11,
    suffix: "+",
    label: "Years in business",
    sub: "Founded 2014, BKC Mumbai",
    icon: Trophy,
    accent: "amber",
  },
  {
    value: 250,
    suffix: "+",
    label: "Enterprise clients",
    sub: "BFSI · Govt · SaaS · Pharma",
    icon: Users,
    accent: "purple",
  },
  {
    value: 30,
    suffix: "+",
    label: "Regulated audits / yr",
    sub: "CERT-In · RBI · SEBI · ISO",
    icon: ShieldCheck,
    accent: "green",
  },
  {
    value: 5,
    suffix: "",
    label: "Countries served",
    sub: "India · UAE · Oman · Canada · UK",
    icon: Globe2,
    accent: "cyan",
  },
];

const TONE: Record<
  string,
  { text: string; bgSoft: string; ring: string; bg: string; hex: string }
> = {
  cyan: {
    text: "text-neon-cyan",
    bgSoft: "bg-neon-cyan/10",
    ring: "ring-neon-cyan/40",
    bg: "bg-neon-cyan",
    hex: "#00e5ff",
  },
  purple: {
    text: "text-neon-purple",
    bgSoft: "bg-neon-purple/10",
    ring: "ring-neon-purple/40",
    bg: "bg-neon-purple",
    hex: "#a855f7",
  },
  amber: {
    text: "text-amber-300",
    bgSoft: "bg-amber-500/10",
    ring: "ring-amber-400/40",
    bg: "bg-amber-300",
    hex: "#fbbf24",
  },
  rose: {
    text: "text-rose-300",
    bgSoft: "bg-rose-500/10",
    ring: "ring-rose-400/40",
    bg: "bg-rose-400",
    hex: "#fb7185",
  },
  green: {
    text: "text-emerald-300",
    bgSoft: "bg-emerald-500/10",
    ring: "ring-emerald-400/40",
    bg: "bg-emerald-400",
    hex: "#4ade80",
  },
};

export function StatsInfographic() {
  return (
    <section className="relative py-24 sm:py-28 overflow-hidden">
      <div aria-hidden className="absolute inset-0 opacity-30 bg-grid" />
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-neon-cyan/40 to-transparent"
      />
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-neon-purple/40 to-transparent"
      />

      <Container className="relative">
        <div className="max-w-3xl">
          <span className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.22em] text-neon-cyan font-semibold">
            <span className="size-1.5 rounded-full bg-neon-cyan animate-pulse" />
            By the numbers · 2014 → today
          </span>
          <h2 className="mt-3 font-display text-4xl font-black sm:text-5xl text-balance leading-[1.05]">
            A decade of compounding{" "}
            <span className="gradient-text">cybersecurity practice.</span>
          </h2>
        </div>

        {/* Stats grid */}
        <div className="mt-12 grid grid-cols-2 lg:grid-cols-4 gap-4">
          {STATS.map((s, i) => {
            const tone = TONE[s.accent];
            const Icon = s.icon;
            return (
              <Reveal
                as="div"
                y={16}
                delay={0.05 + i * 0.06}
                duration={0.5}
                margin="-10%"
                key={s.label}
                className="group relative rounded-2xl bg-bg-2/40 ring-1 ring-line p-5 sm:p-6 hover:ring-white/15 transition-all overflow-hidden"
              >
                <div
                  aria-hidden
                  className={`absolute -top-12 -right-12 size-40 rounded-full ${tone.bgSoft} blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                />
                <div className="relative flex items-start justify-between gap-3">
                  <div
                    className={`grid size-9 shrink-0 place-items-center rounded-lg ${tone.bgSoft} ring-1 ${tone.ring} ${tone.text}`}
                  >
                    <Icon className="size-4" />
                  </div>
                  <span className="font-mono text-[9px] uppercase tracking-[0.22em] text-fg-faint">
                    {s.sub}
                  </span>
                </div>
                <div
                  className={`mt-5 font-display text-4xl sm:text-5xl font-black leading-none tracking-tighter tabular-nums ${tone.text}`}
                >
                  <Counter value={s.value} suffix={s.suffix} />
                </div>
                <div className="mt-2 font-mono text-[11px] uppercase tracking-[0.18em] text-fg-muted">
                  {s.label}
                </div>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
