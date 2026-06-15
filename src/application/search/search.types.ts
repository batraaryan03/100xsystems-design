import type { Pack, PackCategory, PackFramework } from "@/application/packs/packs.types";

export type SearchFilters = {
  query: string;
  category: PackCategory | null;
  framework: PackFramework | null;
};

export type SearchResult = {
  packs: Pack[];
  total: number;
  filteredCount: number;
};
