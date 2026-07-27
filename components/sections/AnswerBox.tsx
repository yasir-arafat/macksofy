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
 * Layout: this is a flush callout, not a card. The text sits directly on the
 * page's left rail so it lines up with the H1, hero copy and CTAs above it —
 * a padded card pushed the copy ~25px off that rail on every page. The cyan
 * accent rule is absolutely positioned into the container gutter so it reads
 * as an accent without taking the text off the rail. (It also replaces a
 * `border-l-2 border-neon-cyan/60` that never actually rendered: `.glass` in
 * globals.css is unlayered CSS, so its `border` shorthand beat Tailwind's
 * layered utilities and the accent silently resolved to a 1px white hairline.)
 */
export function AnswerBox({
  q,
  a,
  className,
}: {
  q: string;
  a: string;
  className?: string;
}) {
  return (
    <div className={cn("relative max-w-3xl", className)}>
      {/* Gutter accent rule. Only from `lg` up, where the container gutter is
          32px — narrower breakpoints don't have room to hold it clear of the
          viewport edge, and the callout reads fine flush without it. */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-y-1 hidden w-0.5 rounded-full bg-neon-cyan/60 lg:-left-5 lg:block"
      />
      <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-neon-cyan font-bold">
        In short
      </div>
      <h2 className="mt-3 font-display text-lg sm:text-xl font-bold text-fg leading-snug text-balance">
        {q}
      </h2>
      <p
        data-speakable="answer"
        className="mt-3 text-fg-muted leading-relaxed text-pretty"
      >
        {a}
      </p>
    </div>
  );
}
