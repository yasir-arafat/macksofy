import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Clock, Users } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { LinkButton } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { COURSES, getCourseBySlug } from "@/content/courses";
import { FadeIn, StaggerChildren, StaggerItem } from "@/components/motion/FadeIn";
import { formatINR } from "@/lib/utils";

const HOME_FEATURED_SLUGS = [
  "ceh",
  "oscp",
  "chfi",
  "cysa-plus",
  "soc-analyst",
  "web-application-security",
] as const;

export function TrainingPreview() {
  const featured = HOME_FEATURED_SLUGS.map((s) => getCourseBySlug(s)).filter(
    (c): c is NonNullable<typeof c> => Boolean(c)
  );

  return (
    <section className="relative py-24 sm:py-32 bg-bg-1">
      <div className="absolute inset-0 bg-grid opacity-30" />
      <Container className="relative">
        <div className="flex flex-col items-end justify-between gap-6 sm:flex-row sm:items-end">
          <FadeIn>
            <SectionTitle
              eyebrow="Training"
              eyebrowColor="purple"
              title={
                <>
                  Career-grade certifications.{" "}
                  <span className="gradient-text">Mentor until you pass.</span>
                </>
              }
              description="Ethical hacking, penetration testing, SOC and forensics courses — EC-Council and CompTIA authorized programs, Offensive Security exam-prep bootcamps, and our own SOC Analyst and Web App Security career tracks. 100% practical labs, live online or classroom in Mumbai."
            />
          </FadeIn>
          <FadeIn delay={0.1}>
            <LinkButton href="/training" variant="ghost" withArrow className="text-fg hover:text-neon-cyan">
              All {COURSES.length} cyber security courses
            </LinkButton>
          </FadeIn>
        </div>

        <StaggerChildren className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {featured.map((c) => (
            <StaggerItem key={c.slug}>
              <Link
                href={`/training/${c.slug}`}
                className="group flex h-full flex-col overflow-hidden rounded-2xl glass ring-1 ring-transparent hover:ring-neon-cyan/40 transition-all hover:-translate-y-1"
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
                    <div className="flex items-center justify-between">
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
                  <h3 className="font-display text-lg font-bold text-fg group-hover:text-neon-cyan transition-colors line-clamp-2">
                    {c.title}
                  </h3>
                  <p className="mt-2 text-sm text-fg-muted line-clamp-2">
                    {c.hero.tagline}
                  </p>

                  <div className="mt-4 flex flex-wrap gap-3 text-xs text-fg-faint">
                    <span className="inline-flex items-center gap-1">
                      <Clock className="size-3.5" /> {c.duration.split(" · ")[0]}
                    </span>
                    {c.careerRoles.length > 0 && (
                      <span className="inline-flex items-center gap-1">
                        <Users className="size-3.5" /> {c.careerRoles.length} career roles
                      </span>
                    )}
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
  );
}
