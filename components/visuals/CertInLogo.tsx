import Image from "next/image";
import { cn } from "@/lib/utils";

/**
 * CERT-In empanelment facts shown next to the logo. The owner confirmed on
 * 2026-11-11 that Macksofy holds CERT-In's written permission to use the
 * CERT-In logo (required by clause 4.1 of CERT-In's empanelment terms).
 */
export const CERT_IN = {
  /** CERT-In's official list of empanelled auditing organisations. */
  verifyUrl: "https://www.cert-in.org.in/s2cMainServlet?pageid=CERTEMPANEL",
  since: 2023,
  renewed: 2026,
} as const;

/**
 * The CERT-In logo on a white plate. The logo's tagline is black on a
 * transparent background, so it disappears on the site's dark surfaces
 * without one. Size it with `imgClassName` (height; width follows).
 */
export function CertInLogo({
  className,
  imgClassName = "h-6",
  sizes = "240px",
}: {
  className?: string;
  imgClassName?: string;
  /** Rendered width, so small placements fetch a small file. */
  sizes?: string;
}) {
  return (
    <span className={cn("inline-flex shrink-0 items-center rounded-lg bg-white px-2.5 py-1.5", className)}>
      <Image
        src="/partners/cert-in.png"
        alt="CERT-In"
        width={745}
        height={150}
        sizes={sizes}
        className={cn("w-auto", imgClassName)}
      />
    </span>
  );
}
