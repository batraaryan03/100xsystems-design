# designx MVP Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use compose:subagent (recommended) or compose:execute to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a curated registry website for open-source website designs, following shadcn/ui patterns — browse packs, view install instructions, copy-paste code.

**Architecture:** Next.js 16 App Router with Clean Architecture (application/infrastructure/presentation). Registry data lives as static TypeScript files. No database. Git = database.

**Tech Stack:** Next.js 16, React 19, TypeScript, Tailwind CSS v4, shadcn/ui, Fuse.js, Framer Motion, Lucide icons

---

## File Structure

```
designx/
├── registry/
│   ├── packs/
│   │   ├── linear-pack/
│   │   │   ├── manifest.json
│   │   │   ├── files/
│   │   │   ├── screenshots/
│   │   │   └── docs/
│   │   └── ... (5-8 packs)
│   ├── collections/
│   │   └── modern-saas.json
│   └── index.ts
├── src/
│   ├── app/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   ├── globals.css
│   │   ├── packs/
│   │   │   ├── page.tsx
│   │   │   └── [slug]/page.tsx
│   │   ├── collections/
│   │   │   └── page.tsx
│   │   └── about/
│   │       └── page.tsx
│   ├── application/
│   │   ├── packs/
│   │   │   ├── packs.types.ts
│   │   │   ├── packs.hooks.ts
│   │   │   └── packs.service.ts
│   │   └── search/
│   │       ├── search.types.ts
│   │       └── search.hooks.ts
│   ├── infrastructure/
│   │   └── registry/
│   │       ├── registry.service.ts
│   │       └── registry.data.ts
│   ├── presentation/
│   │   ├── _styles/
│   │   │   └── components.styles.ts
│   │   ├── _components/
│   │   │   ├── components.atomic.ts
│   │   │   ├── components.composite.ts
│   │   │   └── components.layout.ts
│   │   └── features/
│   │       ├── home/
│   │       │   └── home.feature.tsx
│   │       ├── packs/
│   │       │   ├── packs.feature.tsx
│   │       │   └── pack-detail.feature.tsx
│   │       ├── collections/
│   │       │   └── collections.feature.tsx
│   │       └── about/
│   │           └── about.feature.tsx
│   └── shared/
│       └── utils.ts
├── components.json
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

---

## Task 1: Project Scaffolding

**Covers:** [S2]

**Files:**
- Create: `package.json`
- Create: `tsconfig.json`
- Create: `next.config.ts`
- Create: `tailwind.config.ts`
- Create: `src/app/globals.css`
- Create: `src/app/layout.tsx`
- Create: `src/shared/utils.ts`

- [ ] **Step 1: Initialize Next.js project**

```bash
npx create-next-app@latest designx --typescript --tailwind --eslint --app --src-dir --import-alias "@/*"
```

Select: TypeScript, Tailwind CSS, ESLint, App Router, src directory, `@/*` import alias.

- [ ] **Step 2: Install dependencies**

```bash
cd designx
npm install fuse.js framer-motion lucide-react class-variance-authority clsx tailwind-merge
npm install -D @types/node
```

- [ ] **Step 3: Configure components.json for shadcn**

Create `components.json`:

```json
{
  "$schema": "https://ui.shadcn.com/schema.json",
  "style": "base-nova",
  "rsc": true,
  "tsx": true,
  "tailwind": {
    "config": "",
    "css": "src/app/globals.css",
    "baseColor": "neutral",
    "cssVariables": true,
    "prefix": ""
  },
  "iconLibrary": "lucide",
  "aliases": {
    "components": "@/components",
    "utils": "@/lib/utils",
    "ui": "@/components/ui",
    "lib": "@/lib",
    "hooks": "@/hooks"
  }
}
```

- [ ] **Step 4: Add shadcn components**

```bash
npx shadcn@latest add button card badge input tabs separator tooltip
```

- [ ] **Step 5: Create shared utils**

Create `src/shared/utils.ts`:

```typescript
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

- [ ] **Step 6: Clean up default files**

Remove: `src/app/page.tsx` content, default Next.js boilerplate.

- [ ] **Step 7: Commit**

```bash
git init
git add .
git commit -m "feat: scaffold designx project with Next.js 16, Tailwind, shadcn"
```

---

## Task 2: Registry Types & Data Layer

**Covers:** [S4]

**Files:**
- Create: `src/application/packs/packs.types.ts`
- Create: `src/infrastructure/registry/registry.data.ts`
- Create: `src/infrastructure/registry/registry.service.ts`

- [ ] **Step 1: Define pack types**

Create `src/application/packs/packs.types.ts`:

```typescript
export type PackFramework = "nextjs" | "react" | "threejs" | "vue";

export type PackCategory = 
  | "landing" 
  | "saas" 
  | "portfolio" 
  | "dashboard" 
  | "agency" 
  | "3d";

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
};

export type Collection = {
  id: string;
  slug: string;
  title: string;
  description: string;
  packIds: string[];
};
```

- [ ] **Step 2: Create registry data directory**

```bash
mkdir -p registry/packs registry/collections
```

- [ ] **Step 3: Create registry index**

Create `registry/index.ts`:

```typescript
import { Pack, Collection } from "@/application/packs/packs.types";

// Pack manifests will be imported here
// For now, empty arrays — populated in Task 8
export const packs: Pack[] = [];
export const collections: Collection[] = [];

export function getPackBySlug(slug: string): Pack | undefined {
  return packs.find((p) => p.slug === slug);
}

export function getPacksByCategory(category: string): Pack[] {
  return packs.filter((p) => p.category === category);
}

export function getPacksByFramework(framework: string): Pack[] {
  return packs.filter((p) => p.framework === framework);
}

export function getFeaturedPacks(): Pack[] {
  return packs.filter((p) => p.featured);
}

export function getCollectionBySlug(slug: string): Collection | undefined {
  return collections.find((c) => c.slug === slug);
}

export function getPacksForCollection(collection: Collection): Pack[] {
  return collection.packIds
    .map((id) => packs.find((p) => p.id === id))
    .filter(Boolean) as Pack[];
}
```

- [ ] **Step 4: Create registry service**

Create `src/infrastructure/registry/registry.service.ts`:

```typescript
import { Pack, Collection } from "@/application/packs/packs.types";
import {
  packs as allPacks,
  collections as allCollections,
  getPackBySlug,
  getPacksByCategory,
  getPacksByFramework,
  getFeaturedPacks,
  getCollectionBySlug,
  getPacksForCollection,
} from "../../../registry/index";

export const registryService = {
  getAllPacks: (): Pack[] => allPacks,
  
  getPackBySlug: (slug: string): Pack | undefined => getPackBySlug(slug),
  
  getPacksByCategory: (category: string): Pack[] => getPacksByCategory(category),
  
  getPacksByFramework: (framework: string): Pack[] => getPacksByFramework(framework),
  
  getFeaturedPacks: (): Pack[] => getFeaturedPacks(),
  
  getAllCollections: (): Collection[] => allCollections,
  
  getCollectionBySlug: (slug: string): Collection | undefined => getCollectionBySlug(slug),
  
  getPacksForCollection: (collection: Collection): Pack[] => getPacksForCollection(collection),
};
```

- [ ] **Step 5: Commit**

```bash
git add .
git commit -m "feat: add registry types and data layer"
```

---

## Task 3: Application Hooks

**Covers:** [S4, S5]

**Files:**
- Create: `src/application/packs/packs.hooks.ts`
- Create: `src/application/search/search.types.ts`
- Create: `src/application/search/search.hooks.ts`

- [ ] **Step 1: Create packs hooks**

Create `src/application/packs/packs.hooks.ts`:

```typescript
"use client";

import { useMemo } from "react";
import { Pack, PackCategory, PackFramework } from "./packs.types";
import { registryService } from "@/infrastructure/registry/registry.service";

export function usePacks() {
  const packs = useMemo(() => registryService.getAllPacks(), []);
  
  return {
    packs,
    featured: packs.filter((p) => p.featured),
    categories: [...new Set(packs.map((p) => p.category))] as PackCategory[],
    frameworks: [...new Set(packs.map((p) => p.framework))] as PackFramework[],
  };
}

export function usePack(slug: string) {
  return useMemo(() => registryService.getPackBySlug(slug), [slug]);
}

export function usePacksByCategory(category: string) {
  return useMemo(() => registryService.getPacksByCategory(category), [category]);
}

export function usePacksByFramework(framework: string) {
  return useMemo(() => registryService.getPacksByFramework(framework), [framework]);
}
```

- [ ] **Step 2: Create search types**

Create `src/application/search/search.types.ts`:

```typescript
export type SearchFilters = {
  query: string;
  category?: string;
  framework?: string;
};

export type SearchResult = {
  item: any;
  score: number;
};
```

- [ ] **Step 3: Create search hooks**

Create `src/application/search/search.hooks.ts`:

```typescript
"use client";

import { useMemo, useState, useCallback } from "react";
import Fuse from "fuse.js";
import { Pack } from "@/application/packs/packs.types";
import { SearchFilters } from "./search.types";

const fuseOptions = {
  keys: [
    { name: "title", weight: 0.4 },
    { name: "description", weight: 0.3 },
    { name: "tags", weight: 0.2 },
    { name: "category", weight: 0.1 },
  ],
  threshold: 0.3,
  includeScore: true,
};

export function useSearch(packs: Pack[]) {
  const [filters, setFilters] = useState<SearchFilters>({
    query: "",
    category: undefined,
    framework: undefined,
  });

  const fuse = useMemo(() => new Fuse(packs, fuseOptions), [packs]);

  const results = useMemo(() => {
    let filtered = packs;

    if (filters.query) {
      const fuseResults = fuse.search(filters.query);
      filtered = fuseResults.map((r) => r.item);
    }

    if (filters.category) {
      filtered = filtered.filter((p) => p.category === filters.category);
    }

    if (filters.framework) {
      filtered = filtered.filter((p) => p.framework === filters.framework);
    }

    return filtered;
  }, [packs, filters, fuse]);

  const updateFilters = useCallback((updates: Partial<SearchFilters>) => {
    setFilters((prev) => ({ ...prev, ...updates }));
  }, []);

  const resetFilters = useCallback(() => {
    setFilters({ query: "", category: undefined, framework: undefined });
  }, []);

  return {
    filters,
    results,
    updateFilters,
    resetFilters,
  };
}
```

- [ ] **Step 4: Commit**

```bash
git add .
git commit -m "feat: add application hooks for packs and search"
```

---

## Task 4: Presentation Components

**Covers:** [S5]

**Files:**
- Create: `src/presentation/_styles/components.styles.ts`
- Create: `src/presentation/_components/components.atomic.ts`
- Create: `src/presentation/_components/components.composite.ts`
- Create: `src/presentation/_components/components.layout.ts`

- [ ] **Step 1: Create styles file**

Create `src/presentation/_styles/components.styles.ts`:

```typescript
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/shared/utils";

// Card styles
export const cardVariants = cva(
  "rounded-lg border border-neutral-800 bg-neutral-900/50 backdrop-blur-sm transition-all hover:border-neutral-700 hover:bg-neutral-900/80",
  {
    variants: {
      size: {
        sm: "p-3",
        md: "p-4",
        lg: "p-6",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
);

// Badge styles
export const badgeVariants = cva(
  "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium transition-colors",
  {
    variants: {
      variant: {
        default: "bg-neutral-800 text-neutral-300",
        primary: "bg-blue-500/10 text-blue-400 border border-blue-500/20",
        success: "bg-green-500/10 text-green-400 border border-green-500/20",
        warning: "bg-yellow-500/10 text-yellow-400 border border-yellow-500/20",
        framework: "bg-purple-500/10 text-purple-400 border border-purple-500/20",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

// Grid styles
export const gridStyles = cn(
  "grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
);

// Container styles
export const containerStyles = cn(
  "mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
);

// Section styles
export const sectionStyles = cn("py-12 md:py-16");

// Heading styles
export const headingStyles = cn(
  "text-3xl font-bold tracking-tight text-white sm:text-4xl"
);

// Subheading styles
export const subheadingStyles = cn(
  "mt-2 text-lg text-neutral-400"
);

// Code block styles
export const codeBlockStyles = cn(
  "rounded-lg bg-neutral-950 border border-neutral-800 p-4 font-mono text-sm text-neutral-300 overflow-x-auto"
);

// Copy button styles
export const copyButtonStyles = cn(
  "absolute top-2 right-2 rounded-md bg-neutral-800 p-1.5 text-neutral-400 hover:bg-neutral-700 hover:text-neutral-300 transition-colors"
);

// Tag chip styles
export const tagChipStyles = cn(
  "inline-flex items-center rounded-md bg-neutral-800/50 px-2 py-1 text-xs text-neutral-400 hover:bg-neutral-800 hover:text-neutral-300 transition-colors cursor-pointer"
);

// Active tag chip
export const tagChipActiveStyles = cn(
  "inline-flex items-center rounded-md bg-blue-500/10 px-2 py-1 text-xs text-blue-400 border border-blue-500/20 cursor-pointer"
);
```

- [ ] **Step 2: Create atomic components**

Create `src/presentation/_components/components.atomic.tsx`:

```typescript
"use client";

import { forwardRef, type ButtonHTMLAttributes } from "react";
import { cn } from "@/shared/utils";
import { cardVariants, badgeVariants, type cardVariants, type badgeVariants } from "../_styles/components.styles";
import { Copy, Check } from "lucide-react";
import { useState } from "react";

// Card
type CardProps = React.HTMLAttributes<HTMLDivElement> & 
  VariantProps<typeof cardVariants>;

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, size, ...props }, ref) => (
    <div ref={ref} className={cn(cardVariants({ size }), className)} {...props} />
  )
);
Card.displayName = "Card";

// Badge
type BadgeProps = React.HTMLAttributes<HTMLSpanElement> & 
  VariantProps<typeof badgeVariants>;

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant, ...props }, ref) => (
    <span ref={ref} className={cn(badgeVariants({ variant }), className)} {...props} />
  )
);
Badge.displayName = "Badge";

// CopyButton
export function CopyButton({ text, className }: { text: string; className?: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={handleCopy}
      className={cn(
        "rounded-md bg-neutral-800 p-1.5 text-neutral-400 hover:bg-neutral-700 hover:text-neutral-300 transition-colors",
        className
      )}
    >
      {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
    </button>
  );
}

// CodeBlock
export function CodeBlock({ code, className }: { code: string; className?: string }) {
  return (
    <div className={cn("relative rounded-lg bg-neutral-950 border border-neutral-800 p-4", className)}>
      <CopyButton text={code} className="absolute top-2 right-2" />
      <pre className="font-mono text-sm text-neutral-300 overflow-x-auto">
        <code>{code}</code>
      </pre>
    </div>
  );
}

// TagChip
export function TagChip({ 
  label, 
  active, 
  onClick 
}: { 
  label: string; 
  active?: boolean; 
  onClick?: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        active
          ? "inline-flex items-center rounded-md bg-blue-500/10 px-2 py-1 text-xs text-blue-400 border border-blue-500/20 cursor-pointer"
          : "inline-flex items-center rounded-md bg-neutral-800/50 px-2 py-1 text-xs text-neutral-400 hover:bg-neutral-800 hover:text-neutral-300 transition-colors cursor-pointer"
      )}
    >
      {label}
    </button>
  );
}
```

- [ ] **Step 3: Create composite components**

Create `src/presentation/_components/components.composite.tsx`:

```typescript
"use client";

import Link from "next/link";
import Image from "next/image";
import { Badge, Card, TagChip } from "./components.atomic";
import { Pack } from "@/application/packs/packs.types";
import { cn } from "@/shared/utils";

// PackCard
export function PackCard({ pack }: { pack: Pack }) {
  return (
    <Link href={`/packs/${pack.slug}`}>
      <Card className="group cursor-pointer overflow-hidden">
        {/* Screenshot placeholder */}
        <div className="aspect-video relative overflow-hidden rounded-t-lg bg-neutral-800">
          {pack.screenshots[0] ? (
            <Image
              src={pack.screenshots[0]}
              alt={pack.title}
              fill
              className="object-cover transition-transform group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-neutral-600">
              No preview
            </div>
          )}
        </div>
        
        {/* Content */}
        <div className="p-4">
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-semibold text-white group-hover:text-blue-400 transition-colors">
              {pack.title}
            </h3>
            <Badge variant="framework">{pack.framework}</Badge>
          </div>
          
          <p className="mt-2 line-clamp-2 text-sm text-neutral-400">
            {pack.description}
          </p>
          
          <div className="mt-3 flex flex-wrap gap-1.5">
            {pack.tags.slice(0, 3).map((tag) => (
              <TagChip key={tag} label={tag} />
            ))}
          </div>
        </div>
      </Card>
    </Link>
  );
}

