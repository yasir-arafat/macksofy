import { Container } from "@/components/ui/Container";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { GlowOrb } from "@/components/visuals/GlowOrb";
import { Testimonials } from "@/components/home/Testimonials";
import { LeadCapture } from "@/components/home/LeadCapture";
import { ClientsMarquee } from "@/components/clients/ClientsMarquee";
import { FadeIn } from "@/components/motion/FadeIn";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema } from "@/lib/schema";
import { buildMetadata, HQ_GEO } from "@/lib/seo";

import { AboutHero } from "@/components/about/AboutHero";
import { Manifesto } from "@/components/about/Manifesto";
import { StoryChapters } from "@/components/about/StoryChapters";
import { StatsInfographic } from "@/components/about/StatsInfographic";
import { FounderSpotlight } from "@/components/about/FounderSpotlight";
import { InteractiveTimeline } from "@/components/about/InteractiveTimeline";
import { MissionVisionValues } from "@/components/about/MissionVisionValues";
import { CapabilityPillars } from "@/components/about/CapabilityPillars";
import { WhyMacksofyDetailed } from "@/components/about/WhyMacksofyDetailed";
import { LocationsShowcase } from "@/components/about/LocationsShowcase";
import { AccreditationsBadgeWall } from "@/components/about/AccreditationsBadgeWall";
import { AwardsPreview } from "@/components/about/AwardsPreview";

export const metadata = buildMetadata({
  title:
    "About Macksofy Technologies — Cybersecurity Consulting & Training Since 2014",
  description:
    "Founded 2014 in Mumbai. CERT-In empanelled cybersecurity consulting firm with EC-Council ATC training division and hands-on Offensive Security exam-prep bootcamps. Engagements across India + UAE. 20,000+ alumni, 250+ enterprise clients, 5 countries served.",
  path: "/about",
  geo: HQ_GEO,
  keywords: [
    "about Macksofy",
    "Macksofy Technologies Mumbai",
    "CERT-In empanelled India",
    "cybersecurity firm Mumbai",
    "Macksofy founder",
    "cybersecurity company India UAE",
  ],
});

export default function AboutPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: "About", url: "/about" }])} />

      {/* HERO */}
      <AboutHero />

      {/* MANIFESTO — typographic statement */}
      <Manifesto />

      {/* STORY CHAPTERS */}
      <StoryChapters />

      {/* BY THE NUMBERS — stats infographic + trajectory */}
      <StatsInfographic />

      {/* FOUNDER SPOTLIGHT */}
      <section className="py-24">
        <Container>
          <FounderSpotlight />
        </Container>
      </section>

      {/* INTERACTIVE TIMELINE */}
      <section className="py-24 relative overflow-hidden bg-bg-1 border-y border-line">
        <div className="absolute inset-0 bg-grid opacity-25" />
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
      <section className="py-24">
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
      <section className="py-24 bg-bg-1 border-y border-line">
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
      <section className="py-24">
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
      <section className="py-24 bg-bg-1 border-y border-line">
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
      <section className="py-24">
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
      <section className="py-24 bg-bg-1 border-y border-line">
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
      <section className="py-16 border-y border-line">
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
