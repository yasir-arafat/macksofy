"use client";

import dynamic from "next/dynamic";

const StickyWhatsApp = dynamic(
  () => import("./StickyWhatsApp").then((m) => m.StickyWhatsApp),
  { ssr: false }
);
const Chatbot = dynamic(
  () => import("./Chatbot").then((m) => m.Chatbot),
  { ssr: false }
);
const LeadMagnetPopup = dynamic(
  () => import("./LeadMagnetPopup").then((m) => m.LeadMagnetPopup),
  { ssr: false }
);
const BackToTop = dynamic(
  () => import("./BackToTop").then((m) => m.BackToTop),
  { ssr: false }
);
const CookieConsent = dynamic(
  () => import("./CookieConsent").then((m) => m.CookieConsent),
  { ssr: false }
);

export function LazyClientWidgets() {
  return (
    <>
      <StickyWhatsApp />
      <Chatbot />
      <LeadMagnetPopup />
      <BackToTop />
      <CookieConsent />
    </>
  );
}
