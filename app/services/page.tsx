import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/SectionTitle";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { ParticleBackground } from "@/components/visuals/ParticleBackground";
import { GlowOrb } from "@/components/visuals/GlowOrb";
import { LeadCapture } from "@/components/home/LeadCapture";
import { MetroCoverage } from "@/components/home/MetroCoverage";
import { ServiceShowcase } from "@/components/services/ServiceShowcase";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema } from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";
import { SERVICES } from "@/content/services";
import { metroKeywords } from "@/lib/site";
import { AnswerBox } from "@/components/sections/AnswerBox";
import { getShortAnswer } from "@/content/shortAnswers";

export const metadata = buildMetadata({
  title:
    "Cybersecurity Services in Mumbai · Delhi · Bengaluru · Hyderabad · Chennai · Pune · UAE",
  description:
    "Offensive and defensive cybersecurity from CERT-In empanelled Macksofy — penetration testing, VAPT, SOC engineering, red teaming, DFIR and threat intel.",
  path: "/services",
  keywords: [
    "cybersecurity services India",
    "cybersecurity services Mumbai",
    "penetration testing services India",
    "VAPT services India",
    "SOC services India",
    "red team services India",
    "cybersecurity Dubai UAE",
    ...metroKeywords("cybersecurity services"),
    ...metroKeywords("penetration testing"),
    ...metroKeywords("VAPT"),
    ...metroKeywords("SOC services"),
  ],
});

export default function ServicesPage() {
  const offensive = SERVICES.filter((s) => s.category === "Offensive");
  const defensive = SERVICES.filter((s) => s.category === "Defensive");
  const managed = SERVICES.filter((s) => s.category === "Managed Services");

  const sa = getShortAnswer("hub:services");

  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([{ name: "Services", url: "/services" }]),
          {
            "@context": "https://schema.org",
            "@type": "ItemList",
            itemListElement: SERVICES.map((s, i) => ({
              "@type": "ListItem",
              position: i + 1,
              url: `https://www.macksofy.com/services/${s.slug}`,
              name: s.title,
            })),
          },
        ]}
      />
      <section className="relative isolate overflow-hidden">
        <ParticleBackground density={70} />
        <GlowOrb className="-top-40 left-1/2 -translate-x-1/2" color="cyan" size={600} />
        <Container className="relative pt-12 pb-20 sm:pt-16 sm:pb-28">
          <Breadcrumbs items={[{ name: "Services", href: "/services" }]} />
          <div className="mt-8 max-w-4xl">
            <Eyebrow>
              {SERVICES.length} Services · Offensive · Defensive · Managed
            </Eyebrow>
            <h1 className="mt-4 font-display text-5xl font-black sm:text-6xl lg:text-7xl text-balance leading-[0.95]">
              Cybersecurity services that{" "}
              <span className="gradient-text">find what others miss.</span>
            </h1>
            <p className="mt-6 text-lg text-fg-muted text-pretty max-w-2xl">
              CERT-In empanelled. OSCP / OSWE / OSEP-certified. Trusted by India&rsquo;s
              largest BFSI, fintech and government clients since 2014. Reports your regulator
              and engineering team will both accept.
            </p>
          </div>
        </Container>
      </section>

      {/* SHORT ANSWER (AEO/GEO) */}
      {sa && (
        <section className="py-8">
          <Container>
            <AnswerBox q={sa.q} a={sa.a} />
          </Container>
        </section>
      )}

      <section className="relative py-24 overflow-hidden">
        <Container>
          <ServiceShowcase
            tone="offensive"
            eyebrow="Offensive Security"
            title={
              <>
                Find the gaps before{" "}
                <span className="gradient-text">attackers do.</span>
              </>
            }
            kicker="Pen-test, red team, AppSec and adversary emulation engagements run by OSCP / OSWE / OSEP-certified consultants on real BFSI, fintech, healthcare and government environments."
            serviceSlugs={offensive.map((s) => s.slug)}
          />
        </Container>
      </section>

      <section className="relative py-24 bg-bg-1 overflow-hidden">
        <Container>
          <ServiceShowcase
            tone="managed"
            eyebrow="Managed Security Services"
            title={
              <>
                Operate the security program{" "}
                <span className="gradient-text">on your behalf.</span>
              </>
            }
            kicker="Outsourced SOC, fractional CISO leadership, annual assurance retainers, threat-intel programmes and vetted staffing — predictable monthly cost, CERT-In empanelled, India data-residency."
            serviceSlugs={managed.map((s) => s.slug)}
          />
        </Container>
      </section>

      <section className="relative py-24 overflow-hidden">
        <Container>
          <ServiceShowcase
            tone="defensive"
            eyebrow="Defensive Engineering"
            title={
              <>
                Detect, respond,{" "}
                <span className="gradient-text">recover.</span>
              </>
            }
            kicker="DFIR retainers and malware-analysis capability engineered to contain incidents quickly and recover with auditable evidence."
            serviceSlugs={defensive.map((s) => s.slug)}
          />
        </Container>
      </section>

      <MetroCoverage
        title={
          <>
            Cybersecurity services{" "}
            <span className="gradient-text">delivered nationwide.</span>
          </>
        }
        description="Macksofy services teams travel from Mumbai BKC and Hyderabad to client sites across every Indian metro and the UAE — on-site, remote and hybrid engagements."
      />

      <LeadCapture />
    </>
  );
}
