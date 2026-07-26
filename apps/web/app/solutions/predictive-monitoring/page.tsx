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
  Activity,
  Gauge,
  Sliders,
  LayoutDashboard,
  Server,
  Zap,
} from "lucide-react";

// Sub-services / Productivity Tools Data from PDF spec (Solution Card 6: Predictive Monitoring and Asset Intelligence)
const SERVICES_DATA = [
  {
    id: "01",
    key: "kiln-monitoring",
    title: "Kiln Online Condition Monitoring System",
    summary:
      "Real-time monitoring of kiln performance, combustion, process stability, and equipment health to detect abnormalities and maximize availability.",
    tagline: "Continuous Real-Time Telemetry and Predictive Analytics for Rotary Kilns",
    overview:
      "The rotary kiln is the heart of every cement plant, where even minor process deviations can significantly impact production, fuel consumption, clinker quality, and equipment reliability. Traditional monitoring methods often identify issues only after they have affected plant performance, leading to unplanned downtime, higher maintenance costs, and reduced operational efficiency.",
    overviewExtended:
      "The MACPROTEC Kiln Online Condition Monitoring System provides continuous, real-time monitoring of critical kiln equipment and process parameters, enabling operators and maintenance teams to detect abnormalities at an early stage. By integrating process data, equipment condition monitoring, performance analytics, and intelligent alerting into a centralized platform, the system delivers actionable insights that support proactive maintenance, improve process stability, maximize equipment availability, and enhance overall kiln performance.",
    approach: [
      "Kiln Process Performance & Operating Stability",
      "Combustion Performance & Flame Stability",
      "Kiln Shell Temperature Profile Monitoring",
      "Bearing & Support Roller Condition Tracking",
      "Drive System & Gearbox Diagnostics",
      "Motor Load & Power Consumption Analysis",
      "Vibration & Equipment Health Indicators",
      "Alarm Management & Abnormal Condition Alerts",
    ],
    deliverables: [
      "Real-Time Equipment & Process Monitoring",
      "Centralized Operational Dashboard",
      "Intelligent Alarm & Notification System",
      "Historical Trend Analysis & Reporting",
      "Equipment Health Assessment Module",
      "Performance Benchmarking Reports",
      "Predictive Maintenance Support Module",
      "Remote Monitoring Capability",
      "Customizable KPI Dashboards",
      "PLC / DCS / SCADA / Historian Integration",
    ],
    benefits: [
      "Improve kiln reliability and operational stability",
      "Detect abnormal operating conditions before failures occur",
      "Reduce unplanned shutdowns and maintenance costs",
      "Optimize combustion performance and energy efficiency",
      "Increase equipment availability and plant productivity",
      "Support condition-based and predictive maintenance strategies",
      "Enable faster, data-driven operational decisions",
      "Accelerate digital transformation through intelligent asset monitoring",
    ],
  },
  {
    id: "02",
    key: "mill-monitoring",
    title: "Mill Condition Monitoring System",
    summary:
      "Intelligent monitoring of raw mills, cement mills, and vertical roller mills to improve reliability and optimize maintenance.",
    tagline: "Early Diagnostics, Vibration Analytics, and Power Optimization for Grinding Mills",
    overview:
      "Grinding mills are among the most critical and energy-intensive assets in industrial plants. Variations in operating conditions, excessive vibration, mechanical wear, lubrication issues, or abnormal process behavior can significantly affect production capacity, product quality, energy efficiency, and equipment reliability. Early identification of these issues is essential to prevent costly failures and unplanned shutdowns.",
    overviewExtended:
      "The MACPROTEC Mill Condition Monitoring System provides continuous, real-time monitoring of mill equipment and operating conditions to ensure reliable and efficient performance. By integrating process data, equipment health indicators, vibration monitoring, power analysis, and intelligent diagnostics into a centralized platform, the system enables maintenance and operations teams to identify abnormal conditions, optimize mill performance, and implement proactive maintenance strategies that maximize equipment availability and operational efficiency.",
    approach: [
      "Mill Operating Performance & Production Stability",
      "Mill Inlet & Outlet Temperature Profiles",
      "Motor Load & Specific Power Consumption",
      "Mill Differential Pressure & Airflow Analytics",
      "Vibration & Equipment Condition Diagnostics",
      "Bearing Temperature & Lubrication Health",
      "Gearbox & Drive Performance Evaluation",
      "Separator Operating Conditions & Classification",
    ],
    deliverables: [
      "Real-Time Mill Performance Monitoring",
      "Centralized Operational Mill Dashboard",
      "Intelligent Alarm & Notification Engine",
      "Historical Trend Analysis & Reporting",
      "Equipment Health Assessment Module",
      "Grinding Efficiency Benchmarking",
      "Predictive Maintenance Support System",
      "Remote Monitoring Capability",
      "Customizable KPI Dashboards",
      "PLC / DCS / SCADA Integration Package",
    ],
    benefits: [
      "Improve mill reliability and operational stability",
      "Detect developing equipment faults before failures occur",
      "Reduce unplanned downtime and maintenance costs",
      "Optimize grinding efficiency and energy consumption",
      "Increase equipment availability and production performance",
      "Support condition-based and predictive maintenance strategies",
      "Enable faster, data-driven operational decisions",
      "Improve long-term asset performance and operational reliability",
    ],
  },
  {
    id: "03",
    key: "compressor-pump-monitoring",
    title: "Compressor & Pump Condition Monitoring System",
    summary:
      "Continuous monitoring of compressors and pumps through vibration, pressure, temperature, and performance analytics.",
    tagline: "Vibration, Pressure & Thermal Telemetry for Essential Utility Assets",
    overview:
      "Compressors and pumps are essential utility assets that support the continuous operation of industrial plants. Mechanical wear, vibration, bearing degradation, lubrication issues, pressure fluctuations, and inefficient operating conditions can lead to unexpected failures, increased energy consumption, and costly production interruptions. Continuous monitoring is critical for maintaining equipment reliability and ensuring stable plant operations.",
    overviewExtended:
      "The MACPROTEC Compressor & Pump Condition Monitoring System provides real-time monitoring of critical equipment health and operating parameters to enable proactive maintenance and improved asset performance. By integrating equipment diagnostics, process monitoring, performance analytics, and intelligent alerting into a centralized platform, the system helps maintenance teams identify developing faults early, optimize equipment efficiency, minimize downtime, and extend asset service life.",
    approach: [
      "Equipment Operating Status & Availability Tracking",
      "Flow Rate & Discharge Pressure Monitoring",
      "Suction & Discharge Temperature Profiles",
      "Motor Load & Power Consumption Analytics",
      "Vibration Spectrum & Equipment Health Indicators",
      "Bearing Temperature & Lubrication Condition",
      "Lubrication System Performance Tracking",
      "Operational Efficiency & Energy Analytics",
    ],
    deliverables: [
      "Real-Time Equipment Health Monitoring",
      "Centralized Operational Dashboard",
      "Intelligent Alarm & Notification System",
      "Historical Trend Analysis & Reporting",
      "Equipment Health Assessment Module",
      "Performance Benchmarking Package",
      "Predictive Maintenance Support",
      "Remote Monitoring Capability",
      "Customizable KPI Dashboards",
      "Integration with PLC, DCS, SCADA, and Historians",
    ],
    benefits: [
      "Improve compressor and pump reliability",
      "Detect developing faults before equipment failure",
      "Reduce unplanned downtime and maintenance costs",
      "Optimize equipment performance and energy efficiency",
      "Extend equipment service life through proactive maintenance",
      "Support condition-based and predictive maintenance strategies",
      "Enable faster, data-driven maintenance decisions",
      "Improve overall plant availability and operational reliability",
    ],
  },
  {
    id: "04",
    key: "plant-dashboard",
    title: "Plant Intelligence Dashboard",
    summary:
      "A centralized dashboard that integrates data from multiple assets, providing KPIs, asset health indicators, predictive maintenance alerts, and operational insights across the entire plant.",
    tagline: "Unified Single Source of Truth for Plant-Wide Operations & Reliability",
    overview:
      "Modern industrial plants rely on data from multiple systems, including PLCs, DCS, SCADA, historians, and field instrumentation. However, this information is often distributed across different platforms, making it difficult for operators and management to obtain a comprehensive view of plant performance. A centralized intelligence dashboard transforms fragmented data into meaningful insights, enabling faster, data-driven operational and maintenance decisions.",
    overviewExtended:
      "The MACPROTEC Plant Intelligence Dashboard provides a unified platform that consolidates real-time process data, equipment health indicators, production metrics, energy performance, and maintenance information into interactive dashboards. Through advanced visualization, KPI tracking, alarm management, and analytical reporting, the system delivers complete visibility of plant operations, helping organizations improve productivity, optimize asset utilization, and support continuous operational improvement.",
    approach: [
      "Production & Operational KPI Integration",
      "Plant-Wide Equipment Health & Asset Status Tracking",
      "Process Performance Monitoring & Heat Maps",
      "Energy Consumption & Efficiency Analytics",
      "Maintenance & Reliability Indicators Tracking",
      "Alarm & Event Management Consolidation",
      "Production Trends & Historical Data Analytics",
      "Plant-Wide Performance Benchmarking",
    ],
    deliverables: [
      "Centralized Plant Performance Dashboard",
      "Real-Time KPI Visualization Engine",
      "Interactive Charts & Trend Analysis Suite",
      "Intelligent Alarm & Notification System",
      "Asset Health Overview Dashboard",
      "Energy Performance Monitoring Module",
      "Historical Data Analysis & Reporting",
      "Customizable Role-Based User Dashboards",
      "Mobile & Remote Monitoring Capability",
      "Integration with PLC, DCS, SCADA, Historians, ERP, CMMS",
    ],
    benefits: [
      "Provide a single source of truth for plant operations",
      "Improve visibility into equipment and process performance",
      "Enable faster, data-driven operational decisions",
      "Monitor KPIs and asset health in real time",
      "Improve maintenance planning through integrated performance insights",
      "Enhance operational efficiency and resource utilization",
      "Support management reporting with actionable analytics",
      "Accelerate digital transformation through intelligent plant-wide monitoring",
    ],
  },
];

