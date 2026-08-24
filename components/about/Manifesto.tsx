"use client";

import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import { Container } from "@/components/ui/Container";

/**
 * Bold typographic manifesto block — the brand thesis in one sweeping
 * sentence with key terms highlighted. Uses a stagger word-reveal as
 * the section enters the viewport.
 */

interface Token {
  type: "text" | "highlight" | "break";
  value?: string;
  tone?: "cyan" | "purple" | "amber";
}

const TOKENS: Token[] = [
  { type: "text", value: "We don't" },
  { type: "highlight", value: "lecture", tone: "cyan" },
  { type: "text", value: "from textbooks." },
  { type: "break" },
  { type: "text", value: "We" },
  { type: "highlight", value: "ship", tone: "amber" },
  { type: "text", value: "audits to RBI on Monday," },
  { type: "break" },
  { type: "text", value: "and" },
  { type: "highlight", value: "teach", tone: "purple" },
  { type: "text", value: "the same tradecraft on Tuesday." },
];

const TONE_CLASS: Record<NonNullable<Token["tone"]>, string> = {
  cyan: "text-neon-cyan",
  purple: "text-neon-purple",
  amber: "text-amber-300",
};

export function Manifesto() {
  let wordIndex = 0;
  return (
    <section className="relative py-28 sm:py-36 overflow-hidden">
      {/* Backdrop — soft aurora wash */}
      <div className="absolute inset-0 bg-grid opacity-30" />
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-neon-cyan/40 to-transparent"
      />
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-neon-purple/40 to-transparent"
      />
      <div
        aria-hidden
        className="absolute -top-40 left-1/2 -translate-x-1/2 size-[700px] rounded-full bg-neon-cyan/[0.07] blur-3xl"
      />
      <div
        aria-hidden
        className="absolute -bottom-40 right-1/4 size-[500px] rounded-full bg-neon-purple/[0.07] blur-3xl"
      />

      <Container className="relative">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-15%" }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 rounded-full bg-bg-2/60 ring-1 ring-line px-3 py-1 text-[10px] font-mono uppercase tracking-[0.22em] text-fg-muted"
        >
          <Quote className="size-3 text-neon-cyan" />
          The Macksofy thesis
        </motion.div>

        <h2 className="mt-8 font-display font-black tracking-tighter text-balance leading-[0.95] text-4xl sm:text-5xl lg:text-6xl xl:text-7xl">
          {TOKENS.map((tok, i) => {
            if (tok.type === "break") {
              return <br key={i} />;
            }
            const idx = wordIndex++;
            const cls =
              tok.type === "highlight"
                ? `${TONE_CLASS[tok.tone ?? "cyan"]} relative inline-block`
                : "text-fg/95 inline-block";
            return (
              <span
                key={i}
                className="inline-block overflow-hidden align-bottom mr-3 lg:mr-4"
              >
                <motion.span
                  initial={{ y: "100%", opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true, margin: "-15%" }}
                  transition={{
                    delay: idx * 0.06,
                    duration: 0.7,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className={cls}
                >
                  {tok.value}
                  {tok.type === "highlight" && (
                    <motion.span
                      aria-hidden
                      initial={{ scaleX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      viewport={{ once: true }}
                      transition={{
                        delay: idx * 0.06 + 0.4,
                        duration: 0.6,
                        ease: "easeOut",
                      }}
                      className="absolute inset-x-0 bottom-1 h-1 rounded-full origin-left bg-current opacity-30"
                    />
                  )}
                </motion.span>
              </span>
            );
          })}
        </h2>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 1.4, duration: 0.6 }}
          className="mt-10 max-w-2xl text-base sm:text-lg text-fg-muted text-pretty leading-relaxed border-l-2 border-neon-cyan/40 pl-5"
        >
          Eleven years in, every consultant on our team is an OSCP, OSWE or OSEP
          practitioner first, and a trainer second. We don&rsquo;t hire teachers
          — we work backwards from the cases we just shipped. That&rsquo;s the
          loop our alumni now run inside HSBC, PwC, Verizon, Tata,
          Reliance and 30+ RBI-regulated cooperative banks.
        </motion.div>
      </Container>
    </section>
  );
}
