"use client";

import Link from "next/link";
import { Pack } from "@/application/packs/packs.types";
import { Badge, Pill } from "./components.atomic";

export function PackCard({ pack }: { pack: Pack }) {
  return (
    <Link href={`/packs/${pack.slug}`} className="card" style={{ textDecoration: "none", color: "inherit" }}>
      <div className="num">
        <span>{pack.slug.split("-")[0].slice(0, 2).toUpperCase()}</span>
        <span className="tag">{pack.framework}</span>
      </div>
      <h3>{pack.title}</h3>
      <p>{pack.description}</p>
      <div style={{ display: "flex", gap: "6px", marginTop: "12px", flexWrap: "wrap" }}>
        {pack.tags.slice(0, 3).map((tag) => (
          <Badge key={tag}>{tag}</Badge>
        ))}
      </div>
      <span className="arrow-mark">
        <svg viewBox="0 0 24 24">
          <path d="M5 19L19 5M19 5H8M19 5v11" />
        </svg>
      </span>
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
