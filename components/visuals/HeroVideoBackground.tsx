"use client";

import { useSyncExternalStore } from "react";

interface Props {
  /** Absolute public path to the looping mp4 (must include leading "/"). */
  src: string;
  /** Absolute public path to the poster image (webp / jpg). */
  poster: string;
  /**
   * 0 → fully transparent overlay, 1 → fully opaque black overlay.
   * Defaults to 0.55 so text contrast on top stays readable.
   */
  dim?: number;
  /** Optional gradient tint overlaid above the video for brand coherence. */
  tint?: "cyan" | "purple" | "none";
}

/**
 * Wattlecorp-style hero video background. Renders an autoplay/muted/loop/
 * playsinline <video> sized via object-fit:cover behind absolute-positioned
 * content. Honours prefers-reduced-motion (poster image only). LCP-friendly:
 * the poster is loaded eagerly and serves as the first paint; video preloads
 * metadata only and starts after canPlay.
 */
function subscribePRM(cb: () => void) {
  if (typeof window === "undefined") return () => {};
  const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
}
function getPRMSnapshot() {
  return typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
function getPRMServerSnapshot() {
  return false;
}

export function HeroVideoBackground({
  src,
  poster,
  dim = 0.55,
  tint = "cyan",
}: Props) {
  const reduced = useSyncExternalStore(
    subscribePRM,
    getPRMSnapshot,
    getPRMServerSnapshot
  );

  return (
    <div aria-hidden className="absolute inset-0 -z-10 overflow-hidden">
      {!reduced && (
        <video
          className="absolute inset-0 size-full object-cover"
          src={src}
          poster={poster}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
        />
      )}
      {reduced && (
        // Static poster fallback for prefers-reduced-motion users.
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={poster}
          alt=""
          className="absolute inset-0 size-full object-cover"
        />
      )}

      {/* Brand-tint gradient layered above the video */}
      {tint !== "none" && (
        <div
          className={
            "absolute inset-0 mix-blend-overlay " +
            (tint === "cyan"
              ? "bg-[radial-gradient(ellipse_at_top,rgba(0,229,255,0.25),transparent_60%)]"
              : "bg-[radial-gradient(ellipse_at_top,rgba(168,85,247,0.25),transparent_60%)]")
          }
        />
      )}

      {/* Darkening overlay so foreground text stays legible */}
      <div
        className="absolute inset-0 bg-bg"
        style={{ opacity: dim }}
      />
    </div>
  );
}
