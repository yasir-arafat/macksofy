import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/SectionTitle";
import { POSTS } from "@/content/blog";
import { TOPIC_HUBS } from "@/content/topicHubs";
import { getServiceBySlug } from "@/content/services";
import { pickGuidesForPage } from "@/lib/related";

/**
 * Newest buyer guides for a service/audit page, plus a link to the topic hub
 * that owns the page. Server Component — POSTS never reaches the client.
 * See pickGuidesForPage for why this exists.
 */
export function GuidesStrip({
  href,
  subject,
  exclude = [],
}: {
  href: string;
  /** Defaults to the service's short title when href is a /services/ page. */
  subject?: string;
  /** Slugs already shown elsewhere on the page. */
  exclude?: string[];
}) {
  const label =
    subject ??
    getServiceBySlug(href.replace(/^\/services\//, ""))?.shortTitle ??
    "this engagement";
  const { hub, posts } = pickGuidesForPage(
    href,
    POSTS.filter((p) => !exclude.includes(p.slug)),
    TOPIC_HUBS
  );
  if (posts.length === 0) return null;

  return (
    <section className="py-20 bg-bg-1">
      <Container>
        <Eyebrow color="cyan">Buyer guides</Eyebrow>
        <div className="mt-3 flex flex-wrap items-end justify-between gap-4">
          <h2 className="font-display text-2xl font-black sm:text-3xl text-balance">
            Before you commission {label}.
          </h2>
          {hub && (
            <Link
              href={`/blog/category/${hub.slug}`}
              className="inline-flex items-center gap-1 text-sm font-semibold text-neon-cyan hover:underline"
            >
              All {hub.name} guides <ArrowRight className="size-4" />
            </Link>
          )}
        </div>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {posts.map((p) => (
            <Link
              key={p.slug}
              href={`/blog/${p.slug}`}
              className="group rounded-2xl glass p-6 ring-1 ring-transparent hover:ring-neon-cyan/40 transition-all"
            >
              <span className="text-xs font-mono uppercase tracking-wider text-neon-cyan">
                {p.category}
              </span>
              <h3 className="mt-3 font-display text-base font-bold text-fg group-hover:text-neon-cyan line-clamp-3">
                {p.title}
              </h3>
              <p className="mt-2 text-sm text-fg-muted line-clamp-2">{p.description}</p>
              <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-neon-cyan">
                Read guide <ArrowRight className="size-4" />
              </span>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
