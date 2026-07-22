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
  Search,
  Activity,
  Layers,
  ShieldCheck,
  Wrench,
  TrendingUp,
  Sparkles,
  ChevronRight,
  HelpCircle,
  Building2,
  FileCheck,
} from "lucide-react";

// Solution Cards Data defined strictly according to specification PDF
const SOLUTION_CARDS = [
  {
    id: "01",
    title: "Engineering Design Services",
    slug: "design-services",
    image: "/images/card_engineering_design.png",
    subtitle:
      "Deliver integrated multidisciplinary engineering solutions from feasibility studies through detailed engineering and EPC support.",
    keyAreas: [
      "Process Engineering",
      "Mechanical Engineering",
      "Piping Engineering",
      "Civil & Structural Engineering",
    ],
  },
  {
    id: "02",
    title: "CFD & Engineering Simulation",
    slug: "cfd-engineering",
    image: "/images/card_cfd_simulation.png",
    subtitle:
      "Visualize, analyze, and optimize complex engineering systems before implementation using advanced simulation technologies.",
    keyAreas: [
      "CFD Analysis",
      "Heat Transfer",
      "Combustion",
      "Process Simulation",
    ],
  },
  {
    id: "03",
    title: "Process Simulation & Digital Twin",
    slug: "process-simulation",
    image: "/images/card_digital_twin.png",
    subtitle:
      "Build intelligent digital process models to optimize plant performance, evaluate scenarios, and support engineering decisions.",
    keyAreas: [
      "Process Simulation",
      "Digital Twin",
      "Virtual Commissioning",
      "Process Optimization",
    ],
  },
  {
    id: "04",
    title: "Plant Performance Optimization",
    slug: "plant-optimization",
    image: "/images/card_plant_optimization.png",
    subtitle:
      "Increase productivity, improve energy efficiency, and eliminate operational bottlenecks through engineering-led optimization.",
    keyAreas: [
      "Process Audits",
      "Energy Assessment",
      "Debottlenecking",
      "Performance Improvement",
    ],
  },
  {
    id: "05",
    title: "3D Laser Scanning & Reverse Engineering",
    slug: "laser-scanning",
    image: "/images/card_laser_scanning.png",
    subtitle:
      "Capture accurate digital representations of industrial facilities to support retrofit engineering and plant modernization.",
    keyAreas: [
      "Laser Scanning",
      "Point Cloud to CAD",
      "Reverse Engineering",
      "As-Built Documentation",
    ],
  },
  {
    id: "06",
    title: "Predictive Monitoring & Asset Intelligence",
    slug: "predictive-monitoring",
    image: "/images/plant_reactor.png",
    subtitle:
      "Leverage operational data and advanced analytics to monitor equipment health, predict failures, and improve asset reliability.",
    keyAreas: [
      "Asset Monitoring",
      "Predictive Analytics",
      "KPI Dashboards",
      "AI-Based Insights",
    ],
  },
];

// 6 Structured Engineering Steps
const WORKFLOW_STEPS = [
  {
    step: "01",
    title: "Understand",
    icon: Search,
    description: "Review plant data, operating conditions, objectives, and existing challenges.",
  },
  {
    step: "02",
    title: "Analyze",
    icon: Activity,
    description: "Evaluate systems using engineering calculations, simulation, process modeling, and expertise.",
  },
  {
    step: "03",
    title: "Design",
    icon: Layers,
    description: "Develop practical engineering solutions tailored to operational and project requirements.",
  },
  {
    step: "04",
    title: "Validate",
    icon: ShieldCheck,
    description: "Verify performance through digital engineering, engineering reviews, and technical assessments.",
  },
  {
    step: "05",
    title: "Implement",
    icon: Wrench,
    description: "Support procurement, construction, commissioning, and plant modifications with complete documentation.",
  },
  {
    step: "06",
    title: "Optimize",
    icon: TrendingUp,
    description: "Monitor performance, identify improvement opportunities, and continuously enhance efficiency.",
  },
];

