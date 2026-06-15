const REGISTRY_BASE = "https://raw.githubusercontent.com/100xsystems/design-skills/main/public/registry";

async function fetchRegistry() {
  const res = await fetch(`${REGISTRY_BASE}/data.json`);
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
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed to fetch ${filePath}: ${res.status}`);
  return res.text();
}

module.exports = { fetchRegistry, getPackBySlug, getAllPacks, fetchPackFile };
