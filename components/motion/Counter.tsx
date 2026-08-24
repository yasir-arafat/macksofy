"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

/**
 * useLayoutEffect on the client, useEffect on the server — React warns when
 * useLayoutEffect runs during SSR. The branch is constant per environment, so
 * hook order never changes within a single renderer.
 */
const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

export function Counter({
  value,
  suffix = "",
  prefix = "",
  duration = 1800,
  className,
}: {
  value: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  /**
   * The server HTML must carry the REAL number.
   *
   * This was seeded at 0, so every crawler and every no-JS visitor read
   * "0 + Years in business", "0 + Enterprise clients" on /about and the
   * homepage — the count-up only ever ran after hydration. Same failure class
   * as the Curriculum accordion: a client component whose INITIAL STATE is not
   * the content.
   *
   * The count-up is now a progressive enhancement layered on top: state starts
   * at the real value, and is armed back to 0 in the layout effect below —
   * which runs BEFORE the first client paint, so the reset is never visible
   * and on-screen behaviour is unchanged.
   */
  const [count, setCount] = useState(value);
  const armed = useRef(false);
  const done = useRef(false);

  useIsomorphicLayoutEffect(() => {
    if (armed.current || done.current) return;
    // Respect reduced-motion by simply not animating — the real number is
    // already rendered, so there is nothing to reveal.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      done.current = true;
      return;
    }
    // Only reset to 0 if this counter is OFF-SCREEN right now. If it is already
    // in the viewport, the visitor is looking at the real number the server
    // sent, and dropping it to 0 to count back up would be a visible flicker on
    // hydration. Off-screen counters can be armed unseen and animate normally
    // when scrolled to.
    const rect = ref.current?.getBoundingClientRect();
    const onScreen =
      !!rect && rect.bottom > 0 && rect.top < window.innerHeight;
    if (onScreen) {
      done.current = true;
      return;
    }
    armed.current = true;
    setCount(0);
  }, []);

  useEffect(() => {
    if (!inView || done.current || !armed.current) return;
    done.current = true;
    const startTime = performance.now();
    const animate = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(value * eased));
      if (progress < 1) requestAnimationFrame(animate);
      else setCount(value);
    };
    requestAnimationFrame(animate);
  }, [inView, value, duration]);

  return (
    <motion.span
      ref={ref}
      /**
       * `initial={false}` keeps the span VISIBLE in the server HTML. It used to
       * ship as `<span style="opacity:0">`, so the number was not just wrong —
       * it was hidden too. Same fix already applied to the homepage hero's
       * RevealWord.
       */
      initial={false}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className={className}
    >
      {prefix}
      {count.toLocaleString("en-IN")}
      {suffix}
    </motion.span>
  );
}
