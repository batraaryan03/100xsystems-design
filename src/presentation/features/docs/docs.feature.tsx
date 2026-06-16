"use client";

import Link from "next/link";
import { SectionRule, PageHeader } from "@/presentation/_components/components.layout";
import { CoralDot, CodeBlock } from "@/presentation/_components/components.atomic";

export function DocsFeature() {
  return (
    <div>
      <section className="tight">
        <div className="container" style={{ maxWidth: "900px" }}>
          <SectionRule roman="·" meta="Documentation" page="001 / 001" />

          <PageHeader
            label="Documentation"
            labelIndex="Nº 01"
            title={<>Learn how to use <em>Design Skills</em><CoralDot /></>}
            lead="Everything you need to know about installing, using, and contributing to Design Skills."
          />

          <div style={{ display: "flex", flexDirection: "column", gap: "48px" }}>
            {/* Introduction */}
            <div>
              <h2 className="display" style={{ fontSize: "28px", marginBottom: "16px" }}>
                Introduction<CoralDot />
              </h2>
          <p style={{ fontFamily: "var(--body)", fontSize: "15px", color: "var(--ink-soft)", lineHeight: 1.7, maxWidth: "60ch" }}>
            Want to add your own website design to the registry? Here&apos;s how:
          </p>
              <p style={{ fontFamily: "var(--body)", fontSize: "15px", color: "var(--ink-soft)", lineHeight: 1.7, maxWidth: "60ch", marginTop: "12px" }}>
                Each skill is a complete website design — HTML, CSS, React components, or Next.js pages — that you can
                copy-paste or install via the shadcn CLI. AI can then consume these references directly from your codebase.
              </p>
            </div>

            {/* Installation */}
            <div>
              <h2 className="display" style={{ fontSize: "28px", marginBottom: "16px" }}>
                Installation<CoralDot />
              </h2>
              <p style={{ fontFamily: "var(--body)", fontSize: "15px", color: "var(--ink-soft)", lineHeight: 1.7, maxWidth: "60ch", marginBottom: "16px" }}>
                Install any skill using the shadcn CLI:
              </p>
              <CodeBlock code="npx shadcn@latest add batraaryan03/100xsystems-design/open-design-landing-html" language="bash" showViewMore={false} />

              <p style={{ fontFamily: "var(--body)", fontSize: "15px", color: "var(--ink-soft)", lineHeight: 1.7, maxWidth: "60ch", marginTop: "16px", marginBottom: "8px" }}>
                Install an illustration pack:
              </p>
              <CodeBlock code="npx shadcn@latest add batraaryan03/100xsystems-design/open-doodles-style" language="bash" showViewMore={false} />
              <p style={{ fontFamily: "var(--body)", fontSize: "15px", color: "var(--ink-soft)", lineHeight: 1.7, maxWidth: "60ch", marginTop: "16px", marginBottom: "16px" }}>
                Or browse the <Link href="/skills/websites" style={{ color: "var(--coral)", textDecoration: "none" }}>registry</Link> and copy the install command from any skill&apos;s detail page.
              </p>

              <h3 style={{ fontFamily: "var(--sans)", fontSize: "18px", fontWeight: 700, marginBottom: "12px", marginTop: "24px" }}>
                List available skills
              </h3>
              <CodeBlock code="npx shadcn@latest list batraaryan03/100xsystems-design" language="bash" />
            </div>

            {/* Available Skills */}
            <div>
              <h2 className="display" style={{ fontSize: "28px", marginBottom: "16px" }}>
                Available Skills<CoralDot />
              </h2>
              <p style={{ fontFamily: "var(--body)", fontSize: "15px", color: "var(--ink-soft)", lineHeight: 1.7, maxWidth: "60ch", marginBottom: "16px" }}>
                Browse all available skills in the registry. Skills come in four types:
              </p>
              <ul style={{ fontFamily: "var(--body)", fontSize: "15px", color: "var(--ink-soft)", lineHeight: 1.7, paddingLeft: "20px", maxWidth: "60ch" }}>
                <li><Link href="/skills/websites" style={{ color: "var(--coral)", textDecoration: "none" }}>Websites</Link> — Complete HTML, CSS, or React page designs</li>
                <li><Link href="/skills/illustrations" style={{ color: "var(--coral)", textDecoration: "none" }}>Illustrations</Link> — SVG character and icon illustration packs</li>
                <li><Link href="/skills/images" style={{ color: "var(--coral)", textDecoration: "none" }}>Images</Link> — Textures, gradients, and background patterns</li>
                <li><Link href="/skills/videos" style={{ color: "var(--coral)", textDecoration: "none" }}>Videos</Link> — CSS-animated looping backgrounds</li>
              </ul>
              <p style={{ fontFamily: "var(--body)", fontSize: "15px", color: "var(--ink-soft)", lineHeight: 1.7, maxWidth: "60ch", marginTop: "12px" }}>
                Each skill includes live preview, source code, install command, and license attribution.
              </p>
            </div>

            {/* How to Add Your Own */}
            <div>
              <h2 className="display" style={{ fontSize: "28px", marginBottom: "16px" }}>
                Add Your Own<CoralDot />
              </h2>
              <p style={{ fontFamily: "var(--body)", fontSize: "15px", color: "var(--ink-soft)", lineHeight: 1.7, maxWidth: "60ch", marginBottom: "16px" }}>
                Want to add your own website design to the registry? Here&apos;s how:
              </p>

              <h3 style={{ fontFamily: "var(--sans)", fontSize: "18px", fontWeight: 700, marginBottom: "12px" }}>
                Step 1: Create your design
              </h3>
              <p style={{ fontFamily: "var(--body)", fontSize: "15px", color: "var(--ink-soft)", lineHeight: 1.7, maxWidth: "60ch", marginBottom: "16px" }}>
                Create your website design as a self-contained HTML file, or as separate HTML/CSS files, or as a React component.
              </p>

              <h3 style={{ fontFamily: "var(--sans)", fontSize: "18px", fontWeight: 700, marginBottom: "12px" }}>
                Step 2: Add to the registry
              </h3>
              <p style={{ fontFamily: "var(--body)", fontSize: "15px", color: "var(--ink-soft)", lineHeight: 1.7, maxWidth: "60ch", marginBottom: "12px" }}>
                Add your pack to <code style={{ fontFamily: "var(--mono)", fontSize: "13px", background: "var(--bone)", padding: "2px 6px", borderRadius: "4px" }}>public/registry/data.json</code>:
              </p>
              <CodeBlock code={`{
  "id": "my-awesome-design",
  "slug": "my-awesome-design",
  "title": "My Awesome Design",
  "description": "A beautiful landing page",
  "tags": ["landing", "modern"],
  "framework": "html",
  "category": "landing",
  "files": [
    { "path": "index.html", "type": "component" }
  ],
  "installCommand": "npx shadcn@latest add batraaryan03/100xsystems-design/my-awesome-design",
  "license": "MIT",
  "author": { "name": "Your Name" }
}`} language="json" />

              <h3 style={{ fontFamily: "var(--sans)", fontSize: "18px", fontWeight: 700, marginBottom: "12px", marginTop: "24px" }}>
                Step 3: Add the files
              </h3>
              <p style={{ fontFamily: "var(--body)", fontSize: "15px", color: "var(--ink-soft)", lineHeight: 1.7, maxWidth: "60ch", marginBottom: "12px" }}>
                Place your design files in <code style={{ fontFamily: "var(--mono)", fontSize: "13px", background: "var(--bone)", padding: "2px 6px", borderRadius: "4px" }}>public/registry/packs/my-awesome-design/</code>
              </p>

              <h3 style={{ fontFamily: "var(--sans)", fontSize: "18px", fontWeight: 700, marginBottom: "12px", marginTop: "24px" }}>
                Step 4: Sync the registry
              </h3>
              <CodeBlock code="npx tsx scripts/sync-registry.ts" language="bash" />

              <h3 style={{ fontFamily: "var(--sans)", fontSize: "18px", fontWeight: 700, marginBottom: "12px", marginTop: "24px" }}>
                Step 5: Commit and push
              </h3>
              <CodeBlock code={`git add .
git commit -m "feat: add my-awesome-design"
git push`} language="bash" />
            </div>

            {/* Contributing */}
            <div>
              <h2 className="display" style={{ fontSize: "28px", marginBottom: "16px" }}>
                Contributing<CoralDot />
              </h2>
              <p style={{ fontFamily: "var(--body)", fontSize: "15px", color: "var(--ink-soft)", lineHeight: 1.7, maxWidth: "60ch", marginBottom: "16px" }}>
                We welcome contributions! You can:
              </p>
              <ul style={{ fontFamily: "var(--body)", fontSize: "15px", color: "var(--ink-soft)", lineHeight: 1.7, paddingLeft: "20px", maxWidth: "60ch" }}>
                <li>Add new website designs, illustrations, textures, or video loops</li>
                <li>Improve existing designs</li>
                <li>Report bugs or suggest features</li>
                <li>Improve documentation</li>
              </ul>
              <p style={{ fontFamily: "var(--body)", fontSize: "15px", color: "var(--ink-soft)", lineHeight: 1.7, maxWidth: "60ch", marginTop: "12px" }}>
                Visit the <Link href="/contribute" style={{ color: "var(--coral)", textDecoration: "none" }}>contribute page</Link> for more details.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
