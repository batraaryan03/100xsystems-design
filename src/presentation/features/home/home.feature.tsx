"use client";

import Link from "next/link";
import { Section } from "@/presentation/_components/components.layout";
import { PackGrid } from "@/presentation/_components/components.composite";
import { Badge } from "@/presentation/_components/components.atomic";
import { containerStyles, headingStyles } from "@/presentation/_styles/components.styles";
import { usePacks } from "@/application/packs/packs.hooks";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ArrowRight, Search, Download, Layers } from "lucide-react";
import type { PackCategory } from "@/application/packs/packs.types";

const categoryLabels: Record<PackCategory, string> = {
  landing: "Landing Pages",
  saas: "SaaS",
  portfolio: "Portfolios",
  dashboard: "Dashboards",
  agency: "Agency",
  "3d": "3D Experiences",
};

const steps = [
  {
    icon: Search,
    title: "Discover",
    description: "Browse our curated collection of production-ready website designs.",
  },
  {
    icon: Download,
    title: "Install",
    description: "Copy the pack into your project with a single command.",
  },
  {
    icon: Layers,
    title: "Build",
    description: "Customize and ship — no more starting from scratch.",
  },
];

function HeroSection() {
  return (
    <section className="relative overflow-hidden py-20 sm:py-28 lg:py-36">
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />
      <div className={cn(containerStyles.root, "relative")}>
        <div className="mx-auto max-w-3xl text-center">
          <Badge variant="outline" className="mb-6">
            Open-source design registry
          </Badge>
          <h1 className={cn(headingStyles.h1, "mb-6")}>
            shadcn/ui for website designs
          </h1>
          <p className="mx-auto mb-10 max-w-2xl text-lg text-muted-foreground sm:text-xl lg:text-2xl">
            Copy-paste production-ready website designs into your next project.
            Browse, install, and customize — no more starting from scratch.
          </p>
          <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/packs"
              className={cn(buttonVariants({ size: "lg" }))}
            >
              Browse Packs
              <ArrowRight className="ml-2 size-4" />
            </Link>
            <a
              href="https://github.com/100xsystems"
              target="_blank"
              rel="noopener noreferrer"
              className={cn(buttonVariants({ variant: "outline", size: "lg" }))}
            >
              View on GitHub
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function HowItWorksSection() {
  return (
    <Section title="How it works">
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
        {steps.map((step, i) => (
          <div key={step.title} className="relative flex flex-col items-center text-center">
            <div className="mb-4 flex size-12 items-center justify-center rounded-full bg-muted">
              <step.icon className="size-6 text-muted-foreground" />
            </div>
            <span className="mb-2 text-xs font-medium text-muted-foreground">
              Step {i + 1}
            </span>
            <h3 className={headingStyles.h3}>{step.title}</h3>
            <p className="mt-2 text-muted-foreground">{step.description}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}

function FeaturedPacksSection() {
  const { featured } = usePacks();

  if (featured.length === 0) return null;

  return (
    <Section title="Featured packs">
      <PackGrid packs={featured} />
      <div className="mt-8 flex justify-center">
        <Link
          href="/packs"
          className={cn(buttonVariants({ variant: "outline" }))}
        >
          View all packs
          <ArrowRight className="ml-2 size-4" />
        </Link>
      </div>
    </Section>
  );
}

function CategoriesSection() {
  const { categories } = usePacks();

  if (categories.length === 0) return null;

  return (
    <Section title="Browse by category">
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
        {categories.map((category) => (
          <Link
            key={category}
            href={`/packs?category=${category}`}
            className="group flex flex-col items-center gap-2 rounded-xl border border-border bg-card p-6 transition-all hover:border-foreground/20 hover:shadow-lg"
          >
            <h3 className="text-sm font-semibold group-hover:text-primary">
              {categoryLabels[category]}
            </h3>
          </Link>
        ))}
      </div>
    </Section>
  );
}

export default function HomeFeature() {
  return (
    <div className="flex flex-col">
      <HeroSection />
      <HowItWorksSection />
      <FeaturedPacksSection />
      <CategoriesSection />
    </div>
  );
}
