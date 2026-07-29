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

// Sub-services Data from PDF spec (Solution Card 2: Process Simulation & Digital Twin)
const SERVICES_DATA = [
  {
    id: "01",
    key: "hmb",
    title: "Heat & Mass Balance",
    summary:
      "Develop accurate material and energy balances to evaluate process performance, equipment loading, and energy efficiency.",
    tagline:
      "Quantify material and thermal energy flows throughout industrial processes to establish a reliable engineering foundation.",
    overview:
      "Heat & Mass Balance (HMB) is a fundamental engineering study used to quantify the flow of materials and energy throughout an industrial process. It provides a complete understanding of process inputs, outputs, heat transfer, and equipment loading, forming the basis for process design, equipment sizing, plant optimization, and performance evaluation. An accurate heat and mass balance ensures that every process unit operates within its design limits while maximizing efficiency and minimizing energy consumption.",
    overviewExtended:
      "At MACPROTEC, we develop comprehensive Heat & Mass Balance models for new plant designs, capacity expansions, process modifications, and operational improvement studies. Our engineers evaluate material flows, thermal energy distribution, fuel consumption, utility requirements, and process losses to identify opportunities for improving efficiency and supporting sound engineering decisions. These studies form the foundation for detailed engineering, process simulation, and digital twin development across cement plants and other heavy process industries.",
    approach: [
      "Process Data Collection & Design Basis",
      "Material & Energy Balance Development",
      "Process Flow & Equipment Evaluation",
      "Utility & Fuel Consumption Analysis",
      "Process Validation & Performance Assessment",
      "Engineering Recommendations & Optimization Opportunities",
    ],
    deliverables: [
      "Heat & Mass Balance Report",
      "Material Flow Summary",
      "Energy Balance Summary",
      "Process Flow Diagrams (PFDs)",
      "Utility Consumption Analysis",
      "Fuel Consumption Assessment",
      "Equipment Duty & Loading Calculations",
      "Process Performance Evaluation",
      "Engineering Calculations",
      "Optimization Recommendations",
    ],
    benefits: [
      "Establish a reliable foundation for process design",
      "Improve energy efficiency and reduce operating costs",
      "Validate equipment capacity and process performance",
      "Support plant expansions and process modifications",
      "Identify process inefficiencies and energy losses",
      "Improve engineering accuracy for downstream design activities",
      "Support process simulation and digital twin development",
      "Enable informed engineering and investment decisions",
    ],
  },
  {
    id: "02",
    key: "pyroprocess",
    title: "Pyroprocess Simulation",
    summary:
      "Simulate kilns, preheaters, calciners, and clinker coolers to improve thermal efficiency, combustion stability, and production performance.",
    tagline:
      "Optimize high-temperature thermo-chemical reactions, combustion stability, and thermal efficiency in rotary kiln systems.",
    overview:
      "The pyroprocess is the heart of a cement plant, where raw materials are transformed into clinker through complex thermal and chemical reactions. Efficient operation of the preheater, calciner, rotary kiln, and clinker cooler is essential for maximizing production, reducing fuel consumption, maintaining product quality, and minimizing emissions. Pyroprocess simulation enables engineers to evaluate plant performance, predict process behavior, and optimize operating conditions before implementing changes in the plant.",
    overviewExtended:
      "At MACPROTEC, we provide advanced Pyroprocess Simulation services to analyze and optimize cement manufacturing processes. Using process simulation models and plant operating data, we evaluate heat transfer, combustion performance, material flow, fuel utilization, and equipment efficiency to identify operational improvements and process bottlenecks. Our solutions support new plant design, production upgrades, alternative fuel implementation, debottlenecking studies, and operational optimization, helping clients improve plant performance while reducing operating costs.",
    approach: [
      "Process Data Collection & Plant Assessment",
      "Pyroprocess Model Development",
      "Thermal & Combustion Analysis",
      "Process Performance Evaluation",
      "Scenario Simulation & Optimization",
      "Engineering Recommendations",
    ],
    deliverables: [
      "Pyroprocess Simulation Report",
      "Heat & Mass Balance Validation",
      "Kiln System Performance Analysis",
      "Combustion & Fuel Consumption Assessment",
      "Process Bottleneck Identification",
      "Equipment Performance Evaluation",
      "Operating Scenario Analysis",
      "Energy Efficiency Assessment",
      "Optimization Recommendations",
      "Engineering Calculations & Technical Documentation",
    ],
    benefits: [
      "Improve thermal efficiency and clinker production",
      "Reduce specific fuel consumption and operating costs",
      "Evaluate process changes before plant implementation",
      "Identify process bottlenecks and performance limitations",
      "Support alternative fuel implementation strategies",
      "Improve kiln stability and operational reliability",
      "Enhance product quality through optimized process conditions",
      "Support capacity expansion and continuous process improvement",
    ],
  },
  {
    id: "03",
    key: "grinding",
    title: "Grinding Circuit Simulation",
    summary:
      "Analyze raw and cement grinding systems to optimize mill operation, separator performance, product quality, and energy consumption.",
    tagline:
      "Maximize throughput, separator efficiency, and specific power reduction across raw meal and cement grinding mills.",
    overview:
      "Grinding is one of the most energy-intensive processes in cement manufacturing, directly influencing production capacity, product quality, and operating costs. The performance of mills, separators, classifiers, and material transport systems must be carefully balanced to achieve optimum throughput and energy efficiency. Grinding Circuit Simulation enables engineers to evaluate the complete grinding process, identify performance limitations, and optimize operating conditions without disrupting plant production.",
    overviewExtended:
      "At MACPROTEC, we provide advanced Grinding Circuit Simulation services for raw meal, cement, and slag grinding systems. Using process simulation models and plant operating data, we analyze mill performance, separator efficiency, circulating loads, material flow, and energy consumption to identify bottlenecks and improvement opportunities. Our solutions support capacity expansion, equipment upgrades, process optimization, debottlenecking studies, and energy reduction initiatives, helping clients maximize productivity while maintaining consistent product quality.",
    approach: [
      "Plant Data Collection & Circuit Assessment",
      "Grinding Circuit Model Development",
      "Mill & Separator Performance Analysis",
      "Process Performance Evaluation",
      "Scenario Simulation & Optimization",
      "Engineering Recommendations",
    ],
    deliverables: [
      "Grinding Circuit Simulation Report",
      "Mill Performance Analysis",
      "Separator Efficiency Assessment",
      "Circulating Load Evaluation",
      "Equipment Performance Assessment",
      "Energy Consumption Analysis",
      "Process Bottleneck Identification",
      "Operating Scenario Analysis",
      "Optimization Recommendations",
      "Engineering Calculations & Technical Documentation",
    ],
    benefits: [
      "Increase grinding capacity and plant throughput",
      "Reduce specific power consumption and operating costs",
      "Improve mill and separator performance",
      "Identify bottlenecks within the grinding circuit",
      "Evaluate process changes before implementation",
      "Improve product quality and process stability",
      "Support equipment upgrades and debottlenecking projects",
      "Maximize overall grinding system efficiency",
    ],
  },
  {
    id: "04",
    key: "altfuel",
    title: "Alternative Fuel Simulation",
    summary:
      "Evaluate alternative fuel substitution strategies to improve fuel efficiency, reduce emissions, and maintain stable kiln operation.",
    tagline:
      "De-risk alternative fuel co-processing, combustion behavior, and thermal substitution in cement kilns.",
    overview:
      "The increasing use of alternative fuels is transforming cement manufacturing by reducing dependence on conventional fossil fuels, lowering operating costs, and supporting sustainability objectives. However, introducing alternative fuels can significantly affect combustion characteristics, heat distribution, kiln stability, clinker quality, and emissions. Alternative Fuel Simulation enables engineers to evaluate these impacts in a virtual environment, reducing technical risks before implementation.",
    overviewExtended:
      "At MACPROTEC, we provide Alternative Fuel Simulation services to assess the technical and operational feasibility of fuel substitution in cement plants. Using advanced process simulation and plant operating data, we evaluate combustion performance, thermal efficiency, fuel replacement ratios, process stability, and equipment performance under different operating conditions. Our studies help clients identify the optimum alternative fuel strategy while maintaining production capacity, clinker quality, and environmental compliance.",
    approach: [
      "Plant & Fuel Data Collection",
      "Alternative Fuel Characterization",
      "Combustion & Process Simulation",
      "Thermal Performance Evaluation",
      "Fuel Substitution Scenario Analysis",
      "Engineering Recommendations & Optimization",
    ],
    deliverables: [
      "Alternative Fuel Simulation Report",
      "Fuel Characterization & Assessment",
      "Combustion Performance Analysis",
      "Heat & Mass Balance Validation",
      "Fuel Substitution Evaluation",
      "Thermal Efficiency Assessment",
      "Process Stability Analysis",
      "Equipment Performance Assessment",
      "Optimization Recommendations",
      "Engineering Calculations & Technical Documentation",
    ],
    benefits: [
      "Evaluate alternative fuel strategies before implementation",
      "Reduce fossil fuel consumption and operating costs",
      "Improve thermal efficiency and fuel utilization",
      "Assess the impact of fuel substitution on kiln performance",
      "Maintain clinker quality and process stability",
      "Support sustainability and decarbonization initiatives",
      "Minimize technical risks associated with fuel conversion",
      "Enable informed investment and operational decisions",
    ],
  },
  {
    id: "05",
    key: "digitaltwin",
    title: "Digital Twin Development",
    summary:
      "Develop virtual replicas of industrial processes by integrating engineering models with operational plant data for real-time monitoring and optimization.",
    tagline: "Create a Virtual Representation of Your Plant for Smarter Operations.",
    overview:
      "A Digital Twin is a dynamic virtual model of an industrial plant that combines engineering design, process simulation, and real-time operational data to accurately represent plant performance. It enables operators and engineers to monitor equipment, predict process behavior, evaluate operational changes, and optimize production without disrupting plant operations. By transforming data into actionable insights, Digital Twins support better decision-making, improved reliability, and continuous performance improvement.",
    overviewExtended:
      "At MACPROTEC, we develop Digital Twin solutions that integrate engineering models with plant data to provide a comprehensive digital representation of industrial processes. Our solutions support real-time performance monitoring, process optimization, predictive analysis, scenario evaluation, and operational decision-making. Whether for new facilities or existing plants, Digital Twin technology helps clients improve productivity, reduce downtime, optimize energy consumption, and accelerate their digital transformation journey.",
    approach: [
      "Plant Assessment & Digitalization Strategy",
      "Process & Equipment Model Development",
      "Data Integration & Model Validation",
      "Digital Twin Configuration",
      "Performance Monitoring & Scenario Evaluation",
      "Optimization & Continuous Improvement",
    ],
    deliverables: [
      "Digital Twin Engineering Model",
      "Process & Equipment Models",
      "Plant Data Integration Framework",
      "Performance Monitoring Dashboard",
      "Process Performance Analysis",
      "Scenario Evaluation Studies",
      "Optimization Recommendations",
      "System Validation Report",
      "User Documentation",
      "Training & Implementation Support",
    ],
    benefits: [
      "Monitor plant performance in real time",
      "Predict process behavior before operational changes",
      "Improve production efficiency and equipment utilization",
      "Reduce unplanned downtime through predictive analysis",
      "Support data-driven operational and maintenance decisions",
      "Accelerate troubleshooting and process optimization",
      "Improve energy efficiency and overall plant reliability",
      "Enable long-term digital transformation and continuous improvement",
    ],
  },
  {
    id: "06",
    key: "optimization",
    title: "Process Optimization",
    summary:
      "Identify operational improvements through simulation studies to increase production, eliminate bottlenecks, reduce energy consumption, and improve plant reliability.",
    tagline: "Eliminate operational bottlenecks, lower energy consumption, and achieve peak production efficiency.",
    overview:
      "Achieving maximum production efficiency requires continuous evaluation and optimization of industrial processes. Over time, changing operating conditions, equipment wear, process constraints, and production demands can reduce plant performance and increase energy consumption. Process Optimization uses engineering analysis, simulation, and operational data to identify inefficiencies, eliminate bottlenecks, and improve overall plant performance without unnecessary capital investment.",
    overviewExtended:
      "At MACPROTEC, we provide comprehensive Process Optimization services to help industrial facilities achieve higher productivity, lower operating costs, improved energy efficiency, and greater process stability. By combining process engineering, simulation, plant data analysis, and operational expertise, we identify practical improvement opportunities across the entire production process. Our optimization studies support debottlenecking, capacity enhancement, energy reduction, equipment performance improvement, and continuous operational excellence.",
    approach: [
      "Plant Performance Assessment",
      "Process Data Analysis",
      "Bottleneck Identification",
      "Process Simulation & Scenario Evaluation",
      "Optimization Strategy Development",
      "Performance Validation & Engineering Recommendations",
    ],
    deliverables: [
      "Process Performance Assessment Report",
      "Process Data Analysis",
      "Bottleneck Identification Study",
      "Process Simulation Results",
      "Equipment Performance Evaluation",
      "Energy Efficiency Assessment",
      "Capacity Improvement Analysis",
      "Optimization Recommendations",
      "Implementation Roadmap",
      "Engineering Calculations & Technical Documentation",
    ],
    benefits: [
      "Increase plant production capacity and throughput",
      "Reduce energy consumption and operating costs",
      "Eliminate process bottlenecks and operational constraints",
      "Improve equipment utilization and process reliability",
      "Enhance process stability and product quality",
      "Support capacity expansion with minimal capital investment",
      "Improve overall plant efficiency through data-driven decisions",
      "Enable continuous operational improvement and sustainable performance",
    ],
  },
];

