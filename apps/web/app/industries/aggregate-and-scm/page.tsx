"use client";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import TechnicalCursor from "@/components/ui/TechnicalCursor";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  CheckCircle2,
  Cpu,
  Factory,
  BarChart3,
  Layers,
  ShieldCheck,
  Wrench,
  TrendingUp,
  Sparkles,
  ChevronRight,
  Leaf,
  Recycle,
  Layers3,
  Box,
  Scale,
  Building2,
  CloudRain,
  Feather,
} from "lucide-react";

export default function AggregateAndScmPage() {
  return (
    <>
      <TechnicalCursor />
      <Header />

      <main className="bg-slate-50 min-h-screen text-slate-800 font-sans selection:bg-rose-500 selection:text-white">
        {/* BREADCRUMB / DOSSIER TOP BAR */}
        <section className="bg-slate-900 border-b border-slate-800 text-white py-3 px-6 lg:px-8 font-mono text-xs">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-2 text-slate-400">
              <Link href="/" className="hover:text-white transition-colors">
                Home
              </Link>
              <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
              <Link href="/industries" className="hover:text-white transition-colors">
                Our Expertise
              </Link>
              <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
              <span className="text-primary font-bold">Aggregate and SCM</span>
            </div>
            <div className="hidden sm:flex items-center gap-3 text-[10px] text-slate-400">
              <span className="font-bold text-rose-400">SECTOR 03</span>
              <span>•</span>
              <span>AGGREGATE & SUPPLEMENTAL CEMENTITIOUS MATERIALS</span>
            </div>
          </div>
        </section>

        {/* 1. HERO BANNER */}
        <section className="relative py-16 lg:py-24 bg-white border-b border-slate-200 overflow-hidden">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="grid lg:grid-cols-12 gap-10 items-center">
              <div className="lg:col-span-6 space-y-5">
                <Reveal>
                  <div className="inline-flex items-center gap-2 bg-rose-50 text-primary border border-rose-200/80 px-3.5 py-1.5 font-mono text-xs font-bold uppercase tracking-wider rounded-full shadow-xs">
                    <Sparkles className="w-3.5 h-3.5 text-primary" />
                    <span>OUR EXPERTISE // AGGREGATE & SCM</span>
                  </div>
                </Reveal>

                <Reveal>
                  <h1 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl text-slate-900 uppercase tracking-tight leading-[1.15]">
                    Aggregate & Supplemental <span className="text-primary">Cementitious Materials (SCM)</span>
                  </h1>
                </Reveal>

                <Reveal>
                  <p className="text-sm text-slate-600 font-sans leading-relaxed max-w-2xl">
                    Concrete, the most widely used construction material globally, owes its versatility and strength to the careful combination of aggregates and cementitious materials. While aggregates provide bulk and stability, cementitious materials bind the mixture together, imparting cohesion and durability to concrete structures. MACPROTEC's deep domain expertise in Supplemental Cementitious Material and Aggregate Industries puts us in a unique position to help the industry achieve sustainable, high-performance production.
                  </p>
                </Reveal>

                {/* Hero Badges */}
                <Reveal>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 pt-1">
                    <div className="bg-slate-50 border border-slate-200 p-2.5 rounded font-mono text-[11px] text-slate-800 font-bold flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-primary shrink-0" />
                      <span>Resource Efficiency</span>
                    </div>
                    <div className="bg-slate-50 border border-slate-200 p-2.5 rounded font-mono text-[11px] text-slate-800 font-bold flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-primary shrink-0" />
                      <span>SCM Front-End Loading</span>
                    </div>
                    <div className="bg-slate-50 border border-slate-200 p-2.5 rounded font-mono text-[11px] text-slate-800 font-bold flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-primary shrink-0" />
                      <span>Waste Diversion</span>
                    </div>
                    <div className="bg-slate-50 border border-slate-200 p-2.5 rounded font-mono text-[11px] text-slate-800 font-bold flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-primary shrink-0" />
                      <span>Fly Ash & Slag Cement</span>
                    </div>
                    <div className="bg-slate-50 border border-slate-200 p-2.5 rounded font-mono text-[11px] text-slate-800 font-bold flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-primary shrink-0" />
                      <span>Recycled Aggregates</span>
                    </div>
                  </div>
                </Reveal>

                {/* Hero Action Buttons */}
                <Reveal>
                  <div className="flex flex-wrap items-center gap-4 pt-3">
                    <a
                      href="#sustainability-role"
                      className="px-6 py-3.5 bg-primary hover:bg-rose-700 text-white font-mono text-xs font-bold uppercase tracking-wider transition-all duration-150 shadow-md flex items-center gap-2 group"
                    >
                      <span>Explore Sustainability Role</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </a>

                    <Link
                      href="/lets-connect"
                      className="px-6 py-3.5 bg-white border border-slate-300 hover:border-slate-900 text-slate-800 font-mono text-xs font-bold uppercase tracking-wider transition-all duration-150 flex items-center gap-2 hover:bg-slate-50"
                    >
                      <span>Consult SCM Specialists</span>
                      <ArrowRight className="w-4 h-4 text-slate-400" />
                    </Link>
                  </div>
                </Reveal>
              </div>

              {/* Right Hero Image */}
              <div className="lg:col-span-6 relative">
                <Reveal>
                  <div className="relative border-4 border-white shadow-2xl overflow-hidden group bg-slate-900">
                    <Image
                      src="/images/aggregate_scm.png"
                      alt="MACPROTEC Aggregate Quarry & SCM Processing Facility"
                      width={900}
                      height={650}
                      className="w-full h-[450px] sm:h-[520px] lg:h-[560px] object-cover group-hover:scale-105 transition-transform duration-500"
                      priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/20 to-transparent z-10" />

                    <div className="absolute bottom-5 left-5 right-5 z-20 bg-slate-950/90 border border-slate-800 p-4 backdrop-blur-md font-mono text-white flex items-center justify-between">
                      <div>
                        <div className="text-[10px] text-rose-400 font-bold uppercase tracking-wider">
                          CORE SECTOR HIGHLIGHT
                        </div>
                        <div className="text-sm font-extrabold font-display uppercase tracking-tight text-white mt-0.5">
                          AGGREGATE & SCM PROCESSING
                        </div>
                      </div>
                      <div className="w-10 h-10 rounded bg-primary/20 border border-primary/40 flex items-center justify-center text-primary shrink-0">
                        <Layers3 className="w-5 h-5" />
                      </div>
                    </div>
                  </div>
                </Reveal>
              </div>
            </div>
          </div>
        </section>

        {/* 2. CORE MATERIALS BREAKDOWN */}
        <section className="py-20 bg-slate-50 border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 space-y-12">
            <div className="max-w-3xl space-y-4">
              <Reveal>
                <div className="inline-block font-mono text-xs font-bold text-primary uppercase tracking-widest bg-rose-50 border border-rose-200 px-3 py-1">
                  MATERIAL FOUNDATIONS
                </div>
              </Reveal>
              <Reveal>
                <h2 className="font-display font-black text-3xl sm:text-4xl text-slate-900 uppercase tracking-tight">
                  Foundational Components of Modern Concrete
                </h2>
              </Reveal>
              <Reveal>
                <p className="text-slate-600 font-sans text-base leading-relaxed">
                  In recent years, there has been a growing emphasis on incorporating sustainable practices into concrete production, focusing on the synergy between quality aggregates and supplementary cementitious materials.
                </p>
              </Reveal>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <Reveal>
                <div className="bg-white border border-slate-200 p-8 space-y-4 hover:border-primary/60 transition-all duration-200 group h-full flex flex-col justify-between">
                  <div className="space-y-4">
                    <div className="w-12 h-12 rounded bg-rose-50 border border-rose-200 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                      <Box className="w-6 h-6" />
                    </div>
                    <h3 className="font-display font-extrabold text-2xl text-slate-900 uppercase tracking-tight">
                      Aggregates
                    </h3>
                    <p className="text-slate-600 font-sans text-sm leading-relaxed">
                      Aggregates are granular materials such as sand, gravel, crushed stone, and recycled concrete that form the bulk of concrete. They provide mechanical strength, stability, and dimensional stability to the concrete mixture. Different types of aggregates, including natural and recycled sources, are selected based on factors such as particle size, shape, density, and strength characteristics.
                    </p>
                  </div>
                  <div className="pt-4 border-t border-slate-100 font-mono text-[11px] font-bold text-primary">
                    BULK & MECHANICAL STABILITY
                  </div>
                </div>
              </Reveal>

              <Reveal>
                <div className="bg-white border border-slate-200 p-8 space-y-4 hover:border-primary/60 transition-all duration-200 group h-full flex flex-col justify-between">
                  <div className="space-y-4">
                    <div className="w-12 h-12 rounded bg-rose-50 border border-rose-200 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                      <Layers className="w-6 h-6" />
                    </div>
                    <h3 className="font-display font-extrabold text-2xl text-slate-900 uppercase tracking-tight">
                      Cementitious Materials & SCMs
                    </h3>
                    <p className="text-slate-600 font-sans text-sm leading-relaxed">
                      Cementitious materials, primarily Portland cement, serve as the binding agent in concrete, adhering the aggregate particles together through hydration. In addition to Portland cement, SCMs such as fly ash, slag cement, silica fume, and metakaolin are increasingly used to partially replace cement content in concrete mixtures. SCMs offer several benefits, including improved durability, reduced carbon emissions, and enhanced workability.
                    </p>
                  </div>
                  <div className="pt-4 border-t border-slate-100 font-mono text-[11px] font-bold text-primary">
                    HYDRATION, BINDING & DURABILITY
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* 3. MACPROTEC'S ROLE IN SUSTAINABILITY */}
        <section id="sustainability-role" className="py-20 bg-white border-b border-slate-200 scroll-mt-10">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 space-y-12">
            <div className="max-w-3xl space-y-4">
              <Reveal>
                <div className="inline-block font-mono text-xs font-bold text-primary uppercase tracking-widest bg-rose-50 border border-rose-200 px-3 py-1">
                  MACPROTEC SUSTAINABILITY IMPACT
                </div>
              </Reveal>
              <Reveal>
                <h2 className="font-display font-black text-3xl sm:text-4xl text-slate-900 uppercase tracking-tight">
                  MACPROTEC's Role in Aggregate & SCM Sustainability
                </h2>
              </Reveal>
              <Reveal>
                <p className="text-slate-600 font-sans text-base leading-relaxed">
                  How our engineering solutions empower aggregate producers, recyclers, and concrete manufacturers to achieve resource efficiency, lower carbon footprints, and divert waste.
                </p>
              </Reveal>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {/* Pillar 1 */}
              <Reveal>
                <div className="bg-slate-50 border border-slate-200 p-8 space-y-4 hover:border-primary/60 transition-all duration-200 group h-full flex flex-col justify-between">
                  <div className="space-y-4">
                    <div className="w-12 h-12 rounded bg-rose-50 border border-rose-200 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                      <Leaf className="w-6 h-6" />
                    </div>
                    <h3 className="font-display font-extrabold text-xl text-slate-900 uppercase tracking-tight">
                      Resource Efficiency
                    </h3>
                    <p className="text-slate-600 font-sans text-sm leading-relaxed">
                      Helps sourcing locally available aggregates and recycled materials in reducing the need for extraction of virgin resources, minimizing environmental impact and conserving natural resources.
                    </p>
                  </div>
                  <div className="pt-4 border-t border-slate-200 font-mono text-[11px] font-bold text-primary">
                    VIRGIN RESOURCE CONSERVATION
                  </div>
                </div>
              </Reveal>

              {/* Pillar 2 */}
              <Reveal>
                <div className="bg-slate-50 border border-slate-200 p-8 space-y-4 hover:border-primary/60 transition-all duration-200 group h-full flex flex-col justify-between">
                  <div className="space-y-4">
                    <div className="w-12 h-12 rounded bg-rose-50 border border-rose-200 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                      <TrendingUp className="w-6 h-6" />
                    </div>
                    <h3 className="font-display font-extrabold text-xl text-slate-900 uppercase tracking-tight">
                      Carbon Emissions Reduction
                    </h3>
                    <p className="text-slate-600 font-sans text-sm leading-relaxed">
                      We do full front-end loading (FEL) studies of SCMs. SCMs, by replacing a portion of Portland cement in concrete mixtures, reduce the carbon footprint associated with cement production. SCMs are typically industrial by-products or waste materials that would otherwise be landfilled, contributing directly to a circular economy.
                    </p>
                  </div>
                  <div className="pt-4 border-t border-slate-200 font-mono text-[11px] font-bold text-primary">
                    FRONT-END LOADING (FEL) STUDIES
                  </div>
                </div>
              </Reveal>

              {/* Pillar 3 */}
              <Reveal>
                <div className="bg-slate-50 border border-slate-200 p-8 space-y-4 hover:border-primary/60 transition-all duration-200 group h-full flex flex-col justify-between">
                  <div className="space-y-4">
                    <div className="w-12 h-12 rounded bg-rose-50 border border-rose-200 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                      <Recycle className="w-6 h-6" />
                    </div>
                    <h3 className="font-display font-extrabold text-xl text-slate-900 uppercase tracking-tight">
                      Waste Reduction
                    </h3>
                    <p className="text-slate-600 font-sans text-sm leading-relaxed">
                      Work with waste recyclers and aggregate/concrete producers in incorporating recycled aggregates and SCMs into concrete. This reduces the volume of construction and demolition waste sent to landfills, promoting waste diversion and sustainable waste management practices.
                    </p>
                  </div>
                  <div className="pt-4 border-t border-slate-200 font-mono text-[11px] font-bold text-primary">
                    LANDFILL DIVERSION & RECYCLING
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* 4. CLOSING COMMITMENT BANNER */}
        <section className="py-20 bg-slate-950 text-white border-b border-slate-800 overflow-hidden relative">
          <div className="absolute top-0 right-0 w-96 h-96 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="max-w-5xl mx-auto px-6 lg:px-8 relative z-10 text-center space-y-8">
            <Reveal>
              <div className="inline-block font-mono text-xs font-bold text-rose-400 tracking-widest uppercase bg-rose-500/20 border border-rose-500/40 px-3 py-1">
                DOMAIN EXPERTISE IN AGGREGATE & SCM
              </div>
            </Reveal>

            <Reveal>
              <h2 className="font-display font-black text-3xl sm:text-5xl text-white uppercase tracking-tight max-w-4xl mx-auto leading-tight">
                Unlock Sustainable Concrete Production with MACPROTEC
              </h2>
            </Reveal>

            <Reveal>
              <p className="text-slate-300 font-sans text-base sm:text-lg leading-relaxed max-w-3xl mx-auto">
                MACPROTEC's deep domain expertise in Supplemental Cementitious Material and Aggregate Industries puts us in a unique position to help the industry optimize processing, conduct front-end engineering studies, and achieve decarbonization goals.
              </p>
            </Reveal>

            <Reveal>
              <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
                <Link
                  href="/lets-connect"
                  className="px-8 py-4 bg-primary hover:bg-rose-700 text-white font-mono text-xs font-bold uppercase tracking-wider transition-all duration-150 shadow-xl flex items-center gap-2 group"
                >
                  <span>Consult SCM & Aggregate Engineers</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>

                <Link
                  href="/solutions"
                  className="px-8 py-4 bg-slate-900 border border-slate-700 hover:border-rose-500 text-slate-200 hover:text-white font-mono text-xs font-bold uppercase tracking-wider transition-all duration-150 flex items-center gap-2"
                >
                  <span>Explore Engineering Solutions</span>
                </Link>
              </div>
            </Reveal>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
