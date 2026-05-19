import { Crosshair, CheckCircle2 } from "lucide-react";
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
import { breadcrumbSchema, faqSchema, serviceSchema, methodologyHowToSchema } from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";
import { SITE } from "@/lib/site";
import { getServiceBySlug } from "@/content/services";
import { DownloadButton } from "@/components/DownloadButton";
import { TrustStrip } from "@/components/TrustStrip";
import { PentestTerminal } from "@/components/visuals/pentest/PentestTerminal";
import { PTESMethodology } from "@/components/visuals/pentest/PTESMethodology";

const SLUG = "penetration-testing";

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

export default function PentestPage() {
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
        <ParticleBackground density={70} />
        <GlowOrb className="-top-40 left-1/3" color="cyan" size={520} />
        <GlowOrb className="-bottom-20 right-1/4" color="purple" size={400} />
        <Container className="relative pt-10 pb-20">
          <Breadcrumbs
            items={[
              { name: "Services", href: "/services" },
              { name: service.shortTitle, href: `/services/${service.slug}` },
            ]}
          />
          <div className="mt-10 grid gap-12 lg:grid-cols-12 items-center">
            <div className="lg:col-span-6">
              <Eyebrow>{service.hero.eyebrow}</Eyebrow>
              <div className="mt-5 flex items-center gap-4">
                <div className="grid size-14 place-items-center rounded-2xl bg-bg-2 ring-1 ring-neon-cyan/30 text-neon-cyan glow-cyan">
                  <Crosshair className="size-7" />
                </div>
                <h1 className="font-display text-4xl font-black sm:text-5xl lg:text-[3.4rem] text-balance leading-[1.05]">
                  Penetration Testing Services in <span className="gradient-text">India &amp; UAE</span>.
                </h1>
              </div>
              <p className="mt-6 max-w-2xl text-lg text-fg-muted text-pretty leading-relaxed">
                {service.hero.description}
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <LinkButton href="/contact?interest=Penetration%20Testing" size="lg" withArrow>
                  Request a quote
                </LinkButton>
                <LinkButton href="#methodology" variant="outline" size="lg">
                  See PTES methodology
                </LinkButton>
              </div>
              <div className="mt-6">
                <DownloadButton
                  href="/sample-reports/pentest"
                  label="Download sample pentest report"
                  sub="CERT-In format · anonymised"
                />
              </div>
            </div>
            <div className="lg:col-span-6">
              <PentestTerminal />
            </div>
          </div>
        </Container>
      </section>

      {/* PTES KILL CHAIN */}
      <section id="methodology" className="py-20 bg-bg-1">
        <Container>
          <Eyebrow>PTES Methodology</Eyebrow>
          <h2 className="mt-3 font-display text-3xl font-black sm:text-4xl text-balance leading-[1.05]">
            Seven phases. <span className="gradient-text">No shortcuts.</span>
          </h2>
          <p className="mt-3 max-w-2xl text-fg-muted text-pretty">
            The Penetration Testing Execution Standard, executed end-to-end. Every Macksofy
            engagement runs the same seven-phase protocol regardless of scope.
          </p>
          <div className="mt-12">
            <PTESMethodology phases={service.methodology} />
          </div>
        </Container>
      </section>

      {/* MANUAL VS SCANNER */}
      <section className="py-20">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12 items-center">
            <div className="lg:col-span-5">
              <Eyebrow color="purple">The 70/30 rule</Eyebrow>
              <h2 className="mt-3 font-display text-3xl font-black sm:text-4xl text-balance leading-[1.05]">
                Scanners cover <span className="gradient-text">~30%</span> of real-world attacks.
              </h2>
              <p className="mt-5 text-fg-muted text-pretty leading-relaxed">
                The remaining 70% — BOLA, JWT alg confusion, OAuth flow hijacks, race
                conditions, business-logic bypass, kerberoastable accounts, ACL misconfig —
                requires human consultants. Macksofy weights manual testing heavily.
              </p>
              <ul className="mt-6 space-y-2">
                {service.businessImpact.map((b) => (
                  <li key={b} className="flex gap-3 text-sm">
                    <CheckCircle2 className="size-5 text-neon-green shrink-0 mt-0.5" />
                    <span className="text-fg-muted leading-relaxed">{b}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="lg:col-span-7">
              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  { label: "Scanner-only output", value: 30, color: "from-amber-500/30 to-amber-500/0", text: "text-amber-300" },
                  { label: "+ Manual exploitation", value: 95, color: "from-neon-cyan/30 to-neon-cyan/0", text: "text-neon-cyan" },
                ].map((m) => (
                  <div key={m.label} className="rounded-2xl glass p-6">
                    <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-fg-faint">
                      {m.label}
                    </div>
                    <div className={`mt-2 font-display text-5xl font-black ${m.text}`}>
                      {m.value}<span className="text-xl">%</span>
                    </div>
                    <div className="mt-4 h-2 rounded-full bg-bg-2 overflow-hidden">
                      <div
                        className={`h-full bg-gradient-to-r ${m.color}`}
                        style={{ width: `${m.value}%` }}
                      />
                    </div>
                    <div className="mt-3 text-xs text-fg-muted">
                      coverage of typical web/network attack surface
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 rounded-2xl glass p-5 text-sm text-fg-muted">
                <span className="text-neon-cyan font-mono text-[11px] uppercase tracking-wider mr-2">
                  ↳ delta
                </span>
                Macksofy consultants spend 60–70% of every engagement on manual exploitation.
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* CASE STUDIES */}
      <section className="py-20 bg-bg-1">
        <Container>
          <Eyebrow color="amber">Case studies</Eyebrow>
          <h2 className="mt-3 font-display text-3xl font-black sm:text-4xl text-balance leading-[1.05]">
            What we found. <span className="gradient-text">What it cost the attacker.</span>
          </h2>
          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {service.caseStudies.map((cs, i) => (
              <div key={i} className="rounded-2xl glass p-6 flex flex-col lift">
                <Badge variant="cyan" className="self-start">{cs.industry}</Badge>
                <div className="mt-4 font-mono text-[10px] uppercase tracking-[0.2em] text-fg-faint">
                  Scope
                </div>
                <div className="text-sm font-semibold text-fg mt-1">{cs.scope}</div>
                <p className="mt-4 text-sm text-fg-muted leading-relaxed flex-1">
                  <span className="text-neon-cyan font-semibold">Finding · </span>
                  {cs.finding}
                </p>
                <p className="mt-3 text-sm text-fg-muted leading-relaxed">
                  <span className="text-amber-300 font-semibold">Impact · </span>
                  {cs.impact}
                </p>
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
              <Eyebrow>Tooling</Eyebrow>
              <h2 className="mt-3 font-display text-3xl font-black sm:text-4xl text-balance leading-[1.05]">
                Tools we trust. <span className="gradient-text">And tools we built ourselves.</span>
              </h2>
              <p className="mt-5 text-fg-muted text-pretty leading-relaxed">
                Burp, Nmap, BloodHound, Impacket — the open-source canon every senior
                pentester reaches for first. We use them because they&rsquo;re battle-tested, and
                because the operators on your engagement have spent thousands of hours
                inside each one.
              </p>
              <p className="mt-4 text-fg-muted text-pretty leading-relaxed">
                But every now and then we hit a wall the commercial tools can&rsquo;t break
                through — and when that happens, we don&rsquo;t shrug. We write the Burp
                extension, the recon helper, the AD primitive that gets us past it. Years
                of that work adds up. Your engagement gets all of it.
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

      {/* COMPLIANCE */}
      <section className="py-20 bg-bg-1">
        <Container>
          <div className="max-w-3xl">
            <Eyebrow>Regulator-format output</Eyebrow>
            <h2 className="mt-3 font-display text-3xl font-black sm:text-4xl text-balance leading-[1.05]">
              One engagement. <span className="gradient-text">Eight frameworks.</span>
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