// PackGrid
export function PackGrid({ packs }: { packs: Pack[] }) {
  if (packs.length === 0) {
    return (
      <div className="py-12 text-center">
        <p className="text-neutral-400">No packs found.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {packs.map((pack) => (
        <PackCard key={pack.id} pack={pack} />
      ))}
    </div>
  );
}

// SearchBar
export function SearchBar({
  value,
  onChange,
  placeholder,
}: {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}) {
  return (
    <div className="relative">
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder || "Search packs..."}
        className="w-full rounded-lg border border-neutral-800 bg-neutral-900/50 px-4 py-2.5 text-white placeholder-neutral-500 focus:border-neutral-700 focus:outline-none focus:ring-1 focus:ring-neutral-700"
      />
    </div>
  );
}

// FilterBar
export function FilterBar({
  categories,
  frameworks,
  activeCategory,
  activeFramework,
  onCategoryChange,
  onFrameworkChange,
}: {
  categories: string[];
  frameworks: string[];
  activeCategory?: string;
  activeFramework?: string;
  onCategoryChange: (category: string | undefined) => void;
  onFrameworkChange: (framework: string | undefined) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {/* Categories */}
      <div className="flex flex-wrap gap-1.5">
        <TagChip
          label="All"
          active={!activeCategory}
          onClick={() => onCategoryChange(undefined)}
        />
        {categories.map((cat) => (
          <TagChip
            key={cat}
            label={cat}
            active={activeCategory === cat}
            onClick={() => onCategoryChange(cat)}
          />
        ))}
      </div>
      
      <div className="h-6 w-px bg-neutral-800" />
      
      {/* Frameworks */}
      <div className="flex flex-wrap gap-1.5">
        {frameworks.map((fw) => (
          <TagChip
            key={fw}
            label={fw}
            active={activeFramework === fw}
            onClick={() => onFrameworkChange(fw)}
          />
        ))}
      </div>
    </div>
  );
}
```

- [ ] **Step 4: Create layout components**

Create `src/presentation/_components/components.layout.tsx`:

```typescript
"use client";

