import type { ReactNode } from "react";
import { JsonLd } from "@/components/seo/JsonLd";
import { educationalOrganizationSchema } from "@/lib/schema";

export default function TrainingLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <JsonLd data={educationalOrganizationSchema()} />
      {children}
    </>
  );
}
