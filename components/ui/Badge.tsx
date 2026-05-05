import { cn } from "@/lib/utils";

type Variant =
  | "neutral"
  | "cyan"
  | "purple"
  | "green"
  | "red"
  | "amber"
  | "outline"
  | "cert";

const variants: Record<Variant, string> = {
  neutral: "bg-white/5 text-fg-muted ring-white/10",
  cyan: "bg-neon-cyan/10 text-neon-cyan ring-neon-cyan/30",
  purple: "bg-neon-purple/10 text-neon-purple ring-neon-purple/30",
  green: "bg-emerald-500/10 text-emerald-300 ring-emerald-500/30",
  red: "bg-red-500/10 text-red-300 ring-red-500/30",
  amber: "bg-amber-500/10 text-amber-300 ring-amber-500/30",
  outline: "bg-transparent text-fg ring-white/20",
  cert: "bg-gradient-to-r from-neon-cyan/20 to-neon-purple/20 text-fg ring-1 ring-neon-cyan/40",
};

export function Badge({
  variant = "neutral",
  children,
  className,
}: {
  variant?: Variant;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ring-1",
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
