"use client";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import TechnicalCursor from "@/components/ui/TechnicalCursor";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { featuredArticles } from "@/lib/constants";
import Link from "next/link";

export default function ResourcesIndex() {
  return (
    <>
      <TechnicalCursor />
      <Header />

      <main className="bg-background min-h-screen py-24">
        <section className="max-w-7xl mx-auto px-6 lg:px-8 mb-16 relative">
          <div className="absolute top-0 right-0 w-32 h-32 border-b border-l border-primary/20 opacity-20 pointer-events-none" />
          <Reveal>
            <div className="font-mono text-[11px] font-bold text-primary tracking-widest uppercase mb-4">
              <span className="text-primary font-bold mr-1">┌</span> KNOWLEDGE BANK
            </div>
            <h1 className="text-4xl sm:text-5xl font-display font-extrabold text-foreground uppercase tracking-tight leading-none mb-6">
              Resources & <span className="text-primary">Insights</span>
            </h1>
            <p className="body-md text-secondary max-w-2xl">
              Access technical white papers, CFD flow guidelines, and research papers from MacProtec's process engineers.
            </p>
          </Reveal>
        </section>

        <section className="max-w-7xl mx-auto px-6 lg:px-8">
          <RevealGroup className="grid sm:grid-cols-2 gap-lg" stagger={0.08}>
            {featuredArticles.map((article, i) => (
              <RevealItem key={article.slug}>
                <div className="card relative h-full flex flex-col justify-between">
                  <div>
                    <div className="inline-block bg-rose-50 text-primary border border-rose-100 rounded-none px-2.5 py-1 font-mono text-[10px] font-bold uppercase tracking-wider mb-4">
                      {article.category}
                    </div>
                    <h3 className="font-display font-extrabold text-lg text-foreground mb-3 uppercase leading-snug">
                      {article.title}
                    </h3>
                    <p className="text-xs text-secondary font-sans leading-relaxed mt-2">
                      {article.excerpt}
                    </p>
                  </div>
                  <div className="mt-8 pt-4 border-t border-border flex items-center justify-between">
                    <span className="font-mono text-[9px] text-slate-400 uppercase tracking-wider">
                      {new Date(article.publishedAt).toLocaleDateString()} · {article.readingTimeMinutes} min read
                    </span>
                    <Link
                      href={`/resources/${article.slug}`}
                      className="font-mono text-[10px] font-bold text-primary hover:text-rose-700 uppercase tracking-widest flex items-center gap-1.5"
                    >
                      Read Article
                      <span>→</span>
                    </Link>
                  </div>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </section>
      </main>

      <Footer />
    </>
  );
}
