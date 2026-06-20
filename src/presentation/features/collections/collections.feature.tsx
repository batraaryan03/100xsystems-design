"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import { useCollections } from "@/application/packs/packs.hooks";
import { PackGrid } from "@/presentation/_components/components.composite";
import { SectionRule, PageHeader } from "@/presentation/_components/components.layout";
import { CoralDot, Pill, Badge } from "@/presentation/_components/components.atomic";
import type { CollectionWithPacks } from "@/application/packs/packs.hooks";
import type { Pack } from "@/application/packs/packs.types";
import Fuse from "fuse.js";

const fuseOptions = {
  keys: ["title", "description", "packs.title", "packs.description", "packs.tags"],
  threshold: 0.3,
};

function CollectionThumbnailRow({ packs }: { packs: Pack[] }) {
  const displayed = packs.slice(0, 5);
  return (
    <div style={{ display: "flex", gap: "6px", marginBottom: "20px" }}>
      {displayed.map((pack) => (
        <div
          key={pack.id}
          style={{
            width: "72px",
            height: "52px",
            borderRadius: "8px",
            overflow: "hidden",
            background: "var(--paper-dark)",
            position: "relative",
            flexShrink: 0,
          }}
        >
          {pack.thumbnail && (
            <Image
              src={pack.thumbnail}
              alt={pack.title}
              fill
              sizes="72px"
              style={{ objectFit: "cover" }}
            />
          )}
        </div>
      ))}
      {packs.length > 5 && (
        <div
          style={{
            width: "72px",
            height: "52px",
            borderRadius: "8px",
            background: "var(--line-soft)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: "var(--sans)",
            fontSize: "12px",
            fontWeight: 600,
            color: "var(--ink-faint)",
            flexShrink: 0,
          }}
        >
          +{packs.length - 5}
        </div>
      )}
    </div>
  );
}

function CollectionCard({ collection }: { collection: CollectionWithPacks }) {
  return (
    <div
      style={{
        marginBottom: "48px",
        background: "var(--bone)",
        borderRadius: "20px",
        padding: "32px 32px 36px",
        boxShadow: "var(--shadow), inset 0 0 0 1px rgba(21,20,15,0.06)",
        transition: "transform 0.24s ease, box-shadow 0.24s ease",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-3px)";
        e.currentTarget.style.boxShadow = "0 40px 80px -32px rgba(21,20,15,0.2), inset 0 0 0 1px rgba(21,20,15,0.06)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "";
        e.currentTarget.style.boxShadow = "";
      }}
    >
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "12px" }}>
        <div>
          <h3 style={{ fontFamily: "var(--sans)", fontSize: "22px", fontWeight: 700, letterSpacing: "-0.01em", marginBottom: "6px" }}>
            {collection.title}
          </h3>
          <p style={{ fontFamily: "var(--body)", fontSize: "14px", color: "var(--ink-mute)", lineHeight: 1.5, maxWidth: "48ch" }}>
            {collection.description}
          </p>
        </div>
        <Badge variant="coral" style={{ flexShrink: 0, marginLeft: "16px" }}>
          {collection.packs.length} pack{collection.packs.length !== 1 ? "s" : ""}
        </Badge>
      </div>

      <CollectionThumbnailRow packs={collection.packs} />
      <PackGrid packs={collection.packs} />
    </div>
  );
}

export function CollectionsFeature() {
  const { collections: rawCollections } = useCollections();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTag, setActiveTag] = useState<string | null>(null);

  // Collect all unique tags from collection packs for filtering
  const allTags = useMemo(() => {
    const tagSet = new Set<string>();
    rawCollections.forEach((c) =>
      c.packs.forEach((p) => p.tags.forEach((t) => tagSet.add(t)))
    );
    return Array.from(tagSet).sort();
  }, [rawCollections]);

  // Filter and search collections
  const collections = useMemo(() => {
    let items = rawCollections;

    if (activeTag) {
      items = items
        .map((c) => ({
          ...c,
          packs: c.packs.filter((p) => p.tags.includes(activeTag)),
        }))
        .filter((c) => c.packs.length > 0);
    }

    if (searchQuery) {
      const fuse = new Fuse(items, fuseOptions);
      const fuseResults = fuse.search(searchQuery);
      items = fuseResults.map((r) => r.item).filter((c) => c.packs.length > 0);
    }

    return items;
  }, [rawCollections, searchQuery, activeTag]);

  return (
    <div>
      <section className="tight">
        <div className="container">
          <SectionRule roman="I." meta="Collections" page={`001 / 001`} />
          <PageHeader
            label="Curated Collections"
            labelIndex="Nº 01"
            title={<>Groups of <em>skills</em> for specific use cases<CoralDot /></>}
            lead="Pre-curated collections of skills that work well together. Filter by tag or search across all packs."
          />

          <div style={{ display: "flex", gap: "12px", marginBottom: "24px", flexWrap: "wrap", alignItems: "center" }}>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search collections and packs..."
              style={{
                flex: 1,
                minWidth: "240px",
                maxWidth: "420px",
                padding: "12px 16px",
                borderRadius: "999px",
                border: "1px solid var(--line)",
                background: "var(--bone)",
                fontFamily: "var(--sans)",
                fontSize: "14px",
                color: "var(--ink)",
                outline: "none",
              }}
            />
            <span style={{ fontFamily: "var(--sans)", fontSize: "12px", color: "var(--ink-faint)", whiteSpace: "nowrap" }}>
              {collections.length} collection{collections.length !== 1 ? "s" : ""}
              {searchQuery && ` for "${searchQuery}"`}
            </span>
          </div>

          <div style={{ display: "flex", gap: "6px", flexWrap: "wrap", marginBottom: "40px" }}>
            <Pill
              label="All"
              active={!activeTag}
              onClick={() => setActiveTag(null)}
            />
            {allTags.slice(0, 20).map((tag) => (
              <Pill
                key={tag}
                label={tag}
                active={activeTag === tag}
                onClick={() => setActiveTag(activeTag === tag ? null : tag)}
              />
            ))}
          </div>

          {collections.length === 0 ? (
            <div style={{ padding: "80px 0", textAlign: "center" }}>
              <div style={{ fontSize: "48px", marginBottom: "16px", opacity: 0.3 }}>📁</div>
              <h3 style={{ fontFamily: "var(--serif)", fontSize: "24px", color: "var(--ink-mute)", marginBottom: "8px" }}>
                No collections found
              </h3>
              <p style={{ fontFamily: "var(--body)", fontSize: "14px", color: "var(--ink-faint)", maxWidth: "40ch", margin: "0 auto" }}>
                {searchQuery
                  ? `No collections match "${searchQuery}". Try a different search term.`
                  : "No collections match the selected filter."}
              </p>
            </div>
          ) : (
            collections.map((collection) => (
              <CollectionCard key={collection.id} collection={collection} />
            ))
          )}
        </div>
      </section>
    </div>
  );
}
