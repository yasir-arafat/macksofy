import type { CourseVendor } from "./courses";

/**
 * Vendor / accreditation logos. Files live in /public/partners/ and are
 * reused on the home page accreditation strip and on the training landing.
 */
export const VENDOR_LOGOS: { vendor: CourseVendor; src: string; alt: string; label: string }[] = [
  { vendor: "EC-Council", src: "/partners/ec-council.jpg", alt: "EC-Council Accredited Training Center", label: "EC-Council ATC" },
  { vendor: "CompTIA",    src: "/partners/comptia.jpg",    alt: "CompTIA Authorized Partner", label: "CompTIA Authorized" },
  { vendor: "Mile2",      src: "/partners/mile2.jpg",      alt: "Mile2 Authorized Partner", label: "Mile2 Authorized" },
];

export const vendorLogo = (vendor: CourseVendor) =>
  VENDOR_LOGOS.find((v) => v.vendor === vendor);
