"use client";

import { useState } from "react";
import { Play } from "lucide-react";

/**
 * Lightweight YouTube "facade" — renders the poster thumbnail + a play button
 * and only swaps in the real iframe on click. This keeps the landing page fast
 * (no ~1MB of YouTube JS on load) and privacy-friendly (youtube-nocookie + no
 * cookies dropped before the visitor opts in) — both help Google Ads landing
 * page experience / Quality Score.
 */
export function LiteYouTube({
  id,
  title,
  poster = "hqdefault",
}: {
  id: string;
  title: string;
  poster?: "hqdefault" | "maxresdefault";
}) {
  const [active, setActive] = useState(false);
  const thumb = `https://i.ytimg.com/vi/${id}/${poster}.jpg`;

  return (
    <div className="relative aspect-video w-full overflow-hidden rounded-2xl border border-line bg-black shadow-2xl">
      {active ? (
        <iframe
          className="absolute inset-0 h-full w-full"
          src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0&modestbranding=1`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          loading="lazy"
        />
      ) : (
        <button
          type="button"
          onClick={() => setActive(true)}
          className="group absolute inset-0 h-full w-full"
          aria-label={`Play video: ${title}`}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={thumb}
            alt={title}
            loading="lazy"
            className="h-full w-full object-cover opacity-75 transition duration-300 group-hover:opacity-100"
          />
          <span className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
          <span className="absolute left-1/2 top-1/2 flex size-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-neon-cyan text-bg shadow-[0_0_40px_rgba(0,229,255,0.5)] transition duration-300 group-hover:scale-110">
            <Play className="size-7 translate-x-0.5 fill-current" />
          </span>
          <span className="absolute bottom-4 left-4 right-4 text-left text-sm font-semibold text-white drop-shadow">
            {title}
          </span>
        </button>
      )}
    </div>
  );
}
