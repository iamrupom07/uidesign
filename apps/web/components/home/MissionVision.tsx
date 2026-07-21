"use client";

import { Reveal } from "@/components/ui/Reveal";

export default function MissionVision() {
  return (
    <section className="py-xl bg-background border-t border-border blueprint-mesh">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 grid md:grid-cols-2 gap-lg lg:gap-xl">
        <Reveal>
          <div className="card relative">
            <div className="font-mono text-[11px] font-bold text-primary tracking-widest uppercase mb-4">
              <span className="text-primary font-bold mr-1">┌</span> OUR MISSION
            </div>
            <h3 className="font-display font-extrabold text-2xl mb-4 text-foreground uppercase">
              BE LEADING
            </h3>
            <p className="body-md text-secondary leading-relaxed">
              Our mission is to deliver exceptional engineering design, process optimization, and
              hands-on commissioning support that increases plant efficiency, enhances safety, and
              integrates green energy alternatives across heavy industries.
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="card relative">
            <div className="font-mono text-[11px] font-bold text-primary tracking-widest uppercase mb-4">
              <span className="text-primary font-bold mr-1">┌</span> OUR VISION
            </div>
            <h3 className="font-display font-extrabold text-2xl mb-4 text-foreground uppercase">
              INTEGRATION
            </h3>
            <p className="body-md text-secondary leading-relaxed">
              Our vision is to be the premier engineering consulting partner globally, pioneering
              digital twin technology, 3D laser scanning systems, and advanced CFD simulations to
              drive the future of process industrial automation.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
