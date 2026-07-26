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
  Activity,
  Eye,
  Glasses,
  Radio,
  Share2,
  Box,
} from "lucide-react";

export default function Industry40Page() {
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
              <span className="text-primary font-bold">Industry 4.0</span>
            </div>
            <div className="hidden sm:flex items-center gap-3 text-[10px] text-slate-400">
              <span className="font-bold text-rose-400">SECTOR 01</span>
              <span>•</span>
              <span>INDUSTRY 4.0 DIGITAL TRANSFORMATION</span>
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
                    <span>OUR EXPERTISE // INDUSTRY 4.0</span>
                  </div>
                </Reveal>

                <Reveal>
                  <h1 className="font-display font-extrabold text-3xl sm:text-5xl lg:text-6xl text-slate-900 uppercase tracking-tight leading-[1.1]">
                    Revolutionizing Cement, Mining, and Heavy Industries with <span className="text-primary">Industry 4.0</span>
                  </h1>
                </Reveal>

                <Reveal>
                  <p className="text-base sm:text-lg text-slate-600 font-sans leading-relaxed max-w-2xl">
                    In the relentless pursuit of efficiency, safety, and sustainability, the cement, mining, and heavy industries are embracing the transformative potential of Industry 4.0. By leveraging advanced technologies and data-driven insights, these traditionally labor-intensive sectors are undergoing a profound evolution that promises to redefine the way they operate.
                  </p>
                </Reveal>

                {/* Hero Badges */}
                <Reveal>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
                    <div className="bg-slate-50 border border-slate-200 p-3 rounded font-mono text-xs text-slate-800 font-bold flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                      <span>Smart Cement Plants</span>
                    </div>
                    <div className="bg-slate-50 border border-slate-200 p-3 rounded font-mono text-xs text-slate-800 font-bold flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                      <span>Predictive Mining</span>
                    </div>
                    <div className="bg-slate-50 border border-slate-200 p-3 rounded font-mono text-xs text-slate-800 font-bold flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                      <span>Connected Machinery</span>
                    </div>
                  </div>
                </Reveal>

                {/* Hero Action Buttons */}
                <Reveal>
                  <div className="flex flex-wrap items-center gap-4 pt-4">
                    <Link
                      href="#cement-production"
                      className="px-6 py-3.5 bg-primary hover:bg-rose-700 text-white font-mono text-xs font-bold uppercase tracking-wider transition-all duration-150 shadow-md flex items-center gap-2 group"
                    >
                      <span>Explore Applications</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>

                    <Link
                      href="/lets-connect"
                      className="px-6 py-3.5 bg-white border border-slate-300 hover:border-slate-900 text-slate-800 font-mono text-xs font-bold uppercase tracking-wider transition-all duration-150 flex items-center gap-2 hover:bg-slate-50"
                    >
                      <span>Request Consultation</span>
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
                      src="/images/industry_40.png"
                      alt="MACPROTEC Industry 4.0 Digital Transformation"
                      width={700}
                      height={500}
                      className="w-full h-[380px] sm:h-[450px] object-cover group-hover:scale-105 transition-transform duration-500"
                      priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/20 to-transparent z-10" />

                    <div className="absolute bottom-5 left-5 right-5 z-20 bg-slate-950/90 border border-slate-800 p-4 backdrop-blur-md font-mono text-white flex items-center justify-between">
                      <div>
                        <div className="text-[10px] text-rose-400 font-bold uppercase tracking-wider">
                          DIGITAL TRANSFORMATION MATRIX
                        </div>
                        <div className="text-sm font-extrabold font-display uppercase tracking-tight text-white mt-0.5">
                          INDUSTRY 4.0 SMART MANUFACTURING
                        </div>
                      </div>
                      <div className="w-10 h-10 rounded bg-primary/20 border border-primary/40 flex items-center justify-center text-primary shrink-0">
                        <Cpu className="w-5 h-5" />
                      </div>
                    </div>
                  </div>
                </Reveal>
              </div>
            </div>
          </div>
        </section>

        {/* 2. CEMENT PRODUCTION SECTION */}
        <section id="cement-production" className="py-20 bg-slate-50 border-b border-slate-200 scroll-mt-10">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 space-y-12">
            <div className="max-w-3xl space-y-4">
              <Reveal>
                <div className="inline-block font-mono text-xs font-bold text-primary uppercase tracking-widest bg-rose-50 border border-rose-200 px-3 py-1">
                  SECTOR APPLICATION 01
                </div>
              </Reveal>
              <Reveal>
                <h2 className="font-display font-black text-3xl sm:text-4xl text-slate-900 uppercase tracking-tight">
                  Industry 4.0 in Cement Production
                </h2>
              </Reveal>
              <Reveal>
                <p className="text-slate-600 font-sans text-base leading-relaxed">
                  Transforming heavy pyroprocessing and grinding operations into continuous, self-optimizing digital production environments.
                </p>
              </Reveal>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <Reveal>
                <div className="bg-white border border-slate-200 p-8 space-y-4 hover:border-primary/60 transition-all duration-200 group h-full flex flex-col justify-between">
                  <div className="space-y-4">
                    <div className="w-12 h-12 rounded bg-rose-50 border border-rose-200 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                      <Cpu className="w-6 h-6" />
                    </div>
                    <h3 className="font-display font-extrabold text-xl text-slate-900 uppercase tracking-tight">
                      Smart Manufacturing
                    </h3>
                    <p className="text-slate-600 font-sans text-sm leading-relaxed">
                      We help Cement plants in integrating IoT sensors and automation systems into their production processes to monitor equipment performance in real-time. This enables predictive maintenance, minimizing downtime and optimizing resource utilization.
                    </p>
                  </div>
                  <div className="pt-4 border-t border-slate-100 font-mono text-[11px] font-bold text-primary">
                    PREDICTIVE TELEMETRY & IOT
                  </div>
                </div>
              </Reveal>

              <Reveal>
                <div className="bg-white border border-slate-200 p-8 space-y-4 hover:border-primary/60 transition-all duration-200 group h-full flex flex-col justify-between">
                  <div className="space-y-4">
                    <div className="w-12 h-12 rounded bg-rose-50 border border-rose-200 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                      <Box className="w-6 h-6" />
                    </div>
                    <h3 className="font-display font-extrabold text-xl text-slate-900 uppercase tracking-tight">
                      Digital Twins
                    </h3>
                    <p className="text-slate-600 font-sans text-sm leading-relaxed">
                      Digital replicas of cement plants allow for virtual simulations and predictive modeling, facilitating continuous optimization of operations, from raw material extraction to the final product.
                    </p>
                  </div>
                  <div className="pt-4 border-t border-slate-100 font-mono text-[11px] font-bold text-primary">
                    VIRTUAL PLANT REPLICAS
                  </div>
                </div>
              </Reveal>

              <Reveal>
                <div className="bg-white border border-slate-200 p-8 space-y-4 hover:border-primary/60 transition-all duration-200 group h-full flex flex-col justify-between">
                  <div className="space-y-4">
                    <div className="w-12 h-12 rounded bg-rose-50 border border-rose-200 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                      <Eye className="w-6 h-6" />
                    </div>
                    <h3 className="font-display font-extrabold text-xl text-slate-900 uppercase tracking-tight">
                      AI-Driven Quality Control
                    </h3>
                    <p className="text-slate-600 font-sans text-sm leading-relaxed">
                      Artificial intelligence algorithms analyze data from sensors and cameras to detect defects and optimize production parameters, ensuring consistent quality while reducing waste.
                    </p>
                  </div>
                  <div className="pt-4 border-t border-slate-100 font-mono text-[11px] font-bold text-primary">
                    ANOMALY DETECTION & QA
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* 3. MINING SECTION */}
        <section className="py-20 bg-white border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 space-y-12">
            <div className="max-w-3xl space-y-4">
              <Reveal>
                <div className="inline-block font-mono text-xs font-bold text-primary uppercase tracking-widest bg-rose-50 border border-rose-200 px-3 py-1">
                  SECTOR APPLICATION 02
                </div>
              </Reveal>
              <Reveal>
                <h2 className="font-display font-black text-3xl sm:text-4xl text-slate-900 uppercase tracking-tight">
                  Industry 4.0 in Mining
                </h2>
              </Reveal>
              <Reveal>
                <p className="text-slate-600 font-sans text-base leading-relaxed">
                  Leveraging intelligent IoT telemetry and remote control architectures to de-risk harsh mining operations.
                </p>
              </Reveal>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <Reveal>
                <div className="bg-slate-50 border border-slate-200 p-8 space-y-4 hover:border-primary/60 transition-all duration-200 group h-full flex flex-col justify-between">
                  <div className="space-y-4">
                    <div className="w-12 h-12 rounded bg-rose-50 border border-rose-200 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                      <TrendingUp className="w-6 h-6" />
                    </div>
                    <h3 className="font-display font-extrabold text-xl text-slate-900 uppercase tracking-tight">
                      Predictive Maintenance
                    </h3>
                    <p className="text-slate-600 font-sans text-sm leading-relaxed">
                      We deploy IoT sensors on mining equipment to collect data on operating conditions and performance, enabling predictive maintenance strategies that minimize unplanned downtime and extend asset lifespan.
                    </p>
                  </div>
                  <div className="pt-4 border-t border-slate-200 font-mono text-[11px] font-bold text-primary">
                    ASSET LIFESPAN EXTENSION
                  </div>
                </div>
              </Reveal>

              <Reveal>
                <div className="bg-slate-50 border border-slate-200 p-8 space-y-4 hover:border-primary/60 transition-all duration-200 group h-full flex flex-col justify-between">
                  <div className="space-y-4">
                    <div className="w-12 h-12 rounded bg-rose-50 border border-rose-200 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                      <Radio className="w-6 h-6" />
                    </div>
                    <h3 className="font-display font-extrabold text-xl text-slate-900 uppercase tracking-tight">
                      Remote Monitoring and Control
                    </h3>
                    <p className="text-slate-600 font-sans text-sm leading-relaxed">
                      Advanced telemetry systems allow for remote monitoring and control of mining operations, empowering personnel to make data-driven decisions and respond swiftly to changing conditions.
                    </p>
                  </div>
                  <div className="pt-4 border-t border-slate-200 font-mono text-[11px] font-bold text-primary">
                    DATA-DRIVEN DECISION MAKING
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* 4. HEAVY INDUSTRIES SECTION */}
        <section className="py-20 bg-slate-50 border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 space-y-12">
            <div className="max-w-3xl space-y-4">
              <Reveal>
                <div className="inline-block font-mono text-xs font-bold text-primary uppercase tracking-widest bg-rose-50 border border-rose-200 px-3 py-1">
                  SECTOR APPLICATION 03
                </div>
              </Reveal>
              <Reveal>
                <h2 className="font-display font-black text-3xl sm:text-4xl text-slate-900 uppercase tracking-tight">
                  Industry 4.0 in Heavy Industries
                </h2>
              </Reveal>
              <Reveal>
                <p className="text-slate-600 font-sans text-base leading-relaxed">
                  Connecting machinery, steel, and chemical plants through real-time telemetry and augmented maintenance guidance.
                </p>
              </Reveal>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <Reveal>
                <div className="bg-white border border-slate-200 p-8 space-y-4 hover:border-primary/60 transition-all duration-200 group h-full flex flex-col justify-between">
                  <div className="space-y-4">
                    <div className="w-12 h-12 rounded bg-rose-50 border border-rose-200 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                      <Share2 className="w-6 h-6" />
                    </div>
                    <h3 className="font-display font-extrabold text-xl text-slate-900 uppercase tracking-tight">
                      Connected Machinery and Equipment
                    </h3>
                    <p className="text-slate-600 font-sans text-sm leading-relaxed">
                      We work in other heavy industries such as steel and chemical manufacturing in equipping their machinery with IoT sensors to monitor temperature, pressure, and other critical parameters in real-time, enabling proactive maintenance and process optimization.
                    </p>
                  </div>
                  <div className="pt-4 border-t border-slate-100 font-mono text-[11px] font-bold text-primary">
                    PROACTIVE MAINTENANCE & OPTIMIZATION
                  </div>
                </div>
              </Reveal>

              <Reveal>
                <div className="bg-white border border-slate-200 p-8 space-y-4 hover:border-primary/60 transition-all duration-200 group h-full flex flex-col justify-between">
                  <div className="space-y-4">
                    <div className="w-12 h-12 rounded bg-rose-50 border border-rose-200 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                      <Glasses className="w-6 h-6" />
                    </div>
                    <h3 className="font-display font-extrabold text-xl text-slate-900 uppercase tracking-tight">
                      Augmented Reality for Maintenance and Training
                    </h3>
                    <p className="text-slate-600 font-sans text-sm leading-relaxed">
                      Augmented reality (AR) technology is revolutionizing maintenance and training processes by providing technicians with interactive guidance and remote assistance, improving efficiency and reducing errors.
                    </p>
                  </div>
                  <div className="pt-4 border-t border-slate-100 font-mono text-[11px] font-bold text-primary">
                    INTERACTIVE AR GUIDANCE
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* 5. SUMMARY & PARTNERSHIP BANNER */}
        <section className="py-20 bg-slate-950 text-white border-b border-slate-800 overflow-hidden relative">
          <div className="absolute top-0 right-0 w-96 h-96 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="max-w-5xl mx-auto px-6 lg:px-8 relative z-10 text-center space-y-8">
            <Reveal>
              <div className="inline-block font-mono text-xs font-bold text-rose-400 tracking-widest uppercase bg-rose-500/20 border border-rose-500/40 px-3 py-1">
                OUR VISION & COMMITMENT
              </div>
            </Reveal>

            <Reveal>
              <h2 className="font-display font-black text-3xl sm:text-5xl text-white uppercase tracking-tight max-w-4xl mx-auto leading-tight">
                Charting a Course Towards an Agile, Competitive, and Resilient Future
              </h2>
            </Reveal>

            <Reveal>
              <p className="text-slate-300 font-sans text-base sm:text-lg leading-relaxed max-w-3xl mx-auto">
                As cement, mining, and heavy industries embrace the principles of Industry 4.0, they stand poised to unlock unprecedented levels of efficiency, safety, and sustainability. By harnessing the power of advanced technologies and data-driven insights, these industries are charting a course towards a more agile, competitive, and resilient future.
              </p>
            </Reveal>

            <Reveal>
              <div className="p-6 bg-slate-900 border border-slate-800 font-mono text-sm sm:text-base font-bold text-rose-400 max-w-2xl mx-auto">
                MACPROTEC is your capable partner in integrating digital solutions to help you be more productive and efficient.
              </div>
            </Reveal>

            <Reveal>
              <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
                <Link
                  href="/lets-connect"
                  className="px-8 py-4 bg-primary hover:bg-rose-700 text-white font-mono text-xs font-bold uppercase tracking-wider transition-all duration-150 shadow-xl flex items-center gap-2 group"
                >
                  <span>Partner With MACPROTEC</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>

                <Link
                  href="/solutions"
                  className="px-8 py-4 bg-slate-900 border border-slate-700 hover:border-rose-500 text-slate-200 hover:text-white font-mono text-xs font-bold uppercase tracking-wider transition-all duration-150 flex items-center gap-2"
                >
                  <span>Explore Digital Solutions</span>
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
