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
  Layers,
  ShieldCheck,
  Wrench,
  TrendingUp,
  Sparkles,
  ChevronRight,
  Compass,
  Award,
  Check,
  FileCheck,
  ClipboardList,
} from "lucide-react";

// Sub-services Data from PDF spec (Solution Card 4: Plant Performance Optimization)
const SERVICES_DATA = [
  {
    id: "01",
    key: "kiln",
    title: "Kiln Optimization",
    summary:
      "Improve kiln stability, thermal efficiency, clinker quality, fuel consumption, and production capacity through detailed process evaluation and optimization.",
    tagline: "Maximize Kiln Performance, Improve Efficiency",
    overview:
      "The rotary kiln is the heart of the cement manufacturing process, where raw materials are transformed into high-quality clinker through carefully controlled thermal and chemical reactions. Kiln performance directly influences production capacity, fuel consumption, clinker quality, emissions, and overall plant profitability. Over time, process variations, equipment wear, combustion instability, and operational constraints can reduce kiln efficiency and limit plant performance. Kiln Optimization identifies these issues and provides practical engineering solutions to achieve stable, efficient, and reliable operation.",
    overviewExtended:
      "At MACPROTEC, we provide comprehensive Kiln Optimization services that combine process engineering, plant data analysis, process simulation, CFD studies, and operational expertise to evaluate every aspect of kiln performance. Our engineers analyze combustion efficiency, heat transfer, process stability, material flow, refractory performance, and equipment operation to identify bottlenecks and optimization opportunities. Whether improving existing operations, increasing production capacity, reducing fuel consumption, or supporting alternative fuel implementation, our solutions are focused on delivering measurable and sustainable improvements.",
    approach: [
      "Plant Performance Assessment",
      "Process & Operational Data Analysis",
      "Kiln System Performance Evaluation",
      "Combustion & Heat Transfer Analysis",
      "Process Simulation & CFD Assessment",
      "Optimization Strategy & Engineering Recommendations",
    ],
    deliverables: [
      "Kiln Performance Assessment Report",
      "Process Performance Analysis",
      "Heat & Mass Balance Evaluation",
      "Combustion Performance Assessment",
      "Thermal Efficiency Analysis",
      "Equipment Performance Evaluation",
      "Bottleneck Identification Study",
      "Process Simulation & CFD Results (where applicable)",
      "Optimization Recommendations",
      "Engineering Calculations & Technical Documentation",
    ],
    benefits: [
      "Increase clinker production and kiln throughput",
      "Reduce specific fuel consumption and operating costs",
      "Improve combustion efficiency and thermal performance",
      "Enhance clinker quality and process stability",
      "Identify operational bottlenecks and performance limitations",
      "Support alternative fuel implementation and optimization",
      "Improve equipment reliability and operational availability",
      "Maximize overall kiln system efficiency and long-term performance",
    ],
  },
  {
    id: "02",
    key: "raw-mill",
    title: "Raw Mill Optimization",
    summary:
      "Optimize raw grinding performance by improving mill efficiency, drying capacity, separator performance, and energy utilization.",
    tagline: "Optimize Raw Grinding Performance for Stable and Efficient Plant Operation",
    overview:
      "The raw mill plays a critical role in cement manufacturing by preparing a consistent and finely ground raw meal for the pyroprocess. Its performance directly affects kiln stability, production capacity, energy consumption, and overall plant efficiency. Factors such as grinding efficiency, drying performance, separator operation, gas flow, and material characteristics can significantly impact raw mill productivity and operating costs. Raw Mill Optimization helps identify these limitations and improve overall grinding performance.",
    overviewExtended:
      "At MACPROTEC, we provide comprehensive Raw Mill Optimization services that combine process engineering, plant data analysis, simulation, CFD studies, and operational expertise to maximize raw grinding efficiency. Our engineers evaluate mill performance, separator efficiency, drying capacity, gas flow distribution, material transport, and process control to identify bottlenecks and recommend practical improvement strategies. Whether increasing production, reducing energy consumption, improving drying performance, or optimizing mill operation, our solutions deliver measurable improvements in plant reliability and productivity.",
    approach: [
      "Plant Performance Assessment",
      "Raw Mill Process Data Analysis",
      "Grinding & Drying Performance Evaluation",
      "Gas Flow & Separator Performance Analysis",
      "Process Simulation & CFD Assessment",
      "Optimization Strategy & Engineering Recommendations",
    ],
    deliverables: [
      "Raw Mill Performance Assessment Report",
      "Grinding Efficiency Analysis",
      "Drying Performance Evaluation",
      "Separator Performance Assessment",
      "Gas Flow & Air Balance Analysis",
      "Heat & Mass Balance Evaluation",
      "Equipment Performance Assessment",
      "Process Simulation & CFD Results (where applicable)",
      "Optimization Recommendations",
      "Engineering Calculations & Technical Documentation",
    ],
    benefits: [
      "Increase raw mill throughput and production capacity",
      "Improve grinding efficiency and product consistency",
      "Enhance drying performance for high-moisture raw materials",
      "Reduce specific power consumption and operating costs",
      "Optimize separator performance and material classification",
      "Improve process stability and kiln feed consistency",
      "Identify bottlenecks and operational inefficiencies",
      "Maximize overall raw grinding system performance",
    ],
  },
  {
    id: "03",
    key: "cement-mill",
    title: "Cement Mill Optimization",
    summary:
      "Enhance cement grinding performance by increasing throughput, reducing power consumption, improving separator efficiency, and maintaining product quality.",
    tagline: "Optimize Grinding Efficiency, Power Consumption & Product Quality",
    overview:
      "The cement mill is one of the most energy-intensive units in a cement plant, directly influencing production capacity, cement quality, and operating costs. The performance of the mill, separator, grinding media, ventilation system, and material transport must work together to achieve optimum throughput while maintaining the required product fineness. Cement Mill Optimization helps identify process limitations, improve grinding efficiency, reduce energy consumption, and ensure consistent cement quality.",
    overviewExtended:
      "At MACPROTEC, we provide comprehensive Cement Mill Optimization services by combining process engineering, plant data analysis, simulation, CFD studies, and operational expertise. Our engineers evaluate mill performance, separator efficiency, grinding efficiency, ventilation, material flow, and process control to identify bottlenecks and optimization opportunities. Whether increasing production capacity, reducing specific power consumption, improving cement quality, or optimizing overall grinding performance, our solutions deliver practical and measurable improvements that enhance plant productivity and profitability.",
    approach: [
      "Plant Performance Assessment",
      "Cement Mill Process Data Analysis",
      "Grinding & Separator Performance Evaluation",
      "Mill Ventilation & Material Flow Analysis",
      "Process Simulation & CFD Assessment",
      "Optimization Strategy & Engineering Recommendations",
    ],
    deliverables: [
      "Cement Mill Performance Assessment Report",
      "Grinding Efficiency Analysis",
      "Separator Performance Assessment",
      "Mill Ventilation Analysis",
      "Material Flow Evaluation",
      "Equipment Performance Assessment",
      "Energy Consumption Analysis",
      "Process Simulation & CFD Results (where applicable)",
      "Optimization Recommendations",
      "Engineering Calculations & Technical Documentation",
    ],
    benefits: [
      "Increase cement mill throughput and production capacity",
      "Reduce specific power consumption and operating costs",
      "Improve grinding efficiency and separator performance",
      "Achieve consistent cement fineness and product quality",
      "Optimize mill ventilation and material transport",
      "Identify bottlenecks and operational inefficiencies",
      "Improve process stability and equipment reliability",
      "Maximize overall grinding system performance and profitability",
      "Maximize overall grinding system efficiency",
    ],
  },
  {
    id: "04",
    key: "clinker-cooler",
    title: "Clinker Cooler Optimization",
    summary:
      "Improve heat recovery, clinker cooling efficiency, cooler performance, and overall kiln system energy efficiency.",
    tagline: "Enhance Heat Recovery, Improve Cooling Efficiency, and Reduce Energy Consumption",
    overview:
      "The clinker cooler is a critical component of the cement manufacturing process, responsible for recovering heat from hot clinker while delivering clinker at the required temperature for downstream handling. Its performance has a direct impact on kiln stability, thermal efficiency, fuel consumption, clinker quality, and overall plant productivity. Poor cooler performance can lead to excessive heat losses, unstable kiln operation, increased fuel usage, and reduced production capacity. Clinker Cooler Optimization helps identify these inefficiencies and improve overall system performance.",
    overviewExtended:
      "At MACPROTEC, we provide comprehensive Clinker Cooler Optimization services by combining process engineering, plant data analysis, CFD studies, simulation, and operational expertise. Our engineers evaluate clinker cooling performance, air distribution, grate operation, heat recovery efficiency, material flow, and equipment condition to identify bottlenecks and optimization opportunities. Whether improving heat recovery, increasing cooler capacity, reducing fuel consumption, or stabilizing kiln operation, our solutions deliver practical and measurable improvements that enhance plant efficiency and profitability.",
    approach: [
      "Plant Performance Assessment",
      "Clinker Cooler Process Data Analysis",
      "Heat Recovery & Cooling Performance Evaluation",
      "Air Distribution & Material Flow Analysis",
      "Process Simulation & CFD Assessment",
      "Optimization Strategy & Engineering Recommendations",
    ],
    deliverables: [
      "Clinker Cooler Performance Assessment Report",
      "Cooling Efficiency Analysis",
      "Heat Recovery Evaluation",
      "Air Distribution Assessment",
      "Material Flow Analysis",
      "Equipment Performance Assessment",
      "Thermal Efficiency Evaluation",
      "Process Simulation & CFD Results (where applicable)",
      "Optimization Recommendations",
      "Engineering Calculations & Technical Documentation",
    ],
    benefits: [
      "Improve clinker cooling efficiency and heat recovery",
      "Reduce specific fuel consumption and energy costs",
      "Enhance kiln stability and overall pyroprocess performance",
      "Increase cooler capacity and operational reliability",
      "Optimize air distribution and clinker transport",
      "Identify bottlenecks and performance limitations",
      "Improve clinker quality and downstream process stability",
      "Maximize overall clinker cooler efficiency and plant productivity",
    ],
  },
  {
    id: "05",
    key: "burner",
    title: "Burner Optimization",
    summary:
      "Optimize burner performance to improve flame stability, combustion efficiency, fuel utilization, and clinker quality while reducing emissions.",
    tagline: "Optimize Combustion Performance for Maximum Thermal Efficiency",
    overview:
      "The burner plays a vital role in the cement pyroprocess by generating a stable flame that provides the thermal energy required for efficient clinker production. Burner performance directly influences flame shape, heat distribution, fuel consumption, clinker quality, emissions, and kiln stability. Improper burner settings or fuel-air mixing can lead to unstable combustion, excessive fuel usage, refractory damage, poor clinker quality, and reduced production efficiency. Burner Optimization ensures that the burner operates safely, efficiently, and consistently under varying operating conditions.",
    overviewExtended:
      "At MACPROTEC, we provide comprehensive Burner Optimization services by combining combustion engineering, CFD analysis, process simulation, plant data analysis, and operational expertise. Our engineers evaluate burner design, flame characteristics, fuel injection, air distribution, combustion efficiency, and kiln operating conditions to identify opportunities for improving thermal performance. Whether optimizing conventional fuels, implementing alternative fuels, or enhancing overall kiln operation, our solutions help clients achieve stable combustion, lower fuel consumption, improved clinker quality, and reduced emissions.",
    approach: [
      "Plant Performance Assessment",
      "Burner & Combustion System Analysis",
      "Fuel & Air Distribution Evaluation",
      "Flame Behavior & Heat Transfer Assessment",
      "CFD & Process Simulation Analysis",
      "Optimization Strategy & Engineering Recommendations",
    ],
    deliverables: [
      "Burner Performance Assessment Report",
      "Combustion Efficiency Analysis",
      "Flame Shape & Stability Evaluation",
      "Fuel & Air Distribution Assessment",
      "Heat Transfer Analysis",
      "Equipment Performance Evaluation",
      "CFD & Process Simulation Results (where applicable)",
      "Optimization Recommendations",
      "Engineering Calculations",
      "Technical Documentation",
    ],
    benefits: [
      "Improve flame stability and combustion efficiency",
      "Reduce specific fuel consumption and operating costs",
      "Enhance heat transfer and thermal efficiency",
      "Improve clinker quality and kiln process stability",
      "Support conventional and alternative fuel optimization",
      "Reduce emissions through improved combustion performance",
      "Increase burner reliability and operational flexibility",
      "Maximize overall kiln performance and productivity",
    ],
  },
  {
    id: "06",
    key: "process-audit",
    title: "Process Audit & Energy Assessment",
    summary:
      "Conduct comprehensive plant performance assessments to identify operational issues, equipment limitations, bottlenecks, and improvement opportunities.",
    tagline: "Objective Evaluation of the Entire Manufacturing Process",
    overview:
      "Sustainable improvements in production capacity, energy efficiency, and operating costs begin with a clear understanding of plant performance. Over time, process inefficiencies, equipment limitations, suboptimal operating practices, and changing production requirements can reduce overall plant performance. A comprehensive Process Audit & Energy Assessment provides an objective evaluation of the entire manufacturing process, identifying opportunities to improve productivity, reduce energy consumption, enhance process stability, and maximize return on investment.",
    overviewExtended:
      "At MACPROTEC, we conduct detailed Process Audit & Energy Assessment studies by combining operational data analysis, plant inspections, process engineering, performance benchmarking, and industry best practices. Our engineers evaluate every stage of the production process—from raw material preparation and grinding to pyroprocessing, clinker cooling, cement grinding, and utility systems—to identify bottlenecks, energy losses, and operational inefficiencies. The outcome is a prioritized set of practical engineering recommendations that help plants achieve measurable improvements with minimal capital investment wherever possible.",
    approach: [
      "Plant Performance Assessment",
      "Operational Data Collection & Analysis",
      "Equipment & Process Performance Evaluation",
      "Energy Consumption & Utility Assessment",
      "Process Benchmarking & Bottleneck Identification",
      "Improvement Strategy & Engineering Recommendations",
    ],
    deliverables: [
      "Process Audit Report",
      "Plant Performance Assessment",
      "Energy Consumption Analysis",
      "Equipment Performance Evaluation",
      "Utility System Assessment",
      "Bottleneck Identification Report",
      "Performance Benchmarking",
      "Improvement Opportunity Assessment",
      "Prioritized Engineering Recommendations",
      "Technical Documentation & Executive Summary",
    ],
    benefits: [
      "Improve overall plant productivity and operational efficiency",
      "Reduce specific energy consumption and operating costs",
      "Identify process bottlenecks and hidden performance losses",
      "Benchmark plant performance against industry best practices",
      "Prioritize improvement opportunities based on technical and economic impact",
      "Enhance process stability and equipment reliability",
      "Support informed investment and operational decision-making",
      "Establish a clear roadmap for continuous plant performance improvement",
    ],
  },
  {
    id: "07",
    key: "debottlenecking",
    title: "Debottlenecking",
    summary:
      "Identify and eliminate process bottlenecks that limit plant performance, equipment utilization, and production efficiency.",
    tagline: "Eliminate Process Constraints to Increase Plant Capacity and Performance",
    overview:
      "As production demands increase, many cement plants encounter limitations that prevent them from achieving their full design capacity. These bottlenecks may arise from equipment constraints, inefficient process configurations, material handling limitations, utility shortages, or operational practices. Simply increasing feed rates often leads to process instability rather than higher production. A systematic Debottlenecking Study identifies these limiting factors and develops practical engineering solutions to safely increase plant throughput while maintaining product quality, process reliability, and energy efficiency.",
    overviewExtended:
      "At MACPROTEC, we conduct comprehensive Debottlenecking Studies using process engineering expertise, operational data analysis, plant assessments, performance benchmarking, and advanced engineering tools where appropriate. Our engineers evaluate the complete production process—from raw material preparation and grinding to pyroprocessing, clinker cooling, cement grinding, and material handling—to identify capacity-limiting equipment and process constraints. We develop technically and economically viable solutions that maximize production with minimum operational risk and optimized capital investment.",
    approach: [
      "Plant Performance Assessment",
      "Process Capacity Evaluation",
      "Equipment & System Bottleneck Analysis",
      "Material Flow & Utility Assessment",
      "Capacity Improvement Scenario Evaluation",
      "Engineering Recommendations & Implementation Roadmap",
    ],
    deliverables: [
      "Debottlenecking Study Report",
      "Plant Capacity Assessment",
      "Process Constraint Analysis",
      "Equipment Performance Evaluation",
      "Material Flow Assessment",
      "Utility System Evaluation",
      "Capacity Improvement Scenarios",
      "Cost-Benefit & Feasibility Assessment",
      "Prioritized Engineering Recommendations",
      "Technical Documentation & Implementation Roadmap",
    ],
    benefits: [
      "Increase plant production capacity with optimized existing assets",
      "Identify process and equipment constraints limiting throughput",
      "Improve overall plant efficiency and operational reliability",
      "Reduce production losses caused by process bottlenecks",
      "Prioritize improvement projects based on technical and economic feasibility",
      "Minimize capital investment through targeted engineering solutions",
      "Support phased plant expansion with reduced operational risk",
      "Maximize return on investment through sustainable capacity improvements",
    ],
  },
];

