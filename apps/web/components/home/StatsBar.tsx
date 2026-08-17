"use client";

import { companyInfo, services, expertiseAreas } from "@/lib/constants";
import { Counter } from "@/components/ui/Counter";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { Award, Wrench, Factory, Sparkles } from "lucide-react";

export default function StatsBar() {
  const stats = [
    {
      id: "01",
      value: parseInt(companyInfo.yearsExperience, 10) || 65,
      label: "Combined Experience",
      detail: "Decades of engineering leadership & operational excellence across global plant facilities.",
      icon: Award,
    },
    {
      id: "02",
      value: services.length || 6,
      label: "Core Engineering Services",
      detail: "Multidisciplinary solutions spanning FEED, CFD, FEA stress analysis, 3D laser scanning & digital twins.",
      icon: Wrench,
    },
    {
      id: "03",
      value: expertiseAreas.length || 6,
      label: "Heavy-Process Sectors",
      detail: "Dedicated domain specialists for cement, mining, aggregates, tailings, petrochemicals & energy.",
      icon: Factory,
    },
  ];

  return (
    <section className="bg-slate-50 py-16 lg:py-20 border-t border-b border-slate-200 blueprint-mesh relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <RevealGroup
          className="grid md:grid-cols-3 gap-6 lg:gap-8"
          stagger={0.08}
        >
          {stats.map((stat, i) => {
            const IconComp = stat.icon;
            return (
              <RevealItem key={stat.label}>
                <div className="bg-white border border-slate-200 p-5 sm:p-8 relative rounded-none shadow-sm hover:shadow-xl hover:border-primary/60 transition-all duration-300 flex flex-col justify-between h-full group overflow-hidden">
                  {/* Subtle top primary accent line */}
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-rose-500 to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  <div>
                    {/* Header: Tag + Icon */}
                    <div className="flex items-center justify-between mb-6">
                      <div className="inline-flex items-center gap-1.5 bg-rose-50 border border-rose-200/80 px-2.5 py-1 font-mono text-xs font-extrabold text-primary tracking-widest uppercase">
                        <Sparkles className="w-3 h-3 text-primary" />
                        <span>{stat.id}</span>
                      </div>
                      <div className="w-10 h-10 rounded bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-500 group-hover:bg-primary group-hover:text-white group-hover:border-primary transition-colors duration-300 shadow-xs">
                        <IconComp className="w-5 h-5" />
                      </div>
                    </div>

                    {/* Counter + Plus */}
                    <div className="flex items-baseline gap-1 my-2">
                      <span className="font-display font-black text-5xl lg:text-6xl text-slate-900 tracking-tight group-hover:text-primary transition-colors">
                        <Counter value={stat.value} />
                      </span>
                      <span className="font-display font-black text-4xl lg:text-5xl text-primary">
                        +
                      </span>
                    </div>

                    {/* Label */}
                    <h3 className="font-display font-extrabold text-lg text-slate-900 uppercase tracking-tight mt-3 mb-2">
                      {stat.label}
                    </h3>

                    {/* Detail Subtext */}
                    <p className="text-slate-600 font-sans text-sm leading-relaxed">
                      {stat.detail}
                    </p>
                  </div>

                  {/* Footer Indicator */}
                  <div className="mt-8 pt-4 border-t border-slate-100 font-mono text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center justify-between group-hover:text-slate-600 transition-colors">
                    <span>PROVEN METRIC</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                  </div>
                </div>
              </RevealItem>
            );
          })}
        </RevealGroup>
      </div>
    </section>
  );
}

