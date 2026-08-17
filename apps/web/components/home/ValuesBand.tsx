"use client";

import { Reveal } from "@/components/ui/Reveal";

export default function ValuesBand() {
  return (
    <section className="bg-background py-12 sm:py-xl relative overflow-hidden blueprint-mesh border-t border-border">
      <div className="grain" />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        <Reveal>
          <div className="grid lg:grid-cols-[1fr_2fr] gap-6 lg:gap-lg items-center bg-white border border-border p-5 sm:p-8 lg:p-12 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 border-b border-l border-primary/20 opacity-20 select-none pointer-events-none">
              <div className="absolute top-4 right-4 font-mono text-xs font-bold text-primary/60 uppercase">
                04
              </div>
            </div>

            {/* Left column: Eyebrow styled as bold vertical accent */}
            <div className="border-l-4 border-primary pl-4 sm:pl-6">
              <div className="font-mono text-xs font-bold text-primary tracking-widest uppercase mb-1">
                OUR VALUES
              </div>
              <h3 className="font-display font-extrabold text-xl sm:text-2xl text-foreground uppercase tracking-tight leading-none">
                Values We Live By
              </h3>
            </div>

            {/* Right column: Large blockquote statement */}
            <div>
              <p className="text-foreground text-sm sm:text-lg font-semibold leading-relaxed font-sans text-secondary">
                MACPROTEC is known for exceptional engineering consulting services for the heavy
                industries. Our expertise in the field is unmatched, and our team of experts is
                dedicated to providing the best in class engineering service.
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
