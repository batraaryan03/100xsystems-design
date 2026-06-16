"use client";

import { useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePacks } from "@/application/packs/packs.hooks";
import { SectionRule, PageHeader } from "@/presentation/_components/components.layout";
import { CoralDot, Badge } from "@/presentation/_components/components.atomic";
import type { Pack } from "@/application/packs/packs.types";

function AssetCard({ pack }: { pack: Pack }) {
  return (
    <Link href={`/skills/websites/${pack.slug}`} style={{ textDecoration: "none", color: "inherit" }}>
      <div style={{ background: "var(--bone)", borderRadius: "12px", overflow: "hidden", boxShadow: "var(--shadow)", transition: "transform 0.2s ease" }}>
        {pack.thumbnail ? (
          <div style={{ aspectRatio: "16/9", position: "relative", overflow: "hidden" }}>
            <Image src={pack.thumbnail} alt={pack.title} fill sizes="(max-width: 768px) 100vw, 33vw" style={{ objectFit: "cover" }} />
          </div>
        ) : (
          <div style={{ aspectRatio: "16/9", background: "var(--paper-dark)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ fontFamily: "var(--serif)", fontStyle: "italic", fontSize: "36px", color: "var(--ink-faint)", opacity: 0.3 }}>{pack.title.charAt(0)}</span>
          </div>
        )}
        <div style={{ padding: "16px 18px 20px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "8px" }}>
            <Badge variant="coral">{pack.assetType || pack.framework}</Badge>
          </div>
          <h3 style={{ fontFamily: "var(--sans)", fontSize: "15px", fontWeight: 700, letterSpacing: "-0.01em", marginBottom: "6px" }}>{pack.title}</h3>
          <p style={{ fontFamily: "var(--body)", fontSize: "12px", color: "var(--ink-mute)", lineHeight: 1.4, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>{pack.description}</p>
        </div>
      </div>
    </Link>
  );
}

export function HomeFeature() {
  const { packs, frameworks } = usePacks();
  const componentPacks = useMemo(() => packs.filter((p) => p.framework !== "asset").slice(0, 3), [packs]);
  const illustrationPacks = useMemo(() => packs.filter((p) => p.assetType === "illustration"), [packs]);
  const imagePacks = useMemo(() => packs.filter((p) => p.assetType === "image"), [packs]);
  const videoPacks = useMemo(() => packs.filter((p) => p.assetType === "video"), [packs]);
  const totalAssets = illustrationPacks.length + imagePacks.length + videoPacks.length;

  return (
    <div>
      <section style={{ minHeight: "calc(100vh - 140px)", display: "flex", flexDirection: "column" }}>
        <div className="container" style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center" }}>
          <span className="label">
            Open-source design registry <span className="ix">· Nº 01</span>
          </span>
          <h1 className="display" style={{ fontSize: "clamp(44px, 5vw, 78px)", margin: "28px 0" }}>
            Curated <em>design skills</em>,<br />
            installed as <em>code</em><CoralDot />
          </h1>
          <p className="lead" style={{ marginBottom: "36px", maxWidth: "42ch" }}>
            Websites, illustrations, textures, and video loops. Install them as code.
            Own them locally. Let AI consume from your codebase.
          </p>
          <div style={{ display: "flex", gap: "14px", marginBottom: "38px" }}>
            <Link href="/skills/websites" className="btn btn-primary">
              Browse Websites
              <span className="arrow">
                <svg viewBox="0 0 24 24"><path d="M5 19L19 5M19 5H8M19 5v11" /></svg>
              </span>
            </Link>
            <a href="https://github.com/batraaryan03/100xsystems-design" target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
              View on GitHub
            </a>
          </div>
          <div style={{ display: "flex", gap: "22px", alignItems: "center" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "9px" }}>
              <span className="stat-ring coral">{packs.length}</span>
              <span style={{ fontFamily: "var(--sans)", fontSize: "11px", color: "var(--ink-soft)", letterSpacing: "0.04em", textTransform: "uppercase" }}>
                <b style={{ display: "block", fontWeight: 700, color: "var(--ink)", fontSize: "12px" }}>{packs.length}</b>
                Skills
              </span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "9px" }}>
              <span className="stat-ring">{frameworks.length}</span>
              <span style={{ fontFamily: "var(--sans)", fontSize: "11px", color: "var(--ink-soft)", letterSpacing: "0.04em", textTransform: "uppercase" }}>
                <b style={{ display: "block", fontWeight: 700, color: "var(--ink)", fontSize: "12px" }}>{frameworks.length}</b>
                Frameworks
              </span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "9px" }}>
              <span className="stat-ring">100%</span>
              <span style={{ fontFamily: "var(--sans)", fontSize: "11px", color: "var(--ink-soft)", letterSpacing: "0.04em", textTransform: "uppercase" }}>
                <b style={{ display: "block", fontWeight: 700, color: "var(--ink)", fontSize: "12px" }}>Free</b>
                Open Source
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className="tight">
        <div className="container">
          <SectionRule roman="I." meta="Browse the collection" page="001 / 004" />
          <PageHeader
            label="Every skill is a droppable folder"
            labelIndex="Nº 01"
            title={<>Browse our curated <em>websites</em><CoralDot /></>}
            lead="Each design is a complete website — HTML, CSS, or React — ready to install."
          />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "24px", marginBottom: "32px" }}>
            {componentPacks.map((pack) => (
              <AssetCard key={pack.id} pack={pack} />
            ))}
          </div>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Link href="/skills/websites" className="btn btn-primary" style={{ fontSize: "14px", padding: "12px 24px" }}>
              View All Websites
              <span className="arrow">
                <svg viewBox="0 0 24 24"><path d="M5 19L19 5M19 5H8M19 5v11" /></svg>
              </span>
            </Link>
          </div>
        </div>
      </section>

      {totalAssets > 0 && (
        <section className="tight">
          <div className="container">
            <SectionRule roman="II." meta="Design Assets" page="002 / 004" />
            <PageHeader
              label="More than websites"
              labelIndex="Nº 02"
              title={<>Illustrations, textures, <em>&</em> video loops<CoralDot /></>}
              lead="Curated design assets with proper attribution. Install bundles of related assets in one command."
            />
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "32px", marginBottom: "48px" }}>
              {illustrationPacks.length > 0 && (
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "16px" }}>
                    <span style={{ fontSize: "24px" }}>✦</span>
                    <h3 style={{ fontFamily: "var(--sans)", fontSize: "16px", fontWeight: 700 }}>Illustrations</h3>
                  </div>
                  {illustrationPacks.map((pack) => (
                    <AssetCard key={pack.id} pack={pack} />
                  ))}
                  <Link href="/skills/illustrations" style={{ display: "inline-block", marginTop: "12px", fontFamily: "var(--sans)", fontSize: "13px", color: "var(--coral)", textDecoration: "none" }}>
                    View all illustrations →
                  </Link>
                </div>
              )}
              {imagePacks.length > 0 && (
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "16px" }}>
                    <span style={{ fontSize: "24px" }}>◎</span>
                    <h3 style={{ fontFamily: "var(--sans)", fontSize: "16px", fontWeight: 700 }}>Images & Textures</h3>
                  </div>
                  {imagePacks.map((pack) => (
                    <AssetCard key={pack.id} pack={pack} />
                  ))}
                  <Link href="/skills/images" style={{ display: "inline-block", marginTop: "12px", fontFamily: "var(--sans)", fontSize: "13px", color: "var(--coral)", textDecoration: "none" }}>
                    View all images →
                  </Link>
                </div>
              )}
              {videoPacks.length > 0 && (
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "16px" }}>
                    <span style={{ fontSize: "24px" }}>▶</span>
                    <h3 style={{ fontFamily: "var(--sans)", fontSize: "16px", fontWeight: 700 }}>Video Loops</h3>
                  </div>
                  {videoPacks.map((pack) => (
                    <AssetCard key={pack.id} pack={pack} />
                  ))}
                  <Link href="/skills/videos" style={{ display: "inline-block", marginTop: "12px", fontFamily: "var(--sans)", fontSize: "13px", color: "var(--coral)", textDecoration: "none" }}>
                    View all videos →
                  </Link>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      <section className="tight">
        <div className="container">
          <SectionRule roman="III." meta="How it works" page="003 / 004" />
          <PageHeader
            label="Method"
            labelIndex="Nº 02"
            title={<>Three steps to <em>ship</em><CoralDot /></>}
          />
          <div className="method-grid">
            <div className="method-step">
              <div className="num">1</div>
              <h4>Discover</h4>
              <p>Browse curated open-source website designs. Filter by framework, category, or style.</p>
            </div>
            <div className="method-step">
              <div className="num">2</div>
              <h4>Install</h4>
              <p>Copy-paste code or use the CLI. Files go directly into your project. No lock-in.</p>
            </div>
            <div className="method-step">
              <div className="num">3</div>
              <h4>Build</h4>
              <p>AI reads the installed code. Remix, modify, and create new designs from real references.</p>
            </div>
          </div>
        </div>
      </section>

      <div className="work">
        <div style={{ position: "relative", zIndex: 1 }}>
          <SectionRule roman="IV." meta="Start building" page="004 / 004" />
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "50px", alignItems: "center" }}>
            <div>
              <span className="label" style={{ color: "var(--coral)" }}>
                Get started <span className="ix">· Nº 03</span>
              </span>
              <h2 className="display" style={{ fontSize: "clamp(40px, 5vw, 66px)", margin: "28px 0 36px", color: "var(--paper)" }}>
                Start building with <em style={{ fontFamily: "var(--serif)", fontStyle: "italic", fontWeight: 500 }}>Design Skills</em><CoralDot />
              </h2>
              <p className="lead" style={{ color: "rgba(247, 241, 222, 0.7)", marginBottom: "36px" }}>
                Browse the registry, install a skill, and let AI consume from your codebase.
                No AI generation. No complex infrastructure. Just code.
              </p>
              <div style={{ display: "flex", gap: "14px" }}>
                <Link href="/skills/websites" className="btn btn-primary">
                  Browse Websites
                  <span className="arrow">
                    <svg viewBox="0 0 24 24"><path d="M5 19L19 5M19 5H8M19 5v11" /></svg>
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
