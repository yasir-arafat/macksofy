import { POSTS } from "@/content/blog";
import { SITE } from "@/lib/site";

export const dynamic = "force-static";

function escapeXml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function rfc822(dateStr: string): string {
  return new Date(dateStr).toUTCString();
}

export async function GET() {
  const feedUrl = `${SITE.url}/feed.xml`;
  const sorted = [...POSTS].sort(
    (a, b) =>
      new Date(b.updated ?? b.date).getTime() -
      new Date(a.updated ?? a.date).getTime()
  );
  const lastBuild = rfc822(
    sorted[0]?.updated ?? sorted[0]?.date ?? new Date().toISOString()
  );

  const items = sorted
    .map((p) => {
      const url = `${SITE.url}/blog/${p.slug}`;
      const pubDate = rfc822(p.date);
      const updated = p.updated ? rfc822(p.updated) : pubDate;
      const categories = [p.category, ...p.tags]
        .map((c) => `      <category>${escapeXml(c)}</category>`)
        .join("\n");
      return `    <item>
      <title>${escapeXml(p.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <pubDate>${pubDate}</pubDate>
      <atom:updated xmlns:atom="http://www.w3.org/2005/Atom">${updated}</atom:updated>
      <author>noreply@macksofy.com (${escapeXml(p.author)})</author>
${categories}
      <description>${escapeXml(p.description)}</description>
    </item>`;
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0"
     xmlns:atom="http://www.w3.org/2005/Atom"
     xmlns:content="http://purl.org/rss/1.0/modules/content/"
     xmlns:dc="http://purl.org/dc/elements/1.1/">
  <channel>
    <title>${escapeXml(SITE.name)} · Cybersecurity Blog</title>
    <link>${SITE.url}/blog</link>
    <atom:link href="${feedUrl}" rel="self" type="application/rss+xml" />
    <description>${escapeXml(
      "Practitioner-grade cybersecurity writing from Macksofy — pentest, red team, DFIR, cloud security, training and certifications across India and the UAE."
    )}</description>
    <language>en-IN</language>
    <copyright>© ${new Date().getFullYear()} ${escapeXml(SITE.legalName)}</copyright>
    <lastBuildDate>${lastBuild}</lastBuildDate>
    <generator>Next.js · macksofy.com</generator>
    <managingEditor>noreply@macksofy.com (${escapeXml(SITE.name)} Editorial)</managingEditor>
    <webMaster>noreply@macksofy.com (${escapeXml(SITE.name)} Web)</webMaster>
    <ttl>1440</ttl>
    <image>
      <url>${SITE.url}/logo.png</url>
      <title>${escapeXml(SITE.name)}</title>
      <link>${SITE.url}</link>
    </image>
${items}
  </channel>
</rss>
`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
