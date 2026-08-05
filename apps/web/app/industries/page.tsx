"use client";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import TechnicalCursor from "@/components/ui/TechnicalCursor";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { expertiseAreas } from "@/lib/constants";
import Link from "next/link";
import Image from "next/image";
import { ChevronRight, ArrowRight, Sparkles, Layers, ShieldCheck, Activity } from "lucide-react";

export default function IndustriesIndex() {
  return (
    <>
      <TechnicalCursor />
      <Header />

      <main className="bg-slate-50 min-h-screen text-slate-800 font-sans selection:bg-rose-500 selection:text-white">
        {/* BREADCRUMB / TOP DOSSIER BAR */}
        <section className="bg-[#2d1b47] border-b border-[#3e2663] text-white py-3 px-6 lg:px-8 font-mono text-xs">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-2 text-slate-400">
              <Link href="/" className="hover:text-white transition-colors">
                Home
              </Link>
              <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
              <span className="text-primary font-bold">Our Expertise</span>
            </div>
            <div className="hidden sm:flex items-center gap-4 text-[10px] text-slate-400">
              <span className="uppercase font-bold tracking-wider">OUR EXPERTISE MAIN PAGE</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-emerald-400 font-bold uppercase">6 Key Sectors Operational</span>
            </div>
          </div>
        </section>

        {/* SECTION 1: FULL-WIDTH HERO SECTION (Matching Solutions Page Hero Style) */}
        <section className="w-full relative bg-black border-b-2 border-primary/30 py-16 sm:py-20 lg:py-24 overflow-hidden group">
          {/* Full-width Background Image */}
          <div className="absolute inset-0 w-full h-full pointer-events-none">
            <Image
              src="/images/hero_plant.png"
              alt="MacProtec Industrial Plant Expertise"
              fill
              priority
              className="object-cover object-center opacity-100 group-hover:scale-105 transition-transform duration-1000 ease-out"
            />
            {/* Transparent Black Gradient Overlay for High Background Picture Visibility */}
            <div className="absolute inset-0 bg-black/50 bg-gradient-to-b from-black/70 via-black/40 to-black/80" />
            <div className="absolute inset-0 bg-[radial-gradient(#e11d48_1px,transparent_1px)] [background-size:24px_24px] opacity-15 pointer-events-none" />
          </div>

          {/* Centered Overlay Content */}
          <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
            <Reveal>
              <div className="max-w-4xl mx-auto flex flex-col items-center text-center space-y-6">
                {/* Category Badge Ticker */}
                <div className="inline-flex items-center gap-2 bg-[#2d1b47]/90 border border-primary/40 px-4 py-1.5 font-mono text-[11px] font-extrabold text-primary tracking-widest uppercase shadow-md backdrop-blur-xs">
                  <Sparkles className="w-3.5 h-3.5 text-primary animate-pulse" />
                  <span>OUR EXPERTISE // HEAVY PROCESS INDUSTRIES</span>
                </div>

                {/* Main Hero Title */}
                <div className="flex justify-center w-full">
                  <h1 className="text-4xl sm:text-6xl lg:text-7xl font-display font-black uppercase tracking-tight text-white drop-shadow-2xl">
                    Our <span className="text-primary">Expertise</span>
                  </h1>
                </div>

                {/* Subtitle Description with High Contrast */}
                <p className="text-slate-200 font-sans text-base sm:text-lg leading-relaxed max-w-2xl mx-auto drop-shadow-md">
                  MacProtec delivers advanced process optimization consulting, engineering simulation, and digital transformation for cement, mining, petrochemical, aggregates, and energy plants worldwide.
                </p>

                {/* Hero Action Buttons */}
                <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
                  <a
                    href="#key-sectors"
                    className="px-8 py-4 bg-primary hover:bg-rose-700 text-white font-mono text-xs font-bold uppercase tracking-wider transition-all duration-150 shadow-xl flex items-center gap-2 group"
                  >
                    <span>Explore Key Sectors</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </a>

                  <Link
                    href="/lets-connect"
                    className="px-8 py-4 bg-[#201235] border border-white/20 hover:border-white text-white font-mono text-xs font-bold uppercase tracking-wider transition-all duration-150 flex items-center gap-2 hover:bg-[#2d1b47]"
                  >
                    <span>Consult Our Engineers</span>
                    <ArrowRight className="w-4 h-4 text-slate-400" />
                  </Link>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* SECTION 2: 6 NUMBERED EXPERTISE SECTIONS */}
        <section id="key-sectors" className="py-20 bg-slate-50 border-b border-slate-200 scroll-mt-10">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 space-y-12">
            {/* Header */}
            <div className="text-center max-w-3xl mx-auto space-y-4">
              <Reveal>
                <div className="inline-block font-mono text-xs font-bold text-primary tracking-widest uppercase bg-rose-50 border border-rose-200 px-3 py-1">
                  SECTOR REPORTS // INDEX 01 - 06
                </div>
              </Reveal>

              <Reveal>
                <h2 className="font-display font-black text-3xl sm:text-4xl lg:text-5xl text-slate-900 uppercase tracking-tight">
                  Six Key Expertise Sectors
                </h2>
              </Reveal>

              <Reveal>
                <p className="text-slate-700 font-sans text-base leading-relaxed">
                  Select a sector below to explore specialized engineering capabilities, optimization audits, and process solutions.
                </p>
              </Reveal>
            </div>

            {/* 6 Expertise Cards Grid */}
            <RevealGroup className="grid md:grid-cols-2 lg:grid-cols-3 gap-8" stagger={0.08}>
              {expertiseAreas.map((item, i) => (
                <RevealItem key={item.slug}>
                  <div className="bg-white border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between h-full group hover:border-primary/50 relative">
                    <div>
                      {/* Card Image Header with Number Badge */}
                      <div className="relative h-52 overflow-hidden bg-slate-950">
                        <Image
                          src={item.heroImage || `/images/${item.slug.replace(/-/g, "_")}.png`}
                          alt={`MacProtec Expertise - ${item.title}`}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          className="object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
                        
                        {/* Number Badge 01..06 */}
                        <div className="absolute top-4 left-4 w-9 h-9 rounded bg-primary text-white font-mono font-black text-sm flex items-center justify-center shadow-lg border border-white/20 z-10">
                          0{i + 1}
                        </div>
                      </div>

                      {/* Card Body with High Contrast Text */}
                      <div className="p-6 space-y-4">
                        <h3 className="font-display font-extrabold text-xl text-slate-900 uppercase tracking-tight group-hover:text-primary transition-colors leading-snug">
                          {i + 1}. {item.title}
                        </h3>

                        <p className="text-xs sm:text-sm text-slate-700 font-sans leading-relaxed font-medium">
                          {item.summary}
                        </p>
                      </div>
                    </div>

                    {/* Card Footer Button Link */}
                    <div className="p-6 pt-0">
                      <Link
                        href={`/industries/${item.slug}`}
                        className="w-full py-3 bg-slate-100 hover:bg-primary text-slate-900 hover:text-white border border-slate-200 hover:border-primary font-mono text-xs font-bold uppercase tracking-wider transition-all duration-200 flex items-center justify-center gap-2 group/btn"
                      >
                        <span>Explore Sector</span>
                        <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                      </Link>
                    </div>
                  </div>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        </section>

        {/* SECTION 3: CALL TO ACTION BANNER */}
        <section className="py-16 lg:py-24 bg-[#201235] text-white relative overflow-hidden">
          {/* Background Glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none" />

          <div className="max-w-5xl mx-auto px-6 lg:px-8 relative z-10">
            <div className="bg-[#2d1b47] border border-[#3e2663] p-8 sm:p-12 shadow-2xl relative overflow-hidden">
              <div className="absolute -top-12 -right-12 w-48 h-48 border border-rose-500/20 rounded-full pointer-events-none" />

              <div className="text-center space-y-6 max-w-3xl mx-auto">
                <Reveal>
                  <div className="inline-flex items-center gap-2 bg-rose-500/20 border border-rose-500/40 px-3.5 py-1 text-white font-mono text-xs font-bold uppercase tracking-wider rounded-full">
                    <Layers className="w-3.5 h-3.5 text-primary" />
                    <span>TAILORED PROCESS CONSULTING</span>
                  </div>
                </Reveal>

                <Reveal>
                  <h2 className="font-display font-black text-3xl sm:text-5xl text-white uppercase tracking-tight">
                    Need Specialized Assistance For Your Plant?
                  </h2>
                </Reveal>

                <Reveal>
                  <p className="text-slate-200 font-sans text-base sm:text-lg leading-relaxed">
                    Our process engineers evaluate equipment design, thermal balances, operational bottlenecks, and Industry 4.0 integration across all six industrial sectors.
                  </p>
                </Reveal>

                <Reveal>
                  <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
                    <Link
                      href="/lets-connect"
                      className="px-8 py-4 bg-primary hover:bg-rose-700 text-white font-mono text-xs font-bold uppercase tracking-wider transition-all duration-150 shadow-xl flex items-center gap-2 group"
                    >
                      <span>Get in Touch with Our Engineers</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </Reveal>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}


