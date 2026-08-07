import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Clock, Award } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionTitle, Eyebrow } from "@/components/ui/SectionTitle";
import { Badge } from "@/components/ui/Badge";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { ParticleBackground } from "@/components/visuals/ParticleBackground";
import { GlowOrb } from "@/components/visuals/GlowOrb";
import { LeadCapture } from "@/components/home/LeadCapture";
import { MetroCoverage } from "@/components/home/MetroCoverage";
import { Testimonials } from "@/components/home/Testimonials";
import { FadeIn, StaggerChildren, StaggerItem } from "@/components/motion/FadeIn";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema } from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";
import { COURSES } from "@/content/courses";
import { VENDOR_LOGOS } from "@/content/vendorLogos";
import { formatINR } from "@/lib/utils";
import { metroKeywords } from "@/lib/site";

export const metadata = buildMetadata({
  title:
    "Cybersecurity Training in Mumbai · Delhi · Bengaluru · Hyderabad · Chennai · Pune · UAE",
  description:
    "EC-Council, OffSec and CompTIA authorised cybersecurity training across India and the UAE — CEH v13, OSCP, SOC Analyst and corporate programmes.",
  path: "/training",
  keywords: [
    "cybersecurity training India",
    "cybersecurity training Mumbai",
    "ethical hacking training India",
    "CEH v13 training India",
    "OSCP training India",
    "OSCP coaching Mumbai",
    "OSEP training India",
    "SOC analyst training Mumbai",
    "ethical hacking training UAE",
    ...metroKeywords("cybersecurity training"),
    ...metroKeywords("ethical hacking course"),
    ...metroKeywords("OSCP training"),
    ...metroKeywords("CEH training"),
  ],
});

