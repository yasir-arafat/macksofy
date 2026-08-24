import { Microscope, CheckCircle2, Phone } from "lucide-react";
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
import { breadcrumbSchema, faqSchema, serviceSchema, methodologyHowToSchema } from "@/lib/schema";
import { SITE } from "@/lib/site";
import { buildMetadata } from "@/lib/seo";
import { getServiceBySlug } from "@/content/services";
import { TrustStrip } from "@/components/TrustStrip";
import { DeliverablesIndustries } from "@/components/services/DeliverablesIndustries";
import { IncidentTimeline } from "@/components/visuals/dfir/IncidentTimeline";
import { ChainOfCustody } from "@/components/visuals/dfir/ChainOfCustody";
import { AnswerBox } from "@/components/sections/AnswerBox";
import { getShortAnswer } from "@/content/shortAnswers";
import { GlossaryLinks } from "@/components/sections/GlossaryLinks";
import { References } from "@/components/sections/References";
import { Methodology } from "@/components/visuals/methodology/Methodology";

const SLUG = "digital-forensics-incident-response";

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

export default function DfirPage() {
  const service = getServiceBySlug(SLUG)!;
  const sa = getShortAnswer("service:digital-forensics-incident-response");

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

      {/* HERO — emergency-style */}
      <section className="relative isolate overflow-hidden">
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(900px 600px at 20% 0%, rgba(239,68,68,0.18) 0%, transparent 60%), radial-gradient(700px 500px at 100% 100%, rgba(0,229,255,0.18) 0%, transparent 60%)",
          }}
        />
        <ParticleBackground density={50} />
        <Container className="relative pt-10 pb-16">
          <Breadcrumbs
            items={[
              { name: "Services", href: "/services" },
              { name: service.shortTitle, href: `/services/${service.slug}` },
            ]}
          />
          <div className="mt-12 max-w-4xl">
            <div className="inline-flex items-center gap-2 rounded-full bg-red-500/15 ring-1 ring-red-400/40 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.22em] text-red-300">
              <span className="relative flex size-1.5">
                <span className="absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75 animate-ping" />
                <span className="relative inline-flex size-1.5 rounded-full bg-red-400" />
              </span>
              24×7 IR hotline · 30-min bridge SLA
            </div>
            <div className="mt-5 flex items-center gap-4">
              <div className="grid size-14 place-items-center rounded-2xl bg-bg-2 ring-1 ring-red-400/40 text-red-400">
                <Microscope className="size-7" />
              </div>
              <h1 className="font-display text-4xl font-black sm:text-5xl lg:text-[3.4rem] text-balance leading-[1.05]">
                When the worst happens, <span className="gradient-text">every minute matters.</span>
              </h1>
            </div>
            <p className="mt-6 max-w-2xl text-lg text-fg-muted text-pretty leading-relaxed">
              {service.hero.description}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <LinkButton href="tel:+919930824239" size="lg">
                <Phone className="size-4 mr-2 inline" />Call IR hotline
              </LinkButton>
              <LinkButton href="/contact?interest=DFIR%20Retainer" variant="outline" size="lg">
                Discuss retainer
              </LinkButton>
            </div>
          </div>

          {/* SLA tiles */}
          <div className="mt-14 grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { v: "30 min", k: "bridge for retainer clients" },
              { v: "2 h", k: "bridge for new clients" },
              { v: "24 h", k: "team on-ground (India + UAE)" },
              { v: "6 h", k: "CERT-In incident format" },
            ].map((m) => (
              <div key={m.k} className="rounded-2xl glass p-5">
                <div className="font-display text-3xl font-black text-red-400 leading-none">
                  {m.v}
                </div>
                <div className="mt-2 font-mono text-[10px] uppercase tracking-[0.2em] text-fg-faint leading-snug">
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

      {/* IR TIMELINE */}
      <section className="py-20 bg-bg-1">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12 items-start">
            <div className="lg:col-span-4 lg:sticky lg:top-24">
              <Eyebrow color="amber">Incident timeline</Eyebrow>
              <h2 className="mt-3 font-display text-3xl font-black sm:text-4xl text-balance leading-[1.05]">
                <span className="gradient-text">T+0 → T+7d.</span> Every minute documented.
              </h2>
              <p className="mt-5 text-fg-muted text-pretty">
                Anonymised composite from the typical Macksofy ransomware engagement —
                what happens at each clock-tick from the moment your CISO hits the hotline.
              </p>
              <ul className="mt-6 space-y-2 text-sm">
                {service.businessImpact.map((b) => (
                  <li key={b} className="flex gap-3">
                    <CheckCircle2 className="size-5 text-red-400 shrink-0 mt-0.5" />
                    <span className="text-fg-muted leading-relaxed">{b}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="lg:col-span-8">
              <IncidentTimeline />
            </div>
          </div>
        </Container>
      </section>

      {/* CHAIN OF CUSTODY */}
      <section className="py-20">
        <Container>
          <div className="max-w-3xl">
            <Eyebrow>Chain of custody</Eyebrow>
            <h2 className="mt-3 font-display text-3xl font-black sm:text-4xl text-balance leading-[1.05]">
              Evidence that <span className="gradient-text">survives court</span>.
            </h2>
            <p className="mt-4 text-fg-muted text-pretty">
              Every forensic artifact gets a SHA-256, a custodian signature and an
              encrypted storage chain — accepted by Indian courts, RBI investigations,
              CERT-In and cyber-insurance arbitrators.
            </p>
          </div>
          <div className="mt-12">
            <ChainOfCustody />
          </div>
        </Container>
      </section>

      {/* CASE STUDIES */}
      <section className="py-20 bg-bg-1">
        <Container>
          <Eyebrow color="amber">Engagement snapshot</Eyebrow>
          <h2 className="mt-3 font-display text-3xl font-black sm:text-4xl text-balance leading-[1.05]">
            <span className="gradient-text">Ransomware</span> · BEC · insider threat.
          </h2>
          <div className="mt-12 grid gap-6 lg:grid-cols-2">
            {service.caseStudies.map((cs, i) => (
              <div key={i} className="rounded-2xl glass p-6 flex flex-col lift">
                <Badge variant="cyan" className="self-start">{cs.industry}</Badge>
                <p className="mt-3 text-sm font-semibold text-fg">{cs.scope}</p>
                <p className="mt-3 text-sm text-fg-muted leading-relaxed flex-1">
                  <span className="text-red-400 font-semibold">Root cause · </span>{cs.finding}
                </p>
                <p className="mt-3 text-sm text-fg-muted">{cs.impact}</p>
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
              <Eyebrow>Forensic toolchain</Eyebrow>
              <h2 className="mt-3 font-display text-3xl font-black sm:text-4xl text-balance leading-[1.05]">
                Volatility · Plaso. <span className="gradient-text">Real DFIR tools</span>.
              </h2>
            </div>
            <div className="lg:col-span-7">
              <div className="rounded-2xl glass p-6">
                <ToolStack tools={service.toolStack.map((t) => ({ name: t }))} />
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Renders service.methodology, which the page's HowTo schema already
          describes and links to as #methodology — previously that anchor did
          not exist and none of these activities appeared on the page. */}
      <section id="methodology" className="py-20">
        <Container>
          <div className="max-w-3xl">
            <Eyebrow>Investigation methodology</Eyebrow>
            <h2 className="mt-3 font-display text-3xl font-black sm:text-4xl text-balance leading-[1.05]">
              Every hour accounted for.
            </h2>
          </div>
          <div className="mt-10">
            <Methodology
              slug={SLUG}
              phases={service.methodology}
              subjectLabel={service.shortTitle}
            />
          </div>
        </Container>
      </section>

      <DeliverablesIndustries
        service={service}
        eyebrow="Deliverables"
        heading="What you get when the incident closes"
        tone="raised"
      />

      <TrustStrip />

      <section className="py-20 bg-bg-1">
        <Container>
          <div className="max-w-3xl">
            <Eyebrow>FAQ</Eyebrow>
            <h2 className="mt-3 font-display text-3xl font-black sm:text-4xl text-balance leading-[1.05]">
              When the call comes in.
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

      <References pageKey="service:digital-forensics-incident-response" />
      <GlossaryLinks href="/services/digital-forensics-incident-response" />
      <LeadCapture />
    </>
  );
}
