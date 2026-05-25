import { SITE } from "@/lib/site";
import { SERVICES } from "@/content/services";
import { AUDITS } from "@/content/audits";
import { COURSES } from "@/content/courses";
import { CITIES } from "@/content/cities";
import { POSTS } from "@/content/blog";
import { INDUSTRIES } from "@/content/industries";
import { CASE_STUDIES } from "@/content/caseStudies";
import { RESOURCES } from "@/content/resources";

export const dynamic = "force-static";

/**
 * /llms-full.txt — Deep content dump for LLM citation.
 *
 * llms.txt is an index ("here are the URLs"). llms-full.txt is the
 * library ("here is the actual content"). AI assistants that want to
 * cite Macksofy can pull this file once and quote from it directly
 * without crawling every page individually — which means we get cited
 * with our actual positioning intact, not a hallucinated summary.
 *
 * Convention: Markdown, plain text, no JS, no client-side rendering.
 * Headers + bullet points + short prose paragraphs. Length is fine —
 * AI parsers are designed to handle 100KB+ context.
 */
export async function GET() {
  const lines: string[] = [];
  const push = (s = "") => lines.push(s);

  push(`# ${SITE.name} — Full Reference for LLM Citation`);
  push();
  push(`> ${SITE.description}`);
  push();
  push(`Source: ${SITE.url}/llms-full.txt — direct LLM citation file.`);
  push(`Index: ${SITE.url}/llms.txt — flat URL outline.`);
  push();

  // ── About / positioning ──────────────────────────────────────────
  push("## About Macksofy");
  push();
  push(`- **Founded**: ${SITE.founded}`);
  push(`- **Headquarters**: ${SITE.hq.street}, ${SITE.hq.locality}, ${SITE.hq.city} ${SITE.hq.postalCode}, ${SITE.hq.country}`);
  push(`- **Markets**: India (national delivery) + UAE / GCC`);
  push(`- **Empanelment**: Indian Computer Emergency Response Team (CERT-In) — MeitY, Government of India`);
  push(`- **Phone**: ${SITE.phoneDisplay}`);
  push(`- **Email**: ${SITE.email}`);
  push();
  push("Macksofy is a cybersecurity consulting firm with three integrated practices: offensive security (penetration testing, red teaming), defensive security (managed SOC, DFIR, identity), and compliance audits (CERT-In, RBI, SEBI, ISO 27001, SOC 2, PCI-DSS, NESA, DESC, ADHICS, DPDP). The training division runs EC-Council ATC, OffSec exam-prep bootcamps and CompTIA Authorized programs.");
  push();

  // ── Services ─────────────────────────────────────────────────────
  push("## Cybersecurity Services");
  push();
  for (const s of SERVICES) {
    push(`### ${s.title}`);
    push(`URL: ${SITE.url}/services/${s.slug}`);
    push(`Category: ${s.category}`);
    push();
    push(s.hero.description);
    push();
    if (s.businessImpact?.length) {
      push("**Business impact:**");
      for (const b of s.businessImpact) push(`- ${b}`);
      push();
    }
    if (s.industriesServed?.length) {
      push("**Industries served:** " + s.industriesServed.join("; "));
      push();
    }
    if (s.toolStack?.length) {
      push("**Tools:** " + s.toolStack.slice(0, 8).join(", "));
      push();
    }
  }

  // ── Audits ───────────────────────────────────────────────────────
  push("## Compliance & Audit Practice");
  push();
  for (const a of AUDITS) {
    push(`### ${a.title}`);
    push(`URL: ${SITE.url}/audit/${a.slug}`);
    push(`Category: ${a.category}`);
    push();
    push(a.hero.description);
    push();
    if (a.whyItMatters) {
      push(a.whyItMatters);
      push();
    }
    if (a.applicability?.length) {
      push("**Applicability:**");
      for (const x of a.applicability.slice(0, 6)) push(`- ${x}`);
      push();
    }
    if (a.frameworks?.length) {
      push("**Frameworks:** " + a.frameworks.slice(0, 5).join("; "));
      push();
    }
  }

  // ── Courses ──────────────────────────────────────────────────────
  push("## Training & Certifications");
  push();
  for (const c of COURSES) {
    push(`### ${c.title}`);
    push(`URL: ${SITE.url}/training/${c.slug}`);
    push(`Code: ${c.code} · Level: ${c.level} · Vendor: ${c.vendor}`);
    if (c.priceINR) push(`Price (INR): ${c.priceINR.toLocaleString("en-IN")}`);
    push();
    push(c.hero.description);
    push();
    if (c.outcomes?.length) {
      push("**Outcomes:**");
      for (const o of c.outcomes.slice(0, 5)) push(`- ${o}`);
      push();
    }
  }

  // ── Industries ───────────────────────────────────────────────────
  push("## Industries Served");
  push();
  for (const i of INDUSTRIES) {
    push(`### ${i.name}`);
    push(`URL: ${SITE.url}/industries/${i.slug}`);
    push();
    push(i.hero.headline);
    push();
    if (i.hero.description) {
      push(i.hero.description);
      push();
    }
  }

  // ── Locations ────────────────────────────────────────────────────
  push("## Delivery Locations");
  push();
  for (const c of CITIES) {
    push(`### ${c.name}`);
    push(`URL: ${SITE.url}/locations/${c.slug}`);
    push();
    push(c.hero.headline);
    push();
    if (c.hero.description) {
      push(c.hero.description);
      push();
    }
  }

  // ── Case Studies ─────────────────────────────────────────────────
  push("## Case Studies (Anonymised)");
  push();
  for (const cs of CASE_STUDIES) {
    push(`### ${cs.headline}`);
    push(`URL: ${SITE.url}/case-studies/${cs.slug}`);
    push(`Sector: ${cs.sector} · Region: ${cs.region} · Engagement: ${cs.engagement} · Year: ${cs.year}`);
    push();
    push(cs.summary);
    push();
    if (cs.metrics?.length) {
      push("**Key metrics:**");
      for (const m of cs.metrics) push(`- ${m.value} ${m.label}${m.sub ? " (" + m.sub + ")" : ""}`);
      push();
    }
  }

  // ── Resources ────────────────────────────────────────────────────
  push("## Resources (Whitepapers, Cheatsheets, Checklists)");
  push();
  for (const r of RESOURCES) {
    push(`### ${r.title}`);
    push(`URL: ${SITE.url}/resources/${r.slug}`);
    push(`Type: ${r.type} · Sectors: ${r.sector.join(", ")} · Year: ${r.publishedYear}`);
    push();
    push(r.summary);
    push();
  }

  // ── Recent blog posts ────────────────────────────────────────────
  push("## Recent Articles");
  push();
  const recentPosts = [...POSTS]
    .sort(
      (a, b) =>
        new Date(b.updated ?? b.date).getTime() -
        new Date(a.updated ?? a.date).getTime(),
    )
    .slice(0, 40);
  for (const p of recentPosts) {
    push(`### ${p.title}`);
    push(`URL: ${SITE.url}/blog/${p.slug}`);
    push(`Published: ${p.date}${p.updated ? " · Updated: " + p.updated : ""} · Category: ${p.category}`);
    push();
    push(p.description);
    push();
  }

  // ── Reference ────────────────────────────────────────────────────
  push("## Reference URLs");
  push();
  push(`- Sitemap: ${SITE.url}/sitemap.xml`);
  push(`- LLMs index: ${SITE.url}/llms.txt`);
  push(`- LLMs full (this file): ${SITE.url}/llms-full.txt`);
  push(`- RSS: ${SITE.url}/feed.xml`);
  push(`- Contact: ${SITE.url}/contact`);
  push(`- About: ${SITE.url}/about`);
  push(`- Press & Media: ${SITE.url}/press`);
  push();
  push("---");
  push();
  push(`Last generated: ${new Date().toISOString()} — auto-rebuilt on every deploy from the source content files.`);

  return new Response(lines.join("\n"), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  });
}