export default function SolutionsPage() {
  return (
    <>
      <TechnicalCursor />
      <Header />

      <main className="bg-slate-50 min-h-screen text-slate-800 font-sans selection:bg-rose-500 selection:text-white">
        {/* BREADCRUMB / TOP DOSSIER BAR */}
        <section className="bg-slate-900 border-b border-slate-800 text-white py-3 px-6 lg:px-8 font-mono text-xs">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-2 text-slate-400">
              <Link href="/" className="hover:text-white transition-colors">
                Home
              </Link>
              <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
              <span className="text-primary font-bold">Solutions</span>
            </div>
            <div className="hidden sm:flex items-center gap-4 text-[10px] text-slate-400">
              <span>MULTIDISCIPLINARY PROCESS ENGINEERING</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-emerald-400 font-bold uppercase">System Operational</span>
            </div>
          </div>
        </section>

        {/* SECTION 1: HERO SECTION */}
        <section className="relative py-16 lg:py-24 bg-white border-b border-slate-200 overflow-hidden">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="grid lg:grid-cols-12 gap-12 items-center">
              {/* Left Column Text */}
              <div className="lg:col-span-7 space-y-6">
                <Reveal>
                  <div className="inline-flex items-center gap-2 bg-rose-50 text-primary border border-rose-200/80 px-3.5 py-1.5 font-mono text-xs font-bold uppercase tracking-wider rounded-full shadow-xs">
                    <Sparkles className="w-3.5 h-3.5 text-primary" />
                    <span>OUR SOLUTIONS</span>
                  </div>
                </Reveal>

                <Reveal>
                  <h1 className="font-display font-extrabold text-3xl sm:text-5xl lg:text-6xl text-slate-900 uppercase tracking-tight leading-[1.1]">
                    Engineering Solutions That Drive{" "}
                    <span className="text-primary underline decoration-rose-300 underline-offset-8">
                      Industrial Performance
                    </span>
                  </h1>
                </Reveal>

                <Reveal>
                  <p className="text-base sm:text-lg text-slate-600 font-sans leading-relaxed max-w-2xl">
                    From concept engineering to digital transformation, MACPROTEC delivers integrated
                    engineering solutions that improve safety, reliability, efficiency, and long-term plant
                    performance across heavy process industries.
                  </p>
                </Reveal>

                {/* 4 Feature Badges Grid */}
                <Reveal>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                    <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 p-2.5 rounded shadow-2xs font-mono text-[11px] font-bold text-slate-800">
                      <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                      <span>Practical Solutions</span>
                    </div>

                    <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 p-2.5 rounded shadow-2xs font-mono text-[11px] font-bold text-slate-800">
                      <Cpu className="w-4 h-4 text-primary shrink-0" />
                      <span>Advanced Tech</span>
                    </div>

                    <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 p-2.5 rounded shadow-2xs font-mono text-[11px] font-bold text-slate-800">
                      <Factory className="w-4 h-4 text-primary shrink-0" />
                      <span>Industry Expertise</span>
                    </div>

                    <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 p-2.5 rounded shadow-2xs font-mono text-[11px] font-bold text-slate-800">
                      <BarChart3 className="w-4 h-4 text-primary shrink-0" />
                      <span>Measurable Results</span>
                    </div>
                  </div>
                </Reveal>

                {/* CTAs */}
                <Reveal>
                  <div className="flex flex-wrap items-center gap-4 pt-4">
                    <a
                      href="#explore-solutions"
                      className="px-6 py-3.5 bg-primary hover:bg-rose-700 text-white font-mono text-xs font-bold uppercase tracking-wider transition-all duration-150 shadow-md hover:shadow-lg flex items-center gap-2 rounded-none group"
                    >
                      <span>Explore Solutions</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </a>

                    <Link
                      href="/about-us"
                      className="px-6 py-3.5 bg-white border border-slate-300 hover:border-slate-800 text-slate-800 font-mono text-xs font-bold uppercase tracking-wider transition-all duration-150 flex items-center gap-2 hover:bg-slate-50"
                    >
                      <span>Learn More About Us</span>
                      <ArrowRight className="w-4 h-4 text-slate-400" />
                    </Link>
                  </div>
                </Reveal>
              </div>

              {/* Right Column Hero Banner Image */}
              <div className="lg:col-span-5 relative">
                <Reveal>
                  <div className="relative border-4 border-white shadow-2xl overflow-hidden group bg-slate-900">
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent z-10" />
                    <Image
                      src="/images/hero_industrial.png"
                      alt="MACPROTEC Engineering Industrial Plant Solutions"
                      width={700}
                      height={500}
                      className="w-full h-[380px] sm:h-[450px] object-cover group-hover:scale-105 transition-transform duration-500"
                      priority
                    />
                    
                    {/* Badge Overlay */}
                    <div className="absolute bottom-5 left-5 right-5 z-20 bg-slate-950/90 border border-slate-800 p-4 backdrop-blur-md font-mono text-white flex items-center justify-between">
                      <div>
                        <div className="text-[10px] text-rose-400 font-bold uppercase tracking-wider">
                          ENGINEERING DISCIPLINE
                        </div>
                        <div className="text-sm font-extrabold font-display uppercase tracking-tight text-white mt-0.5">
                          HEAVY INDUSTRIAL PROCESSES
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

        {/* SECTION 2: EXPLORE OUR ENGINEERING SOLUTIONS */}
        <section id="explore-solutions" className="py-20 bg-slate-50 border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 space-y-12">
            {/* Header */}
            <div className="text-center max-w-3xl mx-auto space-y-4">
              <Reveal>
                <div className="inline-block font-mono text-xs font-bold text-primary tracking-widest uppercase bg-rose-50 border border-rose-200 px-3 py-1">
                  EXPLORE OUR ENGINEERING SOLUTIONS
                </div>
              </Reveal>

              <Reveal>
                <h2 className="font-display font-black text-3xl sm:text-4xl lg:text-5xl text-slate-900 uppercase tracking-tight">
                  Six Integrated Engineering Solutions
                </h2>
              </Reveal>

              <Reveal>
                <p className="text-slate-600 font-sans text-base leading-relaxed">
                  Select a solution area to discover our engineering capabilities, specialized services, and
                  project experience.
                </p>
              </Reveal>
            </div>

            {/* 6 Solution Cards Grid */}
            <RevealGroup className="grid md:grid-cols-2 lg:grid-cols-3 gap-8" stagger={0.08}>
              {SOLUTION_CARDS.map((card) => (
                <RevealItem key={card.id}>
                  <div className="bg-white border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between h-full group hover:border-primary/50 relative">
                    <div>
                      {/* Card Image Header with Number Badge */}
                      <div className="relative h-52 overflow-hidden bg-slate-950">
                        <Image
                          src={card.image}
                          alt={card.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
                        
                        {/* Number Badge 01..06 */}
                        <div className="absolute top-4 left-4 w-9 h-9 rounded bg-primary text-white font-mono font-black text-sm flex items-center justify-center shadow-lg border border-white/20 z-10">
                          {card.id}
                        </div>
                      </div>

                      {/* Card Body */}
                      <div className="p-6 space-y-4">
                        <h3 className="font-display font-extrabold text-xl text-slate-900 uppercase tracking-tight group-hover:text-primary transition-colors leading-snug">
                          {card.title}
                        </h3>

                        <p className="text-xs text-slate-600 font-sans leading-relaxed">
                          {card.subtitle}
                        </p>

                        {/* Bulleted Key Areas List */}
                        <div className="pt-2 border-t border-slate-100">
                          <div className="font-mono text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                            Key Areas & Capabilities
                          </div>
                          <ul className="space-y-1.5 font-mono text-xs text-slate-700">
                            {card.keyAreas.map((area, idx) => (
                              <li key={idx} className="flex items-center gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                                <span>{area}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>

                    {/* Card Footer Button Link */}
                    <div className="p-6 pt-0">
                      <Link
                        href={`/solutions/${card.slug}`}
                        className="w-full py-3 bg-slate-50 hover:bg-primary text-slate-800 hover:text-white border border-slate-200 hover:border-primary font-mono text-xs font-bold uppercase tracking-wider transition-all duration-200 flex items-center justify-center gap-2 group/btn"
                      >
                        <span>Explore Solution</span>
                        <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                      </Link>
                    </div>
                  </div>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        </section>

        {/* SECTION 3: HOW MACPROTEC SOLVES PLANT PROBLEMS */}
        <section className="py-20 bg-white border-b border-slate-200 overflow-hidden">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 space-y-16">
            {/* Header */}
            <div className="text-center max-w-3xl mx-auto space-y-4">
              <Reveal>
                <div className="inline-block font-mono text-xs font-bold text-primary tracking-widest uppercase bg-rose-50 border border-rose-200 px-3 py-1">
                  HOW MACPROTEC SOLVES PLANT PROBLEMS
                </div>
              </Reveal>

              <Reveal>
                <h2 className="font-display font-black text-3xl sm:text-4xl text-slate-900 uppercase tracking-tight">
                  A Structured Engineering Approach
                </h2>
              </Reveal>

              <Reveal>
                <p className="text-slate-600 font-sans text-base leading-relaxed">
                  Every project follows a systematic engineering workflow to ensure practical, data-driven,
                  and measurable results.
                </p>
              </Reveal>
            </div>

            {/* 6 Steps Horizontal / Grid Workflow */}
            <RevealGroup className="grid sm:grid-cols-2 lg:grid-cols-6 gap-6 relative" stagger={0.07}>
              {WORKFLOW_STEPS.map((stepItem) => {
                const IconComp = stepItem.icon;
                return (
                  <RevealItem key={stepItem.step}>
                    <div className="bg-slate-50 border border-slate-200 p-5 rounded-none h-full flex flex-col justify-between relative group hover:border-primary transition-all duration-200">
                      <div>
                        {/* Step Header */}
                        <div className="flex items-center justify-between mb-4">
                          <div className="w-10 h-10 rounded-full bg-rose-500/10 border border-rose-500/30 text-primary font-mono font-bold text-xs flex items-center justify-center">
                            {stepItem.step}
                          </div>
                          <IconComp className="w-5 h-5 text-slate-400 group-hover:text-primary transition-colors" />
                        </div>

                        <h3 className="font-display font-bold text-base text-slate-900 uppercase tracking-tight mb-2">
                          {stepItem.title}
                        </h3>

                        <p className="font-sans text-xs text-slate-600 leading-relaxed">
                          {stepItem.description}
                        </p>
                      </div>

                      <div className="mt-4 pt-3 border-t border-slate-200/60 font-mono text-[9px] text-slate-400 uppercase font-bold flex items-center gap-1">
                        <span>Phase {stepItem.step}</span>
                        <ChevronRight className="w-3 h-3 text-primary" />
                      </div>
                    </div>
                  </RevealItem>
                );
              })}
            </RevealGroup>
          </div>
        </section>

        {/* SECTION 4: CALL TO ACTION BANNER */}
        <section className="py-16 lg:py-24 bg-slate-950 text-white relative overflow-hidden">
          {/* Background Glow & Blueprint Lines */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none" />

          <div className="max-w-5xl mx-auto px-6 lg:px-8 relative z-10">
            <div className="bg-slate-900 border border-slate-800 p-8 sm:p-12 shadow-2xl relative overflow-hidden">
              <div className="absolute -top-12 -right-12 w-48 h-48 border border-rose-500/20 rounded-full pointer-events-none" />

              <div className="text-center space-y-6 max-w-3xl mx-auto">
                <Reveal>
                  <div className="inline-flex items-center gap-2 bg-rose-500/20 border border-rose-500/40 px-3.5 py-1 text-rose-400 font-mono text-xs font-bold uppercase tracking-wider rounded-full">
                    <FileCheck className="w-3.5 h-3.5" />
                    <span>READY TO DISCUSS YOUR PROJECT?</span>
                  </div>
                </Reveal>

                <Reveal>
                  <h2 className="font-display font-black text-3xl sm:text-5xl text-white uppercase tracking-tight">
                    Let's Engineer Better Solutions Together
                  </h2>
                </Reveal>

                <Reveal>
                  <p className="text-slate-300 font-sans text-base sm:text-lg leading-relaxed">
                    Whether you're planning a new facility, optimizing plant performance, or solving complex
                    engineering challenges, our specialists are ready to help.
                  </p>
                </Reveal>

                <Reveal>
                  <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
                    <Link
                      href="/lets-connect"
                      className="px-8 py-4 bg-primary hover:bg-rose-700 text-white font-mono text-xs font-bold uppercase tracking-wider transition-all duration-150 shadow-xl flex items-center gap-2 group"
                    >
                      <span>Request an Appointment</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>

                    <Link
                      href="/lets-connect?type=proposal"
                      className="px-8 py-4 bg-slate-950 border border-slate-700 hover:border-rose-500 text-slate-200 hover:text-white font-mono text-xs font-bold uppercase tracking-wider transition-all duration-150 flex items-center gap-2"
                    >
                      <span>Request a Proposal</span>
                      <ArrowRight className="w-4 h-4 text-rose-400" />
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
