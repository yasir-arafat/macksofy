import { SITE } from "@/lib/site";
import { SERVICES } from "@/content/services";
import { AUDITS } from "@/content/audits";
import { COURSES } from "@/content/courses";
import { CITIES } from "@/content/cities";
import { POSTS } from "@/content/blog";

export const dynamic = "force-static";

/**
 * /llms.txt — AI crawler manifest. Emerging convention adopted by
 * Anthropic, OpenAI and Perplexity to discover a site's high-value
 * URLs as a flat outline. Plain text on purpose: AI parsers read the
 * markdown headers + bullet links without rendering JS.
 *
 * Keep entries short and intent-bearing — every line should answer
 * "what is at this URL?" in one phrase.
 */
export async function GET() {
  const lines: string[] = [];

  lines.push(`# ${SITE.name}`);
  lines.push("");
  lines.push(`> ${SITE.description}`);
  lines.push("");
  lines.push(`- HQ: ${SITE.hq.locality}, ${SITE.hq.city}, ${SITE.hq.country}`);
  lines.push(`- Markets: India + UAE (GCC delivery)`);
  lines.push(`- Founded: ${SITE.founded}`);
  lines.push(`- Contact: ${SITE.email} · ${SITE.phoneDisplay}`);
  lines.push("");

  lines.push("## Cybersecurity Services");
  for (const s of SERVICES) {
    lines.push(
      `- [${s.title}](${SITE.url}/services/${s.slug}): ${s.hero.tagline}`
    );
  }
  lines.push("");

  lines.push("## Compliance & Audit");
  for (const a of AUDITS) {
    lines.push(
      `- [${a.title}](${SITE.url}/audit/${a.slug}): ${a.hero.tagline}`
    );
  }
  lines.push("");

  lines.push("## Training & Certifications");
  for (const c of COURSES) {
    lines.push(`- [${c.title}](${SITE.url}/training/${c.slug}): ${c.code}`);
  }
  lines.push("");

  lines.push("## Locations");
  for (const c of CITIES) {
    lines.push(
      `- [${c.name}](${SITE.url}/locations/${c.slug}): ${c.hero.headline}`
    );
  }
  lines.push("");

  lines.push("## Recent Articles");
  const recentPosts = [...POSTS]
    .sort(
      (a, b) =>
        new Date(b.updated ?? b.date).getTime() -
        new Date(a.updated ?? a.date).getTime()
    )
    .slice(0, 30);
  for (const p of recentPosts) {
    lines.push(`- [${p.title}](${SITE.url}/blog/${p.slug}): ${p.description}`);
  }
  lines.push("");

  lines.push("## Reference");
  lines.push(`- [Sitemap](${SITE.url}/sitemap.xml)`);
  lines.push(`- [RSS](${SITE.url}/feed.xml)`);
  lines.push(`- [Contact](${SITE.url}/contact)`);
  lines.push(`- [About](${SITE.url}/about)`);
  lines.push(`- [Press & Media](${SITE.url}/press)`);
  lines.push("");

  return new Response(lines.join("\n"), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  });
}
