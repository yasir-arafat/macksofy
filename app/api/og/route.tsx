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
  const accent = accentByKind[kind] ?? "#00e5ff";

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
        {/* Background grid hint */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "radial-gradient(circle at 80% 20%, rgba(0,229,255,0.18), transparent 50%), radial-gradient(circle at 15% 85%, rgba(168,85,247,0.18), transparent 50%)",
          }}
        />

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
            {kind === "macksofy" ? "Macksofy" : kind}
          </div>
        </div>

        {/* Body: eyebrow + title */}
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
