import { Code2, CheckCircle2 } from "lucide-react";
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
import { OwaspMap } from "@/components/visuals/web/OwaspMap";
import { RequestInspector } from "@/components/visuals/web/RequestInspector";

const SLUG = "web-application-security";

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

export default function WebSecPage() {
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
            <Eyebrow>OWASP Top 10 + API Top 10</Eyebrow>
            <h2 className="mt-3 font-display text-3xl font-black sm:text-4xl text-balance leading-[1.05]">
              Tap a category. See <span className="gradient-text">manual vs scanner</span> coverage.
            </h2>
            <p className="mt-4 text-fg-muted text-pretty">
              Side-by-side coverage delta for each OWASP category — proof that human
              consultants find what tooling misses (and where automation is genuinely fine).
            </p>
          </div>
          <div className="mt-12">
            <OwaspMap />
          </div>
        </Container>
      </section>

      {/* CASE STUDIES */}
      <section className="py-20 bg-bg-1">
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
                  <span className="text-neon-cyan font-semibold">Finding · </span>{cs.finding}
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
              <Eyebrow>Toolchain</Eyebrow>
              <h2 className="mt-3 font-display text-3xl font-black sm:text-4xl text-balance leading-[1.05]">
                Burp + custom <span className="gradient-text">extensions</span>.
              </h2>
              <p className="mt-5 text-fg-muted">
                We ship in-house Burp extensions for GraphQL recon, JWT abuse and BOLA scanning
                that aren&rsquo;t on the BApp store.
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