// Why Choose Features (From PDF Page 17)
const WHY_CHOOSE_ITEMS = [
  {
    title: "Cement Process Optimization Expertise",
    desc: "Deep engineering specialization in pyroprocessing, raw & cement grinding, combustion, and cooling systems.",
    icon: Factory,
  },
  {
    title: "Data-Driven Performance Analysis",
    desc: "Rigorous thermal, mass, and operational telemetry evaluations to isolate hidden losses and bottleneck root causes.",
    icon: BarChart3,
  },
  {
    title: "Practical Engineering Solutions",
    desc: "Actionable, plant-tested recommendations tailored for immediate, realistic implementation without high risks.",
    icon: Wrench,
  },
  {
    title: "Energy & Operational Efficiency",
    desc: "Targeted reductions in specific fuel and electrical energy consumption while improving equipment reliability.",
    icon: TrendingUp,
  },
  {
    title: "End-to-End Plant Performance Improvement",
    desc: "Holistic evaluation across raw preparation, pyroprocessing, grinding, utilities, and material transport.",
    icon: Layers,
  },
  {
    title: "Measurable & Sustainable Results",
    desc: "Sustainable throughput increases, verified energy savings, and fast payback on engineering investments.",
    icon: ShieldCheck,
  },
];

export default function PlantOptimizationServicePage() {
  const [activeTabKey, setActiveTabKey] = useState("kiln");
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
              <span className="text-primary font-bold">Plant Performance Optimization</span>
            </div>
            <div className="hidden sm:flex items-center gap-3 text-[10px] text-slate-400">
              <span className="font-bold text-rose-400">SOLUTION 04</span>
              <span>•</span>
              <span>PLANT PERFORMANCE OPTIMIZATION</span>
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
                    <span>SOLUTION CARD 04 // PLANT PERFORMANCE OPTIMIZATION</span>
                  </div>
                </Reveal>

                <Reveal>
                  <h1 className="font-display font-extrabold text-3xl sm:text-5xl lg:text-6xl text-slate-900 uppercase tracking-tight leading-[1.1]">
                    Plant Performance <span className="text-primary">Optimization</span>
                  </h1>
                </Reveal>

                <Reveal>
                  <p className="text-base sm:text-lg text-slate-600 font-sans leading-relaxed max-w-2xl">
                    Increase productivity, improve energy efficiency, and eliminate operational bottlenecks
                    through engineering-led optimization across kilns, mills, burners, coolers, and complete manufacturing processes.
                  </p>
                </Reveal>

                {/* Hero Badges */}
                <Reveal>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
                    <div className="bg-slate-50 border border-slate-200 p-3 rounded font-mono text-xs text-slate-800 font-bold flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                      <span>Kiln Optimization</span>
                    </div>
                    <div className="bg-slate-50 border border-slate-200 p-3 rounded font-mono text-xs text-slate-800 font-bold flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                      <span>Raw Mill Optimization</span>
                    </div>
                    <div className="bg-slate-50 border border-slate-200 p-3 rounded font-mono text-xs text-slate-800 font-bold flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                      <span>Cement Mill Optimization</span>
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
                      src="/images/card_plant_optimization.png"
                      alt="MACPROTEC Plant Performance Optimization"
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
                          PLANT PERFORMANCE OPTIMIZATION
                        </div>
                      </div>
                      <div className="w-10 h-10 rounded bg-primary/20 border border-primary/40 flex items-center justify-center text-primary shrink-0">
                        <TrendingUp className="w-5 h-5" />
                      </div>
                    </div>
                  </div>
                </Reveal>
              </div>
            </div>
          </div>
        </section>

        {/* 2. ABOUT PLANT PERFORMANCE OPTIMIZATION */}
        <section className="py-20 bg-slate-50 border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="bg-white border border-slate-200 p-8 sm:p-12 shadow-sm space-y-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 border-b border-l border-rose-500/10 pointer-events-none" />

              <div className="max-w-3xl space-y-4">
                <Reveal>
                  <div className="inline-block font-mono text-xs font-bold text-primary uppercase tracking-widest bg-rose-50 border border-rose-200 px-3 py-1">
                    ABOUT PLANT PERFORMANCE OPTIMIZATION
                  </div>
                </Reveal>

                <Reveal>
                  <h2 className="font-display font-black text-2xl sm:text-4xl text-slate-900 uppercase tracking-tight">
                    Maximizing Efficiency. Improving Reliability. Increasing Production.
                  </h2>
                </Reveal>

                <Reveal>
                  <p className="text-slate-600 font-sans text-base leading-relaxed">
                    Industrial plants operate in constantly changing conditions where equipment performance,
                    process stability, energy efficiency, and production capacity must be continuously optimized to
                    remain competitive. Even well-designed facilities can experience bottlenecks, excessive energy
                    consumption, equipment limitations, and process inefficiencies that impact operational
                    performance and profitability.
                  </p>
                </Reveal>

                <Reveal>
                  <p className="text-slate-600 font-sans text-base leading-relaxed pt-2">
                    At MACPROTEC, we provide comprehensive Plant Performance Optimization services to help industrial
                    facilities maximize production, reduce operating costs, improve energy efficiency, and enhance equipment
                    reliability. By combining engineering expertise, process analysis, simulation, plant audits, and operational
                    experience, we identify practical improvement opportunities across the entire production process.
                  </p>
                </Reveal>
              </div>

              {/* Grid Metrics Highlights */}
              <Reveal>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-slate-100 font-mono text-xs">
                  <div className="p-4 bg-slate-50 border border-slate-200">
                    <div className="text-[10px] text-slate-400 uppercase font-bold">KILN & PYROPROCESS</div>
                    <div className="text-lg font-bold text-slate-900 mt-1">Thermal Efficiency</div>
                    <div className="text-[10px] text-slate-500 mt-0.5">Combustion & Heat Balance</div>
                  </div>

                  <div className="p-4 bg-slate-50 border border-slate-200">
                    <div className="text-[10px] text-slate-400 uppercase font-bold">RAW & CEMENT MILLS</div>
                    <div className="text-lg font-bold text-slate-900 mt-1">Grinding Circuit</div>
                    <div className="text-[10px] text-slate-500 mt-0.5">Power Reduction & Fineness</div>
                  </div>

                  <div className="p-4 bg-slate-50 border border-slate-200">
                    <div className="text-[10px] text-slate-400 uppercase font-bold">COOLER & BURNER</div>
                    <div className="text-lg font-bold text-slate-900 mt-1">Heat Recovery</div>
                    <div className="text-[10px] text-slate-500 mt-0.5">Flame Stability & Emissions</div>
                  </div>

                  <div className="p-4 bg-slate-50 border border-slate-200">
                    <div className="text-[10px] text-slate-400 uppercase font-bold">AUDIT & DEBOTTLENECK</div>
                    <div className="text-lg font-bold text-slate-900 mt-1">Plant Capacity</div>
                    <div className="text-[10px] text-slate-500 mt-0.5">Process Constraints Removal</div>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* 3. PLANT PERFORMANCE OPTIMIZATION SERVICES */}
        <section id="services-breakdown" className="py-20 bg-white border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 space-y-12">
            {/* Header */}
            <div className="text-center max-w-3xl mx-auto space-y-4">
              <Reveal>
                <div className="inline-block font-mono text-xs font-bold text-primary uppercase tracking-widest bg-rose-50 border border-rose-200 px-3 py-1">
                  PLANT PERFORMANCE OPTIMIZATION SERVICES
                </div>
              </Reveal>

              <Reveal>
                <h2 className="font-display font-black text-3xl sm:text-4xl text-slate-900 uppercase tracking-tight">
                  Engineering Solutions Across Production Process
                </h2>
              </Reveal>

              <Reveal>
                <p className="text-slate-600 font-sans text-base leading-relaxed">
                  Explore our engineering solutions designed to improve production efficiency, optimize equipment
                  performance, and maximize overall plant productivity. Select any service below to review its engineering approach, deliverables, and key benefits.
                </p>
              </Reveal>
            </div>

            {/* Interactive Sub-Services Selector Tabs */}
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3 font-mono text-xs">
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

            {/* 7 Grid Cards Showcase */}
            <RevealGroup className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 pt-6" stagger={0.06}>
              {SERVICES_DATA.map((srv) => (
                <RevealItem key={srv.key}>
                  <div className="bg-slate-50 border border-slate-200 p-6 space-y-4 h-full flex flex-col justify-between hover:border-primary/60 transition-all duration-200 group">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between font-mono text-[10px] text-slate-400">
                        <span className="font-bold text-primary uppercase">SUB-SERVICE {srv.id}</span>
                        <span>PLANT OPTIMIZATION</span>
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

        {/* 4. WHY CHOOSE MACPROTEC FOR PLANT PERFORMANCE OPTIMIZATION */}
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
                  Why Choose MACPROTEC for Plant Performance Optimization?
                </h2>
              </Reveal>

              <Reveal>
                <p className="text-slate-300 font-sans text-base leading-relaxed">
                  We combine deep cement domain knowledge, practical process engineering, data analytics, and continuous field experience to deliver sustainable plant improvements.
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
                  <span>READY TO OPTIMIZE YOUR PLANT?</span>
                </div>
              </Reveal>

              <Reveal>
                <h2 className="font-display font-black text-3xl sm:text-5xl text-white uppercase tracking-tight">
                  Let's Discuss Your Plant Optimization Requirements
                </h2>
              </Reveal>

              <Reveal>
                <p className="text-slate-300 font-sans text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
                  Connect with MACPROTEC process optimization specialists to evaluate kiln efficiency, mill grinding circuits, burner settings, or comprehensive plant audits.
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
