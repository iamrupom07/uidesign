"use client";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import TechnicalCursor from "@/components/ui/TechnicalCursor";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import Link from "next/link";
import {
  Globe2,
  Cpu,
  Layers,
  ShieldCheck,
  Award,
  Users,
  Factory,
  ArrowRight,
  Sparkles,
  Target,
  CheckCircle2,
  Flame,
  Activity,
  Workflow,
  LineChart,
} from "lucide-react";

export default function AboutUs() {
  const valueCards = [
    {
      title: "Industry-Focused Expertise",
      desc: "Deep understanding of cement and heavy process industries, supported by practical engineering experience.",
      icon: Factory,
    },
    {
      title: "Integrated Engineering Solutions",
      desc: "Combining process engineering, simulation, mechanical analysis, and digital technologies under one consultancy.",
      icon: Layers,
    },
    {
      title: "Engineering-Led Decision Making",
      desc: "Every recommendation is supported by technical analysis, engineering calculations, and validated methodologies.",
      icon: ShieldCheck,
    },
    {
      title: "Practical & Implementable Solutions",
      desc: "Focused on delivering realistic improvements that enhance plant performance and operational reliability.",
      icon: Workflow,
    },
    {
      title: "Innovation Through Digital Engineering",
      desc: "Applying CFD, Process Simulation, FEA, and Digital Twin technologies to solve complex engineering challenges.",
      icon: Cpu,
    },
    {
      title: "Long-Term Engineering Partnership",
      desc: "Supporting clients throughout the entire asset lifecycle—from concept development to optimization and modernization.",
      icon: Award,
    },
  ];

  return (
    <>
      <TechnicalCursor />
      <Header />

      <main className="bg-background min-h-screen py-20 lg:py-24 space-y-24">
        {/* Page Hero Header */}
        <section className="max-w-7xl mx-auto px-6 lg:px-8 pt-10">
          <Reveal>
            <div className="font-mono text-[11px] font-bold text-primary tracking-widest uppercase mb-4 flex items-center gap-2">
              <span className="text-primary font-bold">┌</span>
              <span className="inline-block w-2 h-2 bg-primary rounded-full animate-pulse" />
              ABOUT MACPROTEC ENGINEERING
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-extrabold text-foreground uppercase tracking-tight leading-tight max-w-4xl">
              Engineering Better Plants. <br />
              <span className="text-primary">Delivering Smarter Solutions.</span>
            </h1>
          </Reveal>
        </section>

        {/* 1. Company Overview */}
        <section className="max-w-7xl mx-auto px-6 lg:px-8 relative">
          <div className="absolute top-0 right-0 w-32 h-32 border-b border-l border-primary/20 opacity-20 pointer-events-none" />
          <Reveal>
            <div className="font-mono text-[11px] font-bold text-primary tracking-widest uppercase mb-4">
              <span className="text-primary font-bold mr-1">┌</span> 01. COMPANY OVERVIEW
            </div>
            <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-foreground uppercase tracking-tight mb-4">
              Engineering Excellence for <span className="text-primary">Heavy Process Industries</span>
            </h2>
          </Reveal>

          <div className="grid lg:grid-cols-2 gap-10 items-stretch mt-8">
            <Reveal delay={0.08}>
              <div className="space-y-6 body-md text-secondary leading-relaxed font-sans bg-white border border-border p-8 rounded-none h-full shadow-sm">
                <p>
                  MACPROTEC Engineering provides specialized engineering consulting services to the
                  cement and heavy process industries, supporting clients from concept development
                  through plant operation and performance optimization. Our multidisciplinary
                  expertise spans process engineering, Computational Fluid Dynamics (CFD), process
                  simulation, Digital Twin development, engineering analysis, and industrial
                  optimization.
                </p>
                <p>
                  Rather than providing isolated engineering studies, we develop integrated engineering
                  solutions that improve process efficiency, equipment reliability, energy
                  performance, and operational sustainability. Every project is approached with a
                  practical engineering mindset, combining industry knowledge with advanced
                  analytical tools to deliver measurable improvements in plant performance.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.16}>
              <div className="bg-slate-900 text-white border border-slate-800 p-8 rounded-none relative flex flex-col justify-between h-full shadow-xl">
                <div className="absolute top-4 right-4 font-mono text-[9px] text-slate-500 tracking-widest">
                  DOSSIER / HOUSTON TX
                </div>
                <div>
                  <div className="font-mono text-xs font-bold text-primary tracking-widest uppercase mb-6 flex items-center gap-2">
                    <Activity className="w-4 h-4 text-primary" /> GLOBAL CONSULTING METRICS
                  </div>
                  <div className="space-y-5 font-mono text-xs text-slate-300">
                    <div className="flex justify-between border-b border-slate-800 pb-3">
                      <span>HEADQUARTERS:</span>
                      <span className="text-white font-bold">HOUSTON, TEXAS, USA</span>
                    </div>
                    <div className="flex justify-between border-b border-slate-800 pb-3">
                      <span>PRIMARY CORE:</span>
                      <span className="text-white font-bold">CEMENT & PROCESS PLANTS</span>
                    </div>
                    <div className="flex justify-between border-b border-slate-800 pb-3">
                      <span>METHODOLOGY:</span>
                      <span className="text-white font-bold">CFD + FEA + DIGITAL TWIN</span>
                    </div>
                    <div className="flex justify-between border-b border-slate-800 pb-3">
                      <span>PROJECT LIFECYCLE:</span>
                      <span className="text-white font-bold">CONCEPT TO OPTIMIZATION</span>
                    </div>
                    <div className="flex justify-between">
                      <span>APPROACH:</span>
                      <span className="text-white font-bold">INTEGRATED ENGINEERING</span>
                    </div>
                  </div>
                </div>
                <div className="mt-8 pt-4 border-t border-slate-800 flex items-center justify-between text-[11px] font-mono text-slate-400">
                  <span>LAT 29.76° N | LON 95.37° W</span>
                  <span className="text-primary font-bold">VERIFIED DOSSIER</span>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* 2. Mission & Vision */}
        <section className="max-w-7xl mx-auto px-6 lg:px-8">
          <Reveal className="mb-10">
            <div className="font-mono text-[11px] font-bold text-primary tracking-widest uppercase mb-4">
              <span className="text-primary font-bold mr-1">┌</span> 02. STRATEGIC PURPOSE
            </div>
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-foreground uppercase tracking-tight">
              Mission & <span className="text-primary">Vision</span>
            </h2>
          </Reveal>

          <div className="grid md:grid-cols-2 gap-8">
            <Reveal>
              <div className="bg-white border border-border p-8 sm:p-10 rounded-none relative h-full flex flex-col justify-between hover:border-primary/50 transition-colors shadow-sm">
                <div>
                  <div className="w-12 h-12 bg-rose-50 border border-rose-100 flex items-center justify-center text-primary mb-6">
                    <Target className="w-6 h-6" />
                  </div>
                  <div className="font-mono text-[10px] font-bold text-primary tracking-widest uppercase mb-2">
                    02-A / MISSION STATEMENT
                  </div>
                  <h3 className="font-display font-extrabold text-xl sm:text-2xl text-foreground mb-4 uppercase">
                    Engineering Solutions That Create Lasting Value
                  </h3>
                  <p className="text-sm text-secondary leading-relaxed font-sans">
                    Our mission is to deliver innovative, reliable, and practical engineering
                    solutions that help industries operate more efficiently, safely, and
                    sustainably. By combining engineering expertise with advanced digital
                    technologies, we enable clients to optimize processes, reduce operational
                    risks, and maximize the value of their industrial assets.
                  </p>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="bg-white border border-border p-8 sm:p-10 rounded-none relative h-full flex flex-col justify-between hover:border-primary/50 transition-colors shadow-sm">
                <div>
                  <div className="w-12 h-12 bg-rose-50 border border-rose-100 flex items-center justify-center text-primary mb-6">
                    <Sparkles className="w-6 h-6" />
                  </div>
                  <div className="font-mono text-[10px] font-bold text-primary tracking-widest uppercase mb-2">
                    02-B / VISION TARGET
                  </div>
                  <h3 className="font-display font-extrabold text-xl sm:text-2xl text-foreground mb-4 uppercase">
                    Shaping the Future of Industrial Engineering
                  </h3>
                  <p className="text-sm text-secondary leading-relaxed font-sans">
                    Our vision is to become a globally recognized engineering consultancy for the
                    cement and heavy process industries, delivering world-class expertise in process
                    engineering, digital engineering, and industrial optimization while supporting
                    the industry's transition toward smarter, more efficient, and sustainable
                    operations.
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* 3. Our Engineering Philosophy */}
        <section className="max-w-7xl mx-auto px-6 lg:px-8">
          <Reveal className="mb-6">
            <div className="font-mono text-[11px] font-bold text-primary tracking-widest uppercase mb-4">
              <span className="text-primary font-bold mr-1">┌</span> 03. CORE METHODOLOGY
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="bg-white border border-border p-8 sm:p-12 rounded-none relative overflow-hidden shadow-sm">
              <div className="absolute top-0 right-0 w-40 h-40 border-b border-l border-primary/10 pointer-events-none" />
              <div className="grid lg:grid-cols-[1fr_2.5fr] gap-8 items-start">
                <div className="border-l-4 border-primary pl-6">
                  <div className="font-mono text-[10px] font-bold text-primary tracking-widest uppercase mb-2">
                    PHILOSOPHY
                  </div>
                  <h3 className="font-display font-extrabold text-2xl sm:text-3xl text-foreground uppercase tracking-tight leading-none">
                    Engineering <br />
                    <span className="text-primary">Beyond Calculations</span>
                  </h3>
                </div>
                <div className="space-y-4">
                  <p className="text-foreground text-lg sm:text-xl font-bold leading-relaxed font-display uppercase">
                    Engineering is more than calculations and software outputs—it is about
                    understanding how an entire process operates.
                  </p>
                  <p className="text-secondary text-sm sm:text-base leading-relaxed font-sans">
                    At MACPROTEC, every project begins with understanding the client's operational
                    objectives before selecting the appropriate engineering tools. We believe that
                    successful engineering combines process knowledge, practical experience,
                    simulation technologies, and sound engineering judgement. Whether optimizing an
                    existing facility or designing a new process, our objective is to develop
                    solutions that are technically robust, economically practical, and operationally
                    sustainable.
                  </p>
                </div>
              </div>
            </div>
          </Reveal>
        </section>

        {/* 4. Cement Industry Expertise */}
        <section className="max-w-7xl mx-auto px-6 lg:px-8">
          <Reveal className="mb-8">
            <div className="font-mono text-[11px] font-bold text-primary tracking-widest uppercase mb-4">
              <span className="text-primary font-bold mr-1">┌</span> 04. SECTOR FOCUS
            </div>
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-foreground uppercase tracking-tight mb-2">
              Cement Industry <span className="text-primary">Expertise</span>
            </h2>
            <p className="font-mono text-sm font-bold text-primary uppercase tracking-wide">
              Specialists in Cement Process Engineering
            </p>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="bg-white border border-border p-8 sm:p-10 rounded-none shadow-sm space-y-6">
              <p className="text-secondary text-base leading-relaxed font-sans">
                The cement industry remains one of MACPROTEC's core areas of expertise. Our engineers
                possess extensive knowledge of pyroprocessing, grinding systems, material handling,
                dust collection, combustion systems, and plant utilities. We support clients across
                every stage of the cement manufacturing process, from conceptual design and process
                optimization to troubleshooting and plant modernization.
              </p>
              <p className="text-secondary text-base leading-relaxed font-sans">
                Our engineering services include process simulation, CFD analysis, alternative fuel
                studies, digital engineering, equipment optimization, debottlenecking, and
                operational performance improvement, enabling cement producers to enhance
                efficiency, reduce energy consumption, and achieve sustainable production goals.
              </p>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-4 border-t border-border">
                {[
                  "Pyroprocessing & Kiln Systems",
                  "Grinding & Milling Circuit Optimization",
                  "Computational Fluid Dynamics (CFD)",
                  "Alternative Fuel Co-Processing",
                  "Dust Collection & Emissions Review",
                  "Debottlenecking & Modernization",
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3 font-mono text-xs text-foreground font-semibold">
                    <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </section>

        {/* 5. Digital Engineering Capability */}
        <section className="max-w-7xl mx-auto px-6 lg:px-8">
          <Reveal className="mb-8">
            <div className="font-mono text-[11px] font-bold text-primary tracking-widest uppercase mb-4">
              <span className="text-primary font-bold mr-1">┌</span> 05. ADVANCED CAPABILITY
            </div>
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-foreground uppercase tracking-tight mb-2">
              Digital Engineering <span className="text-primary">Capability</span>
            </h2>
            <p className="font-mono text-sm font-bold text-primary uppercase tracking-wide">
              Engineering Powered by Digital Innovation
            </p>
          </Reveal>

          <div className="grid lg:grid-cols-2 gap-8">
            <Reveal delay={0.08}>
              <div className="bg-white border border-border p-8 rounded-none shadow-sm space-y-4 h-full">
                <p className="text-secondary text-sm sm:text-base leading-relaxed font-sans">
                  MACPROTEC integrates advanced engineering software and digital technologies into
                  every stage of project development. Our capabilities include Computational Fluid
                  Dynamics (CFD), Finite Element Analysis (FEA), Process Simulation, Digital Twin
                  development, and engineering data analysis to evaluate system performance before
                  physical implementation.
                </p>
                <p className="text-secondary text-sm sm:text-base leading-relaxed font-sans">
                  By creating digital representations of industrial processes and equipment, we help
                  clients validate engineering decisions, reduce project risks, improve operational
                  performance, and accelerate innovation through simulation-driven engineering.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.16}>
              <div className="bg-slate-900 text-white border border-slate-800 p-8 rounded-none shadow-xl flex flex-col justify-between h-full">
                <div>
                  <div className="font-mono text-xs font-bold text-primary tracking-widest uppercase mb-6 flex items-center gap-2">
                    <Cpu className="w-4 h-4 text-primary" /> DIGITAL TOOLING SUITE
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4 font-mono text-xs">
                    <div className="border border-slate-800 p-4 bg-slate-950">
                      <span className="text-primary font-bold block mb-1">CFD ANALYSIS</span>
                      <span className="text-slate-400 text-[11px]">Fluid flow, combustion & thermal distribution</span>
                    </div>
                    <div className="border border-slate-800 p-4 bg-slate-950">
                      <span className="text-primary font-bold block mb-1">FEA STRESS</span>
                      <span className="text-slate-400 text-[11px]">Structural integrity & thermal load analysis</span>
                    </div>
                    <div className="border border-slate-800 p-4 bg-slate-950">
                      <span className="text-primary font-bold block mb-1">PROCESS SIMULATION</span>
                      <span className="text-slate-400 text-[11px]">Mass & energy balance modeling</span>
                    </div>
                    <div className="border border-slate-800 p-4 bg-slate-950">
                      <span className="text-primary font-bold block mb-1">DIGITAL TWIN</span>
                      <span className="text-slate-400 text-[11px]">Real-time operational optimization</span>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* 6. Global Presence */}
        <section className="max-w-7xl mx-auto px-6 lg:px-8">
          <Reveal className="mb-8">
            <div className="font-mono text-[11px] font-bold text-primary tracking-widest uppercase mb-4">
              <span className="text-primary font-bold mr-1">┌</span> 06. GLOBAL REACH
            </div>
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-foreground uppercase tracking-tight mb-2">
              Global <span className="text-primary">Presence</span>
            </h2>
            <p className="font-mono text-sm font-bold text-primary uppercase tracking-wide">
              Delivering Engineering Solutions Worldwide
            </p>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="bg-white border border-border p-8 sm:p-10 rounded-none shadow-sm space-y-6">
              <p className="text-secondary text-base leading-relaxed font-sans">
                MACPROTEC serves industrial clients across multiple regions, supporting engineering
                projects in cement, power generation, steel, chemical processing, oil & gas, mining,
                and bulk material handling industries. Through a combination of technical expertise,
                digital collaboration, and project flexibility, we provide engineering support to
                clients regardless of project location.
              </p>
              <p className="text-secondary text-base leading-relaxed font-sans">
                Our approach enables us to work seamlessly with plant owners, EPC contractors,
                equipment manufacturers, and technology providers on projects ranging from
                feasibility studies and engineering design to troubleshooting and operational
                optimization.
              </p>
            </div>
          </Reveal>
        </section>

        {/* 7. Leadership & Engineering Team */}
        <section className="max-w-7xl mx-auto px-6 lg:px-8">
          <Reveal className="mb-8">
            <div className="font-mono text-[11px] font-bold text-primary tracking-widest uppercase mb-4">
              <span className="text-primary font-bold mr-1">┌</span> 07. TEAM DOSSIER
            </div>
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-foreground uppercase tracking-tight mb-2">
              Leadership & <span className="text-primary">Engineering Team</span>
            </h2>
            <p className="font-mono text-sm font-bold text-primary uppercase tracking-wide">
              Experience Driven by Engineering
            </p>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="bg-white border border-border p-8 sm:p-10 rounded-none shadow-sm space-y-6">
              <p className="text-secondary text-base leading-relaxed font-sans">
                MACPROTEC is built on a multidisciplinary team of engineers specializing in process
                engineering, mechanical engineering, CFD simulation, structural analysis,
                industrial automation, and plant optimization. Our collaborative approach allows us
                to integrate expertise from multiple engineering disciplines, delivering practical and
                technically sound solutions for complex industrial challenges.
              </p>
              <p className="text-secondary text-base leading-relaxed font-sans">
                Every project is supported by engineers who understand both the theoretical
                principles and the practical realities of industrial plant operation, ensuring that
                our recommendations are implementable, reliable, and aligned with our clients'
                operational objectives.
              </p>
            </div>
          </Reveal>
        </section>

        {/* 8. Why Clients Trust MACPROTEC */}
        <section className="max-w-7xl mx-auto px-6 lg:px-8">
          <Reveal className="mb-10">
            <div className="font-mono text-[11px] font-bold text-primary tracking-widest uppercase mb-4">
              <span className="text-primary font-bold mr-1">┌</span> 08. CLIENT CONFIDENCE
            </div>
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-foreground uppercase tracking-tight mb-2">
              Why Clients Trust <span className="text-primary">MACPROTEC</span>
            </h2>
            <p className="font-mono text-sm font-bold text-primary uppercase tracking-wide">
              Engineering Confidence. Proven Expertise.
            </p>
          </Reveal>

          <RevealGroup className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6" stagger={0.06}>
            {valueCards.map((card, i) => {
              const IconComp = card.icon;
              return (
                <RevealItem key={card.title}>
                  <div className="bg-white border border-border p-8 rounded-none relative h-full flex flex-col justify-between hover:border-primary transition-colors shadow-sm">
                    <div>
                      <div className="w-10 h-10 bg-rose-50 border border-rose-100 flex items-center justify-center text-primary mb-6">
                        <IconComp className="w-5 h-5" />
                      </div>
                      <div className="font-mono text-[10px] font-bold text-primary tracking-wider uppercase mb-2">
                        VALUE CARD 0{i + 1}
                      </div>
                      <h3 className="font-display font-extrabold text-lg text-foreground mb-3 uppercase leading-tight">
                        {card.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-secondary font-sans leading-relaxed">
                        {card.desc}
                      </p>
                    </div>
                  </div>
                </RevealItem>
              );
            })}
          </RevealGroup>
        </section>

        {/* 9. Contact CTA Section */}
        <section className="max-w-7xl mx-auto px-6 lg:px-8">
          <Reveal>
            <div className="bg-slate-900 text-white p-10 sm:p-14 border border-slate-800 relative overflow-hidden shadow-2xl flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="absolute top-0 right-0 w-48 h-48 border-b border-l border-primary/20 pointer-events-none" />
              <div className="max-w-2xl">
                <div className="font-mono text-xs font-bold text-primary tracking-widest uppercase mb-3 flex items-center gap-2">
                  <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                  INITIATE ENGAGEMENT / SECTION 09
                </div>
                <h2 className="font-display font-extrabold text-3xl sm:text-4xl uppercase tracking-tight leading-tight">
                  Ready to Optimize Your <br />
                  <span className="text-primary">Industrial Plant?</span>
                </h2>
                <p className="text-slate-300 text-sm sm:text-base font-sans mt-4 leading-relaxed">
                  Partner with MACPROTEC for engineering excellence, advanced digital simulation, and
                  proven industrial solutions. Let's discuss your project specifications.
                </p>
              </div>

              <div className="shrink-0">
                <Link
                  href="/lets-connect"
                  className="inline-flex items-center gap-3 px-8 py-4 bg-primary text-white font-mono text-xs font-bold tracking-widest uppercase hover:bg-rose-700 transition-colors shadow-lg"
                >
                  <span>CONTACT ENGINEERING TEAM</span>
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
