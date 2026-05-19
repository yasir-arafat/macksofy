import {
  Cloud,
  CheckCircle2,
  Server,
  Layers,
  Boxes,
  Container as ContainerIcon,
  Compass,
  Search,
  Bug,
  ShieldCheck,
  FileText,
  Workflow,
  Award,
  Brain,
  Building2,
  Zap,
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
import { CloudArchitecture } from "@/components/visuals/cloud/CloudArchitecture";
import { IamBlastRadius } from "@/components/visuals/cloud/IamBlastRadius";

const SLUG = "cloud-security";

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

export default function CloudSecurityPage() {
  const service = getServiceBySlug(SLUG)!;

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
        <ParticleBackground density={60} />
        <GlowOrb className="-top-40 left-1/3" color="cyan" size={520} />
        <GlowOrb className="-bottom-20 right-1/4" color="purple" size={420} />
        <Container className="relative pt-10 pb-20">
          <Breadcrumbs
            items={[
              { name: "Services", href: "/services" },
              { name: service.shortTitle, href: `/services/${service.slug}` },
            ]}
          />
          <div className="mt-10 grid gap-12 lg:grid-cols-12 items-center">
            <div className="lg:col-span-7">
              <Eyebrow>{service.hero.eyebrow}</Eyebrow>
              <div className="mt-5 flex items-center gap-4">
                <div className="grid size-14 place-items-center rounded-2xl bg-bg-2 ring-1 ring-sky-400/30 text-sky-300">
                  <Cloud className="size-7" />
                </div>
                <h1 className="font-display text-4xl font-black sm:text-5xl lg:text-[3.4rem] text-balance leading-[1.05]">
                  Cloud Security Audit &amp; <span className="gradient-text">VAPT in India</span> — AWS, Azure, GCP.
                </h1>
              </div>
              <p className="mt-6 max-w-2xl text-lg text-fg-muted text-pretty leading-relaxed">
                {service.hero.description}
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <LinkButton href="/contact?interest=Cloud%20Security" size="lg" withArrow>
                  Request a quote
                </LinkButton>
                <LinkButton href="#architecture" variant="outline" size="lg">
                  See coverage
                </LinkButton>
              </div>
            </div>
            <div className="lg:col-span-5">
              <IamBlastRadius />
            </div>
          </div>
        </Container>
      </section>

      {/* CLOUD LAYERS COVERED — IaaS / PaaS / SaaS */}
      <section className="py-16 sm:py-20 border-t border-line">
        <Container>
          <div className="max-w-3xl">
            <Eyebrow>Layer coverage</Eyebrow>
            <h2 className="mt-3 font-display text-3xl font-black sm:text-4xl text-balance leading-[1.05]">
              IaaS. PaaS. SaaS. <span className="gradient-text">All three break differently.</span>
            </h2>
            <p className="mt-4 text-fg-muted text-pretty leading-relaxed">
              A cloud assessment that only checks one layer misses two thirds of the attack
              surface. We test the way attackers move — across the stack, not inside a single
              tier.
            </p>
          </div>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {[
              {
                tier: "IaaS",
                title: "Infrastructure-as-a-Service",
                icon: Server,
                accent: "text-sky-300 ring-sky-400/40 bg-sky-400/10",
                lead: "EC2, Compute Engine, Azure VMs — your direct responsibility from the OS up.",
                points: [
                  "VPC / VNet segmentation + flow-log audit",
                  "Instance metadata service (IMDSv1 / SSRF) abuse",
                  "Custom AMIs, snapshots, exposed disks",
                  "Provider-IAM role mis-scoping",
                ],
              },
              {
                tier: "PaaS",
                title: "Platform-as-a-Service",
                icon: Layers,
                accent: "text-violet-300 ring-violet-400/40 bg-violet-400/10",
                lead: "Lambda, App Service, Cloud Functions, RDS, EKS control planes — where the wiring usually breaks.",
                points: [
                  "Function execution-role privilege escalation",
                  "Managed-DB public exposure + auth-replay",
                  "Service-mesh + API-gateway auth bypass",
                  "Secrets in environment variables and build logs",
                ],
              },
              {
                tier: "SaaS",
                title: "Software-as-a-Service",
                icon: Cloud,
                accent: "text-emerald-300 ring-emerald-400/40 bg-emerald-400/10",
                lead: "M365, Google Workspace, Salesforce, Atlassian — your data, someone else&rsquo;s ops.",
                points: [
                  "Tenant-isolation + cross-tenant data exposure",
                  "OAuth scope sprawl + consent-grant abuse",
                  "SCIM provisioning drift + dormant identities",
                  "Conditional-access / DLP bypass",
                ],
              },
            ].map((layer) => {
              const Icon = layer.icon;
              return (
                <div key={layer.tier} className="rounded-2xl glass p-6 h-full flex flex-col">
                  <div className="flex items-center gap-3">
                    <div className={`grid size-11 place-items-center rounded-xl ring-1 ${layer.accent}`}>
                      <Icon className="size-5" />
                    </div>
                    <div>
                      <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-fg-faint">
                        {layer.tier}
                      </div>
                      <div className="font-display text-base font-bold text-fg leading-tight">
                        {layer.title}
                      </div>
                    </div>
                  </div>
                  <p className="mt-4 text-sm text-fg-muted leading-relaxed">{layer.lead}</p>
                  <ul className="mt-4 space-y-2 text-[13px] text-fg-muted">
                    {layer.points.map((pt) => (
                      <li key={pt} className="flex gap-2">
                        <CheckCircle2 className="size-4 text-neon-cyan shrink-0 mt-0.5" />
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

      {/* CIS BENCHMARK ARCHITECTURE */}
      <section id="architecture" className="py-20 bg-bg-1">
        <Container>
          <div className="max-w-3xl">
            <Eyebrow>Sample posture report</Eyebrow>
            <h2 className="mt-3 font-display text-3xl font-black sm:text-4xl text-balance leading-[1.05]">
              <span className="gradient-text">3 clouds.</span> 12 services. 13 findings.
            </h2>
            <p className="mt-4 text-fg-muted text-pretty">
              Composite from a 2025 assessment of a Series-B SaaS running multi-cloud across
              AWS, Azure and GCP. Each tile maps to CIS benchmarks + provider best practice.
            </p>
          </div>
          <div className="mt-12">
            <CloudArchitecture />
          </div>
        </Container>
      </section>

      {/* IAM PRIVESC */}
      <section className="py-20">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12 items-center">
            <div className="lg:col-span-6">
              <Eyebrow color="amber">IAM blast radius</Eyebrow>
              <h2 className="mt-3 font-display text-3xl font-black sm:text-4xl text-balance leading-[1.05]">
                One overscoped role = <span className="gradient-text">five privesc paths</span>.
              </h2>
              <p className="mt-5 text-fg-muted leading-relaxed text-pretty">
                Cloud breaches almost never need a CVE. The Lambda execution role with
                <code className="font-mono text-xs text-amber-300 mx-1">s3:*</code> +
                <code className="font-mono text-xs text-amber-300 mx-1">iam:PassRole *</code>
                is what turns a single SSRF into AWS account takeover.
              </p>
              <ul className="mt-6 space-y-2 text-sm">
                {service.businessImpact.map((b) => (
                  <li key={b} className="flex gap-3">
                    <CheckCircle2 className="size-5 text-sky-300 shrink-0 mt-0.5" />
                    <span className="text-fg-muted leading-relaxed">{b}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="lg:col-span-6">
              <div className="rounded-2xl glass p-6 sm:p-8 grid grid-cols-2 gap-3">
                {[
                  { v: "47%", k: "of cloud breaches start with IAM misconfig" },
                  { v: "≤24h", k: "from SSRF to AWS root via Pacu chain" },
                  { v: "0", k: "CVEs needed for typical cloud privesc" },
                  { v: "100%", k: "engagements include K8s + IaC review" },
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

      {/* CONTAINER + KUBERNETES */}
      <section id="containers" className="py-20 bg-bg-1">
        <Container>
          <div className="grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <Eyebrow color="purple">Container &amp; Kubernetes</Eyebrow>
              <h2 className="mt-3 font-display text-3xl font-black sm:text-4xl text-balance leading-[1.05]">
                Where one bad <span className="gradient-text">RoleBinding</span> ends the cluster.
              </h2>
              <p className="mt-5 text-fg-muted leading-relaxed text-pretty">
                Containerised workloads add an entirely new attack surface on top of the cloud
                provider: image registries, build pipelines, runtime escapes, K8s RBAC, service
                meshes. Every Macksofy cloud engagement tests it end-to-end — from the
                Dockerfile your developer pushed last Friday to the kube-apiserver token your
                CI runner mounted at <code className="font-mono text-xs text-amber-300">/var/run/secrets</code>.
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                {[
                  "EKS",
                  "AKS",
                  "GKE",
                  "OpenShift",
                  "Rancher",
                  "K3s",
                  "Docker Swarm",
                  "Istio / Linkerd",
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
                    icon: ContainerIcon,
                    title: "Image & supply chain",
                    accent: "text-sky-300 ring-sky-400/40 bg-sky-400/10",
                    points: [
                      "Vulnerable base images + abandoned layers",
                      "Hard-coded secrets / private keys in image history",
                      "Build-pipeline cache poisoning",
                      "Public registry mis-permissions",
                    ],
                  },
                  {
                    icon: Boxes,
                    title: "Runtime & escape",
                    accent: "text-amber-300 ring-amber-400/40 bg-amber-400/10",
                    points: [
                      "Privileged container + host-PID/IPC abuse",
                      "Capabilities + AppArmor / Seccomp bypass",
                      "DinD & socket-mount → host takeover",
                      "Sidecar-to-app trust-boundary violations",
                    ],
                  },
                  {
                    icon: ShieldCheck,
                    title: "Kubernetes RBAC",
                    accent: "text-violet-300 ring-violet-400/40 bg-violet-400/10",
                    points: [
                      "ServiceAccount over-permissioning",
                      "RoleBinding wildcards + namespace breakout",
                      "Kubelet anonymous-auth + exec endpoint",
                      "Webhook / admission-controller abuse",
                    ],
                  },
                  {
                    icon: Workflow,
                    title: "Cluster & data plane",
                    accent: "text-emerald-300 ring-emerald-400/40 bg-emerald-400/10",
                    points: [
                      "etcd reachability + secret leakage",
                      "API-server auth bypass + audit-log gaps",
                      "CNI misconfiguration → pod-to-pod lateral",
                      "Persistent-volume cross-tenant exposure",
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
                            <span className="text-neon-cyan/70 mt-1 shrink-0">▸</span>
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

      {/* METHODOLOGY */}
      <section id="methodology" className="py-20">
        <Container>
          <div className="max-w-3xl">
            <Eyebrow>Cloud-native methodology</Eyebrow>
            <h2 className="mt-3 font-display text-3xl font-black sm:text-4xl text-balance leading-[1.05]">
              How a Macksofy cloud assessment <span className="gradient-text">actually runs</span>.
            </h2>
            <p className="mt-4 text-fg-muted text-pretty leading-relaxed">
              Five stages, two-to-three weeks for a typical multi-cloud SaaS. We use the same
              tradecraft a real cloud-savvy attacker would use — never a check-the-box CIS scan
              read aloud.
            </p>
          </div>

          <ol className="relative mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-5">
            {[
              {
                num: "01",
                title: "Scope & envelope",
                desc: "Account inventory, in-scope services, IaC repos, read-only audit roles, RoE.",
                icon: Compass,
                accent: "text-sky-300 ring-sky-400/40 bg-sky-400/10",
                duration: "1–2 days",
              },
              {
                num: "02",
                title: "Enumerate & map",
                desc: "Provider-API enumeration, IAM graphing, K8s discovery, IaC drift analysis.",
                icon: Search,
                accent: "text-violet-300 ring-violet-400/40 bg-violet-400/10",
                duration: "2–3 days",
              },
              {
                num: "03",
                title: "Exploit & chain",
                desc: "IAM privesc paths, SSRF→credential→takeover chains, container escapes, K8s RBAC abuse.",
                icon: Bug,
                accent: "text-amber-300 ring-amber-400/40 bg-amber-400/10",
                duration: "4–6 days",
              },
              {
                num: "04",
                title: "Lateral & impact",
                desc: "Cross-account jumps, persistence, sensitive-data demonstration (no exfiltration).",
                icon: ShieldCheck,
                accent: "text-red-400 ring-red-400/40 bg-red-400/10",
                duration: "2–3 days",
              },
              {
                num: "05",
                title: "Report & retest",
                desc: "Board summary, dev-ready remediation, CIS / NIST / RBI / SEBI evidence, 30-day retest.",
                icon: FileText,
                accent: "text-emerald-300 ring-emerald-400/40 bg-emerald-400/10",
                duration: "3–4 days",
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
        </Container>
      </section>

      {/* WHY MACKSOFY */}
      <section className="py-20 bg-bg-1">
        <Container>
          <div className="max-w-3xl">
            <Eyebrow color="purple">Why Macksofy for cloud</Eyebrow>
            <h2 className="mt-3 font-display text-3xl font-black sm:text-4xl text-balance leading-[1.05]">
              Cloud is what we <span className="gradient-text">live in</span>, not a service line we added.
            </h2>
            <p className="mt-4 text-fg-muted text-pretty leading-relaxed">
              Indian regulators are catching up to cloud, attackers are already there, and most
              audit shops still treat AWS like a colocation cage. Here&rsquo;s what makes a
              Macksofy cloud engagement different.
            </p>
          </div>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                icon: Award,
                title: "CERT-In empanelled",
                accent: "text-neon-cyan ring-neon-cyan/40 bg-neon-cyan/10",
                desc: "Our cloud reports are accepted as audit evidence by Indian regulators — CERT-In, RBI, SEBI, IRDAI — without rework.",
              },
              {
                icon: Brain,
                title: "Operators, not scanners",
                accent: "text-violet-300 ring-violet-400/40 bg-violet-400/10",
                desc: "Engagements led by OSCP / OSWE / OSCE-certified testers who have actually compromised production cloud estates. No Nessus-reading interns.",
              },
              {
                icon: Building2,
                title: "Multi-cloud + multi-region",
                accent: "text-amber-300 ring-amber-400/40 bg-amber-400/10",
                desc: "AWS, Azure, GCP, OCI — and the India / UAE regional nuances (data-residency, RBI localisation, NESA / DESC) baked into every finding.",
              },
              {
                icon: Zap,
                title: "Retest within 30 days",
                accent: "text-emerald-300 ring-emerald-400/40 bg-emerald-400/10",
                desc: "Fix it, ship it, ping us. We re-test every High/Critical free of charge and issue a closure letter your auditor will accept.",
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
      <section className="py-20">
        <Container>
          <Eyebrow color="amber">Engagement snapshot</Eyebrow>
          <h2 className="mt-3 font-display text-3xl font-black sm:text-4xl text-balance leading-[1.05]">
            What we found in <span className="gradient-text">your provider&rsquo;s defaults</span>.
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
      <section className="py-20 bg-bg-1">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12 items-end">
            <div className="lg:col-span-5">
              <Eyebrow>Cloud-native tooling</Eyebrow>
              <h2 className="mt-3 font-display text-3xl font-black sm:text-4xl text-balance leading-[1.05]">
                Pacu. Prowler. <span className="gradient-text">Real attacker tooling</span>.
              </h2>
            </div>
            <div className="lg:col-span-7">
              <div className="rounded-2xl glass p-6">
                <ToolStack tools={service.toolStack.map((t) => ({ name: t }))} />
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="py-20">
        <Container>
          <div className="max-w-3xl">
            <Eyebrow>Compliance evidence</Eyebrow>
            <h2 className="mt-3 font-display text-3xl font-black sm:text-4xl text-balance leading-[1.05]">
              Cloud audit accepted by <span className="gradient-text">every framework</span>.
            </h2>
          </div>
          <div className="mt-12">
            <ComplianceMatrix />
          </div>
        </Container>
      </section>

      <TrustStrip />

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

      <LeadCapture />
    </>
  );
}
