"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, ChevronDown, Phone, Mail, Wrench, Factory, BookOpen, MessageSquare, ArrowRight } from "lucide-react";
import { primaryNav, companyInfo } from "@/lib/constants";
import type { LucideIcon } from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  "Our Services": Wrench,
  "Our Expertise": Factory,
  Resources: BookOpen,
  "Let's Connect": MessageSquare,
};

const HEX = "polygon(25% 3%, 75% 3%, 100% 50%, 75% 97%, 25% 97%, 0% 50%)";

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileAccordion, setMobileAccordion] = useState<string | null>(null);

  return (
    <>
      {/* dark utility bar — carries contact info, sets up the paper/ink contrast used again in the hero */}
      <div className="hidden sm:flex items-center justify-between px-6 lg:px-8 py-2 bg-ink text-white/60 text-[11px]">
        <span className="tracking-[0.16em] uppercase font-medium">{companyInfo.tagline}</span>
        <div className="flex items-center gap-5">
          <a href={`tel:${companyInfo.phone}`} className="flex items-center gap-1.5 hover:text-white transition-colors">
            <Phone size={12} strokeWidth={2} />
            {companyInfo.phone}
          </a>
          <a href={`mailto:${companyInfo.email}`} className="flex items-center gap-1.5 hover:text-white transition-colors">
            <Mail size={12} strokeWidth={2} />
            {companyInfo.email}
          </a>
        </div>
      </div>

      <header className="sticky top-0 z-40 bg-[#F8F6F2]/95 backdrop-blur border-b border-ink/8">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 h-20 flex items-center justify-between gap-6">
          <Link href="/" className="flex items-center gap-3 shrink-0">
            <span
              className="w-10 h-10 flex items-center justify-center text-white font-bold text-sm bg-brand"
              style={{ clipPath: HEX }}
              aria-hidden="true"
            >
              M
            </span>
            <span className="leading-tight">
              <span className="block font-display font-bold text-lg tracking-tight text-ink">MACPROTEC</span>
              <span className="block text-[10px] uppercase tracking-widest text-body -mt-0.5">Engineering</span>
            </span>
          </Link>

          {/* desktop nav */}
          <nav className="hidden lg:flex items-center gap-1 text-sm font-medium text-ink">
            {primaryNav.map((item) => {
              const Icon = iconMap[item.label];

              if (!item.children) {
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="px-4 py-2.5 rounded-lg hover:bg-ink/5 transition-colors flex items-center gap-1.5"
                  >
                    {Icon && <Icon size={15} className="text-body" strokeWidth={2} />}
                    {item.label}
                  </Link>
                );
              }

              const isOpen = openDropdown === item.label;
              return (
                <div key={item.label} className="relative">
                  <button
                    type="button"
                    onClick={() => setOpenDropdown(isOpen ? null : item.label)}
                    className="px-4 py-2.5 rounded-lg hover:bg-ink/5 transition-colors flex items-center gap-1.5"
                    aria-expanded={isOpen}
                  >
                    {Icon && <Icon size={15} className="text-body" strokeWidth={2} />}
                    {item.label}
                    <ChevronDown
                      size={14}
                      className={`text-body transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
                    />
                  </button>

                  {isOpen && (
                    <>
                      {/* click-outside catcher */}
                      <button
                        type="button"
                        aria-label="Close menu"
                        className="fixed inset-0 z-30 cursor-default"
                        onClick={() => setOpenDropdown(null)}
                      />
                      <div className="absolute top-full left-0 pt-3 w-72 z-40">
                        <div className="bg-white rounded-xl shadow-xl border border-ink/8 p-2">
                          {item.children.map((child) => (
                            <Link
                              key={child.href}
                              href={child.href}
                              onClick={() => setOpenDropdown(null)}
                              className="block px-4 py-2.5 rounded-lg hover:bg-tint text-sm text-ink"
                            >
                              {child.label}
                            </Link>
                          ))}
                        </div>
                      </div>
                    </>
                  )}
                </div>
              );
            })}
          </nav>

          <Link
            href="/lets-connect"
            className="hidden lg:inline-flex group items-center gap-2 px-5 py-2.5 rounded-full text-white text-sm font-semibold bg-brand hover:bg-brand-dark transition-colors shrink-0"
          >
            Let&apos;s Connect
            <ArrowRight size={15} className="transition-transform group-hover:translate-x-0.5" />
          </Link>

          <button
            type="button"
            className="lg:hidden p-2 -mr-2 text-ink"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {/* mobile panel */}
        {mobileOpen && (
          <div className="lg:hidden border-t border-ink/8 bg-white px-6 py-2">
            {primaryNav.map((item) => {
              const Icon = iconMap[item.label];

              if (!item.children) {
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="flex items-center gap-2.5 py-3.5 text-ink font-medium border-b border-ink/5"
                    onClick={() => setMobileOpen(false)}
                  >
                    {Icon && <Icon size={16} className="text-body" strokeWidth={2} />}
                    {item.label}
                  </Link>
                );
              }

              const expanded = mobileAccordion === item.label;
              return (
                <div key={item.label} className="border-b border-ink/5">
                  <button
                    type="button"
                    className="w-full flex items-center justify-between py-3.5 text-ink font-medium"
                    onClick={() => setMobileAccordion(expanded ? null : item.label)}
                    aria-expanded={expanded}
                  >
                    <span className="flex items-center gap-2.5">
                      {Icon && <Icon size={16} className="text-body" strokeWidth={2} />}
                      {item.label}
                    </span>
                    <ChevronDown
                      size={16}
                      className={`text-body transition-transform duration-200 ${expanded ? "rotate-180" : ""}`}
                    />
                  </button>
                  {expanded && (
                    <div className="pb-3.5 pl-7 space-y-1">
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className="block py-2 text-sm text-body"
                          onClick={() => setMobileOpen(false)}
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}

            <Link
              href="/lets-connect"
              className="my-4 inline-flex items-center justify-center gap-2 w-full px-5 py-3 rounded-full text-white font-semibold bg-brand"
              onClick={() => setMobileOpen(false)}
            >
              Let&apos;s Connect
              <ArrowRight size={15} />
            </Link>
          </div>
        )}
      </header>
    </>
  );
}