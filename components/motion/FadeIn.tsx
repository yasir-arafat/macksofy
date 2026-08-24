"use client";

import {
  motion,
  useAnimationControls,
  useInView,
  type HTMLMotionProps,
} from "framer-motion";
import { ReactNode, useEffect, useRef } from "react";
import { Reveal, useIsomorphicLayoutEffect } from "./Reveal";

interface FadeInProps extends Omit<HTMLMotionProps<"div">, "children"> {
  children: ReactNode;
  delay?: number;
  y?: number;
  once?: boolean;
}

/**
 * Thin wrapper over {@link Reveal}.
 *
 * This used to be `initial={reduce ? false : { opacity: 0, y }}` — and
 * `useReducedMotion()` resolves to `false` during SSR, so the "reduce" escape
 * hatch never applied on the server and EVERY FadeIn shipped as
 * `<div style="opacity:0">`. Reveal renders visible on the server and arms the
 * animation client-side only when the element is off-screen.
 */
export function FadeIn({
  children,
  delay = 0,
  y = 16,
  once = true,
  ...rest
}: FadeInProps) {
  return (
    <Reveal as="div" y={y} delay={delay} once={once} {...rest}>
      {children}
    </Reveal>
  );
}

/**
 * Same SSR problem as FadeIn, one level up: this used `initial="hidden"`, so
 * every StaggerItem below it server-rendered as
 * `<div style="opacity:0;transform:translateY(20px)">`. That accounted for all
 * 49 hidden elements on /clients and the service + training cards on the
 * homepage, and it reaches 9 files in total.
 *
 * The parent now owns the arming, exactly as {@link Reveal} does for a single
 * element: `initial={false}` so the server emits nothing, then the variant is
 * snapped to "hidden" before the first client paint — and only when the group
 * is off-screen. Children keep their variants untouched, so the stagger still
 * runs.
 */
export function StaggerChildren({
  children,
  delayBetween = 0.07,
  className,
}: {
  children: ReactNode;
  delayBetween?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const controls = useAnimationControls();
  const armed = useRef(false);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  useIsomorphicLayoutEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const rect = ref.current?.getBoundingClientRect();
    const onScreen =
      !!rect && rect.bottom > 0 && rect.top < window.innerHeight;
    if (onScreen) return;
    armed.current = true;
    controls.set("hidden");
  }, []);

  useEffect(() => {
    if (!armed.current || !inView) return;
    controls.start("visible");
  }, [inView, controls]);

  return (
    <motion.div
      ref={ref}
      initial={false}
      animate={controls}
      variants={{
        visible: { transition: { staggerChildren: delayBetween } },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
