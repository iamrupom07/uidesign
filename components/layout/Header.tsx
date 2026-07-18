"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { primaryNav, companyInfo } from "@/lib/constants";
import { Magnetic } from "@/components/ui/Magnetic";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 8);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <div className="w-full bg-muted text-secondary py-2 border-b border-border">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 flex items-center justify-between font-mono text-[10px] uppercase tracking-wider">
          <span>{companyInfo.tagline}</span>
          <span className="hidden sm:inline">Houston, TX · 29.76°N 95.37°W</span>
        </div>
      </div>

      <header
        className={`w-full sticky top-0 bg-white/95 backdrop-blur-md border-b border-border z-40 transition-all duration-150 h-18 flex items-center`}
      >
        <div className="w-full max-w-7xl mx-auto px-6 lg:px-8 flex items-center justify-between py-3">
          <Link href="/" className="flex items-center gap-2 group">
            <span className="font-sans font-extrabold text-xl text-primary">//</span>
            <span className="font-sans font-extrabold text-lg tracking-tight text-foreground transition-colors group-hover:text-primary">
              MACPROTEC
            </span>
          </Link>

          <nav className="hidden xl:flex items-center gap-5 text-[11px] font-mono font-bold text-secondary uppercase tracking-wider">
            {primaryNav.map((item) =>
              item.children ? (
                <div key={item.label} className="relative group cursor-pointer py-4">
                  <span className="relative flex items-center gap-1.5 hover:text-primary transition-colors duration-150 ease-standard">
                    {item.label}
                    <svg width="8" height="8" viewBox="0 0 20 20" fill="currentColor" className="text-secondary opacity-60 group-hover:text-primary transition-colors duration-150">
                      <path d="M5 8l5 5 5-5" />
                    </svg>
                  </span>
                  {/* Mega-menu dropdown panel */}
                  <div className={`absolute hidden group-hover:block top-full left-1/2 -translate-x-1/2 pt-2 z-50`}>
                    <div className={`bg-white rounded-none border border-border p-6 shadow-[0_8px_24px_rgba(0,0,0,0.06)] text-foreground grid gap-x-5 gap-y-2.5 ${
                      item.children.length > 10
                        ? "grid-cols-3 w-[660px]"
                        : item.children.length > 5
                        ? "grid-cols-2 w-[440px]"
                        : "grid-cols-1 w-[220px]"
                    }`}>
                      <div className={`${
                        item.children.length > 10 ? "col-span-3" : item.children.length > 5 ? "col-span-2" : "col-span-1"
                      } border-b border-border pb-2 mb-1 flex items-center justify-between`}>
                        <span className="font-mono font-semibold text-[10px] text-muted-foreground tracking-widest uppercase">{item.label} Index</span>
                      </div>
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className="group/item flex flex-col p-1 rounded-none hover:bg-muted transition-all duration-150 ease-standard border border-transparent"
                        >
                          <span className="text-[12px] font-sans font-semibold leading-tight text-foreground group-hover/item:text-primary transition-colors">
                            {child.label}
                          </span>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <Link key={item.href} href={item.href} className="relative py-4 hover:text-primary transition-colors duration-150 ease-standard">
                  {item.label}
                </Link>
              )
            )}
          </nav>

          <div className="hidden md:inline-block">
            <Magnetic strength={0.05}>
              <Link
                href="/lets-connect"
                className="button-primary"
              >
                Let&apos;s Connect
              </Link>
            </Magnetic>
          </div>
        </div>
      </header>
    </>
  );
}
