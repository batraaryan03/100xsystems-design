"use client";

import Link from "next/link";

export function OpenDesignLanding() {
  return (
    <div style={{ background: "var(--paper)", minHeight: "100vh" }}>
      <section style={{ padding: "130px 0", minHeight: "calc(100vh - 140px)", display: "flex", flexDirection: "column" }}>
        <div className="container" style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center" }}>
          <span className="label">
            Open-source design studio <span className="ix">· Nº 01</span>
          </span>
          <h1 className="display" style={{ fontSize: "clamp(44px, 5vw, 78px)", margin: "28px 0" }}>
            Designing <em>intelligence</em> with skills, <em>taste</em>, and <em>code</em><span style={{ color: "var(--coral)" }}>.</span>
          </h1>
          <p className="lead" style={{ marginBottom: "36px", maxWidth: "42ch" }}>
            12 coding agents drive 31 composable skills and 72 brand-grade design systems. Local-first, web-deployable, BYOK at every layer.
          </p>
          <div style={{ display: "flex", gap: "14px", marginBottom: "38px" }}>
            <a href="https://github.com/nexu-io/open-design" target="_blank" rel="noopener noreferrer" className="btn btn-primary">
              Star on GitHub
              <span className="arrow">
                <svg viewBox="0 0 24 24"><path d="M5 19L19 5M19 5H8M19 5v11" /></svg>
              </span>
            </a>
            <Link href="/packs" className="btn btn-ghost">
              Browse Skills
            </Link>
          </div>
          <div style={{ display: "flex", gap: "22px", alignItems: "center" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "9px" }}>
              <span className="stat-ring coral">12</span>
              <span style={{ fontFamily: "var(--sans)", fontSize: "11px", color: "var(--ink-soft)", letterSpacing: "0.04em", textTransform: "uppercase" }}>
                <b style={{ display: "block", fontWeight: 700, color: "var(--ink)", fontSize: "12px" }}>12</b>
                Agents
              </span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "9px" }}>
              <span className="stat-ring">31</span>
              <span style={{ fontFamily: "var(--sans)", fontSize: "11px", color: "var(--ink-soft)", letterSpacing: "0.04em", textTransform: "uppercase" }}>
                <b style={{ display: "block", fontWeight: 700, color: "var(--ink)", fontSize: "12px" }}>31</b>
                Skills
              </span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "9px" }}>
              <span className="stat-ring">72</span>
              <span style={{ fontFamily: "var(--sans)", fontSize: "11px", color: "var(--ink-soft)", letterSpacing: "0.04em", textTransform: "uppercase" }}>
                <b style={{ display: "block", fontWeight: 700, color: "var(--ink)", fontSize: "12px" }}>72</b>
                Design Systems
              </span>
            </div>
          </div>
        </div>
      </section>

      <section style={{ padding: "130px 0" }}>
        <div className="container">
          <div className="sec-rule">
            <span className="roman">I.</span>
            <span className="meta-grp">
              <span>Capabilities</span>
              <span className="dot-mark">•</span>
            </span>
            <span>002 / 004</span>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "18px" }}>
            {[
              { num: "01", tag: "CODE", title: "Frontend Design", desc: "Create visually strong landing pages, websites, and app UIs with restrained composition." },
              { num: "02", tag: "IMAGE", title: "Image Generation", desc: "Generate images and videos using AI models. Production-grade catalogue." },
              { num: "03", tag: "AUDIO", title: "Music Production", desc: "Full-lifecycle AI music album production — concept, lyric drafting, track sequencing." },
              { num: "04", tag: "UTILITY", title: "Design Review", desc: "Designer Who Codes: visual audit then fixes with atomic commits." },
            ].map((card) => (
              <div key={card.num} className="card">
                <div className="num">
                  <span>{card.num}</span>
                  <span className="tag">{card.tag}</span>
                </div>
                <h3>{card.title}</h3>
                <p>{card.desc}</p>
                <span className="arrow-mark">
                  <svg viewBox="0 0 24 24"><path d="M5 19L19 5M19 5H8M19 5v11" /></svg>
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
