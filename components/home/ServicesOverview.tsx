"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { LinkButton } from "@/components/ui/Button";
import { SERVICES } from "@/content/services";
import { FadeIn, StaggerChildren, StaggerItem } from "@/components/motion/FadeIn";

export function ServicesOverview() {
  const featured = SERVICES.slice(0, 6);
  return (
    <section className="relative py-24 sm:py-32">
      <div className="absolute inset-0 spotlight-blend opacity-40" />
      <Container className="relative">
        <FadeIn>
          <SectionTitle
            eyebrow="What we do"
            title={
              <>
                Cybersecurity services that{" "}
                <span className="gradient-text">find what others miss.</span>
              </>
            }
            description="Manual + tooled offensive security, defensive engineering and regulator-grade audits — by an OSCP / OSWE / OSEP-certified team out of Mumbai."
          />
        </FadeIn>

        <StaggerChildren className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((s) => {
            const Icon = s.icon;
            return (
              <StaggerItem key={s.slug}>
                <Link href={`/services/${s.slug}`} className="group block h-full">
                  <motion.div
                    whileHover={{ y: -6 }}
                    transition={{ type: "spring", stiffness: 220, damping: 22 }}
                    className="relative h-full rounded-2xl glass p-6 hover:border-neon-cyan/40 transition-colors"
                  >
                    <div className="absolute -right-12 -top-12 size-40 rounded-full bg-neon-cyan/0 blur-2xl transition-all duration-500 group-hover:bg-neon-cyan/20" />
                    <div className="relative flex items-start justify-between">
                      <div className="grid size-12 place-items-center rounded-xl bg-bg-2 text-neon-cyan ring-1 ring-neon-cyan/30 group-hover:scale-110 transition-transform">
                        <Icon className="size-6" />
                      </div>
                      <ArrowUpRight className="size-5 text-fg-faint group-hover:text-neon-cyan group-hover:rotate-12 transition-all" />
                    </div>
                    <h3 className="relative mt-5 font-display text-xl font-bold text-fg">
                      {s.title}
                    </h3>
                    <p className="relative mt-2 text-sm leading-6 text-fg-muted line-clamp-3">
                      {s.hero.description}
                    </p>
                    <div className="relative mt-5 flex flex-wrap gap-1.5">
                      {s.industriesServed.slice(0, 3).map((i) => (
                        <span
                          key={i}
                          className="rounded-full bg-white/5 px-2 py-0.5 text-[10px] font-semibold text-fg-muted"
                        >
                          {i}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                </Link>
              </StaggerItem>
            );
          })}
        </StaggerChildren>

        <div className="mt-12 flex justify-center">
          <LinkButton href="/services" variant="secondary" withArrow>
            Explore all 9 services
          </LinkButton>
        </div>
      </Container>
    </section>
  );
}
