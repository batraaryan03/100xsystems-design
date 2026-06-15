export type PackFramework = "html" | "react" | "nextjs" | "vue";

export type PackCategory = "landing" | "saas" | "portfolio" | "dashboard" | "agency" | "3d";

export type PackFile = {
  path: string;
  content: string;
  type: "component" | "style" | "config" | "asset";
};

export type PackAuthor = {
  name: string;
  url?: string;
  github?: string;
};

export type Pack = {
  id: string;
  slug: string;
  title: string;
  description: string;
  tags: string[];
  framework: PackFramework;
  category: PackCategory;
  screenshots: string[];
  files: PackFile[];
  dependencies: string[];
  installCommand: string;
  sourceUrl: string;
  githubUrl: string;
  license: string;
  author: PackAuthor;
  featured: boolean;
  createdAt: string;
  htmlContent?: string;
  thumbnail?: string;
};

export type Collection = {
  id: string;
  slug: string;
  title: string;
  description: string;
  packSlugs: string[];
};