import Link from "next/link";
import { cn } from "@/shared/utils";
import { containerStyles } from "../_styles/components.styles";
import { Code2, Github, Search } from "lucide-react";

// Navbar
export function Navbar() {
  return (
    <nav className="sticky top-0 z-50 border-b border-neutral-800 bg-neutral-950/80 backdrop-blur-sm">
      <div className={cn(containerStyles, "flex h-14 items-center justify-between")}>
        <Link href="/" className="flex items-center gap-2">
          <Code2 className="h-5 w-5 text-blue-500" />
          <span className="font-bold text-white">designx</span>
        </Link>
        
        <div className="flex items-center gap-6">
          <Link href="/packs" className="text-sm text-neutral-400 hover:text-white transition-colors">
            Packs
          </Link>
          <Link href="/collections" className="text-sm text-neutral-400 hover:text-white transition-colors">
            Collections
          </Link>
          <Link href="/about" className="text-sm text-neutral-400 hover:text-white transition-colors">
            About
          </Link>
          <a
            href="https://github.com/100xsystems/designx"
            target="_blank"
            rel="noopener noreferrer"
            className="text-neutral-400 hover:text-white transition-colors"
          >
            <Github className="h-5 w-5" />
          </a>
        </div>
      </div>
    </nav>
  );
}

