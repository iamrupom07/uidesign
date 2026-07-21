import Link from "next/link";
import { featuredArticles } from "@/lib/constants";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { SpotlightCard } from "@/components/ui/SpotlightCard";

export default function FeaturedResources() {
  return (
    <section className="py-xl bg-background blueprint-mesh border-t border-border">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <Reveal className="max-w-xl mb-14">
          <div className="font-mono text-[11px] font-bold text-primary tracking-widest uppercase mb-4">
            <span className="text-primary font-bold mr-1">┌</span> RESOURCES
          </div>
          <h2 className="mb-4 font-display font-extrabold text-3xl text-foreground uppercase">
            Expert insights and <span className="text-primary">analysis</span>
          </h2>
        </Reveal>

        <RevealGroup className="grid sm:grid-cols-2 gap-lg" stagger={0.08}>
          {featuredArticles.map((article) => (
            <RevealItem key={article.slug}>
              <SpotlightCard className="h-full p-lg flex flex-col justify-between cursor-pointer group">
                <Link href={`/resources/${article.slug}`} className="relative block">
                  <div className="inline-block bg-rose-50 text-primary border border-rose-100 rounded-none px-2.5 py-1 font-mono text-[10px] font-bold uppercase tracking-wider mb-4">
                    {article.category}
                  </div>
                  <p className="font-display font-extrabold text-base leading-snug mt-4 text-foreground group-hover:text-primary transition-colors uppercase">
                    {article.title}
                  </p>
                  <p className="text-xs text-secondary mt-3 leading-relaxed font-sans">
                    {article.excerpt}
                  </p>
                  <p className="font-mono text-[10px] text-secondary mt-6 tracking-wide uppercase">
                    {new Date(article.publishedAt).toLocaleDateString()} ·{" "}
                    {article.readingTimeMinutes} min read
                  </p>
                </Link>
              </SpotlightCard>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
