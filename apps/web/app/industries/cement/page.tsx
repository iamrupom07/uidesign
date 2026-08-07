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
  Leaf,
  Recycle,
  Share2,
  Building2,
  Scale,
  Flame,
  Globe,
  Check,
  Compass,
  ClipboardList,
  Award,
  Zap,
  Wind,
  Gauge,
  Activity,
} from "lucide-react";

// 8 Engineering Services Data from Cement PDF Spec
const CEMENT_ENGINEERING_SERVICES = [
  {
    id: "01",
    key: "flow-pressure",
    title: "Flow & Pressure CFD Analysis",
    summary:
      "Analyze gas and fluid flow, pressure drops, velocity profiles, and recirculation zones across cement plant systems.",
    image: "/images/cement/service-flow-pressure.jpg",
    description:
      "Flow and pressure behavior are critical to the performance of cement manufacturing processes. Uneven airflow, excessive pressure losses, recirculation zones, and flow restrictions can reduce equipment efficiency, increase energy consumption, and limit production capacity. Using advanced Computational Fluid Dynamics (CFD), MACPROTEC analyzes complex gas and fluid flow within cement plant process systems to identify performance limitations and develop practical engineering solutions.\n\nOur CFD studies provide a detailed understanding of flow patterns, pressure distribution, velocity profiles, and system hydraulics, enabling optimized equipment operation, improved process stability, and reduced operating costs.",
    applications: [
      "Rotary Kilns",
      "Cyclones & Preheater Towers",
      "Raw Mills & Cement Mills",
      "Fan & Duct Systems",
      "Clinker Coolers",
      "Bag Filters",
      "Gas Conditioning Towers",
      "Waste Heat Recovery Systems",
    ],
    analyses: [
      "Flow Distribution Analysis",
      "Pressure Drop Evaluation",
      "Velocity Profile Analysis",
      "Flow Uniformity Assessment",
      "Flow Restriction Identification",
      "Recirculation Zone Analysis",
      "False Air Investigation",
      "Draft System Evaluation",
      "Fan Performance Assessment",
      "Flow Balancing Studies",
    ],
    deliverables: [
      "CFD Engineering Report",
      "Pressure & Velocity Contour Plots",
      "Flow Streamline Visualization",
      "Pressure Loss Assessment",
      "Performance Evaluation",
      "Engineering Recommendations",
      "Design Modification Proposals",
    ],
    benefits: [
      "Reduce pressure losses across process systems",
      "Improve gas flow distribution and process stability",
      "Increase equipment efficiency and production capacity",
      "Reduce fan power consumption",
      "Eliminate flow restrictions and dead zones",
      "Improve overall plant reliability",
      "Support data-driven engineering decisions",
    ],
  },
  {
    id: "02",
    key: "thermal-heat",
    title: "Thermal & Heat Transfer CFD Analysis",
    summary:
      "Evaluate heat transfer mechanisms, thermal gradients, hot/cold spots, and energy recovery efficiency.",
    image: "/images/cement/service-thermal-heat-transfer.jpg",
    description:
      "Thermal performance is one of the most critical factors influencing production capacity, fuel efficiency, equipment reliability, and product quality in cement manufacturing. Uneven temperature distribution, excessive heat losses, inefficient heat recovery, and localized hot or cold zones can significantly impact process stability and operational costs. Using advanced Computational Fluid Dynamics (CFD), MACPROTEC evaluates heat transfer mechanisms, thermal behavior, and temperature distribution within cement process systems to identify opportunities for performance improvement.\n\nOur engineering analyses provide valuable insights into convective, conductive, and radiative heat transfer, enabling optimized thermal efficiency, improved energy utilization, and enhanced equipment performance across the cement production process.",
    applications: [
      "Rotary Kilns",
      "Calciners",
      "Clinker Coolers",
      "Waste Heat Recovery Systems",
      "Gas Conditioning Towers",
      "Raw Mills",
      "Cement Mills",
      "Hot Gas Duct Systems",
    ],
    analyses: [
      "Temperature Distribution Analysis",
      "Heat Transfer Evaluation",
      "Heat Loss Assessment",
      "Thermal Efficiency Analysis",
      "Hot & Cold Spot Identification",
      "Heat Recovery Assessment",
      "Gas Temperature Distribution",
      "Thermal Performance Evaluation",
      "Process Heat Balance Verification",
      "Thermal Optimization Studies",
    ],
    deliverables: [
      "CFD Engineering Report",
      "Temperature Contour Plots",
      "Heat Flux Visualization",
      "Thermal Performance Assessment",
      "Heat Loss Engineering Recommendations",
      "Thermal Optimization Proposals",
    ],
    benefits: [
      "Improve thermal efficiency across the process",
      "Reduce fuel and energy consumption",
      "Enhance heat recovery performance",
      "Eliminate thermal imbalances and hot spots",
      "Improve process stability and clinker quality",
      "Increase equipment reliability and operational efficiency",
      "Support energy optimization and sustainability initiatives",
    ],
  },
  {
    id: "03",
    key: "combustion-cfd",
    title: "Combustion CFD Analysis",
    summary:
      "Optimize burner performance, fuel-air mixing, flame shape, alternative fuel firing (AFR), and emissions.",
    image: "/images/cement/service-combustion-cfd.jpg",
    description:
      "Efficient combustion is fundamental to achieving stable kiln operation, high clinker quality, and optimal fuel utilization in cement manufacturing. Poor fuel-air mixing, unstable flame characteristics, uneven temperature distribution, and inefficient combustion can lead to increased fuel consumption, higher emissions, refractory damage, and reduced production efficiency. Using advanced Computational Fluid Dynamics (CFD), MACPROTEC analyzes combustion processes to evaluate flame behavior, fuel-air interaction, heat release, and gas flow characteristics, enabling optimized burner performance and improved thermal efficiency.\n\nOur engineering studies support the optimization of conventional and alternative fuel combustion, helping cement plants improve operational stability, reduce emissions, and maximize overall pyroprocessing performance.",
    applications: [
      "Rotary Kiln Burners",
      "Calciners",
      "Alternative Fuel Combustion Systems",
      "Multi-Fuel Burners",
      "Pyroprocessing Systems",
      "Combustion Air Distribution Systems",
    ],
    analyses: [
      "Flame Shape & Stability Analysis",
      "Fuel-Air Mixing Assessment",
      "Temperature Distribution Analysis",
      "Combustion Efficiency Evaluation",
      "Oxygen Distribution Analysis",
      "Residence Time Assessment",
      "Alternative Fuel Performance Evaluation",
      "Heat Release Analysis",
      "NOx Formation Assessment",
      "Combustion System Optimization",
    ],
    deliverables: [
      "CFD Engineering Report",
      "Flame & Temperature Contour Plots",
      "Combustion Performance Assessment",
      "Fuel-Air Mixing Analysis",
      "Engineering Recommendations",
      "Combustion Optimization Proposals",
    ],
    benefits: [
      "Improve combustion efficiency and fuel utilization",
      "Enhance flame stability and temperature uniformity",
      "Support alternative fuel implementation",
      "Reduce fuel consumption and operating costs",
      "Minimize emissions and environmental impact",
      "Improve clinker quality and process stability",
      "Increase overall kiln and calciner performance",
    ],
  },
  {
    id: "04",
    key: "multiphase-gas-solid",
    title: "Multiphase & Gas-Solid Flow CFD Analysis",
    summary:
      "Simulate particle transport, gas-solid interactions, separation efficiency, and material carryover.",
    image: "/images/cement/service-multiphase-gas-solid.jpg",
    description:
      "Many critical processes in cement manufacturing involve the interaction between gas streams and solid particles. The behavior of these gas-solid flows directly influences process efficiency, separation performance, heat transfer, material transport, and overall plant productivity. Using advanced Computational Fluid Dynamics (CFD), MACPROTEC analyzes complex multiphase flow behavior to evaluate particle transport, gas-solid interactions, flow distribution, and separation efficiency within cement process systems.\n\nOur engineering studies help identify material build-up, particle carryover, uneven gas-solid distribution, excessive wear, and operational inefficiencies, enabling optimized equipment performance, improved process reliability, and enhanced production efficiency.",
    applications: [
      "Cyclones & Preheater Systems",
      "Clinker Coolers",
      "Dynamic Separators",
      "Pneumatic Conveying Systems",
      "Raw & Cement Mills",
      "Alternative Fuel Injection Systems",
    ],
    analyses: [
      "Gas-Solid Flow Distribution",
      "Particle Trajectory Analysis",
      "Particle Separation Efficiency",
      "Material Carryover Assessment",
      "Particle Residence Time Evaluation",
      "Solids Concentration Distribution",
      "Particle Deposition & Build-up Analysis",
      "Erosion & Wear Prediction",
      "Gas-Solid Mixing Evaluation",
      "Process Performance Optimization",
    ],
    deliverables: [
      "CFD Engineering Report",
      "Particle Flow Visualization",
      "Gas-Solid Flow Contour Plots",
      "Separation Performance Assessment",
      "Material Transport Evaluation",
      "Engineering Recommendations",
      "Equipment Optimization Proposals",
    ],
    benefits: [
      "Improve gas-solid flow distribution",
      "Increase separation efficiency",
      "Reduce material carryover and product losses",
      "Minimize material build-up and equipment wear",
      "Enhance process stability and operational reliability",
      "Improve material transport efficiency",
      "Optimize overall equipment performance",
    ],
  },
  {
    id: "05",
    key: "dust-collection",
    title: "Dust Collection & Separation CFD Analysis",
    summary:
      "Optimize bag filters, ESPs, cyclones, and ductwork for emissions compliance and power reduction.",
    image: "/images/cement/service-dust-collection-separation.jpg",
    description:
      "Efficient dust collection and particle separation are essential for maintaining environmental compliance, reducing product losses, and ensuring reliable operation in cement plants. Poor airflow distribution, uneven dust loading, high pressure losses, and inefficient particle separation can increase emissions, reduce equipment performance, and raise operating costs. Using advanced Computational Fluid Dynamics (CFD), MACPROTEC analyzes airflow behavior, particle transport, and separation performance to optimize dust collection systems and improve overall process efficiency.\n\nOur engineering studies provide valuable insights into gas-solid flow patterns, particle separation efficiency, dust distribution, and system hydraulics, enabling improved environmental performance, reduced maintenance requirements, and enhanced operational reliability.",
    applications: [
      "Bag Filters",
      "Electrostatic Precipitators (ESPs)",
      "Cyclones & Multi-Cyclones",
      "Dynamic Separators",
      "Dust Collection Duct Systems",
      "Process Exhaust Systems",
    ],
    analyses: [
      "Airflow Distribution Analysis",
      "Particle Separation Efficiency Assessment",
      "Dust Loading Distribution",
      "Pressure Drop Evaluation",
      "Velocity Profile Analysis",
      "Particle Carryover Analysis",
      "Dust Re-entrainment Assessment",
      "Flow Uniformity Evaluation",
      "Collection Efficiency Analysis",
      "System Performance Optimization",
    ],
    deliverables: [
      "CFD Engineering Report",
      "Airflow & Particle Flow Visualization",
      "Pressure & Velocity Contour Plots",
      "Separation Performance Assessment",
      "Dust Collection Efficiency Evaluation",
      "Engineering Recommendations",
      "System Optimization Proposals",
    ],
    benefits: [
      "Improve dust collection and separation efficiency",
      "Reduce particulate emissions and product losses",
      "Minimize pressure losses across collection systems",
      "Improve airflow distribution and filter utilization",
      "Reduce maintenance requirements and operating costs",
      "Enhance environmental compliance and plant reliability",
      "Optimize overall dust collection system performance",
    ],
  },
  {
    id: "06",
    key: "pneumatic-conveying",
    title: "Pneumatic Conveying CFD Analysis",
    summary:
      "Analyze air-solid flow, pressure drops, line wear, blockages, and particle transport in bulk lines.",
    image: "/images/cement/service-pneumatic-conveying.jpg",
    description:
      "Pneumatic conveying systems play a critical role in the reliable transport of cement, raw meal, fly ash, and other fine bulk materials throughout the cement manufacturing process. Poor conveying performance can result in excessive pressure losses, pipeline wear, material deposition, blockages, inconsistent material flow, and increased energy consumption. Using advanced Computational Fluid Dynamics (CFD), MACPROTEC analyzes air-solid flow behavior, particle transport, and conveying system performance to optimize material handling and improve operational reliability.\n\nOur engineering studies provide detailed insights into flow characteristics, pressure distribution, particle movement, and system performance, enabling efficient material transport while reducing maintenance requirements and operating costs.",
    applications: [
      "Cement Conveying Systems",
      "Raw Meal Conveying Systems",
      "Fly Ash Conveying Systems",
      "Alternative Fuel Conveying Systems",
      "Kiln Dust Conveying Systems",
      "Dense & Dilute Phase Conveying Systems",
    ],
    analyses: [
      "Air-Solid Flow Analysis",
      "Particle Transport Evaluation",
      "Pressure Drop Assessment",
      "Pipeline Velocity Analysis",
      "Material Distribution Assessment",
      "Particle Deposition & Build-up Analysis",
      "Pipeline Wear Prediction",
      "Blockage Risk Assessment",
      "Conveying Efficiency Evaluation",
      "System Performance Optimization",
    ],
    deliverables: [
      "CFD Engineering Report",
      "Airflow & Particle Flow Visualization",
      "Pressure & Velocity Contour Plots",
      "Conveying Performance Assessment",
      "Pipeline Wear & Deposition Evaluation",
      "Engineering Recommendations",
      "Conveying System Optimization Proposals",
    ],
    benefits: [
      "Improve conveying efficiency and system reliability",
      "Reduce pressure losses and energy consumption",
      "Minimize pipeline wear and maintenance costs",
      "Prevent material build-up and blockages",
      "Improve material distribution and transport stability",
      "Extend conveying system service life",
      "Optimize overall bulk material handling performance",
    ],
  },
  {
    id: "07",
    key: "pipe-stress",
    title: "Pipe Stress Analysis & Support Design",
    summary:
      "Evaluate thermal expansion, sustained loads, code compliance, nozzle loads, and hanger configurations.",
    image: "/images/cement/service-pipe-stress.jpg",
    description:
      "Piping systems in cement plants are subjected to high temperatures, thermal expansion, dead loads, pressure fluctuations, and dynamic operating conditions. Inadequate piping flexibility or improperly designed support systems can lead to excessive stresses, equipment nozzle overloads, structural failures, vibration issues, and unplanned shutdowns. MACPROTEC performs comprehensive pipe stress analyses to evaluate piping integrity, ensure compliance with international design standards, and optimize support configurations for safe and reliable operation.\n\nOur engineering studies assess the mechanical behavior of process piping under various operating and transient conditions, enabling optimized support layouts, improved equipment protection, and enhanced long-term plant reliability.",
    applications: [
      "Kiln Hot Gas Duct Systems",
      "Raw Mill Gas Ducts",
      "Cement Mill Gas Ducts",
      "Alternative Fuel Piping",
      "Compressed Air Systems",
      "Cooling Water Pipelines",
      "Steam & Condensate Systems",
      "Process Utility Piping",
    ],
    analyses: [
      "Static Pipe Stress Analysis",
      "Thermal Expansion Analysis",
      "Pipe Flexibility Assessment",
      "Equipment Nozzle Load Evaluation",
      "Pipe Support Design & Optimization",
      "Sustained & Occasional Load Analysis",
      "Hanger & Support Selection",
      "Structural Interaction Assessment",
      "Vibration Assessment",
      "Code Compliance Verification",
    ],
    deliverables: [
      "Pipe Stress Analysis Report",
      "Stress & Displacement Results",
      "Pipe Support Layout Drawings",
      "Support Design Calculations",
      "Equipment Nozzle Load Report",
      "Engineering Recommendations",
      "Piping Modification Proposals",
    ],
    benefits: [
      "Ensure piping system integrity and code compliance",
      "Prevent failures caused by thermal expansion and excessive stresses",
      "Protect equipment nozzles and connected machinery",
      "Optimize pipe support arrangements and reduce structural loads",
      "Improve plant reliability and operational safety",
      "Minimize maintenance requirements and unplanned downtime",
      "Extend the service life of piping systems",
    ],
  },
  {
    id: "08",
    key: "root-cause",
    title: "Root Cause CFD Investigation",
    summary:
      "Investigate complex flow, thermal, or gas-solid failures to diagnose root causes and eliminate repeat downtime.",
    image: "/images/cement/service-root-cause-cfd.jpg",
    description:
      "Operational challenges in cement plants often arise from complex flow, thermal, or gas-solid interactions that cannot be fully understood through conventional plant measurements alone. Issues such as excessive pressure losses, unstable process conditions, uneven gas distribution, false air infiltration, material build-up, poor separation efficiency, and reduced production capacity frequently originate from underlying fluid flow behavior. Using advanced Computational Fluid Dynamics (CFD), MACPROTEC performs systematic root cause investigations to identify the mechanisms responsible for process inefficiencies and equipment performance limitations.\n\nOur engineering studies provide detailed insight into process behavior and develop practical, data-driven recommendations that improve plant reliability, operational efficiency, and long-term performance.",
    applications: [
      "False Air Investigation",
      "High Pressure Loss Analysis",
      "Uneven Gas Flow Distribution",
      "Material Build-up & Blockage Analysis",
      "Equipment Performance Troubleshooting",
      "Production Bottleneck Investigation",
    ],
    analyses: [
      "Flow Pattern Evaluation",
      "Pressure Distribution Analysis",
      "Velocity Profile Assessment",
      "Temperature Distribution Analysis",
      "Gas-Solid Flow Investigation",
      "Air Leakage Assessment",
      "Recirculation & Dead Zone Identification",
      "Particle Transport Analysis",
      "Equipment Performance Assessment",
      "Engineering Solution Evaluation",
    ],
    deliverables: [
      "Root Cause Investigation Report",
      "CFD Flow & Thermal Visualization",
      "Performance Assessment",
      "Problem Identification & Engineering Diagnosis",
      "Corrective Action Recommendations",
      "Design Improvement Proposals",
    ],
    benefits: [
      "Identify the true cause of process and equipment issues",
      "Eliminate trial-and-error troubleshooting",
      "Improve plant reliability and process stability",
      "Reduce production losses and operational downtime",
      "Optimize equipment performance and energy efficiency",
      "Support informed engineering and maintenance decisions",
      "Enable sustainable long-term performance improvements",
    ],
  },
];

