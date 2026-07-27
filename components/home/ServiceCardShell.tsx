"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

/**
 * The hover-lift shell for a service card.
 *
 * Exists purely so <ServicesOverview> can stay a Server Component: the only
 * thing on that card that needed the client was this one `whileHover`
 * animation, and keeping the whole section client-side dragged
 * content/services.ts (165 KB of full page content) into the homepage bundle
 * to render six titles. Children are server-rendered and passed through.
 *
 * `overflow-hidden` is load-bearing, not cosmetic: the card's corner-glow
 * decoration sits at `-right-12`, so without clipping it escaped 48px past the
 * card, and the last grid column pushed the homepage's scrollWidth past the
 * viewport (15–27px of horizontal scroll at every width below 1440px). Every
 * other card carrying this glow — ResourceGrid, CaseStudyGrid, ServiceShowcase
 * — already clips it; this shell was the outlier.
 *
 * The hover accent is a `ring`, not a `border`, and that is deliberate. This
 * card previously asked for `hover:border-neon-cyan/40`, which never fired:
 * `.glass` (globals.css) is unlayered CSS, so its `border` shorthand outranks
 * Tailwind's layered `border-*` utilities and the edge stayed a white hairline
 * on hover. Rings compile to `box-shadow`, which `.glass` doesn't touch — the
 * same reason the hover states on the three sibling card components work. The
 * ring is transparent at rest, so the card's resting appearance is unchanged.
 */
export function ServiceCardShell({ children }: { children: ReactNode }) {
  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 220, damping: 22 }}
      className="relative h-full overflow-hidden rounded-2xl glass p-6 ring-1 ring-transparent transition-shadow duration-300 hover:ring-neon-cyan/40"
    >
      {children}
    </motion.div>
  );
}
