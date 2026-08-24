"use client";

import { useReducedMotion } from "framer-motion";
import { ScanSearch, Bug } from "lucide-react";
import { useEffect, useState } from "react";
import { Reveal } from "@/components/motion/Reveal";

function Counter({ to, prefix = "", suffix = "" }: { to: number; prefix?: string; suffix?: string }) {
  const reduce = useReducedMotion();
  const [val, setVal] = useState(reduce ? to : 0);
  useEffect(() => {
    if (reduce) return;
    let raf = 0;
    const start = performance.now();
    const dur = 1400;
    const step = (now: number) => {
      const t = Math.min(1, (now - start) / dur);
      const eased = 1 - Math.pow(1 - t, 3);
      setVal(Math.round(to * eased));
      if (t < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [to, reduce]);
  return (
    <span>
      {prefix}
      {val.toLocaleString()}
      {suffix}
    </span>
  );
}

const VA = {
  title: "Vulnerability Assessment",
  tag: "Breadth · scanner-driven",
  icon: ScanSearch,
  accent: "text-neon-cyan",
  ring: "ring-neon-cyan/30",
  dot: "bg-neon-cyan",
  rows: [
    { label: "Findings raised", value: 824, suffix: "" },
    { label: "Asset coverage", value: 100, suffix: "%" },
    { label: "Manual effort per finding", value: 0, suffix: " min" },
    { label: "False positive rate", value: 38, suffix: "%" },
  ],
  footer: "Tells you everything that might be wrong.",
};

const PT = {
  title: "Penetration Testing",
  tag: "Depth · attacker-driven",
  icon: Bug,
  accent: "text-red-400",
  ring: "ring-red-400/30",
  dot: "bg-red-400",
  rows: [
    { label: "Findings exploited", value: 17, suffix: "" },
    { label: "Critical chains proved", value: 4, suffix: "" },
    { label: "Manual effort per finding", value: 90, suffix: " min" },
    { label: "False positive rate", value: 0, suffix: "%" },
  ],
  footer: "Tells you what an attacker would actually do.",
};

function Card({ side }: { side: typeof VA }) {
  const Icon = side.icon;
  return (
    <Reveal as="div" y={20} duration={0.6} margin="-80px"
      className="relative rounded-3xl glass-strong p-7 overflow-hidden"
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-fg-faint">
            {side.tag}
          </div>
          <h3 className={`mt-2 font-display text-2xl font-black ${side.accent}`}>
            {side.title}
          </h3>
        </div>
        <div className={`grid size-12 place-items-center rounded-xl bg-bg ring-1 ${side.ring} ${side.accent}`}>
          <Icon className="size-6" />
        </div>
      </div>

      <div className="mt-7 space-y-4">
        {side.rows.map((r, i) => (
          <Reveal as="div" y={0} delay={0.15 + i * 0.08} duration={0.4}
            key={r.label}
            className="flex items-baseline justify-between gap-3 border-b border-line/50 pb-3"
          >
            <span className="text-sm text-fg-muted">{r.label}</span>
            <span className={`font-display font-bold text-2xl ${side.accent} font-mono tabular-nums`}>
              <Counter to={r.value} suffix={r.suffix} />
            </span>
          </Reveal>
        ))}
      </div>

      <p className="mt-6 text-sm text-fg italic">{side.footer}</p>
    </Reveal>
  );
}

export function VAvsPT() {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <Card side={VA} />
      <Card side={PT} />
    </div>
  );
}
