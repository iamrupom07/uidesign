"use client";

import { useState } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import TechnicalCursor from "@/components/ui/TechnicalCursor";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import Link from "next/link";
import Image from "next/image";
import { POWER_SERVICES, PowerService } from "@/lib/power-data";
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
  Flame,
  Gauge,
  Workflow,
  Compass,
  Award,
  Check,
  FileCheck,
  ClipboardList,
  Wind,
  Activity,
  Zap,
  Target,
  FileText,
  Boxes,
} from "lucide-react";

const WHY_CHOOSE_SIMULATION = [
  {
    title: "Deep Thermal Power & Utility Expertise",
    desc: "Specialized thermal and fluid dynamics engineers with extensive experience across utility boilers, HRSGs, steam turbines, cooling towers, and flue gas cleaning.",
    icon: Factory,
  },
  {
    title: "Advanced Combustion & Multiphase Physics",
    desc: "High-fidelity simulation of pulverized coal, gas/oil, biomass combustion, species formation (NOx/CO), slagging risk, and fly ash transport.",
    icon: Flame,
  },
  {
    title: "Virtual Validation Without Plant Shutdowns",
    desc: "Evaluate duct retrofits, fan upgrades, burner re-configurations, and cooling tower modifications in a virtual CFD environment before physical implementation.",
    icon: Cpu,
  },
  {
    title: "Actionable Engineering Deliverables",
    desc: "Comprehensive contour plots, velocity vector maps, pressure drop assessments, and CAD-ready recommendations for plant engineering teams.",
    icon: FileText,
  },
  {
    title: "Auxiliary Power & Heat-Rate Optimization",
    desc: "Target ID/FD fan power reduction, condenser backpressure minimization, and heat rate improvements to maximize overall plant efficiency.",
    icon: Zap,
  },
  {
    title: "Proven Debottlenecking Track Record",
    desc: "Consistently resolving flow imbalance, furnace hot spots, SCR ammonia maldistribution, and cooling tower recirculation in utility power plants.",
    icon: Award,
  },
];

