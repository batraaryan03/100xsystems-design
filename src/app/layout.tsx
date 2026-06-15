import type { Metadata } from "next";
import "./globals.css";
import { Topbar, Navbar, Footer } from "@/presentation/_components/components.layout";

export const metadata: Metadata = {
  title: "Design Skills — A curated registry of website designs",
  description:
    "Find beautiful open-source websites. Install them as code. Own them locally. Let AI consume from your codebase.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="antialiased">
      <body>
        <div className="side-rail left">
          <span className="rail-text">Design Skills · Vol. 01</span>
        </div>
        <div className="side-rail right">
          <span className="rail-text">MMXXVI · Open Source</span>
        </div>
        <div className="shell">
          <Topbar />
          <Navbar />
          <main>{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
