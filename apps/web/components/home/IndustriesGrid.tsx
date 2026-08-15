import Link from "next/link";
import Image from "next/image";
import { expertiseAreas } from "@/lib/constants";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { ArrowRight } from "lucide-react";

export default function IndustriesGrid() {
  return (
    <section className="py-xl bg-background blueprint-mesh border-t border-border">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <Reveal className="max-w-2xl mb-14">
          <div className="font-mono text-[11px] font-bold text-primary tracking-widest uppercase mb-4">
            <span className="text-primary font-bold mr-1">┌</span> INDUSTRIES
          </div>
          <h2 className="mb-4 font-display font-extrabold text-3xl sm:text-4xl text-foreground uppercase tracking-tight">
            Deep experience across <span className="text-primary">heavy-process</span> sectors
          </h2>
          <p className="text-secondary text-sm font-sans leading-relaxed">
            Select any industry below to explore engineering capabilities, optimization audits, and process solutions.
          </p>
        </Reveal>

        <RevealGroup className="grid sm:grid-cols-2 lg:grid-cols-3 gap-lg" stagger={0.06}>
          {expertiseAreas.map((area, i) => (
            <RevealItem key={area.slug}>
              <div className="bg-white border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between h-full group hover:border-primary/60 relative overflow-hidden">
                <div>
                  {/* Industry Image Header matching Our Expertise Main Page */}
                  <div className="relative h-48 overflow-hidden bg-slate-950">
                    <Image
                      src={area.heroImage || `/images/${area.slug.replace(/-/g, "_")}.png`}
                      alt={`MacProtec Industry - ${area.title}`}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent" />
                    
                    {/* Number Badge 01..06 */}
                    <div className="absolute top-3 left-3 w-8 h-8 rounded bg-primary text-white font-mono font-black text-xs flex items-center justify-center shadow-lg border border-white/20 z-10">
                      0{i + 1}
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-6 space-y-3">
                    <h3 className="font-display font-extrabold text-lg text-slate-900 uppercase tracking-tight group-hover:text-primary transition-colors leading-snug">
                      {area.title}
                    </h3>

                    <p className="text-xs text-slate-600 font-sans leading-relaxed line-clamp-3 font-medium">
                      {area.summary}
                    </p>
                  </div>
                </div>

                {/* Card Action Link */}
                <div className="p-6 pt-0">
                  <Link
                    href={`/industries/${area.slug}`}
                    className="w-full py-3 bg-slate-50 hover:bg-primary text-slate-900 hover:text-white border border-slate-200 hover:border-primary font-mono text-xs font-bold uppercase tracking-wider transition-all duration-200 flex items-center justify-center gap-2 group/btn"
                  >
                    <span>Explore Industry</span>
                    <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}

