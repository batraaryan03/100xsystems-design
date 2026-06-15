"use client";

import { useState } from "react";

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

export function CodeBlock({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      style={{
        position: "relative",
        background: "var(--bone)",
        borderRadius: "12px",
        padding: "16px 18px",
        fontFamily: "var(--mono)",
        fontSize: "13px",
        color: "var(--ink)",
        border: "1px solid var(--line-soft)",
        overflow: "hidden",
      }}
    >
      <pre style={{ margin: 0, overflowX: "auto" }}>
        <code>{code}</code>
      </pre>
      <button
        onClick={handleCopy}
        style={{
          position: "absolute",
          top: "12px",
          right: "12px",
          background: "var(--paper)",
          border: "1px solid var(--line)",
          borderRadius: "6px",
          padding: "4px 10px",
          fontSize: "11px",
          fontFamily: "var(--sans)",
          color: "var(--ink-mute)",
          cursor: "pointer",
          transition: "all 0.18s ease",
        }}
      >
        {copied ? "Copied" : "Copy"}
      </button>
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
