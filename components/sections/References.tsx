import { ExternalLink } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { referencesFor } from "@/content/references";

/**
 * References & standards block (master audit G-4). Renders the authoritative
 * standards and regulator sources a money page works to, as outbound links to
 * their primary domains (OWASP, MITRE, NIST, CISA, CERT-In, RBI/SEBI, ISO …).
 * This is a first-order E-E-A-T / GEO signal — it co-locates Macksofy with the
 * source of truth. Renders nothing when the page isn't mapped, so it is safe to
 * drop into any template unconditionally.
 *
 * Links are dofollow (genuine citations to primary sources — what a real
 * reference section is) and open in a new tab with rel="noopener noreferrer".
 */
export function References({
  pageKey,
  heading = "References & standards",
}: {
  pageKey: string;
  heading?: string;
}) {
  const refs = referencesFor(pageKey);
  if (refs.length === 0) return null;
  return (
    <section className="pb-10">
      <Container>
        <div className="rounded-2xl border border-line/60 bg-bg-1/40 p-5 sm:p-6">
          <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-fg-faint">
            {heading}
          </div>
          <p className="mt-2 max-w-2xl text-xs text-fg-faint leading-relaxed">
            Macksofy delivers this work to the following standards and regulator
            requirements. Definitions and controls are sourced from the issuing
            bodies below.
          </p>
          <ul className="mt-4 grid gap-2 sm:grid-cols-2">
            {refs.map((r) => (
              <li key={r.url}>
                <a
                  href={r.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-baseline gap-2 text-sm"
                >
                  <ExternalLink className="size-3.5 shrink-0 translate-y-0.5 text-fg-faint group-hover:text-neon-cyan transition-colors" />
                  <span>
                    <span className="font-semibold text-fg-muted group-hover:text-neon-cyan transition-colors">
                      {r.label}
                    </span>
                    <span className="ml-1.5 text-xs text-fg-faint">
                      · {r.issuer}
                    </span>
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
