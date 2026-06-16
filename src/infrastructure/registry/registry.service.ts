import type { Pack, PackFramework, PackCategory, PackAssetType, Collection } from "@/application/packs/packs.types";

type RegistryData = {
  packs: Pack[];
  collections: Collection[];
};

export class RegistryService {
  private static data: RegistryData | null = null;

  private static async load(): Promise<RegistryData> {
    if (this.data) return this.data;
    const res = await fetch("/registry/data.json");
    if (!res.ok) throw new Error("Failed to load registry data");
    this.data = await res.json();
    return this.data!;
  }

  static async getAllPacks(): Promise<Pack[]> {
    const data = await this.load();
    return data.packs;
  }

  static async getPackBySlug(slug: string): Promise<Pack | undefined> {
    const data = await this.load();
    return data.packs.find((p) => p.slug === slug);
  }

  static async getPacksByCategory(category: PackCategory): Promise<Pack[]> {
    const data = await this.load();
    return data.packs.filter((p) => p.category === category);
  }

  static async getPacksByFramework(framework: PackFramework): Promise<Pack[]> {
    const data = await this.load();
    return data.packs.filter((p) => p.framework === framework);
  }

  static async getPacksByAssetType(assetType: PackAssetType): Promise<Pack[]> {
    const data = await this.load();
    return data.packs.filter((p) => p.assetType === assetType);
  }

  static async getFeaturedPacks(): Promise<Pack[]> {
    const data = await this.load();
    return data.packs.filter((p) => p.featured);
  }

  static async searchPacks(query: string): Promise<Pack[]> {
    const data = await this.load();
    const lower = query.toLowerCase();
    return data.packs.filter(
      (p) =>
        p.title.toLowerCase().includes(lower) ||
        p.description.toLowerCase().includes(lower) ||
        p.tags.some((t) => t.toLowerCase().includes(lower))
    );
  }

  static async getAllCollections(): Promise<Collection[]> {
    const data = await this.load();
    return data.collections;
  }

  static async getCollectionBySlug(slug: string): Promise<Collection | undefined> {
    const data = await this.load();
    return data.collections.find((c) => c.slug === slug);
  }

  static async getPacksForCollection(collectionSlug: string): Promise<Pack[]> {
    const data = await this.load();
    const collection = data.collections.find((c) => c.slug === collectionSlug);
    if (!collection) return [];
    return data.packs.filter((p) => collection.packSlugs.includes(p.slug));
  }
}