export default function TrainingPage() {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([{ name: "Training", url: "/training" }]),
          {
            "@context": "https://schema.org",
            "@type": "ItemList",
            itemListElement: COURSES.map((c, i) => ({
              "@type": "ListItem",
              position: i + 1,
              url: `https://www.macksofy.com/training/${c.slug}`,
              name: c.title,
            })),
          },
        ]}
      />
      <section className="relative isolate overflow-hidden">
        <ParticleBackground density={70} />
        <GlowOrb className="-top-40 left-1/2 -translate-x-1/2" color="purple" size={600} />
        <Container className="relative pt-12 pb-20 sm:pt-16 sm:pb-28">
          <Breadcrumbs items={[{ name: "Training", href: "/training" }]} />
          <div className="mt-8 max-w-4xl">
            <Eyebrow color="purple">Authorized · EC-Council · OffSec · CompTIA</Eyebrow>
            <h1 className="mt-4 font-display text-5xl font-black sm:text-6xl lg:text-7xl text-balance leading-[0.95]">
              Career-grade certifications.{" "}
              <span className="gradient-text">Mentor until you pass.</span>
            </h1>
            <p className="mt-6 text-lg text-fg-muted text-pretty max-w-2xl">
              5 career tracks designed by working pen-testers and SOC engineers.
              100% practical labs, real-world tooling, and placement support across
              India + UAE hiring partners.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link
                href="/training/offsec"
                className="inline-flex items-center gap-2 rounded-full border border-neon-cyan/40 bg-neon-cyan/10 px-4 py-2 text-sm font-semibold text-neon-cyan hover:bg-neon-cyan/20 transition-colors"
              >
                View all OffSec certifications
                <ArrowRight className="size-4" />
              </Link>
              <span className="text-xs text-fg-faint font-mono uppercase tracking-wider">
                OSCP+ · OSEP · OSWE · OSWA · OSDA · OSED · OSMR
              </span>
            </div>
          </div>
        </Container>
      </section>

      <section className="py-20">
        <Container>
          <FadeIn>
            <SectionTitle eyebrow="All Courses" title={<>Pick the path that <span className="gradient-text">moves your career.</span></>} />
          </FadeIn>
          <StaggerChildren className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {COURSES.map((c) => (
              <StaggerItem key={c.slug}>
                <Link
                  href={`/training/${c.slug}`}
                  className="group flex h-full flex-col overflow-hidden rounded-2xl glass ring-1 ring-transparent hover:ring-neon-cyan/40 hover:-translate-y-1 transition-all"
                >
                  <div className="relative aspect-[16/10] overflow-hidden bg-bg-2">
                    <Image
                      src={c.image}
                      alt={c.title}
                      fill
                      sizes="(max-width:768px) 100vw, (max-width:1024px) 50vw, 400px"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/40 to-transparent" />
                    <div className="absolute inset-0 flex flex-col justify-between p-4">
                      <div className="flex items-center gap-2">
                        <Badge variant="cyan">{c.vendor}</Badge>
                        {c.popular && <Badge variant="amber">Popular</Badge>}
                      </div>
                      <div className="flex items-end justify-between">
                        <div className="font-mono text-xs uppercase tracking-wider text-fg-muted">
                          {c.level}
                        </div>
                        <div className="rounded-md bg-bg/60 backdrop-blur px-2 py-1 font-mono text-[10px] font-bold text-neon-cyan">
                          {c.code}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-1 flex-col p-5">
                    <h3 className="font-display text-lg font-bold text-fg group-hover:text-neon-cyan line-clamp-2">
                      {c.title}
                    </h3>
                    <p className="mt-2 text-sm text-fg-muted line-clamp-3">
                      {c.hero.tagline}
                    </p>
                    <div className="mt-4 flex flex-wrap gap-3 text-xs text-fg-faint">
                      <span className="inline-flex items-center gap-1">
                        <Clock className="size-3.5" /> {c.duration.split(" · ")[0]}
                      </span>
                      <span className="inline-flex items-center gap-1">
                        <Award className="size-3.5" /> {c.level}
                      </span>
                    </div>
                    <div className="mt-auto flex items-end justify-between gap-2 pt-5">
                      <div>
                        {c.priceINR ? (
                          <>
                            {c.originalPriceINR && (
                              <span className="block text-xs text-fg-faint line-through">
                                {formatINR(c.originalPriceINR)}
                              </span>
                            )}
                            <span className="block font-display text-base font-bold text-fg">
                              {formatINR(c.priceINR)}
                              {c.discountPercent && (
                                <span className="ml-2 inline-flex rounded bg-red-500 px-1.5 py-0.5 text-[10px] font-bold text-white align-middle">
                                  {c.discountPercent}% OFF
                                </span>
                              )}
                            </span>
                          </>
                        ) : (
                          <span className="text-sm text-fg-muted">Talk to us</span>
                        )}
                      </div>
                      <ArrowRight className="size-4 text-neon-cyan opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  </div>
                </Link>
              </StaggerItem>
            ))}
          </StaggerChildren>
        </Container>
      </section>

      {/* Authorized Partners */}
      <section className="py-20 bg-bg-1 border-y border-line">
        <Container>
          <div className="text-center mb-10">
            <Eyebrow color="amber">Authorized Partners</Eyebrow>
            <h2 className="mt-3 font-display text-3xl font-black sm:text-4xl text-balance">
              Real vouchers, official labs.{" "}
              <span className="gradient-text">No proxies.</span>
            </h2>
            <p className="mt-3 text-fg-muted max-w-2xl mx-auto text-pretty">
              Macksofy is an authorized partner / accredited training center for the
              certifications below — verified by each vendor.
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {VENDOR_LOGOS.map((v) => (
              <div
                key={v.vendor}
                className="group relative rounded-2xl glass p-5 lift overflow-hidden"
              >
                <div className="relative aspect-[1024/699] overflow-hidden rounded-xl bg-white">
                  <Image
                    src={v.src}
                    alt={v.alt}
                    fill
                    sizes="(max-width:768px) 50vw, 240px"
                    className="object-contain p-2"
                  />
                </div>
                <div className="mt-3 text-center">
                  <div className="font-display text-sm font-bold text-fg">
                    {v.label}
                  </div>
                  <div className="font-mono text-[10px] uppercase tracking-wider text-fg-faint mt-0.5">
                    {v.vendor}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <MetroCoverage
        title={
          <>
            Training cohorts in{" "}
            <span className="gradient-text">every Indian metro.</span>
          </>
        }
        description="Weekend on-site cohorts at Macksofy BKC Mumbai · live online cohorts pan-India · corporate-batch delivery at your campus in Delhi, Bengaluru, Hyderabad, Chennai, Pune, Kolkata, Ahmedabad, Gurugram and the UAE."
      />
      <Testimonials />
      <LeadCapture />
    </>
  );
}
