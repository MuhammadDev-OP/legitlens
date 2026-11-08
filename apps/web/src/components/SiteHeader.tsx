"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { Icon } from "./Icon";

const LINKS = [
  { href: "/#how", label: "How it works" },
  { href: "/#signals", label: "Signals" },
  { href: "/privacy", label: "Privacy" },
  { href: "/#extension", label: "Extension" },
  { href: "/#open-source", label: "Open source" },
  { href: "/#faq", label: "FAQ" },
] as const;

const GITHUB = "https://github.com/MuhammadDev-OP/legitlens";

export function SiteHeader() {
  const path = usePathname();

  useEffect(() => {
    const nav = document.querySelector(".nav");
    if (!nav) return;
    const onScroll = () => nav.classList.toggle("is-scrolled", window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="nav">
      <div className="container nav__inner">
        <Link className="brand" href="/" aria-label="LegitLens home">
          <Icon id="logo" className="brand__mark" />
          <span className="brand__name">LegitLens</span>
          <span className="brand__by">by Qurtuba Labs</span>
        </Link>
        <nav aria-label="Primary" className="nav__links">
          {LINKS.map((link) => {
            const href = link.href.startsWith("/#") && path === "/" ? link.href.slice(1) : link.href;
            return (
              <Link key={link.href} href={href}>
                {link.label}
              </Link>
            );
          })}
        </nav>
        <div className="nav__cta">
          <a className="btn btn--ghost btn--sm" href={GITHUB} target="_blank" rel="noreferrer">
            <Icon id="i-github" />
            <span className="hide-sm">GitHub</span>
          </a>
          <Link className="btn btn--gold btn--sm" href="/check">
            Check a link
          </Link>
        </div>
      </div>
    </header>
  );
}
