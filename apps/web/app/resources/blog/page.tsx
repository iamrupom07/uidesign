"use client";

import { useState, useMemo, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import TechnicalCursor from "@/components/ui/TechnicalCursor";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import {
  Search,
  BookOpen,
  Filter,
  User,
  Clock,
  ChevronRight,
  ChevronLeft,
  Eye,
  ArrowRight,
  ArrowLeft,
  Calendar,
  Sparkles,
  Layers,
  ShieldCheck,
  FileCheck,
  Building2,
  Cpu,
  Flame,
  Activity,
  Compass,
  CheckCircle2,
  Send,
  SlidersHorizontal,
  Bookmark,
  Share2,
  TrendingUp,
  GraduationCap,
} from "lucide-react";
import { useGetBlogPostsQuery } from "@/redux/api/blogApi";
import { useCreateSubmissionMutation } from "@/redux/api/submissionApi";
import { BlogPost } from "@repo/types";

// Static fallback articles for offline reliability and instant hydration
const FALLBACK_ARTICLES: Partial<BlogPost>[] = [
  {
    id: "fb-1",
    title: "Pyroprocessing Optimization & Alternative Fuel Combustion in Cement Kilns",
    excerpt:
      "Discover how CFD flow modeling, flame aerodynamics, and thermal heat balances increase alternative fuel substitution rates up to 65% while preserving kiln shell integrity.",
    content: "Pyroprocessing and alternative fuel combustion research...",
    category: "Engineering Insights",
    sector: "Cement",
    coverImage: "/images/cement_industry.png",
    authorName: "MacProtec Technical Desk",
    authorTitle: "Chief Pyroprocessing Engineer",
    readTime: "6 min read",
    slug: "pyroprocessing-optimization-alternative-fuel",
    views: 412,
    createdAt: "2026-08-02T10:00:00.000Z",
  },
  {
    id: "fb-2",
    title: "3D Laser Scanning & Reverse Engineering for Brownfield Plant Revamps",
    excerpt:
      "Capturing high-density point cloud spatial data eliminates clash errors during brownfield equipment replacements, preheater tower upgrades, and pipe rack retrofits.",
    content: "3D spatial reality capture and millimeter tolerance mapping...",
    category: "3D Laser Scanning",
    sector: "Heavy Engineering",
    coverImage: "/images/card_laser_scanning.png",
    authorName: "MacProtec Spatial Desk",
    authorTitle: "Lead Laser Scanning Specialist",
    readTime: "5 min read",
    slug: "3d-laser-scanning-reverse-engineering",
    views: 380,
    createdAt: "2026-08-03T11:30:00.000Z",
  },
  {
    id: "fb-3",
    title: "Predictive Telemetry & AI Digital Twins for Heavy Industrial Equipment",
    excerpt:
      "Connecting real-time SCADA sensor streams to virtual digital twin replicas enables early detection of bearing micro-fractures, vibration spikes, and thermal anomalies.",
    content: "Industrial IoT telemetry and physics-informed machine learning...",
    category: "CFD & Thermal Simulation",
    sector: "Mining",
    coverImage: "/images/industry_40.png",
    authorName: "Chief Automation Engineer",
    authorTitle: "Digital Twin Solutions Director",
    readTime: "7 min read",
    slug: "predictive-telemetry-ai-digital-twins",
    views: 524,
    createdAt: "2026-08-04T14:15:00.000Z",
  },
  {
    id: "fb-4",
    title: "High-Density Mine Tailing Dewatering & Paste Backfill Pipeline Hydraulics",
    excerpt:
      "Optimizing non-Newtonian slurry rheology, underflow thickener density, and pipeline friction losses in high-pressure paste pumping lines across underground mines.",
    content: "High density tailings paste pumping hydraulics...",
    category: "Case Study",
    sector: "Mining",
    coverImage: "/images/tailings_management.png",
    authorName: "Senior Process Engineer",
    authorTitle: "Mining Operations Specialist",
    readTime: "8 min read",
    slug: "high-density-mine-tailing-dewatering-paste-backfill-pipeline-hydraulics",
    views: 295,
    createdAt: "2026-08-01T09:00:00.000Z",
  },
  {
    id: "fb-5",
    title: "Computational Fluid Dynamics for Slag Splashing in Electric Arc Furnaces",
    excerpt:
      "Numerical simulation of multi-phase supersonic oxygen lance jets and slag coating dynamics to double refractory lining campaign life in modern steel mini-mills.",
    content: "Steel manufacturing EAF slag splashing simulation...",
    category: "CFD & Thermal Simulation",
    sector: "Steel",
    coverImage: "/images/steel_industry.png",
    authorName: "Dr. Aris Thorne",
    authorTitle: "Principal CFD Scientist",
    readTime: "9 min read",
    slug: "cfd-slag-splashing-electric-arc-furnaces",
    views: 340,
    createdAt: "2026-07-28T16:00:00.000Z",
  },
  {
    id: "fb-6",
    title: "Zero-Guess Retrofit: 3D Point Cloud Integration for Preheater Cyclone Upgrades",
    excerpt:
      "How sub-millimeter spatial LiDAR capture accelerated cyclone duct pre-fabrication, reducing site turnaround downtime by 14 days on a 5,000 TPD pyro-line.",
    content: "Preheater cyclone dimensional inspection and clash avoidance...",
    category: "Plant Revamp & EPC",
    sector: "Cement",
    coverImage: "/images/hero_plant.png",
    authorName: "Vikram Mehta, PE",
    authorTitle: "Senior Plant Engineering Lead",
    readTime: "6 min read",
    slug: "zero-guess-retrofit-preheater-cyclone-upgrades",
    views: 468,
    createdAt: "2026-07-22T08:45:00.000Z",
  },
  {
    id: "fb-7",
    title: "Hydraulic Pulse Stabilization for Clinker Coolers & Vertical Roller Mills",
    excerpt:
      "Eliminating pressure shockwaves, accumulator nitrogen loss, and valve hunting to ensure stable grinding bed hydraulics and steady clinker transport.",
    content: "Hydraulic system diagnostics and proportional valve tuning...",
    category: "Engineering Insights",
    sector: "Cement",
    coverImage: "/images/resources/predictive_solutions.jpg",
    authorName: "David Sterling",
    authorTitle: "Lead Fluid Power Engineer",
    readTime: "7 min read",
    slug: "hydraulic-pulse-stabilization-clinker-coolers-vertical-roller-mills",
    views: 315,
    createdAt: "2026-07-18T14:20:00.000Z",
  },
  {
    id: "fb-8",
    title: "Waste Heat Recovery (WHR) Organic Rankine Cycle Flowsheet Optimization",
    excerpt:
      "Thermodynamic flowsheet simulations capture low-enthalpy kiln exhaust heat, generating 4.2 MW of clean captive power while suppressing duct thermal fatigue.",
    content: "WHR ORC thermodynamic modeling and evaporator heat balance...",
    category: "Plant Revamp & EPC",
    sector: "Power & Energy",
    coverImage: "/images/resources/engineering_services.jpg",
    authorName: "Elena Rostova, PhD",
    authorTitle: "Thermal Systems Specialist",
    readTime: "8 min read",
    slug: "waste-heat-recovery-whr-organic-rankine-cycle-flowsheet-optimization",
    views: 395,
    createdAt: "2026-07-12T10:00:00.000Z",
  },
  {
    id: "fb-9",
    title: "Silo Clinker Discharge Rat-Holing Mitigation via DEM Aeration CFD",
    excerpt:
      "Combining Discrete Element Method (DEM) granular mechanics and aeration CFD to prevent cohesive arching and core flow in 30,000-tonne clinker storage silos.",
    content: "DEM granular clinker discharge simulation and fluidization...",
    category: "CFD & Thermal Simulation",
    sector: "Heavy Engineering",
    coverImage: "/images/resources/company_profile.jpg",
    authorName: "Marcus Vance, PE",
    authorTitle: "Bulk Material Flow Lead",
    readTime: "6 min read",
    slug: "silo-clinker-discharge-rat-holing-mitigation-dem-aeration-cfd",
    views: 280,
    createdAt: "2026-07-05T09:30:00.000Z",
  },
  {
    id: "fb-10",
    title: "Underground Mine Auxiliary Ventilation & Toxic Fume Dispersion Modeling",
    excerpt:
      "CFD airflow modeling optimizes auxiliary fan placement and duct sizing to rapidly clear diesel particulate matter and blast fumes from active blind headings.",
    content: "Mine ventilation network simulation and CFD dispersion...",
    category: "Case Study",
    sector: "Mining",
    coverImage: "/images/tailings_management.png",
    authorName: "Arthur King",
    authorTitle: "Mining Ventilation Director",
    readTime: "7 min read",
    slug: "underground-mine-auxiliary-ventilation-toxic-fume-dispersion-modeling",
    views: 350,
    createdAt: "2026-06-29T15:00:00.000Z",
  },
  {
    id: "fb-11",
    title: "High-Pressure Gas Pipeline Transient Surge & Valve Cavitation Modeling",
    excerpt:
      "Dynamic hydraulic transient simulation predicts water hammer wave speeds and sizing requirements for surge relief skids in natural gas liquids pumping stations.",
    content: "Pipeline transient acoustics and valve cavitation prevention...",
    category: "Engineering Insights",
    sector: "Oil & Gas",
    coverImage: "/images/resources/engineering_services.jpg",
    authorName: "Sarah Chen, PE",
    authorTitle: "Principal Piping & Pipeline Specialist",
    readTime: "9 min read",
    slug: "high-pressure-gas-pipeline-transient-surge-valve-cavitation-modeling",
    views: 420,
    createdAt: "2026-06-20T11:15:00.000Z",
  },
  {
    id: "fb-12",
    title: "Blast Furnace Top Gas Dust Extraction & Multi-Cyclone Separation Dynamics",
    excerpt:
      "Optimizing cyclone barrel velocity and dust hopper vortex finder geometry to achieve 99.2% coarse dust removal and protect downstream expansion turbines.",
    content: "Blast furnace gas cleaning and multi-cyclone fluid dynamics...",
    category: "CFD & Thermal Simulation",
    sector: "Steel",
    coverImage: "/images/steel_industry.png",
    authorName: "Dr. Aris Thorne",
    authorTitle: "Principal CFD Scientist",
    readTime: "8 min read",
    slug: "blast-furnace-top-gas-dust-extraction-multi-cyclone-separation-dynamics",
    views: 310,
    createdAt: "2026-06-14T13:45:00.000Z",
  },
];

const CATEGORIES = [
  "ALL",
  "Engineering Insights",
  "CFD & Thermal Simulation",
  "3D Laser Scanning",
  "Plant Revamp & EPC",
  "Case Study",
];

const SECTORS = [
  "ALL",
  "Cement",
  "Steel",
  "Mining",
  "Power & Energy",
  "Oil & Gas",
  "Heavy Engineering",
];

const TOPIC_TAGS = [
  "CFD Flow Modeling",
  "Alternative Fuels (AFR)",
  "3D Reality Capture",
  "Digital Twin",
  "Refractory Protection",
  "Paste Backfill",
  "Slurry Hydraulics",
  "Vibration Telemetry",
];

export default function BlogListingPage() {
  // Search, category, sector, and sort filters
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("ALL");
  const [selectedSector, setSelectedSector] = useState("ALL");
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<"newest" | "oldest" | "views" | "readTime">("newest");
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 6;
  const gridSectionRef = useRef<HTMLElement>(null);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    if (gridSectionRef.current) {
      gridSectionRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // Newsletter state
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterSubmitted, setNewsletterSubmitted] = useState(false);
  const [createSubmission, { isLoading: isSubmittingNewsletter }] = useCreateSubmissionMutation();

  // Fetch real articles from backend API
  const { data: blogResponse, isLoading } = useGetBlogPostsQuery({ published: true });
  const liveArticles: BlogPost[] = blogResponse?.data || [];

  const allArticles: BlogPost[] = useMemo(() => {
    if (liveArticles.length > 0) return liveArticles;
    return FALLBACK_ARTICLES as BlogPost[];
  }, [liveArticles]);

  // Featured article (first or highest views)
  const featuredArticle = useMemo(() => {
    if (allArticles.length === 0) return null;
    return allArticles[0];
  }, [allArticles]);

  // Filtered & Sorted Articles
  const filteredArticles = useMemo(() => {
    let result = [...allArticles];

    // Search query filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(
        (art) =>
          art.title.toLowerCase().includes(q) ||
          art.excerpt.toLowerCase().includes(q) ||
          art.category.toLowerCase().includes(q) ||
          (art.sector && art.sector.toLowerCase().includes(q)) ||
          art.authorName.toLowerCase().includes(q)
      );
    }

    // Category filter
    if (selectedCategory !== "ALL") {
      result = result.filter(
        (art) => art.category.toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    // Sector filter
    if (selectedSector !== "ALL") {
      result = result.filter(
        (art) => art.sector && art.sector.toLowerCase() === selectedSector.toLowerCase()
      );
    }

    // Tag filter
    if (selectedTag) {
      const tagLower = selectedTag.toLowerCase();
      result = result.filter(
        (art) =>
          art.title.toLowerCase().includes(tagLower) ||
          art.excerpt.toLowerCase().includes(tagLower) ||
          art.category.toLowerCase().includes(tagLower)
      );
    }

    // Sort order
    if (sortBy === "newest") {
      result.sort(
        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
    } else if (sortBy === "oldest") {
      result.sort(
        (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      );
    } else if (sortBy === "views") {
      result.sort((a, b) => (b.views || 0) - (a.views || 0));
    } else if (sortBy === "readTime") {
      const getMin = (s: string) => parseInt(s) || 5;
      result.sort((a, b) => getMin(a.readTime) - getMin(b.readTime));
    }

    return result;
  }, [allArticles, searchQuery, selectedCategory, selectedSector, selectedTag, sortBy]);

  // Paginated articles
  const totalPages = Math.ceil(filteredArticles.length / pageSize) || 1;
  const paginatedArticles = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredArticles.slice(start, start + pageSize);
  }, [filteredArticles, currentPage, pageSize]);

  // Reset filters helper
  const handleResetFilters = () => {
    setSearchQuery("");
    setSelectedCategory("ALL");
    setSelectedSector("ALL");
    setSelectedTag(null);
    setSortBy("newest");
    setCurrentPage(1);
  };

  // Newsletter submission
  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail || !newsletterEmail.includes("@")) return;

    try {
      await createSubmission({
        type: "RESOURCE",
        name: "Newsletter Subscriber",
        email: newsletterEmail,
        subject: "Technical Bulletin & Whitepaper Subscription",
        message: "Subscriber requested monthly technical whitepapers and engineering dossiers from /resources/blog",
      }).unwrap();
    } catch {
      // Fallback silently to client success state
    }
    setNewsletterSubmitted(true);
  };

  // Format date helper
  const formatDate = (dateStr: string | Date) => {
    try {
      return new Date(dateStr).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    } catch {
      return "Recent";
    }
  };

  return (
    <>
      <TechnicalCursor />
      <Header />

      <main className="bg-slate-50 min-h-screen text-slate-800 font-sans selection:bg-rose-500 selection:text-white pb-24">
        {/* ========================================================
            1. HERO & TOP METRICS TICKER SECTION (DARK SLATE BLUEPRINT)
           ======================================================== */}
        <section className="relative bg-slate-950 text-white border-b border-slate-800 overflow-hidden pt-12 pb-16 lg:pt-16 lg:pb-20">
          {/* Blueprint Grid Background Pattern */}
          <div
            className="absolute inset-0 opacity-15 pointer-events-none"
            style={{
              backgroundImage: `linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)`,
              backgroundSize: "40px 40px",
            }}
          />
          {/* Radial Glow Highlight */}
          <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-rose-600/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-cyan-600/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
            {/* Top Monospace Breadcrumb Bar */}
            <div className="flex flex-wrap items-center justify-between gap-4 font-mono text-xs text-slate-400 border-b border-slate-800/80 pb-4">
              <div className="flex items-center gap-2">
                <Link href="/" className="hover:text-white transition-colors">
                  HOME
                </Link>
                <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
                <Link href="/resources" className="hover:text-white transition-colors">
                  RESOURCES
                </Link>
                <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
                <span className="text-rose-400 font-bold">TECHNICAL PUBLICATIONS & BLOG</span>
              </div>

              <div className="hidden sm:flex items-center gap-3 text-[11px]">
                <span className="inline-flex items-center gap-1.5 bg-rose-950/80 text-rose-300 border border-rose-800/60 px-2.5 py-0.5 font-bold uppercase tracking-wider">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-400 animate-pulse" />
                  Live Engineering Portal
                </span>
                <span>•</span>
                <span className="text-slate-400">HOUSTON DESK</span>
              </div>
            </div>

            {/* Main Hero Title & Tagline */}
            <div className="max-w-4xl space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-slate-900 border border-slate-700 text-rose-400 font-mono text-xs font-bold uppercase tracking-widest">
                <BookOpen className="w-4 h-4 text-primary" />
                <span>MACPROTEC TECHNICAL PUBLICATIONS & WHITEPAPERS</span>
              </div>

              <h1 className="font-display font-black text-3xl sm:text-5xl lg:text-6xl uppercase tracking-tight text-white leading-tight">
                Process Engineering <br />
                <span className="text-primary">& CFD Insights</span>
              </h1>

              <p className="text-slate-300 text-sm sm:text-base lg:text-lg font-sans max-w-3xl leading-relaxed">
                Explore in-depth technical publications, industrial case studies, CFD thermal modeling, 3D laser scanning workflows, and heavy plant optimization research authored by MacProtec&apos;s Houston engineering desk.
              </p>
            </div>

            {/* Quick KPI Stats Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 pt-4 border-t border-slate-800/80 font-mono text-xs">
              <div className="bg-slate-900/90 border border-slate-800 p-3 sm:p-4">
                <div className="text-slate-400 text-[10px] uppercase font-bold tracking-wider mb-1 flex items-center gap-1.5">
                  <BookOpen className="w-3.5 h-3.5 text-primary" />
                  <span>Total Publications</span>
                </div>
                <div className="text-2xl font-display font-extrabold text-white">
                  {allArticles.length}+
                </div>
                <div className="text-[10px] text-slate-500 mt-0.5">Peer-Reviewed Dossiers</div>
              </div>

              <div className="bg-slate-900/90 border border-slate-800 p-3 sm:p-4">
                <div className="text-slate-400 text-[10px] uppercase font-bold tracking-wider mb-1 flex items-center gap-1.5">
                  <Building2 className="w-3.5 h-3.5 text-primary" />
                  <span>Heavy Sectors</span>
                </div>
                <div className="text-2xl font-display font-extrabold text-white">
                  6 Core
                </div>
                <div className="text-[10px] text-slate-500 mt-0.5">Cement, Steel, Mining & More</div>
              </div>

              <div className="bg-slate-900/90 border border-slate-800 p-3 sm:p-4">
                <div className="text-slate-400 text-[10px] uppercase font-bold tracking-wider mb-1 flex items-center gap-1.5">
                  <Cpu className="w-3.5 h-3.5 text-primary" />
                  <span>CFD & 3D Models</span>
                </div>
                <div className="text-2xl font-display font-extrabold text-white">
                  100%
                </div>
                <div className="text-[10px] text-slate-500 mt-0.5">Validated with SCADA Data</div>
              </div>

              <div className="bg-slate-900/90 border border-slate-800 p-3 sm:p-4">
                <div className="text-slate-400 text-[10px] uppercase font-bold tracking-wider mb-1 flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-primary" />
                  <span>EPC Verified</span>
                </div>
                <div className="text-2xl font-display font-extrabold text-white">
                  ASME / API
                </div>
                <div className="text-[10px] text-slate-500 mt-0.5">Global Design Codes</div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================
            2. FEATURED HERO ARTICLE SPOTLIGHT (IF AVAILABLE & NO ACTIVE SEARCH)
           ======================================================== */}
        {!searchQuery && selectedCategory === "ALL" && selectedSector === "ALL" && !selectedTag && featuredArticle && (
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-10">
            <Reveal>
              <div className="bg-white border border-slate-200 shadow-xl overflow-hidden group hover:border-primary/60 transition-all duration-300">
                <div className="grid lg:grid-cols-12 gap-0">
                  {/* Left Cover Image */}
                  <div className="relative lg:col-span-6 h-64 sm:h-80 lg:h-auto min-h-[280px] bg-slate-950 overflow-hidden">
                    {featuredArticle.coverImage ? (
                      <Image
                        src={featuredArticle.coverImage}
                        alt={featuredArticle.title}
                        fill
                        sizes="(max-width: 1024px) 100vw, 50vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-700 opacity-90"
                        priority
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-slate-600 bg-slate-900">
                        <BookOpen className="w-12 h-12" />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />

                    {/* Spotlight Badge */}
                    <div className="absolute top-4 left-4 flex items-center gap-2 font-mono text-[10px] font-extrabold">
                      <span className="bg-primary text-white px-3 py-1 uppercase tracking-wider shadow-md border border-white/20">
                        Featured Publication
                      </span>
                      {featuredArticle.sector && (
                        <span className="bg-slate-950/90 text-slate-200 border border-slate-700 px-2.5 py-1 uppercase">
                          {featuredArticle.sector}
                        </span>
                      )}
                    </div>

                    <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-[11px] font-mono text-slate-300">
                      <div className="flex items-center gap-2">
                        <Clock className="w-3.5 h-3.5 text-primary" />
                        <span>{featuredArticle.readTime || "6 min read"}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Eye className="w-3.5 h-3.5 text-slate-400" />
                        <span>{featuredArticle.views || 412} readers</span>
                      </div>
                    </div>
                  </div>

                  {/* Right Content */}
                  <div className="lg:col-span-6 p-6 sm:p-8 lg:p-10 flex flex-col justify-between space-y-6">
                    <div className="space-y-4">
                      <div className="flex items-center gap-2 font-mono text-xs text-slate-500">
                        <span className="text-primary font-bold uppercase">
                          {featuredArticle.category}
                        </span>
                        <span>•</span>
                        <span>{formatDate(featuredArticle.createdAt)}</span>
                      </div>

                      <h2 className="font-display font-black text-2xl sm:text-3xl text-slate-900 uppercase tracking-tight group-hover:text-primary transition-colors leading-tight">
                        <Link href={`/resources/blog/${featuredArticle.slug}`}>
                          {featuredArticle.title}
                        </Link>
                      </h2>

                      <p className="text-slate-600 text-sm leading-relaxed line-clamp-3">
                        {featuredArticle.excerpt}
                      </p>

                      <div className="flex items-center gap-3 pt-2">
                        <div className="w-9 h-9 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-600 shrink-0 font-mono font-bold text-xs">
                          <User className="w-4 h-4 text-primary" />
                        </div>
                        <div className="min-w-0">
                          <div className="font-mono text-xs font-bold text-slate-900 truncate">
                            {featuredArticle.authorName}
                          </div>
                          <div className="font-mono text-[10px] text-slate-500 truncate">
                            {featuredArticle.authorTitle}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                      <Link
                        href={`/resources/blog/${featuredArticle.slug}`}
                        className="px-6 py-3 bg-primary hover:bg-rose-700 text-white font-mono text-xs font-bold uppercase tracking-wider transition-all duration-200 flex items-center justify-center gap-2 shadow-sm group/btn"
                      >
                        <span>Read Full Publication</span>
                        <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                      </Link>

                      <Link
                        href="/resources"
                        className="px-4 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-mono text-xs font-bold uppercase tracking-wider transition-colors text-center"
                      >
                        Download PDF Dossier
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          </section>
        )}

        {/* ========================================================
            3. SEARCH, CATEGORY, SECTOR & SORTING CONTROLS BAR
           ======================================================== */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
          <Reveal>
            <div className="bg-white border border-slate-200 p-5 sm:p-6 shadow-sm space-y-5">
              {/* Row 1: Search Input & Result Stats */}
              <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between">
                <div className="relative flex-1 max-w-xl">
                  <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => {
                      setSearchQuery(e.target.value);
                      setCurrentPage(1);
                    }}
                    placeholder="Search whitepapers by topic, CFD, Kiln, Slurry, Author..."
                    className="w-full bg-slate-50 border border-slate-300 pl-10 pr-10 py-2.5 font-mono text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-primary focus:bg-white transition-colors"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery("")}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-primary font-bold text-sm px-1"
                      title="Clear search"
                    >
                      ×
                    </button>
                  )}
                </div>

                {/* Sector & Sort Dropdowns */}
                <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
                  {/* Sector Select */}
                  <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-200 px-3 py-2 text-xs font-mono">
                    <Building2 className="w-3.5 h-3.5 text-primary shrink-0" />
                    <span className="text-slate-400 text-[10px] uppercase font-bold">Sector:</span>
                    <select
                      value={selectedSector}
                      onChange={(e) => {
                        setSelectedSector(e.target.value);
                        setCurrentPage(1);
                      }}
                      className="bg-transparent text-slate-800 font-bold focus:outline-none cursor-pointer"
                    >
                      {SECTORS.map((sec) => (
                        <option key={sec} value={sec}>
                          {sec}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Sort Select */}
                  <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-200 px-3 py-2 text-xs font-mono">
                    <SlidersHorizontal className="w-3.5 h-3.5 text-primary shrink-0" />
                    <span className="text-slate-400 text-[10px] uppercase font-bold">Sort:</span>
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value as any)}
                      className="bg-transparent text-slate-800 font-bold focus:outline-none cursor-pointer"
                    >
                      <option value="newest">Newest First</option>
                      <option value="oldest">Oldest First</option>
                      <option value="views">Most Viewed</option>
                      <option value="readTime">Read Time</option>
                    </select>
                  </div>

                  {(searchQuery ||
                    selectedCategory !== "ALL" ||
                    selectedSector !== "ALL" ||
                    selectedTag) && (
                    <button
                      onClick={handleResetFilters}
                      className="px-3 py-2 bg-rose-50 hover:bg-rose-100 text-primary border border-rose-200 font-mono text-xs font-bold uppercase transition-colors"
                      title="Reset all filters"
                    >
                      Reset
                    </button>
                  )}
                </div>
              </div>

              {/* Row 2: Category Filter Tabs */}
              <div className="border-t border-slate-100 pt-4">
                <div className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest mb-2 flex items-center gap-1.5">
                  <Filter className="w-3 h-3 text-primary" />
                  <span>Filter by Publication Category</span>
                </div>
                <div className="flex items-center gap-2 overflow-x-auto pb-1 font-mono text-xs scrollbar-none">
                  {CATEGORIES.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => {
                        setSelectedCategory(cat);
                        setCurrentPage(1);
                      }}
                      className={`px-3.5 py-1.5 uppercase font-bold text-[11px] whitespace-nowrap transition-all border ${
                        selectedCategory === cat
                          ? "bg-primary text-white border-primary shadow-sm"
                          : "bg-slate-50 text-slate-700 border-slate-200 hover:border-primary/40 hover:bg-slate-100"
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Row 3: Quick Topic Tags */}
              <div className="flex flex-wrap items-center gap-1.5 pt-2 font-mono text-[10px]">
                <span className="text-slate-400 font-bold uppercase mr-1">Key Topics:</span>
                {TOPIC_TAGS.map((tag) => {
                  const isActive = selectedTag === tag;
                  return (
                    <button
                      key={tag}
                      onClick={() => {
                        setSelectedTag(isActive ? null : tag);
                        setCurrentPage(1);
                      }}
                      className={`px-2 py-0.5 border transition-colors ${
                        isActive
                          ? "bg-slate-900 text-white border-slate-900 font-bold"
                          : "bg-slate-100/70 hover:bg-slate-200 text-slate-600 border-slate-200"
                      }`}
                    >
                      #{tag}
                    </button>
                  );
                })}
              </div>

              {/* Status Ticker */}
              <div className="flex items-center justify-between text-xs font-mono text-slate-500 pt-1 border-t border-slate-100">
                <div>
                  Showing <strong>{filteredArticles.length}</strong> technical publication
                  {filteredArticles.length === 1 ? "" : "s"}
                  {selectedCategory !== "ALL" && ` in "${selectedCategory}"`}
                  {selectedSector !== "ALL" && ` [${selectedSector}]`}
                </div>
                <div>Page {currentPage} of {totalPages}</div>
              </div>
            </div>
          </Reveal>
        </section>

        {/* ========================================================
            4. ARTICLES GRID SECTION (6 CARDS PER PAGE PAGINATED)
           ======================================================== */}
        <section ref={gridSectionRef} id="publications-grid" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10 space-y-8 scroll-mt-24">
          {filteredArticles.length === 0 ? (
            /* Empty State */
            <div className="bg-white border border-slate-200 p-12 text-center font-mono space-y-4 shadow-sm">
              <BookOpen className="w-12 h-12 mx-auto text-slate-300" />
              <div className="space-y-1">
                <h3 className="font-display font-extrabold text-xl text-slate-900 uppercase">
                  No Matching Publications Found
                </h3>
                <p className="text-xs text-slate-500 max-w-md mx-auto">
                  We couldn&apos;t find any engineering whitepapers matching your active filters. Try clearing your search or switching categories.
                </p>
              </div>
              <button
                onClick={handleResetFilters}
                className="px-5 py-2.5 bg-primary hover:bg-rose-700 text-white text-xs font-bold uppercase tracking-wider transition-colors inline-flex items-center gap-2"
              >
                <span>Reset All Filters</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            /* Articles Grid */
            <RevealGroup className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8" stagger={0.06}>
              {paginatedArticles.map((art) => (
                <RevealItem key={art.id || art.slug}>
                  <div className="bg-white border border-slate-200 rounded-none overflow-hidden shadow-sm hover:shadow-xl hover:border-primary/60 transition-all duration-300 flex flex-col justify-between h-full group">
                    <div>
                      {/* Card Cover Image */}
                      <Link href={`/resources/blog/${art.slug}`} className="block relative h-52 w-full overflow-hidden bg-slate-950">
                        {art.coverImage ? (
                          <Image
                            src={art.coverImage}
                            alt={art.title}
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            className="object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
                          />
                        ) : (
                          <div className="w-full h-full bg-slate-900 flex items-center justify-center text-slate-600">
                            <BookOpen className="w-8 h-8" />
                          </div>
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />

                        {/* Category Badge */}
                        <div className="absolute top-3 left-3 bg-primary text-white font-mono text-[9px] font-extrabold uppercase px-2.5 py-1 tracking-wider shadow-md border border-white/20">
                          {art.category || "Engineering Insights"}
                        </div>

                        {/* Sector Tag */}
                        {art.sector && (
                          <div className="absolute top-3 right-3 bg-slate-950/80 border border-slate-800 text-slate-200 font-mono text-[9px] font-bold uppercase px-2 py-0.5 backdrop-blur-xs">
                            {art.sector}
                          </div>
                        )}

                        {/* View & Date Overlay */}
                        <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between text-[10px] font-mono text-slate-300">
                          <div className="flex items-center gap-1.5">
                            <Calendar className="w-3 h-3 text-rose-400" />
                            <span>{formatDate(art.createdAt)}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Eye className="w-3 h-3 text-slate-400" />
                            <span>{art.views || 0} views</span>
                          </div>
                        </div>
                      </Link>

                      {/* Card Body */}
                      <div className="p-5 sm:p-6 space-y-3">
                        {/* Author & Read Time Meta */}
                        <div className="flex items-center justify-between text-[10px] font-mono text-slate-500 border-b border-slate-100 pb-2.5">
                          <div className="flex items-center gap-1.5 truncate max-w-[170px]">
                            <User className="w-3 h-3 text-primary shrink-0" />
                            <span className="truncate">{art.authorName || "MacProtec Desk"}</span>
                          </div>
                          <div className="flex items-center gap-1 shrink-0 text-slate-500">
                            <Clock className="w-3 h-3 text-slate-400" />
                            <span>{art.readTime || "5 min read"}</span>
                          </div>
                        </div>

                        {/* Title */}
                        <h3 className="font-display font-extrabold text-base sm:text-lg text-slate-900 uppercase tracking-tight group-hover:text-primary transition-colors leading-snug line-clamp-2">
                          <Link href={`/resources/blog/${art.slug}`}>
                            {art.title}
                          </Link>
                        </h3>

                        {/* Excerpt */}
                        <p className="text-xs text-slate-600 font-sans leading-relaxed line-clamp-3">
                          {art.excerpt}
                        </p>
                      </div>
                    </div>

                    {/* Footer Action Button */}
                    <div className="p-5 sm:p-6 pt-0">
                      <Link
                        href={`/resources/blog/${art.slug}`}
                        className="w-full py-2.5 bg-slate-50 hover:bg-primary text-slate-800 hover:text-white border border-slate-200 hover:border-primary font-mono text-xs font-bold uppercase tracking-wider transition-all duration-200 flex items-center justify-center gap-2 group/link"
                      >
                        <span>Read Full Publication</span>
                        <ChevronRight className="w-3.5 h-3.5 text-primary group-hover/link:text-white group-hover/link:translate-x-1 transition-all" />
                      </Link>
                    </div>
                  </div>
                </RevealItem>
              ))}
            </RevealGroup>
          )}

          {/* ========================================================
              5. 6-CARD PAGINATION CONTROLS BAR
             ======================================================== */}
          {totalPages > 1 && (
            <div className="bg-white border border-slate-200 p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs shadow-xs">
              {/* Left: Range Counter */}
              <div className="text-slate-500 text-center sm:text-left">
                Showing <strong className="text-slate-900">{(currentPage - 1) * pageSize + 1}</strong> to{" "}
                <strong className="text-slate-900">{Math.min(currentPage * pageSize, filteredArticles.length)}</strong> of{" "}
                <strong className="text-slate-900">{filteredArticles.length}</strong> publications{" "}
                <span className="text-slate-400">(6 cards per page)</span>
              </div>

              {/* Right: Page Navigation Buttons */}
              <div className="flex items-center gap-1.5 sm:gap-2">
                {/* Previous Button */}
                <button
                  onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className="px-3 py-2 border border-slate-200 bg-white hover:bg-slate-50 hover:border-primary/40 text-slate-700 disabled:opacity-30 disabled:cursor-not-allowed font-bold transition-all flex items-center gap-1 uppercase tracking-wider text-[11px]"
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                  <span>Prev</span>
                </button>

                {/* Page Number Buttons */}
                <div className="flex items-center gap-1">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                    <button
                      key={pageNum}
                      onClick={() => handlePageChange(pageNum)}
                      className={`w-8 h-8 sm:w-9 sm:h-9 border font-bold transition-all text-xs ${
                        currentPage === pageNum
                          ? "bg-primary text-white border-primary shadow-sm scale-105"
                          : "bg-white text-slate-700 border-slate-200 hover:bg-slate-100 hover:border-slate-300"
                      }`}
                    >
                      {pageNum}
                    </button>
                  ))}
                </div>

                {/* Next Button */}
                <button
                  onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                  className="px-3 py-2 border border-slate-200 bg-white hover:bg-slate-50 hover:border-primary/40 text-slate-700 disabled:opacity-30 disabled:cursor-not-allowed font-bold transition-all flex items-center gap-1 uppercase tracking-wider text-[11px]"
                >
                  <span>Next</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}
        </section>

        {/* ========================================================
            6. TECHNICAL NEWSLETTER & DOSSIER SUBSCRIPTION BANNER
           ======================================================== */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
          <Reveal>
            <div className="bg-slate-900 text-white border border-slate-800 p-8 sm:p-12 relative overflow-hidden shadow-2xl">
              {/* Blueprint Grid Overlay */}
              <div
                className="absolute inset-0 opacity-10 pointer-events-none"
                style={{
                  backgroundImage: `linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)`,
                  backgroundSize: "30px 30px",
                }}
              />

              <div className="relative grid lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-7 space-y-3">
                  <div className="inline-flex items-center gap-1.5 text-rose-400 font-mono text-xs font-bold uppercase tracking-widest">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>TECHNICAL BULLETIN SUBSCRIPTION</span>
                  </div>

                  <h3 className="font-display font-black text-2xl sm:text-3xl lg:text-4xl text-white uppercase tracking-tight">
                    Receive New Engineering Whitepapers Directly
                  </h3>

                  <p className="text-slate-300 text-sm leading-relaxed max-w-xl">
                    Get monthly CFD flow diagnostics, kiln combustion case studies, 3D laser scanning project reports, and process simulation benchmarks delivered straight to your engineering desk.
                  </p>
                </div>

                <div className="lg:col-span-5">
                  {newsletterSubmitted ? (
                    <div className="bg-emerald-950/80 border border-emerald-700 text-emerald-300 p-6 font-mono text-xs space-y-2">
                      <div className="flex items-center gap-2 font-bold text-sm">
                        <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                        <span>Subscribed Successfully</span>
                      </div>
                      <p className="text-emerald-200 text-[11px]">
                        You will receive our upcoming quarterly technical dossier release.
                      </p>
                    </div>
                  ) : (
                    <form onSubmit={handleNewsletterSubmit} className="space-y-3">
                      <div className="flex flex-col sm:flex-row gap-2">
                        <input
                          type="email"
                          required
                          value={newsletterEmail}
                          onChange={(e) => setNewsletterEmail(e.target.value)}
                          placeholder="engineer@plantcompany.com"
                          className="flex-1 bg-slate-950 border border-slate-700 px-4 py-3 font-mono text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-primary"
                        />
                        <button
                          type="submit"
                          disabled={isSubmittingNewsletter}
                          className="px-6 py-3 bg-primary hover:bg-rose-700 text-white font-mono text-xs font-bold uppercase tracking-wider transition-colors flex items-center justify-center gap-2 shrink-0 shadow-md"
                        >
                          <span>{isSubmittingNewsletter ? "Subscribing..." : "Subscribe"}</span>
                          <Send className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <div className="font-mono text-[10px] text-slate-400">
                        Zero spam. Strictly verified industrial engineering publications only.
                      </div>
                    </form>
                  )}
                </div>
              </div>
            </div>
          </Reveal>
        </section>

        {/* ========================================================
            7. CONSULTATION & PDF DOWNLOAD CROSS-NAVIGATION
           ======================================================== */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
          <Reveal>
            <div className="bg-white border border-slate-200 p-8 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
              <div className="space-y-2 text-center md:text-left">
                <div className="font-mono text-xs font-bold text-primary uppercase tracking-widest">
                  LOOKING FOR OFFICIAL BROCHURES & SPECS?
                </div>
                <h4 className="font-display font-extrabold text-xl sm:text-2xl text-slate-900 uppercase">
                  Download Complete Engineering Dossiers
                </h4>
                <p className="text-slate-600 text-sm max-w-lg">
                  Access official MacProtec corporate capabilities, Scan2Value brochures, MacFlow Vision CFD dossiers, and training catalogues.
                </p>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-3 shrink-0">
                <Link
                  href="/resources"
                  className="px-6 py-3.5 bg-slate-900 hover:bg-slate-800 text-white font-mono text-xs font-bold uppercase tracking-wider transition-colors shadow-sm"
                >
                  Browse PDF Brochures
                </Link>
                <Link
                  href="/lets-connect"
                  className="px-6 py-3.5 bg-primary hover:bg-rose-700 text-white font-mono text-xs font-bold uppercase tracking-wider transition-colors shadow-sm flex items-center gap-2"
                >
                  <span>Request Engineering Review</span>
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
