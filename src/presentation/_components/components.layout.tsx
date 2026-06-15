"use client";

import * as React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { containerStyles, headingStyles, subheadingStyles, sectionStyles } from "@/presentation/_styles/components.styles";
import { ExternalLink } from "lucide-react";

function Navbar({ className }: { className?: string }) {
  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-md",
        className
      )}
    >
      <div className={containerStyles.root}>
        <div className="flex h-14 items-center justify-between">
          <Link href="/" className="flex items-center gap-2 font-semibold">
            <span className="text-lg">100xsystems</span>
          </Link>
          <nav className="flex items-center gap-1">
            <Link
              href="/packs"
              className="inline-flex h-7 items-center gap-1 rounded-md px-2.5 text-sm font-medium text-foreground transition-colors hover:bg-muted"
            >
              Packs
            </Link>
            <a
              href="https://github.com/100xsystems"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="inline-flex size-7 items-center justify-center rounded-md text-foreground transition-colors hover:bg-muted"
            >
              <ExternalLink className="size-4" />
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
}

function Footer({ className }: { className?: string }) {
  return (
    <footer
      className={cn("border-t border-border bg-muted/30", className)}
    >
      <div className={containerStyles.root}>
        <div className="flex flex-col items-center justify-between gap-4 py-8 sm:flex-row">
          <div className="flex items-center gap-2 font-semibold">
            <span>100xsystems</span>
          </div>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <Link href="/packs" className="hover:text-foreground transition-colors">
              Packs
            </Link>
            <a
              href="https://github.com/100xsystems"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-foreground transition-colors"
            >
              GitHub
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

function PageHeader({
  title,
  description,
  className,
}: {
  title: string;
  description?: string;
  className?: string;
}) {
  return (
    <div className={cn(sectionStyles, className)}>
      <div className={containerStyles.root}>
        <h1 className={headingStyles.h1}>{title}</h1>
        {description && (
          <p className={subheadingStyles}>{description}</p>
        )}
      </div>
    </div>
  );
}

function Section({
  title,
  children,
  className,
}: {
  title?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section className={cn(sectionStyles, className)}>
      <div className={containerStyles.root}>
        {title && (
          <h2 className={cn(headingStyles.h2, "mb-8")}>{title}</h2>
        )}
        {children}
      </div>
    </section>
  );
}

export { Navbar, Footer, PageHeader, Section };
