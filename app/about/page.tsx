import { Container } from "@/components/ui/Container";
import { SectionTitle, Eyebrow } from "@/components/ui/SectionTitle";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { ParticleBackground } from "@/components/visuals/ParticleBackground";
import { GlowOrb } from "@/components/visuals/GlowOrb";
import { CertInBadge } from "@/components/visuals/CertInBadge";
import { Counter } from "@/components/motion/Counter";
import { Testimonials } from "@/components/home/Testimonials";
import { LeadCapture } from "@/components/home/LeadCapture";
import { ClientsMarquee } from "@/components/clients/ClientsMarquee";
import { FadeIn } from "@/components/motion/FadeIn";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema } from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";
import { SITE } from "@/lib/site";

import { FounderSpotlight } from "@/components/about/FounderSpotlight";
import { InteractiveTimeline } from "@/components/about/InteractiveTimeline";
import { MissionVisionValues } from "@/components/about/MissionVisionValues";
import { CapabilityPillars } from "@/components/about/CapabilityPillars";
import { WhyMacksofyDetailed } from "@/components/about/WhyMacksofyDetailed";
import { LocationsShowcase } from "@/components/about/LocationsShowcase";
import { AccreditationsBadgeWall } from "@/components/about/AccreditationsBadgeWall";
import { AwardsPreview } from "@/components/about/AwardsPreview";

export const metadata = buildMetadata({
  title: "About Macksofy Technologies — Cybersecurity Consulting & Training Since 2014",
  description:
    "Founded 2014 in Mumbai. CERT-In empanelled cybersecurity consulting firm with EC-Council ATC and OffSec partner training division. Engagements across India + UAE.",
  path: "/about",
  keywords: [
    "about Macksofy",
    "Macksofy Technologies Mumbai",
    "CERT-In empanelled India",
    "cybersecurity firm Mumbai",
    "Macksofy founder",
    "cybersecurity company India UAE",
  ],
});

const STAT_BLOCKS = [
  { value: 11, suffix: "+", label: "Years in business" },
  { value: 20000, suffix: "+", label: "Professionals trained" },
  { value: 250, suffix: "+", label: "Enterprise clients" },
  { value: 500, suffix: "+", label: "Pentests delivered" },
  { value: 30, suffix: "+", label: "Regulated audits / yr" },
  { value: 5, suffix: "", label: "Countries served" },
];

