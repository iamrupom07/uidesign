import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { companyInfo } from "@/lib/constants";

const specs: [string, string][] = [
  ["Type", "Engineering Consultancy"],
  ["Base", "Houston, TX"],
  ["Experience", `${companyInfo.yearsExperience} Yrs Combined`],
  ["Services", "6 Core Disciplines"],
  ["Sectors", "Cement / Mining / Petrochem"],
];

const HEX = "polygon(25% 3%, 75% 3%, 100% 50%, 75% 97%, 25% 97%, 0% 50%)";

export default function Hero() {
  return (
    <section
      className="relative overflow-hidden bg-[#F8F6F2]"
      style={{ "--mp-slab": "'Zilla Slab', serif", "--mp-mono": "'IBM Plex Mono', monospace" } as React.CSSProperties}
    >
      {/* faint grid, the page's paper, not a photo */}
      <div
        className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            "linear-gradient(#16131F 1px, transparent 1px), linear-gradient(90deg, #16131F 1px, transparent 1px)",
          backgroundSize: "44px 44px",
        }}
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-24 lg:py-32 grid lg:grid-cols-[1.15fr_1fr] gap-16 items-center relative">
        <div>
          <p
            className="mp-rise mp-d1 text-xs font-semibold tracking-[0.2em] uppercase text-brand mb-6"
            style={{ fontFamily: "var(--mp-mono)" }}
          >
            Macprotec Engineering &mdash; Houston, TX
          </p>

          <h1 className="text-ink font-bold leading-[1.05]" style={{ fontFamily: "var(--mp-slab)" }}>
            <span className="mp-rise mp-d2 block text-4xl sm:text-5xl lg:text-[3.6rem]">Precision engineering</span>
            <span className="mp-rise mp-d3 block text-4xl sm:text-5xl lg:text-[3.6rem]">for plants that</span>
            <span className="mp-rise mp-d4 block text-4xl sm:text-5xl lg:text-[3.6rem] text-brand">never stop.</span>
          </h1>

          <p className="mp-rise mp-d4 mt-8 text-lg text-body max-w-lg leading-relaxed">
            We design, integrate, and support the process systems behind cement, mining, and
            petrochemical operations &mdash; built to run continuously, inspected to the letter.
          </p>

          <div className="mp-rise mp-d5 mt-10 flex flex-wrap items-center gap-4">
            <Link
              href="/our-services"
              className="group inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-white font-semibold bg-brand hover:bg-brand-dark transition-colors"
            >
              Explore Our Services
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
            </Link>
            <Link
              href="/lets-connect"
              className="px-7 py-3.5 rounded-full font-semibold border border-ink/15 text-ink hover:border-ink/30 transition-colors"
            >
              Let&apos;s Connect
            </Link>
          </div>
        </div>

        {/* signature element: an industrial nameplate, the kind bolted to real equipment */}
        <div className="mp-plate relative mx-auto w-full max-w-sm">
          <div
            className="relative rounded-md overflow-hidden shadow-[0_30px_60px_-25px_rgba(22,19,31,0.45)]"
            style={{ background: "linear-gradient(155deg, #2C1846, #1B0F2C)" }}
          >
            <div className="h-1.5 bg-brand" aria-hidden="true" />

            <div className="p-8">
              <div className="flex items-center gap-2.5 mb-7">
                <span
                  className="w-8 h-8 flex items-center justify-center text-white text-xs font-bold bg-brand shrink-0"
                  style={{ clipPath: HEX }}
                  aria-hidden="true"
                >
                  M
                </span>
                <span
                  className="text-white/90 text-sm tracking-[0.22em] uppercase"
                  style={{ fontFamily: "var(--mp-mono)" }}
                >
                  Macprotec
                </span>
              </div>

              <dl className="space-y-4">
                {specs.map(([label, value]) => (
                  <div
                    key={label}
                    className="flex items-baseline justify-between gap-4 pb-4 border-b border-white/10 last:border-0 last:pb-0"
                  >
                    <dt
                      className="text-[10px] uppercase tracking-[0.16em] text-white/40 shrink-0"
                      style={{ fontFamily: "var(--mp-mono)" }}
                    >
                      {label}
                    </dt>
                    <dd className="text-sm text-white font-medium text-right">{value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>

          {/* rivets, one per corner */}
          {(["-top-1.5 -left-1.5", "-top-1.5 -right-1.5", "-bottom-1.5 -left-1.5", "-bottom-1.5 -right-1.5"] as const).map(
            (pos) => (
              <span
                key={pos}
                className={`absolute ${pos} w-3 h-3 rounded-full`}
                style={{ background: "radial-gradient(circle at 35% 30%, #EDEAF2, #8B8698)" }}
                aria-hidden="true"
              />
            )
          )}
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Zilla+Slab:wght@600;700&family=IBM+Plex+Mono:wght@500&display=swap');

        .mp-rise { opacity: 1; transform: translateY(0); }
        .mp-plate { opacity: 1; transform: scale(1); }

        @media (prefers-reduced-motion: no-preference) {
          .mp-rise { animation: mp-rise .6s cubic-bezier(.16,.84,.44,1) both; }
          .mp-plate { animation: mp-stamp .55s cubic-bezier(.2,.8,.3,1.15) both; }
          .mp-d1 { animation-delay: .05s; }
          .mp-d2 { animation-delay: .15s; }
          .mp-d3 { animation-delay: .27s; }
          .mp-d4 { animation-delay: .39s; }
          .mp-d5 { animation-delay: .55s; }
          .mp-plate { animation-delay: .3s; }

          @keyframes mp-rise {
            from { opacity: 0; transform: translateY(14px); }
            to { opacity: 1; transform: translateY(0); }
          }
          @keyframes mp-stamp {
            from { opacity: 0; transform: scale(0.94); }
            to { opacity: 1; transform: scale(1); }
          }
        }
      `}</style>
    </section>
  );
}