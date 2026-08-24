import {
  Factory,
  CheckCircle2,
  Shield,
  Cpu,
  Cable,
  Radio,
  Activity,
  AlertTriangle,
  ShieldCheck,
  Award,
  Brain,
  Workflow,
  FileText,
  Zap,
  Lock,
  Compass,
  Search,
  Bug,
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/SectionTitle";
import { Badge } from "@/components/ui/Badge";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { LinkButton } from "@/components/ui/Button";
import { ParticleBackground } from "@/components/visuals/ParticleBackground";
import { GlowOrb } from "@/components/visuals/GlowOrb";
import { ToolStack } from "@/components/visuals/ToolStack";
import { ComplianceMatrix } from "@/components/visuals/ComplianceMatrix";
import { RiskMeter } from "@/components/visuals/RiskMeter";
import { FAQAccordion } from "@/components/sections/FAQAccordion";
import { LeadCapture } from "@/components/home/LeadCapture";
import { WhereWeDeliver } from "@/components/sections/WhereWeDeliver";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema, faqSchema, serviceSchema, methodologyHowToSchema } from "@/lib/schema";
import { SITE } from "@/lib/site";
import { buildMetadata } from "@/lib/seo";
import { getServiceBySlug } from "@/content/services";
import { TrustStrip } from "@/components/TrustStrip";
import { DeliverablesIndustries } from "@/components/services/DeliverablesIndustries";
import { PurdueModelStack } from "@/components/visuals/iot/PurdueModelStack";
import { ICSProtocolGrid } from "@/components/visuals/iot/ICSProtocolGrid";
import { OTHmiPanel } from "@/components/visuals/iot/OTHmiPanel";
import { AnswerBox } from "@/components/sections/AnswerBox";
import { getShortAnswer } from "@/content/shortAnswers";
import { GlossaryLinks } from "@/components/sections/GlossaryLinks";
import { References } from "@/components/sections/References";
import { Methodology } from "@/components/visuals/methodology/Methodology";

const SLUG = "iot-ot-security";

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