// Footer
export function Footer() {
  return (
    <footer className="border-t border-neutral-800 bg-neutral-950">
      <div className={cn(containerStyles, "py-8")}>
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <div className="flex items-center gap-2">
            <Code2 className="h-4 w-4 text-blue-500" />
            <span className="text-sm text-neutral-400">
              designx — The shadcn/ui for website designs
            </span>
          </div>
          <div className="flex gap-4">
            <Link href="/packs" className="text-sm text-neutral-500 hover:text-neutral-300 transition-colors">
              Packs
            </Link>
            <Link href="/about" className="text-sm text-neutral-500 hover:text-neutral-300 transition-colors">
              About
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

// PageHeader
export function PageHeader({
  title,
  description,
}: {
  title: string;
  description?: string;
}) {
  return (
    <div className="mb-8">
      <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
        {title}
      </h1>
      {description && (
        <p className="mt-2 text-lg text-neutral-400">{description}</p>
      )}
    </div>
  );
}

// Section
export function Section({
  title,
  children,
  className,
}: {
  title?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section className={cn("py-12 md:py-16", className)}>
      {title && (
        <h2 className="mb-6 text-2xl font-bold text-white">{title}</h2>
      )}
      {children}
    </section>
  );
}
```

- [ ] **Step 5: Commit**

```bash
git add .
git commit -m "feat: add presentation components (atomic, composite, layout)"
```

---

## Task 5: Home Page

**Covers:** [S3, S5]

**Files:**
- Create: `src/presentation/features/home/home.feature.tsx`
- Modify: `src/app/page.tsx`

- [ ] **Step 1: Create home feature component**

Create `src/presentation/features/home/home.feature.tsx`:

```typescript
"use client";

import Link from "next/link";
import { usePacks } from "@/application/packs/packs.hooks";
import { PackGrid } from "@/presentation/_components/components.composite";
import { Section } from "@/presentation/_components/components.layout";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, Code2, Download } from "lucide-react";

export function HomeFeature() {
  const { packs, featured, categories } = usePacks();

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden py-20 md:py-32">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-500/5 via-transparent to-transparent" />
        <div className="relative mx-auto max-w-4xl px-4 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-neutral-800 bg-neutral-900/50 px-4 py-1.5 text-sm text-neutral-400">
            <Sparkles className="h-4 w-4 text-blue-500" />
            Open source website designs
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
            shadcn/ui for{" "}
            <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              website designs
            </span>
          </h1>
          <p className="mt-6 text-lg text-neutral-400 max-w-2xl mx-auto">
            Find beautiful open-source websites. Install them as code. 
            Own them locally. Let AI consume from your codebase.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/packs">
              <Button size="lg" className="gap-2">
                Browse Packs
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <a href="https://github.com/100xsystems/designx" target="_blank" rel="noopener noreferrer">
              <Button size="lg" variant="outline" className="gap-2">
                <Code2 className="h-4 w-4" />
                View on GitHub
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* How it works */}
      <Section title="How it works">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <div className="rounded-lg border border-neutral-800 bg-neutral-900/50 p-6">
            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500/10">
              <Sparkles className="h-5 w-5 text-blue-500" />
            </div>
            <h3 className="font-semibold text-white">1. Discover</h3>
            <p className="mt-2 text-sm text-neutral-400">
              Browse curated open-source website designs. Filter by framework, category, or style.
            </p>
          </div>
          <div className="rounded-lg border border-neutral-800 bg-neutral-900/50 p-6">
            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-purple-500/10">
              <Download className="h-5 w-5 text-purple-500" />
            </div>
            <h3 className="font-semibold text-white">2. Install</h3>
            <p className="mt-2 text-sm text-neutral-400">
              Copy-paste code or use the CLI. Files go directly into your project. No lock-in.
            </p>
          </div>
          <div className="rounded-lg border border-neutral-800 bg-neutral-900/50 p-6">
            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-green-500/10">
              <Code2 className="h-5 w-5 text-green-500" />
            </div>
            <h3 className="font-semibold text-white">3. Build</h3>
            <p className="mt-2 text-sm text-neutral-400">
              AI reads the installed code. Remix, modify, and create new designs from real references.
            </p>
          </div>
        </div>
      </Section>

      {/* Featured packs */}
      {featured.length > 0 && (
        <Section title="Featured Packs">
          <PackGrid packs={featured.slice(0, 6)} />
        </Section>
      )}

      {/* Categories */}
      <Section title="Browse by Category">
        <div className="flex flex-wrap gap-3">
          {categories.map((cat) => (
            <Link
              key={cat}
              href={`/packs?category=${cat}`}
              className="rounded-lg border border-neutral-800 bg-neutral-900/50 px-4 py-2 text-sm text-neutral-300 hover:border-neutral-700 hover:text-white transition-colors"
            >
              {cat}
            </Link>
          ))}
        </div>
      </Section>
    </div>
  );
}
```

- [ ] **Step 2: Update home page**

Replace `src/app/page.tsx`:

```typescript
import { HomeFeature } from "@/presentation/features/home/home.feature";

