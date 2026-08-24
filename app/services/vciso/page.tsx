import {
  UserCog,
  CheckCircle2,
  Rocket,
  Building2,
  Landmark,
  UserPlus,
  FileSignature,
  Handshake,
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/SectionTitle";
import { Badge } from "@/components/ui/Badge";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { LinkButton } from "@/components/ui/Button";
import { ParticleBackground } from "@/components/visuals/ParticleBackground";
import { GlowOrb } from "@/components/visuals/GlowOrb";
import { ToolStack } from "@/components/visuals/ToolStack";
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
import { DownloadButton } from "@/components/DownloadButton";
import { TrustStrip } from "@/components/TrustStrip";
import { DeliverablesIndustries } from "@/components/services/DeliverablesIndustries";
import { OperatingRhythm } from "@/components/visuals/vciso/OperatingRhythm";
import { RegulatorInterlocutor } from "@/components/visuals/vciso/RegulatorInterlocutor";
import { AnswerBox } from "@/components/sections/AnswerBox";
import { getShortAnswer } from "@/content/shortAnswers";
import { GlossaryLinks } from "@/components/sections/GlossaryLinks";
import { References } from "@/components/sections/References";

const SLUG = "vciso";

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

const PLANS = [
  {
    key: "one",
    days: "1 day / week",
    title: "Governance floor",
    icon: Rocket,
    accent: "text-emerald-300 ring-emerald-400/40 bg-emerald-400/10",
    fit: "Seed to Series-B, first enterprise deals, first certification.",
    points: [
      "Policy stack drafted and owned",
      "Risk register established and maintained",
      "Board or investor reporting each quarter",
      "Certification programme steered (ISO 27001, SOC 2)",
    ],
  },
  {
    key: "two",
    days: "2 days / week",
    title: "Active programme",
    icon: Building2,
    accent: "text-cyan-300 ring-cyan-400/40 bg-cyan-400/10",
    fit: "Series-C onward, a small in-house team, live audit cycles.",
    points: [
      "Everything in the 1-day plan",
      "Monthly risk committee chaired",
      "Security team mentoring and hiring support",
      "Architecture review on every material change",
    ],
  },
  {
    key: "four",
    days: "4 days / week",
    title: "Interim or regulated",
    icon: Landmark,
    accent: "text-violet-300 ring-violet-400/40 bg-violet-400/10",
    fit: "Regulated firms, M&A diligence, cover during a CISO transition.",
    points: [
      "Everything in the 2-day plan",
      "Regulator inspection response led end to end",
      "Incident command with DFIR under the same contract",
      "Structured handover to the incoming full-time CISO",
    ],
  },
];

const EXIT = [
  {
    icon: FileSignature,
    title: "Writes the job description",
    desc: "Scoped to the organisation you have become during the engagement, not a template pulled off a job board.",
  },
  {
    icon: UserPlus,
    title: "Sits on the interview panel",
    desc: "Screens the shortlist on technical and board-facing capability, and advises on the package the market actually clears at.",
  },
  {
    icon: Handshake,
    title: "Runs a 4–8 week handover",
    desc: "Risk register, regulator relationships, open audit observations and the board narrative all transfer deliberately.",
  },
];

export default function VcisoPage() {
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
              "radial-gradient(900px 600px at 20% 0%, rgba(0,229,255,0.16) 0%, transparent 62%), radial-gradient(760px 520px at 88% 92%, rgba(99,102,241,0.20) 0%, transparent 60%)",
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
            <Eyebrow color="cyan">{service.hero.eyebrow}</Eyebrow>
            <div className="mt-5 flex items-center gap-4">
              <div className="grid size-14 shrink-0 place-items-center rounded-2xl bg-bg-2 ring-1 ring-cyan-400/40 text-cyan-300">
                <UserCog className="size-7" />
              </div>
              <h1 className="font-display text-4xl font-black sm:text-5xl lg:text-[3.3rem] text-balance leading-[1.05]">
                Virtual CISO Services in{" "}
                <span className="gradient-text">India &amp; UAE</span>.
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
                Book a discovery call
              </LinkButton>
              <LinkButton href="#rhythm" variant="outline" size="lg">
                See the operating rhythm
              </LinkButton>
            </div>
            <div className="mt-6">
              <DownloadButton
                href="/sample-reports/cert-in-audit"
                label="See a board-pack format"
                sub="Anonymised · quarterly reporting"
              />
            </div>
          </div>

          <div className="mt-14 grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { v: "15–22 yrs", k: "vCISO experience" },
              { v: "1 · 2 · 4", k: "days per week" },
              { v: "12 mo", k: "minimum engagement" },
              { v: "48h", k: "proposal after discovery" },
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

      {/* PLANS */}
      <section id="plans" className="py-20 border-t border-line">
        <Container>
          <div className="max-w-3xl">
            <Eyebrow color="cyan">Engagement shapes</Eyebrow>
            <h2 className="mt-3 font-display text-3xl font-black sm:text-4xl text-balance leading-[1.05]">
              Fractional is the day count.{" "}
              <span className="gradient-text">Not the seniority.</span>
            </h2>
            <p className="mt-4 text-fg-muted text-pretty leading-relaxed">
              Every Macksofy vCISO has held an in-house CISO or Deputy CISO role at
              a regulated firm. You meet the named individual before you sign, and
              they report into your CEO or COO — not back into us.
            </p>
          </div>

          <div className="mt-12 grid gap-5 lg:grid-cols-3">
            {PLANS.map((p) => {
              const Icon = p.icon;
              return (
                <div key={p.key} className="rounded-2xl glass p-6 h-full flex flex-col lift">
                  <div className="flex items-start justify-between gap-3 mb-4">
                    <div className={`grid size-11 place-items-center rounded-xl ring-1 ${p.accent}`}>
                      <Icon className="size-5" />
                    </div>
                    <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-fg-faint rounded-full border border-line px-2 py-0.5">
                      {p.days}
                    </span>
                  </div>
                  <div className="font-display text-base font-bold text-fg leading-tight">
                    {p.title}
                  </div>
                  <p className="mt-2 text-[12px] text-fg-faint leading-relaxed">{p.fit}</p>
                  <ul className="mt-4 space-y-1.5 text-[12.5px] text-fg-muted">
                    {p.points.map((pt) => (
                      <li key={pt} className="flex gap-2">
                        <span className="text-cyan-400/70 mt-1 shrink-0">▸</span>
                        <span className="leading-relaxed">{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </Container>
      </section>

      {/* OPERATING RHYTHM */}
      <section id="rhythm" className="py-20 bg-bg-1">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12 items-start">
            <div className="lg:col-span-4 lg:sticky lg:top-24">
              <Eyebrow color="purple">The calendar</Eyebrow>
              <h2 className="mt-3 font-display text-3xl font-black sm:text-4xl text-balance leading-[1.05]">
                Not an advisor{" "}
                <span className="gradient-text">who emails recommendations.</span>
              </h2>
              <p className="mt-5 text-fg-muted text-pretty leading-relaxed">
                The difference between a consultant and a CISO is accountability
                that recurs. Here is what recurs.
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
              <OperatingRhythm />
            </div>
          </div>
        </Container>
      </section>

      {/* REGULATORS */}
      <section className="py-20">
        <Container>
          <div className="max-w-3xl">
            <Eyebrow color="amber">Regulator-facing</Eyebrow>
            <h2 className="mt-3 font-display text-3xl font-black sm:text-4xl text-balance leading-[1.05]">
              Someone who has{" "}
              <span className="gradient-text">sat in that room before.</span>
            </h2>
            <p className="mt-4 text-fg-muted text-pretty leading-relaxed">
              An inspection is a bad time to learn how an inspection goes. The
              vCISO is your named interlocutor across the Indian and GCC
              regulators that apply to your licence.
            </p>
          </div>
          <div className="mt-12">
            <RegulatorInterlocutor />
          </div>
        </Container>
      </section>

      {/* METHODOLOGY */}
      <section id="methodology" className="py-20 bg-bg-1">
        <Container>
          <div className="max-w-3xl">
            <Eyebrow color="purple">First twelve months</Eyebrow>
            <h2 className="mt-3 font-display text-3xl font-black sm:text-4xl text-balance leading-[1.05]">
              Baseline by month one.{" "}
              <span className="gradient-text">Board sign-off by month two.</span>
            </h2>
          </div>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {service.methodology.map((p, i) => (
              <div key={p.phase} className="rounded-2xl glass p-6 h-full">
                <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-cyan-300">
                  Stage {i + 1}
                </div>
                <div className="mt-2 font-display text-base font-bold text-fg leading-tight">
                  {p.phase.replace(/^\d+\s*·\s*/, "")}
                </div>
                <ul className="mt-4 space-y-1.5 text-[12px] text-fg-muted">
                  {p.activities.map((a) => (
                    <li key={a} className="flex gap-2">
                      <span className="text-cyan-400/70 mt-1 shrink-0">▸</span>
                      <span className="leading-relaxed">{a}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* CASE STUDIES */}
      <section className="py-20">
        <Container>
          <Eyebrow color="amber">Engagement snapshots</Eyebrow>
          <h2 className="mt-3 font-display text-3xl font-black sm:text-4xl text-balance leading-[1.05]">
            Three shapes of{" "}
            <span className="gradient-text">the same problem.</span>
          </h2>
          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {service.caseStudies.map((cs, i) => (
              <div key={i} className="rounded-2xl glass p-6 flex flex-col">
                <Badge variant="cyan" className="self-start">
                  {cs.industry}
                </Badge>
                <p className="mt-4 text-sm font-semibold text-fg">Scope · {cs.scope}</p>
                <p className="mt-3 text-sm text-fg-muted leading-relaxed flex-1">
                  <span className="text-cyan-300 font-semibold">What happened · </span>
                  {cs.finding}
                </p>
                <p className="mt-3 text-sm text-fg-muted leading-relaxed">{cs.impact}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* THE EXIT */}
      <section className="py-20 bg-bg-1 border-t border-line">
        <Container>
          <div className="max-w-3xl">
            <Eyebrow color="green">Designed to end</Eyebrow>
            <h2 className="mt-3 font-display text-3xl font-black sm:text-4xl text-balance leading-[1.05]">
              When you hire a full-time CISO,{" "}
              <span className="gradient-text">that is the win.</span>
            </h2>
            <p className="mt-4 text-fg-muted text-pretty leading-relaxed">
              Several of our vCISO engagements end in a recruited in-house CISO,
              and the outgoing vCISO runs that search. A provider whose incentive is
              to stay forever is the wrong provider for this role.
            </p>
          </div>
          <div className="mt-12 grid gap-5 lg:grid-cols-3">
            {EXIT.map((e) => {
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

      {/* TOOL STACK */}
      <section className="py-20">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12 items-end">
            <div className="lg:col-span-5">
              <Eyebrow color="purple">Working stack</Eyebrow>
              <h2 className="mt-3 font-display text-3xl font-black sm:text-4xl text-balance leading-[1.05]">
                Your tools where you have them.{" "}
                <span className="gradient-text">Ours where you do not.</span>
              </h2>
              <p className="mt-5 text-fg-muted">
                Risk treatment is tracked in the tracker your engineers already use.
                Where you already license a compliance-automation platform, the
                vCISO operates inside it rather than beside it.
              </p>
            </div>
            <div className="lg:col-span-7">
              <div className="rounded-2xl glass p-6">
                <ToolStack tools={service.toolStack.map((t) => ({ name: t }))} />
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* RETAINER CTA */}
      <section className="py-20 bg-bg-1">
        <Container>
          <div className="relative overflow-hidden rounded-3xl glass-strong p-10 sm:p-14 text-center glow-blend">
            <GlowOrb className="-top-20 left-1/2 -translate-x-1/2" color="cyan" size={420} />
            <div className="relative">
              <Eyebrow color="cyan">Retainer-based engagement</Eyebrow>
              <h2 className="mt-4 font-display text-3xl font-black sm:text-4xl lg:text-5xl text-balance leading-[1.05]">
                Senior CISO leadership,{" "}
                <span className="gradient-text">priced for your stage.</span>
              </h2>
              <p className="mt-5 mx-auto max-w-2xl text-fg-muted text-pretty">
                vCISO retainers run ₹4–18 L per month depending on day-count,
                seniority and regulatory footprint. 12-month minimum. Tell us where
                you are in your security journey and we&rsquo;ll send a scoped
                proposal within 48 hours.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <LinkButton
                  href={`/contact?interest=${encodeURIComponent(service.title)}`}
                  size="lg"
                  withArrow
                >
                  Book a discovery call
                </LinkButton>
                <LinkButton href="#methodology" variant="outline" size="lg">
                  Review the first year
                </LinkButton>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <DeliverablesIndustries
        service={service}
        eyebrow="What's included"
        heading="What the engagement covers"
        tone="plain"
      />

      <TrustStrip />

      <section className="py-20">
        <Container>
          <div className="max-w-3xl">
            <Eyebrow>FAQ</Eyebrow>
            <h2 className="mt-3 font-display text-3xl font-black sm:text-4xl text-balance leading-[1.05]">
              What boards ask before approving this.
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
