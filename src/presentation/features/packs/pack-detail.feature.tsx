"use client";

import Link from "next/link";
import { usePack } from "@/application/packs/packs.hooks";
import { Badge, CodeBlock, CoralDot } from "@/presentation/_components/components.atomic";
import { SectionRule } from "@/presentation/_components/components.layout";
import { notFound } from "next/navigation";

const GITHUB_REPO = "https://github.com/100xsystems/design-skills/tree/main/registry/packs";

export function PackDetailFeature({ slug }: { slug: string }) {
  const pack = usePack(slug);

  if (!pack) {
    notFound();
  }

  return (
    <div>
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

            <div style={{ display: "flex", gap: "12px", marginBottom: "40px" }}>
              {pack.sourceUrl && (
                <a href={pack.sourceUrl} target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
                  Source ↗
                </a>
              )}
              {pack.githubUrl && (
                <a href={pack.githubUrl} target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
                  GitHub ↗
                </a>
              )}
            </div>
          </div>

          {pack.htmlContent && (
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
                    href={`data:text/html;charset=utf-8,${encodeURIComponent(pack.htmlContent)}`}
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
                    srcDoc={pack.htmlContent}
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
                <span style={{ fontFamily: "var(--body)", fontSize: "14px", color: "var(--ink-mute)" }}>None — this is a standalone file</span>
              )}
            </div>
          </div>

          <div style={{ borderTop: "1px solid var(--line)", paddingTop: "32px", marginBottom: "32px" }}>
            <h3 style={{ fontFamily: "var(--sans)", fontSize: "14px", fontWeight: 600, color: "var(--ink-mute)", letterSpacing: "0.18em", textTransform: "uppercase", marginBottom: "16px" }}>
              Manual Installation
            </h3>
            <ol style={{ fontFamily: "var(--body)", fontSize: "14px", color: "var(--ink-mute)", lineHeight: 1.8, paddingLeft: "20px", marginBottom: "20px" }}>
              <li>Copy the files below into your project</li>
              {pack.dependencies.length > 0 && <li>Run: <code style={{ fontFamily: "var(--mono)", fontSize: "13px", background: "var(--bone)", padding: "2px 6px", borderRadius: "4px" }}>npm install {pack.dependencies.join(" ")}</code></li>}
            </ol>
          </div>

          {pack.files.length > 0 && (
            <div style={{ borderTop: "1px solid var(--line)", paddingTop: "32px", marginBottom: "32px" }}>
              <h3 style={{ fontFamily: "var(--sans)", fontSize: "14px", fontWeight: 600, color: "var(--ink-mute)", letterSpacing: "0.18em", textTransform: "uppercase", marginBottom: "16px" }}>
                Files
              </h3>
              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                {pack.files.map((file) => (
                  <a
                    key={file.path}
                    href={`${GITHUB_REPO}/${pack.slug}/${file.path}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "12px",
                      padding: "12px 16px",
                      background: "var(--bone)",
                      borderRadius: "8px",
                      textDecoration: "none",
                      color: "var(--ink)",
                      border: "1px solid var(--line-soft)",
                      transition: "all 0.18s ease",
                    }}
                  >
                    <span style={{ fontFamily: "var(--mono)", fontSize: "13px", flex: 1 }}>
                      {file.path}
                    </span>
                    <span style={{ fontFamily: "var(--sans)", fontSize: "11px", color: "var(--ink-faint)", letterSpacing: "0.04em" }}>
                      View on GitHub ↗
                    </span>
                  </a>
                ))}
              </div>
            </div>
          )}

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
                  Created by{" "}
                  {pack.author.url ? (
                    <a href={pack.author.url} target="_blank" rel="noopener noreferrer" style={{ color: "var(--coral)", textDecoration: "none" }}>
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
      </section>
    </div>
  );
}
