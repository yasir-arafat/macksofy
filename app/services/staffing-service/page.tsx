import {
  Users,
  CheckCircle2,
  FileSignature,
  Repeat2,
  UserCheck,
  ShieldCheck,
  LifeBuoy,
  ClipboardCheck,
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/SectionTitle";
import { Badge } from "@/components/ui/Badge";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { LinkButton } from "@/components/ui/Button";
import { ParticleBackground } from "@/components/visuals/ParticleBackground";
import { GlowOrb } from "@/components/visuals/GlowOrb";
import { ToolStack } from "@/components/visuals/ToolStack";
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
import { DeliverablesIndustries } from "@/components/services/DeliverablesIndustries";
import { BenchDepth } from "@/components/visuals/staffing/BenchDepth";
import { DeploymentTimeline } from "@/components/visuals/staffing/DeploymentTimeline";
import { AnswerBox } from "@/components/sections/AnswerBox";
import { getShortAnswer } from "@/content/shortAnswers";
import { GlossaryLinks } from "@/components/sections/GlossaryLinks";
import { References } from "@/components/sections/References";

const SLUG = "staffing-service";

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

const MODELS = [
  {
    icon: Repeat2,
    title: "Contract",
    span: "Roll-on / roll-off",
    accent: "text-cyan-300 ring-cyan-400/40 bg-cyan-400/10",
    desc: "Surge capacity for audit season, M&A diligence or an incident. Scale up for the quarter that needs it and back down after, without a headcount conversation.",
  },
  {
    icon: UserCheck,
    title: "Contract-to-hire",
    span: "Convert at month 6",
    accent: "text-emerald-300 ring-emerald-400/40 bg-emerald-400/10",
    desc: "Cover the seat now, convert to your direct payroll at six months with no placement fee. Earlier conversion is possible with a buy-out.",
  },
  {
    icon: Users,
    title: "Managed pod",
    span: "Multi-shift",
    accent: "text-violet-300 ring-violet-400/40 bg-violet-400/10",
    desc: "A full 24×7 SOC roster — analysts across shifts, with rostering and leave cover held by Macksofy rather than landing on your team lead.",
  },
];

const QA = [
  {
    icon: ClipboardCheck,
    title: "A delivery manager, not a CV",
    desc: "Every deployed person has a Macksofy delivery manager attached and a weekly cadence. That is the line between managed deployment and body-shopping.",
  },
  {
    icon: LifeBuoy,
    title: "Senior buddy for 30 days",
    desc: "A senior consultant shadows the first month so ramp-up does not land entirely on your team's time.",
  },
  {
    icon: ShieldCheck,
    title: "Peer review on deliverables",
    desc: "Rule writes, reports and RCAs get a second set of eyes from our side before they reach yours.",
  },
  {
    icon: FileSignature,
    title: "Backfill in 5 working days",
    desc: "If someone exits, replacing them is our SLA and our problem — plus a knowledge-transfer pack on any roll-off.",
  },
];

export default function StaffingPage() {
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
              "radial-gradient(900px 620px at 18% 0%, rgba(16,185,129,0.18) 0%, transparent 62%), radial-gradient(740px 520px at 90% 92%, rgba(139,92,246,0.16) 0%, transparent 60%)",
          }}
        />
        <ParticleBackground density={45} />
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
                <Users className="size-7" />
              </div>
              <h1 className="font-display text-4xl font-black sm:text-5xl lg:text-[3rem] text-balance leading-[1.05]">
                Cybersecurity Staffing &amp; Resource Augmentation in{" "}
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
                Request candidates + rate card
              </LinkButton>
              <LinkButton href="#bench" variant="outline" size="lg">
                See the bench
              </LinkButton>
            </div>
            <div className="mt-6">
              <DownloadButton
                href="/sample-reports/pentest"
                label="See the work our bench ships"
                sub="Sample deliverable · anonymised"
              />
            </div>
          </div>

          <div className="mt-14 grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { v: "5–10", k: "working days to deploy" },
              { v: "3–5", k: "candidates shortlisted" },
              { v: "30 days", k: "senior buddy attached" },
              { v: "5 days", k: "backfill SLA" },
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

      {/* TIMELINE */}
      <section className="py-20 border-t border-line">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12 items-start">
            <div className="lg:col-span-4 lg:sticky lg:top-24">
              <Eyebrow color="green">The problem</Eyebrow>
              <h2 className="mt-3 font-display text-3xl font-black sm:text-4xl text-balance leading-[1.05]">
                The role was approved in March.{" "}
                <span className="gradient-text">It is still open.</span>
              </h2>
              <p className="mt-5 text-fg-muted text-pretty leading-relaxed">
                Security hiring in India and the GCC runs two to four months, and
                the candidates who pass a technical screen still owe a notice
                period. Meanwhile the shift is uncovered and the audit date has not
                moved.
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
              <DeploymentTimeline />
            </div>
          </div>
        </Container>
      </section>

      {/* BENCH */}
      <section id="bench" className="py-20 bg-bg-1">
        <Container>
          <div className="max-w-3xl">
            <Eyebrow color="cyan">The bench</Eyebrow>
            <h2 className="mt-3 font-display text-3xl font-black sm:text-4xl text-balance leading-[1.05]">
              People we already{" "}
              <span className="gradient-text">employ and assess.</span>
            </h2>
            <p className="mt-4 text-fg-muted text-pretty leading-relaxed">
              Deployment is fast because the vetting already happened. These are
              Macksofy consultants who deliver our own engagements between
              placements, not a database of CVs we resell.
            </p>
          </div>
          <div className="mt-12">
            <BenchDepth />
          </div>
        </Container>
      </section>

      {/* MODELS */}
      <section className="py-20">
        <Container>
          <div className="max-w-3xl">
            <Eyebrow color="purple">Three contracts</Eyebrow>
            <h2 className="mt-3 font-display text-3xl font-black sm:text-4xl text-balance leading-[1.05]">
              Borrow, <span className="gradient-text">or borrow then keep.</span>
            </h2>
          </div>
          <div className="mt-12 grid gap-5 lg:grid-cols-3">
            {MODELS.map((m) => {
              const Icon = m.icon;
              return (
                <div key={m.title} className="rounded-2xl glass p-6 h-full flex flex-col lift">
                  <div className="flex items-start justify-between gap-3 mb-4">
                    <div className={`grid size-11 place-items-center rounded-xl ring-1 ${m.accent}`}>
                      <Icon className="size-5" />
                    </div>
                    <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-fg-faint rounded-full border border-line px-2 py-0.5">
                      {m.span}
                    </span>
                  </div>
                  <div className="font-display text-base font-bold text-fg leading-tight">
                    {m.title}
                  </div>
                  <p className="mt-3 text-[13px] text-fg-muted leading-relaxed flex-1">{m.desc}</p>
                </div>
              );
            })}
          </div>
        </Container>
      </section>

      {/* QA LAYER */}
      <section className="py-20 bg-bg-1 border-t border-line">
        <Container>
          <div className="max-w-3xl">
            <Eyebrow color="green">The part that is not body-shopping</Eyebrow>
            <h2 className="mt-3 font-display text-3xl font-black sm:text-4xl text-balance leading-[1.05]">
              A quality net{" "}
              <span className="gradient-text">behind every seat.</span>
            </h2>
            <p className="mt-4 text-fg-muted text-pretty leading-relaxed">
              Staff augmentation has a deserved reputation, and it comes from
              vendors who hand over a CV and invoice monthly. Four things make this
              different, and all four are contractual.
            </p>
          </div>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {QA.map((q) => {
              const Icon = q.icon;
              return (
                <div key={q.title} className="rounded-2xl glass p-6 h-full flex flex-col">
                  <div className="grid size-11 place-items-center rounded-xl ring-1 ring-emerald-400/40 bg-emerald-400/10 text-emerald-300 mb-4">
                    <Icon className="size-5" />
                  </div>
                  <div className="font-display text-base font-bold text-fg leading-tight">
                    {q.title}
                  </div>
                  <p className="mt-3 text-sm text-fg-muted leading-relaxed flex-1">{q.desc}</p>
                </div>
              );
            })}
          </div>
        </Container>
      </section>

      {/* METHODOLOGY */}
      <section id="methodology" className="py-20">
        <Container>
          <div className="max-w-3xl">
            <Eyebrow color="purple">From brief to seat</Eyebrow>
            <h2 className="mt-3 font-display text-3xl font-black sm:text-4xl text-balance leading-[1.05]">
              Five stages,{" "}
              <span className="gradient-text">most of them in week one.</span>
            </h2>
          </div>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {service.methodology.map((p, i) => (
              <div key={p.phase} className="rounded-2xl glass p-6 h-full">
                <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-emerald-300">
                  Stage {i + 1}
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

      {/* CASE STUDIES */}
      <section className="py-20 bg-bg-1">
        <Container>
          <Eyebrow color="amber">Deployment snapshots</Eyebrow>
          <h2 className="mt-3 font-display text-3xl font-black sm:text-4xl text-balance leading-[1.05]">
            One surge.{" "}
            <span className="gradient-text">One bridge to a hire.</span>
          </h2>
          <div className="mt-12 grid gap-6 lg:grid-cols-2">
            {service.caseStudies.map((cs, i) => (
              <div key={i} className="rounded-2xl glass p-6 flex flex-col">
                <Badge variant="green" className="self-start">
                  {cs.industry}
                </Badge>
                <p className="mt-4 text-sm font-semibold text-fg">Scope · {cs.scope}</p>
                <p className="mt-3 text-sm text-fg-muted leading-relaxed flex-1">
                  <span className="text-emerald-300 font-semibold">What happened · </span>
                  {cs.finding}
                </p>
                <p className="mt-3 text-sm text-fg-muted leading-relaxed">{cs.impact}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* TOOL STACK */}
      <section className="py-20">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12 items-end">
            <div className="lg:col-span-5">
              <Eyebrow color="cyan">Skills on the bench</Eyebrow>
              <h2 className="mt-3 font-display text-3xl font-black sm:text-4xl text-balance leading-[1.05]">
                They arrive knowing{" "}
                <span className="gradient-text">your stack.</span>
              </h2>
              <p className="mt-5 text-fg-muted">
                Matching is on tooling as well as seniority, so the first week is
                spent on your runbooks and your environment rather than on learning
                the SIEM.
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

      {/* RATE CARD CTA */}
      <section className="py-20 bg-bg-1">
        <Container>
          <div className="relative overflow-hidden rounded-3xl glass-strong p-10 sm:p-14 text-center glow-blend">
            <GlowOrb className="-top-20 left-1/2 -translate-x-1/2" color="cyan" size={420} />
            <div className="relative">
              <Eyebrow color="green">Rate-card driven</Eyebrow>
              <h2 className="mt-4 font-display text-3xl font-black sm:text-4xl lg:text-5xl text-balance leading-[1.05]">
                Vetted bench, deployed in{" "}
                <span className="gradient-text">5–10 working days.</span>
              </h2>
              <p className="mt-5 mx-auto max-w-2xl text-fg-muted text-pretty">
                Staffing rates scale with seniority, certification (OSCP / OSCP+ /
                ISO 27001 LA / CISSP), shift pattern and clearance. Tell us roles,
                count and start date — we&rsquo;ll send a candidate slate + rate
                card within 5 working days.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <LinkButton
                  href={`/contact?interest=${encodeURIComponent(service.title)}`}
                  size="lg"
                  withArrow
                >
                  Request candidates + rate card
                </LinkButton>
                <LinkButton href="#bench" variant="outline" size="lg">
                  Review the bench
                </LinkButton>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <DeliverablesIndustries
        service={service}
        eyebrow="What's included"
        heading="What you get with every placement"
        tone="plain"
      />

      <TrustStrip />

      <section className="py-20">
        <Container>
          <div className="max-w-3xl">
            <Eyebrow>FAQ</Eyebrow>
            <h2 className="mt-3 font-display text-3xl font-black sm:text-4xl text-balance leading-[1.05]">
              What hiring managers ask first.
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
