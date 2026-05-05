"use client";

import { motion } from "framer-motion";
import {
  Users,
  Target,
  ShieldCheck,
  Trophy,
  Globe2,
  GraduationCap,
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Counter } from "@/components/motion/Counter";

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
    value: 20000,
    suffix: "+",
    label: "Professionals trained",
    sub: "India · UAE · GCC alumni",
    icon: GraduationCap,
    accent: "cyan",
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
    value: 500,
    suffix: "+",
    label: "Pentests delivered",
    sub: "Web · API · network · cloud",
    icon: Target,
    accent: "rose",
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

// Cumulative-trained learners by year (used for the trajectory line below)
const TRAJECTORY = [
  { year: 2014, value: 200 },
  { year: 2016, value: 1100 },
  { year: 2018, value: 3500 },
  { year: 2020, value: 7800 },
  { year: 2022, value: 13500 },
  { year: 2024, value: 18200 },
  { year: 2026, value: 20000 },
];

export function StatsInfographic() {
  return (
    <section className="relative py-24 sm:py-28 overflow-hidden">
      <div
        aria-hidden
        className="absolute inset-0 opacity-30 bg-grid"
      />
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
        <div className="mt-12 grid grid-cols-2 lg:grid-cols-3 gap-4">
          {STATS.map((s, i) => {
            const tone = TONE[s.accent];
            const Icon = s.icon;
            return (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ duration: 0.5, delay: 0.05 + i * 0.06 }}
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
              </motion.div>
            );
          })}
        </div>

        {/* Growth trajectory line */}
        <div className="mt-12 rounded-3xl bg-bg-2/40 ring-1 ring-line p-6 sm:p-7">
          <div className="flex items-baseline justify-between gap-3 flex-wrap mb-6">
            <div>
              <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-neon-cyan font-bold">
                Cumulative learners trained · 2014 → 2026
              </div>
              <div className="mt-1 text-sm text-fg-muted">
                100× growth in a decade — and counting.
              </div>
            </div>
            <div className="font-mono text-[10px] text-fg-faint">
              live · annualised
            </div>
          </div>
          <TrajectoryChart />
        </div>
      </Container>
    </section>
  );
}

function TrajectoryChart() {
  const W = 1000;
  const H = 220;
  const padX = 32;
  const padTop = 16;
  const padBottom = 28;
  const innerW = W - padX * 2;
  const innerH = H - padTop - padBottom;

  const points = TRAJECTORY.map((p) => p.value);
  const max = Math.max(...points);
  const min = 0;
  const range = max - min;
  const stepX = innerW / (points.length - 1);

  const coords = TRAJECTORY.map((p, i) => ({
    x: padX + i * stepX,
    y: padTop + (1 - (p.value - min) / range) * innerH,
    raw: p,
  }));

  // Smooth bezier path
  const path = coords
    .map((c, i, arr) => {
      if (i === 0) return `M ${c.x} ${c.y}`;
      const prev = arr[i - 1];
      const cx = (prev.x + c.x) / 2;
      return `C ${cx} ${prev.y}, ${cx} ${c.y}, ${c.x} ${c.y}`;
    })
    .join(" ");

  const areaPath = `${path} L ${coords[coords.length - 1].x} ${padTop + innerH} L ${coords[0].x} ${padTop + innerH} Z`;

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto">
      <defs>
        <linearGradient id="traj-area" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.45" />
          <stop offset="100%" stopColor="#22d3ee" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="traj-line" x1="0" x2="1" y1="0" y2="0">
          <stop offset="0%" stopColor="#00e5ff" />
          <stop offset="50%" stopColor="#4d7cff" />
          <stop offset="100%" stopColor="#a855f7" />
        </linearGradient>
      </defs>

      {/* Horizontal grid */}
      <g stroke="rgba(255,255,255,0.06)">
        {[0, 0.25, 0.5, 0.75, 1].map((t) => (
          <line
            key={t}
            x1={padX}
            x2={W - padX}
            y1={padTop + t * innerH}
            y2={padTop + t * innerH}
          />
        ))}
      </g>

      {/* Filled area */}
      <motion.path
        d={areaPath}
        fill="url(#traj-area)"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.5 }}
      />

      {/* Trajectory line */}
      <motion.path
        d={path}
        fill="none"
        stroke="url(#traj-line)"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.4, ease: "easeOut" }}
      />

      {/* Year markers */}
      {coords.map((c, i) => (
        <g key={i}>
          <motion.circle
            cx={c.x}
            cy={c.y}
            r={4}
            fill="#22d3ee"
            stroke="rgba(8,8,20,0.95)"
            strokeWidth="2"
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.7 + i * 0.08 }}
          />
          <text
            x={c.x}
            y={H - 6}
            textAnchor="middle"
            fontSize="10"
            fontFamily="monospace"
            fill="rgba(232,238,247,0.5)"
          >
            {c.raw.year}
          </text>
          {/* Last point gets a callout label */}
          {i === coords.length - 1 && (
            <g>
              <rect
                x={c.x - 50}
                y={c.y - 30}
                width="100"
                height="22"
                rx="11"
                fill="rgba(0,229,255,0.15)"
                stroke="rgba(0,229,255,0.5)"
              />
              <text
                x={c.x}
                y={c.y - 15}
                textAnchor="middle"
                fontSize="11"
                fontFamily="monospace"
                fontWeight="700"
                fill="#22d3ee"
              >
                {c.raw.value.toLocaleString()}
              </text>
            </g>
          )}
        </g>
      ))}
    </svg>
  );
}