export default function HomePage() {
  return <HomeFeature />;
}
```

- [ ] **Step 3: Update layout**

Replace `src/app/layout.tsx`:

```typescript
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar, Footer } from "@/presentation/_components/components.layout";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "designx — shadcn/ui for website designs",
  description:
    "Find beautiful open-source websites. Install them as code. Own them locally.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} bg-neutral-950 text-white antialiased`}>
        <Navbar />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
```

- [ ] **Step 4: Test the page renders**

```bash
npm run dev
```

Open http://localhost:3000 — verify hero, how-it-works, and featured packs sections render.

- [ ] **Step 5: Commit**

```bash
git add .
git commit -m "feat: add home page with hero, how-it-works, and featured packs"
```

---

## Task 6: Packs Browse Page

**Covers:** [S3, S5]

**Files:**
- Create: `src/presentation/features/packs/packs.feature.tsx`
- Modify: `src/app/packs/page.tsx`

- [ ] **Step 1: Create packs feature component**

Create `src/presentation/features/packs/packs.feature.tsx`:

```typescript
"use client";

import { usePacks } from "@/application/packs/packs.hooks";
import { useSearch } from "@/application/search/search.hooks";
import { PackGrid, SearchBar, FilterBar } from "@/presentation/_components/components.composite";
import { PageHeader } from "@/presentation/_components/components.layout";

