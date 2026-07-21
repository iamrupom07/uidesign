"use client";

import { Reveal } from "@/components/ui/Reveal";

export default function ProcessFlow() {
  const steps = [
    {
      step: "STEP 01",
      title: "Assess & Analyze",
      description:
        "Perform detailed plant process audits, energy assessments, and 3D laser scanning scans to identify operational bottlenecks.",
    },
    {
      step: "STEP 02",
      title: "Simulate & Design",
      description:
        "Develop FEED engineering and basic designs, validating flow and thermal states using advanced CFD and FEA simulation solvers.",
    },
    {
      step: "STEP 03",
      title: "Commission & Integrate",
      description:
        "Integrate control systems, handle instrumentation commissioning, and optimize equipment performance on-site.",
    },
    {
      step: "STEP 04",
      title: "Predict & Monitor",
      description:
        "Deploy digital twin dashboards and AI-based predictive maintenance monitoring to track plant KPIs in real time.",
    },
  ];

  return (
    <section className="py-xl bg-background border-t border-border blueprint-mesh">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 grid lg:grid-cols-2 gap-lg lg:gap-xl items-center">
        {/* Left Column: Heading and Blueprint drawing */}
        <div>
          <Reveal>
            <div className="font-mono text-[11px] font-bold text-primary tracking-widest uppercase mb-4">
              <span className="text-primary font-bold mr-1">┌</span> OUR PROCESS
            </div>
            <h2 className="mb-4 font-display font-extrabold text-3xl text-foreground uppercase leading-tight">
              How MACPROTEC <span className="text-primary">Works</span>
            </h2>
            <p className="body-md text-secondary max-w-md mb-8">
              A structured, transparent engineering process that keeps heavy-process plants secure,
              stable, and running at maximum thermal and material efficiency.
            </p>
          </Reveal>

          {/* Plant Reactor image bounded by red crop-marks */}
          <Reveal delay={0.1}>
            <div className="relative p-4 max-w-sm mx-auto lg:mx-0 w-full aspect-square">
              <div className="absolute top-0 left-0 w-5 h-5 border-t-2 border-l-2 border-primary" />
              <div className="absolute top-0 right-0 w-5 h-5 border-t-2 border-r-2 border-primary" />
              <div className="absolute bottom-0 left-0 w-5 h-5 border-b-2 border-l-2 border-primary" />
              <div className="absolute bottom-0 right-0 w-5 h-5 border-b-2 border-r-2 border-primary" />

              <div className="relative rounded-none overflow-hidden h-full w-full bg-white border border-border">
                <img
                  src="/images/plant_reactor.png"
                  alt="MACPROTEC Reactor blueprint"
                  className="w-full h-full object-contain p-4"
                />
              </div>
            </div>
          </Reveal>
        </div>

        {/* Right Column: Step Cards */}
        <div className="space-y-4">
          {steps.map((item, index) => (
            <Reveal key={item.step} delay={index * 0.08}>
              <div className="card relative !p-6">
                <div className="font-mono text-[10px] font-bold text-primary tracking-wider uppercase mb-1">
                  {item.step}
                </div>
                <h3 className="font-display font-extrabold text-lg text-foreground mb-2 uppercase">
                  {item.title}
                </h3>
                <p className="text-xs text-secondary leading-relaxed font-sans">
                  {item.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
