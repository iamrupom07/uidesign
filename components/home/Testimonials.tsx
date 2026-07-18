"use client";

import { Reveal } from "@/components/ui/Reveal";

export default function Testimonials() {
  const list = [
    {
      quote: "MacProtec's team optimized our cement kiln's alternative fuel combustion, resolving recurring thermal blocks and increasing throughput by 12%. Their process simulation results were highly accurate.",
      author: "Robert Miller",
      role: "Operations Manager, Cement Solutions",
    },
    {
      quote: "We partnered with MacProtec for 3D laser scanning and retrofit drawings. Their clash detection scanning prevented piping issues during construction. Absolute engineering precision.",
      author: "David Lee",
      role: "Project Director, Heavy Process Co.",
    },
  ];

  return (
    <section className="py-xl bg-background border-t border-border blueprint-mesh">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <Reveal className="text-center max-w-2xl mx-auto mb-14">
          <div className="font-mono text-[11px] font-bold text-primary tracking-widest uppercase mb-4 justify-center flex">
            <span className="text-primary font-bold mr-1">┌</span> TESTIMONIALS
          </div>
          <h2 className="mb-4 font-display font-extrabold text-3xl text-foreground uppercase">
            Trusted by Industries <span className="text-primary">Worldwide</span>
          </h2>
          <p className="body-md text-secondary mt-4">
            Hear what our industrial partners say about our consulting and integration support.
          </p>
        </Reveal>

        <div className="grid md:grid-cols-2 gap-lg lg:gap-xl">
          {list.map((item, index) => (
            <Reveal key={item.author} delay={index * 0.1}>
              <div className="bg-white border border-border p-8 rounded-none relative h-full flex flex-col justify-between overflow-hidden">
                <p className="text-base text-foreground font-sans italic leading-relaxed relative z-10">
                  &ldquo;{item.quote}&rdquo;
                </p>
                <div className="mt-8 flex items-center gap-3 relative z-10">
                  {/* Square placeholder avatar block */}
                  <div className="w-8 h-8 bg-rose-50 border border-rose-100 flex items-center justify-center font-mono text-xs font-bold text-primary rounded-none">
                    {item.author[0]}
                  </div>
                  <div>
                    <p className="font-sans font-bold text-xs text-foreground uppercase">{item.author}</p>
                    <p className="font-sans text-[10px] text-secondary uppercase tracking-wider">{item.role}</p>
                  </div>
                </div>

                {/* Big decorative quotation icon in bottom-right corner */}
                <span className="absolute bottom-[-16px] right-2 font-display text-[7.5rem] font-bold leading-none text-rose-100/50 pointer-events-none select-none">
                  &rdquo;
                </span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
