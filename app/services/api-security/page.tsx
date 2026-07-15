import {
  Webhook,
  CheckCircle2,
  Server,
  KeyRound,
  Layers,
  ScanSearch,
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
import { WhereWeDeliver } from "@/components/sections/WhereWeDeliver";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema, faqSchema, serviceSchema, methodologyHowToSchema } from "@/lib/schema";
import { SITE } from "@/lib/site";
import { buildMetadata } from "@/lib/seo";
import { getServiceBySlug } from "@/content/services";
import { DownloadButton } from "@/components/DownloadButton";
import { TrustStrip } from "@/components/TrustStrip";
import { RequestInspector } from "@/components/visuals/web/RequestInspector";
import { OwaspApiMap } from "@/components/visuals/api/OwaspApiMap";
import { Methodology } from "@/components/visuals/methodology/Methodology";
import { AnswerBox } from "@/components/sections/AnswerBox";
import { getShortAnswer } from "@/content/shortAnswers";
import { GlossaryLinks } from "@/components/sections/GlossaryLinks";
import { References } from "@/components/sections/References";

const SLUG = "api-security";

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

export default function ApiSecPage() {
  const service = getServiceBySlug(SLUG)!;
  const sa = getShortAnswer("service:api-security");

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

      {sa && (
        <section className="py-8">
          <Container>
            <AnswerBox q={sa.q} a={sa.a} />
          </Container>
        </section>
      )}

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
                A Macksofy API engagement walks the OWASP API Security Top 10
                from first request to regulator-ready attestation. Each phase
                puts BOLA, BFLA, mass-assignment, JWT abuse and resource-
                consumption tradecraft against your endpoints &mdash; with a
                consultant typing the exploit, not a tool clicking through a
                YAML config. Findings cross-reference across phases (a shadow
                endpoint surfaced in Phase 2 becomes a mass-assignment vector
                in Phase 4, which unlocks a role-elevation chain in Phase 3)
                so the deliverable reads like an attacker&rsquo;s logbook,
                not a scanner export. Every report ships with a Postman /
                OpenAPI regression suite your CI can re-execute on the next
                release.
              </p>
              <div className="mt-5 flex flex-wrap items-center gap-2 text-[11px] font-mono uppercase tracking-[0.18em] text-fg-faint">
                <span className="rounded-full ring-1 ring-line/60 bg-bg/40 px-2.5 py-1">
                  OWASP API Top 10 &middot; 2023
                </span>
                <span className="rounded-full ring-1 ring-line/60 bg-bg/40 px-2.5 py-1">
                  Postman regression suite
                </span>
                <span className="rounded-full ring-1 ring-line/60 bg-bg/40 px-2.5 py-1">
                  CERT-In format
                </span>
                <span className="rounded-full ring-1 ring-line/60 bg-bg/40 px-2.5 py-1">
                  RBI &middot; SEBI &middot; DPDP mapping
                </span>
              </div>
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
              routes they can already see. The findings that actually close a
              regulator audit &mdash; BOLA across tenants, mass-assignment
              that elevates a regular user to admin, JWT alg=none accepted in
              production &mdash; come from a human who reasoned about your
              authorisation model, not from a tool that pattern-matched your
              response bodies.
            </p>
          </div>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            <WhyCard
              icon={KeyRound}
              title="We break the auth model first."
              body="JWT alg confusion, kid injection, OAuth state omissions, mTLS misuse, HMAC replay — every auth scheme on your stack gets its own phase, not a check-box. Our OSWE-trained team has shipped CVEs against well-known auth libraries. If the auth holds, the rest of the engagement gets cheaper."
            />
            <WhyCard
              icon={ScanSearch}
              title="We hunt the APIs you forgot you shipped."
              body="Old v1, v2 and beta routes still answering traffic. Admin paths discoverable from a JS bundle. Partner-only endpoints reachable from the internet. Shadow-API discovery is its own phase, with kiterunner, ffuf and live traffic-capture run in parallel."
            />
            <WhyCard
              icon={Server}
              title="REST, GraphQL, gRPC — all three."
              body="REST + OpenAPI, GraphQL (Apollo, Hasura, federated), gRPC + Protobuf with reflection, server-sent events, websockets. We test the protocols your app actually emits, not the subset the scanner happens to support."
            />
            <WhyCard
              icon={Layers}
              title="We attack the property, not just the endpoint."
              body="Mass-assignment via PATCH and PUT bodies. GraphQL field-level authz across roles. Partial-update body abuse. We find the property your back-end forgot to filter, then prove the role-elevation chain it unlocks."
            />
            <WhyCard
              icon={FileBadge}
              title="OWASP API Top 10 attestation, on paper."
              body="Explicit per-category attestation against the 2023 OWASP API Security Top 10, plus a Postman / OpenAPI regression collection your CI can re-execute on every release. Your auditor reads &ldquo;L1 verified&rdquo;, not &ldquo;OWASP-aligned&rdquo;."
            />
            <WhyCard
              icon={RotateCcw}
              title="Free retest. Closed, not pending."
              body="One free verification cycle within 30 days of developer sign-off. We rerun the affected phases on the patched build, re-execute the Postman regression, and reissue the attestation &mdash; so the auditor sees &lsquo;closed&rsquo;, never &lsquo;remediation pending&rsquo;."
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

      <WhereWeDeliver
        subject={service.shortTitle}
        subjectShort={service.shortTitle}
        serviceSlug={service.slug}
      />

      <References pageKey="service:api-security" />
      <GlossaryLinks href="/services/api-security" />
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
