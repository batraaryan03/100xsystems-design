import { Suspense } from "react";
import { AssetBrowseFeature } from "@/presentation/features/assets/asset-browse.feature";

export default function ImagesPage() {
  return (
    <Suspense>
      <AssetBrowseFeature assetType="image" />
    </Suspense>
  );
}
