"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePack } from "@/application/packs/packs.hooks";
import { Badge, CodeBlock, CoralDot } from "@/presentation/_components/components.atomic";
import { SectionRule } from "@/presentation/_components/components.layout";
import { notFound } from "next/navigation";
import type { Pack } from "@/application/packs/packs.types";
import { getPackSkillRoute } from "@/application/packs/packs.types";

function CopyPageDropdown({ pack, fileContents }: { pack: Pack; fileContents: Record<string, string> }) {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const allCode = Object.entries(fileContents)
    .map(([path, content]) => `// ${path}\n${content}`)
    .join("\n\n");

  const handleCopy = async () => {
    await navigator.clipboard.writeText(allCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    setOpen(false);
  };

  const aiPrompt = `I want to install this design skill in my project. Here is the code for "${pack.title}" (${pack.framework}, ${pack.category}):\n\nInstall command: ${pack.installCommand}\n\nSource code:\n${allCode.slice(0, 3000)}\n\nPlease help me set this up in my project. Create the necessary files, install dependencies, and make sure everything works.`;
  const chatgptUrl = `https://chatgpt.com/?q=${encodeURIComponent(aiPrompt)}`;
  const claudeUrl = `https://claude.ai/new?q=${encodeURIComponent(aiPrompt)}`;
  const v0Url = `https://v0.dev/?q=${encodeURIComponent(`Recreate this design: ${pack.title}. ${allCode.slice(0, 2000)}`)}`;

  return (
    <div style={{ position: "relative" }}>
      <div style={{ display: "flex" }}>
        <button
          onClick={handleCopy}
          style={{
            padding: "8px 16px",
            borderRadius: "8px 0 0 8px",
            border: "1px solid var(--line)",
            background: copied ? "var(--coral)" : "var(--bone)",
            color: copied ? "#fff" : "var(--ink)",
            fontFamily: "var(--sans)",
            fontSize: "13px",
            cursor: "pointer",
            transition: "all 0.18s ease",
          }}
        >
          {copied ? "Copied!" : "Copy page"}
        </button>
        <button
          onClick={() => setOpen(!open)}
          style={{
            padding: "8px 10px",
            borderRadius: "0 8px 8px 0",
            border: "1px solid var(--line)",
            borderLeft: "none",
            background: "var(--bone)",
            color: "var(--ink-mute)",
            fontFamily: "var(--sans)",
            fontSize: "12px",
            cursor: "pointer",
          }}
        >
          ▼
        </button>
      </div>
      {open && (
        <div style={{
          position: "absolute",
          top: "100%",
          right: 0,
          marginTop: "4px",
          background: "var(--bone)",
          border: "1px solid var(--line)",
          borderRadius: "8px",
          overflow: "hidden",
          minWidth: "180px",
          zIndex: 10,
          boxShadow: "var(--shadow)",
        }}>
          <button
            onClick={handleCopy}
            style={{
              display: "block",
              width: "100%",
              padding: "10px 14px",
              border: "none",
              background: "transparent",
              textAlign: "left",
              fontFamily: "var(--sans)",
              fontSize: "13px",
              color: "var(--ink)",
              cursor: "pointer",
            }}
          >
            Copy code
          </button>
          <a
            href={chatgptUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setOpen(false)}
            style={{
              display: "block",
              padding: "10px 14px",
              borderTop: "1px solid var(--line-soft)",
              fontFamily: "var(--sans)",
              fontSize: "13px",
              color: "var(--ink)",
              textDecoration: "none",
            }}
          >
            Open in ChatGPT
          </a>
          <a
            href={claudeUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setOpen(false)}
            style={{
              display: "block",
              padding: "10px 14px",
              borderTop: "1px solid var(--line-soft)",
              fontFamily: "var(--sans)",
              fontSize: "13px",
              color: "var(--ink)",
              textDecoration: "none",
            }}
          >
            Open in Claude
          </a>
          <a
            href={v0Url}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setOpen(false)}
            style={{
              display: "block",
              padding: "10px 14px",
              borderTop: "1px solid var(--line-soft)",
              fontFamily: "var(--sans)",
              fontSize: "13px",
              color: "var(--ink)",
              textDecoration: "none",
            }}
          >
            Open in v0
          </a>
        </div>
      )}
    </div>
  );
}

