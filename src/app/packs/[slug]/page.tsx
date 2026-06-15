import { Suspense } from "react";
import PackDetailFeature from "@/presentation/features/packs/pack-detail.feature";

export default async function PackDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  return (
    <Suspense>
      <PackDetailFeature slug={slug} />
    </Suspense>
  );
}
