"use client";

import Link from "next/link";
import Image from "next/image";
import { Pack } from "@/application/packs/packs.types";
import { Badge, Pill } from "./components.atomic";

export function PackCard({ pack }: { pack: Pack }) {
  return (
    <Link href={`/skills/websites/${pack.slug}`} style={{ textDecoration: "none", color: "inherit", display: "block", overflow: "hidden", background: "var(--bone)", boxShadow: "var(--shadow)", transition: "transform 0.2s ease", position: "relative" }}>
      {pack.thumbnail ? (
        <div style={{ aspectRatio: "16/9", background: "var(--paper-dark)", overflow: "hidden", position: "relative" }}>
          <Image
            src={pack.thumbnail}
            alt={pack.title}
            fill
            style={{ objectFit: "cover" }}
          />
        </div>
      ) : (
        <div style={{ aspectRatio: "16/9", background: "var(--paper-dark)", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <span style={{ fontFamily: "var(--serif)", fontStyle: "italic", fontSize: "48px", color: "var(--ink-faint)", opacity: 0.3 }}>
            {pack.title.charAt(0)}
          </span>
        </div>
      )}
      <div style={{ padding: "20px 22px 24px" }}>
        <div className="num" style={{ marginBottom: "10px" }}>
          <span style={{ fontFamily: "var(--sans)", fontSize: "11px", color: "var(--ink-faint)", letterSpacing: "0.14em", textTransform: "uppercase" }}>
            {pack.framework}
          </span>
          <span className="tag">{pack.category}</span>
        </div>
        <h3 style={{ fontFamily: "var(--sans)", fontSize: "18px", fontWeight: 700, letterSpacing: "-0.014em", marginBottom: "8px" }}>
          {pack.title}
        </h3>
        <p style={{ fontFamily: "var(--body)", fontSize: "13px", color: "var(--ink-mute)", lineHeight: 1.5, marginBottom: "12px", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
          {pack.description}
        </p>
        <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
          {pack.tags.slice(0, 3).map((tag) => (
            <Badge key={tag}>{tag}</Badge>
          ))}
        </div>
      </div>
    </Link>
  );
}

export function PackGrid({ packs }: { packs: Pack[] }) {
  if (packs.length === 0) {
    return (
      <div style={{ padding: "60px 0", textAlign: "center", color: "var(--ink-mute)" }}>
        No skills found.
      </div>
    );
  }

  return (
    <div className="grid-packs">
      {packs.map((pack) => (
        <PackCard key={pack.id} pack={pack} />
      ))}
    </div>
  );
}

export function FilterBar({
  categories,
  frameworks,
  activeCategory,
  activeFramework,
  onCategoryChange,
  onFrameworkChange,
}: {
  categories: string[];
  frameworks: string[];
  activeCategory?: string;
  activeFramework?: string;
  onCategoryChange: (cat: string | undefined) => void;
  onFrameworkChange: (fw: string | undefined) => void;
}) {
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", marginBottom: "32px" }}>
      <Pill
        label="All"
        active={!activeCategory && !activeFramework}
        onClick={() => {
          onCategoryChange(undefined);
          onFrameworkChange(undefined);
        }}
      />
      {categories.map((cat) => (
        <Pill
          key={cat}
          label={cat}
          active={activeCategory === cat}
          onClick={() => onCategoryChange(activeCategory === cat ? undefined : cat)}
        />
      ))}
      <span style={{ width: "1px", background: "var(--line)", margin: "0 4px" }} />
      {frameworks.map((fw) => (
        <Pill
          key={fw}
          label={fw}
          active={activeFramework === fw}
          onClick={() => onFrameworkChange(activeFramework === fw ? undefined : fw)}
        />
      ))}
    </div>
  );
}