export function PacksFeature() {
  const { packs, categories, frameworks } = usePacks();
  const { filters, results, updateFilters, resetFilters } = useSearch(packs);

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <PageHeader
        title="Packs"
        description="Browse curated open-source website designs"
      />

      {/* Search and filters */}
      <div className="mb-8 space-y-4">
        <SearchBar
          value={filters.query}
          onChange={(query) => updateFilters({ query })}
          placeholder="Search packs..."
        />
        <FilterBar
          categories={categories}
          frameworks={frameworks}
          activeCategory={filters.category}
          activeFramework={filters.framework}
          onCategoryChange={(category) => updateFilters({ category })}
          onFrameworkChange={(framework) => updateFilters({ framework })}
        />
      </div>

      {/* Results count */}
      <div className="mb-4 text-sm text-neutral-500">
        {results.length} pack{results.length !== 1 ? "s" : ""} found
      </div>

      {/* Grid */}
      <PackGrid packs={results} />
    </div>
  );
}
```

- [ ] **Step 2: Update packs page**

Replace `src/app/packs/page.tsx`:

```typescript
import { PacksFeature } from "@/presentation/features/packs/packs.feature";

export default function PacksPage() {
  return <PacksFeature />;
}
```

- [ ] **Step 3: Test the page**

Navigate to `/packs` — verify search, filters, and pack grid work.

- [ ] **Step 4: Commit**

```bash
git add .
git commit -m "feat: add packs browse page with search and filters"
```

---

## Task 7: Pack Detail Page

**Covers:** [S3, S4, S5]

**Files:**
- Create: `src/presentation/features/packs/pack-detail.feature.tsx`
- Create: `src/app/packs/[slug]/page.tsx`

- [ ] **Step 1: Create pack detail feature**

Create `src/presentation/features/packs/pack-detail.feature.tsx`:

```typescript
"use client";

import { use } from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { usePack } from "@/application/packs/packs.hooks";
import { Badge, CodeBlock, TagChip } from "@/presentation/_components/components.atomic";
import { PageHeader } from "@/presentation/_components/components.layout";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ExternalLink, Github, Download } from "lucide-react";

