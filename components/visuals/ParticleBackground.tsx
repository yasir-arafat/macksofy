"use client";

import { useEffect, useRef, useState } from "react";
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
  // Mount the canvas only after first paint so the particle init + RAF loop
  // doesn't sit on the critical render path (LCP / TBT in Lighthouse).
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    // INP: the render loop below is a permanent rAF with an O(n^2) link pass.
    // It is pure decoration behind a hero, so it must never compete with a
    // visitor's taps. Three gates, cheapest first:
    //
    //   1. prefers-reduced-motion — never animate.
    //   2. Small / coarse-pointer viewports — the field data that flagged INP
    //      is mobile, the canvas is barely visible at that size, and mid-range
    //      Android is exactly where a permanent rAF loop hurts most.
    //   3. Low-end devices — few cores or little memory, on any viewport.
    //
    // Everything else keeps the effect, mounted only once the browser is idle.
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;
    if (window.matchMedia?.("(max-width: 767px), (pointer: coarse)").matches) return;

    const nav = navigator as Navigator & { deviceMemory?: number };
    if ((nav.hardwareConcurrency ?? 8) <= 4) return;
    if ((nav.deviceMemory ?? 8) <= 4) return;

    type IdleHandle = number;
    type IdleCallback = (deadline: { didTimeout: boolean; timeRemaining: () => number }) => void;
    interface IdleWindow {
      requestIdleCallback?: (cb: IdleCallback, opts?: { timeout: number }) => IdleHandle;
      cancelIdleCallback?: (h: IdleHandle) => void;
    }
    const w = window as Window & IdleWindow;
    const ric = w.requestIdleCallback;
    const cic = w.cancelIdleCallback;
    let timeout: ReturnType<typeof setTimeout> | null = null;
    let idleHandle: IdleHandle | null = null;
    if (ric) {
      idleHandle = ric(() => setReady(true), { timeout: 800 });
    } else {
      timeout = setTimeout(() => setReady(true), 250);
    }
    return () => {
      if (timeout) clearTimeout(timeout);
      if (idleHandle != null && cic) cic(idleHandle);
    };
  }, []);

  useEffect(() => {
    if (!ready) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let particles: Particle[] = [];
    let paused = false;
    let pauseTimer: ReturnType<typeof setTimeout> | null = null;
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);

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
      if (paused) {
        // Re-arm cheaply rather than every frame: while paused there is
        // nothing to draw, and a 250 ms poll is imperceptible on resume.
        rafRef.current = 0;
        pauseTimer = setTimeout(() => {
          rafRef.current = requestAnimationFrame(step);
        }, 250);
        return;
      }
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

    // Pause whenever the canvas can't be seen: hidden tab OR scrolled out of
    // view. A hero canvas is off screen for most of a page visit, so this
    // alone removes the majority of the loop's lifetime cost.
    let offScreen = false;
    const syncPaused = () => {
      paused = document.hidden || offScreen;
    };
    const onVisibility = syncPaused;
    const io = new IntersectionObserver(
      ([entry]) => {
        offScreen = !entry.isIntersecting;
        syncPaused();
      },
      { threshold: 0 }
    );
    io.observe(canvas);

    resize();
    step();
    window.addEventListener("resize", resize);
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      cancelAnimationFrame(rafRef.current);
      if (pauseTimer) clearTimeout(pauseTimer);
      io.disconnect();
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [ready, density, link]);

  if (!ready) return null;
  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className={cn("pointer-events-none absolute inset-0 h-full w-full", className)}
    />
  );
}
