"use client";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import TechnicalCursor from "@/components/ui/TechnicalCursor";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  ChevronRight,
  Sparkles,
  Factory,
  ShieldCheck,
  Workflow,
  Layers,
  FileCheck,
} from "lucide-react";

// 7 Industry Applications Data from PDF spec
const INDUSTRY_APPLICATIONS = [
  {
    key: "cement",
    slug: "cement",
    name: "Cement",
    badge: "LARGEST EXPERTISE AREA",
    summary: "Pyroprocessing, grinding, dust collection, material handling.",
    image: "/images/cfd-engineering/cement.jpg",
    description:
      "MACPROTEC's deepest engineering domain expertise lies in cement plant optimization, kiln combustion, preheater cyclone design, and clinker cooling.",
    applications: [
      "Kiln & Burner CFD",
      "Calciner CFD",
      "Cyclone & Preheater CFD",
      "Clinker Cooler CFD",
      "Vertical Roller Mill CFD",
      "Ball Mill CFD",
      "Separator CFD",
      "Bag Filter CFD",
      "Duct & Fan Optimization",
      "Silo & Hopper Flow Analysis",
      "Pneumatic Conveying",
      "Alternative Fuel Conversion",
      "Waste Heat Recovery",
      "Process Optimization",
    ],
  },
  {
    key: "steel",
    slug: "steel",
    name: "Steel",
    summary: "Furnaces, cooling systems, gas exhaust and dust control.",
    image: "/images/cfd-engineering/steel.jpg",
    description:
      "Advanced thermal and fluid simulation for steelmaking furnaces, ladle heating, continuous casting, and primary fume extraction.",
    applications: [
      "Reheating Furnace CFD",
      "Electric Arc Furnace CFD",
      "Ladle Heating CFD",
      "Cooling System CFD",
      "Fume Extraction CFD",
      "Dust Collection",
      "Chimney CFD",
      "Exhaust Duct CFD",
      "Heat Recovery",
    ],
  },
  {
    key: "power",
    slug: "power",
    name: "Power",
    summary: "Boilers, combustion, flue gas and thermal systems.",
    image: "/images/cfd-engineering/power.jpg",
    description:
      "Optimizing utility boiler combustion, SCR NOx abatement flow distribution, ESP particulate removal, and flue gas ducting.",
    applications: [
      "Boiler CFD",
      "Burner Optimization",
      "SCR Flow Distribution",
      "ESP Flow Analysis",
      "Air Heater CFD",
      "Flue Gas Duct CFD",
      "Ash Handling CFD",
      "Cooling Tower CFD",
    ],
  },
  {
    key: "oilgas",
    slug: "oil-gas",
    name: "Oil & Gas",
    summary: "Flow assurance, pipelines and process equipment.",
    image: "/images/cfd-engineering/oilgas.jpg",
    description:
      "Multiphase flow assurance, slugging prediction, separator efficiency modeling, pressure relief analysis, and subsea pipelines.",
    applications: [
      "Multiphase Pipeline CFD",
      "Slug Flow Analysis",
      "Separator CFD",
      "Flare CFD",
      "Pressure Relief Analysis",
      "Compressor Station CFD",
      "LNG Vapor Dispersion",
      "Heat Exchanger Analysis",
      "Pipe Support Design",
    ],
  },
  {
    key: "chemical",
    slug: "chemical",
    name: "Chemical",
    summary: "Reactors, mixing, piping and process systems.",
    image: "/images/cfd-engineering/chemical.jpg",
    description:
      "Chemical reaction kinetics, stirred tank mixing, static mixer pressure drops, heat exchanger thermal gradients, and ventilation.",
    applications: [
      "Reactor Mixing",
      "Reactor CFD",
      "Static Mixer CFD",
      "Storage Tank Mixing",
      "Heat Exchanger CFD",
      "Pipe Stress",
      "Flare Analysis",
      "Ventilation CFD",
    ],
  },
  {
    key: "mining",
    slug: "mining",
    name: "Mining",
    summary: "Material transfer, ventilation and dust handling.",
    image: "/images/cfd-engineering/mining.jpg",
    description:
      "Crusher dust extraction, conveyor transfer chute DEM-CFD simulation, ore chute wear reduction, and underground mine ventilation.",
    applications: [
      "Crusher Dust Control",
      "Conveyor Transfer CFD",
      "Ore Chute Flow",
      "Silo Flow",
      "Dust Collection",
      "Ventilation CFD",
      "Material Transfer",
    ],
  },
  {
    key: "bulk",
    slug: "bulk-material-handling",
    name: "Bulk Material Handling",
    summary: "Pneumatic conveying, silos, transfer systems and storage.",
    image: "/images/cfd-engineering/bulk.jpg",
    description:
      "Dense and dilute phase pneumatic conveying analysis, silo discharge behavior, hopper wear mitigation, and ship loader dust control.",
    applications: [
      "Transfer Chute Design",
      "Pneumatic Conveying",
      "Silo Flow Analysis",
      "Hopper Flow Analysis",
      "Dust Extraction",
      "Belt Conveyor Ventilation",
      "Ship Loader / Unloader CFD",
      "Storage Bin Flow",
    ],
  },
];

