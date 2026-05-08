/**
 * Accreditation logos — distinct from training-vendor logos in vendorLogos.ts.
 * Files live in /public/partners/ alongside the vendor logos.
 */
export interface AccreditationLogo {
  key: string;
  src: string;
  alt: string;
  label: string;
  body: string;
}

export const ACCREDITATION_LOGOS: AccreditationLogo[] = [
  {
    key: "cert-in",
    src: "/partners/cert-in.png",
    alt: "CERT-In Empanelled — Indian Computer Emergency Response Team",
    label: "CERT-In Empanelled",
    body: "Govt of India · MeitY",
  },
  {
    key: "iso-27001",
    src: "/partners/iso-27001.webp",
    alt: "ISO/IEC 27001:2022 Information Security Management",
    label: "ISO 27001:2022",
    body: "Information Security Mgmt",
  },
  {
    key: "startup-india",
    src: "/partners/startup-india.png",
    alt: "Startup India · DPIIT-recognized",
    label: "Startup India",
    body: "DPIIT-recognized",
  },
];
