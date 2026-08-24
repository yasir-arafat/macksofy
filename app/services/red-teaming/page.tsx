import {
  Skull,
  CheckCircle2,
  Globe,
  Building2,
  Network,
  Users,
  Award,
  Brain,
  Workflow,
  Lock,
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
import { breadcrumbSchema, faqSchema, serviceSchema, methodologyHowToSchema } from "@/lib/schema";
import { SITE } from "@/lib/site";
import { buildMetadata } from "@/lib/seo";
import { getServiceBySlug } from "@/content/services";
import { DownloadButton } from "@/components/DownloadButton";
import { TrustStrip } from "@/components/TrustStrip";
import { DeliverablesIndustries } from "@/components/services/DeliverablesIndustries";
import { KillChainGraph } from "@/components/visuals/redteam/KillChainGraph";
import { AttackHeatmap } from "@/components/visuals/redteam/AttackHeatmap";
import { AnswerBox } from "@/components/sections/AnswerBox";
import { getShortAnswer } from "@/content/shortAnswers";
import { GlossaryLinks } from "@/components/sections/GlossaryLinks";
import { References } from "@/components/sections/References";

const SLUG = "red-teaming";

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

export default function RedTeamPage() {
  const service = getServiceBySlug(SLUG)!;
  const sa = getShortAnswer("service:red-teaming");

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
              "radial-gradient(900px 600px at 80% 0%, rgba(239,68,68,0.18) 0%, transparent 60%), radial-gradient(700px 500px at 0% 100%, rgba(168,85,247,0.18) 0%, transparent 60%)",
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
            <Eyebrow color="amber">{service.hero.eyebrow}</Eyebrow>
            <div className="mt-5 flex items-center gap-4">
              <div className="grid size-14 place-items-center rounded-2xl bg-bg-2 ring-1 ring-red-400/40 text-red-400">
                <Skull className="size-7" />
              </div>
              <h1 className="font-display text-4xl font-black sm:text-5xl lg:text-[3.6rem] text-balance leading-[1.05]">
                Red Team Services in India — <span className="gradient-text">adversary simulation</span> that actually tests your SOC.
              </h1>
            </div>
            <p className="mt-6 max-w-2xl text-lg text-fg-muted text-pretty leading-relaxed">
              {service.hero.description}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <LinkButton href="/contact?interest=Red%20Team" size="lg" withArrow>
                Discuss an engagement
              </LinkButton>
              <LinkButton href="#kill-chain" variant="outline" size="lg">
                See the kill chain
              </LinkButton>
            </div>
            <div className="mt-6">
              <DownloadButton
                href="/sample-reports/pentest"
                label="Download sample red team report"
                sub="Engagement narrative + ATT&CK heatmap"
              />
            </div>
          </div>

          {/* engagement metrics */}
          <div className="mt-14 grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { v: "6–12", k: "weeks per engagement" },
              { v: "100%", k: "in-house operators" },
              { v: "3+", k: "EDRs bypassed in production" },
              { v: "MITRE", k: "ATT&CK aligned" },
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

      {/* TYPES OF RED TEAMING */}
      <section id="engagement-modes" className="py-20 border-t border-line">
        <Container>
          <div className="max-w-3xl">
            <Eyebrow color="amber">Engagement modes</Eyebrow>
            <h2 className="mt-3 font-display text-3xl font-black sm:text-4xl text-balance leading-[1.05]">
              One playbook. <span className="gradient-text">Four ways to start.</span>
            </h2>
            <p className="mt-4 text-fg-muted text-pretty leading-relaxed">
              Real adversaries pick the path of least resistance. So do we. Pick the
              starting position that matches the threat you actually worry about — or
              talk to us and we&rsquo;ll co-design a hybrid that does.
            </p>
          </div>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                key: "external",
                title: "External red team",
                icon: Globe,
                accent: "text-red-400 ring-red-400/40 bg-red-400/10",
                lead: "Starts on the open internet, ends inside your crown jewels.",
                points: [
                  "Spear-phishing of named employees",
                  "OSINT-led credential & token harvesting",
                  "Exposed-asset and third-party-vendor compromise",
                  "Initial access proven without insider help",
                ],
                duration: "8–12 weeks",
              },
              {
                key: "internal",
                title: "Internal / assumed breach",
                icon: Building2,
                accent: "text-amber-300 ring-amber-400/40 bg-amber-400/10",
                lead: "Assume the phishing email already worked. What happens next?",
                points: [
                  "Drop a low-privilege foothold inside the LAN / VPN",
                  "AD enumeration, BloodHound paths, ADCS abuse",
                  "Lateral movement past Defender / CrowdStrike / SentinelOne",
                  "Race to Domain Admin or business-impact target",
                ],
                duration: "4–8 weeks",
              },
              {
                key: "hybrid",
                title: "Hybrid red team",
                icon: Network,
                accent: "text-violet-300 ring-violet-400/40 bg-violet-400/10",
                lead: "External entry, internal depth — one continuous campaign.",
                points: [
                  "Phase 1 ─ external breach to first internal foothold",
                  "Phase 2 ─ pivot to internal-network depth with EDR live",
                  "Phase 3 ─ cross-domain / cross-cloud lateral movement",
                  "Single narrative, single ATT&CK heatmap, single report",
                ],
                duration: "10–14 weeks",
              },
              {
                key: "purple",
                title: "Purple team",
                icon: Users,
                accent: "text-emerald-300 ring-emerald-400/40 bg-emerald-400/10",
                lead: "Same tradecraft, but your SOC is in the room with us.",
                points: [
                  "Live attack technique → live detection tuning loop",
                  "Per-TTP score sheet against your SIEM / EDR rules",
                  "Detection-engineering backlog handed over at debrief",
                  "Best fit for mature SOCs measuring uplift",
                ],
                duration: "3–6 weeks",
              },
            ].map((mode) => {
              const Icon = mode.icon;
              return (
                <div
                  key={mode.key}
                  className="rounded-2xl glass p-6 h-full flex flex-col lift"
                >
                  <div className="flex items-start justify-between gap-3 mb-4">
                    <div
                      className={`grid size-11 place-items-center rounded-xl ring-1 ${mode.accent}`}
                    >
                      <Icon className="size-5" />
                    </div>
                    <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-fg-faint rounded-full border border-line px-2 py-0.5">
                      {mode.duration}
                    </span>
                  </div>
                  <div className="font-display text-base font-bold text-fg leading-tight">
                    {mode.title}
                  </div>
                  <p className="mt-3 text-[13px] text-fg-muted leading-relaxed">
                    {mode.lead}
                  </p>
                  <ul className="mt-4 space-y-1.5 text-[12px] text-fg-muted">
                    {mode.points.map((pt) => (
                      <li key={pt} className="flex gap-2">
                        <span className="text-red-400/70 mt-1 shrink-0">▸</span>
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </Container>
      </section>

      {/* KILL CHAIN */}
      <section id="kill-chain" className="py-20 bg-bg-1">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12 items-start">
            <div className="lg:col-span-4 lg:sticky lg:top-24">
              <Eyebrow color="amber">The kill chain</Eyebrow>
              <h2 className="mt-3 font-display text-3xl font-black sm:text-4xl text-balance leading-[1.05]">
                <span className="gradient-text">44 days.</span> One objective. Zero shortcuts.
              </h2>
              <p className="mt-5 text-fg-muted text-pretty">
                Composite narrative from a 2025 BFSI red team — the timeline a blue team
                receives at debrief.
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
              <KillChainGraph />
            </div>
          </div>
        </Container>
      </section>

      {/* MITRE HEATMAP */}
      <section className="py-20">
        <Container>
          <div className="max-w-3xl">
            <Eyebrow>MITRE ATT&CK heatmap</Eyebrow>
            <h2 className="mt-3 font-display text-3xl font-black sm:text-4xl text-balance leading-[1.05]">
              Every TTP <span className="gradient-text">documented</span>. Every detection gap surfaced.
            </h2>
            <p className="mt-4 text-fg-muted text-pretty">
              Standard deliverable on every Macksofy red team — your blue team gets a
              tactic-by-tactic map of what we did, what they detected, and where the
              detection-engineering work remains.
            </p>
          </div>
          <div className="mt-12">
            <AttackHeatmap />
          </div>
        </Container>
      </section>

      {/* CASE STUDY */}
      <section className="py-20 bg-bg-1">
        <Container>
          <Eyebrow color="purple">Engagement snapshot</Eyebrow>
          <h2 className="mt-3 font-display text-3xl font-black sm:text-4xl text-balance leading-[1.05]">
            <span className="gradient-text">Listed Indian bank.</span> Goal: silent DA.
          </h2>
          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {service.caseStudies.map((cs, i) => (
              <div key={i} className="rounded-2xl glass p-6 flex flex-col">
                <Badge variant="cyan" className="self-start">{cs.industry}</Badge>
                <p className="mt-4 text-sm font-semibold text-fg">{cs.scope}</p>
                <p className="mt-3 text-sm text-fg-muted leading-relaxed flex-1">
                  <span className="text-red-400 font-semibold">Result · </span>{cs.finding}
                </p>
                <p className="mt-3 text-sm text-fg-muted">{cs.impact}</p>
                <div className="mt-5 pt-5 border-t border-line/60">
                  <RiskMeter level={cs.severity} />
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* WHY MACKSOFY */}
      <section className="py-20 border-t border-line">
        <Container>
          <div className="max-w-3xl">
            <Eyebrow color="amber">Why Macksofy for red team</Eyebrow>
            <h2 className="mt-3 font-display text-3xl font-black sm:text-4xl text-balance leading-[1.05]">
              Real operators. <span className="gradient-text">Real tradecraft.</span> No outsourcing.
            </h2>
            <p className="mt-4 text-fg-muted text-pretty leading-relaxed">
              India has plenty of vendors who will sell you a red team and quietly run a
              credentialed pentest. Macksofy doesn&rsquo;t. Here&rsquo;s what makes our
              engagements different.
            </p>
          </div>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                icon: Skull,
                title: "In-house operators only",
                accent: "text-red-400 ring-red-400/40 bg-red-400/10",
                desc: "Every operator on your engagement is a full-time Macksofy employee — OSCP / OSEP / CRTO / CRTL. No subcontractors, no offshore handoffs, no LinkedIn freelancers.",
              },
              {
                icon: Lock,
                title: "Dedicated C2 infrastructure",
                accent: "text-violet-300 ring-violet-400/40 bg-violet-400/10",
                desc: "Your campaign runs on a brand-new redirector tier, a fresh implant, and signatures no AV / EDR has seen. We do not share infrastructure across clients.",
              },
              {
                icon: Brain,
                title: "Threat-intel driven scenarios",
                accent: "text-amber-300 ring-amber-400/40 bg-amber-400/10",
                desc: "Engagements are scoped against the threat actors that actually target your sector — TA505, Conti splinters, FIN8, APT41 — not a generic playbook.",
              },
              {
                icon: Workflow,
                title: "Blue-team handoff included",
                accent: "text-emerald-300 ring-emerald-400/40 bg-emerald-400/10",
                desc: "Every engagement closes with a full ATT&CK-mapped detection-gap report and an optional 1-day purple-team workshop. Your SOC walks away genuinely better.",
              },
              {
                icon: Award,
                title: "CERT-In empanelled",
                accent: "text-sky-300 ring-sky-400/40 bg-sky-400/10",
                desc: "We&rsquo;re empanelled by CERT-In and our deliverables are accepted by RBI, SEBI, IRDAI and large-enterprise InfoSec committees without rework.",
              },
              {
                icon: Users,
                title: "Senior leads on every job",
                accent: "text-pink-400 ring-pink-400/40 bg-pink-400/10",
                desc: "A senior consultant with 8+ years of offensive experience leads every campaign end-to-end — from scoping call to board readout.",
              },
              {
                icon: Building2,
                title: "BFSI-deep, multi-sector",
                accent: "text-cyan-300 ring-cyan-400/40 bg-cyan-400/10",
                desc: "Deepest experience in BFSI (private banks, NBFCs, payment processors) plus IT services, SaaS, telecom and government — across India and the UAE.",
              },
              {
                icon: Network,
                title: "Cloud + AD + identity",
                accent: "text-orange-300 ring-orange-400/40 bg-orange-400/10",
                desc: "Our operators cross Azure ↔ Entra ↔ on-prem AD ↔ AWS ↔ K8s in a single engagement, because that&rsquo;s what real adversaries do.",
              },
            ].map((w) => {
              const Icon = w.icon;
              return (
                <div key={w.title} className="rounded-2xl glass p-6 h-full flex flex-col">
                  <div
                    className={`grid size-11 place-items-center rounded-xl ring-1 ${w.accent} mb-4`}
                  >
                    <Icon className="size-5" />
                  </div>
                  <div className="font-display text-base font-bold text-fg leading-tight">
                    {w.title}
                  </div>
                  <p className="mt-3 text-sm text-fg-muted leading-relaxed flex-1">
                    {w.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </Container>
      </section>

      {/* TOOL STACK */}
      <section className="py-20 bg-bg-1">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12 items-end">
            <div className="lg:col-span-5">
              <Eyebrow>Tradecraft</Eyebrow>
              <h2 className="mt-3 font-display text-3xl font-black sm:text-4xl text-balance leading-[1.05]">
                Custom C2. <span className="gradient-text">Custom payloads.</span>
              </h2>
              <p className="mt-5 text-fg-muted">
                We don&rsquo;t share infrastructure. Every Macksofy red team gets a dedicated
                C2 tier and custom payloads with no signatures in any commercial AV/EDR.
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

      <DeliverablesIndustries
        service={service}
        eyebrow="Deliverables"
        heading="What you get when the campaign ends"
        tone="plain"
      />

      <TrustStrip />

      <section className="py-20">
        <Container>
          <div className="max-w-3xl">
            <Eyebrow>FAQ</Eyebrow>
            <h2 className="mt-3 font-display text-3xl font-black sm:text-4xl text-balance leading-[1.05]">
              Questions before we start the campaign.
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

      <References pageKey="service:red-teaming" />
      <GlossaryLinks href="/services/red-teaming" />
      <LeadCapture />
    </>
  );
}
