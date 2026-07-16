import { companyInfo, primaryNav } from "@/lib/constants";

export default function Footer() {
  return (
    <footer className="bg-tint-2 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12 flex flex-col md:flex-row md:items-center md:justify-between gap-8">
        <div>
          <p className="font-display font-bold text-brand">{companyInfo.name}</p>
          <p className="text-sm text-body mt-1">An Innovative Engineering Consulting Company</p>
        </div>

        <div className="flex flex-wrap gap-8 text-sm">
          {primaryNav
            .filter((item) => item.children)
            .map((item) => (
              <div key={item.label}>
                <p className="font-semibold mb-2">{item.label}</p>
                <ul className="space-y-1.5">
                  {item.children!.slice(0, 4).map((child) => (
                    <li key={child.href}>
                      <a href={child.href} className="text-body hover:text-brand">
                        {child.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
        </div>

        <div>
          <p className="text-sm font-semibold">Contact us</p>
          <p className="text-sm text-body">{companyInfo.email}</p>
          <p className="text-sm text-body">{companyInfo.phone}</p>
          <div className="flex gap-3 mt-3">
            <a
              href="#"
              aria-label="LinkedIn"
              className="w-9 h-9 rounded-full border border-gray-300 flex items-center justify-center hover:bg-white text-xs"
            >
              in
            </a>
            <a
              href="#"
              aria-label="X"
              className="w-9 h-9 rounded-full border border-gray-300 flex items-center justify-center hover:bg-white text-xs"
            >
              X
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-200 py-4 text-center text-xs text-body">
        © {new Date().getFullYear()} {companyInfo.name}. All rights reserved.
      </div>
    </footer>
  );
}
