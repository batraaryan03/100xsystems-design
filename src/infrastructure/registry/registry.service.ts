import type { Pack, PackFramework, PackCategory } from "@/application/packs/packs.types";
import {
  packs,
  collections,
  getPackBySlug,
  getPacksByCategory,
  getPacksByFramework,
  getFeaturedPacks,
  getCollectionBySlug,
  getPacksForCollection,
} from "../../../registry";

export class RegistryService {
  static getAllPacks(): Pack[] {
    return packs;
  }

  static getPackBySlug(slug: string): Pack | undefined {
    return getPackBySlug(slug);
  }

  static getPacksByCategory(category: PackCategory): Pack[] {
    return getPacksByCategory(category);
  }

  static getPacksByFramework(framework: PackFramework): Pack[] {
    return getPacksByFramework(framework);
  }

  static getFeaturedPacks(): Pack[] {
    return getFeaturedPacks();
  }

  static searchPacks(query: string): Pack[] {
    const lower = query.toLowerCase();
    return packs.filter(
      (p) =>
        p.title.toLowerCase().includes(lower) ||
        p.description.toLowerCase().includes(lower) ||
        p.tags.some((t) => t.toLowerCase().includes(lower))
    );
  }

  static getAllCollections() {
    return collections;
  }

  static getCollectionBySlug(slug: string) {
    return getCollectionBySlug(slug);
  }

  static getPacksForCollection(collectionSlug: string): Pack[] {
    return getPacksForCollection(collectionSlug);
  }
}
