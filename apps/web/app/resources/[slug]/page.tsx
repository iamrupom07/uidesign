"use client";

import { use, useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import TechnicalCursor from "@/components/ui/TechnicalCursor";
import { Reveal } from "@/components/ui/Reveal";
import {
  ArrowLeft,
  Calendar,
  Clock,
  User,
  Tag,
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
} from "lucide-react";
import { BlogPost } from "@repo/types";

// Static fallback dictionary for instant client rendering & offline reliability
const KNOWN_ARTICLES: Record<string, Partial<BlogPost>> = {
  "high-density-mine-tailing-dewatering-paste-backfill-pipeline-hydraulics": {
    id: "art-tailings",
    title: "High-Density Mine Tailing Dewatering & Paste Backfill Pipeline Hydraulics",
    slug: "high-density-mine-tailing-dewatering-paste-backfill-pipeline-hydraulics",
    category: "Case Study",
    sector: "Mining",
    authorName: "Senior Process Engineer",
    authorTitle: "Mining & Tailings Operations Specialist",
    readTime: "8 min read",
    createdAt: "2026-08-01T00:00:00.000Z",
    coverImage: "/images/tailings_management.png",
    excerpt:
      "Optimizing non-Newtonian slurry rheology, underflow density, and pipeline friction losses in high-pressure paste pumping lines.",
    content: `Mine tailings management represents one of the most critical environmental and operational challenges facing modern mining facilities worldwide. As environmental compliance regulations tighten, traditional wet tailing dams are increasingly replaced by high-density paste thickening and underground backfill systems.

## Technical Problem Statement & Rheology
High-density paste backfill involves pumping concentrated slurry mixtures containing high solids percentages (typically 70-85% by weight) over long pipeline distances into underground mine stopes.

Because concentrated mineral slurries exhibit non-Newtonian yield-stress behavior, calculating hydraulic pressure losses and friction factors requires specialized rheological modeling beyond conventional pipe flow equations.

## Computational Modeling & Hydraulic Simulation
MacProtec process engineers utilize non-Newtonian CFD flow simulation and yield-stress rheology algorithms to model pipeline dynamics:

1. **Yield Stress Calibration**: Determining minimum shear stress thresholds required to initiate slurry flow without line blockage.
2. **Pressure Loss Mapping**: Calculating head loss per 100 meters of pipe under varying solids concentrations and flow rates.
3. **Transient Surge & Water Hammer Checks**: Simulating emergency pump shut-off scenarios to prevent pipeline rupture.

## Operational Results & Environmental Achievements
- **Solids Underflow Concentration**: Increased thickener underflow density from 62% to 78% solids by weight.
- **Water Recycling Efficiency**: Recovered up to 92% of process water for re-use in mineral grinding circuits.
- **Pipeline Integrity**: Zero line blockages or surge pressure spikes during 12 months of continuous operations.`,
  },
  "pyroprocessing-optimization-alternative-fuel": {
    id: "art-pyro",
    title: "Pyroprocessing Optimization & Alternative Fuel Combustion in Cement Kilns",
    slug: "pyroprocessing-optimization-alternative-fuel",
    category: "Engineering Insights",
    sector: "Cement",
    authorName: "MacProtec Technical Desk",
    authorTitle: "Chief Pyroprocessing Engineer",
    readTime: "6 min read",
    createdAt: "2026-08-02T00:00:00.000Z",
    coverImage: "/images/cement_industry.png",
    excerpt:
      "Discover how CFD flow modeling and thermal heat balances increase alternative fuel substitution rates up to 65% while preserving kiln shell integrity.",
    content: `In the relentless pursuit of thermal efficiency and carbon reduction, cement plant operators are aggressively expanding alternative fuel substitution rates (AFR). However, non-uniform secondary airflow profiles and high chlorine/sulfur volatiles create refractory build-up and burner pipe erosion.

## CFD & Process Modeling Solution
MacProtec engineers deploy 3-phase Computational Fluid Dynamics (CFD) to optimize burner tip geometry, secondary air mixing, and calciner gas retention times.

## Key Technical Learnings
- **Burner Nozzle Alignment**: Recalibrated tertiary air momentum ratios to eliminate localized hot spots.
- **Volatile Recirculation Control**: Designed calciner cyclone modifications to suppress alkali build-up ring formation.
- **Specific Heat Consumption**: Achieved 65% AFR substitution while reducing overall thermal consumption by 14 kcal/kg clinker.`,
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
    createdAt: "2026-08-03T00:00:00.000Z",
    coverImage: "/images/card_laser_scanning.png",
    excerpt:
      "Capturing high-density point cloud spatial data eliminates clash errors during brownfield equipment replacements and piping retrofits.",
    content: `Brownfield plant retrofits often suffer from outdated as-built drawings, leading to costly site clashes during installation. By deploying sub-millimeter terrestrial 3D laser scanners, MacProtec creates accurate CAD representations of preheater towers, raw mills, and pipe racks prior to procurement.

## Point Cloud to CAD Workflow
1. **High-Density Spatial Scanning**: Millions of laser coordinates captured per station across all plant floors.
2. **Noise Extraction & Alignment**: Geo-referencing coordinates to plant datum points and removing transient equipment clutter.
3. **3D Solid Model Generation**: Converting point clouds into native STEP/DWG intelligent piping components.`,
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
    createdAt: "2026-08-04T00:00:00.000Z",
    coverImage: "/images/industry_40.png",
    excerpt:
      "Connecting real-time SCADA sensor streams to virtual digital twin replicas enables early detection of bearing defects and thermal anomalies.",
    content: `Predictive maintenance transforms plant reliability from reactive firefighting to planned proactive turnarounds. Integrating IoT edge telemetry with digital twin models forecast equipment fatigue weeks before failure occurs.

## Real-Time Telemetry Metrics
By monitoring bearing vibration spectrums, oil temperature gradients, and motor current signatures, MacProtec's digital twin models detect subsurface fatigue micro-fractures in drive assemblies long before catastrophic breakdown.`,
  },
};

export default function ResourceDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);

  const [article, setArticle] = useState<Partial<BlogPost> | null>(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    // Try fetching live article from API database
    async function fetchArticle() {
      try {
        const res = await fetch(`/api/v1/blogs/slug/${slug}`);
        if (res.ok) {
          const json = await res.json();
          if (json.data) {
            setArticle(json.data);
            setLoading(false);
            return;
          }
        }
      } catch (err) {
        console.warn("Falling back to local dictionary for article details", err);
      }

      // Local fallback lookup or title generator
      if (KNOWN_ARTICLES[slug]) {
        setArticle(KNOWN_ARTICLES[slug]);
      } else {
        const titleFormatted = slug
          .split("-")
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(" ");

        setArticle({
          title: titleFormatted,
          slug,
          category: "Engineering Insights",
          sector: "Heavy Process",
          authorName: "MacProtec Technical Desk",
          authorTitle: "Chief Process Engineer",
          readTime: "6 min read",
          createdAt: new Date().toISOString(),
          coverImage: "/images/hero_plant.png",
          excerpt: `Technical publication, flow calculations, and detailed process guidelines for ${titleFormatted}.`,
          content: `Full research publication and process engineering analysis for ${titleFormatted}.\n\n## Abstract & Objective\nThis technical guide evaluates key process variables, thermal balances, and operational safety thresholds across heavy industrial processing units.`,
        });
      }
      setLoading(false);
    }

    fetchArticle();
  }, [slug]);

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
        {/* DOSSIER BREADCRUMB & BACK OPTION BAR */}
        <section className="bg-slate-900 border-b border-slate-800 text-white py-3.5 px-6 lg:px-8 font-mono text-xs">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Link
                href="/resources"
                className="inline-flex items-center gap-1.5 bg-slate-800 hover:bg-primary text-slate-200 hover:text-white border border-slate-700 px-3 py-1 transition-all rounded-none font-mono text-xs font-bold uppercase tracking-wider group"
              >
                <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
                <span>Back to Resources</span>
              </Link>
              <ChevronRight className="w-3.5 h-3.5 text-slate-600 hidden sm:inline" />
              <span className="text-primary font-bold hidden sm:inline truncate max-w-xs">
                {article?.title || "Article Details"}
              </span>
            </div>

            <div className="hidden md:flex items-center gap-3 text-[10px] text-slate-400">
              <span className="font-bold text-rose-400 uppercase tracking-widest">PUBLICATION</span>
              <span>•</span>
              <span className="uppercase font-bold tracking-wider">TECHNICAL DOSSIER</span>
            </div>
          </div>
        </section>

        {/* HERO ARTICLE HEADER */}
        <section className="bg-white border-b border-slate-200 py-12 sm:py-16">
          <div className="max-w-4xl mx-auto px-6 lg:px-8 space-y-6">
            {/* Category & Sector Badges */}
            <Reveal>
              <div className="flex flex-wrap items-center gap-2 font-mono text-xs">
                <span className="bg-rose-50 text-primary border border-rose-200 font-bold uppercase px-3 py-1">
                  {article?.category || "Engineering Insights"}
                </span>
                {article?.sector && (
                  <span className="bg-slate-100 text-slate-700 border border-slate-200 font-bold uppercase px-3 py-1">
                    Sector: {article.sector}
                  </span>
                )}
              </div>
            </Reveal>

            {/* Article Title */}
            <Reveal>
              <h1 className="font-display font-black text-3xl sm:text-4xl lg:text-5xl text-slate-900 uppercase tracking-tight leading-tight">
                {article?.title}
              </h1>
            </Reveal>

            {/* Excerpt Summary */}
            {article?.excerpt && (
              <Reveal>
                <p className="text-slate-600 font-sans text-base sm:text-lg leading-relaxed border-l-4 border-primary pl-4 py-1 bg-slate-50/80">
                  {article.excerpt}
                </p>
              </Reveal>
            )}

            {/* Author Profile, Date & Share Action Bar */}
            <Reveal>
              <div className="pt-6 border-t border-slate-100 flex flex-wrap items-center justify-between gap-6 font-mono text-xs">
                {/* Author Info */}
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-full bg-primary text-white font-mono font-bold text-sm flex items-center justify-center shadow-md border border-rose-200 shrink-0">
                    <User className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="font-bold text-slate-900 text-sm">
                      {article?.authorName || "MacProtec Technical Desk"}
                    </div>
                    <div className="text-slate-500 text-[11px]">
                      {article?.authorTitle || "Chief Process Engineer"}
                    </div>
                  </div>
                </div>

                {/* Date, Read Time & Share */}
                <div className="flex items-center gap-4 text-slate-500">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-4 h-4 text-primary" />
                    <span>{formattedDate}</span>
                  </div>
                  <span>•</span>
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-4 h-4 text-primary" />
                    <span>{article?.readTime || "5 min read"}</span>
                  </div>

                  <button
                    onClick={handleCopyLink}
                    className="ml-2 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-300 font-bold uppercase transition-colors flex items-center gap-1.5"
                    title="Share Article Link"
                  >
                    <Share2 className="w-3.5 h-3.5 text-primary" />
                    <span>{copied ? "Link Copied ✓" : "Share"}</span>
                  </button>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* COVER PHOTO BANNER */}
        {article?.coverImage && (
          <section className="max-w-4xl mx-auto px-6 lg:px-8 -mt-6">
            <Reveal>
              <div className="relative h-[320px] sm:h-[450px] w-full rounded-none overflow-hidden border border-slate-200 shadow-xl bg-slate-950 group">
                <Image
                  src={article.coverImage}
                  alt={article.title || "Technical Article Cover Image"}
                  fill
                  priority
                  className="object-cover group-hover:scale-103 transition-transform duration-700 opacity-95"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-4 left-4 z-10 bg-slate-950/90 border border-slate-800 text-white font-mono text-[10px] font-bold px-3 py-1 uppercase tracking-widest backdrop-blur-md">
                  FIGURE 1.0 // MACPROTEC TECHNICAL FIELD REPAIR & OPTIMIZATION
                </div>
              </div>
            </Reveal>
          </section>
        )}

        {/* ARTICLE BODY CONTENT & SIDEBAR */}
        <section className="max-w-4xl mx-auto px-6 lg:px-8 mt-12 space-y-12">
          {/* Main Article Content */}
          <Reveal>
            <div className="bg-white border border-slate-200 p-8 sm:p-12 shadow-sm space-y-8 text-slate-800 font-sans text-base leading-relaxed">
              {article?.content?.split("\n\n").map((paragraph, index) => {
                // Render Section Headings
                if (paragraph.startsWith("## ")) {
                  return (
                    <h2
                      key={index}
                      className="font-display font-extrabold text-2xl uppercase tracking-tight text-slate-900 border-b border-slate-200 pb-3 mt-8 pt-2"
                    >
                      {paragraph.replace("## ", "")}
                    </h2>
                  );
                }

                if (paragraph.startsWith("### ")) {
                  return (
                    <h3
                      key={index}
                      className="font-display font-extrabold text-xl uppercase tracking-tight text-primary mt-6"
                    >
                      {paragraph.replace("### ", "")}
                    </h3>
                  );
                }

                // Render Bulleted Lists
                if (paragraph.startsWith("- ")) {
                  const items = paragraph.split("\n- ");
                  return (
                    <ul key={index} className="space-y-2.5 my-4 bg-slate-50 p-5 border-l-4 border-primary">
                      {items.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2.5 text-slate-700">
                          <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                          <span>{item.replace("- ", "")}</span>
                        </li>
                      ))}
                    </ul>
                  );
                }

                // Render Paragraphs
                return (
                  <p key={index} className="text-slate-700 font-sans leading-relaxed">
                    {paragraph}
                  </p>
                );
              })}

              {/* TECHNICAL METRICS & CLASSIFICATION FOOTER */}
              <div className="mt-12 pt-8 border-t border-slate-200 grid sm:grid-cols-2 gap-6 bg-slate-50 p-6">
                <div>
                  <h4 className="font-mono text-xs font-bold text-primary uppercase tracking-wider mb-3 flex items-center gap-1.5">
                    <FileCheck className="w-4 h-4" />
                    TECHNICAL CLASSIFICATION
                  </h4>
                  <ul className="font-mono text-xs text-slate-600 space-y-2">
                    <li>
                      <strong className="text-slate-900">Standard:</strong> ASME SEC VIII / API
                    </li>
                    <li>
                      <strong className="text-slate-900">Compiler:</strong> MacProtec Engineering
                    </li>
                    <li>
                      <strong className="text-slate-900">Peer Reviewed:</strong> Verified ✓
                    </li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-mono text-xs font-bold text-primary uppercase tracking-wider mb-3 flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4" />
                    APPLIED METHODOLOGY
                  </h4>
                  <ul className="font-mono text-xs text-slate-600 space-y-2">
                    <li>
                      <strong className="text-slate-900">CFD Mesh:</strong> Polyhedral 3-Phase
                    </li>
                    <li>
                      <strong className="text-slate-900">Field Scanning:</strong> 3D Spatial LiDAR
                    </li>
                    <li>
                      <strong className="text-slate-900">Verification:</strong> SCADA Telemetry
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </Reveal>

          {/* BOTTOM NAVIGATION & CONSULTATION CTA */}
          <Reveal>
            <div className="bg-slate-900 text-white border border-slate-800 p-8 sm:p-10 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-2xl">
              <div className="space-y-2">
                <span className="font-mono text-xs text-rose-400 font-bold uppercase tracking-widest">
                  CONSULTATION REQUEST
                </span>
                <h3 className="font-display font-extrabold text-2xl sm:text-3xl text-white uppercase tracking-tight">
                  Need Similar Optimization For Your Plant?
                </h3>
                <p className="text-slate-200 text-sm max-w-md">
                  Discuss your process bottlenecks, CFD flow requirements, or 3D scanning projects directly with our Houston engineering team.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 shrink-0">
                <Link
                  href="/resources"
                  className="px-6 py-3.5 bg-slate-800 border border-slate-700 hover:bg-slate-700 text-slate-200 font-mono text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 justify-center"
                >
                  <ArrowLeft className="w-4 h-4 text-slate-400" />
                  <span>Back to Articles</span>
                </Link>

                <Link
                  href="/lets-connect"
                  className="px-6 py-3.5 bg-primary hover:bg-rose-700 text-white font-mono text-xs font-bold uppercase tracking-wider transition-all shadow-lg flex items-center gap-2 justify-center"
                >
                  <span>Request Consultation</span>
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

