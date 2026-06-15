"use client";

import { PageHeader } from "@/presentation/_components/components.layout";
import { PackGrid } from "@/presentation/_components/components.composite";
import { containerStyles, headingStyles } from "@/presentation/_styles/components.styles";
import { useCollections } from "@/application/packs/packs.hooks";

export default function CollectionsFeature() {
  const { collections } = useCollections();

  return (
    <div className="flex flex-col">
      <PageHeader
        title="Collections"
        description="Curated groups of packs for specific use cases"
      />

      <div className={containerStyles.root}>
        {collections.length === 0 ? (
          <div className="py-16 text-center">
            <p className="text-lg text-muted-foreground">
              No collections available yet.
            </p>
            <p className="mt-2 text-sm text-muted-foreground">
              Check back soon for curated packs.
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-12">
            {collections.map((collection) => (
              <div key={collection.id} className="flex flex-col gap-4">
                <div>
                  <h2 className={headingStyles.h2}>{collection.title}</h2>
                  <p className="mt-1 text-muted-foreground">
                    {collection.description}
                  </p>
                </div>
                <PackGrid packs={collection.packs} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
