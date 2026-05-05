"use client";

import { motion } from "framer-motion";

/**
 * Slowly-drifting multi-colour aurora blobs. Sits behind hero / cinematic
 * sections and adds atmospheric depth without distracting from content.
 */
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
      {[
        {
          color: "#00e5ff",
          size: 900,
          x: ["-10%", "30%", "0%", "-10%"],
          y: ["-30%", "-10%", "10%", "-30%"],
          duration: 28,
          opacity: 0.45 * opacityMul,
        },
        {
          color: "#a855f7",
          size: 850,
          x: ["80%", "55%", "70%", "80%"],
          y: ["-10%", "20%", "0%", "-10%"],
          duration: 32,
          opacity: 0.4 * opacityMul,
        },
        {
          color: "#4d7cff",
          size: 700,
          x: ["20%", "0%", "30%", "20%"],
          y: ["50%", "70%", "40%", "50%"],
          duration: 36,
          opacity: 0.35 * opacityMul,
        },
        {
          color: "#fbbf24",
          size: 500,
          x: ["60%", "80%", "70%", "60%"],
          y: ["60%", "40%", "60%", "60%"],
          duration: 40,
          opacity: 0.18 * opacityMul,
        },
      ].map((b, i) => (
        <motion.span
          key={i}
          animate={{ x: b.x, y: b.y }}
          transition={{
            duration: b.duration,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{
            width: b.size,
            height: b.size,
            background: `radial-gradient(closest-side, ${b.color} 0%, transparent 70%)`,
            opacity: b.opacity,
            filter: "blur(20px)",
          }}
          className="absolute rounded-full mix-blend-screen"
        />
      ))}
    </div>
  );
}
