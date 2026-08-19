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
            Houston based Engineering and Service Company for the heavy process industries.
          </p>
        </div>

        <div className="flex flex-wrap gap-8 sm:gap-10 text-sm">
          {primaryNav
            .filter(
              (item) =>
                item.children &&
                item.label.toLowerCase() !== "resources" &&
                item.href !== "/resources"
            )
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
          <div className="flex gap-2.5 mt-4">
            <a
              href="https://www.linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="w-8 h-8 rounded-sm bg-[#0A66C2] hover:bg-[#004182] text-white flex items-center justify-center transition-all duration-150 shadow-xs hover:scale-105"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
              </svg>
            </a>
            <a
              href="https://x.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="X (formerly Twitter)"
              className="w-8 h-8 rounded-sm bg-[#000000] hover:bg-[#1f2937] text-white flex items-center justify-center transition-all duration-150 shadow-xs hover:scale-105"
            >
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
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
