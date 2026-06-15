"use client";

import { useSearchParams } from "next/navigation";
import { useCallback, useEffect } from "react";
import { PageHeader } from "@/presentation/_components/components.layout";
import {
  PackGrid,
  SearchBar,
  FilterBar,
} from "@/presentation/_components/components.composite";
import { containerStyles } from "@/presentation/_styles/components.styles";
import { usePacks } from "@/application/packs/packs.hooks";
import { useSearch } from "@/application/search/search.hooks";
import type { PackCategory, PackFramework } from "@/application/packs/packs.types";

export default function PacksFeature() {
  const { packs, categories, frameworks } = usePacks();
  const { results, filters, filteredCount, updateFilters } = useSearch(packs);
  const searchParams = useSearchParams();

  useEffect(() => {
    const category = searchParams.get("category") as PackCategory | null;
    const framework = searchParams.get("framework") as PackFramework | null;
    const query = searchParams.get("q");

    if (category && categories.includes(category)) {
      updateFilters({ category });
    }
    if (framework && frameworks.includes(framework)) {
      updateFilters({ framework });
    }
    if (query) {
      updateFilters({ query });
    }
  }, [searchParams, categories, frameworks, updateFilters]);

  const handleSearch = useCallback(
    (query: string) => updateFilters({ query }),
    [updateFilters]
  );

  const handleCategoryChange = useCallback(
    (category: PackCategory | null) => updateFilters({ category }),
    [updateFilters]
  );

  const handleFrameworkChange = useCallback(
    (framework: PackFramework | null) => updateFilters({ framework }),
    [updateFilters]
  );

  return (
    <div className="flex flex-col">
      <PageHeader
        title="Packs"
        description="Browse curated open-source website designs"
      />

      <div className={containerStyles.root}>
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <SearchBar
              value={filters.query}
              onChange={handleSearch}
              placeholder="Search packs by name, description, or tag..."
              className="w-full sm:max-w-sm"
            />
            <p className="text-sm text-muted-foreground">
              {filteredCount === packs.length
                ? `${packs.length} packs`
                : `${filteredCount} of ${packs.length} packs`}
            </p>
          </div>

          <FilterBar
            categories={categories}
            frameworks={frameworks}
            activeCategory={filters.category}
            activeFramework={filters.framework}
            onCategoryChange={handleCategoryChange}
            onFrameworkChange={handleFrameworkChange}
          />

          {results.length === 0 ? (
            <div className="py-16 text-center">
              <p className="text-lg text-muted-foreground">
                No packs found matching your filters.
              </p>
              <p className="mt-2 text-sm text-muted-foreground">
                Try adjusting your search or filters.
              </p>
            </div>
          ) : (
            <PackGrid packs={results} />
          )}
        </div>
      </div>
    </div>
  );
}
