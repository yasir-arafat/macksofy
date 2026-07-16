"use client";

import { useEffect, useState } from "react";
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

  useEffect(() => {
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
  }, [text, phase, phrases, index, typeSpeed, deleteSpeed, pauseMs]);

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

  return (
    <span className={cn("relative inline-block align-bottom", className)}>
      <span aria-hidden className="invisible select-none">
        {longest}
      </span>
      <span className="caret absolute inset-0">{text}</span>
    </span>
  );
}
