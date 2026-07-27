import { notFound } from "next/navigation";
import Link from "next/link";
import { CheckCircle2, ArrowRight, FileBadge, Building2 } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/SectionTitle";
import { Badge } from "@/components/ui/Badge";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { LinkButton } from "@/components/ui/Button";
import { ParticleBackground } from "@/components/visuals/ParticleBackground";
import { GlowOrb } from "@/components/visuals/GlowOrb";
import { CertInHero } from "@/components/visuals/CertInBadge";
import { FAQAccordion } from "@/components/sections/FAQAccordion";
import { LeadCapture } from "@/components/home/LeadCapture";
import { JsonLd } from "@/components/seo/JsonLd";
import {
  breadcrumbSchema,
  faqSchema,
  auditSchema,
  methodologyHowToSchema,
} from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";
import { SITE } from "@/lib/site";
import { AUDITS, getAuditBySlug } from "@/content/audits";
import { POSTS } from "@/content/blog";
import { SERVICES } from "@/content/services";
import {
  pickRelatedAudits,
  pickBlogPostsForAudit,
  pickServicesForAudit,
} from "@/lib/related";
import { Methodology } from "@/components/visuals/methodology/Methodology";
import { AuditDeepDive } from "@/components/visuals/audit/AuditDeepDive";
import { TrustStrip } from "@/components/TrustStrip";
import { DownloadButton } from "@/components/DownloadButton";
import { AnswerBox } from "@/components/sections/AnswerBox";
import { getShortAnswer } from "@/content/shortAnswers";
import { GlossaryLinks } from "@/components/sections/GlossaryLinks";
import { References } from "@/components/sections/References";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return AUDITS.map((a) => ({ slug: a.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const a = getAuditBySlug(slug);
  if (!a) return {};
  return buildMetadata({
    title: a.seoTitle,
    description: a.seoDescription,
    path: `/audit/${a.slug}`,
    keywords: a.keywords,
    ogKind: "audit",
    ogTitle: a.shortTitle,
    ogEyebrow: a.category,
  });
}

export default async function AuditDetail({ params }: PageProps) {
  const { slug } = await params;
  const a = getAuditBySlug(slug);
  if (!a) notFound();
  const Icon = a.icon;
  const sa = getShortAnswer(`audit:${slug}`);
  const related = pickRelatedAudits(a, AUDITS, 3);
  const relatedPosts = pickBlogPostsForAudit(a, POSTS, 3);
  const relatedServices = pickServicesForAudit(a, SERVICES, 3);

  return (
    <>
      <JsonLd
        data={[
          auditSchema(a),
          breadcrumbSchema([
            { name: "Audit", url: "/audit" },
            { name: a.shortTitle, url: `/audit/${a.slug}` },
          ]),
          faqSchema(a.faqs),
          methodologyHowToSchema({
            subjectLabel: a.shortTitle,
            url: `${SITE.url}/audit/${a.slug}#methodology`,
            phases: a.methodology,
          }),
        ]}
      />

      <section className="relative isolate overflow-hidden">
        <ParticleBackground density={70} />
        <GlowOrb className="-top-40 left-1/3" color="cyan" size={500} />
        <GlowOrb className="-bottom-20 right-1/4" color="purple" size={400} />
        <Container className="relative pt-10 pb-20">
          <Breadcrumbs
            items={[
              { name: "Audit", href: "/audit" },
              { name: a.shortTitle, href: `/audit/${a.slug}` },
            ]}
          />
          <div className="mt-10 grid gap-12 lg:grid-cols-12 items-end">
            <div className="lg:col-span-7">
              <Eyebrow>{a.hero.eyebrow}</Eyebrow>
              {a.authority && (
                <div className="mt-3">
                  <Badge variant="cert">
                    <FileBadge className="size-3" />
                    Authority Page
                  </Badge>
                </div>
              )}
              <div className="mt-5 flex items-center gap-4">
                <div className="grid size-14 place-items-center rounded-2xl bg-bg-2 ring-1 ring-neon-cyan/30 text-neon-cyan glow-cyan">
                  <Icon className="size-7" />
                </div>
                <h1 className="font-display text-4xl font-black sm:text-5xl lg:text-6xl text-balance leading-[1.05]">
                  {a.title}
                </h1>
              </div>
              <p className="mt-3 text-2xl font-display font-bold gradient-text">
                {a.hero.tagline}
              </p>
              <p className="mt-5 max-w-2xl text-lg text-fg-muted text-pretty">
                {a.hero.description}
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <LinkButton href={`/contact?interest=${encodeURIComponent(a.title)}`} size="lg" withArrow>
                  Request Audit
                </LinkButton>
                <LinkButton href="/contact" variant="outline" size="lg">
                  Talk to a consultant
                </LinkButton>
              </div>
              <div className="mt-6">
                <DownloadButton
                  href="/sample-reports/cert-in-audit"
                  label="Download sample audit report"
                  sub="CERT-In format · anonymised"
                />
              </div>
            </div>
            <div className="lg:col-span-5">
              {a.authority ? <CertInHero /> : <FrameworkBox frameworks={a.frameworks} />}
            </div>
          </div>
        </Container>
      </section>

      {/* SHORT ANSWER (AEO/GEO) */}
      {sa && (
        <section className="py-8">
          <Container>
            <AnswerBox q={sa.q} a={sa.a} />
          </Container>
        </section>
      )}

      {/* WHY IT MATTERS */}
      <section className="py-20 bg-bg-1">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12 items-start">
            <div className="lg:col-span-7">
              <Eyebrow>Why {a.shortTitle} matters</Eyebrow>
              <h2 className="mt-3 font-display text-3xl font-black sm:text-4xl text-balance leading-[1.05]">
                {a.shortTitle} is leverage,{" "}
                <span className="gradient-text">not paperwork.</span>
              </h2>
              <p className="mt-6 text-lg text-fg-muted leading-relaxed text-pretty">
                {a.whyItMatters}
              </p>
            </div>
            <div className="lg:col-span-5">
              <div className="rounded-2xl glass p-6">
                <Eyebrow color="amber">Applicability</Eyebrow>
                <ul className="mt-5 space-y-3">
                  {a.applicability.map((p) => (
                    <li key={p} className="flex gap-3 text-sm">
                      <Building2 className="size-4 text-neon-cyan shrink-0 mt-0.5" />
                      <span className="text-fg-muted">{p}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* FRAMEWORKS */}
      {!a.authority && a.frameworks.length > 0 && (
        <section className="py-20">
          <Container>
            <Eyebrow color="purple">Standards & frameworks</Eyebrow>
            <h2 className="mt-3 font-display text-3xl font-black sm:text-4xl text-balance">
              Aligned to the regulations <span className="gradient-text">that matter.</span>
            </h2>
            <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {a.frameworks.map((f) => (
                <div key={f} className="rounded-xl glass p-4">
                  <CheckCircle2 className="size-5 text-neon-cyan mb-2" />
                  <span className="font-mono text-sm text-fg">{f}</span>
                </div>
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* METHODOLOGY */}
      <section id="methodology" className="py-20 bg-bg-1">
        <Container>
          <Eyebrow>Methodology</Eyebrow>
          <h2 className="mt-3 font-display text-3xl font-black sm:text-4xl text-balance">
            How we run a {a.shortTitle} engagement.
          </h2>
          <p className="mt-3 max-w-2xl text-fg-muted text-pretty">
            Interactive walkthrough — every phase clickable, every activity
            documented, every artefact regulator-ready.
          </p>
          <div className="mt-10">
            <Methodology
              slug={a.slug}
              phases={a.methodology}
              subjectLabel={a.shortTitle}
            />
          </div>
        </Container>
      </section>

      {/* DELIVERABLES */}
      <section className="py-20">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <Eyebrow color="purple">Deliverables</Eyebrow>
              <h2 className="mt-3 font-display text-3xl font-black sm:text-4xl text-balance leading-[1.05]">
                What your {a.shortTitle} engagement{" "}
                <span className="gradient-text">puts on the table.</span>
              </h2>
            </div>
            <ul className="lg:col-span-7 grid gap-4 sm:grid-cols-2">
              {a.deliverables.map((d) => (
                <li key={d} className="flex gap-3 rounded-xl glass p-4">
                  <CheckCircle2 className="size-5 text-neon-green shrink-0 mt-0.5" />
                  <span className="text-sm text-fg-muted leading-relaxed">{d}</span>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      {/* CASE STUDIES */}
      {a.caseStudies.length > 0 && (
        <section className="py-20 bg-bg-1">
          <Container>
            <Eyebrow color="amber">Recent engagements</Eyebrow>
            <div className="mt-10 grid gap-6 lg:grid-cols-2">
              {a.caseStudies.map((cs, i) => (
                <div key={i} className="rounded-2xl glass p-6">
                  <Badge variant="cyan">{cs.industry}</Badge>
                  <h3 className="mt-3 font-display text-lg font-bold text-fg">
                    {cs.engagement}
                  </h3>
                  <p className="mt-3 text-sm text-fg-muted leading-relaxed">
                    <span className="text-neon-green font-semibold">Outcome: </span>
                    {cs.outcome}
                  </p>
                </div>
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* AUDIT DEEP-DIVE — pillars + animated stats + horizontal timeline */}
      <AuditDeepDive
        shortTitle={a.shortTitle}
        pillars={a.pillars}
        fallbackFrameworks={a.frameworks}
        fallbackDeliverables={a.deliverables}
        phases={a.methodology}
        authority={a.authority}
      />

      {/* TRUST STRIP */}
      <TrustStrip />

      {/* FAQ */}
      <section className="py-20">
        <Container>
          <div className="max-w-3xl">
            <Eyebrow>FAQ</Eyebrow>
            <h2 className="mt-3 font-display text-3xl font-black sm:text-4xl text-balance">
              {a.shortTitle} — what compliance leads ask before signing.
            </h2>
            <div className="mt-10">
              <FAQAccordion faqs={a.faqs} />
            </div>
          </div>
        </Container>
      </section>

      {related.length > 0 && (
        <section className="py-20 bg-bg-1">
          <Container>
            <Eyebrow color="purple">Other audit engagements</Eyebrow>
            <div className="mt-8 grid gap-5 sm:grid-cols-3">
              {related.map((r) => {
                const RIcon = r.icon;
                return (
                  <Link
                    key={r.slug}
                    href={`/audit/${r.slug}`}
                    className="group rounded-2xl glass p-6 ring-1 ring-transparent hover:ring-neon-cyan/40 transition-all"
                  >
                    <div className="grid size-10 place-items-center rounded-lg bg-bg-2 ring-1 ring-neon-cyan/30 text-neon-cyan">
                      <RIcon className="size-5" />
                    </div>
                    <h3 className="mt-4 font-display text-base font-bold text-fg group-hover:text-neon-cyan">
                      {r.title}
                    </h3>
                    <p className="mt-2 text-sm text-fg-muted line-clamp-2">
                      {r.hero.tagline}
                    </p>
                    <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-neon-cyan">
                      Learn more <ArrowRight className="size-4" />
                    </span>
                  </Link>
                );
              })}
            </div>
          </Container>
        </section>
      )}

      {relatedServices.length > 0 && (
        <section className="py-20">
          <Container>
            <Eyebrow color="cyan">Pair with an assessment</Eyebrow>
            <h2 className="mt-3 font-display text-2xl font-black sm:text-3xl text-balance">
              {a.shortTitle} evidence starts with{" "}
              <span className="gradient-text">hands-on testing.</span>
            </h2>
            <p className="mt-3 max-w-2xl text-fg-muted text-pretty">
              A clean {a.shortTitle} report rests on real technical assurance.
              These Macksofy assessments generate the vulnerability, penetration
              and control-effectiveness evidence your auditor expects to see.
            </p>
            <div className="mt-8 grid gap-5 sm:grid-cols-3">
              {relatedServices.map((s) => {
                const SIcon = s.icon;
                return (
                  <Link
                    key={s.slug}
                    href={`/services/${s.slug}`}
                    className="group rounded-2xl glass p-6 ring-1 ring-transparent hover:ring-neon-cyan/40 transition-all"
                  >
                    <div className="grid size-10 place-items-center rounded-lg bg-bg-2 ring-1 ring-neon-cyan/30 text-neon-cyan">
                      <SIcon className="size-5" />
                    </div>
                    <h3 className="mt-4 font-display text-base font-bold text-fg group-hover:text-neon-cyan leading-tight">
                      {s.title}
                    </h3>
                    <p className="mt-2 text-sm text-fg-muted line-clamp-2">
                      {s.hero.tagline}
                    </p>
                    <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-neon-cyan">
                      Explore service <ArrowRight className="size-4" />
                    </span>
                  </Link>
                );
              })}
            </div>
          </Container>
        </section>
      )}

      {relatedPosts.length > 0 && (
        <section className="py-20 bg-bg-1">
          <Container>
            <Eyebrow color="cyan">Further reading</Eyebrow>
            <h2 className="mt-3 font-display text-2xl font-black sm:text-3xl text-balance">
              Field notes from {a.shortTitle} engagements.
            </h2>
            <div className="mt-8 grid gap-5 sm:grid-cols-3">
              {relatedPosts.map((p) => (
                <Link
                  key={p.slug}
                  href={`/blog/${p.slug}`}
                  className="group rounded-2xl glass p-6 ring-1 ring-transparent hover:ring-neon-cyan/40 transition-all"
                >
                  <span className="text-xs font-mono uppercase tracking-wider text-neon-cyan">
                    {p.category}
                  </span>
                  <h3 className="mt-3 font-display text-base font-bold text-fg group-hover:text-neon-cyan line-clamp-2">
                    {p.title}
                  </h3>
                  <p className="mt-2 text-sm text-fg-muted line-clamp-2">
                    {p.description}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-neon-cyan">
                    Read article <ArrowRight className="size-4" />
                  </span>
                </Link>
              ))}
            </div>
          </Container>
        </section>
      )}

      <References pageKey={`audit:${a.slug}`} />
      <GlossaryLinks href={`/audit/${a.slug}`} />
      <LeadCapture />
    </>
  );
}

function FrameworkBox({ frameworks }: { frameworks: string[] }) {
  return (
    <div className="rounded-2xl glass-strong p-6 glow-blend">
      <Eyebrow color="purple">Aligned to</Eyebrow>
      <ul className="mt-5 space-y-2.5 text-sm">
        {frameworks.map((f) => (
          <li key={f} className="flex gap-3">
            <CheckCircle2 className="size-4 text-neon-cyan shrink-0 mt-0.5" />
            <span className="text-fg-muted font-mono">{f}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
