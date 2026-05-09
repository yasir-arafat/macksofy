"use client";

import { motion } from "framer-motion";

const ASSETS = [
  { x: 32, y: 28, label: "ext.api", critical: true },
  { x: 70, y: 22, label: "auth-svc" },
  { x: 78, y: 58, label: "pay-gw", critical: true },
  { x: 24, y: 64, label: "admin", critical: false },
  { x: 50, y: 50, label: "core" },
  { x: 60, y: 78, label: "s3-bucket" },
  { x: 18, y: 44, label: "cdn" },
  { x: 86, y: 38, label: "iam" },
];

export function RadarPulse() {
  return (
    <div className="relative aspect-square w-full max-w-md mx-auto">
      {/* outer glow */}
      <div
        aria-hidden
        className="absolute inset-0 rounded-full"
        style={{
          background:
            "radial-gradient(circle at center, rgba(0,229,255,0.18) 0%, transparent 65%)",
          filter: "blur(20px)",
        }}
      />

      {/* radar disc */}
      <div className="relative aspect-square rounded-full ring-1 ring-neon-cyan/30 bg-bg/40 backdrop-blur-sm overflow-hidden">
        {/* concentric rings */}
        {[25, 50, 75].map((r) => (
          <div
            key={r}
            aria-hidden
            className="absolute rounded-full ring-1 ring-neon-cyan/15"
            style={{
              top: `${50 - r / 2}%`,
              left: `${50 - r / 2}%`,
              width: `${r}%`,
              height: `${r}%`,
            }}
          />
        ))}
        {/* crosshair */}
        <div aria-hidden className="absolute top-1/2 left-0 right-0 h-px bg-neon-cyan/15" />
        <div aria-hidden className="absolute left-1/2 top-0 bottom-0 w-px bg-neon-cyan/15" />

        {/* sweep arm */}
        <motion.div
          aria-hidden
          className="absolute inset-0 origin-center"
          animate={{ rotate: 360 }}
          transition={{ duration: 4, ease: "linear", repeat: Infinity }}
          style={{
            background:
              "conic-gradient(from 0deg at 50% 50%, rgba(0,229,255,0.45) 0deg, rgba(0,229,255,0.0) 70deg, transparent 360deg)",
          }}
        />

        {/* central pulse */}
        <motion.div
          aria-hidden
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-3 rounded-full bg-neon-cyan"
          animate={{ scale: [1, 1.6, 1], opacity: [0.9, 0.3, 0.9] }}
          transition={{ duration: 1.6, repeat: Infinity }}
        />

        {/* asset dots */}
        {ASSETS.map((a, i) => (
          <motion.div
            key={a.label}
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 + i * 0.08, duration: 0.4 }}
            className={`absolute -translate-x-1/2 -translate-y-1/2 ${
              a.critical ? "text-red-400" : "text-emerald-300"
            }`}
            style={{ top: `${a.y}%`, left: `${a.x}%` }}
          >
            <motion.span
              className={`block size-2 rounded-full ${
                a.critical ? "bg-red-400" : "bg-emerald-300"
              }`}
              animate={a.critical ? { boxShadow: ["0 0 0 0 rgba(248,113,113,0.6)", "0 0 0 8px rgba(248,113,113,0)"] } : undefined}
              transition={a.critical ? { duration: 1.4, repeat: Infinity } : undefined}
            />
            <span className="absolute left-3 -top-1 whitespace-nowrap font-mono text-[9px] uppercase tracking-wider text-fg-faint">
              {a.label}
            </span>
          </motion.div>
        ))}
      </div>

      {/* readout */}
      <div className="mt-4 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.2em] text-fg-faint">
        <span className="inline-flex items-center gap-2">
          <span className="size-1.5 rounded-full bg-emerald-400 animate-pulse" />
          live scan
        </span>
        <span className="text-neon-cyan">{ASSETS.length} assets · 2 critical</span>
      </div>
    </div>
  );
}
