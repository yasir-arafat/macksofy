import { ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";

export const CERT_IN = {
  verifyUrl: "https://www.cert-in.org.in/s2cMainServlet?pageid=CERTEMPANEL",
  since: 2023,
  renewed: 2026,
  statement:
    "This Organization is empaneled by CERT-In for providing information Security Auditing Service",
} as const;

/**
 * CERT-In empanelment text badge — the clause-4.2 approved statement,
 * no logo. Replaces the former image-based CertInLogo.
 */
export function CertInLogo({
  className,
  imgClassName,
  sizes,
}: {
  className?: string;
  /** @deprecated — kept so call sites compile; ignored. */
  imgClassName?: string;
  /** @deprecated */
  sizes?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center gap-1.5 rounded-lg bg-emerald-950/60 ring-1 ring-emerald-400/40 px-2.5 py-1.5 text-[11px] font-semibold text-emerald-300 leading-tight",
        className
      )}
    >
      <ShieldCheck className="size-4 shrink-0" />
      <span className="max-w-[18rem]">CERT-In Empanelled</span>
    </span>
  );
}
