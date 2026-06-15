import { cva } from "class-variance-authority";

export const cardVariants = cva(
  "group relative flex flex-col overflow-hidden rounded-xl border border-border bg-card text-card-foreground transition-all duration-200",
  {
    variants: {
      variant: {
        default: "hover:border-foreground/20 hover:shadow-lg",
        interactive:
          "cursor-pointer hover:border-foreground/20 hover:shadow-lg hover:-translate-y-0.5",
        featured: "border-primary/30 ring-1 ring-primary/10",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export const badgeVariants = cva(
  "inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium transition-colors",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground",
        secondary: "bg-secondary text-secondary-foreground",
        outline: "border border-border text-foreground",
        framework:
          "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20",
        category: "bg-violet-500/10 text-violet-400 border border-violet-500/20",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export const gridStyles = {
  packs: "grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
};

export const containerStyles = {
  root: "mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8",
  narrow: "mx-auto w-full max-w-3xl px-4 sm:px-6 lg:px-8",
};

export const sectionStyles = "py-12 sm:py-16 lg:py-20";

export const headingStyles = {
  h1: "text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl",
  h2: "text-2xl font-bold tracking-tight sm:text-3xl",
  h3: "text-xl font-semibold tracking-tight sm:text-2xl",
};

export const subheadingStyles =
  "mt-3 text-base text-muted-foreground sm:text-lg lg:text-xl";

export const codeBlockStyles = {
  wrapper: "relative rounded-lg border border-border bg-muted/50 overflow-hidden",
  header:
    "flex items-center justify-between border-b border-border px-4 py-2",
  code: "overflow-x-auto p-4 font-mono text-sm leading-relaxed",
  language: "text-xs text-muted-foreground",
};

export const copyButtonStyles =
  "inline-flex items-center gap-1.5 rounded-md px-2 py-1 text-xs text-muted-foreground transition-colors hover:bg-muted hover:text-foreground";

export const tagChipStyles =
  "inline-flex items-center gap-1 rounded-full border border-border px-3 py-1 text-sm text-muted-foreground transition-all hover:border-foreground/30 hover:text-foreground cursor-pointer select-none";

export const tagChipActiveStyles =
  "border-primary bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground";
