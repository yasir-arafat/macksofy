import {
  Combine,
  CheckCircle2,
  Swords,
  Shield,
  GitBranch,
  Users,
  Gauge,
  ClipboardCheck,
} from "lucide-react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/SectionTitle";
import { Badge } from "@/components/ui/Badge";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { LinkButton } from "@/components/ui/Button";
import { ParticleBackground } from "@/components/visuals/ParticleBackground";
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
import { getServicePricing } from "@/content/pricing";
import { PricingTiers } from "@/components/PricingTiers";
import { DownloadButton } from "@/components/DownloadButton";
import { TrustStrip } from "@/components/TrustStrip";
import { DeliverablesIndustries } from "@/components/services/DeliverablesIndustries";
import { DetectionLoop } from "@/components/visuals/purple/DetectionLoop";
import { CoverageDelta } from "@/components/visuals/purple/CoverageDelta";
import { AnswerBox } from "@/components/sections/AnswerBox";
import { getShortAnswer } from "@/content/shortAnswers";
import { GlossaryLinks } from "@/components/sections/GlossaryLinks";
import { References } from "@/components/sections/References";

const SLUG = "purple-teaming";

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

const VS = [
  {
    icon: Swords,
    title: "Red team",
    accent: "text-red-300 ring-red-400/40 bg-red-400/10",
    mode: "Covert",
    rows: [
      ["Blue knows", "No — that is the point"],
      ["Output", "What got missed"],
      ["Rules shipped", "None during the engagement"],
      ["Best when", "You need to know if you would survive"],
    ],
  },
  {
    icon: Combine,
    title: "Purple team",
    accent: "text-violet-300 ring-violet-400/40 bg-violet-400/10",
    mode: "Collaborative",
    rows: [
      ["Blue knows", "Yes — they are in the room"],
      ["Output", "Detection rules, tuned and validated"],
      ["Rules shipped", "During the engagement, in your repo"],
      ["Best when", "You have a SOC and want it measurably better"],
    ],
  },
];

const READINESS = [
  {
    icon: Gauge,
    title: "You have a SIEM with real telemetry",
    desc: "Splunk, Sentinel, Wazuh, Elastic or QRadar with endpoint and identity logs actually flowing. Purple teaming tunes what exists — it cannot tune an absent log source.",
  },
  {
    icon: Users,
    title: "You have analysts, in-house or MSSP",
    desc: "Someone has to be in the room to write and own the rules. We run this against client SOCs, MSSP SOCs and hybrids without preference.",
  },
  {
    icon: ClipboardCheck,
    title: "You can pause and fix mid-exercise",
    desc: "The value comes from stopping on a miss and building the detection together. If change control cannot move inside the window, a red team fits better.",
  },
];

