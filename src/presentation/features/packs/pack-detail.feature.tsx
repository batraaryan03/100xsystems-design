"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePack } from "@/application/packs/packs.hooks";
import { Badge, CodeBlock, CoralDot } from "@/presentation/_components/components.atomic";
import { SectionRule } from "@/presentation/_components/components.layout";
import { notFound } from "next/navigation";
import type { Pack } from "@/application/packs/packs.types";

function PackDetailInner({ pack }: { pack: Pack }) {
  const [fileContents, setFileContents] = useState<Record<string, string>>({});

  useEffect(() => {
    let cancelled = false;
    async function load() {
      const contents: Record<string, string> = {};
      for (const file of pack.files) {
        try {
          const res = await fetch(`/registry/packs/${pack.slug}/${file.path}`);
          if (res.ok) {
            contents[file.path] = await res.text();
          }
        } catch {}
      }
      if (!cancelled) setFileContents(contents);
    }
    load();
    return () => { cancelled = true; };
  }, [pack]);

  const previewUrl = pack.framework === "html"
    ? `/registry/packs/${pack.slug}/index.html`
    : null;

  return (
    <section className="tight">
      <div className="container" style={{ maxWidth: "900px" }}>
        <Link
          href="/packs"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            color: "var(--ink-mute)",
            fontFamily: "var(--sans)",
            fontSize: "13px",
            textDecoration: "none",
            marginBottom: "32px",
            transition: "color 0.18s ease",
          }}
        >
          ← Back to skills
        </Link>

        <SectionRule roman="·" meta={pack.title} page={pack.framework} />

        <div style={{ marginBottom: "40px" }}>
          <div style={{ display: "flex", gap: "8px", marginBottom: "12px" }}>
            <Badge variant="coral">{pack.framework}</Badge>
            <Badge>{pack.category}</Badge>
          </div>

          <h1 className="display" style={{ fontSize: "clamp(36px, 4vw, 54px)", margin: "16px 0 20px" }}>
            {pack.title}<CoralDot />
          </h1>

          <p className="lead" style={{ marginBottom: "24px", maxWidth: "48ch" }}>
            {pack.description}
          </p>

          <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginBottom: "24px" }}>
            {pack.tags.map((tag) => (
              <Badge key={tag}>{tag}</Badge>
            ))}
          </div>
        </div>

        {previewUrl && (
          <div style={{ marginBottom: "48px" }}>
            <h3 style={{ fontFamily: "var(--sans)", fontSize: "14px", fontWeight: 600, color: "var(--ink-mute)", letterSpacing: "0.18em", textTransform: "uppercase", marginBottom: "16px" }}>
              Live Preview
            </h3>
            <div style={{ position: "relative", background: "#15140f", borderRadius: "12px", overflow: "hidden", border: "1px solid rgba(247, 241, 222, 0.1)" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 16px", borderBottom: "1px solid rgba(247, 241, 222, 0.08)" }}>
                <span style={{ fontFamily: "var(--mono)", fontSize: "11px", color: "rgba(247, 241, 222, 0.4)", letterSpacing: "0.04em" }}>
                  preview
                </span>
                <a
                  href={previewUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    fontFamily: "var(--sans)",
                    fontSize: "11px",
                    color: "rgba(247, 241, 222, 0.6)",
                    textDecoration: "none",
                  }}
                >
                  Open in new tab ↗
                </a>
              </div>
              <div style={{ position: "relative", height: "600px", overflow: "auto" }}>
                <iframe
                  src={previewUrl}
                  style={{
                    width: "100%",
                    height: "100%",
                    border: "none",
                  }}
                  title={pack.title}
                  sandbox="allow-scripts"
                />
              </div>
            </div>
          </div>
        )}

        <div style={{ borderTop: "1px solid var(--line)", paddingTop: "32px", marginBottom: "32px" }}>
          <h3 style={{ fontFamily: "var(--sans)", fontSize: "14px", fontWeight: 600, color: "var(--ink-mute)", letterSpacing: "0.18em", textTransform: "uppercase", marginBottom: "16px" }}>
            Install
          </h3>
          <CodeBlock code={pack.installCommand} language="bash" />
        </div>

        <div style={{ borderTop: "1px solid var(--line)", paddingTop: "32px", marginBottom: "32px" }}>
          <h3 style={{ fontFamily: "var(--sans)", fontSize: "14px", fontWeight: 600, color: "var(--ink-mute)", letterSpacing: "0.18em", textTransform: "uppercase", marginBottom: "16px" }}>
            Dependencies
          </h3>
          <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
            {pack.dependencies.length > 0 ? (
              pack.dependencies.map((dep) => (
                <Badge key={dep}>{dep}</Badge>
              ))
            ) : (
              <span style={{ fontFamily: "var(--body)", fontSize: "14px", color: "var(--ink-mute)" }}>None — standalone file</span>
            )}
          </div>
        </div>

        <div style={{ borderTop: "1px solid var(--line)", paddingTop: "32px", marginBottom: "32px" }}>
          <h3 style={{ fontFamily: "var(--sans)", fontSize: "14px", fontWeight: 600, color: "var(--ink-mute)", letterSpacing: "0.18em", textTransform: "uppercase", marginBottom: "16px" }}>
            Source Code
          </h3>
          {pack.files.length > 0 ? (
            <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
              {pack.files.map((file) => {
                const lang = file.path.endsWith(".css") ? "css" : file.path.endsWith(".tsx") ? "tsx" : file.path.endsWith(".html") ? "html" : file.path.endsWith(".ts") ? "typescript" : file.path.endsWith(".js") ? "javascript" : "text";
                return (
                  <div key={file.path}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
                      <span style={{ fontFamily: "var(--mono)", fontSize: "12px", color: "var(--ink-mute)" }}>
                        {pack.slug}/{file.path}
                      </span>
                      <span style={{ fontFamily: "var(--sans)", fontSize: "10px", color: "var(--ink-faint)", letterSpacing: "0.08em", textTransform: "uppercase" }}>
                        {file.type}
                      </span>
                    </div>
                    {fileContents[file.path] !== undefined ? (
                      <CodeBlock code={fileContents[file.path]} language={lang} />
                    ) : (
                      <div style={{ padding: "40px", textAlign: "center", fontFamily: "var(--mono)", fontSize: "12px", color: "var(--ink-faint)", background: "var(--bone)", borderRadius: "8px", border: "1px solid var(--line-soft)" }}>
                        Loading...
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          ) : (
            <span style={{ fontFamily: "var(--body)", fontSize: "14px", color: "var(--ink-mute)" }}>No files to display.</span>
          )}
        </div>

        <div style={{ borderTop: "1px solid var(--line)", paddingTop: "32px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "32px" }}>
            <div>
              <h3 style={{ fontFamily: "var(--sans)", fontSize: "14px", fontWeight: 600, color: "var(--ink-mute)", letterSpacing: "0.18em", textTransform: "uppercase", marginBottom: "12px" }}>
                License
              </h3>
              <p style={{ fontFamily: "var(--body)", fontSize: "14px", color: "var(--ink)" }}>{pack.license}</p>
            </div>
            <div>
              <h3 style={{ fontFamily: "var(--sans)", fontSize: "14px", fontWeight: 600, color: "var(--ink-mute)", letterSpacing: "0.18em", textTransform: "uppercase", marginBottom: "12px" }}>
                Attribution
              </h3>
              <p style={{ fontFamily: "var(--body)", fontSize: "14px", color: "var(--ink)" }}>
                {pack.author.name}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function PackDetailFeature({ slug }: { slug: string }) {
  const { pack, loading } = usePack(slug);

  if (loading) {
    return (
      <section className="tight">
        <div className="container" style={{ maxWidth: "900px", padding: "120px 0", textAlign: "center" }}>
          <div style={{ fontFamily: "var(--mono)", fontSize: "13px", color: "var(--ink-faint)", letterSpacing: "0.04em" }}>
            Loading...
          </div>
        </div>
      </section>
    );
  }

  if (!pack) {
    notFound();
  }

  return <PackDetailInner pack={pack} />;
}
