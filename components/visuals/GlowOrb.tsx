import { cn } from "@/lib/utils";

interface Props {
  className?: string;
  color?: "cyan" | "purple" | "blue" | "pink" | "green";
  size?: number;
  intensity?: "soft" | "medium" | "strong";
}

const colorMap = {
  cyan: "rgba(0, 229, 255, COLOR_ALPHA)",
  purple: "rgba(168, 85, 247, COLOR_ALPHA)",
  blue: "rgba(77, 124, 255, COLOR_ALPHA)",
  pink: "rgba(236, 72, 153, COLOR_ALPHA)",
  green: "rgba(0, 255, 157, COLOR_ALPHA)",
};

export function GlowOrb({
  className,
  color = "cyan",
  size = 600,
  intensity = "medium",
}: Props) {
  const alpha = intensity === "soft" ? 0.18 : intensity === "strong" ? 0.5 : 0.32;
  const c = colorMap[color].replace("COLOR_ALPHA", String(alpha));
  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none absolute rounded-full blur-[120px]",
        className
      )}
      style={{
        width: size,
        height: size,
        background: `radial-gradient(circle, ${c}, transparent 70%)`,
      }}
    />
  );
}
