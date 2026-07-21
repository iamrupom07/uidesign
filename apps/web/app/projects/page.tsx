"use client";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import TechnicalCursor from "@/components/ui/TechnicalCursor";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import Link from "next/link";

export default function ProjectsIndex() {
  const caseStudies = [
    {
      slug: "kiln-combustion-upgrade",
      title: "Kiln Combustion Alternative Fuel Upgrade",
      category: "Cement Plants",
      highlight: "Thermal efficiency boosted by 14%",
    },
    {
      slug: "brownfield-conveyor-retrofit",
      title: "Brownfield Conveyor Clash Detection & Retrofit",
      category: "Bulk Material Handling",
      highlight: "Identified 20+ interferences before fabrication",
    },
    {
      slug: "boiler-flow-optimization",
      title: "Boiler Flow Modeling & CFD Audit",
      category: "Power Generation",
      highlight: "Completely resolved localized hot spots",
    },
  ];

  return (
    <>
      <TechnicalCursor />
      <Header />

      <main className="bg-background min-h-screen py-24">
        <section className="max-w-7xl mx-auto px-6 lg:px-8 mb-16 relative">
          <div className="absolute top-0 right-0 w-32 h-32 border-b border-l border-primary/20 opacity-20 pointer-events-none" />
          <Reveal>
            <div className="font-mono text-[11px] font-bold text-primary tracking-widest uppercase mb-4">
              <span className="text-primary font-bold mr-1">┌</span> PORTFOLIO DOSSIER
            </div>
            <h1 className="text-4xl sm:text-5xl font-display font-extrabold text-foreground uppercase tracking-tight leading-none mb-6">
              Projects & <span className="text-primary">Case Studies</span>
            </h1>
            <p className="body-md text-secondary max-w-2xl">
              Discover how MacProtec applies simulation modeling, site scanning, and detailed
              engineering to solve complex plant challenges.
            </p>
          </Reveal>
        </section>

        <section className="max-w-7xl mx-auto px-6 lg:px-8">
          <RevealGroup className="grid sm:grid-cols-2 lg:grid-cols-3 gap-lg" stagger={0.08}>
            {caseStudies.map((study, i) => (
              <RevealItem key={study.slug}>
                <div className="card relative h-full flex flex-col justify-between">
                  <div>
                    <div className="inline-block bg-rose-50 text-primary border border-rose-100 rounded-none px-2 py-0.5 font-mono text-[9px] font-bold uppercase tracking-wider mb-4">
                      {study.category}
                    </div>
                    <h3 className="font-display font-extrabold text-base text-foreground mb-3 uppercase leading-snug">
                      {study.title}
                    </h3>
                    <p className="text-xs font-mono font-bold text-emerald-600 uppercase tracking-wide">
                      {study.highlight}
                    </p>
                  </div>
                  <div className="mt-8 pt-4 border-t border-border flex items-center justify-between">
                    <Link
                      href={`/projects/${study.slug}`}
                      className="font-mono text-[10px] font-bold text-primary hover:text-rose-700 uppercase tracking-widest flex items-center gap-1.5"
                    >
                      Read Case Study
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
