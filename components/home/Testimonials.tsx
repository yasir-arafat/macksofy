"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { TESTIMONIALS } from "@/content/testimonials";
import { ParticleBackground } from "@/components/visuals/ParticleBackground";

// Real, named quotes lead the carousel, so the first slide (the only one in
// the server HTML, and the one phone visitors see without tapping) is a
// quote someone agreed to put their name to. The array order still drives
// TrustStrip on service pages, which is unaffected.
const ORDERED = [
  ...TESTIMONIALS.filter((t) => t.name),
  ...TESTIMONIALS.filter((t) => !t.name),
];

export function Testimonials() {
  const [idx, setIdx] = useState(0);
  const t = ORDERED[idx];
  const next = () => setIdx((i) => (i + 1) % ORDERED.length);
  const prev = () => setIdx((i) => (i - 1 + ORDERED.length) % ORDERED.length);

  return (
    <section className="relative py-24 sm:py-32 overflow-hidden border-y border-line">
      <ParticleBackground density={60} link={false} />
      <Container className="relative">
        <SectionTitle
          eyebrow="Testimonials"
          eyebrowColor="purple"
          title={
            <>
              From CISOs, security managers,
              <br />
              <span className="gradient-text">and the alumni who&rsquo;ve built careers with us.</span>
            </>
          }
          align="center"
        />

        <div className="mt-14 grid gap-10 lg:grid-cols-12 items-start">
          <div className="lg:col-span-8">
            {/* initial={false} keeps the FIRST testimonial visible in server HTML;
                subsequent slides still animate. */}
            <AnimatePresence mode="wait" initial={false}>
              <motion.blockquote
                key={idx}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.4 }}
                className="rounded-3xl glass-strong p-8 sm:p-10 glow-blend"
              >
                <Quote className="size-10 text-neon-cyan/40" />
                <p className="mt-6 font-display text-xl leading-relaxed sm:text-2xl text-balance text-fg">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div className="mt-8 flex items-center gap-4">
                  <div className="grid size-12 place-items-center rounded-full bg-gradient-to-br from-neon-cyan to-neon-purple text-bg font-display font-bold">
                    {(t.name ?? t.company)
                      .split(/\s+/)
                      .slice(0, 2)
                      .map((w) => w[0])
                      .join("")
                      .toUpperCase()}
                  </div>
                  <div>
                    <div className="font-bold text-fg">{t.name ?? t.role}</div>
                    <div className="text-sm text-fg-muted">
                      {t.name ? `${t.role}, ${t.company}` : t.company}
                      {t.city && ` · ${t.city}`}
                    </div>
                  </div>
                  <div className="ml-auto flex gap-0.5">
                    {Array.from({ length: t.rating ?? 0 }).map((_, i) => (
                      <Star key={i} className="size-4 fill-neon-cyan text-neon-cyan" />
                    ))}
                  </div>
                </div>
              </motion.blockquote>
            </AnimatePresence>

            <div className="mt-6 flex items-center gap-3">
              <button
                onClick={prev}
                aria-label="Previous testimonial"
                className="grid size-10 place-items-center rounded-full glass ring-1 ring-transparent transition-[color,box-shadow] hover:ring-neon-cyan/40 hover:text-neon-cyan"
              >
                <ChevronLeft className="size-4" />
              </button>
              <button
                onClick={next}
                aria-label="Next testimonial"
                className="grid size-10 place-items-center rounded-full glass ring-1 ring-transparent transition-[color,box-shadow] hover:ring-neon-cyan/40 hover:text-neon-cyan"
              >
                <ChevronRight className="size-4" />
              </button>
              <span className="text-sm text-fg-faint font-mono">
                {String(idx + 1).padStart(2, "0")} / {String(ORDERED.length).padStart(2, "0")}
              </span>
            </div>
          </div>

          <div className="lg:col-span-4 space-y-3">
            {ORDERED.map((tt, i) => (
              <button
                key={i}
                onClick={() => setIdx(i)}
                className={`block w-full text-left rounded-xl p-4 transition-all ${
                  i === idx
                    ? "glass-strong border-neon-cyan/40 glow-cyan"
                    : "glass ring-1 ring-transparent transition-shadow hover:ring-line-strong"
                }`}
              >
                <div className="text-sm font-semibold text-fg">{tt.name ?? tt.role}</div>
                <div className="text-xs text-fg-muted line-clamp-1">
                  {tt.company}
                </div>
              </button>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
