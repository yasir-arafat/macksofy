import {
  CalendarClock,
  CheckCircle2,
  PiggyBank,
  Repeat,
  ClipboardList,
  UserCog,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";
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
import { QuarterlyCadence } from "@/components/visuals/program/QuarterlyCadence";
import { RiskRegisterFlow } from "@/components/visuals/program/RiskRegisterFlow";
import { AnswerBox } from "@/components/sections/AnswerBox";
import { getShortAnswer } from "@/content/shortAnswers";
import { GlossaryLinks } from "@/components/sections/GlossaryLinks";
import { References } from "@/components/sections/References";

const SLUG = "annual-security-program";

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

const WHY = [
  {
    icon: PiggyBank,
    title: "25–35% below one-off pricing",
    desc: "The same scope, bought once for the year. The discount is real because the scheduling, scoping and onboarding overhead only happens once.",
  },
  {
    icon: Repeat,
    title: "Unlimited retests in-window",
    desc: "Closure validation stops being a line item you hesitate over. Fix it, we re-test it, the register updates.",
  },
  {
    icon: ClipboardList,
    title: "Remediation chased between quarters",
    desc: "The gap where one-off engagements fail. Findings do not sit until someone remembers them at audit time.",
  },
  {
    icon: CalendarClock,
    title: "Evidence before the auditor asks",
    desc: "The cadence is sequenced against your regulatory calendar, so the year-end pack is assembled rather than scrambled.",
  },
];

export default function AnnualProgramPage() {
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
              "radial-gradient(900px 620px at 70% 0%, rgba(251,191,36,0.16) 0%, transparent 62%), radial-gradient(740px 520px at 5% 90%, rgba(168,85,247,0.16) 0%, transparent 60%)",
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
            <Eyebrow color="amber">{service.hero.eyebrow}</Eyebrow>
            <div className="mt-5 flex items-center gap-4">
              <div className="grid size-14 shrink-0 place-items-center rounded-2xl bg-bg-2 ring-1 ring-amber-400/40 text-amber-300">
                <CalendarClock className="size-7" />
              </div>
              <h1 className="font-display text-4xl font-black sm:text-5xl lg:text-[3.2rem] text-balance leading-[1.05]">
                Annual Security Programmes in{" "}
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
                Scope the annual programme
              </LinkButton>
              <LinkButton href="#cadence" variant="outline" size="lg">
                See the cadence
              </LinkButton>
            </div>
            <div className="mt-6">
              <DownloadButton
                href="/sample-reports/cert-in-audit"
                label="See a year-end evidence pack"
                sub="Anonymised · regulator format"
              />
            </div>
          </div>

          <div className="mt-14 grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { v: "25–35%", k: "below one-off pricing" },
              { v: "Quarterly", k: "execution cadence" },
              { v: "One", k: "consolidated register" },
              { v: "Unlimited", k: "retests in-window" },
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

      {/* WHY */}
      <section className="py-20 border-t border-line">
        <Container>
          <div className="max-w-3xl">
            <Eyebrow color="amber">The case for one contract</Eyebrow>
            <h2 className="mt-3 font-display text-3xl font-black sm:text-4xl text-balance leading-[1.05]">
              Replace the panic cycle{" "}
              <span className="gradient-text">with a calendar.</span>
            </h2>
            <p className="mt-4 text-fg-muted text-pretty leading-relaxed">
              Most security spend in regulated Indian firms is reactive — an
              engagement bought six weeks before an audit, then another one after
              an incident. The same money spent on a plan buys more assurance and
              less scrambling.
            </p>
          </div>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {WHY.map((w) => {
              const Icon = w.icon;
              return (
                <div key={w.title} className="rounded-2xl glass p-6 h-full flex flex-col">
                  <div className="grid size-11 place-items-center rounded-xl ring-1 ring-amber-400/40 bg-amber-400/10 text-amber-300 mb-4">
                    <Icon className="size-5" />
                  </div>
                  <div className="font-display text-base font-bold text-fg leading-tight">
                    {w.title}
                  </div>
                  <p className="mt-3 text-sm text-fg-muted leading-relaxed flex-1">{w.desc}</p>
                </div>
              );
            })}
          </div>
        </Container>
      </section>

      {/* CADENCE */}
      <section id="cadence" className="py-20 bg-bg-1">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12 items-start">
            <div className="lg:col-span-4 lg:sticky lg:top-24">
              <Eyebrow color="purple">The year</Eyebrow>
              <h2 className="mt-3 font-display text-3xl font-black sm:text-4xl text-balance leading-[1.05]">
                Four quarters,{" "}
                <span className="gradient-text">one scope, one price.</span>
              </h2>
              <p className="mt-5 text-fg-muted text-pretty leading-relaxed">
                The split below is a template. Your CISO re-balances it during
                scoping against regulatory deadlines, the product roadmap and where
                the last cycle found weakness. The total scope is what gets
                contracted, not the exact mix.
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
              <QuarterlyCadence />
            </div>
          </div>
        </Container>
      </section>

      {/* RISK REGISTER */}
      <section id="register" className="py-20">
        <Container>
          <div className="max-w-3xl">
            <Eyebrow color="green">Why it compounds</Eyebrow>
            <h2 className="mt-3 font-display text-3xl font-black sm:text-4xl text-balance leading-[1.05]">
              One register{" "}
              <span className="gradient-text">instead of eleven PDFs.</span>
            </h2>
            <p className="mt-4 text-fg-muted text-pretty leading-relaxed">
              The discount is the smaller half of the argument. The real return is
              that findings from five different assessment types land in one place,
              with one severity scale and one owner each.
            </p>
          </div>
          <div className="mt-12">
            <RiskRegisterFlow />
          </div>
        </Container>
      </section>

      {/* METHODOLOGY */}
      <section id="methodology" className="py-20 bg-bg-1">
        <Container>
          <div className="max-w-3xl">
            <Eyebrow color="purple">How the year runs</Eyebrow>
            <h2 className="mt-3 font-display text-3xl font-black sm:text-4xl text-balance leading-[1.05]">
              Scoped once,{" "}
              <span className="gradient-text">governed continuously.</span>
            </h2>
          </div>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {service.methodology.map((p, i) => (
              <div key={p.phase} className="rounded-2xl glass p-6 h-full">
                <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-amber-300">
                  Stage {i + 1}
                </div>
                <div className="mt-2 font-display text-base font-bold text-fg leading-tight">
                  {p.phase.replace(/^\d+\s*·\s*/, "")}
                </div>
                <ul className="mt-4 space-y-1.5 text-[12px] text-fg-muted">
                  {p.activities.map((a) => (
                    <li key={a} className="flex gap-2">
                      <span className="text-amber-400/70 mt-1 shrink-0">▸</span>
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
      <section className="py-20">
        <Container>
          <Eyebrow color="amber">Programme snapshots</Eyebrow>
          <h2 className="mt-3 font-display text-3xl font-black sm:text-4xl text-balance leading-[1.05]">
            What a full year{" "}
            <span className="gradient-text">actually returned.</span>
          </h2>
          <div className="mt-12 grid gap-6 lg:grid-cols-2">
            {service.caseStudies.map((cs, i) => (
              <div key={i} className="rounded-2xl glass p-6 flex flex-col">
                <Badge variant="amber" className="self-start">
                  {cs.industry}
                </Badge>
                <p className="mt-4 text-sm font-semibold text-fg">Scope · {cs.scope}</p>
                <p className="mt-3 text-sm text-fg-muted leading-relaxed flex-1">
                  <span className="text-amber-300 font-semibold">Result · </span>
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

      {/* VCISO PAIRING */}
      <section className="py-20 bg-bg-1 border-t border-line">
        <Container>
          <div className="grid gap-6 lg:grid-cols-2 lg:items-center">
            <div>
              <Eyebrow color="cyan">Often bought together</Eyebrow>
              <h2 className="mt-3 font-display text-3xl font-black sm:text-4xl text-balance leading-[1.05]">
                One designs the programme.{" "}
                <span className="gradient-text">This one executes it.</span>
              </h2>
              <p className="mt-4 text-fg-muted text-pretty leading-relaxed">
                The annual programme is execution-heavy — we run the assessments.
                A vCISO is leadership-heavy — they sit in your governance forums,
                set policy and own the risk register the findings land in. Most
                regulated mid-market clients buy both, in that order.
              </p>
            </div>
            <Link
              href="/services/vciso"
              className="group rounded-2xl glass p-6 ring-1 ring-transparent transition-all hover:ring-cyan-400/40"
            >
              <div className="grid size-11 place-items-center rounded-xl ring-1 ring-cyan-400/40 bg-cyan-400/10 text-cyan-300">
                <UserCog className="size-5" />
              </div>
              <h3 className="mt-4 font-display text-lg font-bold text-fg group-hover:text-cyan-300">
                Virtual CISO
              </h3>
              <p className="mt-2.5 text-sm text-fg-muted leading-relaxed">
                Fractional CISO leadership — board reporting, regulator engagement,
                policy and incident command, one to four days a week.
              </p>
              <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-cyan-300">
                See the vCISO service <ArrowRight className="size-4" />
              </span>
            </Link>
          </div>
        </Container>
      </section>

      {/* TOOL STACK */}
      <section className="py-20">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12 items-end">
            <div className="lg:col-span-5">
              <Eyebrow color="purple">Delivery stack</Eyebrow>
              <h2 className="mt-3 font-display text-3xl font-black sm:text-4xl text-balance leading-[1.05]">
                Every discipline{" "}
                <span className="gradient-text">under one register.</span>
              </h2>
              <p className="mt-5 text-fg-muted">
                The tooling spans the whole cadence — offensive, configuration,
                code and tabletop — because a programme that outsources half of it
                to a second vendor stops being one register very quickly.
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

      {/* PRICING CTA */}
      <section className="py-20 bg-bg-1">
        <Container>
          <div className="relative overflow-hidden rounded-3xl glass-strong p-10 sm:p-14 text-center glow-blend">
            <GlowOrb className="-top-20 left-1/2 -translate-x-1/2" color="cyan" size={420} />
            <div className="relative">
              <Eyebrow color="amber">12-month programme — bespoke scope</Eyebrow>
              <h2 className="mt-4 font-display text-3xl font-black sm:text-4xl lg:text-5xl text-balance leading-[1.05]">
                One contract.{" "}
                <span className="gradient-text">Twelve months of assurance.</span>
              </h2>
              <p className="mt-5 mx-auto max-w-2xl text-fg-muted text-pretty">
                Annual program pricing runs ₹40 L–₹2.5 Cr per year depending on
                asset count, product portfolio and regulatory footprint — at a
                25–35% discount vs. one-off engagement pricing. Quote within 5
                working days of scoping.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <LinkButton
                  href={`/contact?interest=${encodeURIComponent(service.title)}`}
                  size="lg"
                  withArrow
                >
                  Scope the annual program
                </LinkButton>
                <LinkButton href="#cadence" variant="outline" size="lg">
                  Review the cadence
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
              What finance asks before signing for a year.
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
