"use client";

import Link from "next/link";
import { usePacks } from "@/application/packs/packs.hooks";
import { SectionRule, PageHeader } from "@/presentation/_components/components.layout";
import { CoralDot } from "@/presentation/_components/components.atomic";

export function HomeFeature() {
  const { packs, frameworks } = usePacks();

  return (
    <div>
      <section style={{ minHeight: "calc(100vh - 140px)", display: "flex", flexDirection: "column" }}>
        <div className="container" style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center" }}>
          <span className="label">
            Open-source design registry <span className="ix">· Nº 01</span>
          </span>
          <h1 className="display" style={{ fontSize: "clamp(44px, 5vw, 78px)", margin: "28px 0" }}>
            Curated <em>website</em> designs,<br />
            installed as <em>code</em><CoralDot />
          </h1>
          <p className="lead" style={{ marginBottom: "36px", maxWidth: "42ch" }}>
            Find beautiful open-source websites. Install them as code. Own them locally.
            Let AI consume from your codebase.
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
                Websites
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
          <SectionRule roman="I." meta="Browse the collection" page="001 / 003" />
          <PageHeader
            label="Every skill is a droppable folder"
            labelIndex="Nº 01"
            title={<>Browse our curated <em>websites</em><CoralDot /></>}
            lead="Each design is a complete website — HTML, CSS, or React — ready to install."
          />
          <div style={{ display: "flex", justifyContent: "center", marginTop: "32px" }}>
            <Link href="/skills/websites" className="btn btn-primary" style={{ fontSize: "16px", padding: "16px 32px" }}>
              View All Websites
              <span className="arrow">
                <svg viewBox="0 0 24 24"><path d="M5 19L19 5M19 5H8M19 5v11" /></svg>
              </span>
            </Link>
          </div>
        </div>
      </section>

      <section className="tight">
        <div className="container">
          <SectionRule roman="II." meta="How it works" page="002 / 003" />
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
          <SectionRule roman="III." meta="Start building" page="003 / 003" />
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