export default function PowerCfdPage() {
  const [activeServiceId, setActiveServiceId] = useState<string>("01");

  const activeService =
    POWER_SERVICES.find((s) => s.id === activeServiceId) || POWER_SERVICES[0];

  const handleServiceSelect = (id: string) => {
    setActiveServiceId(id);
    const element = document.getElementById("detailed-dossier");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <TechnicalCursor />
      <Header />

      <main className="bg-background min-h-screen py-20 lg:py-24 space-y-20">
        {/* Header Hero Section */}
        <section className="max-w-7xl mx-auto px-6 lg:px-8 pt-6">
          <div className="border border-border p-8 sm:p-12 lg:p-16 bg-white relative overflow-hidden shadow-sm">
            <div className="absolute top-0 right-0 w-64 h-64 border-b border-l border-primary/20 opacity-20 pointer-events-none" />
            <div className="absolute top-4 right-4 font-mono text-[9px] text-slate-400">
              SECTOR DOSSIER / POWER-CFD
            </div>

            <Reveal>
              <div className="font-mono text-[11px] font-bold text-primary tracking-widest uppercase mb-4 flex items-center gap-2">
                <span className="text-primary font-bold">┌</span>
                <Link
                  href="/solutions/cfd-engineering"
                  className="hover:underline text-slate-500"
                >
                  CFD & SIMULATION
                </Link>
                <span>/</span>
                <span className="text-foreground">POWER GENERATION INDUSTRY</span>
              </div>

              <div className="inline-flex items-center gap-2 px-3 py-1 bg-rose-50 border border-rose-200 text-primary font-mono text-[10px] font-bold uppercase tracking-wider mb-6">
                <Sparkles className="w-3.5 h-3.5" />
                <span>MACPROTEC Primary Expertise Center</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-extrabold text-foreground uppercase tracking-tight leading-tight max-w-5xl mb-6">
                Power Generation Industry <br />
                <span className="text-primary">CFD & Process Simulation</span>
              </h1>

              <p className="body-md text-secondary max-w-4xl leading-relaxed font-sans mb-8">
                MACPROTEC provides comprehensive Computational Fluid Dynamics (CFD), heat transfer,
                combustion, multiphase flow, flue gas cleaning, cooling tower, and root cause investigation
                tailored specifically to boilers, HRSGs, flue gas ductwork, fan systems, and power plant infrastructure.
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-border">
                <a
                  href="#service-cards"
                  className="px-6 py-3 bg-primary text-white font-mono text-xs font-bold uppercase tracking-wider hover:bg-rose-700 transition-colors inline-flex items-center gap-2"
                >
                  <span>Explore 8 Engineering Services</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
                <Link
                  href="/lets-connect"
                  className="px-6 py-3 bg-slate-900 text-white font-mono text-xs font-bold uppercase tracking-wider hover:bg-slate-800 transition-colors inline-flex items-center gap-2"
                >
                  <span>Request Simulation Proposal</span>
                </Link>
              </div>
            </Reveal>
          </div>
        </section>

        {/* Expertise Strength Alert Banner */}
        <section className="max-w-7xl mx-auto px-6 lg:px-8">
          <Reveal>
            <div className="bg-[#2d1b47] text-white p-6 sm:p-8 border border-[#3e2663] relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-primary/20 border border-primary/40 flex items-center justify-center text-primary shrink-0">
                  <Factory className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <div className="font-mono text-[10px] font-bold text-primary tracking-widest uppercase mb-1">
                    PRIMARY CORE DOMAIN
                  </div>
                  <h3 className="font-display font-extrabold text-lg text-white uppercase tracking-tight">
                    This is MACPROTEC's Specialized Power Generation Discipline
                  </h3>
                  <p className="text-xs text-slate-300 font-sans mt-0.5">
                    Our engineering domain lies in utility boiler CFD, burner combustion modeling, cooling tower plume/recirculation, fan systems, and SCR/FGD flue gas cleaning.
                  </p>
                </div>
              </div>

              <div className="shrink-0 font-mono text-xs text-slate-300 bg-[#201235] px-4 py-2 border border-[#3e2663]">
                <span className="text-primary font-bold">8</span> SPECIALIZED MODULES
              </div>
            </div>
          </Reveal>
        </section>

        {/* Engineering Services Cards Grid (PDF Instructions) */}
        <section id="service-cards" className="max-w-7xl mx-auto px-6 lg:px-8 space-y-8">
          <Reveal>
            <div className="font-mono text-[11px] font-bold text-primary tracking-widest uppercase mb-2">
              <span className="text-primary font-bold mr-1">┌</span> APPLIED POWER ENGINEERING SERVICES
            </div>
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-foreground uppercase tracking-tight">
              Engineering <span className="text-primary">Services</span>
            </h2>
            <p className="font-mono text-sm font-semibold text-secondary max-w-3xl mt-2">
              Cards for MACPROTEC specialized CFD and process engineering disciplines applied to power plant operations. Click any card to inspect its complete technical dossier below.
            </p>
          </Reveal>

          <RevealGroup className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6" stagger={0.04}>
            {POWER_SERVICES.map((svc) => (
              <RevealItem key={svc.id}>
                <div
                  onClick={() => handleServiceSelect(svc.id)}
                  className={`group bg-white border cursor-pointer transition-all duration-200 flex flex-col justify-between h-full relative overflow-hidden shadow-sm hover:shadow-md ${
                    activeServiceId === svc.id
                      ? "border-primary ring-2 ring-primary/20"
                      : "border-border hover:border-primary/60"
                  }`}
                >
                  {/* Image Container */}
                  <div className="relative h-48 w-full bg-slate-900 overflow-hidden">
                    <Image
                      src={svc.image}
                      alt={svc.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                    <div className="absolute top-3 left-3 font-mono text-[10px] font-bold px-2 py-0.5 bg-primary text-white uppercase tracking-wider">
                      {svc.id} / {svc.badge}
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                    <div>
                      <h3 className="font-display font-extrabold text-base text-foreground group-hover:text-primary transition-colors uppercase leading-snug mb-2">
                        {svc.title}
                      </h3>
                      <p className="text-xs text-secondary font-sans leading-relaxed line-clamp-3">
                        {svc.shortDescription}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-border/60">
                      <div className="flex items-center justify-between font-mono text-[10px] font-bold text-primary group-hover:text-rose-700 uppercase tracking-widest">
                        <span>View Technical Dossier</span>
                        <ChevronRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </div>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </section>

        {/* Detailed Service Dossier Showcase Section */}
        <section id="detailed-dossier" className="max-w-7xl mx-auto px-6 lg:px-8 space-y-8 pt-10">
          <Reveal>
            <div className="font-mono text-[11px] font-bold text-primary tracking-widest uppercase mb-2">
              <span className="text-primary font-bold mr-1">┌</span> COMPREHENSIVE DOSSIER SHOWCASE
            </div>
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-foreground uppercase tracking-tight">
              Service <span className="text-primary">Technical Dossier</span>
            </h2>
            <p className="font-mono text-sm font-semibold text-secondary">
              Detailed physics specifications, deliverables, engineering analyses, and key benefits.
            </p>
          </Reveal>

          {/* Interactive Selector Bar */}
          <Reveal>
            <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none border-b border-border">
              {POWER_SERVICES.map((s) => (
                <button
                  key={s.id}
                  onClick={() => setActiveServiceId(s.id)}
                  className={`px-4 py-2.5 font-mono text-xs font-bold uppercase tracking-wider whitespace-nowrap border transition-all flex items-center gap-2 shrink-0 ${
                    activeServiceId === s.id
                      ? "bg-primary text-white border-primary shadow-sm"
                      : "bg-white text-secondary border-border hover:border-slate-400 hover:text-foreground"
                  }`}
                >
                  <span className="opacity-70">{s.id}.</span>
                  <span>{s.title.replace(" CFD Analysis", "").replace(" Analysis", "")}</span>
                </button>
              ))}
            </div>
          </Reveal>

          {/* Active Service Detailed View Card */}
          <Reveal key={activeService.id}>
            <div className="bg-white border border-border p-8 sm:p-12 shadow-sm space-y-12">
              {/* Service Hero Header */}
              <div className="grid lg:grid-cols-12 gap-8 items-center border-b border-border pb-10">
                <div className="lg:col-span-7 space-y-4">
                  <div className="font-mono text-xs font-bold text-primary tracking-widest uppercase flex items-center gap-2">
                    <span className="w-2 h-2 bg-primary rounded-full" />
                    SERVICE DOSSIER {activeService.id} / {activeService.badge}
                  </div>
                  <h3 className="font-display font-extrabold text-3xl sm:text-4xl text-foreground uppercase tracking-tight leading-tight">
                    {activeService.title}
                  </h3>
                  <div className="space-y-3 pt-2">
                    {activeService.description.map((para, i) => (
                      <p key={i} className="text-secondary text-sm sm:text-base leading-relaxed font-sans">
                        {para}
                      </p>
                    ))}
                  </div>
                </div>

                <div className="lg:col-span-5">
                  <div className="border border-border p-2 bg-slate-50 relative group">
                    <div className="relative h-64 sm:h-72 w-full bg-slate-900 overflow-hidden border border-border">
                      <Image
                        src={activeService.image}
                        alt={activeService.title}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                      <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between font-mono text-[9px] text-white bg-slate-950/80 p-2 border border-slate-800 backdrop-blur-sm">
                        <span>MODEL: MACPROTEC-POWER-{activeService.id}</span>
                        <span className="text-primary font-bold">CFD VERIFIED</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Applications & Key Analyses Grid */}
              <div className="grid lg:grid-cols-2 gap-10">
                {/* Typical Applications */}
                <div className="space-y-4">
                  <div className="font-mono text-xs font-bold text-primary tracking-widest uppercase flex items-center gap-2 border-b border-border pb-2">
                    <Boxes className="w-4 h-4 text-primary" />
                    TYPICAL POWER APPLICATIONS
                  </div>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {activeService.applications.map((app, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-3 p-3 bg-slate-50 border border-border hover:border-primary/40 transition-colors"
                      >
                        <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                        <span className="font-display font-extrabold text-xs text-foreground uppercase">
                          {app}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Key Engineering Analyses */}
                <div className="space-y-4">
                  <div className="font-mono text-xs font-bold text-primary tracking-widest uppercase flex items-center gap-2 border-b border-border pb-2">
                    <Activity className="w-4 h-4 text-primary" />
                    KEY ENGINEERING ANALYSES
                  </div>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {activeService.keyAnalyses.map((analysis, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-3 p-3 bg-slate-50 border border-border hover:border-primary/40 transition-colors"
                      >
                        <span className="w-5 h-5 bg-rose-50 border border-rose-200 text-primary flex items-center justify-center font-mono text-[10px] font-bold shrink-0">
                          {idx + 1}
                        </span>
                        <span className="font-sans font-semibold text-xs text-slate-800">
                          {analysis}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Deliverables & Key Benefits */}
              <div className="grid lg:grid-cols-2 gap-10 pt-4 border-t border-border">
                {/* Deliverables */}
                <div className="bg-[#2d1b47] text-white p-6 sm:p-8 border border-[#3e2663] space-y-4">
                  <div className="font-mono text-xs font-bold text-primary tracking-widest uppercase flex items-center gap-2 border-b border-[#3e2663] pb-2">
                    <FileText className="w-4 h-4 text-primary" />
                    ENGINEERING DELIVERABLES
                  </div>
                  <div className="space-y-2.5">
                    {activeService.deliverables.map((item, idx) => (
                      <div key={idx} className="flex items-center gap-3 font-mono text-xs text-slate-200">
                        <Check className="w-4 h-4 text-primary shrink-0" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Key Benefits */}
                <div className="bg-slate-50 p-6 sm:p-8 border border-border space-y-4">
                  <div className="font-mono text-xs font-bold text-primary tracking-widest uppercase flex items-center gap-2 border-b border-border pb-2">
                    <Zap className="w-4 h-4 text-primary" />
                    KEY BENEFITS & OPERATIONAL IMPACT
                  </div>
                  <div className="space-y-2.5">
                    {activeService.keyBenefits.map((benefit, idx) => (
                      <div key={idx} className="flex items-start gap-3 font-sans text-xs text-foreground font-semibold">
                        <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                        <span>{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Bottom CTA for Active Service */}
              <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-border">
                <div className="font-mono text-xs text-secondary">
                  Module Dossier: <span className="text-foreground font-bold">{activeService.title}</span>
                </div>
                <Link
                  href="/lets-connect"
                  className="px-6 py-3 bg-primary text-white font-mono text-xs font-bold uppercase tracking-wider hover:bg-rose-700 transition-colors inline-flex items-center gap-2"
                >
                  <span>Request Proposal For {activeService.title}</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </Reveal>
        </section>

        {/* Equipment & Process Applications Section */}
        <section className="max-w-7xl mx-auto px-6 lg:px-8 space-y-8">
          <Reveal>
            <div className="font-mono text-[11px] font-bold text-primary tracking-widest uppercase mb-2">
              <span className="text-primary font-bold mr-1">┌</span> POWER PLANT MODULES
            </div>
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-foreground uppercase tracking-tight">
              Power Plant Equipment <span className="text-primary">Applications</span>
            </h2>
            <p className="font-mono text-sm font-semibold text-secondary max-w-3xl mt-2">
              CFD and thermal simulation packages tailored to critical equipment across power generation facilities.
            </p>
          </Reveal>

          <RevealGroup className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6" stagger={0.04}>
            {[
              {
                title: "Utility Boilers & HRSG Systems",
                desc: "Flue gas flow balancing, superheater/reheater thermal mapping, temperature uniformity, and draft pressure loss reduction.",
                tag: "STEAM GENERATION",
              },
              {
                title: "Burners & Combustion Chambers",
                desc: "Flame stability, low-NOx burner optimization, coal-biomass co-firing, over-fire air (OFA) mixing, and unburnt carbon mitigation.",
                tag: "COMBUSTION SYSTEMS",
              },
              {
                title: "ID, FD & PA Fan Networks",
                desc: "Primary, forced, and induced draft fan inlet/outlet flow quality, system resistance matching, and auxiliary power reduction.",
                tag: "AIR & GAS DYNAMICS",
              },
              {
                title: "Cooling Towers & Air-Cooled Condensers",
                desc: "Natural draft plume dispersion, mechanical draft cell recirculation, ACC crosswind sensitivity, and condenser backpressure tuning.",
                tag: "HEAT REJECTION",
              },
              {
                title: "ESP & Baghouse Dust Collectors",
                desc: "Perforated distribution plate design, inlet velocity profile optimization, hopper re-entrainment suppression, and filter bag life extension.",
                tag: "PARTICULATE CONTROL",
              },
              {
                title: "SCR & FGD Flue Gas Cleaning",
                desc: "Ammonia Injection Grid (AIG) mixing uniformity, catalyst velocity distribution, SOx scrubber droplet interaction, and pressure drop tuning.",
                tag: "EMISSION CONTROL",
              },
              {
                title: "Pulverized Coal & Ash Transport",
                desc: "Primary air-coal pipe distribution balance, fly ash transport erosion, bottom ash chute flow, and cyclone separation efficiency.",
                tag: "BULK MATERIAL FLOW",
              },
              {
                title: "Waste Heat Recovery & Ductwork",
                desc: "Waste heat boiler gas distribution, duct branch flow balancing, expansion joint flow separation, and stack flow quality.",
                tag: "ENERGY RECOVERY",
              },
              {
                title: "Root Cause Plant Diagnostics",
                desc: "Troubleshooting tube erosion, refractory hot spots, fan hunting, temperature imbalances, and unexpected pressure drops.",
                tag: "PLANT DIAGNOSTICS",
              },
            ].map((app, idx) => (
              <RevealItem key={idx}>
                <div className="bg-white border border-border p-6 relative h-full flex flex-col justify-between hover:border-primary transition-colors shadow-sm">
                  <div>
                    <div className="font-mono text-[10px] font-bold text-primary tracking-wider uppercase mb-2">
                      APP&#8209;{String(idx + 1).padStart(2, "0")} / {app.tag}
                    </div>
                    <h3 className="font-display font-extrabold text-lg text-foreground mb-2 uppercase">
                      {app.title}
                    </h3>
                    <p className="text-xs text-secondary font-sans leading-relaxed">
                      {app.desc}
                    </p>
                  </div>
                  <div className="pt-4 mt-4 border-t border-border">
                    <Link
                      href="/lets-connect"
                      className="font-mono text-[10px] font-bold text-primary hover:text-rose-700 uppercase tracking-widest flex items-center gap-1.5"
                    >
                      <span>Inquire Application Dossier</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </section>

        {/* WHY CHOOSE MACPROTEC FOR SIMULATION? (Page 16 PDF Spec Requirement) */}
        <section className="py-20 bg-[#201235] text-white border-y border-[#3e2663] relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none" />

          <div className="max-w-7xl mx-auto px-6 lg:px-8 space-y-16 relative z-10">
            {/* Section Header */}
            <div className="text-center max-w-3xl mx-auto space-y-4">
              <Reveal>
                <div className="inline-block font-mono text-xs font-bold text-white tracking-widest uppercase bg-rose-500/20 border border-rose-500/40 px-3 py-1">
                  WHY CHOOSE MACPROTEC
                </div>
              </Reveal>

              <Reveal>
                <h2 className="font-display font-black text-3xl sm:text-4xl lg:text-5xl text-white uppercase tracking-tight">
                  Why Choose MACPROTEC for Simulation?
                </h2>
              </Reveal>

              <Reveal>
                <p className="text-slate-300 font-sans text-base leading-relaxed">
                  We combine deep thermal power plant process knowledge with advanced computational fluid dynamics to solve complex heat transfer, fluid flow, and combustion challenges.
                </p>
              </Reveal>
            </div>

            {/* 6 Feature Grid Cards */}
            <RevealGroup className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8" stagger={0.06}>
              {WHY_CHOOSE_SIMULATION.map((item, idx) => {
                const IconComp = item.icon;
                return (
                  <RevealItem key={idx}>
                    <div className="bg-[#2d1b47] border border-[#3e2663] p-8 space-y-4 hover:border-primary/60 transition-all duration-300 group h-full">
                      <div className="w-12 h-12 rounded bg-rose-500/10 border border-rose-500/30 text-primary flex items-center justify-center shrink-0">
                        <IconComp className="w-6 h-6 text-primary" />
                      </div>

                      <h3 className="font-display font-extrabold text-xl text-white uppercase tracking-tight group-hover:text-rose-300 transition-colors">
                        {item.title}
                      </h3>

                      <p className="text-xs text-slate-300 font-sans leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </RevealItem>
                );
              })}
            </RevealGroup>
          </div>
        </section>

        {/* Contact CTA */}
        <section className="max-w-7xl mx-auto px-6 lg:px-8">
          <Reveal>
            <div className="bg-slate-900 text-white p-10 sm:p-14 border border-slate-800 relative overflow-hidden shadow-2xl flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="max-w-2xl">
                <div className="font-mono text-xs font-bold text-primary tracking-widest uppercase mb-3 flex items-center gap-2">
                  <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                  CONSULT SENIOR POWER SIMULATION ENGINEERS
                </div>
                <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-white uppercase tracking-tight leading-tight">
                  Optimize Your Power Plant Operations <br />
                  <span className="text-primary">Get a Tailored Simulation Proposal</span>
                </h2>
                <p className="text-slate-300 text-sm sm:text-base font-sans mt-4 leading-relaxed">
                  Connect with our senior engineering team to evaluate plant operating parameters, CAD geometry, and target performance improvements.
                </p>
              </div>

              <div className="shrink-0">
                <Link
                  href="/lets-connect"
                  className="inline-flex items-center gap-3 px-8 py-4 bg-primary text-white font-mono text-xs font-bold tracking-widest uppercase hover:bg-rose-700 transition-colors shadow-lg"
                >
                  <span>LET'S CONNECT</span>
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
