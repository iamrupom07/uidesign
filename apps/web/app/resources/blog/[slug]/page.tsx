"use client";

import { use, useState, useEffect, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import TechnicalCursor from "@/components/ui/TechnicalCursor";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import {
  ArrowLeft,
  Calendar,
  Clock,
  User,
  Share2,
  CheckCircle2,
  Building2,
  Layers,
  ArrowRight,
  BookOpen,
  Sparkles,
  ChevronRight,
  ShieldCheck,
  FileCheck,
  Eye,
  Bookmark,
  Printer,
  Copy,
  Check,
} from "lucide-react";
import { BlogPost } from "@repo/types";
import { useGetBlogPostBySlugQuery, useGetBlogPostsQuery } from "@/redux/api/blogApi";

// Static fallback articles for immediate offline rendering and fallback hydration
const KNOWN_ARTICLES: Record<string, Partial<BlogPost>> = {
  "pyroprocessing-optimization-alternative-fuel": {
    id: "art-pyro",
    title: "Pyroprocessing Optimization & Alternative Fuel Combustion in Cement Kilns",
    slug: "pyroprocessing-optimization-alternative-fuel",
    category: "Engineering Insights",
    sector: "Cement",
    authorName: "MacProtec Technical Desk",
    authorTitle: "Chief Pyroprocessing Engineer",
    readTime: "6 min read",
    createdAt: "2026-08-02T10:00:00.000Z",
    coverImage: "/images/cement_industry.png",
    views: 412,
    excerpt:
      "Discover how CFD flow modeling, flame aerodynamics, and thermal heat balances increase alternative fuel substitution rates up to 65% while preserving kiln shell integrity.",
    content: `In the relentless pursuit of thermal efficiency and carbon reduction, cement plant operators are aggressively expanding alternative fuel substitution rates (AFR). However, non-uniform secondary airflow profiles and high chlorine/sulfur volatiles create refractory build-up and burner pipe erosion.

## 1. Executive Summary & Thermal Challenges
Alternative fuels such as RDF (Refuse Derived Fuel), tire-derived shreds, and biomass exhibit lower calorific value and irregular particle trajectories compared to pulverized petcoke or coal. As a result, incomplete combustion leads to:
- Excessive CO emissions in preheater exit gases.
- High secondary airflow stratification causing localized kiln shell hot spots.
- Build-up rings in calciner cyclones and kiln inlet arches.

## 2. 3D Computational Fluid Dynamics (CFD) Solution
MacProtec process engineers utilize multi-phase Computational Fluid Dynamics (CFD) to model kiln combustion physics:
1. **Eulerian-Lagrangian Particle Tracking**: Simulating flight trajectories, devolatilization, and burnout times for disparate RDF particle size distributions.
2. **Tertiary Air Momentum Balancing**: Re-aligning tertiary air injection duct angles to create a controlled vortex, maximizing oxygen-fuel contact time in the calciner.
3. **Burner Tip Aerodynamics**: Custom-engineered primary air nozzle geometry to produce a stable, tight flame envelope that protects refractory brick linings.

## 3. Operational Results & Verified Energy Savings
- **AFR Substitution Rate**: Safely increased from 28% to 65% thermal substitution without CO spikes.
- **Specific Heat Consumption**: Reduced overall thermal energy consumption by 14 kcal/kg clinker.
- **Refractory Campaign**: Extended continuous kiln refractory campaign from 9 months to 18 months without unexpected shut-downs.`,
  },
  "3d-laser-scanning-reverse-engineering": {
    id: "art-scan",
    title: "3D Laser Scanning & Reverse Engineering for Brownfield Plant Revamps",
    slug: "3d-laser-scanning-reverse-engineering",
    category: "3D Laser Scanning",
    sector: "Heavy Engineering",
    authorName: "MacProtec Spatial Desk",
    authorTitle: "Lead Laser Scanning Specialist",
    readTime: "5 min read",
    createdAt: "2026-08-03T11:30:00.000Z",
    coverImage: "/images/card_laser_scanning.png",
    views: 380,
    excerpt:
      "Capturing high-density point cloud spatial data eliminates clash errors during brownfield equipment replacements, preheater tower upgrades, and pipe rack retrofits.",
    content: `Brownfield plant modifications frequently suffer from outdated 2D drawings and undocumented field modifications, resulting in expensive site clashes and extended crane downtime during turnarounds.

## 1. Sub-Millimeter Reality Capture
MacProtec utilizes high-precision terrestrial LiDAR scanners and mobile SLAM sensors to digitize congested processing plants:
- Capturing over 2 million spatial coordinates per second with ±1mm accuracy.
- Geo-referencing point clouds to existing plant datum systems and coordinate grids.
- Eliminating manual measurement errors in high-temperature or inaccessible plant elevations.

## 2. Intelligent As-Built 3D CAD Modeling
Raw spatial point clouds are transformed into parametric 3D CAD models:
1. **Clash Detection & Clearances**: Running clash simulations between proposed new equipment and existing structural steelwork or pipe racks.
2. **Spool Pre-Fabrication**: Generating isometric spool drawings with 100% fit assurance prior to site delivery.
3. **Equipment Rigging Simulation**: Verifying crane lifting paths and clearance envelopes during heavy equipment placement.

## 3. Measurable Plant Revamp ROI
- **Site Rework**: Reduced piping and structural field modifications by 94%.
- **Downtime Savings**: Shaved 11 days off critical-path shutdown turnaround schedules.
- **Safety Assurance**: Minimized scaffolding requirements and personnel exposure in elevated plant zones.`,
  },
  "predictive-telemetry-ai-digital-twins": {
    id: "art-digital",
    title: "Predictive Telemetry & AI Digital Twins for Heavy Industrial Equipment",
    slug: "predictive-telemetry-ai-digital-twins",
    category: "CFD & Thermal Simulation",
    sector: "Mining",
    authorName: "Chief Automation Engineer",
    authorTitle: "Digital Twin Solutions Director",
    readTime: "7 min read",
    createdAt: "2026-08-04T14:15:00.000Z",
    coverImage: "/images/industry_40.png",
    views: 524,
    excerpt:
      "Connecting real-time SCADA sensor streams to virtual digital twin replicas enables early detection of bearing micro-fractures, vibration spikes, and thermal anomalies.",
    content: `Predictive maintenance has evolved from scheduled oil sampling to real-time physics-informed digital twins that continuously track thermal and mechanical stress across critical drives.

## 1. Physics-Informed Machine Learning
By combining first-principles thermodynamic and mechanical equations with real-time SCADA sensor streams, MacProtec digital twins predict equipment degradation weeks before alarm thresholds trigger.

## 2. Monitored Critical Equipment Assets
- **Kiln Drive Assemblies & Support Rollers**: Tracking skew adjustments, contact pressures, and journal bearing temperatures.
- **Vertical Roller Mills (VRM)**: Monitoring hydraulic pressure oscillations, table vibration spectrums, and grinding segment wear profiles.
- **High-Pressure Slurry Pumps**: Detecting impeller cavitation and casing wall thinning in real time.

## 3. Operational Benefits & Reliability
- Zero unplanned catastrophic drive failures across monitored assets.
- Optimized maintenance turnaround schedules based on real asset health rather than arbitrary calendar intervals.
- Real-time performance dashboards accessible securely across desktop and mobile operations centers.`,
  },
  "high-density-mine-tailing-dewatering-paste-backfill-pipeline-hydraulics": {
    id: "art-tailings",
    title: "High-Density Mine Tailing Dewatering & Paste Backfill Pipeline Hydraulics",
    slug: "high-density-mine-tailing-dewatering-paste-backfill-pipeline-hydraulics",
    category: "Case Study",
    sector: "Mining",
    authorName: "Senior Process Engineer",
    authorTitle: "Mining Operations Specialist",
    readTime: "8 min read",
    createdAt: "2026-08-01T09:00:00.000Z",
    coverImage: "/images/tailings_management.png",
    views: 295,
    excerpt:
      "Optimizing non-Newtonian slurry rheology, underflow thickener density, and pipeline friction losses in high-pressure paste pumping lines across underground mines.",
    content: `Mine tailings dewatering and underground paste backfill present complex hydraulic challenges due to the non-Newtonian, yield-stress behavior of concentrated mineral slurries.

## 1. Rheology & Pipeline Friction Modeling
MacProtec process engineers develop rheological models based on Bingham plastic and Herschel-Bulkley flow formulations:
- Calculating yield stress thresholds required to initiate and maintain laminar paste flow.
- Determining head loss gradients per 100 meters across varying pipe diameters and solids concentrations (72% to 82% solids by weight).
- Simulating transient hydraulic surges and water hammer conditions during emergency pump trips.

## 2. Process Optimization Results
- Increased thickener underflow density from 64% to 78% solids by weight.
- Recovered over 90% of process water for re-use in mineral grinding circuits.
- Guaranteed line blockage prevention and optimized positive-displacement pump sizing.`,
  },
  "cfd-slag-splashing-electric-arc-furnaces": {
    id: "art-slag",
    title: "Computational Fluid Dynamics for Slag Splashing in Electric Arc Furnaces",
    slug: "cfd-slag-splashing-electric-arc-furnaces",
    category: "CFD & Thermal Simulation",
    sector: "Steel",
    authorName: "Dr. Aris Thorne",
    authorTitle: "Principal CFD Scientist",
    readTime: "9 min read",
    createdAt: "2026-07-28T16:00:00.000Z",
    coverImage: "/images/steel_industry.png",
    views: 340,
    excerpt:
      "Numerical simulation of multi-phase supersonic oxygen lance jets and slag coating dynamics to double refractory lining campaign life in modern steel mini-mills.",
    content: `Slag splashing in electric arc furnaces (EAF) and basic oxygen furnaces (BOF) utilizes high-pressure nitrogen jets to blow molten slag against refractory wall linings, forming a protective sacrificial layer.

## 1. Multi-Phase Supersonic CFD Simulation
MacProtec modeled supersonic nitrogen gas jets interacting with high-temperature molten slag:
- Predicting slag droplet ejection trajectories, velocity vectors, and wall impingement angles.
- Calculating slag solidifying rates as a function of MgO saturation and furnace wall thermal boundary conditions.

## 2. Furnace Campaign Extension Results
- Achieved uniform slag coating thickness of 25-40mm across high-wear furnace knuckle zones.
- Doubled refractory campaign duration, significantly decreasing specific gunning mix consumption.`,
  },
  "zero-guess-retrofit-preheater-cyclone-upgrades": {
    id: "art-cyclone",
    title: "Zero-Guess Retrofit: 3D Point Cloud Integration for Preheater Cyclone Upgrades",
    slug: "zero-guess-retrofit-preheater-cyclone-upgrades",
    category: "Plant Revamp & EPC",
    sector: "Cement",
    authorName: "Vikram Mehta, PE",
    authorTitle: "Senior Plant Engineering Lead",
    readTime: "6 min read",
    createdAt: "2026-07-22T08:45:00.000Z",
    coverImage: "/images/hero_plant.png",
    views: 468,
    excerpt:
      "How sub-millimeter spatial LiDAR capture accelerated cyclone duct pre-fabrication, reducing site turnaround downtime by 14 days on a 5,000 TPD pyro-line.",
    content: `Preheater tower modifications require navigating dense structural steelwork, existing downcomer ducts, and tight crane lifting radii.

## 1. High-Density Spatial Reality Capture
Using terrestrial LiDAR, MacProtec captured 3D spatial point clouds of the 110-meter preheater tower within 48 hours, modeling exact steel elevations, expansion joint positions, and piping runs.

## 2. Prefabrication & Clash Elimination
- Designed replacement cyclone inlet ducts with zero-tolerance clash detection in 3D CAD.
- Enabled 100% off-site pre-assembly and pre-insulation of duct segments.
- Reduced crane turnaround downtime from 28 planned days down to 14 days.`,
  },
  "hydraulic-pulse-stabilization-clinker-coolers-vertical-roller-mills": {
    id: "art-hydraulic",
    title: "Hydraulic Pulse Stabilization for Clinker Coolers & Vertical Roller Mills",
    slug: "hydraulic-pulse-stabilization-clinker-coolers-vertical-roller-mills",
    category: "Engineering Insights",
    sector: "Cement",
    authorName: "David Sterling",
    authorTitle: "Lead Fluid Power Engineer",
    readTime: "7 min read",
    createdAt: "2026-07-18T14:20:00.000Z",
    coverImage: "/images/resources/predictive_solutions.jpg",
    views: 315,
    excerpt:
      "Eliminating pressure shockwaves, accumulator nitrogen loss, and valve hunting to ensure stable grinding bed hydraulics and steady clinker transport.",
    content: `Hydraulic instability in clinker cooler drive cylinders and vertical roller mill (VRM) grinding tensioners causes severe structural vibration, hydraulic seal failure, and erratic motor current draw.

## 1. Root-Cause Hydraulic Diagnostics
MacProtec deployed high-frequency pressure transducers (5 kHz sampling rate) to record transient pressure waveforms across proportional directional control valves and hydro-pneumatic accumulators.

## 2. Technical Interventions & Results
- Re-calibrated proportional valve spool deadband and ramp parameters in PLC control loops.
- Re-charged and upgraded bladder accumulator nitrogen pre-charge pressures for dynamic shock absorption.
- Reduced grinding roller hydraulic pressure ripple by 74%, extending cylinder seal lifespan by 3x.`,
  },
  "waste-heat-recovery-whr-organic-rankine-cycle-flowsheet-optimization": {
    id: "art-whr",
    title: "Waste Heat Recovery (WHR) Organic Rankine Cycle Flowsheet Optimization",
    slug: "waste-heat-recovery-whr-organic-rankine-cycle-flowsheet-optimization",
    category: "Plant Revamp & EPC",
    sector: "Power & Energy",
    authorName: "Elena Rostova, PhD",
    authorTitle: "Thermal Systems Specialist",
    readTime: "8 min read",
    createdAt: "2026-07-12T10:00:00.000Z",
    coverImage: "/images/resources/engineering_services.jpg",
    views: 395,
    excerpt:
      "Thermodynamic flowsheet simulations capture low-enthalpy kiln exhaust heat, generating 4.2 MW of clean captive power while suppressing duct thermal fatigue.",
    content: `Capturing low-to-medium grade waste heat from kiln preheater exhaust and clinker cooler excess air enables cement and steel plants to generate clean captive electricity without burning extra fuel.

## 1. Thermodynamic Flowsheet Modeling
MacProtec evaluated steam Rankine cycles vs. Organic Rankine Cycles (ORC) using thermal flowsheet simulation tools:
- Optimizing organic working fluid selection (Cyclopentane vs. HFC-245fa) for optimal heat transfer at 260°C exhaust gas temperatures.
- Minimizing evaporator pressure drop to prevent increasing ID fan power draw.

## 2. Performance Verification
- Generated 4.2 MW of continuous captive electrical power.
- Reduced overall plant grid power import costs by 19.5%.`,
  },
};

export default function BlogPostDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);

  const [copied, setCopied] = useState(false);

  // Fetch real article from API by slug
  const { data: blogResponse, isLoading } = useGetBlogPostBySlugQuery(slug);
  const { data: allBlogsResponse } = useGetBlogPostsQuery({ published: true });

  const liveArticle = blogResponse?.data;
  const fallbackArticle = KNOWN_ARTICLES[slug];

  // Resolve article
  const article: Partial<BlogPost> = useMemo(() => {
    if (liveArticle) return liveArticle;
    if (fallbackArticle) return fallbackArticle;

    const titleFormatted = slug
      .split("-")
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" ");

    return {
      title: titleFormatted,
      slug,
      category: "Engineering Insights",
      sector: "Heavy Process",
      authorName: "MacProtec Technical Desk",
      authorTitle: "Chief Process Engineer",
      readTime: "6 min read",
      createdAt: new Date().toISOString(),
      coverImage: "/images/hero_plant.png",
      views: 120,
      excerpt: `Technical publication, flow calculations, and detailed process guidelines for ${titleFormatted}.`,
      content: `Full research publication and process engineering analysis for ${titleFormatted}.\n\n## 1. Abstract & Objective\nThis technical guide evaluates key process variables, thermal balances, and operational safety thresholds across heavy industrial processing units.\n\n## 2. Engineering Calculations\nMacProtec Houston engineering desk validates mass-energy balances and aerodynamic flow vectors against verified international EPC standards.\n\n## 3. Results & Plant Implementation\nOptimized equipment configurations yield lower emissions, improved energy recovery, and minimized plant maintenance intervals.`,
    };
  }, [liveArticle, fallbackArticle, slug]);

  // Related articles (excluding current)
  const relatedArticles = useMemo(() => {
    const pool = (allBlogsResponse?.data || Object.values(KNOWN_ARTICLES)) as BlogPost[];
    return pool.filter((a) => a.slug !== slug).slice(0, 3);
  }, [allBlogsResponse, slug]);

  const handleCopyLink = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const formattedDate = article?.createdAt
    ? new Date(article.createdAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "August 2026";

  return (
    <>
      <TechnicalCursor />
      <Header />

      <main className="bg-slate-50 min-h-screen text-slate-800 font-sans selection:bg-rose-500 selection:text-white pb-24">
        {/* ========================================================
            1. TOP NAVIGATION & BREADCRUMB BAR
           ======================================================== */}
        <section className="bg-slate-950 border-b border-slate-800 text-white py-3.5 px-4 sm:px-6 lg:px-8 font-mono text-xs">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <Link
                href="/resources/blog"
                className="inline-flex items-center gap-1.5 bg-slate-900 hover:bg-primary text-slate-200 hover:text-white border border-slate-800 px-3 py-1 transition-colors font-bold uppercase tracking-wider group"
              >
                <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
                <span>All Publications</span>
              </Link>
              <ChevronRight className="w-3.5 h-3.5 text-slate-600 hidden sm:inline" />
              <span className="text-primary font-bold hidden sm:inline truncate max-w-sm">
                {article?.title || "Article"}
              </span>
            </div>

            <div className="flex items-center gap-3 text-[11px]">
              <button
                onClick={handleCopyLink}
                className="inline-flex items-center gap-1.5 bg-slate-900 hover:bg-slate-800 text-slate-300 px-2.5 py-1 border border-slate-800 transition-colors"
                title="Share Article Link"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Share2 className="w-3.5 h-3.5" />}
                <span>{copied ? "Link Copied!" : "Share"}</span>
              </button>
            </div>
          </div>
        </section>

        {/* ========================================================
            2. HERO ARTICLE HEADER & METADATA
           ======================================================== */}
        <section className="bg-white border-b border-slate-200 py-10 sm:py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
            {/* Category & Sector Badges */}
            <div className="flex flex-wrap items-center gap-2 font-mono text-xs">
              <span className="bg-primary text-white font-bold uppercase px-3 py-1 shadow-xs">
                {article?.category || "Engineering Insights"}
              </span>
              {article?.sector && (
                <span className="bg-slate-100 text-slate-700 border border-slate-200 font-bold uppercase px-3 py-1">
                  Sector: {article.sector}
                </span>
              )}
              <span className="text-slate-400 ml-auto hidden sm:inline-flex items-center gap-1">
                <Eye className="w-3.5 h-3.5" />
                <span>{article?.views || 0} Readers</span>
              </span>
            </div>

            {/* Article Headline */}
            <h1 className="font-display font-black text-3xl sm:text-4xl lg:text-5xl text-slate-900 uppercase tracking-tight leading-tight">
              {article?.title}
            </h1>

            {/* Excerpt Lead */}
            {article?.excerpt && (
              <p className="text-base sm:text-lg text-slate-600 font-sans leading-relaxed border-l-2 border-primary pl-4 py-1 italic bg-slate-50">
                {article.excerpt}
              </p>
            )}

            {/* Author Profile & Publishing Date Meta Bar */}
            <div className="flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-slate-100 font-mono text-xs text-slate-600">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold text-xs">
                  <User className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <div className="font-bold text-slate-900">{article?.authorName}</div>
                  <div className="text-[10px] text-slate-500">{article?.authorTitle}</div>
                </div>
              </div>

              <div className="flex items-center gap-4 text-[11px] text-slate-500">
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-primary" />
                  <span>{formattedDate}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-primary" />
                  <span>{article?.readTime || "5 min read"}</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================
            3. MAIN PUBLICATION BODY & TECHNICAL CONTENT
           ======================================================== */}
        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 sm:pt-12 space-y-10">
          {/* Main Cover Image */}
          {article?.coverImage && (
            <div className="relative h-64 sm:h-96 lg:h-[440px] w-full overflow-hidden border border-slate-200 bg-slate-950 shadow-md">
              <Image
                src={article.coverImage}
                alt={article.title || "Technical Publication"}
                fill
                sizes="(max-width: 1024px) 100vw, 900px"
                className="object-cover opacity-95"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent" />
            </div>
          )}

          {/* Article Markdown/Formatted Body Content */}
          <div className="bg-white border border-slate-200 p-6 sm:p-10 lg:p-12 shadow-sm space-y-8 font-sans">
            {article?.content ? (
              <div className="space-y-6 text-slate-700 leading-relaxed text-base">
                {article.content.split("\n\n").map((paragraph, index) => {
                  if (paragraph.startsWith("## ")) {
                    return (
                      <h2
                        key={index}
                        className="font-display font-extrabold text-xl sm:text-2xl text-slate-900 uppercase tracking-tight pt-6 pb-2 border-b border-slate-100 flex items-center gap-2"
                      >
                        <span className="w-2 h-2 bg-primary inline-block" />
                        <span>{paragraph.replace("## ", "")}</span>
                      </h2>
                    );
                  }
                  if (paragraph.startsWith("### ")) {
                    return (
                      <h3
                        key={index}
                        className="font-display font-bold text-lg text-slate-900 uppercase tracking-tight pt-4"
                      >
                        {paragraph.replace("### ", "")}
                      </h3>
                    );
                  }
                  if (paragraph.startsWith("- ")) {
                    const items = paragraph.split("\n- ").map((item) => item.replace("- ", ""));
                    return (
                      <ul key={index} className="space-y-2.5 my-4 pl-2 font-mono text-xs sm:text-sm">
                        {items.map((item, i) => (
                          <li key={i} className="flex items-start gap-2.5">
                            <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                            <span className="text-slate-700">{item}</span>
                          </li>
                        ))}
                      </ul>
                    );
                  }
                  if (paragraph.match(/^\d+\.\s/)) {
                    const items = paragraph.split(/\n\d+\.\s/).filter(Boolean);
                    return (
                      <ol key={index} className="space-y-2.5 my-4 pl-2 font-mono text-xs sm:text-sm">
                        {items.map((item, i) => (
                          <li key={i} className="flex items-start gap-2.5">
                            <span className="font-bold text-primary shrink-0">{i + 1}.</span>
                            <span className="text-slate-700">{item}</span>
                          </li>
                        ))}
                      </ol>
                    );
                  }

                  return (
                    <p key={index} className="leading-relaxed text-slate-700">
                      {paragraph}
                    </p>
                  );
                })}
              </div>
            ) : (
              <p className="text-slate-600">Article content is loading...</p>
            )}

            {/* Additional Inline Gallery Images if available */}
            {article?.images && article.images.length > 0 && (
              <div className="pt-8 border-t border-slate-100 space-y-6">
                <div className="font-mono text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                  <Layers className="w-4 h-4 text-primary" />
                  <span>Technical Visuals & CFD Maps ({article.images.length})</span>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  {article.images.map((img, idx) => (
                    <div key={idx} className="border border-slate-200 bg-slate-950 overflow-hidden">
                      <div className="relative h-48 w-full">
                        <Image
                          src={img.url}
                          alt={img.altText || `Figure ${idx + 1}`}
                          fill
                          className="object-cover"
                        />
                      </div>
                      {img.caption && (
                        <div className="p-3 bg-slate-900 text-slate-300 font-mono text-[11px] border-t border-slate-800">
                          {img.caption}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Author Citation Card */}
          <div className="bg-slate-900 text-white border border-slate-800 p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-primary/20 border border-primary text-primary flex items-center justify-center font-bold text-sm shrink-0">
                <User className="w-6 h-6 text-primary" />
              </div>
              <div className="space-y-0.5">
                <div className="font-display font-bold text-lg text-white uppercase">
                  {article?.authorName}
                </div>
                <div className="font-mono text-xs text-rose-400">{article?.authorTitle}</div>
                <div className="font-mono text-[10px] text-slate-400">
                  MACPROTEC Engineering Consulting • Houston, TX
                </div>
              </div>
            </div>

            <button
              onClick={handleCopyLink}
              className="px-4 py-2 bg-slate-800 hover:bg-primary text-slate-200 hover:text-white border border-slate-700 font-mono text-xs font-bold uppercase transition-colors flex items-center gap-2 shrink-0"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? "Link Copied" : "Cite This Publication"}</span>
            </button>
          </div>

          {/* ========================================================
              4. RELATED PUBLICATIONS GRID
             ======================================================== */}
          {relatedArticles.length > 0 && (
            <div className="space-y-6 pt-6">
              <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                <div className="font-display font-extrabold text-xl text-slate-900 uppercase tracking-tight flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-primary" />
                  <span>Related Technical Publications</span>
                </div>
                <Link
                  href="/resources/blog"
                  className="font-mono text-xs font-bold text-primary hover:underline uppercase"
                >
                  View All →
                </Link>
              </div>

              <div className="grid md:grid-cols-3 gap-5">
                {relatedArticles.map((rel) => (
                  <Link
                    key={rel.id || rel.slug}
                    href={`/resources/blog/${rel.slug}`}
                    className="bg-white border border-slate-200 p-4 hover:border-primary transition-all duration-200 group flex flex-col justify-between"
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-[10px] font-mono text-slate-500">
                        <span className="text-primary font-bold uppercase">{rel.category}</span>
                        <span>{rel.readTime || "5 min read"}</span>
                      </div>
                      <h4 className="font-display font-bold text-sm text-slate-900 uppercase group-hover:text-primary transition-colors line-clamp-2">
                        {rel.title}
                      </h4>
                      <p className="text-xs text-slate-600 line-clamp-2 font-sans">
                        {rel.excerpt}
                      </p>
                    </div>

                    <div className="pt-3 mt-3 border-t border-slate-100 flex items-center justify-between font-mono text-[10px] text-slate-500">
                      <span>{rel.sector || "Heavy Engineering"}</span>
                      <span className="text-primary font-bold group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                        Read →
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* ========================================================
              5. BOTTOM CTA BANNER
             ======================================================== */}
          <div className="bg-slate-900 text-white border border-slate-800 p-8 sm:p-10 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
            <div className="space-y-2 text-center sm:text-left">
              <span className="font-mono text-xs text-rose-400 font-bold uppercase tracking-widest">
                ENGINEERING CONSULTATION
              </span>
              <h3 className="font-display font-extrabold text-2xl text-white uppercase tracking-tight">
                Need Optimization For Your Plant?
              </h3>
              <p className="text-slate-300 text-sm max-w-md">
                Discuss your process bottlenecks, CFD flow challenges, or 3D laser scanning requirements directly with our Houston engineering team.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 shrink-0">
              <Link
                href="/resources/blog"
                className="px-5 py-3 bg-slate-800 border border-slate-700 hover:bg-slate-700 text-slate-200 font-mono text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 justify-center"
              >
                <ArrowLeft className="w-4 h-4 text-slate-400" />
                <span>All Publications</span>
              </Link>

              <Link
                href="/lets-connect"
                className="px-5 py-3 bg-primary hover:bg-rose-700 text-white font-mono text-xs font-bold uppercase tracking-wider transition-all shadow-lg flex items-center gap-2 justify-center"
              >
                <span>Request Consultation</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
