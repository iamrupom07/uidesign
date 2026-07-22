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
  Flame,
  Gauge,
  Workflow,
  Compass,
  Award,
  Check,
  FileCheck,
  ClipboardList,
  Building2,
  Wind,
  Zap,
} from "lucide-react";

// 7 Industry Applications Data from PDF spec
const INDUSTRY_APPLICATIONS = [
  {
    key: "cement",
    name: "Cement Industry",
    badge: "LARGEST EXPERTISE AREA",
    summary: "Pyroprocessing, grinding, dust collection, material handling.",
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
    name: "Steel Industry",
    summary: "Furnaces, cooling systems, gas exhaust and dust control.",
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
    name: "Power Generation",
    summary: "Boilers, combustion, flue gas and thermal systems.",
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
    name: "Oil & Gas",
    summary: "Flow assurance, pipelines and process equipment.",
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
    name: "Chemical & Petrochemical",
    summary: "Reactors, mixing, piping and process systems.",
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
    name: "Mining Industry",
    summary: "Material transfer, ventilation and dust handling.",
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
    name: "Bulk Material Handling",
    summary: "Pneumatic conveying, silos, transfer systems and storage.",
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

// 12 Core Engineering Services from PDF spec
const CORE_SERVICES_DATA = [
  {
    id: "01",
    key: "cfd-flow",
    title: "CFD & Flow Simulation",
    summary: "Predict fluid flow, pressure drop, velocity distribution, and gas dynamics.",
    overview:
      "Computational Fluid Dynamics (CFD) is a powerful engineering tool used to simulate and analyze the behavior of fluids, gases, heat, and particulate matter within industrial processes and equipment. By solving the governing equations of fluid flow, CFD provides a detailed understanding of velocity fields, pressure distribution, turbulence, heat transfer, combustion, and multiphase interactions.",
    approach: [
      "Engineering Assessment & Data Collection",
      "3D CAD Surface & Fluid Domain Model Development",
      "Grid Generation & Boundary Layer Mesh Tuning",
      "CFD Simulation & Convergence Solving",
      "Engineering Interpretation & Post-Processing",
      "Final Engineering Recommendations & Design Fixes",
    ],
    deliverables: [
      "CFD Engineering Comprehensive Report",
      "Velocity, Pressure & Temperature Contour Plots",
      "Particle Tracking & Flow Streamline Visualizations",
      "Equipment Hydraulic Performance Assessment",
      "Design Optimization & Modification Recommendations",
      "Technical Presentation of Engineering Findings",
    ],
    benefits: [
      "Improve Process Efficiency & Hydraulic Flow Distribution",
      "Reduce Energy Consumption & Fan Operating Costs",
      "Minimize System Pressure Losses & Turbulence Bottlenecks",
      "Optimize Equipment Performance Prior to Fabrication",
      "Reduce Operational Risk & Eliminate Trial-and-Error Modifications",
    ],
  },
  {
    id: "02",
    key: "thermal-heat",
    title: "Thermal & Heat Transfer Analysis",
    summary: "Evaluate thermal gradients, heat loss, radiation, and cooling efficiency.",
    overview:
      "Thermal performance plays a critical role in the efficiency, reliability, and safety of industrial processes. Whether within cement kilns, calciners, boilers, heat exchangers, furnaces, or process piping, the transfer of heat directly influences fuel consumption, equipment life, product quality, and overall plant performance.",
    approach: [
      "Thermal System & Operating Data Assessment",
      "Digital 3D Thermal Model Development",
      "Coupled Thermal-Fluid Simulation & Radiation Analysis",
      "Thermal Stress & Gradient Performance Evaluation",
      "Engineering Insulation & Cooling Optimization",
      "Final Recommendations & Design Package",
    ],
    deliverables: [
      "Thermal Engineering Assessment Report",
      "Temperature Distribution Contours",
      "Heat Flux & Thermal Loss Analysis",
      "Thermal Gradient & Refractory Stress Evaluation",
      "Heat Transfer Performance Assessment",
      "Comparative Analysis of Design Alternatives",
    ],
    benefits: [
      "Improve Thermal Efficiency & Fuel Utilization",
      "Reduce Energy Consumption & Radiant Heat Loss",
      "Identify Localized Hot Spots & Refractory Failure Risks",
      "Extend Equipment Reliability & Service Life",
      "Validate Thermal Designs Before Implementation",
    ],
  },
  {
    id: "03",
    key: "combustion-altfuel",
    title: "Combustion & Alternative Fuel Engineering",
    summary: "Optimize flame stability, co-firing, alternative fuels (RDF/SRF), and emissions.",
    overview:
      "Efficient combustion is fundamental to the performance, energy efficiency, and environmental sustainability of high-temperature industrial processes. As industries transition toward alternative and low-carbon fuels (RDF, SRF, biomass, hydrogen), combustion systems become increasingly complex, requiring detailed engineering analysis.",
    approach: [
      "Combustion System & Firing Assessment",
      "Burner & Reaction Domain Digital Model Setup",
      "Multi-Phase Chemical Reaction Simulation",
      "Flame Geometry & Heat Release Evaluation",
      "Fuel Substitution & Co-Firing Optimization",
      "Engineering Recommendations & Firing Roadmap",
    ],
    deliverables: [
      "Combustion Engineering Assessment Report",
      "Flame Behaviour & Temperature Distribution Analysis",
      "Fuel-Air Mixing & Aerodynamic Swirl Evaluation",
      "Combustion Efficiency & Unburnt Carbon Assessment",
      "Alternative Fuel Substitution Feasibility Study",
      "Emission (NOx, CO) & Pollutant Formation Analysis",
    ],
    benefits: [
      "Improve Combustion Efficiency & Flame Stability",
      "Increase Alternative Fuel Utilization (RDF/SRF/Biomass)",
      "Reduce CO, NOx, and Unburnt Carbon Emissions",
      "Support Decarbonization & Plant Sustainability Goals",
      "Reduce Firing Costs Through Fuel Substitution",
    ],
  },
  {
    id: "04",
    key: "pipe-stress",
    title: "Pipe Stress Analysis & Support Design",
    summary: "Evaluate thermal expansion, sustained loads, code compliance (ASME B31.3), and nozzle loads.",
    overview:
      "Industrial piping systems are subjected to internal pressure, thermal expansion, dead weight, dynamic loads, and external forces. Pipe Stress Analysis ensures that piping systems operate safely, reliably, and in compliance with ASME B31.1/B31.3 codes under all operating conditions.",
    approach: [
      "Piping System & Isometric Data Assessment",
      "Analytical Finite Element Piping Model Development",
      "Stress, Thermal Expansion & Flexibility Analysis",
      "Support Location & Restraint Optimization",
      "ASME / International Code Compliance Verification",
      "Engineering Recommendations & Final Isometric Drawings",
    ],
    deliverables: [
      "Pipe Stress Analysis Comprehensive Report",
      "Piping Flexibility Assessment",
      "Pipe Support Layout & Support Schedule",
      "Spring Hanger & Restraint Load Calculations",
      "Equipment Nozzle Load Evaluation (API/NEMA)",
      "Thermal Expansion & Movement Analysis",
    ],
    benefits: [
      "Ensure Safe & Code-Compliant Piping Operation",
      "Minimize Thermal Expansion & Excessive Pipe Displacement",
      "Reduce Equipment Nozzle Overloads & Seal Failures",
      "Optimize Support Layouts & Spring Hanger Selections",
      "Prevent Piping Fatigue, Leakage & Structural Failures",
    ],
  },
  {
    id: "05",
    key: "flow-assurance",
    title: "Flow Assurance & Pipeline Engineering",
    summary: "Mitigate slugging, pressure loss, hydrate risk, and multiphase pipeline issues.",
    overview:
      "The safe and efficient transportation of liquids, gases, and multiphase fluids is critical to pipeline reliability. Flow Assurance focuses on predicting and mitigating pressure losses, slug flow, hydrate formation, wax deposition, and erosion throughout the pipeline lifecycle.",
    approach: [
      "Pipeline System Assessment",
      "Hydraulic & Process Model Development",
      "Transient Multiphase Flow & Thermal Analysis",
      "Slugging & Flow Regime Evaluation",
      "System Optimization & Mitigation Design",
      "Engineering Recommendations & Operating Envelope",
    ],
    deliverables: [
      "Flow Assurance Engineering Report",
      "Hydraulic & Pressure Drop Analysis",
      "Pipeline Capacity & Throughput Assessment",
      "Flow Regime & Multiphase Map Evaluation",
      "Slugging & Operational Stability Assessment",
      "Risk Mitigation Summary & Operating Guidelines",
    ],
    benefits: [
      "Ensure Continuous & Reliable Pipeline Operation",
      "Optimize Hydraulic Flow Capacity & Pressure Profiles",
      "Identify & Mitigate Slugging & Hydrate Risks",
      "Minimize Unplanned Shutdowns & Production Losses",
      "Enhance Long-Term Pipeline Integrity & Asset Performance",
    ],
  },
  {
    id: "06",
    key: "material-conveying",
    title: "Material Flow & Pneumatic Conveying",
    summary: "Optimize DEM-CFD particle flow, silo discharge, hopper wear, and pneumatic transfer.",
    overview:
      "Efficient handling of bulk solids is essential for maintaining productivity and preventing blockages. By combining CFD and Discrete Element Method (DEM) simulation, we analyze particle movement, conveying velocities, pressure drops, wear mechanisms, and discharge characteristics.",
    approach: [
      "Bulk Material Property & System Assessment",
      "DEM-CFD Coupled Digital Model Development",
      "Particle Dynamics & Flow Behavior Analysis",
      "System Conveying & Pressure Loss Evaluation",
      "Chute & Silo Geometry Design Optimization",
      "Final Engineering Recommendations & Layouts",
    ],
    deliverables: [
      "Material Flow Engineering Report",
      "Pneumatic Conveying Performance Assessment",
      "CFD & DEM Particle Trajectory Simulations",
      "Velocity & Pressure Drop Contour Maps",
      "Wear & Erosion Rate Distribution Analysis",
      "Transfer Chute & Silo Geometry Optimization Package",
    ],
    benefits: [
      "Improve Material Flow Reliability & Prevent Blockages",
      "Optimize Dilute & Dense Phase Pneumatic Conveying",
      "Minimize Chute Wear, Erosion & Maintenance Costs",
      "Reduce Dust Generation & Bulk Material Degradation",
      "Increase Conveying Capacity & Energy Efficiency",
    ],
  },
  {
    id: "07",
    key: "structural-fea",
    title: "Structural & Thermal FEA",
    summary: "Evaluate structural integrity, stress concentrations, deformation, and fatigue life.",
    overview:
      "Structural & Thermal Finite Element Analysis (FEA) provides engineers with a detailed understanding of how equipment responds to mechanical loads, thermal stress, pressure, vibration, and cyclic fatigue, enabling informed design decisions before fabrication.",
    approach: [
      "Engineering Component Assessment & Geometry Cleanup",
      "Finite Element Mesh Generation & Boundary Setups",
      "Static, Dynamic, Thermal & Fatigue FEA Simulations",
      "Stress Distribution & Deformation Evaluation",
      "Structural Reinforcement & Shape Optimization",
      "Final Engineering Certification & Design Report",
    ],
    deliverables: [
      "Structural & Thermal FEA Comprehensive Report",
      "Stress Distribution & Von Mises Stress Plots",
      "Deformation & Displacement Contours",
      "Fatigue Life & Buckling Stability Assessments",
      "Code Compliance Verification (ASME/AISC)",
      "Design Optimization & Structural Reinforcement Package",
    ],
    benefits: [
      "Verify Structural Integrity Under Severe Operating Loads",
      "Identify Critical Stress Concentrations & Failure Risks",
      "Optimize Material Thickness & Structural Weight",
      "Extend Equipment Service Life & Operating Reliability",
      "Validate Designs Prior to Fabrication or Site Installation",
    ],
  },
  {
    id: "08",
    key: "process-sim",
    title: "Process Simulation",
    summary: "Construct steady-state and dynamic heat/mass balance digital models.",
    overview:
      "Process Simulation creates digital models of entire industrial plants to predict performance, evaluate mass and energy balances, verify equipment sizing, and optimize operating parameters without interrupting production.",
    approach: [
      "Plant Data & Process Flowsheet Assessment",
      "Steady-State / Dynamic Simulation Model Setup",
      "Mass & Energy Balance Solver Runs",
      "Equipment Bottleneck & Capacity Evaluation",
      "Process Optimization & Energy Integration Studies",
      "Final Engineering Recommendations & Flowsheets",
    ],
    deliverables: [
      "Process Simulation Comprehensive Report",
      "Mass & Energy Balance (HMB) Spreadsheets & Flowsheets",
      "Process Flow Diagrams (PFDs) & Stream Summaries",
      "Equipment Capacity & Performance Ratings",
      "Process Bottleneck & Capacity Constraint Reports",
      "Technical Presentation of Engineering Findings",
    ],
    benefits: [
      "Optimize Overall Plant Process Performance",
      "Improve Energy Efficiency & Utility Utilization",
      "Identify Process Bottlenecks Before Plant Expansion",
      "Evaluate Alternative Operating Scenarios with Confidence",
      "Reduce Operating Costs Through Data-Driven Optimization",
    ],
  },
  {
    id: "09",
    key: "equipment-opt",
    title: "Equipment Performance Optimization",
    summary: "Identify bottlenecks in kilns, mills, cyclones, coolers, fans, and boilers.",
    overview:
      "Over time, process variations, equipment wear, and plant expansions cause equipment to operate below original design intent. We combine CFD, FEA, and process evaluation to pinpoint inefficiencies and restore maximum plant output.",
    approach: [
      "Equipment Operating Performance Audit",
      "Operational Data Analysis & 3D Model Development",
      "Multi-Physics Simulation & Performance Evaluation",
      "Engineering Bottleneck & Loss Identification",
      "Modification & Retrofit Design Optimization",
      "Engineering Recommendations & Implementation Roadmap",
    ],
    deliverables: [
      "Equipment Performance Assessment Report",
      "Capacity & Bottleneck Diagnostic Summary",
      "Energy Efficiency & Heat Loss Assessment",
      "Comparative Performance Analysis (Before vs After)",
      "Engineering Design Improvement Recommendations",
      "Technical Documentation & Retrofit Drawings",
    ],
    benefits: [
      "Increase Production Capacity & Equipment Throughput",
      "Reduce Energy Consumption & Operating Costs",
      "Identify & Eliminate Operational Bottlenecks",
      "Extend Service Life of Critical Plant Assets",
      "Maximize Return on Existing Capital Investment",
    ],
  },
  {
    id: "10",
    key: "dust-pollution",
    title: "Dust Collection & Air Pollution Control",
    summary: "Optimize bag filters, cyclones, ESPs, duct networks, and fan performance.",
    overview:
      "Improperly designed dust collection systems cause excessive emissions, product loss, high fan power consumption, and duct clogging. We optimize airflow distribution, filter capture efficiency, and duct network design to ensure environmental compliance.",
    approach: [
      "Airflow & Extraction System Assessment",
      "Duct Network & Filter CFD Digital Model Setup",
      "Airflow Velocity & Dust Distribution Simulation",
      "Filter Capture Efficiency & Pressure Loss Evaluation",
      "System Air Balancing & Fan Optimization",
      "Final Engineering Recommendations & Modification Drawings",
    ],
    deliverables: [
      "Dust Collection Engineering Assessment Report",
      "Airflow Velocity & Pressure Distribution Contours",
      "Dust Capture Efficiency & Filtration Reports",
      "Duct Network Resistance & Air Balancing Analysis",
      "Fan Performance & Energy Consumption Assessment",
      "Design Optimization Recommendations",
    ],
    benefits: [
      "Improve Dust Collection Capture Efficiency",
      "Reduce Particulate Emissions & Product Losses",
      "Minimize Duct Resistance & Fan Power Consumption",
      "Prevent Duct Settling, Clogging & Maintenance Downtime",
      "Ensure Environmental Compliance & Workplace Safety",
    ],
  },
  {
    id: "11",
    key: "digital-twin",
    title: "Digital Twin & Virtual Commissioning",
    summary: "Integrate telemetry data, CFD, and PLC logic into virtual startup platforms.",
    overview:
      "Digital Twins combine process models with real-time operational data to reflect actual plant behavior. Virtual Commissioning tests automation logic and equipment interactions in a virtual space before physical startup, reducing commissioning risks.",
    approach: [
      "Plant Architecture & Control Logic Assessment",
      "Integrated Digital Twin Model Setup",
      "SCADA / Telemetry Data Integration & Validation",
      "Virtual Commissioning & Control Logic Testing",
      "Operational Scenario & What-If Simulation",
      "Operator Training & Life-Cycle Optimization Roadmap",
    ],
    deliverables: [
      "Digital Twin Engineering Platform Package",
      "Virtual Commissioning Simulation Results",
      "Control Logic & Interlock Verification Report",
      "Equipment Performance Monitoring Framework",
      "Operator Training Simulator (OTS) Module",
      "Digital Transformation Engineering Dossier",
    ],
    benefits: [
      "Validate Automation Logic Before Physical Startup",
      "Drastically Reduce Plant Startup & Commissioning Risks",
      "Optimize Process Parameters Using Live Telemetry Data",
      "Train Operators in a Risk-Free Virtual Environment",
      "Evaluate Plant Modifications Without Production Loss",
    ],
  },
  {
    id: "12",
    key: "root-cause",
    title: "Root Cause Engineering",
    summary: "Investigate recurring operational breakdowns using multi-physics diagnostics.",
    overview:
      "Recurring operational failures are symptoms of deeper design or process issues. Root Cause Engineering applies systematic multi-physics investigation (CFD, FEA, process analytics) to pinpoint the true origin of failure and deliver permanent engineering fixes.",
    approach: [
      "Problem Statement & Historical Operating Data Assessment",
      "Field Inspection & Failure Surface Evidence Review",
      "Multi-Physics Analytical & Numerical Simulation",
      "Root Cause Mechanism Identification",
      "Permanent Engineering Fix Evaluation",
      "Final Investigation Report & Implementation Roadmap",
    ],
    deliverables: [
      "Root Cause Engineering Investigation Report",
      "Engineering Failure Analysis & Diagnostic Dossier",
      "Multi-Physics Simulation Verification Results",
      "Performance Gap & Degradation Assessment",
      "Permanent Corrective Action & Optimization Package",
      "Technical Presentation of Engineering Findings",
    ],
    benefits: [
      "Identify the True Origin of Recurring Failure Modes",
      "Eliminate Repeated Breakdowns Through Permanent Fixes",
      "Improve Equipment Reliability & Process Stability",
      "Reduce Unplanned Downtime & Emergency Maintenance",
      "Protect Capital Investments & Extend Asset Lifespan",
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
  const [selectedIndustryKey, setSelectedIndustryKey] = useState("cement");
  const [activeServiceKey, setActiveServiceKey] = useState("cfd-flow");

  const currentIndustry =
    INDUSTRY_APPLICATIONS.find((i) => i.key === selectedIndustryKey) || INDUSTRY_APPLICATIONS[0];
  const currentService =
    CORE_SERVICES_DATA.find((s) => s.key === activeServiceKey) || CORE_SERVICES_DATA[0];

  return (
    <>
      <TechnicalCursor />
      <Header />

      <main className="bg-slate-50 min-h-screen text-slate-800 font-sans selection:bg-rose-500 selection:text-white">
        {/* TOP DOSSIER BREADCRUMB BAR */}
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
              <span className="text-primary font-bold">CFD & Engineering Simulation</span>
            </div>
            <div className="hidden sm:flex items-center gap-3 text-[10px] text-slate-400">
              <span className="font-bold text-rose-400">SOLUTION 02</span>
              <span>•</span>
              <span>ADVANCED SIMULATION & COMPUTATIONAL PHYSICS</span>
            </div>
          </div>
        </section>

        {/* 1. HERO BANNER */}
        <section className="relative py-16 lg:py-24 bg-white border-b border-slate-200 overflow-hidden">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="grid lg:grid-cols-12 gap-12 items-center">
              {/* Hero Left Content */}
              <div className="lg:col-span-7 space-y-6">
                <Reveal>
                  <div className="inline-flex items-center gap-2 bg-rose-50 text-primary border border-rose-200/80 px-3.5 py-1.5 font-mono text-xs font-bold uppercase tracking-wider rounded-full shadow-xs">
                    <Sparkles className="w-3.5 h-3.5 text-primary" />
                    <span>CFD & ENGINEERING SIMULATION</span>
                  </div>
                </Reveal>

                <Reveal>
                  <h1 className="font-display font-extrabold text-3xl sm:text-5xl lg:text-6xl text-slate-900 uppercase tracking-tight leading-[1.1]">
                    See Before You Build.{" "}
                    <span className="text-primary underline decoration-rose-300 underline-offset-8">
                      Optimize Before You Operate.
                    </span>
                  </h1>
                </Reveal>

                <Reveal>
                  <p className="text-base sm:text-lg text-slate-600 font-sans leading-relaxed max-w-2xl">
                    Fluid flow, heat transfer, combustion, structural integrity, and particle behaviour define
                    the performance of every industrial facility. MACPROTEC transforms complex engineering
                    challenges into practical solutions through advanced simulation and digital engineering.
                  </p>
                </Reveal>

                {/* Hero Badges */}
                <Reveal>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                    <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 p-2.5 rounded font-mono text-[11px] font-bold text-slate-800">
                      <Wind className="w-4 h-4 text-primary shrink-0" />
                      <span>CFD Flow Solvers</span>
                    </div>

                    <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 p-2.5 rounded font-mono text-[11px] font-bold text-slate-800">
                      <Flame className="w-4 h-4 text-primary shrink-0" />
                      <span>Thermal & Firing</span>
                    </div>

                    <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 p-2.5 rounded font-mono text-[11px] font-bold text-slate-800">
                      <Cpu className="w-4 h-4 text-primary shrink-0" />
                      <span>DEM-FEA Coupled</span>
                    </div>

                    <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 p-2.5 rounded font-mono text-[11px] font-bold text-slate-800">
                      <BarChart3 className="w-4 h-4 text-primary shrink-0" />
                      <span>Zero Disruption</span>
                    </div>
                  </div>
                </Reveal>

                {/* Action Buttons */}
                <Reveal>
                  <div className="flex flex-wrap items-center gap-4 pt-4">
                    <a
                      href="#industry-applications"
                      className="px-6 py-3.5 bg-primary hover:bg-rose-700 text-white font-mono text-xs font-bold uppercase tracking-wider transition-all duration-150 shadow-md flex items-center gap-2 group"
                    >
                      <span>Explore Industries</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </a>

                    <a
                      href="#core-services"
                      className="px-6 py-3.5 bg-white border border-slate-300 hover:border-slate-900 text-slate-800 font-mono text-xs font-bold uppercase tracking-wider transition-all duration-150 flex items-center gap-2 hover:bg-slate-50"
                    >
                      <span>Core Engineering Services</span>
                      <ArrowRight className="w-4 h-4 text-slate-400" />
                    </a>
                  </div>
                </Reveal>
              </div>

              {/* Hero Right Visual Image */}
              <div className="lg:col-span-5 relative">
                <Reveal>
                  <div className="relative border-4 border-white shadow-2xl overflow-hidden group bg-slate-900">
                    <Image
                      src="/images/card_cfd_simulation.png"
                      alt="MACPROTEC CFD & Engineering Simulation Visualizer"
                      width={700}
                      height={500}
                      className="w-full h-[380px] sm:h-[450px] object-cover group-hover:scale-105 transition-transform duration-500"
                      priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent z-10" />

                    <div className="absolute bottom-5 left-5 right-5 z-20 bg-slate-950/90 border border-slate-800 p-4 backdrop-blur-md font-mono text-white flex items-center justify-between">
                      <div>
                        <div className="text-[10px] text-rose-400 font-bold uppercase tracking-wider">
                          NUMERICAL SOLVER MODEL
                        </div>
                        <div className="text-sm font-extrabold font-display uppercase tracking-tight text-white mt-0.5">
                          PREHEATER CYCLONE & KILN CFD
                        </div>
                      </div>
                      <div className="w-10 h-10 rounded bg-primary/20 border border-primary/40 flex items-center justify-center text-primary shrink-0">
                        <Activity className="w-5 h-5" />
                      </div>
                    </div>
                  </div>
                </Reveal>
              </div>
            </div>
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

        {/* 3. INDUSTRY APPLICATIONS SECTION */}
        <section id="industry-applications" className="py-20 bg-white border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 space-y-12">
            {/* Section Header */}
            <div className="text-center max-w-3xl mx-auto space-y-4">
              <Reveal>
                <div className="inline-block font-mono text-xs font-bold text-primary uppercase tracking-widest bg-rose-50 border border-rose-200 px-3 py-1">
                  INDUSTRY APPLICATIONS
                </div>
              </Reveal>

              <Reveal>
                <h2 className="font-display font-black text-3xl sm:text-4xl text-slate-900 uppercase tracking-tight">
                  Engineered Solutions Tailored to Your Sector
                </h2>
              </Reveal>

              <Reveal>
                <p className="text-slate-600 font-sans text-base leading-relaxed">
                  Select your industry to explore specialized engineering applications, process equipment
                  simulations, and plant optimization capabilities.
                </p>
              </Reveal>
            </div>

            {/* Industry Selector Tabs */}
            <div className="flex flex-wrap items-center justify-center gap-2 font-mono text-xs border-b border-slate-200 pb-6">
              {INDUSTRY_APPLICATIONS.map((ind) => {
                const isSelected = selectedIndustryKey === ind.key;
                return (
                  <button
                    key={ind.key}
                    onClick={() => setSelectedIndustryKey(ind.key)}
                    className={`px-4 py-2.5 font-bold uppercase transition-all duration-150 flex items-center gap-2 border ${
                      isSelected
                        ? "bg-slate-950 text-white border-slate-950 shadow-md"
                        : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                    }`}
                  >
                    <span>{ind.name}</span>
                    {ind.badge && (
                      <span className="text-[9px] bg-rose-500 text-white px-1.5 py-0.5 font-extrabold rounded-none">
                        PRO
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Selected Industry Card Banner & Application Cards */}
            <Reveal key={currentIndustry.key}>
              <div className="space-y-8">
                {/* Banner */}
                <div className="bg-slate-950 text-white border border-slate-800 p-8 sm:p-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 relative overflow-hidden">
                  <div className="space-y-2 max-w-3xl relative z-10">
                    <div className="inline-flex items-center gap-2 bg-rose-500/20 border border-rose-500/40 text-rose-400 px-3 py-1 font-mono text-[10px] font-bold uppercase rounded-full">
                      <span>{currentIndustry.name} APPLIED ENGINEERING</span>
                    </div>

                    <h3 className="font-display font-extrabold text-2xl sm:text-3xl text-white uppercase tracking-tight">
                      {currentIndustry.name} Applications
                    </h3>

                    <p className="text-slate-300 font-sans text-sm sm:text-base leading-relaxed">
                      {currentIndustry.description}
                    </p>
                  </div>

                  <Link
                    href="/lets-connect"
                    className="px-6 py-3 bg-primary hover:bg-rose-700 text-white font-mono text-xs font-bold uppercase tracking-wider shrink-0 transition-colors shadow-md flex items-center gap-2"
                  >
                    <span>Discuss {currentIndustry.name} Project</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>

                {/* Clickable Application Grid Cards */}
                <div>
                  <div className="font-mono text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">
                    Available Simulation & Engineering Cards ({currentIndustry.applications.length})
                  </div>

                  <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {currentIndustry.applications.map((appTitle, idx) => (
                      <div
                        key={idx}
                        className="bg-slate-50 border border-slate-200 p-4 font-mono text-xs text-slate-800 font-bold hover:border-primary hover:bg-rose-50/50 transition-all duration-150 flex items-center justify-between group shadow-2xs cursor-pointer"
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          <span className="w-2 h-2 rounded-full bg-primary shrink-0" />
                          <span className="truncate">{appTitle}</span>
                        </div>
                        <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-primary group-hover:translate-x-1 transition-all shrink-0" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* 4. 12 CORE ENGINEERING SERVICES SECTION */}
        <section id="core-services" className="py-20 bg-slate-50 border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 space-y-12">
            {/* Header */}
            <div className="text-center max-w-3xl mx-auto space-y-4">
              <Reveal>
                <div className="inline-block font-mono text-xs font-bold text-primary uppercase tracking-widest bg-rose-50 border border-rose-200 px-3 py-1">
                  CORE ENGINEERING SERVICES
                </div>
              </Reveal>

              <Reveal>
                <h2 className="font-display font-black text-3xl sm:text-4xl lg:text-5xl text-slate-900 uppercase tracking-tight">
                  12 Specialized Core Engineering Disciplines
                </h2>
              </Reveal>

              <Reveal>
                <p className="text-slate-600 font-sans text-base leading-relaxed">
                  These core engineering services define MACPROTEC's specialized computational physics and plant
                  optimization capabilities. Select any service to view full technical scope, approach, and deliverables.
                </p>
              </Reveal>
            </div>

            {/* 12 Service Tabs Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-2.5 font-mono text-xs">
              {CORE_SERVICES_DATA.map((srv) => {
                const isSelected = activeServiceKey === srv.key;
                return (
                  <button
                    key={srv.key}
                    onClick={() => setActiveServiceKey(srv.key)}
                    className={`p-3.5 border text-left transition-all duration-150 flex flex-col justify-between h-24 group ${
                      isSelected
                        ? "bg-slate-950 text-white border-slate-950 shadow-md"
                        : "bg-white text-slate-700 border-slate-200 hover:bg-slate-100 hover:border-slate-300"
                    }`}
                  >
                    <div className="flex items-center justify-between w-full">
                      <span
                        className={`text-[9px] font-bold ${
                          isSelected ? "text-rose-400" : "text-slate-400"
                        }`}
                      >
                        SRV-{srv.id}
                      </span>
                      {isSelected && <Sparkles className="w-3 h-3 text-primary" />}
                    </div>

                    <div className="font-bold text-[11px] leading-snug line-clamp-2">{srv.title}</div>
                  </button>
                );
              })}
            </div>

            {/* DEEP DIVE SERVICE DETAILS PANEL */}
            <Reveal key={currentService.key}>
              <div className="bg-slate-950 text-white border border-slate-800 p-8 sm:p-12 shadow-2xl space-y-10 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-80 h-80 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />

                {/* Sub-Service Banner Header */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 border-b border-slate-800 pb-8 relative z-10">
                  <div className="space-y-2 max-w-3xl">
                    <div className="inline-flex items-center gap-2 bg-rose-500/20 border border-rose-500/40 text-rose-400 px-3 py-1 font-mono text-[10px] font-bold uppercase rounded-full">
                      <span>CORE SERVICE {currentService.id} DOSSIER</span>
                    </div>

                    <h3 className="font-display font-extrabold text-2xl sm:text-4xl text-white uppercase tracking-tight">
                      {currentService.title}
                    </h3>

                    <p className="text-slate-300 font-sans text-sm sm:text-base leading-relaxed pt-2">
                      {currentService.overview}
                    </p>
                  </div>

                  <Link
                    href="/lets-connect"
                    className="px-6 py-3.5 bg-primary hover:bg-rose-700 text-white font-mono text-xs font-bold uppercase tracking-wider shrink-0 transition-colors shadow-lg flex items-center gap-2"
                  >
                    <span>Inquire About Service</span>
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
                      {currentService.approach.map((item, i) => (
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
                      {currentService.deliverables.map((item, i) => (
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
                      {currentService.benefits.map((item, i) => (
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

            {/* 12 Core Services Cards Grid */}
            <RevealGroup className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 pt-6" stagger={0.05}>
              {CORE_SERVICES_DATA.map((srv) => (
                <RevealItem key={srv.key}>
                  <div className="bg-white border border-slate-200 p-6 space-y-4 h-full flex flex-col justify-between hover:border-primary transition-all duration-200 group shadow-2xs">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between font-mono text-[10px] text-slate-400">
                        <span className="font-bold text-primary uppercase">SERVICE {srv.id}</span>
                        <span>SIMULATION & FEA</span>
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
                        setActiveServiceKey(srv.key);
                        const el = document.getElementById("core-services");
                        if (el) el.scrollIntoView({ behavior: "smooth" });
                      }}
                      className="pt-4 border-t border-slate-100 font-mono text-xs font-bold text-primary hover:text-rose-700 uppercase tracking-wider flex items-center justify-between w-full"
                    >
                      <span>Explore Technical Scope</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
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
                    <div className="bg-slate-900 border border-slate-800 p-8 space-y-4 hover:border-primary transition-all duration-300 group h-full">
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
            <div className="bg-slate-900 text-white border border-slate-800 p-8 sm:p-12 shadow-2xl relative overflow-hidden text-center space-y-6">
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
