"use client";

import { useState } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import TechnicalCursor from "@/components/ui/TechnicalCursor";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import Link from "next/link";
import Image from "next/image";
import { OILGAS_SERVICES, OilGasService } from "@/lib/oilgas-data";
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
  Gauge,
  Workflow,
  Compass,
  Award,
  Check,
  FileCheck,
  ClipboardList,
  Wind,
  Activity,
  Zap,
  Target,
  FileText,
  Boxes,
} from "lucide-react";

const WHY_CHOOSE_SIMULATION = [
  {
    title: "Deep Oil & Gas Domain Expertise",
    desc: "Specialized process, thermal, and fluid dynamics engineers with extensive experience across upstream production, subsea pipelines, offshore platforms, and processing plants.",
    icon: Factory,
  },
  {
    title: "Advanced Multiphase & Slugging Physics",
    desc: "High-fidelity Euler-Lagrangian and Volume of Fluid (VOF) CFD modeling of gas-liquid-liquid multiphase flows, droplet breakup, and severe slugging dynamics.",
    icon: Flame,
  },
  {
    title: "Zero Risk Virtual Design Validation",
    desc: "Test separator internals modifications, riser geometry changes, and flare burner upgrades in a high-accuracy digital twin before physical fabrication.",
    icon: Cpu,
  },
  {
    title: "Code-Compliant Engineering Deliverables",
    desc: "Detailed velocity contours, phase volume fraction maps, ASME B31.3 pipe stress reports, and FEA calculations certified for operator safety reviews.",
    icon: FileText,
  },
  {
    title: "Safety & Gas Dispersion Compliance",
    desc: "Comprehensive flare thermal radiation maps and atmospheric gas dispersion modeling to ensure environmental compliance and personnel safety.",
    icon: Zap,
  },
  {
    title: "Proven Root Cause Failure Diagnostics",
    desc: "Track record of diagnosing severe flow maldistribution, separator liquid carryover, piping vibration, and thermal hot spots in major energy assets worldwide.",
    icon: Award,
  },
];

