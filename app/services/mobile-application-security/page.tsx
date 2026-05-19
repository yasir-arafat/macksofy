import {
  Smartphone,
  CheckCircle2,
  Apple,
  Bot,
  ShieldCheck,
  Server,
  FileBadge,
  Landmark,
  Code2,
  KeyRound,
  RotateCcw,
  FileSearch,
  Activity,
  Wrench,
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
import { breadcrumbSchema, faqSchema, serviceSchema, methodologyHowToSchema } from "@/lib/schema";
import { SITE } from "@/lib/site";
import { buildMetadata } from "@/lib/seo";
import { getServiceBySlug } from "@/content/services";
import { DownloadButton } from "@/components/DownloadButton";
import { TrustStrip } from "@/components/TrustStrip";
import { MobileTopTen } from "@/components/visuals/mobile/MobileTopTen";
import { Methodology } from "@/components/visuals/methodology/Methodology";

const SLUG = "mobile-application-security";

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

export default function MobileSecPage() {
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
                <Smartphone className="size-7" />
              </div>
              <h1 className="font-display text-4xl font-black sm:text-5xl lg:text-[3.4rem] text-balance leading-[1.05]">
                Mobile App Penetration Testing &mdash; <span className="gradient-text">Android &amp; iOS</span>.
              </h1>
            </div>
            <p className="mt-6 max-w-2xl text-lg text-fg-muted text-pretty leading-relaxed">
              {service.hero.description}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <LinkButton href="/contact?interest=Mobile%20App%20Security" size="lg" withArrow>
                Request a quote
              </LinkButton>
              <LinkButton href="#owasp-mobile" variant="outline" size="lg">
                See OWASP Mobile coverage
              </LinkButton>
            </div>
            <div className="mt-6">
              <DownloadButton
                href="/sample-reports/pentest"
                label="Download sample mobile pentest report"
                sub="OWASP MASVS-aligned attestation"
              />
            </div>
          </div>
        </Container>
      </section>

      {/* PLATFORM STRIP */}
      <section className="border-y border-line bg-bg-1/60">
        <Container className="py-6">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 items-center">
            <Platform icon={Bot} label="Android" sub="APK · AAB · Smali / DEX" />
            <Platform icon={Apple} label="iOS" sub="IPA · Mach-O · Objective-C / Swift" />
            <Platform icon={Smartphone} label="Hybrid" sub="React Native · Flutter · Cordova · Ionic" />
            <Platform icon={Smartphone} label="Backend" sub="Mobile-facing REST / GraphQL APIs" />
          </div>
        </Container>
      </section>

      {/* WHY MOBILE IS DIFFERENT */}
      <section className="py-20 bg-bg-1">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12 items-center">
            <div className="lg:col-span-5">
              <Eyebrow color="amber">Why mobile is its own discipline</Eyebrow>
              <h2 className="mt-3 font-display text-3xl font-black sm:text-4xl text-balance leading-[1.05]">
                The binary <span className="gradient-text">ships with the attack surface</span>.
              </h2>
              <p className="mt-5 text-fg-muted text-pretty leading-relaxed">
                Unlike a web app, a mobile binary lives on a device you don&rsquo;t
                control. Every API key, every business rule, every fallback flow
                in the source code is one&nbsp;<code className="font-mono text-neon-cyan">jadx -d</code>&nbsp;
                away from being read by anyone with the APK. SSL pinning, root
                detection, RASP &mdash; all defence in depth, all bypassable on a
                rooted Magisk device with a tame Frida script.
              </p>
              <p className="mt-4 text-fg-muted text-pretty leading-relaxed">
                A real mobile pentest treats the binary as already-decompiled and
                the device as already-rooted &mdash; then sees what an attacker can
                still do. That&rsquo;s the threat model. Anything less is a
                scanner with a logo.
              </p>
              <ul className="mt-6 space-y-2 text-sm">
                {[
                  "Hard-coded secrets in resources / Info.plist",
                  "SSL pinning + cert-validation bypass",
                  "Root / jailbreak detection that holds (or doesn't)",
                  "Insecure storage on rooted SQLite / KeyChain",
                  "Backend BOLA / IDOR called only from the mobile client",
                ].map((b) => (
                  <li key={b} className="flex gap-3">
                    <CheckCircle2 className="size-5 text-neon-cyan shrink-0 mt-0.5" />
                    <span className="text-fg-muted leading-relaxed">{b}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="lg:col-span-7">
              <div className="rounded-2xl ring-1 ring-line bg-bg/80 overflow-hidden font-mono text-[12px] leading-relaxed">
                <div className="flex items-center justify-between px-4 py-2 border-b border-line bg-bg-1/80">
                  <span className="text-[10px] uppercase tracking-[0.2em] text-neon-cyan">frida · runtime hook</span>
                  <span className="text-[10px] uppercase tracking-wider text-fg-faint">device: rooted pixel 7</span>
                </div>
                <div className="p-4 space-y-1">
                  <div className="text-fg-muted">
                    $ frida -U -f com.example.banking -l rootbypass.js
                  </div>
                  <div className="text-fg-faint">[*] attaching to com.example.banking …</div>
                  <div className="text-emerald-300">[+] hooked RootBeer.isRooted() &rarr; returns false</div>
                  <div className="text-emerald-300">[+] hooked SafetyNet.attest() &rarr; returns valid token</div>
                  <div className="text-emerald-300">[+] hooked SSLContext.init() &rarr; trust-all on attacker CA</div>
                  <div className="text-amber-300">[!] app runs on rooted device, talks to api.bank.example over MITM</div>
                  <div className="text-red-300">[x] /api/v3/wallet/transfer accepts JWT with iat &gt; exp + 30d</div>
                  <div className="text-fg-muted">└─ severity: critical · CWE-613 · OWASP Mobile M3</div>
                </div>
                <div className="px-4 py-2 border-t border-line bg-red-500/10 text-[10px] text-red-300 flex items-center gap-2">
                  <span className="size-1.5 rounded-full bg-red-400 animate-pulse" />
                  every defence layer bypassed in a 12-line Frida script
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* OWASP MOBILE TOP 10 MAP */}
      <section id="owasp-mobile" className="py-20">
        <Container>
          <div className="max-w-3xl">
            <Eyebrow>OWASP Mobile Top 10 &middot; 2024</Eyebrow>
            <h2 className="mt-3 font-display text-3xl font-black sm:text-4xl text-balance leading-[1.05]">
              Tap a category. See <span className="gradient-text">Android vs iOS</span> impact.
            </h2>
            <p className="mt-4 text-fg-muted text-pretty">
              The 2024 refresh of OWASP&rsquo;s mobile top 10 mapped to per-platform
              prevalence from Macksofy&rsquo;s 2025 engagement telemetry. Tap any
              card to see what we actually find on the apps we test.
            </p>
          </div>
          <div className="mt-12">
            <MobileTopTen />
          </div>
        </Container>
      </section>

      {/* SECURITY TESTING APPROACHES */}
      <section id="approaches" className="py-20">
        <Container>
          <div className="max-w-3xl">
            <Eyebrow color="amber">Security testing approaches</Eyebrow>
            <h2 className="mt-3 font-display text-3xl font-black sm:text-4xl text-balance leading-[1.05]">
              Three approaches. <span className="gradient-text">One engagement.</span>
            </h2>
            <p className="mt-4 text-fg-muted text-pretty leading-relaxed">
              A Macksofy mobile pentest blends three industry-standard approaches
              across every engagement &mdash; because no single one catches
              everything. SAST reads the code without running it. DAST watches
              what happens when it runs. MAST is the human work in between.
              You get all three; the scanner shops give you one and call it a
              pentest.
            </p>
          </div>

          <div className="mt-12 grid gap-5 lg:grid-cols-3">
            <ApproachCard
              icon={FileSearch}
              code="SAST"
              title="Static Application Security Testing"
              what="Read the binary without running it. Every APK gets jadx + apktool, every IPA gets class-dump plus Hopper or Ghidra. We walk the source-equivalent code, smali listings and Mach-O strings by hand."
              catches={[
                "Hard-coded API keys, AWS / GCP secrets in resources.arsc + Info.plist",
                "Insecure cryptographic primitives + custom-rolled crypto",
                "Debug endpoints and feature flags shipped to production",
                "Vulnerable third-party SDKs + transitive native-lib CVEs",
              ]}
              phaseLabel="Phase 2 of the methodology"
            />
            <ApproachCard
              icon={Activity}
              code="DAST"
              title="Dynamic Application Security Testing"
              what="Watch the app while it runs. A rooted Android + jailbroken iOS fleet, Frida + Objection instrumentation, Burp Suite interception under cert-pinning bypass, plus live inspection of every on-device data store."
              catches={[
                "TLS pinning gaps + cleartext fallbacks under hostile networks",
                "Insecure data at rest in KeyChain, SharedPreferences, SQLite",
                "Runtime authorisation flaws visible only against a live backend",
                "Background-snapshot + logcat PII leakage during normal use",
              ]}
              phaseLabel="Phase 3 of the methodology"
            />
            <ApproachCard
              icon={Wrench}
              code="MAST"
              title="Manual Application Security Testing"
              what="The human-driven testing scanners can&rsquo;t model. Bypass RASP. Tamper with the binary. Chain low-severity findings into business-impacting compromises. This is the work that justifies hiring people instead of subscriptions."
              catches={[
                "Multi-step business-logic abuse + payment / KYC bypass chains",
                "Root + SafetyNet + anti-Frida + anti-debug bypass paths",
                "Account takeover via chained low-severity findings",
                "Tampered + repackaged builds that pass integrity checks",
              ]}
              phaseLabel="Phase 4 of the methodology"
            />
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-3 rounded-2xl ring-1 ring-line/60 bg-bg-1/50 p-5">
            <ShieldCheck className="size-5 text-neon-cyan shrink-0" />
            <p className="text-sm text-fg-muted leading-relaxed flex-1 min-w-[280px]">
              We don&rsquo;t pick one. Every Macksofy mobile engagement applies
              SAST, DAST and MAST in sequence &mdash; chained across the six
              methodology phases below &mdash; so the findings from one approach
              feed the next.
            </p>
            <LinkButton href="#methodology" variant="outline" size="md">
              See the methodology
            </LinkButton>
          </div>
        </Container>
      </section>

      {/* TESTING METHODOLOGY */}
      <section id="methodology" className="py-20 bg-bg-1">
        <Container>
          <div className="grid gap-10 lg:grid-cols-12 items-end">
            <div className="lg:col-span-6">
              <Eyebrow>Testing methodology</Eyebrow>
              <h2 className="mt-3 font-display text-3xl font-black sm:text-4xl text-balance leading-[1.05]">
                Six phases. <span className="gradient-text">APK to attestation.</span>
              </h2>
            </div>
            <div className="lg:col-span-6">
              <p className="text-fg-muted text-pretty leading-relaxed">
                A Macksofy engagement walks the OWASP MASVS + MSTG testing guide
                from the moment we acquire your build to the moment we hand
                back a regulator-ready attestation. Each phase applies SAST,
                DAST or MAST &mdash; usually two of the three &mdash; with a
                consultant typing the exploit, not a tool clicking through a
                YAML config. Findings cross-reference across phases so the
                deliverable reads like an attacker&rsquo;s logbook, not a
                scanner export.
              </p>
              <div className="mt-5 flex flex-wrap items-center gap-2 text-[11px] font-mono uppercase tracking-[0.18em] text-fg-faint">
                <span className="rounded-full ring-1 ring-line/60 bg-bg/40 px-2.5 py-1">
                  OWASP MASVS
                </span>
                <span className="rounded-full ring-1 ring-line/60 bg-bg/40 px-2.5 py-1">
                  MSTG-aligned
                </span>
                <span className="rounded-full ring-1 ring-line/60 bg-bg/40 px-2.5 py-1">
                  CERT-In format
                </span>
                <span className="rounded-full ring-1 ring-line/60 bg-bg/40 px-2.5 py-1">
                  RBI &middot; UIDAI &middot; DESC mapping
                </span>
              </div>
            </div>
          </div>
          <div className="mt-12">
            <Methodology
              slug={SLUG}
              phases={service.methodology}
              subjectLabel="Mobile pentest"
              phaseImages={[
                "/methodology/mobile/scoping-and-threat-model.webp",
              ]}
            />
          </div>
        </Container>
      </section>

      {/* CASE STUDIES */}
      <section className="py-20 bg-bg-1">
        <Container>
          <Eyebrow color="amber">Case studies</Eyebrow>
          <h2 className="mt-3 font-display text-3xl font-black sm:text-4xl text-balance leading-[1.05]">
            What we found in <span className="gradient-text">production</span> apps.
          </h2>
          <div className="mt-12 grid gap-6 lg:grid-cols-3">
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

      {/* WHY CHOOSE MACKSOFY */}
      <section id="why-macksofy" className="py-20">
        <Container>
          <div className="max-w-3xl">
            <Eyebrow color="purple">Why Macksofy for mobile VAPT</Eyebrow>
            <h2 className="mt-3 font-display text-3xl font-black sm:text-4xl text-balance leading-[1.05]">
              The mobile pentest your <span className="gradient-text">scanner can&rsquo;t run</span>.
            </h2>
            <p className="mt-4 text-fg-muted text-pretty leading-relaxed">
              Most &ldquo;mobile VAPT&rdquo; engagements in India and the GCC
              ship a MobSF scan, a Drozer audit and a PDF. The findings that
              actually unblock an RBI submission or close a CISO sign-off
              don&rsquo;t come out of a tool &mdash; they come from a human
              on a rooted device with Frida open. Here&rsquo;s the work that
              goes into a Macksofy engagement that doesn&rsquo;t fit in a
              YAML config.
            </p>
          </div>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            <WhyCard
              icon={KeyRound}
              title="We bypass your RASP first."
              body="Root detection, SafetyNet attestation, SSL pinning and anti-Frida hooks are defence layers — not audit blockers. Every engagement opens with a hand-tuned Frida bypass for your specific app, then the real testing begins on the attack surface those layers were supposed to protect."
            />
            <WhyCard
              icon={Code2}
              title="We read the binary the way attackers do."
              body="Every APK gets jadx and apktool. Every IPA gets class-dump plus Hopper or Ghidra. We trawl resources.arsc, Info.plist, smali and Mach-O strings for hard-coded secrets, dev endpoints and shipped-but-disabled feature flags — context the scanner doesn&rsquo;t have."
            />
            <WhyCard
              icon={Server}
              title="Your backend is in scope, too."
              body="The app talks to an API. That API is also a Macksofy engagement. OSWE-trained consultants run BOLA, IDOR, mass-assignment and JWT-replay tradecraft against every endpoint the app calls — because the worst breaches start in the binary and end at the API."
            />
            <WhyCard
              icon={FileBadge}
              title="OWASP MASVS attestation, on paper."
              body="The deliverable commits to an explicit verification level — L1, L2 or R — per the official OWASP Mobile Application Security Verification Standard. A number your enterprise customers, app-store reviewers and regulators can map. Not &ldquo;OWASP-aligned&rdquo; handwaving."
            />
            <WhyCard
              icon={Landmark}
              title="RBI, UIDAI, DESC, PDPL — same report."
              body="CERT-In empanelled. Every High and Critical finding maps to RBI&rsquo;s Master Direction on Mobile Banking, UIDAI Aadhaar Auth API controls, PCI DSS v4 and (for UAE work) DESC ISR plus UAE PDPL. India + GCC compliance settled in a single engagement."
            />
            <WhyCard
              icon={RotateCcw}
              title="Free retest. Closed, not pending."
              body="One free verification cycle within 30 days of developer sign-off. We rerun the affected phases on the patched build, validate each fix on a rooted device and reissue the attestation — so the auditor and the SOC reader both see &lsquo;closed&rsquo;, never &lsquo;remediation pending&rsquo;."
            />
          </div>

          <div className="mt-12 flex flex-wrap items-center gap-3 rounded-2xl ring-1 ring-line/60 bg-bg/60 p-5">
            <ShieldCheck className="size-5 text-neon-cyan shrink-0" />
            <p className="text-sm text-fg-muted leading-relaxed flex-1 min-w-[280px]">
              Mutual NDA is step zero of every engagement. Builds, exam
              artefacts and findings live on Macksofy infrastructure for the
              engagement window plus 90 days, then are securely destroyed
              against a CERT-In-acceptable retention policy.
            </p>
            <LinkButton href="/contact?interest=Mobile%20App%20Security" size="md" withArrow>
              Talk to a mobile lead
            </LinkButton>
          </div>
        </Container>
      </section>

      {/* TOOL STACK */}
      <section className="py-20 bg-bg-1">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12 items-end">
            <div className="lg:col-span-5">
              <Eyebrow>Toolchain</Eyebrow>
              <h2 className="mt-3 font-display text-3xl font-black sm:text-4xl text-balance leading-[1.05]">
                Frida + Burp + <span className="gradient-text">a rooted device fleet</span>.
              </h2>
              <p className="mt-5 text-fg-muted">
                Mobile testing is hands-on with real hardware. We maintain a fleet
                of rooted Android (Pixel + OEM Magisk) and jailbroken iOS handsets,
                plus Corellium for iOS versions we don&rsquo;t yet own physically.
                Custom Frida scripts handle pinning + root-detection bypass per app.
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

      {/* COMPLIANCE STRIP */}
      <section className="py-20">
        <Container>
          <div className="max-w-3xl">
            <Eyebrow color="purple">Regulator &amp; store mapping</Eyebrow>
            <h2 className="mt-3 font-display text-3xl font-black sm:text-4xl text-balance leading-[1.05]">
              One report. <span className="gradient-text">Every reviewer.</span>
            </h2>
            <p className="mt-4 text-fg-muted text-pretty leading-relaxed">
              Every finding maps to the standard each stakeholder will actually
              read against your app &mdash; RBI for banking, PCI for payments,
              UIDAI for Aadhaar SDK use, plus App Store / Play Store policy
              appendix so submission rejections don&rsquo;t blindside a release.
            </p>
          </div>
          <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { k: "OWASP MASVS L1 / L2 / R", v: "verification level attestation" },
              { k: "OWASP MSTG", v: "test-coverage matrix per chapter" },
              { k: "RBI Mobile Banking Master Direction", v: "BFSI app sign-off" },
              { k: "PCI DSS v4 / SAQ-D", v: "cardholder-data scope reduction" },
              { k: "UIDAI Aadhaar Auth API", v: "biometric SDK controls" },
              { k: "App Store policy + Privacy Manifest", v: "iOS 17+ submission readiness" },
              { k: "Play Console Data Safety", v: "Android 14+ permissions audit" },
              { k: "GDPR / DPDP Act", v: "PII residency + retention on device" },
              { k: "ISO/IEC 27001 + 27034", v: "ASLC control mapping" },
            ].map((row) => (
              <div key={row.k} className="rounded-xl ring-1 ring-line bg-bg-1/60 p-4">
                <p className="text-sm font-semibold text-fg">{row.k}</p>
                <p className="mt-1 text-xs text-fg-muted leading-relaxed">{row.v}</p>
              </div>
            ))}
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

function Platform({
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
      <div className="grid size-10 place-items-center rounded-xl bg-bg-2 ring-1 ring-line text-neon-cyan">
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

function ApproachCard({
  icon: Icon,
  code,
  title,
  what,
  catches,
  phaseLabel,
}: {
  icon: LucideIcon;
  code: string;
  title: string;
  what: string;
  catches: string[];
  phaseLabel: string;
}) {
  return (
    <div className="rounded-2xl glass p-7 lift h-full flex flex-col">
      <div className="flex items-center gap-4">
        <div className="grid size-12 place-items-center rounded-xl bg-bg-2 ring-1 ring-neon-cyan/30 text-neon-cyan glow-cyan">
          <Icon className="size-6" />
        </div>
        <div>
          <div className="font-display text-2xl font-black gradient-text leading-none">
            {code}
          </div>
          <div className="mt-1 text-[10px] font-mono uppercase tracking-[0.22em] text-fg-faint">
            {phaseLabel}
          </div>
        </div>
      </div>

      <h3 className="mt-5 font-display text-lg font-black text-fg leading-tight">
        {title}
      </h3>
      <p className="mt-3 text-sm text-fg-muted leading-relaxed">{what}</p>

      <div className="mt-5 pt-5 border-t border-line/60">
        <p className="text-[10px] font-mono uppercase tracking-[0.22em] text-fg-faint">
          What it catches
        </p>
        <ul className="mt-3 space-y-2 text-sm">
          {catches.map((c) => (
            <li key={c} className="flex gap-2.5">
              <CheckCircle2 className="size-4 text-neon-cyan shrink-0 mt-0.5" />
              <span className="text-fg-muted leading-relaxed">{c}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
