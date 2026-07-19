"use client";

import { Reveal } from "@/components/ui/Reveal";

export default function ValuesBand() {
  return (
    <section className="bg-background py-xl relative overflow-hidden blueprint-mesh border-t border-border">
      <div className="grain" />
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <Reveal>
          <div className="grid lg:grid-cols-[1fr_2fr] gap-lg items-center bg-white border border-border p-8 sm:p-12 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 border-b border-l border-primary/20 opacity-20 select-none pointer-events-none">
              <div className="absolute top-4 right-4 font-mono text-[9px] text-primary/45 uppercase">REF-04 / VAL</div>
            </div>

            {/* Left column: Eyebrow styled as bold vertical accent */}
            <div className="border-l-4 border-primary pl-6">
              <div className="font-mono text-[10px] font-bold text-primary tracking-widest uppercase mb-1">
                SEC-04 // VALUES
              </div>
              <h3 className="font-display font-extrabold text-2xl text-foreground uppercase tracking-tight leading-none">
                Values We Live By
              </h3>
            </div>

            {/* Right column: Large blockquote statement */}
            <div>
              <p className="text-foreground text-base sm:text-lg font-semibold leading-relaxed font-sans text-secondary">
                MACPROTEC is known for exceptional engineering consulting services for the heavy industries. Our expertise in the field is unmatched, and our team of experts is dedicated to providing the best in class engineering service.
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
