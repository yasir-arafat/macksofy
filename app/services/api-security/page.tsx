import {
  Webhook,
  CheckCircle2,
  Server,
  KeyRound,
  Layers,
  Gauge,
  FileBadge,
  RotateCcw,
  type LucideIcon,
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/SectionTitle";
import { Badge } from "@/components/ui/Badge";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { LinkButton } from "@/components/ui/Button";
import { ParticleBackground } from "@/components/visuals/ParticleBackground";
import { GlowOrb } from "@/components/visuals/GlowOrb";
import { ToolStack } from "@/components/visuals/ToolStack";
import { RiskMeter } from "@/components/visuals/RiskMeter";
import { FAQAccordion } from "@/components/sections/FAQAccordion";
import { LeadCapture } from "@/components/home/LeadCapture";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema, faqSchema, serviceSchema } from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";
import { getServiceBySlug } from "@/content/services";
import { DownloadButton } from "@/components/DownloadButton";
import { TrustStrip } from "@/components/TrustStrip";
import { RequestInspector } from "@/components/visuals/web/RequestInspector";
import { OwaspApiMap } from "@/components/visuals/api/OwaspApiMap";
import { Methodology } from "@/components/visuals/methodology/Methodology";

const SLUG = "api-security";

export async function generateMetadata() {
  const s = getServiceBySlug(SLUG);
  if (!s) return {};
  return buildMetadata({
    title: s.seoTitle,
    description: s.seoDescription,
    path: `/services/${s.slug}`,
    keywords: s.keywords,
  });
}

