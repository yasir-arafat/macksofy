import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";

interface Props {
  current: number;
  totalPages: number;
}

function pageHref(page: number): string {
  return page === 1 ? "/blog" : `/blog/page/${page}`;
}

/**
 * Pagination strip — "Prev · 1 2 3 · Next" with current page highlighted.
 * Used on every blog index variant.
 */
export function BlogPagination({ current, totalPages }: Props) {
  if (totalPages <= 1) return null;
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  const prevPage = current > 1 ? current - 1 : null;
  const nextPage = current < totalPages ? current + 1 : null;

  return (
    <nav
      aria-label="Pagination"
      className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-4"
    >
      <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-fg-faint">
        Page {current} of {totalPages}
      </div>
      <div className="flex items-center gap-1.5">
        {prevPage ? (
          <Link
            href={pageHref(prevPage)}
            className="inline-flex items-center gap-1.5 rounded-full bg-bg-2 ring-1 ring-line px-3.5 py-2 text-xs font-semibold text-fg-muted hover:text-fg hover:ring-neon-cyan/40 transition-all"
          >
            <ArrowLeft className="size-3.5" /> Previous
          </Link>
        ) : (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-bg-2/40 ring-1 ring-line/40 px-3.5 py-2 text-xs font-semibold text-fg-faint cursor-not-allowed">
            <ArrowLeft className="size-3.5" /> Previous
          </span>
        )}

        <ul className="flex items-center gap-1 mx-1">
          {pages.map((p) => (
            <li key={p}>
              {p === current ? (
                <span
                  aria-current="page"
                  className="inline-flex size-8 items-center justify-center rounded-full bg-neon-cyan/15 ring-1 ring-neon-cyan/40 text-xs font-bold text-neon-cyan"
                >
                  {p}
                </span>
              ) : (
                <Link
                  href={pageHref(p)}
                  className="inline-flex size-8 items-center justify-center rounded-full bg-bg-2 ring-1 ring-line text-xs font-semibold text-fg-muted hover:text-fg hover:ring-neon-cyan/40 transition-all"
                >
                  {p}
                </Link>
              )}
            </li>
          ))}
        </ul>

        {nextPage ? (
          <Link
            href={pageHref(nextPage)}
            className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-neon-cyan via-neon-blue to-neon-purple px-3.5 py-2 text-xs font-bold text-white shadow-[0_0_18px_-6px_rgba(0,229,255,0.5)] hover:shadow-[0_0_28px_-4px_rgba(168,85,247,0.6)] transition-shadow"
          >
            Next <ArrowRight className="size-3.5" />
          </Link>
        ) : (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-bg-2/40 ring-1 ring-line/40 px-3.5 py-2 text-xs font-semibold text-fg-faint cursor-not-allowed">
            Next <ArrowRight className="size-3.5" />
          </span>
        )}
      </div>
    </nav>
  );
}
