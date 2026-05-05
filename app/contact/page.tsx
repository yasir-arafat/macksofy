import Link from "next/link";
import {
  MapPin,
  Phone,
  Mail,
  MessageCircle,
  ArrowRight,
  Clock,
  ShieldCheck,
  CheckCircle2,
  Lock,
  FileText,
  CreditCard,
  Globe2,
  PhoneCall,
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/SectionTitle";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { ContactForm } from "@/components/forms/ContactForm";
import { ParticleBackground } from "@/components/visuals/ParticleBackground";
import { GlowOrb } from "@/components/visuals/GlowOrb";
import { CertInBadge } from "@/components/visuals/CertInBadge";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema, faqSchema } from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";
import { SITE } from "@/lib/site";
import { LOCATIONS } from "@/components/contact/Locations";
import { MapSwitcher } from "@/components/contact/MapSwitcher";
import { LocationsAtlas } from "@/components/contact/LocationsAtlas";
import { WorldClocks } from "@/components/contact/WorldClocks";
import { ScopeWizard } from "@/components/contact/ScopeWizard";
import { EngagementChips } from "@/components/contact/EngagementChips";
import { NextSteps } from "@/components/contact/NextSteps";
import { LiveHours } from "@/components/contact/LiveHours";

export const metadata = buildMetadata({
  title: "Contact Macksofy — 5 cities · Mumbai HQ · Dubai · Hyderabad · Muscat · Toronto",
  description:
    "Reach Macksofy across our five delivery cities. Live local times, interactive city map, 60-second scope wizard, and a CERT-In empanelled consultant available within 4 business hours.",
  path: "/contact",
  keywords: [
    "Macksofy contact Mumbai",
    "cybersecurity company contact India",
    "Macksofy BKC office",
    "Macksofy Dubai office",
    "Macksofy Hyderabad",
    "Macksofy Muscat Toronto",
    "CERT-In auditor contact",
    "pentest enquiry India UAE",
  ],
});

interface PageProps {
  searchParams: Promise<{ interest?: string }>;
}

const FAQS = [
  {
    q: "How quickly will I hear back?",
    a: "Within 4 business hours during IST working days. Urgent regulator deadlines are escalated immediately — call us directly on the number above.",
  },
  {
    q: "Will you sign an NDA before discovery?",
    a: "Yes — we sign mutual NDAs as the first step. Send us yours or we'll provide a standard mutual NDA on request.",
  },
  {
    q: "Do you do fixed-price quotes?",
    a: "Yes for almost every engagement. We provide a fixed-price scoped proposal within 48–72 hours of the discovery call. T&M is reserved for very loosely scoped retainers.",
  },
  {
    q: "Do you accept payment in INR or AED?",
    a: "Both — and USD, EUR for international engagements. We accept bank transfer, RTGS/NEFT, and corporate card via secure invoicing.",
  },
  {
    q: "Can you support our regulator inspection?",
    a: "Yes. We routinely sit through RBI / SEBI / CERT-In / UIDAI inspections alongside client teams and answer auditor queries on the spot.",
  },
  {
    q: "Do you work outside India and the UAE?",
    a: "Yes — we have delivered engagements in Oman, Singapore, the UK and Canada. Contact us with your geography and timezone constraints.",
  },
];

