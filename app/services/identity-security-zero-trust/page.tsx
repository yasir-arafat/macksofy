import {
  UserCog,
  CheckCircle2,
  ShieldCheck,
  Landmark,
  Fingerprint,
  Scale,
  ArrowRight,
  Layers,
} from "lucide-react";
import Link from "next/link";
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
import { IdentitySprawl } from "@/components/visuals/identity/IdentitySprawl";
import { ZeroTrustLadder } from "@/components/visuals/identity/ZeroTrustLadder";
import { AnswerBox } from "@/components/sections/AnswerBox";
import { getShortAnswer } from "@/content/shortAnswers";
import { GlossaryLinks } from "@/components/sections/GlossaryLinks";
import { References } from "@/components/sections/References";

const SLUG = "identity-security-zero-trust";

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

const EVIDENCE = [
  {
    icon: Landmark,
    title: "RBI Cyber Security Framework",
    desc: "Authentication and privileged-access controls mapped finding by finding, in the language the inspection uses.",
  },
  {
    icon: Scale,
    title: "SEBI CSCRF",
    desc: "Identity controls for market intermediaries, with the governance sign-off trail the framework expects.",
  },
  {
    icon: ShieldCheck,
    title: "DPDP reasonable security",
    desc: "Access control mapped to the reasonable-security-practices obligation, including processors and vendor identities.",
  },
  {
    icon: Fingerprint,
    title: "ISO 27001:2022",
    desc: "A.5.15 access control, A.5.16 identity management, A.5.17 authentication information and A.8.5 secure authentication.",
  },
];

const SCOPES = [
  {
    title: "PAM tightening only",
    span: "4–6 weeks",
    accent: "text-amber-300 ring-amber-400/40 bg-amber-400/10",
    desc: "Vault rationalisation, standing-privilege removal, JIT and break-glass with dual control. The fastest way to cut blast radius.",
  },
  {
    title: "Assessment + Zero Trust roadmap",
    span: "8–12 weeks",
    accent: "text-violet-300 ring-violet-400/40 bg-violet-400/10",
    desc: "Full identity inventory, attack-path map and a staged target-state architecture. Sized against roughly a 5,000-identity estate.",
  },
  {
    title: "Multi-year execution",
    span: "Retainer",
    accent: "text-emerald-300 ring-emerald-400/40 bg-emerald-400/10",
    desc: "Architecture advisory through a phased rollout, with optional quarterly red-team validation of the identity boundary.",
  },
];

