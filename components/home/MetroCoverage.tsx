import { MapPin } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { METROS } from "@/lib/site";

interface Props {
  /** Optional eyebrow / title overrides for variant pages */
  eyebrow?: string;
  title?: React.ReactNode;
  description?: string;
  /** Compact variant — smaller padding, no headline */
  compact?: boolean;
}

/**
 * Visible metro coverage strip — pin chips for every Indian metro Macksofy
 * serves. Boosts on-page relevance for "[service] in [city]" queries and
 * gives Googlebot crawlable text proof of pan-India coverage.
 */
export function MetroCoverage({
  eyebrow = "Pan-India delivery · UAE / GCC",
  title,
  description,
  compact = false,
}: Props) {
  return (
    <section
      className={`relative border-y border-line bg-bg-1 ${compact ? "py-8" : "py-14"}`}
    >
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-neon-cyan/40 to-transparent"
      />
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-neon-purple/40 to-transparent"
      />
      <Container>
        {!compact && (
          <div className="text-center max-w-3xl mx-auto mb-7">
            <span className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.22em] text-neon-cyan font-semibold">
              <span className="size-1.5 rounded-full bg-neon-cyan animate-pulse" />
              {eyebrow}
            </span>
            <h2 className="mt-3 font-display text-2xl sm:text-3xl font-black text-balance leading-[1.05]">
              {title ?? (
                <>
                  Cybersecurity engagements across{" "}
                  <span className="gradient-text">India&rsquo;s metros + UAE.</span>
                </>
              )}
            </h2>
            {description && (
              <p className="mt-3 text-sm text-fg-muted text-pretty">{description}</p>
            )}
          </div>
        )}

        <ul className="flex flex-wrap items-center justify-center gap-2 sm:gap-2.5">
          {METROS.map((m) => (
            <li
              key={m.name}
              className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold ring-1 transition-all ${
                m.primary
                  ? "bg-neon-cyan/15 ring-neon-cyan/40 text-neon-cyan"
                  : "bg-bg-2 ring-line text-fg-muted hover:ring-white/30"
              }`}
            >
              <MapPin className="size-3" />
              <span>{m.name}</span>
              <span
                className={`font-mono text-[9px] uppercase tracking-wider ${
                  m.primary ? "text-neon-cyan/80" : "text-fg-faint"
                }`}
              >
                · {m.state}
              </span>
              {m.primary && (
                <span className="inline-flex items-center rounded-full bg-bg-2/60 ring-1 ring-neon-cyan/40 px-1.5 text-[8px] font-bold uppercase tracking-wider text-neon-cyan">
                  HQ
                </span>
              )}
            </li>
          ))}
          <li className="inline-flex items-center gap-1.5 rounded-full bg-amber-500/10 ring-1 ring-amber-500/30 px-3 py-1.5 text-xs font-semibold text-amber-300">
            <MapPin className="size-3" />
            Dubai, UAE
            <span className="font-mono text-[9px] uppercase tracking-wider text-amber-300/80">
              · GCC
            </span>
          </li>
        </ul>
      </Container>
    </section>
  );
}