// Why Choose Features (From PDF Page 10)
const WHY_CHOOSE_ITEMS = [
  {
    title: "Purpose-Built for Heavy Industrial Applications",
    desc: "Engineered specifically for extreme environment cement, mining, steel, power, and process facilities.",
    icon: Factory,
  },
  {
    title: "Real-Time Monitoring & Intelligent Alerts",
    desc: "Early anomaly detection and automated notifications to stop developing faults before catastrophic failure.",
    icon: Activity,
  },
  {
    title: "Predictive Analytics for Proactive Maintenance",
    desc: "Shift from reactive breakdown repairs to data-driven, condition-based maintenance planning.",
    icon: TrendingUp,
  },
  {
    title: "Centralized Asset Intelligence & KPI Dashboards",
    desc: "Unified single-screen visibility across kilns, mills, utilities, energy consumption, and overall OEE.",
    icon: LayoutDashboard,
  },
  {
    title: "Seamless Integration with Existing Automation Systems",
    desc: "Turnkey connectivity with legacy PLCs, DCS networks, SCADA nodes, ERP, and plant historians.",
    icon: Server,
  },
  {
    title: "Scalable Solutions Supporting Smart Plants & Industry 4.0",
    desc: "Future-proof cloud/edge architecture supporting continuous digital transformation and AI integration.",
    icon: Cpu,
  },
];

