"use client";

import { useState } from "react";
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
  FileText,
  Settings,
  Building2,
  Compass,
  Award,
  Check,
  FileCheck,
  ClipboardList,
} from "lucide-react";

// Sub-services Data from PDF spec
const SERVICES_DATA = [
  {
    id: "01",
    key: "feasibility",
    title: "Feasibility Studies",
    summary: "Evaluate technical and economic feasibility before project investment.",
    tagline: "Reduce technical uncertainties and financial risks before capital commitment.",
    overview:
      "Every successful industrial project begins with a thorough understanding of its technical, operational, and economic viability. Investing in a new facility, expanding an existing plant, introducing new technologies, or modifying production processes requires careful evaluation. At MACPROTEC, we provide comprehensive Feasibility Study Engineering services to evaluate technical and economic viability before detailed engineering and project execution begin.",
    approach: [
      "Project Definition & Requirement Assessment",
      "Technical Feasibility Evaluation",
      "Process & Engineering Concept Development",
      "Economic & Financial Assessment (CAPEX/OPEX)",
      "Risk & Opportunity Analysis",
      "Engineering Recommendations & Project Roadmap",
    ],
    deliverables: [
      "Feasibility Study Report",
      "Technical Feasibility Assessment",
      "Process Concept Development",
      "Preliminary Process Flow Diagrams (PFD)",
      "Conceptual Plant Layout",
      "Preliminary Equipment List",
      "Utility Requirement Assessment",
      "Technology Comparison Study",
      "CAPEX & OPEX Estimates",
      "Risk Assessment & Mitigation Plan",
      "Project Execution Roadmap",
    ],
    benefits: [
      "Reduce Technical & Financial Project Risks",
      "Support Confident Investment Decisions",
      "Compare Engineering & Technology Alternatives",
      "Improve Budget & Schedule Planning",
      "Establish a Strong Engineering Foundation",
      "Optimize Capital & Operating Costs",
    ],
  },
  {
    id: "02",
    key: "feed",
    title: "FEED Engineering",
    summary: "Develop engineering packages for budgeting, procurement, and EPC execution.",
    tagline: "Build the Engineering Foundation for Successful Project Execution.",
    overview:
      "Many industrial projects experience budget overruns and construction delays because the engineering scope was not sufficiently developed. A comprehensive Front-End Engineering Design (FEED) study minimizes these uncertainties by transforming project concepts into a coordinated engineering package that provides the technical definition required for confident investment decisions and successful EPC execution.",
    approach: [
      "Design Basis & Project Definition",
      "Process Design Development (PFDs & P&IDs)",
      "Multidisciplinary Engineering Coordination",
      "Equipment Selection & Technical Specifications",
      "Cost Estimation & Project Planning",
      "Risk, Constructability & Execution Review",
    ],
    deliverables: [
      "Front-End Engineering Design (FEED) Report",
      "Design Basis Memorandum",
      "Process Flow Diagrams (PFDs)",
      "Preliminary Piping & Instrumentation Diagrams (P&IDs)",
      "General Arrangement & Plot Plans",
      "Equipment List & Technical Datasheets",
      "Utility Requirement Assessment",
      "Civil & Structural Concept Drawings",
      "Electrical Single Line Diagrams",
      "Instrument Index & Control Philosophy",
      "CAPEX Estimate & Budget Report",
    ],
    benefits: [
      "Reduce engineering and project execution risks",
      "Improve budget accuracy and investment confidence",
      "Establish a strong engineering basis for EPC implementation",
      "Support procurement planning and vendor evaluation",
      "Minimize engineering changes during detailed design and construction",
      "Optimize constructability, operability, and maintainability",
    ],
  },
  {
    id: "03",
    key: "detail",
    title: "Detail Engineering",
    summary: "Produce construction-ready drawings and engineering documentation.",
    tagline: "Transform approved engineering concepts into precise, construction-ready documentation.",
    overview:
      "Successful project execution depends on accurate, coordinated, and construction-ready engineering documentation. Poorly developed packages lead to fabrication errors and costly site modifications. At MACPROTEC, we provide comprehensive Detail Engineering services across process, mechanical, piping, civil & structural, electrical, and instrumentation disciplines to ensure seamless fabrication, installation, and commissioning.",
    approach: [
      "Engineering Design Review & Verification",
      "Multidisciplinary Detailed Design",
      "Construction Drawing Development",
      "Engineering Coordination & Interface Resolution",
      "Material Take-Off & Procurement Support",
      "Engineering Support During Construction",
    ],
    deliverables: [
      "Detailed Engineering Report",
      "Final PFDs & P&IDs",
      "General Arrangement Drawings",
      "Equipment & Piping Layouts",
      "Civil & Structural Construction Drawings",
      "Electrical Single Line Diagrams & Routing",
      "Cable Routing & Schedules",
      "Instrument Hook-up & Loop Drawings",
      "Material Take-Off (MTO) & BOQ",
      "Construction Specifications",
      "As-Built Documentation Support",
    ],
    benefits: [
      "Produce construction-ready engineering documentation",
      "Improve coordination across engineering disciplines",
      "Reduce fabrication and construction errors",
      "Minimize engineering changes during execution",
      "Improve constructability and installation efficiency",
      "Accelerate construction and commissioning timelines",
    ],
  },
  {
    id: "04",
    key: "process",
    title: "Process Engineering",
    summary: "Develop efficient and optimized industrial process systems.",
    tagline: "Design Efficient, Reliable, and Optimized Industrial Process Systems.",
    overview:
      "Process Engineering is at the core of every successful industrial facility. A well-designed process improves production efficiency, reduces operating costs, optimizes energy consumption, and ensures safe plant operation. We develop process flow diagrams, heat and mass balances, equipment sizing, and utility requirements across cement, mining, power, steel, and chemical facilities.",
    approach: [
      "Process Requirement Assessment",
      "Process Flow Development",
      "Heat & Mass Balance Calculations",
      "Equipment Sizing & Selection",
      "Utility System Design",
      "Process Optimization & Performance Evaluation",
    ],
    deliverables: [
      "Process Design Basis",
      "Process Flow Diagrams (PFDs)",
      "Heat & Mass Balance Reports",
      "Utility Balance Statements",
      "Equipment Sizing Calculations",
      "Equipment List & Specifications",
      "Process Operating Philosophy",
      "Process Simulation Models",
      "Utility Consumption Report",
    ],
    benefits: [
      "Improve process efficiency and plant performance",
      "Optimize energy and utility consumption",
      "Support reliable and stable plant operation",
      "Reduce operating costs",
      "Improve equipment selection and sizing accuracy",
      "Establish a strong foundation for multidisciplinary engineering",
    ],
  },
  {
    id: "05",
    key: "multidisciplinary",
    title: "Multidisciplinary Engineering",
    summary: "Deliver coordinated mechanical, piping, civil & structural, electrical, and instrumentation engineering.",
    tagline: "Deliver Integrated Engineering Solutions Across All Disciplines.",
    overview:
      "Industrial projects require seamless coordination between multiple engineering disciplines to ensure safe, efficient, and constructible facility designs. At MACPROTEC, we integrate mechanical, piping, civil & structural, electrical, and instrumentation engineering into a single coordinated engineering solution that eliminates design conflicts and lowers project risks.",
    approach: [
      "Project Design Coordination",
      "Discipline Engineering Development",
      "Interdisciplinary Design Review",
      "Engineering Integration & Clash Resolution",
      "Design Verification & Quality Assurance",
      "Engineering Support for Project Execution",
    ],
    deliverables: [
      "Mechanical Engineering Packages & Rotating Machinery",
      "Piping Layouts & Engineering Documentation",
      "Civil & Structural Drawings & Foundation Calculations",
      "Electrical Distribution & Single Line Diagrams",
      "Instrumentation & Control Architecture (PLC/SCADA)",
      "General Arrangement Drawings",
      "Material Take-Off (MTO) & BOQ",
      "Multidisciplinary Design Review Reports",
    ],
    benefits: [
      "Deliver fully coordinated engineering solutions",
      "Improve collaboration across engineering disciplines",
      "Reduce design conflicts and engineering rework",
      "Improve constructability and installation efficiency",
      "Enhance plant safety, reliability, and maintainability",
      "Minimize project risks and engineering change orders",
    ],
  },
  {
    id: "06",
    key: "epc-support",
    title: "EPC Technical Support",
    summary: "Provide engineering assistance throughout procurement, construction, and commissioning.",
    tagline: "Continuous Technical Assurance from Procurement to Plant Startup.",
    overview:
      "Bridging the gap between engineering and site execution is essential for project delivery. Our EPC technical support team assists owners and contractors with vendor drawing reviews, technical query (TQ) resolution, site constructability reviews, and commissioning assistance to ensure plant installation matches engineering specifications.",
    approach: [
      "Vendor Drawing & Print Review",
      "Procurement Specification Compliance Check",
      "Technical Query (TQ) Resolution",
      "Site Constructability Reviews",
      "Pre-Commissioning & Startup Support",
      "As-Built Engineering Finalization",
    ],
    deliverables: [
      "Vendor Document Approval Logs",
      "Technical Query (TQ) Response Sheets",
      "Site Inspection & Technical Audit Reports",
      "Commissioning Checklists & Punch List Clearing",
      "Final As-Built Technical Dossier",
    ],
    benefits: [
      "Ensure vendor equipment matches design intent",
      "Resolve technical queries rapidly to prevent site delays",
      "Streamline pre-commissioning and plant startup",
      "Deliver accurate final as-built drawings for operations",
    ],
  },
];