export function PackDetailFeature({ slug }: { slug: string }) {
  const pack = usePack(slug);

  if (!pack) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      {/* Back link */}
      <Link
        href="/packs"
        className="mb-6 inline-flex items-center gap-1 text-sm text-neutral-400 hover:text-white transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to packs
      </Link>

      {/* Header */}
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-bold text-white">{pack.title}</h1>
            <Badge variant="framework">{pack.framework}</Badge>
            <Badge variant="default">{pack.category}</Badge>
          </div>
          <p className="mt-2 max-w-2xl text-neutral-400">{pack.description}</p>
        </div>
        <div className="flex gap-2">
          <a href={pack.sourceUrl} target="_blank" rel="noopener noreferrer">
            <Button variant="outline" size="sm" className="gap-2">
              <ExternalLink className="h-4 w-4" />
              Source
            </Button>
          </a>
          <a href={pack.githubUrl} target="_blank" rel="noopener noreferrer">
            <Button variant="outline" size="sm" className="gap-2">
              <Github className="h-4 w-4" />
              GitHub
            </Button>
          </a>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* Preview */}
        <div className="lg:col-span-2">
          <div className="aspect-video relative overflow-hidden rounded-lg border border-neutral-800 bg-neutral-900">
            {pack.screenshots[0] ? (
              <Image
                src={pack.screenshots[0]}
                alt={pack.title}
                fill
                className="object-cover"
              />
            ) : (
              <div className="flex h-full items-center justify-center text-neutral-600">
                No preview available
              </div>
            )}
          </div>

          {/* Tags */}
          <div className="mt-4 flex flex-wrap gap-2">
            {pack.tags.map((tag) => (
              <TagChip key={tag} label={tag} />
            ))}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Install command */}
          <div className="rounded-lg border border-neutral-800 bg-neutral-900/50 p-4">
            <h3 className="mb-2 text-sm font-medium text-neutral-300">
              Install with CLI
            </h3>
            <CodeBlock code={pack.installCommand} />
          </div>

          {/* Manual install */}
          <div className="rounded-lg border border-neutral-800 bg-neutral-900/50 p-4">
            <h3 className="mb-2 text-sm font-medium text-neutral-300">
              Manual Installation
            </h3>
            <ol className="space-y-2 text-sm text-neutral-400">
              <li>1. Copy the files into your project</li>
              <li>2. Install dependencies:</li>
            </ol>
            <CodeBlock
              code={`npm install ${pack.dependencies.join(" ")}`}
              className="mt-2"
            />
          </div>

          {/* Dependencies */}
          <div className="rounded-lg border border-neutral-800 bg-neutral-900/50 p-4">
            <h3 className="mb-2 text-sm font-medium text-neutral-300">
              Dependencies
            </h3>
            <div className="flex flex-wrap gap-1.5">
              {pack.dependencies.map((dep) => (
                <Badge key={dep} variant="default">
                  {dep}
                </Badge>
              ))}
            </div>
          </div>

          {/* License */}
          <div className="rounded-lg border border-neutral-800 bg-neutral-900/50 p-4">
            <h3 className="mb-2 text-sm font-medium text-neutral-300">License</h3>
            <p className="text-sm text-neutral-400">{pack.license}</p>
          </div>

          {/* Attribution */}
          <div className="rounded-lg border border-neutral-800 bg-neutral-900/50 p-4">
            <h3 className="mb-2 text-sm font-medium text-neutral-300">
              Attribution
            </h3>
            <p className="text-sm text-neutral-400">
              Created by{" "}
              {pack.author.url ? (
                <a
                  href={pack.author.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:underline"
                >
                  {pack.author.name}
                </a>
              ) : (
                pack.author.name
              )}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Create pack detail page**

Create `src/app/packs/[slug]/page.tsx`:

```typescript
import { PackDetailFeature } from "@/presentation/features/packs/pack-detail.feature";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export default async function PackDetailPage({ params }: PageProps) {
  const { slug } = await params;
  return <PackDetailFeature slug={slug} />;
}
```

- [ ] **Step 3: Test the page**

Navigate to `/packs/[some-slug]` — verify preview, install command, manual install, dependencies, and attribution render.

- [ ] **Step 4: Commit**

```bash
git add .
git commit -m "feat: add pack detail page with install instructions"
```

---

## Task 8: Collections Page

**Covers:** [S3, S5]

**Files:**
- Create: `src/presentation/features/collections/collections.feature.tsx`
- Create: `src/app/collections/page.tsx`

- [ ] **Step 1: Create collections feature**

Create `src/presentation/features/collections/collections.feature.tsx`:

```typescript
"use client";

import { usePacks } from "@/application/packs/packs.hooks";
import { registryService } from "@/infrastructure/registry/registry.service";
import { PackGrid } from "@/presentation/_components/components.composite";
import { PageHeader, Section } from "@/presentation/_components/components.layout";
import { useMemo } from "react";

export function CollectionsFeature() {
  const { packs } = usePacks();
  const collections = useMemo(() => registryService.getAllCollections(), []);

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <PageHeader
        title="Collections"
        description="Curated groups of packs for specific use cases"
      />

      {collections.length === 0 ? (
        <div className="py-12 text-center">
          <p className="text-neutral-400">
            No collections yet. Create one by combining packs!
          </p>
        </div>
      ) : (
        collections.map((collection) => {
          const collectionPacks = registryService.getPacksForCollection(collection);
          return (
            <Section key={collection.id} title={collection.title}>
              <p className="mb-4 text-neutral-400">{collection.description}</p>
              <PackGrid packs={collectionPacks} />
            </Section>
          );
        })
      )}
    </div>
  );
}
```

- [ ] **Step 2: Create collections page**

Create `src/app/collections/page.tsx`:

```typescript
import { CollectionsFeature } from "@/presentation/features/collections/collections.feature";

export default function CollectionsPage() {
  return <CollectionsFeature />;
}
```

- [ ] **Step 3: Test the page**

Navigate to `/collections` — verify collections and their packs render.

- [ ] **Step 4: Commit**

```bash
git add .
git commit -m "feat: add collections page"
```

---

## Task 9: About Page

**Covers:** [S3]

**Files:**
- Create: `src/presentation/features/about/about.feature.tsx`
- Create: `src/app/about/page.tsx`

- [ ] **Step 1: Create about feature**

Create `src/presentation/features/about/about.feature.tsx`:

```typescript
import { PageHeader } from "@/presentation/_components/components.layout";
import { Code2, Github, Heart } from "lucide-react";

export function AboutFeature() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
      <PageHeader
        title="About designx"
        description="The shadcn/ui registry for complete website designs"
      />

      <div className="prose prose-neutral prose-invert max-w-none">
        <p>
          designx is a curated registry of open-source website designs. 
          Instead of building from scratch, install beautiful, production-ready 
          website designs directly into your project.
        </p>

        <h2>Why designx?</h2>
        <p>
          Most AI design tools try to generate designs from prompts. 
          designx takes a different approach — it provides real, working code 
          from real websites. AI can then consume these references directly 
          from your codebase, producing much better results.
        </p>

        <h2>How it works</h2>
        <ol>
          <li>Browse the registry for designs you like</li>
          <li>Install them via CLI or copy-paste</li>
          <li>AI reads the installed code as context</li>
          <li>Build new designs based on real references</li>
        </ol>

        <h2>Open Source</h2>
        <p>
          designx is open source and community-driven. All packs in the registry 
          are from open-source projects with permissive licenses (MIT, Apache 2.0).
        </p>

        <div className="mt-8 flex gap-4">
          <a
            href="https://github.com/100xsystems/designx"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg border border-neutral-800 bg-neutral-900/50 px-4 py-2 text-sm text-neutral-300 hover:border-neutral-700 hover:text-white transition-colors"
          >
            <Github className="h-4 w-4" />
            View on GitHub
          </a>
        </div>

        <p className="mt-8 text-sm text-neutral-500">
          Built with <Heart className="inline h-4 w-4 text-red-500" /> by{" "}
          <a href="https://100xsystems.dev" className="text-blue-400 hover:underline">
            100xsystems
          </a>
        </p>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Create about page**

Create `src/app/about/page.tsx`:

```typescript
import { AboutFeature } from "@/presentation/features/about/about.feature";

export default function AboutPage() {
  return <AboutFeature />;
}
```

- [ ] **Step 3: Test the page**

Navigate to `/about` — verify content renders correctly.

- [ ] **Step 4: Commit**

```bash
git add .
git commit -m "feat: add about page"
```

---

## Task 10: Seed Registry with Packs

**Covers:** [S6]

**Files:**
- Create: `registry/packs/linear-pack/manifest.json`
- Create: `registry/packs/raycast-pack/manifest.json`
- Create: `registry/packs/stripe-pack/manifest.json`
- Create: `registry/packs/framer-pack/manifest.json`
- Create: `registry/packs/vercel-pack/manifest.json`
- Create: `registry/packs/aceternity-pack/manifest.json`
- Create: `registry/packs/saas-dark/manifest.json`
- Create: `registry/packs/agency-minimal/manifest.json`
- Modify: `registry/index.ts`

- [ ] **Step 1: Create linear-pack manifest**

Create `registry/packs/linear-pack/manifest.json`:

```json
{
  "id": "linear-pack",
  "slug": "linear-pack",
  "title": "Linear Landing",
  "description": "Clean, minimal landing page inspired by Linear. Perfect for SaaS products.",
  "tags": ["minimal", "clean", "modern", "dark"],
  "framework": "nextjs",
  "category": "landing",
  "screenshots": [],
  "files": [],
  "dependencies": ["framer-motion"],
  "installCommand": "npx designx add linear-pack",
  "sourceUrl": "https://linear.app",
  "githubUrl": "https://github.com/linearapp/linear",
  "license": "MIT",
  "author": {
    "name": "Linear",
    "url": "https://linear.app",
    "github": "linearapp"
  },
  "featured": true,
  "createdAt": "2026-01-15"
}
```

- [ ] **Step 2: Create remaining pack manifests**

Create similar manifest files for: raycast-pack, stripe-pack, framer-pack, vercel-pack, aceternity-pack, saas-dark, agency-minimal.

Each with appropriate metadata (title, description, tags, framework, category, author, etc.).

- [ ] **Step 3: Create collection manifest**

Create `registry/collections/modern-saas.json`:

```json
{
  "id": "modern-saas",
  "slug": "modern-saas",
  "title": "Modern SaaS",
  "description": "A collection of packs for building modern SaaS landing pages",
  "packIds": ["linear-pack", "stripe-pack", "raycast-pack"]
}
```

- [ ] **Step 4: Update registry index**

Update `registry/index.ts` to import all pack manifests:

```typescript
import { Pack, Collection } from "@/application/packs/packs.types";

import linearPack from "./packs/linear-pack/manifest.json";
import raycastPack from "./packs/raycast-pack/manifest.json";
import stripePack from "./packs/stripe-pack/manifest.json";
import framerPack from "./packs/framer-pack/manifest.json";
import vercelPack from "./packs/vercel-pack/manifest.json";
import aceternityPack from "./packs/aceternity-pack/manifest.json";
import saasDark from "./packs/saas-dark/manifest.json";
import agencyMinimal from "./packs/agency-minimal/manifest.json";

import modernSaaS from "./collections/modern-saas.json";

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
  modernSaaS as Collection,
];

