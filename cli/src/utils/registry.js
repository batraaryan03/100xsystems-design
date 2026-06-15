const path = require("path");
const fs = require("fs");

const REGISTRY_BASE = process.env.DESIGN_SKILLS_REGISTRY || "https://raw.githubusercontent.com/100xsystems/design-skills/main/public/registry";

async function fetchRegistry() {
  // Support local file path (for development)
  if (REGISTRY_BASE.startsWith("/")) {
    const content = fs.readFileSync(REGISTRY_BASE, "utf-8");
    return JSON.parse(content);
  }
  const res = await fetch(REGISTRY_BASE);
  if (!res.ok) throw new Error(`Failed to fetch registry: ${res.status}`);
  return res.json();
}

async function getPackBySlug(slug) {
  const data = await fetchRegistry();
  return data.packs.find((p) => p.slug === slug);
}

async function getAllPacks() {
  const data = await fetchRegistry();
  return data.packs;
}

async function fetchPackFile(slug, filePath) {
  const url = `${REGISTRY_BASE}/packs/${slug}/${filePath}`;
  // Support local file path (for development)
  if (REGISTRY_BASE.startsWith("/")) {
    const localPath = path.join(path.dirname(REGISTRY_BASE), "packs", slug, filePath);
    return fs.readFileSync(localPath, "utf-8");
  }
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed to fetch ${filePath}: ${res.status}`);
  return res.text();
}

module.exports = { fetchRegistry, getPackBySlug, getAllPacks, fetchPackFile };