// Why Choose Features
const WHY_CHOOSE_ITEMS = [
  {
    title: "Industry-Focused Expertise",
    desc: "Deep domain knowledge across cement, mining, power, steel, and chemical process facilities.",
    icon: Factory,
  },
  {
    title: "Integrated Multidisciplinary Design",
    desc: "Process, mechanical, piping, structural, electrical, and automation working under one roof.",
    icon: Layers,
  },
  {
    title: "Practical & Constructible Solutions",
    desc: "Designs engineered for ease of fabrication, site erection, operability, and maintainability.",
    icon: Wrench,
  },
  {
    title: "Digital Engineering Excellence",
    desc: "State-of-the-art 3D plant modeling, simulation tools, and digital twin compatibility.",
    icon: Cpu,
  },
  {
    title: "Quality & International Standards",
    desc: "Strict compliance with ASME, API, DIN, ISO, and client-specific design specifications.",
    icon: ShieldCheck,
  },
  {
    title: "End-to-End Engineering Support",
    desc: "From conceptual feasibility to FEED, detail design, and site commissioning support.",
    icon: TrendingUp,
  },
];

export default function EngineeringDesignServicePage() {
  const [activeTabKey, setActiveTabKey] = useState("feasibility");
  const selectedService = SERVICES_DATA.find((s) => s.key === activeTabKey) || SERVICES_DATA[0];

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
              <Link href="/solutions" className="hover:text-white transition-colors">
                Solutions
              </Link>
              <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
              <span className="text-primary font-bold">Engineering Design Services</span>
            </div>
            <div className="hidden sm:flex items-center gap-3 text-[10px] text-slate-400">
              <span className="font-bold text-rose-400">SOLUTION 01</span>
              <span>•</span>
              <span>MULTIDISCIPLINARY DESIGN</span>
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
                    <span>SOLUTION CARD 01 // MULTIDISCIPLINARY</span>
                  </div>
                </Reveal>

                <Reveal>
                  <h1 className="font-display font-extrabold text-3xl sm:text-5xl lg:text-6xl text-slate-900 uppercase tracking-tight leading-[1.1]">
                    Engineering Design <span className="text-primary">Services</span>
                  </h1>
                </Reveal>

                <Reveal>
                  <p className="text-base sm:text-lg text-slate-600 font-sans leading-relaxed max-w-2xl">
                    Develop integrated multidisciplinary engineering solutions from feasibility studies
                    through detailed engineering and EPC technical support.
                  </p>
                </Reveal>

                {/* Hero Badges */}
                <Reveal>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
                    <div className="bg-slate-50 border border-slate-200 p-3 rounded font-mono text-xs text-slate-800 font-bold flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                      <span>Feasibility Studies</span>
                    </div>
                    <div className="bg-slate-50 border border-slate-200 p-3 rounded font-mono text-xs text-slate-800 font-bold flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                      <span>FEED Engineering</span>
                    </div>
                    <div className="bg-slate-50 border border-slate-200 p-3 rounded font-mono text-xs text-slate-800 font-bold flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                      <span>Detail Engineering</span>
                    </div>
                  </div>
                </Reveal>

                {/* Hero Action Buttons */}
                <Reveal>
                  <div className="flex flex-wrap items-center gap-4 pt-4">
                    <a
                      href="#services-breakdown"
                      className="px-6 py-3.5 bg-primary hover:bg-rose-700 text-white font-mono text-xs font-bold uppercase tracking-wider transition-all duration-150 shadow-md flex items-center gap-2 group"
                    >
                      <span>Explore Services</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </a>

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
                      src="/images/card_engineering_design.png"
                      alt="MACPROTEC Engineering Design Model 3D"
                      width={700}
                      height={500}
                      className="w-full h-[380px] sm:h-[450px] object-cover group-hover:scale-105 transition-transform duration-500"
                      priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent z-10" />

                    <div className="absolute bottom-5 left-5 right-5 z-20 bg-slate-950/90 border border-slate-800 p-4 backdrop-blur-md font-mono text-white flex items-center justify-between">
                      <div>
                        <div className="text-[10px] text-rose-400 font-bold uppercase tracking-wider">
                          DISCIPLINE HIGHLIGHT
                        </div>
                        <div className="text-sm font-extrabold font-display uppercase tracking-tight text-white mt-0.5">
                          MULTIDISCIPLINARY PLANT 3D MODEL
                        </div>
                      </div>
                      <div className="w-10 h-10 rounded bg-primary/20 border border-primary/40 flex items-center justify-center text-primary shrink-0">
                        <Layers className="w-5 h-5" />
                      </div>
                    </div>
                  </div>
                </Reveal>
              </div>
            </div>
          </div>
        </section>

        {/* 2. ABOUT ENGINEERING DESIGN */}
        <section className="py-20 bg-slate-50 border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="bg-white border border-slate-200 p-8 sm:p-12 shadow-sm space-y-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 border-b border-l border-rose-500/10 pointer-events-none" />

              <div className="max-w-3xl space-y-4">
                <Reveal>
                  <div className="inline-block font-mono text-xs font-bold text-primary uppercase tracking-widest bg-rose-50 border border-rose-200 px-3 py-1">
                    ABOUT ENGINEERING DESIGN
                  </div>
                </Reveal>

                <Reveal>
                  <h2 className="font-display font-black text-2xl sm:text-4xl text-slate-900 uppercase tracking-tight">
                    Engineering That Builds Industrial Success
                  </h2>
                </Reveal>

                <Reveal>
                  <p className="text-slate-600 font-sans text-base leading-relaxed">
                    Engineering design is the foundation of every successful industrial project. From initial
                    feasibility studies through detailed engineering and construction support, every design
                    decision directly influences project cost, operational efficiency, safety, maintainability,
                    and long-term reliability.
                  </p>
                </Reveal>

                <Reveal>
                  <p className="text-slate-600 font-sans text-base leading-relaxed pt-2">
                    At MACPROTEC, we provide integrated multidisciplinary engineering services that combine
                    process, mechanical, piping, civil, structural, electrical, and automation engineering into
                    a coordinated design approach. Whether supporting greenfield developments, brownfield
                    modifications, plant expansions, or EPC projects, our engineering solutions are developed to
                    international standards while remaining practical, constructible, and focused on long-term
                    operational performance.
                  </p>
                </Reveal>
              </div>

              {/* Grid Metrics Highlights */}
              <Reveal>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-slate-100 font-mono text-xs">
                  <div className="p-4 bg-slate-50 border border-slate-200">
                    <div className="text-[10px] text-slate-400 uppercase font-bold">FEASIBILITY</div>
                    <div className="text-lg font-bold text-slate-900 mt-1">CapEx & OpEx</div>
                    <div className="text-[10px] text-slate-500 mt-0.5">Techno-Economic Study</div>
                  </div>

                  <div className="p-4 bg-slate-50 border border-slate-200">
                    <div className="text-[10px] text-slate-400 uppercase font-bold">FEED DESIGN</div>
                    <div className="text-lg font-bold text-slate-900 mt-1">P&ID / Plot Plan</div>
                    <div className="text-[10px] text-slate-500 mt-0.5">EPC Execution Basis</div>
                  </div>

                  <div className="p-4 bg-slate-50 border border-slate-200">
                    <div className="text-[10px] text-slate-400 uppercase font-bold">DETAIL PACKAGE</div>
                    <div className="text-lg font-bold text-slate-900 mt-1">MTO & BOQ</div>
                    <div className="text-[10px] text-slate-500 mt-0.5">Construction Drawings</div>
                  </div>

                  <div className="p-4 bg-slate-50 border border-slate-200">
                    <div className="text-[10px] text-slate-400 uppercase font-bold">EPC SUPPORT</div>
                    <div className="text-lg font-bold text-slate-900 mt-1">Site QA/QC</div>
                    <div className="text-[10px] text-slate-500 mt-0.5">TQ & Vendor Review</div>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* 3. ENGINEERING DESIGN SERVICES (12 CARDS & INTERACTIVE EXPLORER) */}
        <section id="services-breakdown" className="py-20 bg-white border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 space-y-12">
            {/* Header */}
            <div className="text-center max-w-3xl mx-auto space-y-4">
              <Reveal>
                <div className="inline-block font-mono text-xs font-bold text-primary uppercase tracking-widest bg-rose-50 border border-rose-200 px-3 py-1">
                  ENGINEERING DESIGN SERVICES
                </div>
              </Reveal>

              <Reveal>
                <h2 className="font-display font-black text-3xl sm:text-4xl text-slate-900 uppercase tracking-tight">
                  Multidisciplinary Capabilities Across Lifecycle
                </h2>
              </Reveal>

              <Reveal>
                <p className="text-slate-600 font-sans text-base leading-relaxed">
                  Explore our multidisciplinary engineering capabilities throughout the complete project
                  lifecycle. Select any service below to review the engineering approach, deliverables, and key benefits.
                </p>
              </Reveal>
            </div>

            {/* Interactive Sub-Services Selector Tabs */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 font-mono text-xs">
              {SERVICES_DATA.map((srv) => {
                const isSelected = activeTabKey === srv.key;
                return (
                  <button
                    key={srv.key}
                    onClick={() => setActiveTabKey(srv.key)}
                    className={`p-4 border text-left transition-all duration-200 flex flex-col justify-between h-28 group ${
                      isSelected
                        ? "bg-slate-950 text-white border-slate-950 shadow-lg"
                        : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100 hover:border-slate-300"
                    }`}
                  >
                    <div className="flex items-center justify-between w-full">
                      <span
                        className={`text-[10px] font-bold ${
                          isSelected ? "text-rose-400" : "text-slate-400"
                        }`}
                      >
                        SUB-{srv.id}
                      </span>
                      {isSelected && <Sparkles className="w-3.5 h-3.5 text-primary" />}
                    </div>

                    <div className="font-bold text-xs leading-tight line-clamp-2">{srv.title}</div>
                  </button>
                );
              })}
            </div>

            {/* DEEP-DIVE SERVICE DETAILS PANEL */}
            <Reveal key={selectedService.key}>
              <div className="bg-slate-950 text-white border border-slate-800 p-8 sm:p-12 shadow-2xl space-y-10 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-80 h-80 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />

                {/* Sub-Service Banner Header */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 border-b border-slate-800 pb-8 relative z-10">
                  <div className="space-y-2 max-w-3xl">
                    <div className="inline-flex items-center gap-2 bg-rose-500/20 border border-rose-500/40 text-rose-400 px-3 py-1 font-mono text-[11px] font-bold uppercase rounded-full">
                      <span>SERVICE {selectedService.id} SUMMARY</span>
                    </div>

                    <h3 className="font-display font-extrabold text-2xl sm:text-4xl text-white uppercase tracking-tight">
                      {selectedService.title}
                    </h3>

                    <p className="text-rose-400 font-mono text-xs font-semibold italic">
                      "{selectedService.tagline}"
                    </p>

                    <p className="text-slate-300 font-sans text-sm sm:text-base leading-relaxed pt-2">
                      {selectedService.overview}
                    </p>
                  </div>

                  <Link
                    href="/lets-connect"
                    className="px-6 py-3.5 bg-primary hover:bg-rose-700 text-white font-mono text-xs font-bold uppercase tracking-wider shrink-0 transition-colors shadow-lg flex items-center gap-2"
                  >
                    <span>Request Service Inquiry</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>

                {/* 3 Columns: Approach, Deliverables & Benefits */}
                <div className="grid lg:grid-cols-3 gap-8 relative z-10">
                  {/* Column 1: Engineering Approach */}
                  <div className="bg-slate-900/90 border border-slate-800 p-6 space-y-4">
                    <div className="flex items-center gap-2.5 text-rose-400 font-mono text-xs font-bold uppercase border-b border-slate-800 pb-3">
                      <Compass className="w-4 h-4 text-primary" />
                      <span>Engineering Approach</span>
                    </div>

                    <ul className="space-y-3 font-sans text-xs text-slate-300">
                      {selectedService.approach.map((item, i) => (
                        <li key={i} className="flex items-start gap-2.5">
                          <span className="w-5 h-5 rounded-full bg-rose-500/20 text-rose-400 font-mono text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                            {i + 1}
                          </span>
                          <span className="leading-snug">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Column 2: Engineering Deliverables */}
                  <div className="bg-slate-900/90 border border-slate-800 p-6 space-y-4">
                    <div className="flex items-center gap-2.5 text-rose-400 font-mono text-xs font-bold uppercase border-b border-slate-800 pb-3">
                      <ClipboardList className="w-4 h-4 text-primary" />
                      <span>Engineering Deliverables</span>
                    </div>

                    <ul className="space-y-2 font-mono text-[11px] text-slate-300">
                      {selectedService.deliverables.map((item, i) => (
                        <li key={i} className="flex items-center gap-2 border-b border-slate-800/40 pb-1.5">
                          <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                          <span className="truncate">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Column 3: Key Benefits */}
                  <div className="bg-slate-900/90 border border-slate-800 p-6 space-y-4">
                    <div className="flex items-center gap-2.5 text-rose-400 font-mono text-xs font-bold uppercase border-b border-slate-800 pb-3">
                      <Award className="w-4 h-4 text-primary" />
                      <span>Key Project Benefits</span>
                    </div>

                    <ul className="space-y-2.5 font-sans text-xs text-slate-300">
                      {selectedService.benefits.map((item, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                          <span className="leading-snug">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </Reveal>

            {/* 6 Grid Cards Showcase */}
            <RevealGroup className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 pt-6" stagger={0.06}>
              {SERVICES_DATA.map((srv) => (
                <RevealItem key={srv.key}>
                  <div className="bg-slate-50 border border-slate-200 p-6 space-y-4 h-full flex flex-col justify-between hover:border-primary/60 transition-all duration-200 group">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between font-mono text-[10px] text-slate-400">
                        <span className="font-bold text-primary uppercase">SUB-SERVICE {srv.id}</span>
                        <span>MULTIDISCIPLINARY</span>
                      </div>

                      <h4 className="font-display font-extrabold text-lg text-slate-900 uppercase tracking-tight group-hover:text-primary transition-colors">
                        {srv.title}
                      </h4>

                      <p className="text-xs text-slate-600 font-sans leading-relaxed">
                        {srv.summary}
                      </p>
                    </div>

                    <button
                      onClick={() => {
                        setActiveTabKey(srv.key);
                        const el = document.getElementById("services-breakdown");
                        if (el) el.scrollIntoView({ behavior: "smooth" });
                      }}
                      className="pt-4 border-t border-slate-200 font-mono text-xs font-bold text-primary hover:text-rose-700 uppercase tracking-wider flex items-center justify-between w-full"
                    >
                      <span>View Service Details</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        </section>

        {/* 4. WHY CHOOSE MACPROTEC FOR ENGINEERING DESIGN */}
        <section className="py-20 bg-slate-950 text-white border-b border-slate-800 overflow-hidden relative">
          <div className="absolute top-0 right-0 w-96 h-96 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="max-w-7xl mx-auto px-6 lg:px-8 space-y-16 relative z-10">
            {/* Header */}
            <div className="text-center max-w-3xl mx-auto space-y-4">
              <Reveal>
                <div className="inline-block font-mono text-xs font-bold text-rose-400 tracking-widest uppercase bg-rose-500/20 border border-rose-500/40 px-3 py-1">
                  WHY CHOOSE MACPROTEC
                </div>
              </Reveal>

              <Reveal>
                <h2 className="font-display font-black text-3xl sm:text-4xl lg:text-5xl text-white uppercase tracking-tight">
                  Why Choose MACPROTEC for Engineering Design?
                </h2>
              </Reveal>

              <Reveal>
                <p className="text-slate-300 font-sans text-base leading-relaxed">
                  We combine deep industry process knowledge with multidisciplinary design tools to deliver
                  constructible, safe, and cost-effective engineering packages.
                </p>
              </Reveal>
            </div>

            {/* 6 Feature Cards Grid */}
            <RevealGroup className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8" stagger={0.07}>
              {WHY_CHOOSE_ITEMS.map((item, idx) => {
                const IconComp = item.icon;
                return (
                  <RevealItem key={idx}>
                    <div className="bg-slate-900 border border-slate-800 p-8 space-y-4 hover:border-primary/50 transition-all duration-300 group h-full">
                      <div className="w-12 h-12 rounded bg-rose-500/10 border border-rose-500/30 text-primary flex items-center justify-center shrink-0">
                        <IconComp className="w-6 h-6" />
                      </div>

                      <h3 className="font-display font-extrabold text-xl text-white uppercase tracking-tight group-hover:text-rose-400 transition-colors">
                        {item.title}
                      </h3>

                      <p className="text-xs text-slate-400 font-sans leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </RevealItem>
                );
              })}
            </RevealGroup>
          </div>
        </section>

        {/* 5. CONTACT US / CTA BANNER */}
        <section className="py-16 lg:py-24 bg-white text-slate-900 relative overflow-hidden">
          <div className="max-w-5xl mx-auto px-6 lg:px-8 relative z-10">
            <div className="bg-slate-900 text-white border border-slate-800 p-8 sm:p-12 shadow-2xl relative overflow-hidden text-center space-y-6">
              <div className="absolute top-0 right-0 w-64 h-64 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />

              <Reveal>
                <div className="inline-flex items-center gap-2 bg-rose-500/20 border border-rose-500/40 text-rose-400 px-3.5 py-1 font-mono text-xs font-bold uppercase rounded-full">
                  <FileCheck className="w-3.5 h-3.5" />
                  <span>READY TO ENGINEER YOUR PROJECT?</span>
                </div>
              </Reveal>

              <Reveal>
                <h2 className="font-display font-black text-3xl sm:text-5xl text-white uppercase tracking-tight">
                  Let's Discuss Your Design Requirements
                </h2>
              </Reveal>

              <Reveal>
                <p className="text-slate-300 font-sans text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
                  Connect with MACPROTEC engineering specialists to evaluate feasibility studies, FRONT-END
                  FEED designs, or detailed engineering requirements for your facility.
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
