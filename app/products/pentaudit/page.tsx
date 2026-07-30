import {
  Gauge,
  Cloud,
  Code2,
  Smartphone,
  Webhook,
  BadgeCheck,
  ScanLine,
  Cpu,
  Activity,
  FileBadge,
  CheckCircle2,
  GitPullRequest,
  Bell,
  Rocket,
  Building2,
  Users,
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/SectionTitle";
import { Badge } from "@/components/ui/Badge";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { LinkButton } from "@/components/ui/Button";
import { ParticleBackground } from "@/components/visuals/ParticleBackground";
import { GlowOrb } from "@/components/visuals/GlowOrb";
import { LeadCapture } from "@/components/home/LeadCapture";
import { FAQAccordion } from "@/components/sections/FAQAccordion";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema, faqSchema } from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";
import { SITE } from "@/lib/site";

export const metadata = buildMetadata({
  title:
    "Pentaudit — AI-Driven Continuous Pentesting + Compliance Platform | Macksofy",
  description:
    "Pentaudit is Macksofy's AI-enabled continuous pentesting and compliance-readiness platform. On-spot VAPT for cloud, web and mobile, plus automated readiness scoring for ISO 27001, SOC 2, PCI-DSS, HIPAA, GDPR, DPDP, RBI and CERT-In.",
  path: "/products/pentaudit",
  keywords: [
    "Pentaudit",
    "continuous pentesting platform India",
    "AI pentest platform",
    "compliance automation India",
    "ISO 27001 readiness tool",
    "SOC 2 readiness platform",
    "PCI DSS automation",
    "HIPAA compliance India",
    "GDPR compliance tool",
    "DPDP compliance India",
    "RBI cybersecurity readiness",
    "CERT-In audit readiness",
    "VAPT SaaS India",
    "on-demand VAPT platform",
  ],
});

const PENTEST_SURFACES = [
  {
    name: "Cloud",
    detail: "AWS · Azure · GCP · OCI · multi-cloud posture + IAM + workload",
    icon: Cloud,
    color: "cyan",
  },
  {
    name: "Web Application",
    detail: "Authenticated + unauthenticated · OWASP Top 10 + business logic",
    icon: Code2,
    color: "purple",
  },
  {
    name: "Mobile (iOS + Android)",
    detail: "MASVS / MASTG checks · binary upload · runtime instrumentation",
    icon: Smartphone,
    color: "amber",
  },
  {
    name: "API",
    detail: "REST · GraphQL · OWASP API Top 10 · BOLA / mass-assignment / authz",
    icon: Webhook,
    color: "green",
  },
] as const;

const COMPLIANCE_FRAMEWORKS = [
  { name: "ISO 27001:2022", color: "cyan" },
  { name: "SOC 2 Type 1 & 2", color: "purple" },
  { name: "PCI-DSS v4", color: "amber" },
  { name: "HIPAA", color: "green" },
  { name: "GDPR", color: "cyan" },
  { name: "DPDP Act 2023", color: "purple" },
  { name: "RBI Cybersecurity", color: "amber" },
  { name: "SEBI CSCRF", color: "green" },
  { name: "CERT-In Audit", color: "cyan" },
  { name: "NCA-ECC (KSA)", color: "purple" },
  { name: "UAE PDPL", color: "amber" },
  { name: "NIST CSF", color: "green" },
] as const;

const PILLAR_FEATURES = {
  pentest: [
    "On-spot VAPT triggered from the dashboard — first scan inside 15 minutes",
    "AI-driven recon + exploit-suggestion engine (LLM + technique playbook hybrid)",
    "Continuous diff scanning — new alerts only when the attack surface changes",
    "Re-test on every commit (GitHub / GitLab / Bitbucket / Azure DevOps webhooks)",
    "Findings auto-triaged with CVSS 3.1 + business-impact scoring",
    "One-click escalation to a Macksofy human pentester for High / Critical findings",
  ],
  compliance: [
    "Automated evidence collection from cloud APIs (AWS Config / Azure Policy / GCP Asset Inventory)",
    "Drag-and-drop upload for off-platform evidence (policies, training records, vendor reviews)",
    "Real-time readiness score per framework with trend chart",
    "Gap analysis with remediation playbook + owner assignment",
    "Auditor-ready evidence export (PDF + CSV + Confluence / Notion sync)",
    "Cross-framework control mapping — one control answers ISO + SOC 2 + DPDP at once",
  ],
} as const;

