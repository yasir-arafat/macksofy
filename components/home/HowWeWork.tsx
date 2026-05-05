import { Container } from "@/components/ui/Container";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { EngagementPhases } from "@/components/visuals/EngagementPhases";
import { GlowOrb } from "@/components/visuals/GlowOrb";
import { FadeIn } from "@/components/motion/FadeIn";

export function HowWeWork() {
  return (
    <section className="relative py-24 sm:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-30" />
      <GlowOrb className="-top-20 left-1/4" color="cyan" size={500} intensity="soft" />
      <GlowOrb className="bottom-0 right-1/4" color="purple" size={500} intensity="soft" />
      <Container className="relative">
        <FadeIn>
          <SectionTitle
            eyebrow="Methodology"
            title={
              <>
                Six phases from{" "}
                <span className="gradient-text">scoping to sign-off.</span>
              </>
            }
            description="Every Macksofy engagement follows a tested methodology — refined over a decade of CERT-In audits and BFSI red-team operations. Click through the phases or watch them auto-advance."
            align="center"
          />
        </FadeIn>
        <FadeIn delay={0.1} className="mt-16">
          <EngagementPhases />
        </FadeIn>
      </Container>
    </section>
  );
}
