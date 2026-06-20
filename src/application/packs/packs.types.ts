export type PackFramework = "html" | "react" | "nextjs" | "vue" | "asset";

export type PackCategory = "landing" | "saas" | "portfolio" | "dashboard" | "agency" | "3d";

export type PackAssetType = "component" | "illustration" | "image" | "video";

export type PackFile = {
  path: string;
  content?: string;
  type: "component" | "style" | "config" | "asset";
};

export type PackAsset = {
  name: string;
  path: string;
  format: string;
  width?: number;
  height?: number;
  size?: string;
  source?: string;
  license?: string;
};

export type PackAttribution = {
  source: string;
  url: string;
  license: string;
  author?: string;
};

export type PackAuthor = {
  name: string;
  url?: string;
  github?: string;
};

/**
 * Given a pack, returns the correct skill category route prefix.
 * Used to build links like /skills/websites/[slug] or /skills/illustrations/[slug].
 */
export function getPackSkillRoute(pack: Pack): string {
  if (pack.assetType === "illustration") return "illustrations";
  if (pack.assetType === "image") return "images";
  if (pack.assetType === "video") return "videos";
  return "websites";
}

export type Pack = {
  id: string;
  slug: string;
  title: string;
  description: string;
  tags: string[];
  framework: PackFramework;
  category: PackCategory;
  assetType?: PackAssetType;
  screenshots: string[];
  files: PackFile[];
  assets?: PackAsset[];
  dependencies: string[];
  installCommand: string;
  license: string;
  author: PackAuthor;
  attribution?: PackAttribution[];
  featured: boolean;
  createdAt: string;
  thumbnail?: string;
  htmlContent?: string;
  sourceUrl?: string;
  githubUrl?: string;
  itemCount?: number;
};

export type Collection = {
  id: string;
  slug: string;
  title: string;
  description: string;
  packSlugs: string[];
};