const HOW_IT_WORKS = [
  {
    step: "1",
    title: "Connect",
    body:
      "Bind your cloud accounts (read-only IAM role), repos, app URLs, mobile binaries. Onboarding under 30 minutes.",
    icon: GitPullRequest,
  },
  {
    step: "2",
    title: "Baseline scan",
    body:
      "AI engine maps your attack surface, runs the first VAPT pass and computes initial readiness score per framework.",
    icon: ScanLine,
  },
  {
    step: "3",
    title: "Continuous monitoring",
    body:
      "Diff scans on commit + scheduled deep scans. Alerts when the attack surface or compliance posture changes.",
    icon: Activity,
  },
  {
    step: "4",
    title: "Compliance mapping",
    body:
      "Evidence auto-pulled from cloud APIs is mapped to the controls of every framework you've enabled.",
    icon: BadgeCheck,
  },
  {
    step: "5",
    title: "Auditor-ready export",
    body:
      "One-click export for the auditor — CSV of controls, PDF report, evidence pack ready for ISO / SOC 2 / DPDP / CERT-In.",
    icon: FileBadge,
  },
] as const;

const USE_CASES = [
  {
    audience: "Pre-Series-A startups",
    icon: Rocket,
    points: [
      "Get SOC 2 + ISO 27001 ready before the next round of due diligence",
      "Bundle continuous VAPT + readiness inside a single SaaS subscription",
      "Pay for the platform, not a 12-month consultancy engagement",
      "Convert to a Macksofy human-led audit only at certification time",
    ],
  },
  {
    audience: "Mid-market security teams",
    icon: Building2,
    points: [
      "Always-on assurance layer between annual third-party VAPT cycles",
      "Catch new vulnerabilities the day a developer ships them",
      "Quarterly board chart driven by live data, not last-quarter PDFs",
      "Frees the in-house security team from chasing evidence for auditors",
    ],
  },
  {
    audience: "Enterprises with MSS",
    icon: Users,
    points: [
      "Pentaudit complements the Macksofy MSS retainer — continuous-scan layer",
      "Findings flow into the same risk register the SOC analysts already use",
      "Compliance dashboards become the CISO's quarterly status pack",
      "Multi-tenant view for parent + subsidiary entities",
    ],
  },
] as const;

const FAQS = [
  {
    q: "How is this different from Vanta / Drata / Sprinto?",
    a: "Pentaudit is built India-first and bundles continuous AI VAPT alongside the compliance-automation layer. Compliance-only tools handle evidence collection but stop short of offensive testing; Pentaudit unifies both, with native packs for RBI Cybersecurity, SEBI CSCRF, CERT-In Audit and DPDP Act — frameworks the global tools handle as add-ons or not at all. It also routes High / Critical findings directly to Macksofy's human pentest bench when manual validation is needed.",
  },
  {
    q: "How does the AI-driven pentest actually work?",
    a: "An LLM-driven planner generates a per-target recon + attack plan based on the technology stack it fingerprints. The plan executes through a deterministic exploitation engine (no LLM-in-the-loop for the actual attack — only for planning and triage). Every finding is mapped back to OWASP / MITRE ATT&CK / CWE so it's reviewable, reproducible and not hallucinated.",
  },
  {
    q: "Does this replace the annual Macksofy VAPT engagement?",
    a: "No — it complements it. Continuous AI scanning catches the obvious 60–70% of issues the day they appear; the annual human-led VAPT goes deep on business logic, multi-step authorization, chained vulnerabilities and creative attack scenarios the AI doesn't reach. Most clients run both, and the human engagement is faster because Pentaudit has already cleared the noise.",
  },
  {
    q: "Which compliance frameworks are supported out of the box?",
    a: "ISO 27001:2022, SOC 2 Type 1 + 2, PCI-DSS v4, HIPAA, GDPR, DPDP Act 2023, RBI Cybersecurity Framework, SEBI CSCRF, CERT-In Audit, NCA-ECC (KSA), UAE PDPL and NIST CSF — with cross-mapping so a single uploaded policy or pulled control answers multiple frameworks simultaneously.",
  },
  {
    q: "Where does the data live — India residency?",
    a: "Default deployment is in ap-south-1 (Mumbai) and ap-south-2 (Hyderabad) for India clients; me-central-1 (UAE) for GCC. Air-gapped on-prem deployment is available for government / defence customers under a separate license. Customer data is never sent to a third-party LLM for training; the AI planner runs against private hosted weights.",
  },
  {
    q: "Can we escalate findings to a real Macksofy pentester?",
    a: "Yes — one-click escalation on any finding. A Macksofy senior consultant takes the finding, validates it manually, attempts further exploitation and either confirms with a deeper PoC or downgrades it. Escalations are billed against your Pentaudit credit pool included in the plan; overflow is at the standard hourly rate.",
  },
  {
    q: "How long is the contract?",
    a: "Free trial 14 days (1 cloud account, 1 app, 1 framework, no card required). Pro and Enterprise plans are billed annually with monthly options for teams under 50 seats. No multi-year lock-in.",
  },
];

