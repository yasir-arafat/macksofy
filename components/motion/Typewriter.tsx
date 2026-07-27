"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface Props {
  /** Phrases that cycle through the typewriter (each is typed, paused, then deleted). */
  phrases: string[];
  typeSpeed?: number;
  deleteSpeed?: number;
  pauseMs?: number;
  className?: string;
}

export function Typewriter({
  phrases,
  typeSpeed = 70,
  deleteSpeed = 40,
  pauseMs = 1700,
  className,
}: Props) {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState("");
  const [phase, setPhase] = useState<"typing" | "pause" | "deleting">("typing");
  const hostRef = useRef<HTMLSpanElement>(null);

  /**
   * INP: the typing loop schedules a React state update every 40–70 ms, i.e.
   * ~15–25 renders per second for as long as the component is mounted. On the
   * homepage that ran forever, so the main thread never got a quiet moment —
   * and a tap that lands while the main thread is busy pays that wait as INP
   * input delay.
   *
   * `active` gates the loop on two things:
   *   • the hero still being on screen (IntersectionObserver) — once the
   *     visitor scrolls past the hero the animation stops entirely;
   *   • the tab being visible — background tabs stop churning.
   *
   * Visitors who ask for reduced motion get the first phrase as static text
   * and no loop at all.
   */
  const [active, setActive] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduceMotion(mql.matches);
    sync();
    mql.addEventListener("change", sync);
    return () => mql.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    const el = hostRef.current;
    if (!el) return;

    let onScreen = false;
    const update = () => setActive(onScreen && !document.hidden);

    const io = new IntersectionObserver(
      ([entry]) => {
        onScreen = entry.isIntersecting;
        update();
      },
      { threshold: 0 }
    );
    io.observe(el);
    document.addEventListener("visibilitychange", update);

    return () => {
      io.disconnect();
      document.removeEventListener("visibilitychange", update);
    };
  }, []);

  useEffect(() => {
    if (!active || reduceMotion) return;

    const phrase = phrases[index % phrases.length];

    if (phase === "typing") {
      if (text.length < phrase.length) {
        const t = setTimeout(() => setText(phrase.slice(0, text.length + 1)), typeSpeed);
        return () => clearTimeout(t);
      }
      const t = setTimeout(() => setPhase("pause"), 30);
      return () => clearTimeout(t);
    }

    if (phase === "pause") {
      const t = setTimeout(() => setPhase("deleting"), pauseMs);
      return () => clearTimeout(t);
    }

    if (phase === "deleting") {
      if (text.length > 0) {
        const t = setTimeout(() => setText(text.slice(0, -1)), deleteSpeed);
        return () => clearTimeout(t);
      }
      // Defer the index/phase reset off the effect via setTimeout(0)
      const t = setTimeout(() => {
        setIndex((i) => i + 1);
        setPhase("typing");
      }, 0);
      return () => clearTimeout(t);
    }
  }, [
    active,
    reduceMotion,
    text,
    phase,
    phrases,
    index,
    typeSpeed,
    deleteSpeed,
    pauseMs,
  ]);

  // Reserve the box of the longest phrase with an invisible sizer and overlay
  // the animated text on top. Without this, the typed text changes length every
  // few frames, the surrounding line wraps to a different number of lines, and
  // the whole hero below the subheading jumps up/down — a continuous layout
  // shift that dominated the page's CLS (0.11 on mobile). The sizer fixes the
  // reserved height to the tallest state, so the animation no longer reflows.
  const longest = phrases.reduce(
    (a, b) => (b.length >= a.length ? b : a),
    ""
  );

  // Reduced motion: show a stable phrase rather than an empty box.
  const shown = reduceMotion ? phrases[0] ?? "" : text;

  return (
    <span
      ref={hostRef}
      className={cn("relative inline-block align-bottom", className)}
    >
      <span aria-hidden className="invisible select-none">
        {longest}
      </span>
      <span className={cn("absolute inset-0", !reduceMotion && "caret")}>
        {shown}
      </span>
    </span>
  );
}
