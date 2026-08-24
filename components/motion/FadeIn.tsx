"use client";

import { motion, type HTMLMotionProps } from "framer-motion";
import { ReactNode } from "react";
import { Reveal } from "./Reveal";

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

export function StaggerChildren({
  children,
  delayBetween = 0.07,
  className,
}: {
  children: ReactNode;
  delayBetween?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
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
