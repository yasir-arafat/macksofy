"use client";

import { useEffect, useRef } from "react";

/**
 * Soft radial light that follows the mouse. Adds cinematic depth on hero
 * sections. Disabled on touch devices via @media (hover: hover).
 */
export function SpotlightCursor({
  color = "rgba(0, 229, 255, 0.18)",
  size = 520,
}: {
  color?: string;
  size?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    let tx = 0;
    let ty = 0;
    let cx = window.innerWidth / 2;
    let cy = window.innerHeight / 2;

    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      tx = e.clientX - rect.left;
      ty = e.clientY - rect.top;
      if (!raf) tick();
    };

    const tick = () => {
      cx += (tx - cx) * 0.15;
      cy += (ty - cy) * 0.15;
      el.style.setProperty("--mx", `${cx}px`);
      el.style.setProperty("--my", `${cy}px`);
      if (Math.abs(tx - cx) > 0.5 || Math.abs(ty - cy) > 0.5) {
        raf = requestAnimationFrame(tick);
      } else {
        raf = 0;
      }
    };

    window.addEventListener("mousemove", onMove);
    return () => {
      window.removeEventListener("mousemove", onMove);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none absolute inset-0 hidden md:block"
      style={{
        background: `radial-gradient(${size}px circle at var(--mx, 50%) var(--my, 50%), ${color}, transparent 70%)`,
      }}
    />
  );
}