export default function IdentityZeroTrustPage() {
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
              "radial-gradient(900px 620px at 75% 0%, rgba(139,92,246,0.20) 0%, transparent 62%), radial-gradient(740px 520px at 8% 92%, rgba(0,229,255,0.14) 0%, transparent 60%)",
          }}
        />
        <ParticleBackground density={50} />
        <Container className="relative pt-10 pb-20">
          <Breadcrumbs
            items={[
              { name: "Services", href: "/services" },
              { name: service.shortTitle, href: `/services/${service.slug}` },
            ]}
          />
          <div className="mt-12 max-w-4xl">
            <Eyebrow color="purple">{service.hero.eyebrow}</Eyebrow>
            <div className="mt-5 flex items-center gap-4">
              <div className="grid size-14 shrink-0 place-items-center rounded-2xl bg-bg-2 ring-1 ring-violet-400/40 text-violet-300">
                <UserCog className="size-7" />
              </div>
              <h1 className="font-display text-4xl font-black sm:text-5xl lg:text-[3.1rem] text-balance leading-[1.05]">
                Identity Security &amp; Zero Trust in{" "}
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
                Scope an identity assessment
              </LinkButton>
              <LinkButton href="#estate" variant="outline" size="lg">
                See the estate
              </LinkButton>
            </div>
            <div className="mt-6">
              <DownloadButton
                href="/sample-reports/cert-in-audit"
                label="See an evidence-pack format"
                sub="Regulator-mapped · anonymised"
              />
            </div>
          </div>

          <div className="mt-14 grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { v: "800-207", k: "NIST aligned" },
              { v: "90 days", k: "quick-wins backlog" },
              { v: "8–12 wk", k: "assessment + roadmap" },
              { v: "Tier-0", k: "where we start" },
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

      {/* ESTATE */}
      <section id="estate" className="py-20 border-t border-line">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12 items-start">
            <div className="lg:col-span-4 lg:sticky lg:top-24">
              <Eyebrow color="purple">The starting position</Eyebrow>
              <h2 className="mt-3 font-display text-3xl font-black sm:text-4xl text-balance leading-[1.05]">
                Nobody designed this.{" "}
                <span className="gradient-text">It accreted.</span>
              </h2>
              <p className="mt-5 text-fg-muted text-pretty leading-relaxed">
                On-prem AD still authoritative, Entra syncing part of the estate,
                a federation layer in front of SaaS, and privileged access split
                across vaults that different teams own. The attack paths live in
                the seams between them.
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
              <IdentitySprawl />
            </div>
          </div>
        </Container>
      </section>

      {/* ZERO TRUST LADDER */}
      <section id="roadmap" className="py-20 bg-bg-1">
        <Container>
          <div className="max-w-3xl">
            <Eyebrow color="green">The roadmap</Eyebrow>
            <h2 className="mt-3 font-display text-3xl font-black sm:text-4xl text-balance leading-[1.05]">
              A Zero Trust plan that{" "}
              <span className="gradient-text">survives the change board.</span>
            </h2>
            <p className="mt-4 text-fg-muted text-pretty leading-relaxed">
              Zero Trust programmes fail on sequencing, not on architecture. The
              first ninety days have to close real paths without needing a budget
              cycle — everything else follows from having proved that.
            </p>
          </div>
          <div className="mt-12">
            <ZeroTrustLadder />
          </div>
        </Container>
      </section>

      {/* METHODOLOGY */}
      <section id="methodology" className="py-20">
        <Container>
          <div className="max-w-3xl">
            <Eyebrow color="purple">Methodology</Eyebrow>
            <h2 className="mt-3 font-display text-3xl font-black sm:text-4xl text-balance leading-[1.05]">
              Inventory, then paths,{" "}
              <span className="gradient-text">then architecture.</span>
            </h2>
            <p className="mt-4 text-fg-muted text-pretty">
              In that order — a target-state diagram drawn before the inventory is
              a diagram of somebody else&rsquo;s network.
            </p>
          </div>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {service.methodology.map((p, i) => (
              <div key={p.phase} className="rounded-2xl glass p-6 h-full">
                <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-violet-300">
                  Phase {i + 1}
                </div>
                <div className="mt-2 font-display text-base font-bold text-fg leading-tight">
                  {p.phase.replace(/^\d+\s*·\s*/, "")}
                </div>
                <ul className="mt-4 space-y-1.5 text-[12px] text-fg-muted">
                  {p.activities.map((a) => (
                    <li key={a} className="flex gap-2">
                      <span className="text-violet-400/70 mt-1 shrink-0">▸</span>
                      <span className="leading-relaxed">{a}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* SCOPES */}
      <section className="py-20 bg-bg-1 border-t border-line">
        <Container>
          <div className="max-w-3xl">
            <Eyebrow color="amber">Three ways in</Eyebrow>
            <h2 className="mt-3 font-display text-3xl font-black sm:text-4xl text-balance leading-[1.05]">
              You do not have to buy{" "}
              <span className="gradient-text">the whole programme.</span>
            </h2>
          </div>
          <div className="mt-12 grid gap-5 lg:grid-cols-3">
            {SCOPES.map((s) => (
              <div key={s.title} className="rounded-2xl glass p-6 h-full flex flex-col lift">
                <div className="flex items-start justify-between gap-3 mb-4">
                  <div className={`grid size-11 place-items-center rounded-xl ring-1 ${s.accent}`}>
                    <Layers className="size-5" />
                  </div>
                  <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-fg-faint rounded-full border border-line px-2 py-0.5">
                    {s.span}
                  </span>
                </div>
                <div className="font-display text-base font-bold text-fg leading-tight">
                  {s.title}
                </div>
                <p className="mt-3 text-[13px] text-fg-muted leading-relaxed flex-1">{s.desc}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* EVIDENCE */}
      <section className="py-20">
        <Container>
          <div className="max-w-3xl">
            <Eyebrow color="cyan">Regulator mapping</Eyebrow>
            <h2 className="mt-3 font-display text-3xl font-black sm:text-4xl text-balance leading-[1.05]">
              Every finding lands{" "}
              <span className="gradient-text">against a control.</span>
            </h2>
          </div>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {EVIDENCE.map((e) => {
              const Icon = e.icon;
              return (
                <div key={e.title} className="rounded-2xl glass p-6 h-full flex flex-col">
                  <div className="grid size-11 place-items-center rounded-xl ring-1 ring-cyan-400/40 bg-cyan-400/10 text-cyan-300 mb-4">
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
          <Eyebrow color="amber">Engagement snapshots</Eyebrow>
          <h2 className="mt-3 font-display text-3xl font-black sm:text-4xl text-balance leading-[1.05]">
            Three estates,{" "}
            <span className="gradient-text">three kinds of seam.</span>
          </h2>
          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {service.caseStudies.map((cs, i) => (
              <div key={i} className="rounded-2xl glass p-6 flex flex-col">
                <Badge variant="purple" className="self-start">
                  {cs.industry}
                </Badge>
                <p className="mt-4 text-sm font-semibold text-fg">Scope · {cs.scope}</p>
                <p className="mt-3 text-sm text-fg-muted leading-relaxed flex-1">
                  <span className="text-violet-300 font-semibold">Finding · </span>
                  {cs.finding}
                </p>
                <p className="mt-3 text-sm text-fg-muted leading-relaxed">{cs.impact}</p>
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
              <Eyebrow color="purple">Vendor-neutral</Eyebrow>
              <h2 className="mt-3 font-display text-3xl font-black sm:text-4xl text-balance leading-[1.05]">
                We assess first{" "}
                <span className="gradient-text">and sell nothing.</span>
              </h2>
              <p className="mt-5 text-fg-muted">
                CyberArk, Delinea, HashiCorp Vault, SailPoint and Saviynt are all in
                the delivery toolkit and none of them pay us. The architecture comes
                before the shortlist, which is the only order that produces an
                honest shortlist.
              </p>
              <div className="mt-6">
                <Link
                  href="/services/network-security-architecture"
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-neon-cyan hover:underline"
                >
                  Pairs with network segmentation
                  <ArrowRight className="size-4" />
                </Link>
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
        heading="What lands in your inbox"
        tone="raised"
      />

      <TrustStrip />

      <section className="py-20">
        <Container>
          <div className="max-w-3xl">
            <Eyebrow>FAQ</Eyebrow>
            <h2 className="mt-3 font-display text-3xl font-black sm:text-4xl text-balance leading-[1.05]">
              Questions before the inventory starts.
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
