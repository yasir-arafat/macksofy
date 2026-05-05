import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { PrintLayout } from "@/components/print/PrintLayout";
import { COURSES, getCourseBySlug } from "@/content/courses";
import { formatINR } from "@/lib/utils";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return COURSES.map((c) => ({ slug: c.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const c = getCourseBySlug(slug);
  if (!c) return {};
  return {
    title: `${c.title} — Brochure | Macksofy Technologies`,
    description: `Macksofy ${c.shortTitle} course brochure — curriculum, outcomes, prerequisites, fees and placement support. ${c.duration}.`,
    robots: { index: false, follow: false },
  };
}

export default async function CourseBrochure({ params }: PageProps) {
  const { slug } = await params;
  const c = getCourseBySlug(slug);
  if (!c) notFound();

  const totalHours = c.curriculum.reduce(
    (s, m) => s + (m.durationHours ?? 0),
    0
  );
  const totalTopics = c.curriculum.reduce((s, m) => s + m.topics.length, 0);

  return (
    <PrintLayout
      eyebrow={`Course Brochure · ${c.vendor} · ${c.level}`}
      title={c.title}
      subtitle={c.hero.tagline}
      refNo={c.code}
      backHref={`/training/${c.slug}`}
      classification="Course brochure · Macksofy Technologies"
    >
      {/* At a glance */}
      <section className="print-section mb-12">
        <h2>1. At a Glance</h2>
        <div className="not-prose grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4">
          {[
            ["Vendor", c.vendor],
            ["Level", c.level],
            ["Duration", c.duration],
            ["Format", c.format],
            ["Modules", String(c.curriculum.length)],
            ...(totalHours > 0 ? [["Hours", `${totalHours} h`]] : []),
            ["Topics", String(totalTopics)],
            [
              "Investment",
              c.priceINR
                ? c.discountPercent
                  ? `${formatINR(c.priceINR)} (${c.discountPercent}% off)`
                  : formatINR(c.priceINR)
                : "On request",
            ],
          ].map(([k, v]) => (
            <div
              key={k as string}
              className="rounded-lg ring-1 ring-slate-300 bg-slate-50 p-3"
            >
              <div className="font-mono text-[9px] uppercase tracking-[0.2em] text-slate-500 font-bold">
                {k}
              </div>
              <div className="mt-1 text-sm font-bold text-slate-900">{v}</div>
            </div>
          ))}
        </div>

        <h3 className="mt-8">About the course</h3>
        <p>{c.hero.description}</p>
      </section>

      {/* Who is it for */}
      <section className="print-section mb-12">
        <h2>2. Who Is This Course For</h2>
        <ul>
          {c.whoIsItFor.map((w) => (
            <li key={w}>{w}</li>
          ))}
        </ul>
        <h3 className="mt-6">Prerequisites</h3>
        <ul>
          {c.prerequisites.map((p) => (
            <li key={p}>{p}</li>
          ))}
        </ul>
      </section>

      {/* Outcomes */}
      <section className="print-section mb-12">
        <h2>3. What You Will Be Able To Do</h2>
        <ul>
          {c.outcomes.map((o) => (
            <li key={o}>{o}</li>
          ))}
        </ul>
      </section>

      {/* Curriculum */}
      <section className="print-section mb-12">
        <h2>4. Curriculum — {c.curriculum.length} Modules</h2>
        <p className="text-sm text-slate-600 italic">
          Module structure and topic coverage authored by Macksofy
          Technologies based on the publicly-published vendor syllabus, current
          as of the issue date of this brochure. Vendor reserves the right to
          revise content; Macksofy keeps cohort material aligned to the latest
          release.
        </p>

        <ol className="not-prose mt-6 space-y-4">
          {c.curriculum.map((m, i) => (
            <li
              key={i}
              className="rounded-xl border border-slate-200 bg-white p-5"
            >
              <div className="flex items-baseline justify-between gap-3 flex-wrap">
                <div>
                  <div className="font-mono text-[9px] uppercase tracking-[0.22em] text-red-600 font-bold">
                    Module {String(i + 1).padStart(2, "0")}
                  </div>
                  <h3 className="mt-1 text-base font-bold text-slate-900 m-0">
                    {m.module}
                  </h3>
                </div>
                <div className="flex items-center gap-2 text-xs">
                  {m.durationHours && (
                    <span className="inline-flex items-center rounded-full bg-slate-100 ring-1 ring-slate-300 px-2 py-0.5 font-mono font-bold">
                      {m.durationHours}h
                    </span>
                  )}
                  <span className="text-slate-500">
                    {m.topics.length} topics
                  </span>
                </div>
              </div>
              <ul className="mt-3 grid sm:grid-cols-2 gap-x-6 gap-y-1.5 text-sm text-slate-700">
                {m.topics.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
            </li>
          ))}
        </ol>
      </section>

      {/* Tools */}
      <section className="print-section mb-12">
        <h2>5. Tools You Will Operate</h2>
        <div className="not-prose flex flex-wrap gap-2">
          {c.toolsCovered.map((t) => (
            <span
              key={t}
              className="inline-flex items-center rounded-md ring-1 ring-slate-300 bg-slate-50 px-2.5 py-1 text-xs font-mono"
            >
              {t}
            </span>
          ))}
        </div>
      </section>

      {/* Career outcomes */}
      <section className="print-section mb-12">
        <h2>6. Career Outcomes</h2>
        <table className="not-prose w-full text-sm border border-slate-300 border-collapse">
          <thead>
            <tr className="bg-slate-100">
              <th className="px-3 py-2 text-left">Role</th>
              <th className="px-3 py-2 text-left">Experience</th>
              <th className="px-3 py-2 text-left">Salary band (India)</th>
            </tr>
          </thead>
          <tbody>
            {c.careerRoles.map((r) => (
              <tr key={r.role} className="border-b border-slate-200">
                <td className="px-3 py-2">{r.role}</td>
                <td className="px-3 py-2 text-slate-600">{r.experience}</td>
                <td className="px-3 py-2 font-bold text-slate-900">
                  {r.salaryINR}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* Placement */}
      <section className="print-section mb-12">
        <h2>7. Placement Support</h2>
        <p>{c.placement.summary}</p>
        <ul>
          {c.placement.points.map((p) => (
            <li key={p}>{p}</li>
          ))}
        </ul>
      </section>

      {/* Why Macksofy */}
      <section className="print-section mb-12">
        <h2>8. Why Macksofy</h2>
        <ul>
          <li>
            <strong>Authorised partner</strong> — Macksofy is{" "}
            {c.vendor === "EC-Council"
              ? "an EC-Council Accredited Training Center (ATC)"
              : c.vendor === "OffSec"
              ? "an OffSec Authorized Training Partner"
              : c.vendor === "CompTIA"
              ? "a CompTIA Authorized Partner"
              : "an authorised training provider"}{" "}
            delivering official courseware and exam vouchers.
          </li>
          <li>
            <strong>Practitioner-led delivery</strong> — every Macksofy
            instructor is a working OSCP / OSWE / OSEP / CISA-certified
            consultant on real client engagements during the week.
          </li>
          <li>
            <strong>Mentor support until you pass</strong> — extended access to
            mentor office hours and exam-day prep at no additional cost.
          </li>
          <li>
            <strong>Placement desk</strong> — Macksofy works with 80+ hiring
            partners across India and the UAE; your post-course resume,
            portfolio review and mock interviews are included.
          </li>
          <li>
            <strong>Indian classroom + online cohorts</strong> — onsite
            delivery in Mumbai BKC and Hyderabad HITEC City; live virtual
            cohorts pan-India with recordings.
          </li>
        </ul>
      </section>

      {/* Enrolment */}
      <section className="print-section mb-12">
        <h2>9. How to Enrol</h2>
        <ol>
          <li>
            Submit the enquiry form at{" "}
            <strong>macksofy.com/contact</strong> or call{" "}
            <strong>+91 99308 24239</strong>.
          </li>
          <li>
            A Macksofy advisor will respond within 4 business hours with the
            next batch dates, payment terms and invoice.
          </li>
          <li>
            Confirm enrolment via NEFT / RTGS / corporate card. EMI options
            available for select courses.
          </li>
          <li>
            Receive welcome kit, lab credentials and the cohort calendar
            within 24 hours of confirmation.
          </li>
        </ol>
      </section>

      {/* Trademark notice */}
      <section className="print-section">
        <h2>10. Trademarks &amp; Disclaimer</h2>
        <p className="text-sm text-slate-600">
          {c.vendor}, {c.code} and related course names are trademarks or
          registered trademarks of their respective owners. Macksofy is an
          authorised training partner and uses these names only to identify the
          official course delivered. Course content, schedules and pricing
          quoted in this brochure are subject to change; please refer to the
          current edition at <strong>macksofy.com/training/{c.slug}</strong>{" "}
          for the latest information.
        </p>
      </section>
    </PrintLayout>
  );
}
