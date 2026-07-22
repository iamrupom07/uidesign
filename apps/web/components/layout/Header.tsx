"use client";

import Link from "next/link";
import { useEffect, useState, useRef } from "react";
import { primaryNav, companyInfo } from "@/lib/constants";
import { Magnetic } from "@/components/ui/Magnetic";
import { useLanguage, LANGUAGES, LanguageOption } from "@/context/LanguageContext";
import * as Flags from "country-flag-icons/react/3x2";

function CountryFlag({
  country,
  className = "w-4 h-3 shrink-0 object-cover border border-slate-300 shadow-xs",
}: {
  country: string;
  className?: string;
}) {
  const Flag = (Flags as Record<string, React.ComponentType<{ className?: string }>>)[country];
  if (!Flag) return <span className="text-xs shrink-0">🌐</span>;
  return <Flag className={className} />;
}

function LanguageSelectorDropdown() {
  const { language, currentLangObj, setLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-800 font-mono text-[11px] font-bold py-1.5 px-2.5 transition-all duration-150 focus:outline-none uppercase tracking-wider"
        aria-label="Select Language"
      >
        <CountryFlag country={currentLangObj.country} />
        <span className="font-mono text-[10px] tracking-wide">
          {currentLangObj.code.toUpperCase()}
        </span>
        <svg
          className={`w-3 h-3 text-slate-500 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2.5}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 bg-white border border-slate-200 shadow-xl z-50 py-1 max-h-80 overflow-y-auto rounded-none">
          <div className="px-3 py-1.5 border-b border-slate-100 font-mono text-[9px] font-bold text-slate-400 uppercase tracking-widest flex items-center justify-between">
            <span>Select Language</span>
            <span>{LANGUAGES.length} Available</span>
          </div>
          {LANGUAGES.map((lang: LanguageOption) => {
            const isSelected =
              language.toLowerCase() === lang.code.toLowerCase() ||
              language.toLowerCase() === lang.code.split("-")[0].toLowerCase();
            return (
              <button
                key={lang.code}
                onClick={() => {
                  setLanguage(lang.code);
                  setIsOpen(false);
                }}
                className={`w-full flex items-center justify-between px-3 py-2 text-left hover:bg-rose-50/60 transition-colors duration-120 group ${
                  isSelected ? "bg-rose-50/80 font-bold text-primary" : "text-slate-700"
                }`}
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <CountryFlag
                    country={lang.country}
                    className="w-5 h-3.5 object-cover border border-slate-300 shadow-xs"
                  />
                  <div className="truncate">
                    <span className="block text-[11px] font-sans font-medium truncate group-hover:text-primary transition-colors">
                      {lang.nativeName}
                    </span>
                    {lang.nativeName !== lang.name && (
                      <span className="block text-[9px] font-mono text-slate-400 truncate leading-none">
                        {lang.name}
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-1.5 shrink-0 ml-2">
                  <span className="font-mono text-[9px] font-semibold text-slate-400 bg-slate-100 px-1 py-0.5 uppercase">
                    {lang.code.toUpperCase()}
                  </span>
                  {isSelected && (
                    <svg
                      className="w-3.5 h-3.5 text-primary shrink-0"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={3}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

function getSubmenuIcon(label: string) {
  const l = label.toLowerCase();

  if (
    l.includes("cement") ||
    l.includes("kiln") ||
    l.includes("mill") ||
    l.includes("burner") ||
    l.includes("clinker") ||
    l.includes("lime") ||
    l.includes("plant")
  ) {
    return (
      <svg
        className="w-3.5 h-3.5 text-primary shrink-0"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
        />
      </svg>
    );
  }
  if (
    l.includes("cfd") ||
    l.includes("simulation") ||
    l.includes("twin") ||
    l.includes("virtual") ||
    l.includes("analytics") ||
    l.includes("predictive") ||
    l.includes("ai")
  ) {
    return (
      <svg
        className="w-3.5 h-3.5 text-primary shrink-0"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
        />
      </svg>
    );
  }
  if (
    l.includes("mining") ||
    l.includes("aggregate") ||
    l.includes("bulk") ||
    l.includes("handling")
  ) {
    return (
      <svg
        className="w-3.5 h-3.5 text-primary shrink-0"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4"
        />
      </svg>
    );
  }
  if (
    l.includes("design") ||
    l.includes("piping") ||
    l.includes("mechanical") ||
    l.includes("civil") ||
    l.includes("structural") ||
    l.includes("instrumentation") ||
    l.includes("electrical") ||
    l.includes("reverse") ||
    l.includes("laser") ||
    l.includes("scanning")
  ) {
    return (
      <svg
        className="w-3.5 h-3.5 text-primary shrink-0"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
        />
      </svg>
    );
  }
  if (
    l.includes("training") ||
    l.includes("lms") ||
    l.includes("online") ||
    l.includes("corporate") ||
    l.includes("workshop") ||
    l.includes("catalogue")
  ) {
    return (
      <svg
        className="w-3.5 h-3.5 text-primary shrink-0"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"
        />
      </svg>
    );
  }
  if (
    l.includes("overview") ||
    l.includes("mission") ||
    l.includes("vision") ||
    l.includes("philosophy") ||
    l.includes("leadership") ||
    l.includes("why")
  ) {
    return (
      <svg
        className="w-3.5 h-3.5 text-primary shrink-0"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    );
  }
  if (
    l.includes("blog") ||
    l.includes("article") ||
    l.includes("paper") ||
    l.includes("guide") ||
    l.includes("brochure") ||
    l.includes("insight") ||
    l.includes("video") ||
    l.includes("webinar") ||
    l.includes("download") ||
    l.includes("faq") ||
    l.includes("newsletter") ||
    l.includes("profile")
  ) {
    return (
      <svg
        className="w-3.5 h-3.5 text-primary shrink-0"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
        />
      </svg>
    );
  }
  return (
    <svg
      className="w-3.5 h-3.5 text-primary shrink-0"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
      />
    </svg>
  );
}

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { language, setLanguage } = useLanguage();

  return (
    <>
      <div className="w-full bg-muted text-secondary py-2 border-b border-border">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 flex items-center justify-between font-mono text-[10px] uppercase tracking-wider">
          <span>{companyInfo.tagline}</span>
          <span className="hidden sm:inline">Houston, TX · 29.76°N 95.37°W</span>
        </div>
      </div>

      <header className="w-full sticky top-0 bg-white/95 backdrop-blur-md border-b border-border z-40 transition-all duration-150 h-18 flex items-center">
        <div className="w-full max-w-7xl mx-auto px-6 lg:px-8 flex items-center justify-between py-3">
          <Link href="/" className="flex items-center gap-2 group">
            <span className="font-sans font-extrabold text-xl text-primary">//</span>
            <span className="font-sans font-extrabold text-lg tracking-tight text-foreground transition-colors group-hover:text-primary">
              MACPROTEC
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden xl:flex items-center gap-5 text-[11px] font-mono font-bold text-secondary uppercase tracking-wider">
            {primaryNav.map((item) =>
              item.children ? (
                <div key={item.label} className="relative group cursor-pointer py-4">
                  <Link
                    href={item.href}
                    className="relative flex items-center gap-1.5 hover:text-primary transition-colors duration-150 ease-standard"
                  >
                    {item.label}
                    <svg
                      width="8"
                      height="8"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      className="text-secondary opacity-60 group-hover:text-primary transition-colors duration-150"
                    >
                      <path d="M5 8l5 5 5-5" />
                    </svg>
                  </Link>
                  {/* Mega-menu dropdown panel */}
                  <div className="absolute hidden group-hover:block top-full left-1/2 -translate-x-1/2 pt-2 z-50">
                    <div
                      className={`bg-white rounded-none border border-border p-6 shadow-[0_8px_24px_rgba(0,0,0,0.06)] text-foreground grid gap-x-5 gap-y-2.5 ${
                        item.children.length > 10
                          ? "grid-cols-3 w-[660px]"
                          : item.children.length > 5
                            ? "grid-cols-2 w-[440px]"
                            : "grid-cols-1 w-[220px]"
                      }`}
                    >
                      <div
                        className={`${
                          item.children.length > 10
                            ? "col-span-3"
                            : item.children.length > 5
                              ? "col-span-2"
                              : "col-span-1"
                        } border-b border-border pb-2 mb-1`}
                      >
                        <Link
                          href={item.href}
                          className="w-full font-mono font-bold text-[10px] text-muted-foreground hover:text-primary tracking-widest uppercase flex items-center justify-between gap-2 group/hdr"
                        >
                          <span>{item.label} Overview</span>
                          <span className="text-primary font-mono text-[9px] group-hover/hdr:translate-x-1 transition-transform shrink-0">
                            View All →
                          </span>
                        </Link>
                      </div>
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className="group/item flex items-center gap-2 p-1.5 rounded-none hover:bg-muted transition-all duration-150 ease-standard border border-transparent"
                        >
                          {getSubmenuIcon(child.label)}
                          <span className="text-[11px] font-sans font-semibold leading-tight text-foreground group-hover/item:text-primary transition-colors">
                            {child.label}
                          </span>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <Link
                  key={item.href}
                  href={item.href}
                  className="relative py-4 hover:text-primary transition-colors duration-150 ease-standard"
                >
                  {item.label}
                </Link>
              )
            )}
          </nav>

          <div className="flex items-center gap-4">
            {/* Country Flag Language Selector */}
            <LanguageSelectorDropdown />

            <div className="hidden md:inline-block">
              <Magnetic strength={0.05}>
                <Link href="/lets-connect" className="button-primary">
                  Let&apos;s Connect
                </Link>
              </Magnetic>
            </div>

            {/* Mobile menu trigger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-2 text-foreground hover:text-primary transition-colors focus:outline-none"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? (
                <svg
                  className="w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg
                  className="w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 top-[108px] bg-white z-40 overflow-y-auto border-t border-border flex flex-col p-6 xl:hidden">
          <div className="mb-6 pb-4 border-b border-border">
            <span className="font-mono text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-2">
              Select Language
            </span>
            <div className="grid grid-cols-2 gap-2">
              {LANGUAGES.map((lang: LanguageOption) => {
                const isSelected = language.toLowerCase() === lang.code.toLowerCase();
                return (
                  <button
                    key={lang.code}
                    onClick={() => {
                      setLanguage(lang.code);
                      setMobileMenuOpen(false);
                    }}
                    className={`flex items-center gap-2 p-2 border text-[11px] font-sans transition-colors ${
                      isSelected
                        ? "border-primary bg-rose-50 text-primary font-bold"
                        : "border-slate-200 text-slate-700"
                    }`}
                  >
                    <CountryFlag country={lang.country} />
                    <span className="truncate">{lang.nativeName}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <nav className="flex flex-col gap-6 text-xs font-mono font-bold text-foreground uppercase tracking-wider">
            {primaryNav.map((item) => (
              <div key={item.label} className="border-b border-border pb-4">
                {item.children ? (
                  <div className="flex flex-col gap-3">
                    <Link
                      href={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="text-secondary hover:text-primary font-extrabold flex items-center justify-between group"
                    >
                      <span>{item.label}</span>
                      <span className="text-[10px] text-primary font-mono font-bold uppercase group-hover:translate-x-1 transition-transform">
                        Overview →
                      </span>
                    </Link>
                    <div className="pl-4 grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2 border-l border-primary/20">
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          onClick={() => setMobileMenuOpen(false)}
                          className="text-[11px] font-sans text-muted-foreground hover:text-primary flex items-center gap-2 py-0.5"
                        >
                          {getSubmenuIcon(child.label)}
                          <span>{child.label}</span>
                        </Link>
                      ))}
                    </div>
                  </div>
                ) : (
                  <Link
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="hover:text-primary block py-1"
                  >
                    {item.label}
                  </Link>
                )}
              </div>
            ))}
            <Link
              href="/lets-connect"
              onClick={() => setMobileMenuOpen(false)}
              className="button-primary w-full text-center mt-4"
            >
              Let&apos;s Connect
            </Link>
          </nav>
        </div>
      )}
    </>
  );
}
