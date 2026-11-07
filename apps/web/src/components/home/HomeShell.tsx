"use client";

import { useEffect, useRef } from "react";
import { useHomeMotion } from "./useHomeMotion";

export function HomeShell({ children }: { children: React.ReactNode }) {
  const root = useRef<HTMLDivElement>(null);
  useHomeMotion(root);

  useEffect(() => {
    const scrollToHash = () => {
      const id = window.location.hash.replace(/^#/, "");
      if (!id) return;
      document.getElementById(id)?.scrollIntoView();
    };
    scrollToHash();
    window.addEventListener("hashchange", scrollToHash);
    return () => window.removeEventListener("hashchange", scrollToHash);
  }, []);

  return (
    <div className="ll" ref={root}>
      {children}
    </div>
  );
}
