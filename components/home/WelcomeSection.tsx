import Link from "next/link";
import { companyInfo } from "@/lib/constants";
import { Reveal } from "@/components/ui/Reveal";

export default function WelcomeSection() {
  return (
    <section className="py-xl bg-background overflow-hidden blueprint-mesh border-t border-border">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 grid lg:grid-cols-2 gap-lg lg:gap-xl items-stretch">
        <Reveal>
          <div className="font-mono text-[11px] font-bold text-primary tracking-widest uppercase mb-4">
            <span className="text-primary font-bold mr-1">┌</span> ABOUT MACPROTEC
          </div>
          <h2 className="mb-4 font-display font-extrabold text-3xl sm:text-4xl text-foreground leading-[1.15] uppercase">
            Built on process, not <span className="text-primary">promises</span>
          </h2>
          <p className="body-md mt-5 max-w-xl text-secondary">
            {companyInfo.description}
          </p>
          <Link
            href="/our-services"
            className="button-outline inline-block mt-8 text-center"
          >
            Discover Our Services
          </Link>
        </Reveal>

        <Reveal delay={0.15} className="h-full">
          <div className="relative h-full rounded-none bg-white border border-border p-8 flex flex-col justify-between">
            <div className="grain" />
            <div>
              <div className="font-mono text-[11px] font-bold text-primary tracking-widest uppercase mb-4">
                <span className="text-primary font-bold mr-1">┌</span> PROGRESS METRIC
              </div>
              <p className="font-display font-extrabold text-lg text-foreground tracking-tight uppercase">
                Plant Performance Progress
              </p>
              <p className="font-mono text-[9px] font-semibold text-secondary tracking-widest uppercase mt-0.5">
                Infrastructure Protection
              </p>
              
              <div className="mt-6 flex items-baseline gap-1">
                <span className="font-display font-extrabold text-4xl sm:text-5xl text-foreground tracking-tight">99.98%</span>
                <span className="font-mono text-[10px] font-bold text-emerald-600 ml-2 tracking-wide uppercase shrink-0">
                  ↑ 0.05% IMPROVEMENT SINCE SCROLL
                </span>
              </div>
            </div>

            {/* Replicated Red vertical bar progress meter */}
            <div className="flex gap-1 items-center mt-8">
              {[...Array(20)].map((_, i) => (
                <div
                  key={i}
                  className={`h-12 w-2.5 sm:w-3 ${
                    i < 16 ? "bg-primary" : "bg-slate-100"
                  } transition-colors duration-300`}
                />
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
