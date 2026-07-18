import { Reveal } from "@/components/ui/Reveal";

export default function ValuesBand() {
  return (
    <section className="bg-background py-xl relative overflow-hidden blueprint-mesh border-t border-border">
      <div className="grain" />
      <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
        <Reveal>
          <div className="relative inline-block bg-white rounded-none px-8 py-10 sm:px-14 sm:py-12 border border-border">
            <div className="font-sans text-[11px] font-bold text-primary tracking-widest uppercase mb-4">
              <span className="text-primary font-bold mr-1">┌</span> STANDARD OF PRACTICE
            </div>
            <p className="text-foreground text-lg sm:text-xl md:text-2xl font-normal leading-relaxed font-sans max-w-2xl mx-auto uppercase">
              <span className="font-extrabold text-foreground">MACPROTEC</span> is known for exceptional
              engineering consulting services for the heavy industries. Our expertise in the field
              is unmatched, and our team is dedicated to <span className="text-primary font-bold underline decoration-primary decoration-2 underline-offset-4">best-in-class engineering.</span>
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