// ... rest of functions remain the same
```

- [ ] **Step 5: Test the full site**

```bash
npm run dev
```

Navigate through all pages — verify packs display correctly.

- [ ] **Step 6: Commit**

```bash
git add .
git commit -m "feat: seed registry with 8 curated packs and 1 collection"
```

---

## Task 11: Build Verification

**Covers:** [S7]

**Files:** None (verification only)

- [ ] **Step 1: Run TypeScript check**

```bash
npx tsc --noEmit
```

Expected: No errors.

- [ ] **Step 2: Run build**

```bash
npm run build
```

Expected: Successful build with no errors.

- [ ] **Step 3: Run lint**

```bash
npm run lint
```

Expected: No errors or warnings.

- [ ] **Step 4: Verify all pages render**

```bash
npm run start
```

Navigate to:
- `/` — Home page with hero and featured packs
- `/packs` — Browse page with search and filters
- `/packs/linear-pack` — Pack detail with install instructions
- `/collections` — Collections page
- `/about` — About page

- [ ] **Step 5: Commit any fixes**

```bash
git add .
git commit -m "fix: resolve build and lint issues"
```

---

## Task 12: Deployment Config

**Covers:** [S7]

**Files:**
- Create: `vercel.json` (if needed)
- Modify: `next.config.ts` (if needed)

- [ ] **Step 1: Verify Vercel compatibility**

Ensure `next.config.ts` is compatible with Vercel deployment.

- [ ] **Step 2: Push to GitHub**

```bash
git remote add origin https://github.com/100xsystems/designx.git
git push -u origin main
```

- [ ] **Step 3: Deploy to Vercel**

Connect the GitHub repo to Vercel. Set custom domain: `design.100xsystems.dev`.

- [ ] **Step 4: Verify deployment**

Visit `design.100xsystems.dev` — confirm all pages work in production.

- [ ] **Step 5: Final commit**

```bash
git add .
git commit -m "chore: configure deployment for design.100xsystems.dev"
```
