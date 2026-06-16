"use client";

import { useState, useMemo } from "react";
import { usePacks } from "@/application/packs/packs.hooks";
import { Badge, CoralDot } from "@/presentation/_components/components.atomic";
import { SectionRule, PageHeader } from "@/presentation/_components/components.layout";
import type { Pack, PackAssetType } from "@/application/packs/packs.types";
import Image from "next/image";

const ASSET_TYPE_META: Record<PackAssetType, { title: string; description: string; icon: string; roman: string }> = {
  component: {
    title: "Component Packs",
    description: "Full website designs and page templates. Drop in files, get a complete page.",
    icon: "◇",
    roman: "I.",
  },
  image: {
    title: "Image Packs",
    description: "Curated photo collections organized by theme. Textures, gradients, backgrounds, and more.",
    icon: "◎",
    roman: "II.",
  },
  video: {
    title: "Video Packs",
    description: "Short, reusable design-oriented clips. Abstract backgrounds, transitions, and loops.",
    icon: "▶",
    roman: "III.",
  },
  illustration: {
    title: "Illustration Packs",
    description: "Free SVG illustration libraries. Characters, scenes, and icons in cohesive styles.",
    icon: "✦",
    roman: "IV.",
  },
};

function AssetPackCard({ pack }: { pack: Pack }) {
  const assetCount = pack.assets?.length || pack.files?.length || 0;

  return (
    <a
      href={`/skills/websites/${pack.slug}`}
      style={{
        textDecoration: "none",
        color: "inherit",
        display: "block",
        overflow: "hidden",
        background: "var(--bone)",
        boxShadow: "var(--shadow)",
        transition: "transform 0.2s ease",
        position: "relative",
      }}
    >
      {pack.thumbnail ? (
        <div style={{ aspectRatio: "16/9", background: "var(--paper-dark)", overflow: "hidden", position: "relative" }}>
          <Image
            src={pack.thumbnail}
            alt={pack.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            style={{ objectFit: "cover" }}
          />
        </div>
      ) : (
        <div style={{
          aspectRatio: "16/9",
          background: "var(--paper-dark)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}>
          <span style={{
            fontFamily: "var(--serif)",
            fontStyle: "italic",
            fontSize: "48px",
            color: "var(--ink-faint)",
            opacity: 0.3,
          }}>
            {pack.title.charAt(0)}
          </span>
        </div>
      )}
      <div style={{ padding: "20px 22px 24px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "10px" }}>
          <span style={{
            fontFamily: "var(--sans)",
            fontSize: "11px",
            color: "var(--ink-faint)",
            letterSpacing: "0.14em",
            textTransform: "uppercase",
          }}>
            {pack.assetType || "component"}
          </span>
          {assetCount > 0 && (
            <Badge variant="coral">{assetCount} files</Badge>
          )}
        </div>
        <h3 style={{
          fontFamily: "var(--sans)",
          fontSize: "18px",
          fontWeight: 700,
          letterSpacing: "-0.014em",
          marginBottom: "8px",
        }}>
          {pack.title}
        </h3>
        <p style={{
          fontFamily: "var(--body)",
          fontSize: "13px",
          color: "var(--ink-mute)",
          lineHeight: 1.5,
          marginBottom: "12px",
          display: "-webkit-box",
          WebkitLineClamp: 2,
          WebkitBoxOrient: "vertical",
          overflow: "hidden",
        }}>
          {pack.description}
        </p>
        <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
          {pack.tags.slice(0, 3).map((tag) => (
            <Badge key={tag}>{tag}</Badge>
          ))}
        </div>
        {pack.attribution && pack.attribution.length > 0 && (
          <div style={{
            marginTop: "12px",
            paddingTop: "12px",
            borderTop: "1px solid var(--line-soft)",
            fontFamily: "var(--sans)",
            fontSize: "11px",
            color: "var(--ink-faint)",
          }}>
            Sources: {pack.attribution.map(a => a.source).join(", ")}
          </div>
        )}
      </div>
    </a>
  );
}

export function AssetBrowseFeature({ assetType }: { assetType: PackAssetType }) {
  const { packs } = usePacks();
  const [searchQuery, setSearchQuery] = useState("");
  const meta = ASSET_TYPE_META[assetType];

  const assetPacks = useMemo(() => {
    return packs.filter((p) => {
      const matchesType = p.assetType === assetType;
      const matchesSearch = !searchQuery ||
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesType && matchesSearch;
    });
  }, [packs, assetType, searchQuery]);

  return (
    <div>
      <section className="tight">
        <div className="container">
          <SectionRule roman={meta.roman} meta={meta.title} page="001 / 001" />
          <PageHeader
            label={`Browse ${meta.title}`}
            labelIndex="Nº 01"
            title={<>{meta.icon} {meta.title}<CoralDot /></>}
            lead={meta.description}
          />

          <div style={{ marginBottom: "16px" }}>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={`Search ${assetType} packs...`}
              style={{
                width: "100%",
                maxWidth: "400px",
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
          </div>

          <div style={{ marginBottom: "24px", fontFamily: "var(--sans)", fontSize: "12px", color: "var(--ink-faint)", letterSpacing: "0.14em", textTransform: "uppercase" }}>
            {assetPacks.length} pack{assetPacks.length !== 1 ? "s" : ""} found
          </div>

          {assetPacks.length === 0 ? (
            <div style={{ padding: "80px 0", textAlign: "center" }}>
              <div style={{ fontSize: "48px", marginBottom: "16px", opacity: 0.3 }}>{meta.icon}</div>
              <h3 style={{ fontFamily: "var(--serif)", fontSize: "24px", color: "var(--ink-mute)", marginBottom: "8px" }}>
                No {assetType} packs yet
              </h3>
              <p style={{ fontFamily: "var(--body)", fontSize: "14px", color: "var(--ink-faint)", maxWidth: "40ch", margin: "0 auto" }}>
                We're curating the best {assetType} packs. Check back soon or contribute your own.
              </p>
            </div>
          ) : (
            <div className="grid-packs">
              {assetPacks.map((pack) => (
                <AssetPackCard key={pack.id} pack={pack} />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