export default function IotOtSecurityPage() {
  const service = getServiceBySlug(SLUG)!;
  const sa = getShortAnswer("service:iot-ot-security");

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
        <ParticleBackground density={55} />
        <GlowOrb className="-top-32 left-1/4" color="pink" size={520} />
        <GlowOrb className="-bottom-24 right-1/4" color="cyan" size={460} />
        <Container className="relative pt-10 pb-20">
          <Breadcrumbs
            items={[
              { name: "Services", href: "/services" },
              { name: service.shortTitle, href: `/services/${service.slug}` },
            ]}
          />
          <div className="mt-10 grid gap-12 lg:grid-cols-12 items-center">
            <div className="lg:col-span-7">
              <Eyebrow color="amber">{service.hero.eyebrow}</Eyebrow>
              <div className="mt-5 flex items-center gap-4">
                <div className="grid size-14 place-items-center rounded-2xl bg-bg-2 ring-1 ring-amber-400/40 text-amber-300">
                  <Factory className="size-7" />
                </div>
                <h1 className="font-display text-4xl font-black sm:text-5xl lg:text-[3.4rem] text-balance leading-[1.05]">
                  IoT &amp; OT Security{" "}
                  <span className="gradient-text">Assessment in India &amp; UAE</span> — ICS, SCADA, smart products.
                </h1>
              </div>
              <p className="mt-6 max-w-2xl text-lg text-fg-muted text-pretty leading-relaxed">
                {service.hero.description}
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <LinkButton href="/contact?interest=IoT%20%26%20OT%20Security" size="lg" withArrow>
                  Request a quote
                </LinkButton>
                <LinkButton href="#purdue" variant="outline" size="lg">
                  See methodology
                </LinkButton>
              </div>
              <div className="mt-6 flex flex-wrap gap-2">
                {[
                  "IEC 62443",
                  "NIST SP 800-82r3",
                  "MITRE ATT&CK ICS",
                  "NIS2 OT",
                  "NCA-ECC OT",
                  "CEA cyber guidelines",
                ].map((b) => (
                  <span
                    key={b}
                    className="font-mono text-[10px] uppercase tracking-[0.16em] text-fg-muted rounded-full border border-line px-2.5 py-1"
                  >
                    {b}
                  </span>
                ))}
              </div>
            </div>
            <div className="lg:col-span-5">
              <OTHmiPanel />
            </div>
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

      {/* OT ≠ IT */}
      <section className="py-16 sm:py-20 border-t border-line">
        <Container>
          <div className="max-w-3xl">
            <Eyebrow>Why OT is not just IT with PLCs</Eyebrow>
            <h2 className="mt-3 font-display text-3xl font-black sm:text-4xl text-balance leading-[1.05]">
              Wrong tooling on a process network <span className="gradient-text">trips real things</span>.
            </h2>
            <p className="mt-4 text-fg-muted text-pretty leading-relaxed">
              A misfired Nmap run can drop a turbine. We treat OT engagements with the same
              safety mindset your reliability engineers do — written envelope, passive-first,
              ICS-validated tooling, stop signals.
            </p>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {[
              {
                icon: Activity,
                title: "Different priorities",
                accent: "text-sky-300 ring-sky-400/40 bg-sky-400/10",
                lead: "IT optimises for confidentiality. OT optimises for safety and availability — in that order.",
                points: [
                  "A 30-second outage on Modbus is a process incident, not a ticket",
                  "Engineering changes follow MoC, not Jira tickets",
                  "Devices are rated for 20-year service · patching is rare",
                ],
              },
              {
                icon: Cable,
                title: "Fragile protocols",
                accent: "text-amber-300 ring-amber-400/40 bg-amber-400/10",
                lead: "Modbus, S7, DNP3 and IEC-104 were designed for serial buses inside a fence. Now they ride Ethernet.",
                points: [
                  "Most field protocols have no authentication at all",
                  "Generic scanners crash banner-less ICS stacks",
                  "Even read-only probing can change asset state",
                ],
              },
              {
                icon: ShieldCheck,
                title: "Physical impact",
                accent: "text-red-300 ring-red-400/40 bg-red-400/10",
                lead: "An OT finding maps to a process consequence — pressure relief, valve drift, generator trip.",
                points: [
                  "Findings must read in physics + safety language",
                  "Risk is measured against PHA / HAZOP — not CVSS alone",
                  "Mitigations have to clear MoC + commissioning windows",
                ],
              },
            ].map((c) => {
              const Icon = c.icon;
              return (
                <div key={c.title} className="rounded-2xl glass p-6 h-full flex flex-col">
                  <div className="flex items-center gap-3">
                    <div className={`grid size-11 place-items-center rounded-xl ring-1 ${c.accent}`}>
                      <Icon className="size-5" />
                    </div>
                    <div className="font-display text-base font-bold text-fg leading-tight">
                      {c.title}
                    </div>
                  </div>
                  <p className="mt-4 text-sm text-fg-muted leading-relaxed">{c.lead}</p>
                  <ul className="mt-4 space-y-2 text-[13px] text-fg-muted">
                    {c.points.map((pt) => (
                      <li key={pt} className="flex gap-2">
                        <CheckCircle2 className="size-4 text-amber-300 shrink-0 mt-0.5" />
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

      {/* PURDUE MODEL */}
      <section id="purdue" className="py-20 bg-bg-1">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12 items-start">
            <div className="lg:col-span-5">
              <Eyebrow color="amber">Purdue model</Eyebrow>
              <h2 className="mt-3 font-display text-3xl font-black sm:text-4xl text-balance leading-[1.05]">
                Five layers, <span className="gradient-text">one pivot path</span>.
              </h2>
              <p className="mt-5 text-fg-muted leading-relaxed text-pretty">
                The Purdue reference model is how every OT auditor thinks about your plant.
                We assess every layer — corporate IT, the industrial DMZ, operations, supervisory
                control and the process — and demonstrate how an attacker walks from a phishing
                email to a setpoint change.
              </p>
              <ul className="mt-6 space-y-2 text-sm">
                {[
                  "Tiered admin model + jump-host audit",
                  "OT zone & conduit diagram per IEC 62443-3-2",
                  "Engineering workstation hardening review",
                  "IT→OT pivot demonstration (read-only by default)",
                  "Safety-instrumented-system isolation validation",
                ].map((b) => (
                  <li key={b} className="flex gap-3">
                    <CheckCircle2 className="size-5 text-amber-300 shrink-0 mt-0.5" />
                    <span className="text-fg-muted leading-relaxed">{b}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="lg:col-span-7">
              <PurdueModelStack />
            </div>
          </div>
        </Container>
      </section>

      {/* ICS PROTOCOLS */}
      <section className="py-20">
        <Container>
          <div className="max-w-3xl">
            <Eyebrow color="purple">Protocol attack surface</Eyebrow>
            <h2 className="mt-3 font-display text-3xl font-black sm:text-4xl text-balance leading-[1.05]">
              Twelve protocols we see on every <span className="gradient-text">plant floor</span>.
            </h2>
            <p className="mt-4 text-fg-muted text-pretty leading-relaxed">
              Each one carries a different blast radius. We carry the ICS-specific tooling and
              the operator-side know-how to validate which ones are exposed — without bricking
              the device under test.
            </p>
          </div>
          <div className="mt-12">
            <ICSProtocolGrid />
          </div>
        </Container>
      </section>

      {/* CONNECTED PRODUCTS / IoT */}
      <section className="py-20 bg-bg-1">
        <Container>
          <div className="grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <Eyebrow color="green">Connected products</Eyebrow>
              <h2 className="mt-3 font-display text-3xl font-black sm:text-4xl text-balance leading-[1.05]">
                Hardware. Firmware. Radio. <span className="gradient-text">Cloud</span>.
              </h2>
              <p className="mt-5 text-fg-muted leading-relaxed text-pretty">
                Product-side IoT testing is its own discipline. We extract firmware, walk JTAG /
                UART / SPI, replay BLE pairing, fuzz LoRa downlinks and test the cloud back-end
                and OTA pipeline — because a fielded device gets attacked at every layer the
                vendor forgot.
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                {[
                  "Smart meters",
                  "Medical (IoMT)",
                  "Connected vehicles",
                  "Wearables",
                  "Smart-home gateways",
                  "Industrial IoT sensors",
                  "ANPR / CCTV",
                  "EV chargers",
                ].map((p) => (
                  <span
                    key={p}
                    className="font-mono text-[10px] uppercase tracking-[0.16em] text-fg-muted rounded-full border border-line px-2.5 py-1"
                  >
                    {p}
                  </span>
                ))}
              </div>
            </div>

            <div className="lg:col-span-7">
              <div className="grid gap-4 sm:grid-cols-2">
                {[
                  {
                    icon: Cpu,
                    title: "Hardware",
                    accent: "text-sky-300 ring-sky-400/40 bg-sky-400/10",
                    points: [
                      "Debug interfaces: UART, JTAG, SWD, SPI flash dump",
                      "Glitching / fault-injection on secure boot",
                      "Voltage rail probing + clock-edge analysis",
                      "Tamper-evidence + sticker / seal review",
                    ],
                  },
                  {
                    icon: Workflow,
                    title: "Firmware",
                    accent: "text-amber-300 ring-amber-400/40 bg-amber-400/10",
                    points: [
                      "Binwalk extraction + Ghidra reverse engineering",
                      "Hard-coded creds, private keys, debug back-doors",
                      "Insecure update / OTA signature bypass",
                      "Cryptographic primitive misuse (ECB, static IV)",
                    ],
                  },
                  {
                    icon: Radio,
                    title: "Wireless",
                    accent: "text-violet-300 ring-violet-400/40 bg-violet-400/10",
                    points: [
                      "BLE pairing replay + GATT enumeration",
                      "Zigbee touchlink + key extraction",
                      "LoRaWAN AppKey reuse · downlink injection",
                      "Sub-GHz / 802.15.4 / NB-IoT SDR capture",
                    ],
                  },
                  {
                    icon: Lock,
                    title: "Cloud + companion app",
                    accent: "text-emerald-300 ring-emerald-400/40 bg-emerald-400/10",
                    points: [
                      "MQTT / CoAP broker ACL bypass",
                      "Cross-account device-claim takeover",
                      "Companion-app pinning + provisioning flow",
                      "OTA bucket exposure + update-server abuse",
                    ],
                  },
                ].map((card) => {
                  const Icon = card.icon;
                  return (
                    <div key={card.title} className="rounded-2xl glass p-5 h-full flex flex-col">
                      <div className="flex items-center gap-3 mb-3">
                        <div className={`grid size-10 place-items-center rounded-lg ring-1 ${card.accent}`}>
                          <Icon className="size-4" />
                        </div>
                        <div className="font-display text-sm font-bold text-fg leading-tight">
                          {card.title}
                        </div>
                      </div>
                      <ul className="space-y-1.5 text-[12px] text-fg-muted leading-snug">
                        {card.points.map((pt) => (
                          <li key={pt} className="flex gap-1.5">
                            <span className="text-amber-300/70 mt-1 shrink-0">▸</span>
                            <span>{pt}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* IMPACT STRIP */}
      <section className="py-20">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12 items-center">
            <div className="lg:col-span-6">
              <Eyebrow color="amber">Why this matters now</Eyebrow>
              <h2 className="mt-3 font-display text-3xl font-black sm:text-4xl text-balance leading-[1.05]">
                The OT/IoT bill is <span className="gradient-text">coming due</span>.
              </h2>
              <p className="mt-5 text-fg-muted leading-relaxed text-pretty">
                Power, water, oil &amp; gas, manufacturing and connected-product makers are now
                inside the regulatory frame in both India and the GCC. The question is no longer
                <em> if </em>OT will be audited — it&rsquo;s whether the report passes.
              </p>
              <ul className="mt-6 space-y-2 text-sm">
                {service.businessImpact.map((b) => (
                  <li key={b} className="flex gap-3">
                    <CheckCircle2 className="size-5 text-amber-300 shrink-0 mt-0.5" />
                    <span className="text-fg-muted leading-relaxed">{b}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="lg:col-span-6">
              <div className="rounded-2xl glass p-6 sm:p-8 grid grid-cols-2 gap-3">
                {[
                  { v: "62443", k: "Zone & conduit SLs assessed end-to-end" },
                  { v: "0", k: "Process trips caused on a Macksofy OT engagement" },
                  { v: "60d", k: "Free retest window on high / critical findings" },
                  { v: "20+", k: "OT protocols carried in our active toolset" },
                ].map((m) => (
                  <div key={m.k} className="rounded-xl ring-1 ring-line bg-bg-1/40 p-4">
                    <div className="font-display text-2xl font-black gradient-text leading-none">
                      {m.v}
                    </div>
                    <div className="mt-2 text-[11px] text-fg-muted leading-snug">{m.k}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* METHODOLOGY */}
      <section id="methodology" className="py-20 bg-bg-1">
        <Container>
          <div className="max-w-3xl">
            <Eyebrow>OT-aware methodology</Eyebrow>
            <h2 className="mt-3 font-display text-3xl font-black sm:text-4xl text-balance leading-[1.05]">
              How a Macksofy OT engagement <span className="gradient-text">actually runs</span>.
            </h2>
            <p className="mt-4 text-fg-muted text-pretty leading-relaxed">
              Six stages, three-to-five weeks for a typical site assessment. Built around your
              reliability and safety engineers — not around our toolkit.
            </p>
          </div>

          <ol className="relative mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                num: "01",
                title: "Safety envelope & scoping",
                desc: "Site walk-down with reliability + safety. PHA review. Zone & conduit map. Stop-test signals.",
                icon: Compass,
                accent: "text-sky-300 ring-sky-400/40 bg-sky-400/10",
                duration: "3–5 days",
              },
              {
                num: "02",
                title: "Passive discovery",
                desc: "SPAN / TAP capture for Modbus, DNP3, S7, Profinet, OPC UA, BACnet, IEC-104. Asset inventory build.",
                icon: Search,
                accent: "text-violet-300 ring-violet-400/40 bg-violet-400/10",
                duration: "5–7 days",
              },
              {
                num: "03",
                title: "IT / OT boundary",
                desc: "DMZ + jump-host audit. EWS hardening. Vendor / remote-support exposure mapping.",
                icon: Shield,
                accent: "text-amber-300 ring-amber-400/40 bg-amber-400/10",
                duration: "3–4 days",
              },
              {
                num: "04",
                title: "Targeted active testing",
                desc: "ICS-aware validation. HMI + historian auth. Firmware reverse-engineering. Wireless audit.",
                icon: Bug,
                accent: "text-orange-300 ring-orange-400/40 bg-orange-400/10",
                duration: "5–8 days",
              },
              {
                num: "05",
                title: "Pivot simulation",
                desc: "Read-only IT→OT lateral path demonstration. EWS → PLC capability. SIS isolation validation.",
                icon: Zap,
                accent: "text-red-300 ring-red-400/40 bg-red-400/10",
                duration: "2–3 days",
              },
              {
                num: "06",
                title: "Report & retest",
                desc: "IEC 62443 + MITRE ATT&CK ICS mapping. Plant-manager + CISO summary. 60-day retest.",
                icon: FileText,
                accent: "text-emerald-300 ring-emerald-400/40 bg-emerald-400/10",
                duration: "4–5 days",
              },
            ].map((s) => {
              const Icon = s.icon;
              return (
                <li
                  key={s.num}
                  className="relative rounded-2xl glass p-5 h-full flex flex-col"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className={`grid size-11 place-items-center rounded-xl ring-1 ${s.accent}`}>
                      <Icon className="size-5" />
                    </div>
                    <span className="font-display text-2xl font-black text-fg-faint/50 tabular-nums">
                      {s.num}
                    </span>
                  </div>
                  <div className="font-display text-base font-bold text-fg leading-tight">
                    {s.title}
                  </div>
                  <p className="mt-2 text-[13px] text-fg-muted leading-relaxed flex-1">
                    {s.desc}
                  </p>
                  <div className="mt-4 pt-4 border-t border-line/60 font-mono text-[10px] uppercase tracking-[0.16em] text-fg-faint">
                    {s.duration}
                  </div>
                </li>
              );
            })}
          </ol>
          <div className="mt-12">
            <Methodology
              slug={SLUG}
              phases={service.methodology}
              subjectLabel={service.shortTitle}
            />
          </div>
        </Container>
      </section>

      {/* WHY MACKSOFY */}
      <section className="py-20">
        <Container>
          <div className="max-w-3xl">
            <Eyebrow color="purple">Why Macksofy for OT &amp; IoT</Eyebrow>
            <h2 className="mt-3 font-display text-3xl font-black sm:text-4xl text-balance leading-[1.05]">
              We don&rsquo;t just bolt OT onto a pentest service line.
            </h2>
            <p className="mt-4 text-fg-muted text-pretty leading-relaxed">
              OT requires operator-grade discipline plus offensive-security tradecraft. Here&rsquo;s
              what makes a Macksofy industrial engagement different.
            </p>
          </div>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                icon: Award,
                title: "CERT-In + OT-trained",
                accent: "text-neon-cyan ring-neon-cyan/40 bg-neon-cyan/10",
                desc: "CERT-In empanelled auditor with operators carrying IEC 62443 cybersecurity practitioner credentials alongside OSCP.",
              },
              {
                icon: AlertTriangle,
                title: "Zero process trips",
                accent: "text-amber-300 ring-amber-400/40 bg-amber-400/10",
                desc: "Passive-first, written safety envelope, ICS-validated tooling. No Nessus storms on a Modbus segment.",
              },
              {
                icon: Brain,
                title: "Operator language",
                accent: "text-violet-300 ring-violet-400/40 bg-violet-400/10",
                desc: "Findings are mapped to process consequence, PHA / HAZOP categories and MoC realities — not just CVSS.",
              },
              {
                icon: Zap,
                title: "60-day free retest",
                accent: "text-emerald-300 ring-emerald-400/40 bg-emerald-400/10",
                desc: "Fix it, ship it, ping us. We re-test every High / Critical free of charge and issue a closure letter your auditor will accept.",
              },
            ].map((w) => {
              const Icon = w.icon;
              return (
                <div key={w.title} className="rounded-2xl glass p-6 h-full flex flex-col">
                  <div className={`grid size-12 place-items-center rounded-xl ring-1 ${w.accent} mb-4`}>
                    <Icon className="size-5" />
                  </div>
                  <div className="font-display text-base font-bold text-fg leading-tight">
                    {w.title}
                  </div>
                  <p className="mt-3 text-sm text-fg-muted leading-relaxed flex-1">{w.desc}</p>
                </div>
              );
            })}
          </div>
        </Container>
      </section>

      {/* CASE STUDIES */}
      <section className="py-20 bg-bg-1">
        <Container>
          <Eyebrow color="amber">Engagement snapshot</Eyebrow>
          <h2 className="mt-3 font-display text-3xl font-black sm:text-4xl text-balance leading-[1.05]">
            What we found inside <span className="gradient-text">real OT estates</span>.
          </h2>
          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {service.caseStudies.map((cs, i) => (
              <div key={i} className="rounded-2xl glass p-6 flex flex-col lift">
                <Badge variant="cyan" className="self-start">{cs.industry}</Badge>
                <p className="mt-3 text-sm font-semibold text-fg">{cs.scope}</p>
                <p className="mt-3 text-sm text-fg-muted leading-relaxed flex-1">
                  <span className="text-amber-300 font-semibold">Finding · </span>{cs.finding}
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

      {/* TOOL STACK */}
      <section className="py-20">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12 items-end">
            <div className="lg:col-span-5">
              <Eyebrow>ICS-validated tooling</Eyebrow>
              <h2 className="mt-3 font-display text-3xl font-black sm:text-4xl text-balance leading-[1.05]">
                Built for the <span className="gradient-text">process network</span>.
              </h2>
              <p className="mt-4 text-fg-muted text-pretty leading-relaxed">
                The same tooling used by national lab OT teams and ICS vendors&rsquo; own pre-release
                hardening squads — never a generic IT scanner pointed at a PLC.
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

      {/* COMPLIANCE */}
      <section className="py-20 bg-bg-1">
        <Container>
          <div className="max-w-3xl">
            <Eyebrow>Compliance evidence</Eyebrow>
            <h2 className="mt-3 font-display text-3xl font-black sm:text-4xl text-balance leading-[1.05]">
              One engagement, <span className="gradient-text">every OT framework</span>.
            </h2>
            <p className="mt-4 text-fg-muted text-pretty">
              Findings are mapped so a single Macksofy OT assessment satisfies IEC 62443, NIST SP
              800-82, MITRE ATT&amp;CK for ICS, CEA cyber guidelines (India), NIS2 (EU), NCA-ECC
              OT controls (KSA) and CERT-In advisories.
            </p>
          </div>
          <div className="mt-12">
            <ComplianceMatrix />
          </div>
        </Container>
      </section>

      <DeliverablesIndustries
        service={service}
        eyebrow="Deliverables"
        heading="What you get when the assessment ends"
        tone="plain"
      />

      <TrustStrip />

      {/* FAQ */}
      <section className="py-20">
        <Container>
          <div className="max-w-3xl">
            <Eyebrow>FAQ</Eyebrow>
            <h2 className="mt-3 font-display text-3xl font-black sm:text-4xl text-balance leading-[1.05]">
              Things people ask before signing.
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

      <References pageKey="service:iot-ot-security" />
      <GlossaryLinks href="/services/iot-ot-security" />
      <LeadCapture />
    </>
  );
}
