"use client";

import Link from "next/link";
import Image from "next/image";
import { usePack } from "@/application/packs/packs.hooks";
import { Badge, CodeBlock } from "@/presentation/_components/components.atomic";
import { containerStyles, headingStyles } from "@/presentation/_styles/components.styles";
import { ArrowLeft, ExternalLink, FileCode, FolderTree, Info, Scale } from "lucide-react";

export default function PackDetailFeature({ slug }: { slug: string }) {
  const pack = usePack(slug);

  if (!pack) {
    return (
      <div className={containerStyles.root}>
        <div className="flex flex-col items-center justify-center py-20">
          <h2 className={headingStyles.h2}>Pack not found</h2>
          <p className="mt-2 text-muted-foreground">
            The pack you&apos;re looking for doesn&apos;t exist.
          </p>
          <Link
            href="/packs"
            className="mt-4 inline-flex items-center gap-2 text-sm text-primary hover:underline"
          >
            <ArrowLeft className="size-4" />
            Back to Packs
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      <div className="border-b border-border py-4">
        <div className={containerStyles.root}>
          <Link
            href="/packs"
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="size-4" />
            Back to Packs
          </Link>
        </div>
      </div>

      <div className="py-8 sm:py-12">
        <div className={containerStyles.root}>
          <div className="flex flex-col gap-8 lg:flex-row">
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <Badge variant="framework">{pack.framework}</Badge>
                <Badge variant="category">{pack.category}</Badge>
                {pack.featured && <Badge variant="default">Featured</Badge>}
              </div>

              <h1 className={headingStyles.h1}>{pack.title}</h1>
              <p className="mt-3 max-w-2xl text-lg text-muted-foreground">
                {pack.description}
              </p>

              <div className="mt-4 flex flex-wrap gap-2">
                {pack.tags.map((tag) => (
                  <Badge key={tag} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </div>

              <div className="mt-6 flex flex-wrap gap-3">
                {pack.sourceUrl && (
                  <a
                    href={pack.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-lg border border-border px-4 py-2 text-sm font-medium transition-colors hover:bg-muted"
                  >
                    <FileCode className="size-4" />
                    Source
                    <ExternalLink className="size-3 text-muted-foreground" />
                  </a>
                )}
                {pack.githubUrl && (
                  <a
                    href={pack.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-lg border border-border px-4 py-2 text-sm font-medium transition-colors hover:bg-muted"
                  >
                    <svg
                      className="size-4"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                    </svg>
                    GitHub
                    <ExternalLink className="size-3 text-muted-foreground" />
                  </a>
                )}
              </div>

              <div className="mt-8 overflow-hidden rounded-xl border border-border">
                {pack.screenshots[0] ? (
                  <div className="relative aspect-video w-full bg-muted">
                    <Image
                      src={pack.screenshots[0]}
                      alt={`${pack.title} preview`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 60vw"
                    />
                  </div>
                ) : (
                  <div className="flex aspect-video w-full items-center justify-center bg-muted/50">
                    <div className="text-center text-muted-foreground">
                      <FolderTree className="mx-auto size-12 mb-2 opacity-50" />
                      <p>No preview available</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="w-full shrink-0 lg:w-80">
              <div className="sticky top-20 flex flex-col gap-6">
                <div className="rounded-xl border border-border bg-card p-5">
                  <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                    Install
                  </h3>
                  <CodeBlock
                    code={pack.installCommand}
                    language="bash"
                  />
                </div>

                {pack.files.length > 0 && (
                  <div className="rounded-xl border border-border bg-card p-5">
                    <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                      Manual Installation
                    </h3>
                    <ol className="space-y-2 text-sm text-muted-foreground">
                      {pack.files.map((file, i) => (
                        <li key={file.path} className="flex gap-2">
                          <span className="font-mono text-primary">
                            {i + 1}.
                          </span>
                          <span>
                            Copy <code className="rounded bg-muted px-1 py-0.5 text-xs">{file.path}</code> into your project
                          </span>
                        </li>
                      ))}
                    </ol>
                  </div>
                )}

                <div className="rounded-xl border border-border bg-card p-5">
                  <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                    Dependencies
                  </h3>
                  <ul className="space-y-1.5">
                    {pack.dependencies.map((dep) => (
                      <li
                        key={dep}
                        className="flex items-center gap-2 text-sm text-muted-foreground"
                      >
                        <span className="size-1 rounded-full bg-primary" />
                        {dep}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="rounded-xl border border-border bg-card p-5">
                  <div className="flex items-center gap-2 mb-2">
                    <Scale className="size-4 text-muted-foreground" />
                    <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                      License
                    </h3>
                  </div>
                  <p className="text-sm">{pack.license}</p>
                </div>

                <div className="rounded-xl border border-border bg-card p-5">
                  <div className="flex items-center gap-2 mb-2">
                    <Info className="size-4 text-muted-foreground" />
                    <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                      Attribution
                    </h3>
                  </div>
                  <div className="text-sm">
                    {pack.author.url ? (
                      <a
                        href={pack.author.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:underline"
                      >
                        {pack.author.name}
                      </a>
                    ) : pack.author.github ? (
                      <a
                        href={`https://github.com/${pack.author.github}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:underline"
                      >
                        {pack.author.name}
                      </a>
                    ) : (
                      <span>{pack.author.name}</span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
