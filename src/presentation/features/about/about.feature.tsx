"use client";

import { PageHeader, Section } from "@/presentation/_components/components.layout";
import { containerStyles, headingStyles } from "@/presentation/_styles/components.styles";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Search, Download, Layers } from "lucide-react";

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

export default function AboutFeature() {
  return (
    <div className="flex flex-col">
      <PageHeader
        title="About designx"
        description="The shadcn/ui registry for complete website designs"
      />

      <Section>
        <div className={cn(containerStyles.narrow, "flex flex-col gap-10")}>
          <div className="flex flex-col gap-4">
            <h2 className={headingStyles.h3}>What is designx?</h2>
            <p className="text-muted-foreground">
              designx is an open-source registry of production-ready website
              designs built on shadcn/ui. Think of it as shadcn/ui, but for
              entire page layouts and complete website designs — not just
              individual components.
            </p>
          </div>

          <div className="flex flex-col gap-4">
            <h2 className={headingStyles.h3}>Why does it exist?</h2>
            <p className="text-muted-foreground">
              Every project starts with the same problem: building pages from
              scratch. You have the components, but you still need the layout,
              the structure, the design context. designx solves this by giving
              you complete, copy-paste website designs that work out of the box
              with shadcn/ui.
            </p>
          </div>

          <div className="flex flex-col gap-4">
            <h2 className={headingStyles.h3}>How it works</h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
              {steps.map((step) => (
                <div
                  key={step.title}
                  className="flex flex-col items-center text-center"
                >
                  <div className="mb-3 flex size-10 items-center justify-center rounded-full bg-muted">
                    <step.icon className="size-5 text-muted-foreground" />
                  </div>
                  <h3 className="text-base font-semibold">{step.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <h2 className={headingStyles.h3}>Open source</h2>
            <p className="text-muted-foreground">
              designx is fully open source. All packs are available under the
              MIT license. Contributions, feedback, and new pack submissions are
              always welcome.
            </p>
            <div className="mt-2">
              <a
                href="https://github.com/100xsystems/designx"
                target="_blank"
                rel="noopener noreferrer"
                className={cn(buttonVariants({ variant: "outline" }))}
              >
                View on GitHub
              </a>
            </div>
          </div>

          <div className="border-t border-border pt-8">
            <p className="text-sm text-muted-foreground">
              Built by{" "}
              <a
                href="https://100xsystems.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground underline underline-offset-4 hover:text-primary"
              >
                100xsystems
              </a>
            </p>
          </div>
        </div>
      </Section>
    </div>
  );
}
