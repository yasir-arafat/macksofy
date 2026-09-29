import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { CASE_STUDIES } from "@/content/caseStudies";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/SectionTitle";
import { Badge } from "@/components/ui/Badge";

interface CaseStudyProofProps {
  serviceSlug?: string;
  caseStudySlugs?: string[];
  eyebrow?: string;
  heading?: string;
  description?: string;
  tone?: "default" | "raised";
}

export function CaseStudyProof({
  serviceSlug,
  caseStudySlugs,
  eyebrow = "Documented engagement proof",
  heading = "See the full evidence trail.",
  description =
    "These anonymised records preserve the engagement scope, approach, findings, outcomes and reported metrics without publishing the client's identity.",
  tone = "raised",
}: CaseStudyProofProps) {
  const studies = caseStudySlugs
    ? caseStudySlugs
        .map((slug) => CASE_STUDIES.find((study) => study.slug === slug))
        .filter((study): study is (typeof CASE_STUDIES)[number] => Boolean(study))
    : serviceSlug
      ? CASE_STUDIES.filter((study) => study.serviceSlug === serviceSlug)
      : [];

  if (studies.length === 0) return null;

  return (
    <section className={`py-20 ${tone === "raised" ? "bg-bg-1" : ""}`}>
      <Container>
        <div className="max-w-3xl">
          <Eyebrow color="amber">{eyebrow}</Eyebrow>
          <h2 className="mt-3 font-display text-3xl font-black text-fg sm:text-4xl">
            {heading}
          </h2>
          <p className="mt-4 text-fg-muted leading-relaxed text-pretty">
            {description}
          </p>
        </div>
        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {studies.map((study) => (
            <Link
              key={study.slug}
              href={`/case-studies/${study.slug}`}
              className="group flex h-full flex-col rounded-2xl glass p-6 ring-1 ring-transparent hover:ring-neon-cyan/40 transition-all hover:-translate-y-1"
            >
              <div className="flex flex-wrap gap-1.5">
                <Badge variant="cyan">{study.sector}</Badge>
                <Badge variant="purple">{study.engagement}</Badge>
                <Badge variant="outline">{study.region}</Badge>
              </div>
              <h3 className="mt-4 font-display text-lg font-bold text-fg leading-snug group-hover:text-neon-cyan line-clamp-3">
                {study.headline}
              </h3>
              <p className="mt-3 flex-1 text-sm text-fg-muted leading-relaxed line-clamp-4">
                {study.summary}
              </p>
              <div className="mt-5 grid grid-cols-2 gap-3 border-t border-line/60 pt-5">
                {study.metrics.slice(0, 2).map((metric) => (
                  <div key={metric.label}>
                    <div className="font-display text-xl font-black text-neon-cyan">
                      {metric.value}
                    </div>
                    <div className="mt-1 font-mono text-[9px] uppercase tracking-[0.14em] text-fg-faint">
                      {metric.label}
                    </div>
                  </div>
                ))}
              </div>
              <span className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-neon-cyan">
                Read full case study <ArrowRight className="size-4" />
              </span>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
