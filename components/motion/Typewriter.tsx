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

  return <span className={cn("caret", className)}>{text}</span>;
}
