import { Suspense } from "react";
import { AssetBrowseFeature } from "@/presentation/features/assets/asset-browse.feature";

export default function IllustrationsPage() {
  return (
    <Suspense>
      <AssetBrowseFeature assetType="illustration" />
    </Suspense>
  );
}
