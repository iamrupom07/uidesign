"use client";

import { Reveal } from "@/components/ui/Reveal";
import { Magnetic } from "@/components/ui/Magnetic";
import Link from "next/link";

export default function EngagementModels() {
  const models = [
    {
      title: "FEED & Basic Design Project",
      subtitle: "For plant design & retrofits",
      ctaText: "Request Proposal",
      isPrimary: true,
      features: [
        "Feasibility Studies & basic process designs",
        "CFD flow & thermal heat transfer simulations",
        "Structural & Thermal FEA stress analysis",
        "3D Laser Scanning & point cloud to CAD scans",
        "As-built piping fabrication drawings",
      ],
    },
    {
      title: "Long-term Support SLA",
      subtitle: "For operations & optimizations",
      ctaText: "Book Consultation",
      isPrimary: false,
      features: [
        "Continuous process monitoring & audits",
        "Regular Kiln / Burner optimization checks",
        "Throughput and energy debottlenecking reviews",
        "Digital Twin updates & virtual commissioning",
        "24/7 commissioning & technical support",
      ],
    },
  ];

  return (
    <section className="py-xl bg-background border-t border-border blueprint-mesh">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <Reveal className="text-center max-w-2xl mx-auto mb-14">
          <div className="font-mono text-[11px] font-bold text-primary tracking-widest uppercase mb-4 justify-center flex">
            <span className="text-primary font-bold mr-1">┌</span> ENGAGEMENT MODELS
          </div>
          <h2 className="mb-4 font-display font-extrabold text-3xl text-foreground uppercase">
            Bespoke Consulting <span className="text-primary">Models</span>
          </h2>
          <p className="body-md text-secondary mt-4">
            Flexible collaboration structures tailored to cement, mining, chemical, and process
            industries.
          </p>
        </Reveal>

        <div className="grid md:grid-cols-2 gap-lg lg:gap-xl max-w-4xl mx-auto">
          {models.map((model, idx) => (
            <Reveal key={model.title} delay={idx * 0.1}>
              <div className="card relative flex flex-col justify-between h-full">
                <div>
                  <h3 className="font-display font-extrabold text-xl text-foreground mb-1 uppercase">
                    {model.title}
                  </h3>
                  <p className="font-mono text-[9px] font-semibold text-secondary tracking-widest uppercase mb-6">
                    {model.subtitle}
                  </p>

                  <div className="mb-8">
                    <Magnetic strength={0.03}>
                      <Link
                        href="/lets-connect"
                        className={`w-full block text-center py-3.5 px-6 font-mono text-[11px] font-bold uppercase tracking-wider transition-all duration-100 ${
                          model.isPrimary
                            ? "bg-primary text-white hover:bg-rose-700"
                            : "bg-[#0F172A] text-white hover:bg-slate-800"
                        }`}
                      >
                        {model.ctaText}
                      </Link>
                    </Magnetic>
                  </div>

                  <p className="font-sans font-bold text-[10px] text-foreground tracking-wider uppercase mb-4">
                    What's Included:
                  </p>
                  <ul className="space-y-4 font-sans text-xs text-secondary">
                    {model.features.map((feature) => (
                      <li key={feature} className="flex gap-3 items-start">
                        {/* Red square checkmark from Page 4 */}
                        <div className="w-4 h-4 bg-primary text-white flex items-center justify-center shrink-0 rounded-none mt-0.5">
                          <svg
                            className="w-2.5 h-2.5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={4}
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
