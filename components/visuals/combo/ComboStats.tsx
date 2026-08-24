"use client";

import { useEffect, useRef, useState } from "react";
import {
  useInView,
  useMotionValue,
  useTransform,
  animate,
} from "framer-motion";
import { Sparkles } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";

interface Stat {
  value: string;
  label: string;
}

function StatCounter({ raw }: { raw: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  // Parse first run of digits + optional decimal so we can animate; the rest is
  // appended verbatim ("200+", "₹15L", "24×7", "92%").
  const match = raw.match(/^(\D*)(\d+(?:\.\d+)?)(.*)$/);
  const prefix = match?.[1] ?? "";
  const target = match ? Number(match[2]) : 0;
  const suffix = match?.[3] ?? raw;
  const mv = useMotionValue(0);
  const display = useTransform(mv, (v) => {
    const rounded = target % 1 === 0 ? Math.round(v) : v.toFixed(1);
    return `${prefix}${rounded}${suffix}`;
  });
  const [animatedText, setAnimatedText] = useState(`${prefix}0${suffix}`);

  useEffect(() => {
    if (!match || !inView) return;
    const controls = animate(mv, target, {
      duration: 1.4,
      ease: [0.22, 1, 0.36, 1],
    });
    const unsub = display.on("change", (v) => setAnimatedText(v));
    return () => {
      controls.stop();
      unsub();
    };
  }, [inView, mv, display, target, match]);

  return <span ref={ref}>{match ? animatedText : raw}</span>;
}

export function ComboStats({ stats }: { stats: Stat[] }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((s, i) => (
        <Reveal as="div" y={14} delay={i * 0.07} duration={0.45}
          key={s.label + i}
          className="relative overflow-hidden rounded-2xl glass p-5 sm:p-6"
        >
          <div
            aria-hidden
            className="absolute -top-12 -right-12 size-32 rounded-full bg-neon-cyan/10 blur-2xl"
          />
          <div className="relative flex items-center justify-between">
            <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-fg-faint">
              {String(i + 1).padStart(2, "0")}
            </span>
            <Sparkles className="size-3 text-fg-faint opacity-50" />
          </div>
          <div className="relative mt-4 font-display text-3xl sm:text-4xl font-black gradient-text leading-none tabular-nums">
            <StatCounter raw={s.value} />
          </div>
          <div className="relative mt-2 font-mono text-[10px] uppercase tracking-[0.22em] text-fg-muted">
            {s.label}
          </div>
        </Reveal>
      ))}
    </div>
  );
}
