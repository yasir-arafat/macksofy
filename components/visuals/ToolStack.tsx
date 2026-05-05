import { cn } from "@/lib/utils";

export interface ToolItem {
  name: string;
  category?: string;
}

/**
 * Showcase the technical tools used on engagements. Pure CSS, no images
 * — keeps the page fast while looking technical.
 */
export function ToolStack({
  tools,
  className,
  title = "Tools we operate",
}: {
  tools: ToolItem[];
  className?: string;
  title?: string;
}) {
  return (
    <div className={cn("", className)}>
      <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-neon-cyan mb-4">
        {title}
      </div>
      <div className="flex flex-wrap gap-2">
        {tools.map((t) => (
          <span
            key={t.name}
            className="inline-flex items-center gap-2 rounded-md glass px-3 py-1.5 text-xs font-mono text-fg-muted hover:text-neon-cyan hover:border-neon-cyan/40 transition-colors"
          >
            <span className="size-1.5 rounded-full bg-neon-cyan" />
            {t.name}
            {t.category && (
              <span className="text-fg-faint text-[10px] uppercase tracking-wider">
                · {t.category}
              </span>
            )}
          </span>
        ))}
      </div>
    </div>
  );
}
