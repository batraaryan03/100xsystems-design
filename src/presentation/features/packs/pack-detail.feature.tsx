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

          <div style={{ display: "grid", gridTemplateColumns: "1fr 380px", gap: "60px", alignItems: "start" }}>
            <div>
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

              <div style={{ borderTop: "1px solid var(--line)", paddingTop: "32px" }}>
                <h3 style={{ fontFamily: "var(--sans)", fontSize: "18px", fontWeight: 700, marginBottom: "16px" }}>
                  Manual Installation
                </h3>
                <ol style={{ fontFamily: "var(--body)", fontSize: "14px", color: "var(--ink-mute)", lineHeight: 1.6, paddingLeft: "20px" }}>
                  <li>Copy the files into your project</li>
                  <li>Install dependencies:</li>
                </ol>
                <div style={{ marginTop: "12px" }}>
                  <CodeBlock code={`npm install ${pack.dependencies.join(" ")}`} />
                </div>
              </div>
            </div>

            <div style={{ position: "sticky", top: "100px" }}>
              <div style={{ background: "var(--bone)", borderRadius: "18px", padding: "28px 26px", boxShadow: "var(--shadow)" }}>
                <h3 style={{ fontFamily: "var(--sans)", fontSize: "14px", fontWeight: 600, color: "var(--ink-mute)", letterSpacing: "0.18em", textTransform: "uppercase", marginBottom: "16px" }}>
                  Install with CLI
                </h3>
                <CodeBlock code={pack.installCommand} />

                <div style={{ marginTop: "24px", borderTop: "1px solid var(--line)", paddingTop: "20px" }}>
                  <h3 style={{ fontFamily: "var(--sans)", fontSize: "14px", fontWeight: 600, color: "var(--ink-mute)", letterSpacing: "0.18em", textTransform: "uppercase", marginBottom: "12px" }}>
                    Dependencies
                  </h3>
                  <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
                    {pack.dependencies.map((dep) => (
                      <Badge key={dep}>{dep}</Badge>
                    ))}
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
