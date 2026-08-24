import {
  ShieldCheck,
  CheckCircle2,
  MapPin,
  Timer,
  FileCheck2,
  Unlock,
  ArrowRight,
  Layers,
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
import { DeliverablesIndustries } from "@/components/services/DeliverablesIndustries";
import { SocPod } from "@/components/visuals/mss/SocPod";
import { CoSourceSplit } from "@/components/visuals/mss/CoSourceSplit";
import { AnswerBox } from "@/components/sections/AnswerBox";
import { getShortAnswer } from "@/content/shortAnswers";
import { GlossaryLinks } from "@/components/sections/GlossaryLinks";
import { References } from "@/components/sections/References";

const SLUG = "managed-security-services";

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

const PILLARS = [
  {
    icon: Unlock,
    title: "You keep the SIEM",
    desc: "It runs in your tenancy, on your data, with detection content you own. Ending the contract does not end the capability — that is the difference between outsourcing and renting.",
  },
  {
    icon: MapPin,
    title: "India data residency",
    desc: "For CERT-In, RBI and SEBI-regulated clients the full stack runs in-country, with data-localisation evidence produced on request.",
  },
  {
    icon: Timer,
    title: "Coverage in 30–60 days",
    desc: "Onboarding, not an 18-month hiring cycle. The baseline period exists so the MTTD and MTTR improvement is measured rather than asserted.",
  },
  {
    icon: FileCheck2,
    title: "Reporting auditors accept",
    desc: "Monthly operations report and a quarterly business review, in the format CERT-In, RBI, SEBI, ISO 27001 and SOC 2 reviewers take as-is.",
  },
];

const NEIGHBOURS = [
  {
    href: "/services/managed-soc",
    title: "SOC setup & SIEM engineering",
    desc: "The one-time build. Many clients buy this first, then transition into MSS for the run state — the contracts integrate cleanly.",
  },
  {
    href: "/services/purple-teaming",
    title: "Purple team exercises",
    desc: "Validates the detection coverage this service operates, and ships tuned rules while your analysts watch.",
  },
  {
    href: "/services/digital-forensics-incident-response",
    title: "DFIR",
    desc: "The retainer hours already rolled into this contract, available standalone if you need forensics without the run-state service.",
  },
];

export default function MssPage() {
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
              "radial-gradient(900px 620px at 85% 0%, rgba(16,185,129,0.18) 0%, transparent 62%), radial-gradient(760px 520px at 10% 92%, rgba(0,229,255,0.16) 0%, transparent 60%)",
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
                <ShieldCheck className="size-7" />
              </div>
              <h1 className="font-display text-4xl font-black sm:text-5xl lg:text-[3.2rem] text-balance leading-[1.05]">
                Managed Security Services in{" "}
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
                Request an MSS proposal
              </LinkButton>
              <LinkButton href="#pod" variant="outline" size="lg">
                See the pod &amp; SLAs
              </LinkButton>
            </div>
            <div className="mt-6">
              <DownloadButton
                href="/sample-reports/cert-in-audit"
                label="See a monthly operations report"
                sub="Anonymised · MTTD / MTTR format"
              />
            </div>
          </div>

          <div className="mt-14 grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { v: "24×7", k: "monitoring cover" },
              { v: "15 min", k: "tier-1 triage SLA" },
              { v: "30–60d", k: "onboarding to cover" },
              { v: "12 mo", k: "minimum engagement" },
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

      {/* PILLARS */}
      <section className="py-20 border-t border-line">
        <Container>
          <div className="max-w-3xl">
            <Eyebrow color="green">What makes this different</Eyebrow>
            <h2 className="mt-3 font-display text-3xl font-black sm:text-4xl text-balance leading-[1.05]">
              An MSSP you can{" "}
              <span className="gradient-text">walk away from.</span>
            </h2>
            <p className="mt-4 text-fg-muted text-pretty leading-relaxed">
              The usual MSSP trade is cheaper operations in exchange for a
              capability you can never take back in-house. We do not structure it
              that way, and the four points below are why.
            </p>
          </div>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {PILLARS.map((p) => {
              const Icon = p.icon;
              return (
                <div key={p.title} className="rounded-2xl glass p-6 h-full flex flex-col">
                  <div className="grid size-11 place-items-center rounded-xl ring-1 ring-emerald-400/40 bg-emerald-400/10 text-emerald-300 mb-4">
                    <Icon className="size-5" />
                  </div>
                  <div className="font-display text-base font-bold text-fg leading-tight">
                    {p.title}
                  </div>
                  <p className="mt-3 text-sm text-fg-muted leading-relaxed flex-1">{p.desc}</p>
                </div>
              );
            })}
          </div>
        </Container>
      </section>

      {/* THE POD */}
      <section id="pod" className="py-20 bg-bg-1">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12 items-start">
            <div className="lg:col-span-4 lg:sticky lg:top-24">
              <Eyebrow color="cyan">The team you are buying</Eyebrow>
              <h2 className="mt-3 font-display text-3xl font-black sm:text-4xl text-balance leading-[1.05]">
                Four tiers,{" "}
                <span className="gradient-text">one accountable provider.</span>
              </h2>
              <p className="mt-5 text-fg-muted text-pretty leading-relaxed">
                Most mid-market teams run two to four engineers against a couple of
                hundred assets across cloud, on-prem and SaaS. This is the pod that
                sits behind them.
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
              <SocPod />
            </div>
          </div>
        </Container>
      </section>

      {/* CO-SOURCE */}
      <section id="split" className="py-20">
        <Container>
          <div className="max-w-3xl">
            <Eyebrow color="purple">Fully managed or co-managed</Eyebrow>
            <h2 className="mt-3 font-display text-3xl font-black sm:text-4xl text-balance leading-[1.05]">
              Keep what your team is{" "}
              <span className="gradient-text">genuinely better at.</span>
            </h2>
            <p className="mt-4 text-fg-muted text-pretty leading-relaxed">
              Your engineers know which server matters at quarter-end. We know what
              a Cobalt Strike beacon looks like at 3 a.m. Co-managed splits on that
              line, and pricing scales with the split.
            </p>
          </div>
          <div className="mt-12">
            <CoSourceSplit />
          </div>
        </Container>
      </section>

      {/* METHODOLOGY */}
      <section id="methodology" className="py-20 bg-bg-1">
        <Container>
          <div className="max-w-3xl">
            <Eyebrow color="purple">How onboarding runs</Eyebrow>
            <h2 className="mt-3 font-display text-3xl font-black sm:text-4xl text-balance leading-[1.05]">
              Baseline first,{" "}
              <span className="gradient-text">so the improvement is measurable.</span>
            </h2>
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

      {/* CASE STUDIES */}
      <section className="py-20">
        <Container>
          <Eyebrow color="amber">Engagement snapshots</Eyebrow>
          <h2 className="mt-3 font-display text-3xl font-black sm:text-4xl text-balance leading-[1.05]">
            What the run state{" "}
            <span className="gradient-text">actually caught.</span>
          </h2>
          <div className="mt-12 grid gap-6 lg:grid-cols-2">
            {service.caseStudies.map((cs, i) => (
              <div key={i} className="rounded-2xl glass p-6 flex flex-col">
                <Badge variant="green" className="self-start">
                  {cs.industry}
                </Badge>
                <p className="mt-4 text-sm font-semibold text-fg">Scope · {cs.scope}</p>
                <p className="mt-3 text-sm text-fg-muted leading-relaxed flex-1">
                  <span className="text-emerald-300 font-semibold">Result · </span>
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
      <section className="py-20 bg-bg-1">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12 items-end">
            <div className="lg:col-span-5">
              <Eyebrow color="cyan">Stack</Eyebrow>
              <h2 className="mt-3 font-display text-3xl font-black sm:text-4xl text-balance leading-[1.05]">
                Open-source where it wins.{" "}
                <span className="gradient-text">Your licences where you have them.</span>
              </h2>
              <p className="mt-5 text-fg-muted">
                Wazuh and ELK carry a lot of mid-market estates well. Where you have
                already bought Splunk, Sentinel, QRadar, CrowdStrike or SentinelOne,
                we operate inside those rather than migrating you for our own
                convenience.
              </p>
              <div className="mt-6 flex items-center gap-2 text-sm text-fg-muted">
                <Layers className="size-4 shrink-0 text-emerald-300" />
                SOAR playbooks are built per client, not shipped as a template.
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

      {/* NEIGHBOURS */}
      <section className="py-20">
        <Container>
          <Eyebrow color="purple">Where this sits</Eyebrow>
          <h2 className="mt-3 font-display text-3xl font-black sm:text-4xl text-balance leading-[1.05]">
            Build it, run it, <span className="gradient-text">then test it.</span>
          </h2>
          <div className="mt-10 grid gap-5 sm:grid-cols-3">
            {NEIGHBOURS.map((n) => (
              <Link
                key={n.href}
                href={n.href}
                className="group rounded-2xl glass p-6 ring-1 ring-transparent hover:ring-emerald-400/40 transition-all"
              >
                <h3 className="font-display text-base font-bold text-fg group-hover:text-emerald-300">
                  {n.title}
                </h3>
                <p className="mt-2.5 text-sm text-fg-muted leading-relaxed">{n.desc}</p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-emerald-300">
                  Learn more <ArrowRight className="size-4" />
                </span>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      {/* RETAINER CTA */}
      <section className="py-20 bg-bg-1">
        <Container>
          <div className="relative overflow-hidden rounded-3xl glass-strong p-10 sm:p-14 text-center glow-blend">
            <GlowOrb className="-top-20 left-1/2 -translate-x-1/2" color="cyan" size={420} />
            <div className="relative">
              <Eyebrow color="green">Predictable monthly retainer</Eyebrow>
              <h2 className="mt-4 font-display text-3xl font-black sm:text-4xl lg:text-5xl text-balance leading-[1.05]">
                Outsourced security operations,{" "}
                <span className="gradient-text">priced like a utility.</span>
              </h2>
              <p className="mt-5 mx-auto max-w-2xl text-fg-muted text-pretty">
                MSS pricing scales with monitored asset count, log volume and
                required SLA. 12-month minimum, billed monthly. Share your
                environment size and we&rsquo;ll send a tier-based proposal within 5
                working days.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <LinkButton
                  href={`/contact?interest=${encodeURIComponent(service.title)}`}
                  size="lg"
                  withArrow
                >
                  Request an MSS proposal
                </LinkButton>
                <LinkButton href="#split" variant="outline" size="lg">
                  Compare managed vs co-managed
                </LinkButton>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <DeliverablesIndustries
        service={service}
        eyebrow="What's included"
        heading="What the retainer covers"
        tone="plain"
      />

      <TrustStrip />

      <section className="py-20">
        <Container>
          <div className="max-w-3xl">
            <Eyebrow>FAQ</Eyebrow>
            <h2 className="mt-3 font-display text-3xl font-black sm:text-4xl text-balance leading-[1.05]">
              The questions procurement asks.
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
