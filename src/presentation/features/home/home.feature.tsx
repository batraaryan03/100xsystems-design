"use client";

import { useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePacks } from "@/application/packs/packs.hooks";
import { SectionRule, PageHeader } from "@/presentation/_components/components.layout";
import { CoralDot } from "@/presentation/_components/components.atomic";
import type { Pack } from "@/application/packs/packs.types";

function CategoryCard({
  title,
  count,
  icon,
  href,
  color,
  packs,
}: {
  title: string;
  count: number;
  icon: string;
  href: string;
  color: string;
  packs: Pack[];
}) {
  return (
    <Link
      href={href}
      style={{
        textDecoration: "none",
        color: "inherit",
        display: "block",
        background: "var(--bone)",
        borderRadius: "20px",
        padding: "32px 28px 28px",
        boxShadow: "var(--shadow), inset 0 0 0 1px rgba(21,20,15,0.06)",
        transition: "transform 0.24s ease, box-shadow 0.24s ease",
        position: "relative",
        overflow: "hidden",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-4px)";
        e.currentTarget.style.boxShadow = "0 40px 80px -32px rgba(21,20,15,0.25), inset 0 0 0 1px rgba(21,20,15,0.06)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "";
        e.currentTarget.style.boxShadow = "";
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "20px" }}>
        <span style={{ fontSize: "36px", lineHeight: 1 }}>{icon}</span>
        <span
          style={{
            fontFamily: "var(--sans)",
            fontSize: "24px",
            fontWeight: 700,
            color: color,
            lineHeight: 1,
          }}
        >
          {count}
        </span>
      </div>
      <h3
        style={{
          fontFamily: "var(--sans)",
          fontSize: "20px",
          fontWeight: 700,
          letterSpacing: "-0.014em",
          marginBottom: "8px",
        }}
      >
        {title}
      </h3>
      <p
        style={{
          fontFamily: "var(--body)",
          fontSize: "13px",
          color: "var(--ink-mute)",
          lineHeight: 1.5,
          marginBottom: "18px",
        }}
      >
        Browse all {count} {title.toLowerCase()} packs
      </p>
      <div style={{ display: "flex", gap: "8px", overflow: "hidden" }}>
        {packs.slice(0, 3).map((pack) => (
          <div
            key={pack.id}
            style={{
              width: "64px",
              height: "64px",
              borderRadius: "10px",
              overflow: "hidden",
              flexShrink: 0,
              background: "var(--paper-dark)",
              position: "relative",
            }}
          >
            {pack.thumbnail && (
              <Image
                src={pack.thumbnail}
                alt={pack.title}
                fill
                sizes="64px"
                style={{ objectFit: "cover" }}
              />
            )}
          </div>
        ))}
        {packs.length > 3 && (
          <div
            style={{
              width: "64px",
              height: "64px",
              borderRadius: "10px",
              background: "var(--line-soft)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontFamily: "var(--sans)",
              fontSize: "13px",
              fontWeight: 600,
              color: "var(--ink-faint)",
              flexShrink: 0,
            }}
          >
            +{packs.length - 3}
          </div>
        )}
      </div>
    </Link>
  );
}

export function HomeFeature() {
  const { packs, frameworks } = usePacks();
  const websitePacks = useMemo(() => packs.filter((p) => !p.assetType || p.assetType === "component"), [packs]);
  const illustrationPacks = useMemo(() => packs.filter((p) => p.assetType === "illustration"), [packs]);
  const imagePacks = useMemo(() => packs.filter((p) => p.assetType === "image"), [packs]);
  const videoPacks = useMemo(() => packs.filter((p) => p.assetType === "video"), [packs]);

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
              Start Browsing
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
                Total Packs
              </span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "9px" }}>
              <span className="stat-ring">{frameworks.length}</span>
              <span style={{ fontFamily: "var(--sans)", fontSize: "11px", color: "var(--ink-soft)", letterSpacing: "0.04em", textTransform: "uppercase" }}>
                <b style={{ display: "block", fontWeight: 700, color: "var(--ink)", fontSize: "12px" }}>{frameworks.length}</b>
                Formats
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
          <SectionRule roman="I." meta="Browse by category" page="001 / 004" />
          <PageHeader
            label="Four skill types"
            labelIndex="Nº 01"
            title={<>Choose your <em>craft</em><CoralDot /></>}
            lead="Complete websites, SVG illustrations, background textures, and motion assets. Each skill installs directly into your project."
          />
          <div className="category-grid">
            <CategoryCard
              title="Websites"
              count={websitePacks.length}
              icon="▣"
              href="/skills/websites"
              color="var(--coral)"
              packs={websitePacks.slice(0, 6)}
            />
            <CategoryCard
              title="Illustrations"
              count={illustrationPacks.length}
              icon="✦"
              href="/skills/illustrations"
              color="var(--mustard)"
              packs={illustrationPacks.slice(0, 6)}
            />
            <CategoryCard
              title="Images"
              count={imagePacks.length}
              icon="◎"
              href="/skills/images"
              color="var(--olive)"
              packs={imagePacks.slice(0, 6)}
            />
            <CategoryCard
              title="Videos"
              count={videoPacks.length}
              icon="▶"
              href="/skills/videos"
              color="var(--ink-mute)"
              packs={videoPacks.slice(0, 6)}
            />
          </div>
        </div>
      </section>

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
