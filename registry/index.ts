import type { Pack, Collection } from "@/application/packs/packs.types";

import linearPack from "./packs/linear-pack/manifest.json";
import raycastPack from "./packs/raycast-pack/manifest.json";
import stripePack from "./packs/stripe-pack/manifest.json";
import framerPack from "./packs/framer-pack/manifest.json";
import vercelPack from "./packs/vercel-pack/manifest.json";
import aceternityPack from "./packs/aceternity-pack/manifest.json";
import saasDark from "./packs/saas-dark/manifest.json";
import agencyMinimal from "./packs/agency-minimal/manifest.json";
import modernSaas from "./collections/modern-saas.json";

export const packs: Pack[] = [
  linearPack as Pack,
  raycastPack as Pack,
  stripePack as Pack,
  framerPack as Pack,
  vercelPack as Pack,
  aceternityPack as Pack,
  saasDark as Pack,
  agencyMinimal as Pack,
];

export const collections: Collection[] = [
  modernSaas as Collection,
];

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