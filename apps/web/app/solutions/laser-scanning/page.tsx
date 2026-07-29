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
  Scan,
  Box,
  RotateCcw,
  Activity,
  Maximize2,
} from "lucide-react";

// Sub-services Data from PDF spec (Solution Card 5: 3D Laser Scanning & Reverse Engineering)
const SERVICES_DATA = [
  {
    id: "01",
    key: "laser-scanning",
    title: "3D Laser Scanning",
    summary:
      "Capture industrial facilities, equipment, and infrastructure with high-precision laser scanning to create accurate digital representations for engineering, maintenance, and modernization projects.",
    tagline: "High-Precision Terrestrial Reality Capture & Digital Site Documentation",
    overview:
      "Accurate engineering begins with accurate site information. In many industrial facilities, existing conditions differ significantly from original design documents due to years of modifications, equipment replacements, and plant expansions. Traditional field measurements are often time-consuming, disruptive, and prone to inaccuracies, increasing engineering risks during retrofit, maintenance, and modernization projects. 3D Laser Scanning provides a fast, non-intrusive, and highly accurate method of capturing existing plant conditions, creating a precise digital representation of industrial assets.",
    overviewExtended:
      "At MACPROTEC, we deliver professional 3D Laser Scanning services using advanced terrestrial laser scanning technology to capture millions of high-precision measurement points across industrial plants and equipment. The resulting point cloud provides an accurate digital record of the facility, enabling engineers to confidently plan retrofit projects, plant expansions, maintenance activities, and engineering modifications. By eliminating uncertainties associated with manual measurements and outdated drawings, we help clients reduce engineering risks, improve project accuracy, shorten design cycles, and establish a reliable digital foundation for future engineering and asset management initiatives.",
    approach: [
      "Project Planning & Site Assessment",
      "High-Precision Laser Data Acquisition",
      "Point Cloud Registration & Quality Verification",
      "Point Cloud Processing & Optimization",
      "Digital Data Validation",
      "Engineering Data Delivery",
    ],
    deliverables: [
      "Registered Point Cloud Data",
      "Colorized 3D Point Cloud Model",
      "Scan Quality Verification Report",
      "Engineering Coordinate System",
      "Section Views & Elevations",
      "Scan Data for CAD/BIM Integration",
      "Digital Site Documentation",
      "Engineering Data Archive",
      "Technical Documentation",
      "Project Support & Consultation",
    ],
    benefits: [
      "Capture existing facilities with millimeter-level accuracy",
      "Eliminate costly manual measurements and repeated site visits",
      "Reduce engineering uncertainties during retrofit and expansion projects",
      "Accelerate engineering design and project execution",
      "Improve multidisciplinary project coordination",
      "Create a reliable digital record of plant assets",
      "Support future digital engineering and asset management initiatives",
      "Minimize project risks, rework, and construction delays",
    ],
  },
  {
    id: "02",
    key: "point-cloud-cad",
    title: "Point Cloud to CAD Modeling",
    summary:
      "Transform laser scan data into accurate 2D drawings and intelligent 3D CAD models for engineering design, documentation, and project execution.",
    tagline: "Convert Scan Point Cloud Data into Intelligent Engineering CAD Assets",
    overview:
      "Laser scan data provides an accurate representation of existing plant conditions, but engineering projects require structured and intelligent models that can be used for design, analysis, fabrication, and documentation. Point Cloud to CAD Modeling transforms millions of captured scan points into precise 2D drawings and 3D CAD models, enabling engineers to work with reliable digital assets throughout the project lifecycle.",
    overviewExtended:
      "At MACPROTEC, we provide comprehensive Point Cloud to CAD Modeling services that convert raw point cloud data into accurate engineering models tailored to project requirements. Our engineers develop intelligent CAD models, layouts, sections, elevations, piping models, structural models, and equipment models that faithfully represent existing plant conditions. These digital assets support engineering design, retrofit planning, plant expansion, fabrication, digital twin development, and asset management. By replacing outdated drawings with accurate engineering models, we help clients reduce design errors, improve multidisciplinary coordination, and accelerate project execution.",
    approach: [
      "Point Cloud Assessment & Project Planning",
      "Point Cloud Processing & Data Preparation",
      "CAD Model Development",
      "Model Validation & Quality Verification",
      "Engineering Documentation Development",
      "Digital Model Delivery & Client Support",
    ],
    deliverables: [
      "Intelligent 3D CAD Models",
      "2D General Arrangement Drawings",
      "Plant Layouts, Sections & Elevations",
      "Equipment & Piping Models",
      "Structural CAD Models",
      "As-Built Engineering Drawings",
      "CAD Files Compatible with Industry-Standard Software",
      "Model Quality Verification Report",
      "Engineering Documentation",
      "Digital Engineering Data Package",
    ],
    benefits: [
      "Transform laser scan data into engineering-ready CAD models",
      "Improve design accuracy using verified existing plant conditions",
      "Reduce engineering time and manual drafting efforts",
      "Support retrofit, expansion, and brownfield engineering projects",
      "Enhance collaboration across multidisciplinary engineering teams",
      "Minimize design errors and construction rework",
      "Establish reliable digital assets for future engineering and maintenance",
      "Accelerate project delivery with accurate and intelligent engineering models",
    ],
  },
  {
    id: "03",
    key: "reverse-engineering",
    title: "Reverse Engineering",
    summary:
      "Recreate equipment, components, and plant systems into detailed engineering models when original design documentation is unavailable or outdated.",
    tagline: "Recreate Obsolete and Undocumented Industrial Equipment with Precision",
    overview:
      "Many industrial facilities operate with aging equipment for which original engineering drawings are incomplete, outdated, or no longer available. This lack of reliable design information can make maintenance, equipment replacement, fabrication, and plant modifications both challenging and costly. Reverse Engineering enables existing components, equipment, and systems to be digitally reconstructed, providing accurate engineering models that support informed decision-making and efficient project execution.",
    overviewExtended:
      "At MACPROTEC, we provide comprehensive Reverse Engineering services by combining high-precision 3D laser scanning with advanced CAD modeling and engineering expertise. We recreate existing equipment and plant components into accurate digital models, engineering drawings, and technical documentation that reflect actual field conditions. Whether replacing obsolete equipment, manufacturing spare parts, supporting plant upgrades, or developing engineering documentation for legacy systems, our solutions help clients reduce engineering uncertainties, improve fabrication accuracy, and extend the operational life of critical assets.",
    approach: [
      "Existing Asset Assessment & Data Collection",
      "3D Laser Scanning & Reality Capture",
      "Engineering Analysis & Model Development",
      "CAD Model & Drawing Generation",
      "Model Validation & Quality Verification",
      "Engineering Documentation & Data Delivery",
    ],
    deliverables: [
      "Intelligent 3D CAD Models",
      "Reverse Engineered Equipment Models",
      "Manufacturing & General Arrangement Drawings",
      "Dimensional Verification Report",
      "Engineering Specifications",
      "Assembly & Component Drawings",
      "As-Built Engineering Documentation",
      "Digital Engineering Files",
      "Technical Documentation",
      "Engineering Support & Consultation",
    ],
    benefits: [
      "Recreate obsolete or undocumented equipment with high accuracy",
      "Support equipment replacement and spare part manufacturing",
      "Reduce dependence on outdated or missing engineering drawings",
      "Improve fabrication accuracy and installation efficiency",
      "Minimize engineering risks during plant modifications",
      "Extend the service life of critical plant assets",
      "Accelerate maintenance, retrofit, and modernization projects",
      "Preserve valuable engineering knowledge through accurate digital documentation",
    ],
  },
  {
    id: "04",
    key: "wear-deformation",
    title: "Wear & Deformation Analysis",
    summary:
      "Assess wear, distortion, and dimensional deviations to support maintenance planning, structural integrity assessments, and equipment life extension.",
    tagline: "Evaluate Equipment Condition, Distortion & Settlement with Color-Mapped Analytics",
    overview:
      "Industrial equipment is continuously exposed to high temperatures, abrasion, pressure, vibration, and mechanical loading, leading to gradual wear, deformation, distortion, and dimensional changes over time. If left undetected, these changes can reduce equipment performance, compromise structural integrity, increase maintenance costs, and lead to unplanned shutdowns. Wear & Deformation Analysis provides an accurate assessment of the current condition of critical assets, enabling informed maintenance and engineering decisions before failures occur.",
    overviewExtended:
      "At MACPROTEC, we provide comprehensive Wear & Deformation Analysis services by combining high-precision 3D laser scanning with advanced engineering analysis and digital comparison techniques. We evaluate the condition of equipment, structures, ducts, vessels, cyclones, kilns, silos, and other industrial assets by comparing captured geometry against original design models or previous inspection data. Our analysis identifies wear patterns, distortion, settlement, misalignment, and dimensional deviations, helping clients prioritize maintenance activities, validate equipment integrity, extend asset life, and optimize plant reliability.",
    approach: [
      "Asset Condition Assessment & Inspection Planning",
      "High-Precision 3D Laser Scanning",
      "Digital Geometry Comparison & Deviation Analysis",
      "Wear, Deformation & Alignment Evaluation",
      "Engineering Assessment & Integrity Review",
      "Maintenance Recommendations & Technical Reporting",
    ],
    deliverables: [
      "Wear & Deformation Assessment Report",
      "Dimensional Deviation Analysis",
      "Color-Mapped Deviation Models",
      "Alignment & Geometry Verification",
      "Equipment Condition Assessment",
      "Comparative Analysis with Design or Historical Models",
      "Maintenance & Repair Recommendations",
      "Engineering Documentation",
      "Digital Inspection Data",
      "Technical Consultation & Support",
    ],
    benefits: [
      "Detect wear, deformation, and dimensional changes with high accuracy",
      "Identify potential equipment issues before they lead to failures",
      "Improve maintenance planning and asset lifecycle management",
      "Reduce unplanned downtime and maintenance costs",
      "Support safe and reliable operation of critical equipment",
      "Validate structural integrity using accurate digital measurements",
      "Enable data-driven repair and replacement decisions",
      "Extend the operational life of industrial assets through proactive engineering",
    ],
  },
  {
    id: "05",
    key: "retrofit-engineering",
    title: "Retrofit Engineering",
    summary:
      "Support plant modifications, equipment upgrades, and brownfield expansion projects using precise digital models of existing facilities.",
    tagline: "De-risk Brownfield Expansions and Integrate Upgrades Seamlessly",
    overview:
      "Plant modernization, capacity expansion, and equipment upgrades often take place within existing facilities where space constraints, undocumented modifications, and outdated engineering drawings can create significant project risks. Successful retrofit projects require an accurate understanding of current plant conditions and engineering solutions that integrate seamlessly with existing infrastructure. Retrofit Engineering enables industrial facilities to implement modifications efficiently while minimizing operational disruption, construction conflicts, and engineering uncertainties.",
    overviewExtended:
      "At MACPROTEC, we provide comprehensive Retrofit Engineering services that combine 3D laser scanning, digital modeling, reverse engineering, and multidisciplinary engineering expertise to develop practical solutions for brownfield facilities. Our engineers assess existing plant conditions, evaluate design constraints, and develop optimized retrofit solutions that improve plant performance, accommodate new equipment, and support future expansion. Whether upgrading process systems, replacing aging equipment, or integrating new technologies, we help clients execute retrofit projects safely, efficiently, and with confidence.",
    approach: [
      "Existing Plant Assessment & Site Verification",
      "3D Reality Capture & Digital Modeling",
      "Engineering Evaluation & Retrofit Planning",
      "Multidisciplinary Design Development",
      "Design Coordination & Clash Resolution",
      "Engineering Documentation & Implementation Support",
    ],
    deliverables: [
      "Retrofit Engineering Study Report",
      "Existing vs. Proposed Plant Layouts",
      "Retrofit General Arrangement Drawings",
      "Equipment & Piping Modification Drawings",
      "Structural & Support Design Documentation",
      "Clash Detection & Design Coordination Report",
      "Installation & Construction Drawings",
      "Bill of Materials (where applicable)",
      "Engineering Calculations & Technical Documentation",
      "Implementation Support & Engineering Consultation",
    ],
    benefits: [
      "Minimize engineering risks in brownfield and retrofit projects",
      "Integrate new equipment seamlessly with existing facilities",
      "Reduce construction conflicts, rework, and project delays",
      "Improve design accuracy using verified site conditions",
      "Accelerate project execution through coordinated engineering",
      "Optimize plant layouts for improved accessibility and maintainability",
      "Extend the operational life of existing facilities through strategic upgrades",
      "Deliver cost-effective modernization solutions with minimal production disruption",
    ],
  },
];

