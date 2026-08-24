import { CheckCircle2 } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/SectionTitle";
import { Badge } from "@/components/ui/Badge";
import { cn } from "@/lib/utils";
import type { Service } from "@/content/services";

/**
 * Deliverables checklist + industries served, server-rendered.
 *
 * Extracted from the hand-written /services/vapt and /services/managed-soc
 * sections so every service detail page can carry the same two fields. The
 * other 22 bespoke pages were dropping `deliverables` and `industriesServed`
 * entirely — the copy lived in content/services.ts and reached nobody.
 */
export function DeliverablesIndustries({
  service,
  eyebrow = "Deliverables",
  heading = "What lands in your inbox",
  industriesEyebrow = "Industries",
  industriesHeading = "Sectors we operate in",
  tone = "raised",
}: {
  service: Service;
  eyebrow?: string;
  heading?: string;
  industriesEyebrow?: string;
  industriesHeading?: string;
  /** `raised` tints the section; use `plain` when the section above is already tinted. */
  tone?: "raised" | "plain";
}) {
  const deliverables = service.deliverables ?? [];
  const industries = service.industriesServed ?? [];
  if (deliverables.length === 0 && industries.length === 0) return null;

  const bothColumns = deliverables.length > 0 && industries.length > 0;

  return (
    <section className={cn("py-20", tone === "raised" && "bg-bg-1")}>
      <Container>
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          {deliverables.length > 0 && (
            <div className={bothColumns ? "lg:col-span-7" : "lg:col-span-12"}>
              <Eyebrow>{eyebrow}</Eyebrow>
              <h3 className="mt-3 font-display text-2xl font-black sm:text-3xl">
                {heading}
              </h3>
              <ul className="mt-6 grid sm:grid-cols-2 gap-x-8 gap-y-3">
                {deliverables.map((d) => (
                  <li key={d} className="flex gap-3 text-sm">
                    <CheckCircle2 className="size-5 text-neon-cyan shrink-0 mt-0.5" />
                    <span className="text-fg-muted leading-relaxed">{d}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
          {industries.length > 0 && (
            <div className={bothColumns ? "lg:col-span-5" : "lg:col-span-12"}>
              <Eyebrow color="purple">{industriesEyebrow}</Eyebrow>
              <h3 className="mt-3 font-display text-2xl font-black sm:text-3xl">
                {industriesHeading}
              </h3>
              <div className="mt-6 flex flex-wrap gap-2">
                {industries.map((i) => (
                  <Badge key={i} variant="outline">{i}</Badge>
                ))}
              </div>
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}
