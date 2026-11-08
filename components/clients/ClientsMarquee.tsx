"use client";

import Image from "next/image";
import { CLIENTS } from "@/content/clients";
import { cn } from "@/lib/utils";

/**
 * Two-row infinite marquee of client logos. White-card tiles so the colored
 * brand logos read clearly against the dark theme.
 */
export function ClientsMarquee({
  rows = 2,
  speedSec = 60,
  className,
}: {
  rows?: number;
  speedSec?: number;
  className?: string;
}) {
  // Split clients into N approximately-equal rows.
  const buckets: typeof CLIENTS[] = Array.from({ length: rows }, () => []);
  CLIENTS.forEach((c, i) => buckets[i % rows].push(c));

  return (
    <div className={cn("space-y-4", className)}>
      {buckets.map((row, i) => (
        <MarqueeRow
          key={i}
          items={row}
          speedSec={speedSec + i * 6}
          reverse={i % 2 === 1}
        />
      ))}
    </div>
  );
}

function MarqueeRow({
  items,
  speedSec,
  reverse,
}: {
  items: typeof CLIENTS;
  speedSec: number;
  reverse: boolean;
}) {
  return (
    <div className="group relative w-full overflow-hidden [mask-image:linear-gradient(90deg,transparent,white_8%,white_92%,transparent)]">
      <div
        className={cn(
          "flex w-max gap-4 group-hover:[animation-play-state:paused]"
        )}
        style={{
          animation: `marquee ${speedSec}s linear infinite ${reverse ? "reverse" : "normal"}`,
        }}
      >
        {[...items, ...items].map((c, idx) => (
          <div
            key={`${c.name}-${idx}`}
            className="relative flex h-20 w-44 shrink-0 items-center justify-center rounded-xl bg-white p-3 ring-1 ring-line transition-all hover:ring-neon-cyan/40 hover:shadow-[0_0_24px_rgba(0,229,255,0.25)]"
            title={c.name}
          >
            {/* Fixed 176x80 instead of `fill` + sizes: same box and the same
                256/384 px files, but a 1x/2x srcSet instead of 15 widths.
                That trimmed ~1 KB per tag across 96 tags on the homepage. */}
            <Image
              src={c.logo}
              alt={`${c.name} logo — Macksofy client`}
              width={176}
              height={80}
              className="absolute inset-0 h-full w-full object-contain p-2"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