const COLOR_RING: Record<string, string> = {
  cyan: "ring-neon-cyan/30 text-neon-cyan",
  purple: "ring-neon-purple/30 text-neon-purple",
  green: "ring-neon-green/30 text-neon-green",
  amber: "ring-amber-400/30 text-amber-300",
};

const COLOR_BADGE: Record<string, string> = {
  cyan: "bg-neon-cyan/10 ring-neon-cyan/30 text-neon-cyan",
  purple: "bg-neon-purple/10 ring-neon-purple/30 text-neon-purple",
  green: "bg-neon-green/10 ring-neon-green/30 text-neon-green",
  amber: "bg-amber-400/10 ring-amber-400/30 text-amber-300",
};

export default function PentauditPage() {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Products", url: "/products/pentaudit" },
            { name: "Pentaudit", url: "/products/pentaudit" },
          ]),
          {
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            "@id": `${SITE.url}/products/pentaudit#product`,
            name: "Pentaudit",
            url: `${SITE.url}/products/pentaudit`,
            applicationCategory: "SecurityApplication",
            applicationSubCategory: "Continuous Penetration Testing & Compliance Automation",
            operatingSystem: "Web",
            description:
              "AI-driven continuous pentesting and compliance-readiness platform. On-spot VAPT for cloud, web and mobile. Readiness scoring for ISO 27001, SOC 2, PCI-DSS, HIPAA, GDPR, DPDP, RBI and CERT-In.",
            image: `${SITE.url}/og-default.png`,
            brand: { "@type": "Brand", name: "Pentaudit" },
            publisher: { "@id": `${SITE.url}#organization` },
            featureList: [
              "Continuous cloud / web / mobile pentesting",
              "Multi-cloud posture management (AWS, Azure, GCP, OCI)",
              "ISO 27001 readiness scoring",
              "SOC 2 readiness scoring",
              "PCI-DSS readiness scoring",
              "HIPAA / GDPR / DPDP / RBI / CERT-In readiness scoring",
              "Auto-evidence collection for auditors",
              "Severity-prioritised remediation queue",
            ],
            offers: {
              "@type": "Offer",
              price: "0",
              priceCurrency: "INR",
              description: "Free 14-day trial",
              url: `${SITE.url}/contact?interest=Pentaudit`,
            },
          },
          // No AnswerBox on this product page — don't claim its selector.
          faqSchema(FAQS, { answerBox: false }),
        ]}
      />

      {/* HERO */}
      <section className="relative isolate overflow-hidden">
        <ParticleBackground density={70} />
        <GlowOrb className="-top-32 left-1/3" color="cyan" size={520} />
        <GlowOrb className="-bottom-24 right-1/4" color="purple" size={400} />
        <Container className="relative pt-12 pb-20 sm:pt-16 sm:pb-28">
          <Breadcrumbs
            items={[
              { name: "Products", href: "/products/pentaudit" },
              { name: "Pentaudit", href: "/products/pentaudit" },
            ]}
          />
          <div className="mt-10 grid gap-12 lg:grid-cols-12 items-center">
            <div className="lg:col-span-7">
              <Eyebrow>
                Macksofy Product · AI Continuous VAPT + Compliance
              </Eyebrow>
              <div className="mt-5 flex items-center gap-4">
                <div className="grid size-14 place-items-center rounded-2xl bg-bg-2 ring-1 ring-neon-cyan/30 text-neon-cyan glow-cyan">
                  <Gauge className="size-7" />
                </div>
                <h1 className="font-display text-4xl font-black sm:text-5xl lg:text-[3.6rem] text-balance leading-[1.02]">
                  Pent<span className="gradient-text">audit</span>
                </h1>
              </div>
              <p className="mt-6 max-w-2xl text-lg text-fg-muted text-pretty">
                On-spot VAPT for cloud, web, mobile and APIs — paired with an
                always-on compliance-readiness engine for ISO 27001, SOC 2,
                PCI-DSS, HIPAA, GDPR, DPDP, RBI and CERT-In. AI-driven where it
                speeds things up, deterministic where it has to be right.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <LinkButton
                  href="/contact?interest=Pentaudit"
                  size="lg"
                  withArrow
                >
                  Start free 14-day trial
                </LinkButton>
                <LinkButton href="#how-it-works" variant="outline" size="lg">
                  See how it works
                </LinkButton>
              </div>
              <div className="mt-6 flex flex-wrap gap-2">
                <Badge variant="outline">AI-driven recon + triage</Badge>
                <Badge variant="outline">12+ compliance frameworks</Badge>
                <Badge variant="outline">India data-residency</Badge>
                <Badge variant="outline">14-day free trial</Badge>
              </div>
            </div>
            <div className="lg:col-span-5">
              <div className="rounded-2xl glass-strong p-6 glow-blend">
                <Eyebrow color="purple">Platform at a glance</Eyebrow>
                <ul className="mt-5 space-y-3 text-sm">
                  {[
                    ["First scan", "< 15 minutes"],
                    ["Pentest surfaces", "Cloud · Web · Mobile · API"],
                    ["Frameworks", "12+ regulator + global"],
                    ["Scan cadence", "On commit · daily · on demand"],
                    ["Human escalation", "1-click to Macksofy bench"],
                    ["Data residency", "Mumbai · Hyderabad · UAE · on-prem"],
                  ].map(([k, v]) => (
                    <li
                      key={k}
                      className="flex items-center justify-between gap-2 border-b border-line/60 pb-2 last:border-0"
                    >
                      <span className="text-fg-muted">{k}</span>
                      <span className="font-semibold text-fg text-right">
                        {v}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* TWO PILLARS */}
      <section className="py-20 bg-bg-1">
        <Container>
          <Eyebrow>Two pillars, one platform</Eyebrow>
          <h2 className="mt-3 font-display text-3xl font-black sm:text-4xl text-balance leading-[1.05]">
            Continuous offence{" "}
            <span className="gradient-text">plus</span> continuous compliance.
          </h2>
          <p className="mt-3 max-w-2xl text-fg-muted">
            Most security tools cover one or the other. Pentaudit ships both as
            one product, so findings on the offence side feed evidence into the
            compliance side automatically.
          </p>
          <div className="mt-12 grid gap-6 lg:grid-cols-2">
            {/* PENTEST PILLAR */}
            <div className="rounded-2xl glass-strong p-7 ring-1 ring-neon-cyan/20 flex flex-col">
              <div className="flex items-center gap-3">
                <div className="grid size-12 place-items-center rounded-xl bg-bg-2 ring-1 ring-neon-cyan/30 text-neon-cyan glow-cyan">
                  <Cpu className="size-6" />
                </div>
                <div>
                  <div className="font-mono text-[11px] uppercase tracking-[0.22em] text-neon-cyan font-semibold">
                    Pillar 01
                  </div>
                  <h3 className="font-display text-xl font-bold text-fg leading-tight">
                    AI Continuous Pentesting
                  </h3>
                </div>
              </div>
              <p className="mt-4 text-sm text-fg-muted leading-relaxed">
                On-demand and always-on VAPT for your live attack surface — kicked
                off from the dashboard or triggered by a commit webhook.
              </p>
              <ul className="mt-5 space-y-2.5">
                {PILLAR_FEATURES.pentest.map((f) => (
                  <li key={f} className="flex gap-2.5 text-sm text-fg-muted">
                    <CheckCircle2 className="size-4 text-neon-cyan shrink-0 mt-0.5" />
                    <span className="leading-snug">{f}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-6 pt-5 border-t border-line/60">
                <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-fg-faint mb-3">
                  Tested surfaces
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {PENTEST_SURFACES.map((s) => (
                    <div
                      key={s.name}
                      className="rounded-lg bg-bg-2/60 ring-1 ring-line p-3"
                    >
                      <div className="flex items-center gap-2">
                        <div
                          className={`grid size-7 place-items-center rounded-md ring-1 ${COLOR_RING[s.color]}`}
                        >
                          <s.icon className="size-3.5" />
                        </div>
                        <div className="text-[12px] font-semibold text-fg">
                          {s.name}
                        </div>
                      </div>
                      <div className="mt-1.5 text-[10.5px] text-fg-faint leading-snug">
                        {s.detail}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* COMPLIANCE PILLAR */}
            <div className="rounded-2xl glass-strong p-7 ring-1 ring-neon-purple/20 flex flex-col">
              <div className="flex items-center gap-3">
                <div className="grid size-12 place-items-center rounded-xl bg-bg-2 ring-1 ring-neon-purple/30 text-neon-purple">
                  <BadgeCheck className="size-6" />
                </div>
                <div>
                  <div className="font-mono text-[11px] uppercase tracking-[0.22em] text-neon-purple font-semibold">
                    Pillar 02
                  </div>
                  <h3 className="font-display text-xl font-bold text-fg leading-tight">
                    Compliance Readiness Engine
                  </h3>
                </div>
              </div>
              <p className="mt-4 text-sm text-fg-muted leading-relaxed">
                Automated evidence collection and real-time readiness scoring for
                every framework that matters to your business and your regulator.
              </p>
              <ul className="mt-5 space-y-2.5">
                {PILLAR_FEATURES.compliance.map((f) => (
                  <li key={f} className="flex gap-2.5 text-sm text-fg-muted">
                    <CheckCircle2 className="size-4 text-neon-purple shrink-0 mt-0.5" />
                    <span className="leading-snug">{f}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-6 pt-5 border-t border-line/60">
                <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-fg-faint mb-3">
                  Supported frameworks
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {COMPLIANCE_FRAMEWORKS.map((f) => (
                    <span
                      key={f.name}
                      className={`inline-flex items-center rounded-full ring-1 px-2.5 py-0.5 text-[11px] font-semibold ${COLOR_BADGE[f.color]}`}
                    >
                      {f.name}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* HOW IT WORKS */}
      <section id="how-it-works" className="py-20">
        <Container>
          <Eyebrow>How it works</Eyebrow>
          <h2 className="mt-3 font-display text-3xl font-black sm:text-4xl text-balance leading-[1.05]">
            Five steps from connect to auditor-ready.
          </h2>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
            {HOW_IT_WORKS.map((s) => (
              <div
                key={s.step}
                className="rounded-2xl glass p-5 ring-1 ring-line flex flex-col"
              >
                <div className="flex items-center justify-between">
                  <span className="font-display text-3xl font-black gradient-text leading-none">
                    {s.step}
                  </span>
                  <div className="grid size-9 place-items-center rounded-lg bg-bg-2 ring-1 ring-neon-cyan/30 text-neon-cyan">
                    <s.icon className="size-4" />
                  </div>
                </div>
                <h3 className="mt-4 font-display text-base font-bold text-fg leading-snug">
                  {s.title}
                </h3>
                <p className="mt-2 text-[13px] text-fg-muted leading-relaxed">
                  {s.body}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* WHY DIFFERENT */}
      <section className="py-20 bg-bg-1">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12 items-start">
            <div className="lg:col-span-5">
              <Eyebrow color="purple">Why Pentaudit</Eyebrow>
              <h2 className="mt-3 font-display text-3xl font-black sm:text-4xl text-balance leading-[1.05]">
                Built India-first.{" "}
                <span className="gradient-text">Backed by Macksofy&apos;s bench.</span>
              </h2>
              <p className="mt-5 text-fg-muted text-pretty leading-relaxed">
                Most compliance-automation platforms were designed for US SOC 2
                and bolted on global frameworks afterwards. Pentaudit shipped
                with native packs for RBI Cybersecurity, SEBI CSCRF, CERT-In
                Audit, DPDP Act, NCA-ECC and UAE PDPL because that&apos;s where
                Macksofy lives. And when the AI plateau is reached on a tricky
                finding, a real OSCP-certified pentester is one click away.
              </p>
            </div>
            <div className="lg:col-span-7">
              <div className="grid gap-4 sm:grid-cols-2">
                {[
                  {
                    title: "AI where it adds speed",
                    body:
                      "LLM-planned, deterministic-executed. No hallucinated findings — every alert is reproducible.",
                    icon: Cpu,
                  },
                  {
                    title: "Human on tap",
                    body:
                      "One-click escalation to a Macksofy senior pentester for manual validation and deep-dive.",
                    icon: Users,
                  },
                  {
                    title: "Continuous, not annual",
                    body:
                      "Diff scans on commit. The CISO sees a live trend chart, not a year-old PDF.",
                    icon: Activity,
                  },
                  {
                    title: "Evidence into compliance",
                    body:
                      "Findings on the offence side auto-populate evidence on the compliance side.",
                    icon: GitPullRequest,
                  },
                  {
                    title: "India-first framework packs",
                    body:
                      "Native RBI · SEBI · CERT-In · DPDP coverage. UAE PDPL + NCA-ECC for GCC clients.",
                    icon: BadgeCheck,
                  },
                  {
                    title: "Actionable alerts",
                    body:
                      "No alert-fatigue — Pentaudit only pings when posture or attack surface actually changes.",
                    icon: Bell,
                  },
                ].map((c) => (
                  <div
                    key={c.title}
                    className="rounded-2xl glass p-5 ring-1 ring-line"
                  >
                    <div className="grid size-10 place-items-center rounded-lg bg-bg-2 ring-1 ring-neon-cyan/30 text-neon-cyan">
                      <c.icon className="size-5" />
                    </div>
                    <h3 className="mt-4 font-display text-base font-bold text-fg leading-snug">
                      {c.title}
                    </h3>
                    <p className="mt-1.5 text-[13px] text-fg-muted leading-relaxed">
                      {c.body}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* USE CASES */}
      <section className="py-20">
        <Container>
          <Eyebrow>Who buys Pentaudit</Eyebrow>
          <h2 className="mt-3 font-display text-3xl font-black sm:text-4xl text-balance leading-[1.05]">
            From pre-Series-A to listed enterprise.
          </h2>
          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {USE_CASES.map((u) => (
              <div
                key={u.audience}
                className="rounded-2xl glass p-6 ring-1 ring-line flex flex-col"
              >
                <div className="grid size-12 place-items-center rounded-xl bg-bg-2 ring-1 ring-neon-purple/30 text-neon-purple">
                  <u.icon className="size-6" />
                </div>
                <h3 className="mt-5 font-display text-lg font-bold text-fg leading-snug">
                  {u.audience}
                </h3>
                <ul className="mt-4 space-y-2.5">
                  {u.points.map((p) => (
                    <li key={p} className="flex gap-2.5 text-sm text-fg-muted">
                      <CheckCircle2 className="size-4 text-neon-cyan shrink-0 mt-0.5" />
                      <span className="leading-snug">{p}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="py-20 bg-bg-1">
        <Container>
          <div className="relative overflow-hidden rounded-3xl glass-strong p-10 sm:p-14 text-center glow-blend">
            <GlowOrb
              className="-top-20 left-1/2 -translate-x-1/2"
              color="cyan"
              size={420}
            />
            <div className="relative">
              <Eyebrow>14-day free trial · no card</Eyebrow>
              <h2 className="mt-4 font-display text-3xl font-black sm:text-4xl lg:text-5xl text-balance leading-[1.05]">
                Connect a cloud account.{" "}
                <span className="gradient-text">See your posture in 15 minutes.</span>
              </h2>
              <p className="mt-5 mx-auto max-w-2xl text-fg-muted text-pretty">
                Bind one cloud account, one application URL and one compliance
                framework. We&apos;ll run the first scan, compute the readiness
                score and produce the gap report — all within the free trial
                window.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <LinkButton
                  href="/contact?interest=Pentaudit"
                  size="lg"
                  withArrow
                >
                  Start free 14-day trial
                </LinkButton>
                <LinkButton href="/contact" variant="outline" size="lg">
                  Book a demo
                </LinkButton>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* FAQ */}
      <section className="py-20">
        <Container>
          <div className="max-w-3xl">
            <Eyebrow>FAQ</Eyebrow>
            <h2 className="mt-3 font-display text-3xl font-black sm:text-4xl text-balance leading-[1.05]">
              Questions buyers ask before they sign.
            </h2>
            <div className="mt-10">
              <FAQAccordion faqs={FAQS} />
            </div>
          </div>
        </Container>
      </section>

      <LeadCapture />
    </>
  );
}
