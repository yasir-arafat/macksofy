import { cn } from "@/lib/utils";

export function Eyebrow({
  children,
  className,
  color = "cyan",
}: {
  children: React.ReactNode;
  className?: string;
  color?: "cyan" | "purple" | "amber" | "green";
}) {
  const colorMap = {
    cyan: "text-neon-cyan",
    purple: "text-neon-purple",
    amber: "text-amber-400",
    green: "text-emerald-400",
  } as const;
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.22em]",
        colorMap[color],
        className
      )}
    >
      <span className="size-1.5 rounded-full bg-current animate-pulse" />
      {children}
    </span>
  );
}

export function SectionTitle({
  eyebrow,
  title,
  description,
  align = "left",
  className,
  eyebrowColor,
  size = "default",
}: {
  eyebrow?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  align?: "left" | "center";
  className?: string;
  eyebrowColor?: "cyan" | "purple" | "amber" | "green";
  size?: "default" | "lg";
}) {
  return (
    <div
      className={cn(
        "max-w-3xl",
        align === "center" && "mx-auto text-center",
        className
      )}
    >
      {eyebrow && <Eyebrow color={eyebrowColor}>{eyebrow}</Eyebrow>}
      <h2
        className={cn(
          "mt-4 font-display font-bold tracking-tighter text-balance leading-[1.05]",
          size === "lg"
            ? "text-4xl sm:text-5xl lg:text-6xl"
            : "text-3xl sm:text-4xl lg:text-5xl"
        )}
      >
        {title}
      </h2>
      {description && (
        <p className="mt-5 text-lg leading-relaxed text-fg-muted text-pretty">
          {description}
        </p>
      )}
    </div>
  );
}
