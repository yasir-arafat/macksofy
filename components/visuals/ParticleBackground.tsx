"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  c: string;
}

const COLORS = [
  "rgba(0, 229, 255, 0.55)",
  "rgba(77, 124, 255, 0.45)",
  "rgba(168, 85, 247, 0.50)",
  "rgba(255, 255, 255, 0.30)",
];

export function ParticleBackground({
  density = 90,
  className,
  link = true,
}: {
  density?: number;
  className?: string;
  link?: boolean;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let particles: Particle[] = [];
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    function resize() {
      if (!canvas) return;
      const { offsetWidth: w, offsetHeight: h } = canvas;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx?.scale(dpr, dpr);
      seed(w, h);
    }

    function seed(w: number, h: number) {
      const count = Math.min(density, Math.floor((w * h) / 14000));
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
        r: Math.random() * 1.6 + 0.4,
        c: COLORS[Math.floor(Math.random() * COLORS.length)],
      }));
    }

    function step() {
      if (!canvas || !ctx) return;
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      ctx.clearRect(0, 0, w, h);

      // Draw particles
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;
        ctx.beginPath();
        ctx.fillStyle = p.c;
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }

      // Draw links
      if (link) {
        const maxDist = 110;
        for (let i = 0; i < particles.length; i++) {
          for (let j = i + 1; j < particles.length; j++) {
            const a = particles[i];
            const b = particles[j];
            const dx = a.x - b.x;
            const dy = a.y - b.y;
            const d = Math.hypot(dx, dy);
            if (d < maxDist) {
              const alpha = 1 - d / maxDist;
              ctx.strokeStyle = `rgba(0, 229, 255, ${alpha * 0.18})`;
              ctx.lineWidth = 0.6;
              ctx.beginPath();
              ctx.moveTo(a.x, a.y);
              ctx.lineTo(b.x, b.y);
              ctx.stroke();
            }
          }
        }
      }

      rafRef.current = requestAnimationFrame(step);
    }

    resize();
    step();
    window.addEventListener("resize", resize);
    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
    };
  }, [density, link]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className={cn("pointer-events-none absolute inset-0 h-full w-full", className)}
    />
  );
}
