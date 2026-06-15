"use client";

import { SectionRule } from "@/presentation/_components/components.layout";
import { CoralDot } from "@/presentation/_components/components.atomic";

export function AboutFeature() {
  return (
    <div>
      <section className="tight">
        <div className="container">
          <SectionRule roman="IV." meta="About Design Skills" page="001 / 001" />

          <div style={{ display: "grid", gridTemplateColumns: "1.05fr 1fr", gap: "80px", alignItems: "center" }}>
            <div>
              <span className="label">
                About <span className="ix">· Nº 01</span>
              </span>
              <h2 className="display" style={{ fontSize: "clamp(44px, 5.4vw, 78px)", margin: "30px 0 36px" }}>
                Design <em>Skills</em><CoralDot />
              </h2>
              <p className="lead" style={{ marginBottom: "36px", maxWidth: "42ch", fontSize: "17px" }}>
                A curated registry of open-source website designs. Instead of building from scratch,
                install beautiful, production-ready website designs directly into your project.
              </p>

              <div style={{ display: "flex", flexDirection: "column", gap: "24px", marginBottom: "40px" }}>
                <div>
                  <h3 style={{ fontFamily: "var(--sans)", fontSize: "18px", fontWeight: 700, marginBottom: "8px" }}>
                    Why Design Skills?
                  </h3>
                  <p style={{ fontFamily: "var(--body)", fontSize: "14px", color: "var(--ink-mute)", lineHeight: 1.6, maxWidth: "42ch" }}>
                    Most AI design tools try to generate designs from prompts. Design Skills takes a
                    different approach — it provides real, working code from real websites. AI can then
                    consume these references directly from your codebase.
                  </p>
                </div>

                <div>
                  <h3 style={{ fontFamily: "var(--sans)", fontSize: "18px", fontWeight: 700, marginBottom: "8px" }}>
                    How it works
                  </h3>
                  <ol style={{ fontFamily: "var(--body)", fontSize: "14px", color: "var(--ink-mute)", lineHeight: 1.6, paddingLeft: "20px" }}>
                    <li>Browse the registry for designs you like</li>
                    <li>Install them via CLI or copy-paste</li>
                    <li>AI reads the installed code as context</li>
                    <li>Build new designs based on real references</li>
                  </ol>
                </div>

                <div>
                  <h3 style={{ fontFamily: "var(--sans)", fontSize: "18px", fontWeight: 700, marginBottom: "8px" }}>
                    Open Source
                  </h3>
                  <p style={{ fontFamily: "var(--body)", fontSize: "14px", color: "var(--ink-mute)", lineHeight: 1.6, maxWidth: "42ch" }}>
                    Design Skills is open source and community-driven. All skills in the registry are
                    from open-source projects with permissive licenses (MIT, Apache 2.0).
                  </p>
                </div>
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: "20px", marginTop: "56px", color: "var(--ink-faint)", fontFamily: "var(--sans)", fontSize: "11px", letterSpacing: "0.18em", textTransform: "uppercase" }}>
                <span style={{ width: "30px", height: "30px", borderRadius: "50%", border: "1px solid var(--ink)", display: "inline-flex", alignItems: "center", justifyContent: "center", fontFamily: "var(--serif)", fontStyle: "italic", fontSize: "14px", color: "var(--ink)" }}>
                  DS
                </span>
                <span>
                  Built by <span style={{ color: "var(--ink)" }}>100xsystems</span>
                </span>
              </div>
            </div>

            <div style={{ position: "relative", aspectRatio: "1/1", maxWidth: "620px", marginLeft: "auto" }}>
              <div style={{
                width: "100%",
                height: "100%",
                background: "var(--bone)",
                borderRadius: "18px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontFamily: "var(--serif)",
                fontStyle: "italic",
                fontSize: "120px",
                color: "var(--ink-faint)",
                opacity: 0.3,
              }}>
                DS
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
