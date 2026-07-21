"use client";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import TechnicalCursor from "@/components/ui/TechnicalCursor";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import Link from "next/link";
import { cfdIndustries, cfdCoreServices } from "@/lib/cfd-data";
import {
  Cpu,
  Layers,
  ShieldCheck,
  Award,
  Factory,
  ArrowRight,
  Sparkles,
  Activity,
  Flame,
  Wrench,
  Gauge,
  Workflow,
  Compass,
} from "lucide-react";

export default function CfdEngineeringPage() {
  const whyMacprotecCards = [
    {
      title: "Industry Expertise",
      desc: "Engineering experience across cement and heavy process industries.",
      icon: Factory,
    },
    {
      title: "Engineering Driven",
      desc: "Solutions developed by experienced process engineers, not software operators.",
      icon: ShieldCheck,
    },
    {
      title: "Actionable Recommendations",
      desc: "Simulation results translated directly into practical plant improvements.",
      icon: Workflow,
    },
    {
      title: "Integrated Engineering",
      desc: "Process, mechanical, CFD, thermal, and digital engineering under one unified team.",
      icon: Layers,
    },
  ];

  return (
    <>
      <TechnicalCursor />
      <Header />

      <main className="bg-background min-h-screen py-20 lg:py-24 space-y-24">
        {/* 1. Hero Banner */}
        <section className="max-w-7xl mx-auto px-6 lg:px-8 pt-10">
          <div className="border border-border p-10 sm:p-14 bg-white relative overflow-hidden shadow-sm">
            <div className="absolute top-0 right-0 w-40 h-40 border-b border-l border-primary/20 opacity-20 pointer-events-none" />
            <div className="absolute top-4 right-4 font-mono text-[9px] text-slate-400">
              SIMULATION / DOSSIER [CFD-01]
            </div>

            <Reveal>
              <div className="font-mono text-[11px] font-bold text-primary tracking-widest uppercase mb-4 flex items-center gap-2">
                <span className="text-primary font-bold">┌</span>
                <span className="inline-block w-2 h-2 bg-primary rounded-full animate-pulse" />
                CFD & ENGINEERING SIMULATION
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-extrabold text-foreground uppercase tracking-tight leading-tight max-w-4xl mb-6">
                Engineering the Invisible. <br />
                <span className="text-primary">Optimizing the Impossible.</span>
              </h1>
              <p className="body-md text-secondary max-w-3xl leading-relaxed font-sans mb-8">
                Fluid flow, heat transfer, combustion, structural integrity, and particle behaviour
                define the performance of every industrial facility. MACPROTEC transforms complex
                engineering challenges into practical solutions through advanced simulation and digital
                engineering.
              </p>

              <div className="flex flex-wrap gap-4">
                <a
                  href="#industries"
                  className="inline-flex items-center gap-2 px-6 py-3.5 bg-primary text-white font-mono text-xs font-bold uppercase tracking-widest hover:bg-rose-700 transition-colors shadow-md"
                >
                  <span>EXPLORE INDUSTRIES</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
                <a
                  href="#services"
                  className="inline-flex items-center gap-2 px-6 py-3.5 bg-white border border-border text-foreground font-mono text-xs font-bold uppercase tracking-widest hover:bg-slate-50 transition-colors"
                >
                  <span>ENGINEERING SERVICES</span>
                </a>
              </div>
            </Reveal>
          </div>
        </section>

        {/* 2. About CFD */}
        <section className="max-w-7xl mx-auto px-6 lg:px-8">
          <Reveal>
            <div className="font-mono text-[11px] font-bold text-primary tracking-widest uppercase mb-4">
              <span className="text-primary font-bold mr-1">┌</span> ABOUT CFD SIMULATION
            </div>
            <div className="bg-slate-900 text-white border border-slate-800 p-8 sm:p-12 relative shadow-xl">
              <div className="absolute top-4 right-4 font-mono text-[9px] text-slate-500">
                PHYSICS-BACKED DECISIONS
              </div>
              <h2 className="text-2xl sm:text-3xl font-display font-extrabold uppercase mb-4 text-white">
                Engineering Decisions Backed by <span className="text-primary">Physics</span>
              </h2>
              <p className="text-slate-300 text-base sm:text-lg leading-relaxed font-sans max-w-4xl">
                Engineering simulation allows industries to visualize process behavior before physical
                implementation. Using CFD, structural analysis, thermal analysis, process simulation,
                and digital engineering, MACPROTEC identifies hidden operational issues, evaluates
                design alternatives, and supports informed engineering decisions that improve plant
                performance, reliability, and energy efficiency.
              </p>
            </div>
          </Reveal>
        </section>

        {/* 3. Industry Applications */}
        <section id="industries" className="max-w-7xl mx-auto px-6 lg:px-8">
          <Reveal className="mb-10">
            <div className="font-mono text-[11px] font-bold text-primary tracking-widest uppercase mb-4">
              <span className="text-primary font-bold mr-1">┌</span> APPLIED SECTORS
            </div>
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-foreground uppercase tracking-tight mb-2">
              Industry <span className="text-primary">Applications</span>
            </h2>
            <p className="font-mono text-sm font-semibold text-secondary">
              Select your industry to explore engineering applications tailored to your process.
            </p>
          </Reveal>

          <RevealGroup className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6" stagger={0.06}>
            {Object.values(cfdIndustries).map((ind, i) => (
              <RevealItem key={ind.slug}>
                <div className="bg-white border border-border p-8 rounded-none relative h-full flex flex-col justify-between hover:border-primary transition-colors shadow-sm">
                  <div>
                    <div className="font-mono text-[10px] font-bold text-primary tracking-wider uppercase mb-3">
                      IND&#8209;0{i + 1}
                    </div>
                    <h3 className="font-display font-extrabold text-xl text-foreground mb-3 uppercase">
                      {ind.name}
                    </h3>
                    <p className="text-xs sm:text-sm text-secondary font-sans leading-relaxed mb-6">
                      {ind.summary}
                    </p>
                  </div>
                  <div className="pt-4 border-t border-border">
                    <Link
                      href={`/solutions/cfd-engineering/${ind.slug}`}
                      className="font-mono text-[10px] font-bold text-primary hover:text-rose-700 uppercase tracking-widest flex items-center gap-1.5"
                    >
                      <span>Explore Industry Details</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </section>

        {/* 4. Engineering Services (Core Services) */}
        <section id="services" className="max-w-7xl mx-auto px-6 lg:px-8">
          <Reveal className="mb-10">
            <div className="font-mono text-[11px] font-bold text-primary tracking-widest uppercase mb-4">
              <span className="text-primary font-bold mr-1">┌</span> CORE DISCIPLINES
            </div>
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-foreground uppercase tracking-tight mb-2">
              Engineering <span className="text-primary">Services</span>
            </h2>
            <p className="font-mono text-sm font-semibold text-secondary">
              Comprehensive physics-based simulation and engineering solutions for heavy process plants.
            </p>
          </Reveal>

          <RevealGroup className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6" stagger={0.06}>
            {cfdCoreServices.map((service, i) => (
              <RevealItem key={service.slug}>
                <div className="bg-white border border-border p-8 rounded-none relative h-full flex flex-col justify-between hover:border-primary transition-colors shadow-sm">
                  <div>
                    <div className="font-mono text-[10px] font-bold text-primary tracking-wider uppercase mb-3">
                      SVC&#8209;{String(i + 1).padStart(2, "0")}
                    </div>
                    <h3 className="font-display font-extrabold text-lg text-foreground mb-3 uppercase leading-snug">
                      {service.title}
                    </h3>
                    <p className="text-xs text-secondary font-sans leading-relaxed mb-6">
                      {service.description}
                    </p>
                  </div>
                  <div className="pt-4 border-t border-border">
                    <Link
                      href={`/solutions/cfd-engineering/${service.slug}`}
                      className="font-mono text-[10px] font-bold text-primary hover:text-rose-700 uppercase tracking-widest flex items-center gap-1.5"
                    >
                      <span>View Full Service Package</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </section>

        {/* 5. Why MACPROTEC */}
        <section className="max-w-7xl mx-auto px-6 lg:px-8">
          <Reveal className="mb-10">
            <div className="font-mono text-[11px] font-bold text-primary tracking-widest uppercase mb-4">
              <span className="text-primary font-bold mr-1">┌</span> COMPETITIVE ADVANTAGE
            </div>
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-foreground uppercase tracking-tight mb-2">
              Why <span className="text-primary">MACPROTEC</span>
            </h2>
          </Reveal>

          <RevealGroup className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6" stagger={0.06}>
            {whyMacprotecCards.map((card, i) => {
              const IconComp = card.icon;
              return (
                <RevealItem key={card.title}>
                  <div className="bg-white border border-border p-8 rounded-none relative h-full flex flex-col justify-between hover:border-primary transition-colors shadow-sm">
                    <div>
                      <div className="w-10 h-10 bg-rose-50 border border-rose-100 flex items-center justify-center text-primary mb-6">
                        <IconComp className="w-5 h-5" />
                      </div>
                      <div className="font-mono text-[10px] font-bold text-primary tracking-wider uppercase mb-2">
                        0{i + 1} / ADVANTAGE
                      </div>
                      <h3 className="font-display font-extrabold text-base text-foreground mb-2 uppercase">
                        {card.title}
                      </h3>
                      <p className="text-xs text-secondary font-sans leading-relaxed">{card.desc}</p>
                    </div>
                  </div>
                </RevealItem>
              );
            })}
          </RevealGroup>
        </section>

        {/* 6. Contact Us CTA */}
        <section className="max-w-7xl mx-auto px-6 lg:px-8">
          <Reveal>
            <div className="bg-slate-900 text-white p-10 sm:p-14 border border-slate-800 relative overflow-hidden shadow-2xl flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="max-w-2xl">
                <div className="font-mono text-xs font-bold text-primary tracking-widest uppercase mb-3 flex items-center gap-2">
                  <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                  INITIATE SIMULATION STUDY
                </div>
                <h2 className="font-display font-extrabold text-3xl sm:text-4xl uppercase tracking-tight leading-tight">
                  Optimize Your Industrial Process <br />
                  <span className="text-primary">Before You Build or Modify</span>
                </h2>
                <p className="text-slate-300 text-sm sm:text-base font-sans mt-4 leading-relaxed">
                  Discuss your CFD modeling, thermal analysis, or flow assurance requirements with our
                  senior process simulation team.
                </p>
              </div>

              <div className="shrink-0">
                <Link
                  href="/lets-connect"
                  className="inline-flex items-center gap-3 px-8 py-4 bg-primary text-white font-mono text-xs font-bold tracking-widest uppercase hover:bg-rose-700 transition-colors shadow-lg"
                >
                  <span>REQUEST SIMULATION CONSULTATION</span>
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
