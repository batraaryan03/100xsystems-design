import type { Pack, Collection } from "@/application/packs/packs.types";

export const packs: Pack[] = [
  {
    id: "1",
    slug: "minimal-saas",
    title: "Minimal SaaS",
    description: "A clean, minimal SaaS landing page with modern design",
    tags: ["minimal", "saas", "landing", "modern"],
    framework: "nextjs",
    category: "saas",
    screenshots: ["/screenshots/minimal-saas.png"],
    files: [],
    dependencies: ["next", "react", "tailwindcss"],
    installCommand: "npx create-next-app@latest --tailwind",
    sourceUrl: "https://github.com/example/minimal-saas",
    githubUrl: "https://github.com/example/minimal-saas",
    license: "MIT",
    author: { name: "DesignX Team" },
    featured: true,
    createdAt: "2024-01-15",
  },
  {
    id: "2",
    slug: "portfolio-dark",
    title: "Dark Portfolio",
    description: "A dark-themed portfolio template for developers",
    tags: ["dark", "portfolio", "developer", "minimal"],
    framework: "react",
    category: "portfolio",
    screenshots: ["/screenshots/portfolio-dark.png"],
    files: [],
    dependencies: ["react", "vite", "tailwindcss"],
    installCommand: "npm create vite@latest --template react",
    sourceUrl: "https://github.com/example/portfolio-dark",
    githubUrl: "https://github.com/example/portfolio-dark",
    license: "MIT",
    author: { name: "DesignX Team" },
    featured: false,
    createdAt: "2024-02-10",
  },
];

export const collections: Collection[] = [
  {
    id: "1",
    slug: "modern-landing",
    title: "Modern Landing Pages",
    description: "A collection of modern landing page designs",
    packSlugs: ["minimal-saas"],
  },
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