// Why Choose Features (From PDF Page 13)
const WHY_CHOOSE_ITEMS = [
  {
    title: "Reality Capture with Engineering Precision",
    desc: "Millimeter-level laser scanning data coupled with deep multidisciplinary engineering expertise.",
    icon: Scan,
  },
  {
    title: "Comprehensive Digital Engineering Workflow",
    desc: "Seamless transition from raw point clouds to intelligent 3D CAD, BIM, and digital twin models.",
    icon: Box,
  },
  {
    title: "Brownfield & Retrofit Expertise",
    desc: "Proven track record in solving complex spatial constraints, clash detection, and brownfield integrations.",
    icon: Wrench,
  },
  {
    title: "Engineering-Ready Digital Deliverables",
    desc: "High-quality, construction-ready CAD files, MTOs, P&IDs, and as-built documentation.",
    icon: Layers,
  },
  {
    title: "Reduced Project Risk & Improved Accuracy",
    desc: "Elimination of costly site re-visits, manual measurement errors, and site clash rework.",
    icon: ShieldCheck,
  },
  {
    title: "Intelligent Asset Management",
    desc: "Enabling long-term digital transformation and predictive maintenance through accurate digital twins.",
    icon: Cpu,
  },
];

export default function LaserScanningServicePage() {
  const [activeTabKey, setActiveTabKey] = useState("laser-scanning");
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
              <span className="text-primary font-bold">3D Laser Scanning & Reverse Engineering</span>
            </div>
            <div className="hidden sm:flex items-center gap-3 text-[10px] text-slate-400">
              <span className="font-bold text-rose-400">SOLUTION 05</span>
              <span>•</span>
              <span>REALITY CAPTURE & REVERSE ENGINEERING</span>
            </div>
          </div>
        </section>

        {/* 1. FULL-WIDTH HERO SECTION (Resources Style with Black Overlay) */}
        <section className="w-full relative bg-black border-b-2 border-primary/30 py-16 sm:py-20 lg:py-24 overflow-hidden group">
          {/* Full-width Background Image */}
          <div className="absolute inset-0 w-full h-full pointer-events-none">
            <Image
              src="/images/card_laser_scanning.png"
              alt="MACPROTEC 3D Laser Scanning & Point Cloud Model"
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
                  <span>SOLUTION CARD 05 // REALITY CAPTURE & REVERSE ENGINEERING</span>
                </div>

                {/* Main Hero Title */}
                <div className="flex justify-center w-full">
                  <h1 className="text-4xl sm:text-6xl lg:text-7xl font-display font-black uppercase tracking-tight text-white drop-shadow-2xl">
                    3D Laser Scanning & <span className="text-primary">Reverse Engineering</span>
                  </h1>
                </div>

                {/* Subtitle Description */}
                <p className="text-slate-200 font-sans text-base sm:text-lg leading-relaxed max-w-2xl mx-auto drop-shadow-md">
                  Capture accurate digital representations of industrial facilities to support retrofit engineering,
                  point cloud to CAD modeling, reverse engineering, wear analysis, and brownfield plant modernization.
                </p>

                {/* Quick Badges Ticker */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-3xl mx-auto w-full border-t border-white/20 pt-6 font-mono text-xs text-white">
                  <div className="flex items-center justify-center gap-2 bg-[#201235]/80 border border-white/10 px-3.5 py-2.5 shadow-sm">
                    <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                    <span className="font-semibold whitespace-nowrap">3D Laser Scanning</span>
                  </div>
                  <div className="flex items-center justify-center gap-2 bg-[#201235]/80 border border-white/10 px-3.5 py-2.5 shadow-sm">
                    <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                    <span className="font-semibold whitespace-nowrap">Point Cloud to CAD</span>
                  </div>
                  <div className="flex items-center justify-center gap-2 bg-[#201235]/80 border border-white/10 px-3.5 py-2.5 shadow-sm">
                    <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                    <span className="font-semibold whitespace-nowrap">Reverse Engineering</span>
                  </div>
                  <div className="flex items-center justify-center gap-2 bg-[#201235]/80 border border-white/10 px-3.5 py-2.5 shadow-sm">
                    <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                    <span className="font-semibold whitespace-nowrap">Wear Analysis</span>
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

        {/* 2. ABOUT 3D LASER SCANNING & REVERSE ENGINEERING */}
        <section className="py-20 bg-slate-50 border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="bg-white border border-slate-200 p-8 sm:p-12 shadow-sm space-y-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 border-b border-l border-rose-500/10 pointer-events-none" />

              <div className="max-w-3xl space-y-4">
                <Reveal>
                  <div className="inline-block font-mono text-xs font-bold text-primary uppercase tracking-widest bg-rose-50 border border-rose-200 px-3 py-1">
                    ABOUT 3D LASER SCANNING & REVERSE ENGINEERING
                  </div>
                </Reveal>

                <Reveal>
                  <h2 className="font-display font-black text-2xl sm:text-4xl text-slate-900 uppercase tracking-tight">
                    Capture Reality. Engineer with Precision.
                  </h2>
                </Reveal>

                <Reveal>
                  <p className="text-slate-600 font-sans text-base leading-relaxed">
                    Industrial facilities continuously evolve through equipment upgrades, maintenance activities, and
                    plant expansions, often resulting in existing plant conditions that differ significantly from original
                    engineering drawings. These discrepancies can create challenges during retrofit projects, equipment replacement, plant modernization, and maintenance planning, increasing engineering risks, project delays, and construction costs.
                  </p>
                </Reveal>

                <Reveal>
                  <p className="text-slate-600 font-sans text-base leading-relaxed pt-2">
                    At MACPROTEC, we provide comprehensive 3D Laser Scanning & Reverse Engineering services that transform existing industrial facilities into accurate digital engineering assets. Using advanced laser scanning technology and engineering expertise, we capture precise plant data and convert it into intelligent point clouds, CAD models, engineering drawings, and as-built documentation. Our solutions support retrofit engineering, brownfield modifications, digital twin development, fabrication, and asset management, enabling clients to execute projects with greater accuracy, reduced risk, and improved engineering efficiency.
                  </p>
                </Reveal>
              </div>

              {/* Grid Metrics Highlights */}
              <Reveal>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-slate-100 font-mono text-xs">
                  <div className="p-4 bg-slate-50 border border-slate-200">
                    <div className="text-[10px] text-slate-400 uppercase font-bold">REALITY CAPTURE</div>
                    <div className="text-lg font-bold text-slate-900 mt-1">±1-2mm Accuracy</div>
                    <div className="text-[10px] text-slate-500 mt-0.5">High-Density Point Cloud</div>
                  </div>

                  <div className="p-4 bg-slate-50 border border-slate-200">
                    <div className="text-[10px] text-slate-400 uppercase font-bold">CAD & BIM MODELING</div>
                    <div className="text-lg font-bold text-slate-900 mt-1">Point Cloud to 3D</div>
                    <div className="text-[10px] text-slate-500 mt-0.5">Intelligent As-Built Assets</div>
                  </div>

                  <div className="p-4 bg-slate-50 border border-slate-200">
                    <div className="text-[10px] text-slate-400 uppercase font-bold">REVERSE ENGINEERING</div>
                    <div className="text-lg font-bold text-slate-900 mt-1">Legacy Equipment</div>
                    <div className="text-[10px] text-slate-500 mt-0.5">Spare Part Fabrication</div>
                  </div>

                  <div className="p-4 bg-slate-50 border border-slate-200">
                    <div className="text-[10px] text-slate-400 uppercase font-bold">WEAR & RETROFIT</div>
                    <div className="text-lg font-bold text-slate-900 mt-1">Zero Site Clash</div>
                    <div className="text-[10px] text-slate-500 mt-0.5">Deformation Analytics</div>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* 3. 3D LASER SCANNING & REVERSE ENGINEERING SERVICES */}
        <section id="services-breakdown" className="py-20 bg-white border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 space-y-12">
            {/* Header */}
            <div className="text-center max-w-3xl mx-auto space-y-4">
              <Reveal>
                <div className="inline-block font-mono text-xs font-bold text-primary uppercase tracking-widest bg-rose-50 border border-rose-200 px-3 py-1">
                  DIGITAL ENGINEERING SERVICES
                </div>
              </Reveal>

              <Reveal>
                <h2 className="font-display font-black text-3xl sm:text-4xl text-slate-900 uppercase tracking-tight">
                  Reality Capture & Digital Asset Capabilities
                </h2>
              </Reveal>

              <Reveal>
                <p className="text-slate-600 font-sans text-base leading-relaxed">
                  Explore our digital engineering solutions designed to accurately capture existing facilities, develop
                  intelligent engineering models, and support retrofit, modernization, and asset management projects. Select any service below to review its engineering approach, deliverables, and key benefits.
                </p>
              </Reveal>
            </div>

            {/* Interactive Sub-Services Selector Tabs */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 font-mono text-xs">
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

            {/* 5 Grid Cards Showcase */}
            <RevealGroup className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 pt-6" stagger={0.06}>
              {SERVICES_DATA.map((srv) => (
                <RevealItem key={srv.key}>
                  <div className="bg-slate-50 border border-slate-200 p-6 space-y-4 h-full flex flex-col justify-between hover:border-primary/60 transition-all duration-200 group">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between font-mono text-[10px] text-slate-400">
                        <span className="font-bold text-primary uppercase">SUB-SERVICE {srv.id}</span>
                        <span>REALITY CAPTURE</span>
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

        {/* 4. WHY CHOOSE MACPROTEC FOR 3D LASER SCANNING */}
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
                  Why Choose MACPROTEC for 3D Laser Scanning & Reverse Engineering?
                </h2>
              </Reveal>

              <Reveal>
                <p className="text-slate-300 font-sans text-base leading-relaxed">
                  We combine terrestrial reality capture with multidisciplinary process and mechanical engineering design to deliver accurate as-built assets with zero site clashes.
                </p>
              </Reveal>
            </div>

            {/* 6 Feature Cards Grid */}
            <RevealGroup className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8" stagger={0.07}>
              {WHY_CHOOSE_ITEMS.map((item, idx) => {
                const IconComp = item.icon;
                return (
                  <RevealItem key={idx}>
                    <div className="bg-[#2d1b47] border border-[#3e2663] p-8 space-y-4 hover:border-primary/50 transition-all duration-300 group h-full">
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
                <div className="inline-flex items-center gap-2 bg-rose-500/20 border border-rose-500/40 text-rose-400 px-3.5 py-1 font-mono text-xs font-bold uppercase rounded-full">
                  <FileCheck className="w-3.5 h-3.5" />
                  <span>READY TO CAPTURE YOUR FACILITY IN 3D?</span>
                </div>
              </Reveal>

              <Reveal>
                <h2 className="font-display font-black text-3xl sm:text-5xl text-white uppercase tracking-tight">
                  Let's Discuss Your Laser Scanning & Retrofit Needs
                </h2>
              </Reveal>

              <Reveal>
                <p className="text-slate-300 font-sans text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
                  Connect with MACPROTEC digital engineering specialists to plan terrestrial 3D laser scanning, point cloud to CAD modeling, reverse engineering, or brownfield retrofit projects.
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
