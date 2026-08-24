"use client";

import { cn } from "@/lib/utils";
import { Reveal } from "@/components/motion/Reveal";

const LEVELS = [
  { label: "Low", color: "#22c55e", bgColor: "bg-emerald-500" },
  { label: "Medium", color: "#fbbf24", bgColor: "bg-amber-400" },
  { label: "High", color: "#fb923c", bgColor: "bg-orange-500" },
  { label: "Critical", color: "#ef4444", bgColor: "bg-red-500" },
] as const;

interface Props {
  level: 0 | 1 | 2 | 3;
  label?: string;
  className?: string;
}

/**
 * Animated risk meter dial. Used in service hero and case study sections to
 * visualize severity quickly.
 */
export function RiskMeter({ level, label, className }: Props) {
  const segments = 4;
  const lvl = LEVELS[level];
  return (
    <div className={cn("inline-flex flex-col items-center gap-3", className)}>
      <div className="font-mono text-[10px] uppercase tracking-wider text-fg-muted">
        Risk severity · {label ?? lvl.label}
      </div>
      <div className="relative flex h-3 gap-1 w-56">
        {Array.from({ length: segments }).map((_, i) => (
          <Reveal as="div" y={0.3} delay={i * 0.12} duration={0.4}
            key={i}
            style={{
              transformOrigin: "left",
              backgroundColor: i <= level ? LEVELS[i].color : "rgba(255,255,255,0.06)",
              boxShadow: i === level ? `0 0 16px ${LEVELS[i].color}` : "none",
            }}
            className="flex-1 rounded-full"
          />
        ))}
      </div>
      <div className="flex w-56 justify-between text-[10px] font-mono uppercase text-fg-faint">
        {LEVELS.map((l, i) => (
          <span
            key={l.label}
            className={cn(i === level && "text-fg font-bold tracking-wider")}
            style={i === level ? { color: l.color } : {}}
          >
            {l.label[0]}
          </span>
        ))}
      </div>
    </div>
  );
}
