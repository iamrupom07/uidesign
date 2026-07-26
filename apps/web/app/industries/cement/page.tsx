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
  Share2,
  Building2,
  Scale,
  Flame,
  Globe,
} from "lucide-react";

export default function CementIndustryPage() {
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
              <span className="text-primary font-bold">Cement Industry</span>
            </div>
            <div className="hidden sm:flex items-center gap-3 text-[10px] text-slate-400">
              <span className="font-bold text-rose-400">SECTOR 02</span>
              <span>•</span>
              <span>CEMENT INDUSTRY EXPERTISE</span>
            </div>
          </div>
        </section>

        {/* 1. HERO BANNER */}
        <section className="relative py-16 lg:py-24 bg-white border-b border-slate-200 overflow-hidden">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="grid lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-7 space-y-6">
                <Reveal>
                  <div className="inline-flex items-center gap-2 bg-rose-50 text-primary border border-rose-200/80 px-3.5 py-1.5 font-mono text-xs font-bold uppercase tracking-wider rounded-full shadow-xs">
                    <Sparkles className="w-3.5 h-3.5 text-primary" />
                    <span>OUR EXPERTISE // FOUNDATIONAL CORE STRENGTH</span>
                  </div>
                </Reveal>

                <Reveal>
                  <h1 className="font-display font-extrabold text-3xl sm:text-5xl lg:text-6xl text-slate-900 uppercase tracking-tight leading-[1.1]">
                    Cement Industry <span className="text-primary">Engineering & Solutions</span>
                  </h1>
                </Reveal>

                <Reveal>
                  <p className="text-base sm:text-lg text-slate-600 font-sans leading-relaxed max-w-2xl">
                    Cement Industry expertise is MACPROTEC's foundational core strength. The cement industry plays a foundational role in global infrastructure development, providing essential building materials for construction projects ranging from residential buildings to large-scale infrastructure. We diligently work together with our Cement Industry partners, plant owners, and investors to address critical challenges facing the industry.
                  </p>
                </Reveal>

                {/* Hero Badges */}
                <Reveal>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
                    <div className="bg-slate-50 border border-slate-200 p-3 rounded font-mono text-xs text-slate-800 font-bold flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                      <span>Alternative Fuels (AFR)</span>
                    </div>
                    <div className="bg-slate-50 border border-slate-200 p-3 rounded font-mono text-xs text-slate-800 font-bold flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                      <span>Carbon Capture (CCU)</span>
                    </div>
                    <div className="bg-slate-50 border border-slate-200 p-3 rounded font-mono text-xs text-slate-800 font-bold flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                      <span>Circular Economy</span>
                    </div>
                    <div className="bg-slate-50 border border-slate-200 p-3 rounded font-mono text-xs text-slate-800 font-bold flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                      <span>Digitalization & Industry 4.0</span>
                    </div>
                    <div className="bg-slate-50 border border-slate-200 p-3 rounded font-mono text-xs text-slate-800 font-bold flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                      <span>Knowledge Sharing</span>
                    </div>
                  </div>
                </Reveal>

                {/* Hero Action Buttons */}
                <Reveal>
                  <div className="flex flex-wrap items-center gap-4 pt-4">
                    <a
                      href="#cement-solutions"
                      className="px-6 py-3.5 bg-primary hover:bg-rose-700 text-white font-mono text-xs font-bold uppercase tracking-wider transition-all duration-150 shadow-md flex items-center gap-2 group"
                    >
                      <span>Explore Our Solutions</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </a>

                    <Link
                      href="/lets-connect"
                      className="px-6 py-3.5 bg-white border border-slate-300 hover:border-slate-900 text-slate-800 font-mono text-xs font-bold uppercase tracking-wider transition-all duration-150 flex items-center gap-2 hover:bg-slate-50"
                    >
                      <span>Consult Cement Specialists</span>
                      <ArrowRight className="w-4 h-4 text-slate-400" />
                    </Link>
                  </div>
                </Reveal>
              </div>

              {/* Right Hero Image */}
              <div className="lg:col-span-5 relative">
                <Reveal>
                  <div className="relative border-4 border-white shadow-2xl overflow-hidden group bg-slate-900">
                    <Image
                      src="/images/cement_industry.png"
                      alt="MACPROTEC Cement Industry Plant Facility"
                      width={700}
                      height={500}
                      className="w-full h-[380px] sm:h-[450px] object-cover group-hover:scale-105 transition-transform duration-500"
                      priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/20 to-transparent z-10" />

                    <div className="absolute bottom-5 left-5 right-5 z-20 bg-slate-950/90 border border-slate-800 p-4 backdrop-blur-md font-mono text-white flex items-center justify-between">
                      <div>
                        <div className="text-[10px] text-rose-400 font-bold uppercase tracking-wider">
                          CORE SECTOR HIGHLIGHT
                        </div>
                        <div className="text-sm font-extrabold font-display uppercase tracking-tight text-white mt-0.5">
                          CEMENT PLANT OPTIMIZATION & DECARBONIZATION
                        </div>
                      </div>
                      <div className="w-10 h-10 rounded bg-primary/20 border border-primary/40 flex items-center justify-center text-primary shrink-0">
                        <Factory className="w-5 h-5" />
                      </div>
                    </div>
                  </div>
                </Reveal>
              </div>
            </div>
          </div>
        </section>

        {/* 2. CHALLENGES IN THE CEMENT INDUSTRY */}
        <section className="py-20 bg-slate-50 border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 space-y-12">
            <div className="max-w-3xl space-y-4">
              <Reveal>
                <div className="inline-block font-mono text-xs font-bold text-primary uppercase tracking-widest bg-rose-50 border border-rose-200 px-3 py-1">
                  INDUSTRY CHALLENGES
                </div>
              </Reveal>
              <Reveal>
                <h2 className="font-display font-black text-3xl sm:text-4xl text-slate-900 uppercase tracking-tight">
                  Addressing Key Challenges in the Cement Industry
                </h2>
              </Reveal>
              <Reveal>
                <p className="text-slate-600 font-sans text-base leading-relaxed">
                  We work side-by-side with plant owners, investors, and operators to navigate environmental, resource, regulatory, and technological pressures.
                </p>
              </Reveal>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <Reveal>
                <div className="bg-white border border-slate-200 p-6 space-y-4 h-full flex flex-col justify-between hover:border-primary/60 transition-all duration-200 group">
                  <div className="space-y-3">
                    <div className="w-10 h-10 rounded bg-rose-50 border border-rose-200 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                      <Leaf className="w-5 h-5" />
                    </div>
                    <h3 className="font-display font-extrabold text-lg text-slate-900 uppercase tracking-tight">
                      Environmental Impact
                    </h3>
                    <p className="text-xs text-slate-600 font-sans leading-relaxed">
                      Cement production is a significant source of carbon dioxide emissions, contributing to climate change. The industry faces pressure to reduce its environmental footprint, including carbon emissions, energy consumption, and water usage, while meeting growing demand for cement.
                    </p>
                  </div>
                  <div className="pt-3 border-t border-slate-100 font-mono text-[10px] font-bold text-rose-500">
                    DECARBONIZATION & FOOTPRINT
                  </div>
                </div>
              </Reveal>

              <Reveal>
                <div className="bg-white border border-slate-200 p-6 space-y-4 h-full flex flex-col justify-between hover:border-primary/60 transition-all duration-200 group">
                  <div className="space-y-3">
                    <div className="w-10 h-10 rounded bg-rose-50 border border-rose-200 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                      <Globe className="w-5 h-5" />
                    </div>
                    <h3 className="font-display font-extrabold text-lg text-slate-900 uppercase tracking-tight">
                      Resource Depletion
                    </h3>
                    <p className="text-xs text-slate-600 font-sans leading-relaxed">
                      Cement production relies on finite resources such as limestone and clay. As demand grows, there is a risk of resource depletion and environmental degradation associated with quarrying activities, highlighting the need for sustainable resource management.
                    </p>
                  </div>
                  <div className="pt-3 border-t border-slate-100 font-mono text-[10px] font-bold text-rose-500">
                    SUSTAINABLE RESOURCE MANAGEMENT
                  </div>
                </div>
              </Reveal>

              <Reveal>
                <div className="bg-white border border-slate-200 p-6 space-y-4 h-full flex flex-col justify-between hover:border-primary/60 transition-all duration-200 group">
                  <div className="space-y-3">
                    <div className="w-10 h-10 rounded bg-rose-50 border border-rose-200 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                      <Scale className="w-5 h-5" />
                    </div>
                    <h3 className="font-display font-extrabold text-lg text-slate-900 uppercase tracking-tight">
                      Regulatory Compliance
                    </h3>
                    <p className="text-xs text-slate-600 font-sans leading-relaxed">
                      Stringent regulations and emissions standards pose compliance challenges for cement manufacturers, particularly in regions with strict environmental regulations. Meeting regulatory requirements while maintaining competitiveness is a critical challenge for the industry.
                    </p>
                  </div>
                  <div className="pt-3 border-t border-slate-100 font-mono text-[10px] font-bold text-rose-500">
                    EMISSIONS STANDARDS & LAWS
                  </div>
                </div>
              </Reveal>

              <Reveal>
                <div className="bg-white border border-slate-200 p-6 space-y-4 h-full flex flex-col justify-between hover:border-primary/60 transition-all duration-200 group">
                  <div className="space-y-3">
                    <div className="w-10 h-10 rounded bg-rose-50 border border-rose-200 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                      <Cpu className="w-5 h-5" />
                    </div>
                    <h3 className="font-display font-extrabold text-lg text-slate-900 uppercase tracking-tight">
                      Technological Innovation
                    </h3>
                    <p className="text-xs text-slate-600 font-sans leading-relaxed">
                      Rapid technological advancements, including digitalization, automation, and alternative materials, present both opportunities and challenges for the cement industry. Adapting to technological changes and investing in innovation is essential for long-term sustainability and competitiveness.
                    </p>
                  </div>
                  <div className="pt-3 border-t border-slate-100 font-mono text-[10px] font-bold text-rose-500">
                    DIGITAL ADAPTATION & INNOVATION
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* 3. SOLUTIONS PROVIDED BY MACPROTEC */}
        <section id="cement-solutions" className="py-20 bg-white border-b border-slate-200 scroll-mt-10">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 space-y-12">
            <div className="max-w-3xl space-y-4">
              <Reveal>
                <div className="inline-block font-mono text-xs font-bold text-primary uppercase tracking-widest bg-rose-50 border border-rose-200 px-3 py-1">
                  MACPROTEC SOLUTIONS & OPPORTUNITIES
                </div>
              </Reveal>
              <Reveal>
                <h2 className="font-display font-black text-3xl sm:text-4xl text-slate-900 uppercase tracking-tight">
                  Engineering Solutions for the Cement Industry
                </h2>
              </Reveal>
              <Reveal>
                <p className="text-slate-600 font-sans text-base leading-relaxed">
                  MACPROTEC works diligently to bring comprehensive solutions to the Cement Industry across key growth and decarbonization opportunities.
                </p>
              </Reveal>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Solution 1 */}
              <Reveal>
                <div className="bg-slate-50 border border-slate-200 p-8 space-y-4 hover:border-primary/60 transition-all duration-200 group h-full flex flex-col justify-between">
                  <div className="space-y-4">
                    <div className="w-12 h-12 rounded bg-rose-50 border border-rose-200 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                      <Flame className="w-6 h-6" />
                    </div>
                    <h3 className="font-display font-extrabold text-xl text-slate-900 uppercase tracking-tight">
                      Alternative Fuels & Raw Materials (AFR)
                    </h3>
                    <p className="text-slate-600 font-sans text-sm leading-relaxed">
                      Cement manufacturers are exploring alternative fuels such as biomass, waste-derived fuels, and alternative raw materials to reduce reliance on traditional fossil fuels and virgin resources, thereby lowering carbon emissions and enhancing resource efficiency. We do all upfront and downstream project engineering and services in this category.
                    </p>
                  </div>
                  <div className="pt-4 border-t border-slate-200 font-mono text-[11px] font-bold text-primary">
                    UPFRONT & DOWNSTREAM ENGINEERING
                  </div>
                </div>
              </Reveal>

              {/* Solution 2 */}
              <Reveal>
                <div className="bg-slate-50 border border-slate-200 p-8 space-y-4 hover:border-primary/60 transition-all duration-200 group h-full flex flex-col justify-between">
                  <div className="space-y-4">
                    <div className="w-12 h-12 rounded bg-rose-50 border border-rose-200 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                      <Leaf className="w-6 h-6" />
                    </div>
                    <h3 className="font-display font-extrabold text-xl text-slate-900 uppercase tracking-tight">
                      Carbon Capture and Utilization (CCU)
                    </h3>
                    <p className="text-slate-600 font-sans text-sm leading-relaxed">
                      MACPROTEC is partnered with the industry's top talents to offer Carbon capture technologies with the potential to capture and utilize CO2 emissions from cement plants for beneficial purposes, such as carbonation of concrete or production of synthetic fuels, contributing to climate mitigation efforts.
                    </p>
                  </div>
                  <div className="pt-4 border-t border-slate-200 font-mono text-[11px] font-bold text-primary">
                    TOP TALENT PARTNERSHIPS & TECH
                  </div>
                </div>
              </Reveal>

              {/* Solution 3 */}
              <Reveal>
                <div className="bg-slate-50 border border-slate-200 p-8 space-y-4 hover:border-primary/60 transition-all duration-200 group h-full flex flex-col justify-between">
                  <div className="space-y-4">
                    <div className="w-12 h-12 rounded bg-rose-50 border border-rose-200 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                      <Recycle className="w-6 h-6" />
                    </div>
                    <h3 className="font-display font-extrabold text-xl text-slate-900 uppercase tracking-tight">
                      Circular Economy Practices
                    </h3>
                    <p className="text-slate-600 font-sans text-sm leading-relaxed">
                      Adopting circular economy principles, including recycling and repurposing of waste materials such as construction and demolition waste, can reduce the environmental impact of cement production and conserve natural resources.
                    </p>
                  </div>
                  <div className="pt-4 border-t border-slate-200 font-mono text-[11px] font-bold text-primary">
                    RECYCLING & WASTE REPURPOSING
                  </div>
                </div>
              </Reveal>

              {/* Solution 4 */}
              <Reveal>
                <div className="bg-slate-50 border border-slate-200 p-8 space-y-4 hover:border-primary/60 transition-all duration-200 group h-full flex flex-col justify-between">
                  <div className="space-y-4">
                    <div className="w-12 h-12 rounded bg-rose-50 border border-rose-200 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                      <Cpu className="w-6 h-6" />
                    </div>
                    <h3 className="font-display font-extrabold text-xl text-slate-900 uppercase tracking-tight">
                      Digitalization and Industry 4.0
                    </h3>
                    <p className="text-slate-600 font-sans text-sm leading-relaxed">
                      Industry 4.0 technologies, such as IoT sensors, AI, and automation, can optimize production processes, improve energy efficiency, and enable predictive maintenance, enhancing productivity and sustainability in the cement industry.
                    </p>
                  </div>
                  <div className="pt-4 border-t border-slate-200 font-mono text-[11px] font-bold text-primary">
                    IOT, AI & PREDICTIVE TELEMETRY
                  </div>
                </div>
              </Reveal>

              {/* Solution 5 */}
              <Reveal className="md:col-span-2 lg:col-span-2">
                <div className="bg-slate-900 text-white border border-slate-800 p-8 space-y-4 hover:border-rose-500/50 transition-all duration-200 group h-full flex flex-col justify-between">
                  <div className="space-y-4">
                    <div className="w-12 h-12 rounded bg-rose-500/20 border border-rose-500/40 flex items-center justify-center text-rose-400">
                      <Share2 className="w-6 h-6" />
                    </div>
                    <h3 className="font-display font-extrabold text-xl text-white uppercase tracking-tight">
                      Collaboration and Knowledge Sharing
                    </h3>
                    <p className="text-slate-300 font-sans text-sm leading-relaxed">
                      Collaboration among stakeholders, including governments, industry associations, academia, and civil society, is essential for driving innovation, sharing best practices, and addressing common challenges facing the cement industry. We are the champions in sharing knowledge across the board in the Cement Industry.
                    </p>
                  </div>
                  <div className="pt-4 border-t border-slate-800 font-mono text-[11px] font-bold text-rose-400">
                    CHAMPIONS IN INDUSTRY KNOWLEDGE SHARING
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
                OUR FOUNDATIONAL CORE STRENGTH
              </div>
            </Reveal>

            <Reveal>
              <h2 className="font-display font-black text-3xl sm:text-5xl text-white uppercase tracking-tight max-w-4xl mx-auto leading-tight">
                Partner with MACPROTEC for Sustainable & Profitable Cement Operations
              </h2>
            </Reveal>

            <Reveal>
              <p className="text-slate-300 font-sans text-base sm:text-lg leading-relaxed max-w-3xl mx-auto">
                From alternative fuel conversions to kiln optimization, carbon capture integration, and plant digitalization, MACPROTEC brings deep domain engineering expertise to every cement project.
              </p>
            </Reveal>

            <Reveal>
              <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
                <Link
                  href="/lets-connect"
                  className="px-8 py-4 bg-primary hover:bg-rose-700 text-white font-mono text-xs font-bold uppercase tracking-wider transition-all duration-150 shadow-xl flex items-center gap-2 group"
                >
                  <span>Consult Cement Engineers</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>

                <Link
                  href="/solutions"
                  className="px-8 py-4 bg-slate-900 border border-slate-700 hover:border-rose-500 text-slate-200 hover:text-white font-mono text-xs font-bold uppercase tracking-wider transition-all duration-150 flex items-center gap-2"
                >
                  <span>Explore Cement Solutions</span>
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
