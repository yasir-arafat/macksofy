import { Activity, CheckCircle2 } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/SectionTitle";
import { Badge } from "@/components/ui/Badge";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { LinkButton } from "@/components/ui/Button";
import { ParticleBackground } from "@/components/visuals/ParticleBackground";
import { GlowOrb } from "@/components/visuals/GlowOrb";
import { ToolStack } from "@/components/visuals/ToolStack";
import { ComplianceMatrix } from "@/components/visuals/ComplianceMatrix";
import { FAQAccordion } from "@/components/sections/FAQAccordion";
import { LeadCapture } from "@/components/home/LeadCapture";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema, faqSchema, serviceSchema, methodologyHowToSchema } from "@/lib/schema";
import { SITE } from "@/lib/site";
import { buildMetadata } from "@/lib/seo";
import { getServiceBySlug } from "@/content/services";
import { TrustStrip } from "@/components/TrustStrip";
import { SiemDashboard } from "@/components/visuals/soc/SiemDashboard";
import { AlertFunnel } from "@/components/visuals/soc/AlertFunnel";

const SLUG = "managed-soc";

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

export default function ManagedSocPage() {
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
          methodologyHowToSchema({
            subjectLabel: service.shortTitle,
            url: `${SITE.url}/services/${service.slug}#methodology`,
            phases: service.methodology,
          }),
        ]}
      />

      {/* HERO */}
      <section className="relative isolate overflow-hidden">
        <ParticleBackground density={60} />
        <GlowOrb className="-top-40 left-1/4" color="cyan" size={500} />
        <GlowOrb className="-bottom-20 right-1/4" color="purple" size={400} />
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
                <div className="grid size-14 place-items-center rounded-2xl bg-bg-2 ring-1 ring-emerald-400/30 text-emerald-400">
                  <Activity className="size-7" />
                </div>
                <h1 className="font-display text-4xl font-black sm:text-5xl lg:text-[3.4rem] text-balance leading-[1.05]">
                  A SOC that detects what <span className="gradient-text">matters</span>.
                </h1>
              </div>
              <p className="mt-6 max-w-2xl text-lg text-fg-muted text-pretty leading-relaxed">
                {service.hero.description}
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <LinkButton href="/contact?interest=Managed%20SOC" size="lg" withArrow>
                  Discuss your SOC
                </LinkButton>
                <LinkButton href="#funnel" variant="outline" size="lg">
                  See alert math
                </LinkButton>
              </div>
            </div>
            <div className="lg:col-span-7">
              <SiemDashboard />
            </div>
          </div>
        </Container>
      </section>

      {/* WHY WAZUH */}
      <section className="py-20 bg-bg-1">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-6">
              <Eyebrow color="purple">Stack-agnostic</Eyebrow>
              <h2 className="mt-3 font-display text-3xl font-black sm:text-4xl text-balance leading-[1.05]">
                Wazuh + ELK. <span className="gradient-text">Splunk. Sentinel.</span>
              </h2>
              <p className="mt-5 text-fg-muted leading-relaxed">
                We work in your stack, not ours. For mid-market BFSI seeking 24×7 monitoring
                without the Splunk price tag, Wazuh + ELK on India-resident infrastructure
                is genuinely production-grade.
              </p>
              <ul className="mt-6 space-y-2">
                {service.businessImpact.map((b) => (
                  <li key={b} className="flex gap-3 text-sm">
                    <CheckCircle2 className="size-5 text-emerald-400 shrink-0 mt-0.5" />
                    <span className="text-fg-muted leading-relaxed">{b}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="lg:col-span-6">
              <div className="grid grid-cols-2 gap-3">
                {[
                  { name: "Wazuh", tag: "open-source · India-resident", primary: true },
                  { name: "Elastic", tag: "search · TSDB · ML", primary: true },
                  { name: "Splunk ES", tag: "enterprise · CIM", primary: false },
                  { name: "Sentinel", tag: "Microsoft 365 native", primary: false },
                  { name: "TheHive", tag: "case mgmt", primary: false },
                  { name: "MISP", tag: "threat intel", primary: false },
                ].map((s) => (
                  <div
                    key={s.name}
                    className={`rounded-xl glass p-4 ${
                      s.primary ? "ring-1 ring-emerald-400/40" : ""
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className={`font-display font-bold ${s.primary ? "text-emerald-400" : "text-fg"}`}>
                        {s.name}
                      </div>
                      {s.primary && (
                        <span className="font-mono text-[8px] uppercase tracking-wider text-emerald-400 bg-emerald-500/10 ring-1 ring-emerald-400/30 px-1.5 py-0.5 rounded">
                          preferred
                        </span>
                      )}
                    </div>
                    <div className="mt-1.5 font-mono text-[10px] uppercase tracking-wider text-fg-faint">
                      {s.tag}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ALERT FUNNEL */}
      <section id="funnel" className="py-20">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12 items-end">
            <div className="lg:col-span-6">
              <Eyebrow>The triage funnel</Eyebrow>
              <h2 className="mt-3 font-display text-3xl font-black sm:text-4xl text-balance leading-[1.05]">
                <span className="gradient-text">12.4M events</span> → 2 escalations.
              </h2>
            </div>
            <div className="lg:col-span-6">
              <p className="text-fg-muted text-pretty leading-relaxed">
                A real Macksofy MDR shift on a typical BFSI estate. Events get aggressively
                deduplicated, correlated, then human-analyst-triaged before reaching the
                client CISO inbox.
              </p>
            </div>
          </div>
          <div className="mt-12">
            <AlertFunnel />
          </div>
        </Container>
      </section>

      {/* DELIVERABLES */}
      <section className="py-20 bg-bg-1">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <Eyebrow>What ships at handover</Eyebrow>
              <h3 className="mt-3 font-display text-2xl font-black sm:text-3xl">
                Build deliverables
              </h3>
              <ul className="mt-6 grid sm:grid-cols-2 gap-x-8 gap-y-3">
                {service.deliverables.map((d) => (
                  <li key={d} className="flex gap-3 text-sm">
                    <CheckCircle2 className="size-5 text-neon-cyan shrink-0 mt-0.5" />
                    <span className="text-fg-muted leading-relaxed">{d}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="lg:col-span-5">
              <Eyebrow color="purple">Industries</Eyebrow>
              <h3 className="mt-3 font-display text-2xl font-black sm:text-3xl">
                Sectors we operate in
              </h3>
              <div className="mt-6 flex flex-wrap gap-2">
                {service.industriesServed.map((i) => (
                  <Badge key={i} variant="outline">{i}</Badge>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* TOOL STACK */}
      <section className="py-20">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12 items-end">
            <div className="lg:col-span-5">
              <Eyebrow>Toolchain</Eyebrow>
              <h2 className="mt-3 font-display text-3xl font-black sm:text-4xl text-balance leading-[1.05]">
                Best-in-class <span className="gradient-text">open-source</span>.
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

      <section className="py-20 bg-bg-1">
        <Container>
          <div className="max-w-3xl">
            <Eyebrow>Compliance evidence</Eyebrow>
            <h2 className="mt-3 font-display text-3xl font-black sm:text-4xl text-balance leading-[1.05]">
              Logs that <span className="gradient-text">satisfy regulators</span>.
            </h2>
          </div>
          <div className="mt-12">
            <ComplianceMatrix />
          </div>
        </Container>
      </section>

      <TrustStrip />

      <section className="py-20">
        <Container>
          <div className="max-w-3xl">
            <Eyebrow>FAQ</Eyebrow>
            <h2 className="mt-3 font-display text-3xl font-black sm:text-4xl text-balance leading-[1.05]">
              Questions before SIEM rollout.
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
