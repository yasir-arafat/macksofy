"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { ChevronDown } from "lucide-react";

/**
 * Subtle CRT scan-lines overlay using a repeating linear gradient. Adds
 * an analogue feel without obscuring content.
 */
export function ScanLines({ className = "" }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-0 mix-blend-overlay opacity-[0.07] ${className}`}
      style={{
        backgroundImage:
          "repeating-linear-gradient(to bottom, rgba(255,255,255,0.6) 0 1px, transparent 1px 3px)",
      }}
    />
  );
}

/**
 * Cinematic edge vignette — darkens corners to focus attention on centre.
 */
export function Vignette({ className = "" }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-0 ${className}`}
      style={{
        background:
          "radial-gradient(ellipse 100% 80% at 50% 50%, transparent 40%, rgba(0,0,0,0.55) 100%)",
      }}
    />
  );
}

/**
 * SVG-based film grain. Static random noise; cheap and authentic.
 */
export function FilmGrain({ className = "", opacity = 0.06 }: { className?: string; opacity?: number }) {
  return (
    <svg
      aria-hidden
      className={`pointer-events-none absolute inset-0 size-full mix-blend-overlay ${className}`}
      style={{ opacity }}
    >
      <filter id="grain-filter">
        <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" stitchTiles="stitch" />
        <feColorMatrix type="saturate" values="0" />
      </filter>
      <rect width="100%" height="100%" filter="url(#grain-filter)" />
    </svg>
  );
}

/**
 * Animated horizontal sweep that travels across an element. Useful as a
 * hero "scan line" pulse.
 */
export function SweepLine({
  color = "#00e5ff",
  duration = 4,
  delay = 0,
}: {
  color?: string;
  duration?: number;
  delay?: number;
}) {
  return (
    <motion.span
      aria-hidden
      initial={{ x: "-30%", opacity: 0 }}
      animate={{ x: "130%", opacity: [0, 0.7, 0] }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: "easeInOut",
        repeatDelay: 3,
      }}
      className="pointer-events-none absolute inset-y-0 w-[40%]"
      style={{
        background: `linear-gradient(90deg, transparent, ${color}33, transparent)`,
      }}
    />
  );
}

/**
 * Bouncing scroll-to-explore prompt that fades out as the page is scrolled.
 */
export function ScrollPrompt({ label = "Scroll to explore" }: { label?: string }) {
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 200], [1, 0]);

  return (
    <motion.div
      style={{ opacity }}
      className="pointer-events-none absolute bottom-6 left-1/2 -translate-x-1/2 hidden lg:flex flex-col items-center gap-2 z-10"
    >
      <span className="font-mono text-[10px] uppercase tracking-[0.32em] text-fg-faint">
        {label}
      </span>
      <motion.span
        animate={{ y: [0, 6, 0] }}
        transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
        className="grid size-7 place-items-center rounded-full bg-bg-2/60 ring-1 ring-line backdrop-blur-sm text-neon-cyan"
      >
        <ChevronDown className="size-3.5" />
      </motion.span>
    </motion.div>
  );
}
