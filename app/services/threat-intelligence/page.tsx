import { Radar, CheckCircle2 } from "lucide-react";
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
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema, faqSchema, serviceSchema } from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";
import { getServiceBySlug } from "@/content/services";
import { TrustStrip } from "@/components/TrustStrip";
import { AptActorCards } from "@/components/visuals/intel/AptActorCards";
import { IocFeedTicker } from "@/components/visuals/intel/IocFeedTicker";

const SLUG = "threat-intelligence";

export async function generateMetadata() {
  const s = getServiceBySlug(SLUG);
  if (!s) return {};
  return buildMetadata({
    title: s.seoTitle,
    description: s.seoDescription,
    path: `/services/${s.slug}`,
    keywords: s.keywords,
  });
}

export default function ThreatIntelPage() {
  const service = getServiceBySlug(SLUG)!;

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
        ]}
      />

      {/* HERO */}
      <section className="relative isolate overflow-hidden">
        <ParticleBackground density={70} />
        <GlowOrb className="-top-40 left-1/4" color="purple" size={520} />
        <GlowOrb className="-bottom-20 right-1/4" color="cyan" size={400} />
        <Container className="relative pt-10 pb-20">
          <Breadcrumbs
            items={[
              { name: "Services", href: "/services" },
              { name: service.shortTitle, href: `/services/${service.slug}` },
            ]}
          />
          <div className="mt-10 grid gap-12 lg:grid-cols-12 items-center">
            <div className="lg:col-span-5">
              <Eyebrow>{service.hero.eyebrow}</Eyebrow>
              <div className="mt-5 flex items-center gap-4">
                <div className="grid size-14 place-items-center rounded-2xl bg-bg-2 ring-1 ring-violet-400/40 text-violet-300">
                  <Radar className="size-7" />
                </div>
                <h1 className="font-display text-4xl font-black sm:text-5xl lg:text-[3.4rem] text-balance leading-[1.05]">
                  Move from <span className="gradient-text">reactive defense</span> to proactive hunting.
                </h1>
              </div>
              <p className="mt-6 max-w-2xl text-lg text-fg-muted text-pretty leading-relaxed">
                {service.hero.description}
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <LinkButton href="/contact?interest=Threat%20Intelligence" size="lg" withArrow>
                  Discuss intel program
                </LinkButton>
                <LinkButton href="#actors" variant="outline" size="lg">
                  See threat landscape
                </LinkButton>
              </div>
            </div>
            <div className="lg:col-span-7">
              <IocFeedTicker />
            </div>
          </div>
        </Container>
      </section>

      {/* APT ACTORS */}
      <section id="actors" className="py-20 bg-bg-1">
        <Container>
          <div className="max-w-3xl">
            <Eyebrow color="amber">Threat-actor profiling</Eyebrow>
            <h2 className="mt-3 font-display text-3xl font-black sm:text-4xl text-balance leading-[1.05]">
              Know who's <span className="gradient-text">actually</span> targeting your industry.
            </h2>
            <p className="mt-4 text-fg-muted text-pretty">
              A real threat-intel program profiles the adversaries your sector faces — not
              the headline-of-the-week APT. Sample profiles from the live Macksofy threat
              landscape briefing.
            </p>
          </div>
          <div className="mt-12">
            <AptActorCards />
          </div>
        </Container>
      </section>

      {/* PROGRAM SHAPE */}
      <section className="py-20">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-6">
              <Eyebrow>Diamond + Kill Chain</Eyebrow>
              <h2 className="mt-3 font-display text-3xl font-black sm:text-4xl text-balance leading-[1.05]">
                Intel that <span className="gradient-text">your SOC actually uses</span>.
              </h2>
              <p className="mt-5 text-fg-muted text-pretty leading-relaxed">
                Most TI programs are RSS readers in a trench coat. Macksofy starts from
                Intelligence Requirements (IRs) tied to your business, defines a real
                collection plan, processes through Diamond model + Kill Chain, then
                dissseminates in formats your SOC, IR team and execs act on.
              </p>
              <ul className="mt-6 space-y-2 text-sm">
                {service.businessImpact.map((b) => (
                  <li key={b} className="flex gap-3">
                    <CheckCircle2 className="size-5 text-violet-300 shrink-0 mt-0.5" />
                    <span className="text-fg-muted leading-relaxed">{b}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="lg:col-span-6">
              <div className="grid grid-cols-2 gap-3">
                {[
                  { v: "Strategic", k: "Quarterly board briefings, threat landscape" },
                  { v: "Operational", k: "Campaign tracking, IR matrix, monthly" },
                  { v: "Tactical", k: "Curated IOC feeds → SIEM/firewall/EDR" },
                  { v: "Technical", k: "Malware reports, YARA rules, IR playbooks" },
                ].map((m) => (
                  <div key={m.v} className="rounded-2xl glass p-5">
                    <div className="font-display text-lg font-black gradient-text">
                      {m.v}
                    </div>
                    <div className="mt-2 text-[12px] text-fg-muted leading-snug">{m.k}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* CASE STUDIES */}
      <section className="py-20 bg-bg-1">
        <Container>
          <Eyebrow color="amber">Engagement snapshot</Eyebrow>
          <h2 className="mt-3 font-display text-3xl font-black sm:text-4xl text-balance leading-[1.05]">
            How a <span className="gradient-text">real intel program</span> earns its budget.
          </h2>
          <div className="mt-12 grid gap-6 lg:grid-cols-2">
            {service.caseStudies.map((cs, i) => (
              <div key={i} className="rounded-2xl glass p-6 flex flex-col lift">
                <Badge variant="cyan" className="self-start">{cs.industry}</Badge>
                <p className="mt-3 text-sm font-semibold text-fg">{cs.scope}</p>
                <p className="mt-3 text-sm text-fg-muted leading-relaxed flex-1">
                  <span className="text-violet-300 font-semibold">Outcome · </span>{cs.finding}
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
              <Eyebrow>Platform</Eyebrow>
              <h2 className="mt-3 font-display text-3xl font-black sm:text-4xl text-balance leading-[1.05]">
                MISP. OpenCTI. <span className="gradient-text">Open by default</span>.
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

      <TrustStrip />

      <section className="py-20 bg-bg-1">
        <Container>
          <div className="max-w-3xl">
            <Eyebrow>FAQ</Eyebrow>
            <h2 className="mt-3 font-display text-3xl font-black sm:text-4xl text-balance leading-[1.05]">
              Building a TI program.
            </h2>
            <div className="mt-10">
              <FAQAccordion faqs={service.faqs} />
            </div>
          </div>
        </Container>
      </section>

      <LeadCapture />
    </>
  );
}
