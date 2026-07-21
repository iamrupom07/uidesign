"use client";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import TechnicalCursor from "@/components/ui/TechnicalCursor";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { services } from "@/lib/constants";
import Link from "next/link";

export default function SolutionsIndex() {
  return (
    <>
      <TechnicalCursor />
      <Header />

      <main className="bg-background min-h-screen py-24">
        <section className="max-w-7xl mx-auto px-6 lg:px-8 mb-16 relative">
          <div className="absolute top-0 right-0 w-32 h-32 border-b border-l border-primary/20 opacity-20 pointer-events-none" />
          <Reveal>
            <div className="font-mono text-[11px] font-bold text-primary tracking-widest uppercase mb-4">
              <span className="text-primary font-bold mr-1">┌</span> CAPABILITIES DOSSIER
            </div>
            <h1 className="text-4xl sm:text-5xl font-display font-extrabold text-foreground uppercase tracking-tight leading-none mb-6">
              Our Process <span className="text-primary">Solutions</span>
            </h1>
            <p className="body-md text-secondary max-w-2xl">
              MacProtec provides high-precision process engineering and digital modeling
              capabilities custom-tailored for heavy industrial plants.
            </p>
          </Reveal>
        </section>

        <section className="max-w-7xl mx-auto px-6 lg:px-8">
          <RevealGroup className="grid sm:grid-cols-2 lg:grid-cols-3 gap-lg" stagger={0.08}>
            {services.map((item, i) => (
              <RevealItem key={item.slug}>
                <div className="card relative h-full flex flex-col justify-between">
                  <div>
                    <div className="font-mono text-[10px] font-bold text-primary tracking-wider uppercase mb-4">
                      SOL&#8209;{String(i + 1).padStart(2, "0")}
                    </div>
                    <h3 className="font-display font-extrabold text-lg text-foreground mb-3 uppercase leading-snug">
                      {item.title}
                    </h3>
                    <p className="text-xs text-secondary font-sans leading-relaxed">
                      {item.summary ||
                        "Full-spectrum engineering consulting, layout drawing, simulation, and on-site commissioning validation."}
                    </p>
                  </div>
                  <div className="mt-8 pt-4 border-t border-border flex items-center justify-between">
                    <Link
                      href={`/solutions/${item.slug}`}
                      className="font-mono text-[10px] font-bold text-primary hover:text-rose-700 uppercase tracking-widest flex items-center gap-1.5"
                    >
                      Explore Page
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
