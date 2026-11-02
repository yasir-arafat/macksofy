import CourseBrochure, {
  generateMetadata as brochureMetadata,
} from "../../[slug]/brochure/page";

// The fixed corporate-training folder takes priority over [slug], which would
// otherwise hide /training/corporate-training/brochure. Reuse the shared
// brochure for this slug so the URL keeps working.
const params = Promise.resolve({ slug: "corporate-training" });

export function generateMetadata() {
  return brochureMetadata({ params });
}

export default function CorporateTrainingBrochure() {
  return <CourseBrochure params={params} />;
}
