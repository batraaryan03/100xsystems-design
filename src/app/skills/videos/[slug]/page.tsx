import { Suspense } from "react";
import { WebsiteDetailFeature } from "@/presentation/features/websites/website-detail.feature";

export default async function VideoDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  return (
    <Suspense>
      <WebsiteDetailFeature slug={slug} />
    </Suspense>
  );
}
