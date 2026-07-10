"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
  ArrowUpRight,
  Send,
  Clock,
  Sparkles,
  ChevronRight,
} from "lucide-react";
import { SITE } from "@/lib/site";
import { Container } from "@/components/ui/Container";
import { COURSES } from "@/content/courses";
import { SERVICES } from "@/content/services";
import { AUDITS } from "@/content/audits";
import { cn } from "@/lib/utils";
import { CookiePrefsLink } from "@/components/widgets/CookiePrefsLink";

/* ──────────────────────────────────────────────────────────────
   SOCIAL ICONS (inline SVG — Lucide v1 doesn't ship brand logos)
   ────────────────────────────────────────────────────────────── */
const SOCIALS = [
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/company/macksofy-technologies-pvt-ltd/",
    color: "hover:text-[#0A66C2]",
    Icon: (props: React.SVGProps<SVGSVGElement>) => (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
        <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.95v5.66H9.36V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.55C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.72C24 .77 23.2 0 22.22 0z" />
      </svg>
    ),
  },
  {
    name: "X (Twitter)",
    href: "https://x.com/macksofyt",
    color: "hover:text-fg",
    Icon: (props: React.SVGProps<SVGSVGElement>) => (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231 5.45-6.231z" />
      </svg>
    ),
  },
  {
    name: "Facebook",
    href: "https://www.facebook.com/macksofy/",
    color: "hover:text-[#1877F2]",
    Icon: (props: React.SVGProps<SVGSVGElement>) => (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
        <path d="M24 12.07C24 5.4 18.63 0 12 0S0 5.4 0 12.07C0 18.1 4.39 23.1 10.13 24v-8.44H7.08v-3.49h3.05V9.41c0-3.02 1.79-4.69 4.53-4.69 1.31 0 2.69.24 2.69.24v2.97h-1.52c-1.49 0-1.96.93-1.96 1.89v2.26h3.33l-.53 3.49h-2.8V24C19.61 23.1 24 18.1 24 12.07z" />
      </svg>
    ),
  },
  {
    name: "Instagram",
    href: "https://www.instagram.com/macksofy_technologies/",
    color: "hover:text-[#E4405F]",
    Icon: (props: React.SVGProps<SVGSVGElement>) => (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
        <path d="M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.22.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38a3.7 3.7 0 0 1-1.38.9c-.42.16-1.06.36-2.22.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41a3.7 3.7 0 0 1-1.38-.9 3.7 3.7 0 0 1-.9-1.38c-.16-.42-.36-1.06-.41-2.22C2.18 15.58 2.16 15.2 2.16 12s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.22-.41C8.42 2.18 8.8 2.16 12 2.16zM12 0C8.74 0 8.33.01 7.05.07 5.78.13 4.9.33 4.14.63a5.86 5.86 0 0 0-2.13 1.38A5.86 5.86 0 0 0 .63 4.14C.33 4.9.13 5.78.07 7.05.01 8.33 0 8.74 0 12s.01 3.67.07 4.95c.06 1.27.26 2.15.56 2.91.31.79.73 1.46 1.38 2.13.66.66 1.34 1.07 2.13 1.38.76.3 1.64.5 2.91.56C8.33 23.99 8.74 24 12 24s3.67-.01 4.95-.07c1.27-.06 2.15-.26 2.91-.56a5.86 5.86 0 0 0 2.13-1.38 5.86 5.86 0 0 0 1.38-2.13c.3-.76.5-1.64.56-2.91.06-1.28.07-1.69.07-4.95s-.01-3.67-.07-4.95c-.06-1.27-.26-2.15-.56-2.91a5.86 5.86 0 0 0-1.38-2.13A5.86 5.86 0 0 0 19.86.63c-.76-.3-1.64-.5-2.91-.56C15.67.01 15.26 0 12 0zm0 5.84a6.16 6.16 0 1 0 0 12.32 6.16 6.16 0 0 0 0-12.32zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.4-11.85a1.44 1.44 0 1 0 0 2.88 1.44 1.44 0 0 0 0-2.88z" />
      </svg>
    ),
  },
];