export default function PurpleTeamPage() {
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
              "radial-gradient(820px 600px at 12% 0%, rgba(239,68,68,0.16) 0%, transparent 58%), radial-gradient(820px 600px at 88% 10%, rgba(0,229,255,0.16) 0%, transparent 58%), radial-gradient(700px 500px at 50% 100%, rgba(168,85,247,0.18) 0%, transparent 60%)",
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
            <Eyebrow color="purple">{service.hero.eyebrow}</Eyebrow>
            <div className="mt-5 flex items-center gap-4">
              <div className="grid size-14 shrink-0 place-items-center rounded-2xl bg-bg-2 ring-1 ring-violet-400/40 text-violet-300">
                <Combine className="size-7" />
              </div>
              <h1 className="font-display text-4xl font-black sm:text-5xl lg:text-[3.3rem] text-balance leading-[1.05]">
                Purple Team Exercises in{" "}
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
                Scope an exercise
              </LinkButton>
              <LinkButton href="#loop" variant="outline" size="lg">
                See the loop
              </LinkButton>
            </div>
            <div className="mt-6">
              <DownloadButton
                href="/sample-reports/pentest"
                label="Download sample report format"
                sub="Coverage delta · anonymised"
              />
            </div>
          </div>

          <div className="mt-14 grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { v: "5–15", k: "working days" },
              { v: "Live", k: "SOC in the loop" },
              { v: "Shipped", k: "rules, not tickets" },
              { v: "30 days", k: "retest of the rule set" },
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

      {/* RED VS PURPLE */}
      <section className="py-20 border-t border-line">
        <Container>
          <div className="max-w-3xl">
            <Eyebrow color="purple">The distinction people buy wrong</Eyebrow>
            <h2 className="mt-3 font-display text-3xl font-black sm:text-4xl text-balance leading-[1.05]">
              A red team tells you what got missed.{" "}
              <span className="gradient-text">Purple makes it stop being missed.</span>
            </h2>
          </div>
          <div className="mt-12 grid gap-5 lg:grid-cols-2">
            {VS.map((v) => {
              const Icon = v.icon;
              return (
                <div key={v.title} className="rounded-2xl glass p-6 h-full">
                  <div className="flex items-start justify-between gap-3">
                    <div className={`grid size-11 place-items-center rounded-xl ring-1 ${v.accent}`}>
                      <Icon className="size-5" />
                    </div>
                    <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-fg-faint rounded-full border border-line px-2 py-0.5">
                      {v.mode}
                    </span>
                  </div>
                  <div className="mt-4 font-display text-lg font-bold text-fg">{v.title}</div>
                  <dl className="mt-4 space-y-2.5">
                    {v.rows.map(([k, val]) => (
                      <div
                        key={k}
                        className="flex items-baseline justify-between gap-4 border-b border-line/50 pb-2 last:border-0"
                      >
                        <dt className="font-mono text-[10.5px] uppercase tracking-[0.12em] text-fg-faint">
                          {k}
                        </dt>
                        <dd className="text-right text-[12.5px] text-fg-muted">{val}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              );
            })}
          </div>
          <p className="mt-6 max-w-2xl text-sm text-fg-muted">
            Both are worth buying — in that order. If you have never run a red team,
            you may not yet know which detections matter.{" "}
            <Link href="/services/red-teaming" className="text-neon-cyan hover:underline">
              Red team operations
            </Link>{" "}
            is the covert version of this work.
          </p>
        </Container>
      </section>

      {/* THE LOOP */}
      <section id="loop" className="py-20 bg-bg-1">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12 items-start">
            <div className="lg:col-span-4 lg:sticky lg:top-24">
              <Eyebrow color="cyan">The mechanic</Eyebrow>
              <h2 className="mt-3 font-display text-3xl font-black sm:text-4xl text-balance leading-[1.05]">
                Execute. Miss.{" "}
                <span className="gradient-text">Tune. Replay. Confirm.</span>
              </h2>
              <p className="mt-5 text-fg-muted text-pretty leading-relaxed">
                Every technique runs this loop before the exercise moves on. Your
                analysts write the rules — we sit with them while they do it, which
                is also how the training happens.
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
              <DetectionLoop />
            </div>
          </div>
        </Container>
      </section>

      {/* COVERAGE DELTA */}
      <section id="coverage" className="py-20">
        <Container>
          <div className="max-w-3xl">
            <Eyebrow color="green">The deliverable</Eyebrow>
            <h2 className="mt-3 font-display text-3xl font-black sm:text-4xl text-balance leading-[1.05]">
              A number your board{" "}
              <span className="gradient-text">can be shown twice.</span>
            </h2>
            <p className="mt-4 text-fg-muted text-pretty leading-relaxed">
              Coverage before, coverage after, and the rules that account for the
              difference. It is the rare security engagement that produces a metric
              which genuinely moved rather than a risk that was merely described.
            </p>
          </div>
          <div className="mt-12">
            <CoverageDelta />
          </div>
        </Container>
      </section>

      {/* READINESS */}
      <section className="py-20 bg-bg-1 border-t border-line">
        <Container>
          <div className="max-w-3xl">
            <Eyebrow color="amber">Before you book</Eyebrow>
            <h2 className="mt-3 font-display text-3xl font-black sm:text-4xl text-balance leading-[1.05]">
              Three things that need to be true.{" "}
              <span className="gradient-text">We will say so if they are not.</span>
            </h2>
            <p className="mt-4 text-fg-muted text-pretty leading-relaxed">
              Purple teaming is the validate-and-tune step that comes after you have
              a SOC. If you are earlier than that, we will point you at SOC setup or
              a managed service instead of selling you this.
            </p>
          </div>
          <div className="mt-12 grid gap-5 lg:grid-cols-3">
            {READINESS.map((r) => {
              const Icon = r.icon;
              return (
                <div key={r.title} className="rounded-2xl glass p-6 h-full flex flex-col">
                  <div className="grid size-11 place-items-center rounded-xl ring-1 ring-amber-400/40 bg-amber-400/10 text-amber-300 mb-4">
                    <Icon className="size-5" />
                  </div>
                  <div className="font-display text-base font-bold text-fg leading-tight">
                    {r.title}
                  </div>
                  <p className="mt-3 text-sm text-fg-muted leading-relaxed flex-1">{r.desc}</p>
                </div>
              );
            })}
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <LinkButton href="/services/managed-soc" variant="outline">
              SOC setup &amp; SIEM engineering
            </LinkButton>
            <LinkButton href="/services/managed-security-services" variant="outline">
              Managed security services
            </LinkButton>
          </div>
        </Container>
      </section>

      {/* METHODOLOGY */}
      <section id="methodology" className="py-20">
        <Container>
          <div className="max-w-3xl">
            <Eyebrow color="purple">Methodology</Eyebrow>
            <h2 className="mt-3 font-display text-3xl font-black sm:text-4xl text-balance leading-[1.05]">
              Five phases, <span className="gradient-text">one charter.</span>
            </h2>
            <p className="mt-4 text-fg-muted text-pretty">
              Signed jointly by red, blue and IT leads before anything runs — so
              nobody is surprised, and nobody is defensive.
            </p>
          </div>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {service.methodology.map((p, i) => (
              <div key={p.phase} className="rounded-2xl glass p-6 h-full">
                <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-violet-300">
                  Phase {i + 1}
                </div>
                <div className="mt-2 font-display text-base font-bold text-fg leading-tight">
                  {p.phase.replace(/^\d+\s*·\s*/, "")}
                </div>
                <ul className="mt-4 space-y-1.5 text-[12px] text-fg-muted">
                  {p.activities.map((a) => (
                    <li key={a} className="flex gap-2">
                      <span className="text-violet-400/70 mt-1 shrink-0">▸</span>
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
          <Eyebrow color="amber">Engagement snapshots</Eyebrow>
          <h2 className="mt-3 font-display text-3xl font-black sm:text-4xl text-balance leading-[1.05]">
            One moved a metric.{" "}
            <span className="gradient-text">One found a silent failure.</span>
          </h2>
          <div className="mt-12 grid gap-6 lg:grid-cols-2">
            {service.caseStudies.map((cs, i) => (
              <div key={i} className="rounded-2xl glass p-6 flex flex-col">
                <Badge variant="purple" className="self-start">
                  {cs.industry}
                </Badge>
                <p className="mt-4 text-sm font-semibold text-fg">Scope · {cs.scope}</p>
                <p className="mt-3 text-sm text-fg-muted leading-relaxed flex-1">
                  <span className="text-violet-300 font-semibold">Result · </span>
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

      {/* TOOL STACK */}
      <section className="py-20">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12 items-end">
            <div className="lg:col-span-5">
              <Eyebrow color="cyan">Both sides of the table</Eyebrow>
              <h2 className="mt-3 font-display text-3xl font-black sm:text-4xl text-balance leading-[1.05]">
                Emulation frameworks{" "}
                <span className="gradient-text">and your rule syntax.</span>
              </h2>
              <p className="mt-5 text-fg-muted">
                Red runs adversary-emulation tooling; blue writes in whatever the
                SIEM speaks — Sigma, SPL, KQL or the Wazuh rule editor. Rules land in
                your repository, not in an appendix.
              </p>
              <div className="mt-6 flex items-center gap-2 text-sm text-fg-muted">
                <GitBranch className="size-4 shrink-0 text-violet-300" />
                <Shield className="size-4 shrink-0 text-cyan-300" />
                Everything shipped during the exercise stays yours.
              </div>
            </div>
            <div className="lg:col-span-7">
              <div className="rounded-2xl glass p-6">
                <ToolStack tools={service.toolStack.map((t) => ({ name: t }))} />
              </div>
            </div>
          </div>
        </Container>
      </section>

      <PricingTiers
        pkg={getServicePricing(service.slug, service.category)}
        contactInterest={service.title}
      />

      <DeliverablesIndustries
        service={service}
        eyebrow="Deliverables"
        heading="What you get when the exercise ends"
        tone="raised"
      />

      <TrustStrip />

      <section className="py-20">
        <Container>
          <div className="max-w-3xl">
            <Eyebrow>FAQ</Eyebrow>
            <h2 className="mt-3 font-display text-3xl font-black sm:text-4xl text-balance leading-[1.05]">
              Questions before the charter is signed.
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
