import type { CourseVendor } from "./courses";

/**
 * Vendor / accreditation logos. Files live in /public/partners/ and are
 * reused on the home page accreditation strip and on the training landing.
 */
export const VENDOR_LOGOS: { vendor: CourseVendor; src: string; alt: string; label: string }[] = [
  { vendor: "EC-Council", src: "/partners/ec-council.jpg", alt: "EC-Council Accredited Training Center", label: "EC-Council ATC" },
  // No CompTIA logo: Macksofy is not enrolled in CompTIA's Authorized Partner
  // Program (verified 2026-08-25). VENDOR_LOGOS feeds the About accreditation
  // wall and the /training partner strip, where a vendor mark reads as
  // accreditation whatever the alt text says - the same reasoning already
  // applied to OffSec in app/lp/ceh-certification/page.tsx. CompTIA courses
  // are still taught and still named; only the partnership claim is removed.
  // No Mile2 logo either: the partnership could not be evidenced (2026-09-18),
  // and no course in COURSES is delivered under vendor "Mile2" - an
  // accreditation with no delivery behind it does not survive due-diligence.
];

export const vendorLogo = (vendor: CourseVendor) =>
  VENDOR_LOGOS.find((v) => v.vendor === vendor);
