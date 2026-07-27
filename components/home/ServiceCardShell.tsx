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
 */
export function ServiceCardShell({ children }: { children: ReactNode }) {
  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 220, damping: 22 }}
      className="relative h-full rounded-2xl glass p-6 hover:border-neon-cyan/40 transition-colors"
    >
      {children}
    </motion.div>
  );
}