function FileTabs({ pack, fileContents }: { pack: Pack; fileContents: Record<string, string> }) {
  const [activeTab, setActiveTab] = useState(0);
  const [copiedTab, setCopiedTab] = useState<number | null>(null);

  const handleCopyTab = async (content: string, index: number) => {
    await navigator.clipboard.writeText(content);
    setCopiedTab(index);
    setTimeout(() => setCopiedTab(null), 2000);
  };

  const currentFile = pack.files[activeTab];
  const currentContent = fileContents[currentFile?.path] || "";
  const lang = currentFile?.path.endsWith(".css") ? "css" : currentFile?.path.endsWith(".tsx") ? "tsx" : currentFile?.path.endsWith(".html") ? "html" : "text";

  return (
    <div>
      <div style={{ display: "flex", gap: "2px", marginBottom: "16px", borderBottom: "1px solid var(--line)", paddingBottom: "0" }}>
        {pack.files.map((file, index) => (
          <button
            key={file.path}
            onClick={() => setActiveTab(index)}
            style={{
              padding: "8px 16px",
              border: "none",
              borderBottom: activeTab === index ? "2px solid var(--coral)" : "2px solid transparent",
              background: activeTab === index ? "var(--bone)" : "transparent",
              color: activeTab === index ? "var(--ink)" : "var(--ink-mute)",
              fontFamily: "var(--mono)",
              fontSize: "12px",
              cursor: "pointer",
              transition: "all 0.18s ease",
              marginBottom: "-1px",
            }}
          >
            {file.path}
          </button>
        ))}
        <div style={{ marginLeft: "auto" }}>
          <button
            onClick={() => handleCopyTab(currentContent, activeTab)}
            style={{
              padding: "6px 12px",
              border: "1px solid var(--line)",
              borderRadius: "6px",
              background: copiedTab === activeTab ? "var(--coral)" : "var(--bone)",
              color: copiedTab === activeTab ? "#fff" : "var(--ink-mute)",
              fontFamily: "var(--sans)",
              fontSize: "11px",
              cursor: "pointer",
              transition: "all 0.18s ease",
            }}
          >
            {copiedTab === activeTab ? "Copied" : "Copy"}
          </button>
        </div>
      </div>
      {currentContent ? (
        <CodeBlock code={currentContent} language={lang} />
      ) : (
        <div style={{ padding: "40px", textAlign: "center", fontFamily: "var(--mono)", fontSize: "12px", color: "var(--ink-faint)", background: "var(--bone)", borderRadius: "8px", border: "1px solid var(--line-soft)" }}>
          Loading...
        </div>
      )}
    </div>
  );
}

function PackDetailInner({ pack }: { pack: Pack }) {
  const [fileContents, setFileContents] = useState<Record<string, string>>({});
  const skillCategory = getPackSkillRoute(pack);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      const contents: Record<string, string> = {};
      for (const file of pack.files) {
        try {
          const res = await fetch(`/registry/packs/${skillCategory}/${pack.slug}/${file.path}`);
          if (res.ok) {
            contents[file.path] = await res.text();
          }
        } catch {}
      }
      if (!cancelled) setFileContents(contents);
    }
    load();
    return () => { cancelled = true; };
  }, [pack, skillCategory]);

  const previewUrl = (() => {
    const htmlFile = pack.files.find(f => f.path.endsWith(".html"));
    if (htmlFile) {
      return `/registry/packs/${skillCategory}/${pack.slug}/${htmlFile.path}`;
    }
    return null;
  })();

  return (
    <section className="tight">
      <div className="container" style={{ maxWidth: "900px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "32px" }}>
          <Link
            href={`/skills/${skillCategory}`}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              color: "var(--ink-mute)",
              fontFamily: "var(--sans)",
              fontSize: "13px",
              textDecoration: "none",
              transition: "color 0.18s ease",
            }}
          >
            ← Back
          </Link>
          <div style={{ display: "flex", gap: "8px" }}>
            <CopyPageDropdown pack={pack} fileContents={fileContents} />
          </div>
        </div>

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
        </div>

        {previewUrl && (
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
                  href={previewUrl}
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
                  src={previewUrl}
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
          <CodeBlock code={pack.installCommand} language="bash" showViewMore={false} />
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
              <span style={{ fontFamily: "var(--body)", fontSize: "14px", color: "var(--ink-mute)" }}>None — standalone file</span>
            )}
          </div>
        </div>

        <div style={{ borderTop: "1px solid var(--line)", paddingTop: "32px", marginBottom: "32px" }}>
          <h3 style={{ fontFamily: "var(--sans)", fontSize: "14px", fontWeight: 600, color: "var(--ink-mute)", letterSpacing: "0.18em", textTransform: "uppercase", marginBottom: "16px" }}>
            Source Code
          </h3>
          {pack.files.length > 0 ? (
            <FileTabs pack={pack} fileContents={fileContents} />
          ) : (
            <span style={{ fontFamily: "var(--body)", fontSize: "14px", color: "var(--ink-mute)" }}>No files to display.</span>
          )}
        </div>

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
                {pack.author.name}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function WebsiteDetailFeature({ slug }: { slug: string }) {
  const { pack, loading } = usePack(slug);

  if (loading) {
    return (
      <section className="tight">
        <div className="container" style={{ maxWidth: "900px", padding: "120px 0", textAlign: "center" }}>
          <div style={{ fontFamily: "var(--mono)", fontSize: "13px", color: "var(--ink-faint)", letterSpacing: "0.04em" }}>
            Loading...
          </div>
        </div>
      </section>
    );
  }

  if (!pack) {
    notFound();
  }

  return <PackDetailInner pack={pack} />;
}
