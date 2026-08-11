import { CEH_MODULES } from "@/content/cehV13";

/**
 * CEH v13 curriculum — all 20 modules.
 *
 * Deliberately built on native <details>/<summary> rather than a React
 * accordion. Two reasons, in priority order:
 *
 *  1. CRAWLABILITY. The site's existing FAQAccordion is a client component
 *     that renders only the open item's body, which is why a 7-question FAQ
 *     ships 7 questions and 1 answer in the HTML. That is fine for FAQs
 *     backed by FAQPage JSON-LD, but the curriculum is the substantive
 *     content this page is expected to rank on — every module description
 *     must exist in the server-rendered HTML. <details> keeps all 20 module
 *     bodies in the DOM whether open or closed.
 *  2. ZERO JAVASCRIPT. No "use client", no hydration cost, no INP risk, and
 *     open/close works with keyboard and screen readers for free.
 *
 * The first module ships open so the pattern is obvious without interaction.
 */
export function CehCurriculum() {
  return (
    <div className="mt-10 divide-y divide-line overflow-hidden rounded-2xl border border-line bg-bg-1">
      {CEH_MODULES.map((m, i) => (
        <details
          key={m.n}
          open={i === 0}
          className="group [&_summary::-webkit-details-marker]:hidden"
        >
          <summary className="flex cursor-pointer list-none items-start gap-4 px-5 py-4 transition-colors hover:bg-white/[0.03] focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-neon-cyan sm:px-6">
            <span
              aria-hidden="true"
              className="mt-0.5 shrink-0 rounded-md bg-neon-cyan/10 px-2 py-1 font-mono text-xs font-bold text-neon-cyan"
            >
              {m.n}
            </span>
            <h3 className="flex-1 font-semibold leading-snug text-fg">
              {m.title}
            </h3>
            <span
              aria-hidden="true"
              className="mt-1 shrink-0 text-fg-faint transition-transform duration-200 group-open:rotate-45"
            >
              <svg viewBox="0 0 16 16" className="size-4" fill="none" stroke="currentColor" strokeWidth="1.75">
                <path d="M8 3v10M3 8h10" strokeLinecap="round" />
              </svg>
            </span>
          </summary>
          <div className="px-5 pb-5 pl-[4.25rem] text-sm leading-relaxed text-fg-muted sm:px-6 sm:pl-[4.75rem]">
            <p className="text-pretty">{m.covers}</p>
            <p className="mt-2.5 text-pretty">
              <span className="font-mono text-[11px] uppercase tracking-wider text-neon-cyan">
                You practise{" "}
              </span>
              {m.skills}
            </p>
          </div>
        </details>
      ))}
    </div>
  );
}
