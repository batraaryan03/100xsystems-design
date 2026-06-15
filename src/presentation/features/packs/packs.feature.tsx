"use client";

import { usePacks } from "@/application/packs/packs.hooks";
import { useSearch } from "@/application/search/search.hooks";
import { PackGrid, FilterBar } from "@/presentation/_components/components.composite";
import { SectionRule, PageHeader } from "@/presentation/_components/components.layout";
import { CoralDot } from "@/presentation/_components/components.atomic";
import { PackCategory, PackFramework } from "@/application/packs/packs.types";

export function PacksFeature() {
  const { packs, categories, frameworks } = usePacks();
  const { filters, results, updateFilters } = useSearch(packs);

  return (
    <div>
      <section className="tight">
        <div className="container">
          <SectionRule roman="I." meta="All Skills" page="001 / 001" />
          <PageHeader
            label="Browse Skills"
            labelIndex="Nº 01"
            title={<>Every skill is a <em>droppable</em> folder<CoralDot /></>}
            lead="Filter by category or framework. Click any card to see install instructions."
          />

          <div style={{ marginBottom: "16px" }}>
            <input
              type="text"
              value={filters.query}
              onChange={(e) => updateFilters({ query: e.target.value })}
              placeholder="Search skills..."
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

          <FilterBar
            categories={categories}
            frameworks={frameworks}
            activeCategory={filters.category ?? undefined}
            activeFramework={filters.framework ?? undefined}
            onCategoryChange={(cat) => updateFilters({ category: cat as PackCategory | null })}
            onFrameworkChange={(fw) => updateFilters({ framework: fw as PackFramework | null })}
          />

          <div style={{ marginBottom: "24px", fontFamily: "var(--sans)", fontSize: "12px", color: "var(--ink-faint)", letterSpacing: "0.14em", textTransform: "uppercase" }}>
            {results.length} skill{results.length !== 1 ? "s" : ""} found
          </div>

          <PackGrid packs={results} />
        </div>
      </section>
    </div>
  );
}
