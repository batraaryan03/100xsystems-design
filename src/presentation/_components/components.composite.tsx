"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import type { Pack, PackCategory, PackFramework } from "@/application/packs/packs.types";
import { Card, Badge, TagChip } from "./components.atomic";
import { gridStyles } from "@/presentation/_styles/components.styles";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

function PackCard({ pack, className }: { pack: Pack; className?: string }) {
  return (
    <Link href={`/packs/${pack.slug}`} className="block">
      <Card variant="interactive" className={cn("h-full", className)}>
        {pack.screenshots[0] && (
          <div className="relative aspect-video w-full overflow-hidden bg-muted">
            <Image
              src={pack.screenshots[0]}
              alt={pack.title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            />
          </div>
        )}
        <div className="flex flex-1 flex-col gap-2 p-4">
          <div className="flex items-start justify-between gap-2">
            <h3 className="line-clamp-1 font-semibold">{pack.title}</h3>
            <Badge variant="framework">{pack.framework}</Badge>
          </div>
          <p className="line-clamp-2 text-sm text-muted-foreground">
            {pack.description}
          </p>
          <div className="mt-auto flex flex-wrap gap-1 pt-2">
            <Badge variant="category" className="text-[10px]">
              {pack.category}
            </Badge>
            {pack.tags.slice(0, 3).map((tag) => (
              <Badge key={tag} variant="secondary" className="text-[10px]">
                {tag}
              </Badge>
            ))}
          </div>
        </div>
      </Card>
    </Link>
  );
}

function PackGrid({
  packs,
  className,
}: {
  packs: Pack[];
  className?: string;
}) {
  return (
    <div className={cn(gridStyles.packs, className)}>
      {packs.map((pack) => (
        <PackCard key={pack.id} pack={pack} />
      ))}
    </div>
  );
}

function SearchBar({
  value,
  onChange,
  placeholder,
  className,
}: {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}) {
  return (
    <div className={cn("relative", className)}>
      <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
      <Input
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder ?? "Search packs..."}
        className="pl-9"
      />
    </div>
  );
}

function FilterBar({
  categories,
  frameworks,
  activeCategory,
  activeFramework,
  onCategoryChange,
  onFrameworkChange,
  className,
}: {
  categories: PackCategory[];
  frameworks: PackFramework[];
  activeCategory: PackCategory | null;
  activeFramework: PackFramework | null;
  onCategoryChange: (category: PackCategory | null) => void;
  onFrameworkChange: (framework: PackFramework | null) => void;
  className?: string;
}) {
  return (
    <div className={cn("flex flex-wrap gap-2", className)}>
      <div className="flex items-center gap-1">
        {categories.map((category) => (
          <TagChip
            key={category}
            active={activeCategory === category}
            onClick={() =>
              onCategoryChange(activeCategory === category ? null : category)
            }
          >
            {category}
          </TagChip>
        ))}
      </div>
      <div className="h-6 w-px bg-border" aria-hidden="true" />
      <div className="flex items-center gap-1">
        {frameworks.map((framework) => (
          <TagChip
            key={framework}
            active={activeFramework === framework}
            onClick={() =>
              onFrameworkChange(
                activeFramework === framework ? null : framework
              )
            }
          >
            {framework}
          </TagChip>
        ))}
      </div>
    </div>
  );
}

export { PackCard, PackGrid, SearchBar, FilterBar };
