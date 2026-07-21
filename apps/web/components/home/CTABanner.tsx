import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";
import { Magnetic } from "@/components/ui/Magnetic";

export default function CTABanner() {
  return (
    <section className="py-lg bg-background border-t border-border blueprint-mesh">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <Reveal>
          <div className="bg-white border border-border p-8 sm:p-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div>
              <div className="font-mono text-[11px] font-bold text-primary tracking-widest uppercase mb-3">
                <span className="text-primary font-bold mr-1">┌</span> GET STARTED
              </div>
              <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-foreground uppercase leading-tight">
                Ready to start your <span className="text-primary">next plant project?</span>
              </h2>
              <p className="body-md text-secondary mt-3 max-w-lg">
                Partner with MACPROTEC to reduce risk, increase throughput, and keep your operations
                running at peak efficiency.
              </p>
            </div>
            <Magnetic strength={0.05}>
              <Link href="/lets-connect" className="button-primary inline-block whitespace-nowrap">
                Request a Proposal
              </Link>
            </Magnetic>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
