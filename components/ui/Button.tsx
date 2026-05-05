import Link from "next/link";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";
import { ComponentPropsWithoutRef, ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost" | "outline" | "destructive";
type Size = "sm" | "md" | "lg";

interface BaseProps {
  variant?: Variant;
  size?: Size;
  withArrow?: boolean;
  className?: string;
  children: ReactNode;
}

const variantStyles: Record<Variant, string> = {
  // Primary: gradient cyan -> purple, white text, glow on hover
  primary:
    "btn-shine bg-gradient-to-r from-neon-cyan via-neon-blue to-neon-purple text-white shadow-[0_0_30px_rgba(0,229,255,0.25)] hover:shadow-[0_0_45px_rgba(168,85,247,0.45)]",
  // Secondary: solid surface, glass border
  secondary:
    "bg-surface text-fg border border-line hover:border-neon-cyan/40 hover:bg-surface-2",
  // Ghost: transparent, text only
  ghost: "text-fg hover:bg-white/5",
  // Outline: cyan border, cyan text, fills on hover
  outline:
    "border-2 border-neon-cyan text-neon-cyan hover:bg-neon-cyan hover:text-bg",
  // Destructive (rare)
  destructive: "bg-red-500 text-white hover:bg-red-600",
};

const sizeStyles: Record<Size, string> = {
  sm: "h-9 px-4 text-sm",
  md: "h-11 px-5 text-sm",
  lg: "h-14 px-7 text-base",
};

const baseStyles =
  "inline-flex items-center justify-center gap-2 rounded-full font-semibold tracking-tight transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neon-cyan focus-visible:ring-offset-2 focus-visible:ring-offset-bg disabled:opacity-50 disabled:pointer-events-none whitespace-nowrap";

export function Button({
  variant = "primary",
  size = "md",
  withArrow,
  className,
  children,
  ...rest
}: BaseProps & ComponentPropsWithoutRef<"button">) {
  return (
    <button
      className={cn(baseStyles, variantStyles[variant], sizeStyles[size], className)}
      {...rest}
    >
      {children}
      {withArrow && <ArrowRight className="size-4" />}
    </button>
  );
}

export function LinkButton({
  variant = "primary",
  size = "md",
  withArrow,
  className,
  children,
  href,
  ...rest
}: BaseProps & {
  href: string;
} & Omit<ComponentPropsWithoutRef<"a">, "children" | "className">) {
  const isExternal =
    href.startsWith("http") || href.startsWith("tel:") || href.startsWith("mailto:");
  const Comp = isExternal ? "a" : Link;
  return (
    <Comp
      href={href as never}
      className={cn(baseStyles, variantStyles[variant], sizeStyles[size], className)}
      {...rest}
    >
      {children}
      {withArrow && <ArrowRight className="size-4" />}
    </Comp>
  );
}
