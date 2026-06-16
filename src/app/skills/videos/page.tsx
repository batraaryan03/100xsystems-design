import { Suspense } from "react";
import { AssetBrowseFeature } from "@/presentation/features/assets/asset-browse.feature";

export default function VideosPage() {
  return (
    <Suspense>
      <AssetBrowseFeature assetType="video" />
    </Suspense>
  );
}
