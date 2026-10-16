import { Hero } from "@/components/home/Hero";
import { ClientLogos } from "@/components/home/ClientLogos";
import { ServicesOverview } from "@/components/home/ServicesOverview";
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
import { metroKeywords } from "@/lib/site";
import Link from "next/link";
import { POSTS } from "@/content/blog";

export const metadata = buildMetadata({
  title: "CERT-In Empanelled Cybersecurity Company in India",
  description:
    "CERT-In empanelled cybersecurity company for VAPT, penetration testing, managed SOC, red teaming, API and AI security across India and the UAE.",
  path: "/",
  geo: HQ_GEO,
  keywords: [
    "cybersecurity company India",
    "cybersecurity company Mumbai",
    "CERT-In empanelled auditor India",
    "best cybersecurity firm India",
    "CERT-In auditor Mumbai",
    "VAPT services Mumbai",
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
    q: "What is the difference between VAPT and penetration testing?",
    a: "VAPT combines broad vulnerability discovery with targeted exploitation and is often selected for compliance-driven assurance. Penetration testing is a deeper, goal-oriented exercise that validates whether specific weaknesses can be chained into material business impact.",
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
      <MetroCoverage
        description="From our Mumbai BKC headquarters and Hyderabad regional hub, we deliver penetration tests, security audits, managed SOC and red-team engagements across India and the UAE."
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
                a="Macksofy Technologies is a CERT-In empanelled cybersecurity company headquartered in Mumbai, serving clients across India and the UAE. It delivers penetration testing and VAPT, managed SOC, red teaming, API and AI security assessments, digital forensics, and regulator-aligned audits."
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
      {/* Training handoff, one line only. The homepage dropped TrainingPreview on
          2026-09-29 to focus on services, and with it the only homepage link
          carrying "ethical hacking course in Mumbai" to /training/ceh. GSC
          after that date: /training/ceh fell from pos 8.9 to 12.5 on the query
          and impressions for both URLs dropped ~70-80% (28-day normalised).
          This restores the anchor without bringing training back as a
          homepage section. Keep the phrase in the anchor only — as prose it
          makes the homepage compete for the term (see TrainingPreview.tsx). */}
      <section className="pb-12">
        <Container>
          <p className="text-sm text-fg-muted">
            Training:{" "}
            <Link href="/training/ceh" className="text-neon-cyan hover:underline">
              ethical hacking course in Mumbai
            </Link>{" "}
            (CEH v13) and{" "}
            <Link href="/training/corporate-training" className="text-neon-cyan hover:underline">
              corporate cybersecurity training
            </Link>{" "}
            for in-house teams.
          </p>
        </Container>
      </section>
      {/* Latest guides — a crawl path from the most-recrawled URL on the site
          to the newest posts. The Oct 2026 audit found new guides "unknown to
          Google" because only not-yet-discovered category hubs linked them.
          Kept to bare title links: the homepage DOM is already heavy. */}
      <section className="pb-20" aria-labelledby="latest-guides">
        <Container>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <h2 id="latest-guides" className="font-display text-2xl font-black sm:text-3xl">
              Latest guides
            </h2>
            <Link href="/blog" className="text-sm font-semibold text-neon-cyan hover:underline">
              All articles →
            </Link>
          </div>
          <ul className="mt-6 grid gap-x-8 gap-y-4 sm:grid-cols-2 lg:grid-cols-3">
            {LATEST_POSTS.map((p) => (
              <li key={p.slug} className="border-t border-white/10 pt-4">
                <span className="text-xs font-mono uppercase tracking-wider text-fg-muted">
                  {p.category} · {formatPostDate(p.date)}
                </span>
                <Link
                  href={`/blog/${p.slug}`}
                  className="mt-1 block font-display text-base font-bold text-fg hover:text-neon-cyan"
                >
                  {p.title}
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </section>
      <LeadCapture />
    </>
  );
}

const LATEST_POSTS = [...POSTS]
  .sort((a, b) => b.date.localeCompare(a.date))
  .slice(0, 6);

function formatPostDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}
