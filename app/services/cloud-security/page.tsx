import { Cloud, CheckCircle2 } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/SectionTitle";
import { Badge } from "@/components/ui/Badge";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { LinkButton } from "@/components/ui/Button";
import { ParticleBackground } from "@/components/visuals/ParticleBackground";
import { GlowOrb } from "@/components/visuals/GlowOrb";
import { ToolStack } from "@/components/visuals/ToolStack";
import { ComplianceMatrix } from "@/components/visuals/ComplianceMatrix";
import { RiskMeter } from "@/components/visuals/RiskMeter";
import { FAQAccordion } from "@/components/sections/FAQAccordion";
import { LeadCapture } from "@/components/home/LeadCapture";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema, faqSchema, serviceSchema } from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";
import { getServiceBySlug } from "@/content/services";
import { TrustStrip } from "@/components/TrustStrip";
import { CloudArchitecture } from "@/components/visuals/cloud/CloudArchitecture";
import { IamBlastRadius } from "@/components/visuals/cloud/IamBlastRadius";

const SLUG = "cloud-security";

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

export default function CloudSecurityPage() {
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
        <ParticleBackground density={60} />
        <GlowOrb className="-top-40 left-1/3" color="cyan" size={520} />
        <GlowOrb className="-bottom-20 right-1/4" color="purple" size={420} />
        <Container className="relative pt-10 pb-20">
          <Breadcrumbs
            items={[
              { name: "Services", href: "/services" },
              { name: service.shortTitle, href: `/services/${service.slug}` },
            ]}
          />
          <div className="mt-10 grid gap-12 lg:grid-cols-12 items-center">
            <div className="lg:col-span-7">
              <Eyebrow>{service.hero.eyebrow}</Eyebrow>
              <div className="mt-5 flex items-center gap-4">
                <div className="grid size-14 place-items-center rounded-2xl bg-bg-2 ring-1 ring-sky-400/30 text-sky-300">
                  <Cloud className="size-7" />
                </div>
                <h1 className="font-display text-4xl font-black sm:text-5xl lg:text-[3.4rem] text-balance leading-[1.05]">
                  Cloud-native attacks demand <span className="gradient-text">cloud-native testing</span>.
                </h1>
              </div>
              <p className="mt-6 max-w-2xl text-lg text-fg-muted text-pretty leading-relaxed">
                {service.hero.description}
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <LinkButton href="/contact?interest=Cloud%20Security" size="lg" withArrow>
                  Request a quote
                </LinkButton>
                <LinkButton href="#architecture" variant="outline" size="lg">
                  See coverage
                </LinkButton>
              </div>
            </div>
            <div className="lg:col-span-5">
              <IamBlastRadius />
            </div>
          </div>
        </Container>
      </section>

      {/* CIS BENCHMARK ARCHITECTURE */}
      <section id="architecture" className="py-20 bg-bg-1">
        <Container>
          <div className="max-w-3xl">
            <Eyebrow>Sample posture report</Eyebrow>
            <h2 className="mt-3 font-display text-3xl font-black sm:text-4xl text-balance leading-[1.05]">
              <span className="gradient-text">3 clouds.</span> 12 services. 13 findings.
            </h2>
            <p className="mt-4 text-fg-muted text-pretty">
              Composite from a 2025 assessment of a Series-B SaaS running multi-cloud across
              AWS, Azure and GCP. Each tile maps to CIS benchmarks + provider best practice.
            </p>
          </div>
          <div className="mt-12">
            <CloudArchitecture />
          </div>
        </Container>
      </section>

      {/* IAM PRIVESC */}
      <section className="py-20">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12 items-center">
            <div className="lg:col-span-6">
              <Eyebrow color="amber">IAM blast radius</Eyebrow>
              <h2 className="mt-3 font-display text-3xl font-black sm:text-4xl text-balance leading-[1.05]">
                One overscoped role = <span className="gradient-text">five privesc paths</span>.
              </h2>
              <p className="mt-5 text-fg-muted leading-relaxed text-pretty">
                Cloud breaches almost never need a CVE. The Lambda execution role with
                <code className="font-mono text-xs text-amber-300 mx-1">s3:*</code> +
                <code className="font-mono text-xs text-amber-300 mx-1">iam:PassRole *</code>
                is what turns a single SSRF into AWS account takeover.
              </p>
              <ul className="mt-6 space-y-2 text-sm">
                {service.businessImpact.map((b) => (
                  <li key={b} className="flex gap-3">
                    <CheckCircle2 className="size-5 text-sky-300 shrink-0 mt-0.5" />
                    <span className="text-fg-muted leading-relaxed">{b}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="lg:col-span-6">
              <div className="rounded-2xl glass p-6 sm:p-8 grid grid-cols-2 gap-3">
                {[
                  { v: "47%", k: "of cloud breaches start with IAM misconfig" },
                  { v: "≤24h", k: "from SSRF to AWS root via Pacu chain" },
                  { v: "0", k: "CVEs needed for typical cloud privesc" },
                  { v: "100%", k: "engagements include K8s + IaC review" },
                ].map((m) => (
                  <div key={m.k} className="rounded-xl ring-1 ring-line bg-bg-1/40 p-4">
                    <div className="font-display text-2xl font-black gradient-text leading-none">
                      {m.v}
                    </div>
                    <div className="mt-2 text-[11px] text-fg-muted leading-snug">{m.k}</div>
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
            What we found in <span className="gradient-text">your provider's defaults</span>.
          </h2>
          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {service.caseStudies.map((cs, i) => (
              <div key={i} className="rounded-2xl glass p-6 flex flex-col lift">
                <Badge variant="cyan" className="self-start">{cs.industry}</Badge>
                <p className="mt-3 text-sm font-semibold text-fg">{cs.scope}</p>
                <p className="mt-3 text-sm text-fg-muted leading-relaxed flex-1">
                  <span className="text-amber-300 font-semibold">Finding · </span>{cs.finding}
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
              <Eyebrow>Cloud-native tooling</Eyebrow>
              <h2 className="mt-3 font-display text-3xl font-black sm:text-4xl text-balance leading-[1.05]">
                Pacu. Prowler. <span className="gradient-text">Real attacker tooling</span>.
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
              Cloud audit accepted by <span className="gradient-text">every framework</span>.
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
              Things people ask before signing.
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
