import { Suspense } from "react";
import { PacksFeature } from "@/presentation/features/packs/packs.feature";

export default function PacksPage() {
  return (
    <Suspense>
      <PacksFeature />
    </Suspense>
  );
}
