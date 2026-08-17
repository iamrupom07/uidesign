import { companyInfo, primaryNav } from "@/lib/constants";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-white text-foreground border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 flex flex-col md:flex-row md:items-start md:justify-between gap-10">
        <div>
          <Link href="/" className="inline-block group">
            <img
              src="/images/logo-horizontal.png"
              alt="MACPROTEC - Excellence in Process"
              className="h-12 w-auto object-contain transition-transform duration-200 group-hover:scale-105"
            />
          </Link>
          <p className="text-sm text-secondary mt-4 max-w-[18rem] leading-relaxed font-sans">
            Houston-based process engineering consulting and system integration for heavy process
            industries.
          </p>
        </div>

        <div className="flex flex-wrap gap-8 sm:gap-10 text-sm">
          {primaryNav
            .filter((item) => item.children)
            .map((item) => (
              <div key={item.label} className="min-w-[120px]">
                <p className="font-sans font-bold text-foreground mb-4 uppercase tracking-wider text-xs">
                  {item.label}
                </p>
                <ul className="space-y-2.5 text-secondary font-sans text-xs sm:text-sm">
                  {item.children!.slice(0, 4).map((child) => (
                    <li key={child.href}>
                      <Link
                        href={child.href}
                        className="hover:text-primary transition-colors duration-150 ease-standard"
                      >
                        {child.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
        </div>

        <div>
          <p className="font-sans font-bold text-foreground mb-4 uppercase tracking-wider text-xs">
            Contact Us
          </p>
          <p className="text-sm text-secondary leading-relaxed font-sans">{companyInfo.email}</p>
          <p className="text-sm text-secondary leading-relaxed mt-1 font-sans">
            {companyInfo.phone}
          </p>
          <div className="flex gap-2 mt-4">
            <a
              href="#"
              aria-label="LinkedIn"
              className="w-8 h-8 rounded-none border border-border bg-white flex items-center justify-center hover:bg-muted text-xs font-sans text-secondary hover:text-primary transition-colors duration-150 ease-standard"
            >
              in
            </a>
            <a
              href="#"
              aria-label="X"
              className="w-8 h-8 rounded-none border border-border bg-white flex items-center justify-center hover:bg-muted text-xs font-sans text-secondary hover:text-primary transition-colors duration-150 ease-standard"
            >
              X
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-border py-6 text-center font-sans text-xs text-secondary">
        © {new Date().getFullYear()} {companyInfo.name}. All rights reserved.
      </div>
    </footer>
  );
}
