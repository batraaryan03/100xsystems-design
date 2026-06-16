"use client";

import { useState, useEffect, useMemo } from "react";
import { RegistryService } from "@/infrastructure/registry/registry.service";
import type { Pack, PackCategory, PackFramework, PackAssetType, Collection } from "./packs.types";

export function usePacks(): {
  packs: Pack[];
  featured: Pack[];
  categories: PackCategory[];
  frameworks: PackFramework[];
  assetTypes: PackAssetType[];
  loading: boolean;
} {
  const [packs, setPacks] = useState<Pack[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    RegistryService.getAllPacks().then((data) => {
      if (!cancelled) {
        setPacks(data);
        setLoading(false);
      }
    });
    return () => { cancelled = true; };
  }, []);

  const featured = useMemo(() => packs.filter((p) => p.featured), [packs]);
  const categories = useMemo(
    () => [...new Set(packs.map((p) => p.category))] as PackCategory[],
    [packs]
  );
  const frameworks = useMemo(
    () => [...new Set(packs.map((p) => p.framework))] as PackFramework[],
    [packs]
  );
  const assetTypes = useMemo(
    () => [...new Set(packs.filter((p) => p.assetType).map((p) => p.assetType!))] as PackAssetType[],
    [packs]
  );

  return { packs, featured, categories, frameworks, assetTypes, loading };
}

export function usePack(slug: string): {
  pack: Pack | undefined;
  loading: boolean;
} {
  const [pack, setPack] = useState<Pack | undefined>(undefined);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    RegistryService.getPackBySlug(slug).then((data) => {
      if (!cancelled) {
        setPack(data);
        setLoading(false);
      }
    });
    return () => { cancelled = true; };
  }, [slug]);

  return { pack, loading };
}

export function usePacksByCategory(category: PackCategory): {
  packs: Pack[];
  loading: boolean;
} {
  const [packs, setPacks] = useState<Pack[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    RegistryService.getPacksByCategory(category).then((data) => {
      if (!cancelled) {
        setPacks(data);
        setLoading(false);
      }
    });
    return () => { cancelled = true; };
  }, [category]);

  return { packs, loading };
}

export function usePacksByFramework(framework: PackFramework): {
  packs: Pack[];
  loading: boolean;
} {
  const [packs, setPacks] = useState<Pack[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    RegistryService.getPacksByFramework(framework).then((data) => {
      if (!cancelled) {
        setPacks(data);
        setLoading(false);
      }
    });
    return () => { cancelled = true; };
  }, [framework]);

  return { packs, loading };
}

export function usePacksByAssetType(assetType: PackAssetType): {
  packs: Pack[];
  loading: boolean;
} {
  const [packs, setPacks] = useState<Pack[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    RegistryService.getPacksByAssetType(assetType).then((data) => {
      if (!cancelled) {
        setPacks(data);
        setLoading(false);
      }
    });
    return () => { cancelled = true; };
  }, [assetType]);

  return { packs, loading };
}

export type CollectionWithPacks = Collection & { packs: Pack[] };

export function useCollections(): {
  collections: CollectionWithPacks[];
  loading: boolean;
} {
  const [collections, setCollections] = useState<CollectionWithPacks[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const all = await RegistryService.getAllCollections();
      const enriched = await Promise.all(
        all.map(async (collection) => ({
          ...collection,
          packs: await RegistryService.getPacksForCollection(collection.slug),
        }))
      );
      if (!cancelled) {
        setCollections(enriched);
        setLoading(false);
      }
    })();
    return () => { cancelled = true; };
  }, []);

  return { collections, loading };
}
