"use client";

import Link from "next/link";
import { usePack } from "@/application/packs/packs.hooks";
import { Badge, CodeBlock, CoralDot } from "@/presentation/_components/components.atomic";
import { SectionRule } from "@/presentation/_components/components.layout";
import { notFound } from "next/navigation";

export function PackDetailFeature({ slug }: { slug: string }) {
  const pack = usePack(slug);

  if (!pack) {
    notFound();
  }

  return (
    <div>
      <section className="tight">
        <div className="container">
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
            <div style={{ marginBottom: "8px" }}>
              <Badge variant="coral">{pack.framework}</Badge>
              <Badge>{pack.category}</Badge>
            </div>

            <h1 className="display" style={{ fontSize: "clamp(36px, 4vw, 54px)", margin: "16px 0 20px" }}>
              {pack.title}<CoralDot />
            </h1>

            <p className="lead" style={{ marginBottom: "32px", maxWidth: "48ch" }}>
              {pack.description}
            </p>

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

            <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginBottom: "40px" }}>
              {pack.tags.map((tag) => (
                <Badge key={tag}>{tag}</Badge>
              ))}
            </div>
          </div>

          {pack.htmlContent && (
            <div style={{ marginBottom: "48px" }}>
              <h3 style={{ fontFamily: "var(--sans)", fontSize: "14px", fontWeight: 600, color: "var(--ink-mute)", letterSpacing: "0.18em", textTransform: "uppercase", marginBottom: "16px" }}>
                Preview
              </h3>
              <div style={{ position: "relative", background: "var(--bone)", borderRadius: "18px", overflow: "hidden", boxShadow: "var(--shadow)" }}>
                <div className="corner tl" />
                <div className="corner tr" />
                <div className="corner bl" />
                <div className="corner br" />
                <iframe
                  srcDoc={pack.htmlContent}
                  style={{
                    width: "100%",
                    height: "600px",
                    border: "none",
                    borderRadius: "18px",
                  }}
                  title={pack.title}
                  sandbox="allow-scripts"
                />
                <div style={{ position: "absolute", top: "12px", right: "12px", display: "flex", gap: "8px" }}>
                  <a
                    href={`data:text/html;charset=utf-8,${encodeURIComponent(pack.htmlContent)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      background: "rgba(239, 231, 210, 0.9)",
                      padding: "6px 12px",
                      borderRadius: "6px",
                      fontFamily: "var(--sans)",
                      fontSize: "11px",
                      color: "var(--ink)",
                      textDecoration: "none",
                      border: "1px solid var(--line-soft)",
                    }}
                  >
                    Open in new tab ↗
                  </a>
                </div>
              </div>
            </div>
          )}

          <div style={{ display: "grid", gridTemplateColumns: "1fr 380px", gap: "60px", alignItems: "start" }}>
            <div>
              <div style={{ borderTop: "1px solid var(--line)", paddingTop: "32px" }}>
                <h3 style={{ fontFamily: "var(--sans)", fontSize: "18px", fontWeight: 700, marginBottom: "16px" }}>
                  Manual Installation
                </h3>
                <ol style={{ fontFamily: "var(--body)", fontSize: "14px", color: "var(--ink-mute)", lineHeight: 1.6, paddingLeft: "20px" }}>
                  <li>Copy the files into your project</li>
                  {pack.dependencies.length > 0 && <li>Install dependencies:</li>}
                </ol>
                {pack.dependencies.length > 0 && (
                  <div style={{ marginTop: "12px" }}>
                    <CodeBlock code={`npm install ${pack.dependencies.join(" ")}`} />
                  </div>
                )}
              </div>

              {pack.files.length > 0 && (
                <div style={{ borderTop: "1px solid var(--line)", paddingTop: "32px", marginTop: "32px" }}>
                  <h3 style={{ fontFamily: "var(--sans)", fontSize: "18px", fontWeight: 700, marginBottom: "16px" }}>
                    Files
                  </h3>
                  <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                    {pack.files.map((file) => (
                      <div key={file.path} style={{ fontFamily: "var(--mono)", fontSize: "13px", color: "var(--ink-mute)", padding: "8px 12px", background: "var(--bone)", borderRadius: "6px" }}>
                        {file.path}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div style={{ position: "sticky", top: "100px" }}>
              <div style={{ background: "var(--bone)", borderRadius: "18px", padding: "28px 26px", boxShadow: "var(--shadow)" }}>
                <h3 style={{ fontFamily: "var(--sans)", fontSize: "14px", fontWeight: 600, color: "var(--ink-mute)", letterSpacing: "0.18em", textTransform: "uppercase", marginBottom: "16px" }}>
                  Install
                </h3>
                <CodeBlock code={pack.installCommand} />

                <div style={{ marginTop: "24px", borderTop: "1px solid var(--line)", paddingTop: "20px" }}>
                  <h3 style={{ fontFamily: "var(--sans)", fontSize: "14px", fontWeight: 600, color: "var(--ink-mute)", letterSpacing: "0.18em", textTransform: "uppercase", marginBottom: "12px" }}>
                    Dependencies
                  </h3>
                  <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
                    {pack.dependencies.length > 0 ? (
                      pack.dependencies.map((dep) => (
                        <Badge key={dep}>{dep}</Badge>
                      ))
                    ) : (
                      <span style={{ fontFamily: "var(--body)", fontSize: "14px", color: "var(--ink-mute)" }}>None</span>
                    )}
                  </div>
                </div>

                <div style={{ marginTop: "20px", borderTop: "1px solid var(--line)", paddingTop: "20px" }}>
                  <h3 style={{ fontFamily: "var(--sans)", fontSize: "14px", fontWeight: 600, color: "var(--ink-mute)", letterSpacing: "0.18em", textTransform: "uppercase", marginBottom: "8px" }}>
                    License
                  </h3>
                  <p style={{ fontFamily: "var(--body)", fontSize: "14px", color: "var(--ink)" }}>{pack.license}</p>
                </div>

                <div style={{ marginTop: "20px", borderTop: "1px solid var(--line)", paddingTop: "20px" }}>
                  <h3 style={{ fontFamily: "var(--sans)", fontSize: "14px", fontWeight: 600, color: "var(--ink-mute)", letterSpacing: "0.18em", textTransform: "uppercase", marginBottom: "8px" }}>
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
        </div>
      </section>
    </div>
  );
}
