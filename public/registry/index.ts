import type { Pack, Collection } from "@/application/packs/packs.types";

import openDesignLandingHtml from "./packs/open-design-landing-html/manifest.json";
import openDesignLandingSplit from "./packs/open-design-landing-split/manifest.json";
import openDesignLandingReact from "./packs/open-design-landing-react/manifest.json";

export const packs: Pack[] = [
  openDesignLandingHtml as Pack,
  openDesignLandingSplit as Pack,
  openDesignLandingReact as Pack,
];

export const collections: Collection[] = [];

export function getPackBySlug(slug: string): Pack | undefined {
  return packs.find((p) => p.slug === slug);
}

export function getPacksByCategory(category: Pack["category"]): Pack[] {
  return packs.filter((p) => p.category === category);
}

export function getPacksByFramework(framework: Pack["framework"]): Pack[] {
  return packs.filter((p) => p.framework === framework);
}

export function getFeaturedPacks(): Pack[] {
  return packs.filter((p) => p.featured);
}

export function getCollectionBySlug(slug: string): Collection | undefined {
  return collections.find((c) => c.slug === slug);
}

export function getPacksForCollection(collectionSlug: string): Pack[] {
  const collection = getCollectionBySlug(collectionSlug);
  if (!collection) return [];
  return packs.filter((p) => collection.packSlugs.includes(p.slug));
}
