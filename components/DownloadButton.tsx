import Link from "next/link";
import { Download, FileText } from "lucide-react";

interface Props {
  href: string;
  label: string;
  sub?: string;
  /** Visual variant */
  variant?: "primary" | "ghost";
}

/**
 * Inline download button for downloadable artefacts. Links to a print-ready
 * Macksofy page; users hit the page's "Print / Save as PDF" toolbar button
 * to get a PDF.
 */
export function DownloadButton({
  href,
  label,
  sub,
  variant = "primary",
}: Props) {
  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={
        variant === "primary"
          ? "group inline-flex items-center gap-3 rounded-2xl bg-bg-2 ring-1 ring-line p-4 hover:ring-neon-cyan/40 hover:-translate-y-0.5 transition-all"
          : "group inline-flex items-center gap-3 text-sm font-semibold text-fg-muted hover:text-neon-cyan transition-colors"
      }
    >
      <div
        className={
          variant === "primary"
            ? "grid size-10 place-items-center rounded-lg bg-neon-cyan/10 ring-1 ring-neon-cyan/30 text-neon-cyan group-hover:scale-110 transition-transform shrink-0"
            : "size-4 text-neon-cyan"
        }
      >
        {variant === "primary" ? (
          <FileText className="size-5" />
        ) : (
          <Download className="size-4" />
        )}
      </div>
      {variant === "primary" ? (
        <div className="min-w-0">
          <div className="font-display text-sm font-bold text-fg group-hover:text-neon-cyan leading-tight">
            {label}
          </div>
          {sub && (
            <div className="mt-0.5 font-mono text-[10px] uppercase tracking-wider text-fg-faint">
              {sub}
            </div>
          )}
        </div>
      ) : (
        <span>{label}</span>
      )}
    </Link>
  );
}
