"use client";

import { useState } from "react";
import { Highlight, themes } from "prism-react-renderer";

export function Card({
  number,
  tag,
  title,
  description,
  href,
}: {
  number: string;
  tag: string;
  title: string;
  description: string;
  href?: string;
}) {
  const Tag = href ? "a" : "div";
  const props = href ? { href } : {};

  return (
    <Tag className="card" {...props}>
      <div className="num">
        <span>{number}</span>
        <span className="tag">{tag}</span>
      </div>
      <h3>{title}</h3>
      <p>{description}</p>
      <span className="arrow-mark">
        <svg viewBox="0 0 24 24">
          <path d="M5 19L19 5M19 5H8M19 5v11" />
        </svg>
      </span>
    </Tag>
  );
}

export function Pill({
  label,
  count,
  active,
  onClick,
}: {
  label: string;
  count?: number;
  active?: boolean;
  onClick?: () => void;
}) {
  return (
    <button
      className={`pill${active ? " active" : ""}`}
      onClick={onClick}
    >
      {label}
      {count !== undefined && (
        <span className="count">{count}</span>
      )}
    </button>
  );
}

export function Badge({
  children,
  variant = "default",
}: {
  children: React.ReactNode;
  variant?: "default" | "coral" | "olive";
}) {
  const colors: Record<string, React.CSSProperties> = {
    default: { color: "var(--ink-mute)", background: "var(--bone)" },
    coral: { color: "var(--coral)", background: "rgba(237, 111, 92, 0.1)" },
    olive: { color: "var(--olive)", background: "rgba(110, 116, 72, 0.1)" },
  };

  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "6px",
        padding: "4px 10px",
        borderRadius: "999px",
        fontSize: "11px",
        fontFamily: "var(--sans)",
        fontWeight: 500,
        letterSpacing: "0.04em",
        ...colors[variant],
      }}
    >
      {children}
    </span>
  );
}

const languageMap: Record<string, string> = {
  html: "html",
  css: "css",
  tsx: "tsx",
  jsx: "jsx",
  javascript: "jsx",
  typescript: "tsx",
  bash: "bash",
  shell: "bash",
  json: "json",
  text: "text",
};

export function CodeBlock({ code, language = "text" }: { code: string; language?: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const lang = languageMap[language] || "text";

  if (lang === "text") {
    return (
      <div
        style={{
          position: "relative",
          background: "#15140f",
          borderRadius: "12px",
          overflow: "hidden",
          border: "1px solid rgba(247, 241, 222, 0.1)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 16px", borderBottom: "1px solid rgba(247, 241, 222, 0.08)" }}>
          <span style={{ fontFamily: "var(--mono)", fontSize: "11px", color: "rgba(247, 241, 222, 0.4)", letterSpacing: "0.04em" }}>
            {language}
          </span>
          <button
            onClick={handleCopy}
            style={{
              background: "rgba(247, 241, 222, 0.1)",
              border: "none",
              borderRadius: "6px",
              padding: "4px 10px",
              fontSize: "11px",
              fontFamily: "var(--sans)",
              color: "rgba(247, 241, 222, 0.6)",
              cursor: "pointer",
              transition: "all 0.18s ease",
            }}
          >
            {copied ? "Copied" : "Copy"}
          </button>
        </div>
        <pre style={{
          margin: 0,
          padding: "16px",
          overflowX: "auto",
          fontFamily: "var(--mono)",
          fontSize: "13px",
          lineHeight: 1.6,
          color: "#f7f1de",
          whiteSpace: "pre-wrap",
          wordBreak: "break-word",
        }}>
          <code>{code}</code>
        </pre>
      </div>
    );
  }

  return (
    <div
      style={{
        position: "relative",
        background: "#15140f",
        borderRadius: "12px",
        overflow: "hidden",
        border: "1px solid rgba(247, 241, 222, 0.1)",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 16px", borderBottom: "1px solid rgba(247, 241, 222, 0.08)" }}>
        <span style={{ fontFamily: "var(--mono)", fontSize: "11px", color: "rgba(247, 241, 222, 0.4)", letterSpacing: "0.04em" }}>
          {language}
        </span>
        <button
          onClick={handleCopy}
          style={{
            background: "rgba(247, 241, 222, 0.1)",
            border: "none",
            borderRadius: "6px",
            padding: "4px 10px",
            fontSize: "11px",
            fontFamily: "var(--sans)",
            color: "rgba(247, 241, 222, 0.6)",
            cursor: "pointer",
            transition: "all 0.18s ease",
          }}
        >
          {copied ? "Copied" : "Copy"}
        </button>
      </div>
      <Highlight theme={themes.nightOwl} code={code.trimEnd()} language={lang}>
        {({ tokens, getLineProps, getTokenProps }) => (
          <pre style={{
            margin: 0,
            padding: "16px",
            overflowX: "auto",
            fontFamily: "var(--mono)",
            fontSize: "13px",
            lineHeight: 1.6,
            textAlign: "left",
          }}>
            {tokens.map((line, i) => (
              <div key={i} {...getLineProps({ line })}>
                {line.map((token, key) => (
                  <span key={key} {...getTokenProps({ token })} />
                ))}
              </div>
            ))}
          </pre>
        )}
      </Highlight>
    </div>
  );
}

export function StatRing({
  number,
  variant = "default",
}: {
  number: string;
  variant?: "default" | "solid" | "coral";
}) {
  return (
    <span className={`stat-ring${variant !== "default" ? ` ${variant}` : ""}`}>
      {number}
    </span>
  );
}

export function CoralDot() {
  return <span style={{ color: "var(--coral)" }}>.</span>;
}