export default async function ContactPage({ searchParams }: PageProps) {
  const sp = await searchParams;

  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([{ name: "Contact", url: "/contact" }]),
          faqSchema(FAQS),
          {
            "@context": "https://schema.org",
            "@type": "ContactPage",
            name: "Contact Macksofy Technologies",
            url: `${SITE.url}/contact`,
            mainEntity: LOCATIONS.map((o) => ({
              "@type": "Organization",
              name: `Macksofy Technologies — ${o.city}`,
              address: {
                "@type": "PostalAddress",
                streetAddress: o.address,
                addressLocality: o.city,
                addressCountry: o.countryCode,
              },
              ...(o.phone && { telephone: o.phone }),
              ...(o.email && { email: o.email }),
              geo: {
                "@type": "GeoCoordinates",
                latitude: o.lat,
                longitude: o.lng,
              },
            })),
          },
        ]}
      />

      {/* HERO */}
      <section className="relative isolate overflow-hidden">
        <ParticleBackground density={70} />
        <GlowOrb className="-top-40 left-1/3" color="cyan" size={600} />
        <GlowOrb className="-bottom-20 right-1/4" color="purple" size={500} />
        <Container className="relative pt-12 pb-12 sm:pt-16 sm:pb-16">
          <Breadcrumbs items={[{ name: "Contact", href: "/contact" }]} />

          <div className="mt-10 grid gap-12 lg:grid-cols-12 items-end">
            <div className="lg:col-span-8">
              <Eyebrow>Talk to a senior consultant</Eyebrow>
              <h1 className="mt-4 font-display text-5xl font-black sm:text-6xl lg:text-7xl text-balance leading-[0.95]">
                Five cities,{" "}
                <span className="gradient-text">one team.</span>
              </h1>
              <p className="mt-6 max-w-2xl text-lg text-fg-muted text-pretty">
                Pentests, audits, training and wider engagements — across India,
                UAE, Oman and North America. CERT-In empanelled, OSCP/OSWE/OSEP-led
                teams, fixed-price quotes within 72 hours.
              </p>

              <div className="mt-7 flex flex-wrap items-center gap-4">
                <LiveHours tz="Asia/Kolkata" />
                <span className="text-fg-faint text-xs">·</span>
                <LiveHours tz="Asia/Dubai" />
                <span className="text-fg-faint text-xs">·</span>
                <CertInBadge size="sm" />
              </div>
            </div>

            <div className="lg:col-span-4">
              <div className="grid grid-cols-2 gap-3">
                {[
                  { value: "<4h", label: "Response time" },
                  { value: "200+", label: "Engagements / yr" },
                  { value: "5", label: "Countries served" },
                  { value: "11+", label: "Years in business" },
                ].map((s) => (
                  <div
                    key={s.label}
                    className="rounded-2xl glass p-4 text-left"
                  >
                    <div className="font-display text-2xl font-black gradient-text leading-none">
                      {s.value}
                    </div>
                    <div className="mt-2 font-mono text-[9px] uppercase tracking-[0.2em] text-fg-faint">
                      {s.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* WORLD CLOCKS */}
      <Container className="pb-10">
        <WorldClocks />
      </Container>

      {/* QUICK ACTIONS */}
      <Container className="pb-10">
        <div className="grid gap-4 sm:grid-cols-3">
          <a
            href={SITE.whatsappLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative isolate overflow-hidden rounded-2xl ring-1 ring-emerald-500/30 bg-gradient-to-br from-emerald-500/10 to-bg p-6 hover:ring-emerald-400/60 transition-all hover:-translate-y-0.5"
          >
            <div
              aria-hidden
              className="absolute -top-12 -right-12 size-40 rounded-full bg-emerald-500/0 blur-2xl transition-all duration-500 group-hover:bg-emerald-500/30"
            />
            <div className="relative flex items-start justify-between">
              <div className="grid size-12 place-items-center rounded-xl bg-emerald-500/15 ring-1 ring-emerald-500/40 text-emerald-300">
                <MessageCircle className="size-6" />
              </div>
              <span className="font-mono text-[9px] uppercase tracking-[0.22em] text-emerald-300">
                Fastest
              </span>
            </div>
            <div className="mt-5 font-display text-xl font-black text-fg group-hover:text-emerald-300 transition-colors">
              WhatsApp
            </div>
            <p className="mt-1 text-xs text-fg-muted">
              Chat with a consultant in real time. Typical reply &lt; 15 min.
            </p>
            <span className="mt-4 inline-flex items-center gap-1 text-sm font-bold text-emerald-300">
              Open chat <ArrowRight className="size-3.5" />
            </span>
          </a>

          <a
            href={`tel:${SITE.phone}`}
            className="group relative isolate overflow-hidden rounded-2xl ring-1 ring-neon-cyan/30 bg-gradient-to-br from-neon-cyan/10 to-bg p-6 hover:ring-neon-cyan/60 transition-all hover:-translate-y-0.5"
          >
            <div
              aria-hidden
              className="absolute -top-12 -right-12 size-40 rounded-full bg-neon-cyan/0 blur-2xl transition-all duration-500 group-hover:bg-neon-cyan/30"
            />
            <div className="relative flex items-start justify-between">
              <div className="grid size-12 place-items-center rounded-xl bg-neon-cyan/15 ring-1 ring-neon-cyan/40 text-neon-cyan">
                <PhoneCall className="size-6" />
              </div>
              <span className="font-mono text-[9px] uppercase tracking-[0.22em] text-neon-cyan">
                Direct line
              </span>
            </div>
            <div className="mt-5 font-display text-xl font-black text-fg group-hover:text-neon-cyan transition-colors">
              Call us
            </div>
            <p className="mt-1 text-xs text-fg-muted">
              {SITE.phoneDisplay} · landline {SITE.phoneAltDisplay}
            </p>
            <span className="mt-4 inline-flex items-center gap-1 text-sm font-bold text-neon-cyan">
              Dial now <ArrowRight className="size-3.5" />
            </span>
          </a>

          <a
            href={`mailto:${SITE.email}`}
            className="group relative isolate overflow-hidden rounded-2xl ring-1 ring-neon-purple/30 bg-gradient-to-br from-neon-purple/10 to-bg p-6 hover:ring-neon-purple/60 transition-all hover:-translate-y-0.5"
          >
            <div
              aria-hidden
              className="absolute -top-12 -right-12 size-40 rounded-full bg-neon-purple/0 blur-2xl transition-all duration-500 group-hover:bg-neon-purple/30"
            />
            <div className="relative flex items-start justify-between">
              <div className="grid size-12 place-items-center rounded-xl bg-neon-purple/15 ring-1 ring-neon-purple/40 text-neon-purple">
                <Mail className="size-6" />
              </div>
              <span className="font-mono text-[9px] uppercase tracking-[0.22em] text-neon-purple">
                Detailed
              </span>
            </div>
            <div className="mt-5 font-display text-xl font-black text-fg group-hover:text-neon-purple transition-colors">
              Email
            </div>
            <p className="mt-1 text-xs text-fg-muted">
              {SITE.email} · attach RFP, scope or NDA — we&rsquo;ll triage same day.
            </p>
            <span className="mt-4 inline-flex items-center gap-1 text-sm font-bold text-neon-purple">
              Compose <ArrowRight className="size-3.5" />
            </span>
          </a>
        </div>
      </Container>

      {/* SCOPE WIZARD + ENGAGEMENT CHIPS */}
      <Container className="pb-10">
        <div className="grid gap-5 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <ScopeWizard />
          </div>
          <div className="lg:col-span-5">
            <div className="rounded-3xl bg-bg-2/40 ring-1 ring-line p-5 sm:p-6 h-full">
              <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-neon-purple font-semibold inline-flex items-center gap-2">
                <span className="size-1.5 rounded-full bg-neon-purple animate-pulse" />
                Or jump straight to a topic
              </div>
              <h3 className="mt-3 font-display text-lg font-bold text-fg leading-tight">
                Quick-pick — these prefill the form below.
              </h3>
              <div className="mt-5">
                <EngagementChips active={sp.interest} />
              </div>
              <div className="mt-5 pt-5 border-t border-line/60 text-xs text-fg-faint">
                Don&rsquo;t see your case? Use the form — we&rsquo;ve handled every BFSI,
                healthcare, government, e-commerce, manufacturing and SaaS scenario you
                can imagine.
              </div>
            </div>
          </div>
        </div>
      </Container>

      {/* FORM + SIDE INSIGHTS */}
      <Container id="enquiry" className="py-8 sm:py-12 scroll-mt-28">
        <div className="grid gap-8 lg:grid-cols-12">
          {/* FORM */}
          <div className="lg:col-span-7">
            <div className="rounded-3xl glass-strong p-6 sm:p-8 glow-blend">
              <div className="flex items-baseline justify-between gap-4 flex-wrap">
                <div>
                  <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-neon-cyan font-semibold inline-flex items-center gap-2">
                    <span className="size-1.5 rounded-full bg-neon-cyan animate-pulse" />
                    Enquiry form
                  </div>
                  <h2 className="mt-2 font-display text-2xl sm:text-3xl font-black text-fg leading-tight">
                    Send us a message
                  </h2>
                  <p className="mt-1 text-sm text-fg-muted">
                    Senior consultant reply within 4 business hours.
                  </p>
                </div>
                <div className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 ring-1 ring-emerald-500/30 px-3 py-1 text-[11px] font-mono text-emerald-300">
                  <Lock className="size-3" /> TLS · Turnstile · Rate-limited
                </div>
              </div>
              <div className="mt-7">
                <ContactForm initialInterest={sp.interest ?? ""} />
              </div>
            </div>
          </div>

          {/* SIDE */}
          <aside className="lg:col-span-5 space-y-5">
            <NextSteps />

            <div className="rounded-3xl bg-gradient-to-br from-neon-cyan/[0.06] to-neon-purple/[0.06] ring-1 ring-line p-6">
              <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-neon-cyan font-semibold inline-flex items-center gap-2">
                <ShieldCheck className="size-3.5" />
                Buying with confidence
              </div>
              <ul className="mt-4 space-y-2.5 text-sm">
                {[
                  "CERT-In empanelled — regulator-acceptable reports",
                  "Fixed-price quotes inside 72 hours",
                  "Mutual NDA before any technical scoping",
                  "Free retest within 30 days of remediation",
                  "Same consultant from kickoff to closeout",
                  "Reports formatted for RBI / SEBI / UIDAI / SOC 2 / ISO",
                ].map((b) => (
                  <li key={b} className="flex gap-2.5 text-fg-muted leading-relaxed">
                    <CheckCircle2 className="size-4 text-neon-cyan shrink-0 mt-0.5" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-3xl bg-bg-2/40 ring-1 ring-line p-6">
              <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-neon-purple font-semibold inline-flex items-center gap-2">
                <Globe2 className="size-3.5" />
                Geographies covered
              </div>
              <div className="mt-4 grid grid-cols-2 gap-3 text-sm text-fg-muted">
                <div className="flex items-center gap-2">
                  <span>🇮🇳</span> India (all states)
                </div>
                <div className="flex items-center gap-2">
                  <span>🇦🇪</span> UAE
                </div>
                <div className="flex items-center gap-2">
                  <span>🇴🇲</span> Oman
                </div>
                <div className="flex items-center gap-2">
                  <span>🇸🇬</span> Singapore
                </div>
                <div className="flex items-center gap-2">
                  <span>🇨🇦</span> Canada
                </div>
                <div className="flex items-center gap-2">
                  <span>🇬🇧</span> UK
                </div>
              </div>
            </div>
          </aside>
        </div>
      </Container>

      {/* OFFICES — interactive map switcher + atlas */}
      <section className="py-16 sm:py-20 bg-bg-1">
        <Container>
          <div className="flex items-end justify-between gap-6 flex-wrap">
            <div>
              <Eyebrow>Visit us</Eyebrow>
              <h2 className="mt-3 font-display text-3xl sm:text-4xl lg:text-5xl font-black text-balance leading-[1.05]">
                Five offices, <span className="gradient-text">one team.</span>
              </h2>
              <p className="mt-4 max-w-2xl text-fg-muted text-pretty">
                Mumbai BKC is our global headquarters. Dubai serves the GCC.
                Hyderabad covers South India. Muscat is our Oman engagement site,
                Toronto our North-America cross-border partner. All offices share
                the same engineers and report templates.
              </p>
            </div>
            <div className="inline-flex items-center gap-2 rounded-full bg-neon-cyan/10 ring-1 ring-neon-cyan/30 px-3 py-1.5 text-xs font-mono text-neon-cyan">
              <MapPin className="size-3.5" />
              Tap any pin / tab
            </div>
          </div>

          <div className="mt-10 space-y-6">
            <MapSwitcher />
            <LocationsAtlas />
          </div>
        </Container>
      </section>

      {/* PROCUREMENT FAQ */}
      <section className="py-16 sm:py-20">
        <Container>
          <div className="grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <Eyebrow color="purple">Procurement FAQ</Eyebrow>
              <h2 className="mt-3 font-display text-3xl sm:text-4xl font-black text-balance leading-[1.05]">
                Questions buyers ask{" "}
                <span className="gradient-text">before signing.</span>
              </h2>
              <p className="mt-4 text-sm text-fg-muted leading-relaxed">
                Six honest answers to the questions every CISO, CFO and procurement
                lead asks before kickoff. More on the call.
              </p>
              <div className="mt-6 inline-flex items-center gap-2 rounded-xl bg-bg-2 ring-1 ring-line p-3">
                <FileText className="size-4 text-neon-cyan" />
                <span className="text-xs text-fg-muted">
                  Sample sanitized report on request
                </span>
              </div>
            </div>
            <div className="lg:col-span-8">
              <ul className="grid gap-3 sm:grid-cols-2">
                {FAQS.map((f, i) => (
                  <li
                    key={i}
                    className="rounded-2xl glass p-5 hover:border-neon-cyan/30 transition-colors"
                  >
                    <div className="font-display text-sm font-bold text-fg">
                      {f.q}
                    </div>
                    <p className="mt-2 text-xs text-fg-muted leading-relaxed">
                      {f.a}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </section>

      {/* CTA STRIP */}
      <section className="py-16 sm:py-20 bg-bg-1">
        <Container>
          <div className="rounded-3xl gradient-border p-px">
            <div className="rounded-3xl bg-bg-2 p-8 sm:p-10 grid gap-8 lg:grid-cols-12 items-center">
              <div className="lg:col-span-7">
                <Eyebrow>Ready when you are</Eyebrow>
                <h2 className="mt-3 font-display text-3xl sm:text-4xl font-black text-balance leading-tight">
                  Skip the form — talk to us in 60 seconds.
                </h2>
                <p className="mt-3 text-fg-muted text-pretty">
                  Most enquiries become discovery calls within the same day. WhatsApp
                  and direct dial both reach a senior consultant.
                </p>
                <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 gap-3 max-w-xl">
                  {[
                    { label: "Mon–Sat", value: "9:30–18:30" },
                    { label: "Time zone", value: "IST · GST" },
                    { label: "Languages", value: "EN · HI · MR" },
                  ].map((m) => (
                    <div
                      key={m.label}
                      className="rounded-xl bg-bg ring-1 ring-line p-3"
                    >
                      <div className="font-mono text-[9px] uppercase tracking-[0.2em] text-fg-faint">
                        {m.label}
                      </div>
                      <div className="mt-1 font-display text-sm font-bold text-fg">
                        {m.value}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="lg:col-span-5">
                <div className="grid gap-3">
                  <a
                    href={SITE.whatsappLink()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-between gap-3 rounded-xl bg-emerald-500/15 ring-1 ring-emerald-500/40 px-5 py-3.5 text-sm font-bold text-emerald-300 hover:bg-emerald-500/25 transition-colors"
                  >
                    <span className="inline-flex items-center gap-2">
                      <MessageCircle className="size-4" /> WhatsApp now
                    </span>
                    <ArrowRight className="size-4" />
                  </a>
                  <a
                    href={`tel:${SITE.phone}`}
                    className="inline-flex items-center justify-between gap-3 rounded-xl bg-neon-cyan/15 ring-1 ring-neon-cyan/40 px-5 py-3.5 text-sm font-bold text-neon-cyan hover:bg-neon-cyan/25 transition-colors"
                  >
                    <span className="inline-flex items-center gap-2">
                      <Phone className="size-4" /> {SITE.phoneDisplay}
                    </span>
                    <ArrowRight className="size-4" />
                  </a>
                  <Link
                    href="#enquiry"
                    className="inline-flex items-center justify-between gap-3 rounded-xl bg-gradient-to-r from-neon-cyan via-neon-blue to-neon-purple px-5 py-3.5 text-sm font-bold text-white shadow-[0_0_30px_rgba(0,229,255,0.3)] hover:shadow-[0_0_45px_rgba(168,85,247,0.45)] transition-shadow"
                  >
                    <span className="inline-flex items-center gap-2">
                      <CreditCard className="size-4" /> Book a discovery call
                    </span>
                    <ArrowRight className="size-4" />
                  </Link>
                  <div className="mt-1 inline-flex items-center gap-2 text-xs text-fg-faint">
                    <Clock className="size-3.5" /> Average reply &lt; 4 business hours
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
