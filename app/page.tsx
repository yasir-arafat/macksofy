import { Hero } from "@/components/home/Hero";
import { ClientLogos } from "@/components/home/ClientLogos";
import { ServicesOverview } from "@/components/home/ServicesOverview";
import { TrainingPreview } from "@/components/home/TrainingPreview";
import { CertInSection } from "@/components/home/CertInSection";
import { HowWeWork } from "@/components/home/HowWeWork";
import { Testimonials } from "@/components/home/Testimonials";
import { StatsBand } from "@/components/home/StatsBand";
import { LeadCapture } from "@/components/home/LeadCapture";
import { MetroCoverage } from "@/components/home/MetroCoverage";
import { FAQAccordion } from "@/components/sections/FAQAccordion";
import { AnswerBox } from "@/components/sections/AnswerBox";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/SectionTitle";
import { JsonLd } from "@/components/seo/JsonLd";
import { faqSchema } from "@/lib/schema";
import { buildMetadata, HQ_GEO } from "@/lib/seo";
import { SITE, metroKeywords } from "@/lib/site";

export const metadata = buildMetadata({
  title: `${SITE.name} — Cybersecurity Company in Mumbai · Pan-India · UAE`,
  description:
    "CERT-In empanelled cybersecurity company headquartered in Mumbai with delivery across Delhi, Bengaluru, Hyderabad, Chennai, Pune, Kolkata, Ahmedabad, Gurugram, Noida and the UAE. Penetration testing, VAPT, SOC setup, red teaming, DFIR + EC-Council ATC training and hands-on OSCP / OSEP / OSWE exam-prep bootcamps.",
  path: "/",
  geo: HQ_GEO,
  keywords: [
    "cybersecurity company India",
    "cybersecurity company Mumbai",
    "CERT-In empanelled auditor India",
    "best cybersecurity firm India",
    "CERT-In auditor Mumbai",
    "VAPT services Mumbai",
    "OSCP training India",
    "CEH training Mumbai",
    "SOC analyst training India",
    "ISO 27001 consultant India",
    "cybersecurity Dubai UAE",
    "cyber security company in India",
    "best CERT-In empanelled company India",
    "security testing company India",
    "security audit company India",
    ...metroKeywords("cybersecurity company"),
    ...metroKeywords("VAPT services"),
    ...metroKeywords("penetration testing"),
  ],
});

const HOME_FAQS = [
  {
    q: "Is Macksofy CERT-In empanelled?",
    a: "Yes — Macksofy Technologies is a CERT-In empanelled Information Security Auditor under MeitY, Government of India. Our reports are accepted by SEBI, RBI, UIDAI, IRDAI and other Indian regulators without rework.",
  },
  {
    q: "Where does Macksofy operate?",
    a: "Headquarters in Bandra Kurla Complex (BKC), Mumbai. Service delivery across India and the United Arab Emirates. We have engagements with BFSI, fintech, government and SaaS clients in Mumbai, Bangalore, Hyderabad, Delhi NCR, Pune, Dubai and Abu Dhabi.",
  },
  {
    q: "What cybersecurity services do you offer?",
    a: "Penetration testing, VAPT, SOC setup (Wazuh + ELK + Splunk + Sentinel), Web/API security testing, cloud security (AWS/Azure/GCP), red teaming, digital forensics & incident response, malware analysis, and threat intelligence.",
  },
  {
    q: "Which trainings do you offer?",
    a: "CEH v13 (EC-Council ATC), OSCP exam-prep bootcamp, SOC Analyst, Web Application Security, and customized Corporate Training programs.",
  },
  {
    q: "How do I request a quote?",
    a: "Use the contact form on this page (we reply within a few business hours), WhatsApp +91 99308 24239, or email services@macksofy.com. For typical engagements we send a fixed-price proposal within 48 hours.",
  },
];

export default function HomePage() {
  return (
    <>
      <JsonLd data={faqSchema(HOME_FAQS)} />
      <Hero />
      <ClientLogos />
      <ServicesOverview />
      <CertInSection />
      <HowWeWork />
      <TrainingPreview />
      <MetroCoverage
        description="From our Mumbai BKC headquarters and Hyderabad regional hub, we deliver pentests, audits and training engagements to BFSI, fintech, government and SaaS clients across India and the UAE."
      />
      <Testimonials />
      <StatsBand />
      {/* Visible FAQ — the same 5 Q&A emitted as FAQPage JSON-LD above.
          Rendering them keeps the structured data matched to on-page content
          (Google policy) and gives AI Overviews / voice a real answer surface. */}
      <section className="py-20">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            {/* Definition-first short answer — the clean, quotable "who is
                Macksofy" that AI Overviews / Perplexity / voice can lift, which
                the marketing hero copy can't provide. It fills the column the
                FAQ block leaves empty on desktop (`lg:order-last`), but stays
                ahead of the FAQ in DOM order so answer extraction still reaches
                it before the five Q&As. */}
            <div className="lg:order-last lg:col-span-5">
              <AnswerBox
                q="What does Macksofy Technologies do?"
                a="Macksofy Technologies is a CERT-In empanelled cybersecurity company headquartered in Mumbai, serving clients across India and the UAE. It delivers penetration testing and VAPT, managed SOC, red teaming, and digital forensics, alongside regulator-aligned audits (RBI, SEBI, ISO 27001) and EC-Council / OffSec exam-prep training."
              />
            </div>
            <div className="lg:col-span-7">
              <Eyebrow>FAQ</Eyebrow>
              <h2 className="mt-3 font-display text-3xl font-black sm:text-4xl text-balance leading-[1.05]">
                Questions buyers ask about <span className="gradient-text">Macksofy</span>.
              </h2>
              <div className="mt-10">
                <FAQAccordion faqs={HOME_FAQS} />
              </div>
            </div>
          </div>
        </Container>
      </section>
      <LeadCapture />
    </>
  );
}
