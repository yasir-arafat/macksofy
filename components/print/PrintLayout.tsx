"use client";

import { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Printer, ArrowLeft, Mail, Phone, Globe2 } from "lucide-react";
import { SITE } from "@/lib/site";

interface Props {
  /** Top-of-page eyebrow / category label */
  eyebrow: string;
  /** Big cover page title */
  title: string;
  /** Sub-title under the cover title */
  subtitle?: string;
  /** Optional reference number rendered in the cover meta */
  refNo?: string;
  /** Optional document version (defaults to v1.0) */
  version?: string;
  /** Page contents */
  children: React.ReactNode;
  /** Where the "Back" link should go */
  backHref?: string;
  /** Document classification chip */
  classification?: string;
}

/**
 * Print-optimised layout for downloadable Macksofy artefacts (sample
 * reports, course brochures). Renders a branded cover, a content area,
 * and a back/print toolbar. Browsers' native "Save as PDF" produces a
 * clean PDF.
 */
export function PrintLayout({
  eyebrow,
  title,
  subtitle,
  refNo,
  version = "v1.0",
  children,
  backHref = "/",
  classification = "Public Sample · For evaluation",
}: Props) {
  useEffect(() => {
    document.documentElement.classList.add("print-mode");
    return () => document.documentElement.classList.remove("print-mode");
  }, []);

  // Auto-open the browser's Save-as-PDF / print dialog when the caller
  // arrives with `?print=1` — used by the training "Download brochure (PDF)"
  // button to deliver a real PDF flow.
  useEffect(() => {
    if (typeof window === "undefined") return;
    const params = new URLSearchParams(window.location.search);
    if (params.get("print") !== "1") return;
    const t = window.setTimeout(() => {
      try {
        window.print();
      } catch {
        /* ignore */
      }
    }, 350);
    return () => window.clearTimeout(t);
  }, []);

  const today = new Date().toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="print-doc bg-white text-slate-900 min-h-screen">
      {/* ─── Toolbar (hidden on print) ─── */}
      <div className="print:hidden sticky top-0 z-20 border-b border-slate-200 bg-white/95 backdrop-blur">
        <div className="mx-auto max-w-5xl px-6 h-14 flex items-center justify-between">
          <Link
            href={backHref}
            className="inline-flex items-center gap-2 text-sm font-semibold text-slate-700 hover:text-slate-900"
          >
            <ArrowLeft className="size-4" /> Back
          </Link>
          <div className="text-xs font-mono uppercase tracking-[0.22em] text-slate-500">
            {classification}
          </div>
          <button
            type="button"
            onClick={() => window.print()}
            className="inline-flex items-center gap-2 rounded-full bg-slate-900 text-white px-4 py-2 text-xs font-bold hover:bg-slate-700 transition-colors"
          >
            <Printer className="size-3.5" />
            Print / Save as PDF
          </button>
        </div>
      </div>

      <article className="mx-auto max-w-5xl px-8 sm:px-12 print:px-0">
        {/* ─── Cover page ─── */}
        <header className="cover-page py-16 print:py-24 border-b-2 border-slate-900 mb-12">
          <div className="flex items-start justify-between gap-6">
            <Image
              src="/logo.png"
              alt="Macksofy Technologies"
              width={280}
              height={80}
              className="h-16 w-auto"
              priority
            />
            <div className="text-right">
              <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-red-600 font-bold">
                CERT-In Empanelled
              </div>
              <div className="font-mono text-[10px] uppercase tracking-wider text-slate-500 mt-1">
                Govt of India · MeitY
              </div>
            </div>
          </div>

          <div className="mt-16">
            <div className="font-mono text-[11px] uppercase tracking-[0.22em] text-red-600 font-bold">
              {eyebrow}
            </div>
            <h1 className="mt-3 font-display text-4xl sm:text-5xl font-black leading-tight tracking-tight text-slate-900 text-balance">
              {title}
            </h1>
            {subtitle && (
              <p className="mt-4 text-lg text-slate-600 leading-relaxed max-w-3xl">
                {subtitle}
              </p>
            )}
          </div>

          <div className="mt-16 grid grid-cols-2 gap-8 max-w-2xl">
            <Meta label="Document">
              {refNo ?? "Macksofy template"}
            </Meta>
            <Meta label="Version">{version}</Meta>
            <Meta label="Issued">{today}</Meta>
            <Meta label="Classification">{classification}</Meta>
          </div>

          <div className="mt-16 grid grid-cols-3 gap-6 max-w-3xl text-xs text-slate-600">
            <div className="flex items-start gap-2">
              <Globe2 className="size-4 text-slate-400 shrink-0 mt-0.5" />
              <div>
                <div className="font-bold text-slate-900">{SITE.url.replace("https://", "")}</div>
                <div className="text-slate-500">Website</div>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <Mail className="size-4 text-slate-400 shrink-0 mt-0.5" />
              <div>
                <div className="font-bold text-slate-900">{SITE.email}</div>
                <div className="text-slate-500">Enquiries</div>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <Phone className="size-4 text-slate-400 shrink-0 mt-0.5" />
              <div>
                <div className="font-bold text-slate-900">{SITE.phoneDisplay}</div>
                <div className="text-slate-500">Direct line</div>
              </div>
            </div>
          </div>
        </header>

        {/* ─── Body ─── */}
        <main className="print-body pb-24 prose prose-slate max-w-none">
          {children}
        </main>

        {/* ─── Footer ─── */}
        <footer className="border-t border-slate-200 mt-16 py-8 text-xs text-slate-500 grid grid-cols-3 gap-4 items-center">
          <div className="flex items-center gap-3">
            <Image
              src="/logo.png"
              alt="Macksofy Technologies"
              width={140}
              height={40}
              className="h-8 w-auto"
            />
            <div>
              <div className="font-bold text-slate-700">Macksofy Technologies Pvt Ltd</div>
              <div>308, Building 11, SRA Commercial Tower, BKC, Mumbai 400051</div>
            </div>
          </div>
          <div className="text-center">
            <div className="font-mono uppercase tracking-wider">Document {version}</div>
            <div className="text-slate-400">Issued {today}</div>
          </div>
          <div className="text-right">
            <div className="font-bold text-slate-700">{classification}</div>
            <div>© Macksofy Technologies — all rights reserved</div>
          </div>
        </footer>
      </article>

      <style jsx global>{`
        html.print-mode body {
          background: white !important;
        }
        @media print {
          html, body {
            background: white !important;
            color: #0f172a !important;
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
          }
          .print\\:hidden {
            display: none !important;
          }
          .print-doc {
            font-size: 10.5pt;
          }
          h1 { font-size: 24pt; }
          h2 { font-size: 16pt; page-break-after: avoid; }
          h3 { font-size: 13pt; page-break-after: avoid; }
          .cover-page { page-break-after: always; }
          section, .print-section {
            page-break-inside: avoid;
          }
          a { color: inherit; text-decoration: none; }
          @page { margin: 18mm 14mm; }
        }
      `}</style>
    </div>
  );
}

function Meta({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="font-mono text-[9px] uppercase tracking-[0.22em] text-slate-500 font-bold">
        {label}
      </div>
      <div className="mt-1 text-sm font-bold text-slate-900">{children}</div>
    </div>
  );
}
