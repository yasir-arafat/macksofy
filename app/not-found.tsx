import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { LinkButton } from "@/components/ui/Button";
import { ParticleBackground } from "@/components/visuals/ParticleBackground";

export default function NotFound() {
  return (
    <section className="relative min-h-[70vh] grid place-items-center isolate overflow-hidden">
      <ParticleBackground density={60} />
      <Container className="relative text-center">
        <p className="font-mono text-sm font-semibold uppercase tracking-[0.22em] text-neon-cyan">
          404 · route not found
        </p>
        <h1 className="mt-4 font-display text-5xl font-black text-fg sm:text-6xl">
          We couldn&rsquo;t find that page.
        </h1>
        <p className="mt-5 mx-auto max-w-xl text-lg text-fg-muted">
          The page you were looking for moved, was renamed, or never existed.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <LinkButton href="/" withArrow>Go home</LinkButton>
          <LinkButton href="/services" variant="outline">Browse services</LinkButton>
          <LinkButton href="/training" variant="outline">Browse training</LinkButton>
        </div>
        <p className="mt-12 text-sm text-fg-faint">
          Looking for something specific?{" "}
          <Link href="/contact" className="font-semibold text-neon-cyan hover:underline">
            Talk to us →
          </Link>
        </p>
      </Container>
    </section>
  );
}
