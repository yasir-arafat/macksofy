import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Award, ExternalLink, GraduationCap } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/SectionTitle";
import { Badge } from "@/components/ui/Badge";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { ParticleBackground } from "@/components/visuals/ParticleBackground";
import { GlowOrb } from "@/components/visuals/GlowOrb";
import { LeadCapture } from "@/components/home/LeadCapture";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema } from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";
import { getPersonAuthors, getPersonBySlug, authorSchema } from "@/content/authors";
import { POSTS } from "@/content/blog";

interface PageProps {
  params: Promise<{ slug: string }>;
}

// Dormant until real Person authors exist: with zero person entries this
// returns [], so no /team/[slug] pages are built and (dynamicParams=false)
// every /team/* URL 404s. Add a Person to content/authors.ts and its page
// appears automatically.
export function generateStaticParams() {
  return getPersonAuthors().map((p) => ({ slug: p.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const p = getPersonBySlug(slug);
  if (!p) return {};
  const creds = p.credentials?.length ? `, ${p.credentials.join(", ")}` : "";
  return buildMetadata({
    title: `${p.name}${creds} — ${p.jobTitle ?? p.role} | Macksofy`,
    description:
      p.bio ??
      `${p.name} is ${p.jobTitle ?? p.role} at Macksofy Technologies, a CERT-In empanelled cybersecurity company.`,
    path: `/team/${p.slug}`,
    ogKind: "macksofy",
    ogTitle: p.name,
    ogEyebrow: p.jobTitle ?? p.role,
  });
}

export default async function TeamMemberPage({ params }: PageProps) {
  const { slug } = await params;
  const p = getPersonBySlug(slug);
  if (!p) notFound();

  const posts = POSTS.filter((post) => post.author === p.key);

  return (
    <>
      <JsonLd
        data={[
          { "@context": "https://schema.org", ...authorSchema(p) },
          breadcrumbSchema([
            { name: "Team", url: "/team" },
            { name: p.name, url: `/team/${p.slug}` },
          ]),
        ]}
      />

      <section className="relative isolate overflow-hidden">
        <ParticleBackground density={40} />
        <GlowOrb className="-top-40 left-1/3" color="cyan" size={480} />
        <Container className="relative pt-10 pb-14">
          <Breadcrumbs
            items={[
              { name: "Team", href: "/team" },
              { name: p.name, href: `/team/${p.slug}` },
            ]}
          />
          <div className="mt-10 grid gap-8 lg:grid-cols-12 items-start">
            {p.image && (
              <div className="lg:col-span-3">
                <Image
                  src={p.image}
                  alt={`${p.name}, ${p.jobTitle ?? p.role} at Macksofy`}
                  width={320}
                  height={320}
                  className="w-full max-w-[220px] rounded-2xl ring-1 ring-line"
                />
              </div>
            )}
            <div className={p.image ? "lg:col-span-9" : "lg:col-span-12"}>
              <Eyebrow>Macksofy Team</Eyebrow>
              <h1 className="mt-3 font-display text-4xl font-black sm:text-5xl text-balance leading-[1.05]">
                {p.name}
              </h1>
              <p className="mt-3 text-lg text-neon-cyan font-semibold">
                {p.jobTitle ?? p.role}
              </p>
              {p.credentials && p.credentials.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-2">
                  {p.credentials.map((c) => (
                    <Badge key={c} variant="cyan">
                      {c}
                    </Badge>
                  ))}
                </div>
              )}
              {p.bio && (
                <p className="mt-6 max-w-2xl text-fg-muted leading-relaxed text-pretty">
                  {p.bio}
                </p>
              )}
              <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm">
                {typeof p.yearsExperience === "number" && (
                  <span className="inline-flex items-center gap-2 text-fg-muted">
                    <Award className="size-4 text-neon-cyan" />
                    {p.yearsExperience}+ years in cybersecurity
                  </span>
                )}
                {p.alumniOf && (
                  <span className="inline-flex items-center gap-2 text-fg-muted">
                    <GraduationCap className="size-4 text-neon-cyan" />
                    {p.alumniOf}
                  </span>
                )}
                {p.sameAs?.map((url) => (
                  <a
                    key={url}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 font-semibold text-fg-muted hover:text-neon-cyan transition-colors"
                  >
                    <ExternalLink className="size-3.5" />
                    {url.includes("linkedin") ? "LinkedIn" : url.includes("github") ? "GitHub" : url.includes("x.com") || url.includes("twitter") ? "X" : "Profile"}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>

      {p.knowsAbout.length > 0 && (
        <section className="py-14 bg-bg-1 border-y border-line">
          <Container>
            <Eyebrow color="purple">Areas of expertise</Eyebrow>
            <div className="mt-5 flex flex-wrap gap-2">
              {p.knowsAbout.map((k) => (
                <span
                  key={k}
                  className="rounded-full border border-line bg-bg-2/40 px-3.5 py-1.5 text-sm font-semibold text-fg-muted"
                >
                  {k}
                </span>
              ))}
            </div>
          </Container>
        </section>
      )}

      {posts.length > 0 && (
        <section className="py-16">
          <Container>
            <Eyebrow>Articles by {p.name}</Eyebrow>
            <ul className="mt-6 grid gap-4 sm:grid-cols-2">
              {posts.map((post) => (
                <li key={post.slug}>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="group flex items-start gap-3 rounded-2xl glass p-4 hover:border-neon-cyan/40 transition-all"
                  >
                    <span className="text-sm font-semibold text-fg group-hover:text-neon-cyan">
                      {post.title}
                    </span>
                    <ArrowRight className="ml-auto mt-0.5 size-4 shrink-0 text-fg-faint group-hover:text-neon-cyan" />
                  </Link>
                </li>
              ))}
            </ul>
          </Container>
        </section>
      )}

      <LeadCapture />
    </>
  );
}
