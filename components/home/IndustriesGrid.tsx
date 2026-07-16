import Link from "next/link";
import { expertiseAreas } from "@/lib/constants";

export default function IndustriesGrid() {
  return (
    <section className="py-20 lg:py-24 bg-tint-2">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="max-w-2xl mb-14">
          <p className="text-sm font-semibold uppercase tracking-widest text-brand mb-3">
            Industries we&apos;re expert in
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold">
            Deep experience across heavy-process sectors
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {expertiseAreas.map((area) => (
            <Link
              key={area.slug}
              href={`/our-expertise/${area.slug}`}
              className="flex items-center gap-4 bg-white rounded-xl p-5 border border-gray-100 transition-transform hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="w-12 h-12 rounded-lg bg-tint flex items-center justify-center shrink-0">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#D6266B" strokeWidth={1.6}>
                  <circle cx="12" cy="12" r="9" />
                </svg>
              </div>
              <p className="font-semibold">{area.title}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
