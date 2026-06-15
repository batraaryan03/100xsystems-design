"use client";

import { useMemo } from "react";
import { RegistryService } from "@/infrastructure/registry/registry.service";
import type { Pack, PackCategory, PackFramework, Collection } from "./packs.types";

export function usePacks(): {
  packs: Pack[];
  featured: Pack[];
  categories: PackCategory[];
  frameworks: PackFramework[];
} {
  const packs = useMemo(() => RegistryService.getAllPacks(), []);
  const featured = useMemo(() => RegistryService.getFeaturedPacks(), []);
  const categories = useMemo(
    () => [...new Set(packs.map((p) => p.category))],
    [packs]
  );
  const frameworks = useMemo(
    () => [...new Set(packs.map((p) => p.framework))],
    [packs]
  );

  return { packs, featured, categories, frameworks };
}

export function usePack(slug: string): Pack | undefined {
  return useMemo(() => RegistryService.getPackBySlug(slug), [slug]);
}

export function usePacksByCategory(category: PackCategory): Pack[] {
  return useMemo(
    () => RegistryService.getPacksByCategory(category),
    [category]
  );
}

export function usePacksByFramework(framework: PackFramework): Pack[] {
  return useMemo(
    () => RegistryService.getPacksByFramework(framework),
    [framework]
  );
}

export type CollectionWithPacks = Collection & { packs: Pack[] };

export function useCollections(): { collections: CollectionWithPacks[] } {
  const collections = useMemo(() => {
    const all = RegistryService.getAllCollections();
    return all.map((collection) => ({
      ...collection,
      packs: RegistryService.getPacksForCollection(collection.slug),
    }));
  }, []);

  return { collections };
}
