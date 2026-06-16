import { Suspense } from "react";
import { WebsitesFeature } from "@/presentation/features/websites/websites.feature";

export default function WebsitesPage() {
  return (
    <Suspense>
      <WebsitesFeature />
    </Suspense>
  );
}
