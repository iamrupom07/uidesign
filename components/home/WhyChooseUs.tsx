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
    description: "Specialized engineering solutions developed exclusively for cement and heavy process industries.",
  },
  {
    icon: IconDesignSupport,
    title: "End-to-End Engineering",
    description: "From feasibility studies to commissioning, we support every phase of your project.",
  },
  {
    icon: IconProcessEngineering,
    title: "Digital Engineering",
    description: "Integrating CFD, simulation, digital twins, and AI into practical engineering solutions.",
  },
  {
    icon: IconMonitoring,
    title: "Performance-Driven Approach",
    description: "Focused on improving productivity, reducing energy consumption, and increasing reliability.",
  },
  {
    icon: IconScalable,
    title: "Practical Engineering",
    description: "Engineering recommendations designed for implementation—not just reports.",
  },
  {
    icon: IconTeam,
    title: "Global Engineering Perspective",
    description: "Delivering solutions based on international standards and industry best practices.",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="py-xl bg-background border-t border-border blueprint-mesh">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        {/* Section Header */}
        <Reveal className="max-w-2xl mb-14">
          <div className="font-mono text-[11px] font-bold text-primary tracking-widest uppercase mb-4">
            <span className="text-primary font-bold mr-1">┌</span> WHY MACPROTEC?
          </div>
          <h2 className="mb-4 font-display font-extrabold text-3xl text-foreground uppercase">
            Six Value Propositions
          </h2>
        </Reveal>

        {/* 6 Value Propositions Grid */}
        <RevealGroup className="grid sm:grid-cols-2 lg:grid-cols-3 gap-lg mb-16" stagger={0.08}>
          {valuePropositions.map((reason) => (
            <RevealItem key={reason.title}>
              <div className="bg-white border border-border p-6 sm:p-7 h-full rounded-none">
                <span className="w-11 h-11 flex items-center justify-center bg-rose-50 border border-rose-100 text-primary rounded-none mb-5">
                  <reason.icon className="w-5 h-5" />
                </span>
                <h3 className="font-display font-extrabold text-sm text-foreground mb-2.5 uppercase leading-snug">
                  {reason.title}
                </h3>
                <p className="text-xs text-secondary leading-relaxed font-sans">
                  {reason.description}
                </p>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>

        {/* Extra Engineering Articles / Insights */}
        <div className="grid md:grid-cols-2 gap-lg border-t border-border pt-16">
          <Reveal>
            <div className="bg-white border border-border p-8 h-full flex flex-col justify-between">
              <div>
                <span className="font-mono text-[10px] text-primary font-bold uppercase tracking-wider">// EXPERT INSIGHTS</span>
                <h3 className="font-display font-extrabold text-base uppercase text-foreground mt-3 mb-4">
                  Enhancing Efficiency in Cement and Mining Industries
                </h3>
                <p className="text-xs text-secondary leading-relaxed font-sans">
                  Discover the latest trends and strategies for optimizing operations in cement, mining, and petrochemical industries. Learn from our experienced team at macprotec and stay ahead in the competitive market. Join us for valuable insights and innovative solutions to drive your business forward.
                </p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="bg-white border border-border p-8 h-full flex flex-col justify-between">
              <div>
                <span className="font-mono text-[10px] text-primary font-bold uppercase tracking-wider">// SYSTEM INTEGRATION</span>
                <h3 className="font-display font-extrabold text-base uppercase text-foreground mt-3 mb-4">
                  Exploring the Latest Innovations in Cement and Mining Industries
                </h3>
                <p className="text-xs text-secondary leading-relaxed font-sans">
                  Discover the cutting-edge solutions and technologies revolutionizing the cement, mining, and petrochemical sectors. Learn from our 65 years of industry expertise in engineering consulting and system integration. Dive into the world of critical minerals, chemicals, and heavy process industries with macprotec. Embrace the power of purple in innovation.
                </p>
              </div>
            </div>
          </Reveal>
        </div>

      </div>
    </section>
  );
}
