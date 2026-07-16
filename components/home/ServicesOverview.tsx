import Link from "next/link";
import { services } from "@/lib/constants";

const gradients = [
  "linear-gradient(135deg,#2B1B4E,#3E2A63)",
  "linear-gradient(135deg,#D6266B,#A81C56)",
  "linear-gradient(135deg,#7C8399,#5C6379)",
  "#EDE9F7",
  "linear-gradient(135deg,#3E2A63,#2B1B4E)",
  "linear-gradient(135deg,#A81C56,#D6266B)",
];

export default function ServicesOverview() {
  // Home shows all six offerings, even ones without a live detail page yet.
  const sorted = [...services].sort((a, b) => a.order - b.order);

  return (
    <section id="our-services" className="py-20 lg:py-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex flex-wrap items-end justify-between gap-6 mb-14">
          <div className="max-w-xl">
            <p className="text-sm font-semibold uppercase tracking-widest text-brand mb-3">What we do</p>
            <h2 className="text-3xl sm:text-4xl font-bold">Our Services</h2>
          </div>
          <Link
            href="/lets-connect"
            className="px-6 py-3 rounded-full text-white font-semibold bg-brand hover:bg-brand-dark transition-colors text-sm"
          >
            Request a consultation
          </Link>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {sorted.map((service, i) => {
            const card = (
              <div className="rounded-2xl overflow-hidden border border-gray-100 transition-transform hover:-translate-y-1 hover:shadow-lg h-full">
                <div className="h-36" style={{ background: gradients[i % gradients.length] }} />
                <div className="p-6">
                  <p className="font-semibold text-lg">{service.title}</p>
                  <p className="text-sm text-body mt-2">{service.summary}</p>
                  {!service.published && (
                    <span className="inline-block mt-3 text-xs text-body/70">Details coming soon</span>
                  )}
                </div>
              </div>
            );

            return service.published ? (
              <Link key={service.slug} href={`/our-services/${service.slug}`}>
                {card}
              </Link>
            ) : (
              <div key={service.slug}>{card}</div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
