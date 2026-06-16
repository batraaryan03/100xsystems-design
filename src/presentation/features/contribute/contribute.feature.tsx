"use client";

import Link from "next/link";
import { useState } from "react";
import { SectionRule } from "@/presentation/_components/components.layout";
import { CoralDot, CodeBlock } from "@/presentation/_components/components.atomic";

const MANIFEST_TEMPLATE = `{
  "id": "my-awesome-landing",
  "slug": "my-awesome-landing",
  "title": "My Awesome Landing",
  "description": "A beautiful landing page with modern design",
  "tags": ["landing", "modern", "responsive"],
  "framework": "html",
  "category": "landing",
  "assetType": "component",
  "screenshots": [],
  "files": [
    { "path": "index.html", "type": "component" }
  ],
  "dependencies": [],
  "installCommand": "npx shadcn@latest add batraaryan03/100xsystems-design/my-awesome-landing",
  "license": "MIT",
  "author": { "name": "Your Name" },
  "featured": false,
  "createdAt": "2026-06-16"
}`;

const PR_TEMPLATE = `## Add [Pack Name] to Registry

### What does this pack do?
A brief description of the design/template.

### Pack type
- [ ] Component (HTML/CSS/React website)
- [ ] Illustration (SVG illustration pack)
- [ ] Image (texture/photo/gradient pack)
- [ ] Video (video/animation pack)

### How to use it
1. Run \`npx tsx scripts/sync-registry.ts\`
2. Run \`npx shadcn@latest registry validate\`
3. Done!

### Checklist
- [ ] Pack follows naming convention: \`[category]-[name]\`
- [ ] All files in \`files\` array
- [ ] Entry added to \`public/registry/data.json\`
- [ ] \`npx tsx scripts/sync-registry.ts\` passes
- [ ] \`npx shadcn@latest registry validate\` passes
- [ ] License specified (MIT, Apache-2.0, or CC0)
- [ ] Author info complete
- [ ] Attribution for third-party assets`;

