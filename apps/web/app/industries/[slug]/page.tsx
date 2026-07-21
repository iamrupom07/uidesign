"use client";

import { use, useState, useEffect } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import TechnicalCursor from "@/components/ui/TechnicalCursor";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { Magnetic } from "@/components/ui/Magnetic";
import Link from "next/link";
import gsap from "gsap";

interface IndustryContent {
  title: string;
  subtitle: string;
  challenges: { title: string; desc: string; img: string }[];
  optimizationTitle: string;
  optimizationItems: string[];
  optimizationImg: string;
  workflowTitle: string;
  workflowSteps: { step: string; label: string; desc: string }[];
  workflowDesc: string;
  solutionsTitle: string;
  solutionsPoints: string[];
}

export default function IndustryDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);

  // Dictionary for dynamic high-fidelity industries content
  const industriesData: Record<string, IndustryContent> = {
    "cement-plants": {
      title: "Cement Plants",
      subtitle:
        "Maximize pyroprocessing thermal efficiency, increase alternative fuel substitutions, and reduce clinker cooler bottlenecks.",
      challenges: [
        {
          title: "Pyroprocessing & Fuel Combustion",
          desc: "Model alternative fuel combustion profiles, secondary air mix zones, and thermal stress on burner pipes.",
          img: "/images/hero_plant.png",
        },
        {
          title: "Raw Mill Gas Balances",
          desc: "Analyze flow velocity margins, drag states, and pressure drops to eliminate mill system blockages.",
          img: "/images/plant_reactor.png",
        },
        {
          title: "Preheater Cyclone Volatiles",
          desc: "Detect material blocks and calculate separation efficiency parameters using Eulerian multi-phase solvers.",
          img: "/images/contact_plant.png",
        },
        {
          title: "Clinker Cooler Fan Controls",
          desc: "Ensure cooling air optimization and refractory thermal profiles are held within safe limits.",
          img: "/images/hero_plant.png",
        },
      ],
      optimizationTitle: "Cement Plant Audit Scope",
      optimizationItems: [
        "Kiln specific heat consumption checks",
        "Alternative fuel combustion nozzle sizing",
        "Preheater bypass gas extraction rates",
        "Secondary air temperature optimization",
        "Raw mill gas drying capacity reviews",
        "Clinker cooler cooling fans balancing",
        "Preheater cyclone pressure drop checks",
      ],
      optimizationImg: "/images/hero_plant.png",
      workflowTitle: "Pyroprocessing Performance Phases",
      workflowDesc:
        "Every thermal audit follows our validated steps to ensure clinker output goals are met.",
      workflowSteps: [
        {
          step: "Phase 01",
          label: "Sensor Audit",
          desc: "Compile actual plant SCADA logs, fuel chemistry datasets, and pressure coordinates.",
        },
        {
          step: "Phase 02",
          label: "CFD Thermal Flow",
          desc: "Construct multi-phase simulation meshes to profile internal velocity fields.",
        },
        {
          step: "Phase 03",
          label: "Burner Alignment",
          desc: "Verify nozzle swirl indexes and optimize flame shape lengths.",
        },
        {
          step: "Phase 04",
          label: "Continuous SLA",
          desc: "Deploy real-time dashboard telemetry logs to monitor sensor drift.",
        },
      ],
      solutionsTitle: "Applied Cement Solutions",
      solutionsPoints: [
        "Kiln burner alternative fuel retrofits",
        "CFD clinker cooler airflow balancing",
        "Preheater cyclone build-up mitigations",
        "Raw mill gas duct debottlenecking",
      ],
    },
    "cement-terminals": {
      title: "Cement Terminals",
      subtitle:
        "Optimize pneumatic conveyor lines, eliminate pipe blockages, and speed up ship unloading rates.",
      challenges: [
        {
          title: "Pneumatic Line Conveying",
          desc: "Evaluate pressure drops, line velocity limits, and material drag margins to prevent blockages.",
          img: "/images/plant_reactor.png",
        },
        {
          title: "Silo Aeration & Flow",
          desc: "Model aeration pad fluidization, discharge velocities, and material flow lines.",
          img: "/images/contact_plant.png",
        },
        {
          title: "Dust Collector System Compliance",
          desc: "Review filter bag drag coefficients and exhaust gas flows to minimize bag wear.",
          img: "/images/hero_plant.png",
        },
        {
          title: "Loading Spout Clash Audits",
          desc: "Deploy clash-detection modeling on ship loaders to verify structural clearance tolerances.",
          img: "/images/plant_reactor.png",
        },
      ],
      optimizationTitle: "Terminal Optimization Scope",
      optimizationItems: [
        "Conveying pressure drop calculation",
        "Aeration pad blower capacity matching",
        "Silo discharge flow velocity maps",
        "Dust collector exhaust velocity",
        "Ship loader clash coordinates",
        "Piping gas velocity margins",
        "Bag filter drag calibrations",
      ],
      optimizationImg: "/images/plant_reactor.png",
      workflowTitle: "Pneumatic Optimization Phases",
      workflowDesc:
        "Improving material transfer flow rates using validated fluid dynamics calculations.",
      workflowSteps: [
        {
          step: "01",
          label: "Line Audit",
          desc: "Audit blower curves, pipe routing configurations, and material parameters.",
        },
        {
          step: "02",
          label: "Pneumatic CFD",
          desc: "Model gas-solid phase interactions using Eulerian solvers.",
        },
        {
          step: "03",
          label: "Retrofit Drafts",
          desc: "Prepare detailed piping coordinates and clash check lists.",
        },
        { step: "04", label: "SLA Validation", desc: "Verify ship unloading velocities on-site." },
      ],
      solutionsTitle: "Applied Terminal Solutions",
      solutionsPoints: [
        "Pneumatic pipeline conveying upgrades",
        "Silo fluidization pad retrofits",
        "Dust collector exhaust fan balancing",
        "Ship loader coordinate checkouts",
      ],
    },
  };

  // Fallback content for other industry slugs
  const defaultData: IndustryContent = {
    title: slug
      .split("-")
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" "),
    subtitle:
      "Process engineering, thermal auditing, and digital twin consulting customized for industrial sectors.",
    challenges: [
      {
        title: "Process Flow Bottlenecks",
        desc: "Analyze flow velocities, material drag, and thermal profiles across key processing vessels.",
        img: "/images/hero_plant.png",
      },
      {
        title: "Equipment Structural Stress",
        desc: "Conduct detailed FEA calculations to map load limits and structural fatigue zones.",
        img: "/images/plant_reactor.png",
      },
    ],
    optimizationTitle: "Engineering Audit Scope",
    optimizationItems: [
      "Process flow debottlenecking",
      "Thermal performance optimization",
      "Piping stress calculations",
      "Equipment layout checks",
      "Clash coordinate checking",
      "Sensor telemetry calibrations",
    ],
    optimizationImg: "/images/plant_reactor.png",
    workflowTitle: "Operational Consulting Phases",
    workflowDesc: "Ensuring design accuracy and safety margins on every retrofit project.",
    workflowSteps: [
      {
        step: "Phase 1",
        label: "Data Capture",
        desc: "Collect actual sensor values, piping geometry drafts, and parameters.",
      },
      {
        step: "Phase 2",
        label: "Modeling & CFD",
        desc: "Construct flowsheet simulations and thermal grid meshes.",
      },
      {
        step: "Phase 3",
        label: "Tolerances Check",
        desc: "Run structural stress and clash-detection audits.",
      },
      { step: "Phase 4", label: "Commissioning", desc: "Validate operational parameters on-site." },
    ],
    solutionsTitle: "Applied Engineering Solutions",
    solutionsPoints: [
      "Process flowsheet debottlenecking",
      "Piping stress FEA calculations",
      "Clash-free layout drafting",
      "Digital twin SCADA connections",
    ],
  };

  const content = industriesData[slug] || defaultData;

  const partnerLogos = [
    { name: "Partner 1", logo: "Nippon" },
    { name: "Partner 2", logo: "Holcim" },
    { name: "Partner 3", logo: "Cemex" },
    { name: "Partner 4", logo: "Heidelberg" },
  ];

  useEffect(() => {
    // Circular rotation loop ring
    const ctx = gsap.context(() => {
      gsap.to(".gsap-rotate-ring", {
        rotation: 360,
        duration: 35,
        repeat: -1,
        ease: "linear",
      });
    });
    return () => ctx.revert();
  }, [slug]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    const form = new FormData(e.currentTarget);
    try {
      await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Object.fromEntries(form)),
      });
      setSent(true);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <>
      <TechnicalCursor />
      <Header />

      <main className="bg-background min-h-screen blueprint-mesh space-y-24 pt-24 pb-20">
        {/* Section 1: Hero Banner (Blueprint Frame Theme) */}
        <section className="max-w-7xl mx-auto px-6 lg:px-8 relative">
          <div className="absolute top-8 left-8 right-8 bottom-8 border border-slate-200/55 pointer-events-none" />
          <div className="absolute top-10 left-10 font-mono text-[8px] text-slate-400">
            DRAFTING / INDUSTRY REPORT
          </div>
          <div className="absolute bottom-10 right-10 font-mono text-[8px] text-slate-400">
            SHEET [IND-01]
          </div>

          <div className="border border-border p-12 bg-white/80 backdrop-blur-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 border-b border-l border-primary/10 opacity-20 pointer-events-none" />
            <Reveal>
              <div className="font-mono text-[10px] font-bold text-primary tracking-widest uppercase mb-4">
                <span className="text-primary font-bold mr-1">┌</span> INDUSTRY // SEC-02
              </div>
              <h1 className="text-4xl sm:text-5xl font-display font-extrabold uppercase tracking-tight text-foreground mb-6">
                {content.title}
              </h1>
              <p className="body-md text-secondary max-w-2xl leading-relaxed">{content.subtitle}</p>
            </Reveal>
          </div>
        </section>

        {/* Section 2: Operational Challenges Dossier */}
        <section className="max-w-7xl mx-auto px-6 lg:px-8">
          <Reveal className="mb-10">
            <div className="font-mono text-[10px] font-bold text-primary tracking-widest uppercase mb-3">
              <span className="text-primary font-bold mr-1">┌</span> CHALLENGES LOG
            </div>
            <h2 className="text-2xl sm:text-3xl font-display font-extrabold uppercase text-foreground">
              Critical Process Challenges
            </h2>
          </Reveal>

          <RevealGroup className="grid md:grid-cols-2 gap-lg" stagger={0.08}>
            {content.challenges.map((item, i) => (
              <RevealItem key={item.title}>
                <div className="card relative flex flex-col sm:flex-row gap-6 items-stretch bg-white">
                  <div className="relative w-24 h-24 sm:w-32 sm:h-32 border border-border bg-slate-50 overflow-hidden shrink-0 self-center">
                    <img
                      src={item.img}
                      alt={item.title}
                      className="w-full h-full object-cover grayscale opacity-95"
                    />
                    <div className="absolute inset-0 bg-primary/5 pointer-events-none" />
                  </div>
                  <div className="flex flex-col justify-between">
                    <div>
                      <span className="font-mono text-[9px] text-slate-400">CHAL-0{i + 1}</span>
                      <h3 className="font-display font-extrabold text-sm sm:text-base text-foreground uppercase mt-1 mb-2">
                        {item.title}
                      </h3>
                      <p className="text-xs text-secondary leading-relaxed font-sans">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </section>

        {/* Section 3: Audit & Optimization Parameters */}
        <section className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-lg items-center">
            {/* Checklist */}
            <Reveal>
              <div className="font-mono text-[10px] font-bold text-primary tracking-widest uppercase mb-3">
                <span className="text-primary font-bold mr-1">┌</span> PARAMETERS AUDIT
              </div>
              <h2 className="text-2xl sm:text-3xl font-display font-extrabold uppercase mb-6 leading-tight text-foreground">
                {content.optimizationTitle}
              </h2>

              <div className="grid sm:grid-cols-2 gap-4">
                {content.optimizationItems.map((item, idx) => (
                  <div
                    key={item}
                    className="flex gap-2 items-start bg-white border border-border p-4 hover:border-primary/30 transition-all duration-300"
                  >
                    <span className="w-5 h-5 bg-rose-50 border border-rose-100 flex items-center justify-center font-mono text-[9px] font-bold text-primary shrink-0">
                      {idx + 1}
                    </span>
                    <span className="text-xs font-sans text-foreground leading-tight">{item}</span>
                  </div>
                ))}
              </div>
            </Reveal>

            {/* Graphic image with crop corner frames */}
            <Reveal delay={0.1}>
              <div className="relative p-6 max-w-md mx-auto w-full aspect-square">
                <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-primary" />
                <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-primary" />
                <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-primary" />
                <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-primary" />

                <div className="w-full h-full border border-border bg-white p-6 overflow-hidden">
                  <img
                    src={content.optimizationImg}
                    alt="Process layout schematic drawing"
                    className="w-full h-full object-contain grayscale"
                  />
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* Section 4: Workflow Phases */}
        <section className="max-w-7xl mx-auto px-6 lg:px-8 border-t border-border pt-20">
          <Reveal className="mb-12">
            <div className="font-mono text-[10px] font-bold text-primary tracking-widest uppercase mb-3">
              <span className="text-primary font-bold mr-1">┌</span> WORKFLOW DOSSIER
            </div>
            <h2 className="text-2xl sm:text-3xl font-display font-extrabold uppercase text-foreground">
              {content.workflowTitle}
            </h2>
            <p className="text-xs text-secondary mt-2">{content.workflowDesc}</p>
          </Reveal>

          <RevealGroup className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 relative" stagger={0.08}>
            {content.workflowSteps.map((item) => (
              <RevealItem key={item.step}>
                <div className="card border border-border p-6 bg-white relative">
                  <span className="absolute top-4 right-4 font-mono text-[9px] text-primary font-bold uppercase">
                    {item.step}
                  </span>
                  <h3 className="font-display font-extrabold text-sm uppercase tracking-tight text-foreground mb-2">
                    {item.label}
                  </h3>
                  <p className="text-xs text-secondary leading-relaxed font-sans">{item.desc}</p>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </section>

        {/* Section 5: Circular Loop Diagram */}
        <section className="max-w-7xl mx-auto px-6 lg:px-8 border-t border-border pt-20">
          <div className="grid lg:grid-cols-2 gap-lg items-center">
            <Reveal>
              <div className="font-mono text-[10px] font-bold text-primary tracking-widest uppercase mb-3">
                <span className="text-primary font-bold mr-1">┌</span> TELEMETRY FEEDBACK LOOP
              </div>
              <h2 className="text-2xl sm:text-3xl font-display font-extrabold uppercase mb-6 leading-tight text-foreground">
                Continuous Flow Tuning
              </h2>
              <p className="body-md text-secondary leading-relaxed font-sans">
                Our plant analytics dashboard integrates live SCADA variables directly with virtual
                simulation engines. This creates a continuous telemetry loop of diagnostics, alarms
                validation, and emission corrections.
              </p>
            </Reveal>

            {/* Circular Workflow graphic in pure styled CSS */}
            <Reveal delay={0.12}>
              <div className="relative w-72 h-72 sm:w-96 sm:h-96 mx-auto flex items-center justify-center border border-border bg-white rounded-full p-4 overflow-hidden">
                <div className="absolute inset-4 border border-dashed border-primary/20 rounded-full gsap-rotate-ring" />

                {/* Center Core */}
                <div className="relative z-10 w-24 h-24 sm:w-32 sm:h-32 bg-primary text-white border border-primary flex flex-col items-center justify-center text-center p-2 rounded-full shadow-md">
                  <span className="font-mono text-[8px] font-bold tracking-widest uppercase text-white/90">
                    CORE
                  </span>
                  <span className="font-display font-extrabold text-[10px] sm:text-xs uppercase">
                    OPTIMIZATION
                  </span>
                </div>

                {/* Satellite Steps */}
                <div className="absolute top-6 left-1/2 -translate-x-1/2 w-16 h-16 sm:w-20 sm:h-20 bg-white border border-border flex flex-col items-center justify-center text-center p-1 rounded-full shadow-sm hover:border-primary/50 transition-colors">
                  <span className="font-mono text-[8px] font-bold text-primary">01</span>
                  <span className="font-display font-extrabold text-[8px] uppercase text-foreground mt-0.5">
                    AUDIT
                  </span>
                </div>

                <div className="absolute right-6 top-1/2 -translate-y-1/2 w-16 h-16 sm:w-20 sm:h-20 bg-white border border-border flex flex-col items-center justify-center text-center p-1 rounded-full shadow-sm hover:border-primary/50 transition-colors">
                  <span className="font-mono text-[8px] font-bold text-primary">02</span>
                  <span className="font-display font-extrabold text-[8px] uppercase text-foreground mt-0.5">
                    MODEL
                  </span>
                </div>

                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-16 h-16 sm:w-20 sm:h-20 bg-white border border-border flex flex-col items-center justify-center text-center p-1 rounded-full shadow-sm hover:border-primary/50 transition-colors">
                  <span className="font-mono text-[8px] font-bold text-primary">03</span>
                  <span className="font-display font-extrabold text-[8px] uppercase text-foreground mt-0.5">
                    VERIFY
                  </span>
                </div>

                <div className="absolute left-6 top-1/2 -translate-y-1/2 w-16 h-16 sm:w-20 sm:h-20 bg-white border border-border flex flex-col items-center justify-center text-center p-1 rounded-full shadow-sm hover:border-primary/50 transition-colors">
                  <span className="font-mono text-[8px] font-bold text-primary">04</span>
                  <span className="font-display font-extrabold text-[8px] uppercase text-foreground mt-0.5">
                    TUNE
                  </span>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* Section 6: Applied Solutions Matrix */}
        <section className="max-w-7xl mx-auto px-6 lg:px-8 border-t border-border pt-20">
          <div className="grid lg:grid-cols-2 gap-lg">
            <Reveal>
              <div className="font-mono text-[10px] font-bold text-primary tracking-widest uppercase mb-3">
                <span className="text-primary font-bold mr-1">┌</span> APPLIED SOLUTIONS
              </div>
              <h2 className="text-2xl font-display font-extrabold uppercase mb-4 text-foreground">
                {content.solutionsTitle}
              </h2>
              <p className="text-xs text-secondary leading-relaxed font-sans mb-6">
                Our process engineers design, verify, and validate structural layouts, thermal
                zones, and material feeds to target emission decreases.
              </p>

              <ul className="space-y-3 font-sans text-xs text-secondary">
                {content.solutionsPoints.map((point) => (
                  <li key={point} className="flex gap-2 items-center">
                    <span className="text-primary font-mono text-[9px]">■</span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </Reveal>

            {/* Technical system flow chart drawn in CSS */}
            <Reveal delay={0.12}>
              <div className="bg-white border border-border p-8 rounded-none relative">
                <div className="absolute top-4 right-4 font-mono text-[8px] text-slate-400">
                  DIAG-01 / FLOW
                </div>
                <h3 className="font-display font-extrabold text-sm uppercase mb-8 text-foreground">
                  Consulting Feedback Loop
                </h3>

                <div className="flex flex-col gap-6 items-center">
                  <div className="w-full max-w-[200px] border border-border bg-slate-50 p-3 text-center rounded-none font-mono text-[9px] font-bold">
                    [1] SCADA site telemetry variables
                  </div>

                  <div className="w-0.5 h-6 bg-primary" />

                  <div className="w-full max-w-[200px] border border-primary bg-rose-50 text-primary p-3 text-center rounded-none font-mono text-[9px] font-bold">
                    [2] flowsheet simulation modeling solvers
                  </div>

                  <div className="w-0.5 h-6 bg-primary" />

                  <div className="w-full max-w-[200px] border border-border bg-slate-50 p-3 text-center rounded-none font-mono text-[9px] font-bold">
                    [3] final burner / equipment alignment targets
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* Section 7: Contact Us Form */}
        <section className="max-w-7xl mx-auto px-6 lg:px-8 border-t border-border pt-20">
          <div className="grid lg:grid-cols-2 gap-lg items-stretch">
            {/* Quick Contact Form */}
            <Reveal>
              <div className="font-mono text-[10px] font-bold text-primary tracking-widest uppercase mb-3">
                <span className="text-primary font-bold mr-1">┌</span> DIRECT CONNECT
              </div>
              <h2 className="text-2xl font-display font-extrabold uppercase mb-6 text-foreground">
                Request a Consultation
              </h2>

              <form className="space-y-4" onSubmit={handleSubmit}>
                <div>
                  <label
                    htmlFor="name"
                    className="block font-mono text-[9px] font-bold text-secondary uppercase mb-1"
                  >
                    Your Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    placeholder="Enter your name"
                    className="w-full px-4 py-2.5 border border-border bg-white text-xs font-sans rounded-none focus:outline-none focus:border-primary focus:ring-1 focus:ring-ring"
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block font-mono text-[9px] font-bold text-secondary uppercase mb-1"
                  >
                    Email Address
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    placeholder="Enter your email"
                    className="w-full px-4 py-2.5 border border-border bg-white text-xs font-sans rounded-none focus:outline-none focus:border-primary focus:ring-1 focus:ring-ring"
                  />
                </div>
                <div>
                  <label
                    htmlFor="message"
                    className="block font-mono text-[9px] font-bold text-secondary uppercase mb-1"
                  >
                    Consultation Request Notes
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={3}
                    placeholder="Type details here"
                    className="w-full px-4 py-2.5 border border-border bg-white text-xs font-sans rounded-none focus:outline-none focus:border-primary focus:ring-1 focus:ring-ring"
                  />
                </div>
                <Magnetic strength={0.05}>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="button-primary px-6 py-2.5 text-xs uppercase"
                  >
                    {submitting ? "Sending..." : sent ? "Sent ✓" : "Submit Request"}
                  </button>
                </Magnetic>
              </form>
            </Reveal>

            {/* Sectors Served Checklist */}
            <Reveal delay={0.1}>
              <div className="card bg-white border border-border p-8 h-full flex flex-col justify-between">
                <div>
                  <div className="font-mono text-[10px] font-bold text-primary tracking-widest uppercase mb-3">
                    <span className="text-primary font-bold mr-1">┌</span> COVERAGE AREA
                  </div>
                  <h3 className="font-display font-extrabold text-lg text-foreground mb-6 uppercase">
                    Industries Served
                  </h3>

                  <div className="space-y-3 font-sans text-xs text-secondary">
                    <div className="flex justify-between border-b border-slate-100 pb-2">
                      <span>Cement Manufacturing & Terminals</span>
                      <span className="text-primary font-bold">✓</span>
                    </div>
                    <div className="flex justify-between border-b border-slate-100 pb-2">
                      <span>Mining & Mineral Beneficiation</span>
                      <span className="text-primary font-bold">✓</span>
                    </div>
                    <div className="flex justify-between border-b border-slate-100 pb-2">
                      <span>Chemicals & Petrochemicals</span>
                      <span className="text-primary font-bold">✓</span>
                    </div>
                    <div className="flex justify-between border-b border-slate-100 pb-2">
                      <span>Power Generation & Boiler Units</span>
                      <span className="text-primary font-bold">✓</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Pulp & Paper, Glass, and Lime Kilns</span>
                      <span className="text-primary font-bold">✓</span>
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-4 border-t border-border font-mono text-[9px] text-slate-400 uppercase tracking-widest">
                  USA / LATAM / EU REGIONS
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* Section 8: Related Resources */}
        <section className="max-w-7xl mx-auto px-6 lg:px-8 border-t border-border pt-20">
          <Reveal className="mb-10">
            <div className="font-mono text-[10px] font-bold text-primary tracking-widest uppercase mb-3">
              <span className="text-primary font-bold mr-1">┌</span> KNOWLEDGE BANK
            </div>
            <h2 className="text-2xl sm:text-3xl font-display font-extrabold uppercase text-foreground">
              Key Publications & Resources
            </h2>
          </Reveal>

          <RevealGroup className="grid sm:grid-cols-2 lg:grid-cols-3 gap-lg" stagger={0.08}>
            <RevealItem>
              <div className="card bg-white border border-border p-6 h-full flex flex-col justify-between">
                <div>
                  <span className="font-mono text-[9px] text-primary uppercase font-bold">
                    White Paper
                  </span>
                  <h3 className="font-display font-extrabold text-sm uppercase text-foreground mt-2 mb-3">
                    Alternative Fuel Combustion CFD
                  </h3>
                  <p className="text-xs text-secondary leading-relaxed font-sans">
                    Combustion profiles and flame heat balances under alternative fuel
                    substitutions.
                  </p>
                </div>
                <Link
                  href="/resources/blogs"
                  className="font-mono text-[9px] font-bold text-primary uppercase mt-6 tracking-widest hover:text-rose-700"
                >
                  Read File →
                </Link>
              </div>
            </RevealItem>

            <RevealItem>
              <div className="card bg-white border border-border p-6 h-full flex flex-col justify-between">
                <div>
                  <span className="font-mono text-[9px] text-primary uppercase font-bold">
                    Technical Guide
                  </span>
                  <h3 className="font-display font-extrabold text-sm uppercase text-foreground mt-2 mb-3">
                    Process Simulation Life-Cycle
                  </h3>
                  <p className="text-xs text-secondary leading-relaxed font-sans">
                    Steps to connect dynamic flowsheet variables to DCS Virtual Checkouts.
                  </p>
                </div>
                <Link
                  href="/resources/guides"
                  className="font-mono text-[9px] font-bold text-primary uppercase mt-6 tracking-widest hover:text-rose-700"
                >
                  Read File →
                </Link>
              </div>
            </RevealItem>

            <RevealItem>
              <div className="card bg-white border border-border p-6 h-full flex flex-col justify-between">
                <div>
                  <span className="font-mono text-[9px] text-primary uppercase font-bold">
                    Insight Article
                  </span>
                  <h3 className="font-display font-extrabold text-sm uppercase text-foreground mt-2 mb-3">
                    3D Scanner Coordinate Mapping
                  </h3>
                  <p className="text-xs text-secondary leading-relaxed font-sans">
                    Tolerance limits and clash analyses in brownfield retrofits.
                  </p>
                </div>
                <Link
                  href="/resources/insights"
                  className="font-mono text-[9px] font-bold text-primary uppercase mt-6 tracking-widest hover:text-rose-700"
                >
                  Read File →
                </Link>
              </div>
            </RevealItem>
          </RevealGroup>
        </section>

        {/* Section 9: Partner Logo Band */}
        <section className="bg-white border-t border-b border-border py-12">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="flex flex-wrap gap-8 items-center justify-around opacity-60 grayscale">
              {partnerLogos.map((partner) => (
                <span
                  key={partner.name}
                  className="font-display font-extrabold text-lg text-slate-500 uppercase tracking-widest"
                >
                  // {partner.logo}
                </span>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
