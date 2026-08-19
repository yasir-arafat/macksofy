import {
  FileScan,
  CheckCircle2,
  Lock,
  Server,
  Eraser,
  FileSignature,
  GitPullRequest,
  ShieldCheck,
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/SectionTitle";
import { Badge } from "@/components/ui/Badge";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { LinkButton } from "@/components/ui/Button";
import { ParticleBackground } from "@/components/visuals/ParticleBackground";
import { GlowOrb } from "@/components/visuals/GlowOrb";
import { ToolStack } from "@/components/visuals/ToolStack";
import { RiskMeter } from "@/components/visuals/RiskMeter";
import { FAQAccordion } from "@/components/sections/FAQAccordion";
import { LeadCapture } from "@/components/home/LeadCapture";
import { WhereWeDeliver } from "@/components/sections/WhereWeDeliver";
import { JsonLd } from "@/components/seo/JsonLd";
import {
  breadcrumbSchema,
  faqSchema,
  serviceSchema,
  methodologyHowToSchema,
} from "@/lib/schema";
import { SITE } from "@/lib/site";
import { buildMetadata } from "@/lib/seo";
import { getServiceBySlug } from "@/content/services";
import { DownloadButton } from "@/components/DownloadButton";
import { TrustStrip } from "@/components/TrustStrip";
import { VulnDiffViewer } from "@/components/visuals/code/VulnDiffViewer";
import { LanguageCoverage } from "@/components/visuals/code/LanguageCoverage";
import { AnswerBox } from "@/components/sections/AnswerBox";
import { getShortAnswer } from "@/content/shortAnswers";
import { GlossaryLinks } from "@/components/sections/GlossaryLinks";
import { References } from "@/components/sections/References";

const SLUG = "source-code-review";

export async function generateMetadata() {
  const s = getServiceBySlug(SLUG);
  if (!s) return {};
  return buildMetadata({
    title: s.seoTitle,
    description: s.seoDescription,
    path: `/services/${s.slug}`,
    keywords: s.keywords,
    ogKind: "service",
    ogTitle: s.shortTitle,
    ogEyebrow: s.category,
  });
}

const CUSTODY = [
  {
    icon: FileSignature,
    title: "NDA before a single file",
    desc: "Mutual NDA and a source-handling agreement are signed before you grant any access. Both are standard documents we can turn around same-day.",
  },
  {
    icon: Server,
    title: "Read-only, or never leaves your office",
    desc: "Default is read-only access to a pinned branch on your GitHub, GitLab, Bitbucket or Azure DevOps. For BFSI, defence and healthcare codebases we review on-prem from a laptop inside your building, or a jump-host VM you control.",
  },
  {
    icon: Lock,
    title: "One reviewer, encrypted at rest",
    desc: "Only the assigned reviewer holds access. Source is encrypted at rest for the engagement window and never forked, mirrored or copied into a shared workspace.",
  },
  {
    icon: Eraser,
    title: "Wiped 30 days after retest",
    desc: "Everything is destroyed 30 days after the retest closes. We retain the report, not your code.",
  },
];

const SDLC = [
  {
    icon: GitPullRequest,
    title: "Pre-commit hooks",
    desc: "Semgrep rules tuned to your repo plus Gitleaks, so the class of bug we found cannot land again.",
  },
  {
    icon: ShieldCheck,
    title: "CI gates",
    desc: "Fail-the-build thresholds you choose, wired into the pipeline you already run.",
  },
  {
    icon: FileScan,
    title: "Ticket import",
    desc: "Findings exported as actionable Jira or Linear issues, not a PDF someone has to retype.",
  },
];

export default function SourceCodeReviewPage() {
  const service = getServiceBySlug(SLUG)!;
  const sa = getShortAnswer(`service:${SLUG}`);

  return (
    <>
      <JsonLd
        data={[
          serviceSchema(service),
          breadcrumbSchema([
            { name: "Services", url: "/services" },
            { name: service.title, url: `/services/${service.slug}` },
          ]),
          faqSchema(service.faqs),
          methodologyHowToSchema({
            subjectLabel: service.shortTitle,
            url: `${SITE.url}/services/${service.slug}#methodology`,
            phases: service.methodology,
          }),
        ]}
      />

      {/* HERO */}
      <section className="relative isolate overflow-hidden">
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(880px 600px at 12% 0%, rgba(16,185,129,0.18) 0%, transparent 62%), radial-gradient(720px 520px at 92% 88%, rgba(0,229,255,0.16) 0%, transparent 60%)",
          }}
        />
        <ParticleBackground density={50} />
        <Container className="relative pt-10 pb-20">
          <Breadcrumbs
            items={[
              { name: "Services", href: "/services" },
              { name: service.shortTitle, href: `/services/${service.slug}` },
            ]}
          />
          <div className="mt-12 max-w-4xl">
            <Eyebrow color="green">{service.hero.eyebrow}</Eyebrow>
            <div className="mt-5 flex items-center gap-4">
              <div className="grid size-14 shrink-0 place-items-center rounded-2xl bg-bg-2 ring-1 ring-emerald-400/40 text-emerald-300">
                <FileScan className="size-7" />
              </div>
              <h1 className="font-display text-4xl font-black sm:text-5xl lg:text-[3.3rem] text-balance leading-[1.05]">
                Secure Source Code Review in{" "}
                <span className="gradient-text">India &amp; UAE</span>.
              </h1>
            </div>
            <p className="mt-6 max-w-2xl text-lg text-fg-muted text-pretty leading-relaxed">
              {service.hero.description}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <LinkButton
                href={`/contact?interest=${encodeURIComponent(service.title)}`}
                size="lg"
                withArrow
              >
                Request a scoped quote
              </LinkButton>
              <LinkButton href="#findings" variant="outline" size="lg">
                See a finding
              </LinkButton>
            </div>
            <div className="mt-6">
              <DownloadButton
                href="/sample-reports/pentest"
                label="Download sample report format"
                sub="Findings inventory · anonymised"
              />
            </div>
          </div>

          <div className="mt-14 grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { v: "~70%", k: "manual review effort" },
              { v: "48h", k: "fixed-price proposal" },
              { v: "5–20", k: "working days typical" },
              { v: "SBOM", k: "CycloneDX / SPDX" },
            ].map((m) => (
              <div key={m.k} className="rounded-2xl glass p-5">
                <div className="font-display text-3xl font-black gradient-text leading-none">
                  {m.v}
                </div>
                <div className="mt-2 font-mono text-[10px] uppercase tracking-[0.2em] text-fg-faint">
                  {m.k}
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {sa && (
        <section className="py-8">
          <Container>
            <AnswerBox q={sa.q} a={sa.a} />
          </Container>
        </section>
      )}

      {/* FINDINGS */}
      <section id="findings" className="py-20 border-t border-line">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12 items-start">
            <div className="lg:col-span-4 lg:sticky lg:top-24">
              <Eyebrow color="green">What a finding looks like</Eyebrow>
              <h2 className="mt-3 font-display text-3xl font-black sm:text-4xl text-balance leading-[1.05]">
                Not a Semgrep dump{" "}
                <span className="gradient-text">with our logo on it.</span>
              </h2>
              <p className="mt-5 text-fg-muted text-pretty leading-relaxed">
                Every finding is human-confirmed before it reaches your report. You
                get the line, the class, why it is exploitable in your code
                specifically, and the patch — not a rule ID and a severity colour.
              </p>
              <ul className="mt-6 space-y-2 text-sm">
                {service.businessImpact.map((b) => (
                  <li key={b} className="flex gap-3">
                    <CheckCircle2 className="size-5 text-emerald-400 shrink-0 mt-0.5" />
                    <span className="text-fg-muted leading-relaxed">{b}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="lg:col-span-8">
              <VulnDiffViewer />
            </div>
          </div>
        </Container>
      </section>

      {/* LANGUAGE COVERAGE */}
      <section className="py-20 bg-bg-1">
        <Container>
          <div className="max-w-3xl">
            <Eyebrow color="cyan">Coverage</Eyebrow>
            <h2 className="mt-3 font-display text-3xl font-black sm:text-4xl text-balance leading-[1.05]">
              Tools for breadth.{" "}
              <span className="gradient-text">A reviewer for the rest.</span>
            </h2>
            <p className="mt-4 text-fg-muted text-pretty leading-relaxed">
              SAST and SCA get us across the whole codebase quickly and cheaply.
              Authentication, crypto, business-logic authorisation, deserialization
              and trust boundaries are read by hand, because that is where the
              findings that matter live.
            </p>
          </div>
          <div className="mt-12">
            <LanguageCoverage />
          </div>
        </Container>
      </section>

      {/* METHODOLOGY */}
      <section id="methodology" className="py-20">
        <Container>
          <div className="max-w-3xl">
            <Eyebrow color="purple">Methodology</Eyebrow>
            <h2 className="mt-3 font-display text-3xl font-black sm:text-4xl text-balance leading-[1.05]">
              Seven phases, <span className="gradient-text">pinned to a branch.</span>
            </h2>
            <p className="mt-4 text-fg-muted text-pretty">
              The review is run against a pinned tag so it stays reproducible — and
              so the retest compares like with like.
            </p>
          </div>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {service.methodology.map((p, i) => (
              <div key={p.phase} className="rounded-2xl glass p-6 h-full">
                <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-emerald-300">
                  Phase {i + 1}
                </div>
                <div className="mt-2 font-display text-base font-bold text-fg leading-tight">
                  {p.phase.replace(/^\d+\s*·\s*/, "")}
                </div>
                <ul className="mt-4 space-y-1.5 text-[12px] text-fg-muted">
                  {p.activities.map((a) => (
                    <li key={a} className="flex gap-2">
                      <span className="text-emerald-400/70 mt-1 shrink-0">▸</span>
                      <span className="leading-relaxed">{a}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* CODE CUSTODY */}
      <section className="py-20 bg-bg-1 border-t border-line">
        <Container>
          <div className="max-w-3xl">
            <Eyebrow color="green">How your code is handled</Eyebrow>
            <h2 className="mt-3 font-display text-3xl font-black sm:text-4xl text-balance leading-[1.05]">
              The objection is always the same.{" "}
              <span className="gradient-text">Here is the answer.</span>
            </h2>
            <p className="mt-4 text-fg-muted text-pretty leading-relaxed">
              Handing your source to an external firm is a bigger decision than
              booking a pentest. These four controls are contractual, not
              aspirational.
            </p>
          </div>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {CUSTODY.map((c) => {
              const Icon = c.icon;
              return (
                <div key={c.title} className="rounded-2xl glass p-6 h-full flex flex-col">
                  <div className="grid size-11 place-items-center rounded-xl ring-1 ring-emerald-400/40 bg-emerald-400/10 text-emerald-300 mb-4">
                    <Icon className="size-5" />
                  </div>
                  <div className="font-display text-base font-bold text-fg leading-tight">
                    {c.title}
                  </div>
                  <p className="mt-3 text-sm text-fg-muted leading-relaxed flex-1">{c.desc}</p>
                </div>
              );
            })}
          </div>
        </Container>
      </section>

      {/* CASE STUDIES */}
      <section className="py-20">
        <Container>
          <Eyebrow color="amber">Engagement snapshots</Eyebrow>
          <h2 className="mt-3 font-display text-3xl font-black sm:text-4xl text-balance leading-[1.05]">
            Found pre-prod. <span className="gradient-text">Fixed pre-prod.</span>
          </h2>
          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {service.caseStudies.map((cs, i) => (
              <div key={i} className="rounded-2xl glass p-6 flex flex-col">
                <Badge variant="green" className="self-start">
                  {cs.industry}
                </Badge>
                <p className="mt-4 text-sm font-semibold text-fg">Scope · {cs.scope}</p>
                <p className="mt-3 text-sm text-fg-muted leading-relaxed flex-1">
                  <span className="text-emerald-300 font-semibold">Finding · </span>
                  {cs.finding}
                </p>
                <p className="mt-3 text-sm text-fg-muted leading-relaxed">{cs.impact}</p>
                <div className="mt-5 pt-5 border-t border-line/60">
                  <RiskMeter level={cs.severity} />
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* SDLC HANDOFF */}
      <section className="py-20 bg-bg-1">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12 items-start">
            <div className="lg:col-span-5">
              <Eyebrow color="cyan">After the report</Eyebrow>
              <h2 className="mt-3 font-display text-3xl font-black sm:text-4xl text-balance leading-[1.05]">
                A review you only need{" "}
                <span className="gradient-text">once per class of bug.</span>
              </h2>
              <p className="mt-5 text-fg-muted leading-relaxed">
                The report closes with an SDLC-integration playbook and a live
                walkthrough with your developers. The point is that the same finding
                does not come back next release.
              </p>
            </div>
            <div className="lg:col-span-7 grid gap-4 sm:grid-cols-3">
              {SDLC.map((s) => {
                const Icon = s.icon;
                return (
                  <div key={s.title} className="rounded-2xl glass p-5 h-full">
                    <div className="grid size-10 place-items-center rounded-lg ring-1 ring-cyan-400/40 bg-cyan-400/10 text-cyan-300">
                      <Icon className="size-[18px]" />
                    </div>
                    <div className="mt-4 font-display text-sm font-bold text-fg leading-tight">
                      {s.title}
                    </div>
                    <p className="mt-2 text-[12.5px] text-fg-muted leading-relaxed">{s.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </Container>
      </section>

      {/* TOOL STACK */}
      <section className="py-20">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12 items-end">
            <div className="lg:col-span-5">
              <Eyebrow color="purple">Tooling</Eyebrow>
              <h2 className="mt-3 font-display text-3xl font-black sm:text-4xl text-balance leading-[1.05]">
                Commercial, open-source,{" "}
                <span className="gradient-text">and rules we write for you.</span>
              </h2>
              <p className="mt-5 text-fg-muted">
                Where you already license Checkmarx or Fortify we run inside your
                tenancy. Custom Semgrep and CodeQL queries written during the
                engagement are handed over at the end — they are yours.
              </p>
            </div>
            <div className="lg:col-span-7">
              <div className="rounded-2xl glass p-6">
                <ToolStack tools={service.toolStack.map((t) => ({ name: t }))} />
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* SCOPE-DRIVEN PRICING CTA */}
      <section className="py-20 bg-bg-1">
        <Container>
          <div className="relative overflow-hidden rounded-3xl glass-strong p-10 sm:p-14 text-center glow-blend">
            <GlowOrb className="-top-20 left-1/2 -translate-x-1/2" color="cyan" size={420} />
            <div className="relative">
              <Eyebrow color="green">Scope-driven pricing</Eyebrow>
              <h2 className="mt-4 font-display text-3xl font-black sm:text-4xl lg:text-5xl text-balance leading-[1.05]">
                Every codebase is different.{" "}
                <span className="gradient-text">So is every quote.</span>
              </h2>
              <p className="mt-5 mx-auto max-w-2xl text-fg-muted text-pretty">
                Source review pricing depends on KLOC, language mix and crown-jewel
                module count — not a fixed tier. Share your stack and we&rsquo;ll
                send a fixed-price proposal within 48 hours, NDA-first.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <LinkButton
                  href={`/contact?interest=${encodeURIComponent(service.title)}`}
                  size="lg"
                  withArrow
                >
                  Request a scoped quote
                </LinkButton>
                <LinkButton href="#methodology" variant="outline" size="lg">
                  Review the methodology
                </LinkButton>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <TrustStrip />

      <section className="py-20">
        <Container>
          <div className="max-w-3xl">
            <Eyebrow>FAQ</Eyebrow>
            <h2 className="mt-3 font-display text-3xl font-black sm:text-4xl text-balance leading-[1.05]">
              Things people ask before sharing source.
            </h2>
            <div className="mt-10">
              <FAQAccordion faqs={service.faqs} />
            </div>
          </div>
        </Container>
      </section>

      <WhereWeDeliver
        subject={service.shortTitle}
        subjectShort={service.shortTitle}
        serviceSlug={service.slug}
      />

      <References pageKey={`service:${SLUG}`} />
      <GlossaryLinks href={`/services/${SLUG}`} />
      <LeadCapture />
    </>
  );
}