// Why Choose Features (From PDF Page 15)
const WHY_CHOOSE_ITEMS = [
  {
    title: "Industry-Focused Process Expertise",
    desc: "Deep domain knowledge across cement, mining, power, steel, and chemical process facilities.",
    icon: Factory,
  },
  {
    title: "Advanced Simulation & Digital Engineering",
    desc: "State-of-the-art steady-state & dynamic process modeling, thermo-chemical solvers, and digital twin architectures.",
    icon: Cpu,
  },
  {
    title: "Performance-Driven Optimization",
    desc: "Engineering solutions targeted directly at debottlenecking, throughput growth, and energy reduction.",
    icon: TrendingUp,
  },
  {
    title: "Data-Driven Decision Support",
    desc: "Transforming telemetry and simulation outputs into actionable operational insights and capital planning.",
    icon: BarChart3,
  },
  {
    title: "Integrated Engineering Solutions",
    desc: "Seamless integration between process balances, CFD modeling, detailed design, and DCS automation.",
    icon: Layers,
  },
  {
    title: "Continuous Improvement & Digital Transformation",
    desc: "Empowering plant operators to monitor, predict, and continuously optimize process performance across the plant lifecycle.",
    icon: ShieldCheck,
  },
];

export default function ProcessSimulationServicePage() {
  const [activeTabKey, setActiveTabKey] = useState("hmb");
  const selectedService = SERVICES_DATA.find((s) => s.key === activeTabKey) || SERVICES_DATA[0];

  return (
    <>
      <TechnicalCursor />
      <Header />

      <main className="bg-slate-50 min-h-screen text-slate-800 font-sans selection:bg-rose-500 selection:text-white">
        {/* BREADCRUMB / DOSSIER TOP BAR */}
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
              <span className="text-primary font-bold">Process Simulation & Digital Twin</span>
            </div>
            <div className="hidden sm:flex items-center gap-3 text-[10px] text-slate-400">
              <span className="font-bold text-rose-400">SOLUTION 02</span>
              <span>•</span>
              <span>SIMULATION & DIGITAL TWIN</span>
            </div>
          </div>
        </section>

        {/* 1. FULL-WIDTH HERO SECTION (Resources Style with Black Overlay) */}
        <section className="w-full relative bg-black border-b-2 border-primary/30 py-16 sm:py-20 lg:py-24 overflow-hidden group">
          {/* Full-width Background Image */}
          <div className="absolute inset-0 w-full h-full pointer-events-none">
            <Image
              src="/images/card_digital_twin.png"
              alt="MACPROTEC Process Simulation & Digital Twin"
              fill
              priority
              className="object-cover object-center opacity-90 group-hover:scale-105 transition-transform duration-1000 ease-out"
            />
            {/* Multi-layered Black Gradient Overlays for High Contrast Text Visibility */}
            <div className="absolute inset-0 bg-black/75 bg-gradient-to-b from-black/90 via-black/70 to-black/95" />
            <div className="absolute inset-0 bg-[radial-gradient(#e11d48_1px,transparent_1px)] [background-size:24px_24px] opacity-15 pointer-events-none" />
          </div>

          {/* Centered Overlay Content */}
          <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
            <Reveal>
              <div className="max-w-4xl mx-auto flex flex-col items-center text-center space-y-6">
                {/* Category Badge Ticker */}
                <div className="inline-flex items-center gap-2 bg-[#2d1b47]/90 border border-primary/40 px-4 py-1.5 font-mono text-[11px] font-extrabold text-primary tracking-widest uppercase shadow-md backdrop-blur-xs">
                  <Sparkles className="w-3.5 h-3.5 text-primary animate-pulse" />
                  <span>SOLUTION CARD 02 // PROCESS SIMULATION & DIGITAL TWIN</span>
                </div>

                {/* Main Hero Title */}
                <div className="flex justify-center w-full">
                  <h1 className="text-4xl sm:text-6xl lg:text-7xl font-display font-black uppercase tracking-tight text-white drop-shadow-2xl">
                    Process Simulation & <span className="text-primary">Digital Twin</span>
                  </h1>
                </div>

                {/* Subtitle Description */}
                <p className="text-slate-200 font-sans text-base sm:text-lg leading-relaxed max-w-2xl mx-auto drop-shadow-md">
                  Build intelligent digital process models to optimize plant performance, evaluate
                  operational scenarios, and support engineering decision-making across the plant
                  lifecycle.
                </p>

                {/* Quick Badges Ticker */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-3xl mx-auto w-full border-t border-white/20 pt-6 font-mono text-xs text-white">
                  <div className="flex items-center justify-center gap-2 bg-[#201235]/80 border border-white/10 px-3.5 py-2.5 shadow-sm">
                    <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                    <span className="font-semibold whitespace-nowrap">Heat & Mass Balance</span>
                  </div>
                  <div className="flex items-center justify-center gap-2 bg-[#201235]/80 border border-white/10 px-3.5 py-2.5 shadow-sm">
                    <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                    <span className="font-semibold whitespace-nowrap">Pyroprocess Sim</span>
                  </div>
                  <div className="flex items-center justify-center gap-2 bg-[#201235]/80 border border-white/10 px-3.5 py-2.5 shadow-sm">
                    <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                    <span className="font-semibold whitespace-nowrap">Grinding Circuit</span>
                  </div>
                  <div className="flex items-center justify-center gap-2 bg-[#201235]/80 border border-white/10 px-3.5 py-2.5 shadow-sm">
                    <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                    <span className="font-semibold whitespace-nowrap">Digital Twin Dev</span>
                  </div>
                </div>

                {/* Hero Action Buttons */}
                <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
                  <a
                    href="#services-breakdown"
                    className="px-8 py-4 bg-primary hover:bg-rose-700 text-white font-mono text-xs font-bold uppercase tracking-wider transition-all duration-150 shadow-xl flex items-center gap-2 group"
                  >
                    <span>Explore Services</span>
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

        {/* 2. ABOUT PROCESS SIMULATION & DIGITAL TWIN */}
        <section className="py-20 bg-slate-50 border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="bg-white border border-slate-200 p-8 sm:p-12 shadow-sm space-y-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 border-b border-l border-rose-500/10 pointer-events-none" />

              <div className="max-w-3xl space-y-4">
                <Reveal>
                  <div className="inline-block font-mono text-xs font-bold text-primary uppercase tracking-widest bg-rose-50 border border-rose-200 px-3 py-1">
                    ABOUT PROCESS SIMULATION & DIGITAL TWIN
                  </div>
                </Reveal>

                <Reveal>
                  <h2 className="font-display font-black text-2xl sm:text-4xl text-slate-900 uppercase tracking-tight">
                    Digital Engineering for Smarter Industrial Operations
                  </h2>
                </Reveal>

                <Reveal>
                  <p className="text-slate-600 font-sans text-base leading-relaxed">
                    Modern industrial facilities require more than traditional engineering to remain
                    competitive. Process simulation and digital twin technologies enable engineers to model,
                    analyze, and optimize plant performance in a virtual environment before implementing
                    changes in the real plant. This reduces technical risk, improves decision-making, and
                    supports higher operational efficiency.
                  </p>
                </Reveal>

                <Reveal>
                  <p className="text-slate-600 font-sans text-base leading-relaxed pt-2">
                    At MACPROTEC, we combine advanced process simulation with digital engineering expertise to
                    help clients evaluate process performance, optimize production, reduce energy
                    consumption, improve equipment reliability, and accelerate digital transformation. From
                    process modeling and heat & mass balance studies to digital twin development and plant
                    optimization, our solutions deliver practical insights that improve plant performance
                    across the entire operational lifecycle.
                  </p>
                </Reveal>
              </div>

              {/* Grid Metrics Highlights */}
              <Reveal>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-slate-100 font-mono text-xs">
                  <div className="p-4 bg-slate-50 border border-slate-200">
                    <div className="text-[10px] text-slate-400 uppercase font-bold">HEAT & MASS BALANCE</div>
                    <div className="text-lg font-bold text-slate-900 mt-1">Flow & Thermal</div>
                    <div className="text-[10px] text-slate-500 mt-0.5">Plant Design Basis</div>
                  </div>

                  <div className="p-4 bg-slate-50 border border-slate-200">
                    <div className="text-[10px] text-slate-400 uppercase font-bold">PYROPROCESS SIM</div>
                    <div className="text-lg font-bold text-slate-900 mt-1">Kiln & Calciner</div>
                    <div className="text-[10px] text-slate-500 mt-0.5">Combustion Stability</div>
                  </div>

                  <div className="p-4 bg-slate-50 border border-slate-200">
                    <div className="text-[10px] text-slate-400 uppercase font-bold">GRINDING CIRCUIT</div>
                    <div className="text-lg font-bold text-slate-900 mt-1">Mill & Separator</div>
                    <div className="text-[10px] text-slate-500 mt-0.5">Specific Energy Loss</div>
                  </div>

                  <div className="p-4 bg-slate-50 border border-slate-200">
                    <div className="text-[10px] text-slate-400 uppercase font-bold">DIGITAL TWIN</div>
                    <div className="text-lg font-bold text-slate-900 mt-1">SCADA Integration</div>
                    <div className="text-[10px] text-slate-500 mt-0.5">Virtual Commissioning</div>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* 3. PROCESS SIMULATION & DIGITAL TWIN SERVICES (6 CARDS & INTERACTIVE EXPLORER) */}
        <section id="services-breakdown" className="py-20 bg-white border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 space-y-12">
            {/* Header */}
            <div className="text-center max-w-3xl mx-auto space-y-4">
              <Reveal>
                <div className="inline-block font-mono text-xs font-bold text-primary uppercase tracking-widest bg-rose-50 border border-rose-200 px-3 py-1">
                  PROCESS SIMULATION & DIGITAL TWIN SERVICES
                </div>
              </Reveal>

              <Reveal>
                <h2 className="font-display font-black text-3xl sm:text-4xl text-slate-900 uppercase tracking-tight">
                  Digital Engineering Capabilities Across Lifecycle
                </h2>
              </Reveal>

              <Reveal>
                <p className="text-slate-600 font-sans text-base leading-relaxed">
                  Explore our digital engineering solutions designed to simulate, optimize, and improve
                  industrial process performance. Select any service below to review the engineering approach,
                  deliverables, and key benefits.
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
                        ? "bg-[#201235] text-white border-[#201235] shadow-lg"
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
                  <div className="bg-[#2d1b47]/90 border border-[#3e2663] p-6 space-y-4">
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
                  <div className="bg-[#2d1b47]/90 border border-[#3e2663] p-6 space-y-4">
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
                  <div className="bg-[#2d1b47]/90 border border-[#3e2663] p-6 space-y-4">
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
                        <span>SIMULATION & TWIN</span>
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

        {/* 4. WHY CHOOSE MACPROTEC FOR PROCESS SIMULATION & DIGITAL TWIN */}
        <section className="py-20 bg-[#201235] text-white border-b border-[#3e2663] overflow-hidden relative">
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
                  Why Choose MACPROTEC for Process Simulation & Digital Twin?
                </h2>
              </Reveal>

              <Reveal>
                <p className="text-slate-300 font-sans text-base leading-relaxed">
                  We combine deep industry process knowledge with simulation and digital twin tools to deliver
                  practical, high-impact engineering solutions.
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
            <div className="bg-[#2d1b47] text-white border border-[#3e2663] p-8 sm:p-12 shadow-2xl relative overflow-hidden text-center space-y-6">
              <div className="absolute top-0 right-0 w-64 h-64 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />

              <Reveal>
                <div className="inline-flex items-center gap-2 bg-rose-500/20 border border-rose-500/40 text-white px-3.5 py-1 font-mono text-xs font-bold uppercase rounded-full">
                  <FileCheck className="w-3.5 h-3.5" />
                  <span>READY TO OPTIMIZE YOUR PLANT?</span>
                </div>
              </Reveal>

              <Reveal>
                <h2 className="font-display font-black text-3xl sm:text-5xl text-white uppercase tracking-tight">
                  Let's Discuss Your Simulation Requirements
                </h2>
              </Reveal>

              <Reveal>
                <p className="text-slate-300 font-sans text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
                  Connect with MACPROTEC engineering specialists to evaluate heat & mass balances, pyroprocess
                  simulations, grinding circuits, alternative fuels, or digital twin development for your facility.
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
