"use client";

import { cn } from "@/lib/utils";

export function Marquee({
  children,
  className,
  pauseOnHover = true,
}: {
  children: React.ReactNode;
  className?: string;
  pauseOnHover?: boolean;
}) {
  return (
    <div
      className={cn(
        "group relative w-full overflow-hidden",
        "[mask-image:linear-gradient(90deg,transparent,white_8%,white_92%,transparent)]",
        className
      )}
    >
      <div
        className={cn(
          "flex w-max animate-[marquee_38s_linear_infinite] gap-10",
          pauseOnHover && "group-hover:[animation-play-state:paused]"
        )}
      >
        {children}
        {children}
      </div>
    </div>
  );
}
