import Link from "next/link";
import { MapPin, ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/SectionTitle";
import { CITIES } from "@/content/cities";
import { COMBO_PAIRS } from "@/content/combos";

/**
 * "Where we deliver [subject]" — service / audit / training cross-link
 * footer strip. Surfaces the top metro city pages so each leaf page
 * gains 6-8 outbound internal links pointing at the location pillar
 * pages — fixes a real cross-linking gap surfaced by the SEO audit
 * (service pages previously only linked to other services in the
 * same category).
 *
 * Pass `serviceSlug` to render combo-route links (/locations/{city}/
 * {serviceSlug}) where one exists; otherwise renders the bare city
 * page link. Component is server-only — keeps every link in the
 * crawl graph as static HTML.
 */
export function WhereWeDeliver({
  subject,
  subjectShort,
  serviceSlug,
  comboCities,
  limit = 8,
}: {
  /** e.g. "penetration testing" — used in the section heading. */
  subject: string;
  /** Short variant for chip labels — e.g. "Pentest". */
  subjectShort?: string;
  /** If set, attempts /locations/{city}/{serviceSlug} combo links. */
  serviceSlug?: string;
  /** Whitelist of city slugs that have a real combo page for this service. */
  comboCities?: string[];
  /** How many cities to surface (default 8). */
  limit?: number;
}) {
  const label = subjectShort ?? subject;
  // Auto-derive combo cities from COMBO_PAIRS when caller doesn't pass
  // an explicit list — cleaner ergonomics, no per-callsite maintenance.
  const derivedCombo = serviceSlug
    ? COMBO_PAIRS.filter((p) => p.service === serviceSlug).map((p) => p.city)
    : [];
  const comboSet = new Set(comboCities ?? derivedCombo);
  const cities = CITIES.filter((c) => c.slug !== "uae").slice(0, limit);

  return (
    <section className="py-20 bg-bg-1">
      <Container>
        <Eyebrow color="cyan">
          <MapPin className="inline-block size-3 -mt-0.5 mr-1" />
          Delivery footprint
        </Eyebrow>
        <h2 className="mt-3 font-display text-3xl font-black sm:text-4xl text-balance leading-[1.05]">
          Where Macksofy delivers <span className="gradient-text">{subject}</span>.
        </h2>
        <p className="mt-4 max-w-2xl text-fg-muted text-pretty">
          On-site engagements across India&apos;s BFSI, fintech, government and
          SaaS metros plus the UAE. Senior consultants fly from Mumbai BKC for
          kickoff, key reviews and exit briefings; remote weeks run through the
          rest of the engagement.
        </p>

        <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {cities.map((c) => {
            const useCombo = serviceSlug && comboSet.has(c.slug);
            const href = useCombo
              ? `/locations/${c.slug}/${serviceSlug}`
              : `/locations/${c.slug}`;
            return (
              <Link
                key={c.slug}
                href={href}
                className="group flex items-center justify-between gap-2 rounded-xl glass px-4 py-3 ring-1 ring-transparent hover:ring-neon-cyan/40 transition-[color,background-color,border-color,box-shadow]"
              >
                <span className="flex items-center gap-3 text-sm">
                  <MapPin className="size-4 text-neon-cyan/70" />
                  <span className="font-semibold text-fg group-hover:text-neon-cyan">
                    {label} · {c.name}
                  </span>
                </span>
                <ArrowRight className="size-4 text-fg-muted group-hover:text-neon-cyan group-hover:translate-x-0.5 transition" />
              </Link>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
