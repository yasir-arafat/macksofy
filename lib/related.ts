/**
 * Smart pickers for cross-linking between detail pages. Each picker is
 * deterministic + pure so it can run inside generateStaticParams /
 * server components at build time.
 *
 * Why these exist: prior to this, audit and training detail pages
 * surfaced "related" entries via `.slice(0, 3)` — first three in the
 * content array. That gave every audit/course the same three "related"
 * neighbours regardless of topic, which Googlebot reads as low-quality
 * internal linking. The pickers below score candidates against the
 * current page's category / vendor / keywords so the related strip
 * actually reflects topical adjacency, raising the inbound link
 * relevance for deep templated pages.
 */
import type { Audit } from "@/content/audits";
import type { Course } from "@/content/courses";
import type { Industry } from "@/content/industries";
import type { BlogPost } from "@/content/blog";
import type { Resource } from "@/content/resources";

type Scored<T> = { item: T; score: number };

function lower(set: Iterable<string>): Set<string> {
  return new Set(Array.from(set, (s) => s.toLowerCase()));
}

function overlapCount(a: Iterable<string>, b: Iterable<string>): number {
  const bs = lower(b);
  let n = 0;
  for (const x of a) if (bs.has(x.toLowerCase())) n++;
  return n;
}

function topN<T>(scored: Scored<T>[], n: number): T[] {
  return scored
    .filter((s) => s.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, n)
    .map((s) => s.item);
}

/**
 * Pick related audits. Score:
 *  +5 same category
 *  +3 same authority flag (both regulator-mandated, or both not)
 *  +keywords-overlap
 *  +frameworks-overlap × 2
 * Falls back to the first non-self entries if no candidate scores > 0.
 */
export function pickRelatedAudits(
  current: Audit,
  all: Audit[],
  n = 3
): Audit[] {
  const others = all.filter((x) => x.slug !== current.slug);
  const scored: Scored<Audit>[] = others.map((x) => {
    let score = 0;
    if (x.category === current.category) score += 5;
    if (!!x.authority === !!current.authority) score += 3;
    score += overlapCount(current.keywords, x.keywords);
    score += overlapCount(current.frameworks, x.frameworks) * 2;
    return { item: x, score };
  });
  const picked = topN(scored, n);
  if (picked.length >= n) return picked;
  const seen = new Set(picked.map((p) => p.slug));
  for (const o of others) {
    if (picked.length >= n) break;
    if (!seen.has(o.slug)) picked.push(o);
  }
  return picked;
}

/**
 * Pick related courses. Score:
 *  +5 same vendor
 *  +3 same level
 *  +keywords-overlap
 */
export function pickRelatedCourses(
  current: Course,
  all: Course[],
  n = 3
): Course[] {
  const others = all.filter((x) => x.slug !== current.slug);
  const scored: Scored<Course>[] = others.map((x) => {
    let score = 0;
    if (x.vendor === current.vendor) score += 5;
    if (x.level === current.level) score += 3;
    score += overlapCount(current.keywords, x.keywords);
    return { item: x, score };
  });
  const picked = topN(scored, n);
  if (picked.length >= n) return picked;
  const seen = new Set(picked.map((p) => p.slug));
  for (const o of others) {
    if (picked.length >= n) break;
    if (!seen.has(o.slug)) picked.push(o);
  }
  return picked;
}

/**
 * Pick related industries by regulator overlap.
 * +regulators-overlap × 3
 * +keywords-overlap
 */
export function pickRelatedIndustries(
  current: Industry,
  all: Industry[],
  n = 3
): Industry[] {
  const others = all.filter((x) => x.slug !== current.slug);
  const scored: Scored<Industry>[] = others.map((x) => {
    let score = 0;
    score += overlapCount(current.regulators, x.regulators) * 3;
    score += overlapCount(current.keywords, x.keywords);
    return { item: x, score };
  });
  const picked = topN(scored, n);
  if (picked.length >= n) return picked;
  const seen = new Set(picked.map((p) => p.slug));
  for (const o of others) {
    if (picked.length >= n) break;
    if (!seen.has(o.slug)) picked.push(o);
  }
  return picked;
}

/**
 * Pick blog posts to surface on an audit detail page. Match on
 * frameworks / keywords / category / tags. Returns top N by score.
 */
export function pickBlogPostsForAudit(
  audit: Audit,
  posts: BlogPost[],
  n = 3
): BlogPost[] {
  const auditTerms = new Set<string>([
    audit.shortTitle.toLowerCase(),
    audit.category.toLowerCase(),
    ...audit.frameworks.map((f) => f.toLowerCase()),
    ...audit.keywords.map((k) => k.toLowerCase()),
  ]);
  const scored: Scored<BlogPost>[] = posts.map((p) => {
    let score = 0;
    const tagSet = lower(p.tags);
    const keywordSet = lower(p.keywords);
    for (const term of auditTerms) {
      if (tagSet.has(term)) score += 3;
      if (keywordSet.has(term)) score += 2;
      if (p.title.toLowerCase().includes(term)) score += 1;
    }
    return { item: p, score };
  });
  return topN(scored, n);
}

/**
 * Pick audits to surface on a resource detail page. Match on
 * topics / sector / keyword overlap.
 */
export function pickAuditsForResource(
  resource: Resource,
  audits: Audit[],
  n = 2
): Audit[] {
  const resourceTerms = new Set<string>([
    ...resource.topics.map((t) => t.toLowerCase()),
    ...resource.keywords.map((k) => k.toLowerCase()),
  ]);
  const scored: Scored<Audit>[] = audits.map((a) => {
    let score = 0;
    const auditTerms = lower([
      a.shortTitle,
      a.category,
      ...a.frameworks,
      ...a.keywords,
    ]);
    for (const term of resourceTerms) {
      if (auditTerms.has(term)) score += 2;
    }
    return { item: a, score };
  });
  return topN(scored, n);
}
