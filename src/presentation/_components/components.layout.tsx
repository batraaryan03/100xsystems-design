"use client";

import Link from "next/link";

export function Topbar() {
  return (
    <div className="topbar">
      <div className="container">
        <div className="topbar-inner">
          <span>
            <span className="pulse" />
            <b>Design Skills</b> · Vol. 01
          </span>
          <span className="mid">
            <span>A <span className="coral">100X Systems</span> product</span>
            <span>·</span>
            <span>Open-source website designs</span>
          </span>
          <span className="right">
            <span>v0.1.0 / MIT</span>
          </span>
        </div>
      </div>
    </div>
  );
}

export function Navbar() {
  return (
    <header className="nav">
      <div className="container">
        <div className="nav-inner">
          <Link href="/" className="brand">
            <span className="brand-mark">DS</span>
            <span>Design Skills</span>
          </Link>

          <nav className="nav-links">
            <Link href="/packs">Skills</Link>
            <Link href="/collections">Collections</Link>
            <Link href="/about">About</Link>
          </nav>

          <div className="nav-side">
            <a
              href="https://100xsystems.dev"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontFamily: "var(--sans)",
                fontSize: "12px",
                color: "var(--ink-faint)",
                textDecoration: "none",
                letterSpacing: "0.04em",
              }}
            >
              100X Systems
            </a>
            <a
              href="https://github.com/100xsystems/design-skills"
              target="_blank"
              rel="noopener noreferrer"
              className="nav-cta"
            >
              ★ GitHub
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}

export function SectionRule({
  roman,
  meta,
  page,
}: {
  roman: string;
  meta: string;
  page: string;
}) {
  return (
    <div className="sec-rule">
      <span className="roman">{roman}</span>
      <span className="meta-grp">
        <span>{meta}</span>
        <span className="dot-mark">•</span>
      </span>
      <span>{page}</span>
    </div>
  );
}

export function PageHeader({
  label,
  labelIndex,
  title,
  lead,
}: {
  label: string;
  labelIndex?: string;
  title: React.ReactNode;
  lead?: string;
}) {
  return (
    <div className="section-header">
      <span className="label">
        {label}
        {labelIndex && <span className="ix">· {labelIndex}</span>}
      </span>
      <h2 className="display">{title}</h2>
      {lead && <p className="lead">{lead}</p>}
    </div>
  );
}

export function Footer() {
  return (
    <footer>
      <div className="container">
        <div className="foot-grid">
          <div className="foot-brand">
            <Link href="/" className="brand">
              <span className="brand-mark">DS</span>
              <span>Design Skills</span>
            </Link>
            <p>
              A curated registry of open-source website designs. Install them as code.
              Own them locally. Let AI consume from your codebase.
            </p>
            <p style={{ marginTop: "12px", fontSize: "12px", color: "var(--ink-faint)" }}>
              A sub-brand of{" "}
              <a href="https://100xsystems.dev" target="_blank" rel="noopener noreferrer" style={{ color: "var(--coral)", textDecoration: "none" }}>
                100X Systems
              </a>
            </p>
          </div>
          <div className="foot-col">
            <h5>Registry</h5>
            <ul>
              <li><Link href="/packs">All Skills</Link></li>
              <li><Link href="/collections">Collections</Link></li>
              <li><Link href="/packs?category=landing">Landing Pages</Link></li>
            </ul>
          </div>
          <div className="foot-col">
            <h5>Frameworks</h5>
            <ul>
              <li><Link href="/packs?framework=html">HTML</Link></li>
              <li><Link href="/packs?framework=react">React</Link></li>
              <li><Link href="/packs?framework=nextjs">Next.js</Link></li>
            </ul>
          </div>
          <div className="foot-col">
            <h5>Connect</h5>
            <ul>
              <li><a href="https://github.com/100xsystems/design-skills" target="_blank" rel="noopener noreferrer">GitHub</a></li>
              <li><a href="https://100xsystems.dev" target="_blank" rel="noopener noreferrer">100X Systems</a></li>
              <li><Link href="/about">About</Link></li>
            </ul>
          </div>
          <div className="foot-col">
            <h5>Admin</h5>
            <ul>
              <li><Link href="/admin">Dashboard</Link></li>
              <li><Link href="/contribute">Publish a Pack</Link></li>
            </ul>
          </div>
        </div>
        <div className="foot-bottom">
          <span>
            <span className="pulse" />
            <b>Design Skills</b> · MIT · 2026 / Vol. 01
          </span>
          <span className="right">
            <span>A 100X Systems product</span>
          </span>
        </div>
        <div className="foot-mega">
          <div className="word">
            Design <em>Skills</em>.
          </div>
        </div>
      </div>
    </footer>
  );
}
