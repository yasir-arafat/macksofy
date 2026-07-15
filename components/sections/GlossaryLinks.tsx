import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { glossaryTermsFor } from "@/content/glossary";

/**
 * Reciprocal glossary link strip — the money-page → /glossary#<term> spoke of
 * the hub-and-spoke (master audit §11). Renders a compact "Key terms" row of
 * pills for the glossary terms most relevant to `href`, each linking to its
 * anchored definition. Renders nothing when no terms map, so it is safe to drop
 * into any template unconditionally.
 */
export function GlossaryLinks({
  href,
  heading = "Key terms",
}: {
  href: string;
  heading?: string;
}) {
  const terms = glossaryTermsFor(href);
  if (terms.length === 0) return null;
  return (
    <section className="pb-10">
      <Container>
        <div className="flex flex-wrap items-center gap-x-3 gap-y-2 rounded-2xl border border-line/60 bg-bg-2/30 px-5 py-4">
          <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-fg-faint">
            {heading}
          </span>
          {terms.map((t) => (
            <Link
              key={t.slug}
              href={`/glossary#${t.slug}`}
              className="rounded-full border border-line bg-bg-1/60 px-3 py-1 text-xs font-semibold text-fg-muted hover:border-neon-cyan/40 hover:text-neon-cyan transition-colors"
            >
              {t.term}
            </Link>
          ))}
          <Link
            href="/glossary"
            className="ml-auto text-xs font-semibold text-neon-cyan hover:underline"
          >
            Full glossary →
          </Link>
        </div>
      </Container>
    </section>
  );
}
