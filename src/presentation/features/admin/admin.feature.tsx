"use client";

import { useState } from "react";
import { SectionRule } from "@/presentation/_components/components.layout";
import { CoralDot } from "@/presentation/_components/components.atomic";

const ACCESS_CODE = "Noni Batra";

function getInitialAuth(): boolean {
  if (typeof window === "undefined") return false;
  return sessionStorage.getItem("design-skills-admin") === ACCESS_CODE;
}

export function AdminFeature() {
  const [authenticated, setAuthenticated] = useState(getInitialAuth);
  const [code, setCode] = useState("");
  const [codeError, setCodeError] = useState(false);

  const [htmlInput, setHtmlInput] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState("");
  const [framework, setFramework] = useState<"html" | "react">("html");
  const [category, setCategory] = useState("landing");
  const [slug, setSlug] = useState("");
  const [copied, setCopied] = useState(false);

  const handleLogin = () => {
    if (code === ACCESS_CODE) {
      setAuthenticated(true);
      sessionStorage.setItem("design-skills-admin", code);
      setCodeError(false);
    } else {
      setCodeError(true);
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem("design-skills-admin");
    setAuthenticated(false);
    setCode("");
  };

  const autoExtractTitle = (html: string) => {
    const match = html.match(/<title>(.*?)<\/title>/i);
    if (match) {
      const extracted = match[1].replace(/·.*$/, "").trim();
      setTitle(extracted);
      setSlug(extracted.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, ""));
    }
  };

  const handleHtmlChange = (value: string) => {
    setHtmlInput(value);
    if (value && !title) {
      autoExtractTitle(value);
    }
  };

  const generateManifest = () => {
    const manifest = {
      id: slug || "my-pack",
      slug: slug || "my-pack",
      title: title || "My Pack",
      description: description || "A website design pack",
      tags: tags ? tags.split(",").map((t) => t.trim()) : ["design"],
      framework,
      category,
      screenshots: [],
      files: [
        {
          path: framework === "html" ? "index.html" : "Component.tsx",
          content: "",
          type: "component",
        },
      ],
      dependencies: framework === "react" ? ["next", "react"] : [],
      installCommand: framework === "html"
        ? "Copy index.html into your project"
        : "Copy Component.tsx into your project",
      sourceUrl: "",
      githubUrl: "",
      license: "MIT",
      author: {
        name: "Your Name",
        url: "",
      },
      featured: false,
      createdAt: new Date().toISOString().split("T")[0],
      htmlContent: htmlInput || undefined,
    };
    return JSON.stringify(manifest, null, 2);
  };

  const copyManifest = async () => {
    await navigator.clipboard.writeText(generateManifest());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!authenticated) {
    return (
      <div style={{ minHeight: "80vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ textAlign: "center", maxWidth: "400px" }}>
          <h1 className="display" style={{ fontSize: "36px", marginBottom: "8px" }}>
            Admin<CoralDot />
          </h1>
          <p style={{ fontFamily: "var(--body)", fontSize: "14px", color: "var(--ink-mute)", marginBottom: "32px" }}>
            Enter the access code to continue.
          </p>
          <input
            type="password"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleLogin()}
            placeholder="Access code"
            style={{
              width: "100%",
              padding: "14px 18px",
              borderRadius: "999px",
              border: `1px solid ${codeError ? "var(--coral)" : "var(--line)"}`,
              background: "var(--bone)",
              fontFamily: "var(--sans)",
              fontSize: "14px",
              color: "var(--ink)",
              outline: "none",
              marginBottom: "16px",
            }}
          />
          {codeError && (
            <p style={{ fontFamily: "var(--body)", fontSize: "12px", color: "var(--coral)", marginBottom: "16px" }}>
              Invalid code. Try again.
            </p>
          )}
          <button onClick={handleLogin} className="btn btn-primary" style={{ width: "100%", justifyContent: "center" }}>
            Enter
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <section className="tight">
        <div className="container">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "32px" }}>
            <SectionRule roman="·" meta="Admin Dashboard" page="001 / 001" />
            <button onClick={handleLogout} className="btn btn-ghost" style={{ fontSize: "12px" }}>
              Logout
            </button>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "32px", alignItems: "start" }}>
            <div>
              <h2 className="display" style={{ fontSize: "28px", marginBottom: "24px" }}>
                Create Pack<CoralDot />
              </h2>

              <div style={{ marginBottom: "20px" }}>
                <label style={{ display: "block", fontFamily: "var(--sans)", fontSize: "12px", fontWeight: 600, color: "var(--ink-mute)", letterSpacing: "0.18em", textTransform: "uppercase", marginBottom: "8px" }}>
                  HTML / React Code
                </label>
                <textarea
                  value={htmlInput}
                  onChange={(e) => handleHtmlChange(e.target.value)}
                  placeholder="Paste your HTML, CSS, or React component here..."
                  style={{
                    width: "100%",
                    height: "400px",
                    padding: "16px",
                    borderRadius: "12px",
                    border: "1px solid var(--line)",
                    background: "var(--bone)",
                    fontFamily: "var(--mono)",
                    fontSize: "13px",
                    color: "var(--ink)",
                    outline: "none",
                    resize: "vertical",
                    lineHeight: 1.5,
                  }}
                />
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "20px" }}>
                <div>
                  <label style={{ display: "block", fontFamily: "var(--sans)", fontSize: "12px", fontWeight: 600, color: "var(--ink-mute)", letterSpacing: "0.18em", textTransform: "uppercase", marginBottom: "8px" }}>
                    Title
                  </label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Auto-extracted from <title>"
                    style={{
                      width: "100%",
                      padding: "10px 14px",
                      borderRadius: "8px",
                      border: "1px solid var(--line)",
                      background: "var(--bone)",
                      fontFamily: "var(--sans)",
                      fontSize: "14px",
                      color: "var(--ink)",
                      outline: "none",
                    }}
                  />
                </div>
                <div>
                  <label style={{ display: "block", fontFamily: "var(--sans)", fontSize: "12px", fontWeight: 600, color: "var(--ink-mute)", letterSpacing: "0.18em", textTransform: "uppercase", marginBottom: "8px" }}>
                    Slug
                  </label>
                  <input
                    type="text"
                    value={slug}
                    onChange={(e) => setSlug(e.target.value)}
                    placeholder="auto-generated"
                    style={{
                      width: "100%",
                      padding: "10px 14px",
                      borderRadius: "8px",
                      border: "1px solid var(--line)",
                      background: "var(--bone)",
                      fontFamily: "var(--mono)",
                      fontSize: "14px",
                      color: "var(--ink)",
                      outline: "none",
                    }}
                  />
                </div>
              </div>

              <div style={{ marginBottom: "20px" }}>
                <label style={{ display: "block", fontFamily: "var(--sans)", fontSize: "12px", fontWeight: 600, color: "var(--ink-mute)", letterSpacing: "0.18em", textTransform: "uppercase", marginBottom: "8px" }}>
                  Description
                </label>
                <input
                  type="text"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="A brief description of this pack"
                  style={{
                    width: "100%",
                    padding: "10px 14px",
                    borderRadius: "8px",
                    border: "1px solid var(--line)",
                    background: "var(--bone)",
                    fontFamily: "var(--sans)",
                    fontSize: "14px",
                    color: "var(--ink)",
                    outline: "none",
                  }}
                />
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "16px", marginBottom: "20px" }}>
                <div>
                  <label style={{ display: "block", fontFamily: "var(--sans)", fontSize: "12px", fontWeight: 600, color: "var(--ink-mute)", letterSpacing: "0.18em", textTransform: "uppercase", marginBottom: "8px" }}>
                    Framework
                  </label>
                  <select
                    value={framework}
                    onChange={(e) => setFramework(e.target.value as "html" | "react")}
                    style={{
                      width: "100%",
                      padding: "10px 14px",
                      borderRadius: "8px",
                      border: "1px solid var(--line)",
                      background: "var(--bone)",
                      fontFamily: "var(--sans)",
                      fontSize: "14px",
                      color: "var(--ink)",
                      outline: "none",
                    }}
                  >
                    <option value="html">HTML</option>
                    <option value="react">React</option>
                  </select>
                </div>
                <div>
                  <label style={{ display: "block", fontFamily: "var(--sans)", fontSize: "12px", fontWeight: 600, color: "var(--ink-mute)", letterSpacing: "0.18em", textTransform: "uppercase", marginBottom: "8px" }}>
                    Category
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    style={{
                      width: "100%",
                      padding: "10px 14px",
                      borderRadius: "8px",
                      border: "1px solid var(--line)",
                      background: "var(--bone)",
                      fontFamily: "var(--sans)",
                      fontSize: "14px",
                      color: "var(--ink)",
                      outline: "none",
                    }}
                  >
                    <option value="landing">Landing</option>
                    <option value="saas">SaaS</option>
                    <option value="portfolio">Portfolio</option>
                    <option value="dashboard">Dashboard</option>
                  </select>
                </div>
                <div>
                  <label style={{ display: "block", fontFamily: "var(--sans)", fontSize: "12px", fontWeight: 600, color: "var(--ink-mute)", letterSpacing: "0.18em", textTransform: "uppercase", marginBottom: "8px" }}>
                    Tags
                  </label>
                  <input
                    type="text"
                    value={tags}
                    onChange={(e) => setTags(e.target.value)}
                    placeholder="comma, separated"
                    style={{
                      width: "100%",
                      padding: "10px 14px",
                      borderRadius: "8px",
                      border: "1px solid var(--line)",
                      background: "var(--bone)",
                      fontFamily: "var(--sans)",
                      fontSize: "14px",
                      color: "var(--ink)",
                      outline: "none",
                    }}
                  />
                </div>
              </div>

              <button onClick={copyManifest} className="btn btn-primary" style={{ width: "100%", justifyContent: "center" }}>
                {copied ? "Copied!" : "Copy Manifest JSON"}
              </button>
            </div>

            <div>
              <h3 style={{ fontFamily: "var(--sans)", fontSize: "14px", fontWeight: 600, color: "var(--ink-mute)", letterSpacing: "0.18em", textTransform: "uppercase", marginBottom: "16px" }}>
                Preview
              </h3>

              {htmlInput && (
                <div style={{ marginBottom: "24px" }}>
                  <h4 style={{ fontFamily: "var(--sans)", fontSize: "12px", fontWeight: 600, color: "var(--ink-mute)", marginBottom: "8px" }}>
                    Live Preview
                  </h4>
                  <div style={{ position: "relative", background: "var(--bone)", borderRadius: "12px", overflow: "hidden", border: "1px solid var(--line)" }}>
                    <div className="corner tl" />
                    <div className="corner tr" />
                    <div className="corner bl" />
                    <div className="corner br" />
                    <iframe
                      srcDoc={htmlInput}
                      style={{
                        width: "100%",
                        height: "400px",
                        border: "none",
                        borderRadius: "12px",
                      }}
                      title="Preview"
                      sandbox="allow-scripts"
                    />
                  </div>
                </div>
              )}

              <h4 style={{ fontFamily: "var(--sans)", fontSize: "12px", fontWeight: 600, color: "var(--ink-mute)", marginBottom: "8px" }}>
                Generated Manifest
              </h4>
              <pre style={{
                background: "var(--bone)",
                borderRadius: "12px",
                padding: "16px",
                fontFamily: "var(--mono)",
                fontSize: "12px",
                color: "var(--ink)",
                overflow: "auto",
                maxHeight: "500px",
                border: "1px solid var(--line)",
                lineHeight: 1.5,
              }}>
                {generateManifest()}
              </pre>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
