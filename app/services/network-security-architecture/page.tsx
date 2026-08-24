import {
  Network,
  CheckCircle2,
  Swords,
  DraftingCompass,
  Factory,
  CreditCard,
  Landmark,
  ArrowRight,
  Handshake,
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
import { RuleBaseCleanup } from "@/components/visuals/netarch/RuleBaseCleanup";
import { TrustZoneMap } from "@/components/visuals/netarch/TrustZoneMap";
import { AnswerBox } from "@/components/sections/AnswerBox";
import { getShortAnswer } from "@/content/shortAnswers";
import { GlossaryLinks } from "@/components/sections/GlossaryLinks";
import { References } from "@/components/sections/References";

const SLUG = "network-security-architecture";

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

const BOUNDARIES = [
  {
    icon: Factory,
    title: "IT ↔ OT",
    accent: "text-orange-300 ring-orange-400/40 bg-orange-400/10",
    desc: "IEC 62443-3-2 zones and conduits, against the practical realities of Indian manufacturing — legacy PLCs, vendor-mandated flat networks and engineering-laptop hygiene.",
  },
  {
    icon: CreditCard,
    title: "PCI cardholder data",
    accent: "text-amber-300 ring-amber-400/40 bg-amber-400/10",
    desc: "CDE scoping memo the QSA can walk end to end, with everything that touches it either in scope deliberately or segmented out provably.",
  },
  {
    icon: Landmark,
    title: "Tier-0 and crown jewels",
    accent: "text-red-300 ring-red-400/40 bg-red-400/10",
    desc: "The zone that decides whether an incident is contained or total. Reachability is proved rather than assumed, in both directions.",
  },
  {
    icon: Handshake,
    title: "Vendor, branch and BYOD",
    accent: "text-emerald-300 ring-emerald-400/40 bg-emerald-400/10",
    desc: "ZTNA design for third parties and remote sites, replacing the flat VPN that currently lands them next to production.",
  },
];

export default function NetworkArchitecturePage() {
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
              "radial-gradient(900px 620px at 25% 0%, rgba(77,124,255,0.20) 0%, transparent 62%), radial-gradient(740px 520px at 92% 90%, rgba(16,185,129,0.14) 0%, transparent 60%)",
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
            <Eyebrow>{service.hero.eyebrow}</Eyebrow>
            <div className="mt-5 flex items-center gap-4">
              <div className="grid size-14 shrink-0 place-items-center rounded-2xl bg-bg-2 ring-1 ring-blue-400/40 text-blue-300">
                <Network className="size-7" />
              </div>
              <h1 className="font-display text-4xl font-black sm:text-5xl lg:text-[3rem] text-balance leading-[1.05]">
                Network Security Architecture &amp; Segmentation in{" "}
                <span className="gradient-text">India</span>.
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
                Scope an architecture review
              </LinkButton>
              <LinkButton href="#rulebase" variant="outline" size="lg">
                See a rule-base review
              </LinkButton>
            </div>
            <div className="mt-6">
              <DownloadButton
                href="/sample-reports/cert-in-audit"
                label="See an evidence-pack format"
                sub="Segmentation · regulator-mapped"
              />
            </div>
          </div>

          <div className="mt-14 grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { v: "3–4 wk", k: "rule-base review" },
              { v: "8–10 wk", k: "segmentation design" },
              { v: "62443", k: "OT zoning standard" },
              { v: "Neutral", k: "we resell no licences" },
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

      {/* DEFENSIVE, NOT OFFENSIVE */}
      <section className="py-20 border-t border-line">
        <Container>
          <div className="grid gap-6 lg:grid-cols-2">
            <div className="rounded-2xl glass p-6">
              <div className="grid size-11 place-items-center rounded-xl ring-1 ring-blue-400/40 bg-blue-400/10 text-blue-300">
                <DraftingCompass className="size-5" />
              </div>
              <div className="mt-4 font-display text-lg font-bold text-fg">
                This service designs and reviews
              </div>
              <p className="mt-2.5 text-sm text-fg-muted leading-relaxed">
                Segmentation strategy, firewall rule-base cleanup, SASE and ZTNA
                design, OT boundary architecture and a microsegmentation roadmap.
                Nothing here is exploited — the output is drawings, rule changes and
                a rollout plan.
              </p>
            </div>
            <Link
              href="/services/network-pentesting"
              className="group rounded-2xl glass p-6 ring-1 ring-transparent transition-all hover:ring-blue-400/40"
            >
              <div className="grid size-11 place-items-center rounded-xl ring-1 ring-red-400/40 bg-red-400/10 text-red-300">
                <Swords className="size-5" />
              </div>
              <div className="mt-4 font-display text-lg font-bold text-fg group-hover:text-blue-300">
                Network penetration testing attacks it
              </div>
              <p className="mt-2.5 text-sm text-fg-muted leading-relaxed">
                The offensive counterpart. Many clients buy both — the pentest is
                what validates that the architecture work actually holds, rather
                than that it looks right on a diagram.
              </p>
              <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-blue-300">
                See the offensive service <ArrowRight className="size-4" />
              </span>
            </Link>
          </div>
        </Container>
      </section>

      {/* RULE BASE */}
      <section id="rulebase" className="py-20 bg-bg-1">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12 items-start">
            <div className="lg:col-span-4 lg:sticky lg:top-24">
              <Eyebrow color="amber">Where it starts</Eyebrow>
              <h2 className="mt-3 font-display text-3xl font-black sm:text-4xl text-balance leading-[1.05]">
                Twelve thousand rules,{" "}
                <span className="gradient-text">half of them fiction.</span>
              </h2>
              <p className="mt-5 text-fg-muted text-pretty leading-relaxed">
                Networks accrete. Two acquisitions later the rule base carries
                comments like &ldquo;temporary — 2018&rdquo;, and nobody will touch
                it because nobody can prove what breaks. Proving that is the first
                deliverable.
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
              <RuleBaseCleanup />
            </div>
          </div>
        </Container>
      </section>

      {/* TRUST ZONES */}
      <section id="zones" className="py-20">
        <Container>
          <div className="max-w-3xl">
            <Eyebrow color="green">Target state</Eyebrow>
            <h2 className="mt-3 font-display text-3xl font-black sm:text-4xl text-balance leading-[1.05]">
              Zones you can{" "}
              <span className="gradient-text">actually get to from here.</span>
            </h2>
            <p className="mt-4 text-fg-muted text-pretty leading-relaxed">
              Every segmentation deck contains a beautiful target state. The useful
              question is whether there is a sequence of change windows that reaches
              it without a Saturday-night outage.
            </p>
          </div>
          <div className="mt-12">
            <TrustZoneMap />
          </div>
        </Container>
      </section>

      {/* BOUNDARIES */}
      <section className="py-20 bg-bg-1">
        <Container>
          <div className="max-w-3xl">
            <Eyebrow color="purple">The boundaries that carry weight</Eyebrow>
            <h2 className="mt-3 font-display text-3xl font-black sm:text-4xl text-balance leading-[1.05]">
              Four lines where{" "}
              <span className="gradient-text">the audit lands.</span>
            </h2>
          </div>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {BOUNDARIES.map((b) => {
              const Icon = b.icon;
              return (
                <div key={b.title} className="rounded-2xl glass p-6 h-full flex flex-col lift">
                  <div className={`grid size-11 place-items-center rounded-xl ring-1 ${b.accent} mb-4`}>
                    <Icon className="size-5" />
                  </div>
                  <div className="font-display text-base font-bold text-fg leading-tight">
                    {b.title}
                  </div>
                  <p className="mt-3 text-[13px] text-fg-muted leading-relaxed flex-1">{b.desc}</p>
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
            <Eyebrow color="purple">Methodology</Eyebrow>
            <h2 className="mt-3 font-display text-3xl font-black sm:text-4xl text-balance leading-[1.05]">
              Discovery is passive{" "}
              <span className="gradient-text">before it is active.</span>
            </h2>
            <p className="mt-4 text-fg-muted text-pretty">
              NetFlow and span ports first, no agents required — so the topology map
              reflects what actually talks to what, not what the CMDB believes.
            </p>
          </div>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {service.methodology.map((p, i) => (
              <div key={p.phase} className="rounded-2xl glass p-6 h-full">
                <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-blue-300">
                  Phase {i + 1}
                </div>
                <div className="mt-2 font-display text-base font-bold text-fg leading-tight">
                  {p.phase.replace(/^\d+\s*·\s*/, "")}
                </div>
                <ul className="mt-4 space-y-1.5 text-[12px] text-fg-muted">
                  {p.activities.map((a) => (
                    <li key={a} className="flex gap-2">
                      <span className="text-blue-400/70 mt-1 shrink-0">▸</span>
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
            Three estates.{" "}
            <span className="gradient-text">Zero outages.</span>
          </h2>
          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {service.caseStudies.map((cs, i) => (
              <div key={i} className="rounded-2xl glass p-6 flex flex-col">
                <Badge variant="cyan" className="self-start">
                  {cs.industry}
                </Badge>
                <p className="mt-4 text-sm font-semibold text-fg">Scope · {cs.scope}</p>
                <p className="mt-3 text-sm text-fg-muted leading-relaxed flex-1">
                  <span className="text-blue-300 font-semibold">Finding · </span>
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
              <Eyebrow color="cyan">Multi-vendor by necessity</Eyebrow>
              <h2 className="mt-3 font-display text-3xl font-black sm:text-4xl text-balance leading-[1.05]">
                Your estate is{" "}
                <span className="gradient-text">already four vendors deep.</span>
              </h2>
              <p className="mt-5 text-fg-muted">
                Palo Alto, Check Point, Fortinet, Cisco ASA and FTD, Juniper SRX and
                the native cloud security groups. We do not resell firewall licences,
                which is what lets the short-list memo mean something.
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

      <PricingTiers
        pkg={getServicePricing(service.slug, service.category)}
        contactInterest={service.title}
      />

      <DeliverablesIndustries
        service={service}
        eyebrow="Deliverables"
        heading="What lands in your inbox"
        tone="raised"
      />

      <TrustStrip />

      <section className="py-20">
        <Container>
          <div className="max-w-3xl">
            <Eyebrow>FAQ</Eyebrow>
            <h2 className="mt-3 font-display text-3xl font-black sm:text-4xl text-balance leading-[1.05]">
              Questions before the first diagram.
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
