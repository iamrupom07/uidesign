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
  Droplets,
  Recycle,
  ShieldAlert,
  Trees,
  Scale,
  Award,
  Share2,
} from "lucide-react";

export default function MineTailingManagementPage() {
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
              <span className="text-primary font-bold">Mine Tailing Management</span>
            </div>
            <div className="hidden sm:flex items-center gap-3 text-[10px] text-slate-400">
              <span className="font-bold text-rose-400">SECTOR 05</span>
              <span>•</span>
              <span>MINE TAILING MANAGEMENT & RE-PURPOSING</span>
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
                    <span>OUR EXPERTISE // MINE TAILING MANAGEMENT</span>
                  </div>
                </Reveal>

                <Reveal>
                  <h1 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl text-slate-900 uppercase tracking-tight leading-[1.15]">
                    Mine Tailing Management & <span className="text-primary">Circular Re-Purposing</span>
                  </h1>
                </Reveal>

                <Reveal>
                  <p className="text-sm text-slate-600 font-sans leading-relaxed max-w-2xl">
                    The management of tailings in the critical minerals processing industry presents a significant challenge that requires careful attention and proactive measures to mitigate environmental and social risks. Tailings are the waste materials generated during the extraction and processing of minerals, consisting of finely ground rock particles, water, and chemical residues. MACPROTEC provides comprehensive expertise services to address tailings dewatering, circular re-purposing, and safe long-term TSF closure.
                  </p>
                </Reveal>

                {/* Hero Badges */}
                <Reveal>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 pt-1">
                    <div className="bg-slate-50 border border-slate-200 p-2.5 rounded font-mono text-[11px] text-slate-800 font-bold flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-primary shrink-0" />
                      <span>Tailings Dewatering</span>
                    </div>
                    <div className="bg-slate-50 border border-slate-200 p-2.5 rounded font-mono text-[11px] text-slate-800 font-bold flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-primary shrink-0" />
                      <span>Circular Re-Purposing</span>
                    </div>
                    <div className="bg-slate-50 border border-slate-200 p-2.5 rounded font-mono text-[11px] text-slate-800 font-bold flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-primary shrink-0" />
                      <span>Closure & Rehabilitation</span>
                    </div>
                    <div className="bg-slate-50 border border-slate-200 p-2.5 rounded font-mono text-[11px] text-slate-800 font-bold flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-primary shrink-0" />
                      <span>TSF Risk Mitigation</span>
                    </div>
                    <div className="bg-slate-50 border border-slate-200 p-2.5 rounded font-mono text-[11px] text-slate-800 font-bold flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-primary shrink-0" />
                      <span>Environmental Compliance</span>
                    </div>
                  </div>
                </Reveal>

                {/* Hero Action Buttons */}
                <Reveal>
                  <div className="flex flex-wrap items-center gap-4 pt-3">
                    <a
                      href="#tailings-challenges"
                      className="px-6 py-3.5 bg-primary hover:bg-rose-700 text-white font-mono text-xs font-bold uppercase tracking-wider transition-all duration-150 shadow-md flex items-center gap-2 group"
                    >
                      <span>Explore Expertise Services</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </a>

                    <Link
                      href="/lets-connect"
                      className="px-6 py-3.5 bg-white border border-slate-300 hover:border-slate-900 text-slate-800 font-mono text-xs font-bold uppercase tracking-wider transition-all duration-150 flex items-center gap-2 hover:bg-slate-50"
                    >
                      <span>Consult Tailings Engineers</span>
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
                      src="/images/tailings_management.png"
                      alt="MACPROTEC Mine Tailing Storage Facility"
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
                          MINE TAILING MANAGEMENT & RE-PURPOSING
                        </div>
                      </div>
                      <div className="w-10 h-10 rounded bg-primary/20 border border-primary/40 flex items-center justify-center text-primary shrink-0">
                        <Recycle className="w-5 h-5" />
                      </div>
                    </div>
                  </div>
                </Reveal>
              </div>
            </div>
          </div>
        </section>

        {/* 2. CORE TAILINGS CHALLENGES & MACPROTEC EXPERTISE */}
        <section id="tailings-challenges" className="py-20 bg-slate-50 border-b border-slate-200 scroll-mt-10">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 space-y-12">
            <div className="max-w-3xl space-y-4">
              <Reveal>
                <div className="inline-block font-mono text-xs font-bold text-primary uppercase tracking-widest bg-rose-50 border border-rose-200 px-3 py-1">
                  MACPROTEC EXPERTISE SERVICES
                </div>
              </Reveal>
              <Reveal>
                <h2 className="font-display font-black text-3xl sm:text-4xl text-slate-900 uppercase tracking-tight">
                  Mitigating Critical Tailings Challenges
                </h2>
              </Reveal>
              <Reveal>
                <p className="text-slate-600 font-sans text-base leading-relaxed">
                  While tailings are a byproduct of critical mineral processing, improper management can create environmental liabilities. MACPROTEC provides specialized engineering services to eliminate these risks.
                </p>
              </Reveal>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {/* Challenge 1 */}
              <Reveal>
                <div className="bg-white border border-slate-200 p-8 space-y-4 hover:border-primary/60 transition-all duration-200 group h-full flex flex-col justify-between">
                  <div className="space-y-4">
                    <div className="w-12 h-12 rounded bg-rose-50 border border-rose-200 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                      <Droplets className="w-6 h-6" />
                    </div>
                    <h3 className="font-display font-extrabold text-xl text-slate-900 uppercase tracking-tight">
                      Tailings Dewatering & Storage
                    </h3>
                    <p className="text-slate-600 font-sans text-sm leading-relaxed">
                      Finding suitable methods for dewatering and storing tailings in a safe and environmentally sound manner poses technical challenges, particularly for mines operating in water-scarce regions or with complex geological conditions. We engineer custom dewatering, thickening, and paste backfill systems.
                    </p>
                  </div>
                  <div className="pt-4 border-t border-slate-100 font-mono text-[11px] font-bold text-primary">
                    DEWATERING & PASTE BACKFILL DESIGN
                  </div>
                </div>
              </Reveal>

              {/* Challenge 2 */}
              <Reveal>
                <div className="bg-white border border-slate-200 p-8 space-y-4 hover:border-primary/60 transition-all duration-200 group h-full flex flex-col justify-between">
                  <div className="space-y-4">
                    <div className="w-12 h-12 rounded bg-rose-50 border border-rose-200 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                      <Recycle className="w-6 h-6" />
                    </div>
                    <h3 className="font-display font-extrabold text-xl text-slate-900 uppercase tracking-tight">
                      Re-purposing Tailings to Circular Economy
                    </h3>
                    <p className="text-slate-600 font-sans text-sm leading-relaxed">
                      We have the deep domain expertise to re-purpose and re-process tailings to make them usable in other industries. This is one of our key strengths—we find purposeful circularity for any tailings challenge that the industry faces to mitigate liabilities.
                    </p>
                  </div>
                  <div className="pt-4 border-t border-slate-100 font-mono text-[11px] font-bold text-primary">
                    PURPOSEFUL TAILINGS CIRCULARITY
                  </div>
                </div>
              </Reveal>

              {/* Challenge 3 */}
              <Reveal>
                <div className="bg-white border border-slate-200 p-8 space-y-4 hover:border-primary/60 transition-all duration-200 group h-full flex flex-col justify-between">
                  <div className="space-y-4">
                    <div className="w-12 h-12 rounded bg-rose-50 border border-rose-200 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                      <Trees className="w-6 h-6" />
                    </div>
                    <h3 className="font-display font-extrabold text-xl text-slate-900 uppercase tracking-tight">
                      Closure & Rehabilitation
                    </h3>
                    <p className="text-slate-600 font-sans text-sm leading-relaxed">
                      Proper closure and rehabilitation of Tailings Storage Facilities (TSFs) are essential to minimize long-term environmental liabilities and ensure post-closure stability and safety. Achieving effective closure requires careful planning, monitoring, and financial provisions to address legacy issues.
                    </p>
                  </div>
                  <div className="pt-4 border-t border-slate-100 font-mono text-[11px] font-bold text-primary">
                    LONG-TERM TSF REHABILITATION
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* 3. INTEGRATED MITIGATION FRAMEWORK */}
        <section className="py-20 bg-white border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 space-y-12">
            <div className="max-w-3xl space-y-4">
              <Reveal>
                <div className="inline-block font-mono text-xs font-bold text-primary uppercase tracking-widest bg-rose-50 border border-rose-200 px-3 py-1">
                  INTEGRATED APPROACH
                </div>
              </Reveal>
              <Reveal>
                <h2 className="font-display font-black text-3xl sm:text-4xl text-slate-900 uppercase tracking-tight">
                  Comprehensive Tailings Stewardship Framework
                </h2>
              </Reveal>
              <Reveal>
                <p className="text-slate-600 font-sans text-base leading-relaxed">
                  Addressing tailings challenges requires a holistic approach that prioritizes environmental protection, social responsibility, and regulatory compliance.
                </p>
              </Reveal>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <Reveal>
                <div className="bg-slate-50 border border-slate-200 p-6 space-y-4 h-full flex flex-col justify-between hover:border-primary/60 transition-all duration-200 group">
                  <div className="space-y-3">
                    <div className="w-10 h-10 rounded bg-rose-50 border border-rose-200 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                      <Leaf className="w-5 h-5" />
                    </div>
                    <h3 className="font-display font-extrabold text-lg text-slate-900 uppercase tracking-tight">
                      Environmental Protection
                    </h3>
                    <p className="text-xs text-slate-600 font-sans leading-relaxed">
                      Preventing groundwater contamination, soil degradation, and acid mine drainage through advanced lining and monitoring systems.
                    </p>
                  </div>
                  <div className="pt-3 border-t border-slate-200 font-mono text-[10px] font-bold text-rose-500">
                    CONTAMINATION PREVENTION
                  </div>
                </div>
              </Reveal>

              <Reveal>
                <div className="bg-slate-50 border border-slate-200 p-6 space-y-4 h-full flex flex-col justify-between hover:border-primary/60 transition-all duration-200 group">
                  <div className="space-y-3">
                    <div className="w-10 h-10 rounded bg-rose-50 border border-rose-200 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                      <Cpu className="w-5 h-5" />
                    </div>
                    <h3 className="font-display font-extrabold text-lg text-slate-900 uppercase tracking-tight">
                      Innovative Tech Investment
                    </h3>
                    <p className="text-xs text-slate-600 font-sans leading-relaxed">
                      Deploying high-pressure filter presses, paste thickeners, and real-time telemetry sensors for TSF dam integrity.
                    </p>
                  </div>
                  <div className="pt-3 border-t border-slate-200 font-mono text-[10px] font-bold text-rose-500">
                    HIGH-DENSITY FILTERING & IOT
                  </div>
                </div>
              </Reveal>

              <Reveal>
                <div className="bg-slate-50 border border-slate-200 p-6 space-y-4 h-full flex flex-col justify-between hover:border-primary/60 transition-all duration-200 group">
                  <div className="space-y-3">
                    <div className="w-10 h-10 rounded bg-rose-50 border border-rose-200 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                      <Scale className="w-5 h-5" />
                    </div>
                    <h3 className="font-display font-extrabold text-lg text-slate-900 uppercase tracking-tight">
                      Regulatory Compliance
                    </h3>
                    <p className="text-xs text-slate-600 font-sans leading-relaxed">
                      Strengthening regulatory frameworks and complying with Global Industry Standard on Tailings Management (GISTM).
                    </p>
                  </div>
                  <div className="pt-3 border-t border-slate-200 font-mono text-[10px] font-bold text-rose-500">
                    GISTM COMPLIANCE
                  </div>
                </div>
              </Reveal>

              <Reveal>
                <div className="bg-slate-50 border border-slate-200 p-6 space-y-4 h-full flex flex-col justify-between hover:border-primary/60 transition-all duration-200 group">
                  <div className="space-y-3">
                    <div className="w-10 h-10 rounded bg-rose-50 border border-rose-200 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                      <Share2 className="w-5 h-5" />
                    </div>
                    <h3 className="font-display font-extrabold text-lg text-slate-900 uppercase tracking-tight">
                      Community Engagement
                    </h3>
                    <p className="text-xs text-slate-600 font-sans leading-relaxed">
                      Engaging transparently with local communities to build trust, enhance community relations, and ensure safety.
                    </p>
                  </div>
                  <div className="pt-3 border-t border-slate-200 font-mono text-[10px] font-bold text-rose-500">
                    STAKEHOLDER TRUST
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
                RESPONSIBLE CRITICAL MINERAL PROCESSING
              </div>
            </Reveal>

            <Reveal>
              <h2 className="font-display font-black text-3xl sm:text-5xl text-white uppercase tracking-tight max-w-4xl mx-auto leading-tight">
                Transform Tailings Liabilities into Sustainable Opportunities
              </h2>
            </Reveal>

            <Reveal>
              <p className="text-slate-300 font-sans text-base sm:text-lg leading-relaxed max-w-3xl mx-auto">
                Addressing the challenges of tailings management in the critical minerals processing industry requires a comprehensive approach. MACPROTEC helps the industry adopt best practices in tailings management, invest in innovative dewatering technologies, re-purpose waste into the circular economy, and contribute to sustainable development.
              </p>
            </Reveal>

            <Reveal>
              <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
                <Link
                  href="/lets-connect"
                  className="px-8 py-4 bg-primary hover:bg-rose-700 text-white font-mono text-xs font-bold uppercase tracking-wider transition-all duration-150 shadow-xl flex items-center gap-2 group"
                >
                  <span>Consult Tailings Engineers</span>
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
