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
  Flame,
  Activity,
  Sliders,
  Settings,
  Scale,
  DollarSign,
  GraduationCap,
  Headphones,
  FileCheck,
  CheckSquare,
} from "lucide-react";

export default function PetrochemicalPage() {
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
              <span className="text-primary font-bold">Petrochemical</span>
            </div>
            <div className="hidden sm:flex items-center gap-3 text-[10px] text-slate-400">
              <span className="font-bold text-rose-400">SECTOR 06</span>
              <span>•</span>
              <span>PETROCHEMICAL & REFINING TECHNICAL SERVICES</span>
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
                    <span>OUR EXPERTISE // PETROCHEMICAL & REFINING</span>
                  </div>
                </Reveal>

                <Reveal>
                  <h1 className="font-display font-extrabold text-2xl sm:text-3xl lg:text-4xl text-slate-900 uppercase tracking-tight leading-[1.15]">
                    Petrochemical & Chemical <span className="text-primary">Technical Services</span>
                  </h1>
                </Reveal>

                <Reveal>
                  <p className="text-sm text-slate-600 font-sans leading-relaxed max-w-2xl">
                    Technical services for the petrochemical industries encompass a wide range of specialized solutions and expertise tailored to the unique needs of petrochemical facilities, refineries, and chemical processing plants. These services are essential for optimizing operations, ensuring safety and compliance, and maximizing efficiency and profitability in the petrochemical sector.
                  </p>
                </Reveal>

                {/* Hero Badges */}
                <Reveal>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 pt-1">
                    <div className="bg-slate-50 border border-slate-200 p-2.5 rounded font-mono text-[11px] text-slate-800 font-bold flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-primary shrink-0" />
                      <span>Process Optimization</span>
                    </div>
                    <div className="bg-slate-50 border border-slate-200 p-2.5 rounded font-mono text-[11px] text-slate-800 font-bold flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-primary shrink-0" />
                      <span>Debottlenecking Studies</span>
                    </div>
                    <div className="bg-slate-50 border border-slate-200 p-2.5 rounded font-mono text-[11px] text-slate-800 font-bold flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-primary shrink-0" />
                      <span>Asset Integrity Management</span>
                    </div>
                    <div className="bg-slate-50 border border-slate-200 p-2.5 rounded font-mono text-[11px] text-slate-800 font-bold flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-primary shrink-0" />
                      <span>Control System Design</span>
                    </div>
                    <div className="bg-slate-50 border border-slate-200 p-2.5 rounded font-mono text-[11px] text-slate-800 font-bold flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-primary shrink-0" />
                      <span>EPCC Project Execution</span>
                    </div>
                  </div>
                </Reveal>

                {/* Hero Action Buttons */}
                <Reveal>
                  <div className="flex flex-wrap items-center gap-4 pt-3">
                    <a
                      href="#petrochemical-services"
                      className="px-6 py-3.5 bg-primary hover:bg-rose-700 text-white font-mono text-xs font-bold uppercase tracking-wider transition-all duration-150 shadow-md flex items-center gap-2 group"
                    >
                      <span>Explore Technical Services</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </a>

                    <Link
                      href="/lets-connect"
                      className="px-6 py-3.5 bg-white border border-slate-300 hover:border-slate-900 text-slate-800 font-mono text-xs font-bold uppercase tracking-wider transition-all duration-150 flex items-center gap-2 hover:bg-slate-50"
                    >
                      <span>Consult Petrochemical Engineers</span>
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
                      src="/images/petrochemical_industry.png"
                      alt="MACPROTEC Petrochemical Refinery Facility"
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
                          PETROCHEMICAL & REFINING ENGINEERING
                        </div>
                      </div>
                      <div className="w-10 h-10 rounded bg-primary/20 border border-primary/40 flex items-center justify-center text-primary shrink-0">
                        <Flame className="w-5 h-5" />
                      </div>
                    </div>
                  </div>
                </Reveal>
              </div>
            </div>
          </div>
        </section>

        {/* 2. TECHNICAL SERVICES OFFERED BY MACPROTEC */}
        <section id="petrochemical-services" className="py-20 bg-slate-50 border-b border-slate-200 scroll-mt-10">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 space-y-12">
            <div className="max-w-3xl space-y-4">
              <Reveal>
                <div className="inline-block font-mono text-xs font-bold text-primary uppercase tracking-widest bg-rose-50 border border-rose-200 px-3 py-1">
                  MACPROTEC TECHNICAL SERVICES CATALOG
                </div>
              </Reveal>
              <Reveal>
                <h2 className="font-display font-black text-3xl sm:text-4xl text-slate-900 uppercase tracking-tight">
                  Comprehensive Petrochemical Engineering Services
                </h2>
              </Reveal>
              <Reveal>
                <p className="text-slate-600 font-sans text-base leading-relaxed">
                  MACPROTEC offers specialized technical solutions across process simulation, equipment design, asset integrity, automation, process safety, and EPCC project execution.
                </p>
              </Reveal>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* 1. Process Optimization */}
              <Reveal>
                <div className="bg-white border border-slate-200 p-6 space-y-3 h-full flex flex-col justify-between hover:border-primary/60 transition-all duration-200 group">
                  <div className="space-y-3">
                    <div className="w-10 h-10 rounded bg-rose-50 border border-rose-200 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                      <TrendingUp className="w-5 h-5" />
                    </div>
                    <h3 className="font-display font-extrabold text-lg text-slate-900 uppercase tracking-tight">
                      Process Optimization
                    </h3>
                    <p className="text-xs text-slate-600 font-sans leading-relaxed">
                      Utilizing advanced modeling, simulation, and analysis techniques to optimize process parameters, improve product quality, and maximize throughput while minimizing energy consumption and waste generation.
                    </p>
                  </div>
                  <div className="pt-3 border-t border-slate-100 font-mono text-[10px] font-bold text-primary">
                    SIMULATION & THROUGHPUT MAXIMIZATION
                  </div>
                </div>
              </Reveal>

              {/* 2. Debottlenecking Studies */}
              <Reveal>
                <div className="bg-white border border-slate-200 p-6 space-y-3 h-full flex flex-col justify-between hover:border-primary/60 transition-all duration-200 group">
                  <div className="space-y-3">
                    <div className="w-10 h-10 rounded bg-rose-50 border border-rose-200 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                      <Sliders className="w-5 h-5" />
                    </div>
                    <h3 className="font-display font-extrabold text-lg text-slate-900 uppercase tracking-tight">
                      Debottlenecking Studies
                    </h3>
                    <p className="text-xs text-slate-600 font-sans leading-relaxed">
                      Identifying and resolving bottlenecks and inefficiencies in process units to increase plant capacity, enhance performance, and achieve production targets.
                    </p>
                  </div>
                  <div className="pt-3 border-t border-slate-100 font-mono text-[10px] font-bold text-primary">
                    CAPACITY EXPANSION & FLOW UNLOCKING
                  </div>
                </div>
              </Reveal>

              {/* 3. Troubleshooting */}
              <Reveal>
                <div className="bg-white border border-slate-200 p-6 space-y-3 h-full flex flex-col justify-between hover:border-primary/60 transition-all duration-200 group">
                  <div className="space-y-3">
                    <div className="w-10 h-10 rounded bg-rose-50 border border-rose-200 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                      <Wrench className="w-5 h-5" />
                    </div>
                    <h3 className="font-display font-extrabold text-lg text-slate-900 uppercase tracking-tight">
                      Troubleshooting
                    </h3>
                    <p className="text-xs text-slate-600 font-sans leading-relaxed">
                      Investigating process upsets, equipment failures, and performance deviations to identify root causes and implement corrective actions to restore normal operations.
                    </p>
                  </div>
                  <div className="pt-3 border-t border-slate-100 font-mono text-[10px] font-bold text-primary">
                    ROOT CAUSE FAILURE ANALYSIS (RCFA)
                  </div>
                </div>
              </Reveal>

              {/* 4. Equipment Design and Selection */}
              <Reveal>
                <div className="bg-white border border-slate-200 p-6 space-y-3 h-full flex flex-col justify-between hover:border-primary/60 transition-all duration-200 group">
                  <div className="space-y-3">
                    <div className="w-10 h-10 rounded bg-rose-50 border border-rose-200 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                      <Settings className="w-5 h-5" />
                    </div>
                    <h3 className="font-display font-extrabold text-lg text-slate-900 uppercase tracking-tight">
                      Equipment Design & Selection
                    </h3>
                    <p className="text-xs text-slate-600 font-sans leading-relaxed">
                      Designing, specifying, and selecting machinery for petrochemical processes—including pumps, compressors, heat exchangers, reactors, and distillation columns—to meet performance, reliability, and safety requirements.
                    </p>
                  </div>
                  <div className="pt-3 border-t border-slate-100 font-mono text-[10px] font-bold text-primary">
                    REACTORS, COLUMNS & COMPRESSORS
                  </div>
                </div>
              </Reveal>

              {/* 5. Asset Integrity Management */}
              <Reveal>
                <div className="bg-white border border-slate-200 p-6 space-y-3 h-full flex flex-col justify-between hover:border-primary/60 transition-all duration-200 group">
                  <div className="space-y-3">
                    <div className="w-10 h-10 rounded bg-rose-50 border border-rose-200 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                      <ShieldCheck className="w-5 h-5" />
                    </div>
                    <h3 className="font-display font-extrabold text-lg text-slate-900 uppercase tracking-tight">
                      Asset Integrity Management
                    </h3>
                    <p className="text-xs text-slate-600 font-sans leading-relaxed">
                      Implementing inspection, maintenance, and reliability programs to ensure the integrity and reliability of mechanical equipment, prevent failures, and extend equipment lifespan.
                    </p>
                  </div>
                  <div className="pt-3 border-t border-slate-100 font-mono text-[10px] font-bold text-primary">
                    MECHANICAL INTEGRITY & RELIABILITY
                  </div>
                </div>
              </Reveal>

              {/* 6. Control System Design */}
              <Reveal>
                <div className="bg-white border border-slate-200 p-6 space-y-3 h-full flex flex-col justify-between hover:border-primary/60 transition-all duration-200 group">
                  <div className="space-y-3">
                    <div className="w-10 h-10 rounded bg-rose-50 border border-rose-200 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                      <Cpu className="w-5 h-5" />
                    </div>
                    <h3 className="font-display font-extrabold text-lg text-slate-900 uppercase tracking-tight">
                      Control System Design
                    </h3>
                    <p className="text-xs text-slate-600 font-sans leading-relaxed">
                      Designing, configuring, and programming distributed control systems (DCS), programmable logic controllers (PLC), and supervisory control and data acquisition (SCADA) systems to automate and optimize process operations.
                    </p>
                  </div>
                  <div className="pt-3 border-t border-slate-100 font-mono text-[10px] font-bold text-primary">
                    DCS, PLC & SCADA PROGRAMMING
                  </div>
                </div>
              </Reveal>

              {/* 7. Instrumentation Selection */}
              <Reveal>
                <div className="bg-white border border-slate-200 p-6 space-y-3 h-full flex flex-col justify-between hover:border-primary/60 transition-all duration-200 group">
                  <div className="space-y-3">
                    <div className="w-10 h-10 rounded bg-rose-50 border border-rose-200 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                      <Activity className="w-5 h-5" />
                    </div>
                    <h3 className="font-display font-extrabold text-lg text-slate-900 uppercase tracking-tight">
                      Instrumentation Selection
                    </h3>
                    <p className="text-xs text-slate-600 font-sans leading-relaxed">
                      Selecting and specifying instrumentation and control devices, such as sensors, transmitters, valves, and actuators, to monitor process variables, control equipment, and ensure safety and regulatory compliance.
                    </p>
                  </div>
                  <div className="pt-3 border-t border-slate-100 font-mono text-[10px] font-bold text-primary">
                    VALVES, SENSORS & TRANSMITTERS
                  </div>
                </div>
              </Reveal>

              {/* 8. Process Safety Management */}
              <Reveal>
                <div className="bg-white border border-slate-200 p-6 space-y-3 h-full flex flex-col justify-between hover:border-primary/60 transition-all duration-200 group">
                  <div className="space-y-3">
                    <div className="w-10 h-10 rounded bg-rose-50 border border-rose-200 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                      <FileCheck className="w-5 h-5" />
                    </div>
                    <h3 className="font-display font-extrabold text-lg text-slate-900 uppercase tracking-tight">
                      Process Safety Management (PSM)
                    </h3>
                    <p className="text-xs text-slate-600 font-sans leading-relaxed">
                      Conducting hazard and risk assessments (HAZOP/SIL), process safety audits, and management of change (MOC) reviews to identify, evaluate, and mitigate process safety hazards and prevent incidents.
                    </p>
                  </div>
                  <div className="pt-3 border-t border-slate-100 font-mono text-[10px] font-bold text-primary">
                    HAZOP, SIL & MANAGEMENT OF CHANGE
                  </div>
                </div>
              </Reveal>

              {/* 9. Environmental Compliance */}
              <Reveal>
                <div className="bg-white border border-slate-200 p-6 space-y-3 h-full flex flex-col justify-between hover:border-primary/60 transition-all duration-200 group">
                  <div className="space-y-3">
                    <div className="w-10 h-10 rounded bg-rose-50 border border-rose-200 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                      <Scale className="w-5 h-5" />
                    </div>
                    <h3 className="font-display font-extrabold text-lg text-slate-900 uppercase tracking-tight">
                      Environmental Compliance
                    </h3>
                    <p className="text-xs text-slate-600 font-sans leading-relaxed">
                      Developing and implementing environmental management systems (EMS), pollution prevention plans (P2), and emission control strategies to comply with regulatory requirements and achieve sustainability goals.
                    </p>
                  </div>
                  <div className="pt-3 border-t border-slate-100 font-mono text-[10px] font-bold text-primary">
                    EMS, P2 & EMISSION CONTROL
                  </div>
                </div>
              </Reveal>

              {/* 10. Project Planning and Execution */}
              <Reveal>
                <div className="bg-white border border-slate-200 p-6 space-y-3 h-full flex flex-col justify-between hover:border-primary/60 transition-all duration-200 group">
                  <div className="space-y-3">
                    <div className="w-10 h-10 rounded bg-rose-50 border border-rose-200 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                      <Factory className="w-5 h-5" />
                    </div>
                    <h3 className="font-display font-extrabold text-lg text-slate-900 uppercase tracking-tight">
                      Project Planning & EPCC Execution
                    </h3>
                    <p className="text-xs text-slate-600 font-sans leading-relaxed">
                      Managing engineering, procurement, construction, and commissioning (EPCC) projects for new installations, upgrades, expansions, and debottlenecking initiatives, ensuring timely delivery and quality assurance.
                    </p>
                  </div>
                  <div className="pt-3 border-t border-slate-100 font-mono text-[10px] font-bold text-primary">
                    EPCC CONTRACT MANAGEMENT
                  </div>
                </div>
              </Reveal>

              {/* 11. Cost Estimation and Feasibility Studies */}
              <Reveal>
                <div className="bg-white border border-slate-200 p-6 space-y-3 h-full flex flex-col justify-between hover:border-primary/60 transition-all duration-200 group">
                  <div className="space-y-3">
                    <div className="w-10 h-10 rounded bg-rose-50 border border-rose-200 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                      <DollarSign className="w-5 h-5" />
                    </div>
                    <h3 className="font-display font-extrabold text-lg text-slate-900 uppercase tracking-tight">
                      Cost Estimation & Feasibility
                    </h3>
                    <p className="text-xs text-slate-600 font-sans leading-relaxed">
                      Conducting feasibility studies, cost estimates, and economic evaluations for capital investment projects, evaluating project viability, risks, and return on investment (ROI).
                    </p>
                  </div>
                  <div className="pt-3 border-t border-slate-100 font-mono text-[10px] font-bold text-primary">
                    CAPEX FEASIBILITY & ROI EVALUATION
                  </div>
                </div>
              </Reveal>

              {/* 12. Operator Training & Support */}
              <Reveal>
                <div className="bg-white border border-slate-200 p-6 space-y-3 h-full flex flex-col justify-between hover:border-primary/60 transition-all duration-200 group">
                  <div className="space-y-3">
                    <div className="w-10 h-10 rounded bg-rose-50 border border-rose-200 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                      <GraduationCap className="w-5 h-5" />
                    </div>
                    <h3 className="font-display font-extrabold text-lg text-slate-900 uppercase tracking-tight">
                      Operator Training & Technical Support
                    </h3>
                    <p className="text-xs text-slate-600 font-sans leading-relaxed">
                      Providing customized training programs, operator competency assessments, onsite technical support, and remote troubleshooting assistance to optimize performance and ensure operational continuity.
                    </p>
                  </div>
                  <div className="pt-3 border-t border-slate-100 font-mono text-[10px] font-bold text-primary">
                    COMPETENCY & ONSITE SUPPORT
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* 3. CLOSING COMMITMENT BANNER */}
        <section className="py-20 bg-slate-950 text-white border-b border-slate-800 overflow-hidden relative">
          <div className="absolute top-0 right-0 w-96 h-96 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="max-w-5xl mx-auto px-6 lg:px-8 relative z-10 text-center space-y-8">
            <Reveal>
              <div className="inline-block font-mono text-xs font-bold text-rose-400 tracking-widest uppercase bg-rose-500/20 border border-rose-500/40 px-3 py-1">
                PETROCHEMICAL ENGINEERING EXCELLENCE
              </div>
            </Reveal>

            <Reveal>
              <h2 className="font-display font-black text-3xl sm:text-5xl text-white uppercase tracking-tight max-w-4xl mx-auto leading-tight">
                Optimize Petrochemical Facilities for Maximum Profitability & Safety
              </h2>
            </Reveal>

            <Reveal>
              <p className="text-slate-300 font-sans text-base sm:text-lg leading-relaxed max-w-3xl mx-auto">
                From process simulation and debottlenecking to DCS control programming, HAZOP safety management, and EPCC project execution, MACPROTEC delivers world-class technical services tailored to refineries and chemical processing plants.
              </p>
            </Reveal>

            <Reveal>
              <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
                <Link
                  href="/lets-connect"
                  className="px-8 py-4 bg-primary hover:bg-rose-700 text-white font-mono text-xs font-bold uppercase tracking-wider transition-all duration-150 shadow-xl flex items-center gap-2 group"
                >
                  <span>Consult Petrochemical Engineers</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>

                <Link
                  href="/solutions"
                  className="px-8 py-4 bg-slate-900 border border-slate-700 hover:border-rose-500 text-slate-200 hover:text-white font-mono text-xs font-bold uppercase tracking-wider transition-all duration-150 flex items-center gap-2"
                >
                  <span>Explore Technical Solutions</span>
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