export default function OilGasCfdPage() {
  const [activeServiceId, setActiveServiceId] = useState<string>("01");

  const activeService =
    OILGAS_SERVICES.find((s) => s.id === activeServiceId) || OILGAS_SERVICES[0];

  const handleServiceSelect = (id: string) => {
    setActiveServiceId(id);
    const element = document.getElementById("detailed-dossier");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <TechnicalCursor />
      <Header />

      <main className="bg-background min-h-screen py-20 lg:py-24 space-y-20">
        {/* Header Hero Section */}
        <section className="max-w-7xl mx-auto px-6 lg:px-8 pt-6">
          <div className="border border-border p-8 sm:p-12 lg:p-16 bg-white relative overflow-hidden shadow-sm">
            <div className="absolute top-0 right-0 w-64 h-64 border-b border-l border-primary/20 opacity-20 pointer-events-none" />
            <div className="absolute top-4 right-4 font-mono text-[9px] text-slate-400">
              SECTOR DOSSIER / OIL-GAS-CFD
            </div>

            <Reveal>
              <div className="font-mono text-[11px] font-bold text-primary tracking-widest uppercase mb-4 flex items-center gap-2">
                <span className="text-primary font-bold">┌</span>
                <Link
                  href="/solutions/cfd-engineering"
                  className="hover:underline text-slate-500"
                >
                  CFD & SIMULATION
                </Link>
                <span>/</span>
                <span className="text-foreground">OIL & GAS INDUSTRY</span>
              </div>

              <div className="inline-flex items-center gap-2 px-3 py-1 bg-rose-50 border border-rose-200 text-primary font-mono text-[10px] font-bold uppercase tracking-wider mb-6">
                <Sparkles className="w-3.5 h-3.5" />
                <span>MACPROTEC Specialized Energy Expertise Center</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-extrabold text-foreground uppercase tracking-tight leading-tight max-w-5xl mb-6">
                Oil & Gas Industry <br />
                <span className="text-primary">CFD & Process Simulation</span>
              </h1>

              <p className="body-md text-secondary max-w-4xl leading-relaxed font-sans mb-8">
                MACPROTEC provides comprehensive Computational Fluid Dynamics (CFD), multiphase flow assurance,
                flare combustion, separator internals optimization, heat exchanger thermal analysis, pipe stress analysis,
                and root cause investigation tailored specifically to upstream, midstream, and downstream oil & gas assets.
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-border">
                <a
                  href="#service-cards"
                  className="px-6 py-3 bg-primary text-white font-mono text-xs font-bold uppercase tracking-wider hover:bg-rose-700 transition-colors inline-flex items-center gap-2"
                >
                  <span>Explore 9 Engineering Services</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
                <Link
                  href="/lets-connect"
                  className="px-6 py-3 bg-slate-900 text-white font-mono text-xs font-bold uppercase tracking-wider hover:bg-slate-800 transition-colors inline-flex items-center gap-2"
                >
                  <span>Request Simulation Proposal</span>
                </Link>
              </div>
            </Reveal>
          </div>
        </section>

        {/* Expertise Strength Alert Banner */}
        <section className="max-w-7xl mx-auto px-6 lg:px-8">
          <Reveal>
            <div className="bg-[#2d1b47] text-white p-6 sm:p-8 border border-[#3e2663] relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-primary/20 border border-primary/40 flex items-center justify-center text-primary shrink-0">
                  <Factory className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <div className="font-mono text-[10px] font-bold text-primary tracking-widest uppercase mb-1">
                    PRIMARY CORE DOMAIN
                  </div>
                  <h3 className="font-display font-extrabold text-lg text-white uppercase tracking-tight">
                    MACPROTEC Specialized Oil & Gas Discipline
                  </h3>
                  <p className="text-xs text-slate-300 font-sans mt-0.5">
                    Our engineering domain covers multiphase pipeline flow assurance, separator vessel efficiency, flare radiation, heat exchangers, and pipe stress FEA.
                  </p>
                </div>
              </div>

              <div className="shrink-0 font-mono text-xs text-slate-300 bg-[#201235] px-4 py-2 border border-[#3e2663]">
                <span className="text-primary font-bold">9</span> SPECIALIZED MODULES
              </div>
            </div>
          </Reveal>
        </section>

        {/* Engineering Services Cards Grid (Page 1-3 of PDF Instruction) */}
        <section id="service-cards" className="max-w-7xl mx-auto px-6 lg:px-8 space-y-8">
          <Reveal>
            <div className="font-mono text-[11px] font-bold text-primary tracking-widest uppercase mb-2">
              <span className="text-primary font-bold mr-1">┌</span> APPLIED OIL & GAS ENGINEERING SERVICES
            </div>
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-foreground uppercase tracking-tight">
              Engineering <span className="text-primary">Services</span>
            </h2>
            <p className="font-mono text-sm font-semibold text-secondary max-w-3xl mt-2">
              Cards for MACPROTEC specialized CFD and process engineering disciplines applied to oil & gas operations. Click any card to inspect its complete technical dossier below.
            </p>
          </Reveal>

          <RevealGroup className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6" stagger={0.04}>
            {OILGAS_SERVICES.map((svc) => (
              <RevealItem key={svc.id}>
                <div
                  onClick={() => handleServiceSelect(svc.id)}
                  className={`group bg-white border cursor-pointer transition-all duration-200 flex flex-col justify-between h-full relative overflow-hidden shadow-sm hover:shadow-md ${
                    activeServiceId === svc.id
                      ? "border-primary ring-2 ring-primary/20"
                      : "border-border hover:border-primary/60"
                  }`}
                >
                  {/* Image Container */}
                  <div className="relative h-52 w-full bg-slate-900 overflow-hidden">
                    <Image
                      src={svc.image}
                      alt={svc.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                    <div className="absolute top-3 left-3 font-mono text-[10px] font-bold px-2 py-0.5 bg-primary text-white uppercase tracking-wider">
                      {svc.id} / {svc.badge}
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                    <div>
                      <h3 className="font-display font-extrabold text-base text-foreground group-hover:text-primary transition-colors uppercase leading-snug mb-2">
                        {svc.title}
                      </h3>
                      <p className="text-xs text-secondary font-sans leading-relaxed line-clamp-3">
                        {svc.shortDescription}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-border/60">
                      <div className="flex items-center justify-between font-mono text-[10px] font-bold text-primary group-hover:text-rose-700 uppercase tracking-widest">
                        <span>View Technical Dossier</span>
                        <ChevronRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </div>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </section>

        {/* Detailed Service Dossier Showcase Section */}
        <section id="detailed-dossier" className="max-w-7xl mx-auto px-6 lg:px-8 space-y-8 pt-10">
          <Reveal>
            <div className="font-mono text-[11px] font-bold text-primary tracking-widest uppercase mb-2">
              <span className="text-primary font-bold mr-1">┌</span> COMPREHENSIVE DOSSIER SHOWCASE
            </div>
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-foreground uppercase tracking-tight">
              Service <span className="text-primary">Technical Dossier</span>
            </h2>
            <p className="font-mono text-sm font-semibold text-secondary">
              Detailed physics specifications, deliverables, engineering analyses, and key benefits.
            </p>
          </Reveal>

          {/* Interactive Selector Bar */}
          <Reveal>
            <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none border-b border-border">
              {OILGAS_SERVICES.map((s) => (
                <button
                  key={s.id}
                  onClick={() => setActiveServiceId(s.id)}
                  className={`px-4 py-2.5 font-mono text-xs font-bold uppercase tracking-wider whitespace-nowrap border transition-all flex items-center gap-2 shrink-0 ${
                    activeServiceId === s.id
                      ? "bg-primary text-white border-primary shadow-sm"
                      : "bg-white text-secondary border-border hover:border-slate-400 hover:text-foreground"
                  }`}
                >
                  <span className="opacity-70">{s.id}.</span>
                  <span>{s.title.replace(" CFD Analysis", "").replace(" Analysis", "").replace(" & Support Design", "")}</span>
                </button>
              ))}
            </div>
          </Reveal>

          {/* Active Service Detailed View Card */}
          <Reveal key={activeService.id}>
            <div className="bg-white border border-border p-8 sm:p-12 shadow-sm space-y-12">
              {/* Service Hero Header */}
              <div className="grid lg:grid-cols-12 gap-8 items-center border-b border-border pb-10">
                <div className="lg:col-span-7 space-y-4">
                  <div className="font-mono text-xs font-bold text-primary tracking-widest uppercase flex items-center gap-2">
                    <span className="w-2 h-2 bg-primary rounded-full" />
                    SERVICE DOSSIER {activeService.id} / {activeService.badge}
                  </div>
                  <h3 className="font-display font-extrabold text-3xl sm:text-4xl text-foreground uppercase tracking-tight leading-tight">
                    {activeService.title}
                  </h3>
                  <div className="space-y-3 pt-2">
                    {activeService.description.map((para, i) => (
                      <p key={i} className="text-secondary text-sm sm:text-base leading-relaxed font-sans">
                        {para}
                      </p>
                    ))}
                  </div>
                </div>

                <div className="lg:col-span-5">
                  <div className="border border-border p-2 bg-slate-50 relative group">
                    <div className="relative h-64 sm:h-72 w-full bg-slate-900 overflow-hidden border border-border">
                      <Image
                        src={activeService.image}
                        alt={activeService.title}
                        fill
                        className="object-contain p-2 group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-3 bg-white border-t border-border flex items-center justify-between font-mono text-[10px] text-slate-500">
                      <span>FIGURE {activeService.id}: {activeService.title.toUpperCase()}</span>
                      <span className="text-primary font-bold">HIGH FIDELITY CFD/FEA</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* 4 Quadrants: Applications, Key Analyses, Deliverables, Key Benefits */}
              <div className="grid md:grid-cols-2 gap-8">
                {/* Quadrant 1: Applications */}
                <div className="bg-slate-50 border border-border p-6 sm:p-8 space-y-4">
                  <div className="flex items-center gap-2 text-primary font-mono text-xs font-bold uppercase tracking-wider border-b border-border pb-3">
                    <Target className="w-4 h-4" />
                    <span>Target Equipment & Applications ({activeService.applications.length})</span>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-2.5 pt-2">
                    {activeService.applications.map((app, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-2 p-2.5 bg-white border border-border text-xs font-mono text-foreground font-semibold"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                        <span className="truncate">{app}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Quadrant 2: Key Engineering Analyses */}
                <div className="bg-slate-50 border border-border p-6 sm:p-8 space-y-4">
                  <div className="flex items-center gap-2 text-primary font-mono text-xs font-bold uppercase tracking-wider border-b border-border pb-3">
                    <Activity className="w-4 h-4" />
                    <span>Key Engineering Analyses ({activeService.keyAnalyses.length})</span>
                  </div>
                  <ul className="space-y-2 pt-2">
                    {activeService.keyAnalyses.map((ana, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-xs text-secondary font-sans leading-snug">
                        <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                        <span>{ana}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Quadrant 3: Deliverables */}
                <div className="bg-slate-50 border border-border p-6 sm:p-8 space-y-4">
                  <div className="flex items-center gap-2 text-primary font-mono text-xs font-bold uppercase tracking-wider border-b border-border pb-3">
                    <ClipboardList className="w-4 h-4" />
                    <span>Engineering Deliverables ({activeService.deliverables.length})</span>
                  </div>
                  <ul className="space-y-2 pt-2">
                    {activeService.deliverables.map((del, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-xs text-secondary font-sans leading-snug">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{del}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Quadrant 4: Key Benefits */}
                <div className="bg-slate-50 border border-border p-6 sm:p-8 space-y-4">
                  <div className="flex items-center gap-2 text-primary font-mono text-xs font-bold uppercase tracking-wider border-b border-border pb-3">
                    <Award className="w-4 h-4" />
                    <span>Key Project Benefits ({activeService.keyBenefits.length})</span>
                  </div>
                  <ul className="space-y-2 pt-2">
                    {activeService.keyBenefits.map((ben, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-xs text-secondary font-sans leading-snug">
                        <Sparkles className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                        <span>{ben}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </Reveal>
        </section>

        {/* WHY CHOOSE MACPROTEC FOR SIMULATION? (PDF Requirement) */}
        <section className="py-20 bg-[#201235] text-white border-y border-[#3e2663] relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none" />

          <div className="max-w-7xl mx-auto px-6 lg:px-8 space-y-16 relative z-10">
            {/* Section Header */}
            <div className="text-center max-w-3xl mx-auto space-y-4">
              <Reveal>
                <div className="inline-block font-mono text-xs font-bold text-white tracking-widest uppercase bg-rose-500/20 border border-rose-500/40 px-3 py-1">
                  WHY CHOOSE MACPROTEC
                </div>
              </Reveal>

              <Reveal>
                <h2 className="font-display font-black text-3xl sm:text-4xl lg:text-5xl text-white uppercase tracking-tight">
                  Why Choose MACPROTEC for Simulation?
                </h2>
              </Reveal>

              <Reveal>
                <p className="text-slate-300 font-sans text-base leading-relaxed">
                  We combine deep oil and gas process knowledge with advanced computational physics to solve complex multiphase, thermal, and structural challenges.
                </p>
              </Reveal>
            </div>

            {/* 6 Feature Grid Cards */}
            <RevealGroup className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8" stagger={0.06}>
              {WHY_CHOOSE_SIMULATION.map((item, idx) => {
                const IconComp = item.icon;
                return (
                  <RevealItem key={idx}>
                    <div className="bg-[#2d1b47] border border-[#3e2663] p-8 space-y-4 hover:border-primary/60 transition-all duration-300 group h-full">
                      <div className="w-12 h-12 rounded bg-rose-500/10 border border-rose-500/30 text-primary flex items-center justify-center shrink-0">
                        <IconComp className="w-6 h-6 text-primary" />
                      </div>

                      <h3 className="font-display font-extrabold text-xl text-white uppercase tracking-tight group-hover:text-rose-300 transition-colors">
                        {item.title}
                      </h3>

                      <p className="text-xs text-slate-300 font-sans leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </RevealItem>
                );
              })}
            </RevealGroup>
          </div>
        </section>

        {/* Contact CTA */}
        <section className="max-w-7xl mx-auto px-6 lg:px-8">
          <Reveal>
            <div className="bg-slate-900 text-white p-10 sm:p-14 border border-slate-800 relative overflow-hidden shadow-2xl flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="max-w-2xl">
                <div className="font-mono text-xs font-bold text-primary tracking-widest uppercase mb-3 flex items-center gap-2">
                  <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                  CONSULT SENIOR OIL & GAS SIMULATION ENGINEERS
                </div>
                <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-white uppercase tracking-tight leading-tight">
                  Optimize Your Energy & Process Operations <br />
                  <span className="text-primary">Get a Tailored Simulation Proposal</span>
                </h2>
                <p className="text-slate-300 text-sm sm:text-base font-sans mt-4 leading-relaxed">
                  Connect with our senior engineering team to evaluate fluid properties, operating scenarios, CAD geometry, and target performance improvements.
                </p>
              </div>

              <div className="shrink-0">
                <Link
                  href="/lets-connect"
                  className="inline-flex items-center gap-3 px-8 py-4 bg-primary text-white font-mono text-xs font-bold tracking-widest uppercase hover:bg-rose-700 transition-colors shadow-lg"
                >
                  <span>LET'S CONNECT</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </Reveal>
        </section>
      </main>

      <Footer />
    </>
  );
}
