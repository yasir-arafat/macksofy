import {
  Fish,
  CheckCircle2,
  GraduationCap,
  UserCheck,
  Users,
  ShieldAlert,
  MapPin,
  ScrollText,
  ServerCog,
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/SectionTitle";
import { Badge } from "@/components/ui/Badge";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { LinkButton } from "@/components/ui/Button";
import { ParticleBackground } from "@/components/visuals/ParticleBackground";
import { ToolStack } from "@/components/visuals/ToolStack";
import { RiskMeter } from "@/components/visuals/RiskMeter";
import { FAQAccordion } from "@/components/sections/FAQAccordion";
import { LeadCapture } from "@/components/home/LeadCapture";
import { WhereWeDeliver } from "@/components/sections/WhereWeDeliver";
import { JsonLd } from "@/components/seo/JsonLd";
import {
  breadcrumbSchema,
  faqSchema,
  serviceSchema,
  methodologyHowToSchema,
} from "@/lib/schema";
import { SITE } from "@/lib/site";
import { buildMetadata } from "@/lib/seo";
import { getServiceBySlug } from "@/content/services";
import { getServicePricing } from "@/content/pricing";
import { PricingTiers } from "@/components/PricingTiers";
import { DownloadButton } from "@/components/DownloadButton";
import { TrustStrip } from "@/components/TrustStrip";
import { DeliverablesIndustries } from "@/components/services/DeliverablesIndustries";
import { LureGallery } from "@/components/visuals/phishing/LureGallery";
import { ClickRateFunnel } from "@/components/visuals/phishing/ClickRateFunnel";
import { AnswerBox } from "@/components/sections/AnswerBox";
import { getShortAnswer } from "@/content/shortAnswers";
import { GlossaryLinks } from "@/components/sections/GlossaryLinks";
import { References } from "@/components/sections/References";

const SLUG = "phishing-simulation";

export async function generateMetadata() {
  const s = getServiceBySlug(SLUG);
  if (!s) return {};
  return buildMetadata({
    title: s.seoTitle,
    description: s.seoDescription,
    path: `/services/${s.slug}`,
    keywords: s.keywords,
    ogKind: "service",
    ogTitle: s.shortTitle,
    ogEyebrow: s.category,
  });
}

const LADDER = [
  {
    icon: GraduationCap,
    step: "Click 1–2",
    title: "60-second microlearning",
    desc: "The landing page becomes a teaching moment immediately, while the click is still fresh. No manager notification, no name on a list.",
    accent: "text-emerald-300 ring-emerald-400/40 bg-emerald-400/10",
  },
  {
    icon: UserCheck,
    step: "Click 3",
    title: "1:1 coaching with their manager",
    desc: "A short, non-punitive session run jointly by Macksofy and the line manager, focused on the specific pretext that worked.",
    accent: "text-amber-300 ring-amber-400/40 bg-amber-400/10",
  },
  {
    icon: Users,
    step: "Click 4+",
    title: "Escalation path, if your policy has one",
    desc: "We document the pattern and hand it over. Whether it escalates to HR is your policy decision, never ours.",
    accent: "text-orange-300 ring-orange-400/40 bg-orange-400/10",
  },
];

const EVIDENCE = [
  {
    icon: ScrollText,
    title: "ISO 27001 A.6.3",
    desc: "Awareness, education and training evidence with dated campaign records and per-cohort completion.",
  },
  {
    icon: ShieldAlert,
    title: "SEBI CSCRF & RBI",
    desc: "Awareness-control evidence packs in the format Indian financial-sector reviewers accept without a rework cycle.",
  },
  {
    icon: CheckCircle2,
    title: "SOC 2 CC1.4",
    desc: "Demonstrated competence and awareness programme for the Type II observation window.",
  },
  {
    icon: MapPin,
    title: "DPDP data residency",
    desc: "The platform runs on Macksofy infrastructure in India — no staff PII, mail content or click telemetry leaves Indian jurisdiction.",
  },
];

export default function PhishingSimulationPage() {
  const service = getServiceBySlug(SLUG)!;
  const sa = getShortAnswer(`service:${SLUG}`);

  return (
    <>
      <JsonLd
        data={[
          serviceSchema(service),
          breadcrumbSchema([
            { name: "Services", url: "/services" },
            { name: service.title, url: `/services/${service.slug}` },
          ]),
          faqSchema(service.faqs),
          methodologyHowToSchema({
            subjectLabel: service.shortTitle,
            url: `${SITE.url}/services/${service.slug}#methodology`,
            phases: service.methodology,
          }),
        ]}
      />

      {/* HERO */}
      <section className="relative isolate overflow-hidden">
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(880px 600px at 82% 0%, rgba(251,191,36,0.18) 0%, transparent 62%), radial-gradient(740px 520px at 8% 92%, rgba(249,115,22,0.16) 0%, transparent 60%)",
          }}
        />
        <ParticleBackground density={45} />
        <Container className="relative pt-10 pb-20">
          <Breadcrumbs
            items={[
              { name: "Services", href: "/services" },
              { name: service.shortTitle, href: `/services/${service.slug}` },
            ]}
          />
          <div className="mt-12 max-w-4xl">
            <Eyebrow color="amber">{service.hero.eyebrow}</Eyebrow>
            <div className="mt-5 flex items-center gap-4">
              <div className="grid size-14 shrink-0 place-items-center rounded-2xl bg-bg-2 ring-1 ring-amber-400/40 text-amber-300">
                <Fish className="size-7" />
              </div>
              <h1 className="font-display text-4xl font-black sm:text-5xl lg:text-[3.2rem] text-balance leading-[1.05]">
                Phishing Simulation &amp; Awareness Training in{" "}
                <span className="gradient-text">India</span>.
              </h1>
            </div>
            <p className="mt-6 max-w-2xl text-lg text-fg-muted text-pretty leading-relaxed">
              {service.hero.description}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <LinkButton
                href={`/contact?interest=${encodeURIComponent(service.title)}`}
                size="lg"
                withArrow
              >
                Design a programme
              </LinkButton>
              <LinkButton href="#lures" variant="outline" size="lg">
                See the lure library
              </LinkButton>
            </div>
            <div className="mt-6">
              <DownloadButton
                href="/sample-reports/pentest"
                label="Download sample report format"
                sub="Campaign telemetry · anonymised"
              />
            </div>
          </div>

          <div className="mt-14 grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { v: "India", k: "hosted platform" },
              { v: "Quarterly", k: "campaign cadence" },
              { v: "4 tiers", k: "easy to spear" },
              { v: "A.6.3", k: "ISO evidence pack" },
            ].map((m) => (
              <div key={m.k} className="rounded-2xl glass p-5">
                <div className="font-display text-3xl font-black gradient-text leading-none">
                  {m.v}
                </div>
                <div className="mt-2 font-mono text-[10px] uppercase tracking-[0.2em] text-fg-faint">
                  {m.k}
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {sa && (
        <section className="py-8">
          <Container>
            <AnswerBox q={sa.q} a={sa.a} />
          </Container>
        </section>
      )}

      {/* LURES */}
      <section id="lures" className="py-20 border-t border-line">
        <Container>
          <div className="max-w-3xl">
            <Eyebrow color="amber">The lure library</Eyebrow>
            <h2 className="mt-3 font-display text-3xl font-black sm:text-4xl text-balance leading-[1.05]">
              Your team will not click{" "}
              <span className="gradient-text">a DocuSign request.</span>
            </h2>
            <p className="mt-4 text-fg-muted text-pretty leading-relaxed">
              Off-the-shelf awareness libraries are built for US and EU inboxes.
              An accounts team in Mumbai has never been chased by an Amazon Prime
              renewal — but a GSTN refund notice with a deadline gets opened every
              time. That gap is the whole reason a local programme outperforms.
            </p>
          </div>
          <div className="mt-12">
            <LureGallery />
          </div>
        </Container>
      </section>

      {/* TELEMETRY */}
      <section id="telemetry" className="py-20 bg-bg-1">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12 items-start">
            <div className="lg:col-span-4 lg:sticky lg:top-24">
              <Eyebrow color="green">What you get back</Eyebrow>
              <h2 className="mt-3 font-display text-3xl font-black sm:text-4xl text-balance leading-[1.05]">
                A human-risk number{" "}
                <span className="gradient-text">your board can read.</span>
              </h2>
              <p className="mt-5 text-fg-muted text-pretty leading-relaxed">
                Click-rate is the headline, but the metric that matters as a
                programme matures is how fast someone reports. Both are tracked per
                role and per campaign, with the trend line the audit committee
                actually asks for.
              </p>
              <ul className="mt-6 space-y-2 text-sm">
                {service.businessImpact.map((b) => (
                  <li key={b} className="flex gap-3">
                    <CheckCircle2 className="size-5 text-emerald-400 shrink-0 mt-0.5" />
                    <span className="text-fg-muted leading-relaxed">{b}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="lg:col-span-8">
              <ClickRateFunnel />
            </div>
          </div>
        </Container>
      </section>

      {/* COACHING LADDER */}
      <section className="py-20">
        <Container>
          <div className="max-w-3xl">
            <Eyebrow color="amber">Repeat clickers</Eyebrow>
            <h2 className="mt-3 font-display text-3xl font-black sm:text-4xl text-balance leading-[1.05]">
              Coaching, <span className="gradient-text">not a naming-and-shaming list.</span>
            </h2>
            <p className="mt-4 text-fg-muted text-pretty leading-relaxed">
              Programmes that punish clicking teach people to hide it, which
              destroys your reporting rate — the one number you actually need in an
              incident. We escalate slowly, and you own the enforcement decision.
            </p>
          </div>
          <div className="mt-12 grid gap-5 lg:grid-cols-3">
            {LADDER.map((l) => {
              const Icon = l.icon;
              return (
                <div key={l.step} className="rounded-2xl glass p-6 h-full flex flex-col lift">
                  <div className="flex items-start justify-between gap-3 mb-4">
                    <div className={`grid size-11 place-items-center rounded-xl ring-1 ${l.accent}`}>
                      <Icon className="size-5" />
                    </div>
                    <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-fg-faint rounded-full border border-line px-2 py-0.5">
                      {l.step}
                    </span>
                  </div>
                  <div className="font-display text-base font-bold text-fg leading-tight">
                    {l.title}
                  </div>
                  <p className="mt-3 text-[13px] text-fg-muted leading-relaxed flex-1">{l.desc}</p>
                </div>
              );
            })}
          </div>
        </Container>
      </section>

      {/* METHODOLOGY */}
      <section id="methodology" className="py-20 bg-bg-1">
        <Container>
          <div className="max-w-3xl">
            <Eyebrow color="purple">Methodology</Eyebrow>
            <h2 className="mt-3 font-display text-3xl font-black sm:text-4xl text-balance leading-[1.05]">
              Five phases, <span className="gradient-text">then it repeats.</span>
            </h2>
            <p className="mt-4 text-fg-muted text-pretty">
              A single campaign is a measurement. A quarterly cadence with rotating
              pretexts is a programme — and only the second one moves the number.
            </p>
          </div>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {service.methodology.map((p, i) => (
              <div key={p.phase} className="rounded-2xl glass p-6 h-full">
                <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-amber-300">
                  Phase {i + 1}
                </div>
                <div className="mt-2 font-display text-base font-bold text-fg leading-tight">
                  {p.phase.replace(/^\d+\s*·\s*/, "")}
                </div>
                <ul className="mt-4 space-y-1.5 text-[12px] text-fg-muted">
                  {p.activities.map((a) => (
                    <li key={a} className="flex gap-2">
                      <span className="text-amber-400/70 mt-1 shrink-0">▸</span>
                      <span className="leading-relaxed">{a}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* COMPLIANCE EVIDENCE */}
      <section className="py-20 border-t border-line">
        <Container>
          <div className="max-w-3xl">
            <Eyebrow color="green">Evidence, not just training</Eyebrow>
            <h2 className="mt-3 font-display text-3xl font-black sm:text-4xl text-balance leading-[1.05]">
              The pack your auditor{" "}
              <span className="gradient-text">asks for in week one.</span>
            </h2>
          </div>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {EVIDENCE.map((e) => {
              const Icon = e.icon;
              return (
                <div key={e.title} className="rounded-2xl glass p-6 h-full flex flex-col">
                  <div className="grid size-11 place-items-center rounded-xl ring-1 ring-emerald-400/40 bg-emerald-400/10 text-emerald-300 mb-4">
                    <Icon className="size-5" />
                  </div>
                  <div className="font-display text-base font-bold text-fg leading-tight">
                    {e.title}
                  </div>
                  <p className="mt-3 text-sm text-fg-muted leading-relaxed flex-1">{e.desc}</p>
                </div>
              );
            })}
          </div>
        </Container>
      </section>

      {/* CASE STUDIES */}
      <section className="py-20 bg-bg-1">
        <Container>
          <Eyebrow color="amber">Programme snapshots</Eyebrow>
          <h2 className="mt-3 font-display text-3xl font-black sm:text-4xl text-balance leading-[1.05]">
            Where each one <span className="gradient-text">started and finished.</span>
          </h2>
          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {service.caseStudies.map((cs, i) => (
              <div key={i} className="rounded-2xl glass p-6 flex flex-col">
                <Badge variant="amber" className="self-start">
                  {cs.industry}
                </Badge>
                <p className="mt-4 text-sm font-semibold text-fg">Scope · {cs.scope}</p>
                <p className="mt-3 text-sm text-fg-muted leading-relaxed flex-1">
                  <span className="text-amber-300 font-semibold">Baseline · </span>
                  {cs.finding}
                </p>
                <p className="mt-3 text-sm text-fg-muted leading-relaxed">
                  <span className="text-emerald-300 font-semibold">Outcome · </span>
                  {cs.impact}
                </p>
                <div className="mt-5 pt-5 border-t border-line/60">
                  <RiskMeter level={cs.severity} />
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* TOOL STACK */}
      <section className="py-20">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12 items-end">
            <div className="lg:col-span-5">
              <Eyebrow color="purple">Platform</Eyebrow>
              <h2 className="mt-3 font-display text-3xl font-black sm:text-4xl text-balance leading-[1.05]">
                Run from our lab.{" "}
                <span className="gradient-text">Not a third-party processor.</span>
              </h2>
              <p className="mt-5 text-fg-muted">
                Campaigns run on Macksofy&rsquo;s own GoPhish-based platform hosted
                in India, so staff PII and click telemetry stay in jurisdiction. If
                you already license KnowBe4 or Cofense, we operate alongside it.
              </p>
              <div className="mt-6 flex items-center gap-2 text-sm text-fg-muted">
                <ServerCog className="size-4 shrink-0 text-amber-300" />
                Mail-gateway allow-listing is set up in phase 1, and is reversible.
              </div>
            </div>
            <div className="lg:col-span-7">
              <div className="rounded-2xl glass p-6">
                <ToolStack tools={service.toolStack.map((t) => ({ name: t }))} />
              </div>
            </div>
          </div>
        </Container>
      </section>

      <PricingTiers
        pkg={getServicePricing(service.slug, service.category)}
        contactInterest={service.title}
      />

      <DeliverablesIndustries
        service={service}
        eyebrow="Deliverables"
        heading="What you get per campaign"
        tone="raised"
      />

      <TrustStrip />

      <section className="py-20">
        <Container>
          <div className="max-w-3xl">
            <Eyebrow>FAQ</Eyebrow>
            <h2 className="mt-3 font-display text-3xl font-black sm:text-4xl text-balance leading-[1.05]">
              Questions before the first campaign.
            </h2>
            <div className="mt-10">
              <FAQAccordion faqs={service.faqs} />
            </div>
          </div>
        </Container>
      </section>

      <WhereWeDeliver
        subject={service.shortTitle}
        subjectShort={service.shortTitle}
        serviceSlug={service.slug}
      />

      <References pageKey={`service:${SLUG}`} />
      <GlossaryLinks href={`/services/${SLUG}`} />
      <LeadCapture />
    </>
  );
}
