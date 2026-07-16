import Link from "next/link";
import { companyInfo } from "@/lib/constants";

export default function WelcomeSection() {
  return (
    <section className="py-20 lg:py-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 grid lg:grid-cols-2 gap-14 items-center">
        <div>
          <p className="text-sm font-semibold uppercase tracking-widest text-brand mb-3">Welcome to</p>
          <h2 className="text-3xl sm:text-4xl font-bold mb-1">MACPROTEC</h2>
          <p className="text-body text-lg mt-5 leading-relaxed">{companyInfo.description}</p>
          <Link
            href="/our-services"
            className="inline-flex items-center gap-2 mt-7 font-semibold text-brand hover:gap-3 transition-all"
          >
            Discover our services
            <svg width="16" height="16" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth={2}>
              <path d="M4 10h12M12 5l5 5-5 5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </div>

        <div
          className="rounded-2xl h-80 lg:h-96 flex items-center justify-center"
          style={{ background: "linear-gradient(135deg,#EDE9F7,#D8CFEF)" }}
        >
          <svg width="100" height="100" viewBox="0 0 24 24" fill="none" stroke="#7A6AA0" strokeWidth={1}>
            <path d="M4 21V9l8-6 8 6v12M9 21v-6h6v6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>
    </section>
  );
}
