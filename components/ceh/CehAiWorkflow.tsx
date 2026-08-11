import { AI_WORKFLOW, LEARNING_JOURNEY } from "@/content/cehV13";

/**
 * Two server-rendered flow visuals for the CEH v13 page.
 *
 * Both are plain markup plus CSS — no client component, no animation library,
 * no SVG sprite to download. The connectors are borders and a small inline
 * chevron, so there is nothing to hydrate and nothing that can shift layout
 * after paint (CLS). Motion is limited to a CSS transition on hover, which
 * `prefers-reduced-motion` disables via the global stylesheet.
 */

export function CehAiWorkflow() {
  return (
    <ol className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {AI_WORKFLOW.map((s, i) => (
        <li
          key={s.stage}
          className="relative rounded-xl border border-line bg-bg-1 p-5 transition-colors hover:border-neon-purple/40"
        >
          <div className="flex items-center gap-2.5">
            <span
              aria-hidden="true"
              className="grid size-7 shrink-0 place-items-center rounded-md bg-neon-purple/10 font-mono text-[11px] font-bold text-neon-purple"
            >
              {String(i + 1).padStart(2, "0")}
            </span>
            <h3 className="font-semibold text-fg">{s.stage}</h3>
          </div>
          <p className="mt-2.5 text-sm leading-relaxed text-fg-muted text-pretty">
            {s.body}
          </p>
        </li>
      ))}
    </ol>
  );
}

export function CehJourney() {
  return (
    <ol className="mt-10 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
      {LEARNING_JOURNEY.map((s, i) => (
        <li key={s.step} className="bg-bg-1 p-6">
          <div className="flex items-baseline gap-2.5">
            <span
              aria-hidden="true"
              className="font-mono text-xs font-bold text-neon-cyan"
            >
              {String(i + 1).padStart(2, "0")}
            </span>
            <h3 className="font-display text-lg font-bold text-fg">{s.step}</h3>
          </div>
          <p className="mt-2 text-sm leading-relaxed text-fg-muted text-pretty">
            {s.body}
          </p>
        </li>
      ))}
    </ol>
  );
}
