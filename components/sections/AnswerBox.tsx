"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Eyebrow } from "@/components/ui/SectionTitle";
import { cn } from "@/lib/utils";

/**
 * AnswerBox — a definition-first "short answer" block rendered directly
 * under a page H1.
 *
 * Why it exists: AI Overviews, Perplexity/ChatGPT, featured snippets and
 * voice assistants extract the cleanest 40–60-word direct answer they can
 * find. Marketing hero copy is not that. This box gives every money page a
 * question-phrased H2 + a plain-language definition that those engines can
 * lift verbatim and attribute to Macksofy (AEO/GEO). Content is sourced from
 * `content/shortAnswers.ts` and rendered only where an entry exists, so the
 * rollout is progressive and never ships an empty box.
 *
 * The `q` renders as an <h2> (the page's first section heading, which is the
 * question-based heading the audit called for) and `a` as a single concise
 * paragraph. Keep `a` to 40–60 words, lead with the definition, and avoid
 * marketing adjectives.
 *
 * Layout: a flush section block, not a card and not a rule-and-inset callout.
 * Every line — eyebrow, question, answer — starts on the page's left rail, so
 * it lines up with the H1, hero copy and CTAs above it. Nothing is rendered to
 * the left of the text: an accent rail in the gutter became the leftmost thing
 * on the block, which made the copy read as indented even though it wasn't.
 * The cyan accent now comes from the shared <Eyebrow>, same as every other
 * section on the site.
 *
 * Client Component purely for the entrance animation. Only strings cross the
 * boundary — `content/*` stays server-side, which is the rule that keeps this
 * off the INP budget on ~167 pages.
 *
 * `tone` exists because /resources/* renders inside <PrintLayout>, which is a
 * hard-coded light document (`bg-white text-slate-900`) rather than the site's
 * dark theme. The default `screen` tone paints with --color-fg (#f6f7fb,
 * near-white), so dropping this component onto that white page unchanged would
 * put white text on white — an answer the extractors can read and humans
 * cannot, which is the inverse of the 9a8881f defect and just as dishonest.
 * The `print` tone swaps to PrintLayout's own slate scale and red accent.
 */

const EASE = [0.22, 1, 0.36, 1] as const;

const TONES = {
  screen: {
    eyebrow: undefined,
    q: "text-fg",
    a: "text-fg-muted",
  },
  print: {
    // Matches PrintLayout's cover-page accent (text-red-600) and body scale.
    // tailwind-merge drops Eyebrow's default text-neon-cyan in favour of this.
    eyebrow: "text-red-600",
    q: "text-slate-900",
    a: "text-slate-700",
  },
} as const;

export function AnswerBox({
  q,
  a,
  className,
  tone = "screen",
}: {
  q: string;
  a: string;
  className?: string;
  tone?: keyof typeof TONES;
}) {
  const reduce = useReducedMotion();
  const t = TONES[tone];

  /**
   * `initial={false}` is deliberate and matches the Hero's convention: this
   * block sits above the fold on most templates, so the copy must be present
   * and visible in the SSR HTML — for crawlers, for no-JS, and so it can serve
   * as the LCP element without waiting on hydration. The reveal is played from
   * the keyframe arrays once React takes over, rather than by hiding the
   * element up front.
   */
  const reveal = (delay: number) =>
    reduce
      ? {}
      : {
          initial: false as const,
          whileInView: { opacity: [0, 1], y: [12, 0] },
          viewport: { once: true, margin: "-80px" },
          transition: { duration: 0.5, delay, ease: EASE },
        };

  return (
    <div className={cn("max-w-3xl", className)}>
      <motion.div {...reveal(0)}>
        <Eyebrow className={t.eyebrow}>In short</Eyebrow>
      </motion.div>
      <motion.h2
        {...reveal(0.07)}
        className={cn(
          "mt-3 font-display text-lg sm:text-xl font-bold leading-snug text-balance",
          t.q
        )}
      >
        {q}
      </motion.h2>
      <motion.p
        {...reveal(0.14)}
        data-speakable="answer"
        className={cn("mt-3 leading-relaxed text-pretty", t.a)}
      >
        {a}
      </motion.p>
    </div>
  );
}
