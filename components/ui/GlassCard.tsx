import { cn } from "@/lib/utils";
import { forwardRef, type HTMLAttributes } from "react";

interface Props extends HTMLAttributes<HTMLDivElement> {
  glow?: "none" | "cyan" | "purple" | "blend";
  gradient?: boolean;
  hover?: boolean;
}

export const GlassCard = forwardRef<HTMLDivElement, Props>(function GlassCard(
  { className, glow = "none", gradient, hover, ...rest },
  ref
) {
  return (
    <div
      ref={ref}
      className={cn(
        "relative rounded-2xl overflow-hidden",
        gradient ? "gradient-border" : "glass",
        hover && "lift",
        glow === "cyan" && "glow-cyan",
        glow === "purple" && "glow-purple",
        glow === "blend" && "glow-blend",
        className
      )}
      {...rest}
    />
  );
});