// Why MACPROTEC 4 Cards
const WHY_MACPROTEC_CARDS = [
  {
    title: "Industry Expertise",
    desc: "Decades of specialized engineering experience across cement, steel, power, chemical, mining, and bulk process plants.",
    icon: Factory,
  },
  {
    title: "Engineering Driven",
    desc: "Solutions developed by senior process and mechanical engineers, not software operators. Every model is rooted in physical reality.",
    icon: ShieldCheck,
  },
  {
    title: "Actionable Recommendations",
    desc: "Simulation outputs translated directly into practical engineering drawings, modifications, and constructible plant fixes.",
    icon: Workflow,
  },
  {
    title: "Integrated Engineering",
    desc: "Process engineering, CFD, thermal analysis, structural FEA, and digital twin technology under one unified engineering team.",
    icon: Layers,
  },
];

export default function CfdEngineeringSolutionPage() {
  return (
    <>
      <TechnicalCursor />
      <Header />

      <main className="bg-slate-50 min-h-screen text-slate-800 font-sans selection:bg-rose-500 selection:text-white">
        {/* TOP DOSSIER BREADCRUMB BAR */}
        <section className="bg-[#2d1b47] border-b border-[#3e2663] text-white py-3 px-6 lg:px-8 font-mono text-xs">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-2 text-slate-400">
              <Link href="/" className="hover:text-white transition-colors">
                Home
              </Link>
              <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
              <Link href="/solutions" className="hover:text-white transition-colors">
                Solutions
              </Link>
              <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
              <span className="text-primary font-bold">CFD & Engineering Simulation</span>
            </div>
            <div className="hidden sm:flex items-center gap-3 text-[10px] text-slate-400">
              <span className="font-bold text-rose-400">SOLUTION 02</span>
              <span>•</span>
              <span>ADVANCED SIMULATION & COMPUTATIONAL PHYSICS</span>
            </div>
          </div>
        </section>

        {/* 1. FULL-WIDTH HERO SECTION (Resources Style with Black Overlay) */}
        <section className="w-full relative bg-black border-b-2 border-primary/30 py-16 sm:py-20 lg:py-24 overflow-hidden group">
          {/* Full-width Background Image */}
          <div className="absolute inset-0 w-full h-full pointer-events-none">
            <Image
              src="/images/cfd-engineering/hero_cfd.jpg"
              alt="MACPROTEC CFD & Engineering Simulation"
              fill
              priority
              className="object-cover object-center opacity-100 group-hover:scale-105 transition-transform duration-1000 ease-out"
            />
            {/* Transparent Black Gradient Overlay for High Background Picture Visibility */}
            <div className="absolute inset-0 bg-black/40 bg-gradient-to-b from-black/60 via-black/30 to-black/75" />
            <div className="absolute inset-0 bg-[radial-gradient(#e11d48_1px,transparent_1px)] [background-size:24px_24px] opacity-15 pointer-events-none" />
          </div>

          {/* Centered Overlay Content */}
          <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
            <Reveal>
              <div className="max-w-4xl mx-auto flex flex-col items-center text-center space-y-6">
                {/* Category Badge Ticker */}
                <div className="inline-flex items-center gap-2 bg-[#2d1b47]/90 border border-primary/40 px-4 py-1.5 font-mono text-[11px] font-extrabold text-primary tracking-widest uppercase shadow-md backdrop-blur-xs">
                  <Sparkles className="w-3.5 h-3.5 text-primary animate-pulse" />
                  <span>CFD & ENGINEERING SIMULATION</span>
                </div>

                {/* Main Hero Title */}
                <div className="flex justify-center w-full">
                  <h1 className="text-4xl sm:text-6xl lg:text-7xl font-display font-black uppercase tracking-tight text-white drop-shadow-2xl">
                    See Before You Build. <span className="text-primary">Optimize Before You Operate.</span>
                  </h1>
                </div>

                {/* Subtitle Description */}
                <p className="text-slate-200 font-sans text-base sm:text-lg leading-relaxed max-w-2xl mx-auto drop-shadow-md">
                  Fluid flow, heat transfer, combustion, structural integrity, and particle behaviour define
                  the performance of every industrial facility. MACPROTEC transforms complex engineering
                  challenges into practical solutions through advanced simulation and digital engineering.
                </p>

                {/* Hero Action Buttons */}
                <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
                  <a
                    href="#industry-applications"
                    className="px-8 py-4 bg-primary hover:bg-rose-700 text-white font-mono text-xs font-bold uppercase tracking-wider transition-all duration-150 shadow-xl flex items-center gap-2 group"
                  >
                    <span>Explore Industries</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </a>

                  <Link
                    href="/lets-connect"
                    className="px-8 py-4 bg-[#201235] border border-white/20 hover:border-white text-white font-mono text-xs font-bold uppercase tracking-wider transition-all duration-150 flex items-center gap-2 hover:bg-[#2d1b47]"
                  >
                    <span>Request Consultation</span>
                    <ArrowRight className="w-4 h-4 text-slate-400" />
                  </Link>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* 2. ABOUT CFD SECTION */}
        <section className="py-20 bg-slate-50 border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="bg-white border border-slate-200 p-8 sm:p-12 shadow-sm space-y-8 relative overflow-hidden">
              <div className="max-w-3xl space-y-4">
                <Reveal>
                  <div className="inline-block font-mono text-xs font-bold text-primary uppercase tracking-widest bg-rose-50 border border-rose-200 px-3 py-1">
                    ABOUT CFD SIMULATION
                  </div>
                </Reveal>

                <Reveal>
                  <h2 className="font-display font-black text-2xl sm:text-4xl text-slate-900 uppercase tracking-tight">
                    Engineering Decisions Backed by Physics
                  </h2>
                </Reveal>

                <Reveal>
                  <p className="text-slate-600 font-sans text-base sm:text-lg leading-relaxed">
                    Engineering simulation allows industries to visualize process behavior before physical
                    implementation. Using CFD, structural analysis, thermal analysis, process simulation, and
                    digital engineering, MACPROTEC identifies hidden operational issues, evaluates design
                    alternatives, and supports informed engineering decisions that improve plant performance,
                    reliability, and energy efficiency.
                  </p>
                </Reveal>
              </div>

              {/* Grid Metrics Highlights */}
              <Reveal>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-slate-100 font-mono text-xs">
                  <div className="p-4 bg-slate-50 border border-slate-200">
                    <div className="text-[10px] text-slate-400 uppercase font-bold">SOLVER CAPACITY</div>
                    <div className="text-lg font-bold text-slate-900 mt-1">Multi-Phase CFD</div>
                    <div className="text-[10px] text-slate-500 mt-0.5">Euler-Lagrangian Solvers</div>
                  </div>

                  <div className="p-4 bg-slate-50 border border-slate-200">
                    <div className="text-[10px] text-slate-400 uppercase font-bold">THERMAL PROFILE</div>
                    <div className="text-lg font-bold text-slate-900 mt-1">Conduction & Radiation</div>
                    <div className="text-[10px] text-slate-500 mt-0.5">Hotspot Diagnostics</div>
                  </div>

                  <div className="p-4 bg-slate-50 border border-slate-200">
                    <div className="text-[10px] text-slate-400 uppercase font-bold">BURNER ANALYSIS</div>
                    <div className="text-lg font-bold text-slate-900 mt-1">RDF / SRF Co-Firing</div>
                    <div className="text-[10px] text-slate-500 mt-0.5">Emissions Optimization</div>
                  </div>

                  <div className="p-4 bg-slate-50 border border-slate-200">
                    <div className="text-[10px] text-slate-400 uppercase font-bold">FEA STRESS</div>
                    <div className="text-lg font-bold text-slate-900 mt-1">ASME / AISC Code</div>
                    <div className="text-[10px] text-slate-500 mt-0.5">Fatigue & Life Assessment</div>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* 3. INDUSTRY CARDS SECTION */}
        <section id="industry-applications" className="py-20 bg-white border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 space-y-12">
            {/* Section Header */}
            <div className="text-center max-w-3xl mx-auto space-y-4">
              <Reveal>
                <div className="inline-block font-mono text-xs font-bold text-primary uppercase tracking-widest bg-rose-50 border border-rose-200 px-3 py-1">
                  INDUSTRY
                </div>
              </Reveal>

              <Reveal>
                <h2 className="font-display font-black text-3xl sm:text-4xl text-slate-900 uppercase tracking-tight">
                  Tailored Industrial Applications
                </h2>
              </Reveal>

              <Reveal>
                <p className="text-slate-600 font-sans text-base leading-relaxed">
                  Select your industry to explore engineering applications tailored to your process.
                </p>
              </Reveal>
            </div>

            {/* 7 Industry Cards Grid */}
            <RevealGroup className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6" stagger={0.06}>
              {INDUSTRY_APPLICATIONS.map((ind, idx) => (
                <RevealItem key={ind.key}>
                  <Link
                    href={`/solutions/cfd-engineering/${ind.slug}`}
                    className="group bg-slate-50 border border-slate-200 hover:border-primary transition-all duration-300 flex flex-col h-full overflow-hidden shadow-xs hover:shadow-lg"
                  >
                    {/* Card Image */}
                    <div className="relative aspect-[16/10] w-full bg-slate-950 overflow-hidden">
                      <Image
                        src={ind.image}
                        alt={`${ind.name} - CFD Engineering`}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                      <div className="absolute top-3 left-3 font-mono text-[10px] font-extrabold bg-slate-950/80 text-white px-2.5 py-1 border border-white/20 backdrop-blur-xs uppercase">
                        0{idx + 1} // {ind.name.toUpperCase()}
                      </div>
                    </div>

                    {/* Card Content */}
                    <div className="p-6 flex flex-col justify-between flex-1 space-y-4">
                      <div className="space-y-2">
                        <h3 className="font-display font-black text-xl text-slate-900 uppercase tracking-tight group-hover:text-primary transition-colors flex items-center justify-between">
                          <span>{ind.name}</span>
                          <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-primary group-hover:translate-x-1 transition-all" />
                        </h3>
                        <p className="text-xs text-slate-600 font-sans leading-relaxed">
                          {ind.summary}
                        </p>
                      </div>

                      <div className="pt-4 border-t border-slate-200/80 flex items-center justify-between font-mono text-xs font-bold text-primary">
                        <span>Explore {ind.name} Services</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </Link>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        </section>

        {/* 5. WHY MACPROTEC SECTION (4 CARDS) */}
        <section className="py-20 bg-slate-950 text-white border-b border-slate-800 relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 space-y-16 relative z-10">
            {/* Header */}
            <div className="text-center max-w-3xl mx-auto space-y-4">
              <Reveal>
                <div className="inline-block font-mono text-xs font-bold text-rose-400 tracking-widest uppercase bg-rose-500/20 border border-rose-500/40 px-3 py-1">
                  WHY MACPROTEC
                </div>
              </Reveal>

              <Reveal>
                <h2 className="font-display font-black text-3xl sm:text-4xl lg:text-5xl text-white uppercase tracking-tight">
                  Why Choose MACPROTEC for Simulation?
                </h2>
              </Reveal>

              <Reveal>
                <p className="text-slate-300 font-sans text-base leading-relaxed">
                  Four core pillars that set our computational physics and engineering diagnostics apart.
                </p>
              </Reveal>
            </div>

            {/* 4 Feature Cards Grid */}
            <RevealGroup className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6" stagger={0.08}>
              {WHY_MACPROTEC_CARDS.map((card, idx) => {
                const IconComp = card.icon;
                return (
                  <RevealItem key={idx}>
                    <div className="bg-[#2d1b47] border border-[#3e2663] p-8 space-y-4 hover:border-primary transition-all duration-300 group h-full">
                      <div className="w-12 h-12 rounded bg-rose-500/10 border border-rose-500/30 text-primary flex items-center justify-center shrink-0">
                        <IconComp className="w-6 h-6" />
                      </div>

                      <h3 className="font-display font-extrabold text-xl text-white uppercase tracking-tight group-hover:text-rose-400 transition-colors">
                        {card.title}
                      </h3>

                      <p className="text-xs text-slate-400 font-sans leading-relaxed">
                        {card.desc}
                      </p>
                    </div>
                  </RevealItem>
                );
              })}
            </RevealGroup>
          </div>
        </section>

        {/* 6. CONTACT US / CTA BANNER */}
        <section className="py-16 lg:py-24 bg-white text-slate-900 relative overflow-hidden">
          <div className="max-w-5xl mx-auto px-6 lg:px-8 relative z-10">
            <div className="bg-[#2d1b47] text-white border border-[#3e2663] p-8 sm:p-12 shadow-2xl relative overflow-hidden text-center space-y-6">
              <div className="absolute top-0 right-0 w-64 h-64 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />

              <Reveal>
                <div className="inline-flex items-center gap-2 bg-rose-500/20 border border-rose-500/40 text-rose-400 px-3.5 py-1 font-mono text-xs font-bold uppercase rounded-full">
                  <FileCheck className="w-3.5 h-3.5" />
                  <span>OPTIMIZE BEFORE YOU BUILD</span>
                </div>
              </Reveal>

              <Reveal>
                <h2 className="font-display font-black text-3xl sm:text-5xl text-white uppercase tracking-tight">
                  Ready to Optimize Your Plant Performance?
                </h2>
              </Reveal>

              <Reveal>
                <p className="text-slate-300 font-sans text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
                  Whether troubleshooting existing operational challenges or validating new equipment designs,
                  our CFD simulation specialists are ready to assist.
                </p>
              </Reveal>

              <Reveal>
                <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
                  <Link
                    href="/lets-connect"
                    className="px-8 py-4 bg-primary hover:bg-rose-700 text-white font-mono text-xs font-bold uppercase tracking-wider transition-all duration-150 shadow-xl flex items-center gap-2 group"
                  >
                    <span>Request a Consultation</span>
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
        </section>
      </main>

      <Footer />
    </>
  );
}
