import Link from "next/link";
import Image from "next/image";
import { featuredArticles } from "@/lib/constants";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { ChevronRight } from "lucide-react";

export default function FeaturedResources() {
  return (
    <section className="py-12 sm:py-xl bg-background blueprint-mesh border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal className="max-w-xl mb-12 sm:mb-14">
          <div className="font-mono text-xs font-bold text-primary tracking-widest uppercase mb-3">
            <span className="text-primary font-bold mr-1">┌</span> RESOURCES
          </div>
          <h2 className="mb-4 font-display font-extrabold text-2xl sm:text-4xl text-foreground uppercase tracking-tight">
            Expert insights and <span className="text-primary">analysis</span>
          </h2>
        </Reveal>

        <RevealGroup className="grid sm:grid-cols-2 gap-6 lg:gap-lg" stagger={0.08}>
          {featuredArticles.map((article) => (
            <RevealItem key={article.slug}>
              <div className="bg-white border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between h-full group hover:border-primary/60 relative overflow-hidden">
                <div>
                  {/* Card Image specified in PDF */}
                  <div className="relative h-56 w-full overflow-hidden bg-slate-950">
                    <Image
                      src={article.heroImage || "/images/expert_insights.jpg"}
                      alt={article.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />

                    {/* Category Tag */}
                    <div className="absolute top-4 left-4 bg-primary text-white font-mono text-[10px] font-extrabold uppercase px-3 py-1 shadow-md border border-white/20">
                      // {article.category}
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-5 sm:p-6 space-y-3">
                    <h3 className="font-display font-extrabold text-lg text-slate-900 uppercase tracking-tight group-hover:text-primary transition-colors leading-snug">
                      {article.title}
                    </h3>

                    <p className="text-sm text-slate-600 font-sans leading-relaxed font-medium">
                      {article.excerpt}
                    </p>

                    <p className="font-mono text-xs text-slate-400 tracking-wider uppercase pt-2 border-t border-slate-100">
                      1/1/2025 · {article.readingTimeMinutes || 1} MIN READ
                    </p>
                  </div>
                </div>

                {/* Card Action Link */}
                <div className="p-5 sm:p-6 pt-0">
                  <Link
                    href={`/resources/${article.slug}`}
                    className="w-full py-3 bg-slate-50 hover:bg-primary text-slate-900 hover:text-white border border-slate-200 hover:border-primary font-mono text-xs font-bold uppercase tracking-wider transition-all duration-200 flex items-center justify-center gap-2 group/link"
                  >
                    <span>Read Analysis</span>
                    <ChevronRight className="w-4 h-4 text-primary group-hover/link:text-white group-hover/link:translate-x-1 transition-all" />
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

