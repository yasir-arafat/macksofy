import Image from "next/image";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { PrintLayout } from "@/components/print/PrintLayout";
import { COURSES, getCourseBySlug } from "@/content/courses";
import { formatINR } from "@/lib/utils";

/** Logo lockup + divider rendered above every numbered brochure section. */
function SectionHeader({ number, title }: { number: string; title: string }) {
  return (
    <>
      <div className="not-prose flex items-center gap-3 mt-2 mb-3 print:mt-1">
        <Image
          src="/logo-black.png"
          alt="Macksofy Technologies"
          width={813}
          height={254}
          className="h-7 w-auto"
        />
        <div className="h-px flex-1 bg-slate-200" />
        <span className="font-mono text-[9px] uppercase tracking-[0.28em] text-slate-400 font-bold">
          Section {number}
        </span>
      </div>
      <h2 className="!mt-2">{number}. {title}</h2>
    </>
  );
}

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
    description: `Macksofy ${c.shortTitle} course brochure — curriculum, outcomes, prerequisites, fees and placement support.`,
    robots: { index: false, follow: false },
    // Self-referencing canonical. Without this the page inherits the root
    // layout's default (the homepage) — harmless while noindex, but wrong if
    // the page is ever made indexable.
    alternates: { canonical: `/training/${slug}/brochure` },
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
        <SectionHeader number="01" title="At a Glance" />
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
        <SectionHeader number="02" title="Who Is This Course For" />
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
        <SectionHeader number="03" title="What You Will Be Able To Do" />
        <ul>
          {c.outcomes.map((o) => (
            <li key={o}>{o}</li>
          ))}
        </ul>
      </section>

      {/* Curriculum */}
      <section className="print-section mb-12">
        <SectionHeader number="04" title={`Curriculum — ${c.curriculum.length} Modules`} />
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
        <SectionHeader number="05" title="Tools You Will Operate" />
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
        <SectionHeader number="06" title="Career Outcomes" />
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
        <SectionHeader number="07" title="Placement Support" />
        <p>{c.placement.summary}</p>
        <ul>
          {c.placement.points.map((p) => (
            <li key={p}>{p}</li>
          ))}
        </ul>
      </section>

      {/* Why Macksofy */}
      <section className="print-section mb-12">
        <SectionHeader number="08" title="Why Macksofy" />
        <ul>
          <li>
            <strong>Vendor-true delivery</strong> — Macksofy is{" "}
            {c.vendor === "EC-Council"
              ? "an EC-Council Accredited Training Center (ATC)"
              : c.vendor === "CompTIA"
              ? "a CompTIA Authorized Partner"
              : "a hands-on cybersecurity training provider"}{" "}
            delivering practitioner-led bootcamps with exam-prep support.
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
        <SectionHeader number="09" title="How to Enrol" />
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
        <SectionHeader number="10" title="Trademarks & Disclaimer" />
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

      {/* Closing — Talk to us */}
      <section className="not-prose print-section mt-16 print:mt-12 rounded-2xl border-2 border-slate-900 bg-slate-50 p-10 text-center page-break-before">
        <Image
          src="/logo-black.png"
          alt="Macksofy Technologies"
          width={813}
          height={254}
          className="mx-auto h-20 w-auto"
        />
        <div className="mt-6 font-mono text-[10px] uppercase tracking-[0.28em] text-red-600 font-bold">
          Ready to enrol?
        </div>
        <h2 className="mt-3 font-display text-3xl sm:text-4xl font-black text-slate-900 text-balance">
          Talk to a Macksofy course advisor.
        </h2>
        <p className="mt-3 text-slate-600 max-w-xl mx-auto">
          We respond within 4 business hours with batch dates, payment terms,
          EMI options and the corporate training menu.
        </p>
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto text-left">
          <div className="rounded-lg ring-1 ring-slate-300 bg-white p-4">
            <div className="font-mono text-[9px] uppercase tracking-[0.22em] text-slate-500 font-bold">
              Phone
            </div>
            <div className="mt-1 text-sm font-bold text-slate-900">
              +91 99308 24239
            </div>
            <div className="text-xs text-slate-500 mt-0.5">
              WhatsApp · Mon–Sat 09:30–18:30 IST
            </div>
          </div>
          <div className="rounded-lg ring-1 ring-slate-300 bg-white p-4">
            <div className="font-mono text-[9px] uppercase tracking-[0.22em] text-slate-500 font-bold">
              Email
            </div>
            <div className="mt-1 text-sm font-bold text-slate-900">
              services@macksofy.com
            </div>
            <div className="text-xs text-slate-500 mt-0.5">
              Mon–Sat · 09:30–18:30 IST
            </div>
          </div>
          <div className="rounded-lg ring-1 ring-slate-300 bg-white p-4">
            <div className="font-mono text-[9px] uppercase tracking-[0.22em] text-slate-500 font-bold">
              Web
            </div>
            <div className="mt-1 text-sm font-bold text-slate-900">
              macksofy.com/training/{c.slug}
            </div>
            <div className="text-xs text-slate-500 mt-0.5">
              Live batch dates + enrolment form
            </div>
          </div>
        </div>
        <div className="mt-10 flex flex-wrap justify-center gap-2 text-[10px] font-mono uppercase tracking-[0.22em] text-slate-500">
          <span className="rounded-full ring-1 ring-slate-300 bg-white px-3 py-1">
            CERT-In Empanelled
          </span>
          <span className="rounded-full ring-1 ring-slate-300 bg-white px-3 py-1">
            EC-Council ATC
          </span>
          <span className="rounded-full ring-1 ring-slate-300 bg-white px-3 py-1">
            CompTIA Authorized
          </span>
          <span className="rounded-full ring-1 ring-slate-300 bg-white px-3 py-1">
            ISO 27001 Certified
          </span>
        </div>
      </section>
    </PrintLayout>
  );
}