export default function CementIndustryPage() {
  const [activeServiceKey, setActiveServiceKey] = useState("flow-pressure");

  const currentService =
    CEMENT_ENGINEERING_SERVICES.find((s) => s.key === activeServiceKey) ||
    CEMENT_ENGINEERING_SERVICES[0];

  return (
    <>
      <TechnicalCursor />
      <Header />

      <main className="bg-slate-50 min-h-screen text-slate-800 font-sans selection:bg-rose-500 selection:text-white">
        {/* DOSSIER BREADCRUMB BAR */}
        <section className="bg-[#2d1b47] border-b border-[#3e2663] text-white py-3 px-6 lg:px-8 font-mono text-xs">
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
              <span className="text-primary font-bold">Cement Industry</span>
            </div>
            <div className="hidden sm:flex items-center gap-3 text-[10px] text-slate-400">
              <span className="font-bold text-rose-400">SECTOR 02</span>
              <span>•</span>
              <span>FOUNDATIONAL CORE STRENGTH</span>
            </div>
          </div>
        </section>

        {/* 1. FULL-WIDTH HERO SECTION (Matching /solutions/design-services Hero Style) */}
        <section className="w-full relative bg-black border-b-2 border-primary/30 py-16 sm:py-20 lg:py-24 overflow-hidden group">
          {/* Full-width Background Image */}
          <div className="absolute inset-0 w-full h-full pointer-events-none">
            <Image
              src="/images/cement_industry.png"
              alt="MACPROTEC Cement Industry Facility"
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
                  <span>OUR EXPERTISE // FOUNDATIONAL CORE STRENGTH</span>
                </div>

                {/* Main Hero Title */}
                <div className="flex justify-center w-full">
                  <h1 className="text-4xl sm:text-6xl lg:text-7xl font-display font-black uppercase tracking-tight text-white drop-shadow-2xl">
                    Cement Industry <span className="text-primary">Engineering & Solutions</span>
                  </h1>
                </div>

                {/* Subtitle Description */}
                <p className="text-slate-200 font-sans text-base sm:text-lg leading-relaxed max-w-3xl mx-auto drop-shadow-md">
                  Cement Industry expertise is MACPROTEC's foundational core strength. The cement industry plays a foundational role in global infrastructure development, providing essential building materials for construction projects ranging from residential buildings to large-scale infrastructure. We diligently work together with our Cement Industry partners, plant owners, and investors to address critical challenges facing the industry.
                </p>

                {/* Hero Badges */}
                <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                  <div className="bg-black/60 border border-white/20 px-3.5 py-1.5 rounded font-mono text-xs text-slate-200 font-bold flex items-center gap-2 backdrop-blur-xs">
                    <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                    <span>Alternative Fuels (AFR)</span>
                  </div>
                  <div className="bg-black/60 border border-white/20 px-3.5 py-1.5 rounded font-mono text-xs text-slate-200 font-bold flex items-center gap-2 backdrop-blur-xs">
                    <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                    <span>Carbon Capture (CCU)</span>
                  </div>
                  <div className="bg-black/60 border border-white/20 px-3.5 py-1.5 rounded font-mono text-xs text-slate-200 font-bold flex items-center gap-2 backdrop-blur-xs">
                    <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                    <span>Circular Economy</span>
                  </div>
                  <div className="bg-black/60 border border-white/20 px-3.5 py-1.5 rounded font-mono text-xs text-slate-200 font-bold flex items-center gap-2 backdrop-blur-xs">
                    <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                    <span>Digitalization & Industry 4.0</span>
                  </div>
                  <div className="bg-black/60 border border-white/20 px-3.5 py-1.5 rounded font-mono text-xs text-slate-200 font-bold flex items-center gap-2 backdrop-blur-xs">
                    <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                    <span>Knowledge Sharing</span>
                  </div>
                </div>

                {/* Hero Action Buttons */}
                <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
                  <a
                    href="#engineering-services"
                    className="px-8 py-4 bg-primary hover:bg-rose-700 text-white font-mono text-xs font-bold uppercase tracking-wider transition-all duration-150 shadow-xl flex items-center gap-2 group"
                  >
                    <span>Explore Engineering Services</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </a>

                  <Link
                    href="/lets-connect"
                    className="px-8 py-4 bg-[#201235] border border-white/20 hover:border-white text-white font-mono text-xs font-bold uppercase tracking-wider transition-all duration-150 flex items-center gap-2 hover:bg-[#2d1b47]"
                  >
                    <span>Consult Cement Specialists</span>
                    <ArrowRight className="w-4 h-4 text-slate-400" />
                  </Link>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* 2. ENGINEERING SERVICES - THE LARGEST SECTION (PDF SPEC) */}
        <section id="engineering-services" className="py-20 bg-slate-100 border-b border-slate-300 scroll-mt-10">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 space-y-12">
            <div className="text-center max-w-3xl mx-auto space-y-4">
              <Reveal>
                <div className="inline-block font-mono text-xs font-bold text-primary uppercase tracking-widest bg-rose-50 border border-rose-200 px-3 py-1">
                  MACPROTEC STRONGEST EXPERTISE AREA // ENGINEERING SERVICES
                </div>
              </Reveal>
              <Reveal>
                <h2 className="font-display font-black text-3xl sm:text-5xl text-slate-900 uppercase tracking-tight">
                  Engineering Services
                </h2>
              </Reveal>
              <Reveal>
                <p className="text-slate-700 font-sans text-base sm:text-lg leading-relaxed">
                  This is MACPROTEC's largest and primary expertise section. We deliver comprehensive Computational Fluid Dynamics (CFD), heat transfer, combustion, multiphase flow, pipe stress, and root cause engineering services specifically engineered for cement manufacturing facilities.
                </p>
              </Reveal>
            </div>

            {/* 8 SERVICE CARDS GRID WITH IMAGES (FOLLOWING SOLUTION SERVICE CARD DESIGN) */}
            <RevealGroup className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6" stagger={0.05}>
              {CEMENT_ENGINEERING_SERVICES.map((srv) => {
                const isSelected = activeServiceKey === srv.key;
                return (
                  <RevealItem key={srv.key}>
                    <div
                      onClick={() => {
                        setActiveServiceKey(srv.key);
                        const el = document.getElementById("service-dossier-panel");
                        if (el) el.scrollIntoView({ behavior: "smooth" });
                      }}
                      className={`group cursor-pointer bg-white border transition-all duration-300 flex flex-col h-full overflow-hidden shadow-xs hover:shadow-xl ${
                        isSelected
                          ? "border-primary ring-2 ring-primary/20"
                          : "border-slate-200 hover:border-primary/60"
                      }`}
                    >
                      {/* Card Image */}
                      <div className="relative aspect-[16/10] w-full bg-slate-950 overflow-hidden">
                        <Image
                          src={srv.image}
                          alt={`${srv.title} - MACPROTEC Cement Engineering`}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                          className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                        <div className="absolute top-3 left-3 font-mono text-[10px] font-extrabold bg-slate-950/80 text-white px-2.5 py-1 border border-white/20 backdrop-blur-xs uppercase flex items-center gap-1.5">
                          <span className="text-rose-400">SERVICE {srv.id}</span>
                        </div>
                      </div>

                      {/* Card Content */}
                      <div className="p-5 flex flex-col justify-between flex-1 space-y-4">
                        <div className="space-y-2">
                          <h3 className="font-display font-black text-lg text-slate-900 uppercase tracking-tight group-hover:text-primary transition-colors flex items-start justify-between gap-2">
                            <span>{srv.title}</span>
                            <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-primary group-hover:translate-x-1 transition-all shrink-0 mt-1" />
                          </h3>
                          <p className="text-xs text-slate-600 font-sans leading-relaxed line-clamp-3">
                            {srv.summary}
                          </p>
                        </div>

                        <div className="pt-3 border-t border-slate-100 flex items-center justify-between font-mono text-xs font-bold text-primary">
                          <span>View Full Technical Dossier</span>
                          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    </div>
                  </RevealItem>
                );
              })}
            </RevealGroup>

            {/* INTERACTIVE SERVICE QUICK SELECTOR TABS */}
            <div className="pt-4">
              <div className="font-mono text-xs font-bold text-slate-600 uppercase tracking-wider mb-3">
                SELECT A SERVICE DOSSIER TO INSPECT:
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2 font-mono text-xs">
                {CEMENT_ENGINEERING_SERVICES.map((srv) => {
                  const isSelected = activeServiceKey === srv.key;
                  return (
                    <button
                      key={srv.key}
                      onClick={() => setActiveServiceKey(srv.key)}
                      className={`p-3 border text-left transition-all duration-150 flex flex-col justify-between h-20 group ${
                        isSelected
                          ? "bg-slate-950 text-white border-slate-950 shadow-md"
                          : "bg-white text-slate-700 border-slate-300 hover:bg-slate-50 hover:border-slate-400"
                      }`}
                    >
                      <div className="flex items-center justify-between w-full">
                        <span
                          className={`text-[9px] font-bold ${
                            isSelected ? "text-rose-400" : "text-slate-400"
                          }`}
                        >
                          SERVICE {srv.id}
                        </span>
                        {isSelected && <Sparkles className="w-3 h-3 text-primary" />}
                      </div>

                      <div className="font-bold text-[10px] leading-snug line-clamp-2">{srv.title}</div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* DEEP DIVE SERVICE DETAILS PANEL (MATCHING SOLUTION SERVICE DETAIL DOSSIER DESIGN) */}
            <div id="service-dossier-panel">
              <Reveal key={currentService.key}>
                <div className="bg-slate-950 text-white border border-slate-800 p-8 sm:p-12 shadow-2xl space-y-10 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-96 h-96 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />

                  {/* Header with Title and Image Highlight */}
                  <div className="grid lg:grid-cols-12 gap-8 items-start border-b border-slate-800 pb-8 relative z-10">
                    <div className="lg:col-span-7 space-y-4">
                      <div className="inline-flex items-center gap-2 bg-rose-500/20 border border-rose-500/40 text-rose-400 px-3.5 py-1 font-mono text-[11px] font-bold uppercase rounded-full">
                        <Sparkles className="w-3.5 h-3.5 text-primary" />
                        <span>CEMENT SERVICE {currentService.id} DOSSIER</span>
                      </div>

                      <h3 className="font-display font-black text-2xl sm:text-4xl text-white uppercase tracking-tight leading-tight">
                        {currentService.title}
                      </h3>

                      <div className="text-slate-300 font-sans text-sm sm:text-base leading-relaxed space-y-3 whitespace-pre-line pt-2">
                        {currentService.description}
                      </div>

                      <div className="pt-2">
                        <Link
                          href="/lets-connect"
                          className="inline-flex items-center gap-2 px-6 py-3.5 bg-primary hover:bg-rose-700 text-white font-mono text-xs font-bold uppercase tracking-wider transition-colors shadow-lg"
                        >
                          <span>Consult Engineers for {currentService.title}</span>
                          <ArrowRight className="w-4 h-4" />
                        </Link>
                      </div>
                    </div>

                    {/* Image Box */}
                    <div className="lg:col-span-5 relative">
                      <div className="relative border-2 border-slate-700 bg-slate-900 overflow-hidden shadow-2xl group">
                        <Image
                          src={currentService.image}
                          alt={currentService.title}
                          width={600}
                          height={400}
                          className="w-full h-[280px] sm:h-[340px] object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-80" />
                        <div className="absolute bottom-3 left-3 right-3 bg-slate-950/90 border border-slate-800 p-3 font-mono text-xs text-slate-300 flex items-center justify-between">
                          <span className="font-bold text-white uppercase">{currentService.title}</span>
                          <span className="text-[10px] text-rose-400 font-bold">CFD SIMULATION PLOT</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* 4 Detailed Breakdown Columns from PDF */}
                  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
                    {/* Typical Applications */}
                    <div className="bg-slate-900/90 border border-slate-800 p-6 space-y-4">
                      <div className="flex items-center gap-2 text-rose-400 font-mono text-xs font-bold uppercase border-b border-slate-800 pb-3">
                        <Factory className="w-4 h-4 text-primary shrink-0" />
                        <span>Typical Applications</span>
                      </div>
                      <ul className="space-y-2 font-mono text-[11px] text-slate-300">
                        {currentService.applications.map((app, i) => (
                          <li key={i} className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-rose-500 shrink-0" />
                            <span>{app}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Key Engineering Analyses */}
                    <div className="bg-slate-900/90 border border-slate-800 p-6 space-y-4">
                      <div className="flex items-center gap-2 text-rose-400 font-mono text-xs font-bold uppercase border-b border-slate-800 pb-3">
                        <Compass className="w-4 h-4 text-primary shrink-0" />
                        <span>Key Engineering Analyses</span>
                      </div>
                      <ul className="space-y-2 font-mono text-[11px] text-slate-300">
                        {currentService.analyses.map((anl, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <Check className="w-3.5 h-3.5 text-rose-400 shrink-0 mt-0.5" />
                            <span className="leading-tight">{anl}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Deliverables */}
                    <div className="bg-slate-900/90 border border-slate-800 p-6 space-y-4">
                      <div className="flex items-center gap-2 text-rose-400 font-mono text-xs font-bold uppercase border-b border-slate-800 pb-3">
                        <ClipboardList className="w-4 h-4 text-primary shrink-0" />
                        <span>Deliverables</span>
                      </div>
                      <ul className="space-y-2 font-mono text-[11px] text-slate-300">
                        {currentService.deliverables.map((del, i) => (
                          <li key={i} className="flex items-start gap-2 border-b border-slate-800/40 pb-1.5">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                            <span className="leading-tight">{del}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Key Benefits */}
                    <div className="bg-slate-900/90 border border-slate-800 p-6 space-y-4">
                      <div className="flex items-center gap-2 text-rose-400 font-mono text-xs font-bold uppercase border-b border-slate-800 pb-3">
                        <Award className="w-4 h-4 text-primary shrink-0" />
                        <span>Key Benefits</span>
                      </div>
                      <ul className="space-y-2 font-sans text-xs text-slate-300">
                        {currentService.benefits.map((ben, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <CheckCircle2 className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" />
                            <span className="leading-snug">{ben}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* 3. CHALLENGES IN THE CEMENT INDUSTRY */}
        <section className="py-20 bg-slate-50 border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 space-y-12">
            <div className="max-w-3xl space-y-4">
              <Reveal>
                <div className="inline-block font-mono text-xs font-bold text-primary uppercase tracking-widest bg-rose-50 border border-rose-200 px-3 py-1">
                  INDUSTRY CHALLENGES
                </div>
              </Reveal>
              <Reveal>
                <h2 className="font-display font-black text-3xl sm:text-4xl text-slate-900 uppercase tracking-tight">
                  Addressing Key Challenges in the Cement Industry
                </h2>
              </Reveal>
              <Reveal>
                <p className="text-slate-600 font-sans text-base leading-relaxed">
                  We work side-by-side with plant owners, investors, and operators to navigate environmental, resource, regulatory, and technological pressures.
                </p>
              </Reveal>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <Reveal>
                <div className="bg-white border border-slate-200 p-6 space-y-4 h-full flex flex-col justify-between hover:border-primary/60 transition-all duration-200 group">
                  <div className="space-y-3">
                    <div className="w-10 h-10 rounded bg-rose-50 border border-rose-200 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                      <Leaf className="w-5 h-5" />
                    </div>
                    <h3 className="font-display font-extrabold text-lg text-slate-900 uppercase tracking-tight">
                      Environmental Impact
                    </h3>
                    <p className="text-xs text-slate-600 font-sans leading-relaxed">
                      Cement production is a significant source of carbon dioxide emissions, contributing to climate change. The industry faces pressure to reduce its environmental footprint, including carbon emissions, energy consumption, and water usage, while meeting growing demand for cement.
                    </p>
                  </div>
                  <div className="pt-3 border-t border-slate-100 font-mono text-[10px] font-bold text-rose-500">
                    DECARBONIZATION & FOOTPRINT
                  </div>
                </div>
              </Reveal>

              <Reveal>
                <div className="bg-white border border-slate-200 p-6 space-y-4 h-full flex flex-col justify-between hover:border-primary/60 transition-all duration-200 group">
                  <div className="space-y-3">
                    <div className="w-10 h-10 rounded bg-rose-50 border border-rose-200 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                      <Globe className="w-5 h-5" />
                    </div>
                    <h3 className="font-display font-extrabold text-lg text-slate-900 uppercase tracking-tight">
                      Resource Depletion
                    </h3>
                    <p className="text-xs text-slate-600 font-sans leading-relaxed">
                      Cement production relies on finite resources such as limestone and clay. As demand grows, there is a risk of resource depletion and environmental degradation associated with quarrying activities, highlighting the need for sustainable resource management.
                    </p>
                  </div>
                  <div className="pt-3 border-t border-slate-100 font-mono text-[10px] font-bold text-rose-500">
                    SUSTAINABLE RESOURCE MANAGEMENT
                  </div>
                </div>
              </Reveal>

              <Reveal>
                <div className="bg-white border border-slate-200 p-6 space-y-4 h-full flex flex-col justify-between hover:border-primary/60 transition-all duration-200 group">
                  <div className="space-y-3">
                    <div className="w-10 h-10 rounded bg-rose-50 border border-rose-200 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                      <Scale className="w-5 h-5" />
                    </div>
                    <h3 className="font-display font-extrabold text-lg text-slate-900 uppercase tracking-tight">
                      Regulatory Compliance
                    </h3>
                    <p className="text-xs text-slate-600 font-sans leading-relaxed">
                      Stringent regulations and emissions standards pose compliance challenges for cement manufacturers, particularly in regions with strict environmental regulations. Meeting regulatory requirements while maintaining competitiveness is a critical challenge for the industry.
                    </p>
                  </div>
                  <div className="pt-3 border-t border-slate-100 font-mono text-[10px] font-bold text-rose-500">
                    EMISSIONS STANDARDS & LAWS
                  </div>
                </div>
              </Reveal>

              <Reveal>
                <div className="bg-white border border-slate-200 p-6 space-y-4 h-full flex flex-col justify-between hover:border-primary/60 transition-all duration-200 group">
                  <div className="space-y-3">
                    <div className="w-10 h-10 rounded bg-rose-50 border border-rose-200 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                      <Cpu className="w-5 h-5" />
                    </div>
                    <h3 className="font-display font-extrabold text-lg text-slate-900 uppercase tracking-tight">
                      Technological Innovation
                    </h3>
                    <p className="text-xs text-slate-600 font-sans leading-relaxed">
                      Rapid technological advancements, including digitalization, automation, and alternative materials, present both opportunities and challenges for the cement industry. Adapting to technological changes and investing in innovation is essential for long-term sustainability and competitiveness.
                    </p>
                  </div>
                  <div className="pt-3 border-t border-slate-100 font-mono text-[10px] font-bold text-rose-500">
                    DIGITAL ADAPTATION & INNOVATION
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* 4. SOLUTIONS PROVIDED BY MACPROTEC */}
        <section id="cement-solutions" className="py-20 bg-white border-b border-slate-200 scroll-mt-10">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 space-y-12">
            <div className="max-w-3xl space-y-4">
              <Reveal>
                <div className="inline-block font-mono text-xs font-bold text-primary uppercase tracking-widest bg-rose-50 border border-rose-200 px-3 py-1">
                  MACPROTEC SOLUTIONS & OPPORTUNITIES
                </div>
              </Reveal>
              <Reveal>
                <h2 className="font-display font-black text-3xl sm:text-4xl text-slate-900 uppercase tracking-tight">
                  Strategic Solutions for the Cement Industry
                </h2>
              </Reveal>
              <Reveal>
                <p className="text-slate-600 font-sans text-base leading-relaxed">
                  MACPROTEC works diligently to bring comprehensive solutions to the Cement Industry across key growth and decarbonization opportunities.
                </p>
              </Reveal>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Solution 1 */}
              <Reveal>
                <div className="bg-slate-50 border border-slate-200 p-8 space-y-4 hover:border-primary/60 transition-all duration-200 group h-full flex flex-col justify-between">
                  <div className="space-y-4">
                    <div className="w-12 h-12 rounded bg-rose-50 border border-rose-200 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                      <Flame className="w-6 h-6" />
                    </div>
                    <h3 className="font-display font-extrabold text-xl text-slate-900 uppercase tracking-tight">
                      Alternative Fuels & Raw Materials (AFR)
                    </h3>
                    <p className="text-slate-600 font-sans text-sm leading-relaxed">
                      Cement manufacturers are exploring alternative fuels such as biomass, waste-derived fuels, and alternative raw materials to reduce reliance on traditional fossil fuels and virgin resources, thereby lowering carbon emissions and enhancing resource efficiency. We do all upfront and downstream project engineering and services in this category.
                    </p>
                  </div>
                  <div className="pt-4 border-t border-slate-200 font-mono text-[11px] font-bold text-primary">
                    UPFRONT & DOWNSTREAM ENGINEERING
                  </div>
                </div>
              </Reveal>

              {/* Solution 2 */}
              <Reveal>
                <div className="bg-slate-50 border border-slate-200 p-8 space-y-4 hover:border-primary/60 transition-all duration-200 group h-full flex flex-col justify-between">
                  <div className="space-y-4">
                    <div className="w-12 h-12 rounded bg-rose-50 border border-rose-200 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                      <Leaf className="w-6 h-6" />
                    </div>
                    <h3 className="font-display font-extrabold text-xl text-slate-900 uppercase tracking-tight">
                      Carbon Capture and Utilization (CCU)
                    </h3>
                    <p className="text-slate-600 font-sans text-sm leading-relaxed">
                      MACPROTEC is partnered with the industry's top talents to offer Carbon capture technologies with the potential to capture and utilize CO2 emissions from cement plants for beneficial purposes, such as carbonation of concrete or production of synthetic fuels, contributing to climate mitigation efforts.
                    </p>
                  </div>
                  <div className="pt-4 border-t border-slate-200 font-mono text-[11px] font-bold text-primary">
                    TOP TALENT PARTNERSHIPS & TECH
                  </div>
                </div>
              </Reveal>

              {/* Solution 3 */}
              <Reveal>
                <div className="bg-slate-50 border border-slate-200 p-8 space-y-4 hover:border-primary/60 transition-all duration-200 group h-full flex flex-col justify-between">
                  <div className="space-y-4">
                    <div className="w-12 h-12 rounded bg-rose-50 border border-rose-200 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                      <Recycle className="w-6 h-6" />
                    </div>
                    <h3 className="font-display font-extrabold text-xl text-slate-900 uppercase tracking-tight">
                      Circular Economy Practices
                    </h3>
                    <p className="text-slate-600 font-sans text-sm leading-relaxed">
                      Adopting circular economy principles, including recycling and repurposing of waste materials such as construction and demolition waste, can reduce the environmental impact of cement production and conserve natural resources.
                    </p>
                  </div>
                  <div className="pt-4 border-t border-slate-200 font-mono text-[11px] font-bold text-primary">
                    RECYCLING & WASTE REPURPOSING
                  </div>
                </div>
              </Reveal>

              {/* Solution 4 */}
              <Reveal>
                <div className="bg-slate-50 border border-slate-200 p-8 space-y-4 hover:border-primary/60 transition-all duration-200 group h-full flex flex-col justify-between">
                  <div className="space-y-4">
                    <div className="w-12 h-12 rounded bg-rose-50 border border-rose-200 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                      <Cpu className="w-6 h-6" />
                    </div>
                    <h3 className="font-display font-extrabold text-xl text-slate-900 uppercase tracking-tight">
                      Digitalization and Industry 4.0
                    </h3>
                    <p className="text-slate-600 font-sans text-sm leading-relaxed">
                      Industry 4.0 technologies, such as IoT sensors, AI, and automation, can optimize production processes, improve energy efficiency, and enable predictive maintenance, enhancing productivity and sustainability in the cement industry.
                    </p>
                  </div>
                  <div className="pt-4 border-t border-slate-200 font-mono text-[11px] font-bold text-primary">
                    IOT, AI & PREDICTIVE TELEMETRY
                  </div>
                </div>
              </Reveal>

              {/* Solution 5 */}
              <Reveal className="md:col-span-2 lg:col-span-2">
                <div className="bg-slate-900 text-white border border-slate-800 p-8 space-y-4 hover:border-rose-500/50 transition-all duration-200 group h-full flex flex-col justify-between">
                  <div className="space-y-4">
                    <div className="w-12 h-12 rounded bg-rose-500/20 border border-rose-500/40 flex items-center justify-center text-rose-400">
                      <Share2 className="w-6 h-6" />
                    </div>
                    <h3 className="font-display font-extrabold text-xl text-white uppercase tracking-tight">
                      Collaboration and Knowledge Sharing
                    </h3>
                    <p className="text-slate-300 font-sans text-sm leading-relaxed">
                      Collaboration among stakeholders, including governments, industry associations, academia, and civil society, is essential for driving innovation, sharing best practices, and addressing common challenges facing the cement industry. We are the champions in sharing knowledge across the board in the Cement Industry.
                    </p>
                  </div>
                  <div className="pt-4 border-t border-slate-800 font-mono text-[11px] font-bold text-rose-400">
                    CHAMPIONS IN INDUSTRY KNOWLEDGE SHARING
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* 5. CLOSING COMMITMENT BANNER */}
        <section className="py-20 bg-slate-950 text-white border-b border-slate-800 overflow-hidden relative">
          <div className="absolute top-0 right-0 w-96 h-96 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="max-w-5xl mx-auto px-6 lg:px-8 relative z-10 text-center space-y-8">
            <Reveal>
              <div className="inline-block font-mono text-xs font-bold text-rose-400 tracking-widest uppercase bg-rose-500/20 border border-rose-500/40 px-3 py-1">
                OUR FOUNDATIONAL CORE STRENGTH
              </div>
            </Reveal>

            <Reveal>
              <h2 className="font-display font-black text-3xl sm:text-5xl text-white uppercase tracking-tight max-w-4xl mx-auto leading-tight">
                Partner with MACPROTEC for Sustainable & Profitable Cement Operations
              </h2>
            </Reveal>

            <Reveal>
              <p className="text-slate-300 font-sans text-base sm:text-lg leading-relaxed max-w-3xl mx-auto">
                From alternative fuel conversions to kiln optimization, carbon capture integration, and plant digitalization, MACPROTEC brings deep domain engineering expertise to every cement project.
              </p>
            </Reveal>

            <Reveal>
              <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
                <Link
                  href="/lets-connect"
                  className="px-8 py-4 bg-primary hover:bg-rose-700 text-white font-mono text-xs font-bold uppercase tracking-wider transition-all duration-150 shadow-xl flex items-center gap-2 group"
                >
                  <span>Consult Cement Engineers</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>

                <Link
                  href="/solutions"
                  className="px-8 py-4 bg-slate-900 border border-slate-700 hover:border-rose-500 text-slate-200 hover:text-white font-mono text-xs font-bold uppercase tracking-wider transition-all duration-150 flex items-center gap-2"
                >
                  <span>Explore All Solutions</span>
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
