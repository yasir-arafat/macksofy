import { ImageResponse } from "next/og";
import { SITE } from "@/lib/site";

export const runtime = "edge";

/**
 * Dynamic OG image generator. Renders a brand-consistent 1200x630 PNG
 * with a configurable title + eyebrow + kind chip. Used by every
 * content type so social cards + AI search previews stop falling back
 * to the single static /og-default.png.
 *
 * URL shape:
 *   /api/og?title=Penetration%20Testing&eyebrow=Service&kind=service
 *
 * Wired from `lib/seo.ts` via the new `dynamicOgImage()` helper.
 *
 * Edge runtime: ImageResponse uses Satori under the hood and requires
 * the edge runtime — only Edge can stream the SVG-to-PNG pipeline.
 * This is the one edge-runtime route in the codebase; everything else
 * stays static / Node.
 */
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const title = (searchParams.get("title") ?? SITE.name).slice(0, 110);
  const eyebrow = (searchParams.get("eyebrow") ?? "Cybersecurity").slice(0, 60);
  const kind = (searchParams.get("kind") ?? "macksofy").slice(0, 40);
  // Topic drives the per-subject accent + motif glyph. Defaults to the eyebrow,
  // so blog posts (eyebrow = category) get topical theming for free on both the
  // social card and the on-page hero.
  const topic = (searchParams.get("topic") ?? eyebrow).slice(0, 60);

  // Colour-map per content kind so the chip + accent reads at a glance.
  const accentByKind: Record<string, string> = {
    service: "#00e5ff",
    audit: "#a855f7",
    training: "#fbbf24",
    course: "#fbbf24",
    blog: "#22c55e",
    city: "#ec4899",
    product: "#06b6d4",
    case: "#f97316",
    industry: "#8b5cf6",
    macksofy: "#00e5ff",
  };

  // Per-topic theme: accent + a short motif glyph + a label. Keyed by the
  // (lower-cased) topic/category so every blog subject reads as its own image.
  const topicTheme: Record<string, { accent: string; glyph: string; label: string }> = {
    "ot security": { accent: "#f59e0b", glyph: "OT", label: "OT · ICS · SCADA" },
    compliance: { accent: "#a855f7", glyph: "GRC", label: "Compliance & Audit" },
    regulatory: { accent: "#8b5cf6", glyph: "REG", label: "Regulatory" },
    architecture: { accent: "#06b6d4", glyph: "ARCH", label: "Security Architecture" },
    "incident response": { accent: "#ef4444", glyph: "IR", label: "Incident Response · DFIR" },
    "career & salary": { accent: "#22c55e", glyph: "PAY", label: "Careers & Salary" },
    "certification guide": { accent: "#fbbf24", glyph: "CERT", label: "Certification" },
    "certification guides": { accent: "#fbbf24", glyph: "CERT", label: "Certification" },
    "engagement guide": { accent: "#00e5ff", glyph: "VAPT", label: "Engagement Guide" },
    "ai security": { accent: "#d946ef", glyph: "AI", label: "AI Security" },
    "blue team": { accent: "#38bdf8", glyph: "SOC", label: "Blue Team" },
    "red team": { accent: "#fb7185", glyph: "RT", label: "Red Team" },
    "ethical hacking": { accent: "#4ade80", glyph: "CEH", label: "Ethical Hacking" },
    network: { accent: "#f59e0b", glyph: "NET", label: "Network Security" },
    "web appsec": { accent: "#34d399", glyph: "WEB", label: "Web App Security" },
  };
  const theme = topicTheme[topic.toLowerCase()];
  const accent = theme?.accent ?? accentByKind[kind] ?? "#00e5ff";
  // Motif glyph: topic glyph, else the eyebrow's initials (e.g. "Penetration
  // Testing" → "PT"), else a generic shield mark.
  const glyph =
    theme?.glyph ??
    (eyebrow
      .split(/\s+/)
      .map((w) => w[0])
      .join("")
      .slice(0, 4)
      .toUpperCase() || "SEC");
  const chipLabel = theme?.label ?? (kind === "macksofy" ? "Macksofy" : kind);
  // variant=card → no baked-in headline (used for on-page hero + index cards,
  // where the page already shows the title and the image is cropped to fit, so
  // a long title would be clipped + duplicated). Default keeps the title for
  // social / OG share cards.
  const isCard = (searchParams.get("variant") ?? "social") === "card";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          background:
            "linear-gradient(135deg, #050510 0%, #0a0a1f 40%, #0a0a18 100%)",
          color: "white",
          fontFamily: "system-ui, -apple-system, sans-serif",
          padding: "60px 70px",
          position: "relative",
        }}
      >
        {/* Background grid hint — tinted to the topic accent */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: `radial-gradient(circle at 82% 22%, ${accent}33, transparent 52%), radial-gradient(circle at 12% 88%, rgba(168,85,247,0.16), transparent 50%)`,
          }}
        />

        {/* Topical motif — a large faint glyph that makes each subject read as
            its own image at a glance. */}
        <div
          style={{
            position: "absolute",
            right: glyph.length > 2 ? 36 : 70,
            bottom: -40,
            display: "flex",
            fontSize: glyph.length > 3 ? 240 : glyph.length > 2 ? 300 : 400,
            fontWeight: 900,
            letterSpacing: "-0.04em",
            color: accent,
            opacity: 0.1,
            lineHeight: 1,
          }}
        >
          {glyph}
        </div>
        {/* Motif tile — small accent-bordered square holding the glyph, top-right */}
        <div
          style={{
            position: "absolute",
            top: 150,
            right: 70,
            width: 150,
            height: 150,
            borderRadius: 28,
            border: `2px solid ${accent}59`,
            background: `linear-gradient(135deg, ${accent}26, transparent)`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: accent,
            fontSize: glyph.length > 3 ? 44 : glyph.length > 2 ? 56 : 76,
            fontWeight: 900,
            letterSpacing: "-0.03em",
            zIndex: 1,
          }}
        >
          {glyph}
        </div>

        {/* Top row: brand + kind chip */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            zIndex: 1,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 14,
              fontSize: 26,
              fontWeight: 800,
              letterSpacing: "-0.02em",
            }}
          >
            <div
              style={{
                width: 44,
                height: 44,
                borderRadius: 10,
                background: `linear-gradient(135deg, ${accent} 0%, #a855f7 100%)`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#050510",
                fontWeight: 900,
                fontSize: 26,
              }}
            >
              M
            </div>
            <span>Macksofy</span>
          </div>
          <div
            style={{
              display: "flex",
              padding: "8px 16px",
              borderRadius: 999,
              border: `1px solid ${accent}66`,
              background: `${accent}1a`,
              color: accent,
              fontSize: 18,
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.18em",
            }}
          >
            {chipLabel}
          </div>
        </div>

        {/* Body: eyebrow + (title on social cards / topical label on the
            no-headline card variant used for on-page heroes + index cards). */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            marginTop: "auto",
            zIndex: 1,
            gap: 18,
          }}
        >
          <div
            style={{
              display: "flex",
              fontSize: 22,
              fontWeight: 700,
              color: accent,
              textTransform: "uppercase",
              letterSpacing: "0.22em",
            }}
          >
            {eyebrow}
          </div>
          {isCard ? (
            <div
              style={{
                display: "flex",
                fontSize: 64,
                fontWeight: 900,
                lineHeight: 1.05,
                letterSpacing: "-0.03em",
                color: "white",
                maxWidth: 760,
              }}
            >
              {chipLabel}
            </div>
          ) : (
            <div
              style={{
                display: "flex",
                fontSize: title.length > 64 ? 56 : 72,
                fontWeight: 900,
                lineHeight: 1.05,
                letterSpacing: "-0.03em",
                color: "white",
                maxWidth: 1040,
              }}
            >
              {title}
            </div>
          )}
        </div>

        {/* Bottom row: trust strip */}
        <div
          style={{
            display: "flex",
            marginTop: 36,
            gap: 24,
            fontSize: 18,
            color: "rgba(255,255,255,0.65)",
            zIndex: 1,
            fontWeight: 600,
          }}
        >
          <span>CERT-In Empanelled</span>
          <span style={{ color: accent }}>·</span>
          <span>EC-Council ATC</span>
          <span style={{ color: accent }}>·</span>
          <span>ISO 27001</span>
          <span style={{ color: accent }}>·</span>
          <span>India · UAE</span>
        </div>

        {/* Accent ribbon */}
        <div
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            width: 8,
            height: "100%",
            background: `linear-gradient(180deg, ${accent}, transparent)`,
            opacity: 0.7,
          }}
        />
      </div>
    ),
    {
      width: 1200,
      height: 630,
      headers: {
        "Cache-Control": "public, immutable, no-transform, max-age=31536000",
      },
    }
  );
}
