"use client";

import { use, useState, useEffect } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import TechnicalCursor from "@/components/ui/TechnicalCursor";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { Magnetic } from "@/components/ui/Magnetic";
import Link from "next/link";
import gsap from "gsap";
import { useCreateSubmissionMutation } from "@/redux/api/submissionApi";

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
  const [sent, setSent] = useState(false);
  const [createSubmission, { isLoading: submitting }] = useCreateSubmissionMutation();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = String(formData.get("name") || "");
    const email = String(formData.get("email") || "");
    const message = String(formData.get("message") || "");

    try {
      await createSubmission({
        type: "CONSULTATION",
        name,
        email,
        sector: slug,
        subject: `Industry Consultation: ${slug}`,
        message,
      }).unwrap();
      setSent(true);
    } catch (err) {
      console.error("Consultation submit error:", err);
    }
  };

  // Dictionary for dynamic high-fidelity industries content
  const industriesData: Record<string, IndustryContent> = {
    "industry-40": {
      title: "Industry 4.0",
      subtitle:
        "Accelerate smart manufacturing transformation using IoT sensors, AI predictive maintenance, and real-time digital twins.",
      challenges: [
        {
          title: "OT/IT Systems Integration",
          desc: "Connect legacy DCS, SCADA, and historian node networks into secure cloud and edge telemetry backbones.",
          img: "/images/card_digital_twin.png",
        },
        {
          title: "Predictive Equipment Analytics",
          desc: "Apply ML algorithms to vibration, thermal, and electrical metrics to forecast failures weeks before occurrence.",
          img: "/images/card_plant_optimization.png",
        },
        {
          title: "Real-Time OEE & Energy KPIs",
          desc: "Consolidate plant-wide operational data to track energy intensity per ton of product automatically.",
          img: "/images/hero_industrial.png",
        },
      ],
      optimizationTitle: "Industry 4.0 Assessment Scope",
      optimizationItems: [
        "IoT Telemetry & Edge Gateway Setup",
        "Predictive Maintenance Model Calibration",
        "Real-Time SCADA/DCS Data Pipelines",
        "Asset Health Index & OEE Dashboards",
        "Cybersecurity & OT Network Hardening",
      ],
      optimizationImg: "/images/card_digital_twin.png",
      workflowTitle: "Smart Plant Implementation Phases",
      workflowDesc:
        "Systematic digital transformation strategy designed for zero-downtime industrial deployment.",
      workflowSteps: [
        { step: "Phase 01", label: "OT Audit", desc: "Evaluate existing sensor coverage, network topology, and PLCs." },
        { step: "Phase 02", label: "Edge Deployment", desc: "Install smart IoT gateways and data collection pipelines." },
        { step: "Phase 03", label: "AI Model Training", desc: "Train predictive failure models on historical sensor logs." },
        { step: "Phase 04", label: "Dashboard Rollout", desc: "Launch unified role-based dashboards across plant teams." },
      ],
      solutionsTitle: "Applied Industry 4.0 Solutions",
      solutionsPoints: [
        "Digital Twin virtual plant replicas",
        "AI-driven predictive maintenance platforms",
        "Real-time energy & emissions tracking",
        "Automated alarm suppression & anomaly detection",
      ],
    },
    cement: {
      title: "Cement Industry",
      subtitle:
        "Maximize pyroprocessing thermal efficiency, optimize grinding circuit power consumption, and increase alternative fuel substitution.",
      challenges: [
        {
          title: "Pyroprocessing & Kiln Stability",
          desc: "Model alternative fuel combustion profiles, secondary air mix zones, and thermal stress on burner pipes.",
          img: "/images/hero_plant.png",
        },
        {
          title: "Grinding Mill Energy Efficiency",
          desc: "Optimize raw meal, cement, and VRM grinding circuits to reduce specific power consumption (kWh/ton).",
          img: "/images/card_plant_optimization.png",
        },
        {
          title: "Clinker Cooler Heat Recovery",
          desc: "Balance grate cooler airflow distribution to maximize secondary & tertiary air heat recovery.",
          img: "/images/plant_reactor.png",
        },
      ],
      optimizationTitle: "Cement Plant Audit Scope",
      optimizationItems: [
        "Kiln specific heat consumption optimization",
        "Alternative fuel burner nozzle sizing & CFD",
        "Raw & cement mill separator efficiency checks",
        "Clinker cooler fan air balance calibration",
        "Preheater cyclone pressure drop reduction",
      ],
      optimizationImg: "/images/hero_plant.png",
      workflowTitle: "Cement Performance Optimization",
      workflowDesc:
        "Data-backed engineering audits designed to lower heat consumption and boost kiln throughput.",
      workflowSteps: [
        { step: "Phase 01", label: "Process Audit", desc: "Collect SCADA telemetry, fuel specs, and mass balance data." },
        { step: "Phase 02", label: "CFD & Sim", desc: "Construct thermo-chemical simulation meshes for pyroprocess." },
        { step: "Phase 03", label: "Field Tuning", desc: "Re-align burner nozzles, damper positions, and separator speeds." },
        { step: "Phase 04", label: "SLA Monitoring", desc: "Track specific power and thermal KPIs continuously." },
      ],
      solutionsTitle: "Applied Cement Solutions",
      solutionsPoints: [
        "Kiln burner alternative fuel retrofits",
        "Clinker cooler airflow balancing",
        "Grinding circuit separator optimization",
        "Process simulation & Heat/Mass balances",
      ],
    },
    "aggregate-and-scm": {
      title: "Aggregate and SCM",
      subtitle:
        "Optimize crushing, screening, grinding, and supplementary cementitious material (SCM) processing facilities.",
      challenges: [
        {
          title: "Crusher & Screen Throughput",
          desc: "Eliminate bottleneck choke points in primary, secondary, and tertiary crushing circuits.",
          img: "/images/contact_plant.png",
        },
        {
          title: "SCM Reactivity & Fineness",
          desc: "Enhance grinding fineness and particle size distribution for slag, calcined clay, and fly ash.",
          img: "/images/hero_industrial.png",
        },
      ],
      optimizationTitle: "Aggregate & SCM Scope",
      optimizationItems: [
        "Crushing circuit power & wear optimization",
        "Screening efficiency & classification checks",
        "Calcined clay pyroprocessing thermal audits",
        "Slag grinding circuit specific power reduction",
      ],
      optimizationImg: "/images/contact_plant.png",
      workflowTitle: "SCM Optimization Methodology",
      workflowDesc:
        "Engineering audits focused on boosting throughput and maintaining product fineness.",
      workflowSteps: [
        { step: "Phase 01", label: "Circuit Audit", desc: "Analyze feed rates, PSD curves, and moisture levels." },
        { step: "Phase 02", label: "CFD & DEM", desc: "Model particle flow dynamics in crushers and classifiers." },
        { step: "Phase 03", label: "Equipment Tuning", desc: "Adjust mill internals, classifier speeds, and screen angles." },
        { step: "Phase 04", label: "Quality Checks", desc: "Validate blaine fineness and mortar strength metrics." },
      ],
      solutionsTitle: "Applied Aggregate & SCM Solutions",
      solutionsPoints: [
        "DEM particle flow modeling in transfer chutes",
        "Calcined clay flash calcination design",
        "Slag mill grinding media optimization",
        "Dust suppression & air handling upgrades",
      ],
    },
    "mining-and-metals": {
      title: "Mining and Metals",
      subtitle:
        "Enhance comminution circuit efficiency, pyrometallurgical furnace performance, and mineral processing recovery.",
      challenges: [
        {
          title: "SAG & Ball Mill Power Intensity",
          desc: "Reduce specific power consumption in heavy grinding circuits through circuit modeling and CFD.",
          img: "/images/card_engineering_design.png",
        },
        {
          title: "Furnace Heat & Gas Balances",
          desc: "Optimize smelting furnace gas extractions, off-gas cooling, and refractory thermal protection.",
          img: "/images/hero_plant.png",
        },
      ],
      optimizationTitle: "Mining & Metals Scope",
      optimizationItems: [
        "Comminution circuit energy optimization",
        "Hydrocyclone battery separation efficiency",
        "Pyrometallurgical off-gas duct CFD",
        "Slurry piping hydraulic pressure loss checks",
      ],
      optimizationImg: "/images/card_engineering_design.png",
      workflowTitle: "Metals Processing Workflow",
      workflowDesc:
        "End-to-end engineering solutions for ore preparation, beneficiation, and pyrometallurgy.",
      workflowSteps: [
        { step: "Phase 01", label: "Ore Analysis", desc: "Review work index, abrasion index, and telemetry logs." },
        { step: "Phase 02", label: "Sim & Modeling", desc: "Simulate hydrocyclone cut points and furnace gas velocities." },
        { step: "Phase 03", label: "Engineering Package", desc: "Deliver detail designs for piping, ducting, and liners." },
        { step: "Phase 04", label: "Ramp-Up Support", desc: "Assist site engineers during plant commissioning." },
      ],
      solutionsTitle: "Applied Mining Solutions",
      solutionsPoints: [
        "Comminution circuit debottlenecking",
        "Off-gas duct CFD & thermal stress analysis",
        "Hydrocyclone cluster optimization",
        "3D Laser Scanning & reverse engineering for liners",
      ],
    },
    "mine-tailing-management": {
      title: "Mine Tailing Management",
      subtitle:
        "Design safe, sustainable tailing dewatering, paste backfill systems, and environmental compliance solutions.",
      challenges: [
        {
          title: "High-Density Thickening & Dewatering",
          desc: "Optimize rake torque, flocculant dosing, and underflow density in paste thickeners.",
          img: "/images/plant_reactor.png",
        },
        {
          title: "Paste Backfill Pipeline Hydraulics",
          desc: "Calculate yield stress, friction loss, and line pressure in long-distance paste pumping lines.",
          img: "/images/contact_plant.png",
        },
      ],
      optimizationTitle: "Tailing Audit Scope",
      optimizationItems: [
        "Paste thickener underflow solids optimization",
        "Tailing pipeline hydraulic pressure drop modeling",
        "Filter press cycle time & moisture reduction",
        "Tailing dam stability & monitoring telemetry",
      ],
      optimizationImg: "/images/plant_reactor.png",
      workflowTitle: "Tailing Management Strategy",
      workflowDesc:
        "Sustainable dewatering and rheology engineering to minimize environmental risks.",
      workflowSteps: [
        { step: "Phase 01", label: "Rheology Testing", desc: "Measure yield stress, slump, and settling characteristics." },
        { step: "Phase 02", label: "Hydraulic Sim", desc: "Model non-Newtonian slurry flow in pipelines." },
        { step: "Phase 03", label: "System Design", desc: "Specify high-pressure pumps, valves, and thickener rakes." },
        { step: "Phase 04", label: "Monitoring Setup", desc: "Install pipeline pressure & density telemetry sensors." },
      ],
      solutionsTitle: "Applied Tailing Solutions",
      solutionsPoints: [
        "Paste backfill plant engineering design",
        "Non-Newtonian slurry pipeline CFD modeling",
        "Thickener rake torque & underflow optimization",
        "Filter press dewatering system integration",
      ],
    },
    petrochemical: {
      title: "Petrochemical Industry",
      subtitle:
        "Optimize heat exchanger networks, fired heaters, distillation columns, and piping stress configurations.",
      challenges: [
        {
          title: "Fired Heater Thermal Efficiency",
          desc: "Evaluate burner flame pattern, NOx emissions, and tube wall skin temperatures using CFD.",
          img: "/images/hero_plant.png",
        },
        {
          title: "Piping Stress & Surge Analysis",
          desc: "Perform FEA & CAESAR II piping stress calculations for high-pressure, high-temperature lines.",
          img: "/images/card_cfd_simulation.png",
        },
      ],
      optimizationTitle: "Petrochemical Audit Scope",
      optimizationItems: [
        "Fired heater thermal efficiency & flue gas CFD",
        "Heat exchanger network pinch analysis",
        "Distillation column hydraulic capacity reviews",
        "Piping stress FEA & surge pressure checks",
      ],
      optimizationImg: "/images/card_cfd_simulation.png",
      workflowTitle: "Petrochemical Optimization Workflow",
      workflowDesc:
        "Rigorous thermal and mechanical engineering for refining and chemical process units.",
      workflowSteps: [
        { step: "Phase 01", label: "Plant Data Review", desc: "Gather stream data, temperatures, pressures, and isometric drafts." },
        { step: "Phase 02", label: "CFD & FEA", desc: "Run combustion simulations and piping stress calculations." },
        { step: "Phase 03", label: "Design Package", desc: "Deliver FEED & Detail Engineering modification drawings." },
        { step: "Phase 04", label: "Turnaround Support", desc: "Provide technical assistance during plant turnarounds." },
      ],
      solutionsTitle: "Applied Petrochemical Solutions",
      solutionsPoints: [
        "Fired heater burner retrofit CFD",
        "High-temperature piping stress & FEA analysis",
        "Heat exchanger bundle fouling reduction",
        "Flare header hydraulic capacity reviews",
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