const STATUS_ITEMS = [
  "🛡  CERT-In Empanelled · Information Security Auditor",
  "✓  EC-Council ATC · CompTIA Authorized",
  "🟢  Mumbai SOC · 24×7 monitored",
  "📍  Mumbai BKC HQ · Dubai delivery · India + UAE engagements",
  "🎓  20,000+ professionals trained · 250+ enterprises secured",
  "🏆  CSI Cyber Security Awards 2025 winner",
];

/* ──────────────────────────────────────────────────────────────
   FOOTER
   ────────────────────────────────────────────────────────────── */
export function Footer() {
  return (
    <footer className="relative mt-32 isolate overflow-hidden border-t border-line bg-bg-1">
      {/* gradient top accent */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-neon-cyan/60 to-transparent" />
      {/* glow orbs */}
      <div className="pointer-events-none absolute -top-32 left-1/4 size-[500px] rounded-full bg-neon-cyan/10 blur-[120px]" />
      <div className="pointer-events-none absolute -bottom-32 right-1/4 size-[500px] rounded-full bg-neon-purple/10 blur-[120px]" />

      <PreFooterCTA />

      <Container className="py-16 lg:py-20 relative">
        <NewsletterRow />

        {/* ─── Main link grid: brand identity + 4 link columns ─── */}
        <div className="mt-16 grid gap-10 lg:grid-cols-12">
          {/* Brand identity — col-4, compact */}
          <div className="lg:col-span-4">
            <Link href="/" className="inline-flex items-center group">
              <Image
                src="/macksofywhite.png"
                alt="Macksofy Technologies"
                width={180}
                height={50}
                className="h-11 w-auto transition-transform group-hover:scale-105"
                // Footer sits below the fold on every page — it must NOT be
                // `priority` (that preloaded it into the LCP critical path
                // site-wide). Default lazy-loading is correct here.
                loading="lazy"
              />
            </Link>
            <p className="mt-5 text-sm leading-relaxed text-fg-muted max-w-sm">
              {SITE.description}
            </p>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mt-6 inline-flex items-center gap-2.5 rounded-full gradient-border px-3 py-1.5 text-xs font-semibold text-fg glow-cyan"
            >
              <ShieldCheck className="size-4 text-neon-cyan" />
              CERT-In Empanelled · Govt of India · MeitY
            </motion.div>

            <SocialRow />
          </div>

          {/* Link columns */}
          <FooterCol title="Security Assessment">
            {SERVICES.filter((s) => s.popular).slice(0, 6).map((s) => (
              <FooterLinkAnimated key={s.slug} href={`/services/${s.slug}`}>
                {s.shortTitle}
              </FooterLinkAnimated>
            ))}
            <FooterLinkAnimated href="/services" highlight>
              All assessments →
            </FooterLinkAnimated>
          </FooterCol>

          <FooterCol title="Training">
            {COURSES.filter((c) => c.popular).slice(0, 6).map((c) => (
              <FooterLinkAnimated key={c.slug} href={`/training/${c.slug}`}>
                {c.shortTitle}
              </FooterLinkAnimated>
            ))}
            <FooterLinkAnimated href="/training" highlight>
              All {COURSES.length} trainings →
            </FooterLinkAnimated>
          </FooterCol>

          <FooterCol title="Security Compliance">
            {(
              [
                "cert-in-empanelled-audit",
                "iso-27001",
                "soc-2",
                "rbi-csf",
                "sebi-cscrf",
                "pci-dss",
                "dpdp-act",
                "hipaa",
                "uae-pdpl",
              ] as const
            )
              .map((slug) => AUDITS.find((a) => a.slug === slug))
              .filter((a): a is (typeof AUDITS)[number] => Boolean(a))
              .map((a) => (
                <FooterLinkAnimated key={a.slug} href={`/audit/${a.slug}`}>
                  {a.shortTitle}
                </FooterLinkAnimated>
              ))}
            <FooterLinkAnimated href="/audit" highlight>
              All {AUDITS.length} frameworks →
            </FooterLinkAnimated>
          </FooterCol>

          <FooterCol title="Company">
            <FooterLinkAnimated href="/about">About</FooterLinkAnimated>
            <FooterLinkAnimated href="/best-cybersecurity-company">
              Best Cybersecurity Company
            </FooterLinkAnimated>
            <FooterLinkAnimated href="/clients">Clients</FooterLinkAnimated>
            <FooterLinkAnimated href="/case-studies">Case Studies</FooterLinkAnimated>
            <FooterLinkAnimated href="/resources">Resources</FooterLinkAnimated>
            <FooterLinkAnimated href="/awards">Awards</FooterLinkAnimated>
            <FooterLinkAnimated href="/press">Press</FooterLinkAnimated>
            <FooterLinkAnimated href="/blog">Blog</FooterLinkAnimated>
            <FooterLinkAnimated href="/products/pentaudit">Pentaudit</FooterLinkAnimated>
            <FooterLinkAnimated href="/products/learn-to-exploit">LearnToExploit</FooterLinkAnimated>
            <FooterLinkAnimated href="/contact">Contact</FooterLinkAnimated>
            <FooterLinkAnimated href="/sitemap.xml">Sitemap</FooterLinkAnimated>
          </FooterCol>
        </div>

        {/* ─── Reach Macksofy strip: contact + live clocks ─── */}
        <div className="mt-14 pt-10 border-t border-line grid gap-8 lg:grid-cols-12 items-start">
          {/* Contact — col-7 */}
          <div className="lg:col-span-7">
            <div className="font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-neon-cyan mb-4 inline-flex items-center gap-2">
              <span className="size-1 rounded-full bg-neon-cyan animate-pulse" />
              Reach Macksofy
            </div>
            <ul className="grid gap-4 sm:grid-cols-3 text-sm">
              <ContactRow icon={Mail} href={`mailto:${SITE.email}`}>
                <span className="block font-mono text-[9px] uppercase tracking-[0.18em] text-fg-faint">
                  Email
                </span>
                <span className="block mt-0.5">{SITE.email}</span>
              </ContactRow>
              <ContactRow icon={Phone} href={`tel:${SITE.phone}`}>
                <span className="block font-mono text-[9px] uppercase tracking-[0.18em] text-fg-faint">
                  Phone
                </span>
                <span className="block mt-0.5">{SITE.phoneDisplay}</span>
              </ContactRow>
              <li className="flex items-start gap-3 text-fg-muted">
                <MapPin className="size-4 mt-0.5 shrink-0 text-neon-cyan" />
                <span>
                  <span className="block font-mono text-[9px] uppercase tracking-[0.18em] text-fg-faint">
                    HQ · Mumbai
                  </span>
                  <span className="block mt-0.5">
                    {SITE.hq.locality}, {SITE.hq.city}
                  </span>
                  <span className="block text-fg-faint text-xs">
                    UAE: Dubai · Abu Dhabi · Sharjah
                  </span>
                </span>
              </li>
            </ul>
          </div>

          {/* Live clocks — col-5 */}
          <div className="lg:col-span-5">
            <div className="font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-neon-cyan mb-4 inline-flex items-center gap-2">
              <span className="size-1 rounded-full bg-neon-cyan animate-pulse" />
              Local time
            </div>
            <FooterClock />
          </div>
        </div>

        {/* ─── Disclaimer — full-width glass card ─── */}
        <div className="mt-10 rounded-xl glass p-5 sm:p-6 text-xs leading-relaxed text-fg-muted">
          <div className="font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-neon-cyan mb-3 inline-flex items-center gap-2">
            <span className="size-1 rounded-full bg-neon-cyan animate-pulse" />
            Disclaimer
          </div>
          <p>
            Some graphics used on this website are sourced from public domains and are freely available for use. This site may also contain copyrighted material whose use has not always been specifically authorized by the copyright owner. All product names, trademarks, and brands mentioned are the property of their respective owners. Certification titles referenced are trademarks of the issuing organizations.
          </p>
          <p className="mt-3">
            References to companies, products, and services on this website are for identification purposes only. We do not own, claim copyright over, or have explicit permission to use these names, logos, or trademarks, and their inclusion does not imply endorsement.
          </p>
          <p className="mt-3">
            For further information or concerns, please{" "}
            <Link
              href="/contact"
              className="text-neon-cyan font-semibold hover:underline"
            >
              contact us directly
            </Link>
            .
          </p>
        </div>

        {/* ─── Status marquee ─── */}
        <div className="mt-10 pt-6 border-t border-line">
          <StatusMarquee />
        </div>

        {/* ─── Legal bottom bar ─── */}
        <div className="mt-6 flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center">
          <p className="text-xs text-fg-faint">
            © {new Date().getFullYear()} {SITE.legalName}. All rights reserved.
          </p>
          <div className="flex flex-wrap items-center gap-3 text-xs text-fg-faint">
            <Link
              href="/privacy"
              className="text-fg-muted hover:text-neon-cyan transition-colors"
            >
              Privacy &amp; cookies
            </Link>
            <span aria-hidden>·</span>
            <CookiePrefsLink className="text-fg-muted hover:text-neon-cyan transition-colors cursor-pointer">
              Cookie preferences
            </CookiePrefsLink>
            <span aria-hidden>·</span>
            <span>CERT-In Empanelled · ISO 27001 · India + UAE</span>
          </div>
        </div>
      </Container>
    </footer>
  );
}

/* ──────────────────────────────────────────────────────────────
   PRE-FOOTER CTA — big gradient card above main footer
   ────────────────────────────────────────────────────────────── */
function PreFooterCTA() {
  return (
    <Container className="pt-16">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="relative isolate overflow-hidden rounded-3xl gradient-border glow-blend"
      >
        {/* animated mesh background */}
        <motion.div
          aria-hidden
          animate={{
            backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 opacity-50"
          style={{
            background:
              "radial-gradient(circle at 20% 20%, rgba(0,229,255,0.18), transparent 40%), radial-gradient(circle at 80% 70%, rgba(168,85,247,0.18), transparent 40%), radial-gradient(circle at 50% 50%, rgba(77,124,255,0.10), transparent 60%)",
            backgroundSize: "200% 200%",
          }}
        />
        <div className="absolute inset-0 bg-grid opacity-30" />

        <div className="relative grid gap-8 p-8 sm:p-12 lg:p-14 lg:grid-cols-12 items-center">
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="inline-flex items-center gap-2 rounded-full bg-neon-cyan/15 ring-1 ring-neon-cyan/30 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.22em] text-neon-cyan"
            >
              <Sparkles className="size-3" />
              48-hour fixed-price proposal
            </motion.div>
            <h3 className="mt-4 font-display text-3xl font-black sm:text-4xl lg:text-5xl text-balance leading-[1.05]">
              Ready to secure your business{" "}
              <span className="gradient-text">— or train your team?</span>
            </h3>
            <p className="mt-4 text-fg-muted max-w-xl text-pretty">
              Talk to a senior consultant about a pentest, an audit, or a
              Macksofy training cohort. We reply in under 3 business hours.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/contact"
                className="btn-shine inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-neon-cyan via-neon-blue to-neon-purple h-12 px-6 text-sm font-bold text-white shadow-[0_0_30px_rgba(0,229,255,0.25)] hover:shadow-[0_0_45px_rgba(168,85,247,0.45)] transition-shadow"
              >
                Book Consultation <ArrowUpRight className="size-4" />
              </Link>
              <a
                href={SITE.whatsappLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-emerald-500 h-12 px-6 text-sm font-bold text-emerald-400 hover:bg-emerald-500 hover:text-white transition-colors"
              >
                Chat on WhatsApp
              </a>
              <a
                href={`tel:${SITE.phone}`}
                className="inline-flex items-center gap-2 px-3 text-sm font-semibold text-fg-muted hover:text-neon-cyan"
              >
                <Phone className="size-4" /> {SITE.phoneDisplay}
              </a>
            </div>
          </div>

          {/* Locations — real crawlable links to the /locations pillar.
             Every footer instance (i.e. every page) now feeds the location
             subtree, fixing the orphaned-pillar gap behind the GSC
             "Discovered – currently not indexed" backlog. Cities below all
             resolve to live /locations/<slug> pages. */}
          <div className="lg:col-span-5">
            <Link
              href="/locations"
              className="group inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.22em] text-fg-faint mb-3 hover:text-neon-cyan transition-colors"
            >
              Where we engage
              <ChevronRight className="size-3 group-hover:translate-x-0.5 transition-transform" />
            </Link>
            <div className="grid grid-cols-2 gap-3">
              {[
                { city: "Mumbai", role: "Global HQ", flag: "🇮🇳", slug: "mumbai", primary: true },
                { city: "Bengaluru", role: "South India", flag: "🇮🇳", slug: "bengaluru" },
                { city: "Delhi NCR", role: "North India", flag: "🇮🇳", slug: "delhi" },
                { city: "Hyderabad", role: "Deccan", flag: "🇮🇳", slug: "hyderabad" },
                { city: "Dubai", role: "UAE delivery", flag: "🇦🇪", slug: "dubai", primary: true },
                { city: "Abu Dhabi", role: "UAE federal", flag: "🇦🇪", slug: "abu-dhabi" },
              ].map((l, i) => (
                <motion.div
                  key={l.city}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + i * 0.05 }}
                >
                  <Link
                    href={`/locations/${l.slug}`}
                    className={cn(
                      "rounded-xl glass p-3 flex items-center gap-3 hover:border-neon-cyan/40 transition-colors h-full",
                      l.primary && "ring-1 ring-neon-cyan/30"
                    )}
                  >
                    <span className="text-xl">{l.flag}</span>
                    <div className="min-w-0">
                      <div className="text-sm font-semibold text-fg truncate">
                        {l.city}
                      </div>
                      <div className="font-mono text-[10px] uppercase tracking-wider text-fg-faint truncate">
                        {l.role}
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
            <Link
              href="/locations"
              className="group mt-3 inline-flex items-center gap-1 text-xs font-semibold text-neon-cyan hover:text-fg transition-colors"
            >
              View all locations
              <ArrowUpRight className="size-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>
          </div>
        </div>
      </motion.div>
    </Container>
  );
}

/* ──────────────────────────────────────────────────────────────
   NEWSLETTER ROW
   ────────────────────────────────────────────────────────────── */
function NewsletterRow() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "ok" | "error">("idle");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.includes("@")) return;
    try {
      await fetch("/api/lead-magnet", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, magnet: "footer-threat-intel-digest" }),
      });
      setStatus("ok");
      setEmail("");
    } catch {
      setStatus("error");
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5 }}
      className="rounded-2xl glass-strong p-6 sm:p-8"
    >
      <div className="grid gap-6 lg:grid-cols-12 items-center">
        <div className="lg:col-span-7">
          <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-neon-cyan">
            Threat-intel digest · monthly
          </div>
          <h3 className="mt-2 font-display text-xl font-bold text-fg sm:text-2xl text-balance">
            India + UAE cybersecurity briefings,{" "}
            <span className="gradient-text">in your inbox.</span>
          </h3>
          <p className="mt-2 text-sm text-fg-muted">
            Regulator updates (CERT-In · RBI · SEBI · NESA), recent breach analysis,
            and Macksofy research notes. No spam. Unsubscribe anytime.
          </p>
        </div>
        <form onSubmit={onSubmit} className="lg:col-span-5 flex gap-2">
          <div className="relative flex-1">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@company.com"
              className={cn(
                "w-full rounded-xl bg-bg-1 border px-4 py-3 text-sm text-fg placeholder:text-fg-faint transition-all",
                "focus:outline-none focus:border-neon-cyan focus:ring-2 focus:ring-neon-cyan/30",
                status === "ok" ? "border-emerald-400/40" : "border-line hover:border-line-strong"
              )}
            />
          </div>
          <button
            type="submit"
            className="btn-shine inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-neon-cyan via-neon-blue to-neon-purple px-5 py-3 text-sm font-bold text-white shadow-[0_0_24px_rgba(0,229,255,0.25)] hover:shadow-[0_0_36px_rgba(168,85,247,0.45)] transition-shadow"
          >
            {status === "ok" ? "Subscribed ✓" : "Subscribe"}
            {status !== "ok" && <Send className="size-4" />}
          </button>
        </form>
      </div>
    </motion.div>
  );
}

