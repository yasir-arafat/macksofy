import {
  Code2,
  CheckCircle2,
  Activity,
  GitMerge,
  KeyRound,
  FileSearch,
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
import { DeliverablesIndustries } from "@/components/services/DeliverablesIndustries";
import { OwaspMap } from "@/components/visuals/web/OwaspMap";
import { RequestInspector } from "@/components/visuals/web/RequestInspector";
import { AnswerBox } from "@/components/sections/AnswerBox";
import { getShortAnswer } from "@/content/shortAnswers";
import { GlossaryLinks } from "@/components/sections/GlossaryLinks";
import { References } from "@/components/sections/References";

const SLUG = "web-application-security";

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

export default function WebSecPage() {
  const service = getServiceBySlug(SLUG)!;
  const sa = getShortAnswer("service:web-application-security");

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
        <GlowOrb className="-top-40 left-1/3" color="cyan" size={520} />
        <Container className="relative pt-10 pb-20">
          <Breadcrumbs
            items={[
              { name: "Services", href: "/services" },
              { name: service.shortTitle, href: `/services/${service.slug}` },
            ]}
          />
          <div className="mt-12 max-w-4xl">
            <Eyebrow>{service.hero.eyebrow}</Eyebrow>
            <div className="mt-5 flex items-center gap-4">
              <div className="grid size-14 place-items-center rounded-2xl bg-bg-2 ring-1 ring-neon-cyan/30 text-neon-cyan glow-cyan">
                <Code2 className="size-7" />
              </div>
              <h1 className="font-display text-4xl font-black sm:text-5xl lg:text-[3.4rem] text-balance leading-[1.05]">
                Web Application Security Testing &mdash; <span className="gradient-text">India &amp; UAE</span>.
              </h1>
            </div>
            <p className="mt-6 max-w-2xl text-lg text-fg-muted text-pretty leading-relaxed">
              {service.hero.description}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <LinkButton href="/contact?interest=Web%20App%20Security" size="lg" withArrow>
                Request a quote
              </LinkButton>
              <LinkButton href="#owasp" variant="outline" size="lg">
                See OWASP coverage
              </LinkButton>
              <LinkButton href="/services/api-security" variant="outline" size="lg">
                Need API security? →
              </LinkButton>
            </div>
            <div className="mt-6">
              <DownloadButton
                href="/sample-reports/pentest"
                label="Download sample web pentest report"
                sub="OWASP Web Top 10 attestation"
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

      {/* REQUEST INSPECTOR — browser-side framing */}
      <section className="py-20 bg-bg-1">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12 items-center">
            <div className="lg:col-span-5">
              <Eyebrow color="amber">Live request &middot; under-the-hood</Eyebrow>
              <h2 className="mt-3 font-display text-3xl font-black sm:text-4xl text-balance leading-[1.05]">
                Every form, every fetch &mdash; <span className="gradient-text">we read it</span>.
              </h2>
              <p className="mt-5 text-fg-muted text-pretty leading-relaxed">
                A modern web app is half browser, half network. The bugs that
                matter live in the requests your front-end sends &mdash;
                stored XSS that hides behind a sanitiser, OAuth state-param
                omissions, CSRF on the action that mutates user balance,
                SSRF in the avatar-upload URL. We watch every request the app
                sends and exploit the ones with weak server-side checks
                behind them.
              </p>
              <ul className="mt-6 space-y-2 text-sm">
                {[
                  "Stored / reflected / DOM-based XSS",
                  "CSRF and SameSite cookie bypass",
                  "Open redirect → OAuth account takeover chains",
                  "SSRF via avatar / preview / fetch endpoints",
                  "Race conditions and atomicity bugs",
                ].map((b) => (
                  <li key={b} className="flex gap-3">
                    <CheckCircle2 className="size-5 text-neon-cyan shrink-0 mt-0.5" />
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

      {/* OWASP TOP 10 MAP */}
      <section id="owasp" className="py-20">
        <Container>
          <div className="max-w-3xl">
            <Eyebrow>OWASP Web Top 10 &middot; 2021</Eyebrow>
            <h2 className="mt-3 font-display text-3xl font-black sm:text-4xl text-balance leading-[1.05]">
              Tap a category. See <span className="gradient-text">manual vs scanner</span> coverage.
            </h2>
            <p className="mt-4 text-fg-muted text-pretty">
              Side-by-side coverage delta per OWASP category &mdash; proof that
              human consultants find what tooling misses (and where automation
              is genuinely fine).
            </p>
          </div>
          <div className="mt-12">
            <OwaspMap />
          </div>
        </Container>
      </section>

      {/* CASE STUDIES */}
      <section className="py-20">
        <Container>
          <Eyebrow color="amber">Case studies</Eyebrow>
          <h2 className="mt-3 font-display text-3xl font-black sm:text-4xl text-balance leading-[1.05]">
            What we found in <span className="gradient-text">production</span>.
          </h2>
          <div className="mt-12 grid gap-6 lg:grid-cols-2">
            {service.caseStudies.map((cs, i) => (
              <div key={i} className="rounded-2xl glass p-6 flex flex-col lift">
                <Badge variant="cyan" className="self-start">{cs.industry}</Badge>
                <p className="mt-3 text-sm font-semibold text-fg">{cs.scope}</p>
                <p className="mt-3 text-sm text-fg-muted leading-relaxed flex-1">
                  <span className="text-neon-cyan font-semibold">Finding &middot; </span>{cs.finding}
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
            <Eyebrow color="purple">Why Macksofy for web app security</Eyebrow>
            <h2 className="mt-3 font-display text-3xl font-black sm:text-4xl text-balance leading-[1.05]">
              The web pentest your <span className="gradient-text">scanner can&rsquo;t run</span>.
            </h2>
            <p className="mt-4 text-fg-muted text-pretty leading-relaxed">
              Most &ldquo;web application pentest&rdquo; deliverables in the
              Indian and UAE market are a Burp Pro scan with a PDF cover. The
              findings that actually close a regulator audit or unblock an
              enterprise sales cycle &mdash; stored XSS that defeats the
              sanitiser, OAuth state omissions that swap the redirect to
              attacker.com, SAML signature stripping that turns any user into
              admin &mdash; come from a human who reads requests, not from a
              tool that just sends them.
            </p>
          </div>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            <WhyCard
              icon={Activity}
              title="We test the request, not the screenshot."
              body="Modern web bugs live in the request/response cycle &mdash; Authorization headers, CSRF tokens, Set-Cookie attributes, redirect chains. Burp + Caido sits in front of every action; the consultant watches every fetch, every form post, every SPA navigation and exploits the ones the back-end didn&rsquo;t properly check."
            />
            <WhyCard
              icon={GitMerge}
              title="We chain the boring bugs into critical ones."
              body="Real breaches come from chains, not single findings. Self-XSS + CSRF becomes stored XSS. Open redirect + OAuth state omission becomes 1-click account takeover. A dedicated phase builds the chain that turns three &lsquo;low&rsquo; findings into the High your CVE log would actually record."
            />
            <WhyCard
              icon={KeyRound}
              title="SSO, SAML, OAuth — always in scope."
              body="SAML signature stripping and XSW, OAuth state + PKCE omission, JWT misuse on the client, redirect_uri confusion &mdash; SSO bugs are the highest-impact web findings of the last decade. We treat the SSO stack as its own engagement track with tooling and tradecraft to match."
            />
            <WhyCard
              icon={FileSearch}
              title="We read your JS bundle."
              body="Modern SPAs ship half their attack surface in their JS bundles. We extract every route, every internal endpoint, every dev feature flag and every comment that ends &lsquo;TODO remove before prod&rsquo; &mdash; then test the ones the back-end forgot to gate."
            />
            <WhyCard
              icon={FileBadge}
              title="OWASP Web Top 10 attestation, on paper."
              body="Explicit per-category attestation against the 2021 OWASP Web Top 10, plus a separate CSP / SRI / HSTS / cookie / CORS hardening checklist your developers can work through. Your auditor reads &ldquo;A01-A10 verified&rdquo;, not &ldquo;OWASP-aligned&rdquo;."
            />
            <WhyCard
              icon={RotateCcw}
              title="Free retest. Closed, not pending."
              body="One free verification cycle within 30 days of developer sign-off. We rerun the affected phases on the patched build, re-execute the exploit chain end-to-end, and reissue the attestation &mdash; so the auditor sees &lsquo;closed&rsquo;, never &lsquo;remediation pending&rsquo;."
            />
          </div>

          <div className="mt-12 flex flex-wrap items-center gap-3 rounded-2xl ring-1 ring-line/60 bg-bg/60 p-5">
            <CheckCircle2 className="size-5 text-neon-cyan shrink-0" />
            <p className="text-sm text-fg-muted leading-relaxed flex-1 min-w-[280px]">
              Mutual NDA is step zero of every engagement. Source, traffic
              captures and findings live on Macksofy infrastructure for the
              engagement window plus 90 days, then are securely destroyed
              against a CERT-In-acceptable retention policy.
            </p>
            <LinkButton href="/contact?interest=Web%20App%20Security" size="md" withArrow>
              Talk to a web lead
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
                Burp + custom <span className="gradient-text">extensions</span>.
              </h2>
              <p className="mt-5 text-fg-muted">
                We ship in-house Burp extensions for DOMPurify-bypass probing,
                CSP-bypass payload generation, SAML XSW assembly and CSRF-token
                replay &mdash; tools that aren&rsquo;t on the BApp store, built
                from years of running this engagement against Indian fintech
                and UAE SaaS targets.
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
        heading="What lands in your inbox"
        tone="raised"
      />

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

      <References pageKey="service:web-application-security" />
      <GlossaryLinks href="/services/web-application-security" />
      <LeadCapture />
    </>
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
      <div className="grid size-11 place-items-center rounded-xl bg-bg-2 ring-1 ring-neon-cyan/30 text-neon-cyan glow-cyan">
        <Icon className="size-5" />
      </div>
      <h3 className="mt-5 font-display text-lg font-black text-fg leading-tight">
        {title}
      </h3>
      <p className="mt-3 text-sm text-fg-muted leading-relaxed flex-1">{body}</p>
    </div>
  );
}
