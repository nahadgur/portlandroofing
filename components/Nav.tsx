"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

interface NavLink {
  label: string;
  href: string;
}

const NAV_LINKS: NavLink[] = [
  { label: "Cost Index", href: "/or-cost-index" },
  { label: "Cities",     href: "/oregon" },
  { label: "Services",   href: "/services" },
  { label: "Guides",     href: "/guides" },
  { label: "Blog",       href: "/blog" },
  { label: "Contact",    href: "/contact" },
];

export default function Nav() {
  const [mobileOpen, setMobileOpen] = useState<boolean>(false);

  const closeMobile = () => setMobileOpen(false);

  return (
    <header className="sticky top-0 z-50 bg-[#0F172A] border-b border-slate-800">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">

        {/* Brand */}
        <Link href="/" className="flex items-center gap-1 text-xl font-bold">
          <span className="text-[#0066CC]">Oregon</span>
          <span className="text-white">Roofing</span>
        </Link>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-6">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <Link href={link.href} className="nav-link">
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Desktop CTA */}
        <Link
          href="/contact"
          className="hidden md:inline-flex items-center gap-2 rounded-md bg-[#0066CC] px-4 py-2 text-sm font-semibold text-white"
          style={{ transition: "background 0.2s, transform 0.2s, box-shadow 0.2s" }}
          onMouseEnter={e => {
            (e.currentTarget as HTMLElement).style.background = "#0052a3";
            (e.currentTarget as HTMLElement).style.transform = "translateY(-1px)";
            (e.currentTarget as HTMLElement).style.boxShadow = "0 4px 16px rgba(0,102,204,0.3)";
          }}
          onMouseLeave={e => {
            (e.currentTarget as HTMLElement).style.background = "#0066CC";
            (e.currentTarget as HTMLElement).style.transform = "";
            (e.currentTarget as HTMLElement).style.boxShadow = "";
          }}
        >
          Get Free Quote
        </Link>

        {/* Mobile hamburger */}
        <button
          type="button"
          onClick={() => setMobileOpen(!mobileOpen)}
          className="flex md:hidden items-center justify-center rounded-md p-2 text-slate-300 hover:text-white"
          style={{ transition: "color 0.2s" }}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
        >
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 md:hidden"
          style={{ animation: "fadeIn 0.2s both" }}
          onClick={closeMobile}
          aria-hidden="true"
        />
      )}

      {/* Mobile drawer */}
      <div
        className={`fixed top-0 right-0 z-50 h-full w-72 bg-[#0F172A] shadow-2xl md:hidden`}
        style={{
          transition: "transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
          transform: mobileOpen ? "translateX(0)" : "translateX(100%)",
        }}
      >
        <div className="flex items-center justify-between border-b border-slate-800 px-4 py-3">
          <Link href="/" className="text-lg font-bold" onClick={closeMobile}>
            <span className="text-[#0066CC]">Oregon</span>{" "}
            <span className="text-white">Roofing</span>
          </Link>
          <button
            type="button"
            onClick={closeMobile}
            className="rounded-md p-2 text-slate-300 hover:text-white"
            style={{ transition: "color 0.2s" }}
            aria-label="Close menu"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <ul className="flex flex-col gap-1 px-4 py-6">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                onClick={closeMobile}
                className="block rounded-md px-3 py-3 text-base font-medium text-slate-300 hover:bg-slate-800 hover:text-white"
                style={{ transition: "background 0.2s, color 0.2s" }}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="border-t border-slate-800 px-4 py-4">
          <Link
            href="/contact"
            onClick={closeMobile}
            className="flex items-center justify-center gap-2 rounded-md bg-[#0066CC] px-4 py-3 text-sm font-semibold text-white"
            style={{ transition: "background 0.2s" }}
          >
            Get Free Quote
          </Link>
        </div>
      </div>
    </header>
  );
}
