# designx MVP Design Spec

## [S1] Product Identity

**designx** — "The shadcn/ui registry for complete website designs."

**Domain:** design.100xsystems.dev  
**Tagline:** "Find beautiful websites. Install them as code. Own them locally."

**What it IS:**
- A curated registry of open-source website designs
- Each design is a "pack" installable via CLI or copy-paste
- Website is the discovery/browse interface
- CLI (phase 2) handles installation

**What it IS NOT:**
- An AI website builder
- A scraping tool
- A design generation tool
- A component library (it's a website library)

## [S2] Architecture Overview

Following Clean Architecture rules. The 3-folder structure under `src/`:

```
src/
├── app/                    ← Next.js App Router (routes, layouts, pages)
├── application/            ← Business logic (hooks, services, types)
├── infrastructure/         ← External adapters (registry data, search)
├── presentation/           ← UI layer
│   ├── _styles/            ← components.styles.ts (ONE file)
│   ├── _components/        ← atomic.ts, composite.ts, layout.ts
│   └── features/           ← home/, packs/, collections/, about/
```

**Registry data lives outside `src/`:**

```
registry/
├── packs/
│   ├── linear-pack/
│   │   ├── manifest.json
│   │   ├── files/          ← actual React/Next.js code
│   │   ├── screenshots/
│   │   └── docs/
│   ├── raycast-pack/
│   └── ...
├── collections/
│   └── modern-saas.json
└── index.ts                ← exports all pack metadata
```

**Dependency flow:**  
`app/ → presentation/ → application/ → infrastructure/`  
Never upward.

## [S3] Pages & Routes

| Route | Purpose |
|-------|---------|
| `/` | Homepage — hero, featured packs, categories |
| `/packs` | Browse all packs — grid with filters |
| `/packs/[slug]` | Pack detail — preview, install, docs, source |
| `/collections` | Curated collections of packs |
| `/about` | About page |

**Pack detail page** is the core — mirrors shadcn component detail:
- Screenshot/preview
- CLI command (copy button)
- Manual install steps
- File tree
- Dependencies
- Source link + license
- Attribution

## [S4] Pack Data Model

Each pack is a directory in `registry/packs/`:

```typescript
type Pack = {
  id: string;
  slug: string;
  title: string;
  description: string;
  tags: string[];
  framework: "nextjs" | "react" | "threejs" | "vue";
  category: "landing" | "saas" | "portfolio" | "dashboard" | "agency" | "3d";
  screenshots: string[];
  files: PackFile[];
  dependencies: string[];
  installCommand: string;
  sourceUrl: string;
  githubUrl: string;
  license: string;
  author: {
    name: string;
    url?: string;
    github?: string;
  };
  featured: boolean;
  createdAt: string;
};

type PackFile = {
  path: string;
  content: string;
  type: "component" | "style" | "config" | "asset";
};
```

**manifest.json** per pack contains this data.  
**index.ts** aggregates all manifests for the registry.

## [S5] Tech Stack & UI

**Stack (100% free):**
- Next.js 16 (App Router)
- React 19
- TypeScript
- Tailwind CSS v4
- shadcn/ui (for UI primitives)
- Fuse.js (client-side search)
- Framer Motion (animations)
- Lucide icons

**Design language:**
- Dark theme (matches 100xsystems brand)
- Minimal, content-first
- Grid layout for pack browsing
- Code blocks with syntax highlighting for install commands
- Responsive (mobile-first)

**Key UI patterns:**
- Pack cards: thumbnail + title + tags + framework badge
- Pack detail: split view (preview left, install right)
- Search: instant filter with tag chips
- Categories: horizontal scrollable pills

## [S6] Content Strategy & Submission Flow

**MVP content approach:**
- Seed with 5-8 curated open-source packs
- Manual curation — no scraping yet
- Each pack must have: MIT/Apache license, working preview, clean code

**Initial pack candidates:**
1. Linear landing page clone (Next.js)
2. Raycast landing page (React)
3. Stripe pricing section (React)
4. Framer motion portfolio (Three.js/R3F)
5. Vercel dashboard (Next.js)
6. Aceternity UI landing (React)
7. A dark SaaS template
8. A minimal agency site

**Submission flow (via GitHub PR):**
1. Fork the registry repo
2. Add pack directory with manifest.json + files
3. Submit PR
4. Admin reviews (license, quality, attribution)
5. Merge → pack appears on site

**No admin dashboard in MVP.** PRs are the admin interface.

## [S7] Implementation Phases

**Phase 1 (Now — MVP Website):**
- Scaffold Next.js project with clean architecture
- Build registry data layer (static packs)
- Build 5 pages (home, packs, pack detail, collections, about)
- Seed with 5-8 curated packs
- Search + filtering
- Deploy to Vercel

**Phase 2 (After MVP validates):**
- CLI tool (`npx designx add pack-name`)
- GitHub bot for submissions
- Pack preview/iframe
- Collections feature

**Success criteria for MVP:**
- Website loads in <2s
- 5+ packs browsable
- Search works
- Pack detail shows install instructions
- Responsive on mobile
- Deployed to design.100xsystems.dev
