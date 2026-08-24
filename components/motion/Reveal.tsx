"use client";

import { useEffect, useLayoutEffect, useRef, type ReactNode } from "react";
import { motion, useAnimationControls, useInView } from "framer-motion";

/**
 * useLayoutEffect on the client, useEffect on the server — React warns when
 * useLayoutEffect runs during SSR. Constant per environment, so hook order is
 * stable within a single renderer.
 */
export const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

const TAGS = {
  div: motion.div,
  span: motion.span,
  li: motion.li,
  p: motion.p,
  article: motion.article,
  section: motion.section,
  blockquote: motion.blockquote,
  figure: motion.figure,
} as const;

export type RevealTag = keyof typeof TAGS;

/**
 * Scroll reveal that is VISIBLE in server-rendered HTML.
 *
 * The usual `initial={{ opacity: 0 }}` + `whileInView` pattern ships the
 * element as `<div style="opacity:0">`, so its text is hidden to anything that
 * does not run JS, and the page renders blank if hydration fails. On /about
 * that accounted for ~13,000 characters — the entire company story, founder
 * spotlight, mission and capabilities.
 *
 * Instead: `initial={false}` so the server emits no opacity at all, then the
 * layout effect below hides the element ONLY if it is off-screen — instantly,
 * via `controls.set()`, before the first client paint, so the reset is never
 * visible. Elements already in the viewport keep their painted state and skip
 * the animation, because hiding something the visitor is looking at in order to
 * fade it back in is a hydration flicker. Same shape as
 * `components/motion/Counter.tsx`.
 */
export function Reveal({
  as = "div",
  y = 16,
  delay = 0,
  duration = 0.55,
  once = true,
  margin = "-80px",
  children,
  ...rest
}: {
  as?: RevealTag;
  y?: number;
  delay?: number;
  duration?: number;
  once?: boolean;
  margin?: string;
  children?: ReactNode;
} & Record<string, unknown>) {
  const Comp = TAGS[as] as typeof motion.div;
  const ref = useRef<HTMLDivElement>(null);
  const controls = useAnimationControls();
  const armed = useRef(false);
  const inView = useInView(ref, {
    once,
    margin: margin as `${number}px`,
  });

  useIsomorphicLayoutEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const rect = ref.current?.getBoundingClientRect();
    const onScreen = !!rect && rect.bottom > 0 && rect.top < window.innerHeight;
    if (onScreen) return;
    armed.current = true;
    controls.set({ opacity: 0, y });
  }, []);

  useEffect(() => {
    if (!armed.current || !inView) return;
    controls.start({
      opacity: 1,
      y: 0,
      transition: { duration, delay, ease: [0.22, 1, 0.36, 1] },
    });
  }, [inView, controls, duration, delay]);

  // `rest` is spread FIRST so a caller can never clobber `initial`/`animate` —
  // passing `animate` through would silently detach the controls and leave the
  // element permanently un-revealed.
  return (
    <Comp {...rest} ref={ref} initial={false} animate={controls}>
      {children}
    </Comp>
  );
}
