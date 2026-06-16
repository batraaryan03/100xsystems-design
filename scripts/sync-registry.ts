/**
 * sync-registry.ts
 *
 * Reads public/registry/data.json and generates registry.json
 * in the shadcn registry format. Run this after modifying data.json
 * to keep the CLI registry in sync.
 *
 * Usage: npx tsx scripts/sync-registry.ts
 */

import fs from "fs";
import path from "path";

const DATA_JSON_PATH = path.join(__dirname, "../public/registry/data.json");
const REGISTRY_JSON_PATH = path.join(__dirname, "../registry.json");

interface DataJsonFile {
  path: string;
  type: string;
}

interface DataJsonPack {
  id: string;
  slug: string;
  title: string;
  description: string;
  tags: string[];
  framework: string;
  category: string;
  assetType?: string;
  files: DataJsonFile[];
  dependencies: string[];
  author?: { name: string };
}

interface DataJson {
  packs: DataJsonPack[];
  collections: unknown[];
}

interface RegistryFile {
  path: string;
  type: string;
  target?: string;
}

interface RegistryItem {
  name: string;
  type: string;
  title: string;
  author: string;
  description: string;
  meta: { category: string; tags: string[] };
  dependencies?: string[];
  files: RegistryFile[];
}

interface RegistryJson {
  $schema: string;
  name: string;
  homepage: string;
  items: RegistryItem[];
}

/** Map file path to shadcn registry file type */
function mapFileType(filePath: string): string {
  if (filePath.endsWith(".tsx") || filePath.endsWith(".jsx")) return "registry:component";
  return "registry:file";
}

/** Generate target path for a file based on framework and filename */
function getTarget(framework: string, filePath: string): string {
  if (framework === "react" && filePath.endsWith(".tsx")) {
    return `~/components/${filePath}`;
  }
  if (framework === "asset") {
    // Assets get placed in a dedicated assets folder
    return `~/assets/${filePath}`;
  }
  return `~/${filePath}`;
}

/** Convert a data.json pack to a shadcn registry item */
function packToRegistryItem(pack: DataJsonPack): RegistryItem {
  const files: RegistryFile[] = pack.files.map((f) => ({
    path: `public/registry/packs/${pack.slug}/${f.path}`,
    type: mapFileType(f.path),
    target: getTarget(pack.framework, f.path),
  }));

  const item: RegistryItem = {
    name: pack.slug,
    type: "registry:block",
    title: pack.title,
    author: pack.author?.name || "100X Systems",
    description: pack.description,
    meta: {
      category: pack.category,
      tags: pack.tags,
    },
    files,
  };

  if (pack.dependencies.length > 0) {
    item.dependencies = pack.dependencies;
  }

  return item;
}

function main() {
  // Read data.json
  const dataRaw = fs.readFileSync(DATA_JSON_PATH, "utf-8");
  const data: DataJson = JSON.parse(dataRaw);

  // Build registry.json
  const registry: RegistryJson = {
    $schema: "https://ui.shadcn.com/schema/registry.json",
    name: "design-skills",
    homepage: "https://github.com/batraaryan03/100xsystems-design",
    // NOTE: Update this URL if the repository is moved or renamed
    items: data.packs.map(packToRegistryItem),
  };

  // Write registry.json
  fs.writeFileSync(REGISTRY_JSON_PATH, JSON.stringify(registry, null, 2) + "\n");

  console.log(`✅ Synced ${registry.items.length} items from data.json to registry.json`);
  for (const item of registry.items) {
    console.log(`   - ${item.name} (${item.files.length} file${item.files.length > 1 ? "s" : ""})`);
  }
}

main();
