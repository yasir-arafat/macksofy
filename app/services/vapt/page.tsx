import { ScanSearch, CheckCircle2 } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/SectionTitle";
import { Badge } from "@/components/ui/Badge";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { LinkButton } from "@/components/ui/Button";
import { ParticleBackground } from "@/components/visuals/ParticleBackground";
import { GlowOrb } from "@/components/visuals/GlowOrb";
import { ToolStack } from "@/components/visuals/ToolStack";
import { ComplianceMatrix } from "@/components/visuals/ComplianceMatrix";
import { AttackFlow } from "@/components/visuals/AttackFlow";
import { EngagementPhases } from "@/components/visuals/EngagementPhases";
import { FAQAccordion } from "@/components/sections/FAQAccordion";
import { LeadCapture } from "@/components/home/LeadCapture";
import { WhereWeDeliver } from "@/components/sections/WhereWeDeliver";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema, faqSchema, serviceSchema, methodologyHowToSchema } from "@/lib/schema";
import { SITE } from "@/lib/site";
import { buildMetadata } from "@/lib/seo";
import { getServiceBySlug } from "@/content/services";
import { DownloadButton } from "@/components/DownloadButton";
import { TrustStrip } from "@/components/TrustStrip";
import { RadarPulse } from "@/components/visuals/vapt/RadarPulse";
import { CoverageMatrix } from "@/components/visuals/vapt/CoverageMatrix";
import { SampleFindingCard } from "@/components/visuals/vapt/SampleFindingCard";
import { VAvsPT } from "@/components/visuals/vapt/VAvsPT";
import { AnswerBox } from "@/components/sections/AnswerBox";
import { getShortAnswer } from "@/content/shortAnswers";
import { GlossaryLinks } from "@/components/sections/GlossaryLinks";

const SLUG = "vapt";

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

