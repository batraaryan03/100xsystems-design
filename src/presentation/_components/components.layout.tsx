"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { usePacks } from "@/application/packs/packs.hooks";

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
  const pathname = usePathname();
  const { packs } = usePacks();

  const websiteCount = packs.filter(p => !p.assetType || p.assetType === "component").length;
  const illustrationCount = packs.filter(p => p.assetType === "illustration").length;
  const imageCount = packs.filter(p => p.assetType === "image").length;
  const videoCount = packs.filter(p => p.assetType === "video").length;

  const isActive = (path: string) => pathname.startsWith(path);

  const linkStyle = (path: string): React.CSSProperties => ({
    color: isActive(path) ? "var(--coral)" : "var(--ink)",
    fontWeight: isActive(path) ? 600 : 400,
  });

  return (
    <header className="nav">
      <div className="container">
        <div className="nav-inner">
          <Link href="/" className="brand">
            <span className="brand-mark">DS</span>
            <span>Design Skills</span>
          </Link>

          <nav className="nav-links">
            <Link href="/skills/websites" style={linkStyle("/skills/websites")}>Websites <sup className="nav-count">{websiteCount}</sup></Link>
            <Link href="/skills/illustrations" style={linkStyle("/skills/illustrations")}>Illustrations <sup className="nav-count">{illustrationCount}</sup></Link>
            <Link href="/skills/images" style={linkStyle("/skills/images")}>Images <sup className="nav-count">{imageCount}</sup></Link>
            <Link href="/skills/videos" style={linkStyle("/skills/videos")}>Videos <sup className="nav-count">{videoCount}</sup></Link>
            <Link href="/collections" style={linkStyle("/collections")}>Collections</Link>
            <span className="nav-divider" />
            <Link href="/docs" style={linkStyle("/docs")}>Docs</Link>
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
              href="https://github.com/batraaryan03/100xsystems-design"
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
  const { packs } = usePacks();

  const websiteCount = packs.filter(p => !p.assetType || p.assetType === "component").length;
  const illustrationCount = packs.filter(p => p.assetType === "illustration").length;
  const imageCount = packs.filter(p => p.assetType === "image").length;
  const videoCount = packs.filter(p => p.assetType === "video").length;

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
            <h5>Skills</h5>
            <ul>
              <li><Link href="/skills/websites">Websites <sup className="nav-count">{websiteCount}</sup></Link></li>
              <li><Link href="/skills/illustrations">Illustrations <sup className="nav-count">{illustrationCount}</sup></Link></li>
              <li><Link href="/skills/images">Images <sup className="nav-count">{imageCount}</sup></Link></li>
              <li><Link href="/skills/videos">Videos <sup className="nav-count">{videoCount}</sup></Link></li>
              <li><Link href="/collections">Collections</Link></li>
            </ul>
          </div>
          <div className="foot-col">
            <h5>Resources</h5>
            <ul>
              <li><Link href="/docs">Documentation</Link></li>
              <li><Link href="/contribute">Contribute</Link></li>
              <li><Link href="/admin">Admin</Link></li>
            </ul>
          </div>
          <div className="foot-col">
            <h5>Connect</h5>
            <ul>
              <li><a href="https://github.com/batraaryan03/100xsystems-design" target="_blank" rel="noopener noreferrer">GitHub</a></li>
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
