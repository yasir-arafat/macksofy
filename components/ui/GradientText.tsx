import { cn } from "@/lib/utils";

export function GradientText({
  children,
  className,
  as: Comp = "span",
}: {
  children: React.ReactNode;
  className?: string;
  as?: "span" | "h1" | "h2" | "h3" | "p";
}) {
  return <Comp className={cn("gradient-text", className)}>{children}</Comp>;
}