export default function VaptServicePage() {
  const service = getServiceBySlug(SLUG)!;
  const sa = getShortAnswer("service:vapt");

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
        <ParticleBackground density={80} />
        <GlowOrb className="-top-40 left-1/3" color="cyan" size={520} />
        <GlowOrb className="-bottom-20 right-1/4" color="purple" size={420} />
        <Container className="relative pt-10 pb-20">
          <Breadcrumbs
            items={[
              { name: "Services", href: "/services" },
              { name: "VAPT", href: "/services/vapt" },
            ]}
          />
          <div className="mt-10 grid gap-12 lg:grid-cols-12 items-center">
            <div className="lg:col-span-7">
              <Eyebrow>{service.hero.eyebrow}</Eyebrow>
              <div className="mt-5 flex items-center gap-4">
                <div className="grid size-14 place-items-center rounded-2xl bg-bg-2 ring-1 ring-neon-cyan/30 text-neon-cyan glow-cyan">
                  <ScanSearch className="size-7" />
                </div>
                <h1 className="font-display text-4xl font-black sm:text-5xl lg:text-[3.6rem] text-balance leading-[1.05]">
                  Vulnerability Assessment <span className="gradient-text">+ Penetration Testing.</span>
                </h1>
              </div>
              <p className="mt-6 max-w-2xl text-lg text-fg-muted text-pretty leading-relaxed">
                {service.hero.description}
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <LinkButton href="/contact?interest=VAPT" size="lg" withArrow>
                  Request a quote
                </LinkButton>
                <LinkButton href="#methodology" variant="outline" size="lg">
                  See methodology
                </LinkButton>
              </div>
              <div className="mt-6">
                <DownloadButton
                  href="/sample-reports/pentest"
                  label="Download sample VAPT report"
                  sub="CERT-In format · anonymised"
                />
              </div>
            </div>
            <div className="lg:col-span-5">
              <RadarPulse />
            </div>
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

      {/* AT-A-GLANCE STATS */}
      <section className="border-y border-line/60 bg-bg-1/40 py-8">
        <Container>
          <ul className="grid grid-cols-2 sm:grid-cols-4 gap-6">
            {[
              { k: "Quote SLA", v: "48h" },
              { k: "Engagement", v: "5–15 days" },
              { k: "Free retest", v: "30 days" },
              { k: "Format", v: "CERT-In ready" },
            ].map(({ k, v }) => (
              <li key={k} className="text-center">
                <div className="font-display text-2xl sm:text-3xl font-black gradient-text leading-none">
                  {v}
                </div>
                <div className="mt-2 font-mono text-[10px] uppercase tracking-[0.2em] text-fg-faint">
                  {k}
                </div>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* VA vs PT */}
      <section className="py-20">
        <Container>
          <div className="max-w-3xl">
            <Eyebrow>The honest distinction</Eyebrow>
            <h2 className="mt-3 font-display text-3xl font-black sm:text-4xl text-balance leading-[1.05]">
              VA finds the inventory. <span className="gradient-text">PT proves the impact.</span>
            </h2>
            <p className="mt-4 text-fg-muted text-pretty">
              A scanner can list 800 vulnerabilities in a day; an attacker only needs one to matter.
              We do both — then the report only shows you what mattered.
            </p>
          </div>
          <div className="mt-12">
            <VAvsPT />
          </div>
        </Container>
      </section>

      {/* ENGAGEMENT PHASES */}
      <section id="methodology" className="py-20 bg-bg-1">
        <Container>
          <Eyebrow>Methodology</Eyebrow>
          <h2 className="mt-3 font-display text-3xl font-black sm:text-4xl text-balance leading-[1.05]">
            Six phases, every step <span className="gradient-text">documented</span>.
          </h2>
          <p className="mt-3 max-w-2xl text-fg-muted text-pretty">
            Auto-advancing timeline of how a Macksofy VAPT engagement actually runs — pause,
            rewind or click any phase to drill in.
          </p>
          <div className="mt-12">
            <EngagementPhases />
          </div>
        </Container>
      </section>

      {/* COVERAGE MATRIX */}
      <section className="py-20">
        <Container>
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 items-end">
            <div className="lg:col-span-6">
              <Eyebrow color="purple">Coverage</Eyebrow>
              <h2 className="mt-3 font-display text-3xl font-black sm:text-4xl text-balance leading-[1.05]">
                Every asset class. <span className="gradient-text">Every test depth.</span>
              </h2>
            </div>
            <div className="lg:col-span-6">
              <p className="text-fg-muted text-pretty">
                A VAPT scope is a 2D matrix: what we test (asset types) × how deep we test
                (authenticated, manual exploitation, chained). The grid shows what&rsquo;s included
                in a Macksofy engagement.
              </p>
            </div>
          </div>
          <div className="mt-12">
            <CoverageMatrix />
          </div>
        </Container>
      </section>

      {/* ATTACK CHAIN */}
      <section className="py-20 bg-bg-1">
        <Container>
          <div className="max-w-3xl">
            <Eyebrow color="amber">Why exploitation matters</Eyebrow>
            <h2 className="mt-3 font-display text-3xl font-black sm:text-4xl text-balance leading-[1.05]">
              <span className="gradient-text">Low + low + low</span> is how breaches actually start.
            </h2>
            <p className="mt-4 text-fg-muted text-pretty leading-relaxed">
              Scanners look at findings one at a time, and one at a time most of them really do
              look low. Attackers don&rsquo;t read reports — they chain. Three innocuous
              misconfigurations stitched together is how an unauthenticated foothold quietly
              becomes domain admin. We show you that chain, not just the CVSS list.
            </p>
          </div>
          <div className="mt-12">
            <AttackFlow />
          </div>
        </Container>
      </section>

      {/* COMPLIANCE MAP */}
      <section className="py-20">
        <Container>
          <div className="max-w-3xl">
            <Eyebrow>Regulator-format output</Eyebrow>
            <h2 className="mt-3 font-display text-3xl font-black sm:text-4xl text-balance leading-[1.05]">
              One engagement. <span className="gradient-text">Eight frameworks.</span>
            </h2>
            <p className="mt-4 text-fg-muted text-pretty">
              The VAPT deliverable doubles as evidence for whichever regulator is breathing
              down your neck this quarter.
            </p>
          </div>
          <div className="mt-12">
            <ComplianceMatrix />
          </div>
        </Container>
      </section>

      {/* SAMPLE FINDING */}
      <section className="py-20 bg-bg-1">
        <Container>
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 items-center">
            <div className="lg:col-span-5">
              <Eyebrow color="purple">Anatomy of a finding</Eyebrow>
              <h2 className="mt-3 font-display text-3xl font-black sm:text-4xl text-balance leading-[1.05]">
                Every report card has <span className="gradient-text">eight axes</span>.
              </h2>
              <p className="mt-4 text-fg-muted text-pretty">
                CVSS isn&rsquo;t enough — we attach business-impact, MITRE technique, exploit
                weaponisation status, fix-effort estimate and re-introduction likelihood to
                every High/Critical finding.
              </p>
              <ul className="mt-6 space-y-2 text-sm">
                {[
                  "CVE/CWE pinning",
                  "MITRE ATT&CK technique mapping",
                  "Validated CVSS + business risk score",
                  "Reproduction script + screenshots",
                  "Remediation effort estimate",
                  "Verified-fix retest result",
                ].map((line) => (
                  <li key={line} className="flex gap-2 text-fg-muted">
                    <CheckCircle2 className="size-4 text-neon-green shrink-0 mt-0.5" />
                    <span>{line}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="lg:col-span-7">
              <SampleFindingCard />
            </div>
          </div>
        </Container>
      </section>

      {/* TOOL STACK */}
      <section className="py-20">
        <Container>
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 items-end">
            <div className="lg:col-span-5">
              <Eyebrow>Tooling</Eyebrow>
              <h2 className="mt-3 font-display text-3xl font-black sm:text-4xl text-balance leading-[1.05]">
                Tools we trust. <span className="gradient-text">And tools we built ourselves.</span>
              </h2>
              <p className="mt-5 text-fg-muted text-pretty leading-relaxed">
                Nessus, Qualys, Burp Pro, Nuclei, Trivy, Checkov — the same scanners every
                senior BFSI red team runs first, because they catch the obvious things
                quickly and free our operators to chase what really matters.
              </p>
              <p className="mt-4 text-fg-muted text-pretty leading-relaxed">
                But scanners only see what they were taught to see. When ours hit something
                a commercial tool would miss — a chained CSP bypass, a quiet SSRF inside a
                JSON proxy, a serverless privesc path — we don&rsquo;t shrug. We write the
                Burp extension, the Nuclei template, the Pacu module that catches it. On
                your engagement you get both: the tooling everyone else runs, and the bits
                we built ourselves.
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

      {/* DELIVERABLES + INDUSTRIES */}
      <section className="py-20 bg-bg-1">
        <Container>
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <Eyebrow>Deliverables</Eyebrow>
              <h3 className="mt-3 font-display text-2xl font-black sm:text-3xl">
                What lands in your inbox
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

      <TrustStrip />

      {/* FAQ */}
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

      <WhereWeDeliver
        subject={service.shortTitle}
        subjectShort={service.shortTitle}
        serviceSlug={service.slug}
      />

      <GlossaryLinks href="/services/vapt" />
      <LeadCapture />
    </>
  );
}