/* ──────────────────────────────────────────────────────────────
   LIVE TIME CLOCKS — Mumbai (IST) + Dubai (GST)
   ────────────────────────────────────────────────────────────── */
function FooterClock() {
  const [now, setNow] = useState<Date | null>(null);

  // Initial render is server-safe (null), client mounts the live clock.
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setNow(new Date());
    const t = setInterval(() => setNow(new Date()), 60_000);
    return () => clearInterval(t);
  }, []);

  if (!now) {
    return (
      <div className="mt-6 grid grid-cols-2 gap-3" aria-hidden>
        <ClockSkeleton city="Mumbai" tz="IST" />
        <ClockSkeleton city="Dubai" tz="GST" />
      </div>
    );
  }

  const ist = new Intl.DateTimeFormat("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    timeZone: "Asia/Kolkata",
  }).format(now);

  const gst = new Intl.DateTimeFormat("en-AE", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    timeZone: "Asia/Dubai",
  }).format(now);

  // Detect business hours (Mon-Sat 09:30-18:30 IST)
  const istNow = new Date(now.toLocaleString("en-US", { timeZone: "Asia/Kolkata" }));
  const day = istNow.getDay(); // 0 Sun, 6 Sat
  const minutes = istNow.getHours() * 60 + istNow.getMinutes();
  const open = day !== 0 && minutes >= 9 * 60 + 30 && minutes <= 18 * 60 + 30;

  return (
    <div className="mt-6 grid grid-cols-2 gap-3">
      <ClockCard city="Mumbai" tz="IST" time={ist} flag="🇮🇳" online={open} />
      <ClockCard city="Dubai" tz="GST" time={gst} flag="🇦🇪" />
    </div>
  );
}

