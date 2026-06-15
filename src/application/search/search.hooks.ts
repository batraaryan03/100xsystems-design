"use client";

import { useState, useMemo, useCallback } from "react";
import Fuse, { type IFuseOptions } from "fuse.js";
import type { Pack } from "@/application/packs/packs.types";
import type { SearchFilters } from "./search.types";

const defaultFilters: SearchFilters = {
  query: "",
  category: null,
  framework: null,
};

const fuseOptions: IFuseOptions<Pack> = {
  keys: ["title", "description", "tags"],
  threshold: 0.3,
};

export function useSearch(packs: Pack[]) {
  const [filters, setFilters] = useState<SearchFilters>(defaultFilters);

  const fuse = useMemo(() => new Fuse(packs, fuseOptions), [packs]);

  const filteredPacks = useMemo(() => {
    let results = packs;

    if (filters.query) {
      const fuseResults = fuse.search(filters.query);
      results = fuseResults.map((r) => r.item);
    }

    if (filters.category) {
      results = results.filter((p) => p.category === filters.category);
    }

    if (filters.framework) {
      results = results.filter((p) => p.framework === filters.framework);
    }

    return results;
  }, [packs, fuse, filters]);

  const updateFilters = useCallback((updates: Partial<SearchFilters>) => {
    setFilters((prev) => ({ ...prev, ...updates }));
  }, []);

  const resetFilters = useCallback(() => {
    setFilters(defaultFilters);
  }, []);

  return {
    results: filteredPacks,
    filters,
    total: packs.length,
    filteredCount: filteredPacks.length,
    updateFilters,
    resetFilters,
  };
}
