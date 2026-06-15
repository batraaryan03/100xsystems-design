"use client";

import { useCollections } from "@/application/packs/packs.hooks";
import { PackGrid } from "@/presentation/_components/components.composite";
import { SectionRule, PageHeader } from "@/presentation/_components/components.layout";
import { CoralDot } from "@/presentation/_components/components.atomic";

export function CollectionsFeature() {
  const { collections } = useCollections();

  return (
    <div>
      <section className="tight">
        <div className="container">
          <SectionRule roman="I." meta="Collections" page="001 / 001" />
          <PageHeader
            label="Curated Collections"
            labelIndex="Nº 01"
            title={<>Groups of <em>skills</em> for specific use cases<CoralDot /></>}
            lead="Pre-curated collections of skills that work well together."
          />

          {collections.length === 0 ? (
            <div style={{ padding: "60px 0", textAlign: "center", color: "var(--ink-mute)" }}>
              No collections yet.
            </div>
          ) : (
            collections.map((collection) => (
              <div key={collection.id} style={{ marginBottom: "60px" }}>
                <h3 style={{ fontFamily: "var(--sans)", fontSize: "24px", fontWeight: 700, marginBottom: "8px" }}>
                  {collection.title}
                </h3>
                <p style={{ fontFamily: "var(--body)", fontSize: "14px", color: "var(--ink-mute)", marginBottom: "24px", maxWidth: "48ch" }}>
                  {collection.description}
                </p>
                <PackGrid packs={collection.packs} />
              </div>
            ))
          )}
        </div>
      </section>
    </div>
  );
}