export default function AboutPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: "About", url: "/about" }])} />

      {/* HERO */}
      <section className="relative isolate overflow-hidden">
        <ParticleBackground density={80} />
        <GlowOrb className="-top-40 left-1/2 -translate-x-1/2" color="cyan" size={700} intensity="strong" />
        <GlowOrb className="bottom-0 right-1/4" color="purple" size={500} />
        <Container className="relative pt-12 pb-20 sm:pt-16 sm:pb-24">
          <Breadcrumbs items={[{ name: "About", href: "/about" }]} />
          <div className="mt-10 grid gap-12 lg:grid-cols-12 items-end">
            <div className="lg:col-span-8">
              <Eyebrow>Cybersecurity firm + training division · Since {SITE.founded}</Eyebrow>
              <h1 className="mt-4 font-display text-5xl font-black sm:text-6xl lg:text-7xl text-balance leading-[0.95]">
                The team that does the work,{" "}
                <span className="gradient-text">teaches the work.</span>
              </h1>
              <p className="mt-6 max-w-2xl text-lg text-fg-muted text-pretty">
                Macksofy Technologies is a CERT-In empanelled cybersecurity firm
                headquartered in Bandra Kurla Complex, Mumbai — with an advanced
                training division authorized by EC-Council, OffSec and CompTIA.
                We have launched 20,000+ careers and run engagements across India
                and the UAE since 2014.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <CertInBadge size="md" />
                <span className="font-mono text-xs text-fg-faint">
                  ISO 27001 · EC-Council ATC · OffSec Authorized · Mumbai BKC HQ
                </span>
              </div>
            </div>

            <div className="lg:col-span-4">
              <div className="grid grid-cols-2 gap-3">
                {STAT_BLOCKS.slice(0, 4).map((s) => (
                  <div key={s.label} className="rounded-2xl glass p-4">
                    <div className="font-display text-2xl font-black gradient-text leading-none">
                      <Counter value={s.value} suffix={s.suffix} />
                    </div>
                    <div className="mt-2 font-mono text-[9px] uppercase tracking-[0.18em] text-fg-faint">
                      {s.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* STATS BAND */}
      <section className="border-y border-line bg-bg-1">
        <Container className="py-12">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-8 text-center sm:text-left">
            {STAT_BLOCKS.map((s) => (
              <div key={s.label}>
                <div className="font-display text-3xl sm:text-4xl font-black gradient-text leading-none">
                  <Counter value={s.value} suffix={s.suffix} />
                </div>
                <div className="mt-1 font-mono text-[10px] uppercase tracking-[0.15em] text-fg-faint sm:text-xs">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* FOUNDER SPOTLIGHT */}
      <section className="py-24">
        <Container>
          <FounderSpotlight />
        </Container>
      </section>

      {/* OUR STORY */}
      <section className="py-20 bg-bg-1 border-y border-line">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12 items-start">
            <FadeIn className="lg:col-span-5">
              <Eyebrow color="purple">Our story</Eyebrow>
              <h2 className="mt-3 font-display text-3xl font-black sm:text-4xl text-balance leading-[1.05]">
                From eight students in 2014 to{" "}
                <span className="gradient-text">a multi-discipline firm.</span>
              </h2>
            </FadeIn>
            <FadeIn className="lg:col-span-7" delay={0.1}>
              <div className="space-y-5 text-fg-muted leading-relaxed text-pretty">
                <p>
                  Macksofy was founded in 2014 with a simple conviction:
                  India needed cybersecurity training as rigorous as the work itself.
                  The first batch had eight students. Eleven years later, that number
                  is over twenty thousand — and we&rsquo;ve grown into a full-service
                  security firm trusted by India&rsquo;s largest banks, fintechs and
                  government bodies.
                </p>
                <p>
                  We have stayed founder-led, vendor-true and Mumbai-rooted. Every
                  consultant on our team is an OSCP, OSWE or OSEP practitioner first,
                  and a trainer second. That&rsquo;s our core differentiator: we
                  teach what we do for a living.
                </p>
                <p>
                  Today, Macksofy delivers across four pillars — offensive security,
                  defensive engineering, audit & compliance and training. Our reports
                  are accepted by every Indian regulator on the first read. Our alumni
                  are running SOCs, red teams and AppSec functions at HSBC, PwC,
                  Verizon, Tata, Reliance, Maharashtra Police and 30+ RBI-regulated
                  cooperative banks.
                </p>
              </div>
            </FadeIn>
          </div>
        </Container>
      </section>

      {/* INTERACTIVE TIMELINE */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-30" />
        <GlowOrb className="-top-20 left-1/4" color="cyan" size={500} intensity="soft" />
        <GlowOrb className="bottom-0 right-1/4" color="purple" size={500} intensity="soft" />
        <Container className="relative">
          <FadeIn>
            <SectionTitle
              eyebrow="Timeline · 2014 → today"
              eyebrowColor="amber"
              title={
                <>
                  Pick a year. <span className="gradient-text">See what shipped.</span>
                </>
              }
              description="Every milestone has a story behind it — click any year on the rail to expand the headline event, the highlights and the metric that anchored it."
              align="center"
            />
          </FadeIn>
          <FadeIn delay={0.1} className="mt-14">
            <InteractiveTimeline />
          </FadeIn>
        </Container>
      </section>

      {/* MISSION · VISION · VALUES */}
      <section className="py-24 bg-bg-1 border-y border-line">
        <Container>
          <FadeIn>
            <SectionTitle
              eyebrow="Mission · Vision · Values"
              title={
                <>
                  Three statements that{" "}
                  <span className="gradient-text">decide how we operate.</span>
                </>
              }
              align="center"
            />
          </FadeIn>
          <div className="mt-14">
            <MissionVisionValues />
          </div>
        </Container>
      </section>

      {/* CAPABILITY PILLARS */}
      <section className="py-24">
        <Container>
          <FadeIn>
            <SectionTitle
              eyebrow="Capabilities"
              eyebrowColor="purple"
              title={
                <>
                  Four pillars,{" "}
                  <span className="gradient-text">one cohesive practice.</span>
                </>
              }
              description="Macksofy is structured around four interlocking practice areas — each with its own delivery team, but sharing tooling, threat intel and lessons learned across engagements."
            />
          </FadeIn>
          <div className="mt-14">
            <CapabilityPillars />
          </div>
        </Container>
      </section>

      {/* WHY MACKSOFY */}
      <section className="py-24 bg-bg-1 border-y border-line">
        <Container>
          <FadeIn>
            <SectionTitle
              eyebrow="Why CISOs choose us"
              eyebrowColor="green"
              title={
                <>
                  Six reasons CISOs and L&D heads{" "}
                  <span className="gradient-text">keep coming back.</span>
                </>
              }
            />
          </FadeIn>
          <div className="mt-14">
            <WhyMacksofyDetailed />
          </div>
        </Container>
      </section>

      {/* ACCREDITATIONS */}
      <section className="py-24">
        <Container>
          <FadeIn>
            <SectionTitle
              eyebrow="Accreditations & partnerships"
              title={
                <>
                  The credentials behind{" "}
                  <span className="gradient-text">every Macksofy engagement.</span>
                </>
              }
              description="Real vouchers, official labs, regulator empanelment — verified directly with each authority."
            />
          </FadeIn>
          <div className="mt-14">
            <AccreditationsBadgeWall />
          </div>
        </Container>
      </section>

      {/* LOCATIONS */}
      <section className="py-24 bg-bg-1 border-y border-line">
        <Container>
          <FadeIn>
            <SectionTitle
              eyebrow="Locations · India + UAE + Beyond"
              eyebrowColor="purple"
              title={
                <>
                  Headquartered in Mumbai.{" "}
                  <span className="gradient-text">Operating across 5 countries.</span>
                </>
              }
              description="Our global HQ is in Bandra Kurla Complex (BKC), Mumbai. Service delivery extends across India, UAE, Oman and Canada — with Mumbai-based senior consultants on every engagement."
            />
          </FadeIn>
          <div className="mt-14">
            <LocationsShowcase />
          </div>
        </Container>
      </section>

      {/* AWARDS PREVIEW */}
      <section className="py-24">
        <Container>
          <FadeIn>
            <SectionTitle
              eyebrow="Awards & Recognition"
              eyebrowColor="amber"
              title={
                <>
                  Recognized by{" "}
                  <span className="gradient-text">India&rsquo;s industry, vendors and government.</span>
                </>
              }
              description="From CSI&rsquo;s Cyber Security Awards 2025 to Google&rsquo;s Vulnerability Reward Program and EC-Council&rsquo;s Circle of Excellence."
            />
          </FadeIn>
          <div className="mt-14">
            <AwardsPreview />
          </div>
        </Container>
      </section>

      {/* CLIENT MARQUEE */}
      <section className="py-16 border-y border-line bg-bg-1">
        <Container className="mb-8">
          <p className="text-center font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-fg-faint">
            250+ enterprises, banks, government bodies and education institutions across India + UAE
          </p>
        </Container>
        <ClientsMarquee />
      </section>

      <Testimonials />
      <LeadCapture />
    </>
  );
}
