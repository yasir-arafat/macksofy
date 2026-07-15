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
    <div
      className={cn(
        "relative rounded-2xl glass border-l-2 border-neon-cyan/60 p-5 sm:p-6",
        className
      )}
    >
      <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.22em] text-neon-cyan font-bold">
        In short
      </div>
      <h2 className="mt-3 font-display text-lg sm:text-xl font-bold text-fg leading-snug">
        {q}
      </h2>
      <p
        data-speakable="answer"
        className="mt-3 max-w-2xl text-fg-muted leading-relaxed text-pretty"
      >
        {a}
      </p>
    </div>
  );
}
