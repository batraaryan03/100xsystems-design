"use client";

import { useState } from "react";
import { SectionRule } from "@/presentation/_components/components.layout";
import { CoralDot, CodeBlock } from "@/presentation/_components/components.atomic";

const ACCESS_CODE = "Noni Batra";

function getInitialAuth(): boolean {
  if (typeof window === "undefined") return false;
  return sessionStorage.getItem("design-skills-admin") === ACCESS_CODE;
}

type FileInput = {
  filename: string;
  content: string;
  type: "component" | "style" | "config" | "asset";
};

export function AdminFeature() {
  const [authenticated, setAuthenticated] = useState(getInitialAuth);
  const [code, setCode] = useState("");
  const [codeError, setCodeError] = useState(false);

  const [files, setFiles] = useState<FileInput[]>([
    { filename: "index.html", content: "", type: "component" },
  ]);
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

  const handleFileChange = (index: number, value: string) => {
    const newFiles = [...files];
    newFiles[index].content = value;
    setFiles(newFiles);

    if (index === 0 && value && !title) {
      autoExtractTitle(value);
    }
  };

  const handleFilenameChange = (index: number, value: string) => {
    const newFiles = [...files];
    newFiles[index].filename = value;
    setFiles(newFiles);
  };

  const addFile = () => {
    setFiles([...files, { filename: "", content: "", type: "component" }]);
  };

  const removeFile = (index: number) => {
    if (files.length > 1) {
      setFiles(files.filter((_, i) => i !== index));
    }
  };

  const handleFrameworkChange = (fw: "html" | "react") => {
    setFramework(fw);
    if (fw === "html") {
      setFiles([{ filename: "index.html", content: files[0]?.content || "", type: "component" }]);
    } else {
      setFiles([{ filename: "Component.tsx", content: files[0]?.content || "", type: "component" }]);
    }
  };

  const getPreviewHtml = (): string => {
    if (files.length === 1 && files[0].filename.endsWith(".html")) {
      return files[0].content;
    }
    const htmlFile = files.find((f) => f.filename.endsWith(".html"));
    const cssFile = files.find((f) => f.filename.endsWith(".css"));
    if (htmlFile) {
      let html = htmlFile.content;
      if (cssFile) {
        html = html.replace("</head>", `<style>${cssFile.content}</style>\n</head>`);
      }
      return html;
    }
    return "";
  };

  const generateManifest = () => {
    const manifestFiles = files.map((f) => ({
      path: f.filename,
      content: "",
      type: f.type,
    }));

    const manifest = {
      id: slug || "my-pack",
      slug: slug || "my-pack",
      title: title || "My Pack",
      description: description || "A website design pack",
      tags: tags ? tags.split(",").map((t) => t.trim()) : ["design"],
      framework,
      category,
      screenshots: [],
      files: manifestFiles,
      dependencies: framework === "react" ? ["next", "react"] : [],
      installCommand: framework === "html"
        ? `Copy ${files.map((f) => f.filename).join(" and ")} into your project`
        : `Copy ${files.map((f) => f.filename).join(", ")} into your components folder`,
      sourceUrl: "",
      githubUrl: "",
      license: "MIT",
      author: {
        name: "Your Name",
        url: "",
      },
      featured: false,
      createdAt: new Date().toISOString().split("T")[0],
      htmlContent: getPreviewHtml() || undefined,
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

  const previewHtml = getPreviewHtml();

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

          <div style={{ display: "grid", gridTemplateColumns: "minmax(0, 1fr) minmax(0, 1fr)", gap: "32px", alignItems: "start" }}>
            <div style={{ minWidth: 0, overflow: "hidden" }}>
              <h2 className="display" style={{ fontSize: "28px", marginBottom: "24px" }}>
                Create Pack<CoralDot />
              </h2>

              <div style={{ marginBottom: "20px" }}>
                <label style={{ display: "block", fontFamily: "var(--sans)", fontSize: "12px", fontWeight: 600, color: "var(--ink-mute)", letterSpacing: "0.18em", textTransform: "uppercase", marginBottom: "8px" }}>
                  Framework
                </label>
                <div style={{ display: "flex", gap: "8px" }}>
                  <button
                    onClick={() => handleFrameworkChange("html")}
                    className={`pill${framework === "html" ? " active" : ""}`}
                  >
                    HTML
                  </button>
                  <button
                    onClick={() => handleFrameworkChange("react")}
                    className={`pill${framework === "react" ? " active" : ""}`}
                  >
                    React
                  </button>
                </div>
              </div>

              <div style={{ marginBottom: "20px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
                  <label style={{ fontFamily: "var(--sans)", fontSize: "12px", fontWeight: 600, color: "var(--ink-mute)", letterSpacing: "0.18em", textTransform: "uppercase" }}>
                    Files ({files.length})
                  </label>
                  <button onClick={addFile} className="pill" style={{ fontSize: "11px", padding: "4px 12px" }}>
                    + Add File
                  </button>
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                  {files.map((file, index) => (
                    <div key={index} style={{ border: "1px solid var(--line)", borderRadius: "12px", overflow: "hidden" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "8px", padding: "8px 12px", background: "var(--bone)", borderBottom: "1px solid var(--line)" }}>
                        <input
                          type="text"
                          value={file.filename}
                          onChange={(e) => handleFilenameChange(index, e.target.value)}
                          placeholder="filename.ext"
                          style={{
                            flex: 1,
                            padding: "6px 10px",
                            borderRadius: "6px",
                            border: "1px solid var(--line-soft)",
                            background: "var(--paper)",
                            fontFamily: "var(--mono)",
                            fontSize: "12px",
                            color: "var(--ink)",
                            outline: "none",
                          }}
                        />
                        {files.length > 1 && (
                          <button
                            onClick={() => removeFile(index)}
                            style={{
                              background: "none",
                              border: "none",
                              color: "var(--ink-faint)",
                              cursor: "pointer",
                              fontSize: "16px",
                              padding: "4px",
                            }}
                          >
                            ×
                          </button>
                        )}
                      </div>
                      <textarea
                        value={file.content}
                        onChange={(e) => handleFileChange(index, e.target.value)}
                        placeholder={`Paste ${file.filename.endsWith(".css") ? "CSS" : file.filename.endsWith(".html") ? "HTML" : "React"} code here...`}
                        style={{
                          width: "100%",
                          height: "200px",
                          padding: "12px",
                          border: "none",
                          background: "#15140f",
                          fontFamily: "var(--mono)",
                          fontSize: "12px",
                          color: "#f7f1de",
                          outline: "none",
                          resize: "vertical",
                          lineHeight: 1.5,
                        }}
                      />
                    </div>
                  ))}
                </div>
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
                    placeholder="Auto-extracted from &lt;title&gt;"
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

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "20px" }}>
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

            <div style={{ minWidth: 0, overflow: "hidden" }}>
              <h3 style={{ fontFamily: "var(--sans)", fontSize: "14px", fontWeight: 600, color: "var(--ink-mute)", letterSpacing: "0.18em", textTransform: "uppercase", marginBottom: "16px" }}>
                Preview
              </h3>

              {previewHtml && (
                <div style={{ marginBottom: "24px" }}>
                  <h4 style={{ fontFamily: "var(--sans)", fontSize: "12px", fontWeight: 600, color: "var(--ink-mute)", marginBottom: "8px" }}>
                    Live Preview
                  </h4>
                  <div style={{ position: "relative", background: "#15140f", borderRadius: "12px", overflow: "hidden", border: "1px solid rgba(247, 241, 222, 0.1)" }}>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 16px", borderBottom: "1px solid rgba(247, 241, 222, 0.08)" }}>
                      <span style={{ fontFamily: "var(--mono)", fontSize: "11px", color: "rgba(247, 241, 222, 0.4)", letterSpacing: "0.04em" }}>
                        preview
                      </span>
                    </div>
                    <div style={{ position: "relative", height: "400px", overflow: "hidden" }}>
                      <iframe
                        srcDoc={previewHtml}
                        style={{
                          width: "100%",
                          height: "100%",
                          border: "none",
                        }}
                        title="Preview"
                        sandbox="allow-scripts"
                      />
                    </div>
                  </div>
                </div>
              )}

              <h4 style={{ fontFamily: "var(--sans)", fontSize: "12px", fontWeight: 600, color: "var(--ink-mute)", marginBottom: "8px" }}>
                Generated Manifest
              </h4>
              <div style={{ maxHeight: "400px", overflow: "auto", borderRadius: "12px" }}>
                <CodeBlock code={generateManifest()} language="json" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
