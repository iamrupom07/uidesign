"use client";

import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import {
  IconLicensed,
  IconMonitoring,
  IconTeam,
  IconScalable,
  IconDesignSupport,
  IconProcessEngineering,
} from "@/components/ui/Icons";

const valuePropositions = [
  {
    icon: IconLicensed,
    title: "Cement Industry Expertise",
    description:
      "Specialized engineering solutions developed exclusively for cement and heavy process industries.",
  },
  {
    icon: IconDesignSupport,
    title: "End-to-End Engineering",
    description:
      "From feasibility studies to commissioning, we support every phase of your project.",
  },
  {
    icon: IconProcessEngineering,
    title: "Digital Engineering",
    description:
      "Integrating CFD, simulation, digital twins, and AI into practical engineering solutions.",
  },
  {
    icon: IconMonitoring,
    title: "Performance-Driven Approach",
    description:
      "Focused on improving productivity, reducing energy consumption, and increasing reliability.",
  },
  {
    icon: IconScalable,
    title: "Practical Engineering",
    description: "Engineering recommendations designed for implementation—not just reports.",
  },
  {
    icon: IconTeam,
    title: "Global Engineering Perspective",
    description:
      "Delivering solutions based on international standards and industry best practices.",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="py-12 sm:py-xl bg-background border-t border-border blueprint-mesh">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <Reveal className="max-w-2xl mb-12 sm:mb-14">
          <div className="font-mono text-xs font-bold text-primary tracking-widest uppercase mb-3">
            <span className="text-primary font-bold mr-1">┌</span> WHY MACPROTEC?
          </div>
          <h2 className="mb-4 font-display font-extrabold text-2xl sm:text-3xl text-foreground uppercase">
            Engineering Excellence Built for Heavy Industry
          </h2>
          <p className="body-md text-secondary text-sm sm:text-base">
            Delivering multidisciplinary engineering and digital solutions tailored to the
            challenges of cement and process operations.
          </p>
        </Reveal>

        {/* 6 Value Prop Cards Grid */}
        <RevealGroup className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-lg" stagger={0.06}>
          {valuePropositions.map((vp, index) => {
            const Icon = vp.icon;
            return (
              <RevealItem key={vp.title}>
                <div className="card p-5 sm:p-8 flex flex-col justify-between h-full bg-white relative overflow-hidden group hover:border-primary/60 transition-all duration-300">
                  {/* Subtle Corner Accent */}
                  <div className="absolute top-0 right-0 w-16 h-16 bg-slate-50 border-b border-l border-slate-100 group-hover:bg-rose-50 group-hover:border-rose-100 transition-colors flex items-start justify-end p-2">
                    <span className="font-mono text-xs font-bold text-slate-400 group-hover:text-primary transition-colors">
                      0{index + 1}
                    </span>
                  </div>

                  <div>
                    {/* Icon Header */}
                    <div className="w-12 h-12 bg-slate-50 border border-slate-200 group-hover:border-primary/30 flex items-center justify-center text-primary mb-6 transition-all duration-300 group-hover:scale-110 shadow-xs">
                      <Icon className="w-6 h-6" />
                    </div>

                    <h3 className="font-display font-extrabold text-lg text-foreground uppercase tracking-tight mb-2.5 group-hover:text-primary transition-colors">
                      {vp.title}
                    </h3>
                    <p className="text-sm text-secondary leading-relaxed font-sans">
                      {vp.description}
                    </p>
                  </div>

                  <div className="mt-6 pt-3 border-t border-slate-100 font-mono text-xs text-slate-400 uppercase tracking-widest flex items-center justify-between">
                    <span>CORE ADVANTAGE</span>
                    <span className="w-1 h-1 rounded-full bg-primary" />
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