export default function PredictiveMonitoringServicePage() {
  const [activeTabKey, setActiveTabKey] = useState("kiln-monitoring");
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
              <span className="text-primary font-bold">Predictive Monitoring & Asset Intelligence</span>
            </div>
            <div className="hidden sm:flex items-center gap-3 text-[10px] text-slate-400">
              <span className="font-bold text-rose-400">SOLUTION 06</span>
              <span>•</span>
              <span>PREDICTIVE MONITORING & ASSET INTELLIGENCE</span>
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
                    <span>SOLUTION CARD 06 // PREDICTIVE MONITORING & ASSET INTELLIGENCE</span>
                  </div>
                </Reveal>

                <Reveal>
                  <h1 className="font-display font-extrabold text-3xl sm:text-5xl lg:text-6xl text-slate-900 uppercase tracking-tight leading-[1.1]">
                    Predictive Monitoring & <span className="text-primary">Asset Intelligence</span>
                  </h1>
                </Reveal>

                <Reveal>
                  <p className="text-base sm:text-lg text-slate-600 font-sans leading-relaxed max-w-2xl">
                    Real-time equipment visibility, AI-powered predictive analytics, and actionable engineering
                    intelligence to improve reliability, minimize downtime, and optimize plant performance.
                  </p>
                </Reveal>

                {/* Hero Badges */}
                <Reveal>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
                    <div className="bg-slate-50 border border-slate-200 p-3 rounded font-mono text-xs text-slate-800 font-bold flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                      <span>Kiln Monitoring</span>
                    </div>
                    <div className="bg-slate-50 border border-slate-200 p-3 rounded font-mono text-xs text-slate-800 font-bold flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                      <span>Mill Monitoring</span>
                    </div>
                    <div className="bg-slate-50 border border-slate-200 p-3 rounded font-mono text-xs text-slate-800 font-bold flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                      <span>Plant Dashboards</span>
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
                      src="/images/hero_industrial.png"
                      alt="MACPROTEC Control Room Predictive Monitoring Dashboard"
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
                          PLANT INTELLIGENCE & TELEMETRY
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

        {/* 2. ABOUT PREDICTIVE MONITORING & ASSET INTELLIGENCE */}
        <section className="py-20 bg-slate-50 border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="bg-white border border-slate-200 p-8 sm:p-12 shadow-sm space-y-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 border-b border-l border-rose-500/10 pointer-events-none" />

              <div className="max-w-3xl space-y-4">
                <Reveal>
                  <div className="inline-block font-mono text-xs font-bold text-primary uppercase tracking-widest bg-rose-50 border border-rose-200 px-3 py-1">
                    ABOUT PREDICTIVE MONITORING & ASSET INTELLIGENCE
                  </div>
                </Reveal>

                <Reveal>
                  <h2 className="font-display font-black text-2xl sm:text-4xl text-slate-900 uppercase tracking-tight">
                    Monitor Smarter. Predict Earlier.
                  </h2>
                </Reveal>

                <Reveal>
                  <p className="text-slate-600 font-sans text-base leading-relaxed">
                    Industrial facilities generate enormous volumes of operational data every day, yet unexpected
                    equipment failures, process instability, and inefficient maintenance practices continue to impact
                    production, energy consumption, and operational reliability. Converting real-time plant data into
                    actionable engineering intelligence is essential for improving asset performance, minimizing
                    downtime, and enabling proactive decision-making.
                  </p>
                </Reveal>

                <Reveal>
                  <p className="text-slate-600 font-sans text-base leading-relaxed pt-2">
                    At MACPROTEC, we provide comprehensive Predictive Monitoring & Asset Intelligence solutions that transform operational data into meaningful insights for equipment reliability, process optimization, and maintenance planning. By combining real-time monitoring, advanced analytics, engineering expertise, and intelligent dashboards, we help clients continuously monitor critical assets, detect abnormal operating conditions, predict potential failures, and improve overall plant performance. Our solutions support data-driven maintenance strategies, improve equipment availability, and accelerate the digital transformation of industrial operations.
                  </p>
                </Reveal>
              </div>

              {/* Grid Metrics Highlights */}
              <Reveal>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-slate-100 font-mono text-xs">
                  <div className="p-4 bg-slate-50 border border-slate-200">
                    <div className="text-[10px] text-slate-400 uppercase font-bold">KILN TELEMETRY</div>
                    <div className="text-lg font-bold text-slate-900 mt-1">Shell & Drive Health</div>
                    <div className="text-[10px] text-slate-500 mt-0.5">Combustion Stability</div>
                  </div>

                  <div className="p-4 bg-slate-50 border border-slate-200">
                    <div className="text-[10px] text-slate-400 uppercase font-bold">MILL DIAGNOSTICS</div>
                    <div className="text-lg font-bold text-slate-900 mt-1">Vibration & Power</div>
                    <div className="text-[10px] text-slate-500 mt-0.5">Differential Pressure</div>
                  </div>

                  <div className="p-4 bg-slate-50 border border-slate-200">
                    <div className="text-[10px] text-slate-400 uppercase font-bold">UTILITY MONITORING</div>
                    <div className="text-lg font-bold text-slate-900 mt-1">Pumps & Compressors</div>
                    <div className="text-[10px] text-slate-500 mt-0.5">Bearing & Temperature</div>
                  </div>

                  <div className="p-4 bg-slate-50 border border-slate-200">
                    <div className="text-[10px] text-slate-400 uppercase font-bold">PLANT INTELLIGENCE</div>
                    <div className="text-lg font-bold text-slate-900 mt-1">Unified OEE KPIs</div>
                    <div className="text-[10px] text-slate-500 mt-0.5">DCS & Historian Sync</div>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* 3. PREDICTIVE MONITORING & ASSET INTELLIGENCE TOOLS */}
        <section id="services-breakdown" className="py-20 bg-white border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 space-y-12">
            {/* Header */}
            <div className="text-center max-w-3xl mx-auto space-y-4">
              <Reveal>
                <div className="inline-block font-mono text-xs font-bold text-primary uppercase tracking-widest bg-rose-50 border border-rose-200 px-3 py-1">
                  PRODUCTIVITY & MONITORING TOOLS
                </div>
              </Reveal>

              <Reveal>
                <h2 className="font-display font-black text-3xl sm:text-4xl text-slate-900 uppercase tracking-tight">
                  Intelligent Monitoring Platforms
                </h2>
              </Reveal>

              <Reveal>
                <p className="text-slate-600 font-sans text-base leading-relaxed">
                  MACPROTEC develops intelligent monitoring platforms that provide real-time equipment visibility,
                  predictive analytics, and actionable insights to improve reliability, optimize maintenance, and maximize operational performance.
                </p>
              </Reveal>
            </div>

            {/* Interactive Sub-Services Selector Tabs */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono text-xs">
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
                        TOOL-{srv.id}
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
                      <span>PRODUCTIVITY TOOL {selectedService.id} SUMMARY</span>
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
                    <span>Request Demo & Inquiry</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>

                {/* 3 Columns: System Capabilities, System Features & Key Benefits */}
                <div className="grid lg:grid-cols-3 gap-8 relative z-10">
                  {/* Column 1: System Capabilities */}
                  <div className="bg-slate-900/90 border border-slate-800 p-6 space-y-4">
                    <div className="flex items-center gap-2.5 text-rose-400 font-mono text-xs font-bold uppercase border-b border-slate-800 pb-3">
                      <Compass className="w-4 h-4 text-primary" />
                      <span>System Capabilities</span>
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

                  {/* Column 2: Key Features & Deliverables */}
                  <div className="bg-slate-900/90 border border-slate-800 p-6 space-y-4">
                    <div className="flex items-center gap-2.5 text-rose-400 font-mono text-xs font-bold uppercase border-b border-slate-800 pb-3">
                      <ClipboardList className="w-4 h-4 text-primary" />
                      <span>Key Features & Architecture</span>
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
                      <span>Key Operational Benefits</span>
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

            {/* 4 Grid Cards Showcase */}
            <RevealGroup className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 pt-6" stagger={0.06}>
              {SERVICES_DATA.map((srv) => (
                <RevealItem key={srv.key}>
                  <div className="bg-slate-50 border border-slate-200 p-6 space-y-4 h-full flex flex-col justify-between hover:border-primary/60 transition-all duration-200 group">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between font-mono text-[10px] text-slate-400">
                        <span className="font-bold text-primary uppercase">TOOL {srv.id}</span>
                        <span>INTELLIGENCE</span>
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
                      <span>View Tool Details</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        </section>

        {/* 4. WHY CHOOSE MACPROTEC PRODUCTIVITY TOOLS */}
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
                  Why Choose MACPROTEC Productivity Tools?
                </h2>
              </Reveal>

              <Reveal>
                <p className="text-slate-300 font-sans text-base leading-relaxed">
                  We combine heavy process engineering domain expertise with real-time telemetry, predictive analytics, and seamless automation integrations.
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
                  <span>READY TO DIGITIZE YOUR PLANT ASSETS?</span>
                </div>
              </Reveal>

              <Reveal>
                <h2 className="font-display font-black text-3xl sm:text-5xl text-white uppercase tracking-tight">
                  Let's Discuss Your Asset Intelligence Requirements
                </h2>
              </Reveal>

              <Reveal>
                <p className="text-slate-300 font-sans text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
                  Connect with MACPROTEC digital intelligence specialists to evaluate online kiln monitoring, mill condition monitoring, compressor & pump telemetry, or centralized plant dashboards.
                </p>
              </Reveal>

              <Reveal>
                <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
                  <Link
                    href="/lets-connect"
                    className="px-8 py-4 bg-primary hover:bg-rose-700 text-white font-mono text-xs font-bold uppercase tracking-wider transition-all duration-150 shadow-xl flex items-center gap-2 group"
                  >
                    <span>Request a Demo</span>
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