function ClockSkeleton({ city, tz }: { city: string; tz: string }) {
  return (
    <div className="rounded-xl glass p-3">
      <div className="font-mono text-[10px] uppercase tracking-wider text-fg-faint">
        {city} · {tz}
      </div>
      <div className="mt-1 font-display text-lg font-bold text-fg-muted">--:--</div>
    </div>
  );
}

function ClockCard({
  city,
  tz,
  time,
  flag,
  online,
}: {
  city: string;
  tz: string;
  time: string;
  flag: string;
  online?: boolean;
}) {
  return (
    <div className="rounded-xl glass p-3">
      <div className="flex items-center justify-between">
        <span className="font-mono text-[10px] uppercase tracking-wider text-fg-faint inline-flex items-center gap-1.5">
          <span aria-hidden>{flag}</span> {city} · {tz}
        </span>
        {online !== undefined && (
          <span
            className={cn(
              "inline-flex items-center gap-1 font-mono text-[9px] uppercase tracking-wider",
              online ? "text-emerald-400" : "text-fg-faint"
            )}
          >
            <span
              className={cn(
                "size-1.5 rounded-full",
                online ? "bg-emerald-400 animate-pulse" : "bg-fg-faint"
              )}
            />
            {online ? "open" : "closed"}
          </span>
        )}
      </div>
      <div className="mt-1 font-display text-lg font-bold text-fg flex items-baseline gap-1">
        <Clock className="size-3.5 text-neon-cyan" />
        <span className="font-mono">{time}</span>
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────
   SOCIAL ROW
   ────────────────────────────────────────────────────────────── */
function SocialRow() {
  return (
    <div className="mt-6 flex items-center gap-2">
      {SOCIALS.map((s) => (
        <motion.a
          key={s.name}
          href={s.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={s.name}
          whileHover={{ y: -3 }}
          transition={{ type: "spring", stiffness: 400, damping: 18 }}
          className={cn(
            "grid size-9 place-items-center rounded-lg glass text-fg-muted transition-colors",
            s.color
          )}
        >
          <s.Icon className="size-4" />
        </motion.a>
      ))}
    </div>
  );
}

function ContactRow({
  icon: Icon,
  href,
  children,
}: {
  icon: React.ComponentType<{ className?: string }>;
  href: string;
  children: React.ReactNode;
}) {
  return (
    <li>
      <a
        href={href}
        className="group flex items-start gap-3 text-fg-muted hover:text-neon-cyan transition-colors"
      >
        <Icon className="size-4 mt-0.5 shrink-0 text-neon-cyan group-hover:scale-110 transition-transform" />
        <span>{children}</span>
      </a>
    </li>
  );
}

/* ──────────────────────────────────────────────────────────────
   FOOTER COLUMNS
   ────────────────────────────────────────────────────────────── */
function FooterCol({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="lg:col-span-2">
      <div className="font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-neon-cyan mb-4 inline-flex items-center gap-2">
        <span className="size-1 rounded-full bg-neon-cyan animate-pulse" />
        {title}
      </div>
      <ul className="space-y-2.5 text-sm">{children}</ul>
    </div>
  );
}

function FooterLinkAnimated({
  href,
  children,
  highlight,
}: {
  href: string;
  children: React.ReactNode;
  highlight?: boolean;
}) {
  return (
    <li>
      <Link
        href={href}
        className={cn(
          "group inline-flex items-center gap-1 transition-colors",
          highlight
            ? "text-neon-cyan font-semibold hover:text-fg"
            : "text-fg-muted hover:text-neon-cyan"
        )}
      >
        <ChevronRight className="size-3 -ml-3 opacity-0 -translate-x-1 transition-all group-hover:opacity-100 group-hover:translate-x-0 text-neon-cyan" />
        <span>{children}</span>
      </Link>
    </li>
  );
}

/* ──────────────────────────────────────────────────────────────
   STATUS MARQUEE — bottom infinite scrolling status strip
   ────────────────────────────────────────────────────────────── */
function StatusMarquee() {
  const reduce = useReducedMotion();
  const items = [...STATUS_ITEMS, ...STATUS_ITEMS];
  return (
    <div className="relative w-full overflow-hidden [mask-image:linear-gradient(90deg,transparent,white_8%,white_92%,transparent)]">
      <div
        className="flex w-max gap-8"
        style={{
          animation: reduce ? undefined : "marquee 60s linear infinite",
        }}
      >
        {items.map((it, i) => (
          <div
            key={i}
            className="font-mono text-[11px] uppercase tracking-[0.18em] text-fg-faint whitespace-nowrap flex items-center gap-3"
          >
            <span>{it}</span>
            <span className="text-neon-cyan/40">{"//"}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
