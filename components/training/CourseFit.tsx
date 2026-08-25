import { UserCheck, ListChecks } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/SectionTitle";

/**
 * "Who this is for" + "Before you start".
 *
 * Both fields existed in content/courses.ts and were emitted in the Course
 * JSON-LD, but no template consumed them — 70 `whoIsItFor` and 41
 * `prerequisites` strings across 21 courses reached search engines as
 * structured data and reached human readers not at all. They answer the two
 * questions a course buyer asks first ("is this for me?" and "can I start?"),
 * so they render high on the page, before the curriculum.
 *
 * Server-rendered with no client state — nothing here can repeat the
 * initial-state-is-not-the-content class of bug.
 */
export function CourseFit({
  whoIsItFor = [],
  prerequisites = [],
  courseShortTitle,
}: {
  whoIsItFor?: string[];
  prerequisites?: string[];
  courseShortTitle: string;
}) {
  if (whoIsItFor.length === 0 && prerequisites.length === 0) return null;
  const both = whoIsItFor.length > 0 && prerequisites.length > 0;

  return (
    <section className="py-20 border-y border-line">
      <Container>
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          {whoIsItFor.length > 0 && (
            <div className={both ? "lg:col-span-7" : "lg:col-span-12"}>
              <Eyebrow>Who it&rsquo;s for</Eyebrow>
              <h2 className="mt-3 font-display text-2xl font-black sm:text-3xl">
                Is {courseShortTitle} right for you?
              </h2>
              <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                {whoIsItFor.map((w) => (
                  <li key={w} className="flex gap-3 text-sm">
                    <UserCheck className="size-5 text-neon-cyan shrink-0 mt-0.5" />
                    <span className="text-fg-muted leading-relaxed">{w}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
          {prerequisites.length > 0 && (
            <div className={both ? "lg:col-span-5" : "lg:col-span-12"}>
              <Eyebrow color="purple">Before you start</Eyebrow>
              <h2 className="mt-3 font-display text-2xl font-black sm:text-3xl">
                What we assume you know
              </h2>
              <ul className="mt-6 grid gap-3">
                {prerequisites.map((p) => (
                  <li key={p} className="flex gap-3 text-sm">
                    <ListChecks className="size-5 text-neon-purple shrink-0 mt-0.5" />
                    <span className="text-fg-muted leading-relaxed">{p}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}