export function ContributeFeature() {
  const [copiedManifest, setCopiedManifest] = useState(false);
  const [copiedPR, setCopiedPR] = useState(false);

  const copyManifest = async () => {
    await navigator.clipboard.writeText(MANIFEST_TEMPLATE);
    setCopiedManifest(true);
    setTimeout(() => setCopiedManifest(false), 2000);
  };

  const copyPR = async () => {
    await navigator.clipboard.writeText(PR_TEMPLATE);
    setCopiedPR(true);
    setTimeout(() => setCopiedPR(false), 2000);
  };

  return (
    <div>
      <section className="tight">
        <div className="container">
          <SectionRule roman="V." meta="Contribute" page="001 / 001" />

          <div style={{ display: "grid", gridTemplateColumns: "1.05fr 1fr", gap: "80px", alignItems: "start" }}>
            <div>
              <span className="label">
                Publish a Pack <span className="ix">· Nº 01</span>
              </span>
              <h2 className="display" style={{ fontSize: "clamp(44px, 5.4vw, 78px)", margin: "30px 0 36px" }}>
                Share your <em>designs</em><CoralDot />
              </h2>
              <p className="lead" style={{ marginBottom: "36px", maxWidth: "42ch", fontSize: "17px" }}>
                Contributed designs help the community grow. Follow these steps to publish
                your own website designs to the registry.
              </p>

              <div style={{ display: "flex", flexDirection: "column", gap: "40px", marginBottom: "40px" }}>
                {/* Step 1 */}
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "16px" }}>
                    <span style={{
                      width: "40px",
                      height: "40px",
                      borderRadius: "50%",
                      background: "var(--coral)",
                      color: "#fff",
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontFamily: "var(--sans)",
                      fontSize: "16px",
                      fontWeight: 700,
                      flexShrink: 0,
                    }}>
                      1
                    </span>
                    <h3 style={{ fontFamily: "var(--sans)", fontSize: "20px", fontWeight: 700, letterSpacing: "-0.014em" }}>
                      Create Your Design
                    </h3>
                  </div>
                  <p style={{ fontFamily: "var(--body)", fontSize: "14px", color: "var(--ink-mute)", lineHeight: 1.6, maxWidth: "42ch", paddingLeft: "56px" }}>
                    Build your website design. It can be a single HTML file, a split HTML/CSS setup,
                    or a React component. Make sure it works standalone without external dependencies
                    (except fonts).
                  </p>
                </div>

                {/* Step 2 */}
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "16px" }}>
                    <span style={{
                      width: "40px",
                      height: "40px",
                      borderRadius: "50%",
                      background: "var(--coral)",
                      color: "#fff",
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontFamily: "var(--sans)",
                      fontSize: "16px",
                      fontWeight: 700,
                      flexShrink: 0,
                    }}>
                      2
                    </span>
                    <h3 style={{ fontFamily: "var(--sans)", fontSize: "20px", fontWeight: 700, letterSpacing: "-0.014em" }}>
                      Prepare the Pack
                    </h3>
                  </div>
                  <p style={{ fontFamily: "var(--body)", fontSize: "14px", color: "var(--ink-mute)", lineHeight: 1.6, maxWidth: "42ch", paddingLeft: "56px", marginBottom: "12px" }}>
                    Create a folder with your pack name (e.g., <code style={{ fontFamily: "var(--mono)", fontSize: "13px", background: "var(--bone)", padding: "1px 6px", borderRadius: "4px" }}>modern-landing</code>).
                    Include:
                  </p>
                  <ul style={{ fontFamily: "var(--body)", fontSize: "14px", color: "var(--ink-mute)", lineHeight: 1.6, paddingLeft: "56px", listStyle: "none" }}>
                    <li style={{ marginBottom: "8px", display: "flex", alignItems: "center", gap: "8px" }}>
                      <span style={{ color: "var(--coral)" }}>•</span>
                      Your design files (HTML, CSS, or React components)
                    </li>
                    <li style={{ marginBottom: "8px", display: "flex", alignItems: "center", gap: "8px" }}>
                      <span style={{ color: "var(--coral)" }}>•</span>
                      <code style={{ fontFamily: "var(--mono)", fontSize: "13px", background: "var(--bone)", padding: "1px 6px", borderRadius: "4px" }}>manifest.json</code> (copy the template below)
                    </li>
                    <li style={{ marginBottom: "8px", display: "flex", alignItems: "center", gap: "8px" }}>
                      <span style={{ color: "var(--coral)" }}>•</span>
                      <code style={{ fontFamily: "var(--mono)", fontSize: "13px", background: "var(--bone)", padding: "1px 6px", borderRadius: "4px" }}>README.md</code> with usage instructions
                    </li>
                  </ul>
                </div>

                {/* Step 3 */}
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "16px" }}>
                    <span style={{
                      width: "40px",
                      height: "40px",
                      borderRadius: "50%",
                      background: "var(--coral)",
                      color: "#fff",
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontFamily: "var(--sans)",
                      fontSize: "16px",
                      fontWeight: 700,
                      flexShrink: 0,
                    }}>
                      3
                    </span>
                    <h3 style={{ fontFamily: "var(--sans)", fontSize: "20px", fontWeight: 700, letterSpacing: "-0.014em" }}>
                      Fork &amp; Add to Registry
                    </h3>
                  </div>
                  <p style={{ fontFamily: "var(--body)", fontSize: "14px", color: "var(--ink-mute)", lineHeight: 1.6, maxWidth: "42ch", paddingLeft: "56px", marginBottom: "12px" }}>
                    Fork the repository, add your pack folder to <code style={{ fontFamily: "var(--mono)", fontSize: "13px", background: "var(--bone)", padding: "1px 6px", borderRadius: "4px" }}>public/registry/packs/</code>,
                    and update the registry index. Then open a pull request.
                  </p>
                </div>

                {/* Step 4 */}
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "16px" }}>
                    <span style={{
                      width: "40px",
                      height: "40px",
                      borderRadius: "50%",
                      background: "var(--coral)",
                      color: "#fff",
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontFamily: "var(--sans)",
                      fontSize: "16px",
                      fontWeight: 700,
                      flexShrink: 0,
                    }}>
                      4
                    </span>
                    <h3 style={{ fontFamily: "var(--sans)", fontSize: "20px", fontWeight: 700, letterSpacing: "-0.014em" }}>
                      Submit Pull Request
                    </h3>
                  </div>
                  <p style={{ fontFamily: "var(--body)", fontSize: "14px", color: "var(--ink-mute)", lineHeight: 1.6, maxWidth: "42ch", paddingLeft: "56px", marginBottom: "12px" }}>
                    Open a PR with your pack. Use the template below and include:
                  </p>
                  <ul style={{ fontFamily: "var(--body)", fontSize: "14px", color: "var(--ink-mute)", lineHeight: 1.6, paddingLeft: "56px", listStyle: "none" }}>
                    <li style={{ marginBottom: "8px", display: "flex", alignItems: "center", gap: "8px" }}>
                      <span style={{ color: "var(--coral)" }}>•</span>
                      Description of your design
                    </li>
                    <li style={{ marginBottom: "8px", display: "flex", alignItems: "center", gap: "8px" }}>
                      <span style={{ color: "var(--coral)" }}>•</span>
                      Screenshots or live preview links
                    </li>
                    <li style={{ marginBottom: "8px", display: "flex", alignItems: "center", gap: "8px" }}>
                      <span style={{ color: "var(--coral)" }}>•</span>
                      License information
                    </li>
                  </ul>
                </div>

                {/* Step 5 */}
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "16px" }}>
                    <span style={{
                      width: "40px",
                      height: "40px",
                      borderRadius: "50%",
                      background: "var(--coral)",
                      color: "#fff",
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontFamily: "var(--sans)",
                      fontSize: "16px",
                      fontWeight: 700,
                      flexShrink: 0,
                    }}>
                      5
                    </span>
                    <h3 style={{ fontFamily: "var(--sans)", fontSize: "20px", fontWeight: 700, letterSpacing: "-0.014em" }}>
                      Review &amp; Merge
                    </h3>
                  </div>
                  <p style={{ fontFamily: "var(--body)", fontSize: "14px", color: "var(--ink-mute)", lineHeight: 1.6, maxWidth: "42ch", paddingLeft: "56px" }}>
                    We&apos;ll review your PR for quality, formatting, and license compatibility.
                    Once approved, your design will be available to the community!
                  </p>
                </div>
              </div>

              <div style={{ borderTop: "1px solid var(--line)", paddingTop: "32px", marginTop: "40px" }}>
                <h3 style={{ fontFamily: "var(--sans)", fontSize: "14px", fontWeight: 600, color: "var(--ink-mute)", letterSpacing: "0.18em", textTransform: "uppercase", marginBottom: "16px" }}>
                  Need Help?
                </h3>
                <p style={{ fontFamily: "var(--body)", fontSize: "14px", color: "var(--ink-mute)", lineHeight: 1.6, maxWidth: "42ch", marginBottom: "20px" }}>
                  Check out existing packs for reference, or open an issue on GitHub
                  if you have questions about the contribution process.
                </p>
                <div style={{ display: "flex", gap: "12px" }}>
                  <a
                    href="https://github.com/batraaryan03/100xsystems-design"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-ghost"
                    style={{ fontSize: "13px" }}
                  >
                    View on GitHub
                    <span className="arrow">
                      <svg viewBox="0 0 24 24"><path d="M5 19L19 5M19 5H8M19 5v11" /></svg>
                    </span>
                  </a>
                  <Link href="/skills/websites" className="btn btn-ghost" style={{ fontSize: "13px" }}>
                    Browse Existing Packs
                  </Link>
                </div>
              </div>
            </div>

            {/* Right column - Templates */}
            <div style={{ minWidth: 0, overflow: "hidden" }}>
              <h3 style={{ fontFamily: "var(--sans)", fontSize: "14px", fontWeight: 600, color: "var(--ink-mute)", letterSpacing: "0.18em", textTransform: "uppercase", marginBottom: "24px" }}>
                Templates
              </h3>

              {/* Manifest Template */}
              <div style={{ marginBottom: "32px" }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "8px" }}>
                  <h4 style={{ fontFamily: "var(--sans)", fontSize: "12px", fontWeight: 600, color: "var(--ink-mute)" }}>
                    manifest.json Template
                  </h4>
                  <button
                    onClick={copyManifest}
                    className="pill"
                    style={{ fontSize: "11px", padding: "4px 12px" }}
                  >
                    {copiedManifest ? "Copied!" : "Copy"}
                  </button>
                </div>
                <div style={{ maxHeight: "400px", overflow: "auto", borderRadius: "12px" }}>
                  <CodeBlock code={MANIFEST_TEMPLATE} language="json" />
                </div>
              </div>

              {/* PR Template */}
              <div>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "8px" }}>
                  <h4 style={{ fontFamily: "var(--sans)", fontSize: "12px", fontWeight: 600, color: "var(--ink-mute)" }}>
                    PR Template
                  </h4>
                  <button
                    onClick={copyPR}
                    className="pill"
                    style={{ fontSize: "11px", padding: "4px 12px" }}
                  >
                    {copiedPR ? "Copied!" : "Copy"}
                  </button>
                </div>
                <div style={{ maxHeight: "400px", overflow: "auto", borderRadius: "12px" }}>
                  <CodeBlock code={PR_TEMPLATE} language="markdown" />
                </div>
              </div>

              {/* Quick Links */}
              <div style={{ marginTop: "32px", padding: "20px", background: "var(--bone)", borderRadius: "12px" }}>
                <h4 style={{ fontFamily: "var(--sans)", fontSize: "12px", fontWeight: 600, color: "var(--ink-mute)", letterSpacing: "0.18em", textTransform: "uppercase", marginBottom: "12px" }}>
                  Quick Links
                </h4>
                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                  <a
                    href="https://github.com/batraaryan03/100xsystems-design/tree/main/public/registry/packs"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ fontFamily: "var(--body)", fontSize: "14px", color: "var(--ink)", textDecoration: "none", display: "flex", alignItems: "center", gap: "8px" }}
                  >
                    <span style={{ color: "var(--coral)" }}>→</span>
                    View existing packs structure
                  </a>
                  <a
                    href="https://github.com/batraaryan03/100xsystems-design/blob/main/public/registry/packs/open-design-landing-html/manifest.json"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ fontFamily: "var(--body)", fontSize: "14px", color: "var(--ink)", textDecoration: "none", display: "flex", alignItems: "center", gap: "8px" }}
                  >
                    <span style={{ color: "var(--coral)" }}>→</span>
                    Example manifest.json
                  </a>
                  <Link
                    href="/admin"
                    style={{ fontFamily: "var(--body)", fontSize: "14px", color: "var(--ink)", textDecoration: "none", display: "flex", alignItems: "center", gap: "8px" }}
                  >
                    <span style={{ color: "var(--coral)" }}>→</span>
                    Admin Dashboard (preview tool)
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
