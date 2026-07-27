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
  // INP: this was a framer-motion `repeat: Infinity` animation, and SweepLine
  // is used several times per page (hero, ops panel, feature cards) — each
  // instance parked a rAF callback on the main thread for the life of the
  // page. As CSS keyframes on transform/opacity it runs on the compositor at
  // zero main-thread cost. `duration` was the travel time and `repeatDelay: 3`
  // the rest between passes; .anim-sweep folds both into one cycle.
  return (
    <span
      aria-hidden
      className="pointer-events-none absolute inset-y-0 w-[40%] anim-sweep"
      style={
        {
          background: `linear-gradient(90deg, transparent, ${color}33, transparent)`,
          "--sweep-duration": `${duration + 3}s`,
          "--sweep-delay": `${delay}s`,
        } as React.CSSProperties
      }
    />
  );
}

/**
 * Bouncing scroll-to-explore prompt that fades out as the page is scrolled.
 */
export function ScrollPrompt({ label = "Scroll to explore" }: { label?: string }) {
  // INP: previously useScroll() + useTransform() (a scroll subscription that
  // ran on every page, including mobile where this element is display:none)
  // plus a `repeat: Infinity` bob. Both are now CSS: the fade is a scroll-
  // driven animation and the bob is a keyframe, so the main thread does no
  // work for either. Decorative + aria-hidden, so browsers without
  // scroll-timeline support just keep it fully opaque.
  return (
    <div
      aria-hidden
      className="scroll-prompt pointer-events-none absolute bottom-6 left-1/2 -translate-x-1/2 hidden lg:flex flex-col items-center gap-2 z-10"
    >
      <span className="font-mono text-[10px] uppercase tracking-[0.32em] text-fg-faint">
        {label}
      </span>
      <span className="grid size-7 place-items-center rounded-full bg-bg-2/60 ring-1 ring-line backdrop-blur-sm text-neon-cyan anim-bob">
        <ChevronDown className="size-3.5" />
      </span>
    </div>
  );
}