export default function ApiSecPage() {
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
        ]}
      />

      {/* HERO */}
      <section className="relative isolate overflow-hidden">
        <ParticleBackground density={70} />
        <GlowOrb className="-top-40 left-1/3" color="purple" size={520} />
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
              <div className="grid size-14 place-items-center rounded-2xl bg-bg-2 ring-1 ring-neon-purple/30 text-neon-purple glow-cyan">
                <Webhook className="size-7" />
              </div>
              <h1 className="font-display text-4xl font-black sm:text-5xl lg:text-[3.4rem] text-balance leading-[1.05]">
                API Security Testing &mdash; <span className="gradient-text">REST, GraphQL, gRPC</span>.
              </h1>
            </div>
            <p className="mt-6 max-w-2xl text-lg text-fg-muted text-pretty leading-relaxed">
              {service.hero.description}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <LinkButton href="/contact?interest=API%20Security" size="lg" withArrow>
                Request a quote
              </LinkButton>
              <LinkButton href="#owasp-api" variant="outline" size="lg">
                See OWASP API coverage
              </LinkButton>
            </div>
            <div className="mt-6">
              <DownloadButton
                href="/sample-reports/pentest"
                label="Download sample API pentest report"
                sub="OWASP API Top 10 attestation"
              />
            </div>
          </div>
        </Container>
      </section>

      {/* PROTOCOL STRIP */}
      <section className="border-y border-line bg-bg-1/60">
        <Container className="py-6">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 items-center">
            <Proto icon={Webhook} label="REST / OpenAPI" sub="Postman · Swagger · OAS 3" />
            <Proto icon={Layers} label="GraphQL" sub="Apollo · Hasura · field-authz" />
            <Proto icon={Server} label="gRPC + Protobuf" sub="grpcurl · grpcui · reflection" />
            <Proto icon={KeyRound} label="Auth schemes" sub="OAuth · JWT · mTLS · HMAC" />
          </div>
        </Container>
      </section>

      {/* WHY API IS ITS OWN DISCIPLINE */}
      <section className="py-20 bg-bg-1">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12 items-center">
            <div className="lg:col-span-5">
              <Eyebrow color="amber">Why API testing is its own discipline</Eyebrow>
              <h2 className="mt-3 font-display text-3xl font-black sm:text-4xl text-balance leading-[1.05]">
                The breach is <span className="gradient-text">below the login form</span>.
              </h2>
              <p className="mt-5 text-fg-muted text-pretty leading-relaxed">
                Web tests look at what a browser does. API tests look at what
                every client (mobile app, SPA, partner integration, bot) does.
                That&rsquo;s a different attack surface and a different test
                method. BOLA across tenants. Mass-assignment that promotes a
                regular user to admin. JWT signing flaws. OAuth state
                omissions. GraphQL alias overloads. These bugs don&rsquo;t
                show up in a browser screenshot &mdash; they show up in the
                response body.
              </p>
              <ul className="mt-6 space-y-2 text-sm">
                {[
                  "BOLA / IDOR across multi-tenant flows",
                  "Mass-assignment via PATCH / PUT bodies",
                  "JWT alg=none, alg confusion, kid injection",
                  "GraphQL introspection abuse + depth attacks",
                  "Shadow APIs and abandoned v1/v2 endpoints",
                ].map((b) => (
                  <li key={b} className="flex gap-3">
                    <CheckCircle2 className="size-5 text-neon-purple shrink-0 mt-0.5" />
                    <span className="text-fg-muted leading-relaxed">{b}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="lg:col-span-7">
              <RequestInspector />
            </div>
          </div>
        </Container>
      </section>

      {/* METHODOLOGY */}
      <section id="methodology" className="py-20">
        <Container>
          <div className="grid gap-10 lg:grid-cols-12 items-end">
            <div className="lg:col-span-6">
              <Eyebrow>Testing methodology</Eyebrow>
              <h2 className="mt-3 font-display text-3xl font-black sm:text-4xl text-balance leading-[1.05]">
                Six phases. <span className="gradient-text">Spec to attestation.</span>
              </h2>
            </div>
            <div className="lg:col-span-6">
              <p className="text-fg-muted text-pretty leading-relaxed">
                Every Macksofy API engagement walks the OWASP API Security Top
                10 end-to-end &mdash; from API inventory and shadow-route hunt
                through to a per-endpoint attestation a regulator can read.
                Postman / OpenAPI regression suites ship with the report so
                your CI can re-run the test cases on every release.
              </p>
            </div>
          </div>
          <div className="mt-12">
            <Methodology
              slug={SLUG}
              phases={service.methodology}
              subjectLabel="API pentest"
            />
          </div>
        </Container>
      </section>

      {/* OWASP API TOP 10 */}
      <section id="owasp-api" className="py-20 bg-bg-1">
        <Container>
          <div className="max-w-3xl">
            <Eyebrow color="purple">OWASP API Security Top 10 &middot; 2023</Eyebrow>
            <h2 className="mt-3 font-display text-3xl font-black sm:text-4xl text-balance leading-[1.05]">
              Tap a category. See <span className="gradient-text">manual vs scanner</span> coverage.
            </h2>
            <p className="mt-4 text-fg-muted text-pretty">
              Side-by-side coverage delta per OWASP API category. The gap
              between the two bars is the work that justifies hiring a
              consultant instead of buying a subscription.
            </p>
          </div>
          <div className="mt-12">
            <OwaspApiMap />
          </div>
        </Container>
      </section>

      {/* CASE STUDIES */}
      <section className="py-20">
        <Container>
          <Eyebrow color="amber">Case studies</Eyebrow>
          <h2 className="mt-3 font-display text-3xl font-black sm:text-4xl text-balance leading-[1.05]">
            What we found in <span className="gradient-text">production</span> APIs.
          </h2>
          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {service.caseStudies.map((cs, i) => (
              <div key={i} className="rounded-2xl glass p-6 flex flex-col lift">
                <Badge variant="purple" className="self-start">{cs.industry}</Badge>
                <p className="mt-3 text-sm font-semibold text-fg">{cs.scope}</p>
                <p className="mt-3 text-sm text-fg-muted leading-relaxed flex-1">
                  <span className="text-neon-purple font-semibold">Finding &middot; </span>{cs.finding}
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
      <section id="why-macksofy" className="py-20 bg-bg-1">
        <Container>
          <div className="max-w-3xl">
            <Eyebrow color="purple">Why Macksofy for API security</Eyebrow>
            <h2 className="mt-3 font-display text-3xl font-black sm:text-4xl text-balance leading-[1.05]">
              The API pentest your <span className="gradient-text">scanner can&rsquo;t run</span>.
            </h2>
            <p className="mt-4 text-fg-muted text-pretty leading-relaxed">
              Generic API scanners run a corpus of known payloads against the
              endpoints they can see. The findings that actually unblock a
              launch or close a regulator finding come from a human who
              reasoned about your authorisation model, your tenant boundaries,
              and the field-level permissions your scanner can&rsquo;t infer.
            </p>
          </div>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            <WhyCard
              icon={Server}
              title="Every protocol, in scope."
              body="REST + OpenAPI, GraphQL (Apollo / Hasura / federated), gRPC + Protobuf, server-sent events and websockets. We test what your app actually uses, not what the scanner happens to support."
            />
            <WhyCard
              icon={KeyRound}
              title="Auth scheme expertise."
              body="OAuth 2 / OIDC, JWT signing flaws, mTLS, HMAC, API keys, session cookies, AWS SigV4 — the auth posture gets a dedicated phase, not a single check-box. Our OSWE-trained team has shipped CVEs against well-known auth libraries."
            />
            <WhyCard
              icon={Layers}
              title="Property-level authz."
              body="Mass-assignment via PATCH/PUT, GraphQL field-level authz, partial-update body abuse — we&rsquo;re the team that finds the field your back-end forgot to filter."
            />
            <WhyCard
              icon={Gauge}
              title="Rate, quota and flow abuse."
              body="Rate-limit bypass, GraphQL depth and complexity attacks, batched-mutation abuse, business-flow exhaustion (signup, OTP, password reset, voucher stacking) — the bugs that hurt revenue, not just confidentiality."
            />
            <WhyCard
              icon={FileBadge}
              title="OWASP API Top 10 attestation."
              body="Per-category attestation against the 2023 OWASP API Top 10, plus a Postman / OpenAPI regression collection so your CI can re-validate findings on every release."
            />
            <WhyCard
              icon={RotateCcw}
              title="Free retest in 30 days."
              body="One free verification cycle within 30 days of dev sign-off. We rerun the affected phases, validate fixes via the Postman collection, and reissue the attestation."
            />
          </div>

          <div className="mt-12 flex flex-wrap items-center gap-3 rounded-2xl ring-1 ring-line/60 bg-bg/60 p-5">
            <CheckCircle2 className="size-5 text-neon-purple shrink-0" />
            <p className="text-sm text-fg-muted leading-relaxed flex-1 min-w-[280px]">
              Mutual NDA is step zero of every engagement. Specs, traffic
              captures and findings live on Macksofy infrastructure for the
              engagement window plus 90 days, then are securely destroyed
              against a CERT-In-acceptable retention policy.
            </p>
            <LinkButton href="/contact?interest=API%20Security" size="md" withArrow>
              Talk to an API lead
            </LinkButton>
          </div>
        </Container>
      </section>

      {/* TOOL STACK */}
      <section className="py-20">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12 items-end">
            <div className="lg:col-span-5">
              <Eyebrow>Toolchain</Eyebrow>
              <h2 className="mt-3 font-display text-3xl font-black sm:text-4xl text-balance leading-[1.05]">
                Burp + Postman + <span className="gradient-text">custom Burp extensions</span>.
              </h2>
              <p className="mt-5 text-fg-muted">
                We ship Burp extensions for GraphQL recon, JWT abuse, BOLA
                scanning and gRPC introspection that aren&rsquo;t on the BApp
                store &mdash; built from years of running this engagement
                against multi-tenant fintech and SaaS targets.
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

      <TrustStrip />

      <section className="py-20 bg-bg-1">
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

      <LeadCapture />
    </>
  );
}

function Proto({
  icon: Icon,
  label,
  sub,
}: {
  icon: LucideIcon;
  label: string;
  sub: string;
}) {
  return (
    <div className="flex items-center gap-3">
      <div className="grid size-10 place-items-center rounded-xl bg-bg-2 ring-1 ring-line text-neon-purple">
        <Icon className="size-5" />
      </div>
      <div className="min-w-0">
        <p className="text-sm font-bold text-fg leading-tight">{label}</p>
        <p className="text-xs text-fg-muted leading-tight truncate">{sub}</p>
      </div>
    </div>
  );
}

function WhyCard({
  icon: Icon,
  title,
  body,
}: {
  icon: LucideIcon;
  title: string;
  body: string;
}) {
  return (
    <div className="rounded-2xl glass p-6 lift h-full flex flex-col">
      <div className="grid size-11 place-items-center rounded-xl bg-bg-2 ring-1 ring-neon-purple/30 text-neon-purple glow-cyan">
        <Icon className="size-5" />
      </div>
      <h3 className="mt-5 font-display text-lg font-black text-fg leading-tight">
        {title}
      </h3>
      <p className="mt-3 text-sm text-fg-muted leading-relaxed flex-1">{body}</p>
    </div>
  );
}
