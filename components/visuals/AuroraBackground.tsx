/**
 * Slowly-drifting multi-colour aurora blobs. Sits behind hero / cinematic
 * sections and adds atmospheric depth without distracting from content.
 *
 * INP: this used to render four framer-motion elements with
 * `repeat: Infinity`, i.e. four rAF-driven animation loops running on the main
 * thread for the entire life of every page that mounts a hero. Each blob is
 * now a CSS keyframe animation on `transform` only, which the compositor runs
 * off the main thread — the visual is unchanged but an idle page is genuinely
 * idle, which is what lets a tap be handled promptly.
 *
 * The per-blob waypoints travel via CSS custom properties (--ax0..--ay2) so all
 * four share one @keyframes rule (see .anim-aurora in globals.css).
 *
 * No hooks are used, so this is a Server Component — its markup ships as HTML
 * rather than as JavaScript to hydrate.
 */

interface Blob {
  color: string;
  size: number;
  /** Three waypoints; the animation returns to the first to loop seamlessly. */
  x: [string, string, string];
  y: [string, string, string];
  duration: number;
  opacity: number;
}

const BLOBS: Blob[] = [
  {
    color: "#00e5ff",
    size: 900,
    x: ["-10%", "30%", "0%"],
    y: ["-30%", "-10%", "10%"],
    duration: 28,
    opacity: 0.45,
  },
  {
    color: "#a855f7",
    size: 850,
    x: ["80%", "55%", "70%"],
    y: ["-10%", "20%", "0%"],
    duration: 32,
    opacity: 0.4,
  },
  {
    color: "#4d7cff",
    size: 700,
    x: ["20%", "0%", "30%"],
    y: ["50%", "70%", "40%"],
    duration: 36,
    opacity: 0.35,
  },
  {
    color: "#fbbf24",
    size: 500,
    x: ["60%", "80%", "70%"],
    y: ["60%", "40%", "60%"],
    duration: 40,
    opacity: 0.18,
  },
];

export function AuroraBackground({
  className = "",
  intensity = "default",
}: {
  className?: string;
  intensity?: "default" | "strong" | "soft";
}) {
  const opacityMul =
    intensity === "strong" ? 1.4 : intensity === "soft" ? 0.6 : 1;

  return (
    <div
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
      aria-hidden
    >
      {BLOBS.map((b, i) => (
        <span
          key={i}
          className="absolute rounded-full mix-blend-screen anim-aurora"
          style={
            {
              width: b.size,
              height: b.size,
              background: `radial-gradient(closest-side, ${b.color} 0%, transparent 70%)`,
              opacity: b.opacity * opacityMul,
              filter: "blur(20px)",
              "--aurora-duration": `${b.duration}s`,
              "--ax0": b.x[0],
              "--ax1": b.x[1],
              "--ax2": b.x[2],
              "--ay0": b.y[0],
              "--ay1": b.y[1],
              "--ay2": b.y[2],
            } as React.CSSProperties
          }
        />
      ))}
    </div>
  );
}
