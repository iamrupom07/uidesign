"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import TechnicalCursor from "@/components/ui/TechnicalCursor";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import {
  Download,
  FileText,
  Presentation,
  GraduationCap,
  Activity,
  Search,
  CheckCircle2,
  Send,
  BookOpen,
  ChevronDown,
  ChevronUp,
  X,
  HelpCircle,
  Eye,
  Sparkles,
  Layers,
  ShieldCheck,
  FileCheck,
  Building2,
  MonitorCheck,
  Filter,
  ArrowUpRight,
  HardHat,
  Cpu,
} from "lucide-react";
import { useCreateSubmissionMutation } from "@/redux/api/submissionApi";
import { downloadResourcePdf } from "@/lib/resourcePdfGenerator";

// Resource category interface
interface ResourceItem {
  id: string;
  category: "company-profile" | "engineering-services" | "training" | "predictive-solutions";
  categoryLabel: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  imageAlt: string;
  tag: string;
  downloads: {
    title: string;
    format: "PDF" | "PPTX";
    size: string;
    fileName: string;
    highlights?: string[];
  }[];
  subBrochures?: {
    id: string;
    title: string;
    format: string;
    size: string;
    description: string;
    topics?: string[];
  }[];
}

export default function ResourcesPage() {
  // Search and filter states
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  // State for active FAQ
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  // Toast / Download Notification state
  const [downloadToast, setDownloadToast] = useState<string | null>(null);

  // Contact Inquiry Modal state
  const [contactModalOpen, setContactModalOpen] = useState(false);
  const [resForm, setResForm] = useState({ name: "", email: "", interest: "Company Profile & Credentials" });
  const [createSubmission, { isLoading: isSubmittingDocReq }] = useCreateSubmissionMutation();

  // Document Preview Modal state
  const [previewModalDoc, setPreviewModalDoc] = useState<{
    title: string;
    format: string;
    size: string;
    category: string;
    summary: string;
    topics: string[];
    fileName: string;
  } | null>(null);

  // Trigger real client-side PDF document generation and browser download
  const handleDownload = (fileName: string) => {
    setDownloadToast(`Generating official PDF: ${fileName}`);
    try {
      downloadResourcePdf(fileName);
      setTimeout(() => {
        setDownloadToast(`Downloaded successfully: ${fileName}`);
        setTimeout(() => {
          setDownloadToast(null);
        }, 3500);
      }, 500);
    } catch (err) {
      console.error("PDF generation error:", err);
      setDownloadToast(`Error downloading ${fileName}`);
    }
  };

  const toggleFaq = (idx: number) => {
    setActiveFaq(activeFaq === idx ? null : idx);
  };

  // Main resource items data matching exact document spec from official brochures
  const resourceItems: ResourceItem[] = [
    {
      id: "company-profile",
      category: "company-profile",
      categoryLabel: "Company Profile",
      title: "Company Brochure & Profile",
      subtitle: "CORPORATE OVERVIEW & CAPABILITIES",
      description:
        "Comprehensive technical brochure of MACPROTEC Engineering, our multidisciplinary EPC expertise, global codes (ASME, API, NFPA, ASHRAE, ASTM), verified achievements (1300MW power, 1.43M Sft MEP, 47,000m³ storage), and international references (Saint Gobain, Arkema, Heurtey, Beacon).",
      image: "/images/resources/company_profile.png",
      imageAlt: "MACPROTEC Engineers reviewing blueprints around table",
      tag: "01 // DOSSIER",
      downloads: [
        {
          title: "1. MacProtec Company Brochure (PDF)",
          format: "PDF",
          size: "6.4 MB",
          fileName: "MacProtec Engineering Company Brochure.pdf",
          highlights: [
            "1300 MW Power Generation & 1.43M Sft HVAC/Pharma MEP",
            "FEED, Detailed Engineering (Civil, Mech, Piping, E&I)",
            "Global EPC Codes (ASME, API, NFPA, ASHRAE, ASTM)",
            "Global Portfolio: Saint Gobain, Arkema, Heurtey, Beacon",
          ],
        },
        {
          title: "2. Business Presentation (PPTX)",
          format: "PPTX",
          size: "5.8 MB",
          fileName: "PPTX-(Macprotec Business Introduction).pptx",
          highlights: ["Slide presentation", "Core divisions overview", "Service scope"],
        },
      ],
    },
    {
      id: "engineering-services",
      category: "engineering-services",
      categoryLabel: "Engineering Service Brochures",
      title: "Engineering Services & Technical Dossiers",
      subtitle: "MULTIDISCIPLINARY ENGINEERING & DIGITAL SOLUTIONS",
      description:
        "Explore our multidisciplinary engineering services, digital solutions, CFD modeling (MacFlow Vision), 3D laser scanning (Scan2Value), FEED studies, and end-to-end plant delivery capabilities.",
      image: "/images/resources/engineering_services.png",
      imageAlt: "Dual-monitor workstation displaying 3D CAD mesh model",
      tag: "02 // SERVICES",
      downloads: [
        {
          title: "Engineering Services Master Brochure",
          format: "PDF",
          size: "6.4 MB",
          fileName: "MacProtec Engineering Master Brochure.pdf",
          highlights: [
            "FEED & Detailed Engineering Design",
            "Civil, Structural, Process, Mechanical, Piping, E&I",
            "3D Laser Scanning & Reverse Engineering",
            "CFD Flow Simulation & Heat-Mass Balances",
          ],
        },
      ],
      subBrochures: [
        {
          id: "01",
          title: "MacProtec Scan2Value — 3D Scanning & Reverse Engineering",
          format: "PDF",
          size: "6.8 MB",
          description: "Transforming assets into digital intelligence. MacProtec DigiPlant 3D, reverse engineering obsolete parts, point-cloud clash detection, and wear tracking.",
          topics: [
            "MacProtec DigiPlant 3D Digital Twins",
            "Reverse Engineering Obsolete / Worn Parts",
            "3D Scanning of Plant Assets & Point Cloud Reality Capture",
            "Wear Tracking & Predictive Replacement for Mills/Ducts",
            "Zero-Guess Retrofit & Clash Detection",
          ],
        },
        {
          id: "02",
          title: "MacFlow Vision — CFD for Smarter Cement Plants",
          format: "PDF",
          size: "5.4 MB",
          description: "Numerical modeling from burner to stack. Kiln burner flame aerodynamics, calciner mixing & residence time, mill pressure drop reduction, and silo flow optimization.",
          topics: [
            "Kiln & Burner Combustion Modeling (Flame shape & refractory protection)",
            "Calciner Hydrodynamics & Higher AF Substitution (TSR)",
            "Cyclone Separation Efficiency & Bypass Build-up Mitigation",
            "Vertical Mill Louver Ring Air Equalization",
            "Bins, Silos & Hopper Clinker Discharge Behavior",
          ],
        },
        {
          id: "03",
          title: "Hydraulic Services for Clinker Coolers & Vertical Mills",
          format: "PDF",
          size: "4.2 MB",
          description: "Combining deep cement know-how with advanced hydraulic diagnostics. Stabilize clinker coolers (SF, MMC, CB) and vertical mills (OK, ATOX, FRM, Loesche).",
          topics: [
            "Clinker Cooler Hydraulic Stabilization (SF, MMC, CB types)",
            "Vertical Roller Mill Hydraulic Pressure Control (OK, ATOX, Loesche)",
            "Root Cause Diagnostics vs. Part Replacement",
            "Accumulator Pre-charge, Relief Valves & Leak Mitigation",
          ],
        },
        {
          id: "04",
          title: "Process Simulation and Beyond — Plant Digital Twins",
          format: "PDF",
          size: "4.6 MB",
          description: "Model, Predict, Perform. Digital twin modeling of preheater towers, rotary kilns, coolers, and grinding circuits to test operational changes with zero risk.",
          topics: [
            "Plant-Wide Process Digital Twin Modeling",
            "Preheating Tower, Kiln & Clinker Cooler Simulation",
            "Ball & Vertical Mill Load / Airflow / Circulation Modeling",
            "Thermo-Chemical Flowsheet & Waste Heat Recovery",
          ],
        },
        {
          id: "05",
          title: "Cement Plant Services A to Z — Process & Automation",
          format: "PDF",
          size: "4.8 MB",
          description: "End-to-end plant optimization delivering 3-5% energy reduction and 5-7% higher throughput: kiln tuning, burner optimization, AI raw mix, and mill debottlenecking.",
          topics: [
            "Kiln Process Optimization (Burn smarter, not hotter)",
            "Burner Combustion & Multi-Fuel Tuning",
            "Raw Mix Design & Optimization with AI Tools",
            "Grinding Circuit Debottlenecking & Silo Fluidization",
          ],
        },
        {
          id: "06",
          title: "Front End Engineering Design (FEED) & Detailed Design",
          format: "PDF",
          size: "5.1 MB",
          description: "Complete multi-discipline EPC design: civil/structural RCC & steel, mass/energy balance, 3D piping clash audits, electrical SLDs, and international project references.",
          topics: [
            "Conceptual Design, Feasibility & PFD / P&ID Development",
            "Civil, Structural & Architectural GA Drawings",
            "3D Piping Clash Detection & Caesar II Stress Analysis",
            "Global Portfolio: Saint Gobain, Arkema, Heurtey, Beacon",
          ],
        },
      ],
    },
    {
      id: "training-catalogue",
      category: "training",
      categoryLabel: "Training Catalogue",
      title: "Training Catalogue 2026 & CementX",
      subtitle: "PROFESSIONAL DEVELOPMENT & CAPABILITY BUILDING",
      description:
        "Hands-on technical training programs and custom plant-focused case studies designed for plant managers, process engineers, and control room operators. We don't just transfer knowledge—we build capability.",
      image: "/images/resources/training_catalogue.png",
      imageAlt: "Technical classroom presentation seminar on LC3 process",
      tag: "03 // LEARNING",
      downloads: [
        {
          title: "1. MacProtec Master Training Catalog 2026",
          format: "PDF",
          size: "8.5 MB",
          fileName: "MacProtec Master Training Catalog 2026.pdf",
          highlights: [
            "Complete 37-page curriculum with 6 series and 35+ courses",
            "Basic Training (Cement 101, Chemistry Mine-to-Mill)",
            "Control Room Operator Series (Raw, Pyro, Cement Grinding)",
            "Advanced Series (VRM, Ball Mill, Pyro, Microscopy)",
            "Hands-On Series (Heat & Mass Balance Bootcamp, Almanacs)",
            "Equipment & Hydraulics Specific Series",
          ],
        },
        {
          title: "2. CementX — Training for Smart Plants",
          format: "PDF",
          size: "3.7 MB",
          fileName: "CementX — Training for Smart Plants.pdf",
          highlights: [
            "Hands-on diagnostic routines mirroring plant floor tasks",
            "Custom plant-focused case studies from your operating history",
            "3D printed physical learning aids & cutaway models",
            "Training with live historian & DCS plant data",
          ],
        },
      ],
    },
    {
      id: "predictive-solutions",
      category: "predictive-solutions",
      categoryLabel: "Predictive Solutions",
      title: "Predictive Solutions & Kiln OCMS",
      subtitle: "REAL-TIME MONITORING & PREDICTIVE ANALYTICS",
      description:
        "Discover how MACPROTEC combines process expertise and intelligent telemetry to improve equipment reliability. Featuring Smart Up Time and the Kiln Online Condition Monitoring System (Kiln OCMS).",
      image: "/images/resources/predictive_solutions.png",
      imageAlt: "Dark monitoring interface displaying 3D digital twin and Drive Bearing Defect alert",
      tag: "04 // ANALYTICS",
      downloads: [
        {
          title: "1. Kiln OCMS — Technical Specification",
          format: "PDF",
          size: "4.8 MB",
          fileName: "Kiln Online Condition Monitoring System.pdf",
          highlights: [
            "Multi-sensor telemetry for 2-base and 3-base rotary kilns",
            "ECS/CemScanner kiln shell temperature & hot spot detection",
            "Crank sensors (10 Nos.) on roller supports (FLS RA/RB/Fuller)",
            "Axial balance, roller position, and thrust temperature RTDs",
            "Kiln drive vibration & girth gear run-out monitoring",
          ],
        },
        {
          title: "2. Predictive Solutions — Smart Up Time",
          format: "PDF",
          size: "4.2 MB",
          fileName: "Predictive Solutions — Smart Up Time.pdf",
          highlights: [
            "Early warnings, not late alarms for critical assets",
            "Connect: Historian & sensor agnostic (PLC/DCS/Cloud)",
            "Process: Process physics + Machine Learning models",
            "Deploy: Native SCADA, DCS & CMMS alerts integration",
          ],
        },
      ],
    },
  ];

  // Category Filter Options
  const categories = [
    { id: "all", label: "All Resources" },
    { id: "company-profile", label: "Company Profile" },
    { id: "engineering-services", label: "Engineering Services" },
    { id: "training", label: "Training Catalogue" },
    { id: "predictive-solutions", label: "Predictive Solutions" },
  ];

  // Filtered Items based on category and search query
  const filteredResources = useMemo(() => {
    return resourceItems.filter((item) => {
      const matchesCategory = selectedCategory === "all" || item.category === selectedCategory;
      const matchesQuery =
        searchQuery === "" ||
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.downloads.some((d) => d.title.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (item.subBrochures &&
          item.subBrochures.some((s) => s.title.toLowerCase().includes(searchQuery.toLowerCase())));
      return matchesCategory && matchesQuery;
    });
  }, [selectedCategory, searchQuery, resourceItems]);

  const faqs = [
    {
      q: "How can I request physical copies of MACPROTEC technical brochures?",
      a: "You can request printed engineering portfolios and reference dossiers directly through our Contact Us modal or by emailing resources@macprotec.com.",
    },
    {
      q: "Are custom training programs available for plant engineering teams?",
      a: "Yes. MACPROTEC provides customized onsite and online technical training programs tailored to your plant equipment, covering CFD analysis, 3D laser scanning, and kiln optimization.",
    },
    {
      q: "What file formats are MACPROTEC technical downloads provided in?",
      a: "Our brochures and dossiers are provided in high-resolution PDF and PPTX formats, fully searchable and vector-rendered for clear printing and viewing.",
    },
    {
      q: "Can MACPROTEC perform custom CFD or thermal audits using these methodologies?",
      a: "Absolutely. Our Houston-based engineering team conducts site audits, coordinate laser scans, and numerical simulations according to ASME and ISO standards.",
    },
  ];

  return (
    <>
      <TechnicalCursor />
      <Header />

      {/* Floating Download Toast Notification */}
      {downloadToast && (
        <div className="fixed bottom-6 right-6 z-50 bg-neutral-950 border border-primary/60 text-white px-5 py-3.5 shadow-2xl flex items-center gap-3 font-mono text-xs animate-slideUp">
          <Download className="w-4 h-4 text-primary animate-bounce" />
          <span className="font-bold">{downloadToast}</span>
        </div>
      )}

      {/* Document Quick Preview Modal */}
      {previewModalDoc && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-fadeIn">
          <div className="bg-white border-2 border-primary max-w-xl w-full p-6 sm:p-8 relative shadow-2xl overflow-hidden">
            <button
              onClick={() => setPreviewModalDoc(null)}
              className="absolute top-4 right-4 text-neutral-400 hover:text-primary transition-colors p-1"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="font-mono text-[10px] font-bold text-primary tracking-widest uppercase mb-1 flex items-center gap-1.5">
              <FileCheck className="w-3.5 h-3.5" />
              BROCHURE PREVIEW // {previewModalDoc.category}
            </div>

            <h3 className="text-2xl font-display font-extrabold uppercase text-foreground mb-2">
              {previewModalDoc.title}
            </h3>

            <div className="flex items-center gap-3 font-mono text-xs text-neutral-500 mb-6 border-b border-neutral-100 pb-3">
              <span className="bg-rose-50 text-primary px-2 py-0.5 font-bold uppercase border border-rose-200 text-[10px]">
                {previewModalDoc.format}
              </span>
              <span>Size: {previewModalDoc.size}</span>
              <span>· High Resolution</span>
            </div>

            <div className="space-y-4 mb-6 font-sans text-xs text-secondary leading-relaxed">
              <p className="font-medium text-neutral-800">{previewModalDoc.summary}</p>

              <div className="bg-neutral-50 p-4 border border-neutral-200 space-y-2 font-mono text-[11px]">
                <div className="font-bold text-neutral-900 uppercase text-[10px] tracking-wider mb-1">
                  Key Technical Content Included:
                </div>
                {previewModalDoc.topics.map((t, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-neutral-700">
                    <CheckCircle2 className="w-3.5 h-3.5 text-primary flex-shrink-0" />
                    <span>{t}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex gap-3 font-mono text-xs">
              <button
                onClick={() => {
                  handleDownload(previewModalDoc.fileName);
                  setPreviewModalDoc(null);
                }}
                className="w-full bg-primary hover:bg-rose-700 text-white font-bold py-3 flex items-center justify-center gap-2 uppercase tracking-widest transition-colors shadow-md"
              >
                <Download className="w-4 h-4" />
                Download Complete PDF
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Contact Inquiry Modal */}
      {contactModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-fadeIn">
          <div className="bg-white border-2 border-primary max-w-lg w-full p-6 sm:p-8 relative shadow-2xl">
            <button
              onClick={() => setContactModalOpen(false)}
              className="absolute top-4 right-4 text-neutral-400 hover:text-primary transition-colors p-1"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="font-mono text-[10px] font-bold text-primary tracking-widest uppercase mb-2 flex items-center gap-1.5">
              <Building2 className="w-3.5 h-3.5" />
              INQUIRY // MACPROTEC ENGINEERING
            </div>
            <h3 className="text-2xl font-display font-extrabold uppercase text-foreground mb-3">
              Request Customized Documentation
            </h3>
            <p className="text-xs text-secondary mb-5 font-sans leading-relaxed">
              Submit your details to request printed portfolios, technical datasheets, or schedule a consultation with our Houston process engineering experts.
            </p>
            <form
              onSubmit={async (e) => {
                e.preventDefault();
                try {
                  await createSubmission({
                    type: "RESOURCE",
                    name: resForm.name,
                    email: resForm.email,
                    subject: `Documentation Request: ${resForm.interest}`,
                    message: `User requested technical documentation portfolio: ${resForm.interest}`,
                  }).unwrap();
                  setContactModalOpen(false);
                  handleDownload("Technical Consult Request Submitted");
                  setResForm({ name: "", email: "", interest: "Company Profile & Credentials" });
                } catch (err) {
                  console.error(err);
                }
              }}
              className="space-y-4 font-mono text-xs"
            >
              <div>
                <label className="block text-[10px] uppercase font-bold text-neutral-700 mb-1">Full Name*</label>
                <input
                  required
                  type="text"
                  value={resForm.name}
                  onChange={(e) => setResForm({ ...resForm, name: e.target.value })}
                  placeholder="John Doe"
                  className="w-full bg-neutral-50 border border-neutral-300 p-2.5 text-xs text-foreground focus:outline-none focus:border-primary"
                />
              </div>
              <div>
                <label className="block text-[10px] uppercase font-bold text-neutral-700 mb-1">Work Email*</label>
                <input
                  required
                  type="email"
                  value={resForm.email}
                  onChange={(e) => setResForm({ ...resForm, email: e.target.value })}
                  placeholder="jdoe@plant-company.com"
                  className="w-full bg-neutral-50 border border-neutral-300 p-2.5 text-xs text-foreground focus:outline-none focus:border-primary"
                />
              </div>
              <div>
                <label className="block text-[10px] uppercase font-bold text-neutral-700 mb-1">Primary Interest</label>
                <select
                  value={resForm.interest}
                  onChange={(e) => setResForm({ ...resForm, interest: e.target.value })}
                  className="w-full bg-neutral-50 border border-neutral-300 p-2.5 text-xs text-foreground focus:outline-none focus:border-primary"
                >
                  <option>Company Profile & Credentials</option>
                  <option>Engineering Services Brochure</option>
                  <option>Training Programmes & Courses</option>
                  <option>Predictive Solutions & Kiln OCMS</option>
                </select>
              </div>
              <button
                type="submit"
                disabled={isSubmittingDocReq}
                className="w-full bg-primary hover:bg-rose-700 text-white font-mono text-xs font-bold uppercase py-3.5 transition-colors tracking-widest mt-4 flex items-center justify-center gap-2 shadow-md disabled:opacity-60"
              >
                <Send className="w-4 h-4" />
                <span>{isSubmittingDocReq ? "Submitting Request..." : "Submit Consultation Request"}</span>
              </button>
            </form>
          </div>
        </div>
      )}

      <main className="bg-background min-h-screen blueprint-mesh pb-16 space-y-12">
        
        {/* 1. FULL-WIDTH HERO SECTION WITH ROTARY KILN BACKGROUND */}
        <section className="w-full relative bg-neutral-550 border-b-2 border-primary/30 py-16 sm:py-20 lg:py-24 overflow-hidden group">
          {/* Kiln Hero Background Image - Full Width Edge-to-Edge */}
          <div className="absolute inset-0 w-full h-full pointer-events-none">
            <Image
              src="/images/resources/hero_resources.jpg"
              alt="MACPROTEC Industrial Rotary Kiln Cement Plant"
              fill
              priority
              className="object-cover object-center opacity-95 group-hover:scale-105 transition-transform duration-1000 ease-out"
            />
            {/* Multi-layered Dark Gradient Overlays for Centered High Contrast Text Visibility */}
            <div className="absolute inset-0 bg-neutral-950/70 bg-gradient-to-b from-neutral-950/80 via-neutral-950/60 to-neutral-950/90" />
            <div className="absolute inset-0 bg-radial-gradient-center from-transparent via-neutral-950/40 to-neutral-950/90" />
          </div>

          {/* Blueprint Mesh Accent Pattern */}
          <div className="absolute inset-0 bg-[radial-gradient(#e11d48_1px,transparent_1px)] [background-size:24px_24px] opacity-10 pointer-events-none" />

          {/* Content overlay container - Middle Aligned */}
          <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
            <Reveal>
              <div className="max-w-4xl mx-auto flex flex-col items-center text-center space-y-6">
                
                {/* Category Badge Ticker */}
                <div className="inline-flex items-center gap-2 bg-neutral-900/90 border border-primary/40 px-4 py-1.5 font-mono text-[11px] font-extrabold text-primary tracking-widest uppercase shadow-md backdrop-blur-xs">
                  <span className="w-2.5 h-2.5 bg-primary animate-pulse" />
                  <span>MACPROTEC TECHNICAL KNOWLEDGE DIRECTORY</span>
                </div>
                
                {/* Hero Title - Clean White Text */}
                <div className="flex justify-center w-full">
                  <h1 className="text-4xl sm:text-6xl lg:text-7xl font-display font-black uppercase tracking-tight text-white drop-shadow-2xl">
                    Resources Center
                  </h1>
                </div>

                {/* Subtitle Description */}
                <p className="text-neutral-200 font-sans text-base sm:text-lg leading-relaxed max-w-2xl mx-auto drop-shadow-md">
                  Access MACPROTEC Engineering&apos;s technical documentation, engineering service brochures, training catalogues, and predictive cement plant solutions.
                </p>

                {/* Quick Stats Ticker */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5 max-w-3xl mx-auto w-full border-t border-white/20 pt-6 font-mono text-xs text-neutral-200">
                  <div className="flex items-center justify-center gap-2.5 bg-neutral-900/80 border border-white/10 px-3.5 py-2.5 shadow-sm">
                    <BookOpen className="w-4 h-4 text-primary shrink-0" />
                    <span className="font-semibold whitespace-nowrap">4 Core Dossiers</span>
                  </div>
                  <div className="flex items-center justify-center gap-2.5 bg-neutral-900/80 border border-white/10 px-3.5 py-2.5 shadow-sm">
                    <FileText className="w-4 h-4 text-primary shrink-0" />
                    <span className="font-semibold whitespace-nowrap">12+ Downloads</span>
                  </div>
                  <div className="flex items-center justify-center gap-2.5 bg-neutral-900/80 border border-white/10 px-3.5 py-2.5 shadow-sm">
                    <MonitorCheck className="w-4 h-4 text-primary shrink-0" />
                    <span className="font-semibold whitespace-nowrap">Instant Access</span>
                  </div>
                  <div className="flex items-center justify-center gap-2.5 bg-neutral-900/80 border border-white/10 px-3.5 py-2.5 shadow-sm">
                    <ShieldCheck className="w-4 h-4 text-primary shrink-0" />
                    <span className="font-semibold whitespace-nowrap">Verified Specs</span>
                  </div>
                </div>

              </div>
            </Reveal>
          </div>
        </section>

        {/* 2. SEARCH & INTERACTIVE CATEGORY FILTER BAR */}
        <section className="max-w-7xl mx-auto px-6 lg:px-8">
          <Reveal>
            <div className="bg-white border border-border p-6 shadow-sm space-y-6">
              
              {/* Top Controls: Search Bar + Filter Header */}
              <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
                <div className="relative w-full sm:w-80">
                  <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search resources, CFD, Kiln, scans..."
                    className="w-full bg-neutral-50 border border-neutral-200 pl-10 pr-4 py-2.5 font-mono text-xs text-neutral-900 focus:outline-none focus:border-primary transition-colors"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery("")}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-primary text-xs"
                    >
                      ×
                    </button>
                  )}
                </div>

                <div className="font-mono text-xs text-neutral-500 flex items-center gap-2">
                  <Filter className="w-3.5 h-3.5 text-primary" />
                  <span>Showing <strong>{filteredResources.length}</strong> featured resource sections</span>
                </div>
              </div>

              {/* Category Tabs */}
              <div className="flex items-center gap-2 overflow-x-auto pb-1 font-mono text-xs scrollbar-none">
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`px-4 py-2 uppercase font-bold text-[11px] whitespace-nowrap transition-colors border ${
                      selectedCategory === cat.id
                        ? "bg-primary text-white border-primary shadow-sm"
                        : "bg-neutral-50 text-neutral-700 border-neutral-200 hover:border-primary/40 hover:bg-neutral-100"
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>

            </div>
          </Reveal>
        </section>

        {/* 3. FEATURED RESOURCE CARDS */}
        <section className="max-w-7xl mx-auto px-6 lg:px-8 space-y-12">

          {/* CARD 1: COMPANY PROFILE */}
          {(selectedCategory === "all" || selectedCategory === "company-profile") && (
            <div id="company-profile" className="scroll-mt-28">
              <Reveal>
                <SpotlightCard className="bg-white border-2 border-border p-6 sm:p-10 hover:border-primary/60 transition-all duration-300 shadow-md group">
                  <div className="grid lg:grid-cols-12 gap-8 items-center">
                    
                    {/* Picture 1: Company Profile Original Image */}
                    <div className="lg:col-span-5 relative h-72 sm:h-80 w-full overflow-hidden border border-neutral-200 shadow-inner">
                      <Image
                        src="/images/resources/company_profile.jpg"
                        alt="MACPROTEC Company Profile - Engineers reviewing blueprints"
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute top-3 left-3 bg-neutral-950 text-white border border-primary/40 font-mono text-[10px] font-extrabold px-3 py-1 uppercase tracking-widest">
                        01 // DOSSIER
                      </div>
                      <div className="absolute bottom-3 left-3 bg-yellow-400 text-neutral-950 font-mono text-[10px] font-bold px-2.5 py-1 uppercase tracking-wider">
                        Company Profile
                      </div>
                    </div>

                    {/* Content */}
                    <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
                      <div>
                        <div className="font-mono text-[10px] text-primary font-extrabold tracking-widest uppercase mb-1.5 flex items-center gap-1.5">
                          <HardHat className="w-3.5 h-3.5" />
                          <span>CORPORATE OVERVIEW & CAPABILITIES</span>
                        </div>
                        <h3 className="text-3xl font-display font-extrabold uppercase text-foreground mb-3 group-hover:text-primary transition-colors">
                          Company Profile
                        </h3>
                        <p className="text-sm text-secondary font-sans leading-relaxed">
                          A comprehensive overview of MACPROTEC Engineering, our multidisciplinary expertise, core competencies, global project track record, and technical capabilities in heavy process industries.
                        </p>
                      </div>

                      {/* Download Buttons */}
                      <div className="pt-4 border-t border-neutral-200 space-y-3 font-mono text-xs">
                        <div className="text-[10px] text-neutral-400 uppercase font-extrabold tracking-wider">
                          Official Corporate Downloads:
                        </div>
                        <div className="flex flex-col sm:flex-row gap-3">
                          <button
                            onClick={() => handleDownload("PDF-Macprotec Introductory.pdf")}
                            className="bg-neutral-950 hover:bg-primary text-white font-bold px-5 py-3 flex items-center justify-between gap-3 transition-colors shadow-sm group/btn"
                          >
                            <div className="flex items-center gap-2.5">
                              <FileText className="w-4 h-4 text-primary group-hover/btn:text-white" />
                              <span>1. Introductory PDF</span>
                            </div>
                            <Download className="w-4 h-4 opacity-70 group-hover/btn:opacity-100" />
                          </button>

                          <button
                            onClick={() => handleDownload("PPTX-(Macprotec Business Introduction).pptx")}
                            className="bg-neutral-100 hover:bg-neutral-200 text-neutral-900 border border-neutral-300 font-bold px-5 py-3 flex items-center justify-between gap-3 transition-colors shadow-xs group/btn"
                          >
                            <div className="flex items-center gap-2.5">
                              <Presentation className="w-4 h-4 text-rose-600" />
                              <span>2. Business Intro (PPTX)</span>
                            </div>
                            <Download className="w-4 h-4 text-neutral-500 group-hover/btn:text-neutral-900" />
                          </button>
                        </div>
                      </div>
                    </div>

                  </div>
                </SpotlightCard>
              </Reveal>
            </div>
          )}

          {/* CARD 2: ENGINEERING SERVICES BROCHURE */}
          {(selectedCategory === "all" || selectedCategory === "engineering-services") && (
            <div id="engineering-services" className="scroll-mt-28">
              <Reveal>
                <SpotlightCard className="bg-white border-2 border-border p-6 sm:p-10 hover:border-primary/60 transition-all duration-300 shadow-md group">
                  
                  {/* Top Half: Main Overview & Master Brochure Download */}
                  <div className="grid lg:grid-cols-12 gap-8 items-center mb-8 pb-8 border-b border-neutral-200">
                    {/* Picture 2: CAD Workstation */}
                    <div className="lg:col-span-5 relative h-64 sm:h-72 w-full overflow-hidden border border-neutral-200 shadow-inner">
                      <Image
                        src="/images/resources/engineering_services.jpg"
                        alt="MACPROTEC Engineering Services - Dual CAD Workstation"
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute top-3 left-3 bg-neutral-950 text-white border border-primary/40 font-mono text-[10px] font-extrabold px-3 py-1 uppercase tracking-widest">
                        02 // SERVICES
                      </div>
                      <div className="absolute bottom-3 left-3 bg-neutral-950 text-white font-mono text-[10px] font-bold px-2.5 py-1 uppercase tracking-wider border border-primary/30">
                        Engineering Services Brochure
                      </div>
                    </div>

                    {/* Content */}
                    <div className="lg:col-span-7 flex flex-col justify-between space-y-5">
                      <div>
                        <div className="font-mono text-[10px] text-primary font-extrabold tracking-widest uppercase mb-1.5 flex items-center gap-1.5">
                          <Cpu className="w-3.5 h-3.5" />
                          <span>MULTIDISCIPLINARY SOLUTIONS</span>
                        </div>
                        <h3 className="text-3xl font-display font-extrabold uppercase text-foreground mb-3 group-hover:text-primary transition-colors">
                          Engineering Services Brochure
                        </h3>
                        <p className="text-sm text-secondary font-sans leading-relaxed">
                          Explore our multidisciplinary engineering services, digital solutions, CFD modeling, 3D laser scanning methodologies, and end-to-end project delivery capabilities.
                        </p>
                      </div>

                      {/* Main Master Download Button */}
                      <div className="pt-2 font-mono text-xs">
                        <button
                          onClick={() => handleDownload("Engineering Services Master Brochure.pdf")}
                          className="bg-neutral-950 hover:bg-primary text-white font-bold px-6 py-3.5 flex items-center justify-between gap-4 transition-colors shadow-sm group/btn w-full sm:w-auto"
                        >
                          <div className="flex items-center gap-2.5">
                            <FileText className="w-4 h-4 text-primary group-hover/btn:text-white" />
                            <span>1. Master Engineering Brochure (PDF)</span>
                          </div>
                          <Download className="w-4 h-4 opacity-70 group-hover/btn:opacity-100" />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Bottom Half: 6 Specialized Engineering Dossiers Grid */}
                  <div className="space-y-4 font-mono text-xs">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 bg-neutral-100/90 px-4 py-2.5 border-l-4 border-primary">
                      <span className="font-bold text-neutral-900 uppercase text-[11px] tracking-wider flex items-center gap-2">
                        <Layers className="w-4 h-4 text-primary" />
                        SPECIALIZED ENGINEERING DOSSIERS (6 AVAILABLE)
                      </span>
                      <span className="text-[10px] text-neutral-500">Direct PDF preview & instant download</span>
                    </div>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
                      {resourceItems[1].subBrochures?.map((item) => (
                        <div
                          key={item.id}
                          className="bg-neutral-50 border border-neutral-200 hover:border-primary/50 hover:bg-white p-4 flex flex-col justify-between transition-all duration-200 shadow-2xs hover:shadow-md group/sub"
                        >
                          <div>
                            <div className="flex items-center justify-between mb-2">
                              <span className="bg-neutral-950 text-white font-extrabold text-[10px] px-2 py-0.5 font-mono">
                                DOSSIER #{item.id}
                              </span>
                              <span className="text-neutral-500 text-[10px] font-semibold">
                                {item.format} · {item.size}
                              </span>
                            </div>
                            <h4 className="font-bold text-neutral-900 text-xs group-hover/sub:text-primary transition-colors mb-1.5">
                              {item.title}
                            </h4>
                            <p className="text-[11px] text-neutral-600 font-sans leading-relaxed line-clamp-2">
                              {item.description}
                            </p>
                          </div>

                          <div className="mt-4 pt-3 border-t border-neutral-200/80 flex items-center gap-2">
                            <button
                              onClick={() =>
                                setPreviewModalDoc({
                                  title: item.title,
                                  format: item.format,
                                  size: item.size,
                                  category: "Engineering Services",
                                  summary: item.description,
                                  topics: item.topics || ["3D CAD Modeling", "Methodology breakdown", "Case studies"],
                                  fileName: `${item.title}.pdf`,
                                })
                              }
                              className="flex-1 bg-white hover:bg-neutral-200 text-neutral-800 border border-neutral-300 text-[10px] font-bold py-2 flex items-center justify-center gap-1 uppercase transition-colors"
                            >
                              <Eye className="w-3 h-3 text-neutral-500" />
                              Preview
                            </button>

                            <button
                              onClick={() => handleDownload(`${item.title}.pdf`)}
                              className="flex-1 bg-primary hover:bg-rose-700 text-white text-[10px] font-bold py-2 flex items-center justify-center gap-1 uppercase transition-colors shadow-xs"
                            >
                              <Download className="w-3 h-3" />
                              Download
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                </SpotlightCard>
              </Reveal>
            </div>
          )}

          {/* CARD 3: TRAINING CATALOGUE */}
          {(selectedCategory === "all" || selectedCategory === "training") && (
            <div id="training-catalogue" className="scroll-mt-28">
              <Reveal>
                <SpotlightCard className="bg-white border-2 border-border p-6 sm:p-10 hover:border-primary/60 transition-all duration-300 shadow-md group">
                  <div className="grid lg:grid-cols-12 gap-8 items-center">
                    
                    {/* Picture 3: Training Catalogue Original Image */}
                    <div className="lg:col-span-5 relative h-72 sm:h-80 w-full overflow-hidden border border-neutral-200 shadow-inner">
                      <Image
                        src="/images/resources/training_catalogue.png"
                        alt="MACPROTEC Technical Training Session"
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute top-3 left-3 bg-neutral-950 text-white border border-primary/40 font-mono text-[10px] font-extrabold px-3 py-1 uppercase tracking-widest">
                        03 // LEARNING
                      </div>
                      <div className="absolute bottom-3 left-3 bg-yellow-400 text-neutral-950 font-mono text-[10px] font-bold px-2.5 py-1 uppercase tracking-wider">
                        Training Catalogue
                      </div>
                    </div>

                    {/* Content */}
                    <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
                      <div>
                        <div className="font-mono text-[10px] text-primary font-extrabold tracking-widest uppercase mb-1.5 flex items-center gap-1.5">
                          <GraduationCap className="w-3.5 h-3.5" />
                          <span>PROFESSIONAL DEVELOPMENT</span>
                        </div>
                        <h3 className="text-3xl font-display font-extrabold uppercase text-foreground mb-3 group-hover:text-primary transition-colors">
                          Training Catalogue
                        </h3>
                        <p className="text-sm text-secondary font-sans leading-relaxed">
                          Complete catalogue of technical training programs, professional courses, and customized learning solutions for plant engineers and operating teams.
                        </p>
                      </div>

                      {/* Download Buttons */}
                      <div className="pt-4 border-t border-neutral-200 space-y-3 font-mono text-xs">
                        <div className="text-[10px] text-neutral-400 uppercase font-extrabold tracking-wider">
                          Download Training Program Catalogues:
                        </div>
                        <div className="flex flex-col sm:flex-row gap-3">
                          <button
                            onClick={() => handleDownload("Macprotec Training Catalogue 2026.pdf")}
                            className="bg-neutral-950 hover:bg-primary text-white font-bold px-5 py-3 flex items-center justify-between gap-3 transition-colors shadow-sm group/btn"
                          >
                            <div className="flex items-center gap-2.5">
                              <FileText className="w-4 h-4 text-primary group-hover/btn:text-white" />
                              <span>1. Training Catalogue 2026</span>
                            </div>
                            <Download className="w-4 h-4 opacity-70 group-hover/btn:opacity-100" />
                          </button>

                          <button
                            onClick={() => handleDownload("CementX training for smart plants.pdf")}
                            className="bg-neutral-950 hover:bg-primary text-white font-bold px-5 py-3 flex items-center justify-between gap-3 transition-colors shadow-sm group/btn"
                          >
                            <div className="flex items-center gap-2.5">
                              <Sparkles className="w-4 h-4 text-primary group-hover/btn:text-white" />
                              <span>2. CementX Training</span>
                            </div>
                            <Download className="w-4 h-4 opacity-70 group-hover/btn:opacity-100" />
                          </button>
                        </div>
                      </div>
                    </div>

                  </div>
                </SpotlightCard>
              </Reveal>
            </div>
          )}

          {/* CARD 4: PREDICTIVE SOLUTIONS FOR CEMENT PLANTS */}
          {(selectedCategory === "all" || selectedCategory === "predictive-solutions") && (
            <div id="predictive-solutions" className="scroll-mt-28">
              <Reveal>
                <SpotlightCard className="bg-white border-2 border-border p-6 sm:p-10 hover:border-primary/60 transition-all duration-300 shadow-md group">
                  <div className="grid lg:grid-cols-12 gap-8 items-center">
                    
                    {/* Picture 4: Predictive Solutions Original Image */}
                    <div className="lg:col-span-5 relative h-72 sm:h-80 w-full overflow-hidden border border-neutral-200 shadow-inner">
                      <Image
                        src="/images/resources/predictive_solutions.jpg"
                        alt="MACPROTEC Predictive Solutions & Kiln OCMS Screen"
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute top-3 left-3 bg-neutral-950 text-white border border-primary/40 font-mono text-[10px] font-extrabold px-3 py-1 uppercase tracking-widest">
                        04 // ANALYTICS
                      </div>
                      <div className="absolute bottom-3 left-3 bg-yellow-400 text-neutral-950 font-mono text-[10px] font-bold px-2.5 py-1 uppercase tracking-wider">
                        Predictive Solutions for Cement Plants
                      </div>
                    </div>

                    {/* Content */}
                    <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
                      <div>
                        <div className="font-mono text-[10px] text-primary font-extrabold tracking-widest uppercase mb-1.5 flex items-center gap-1.5">
                          <Activity className="w-3.5 h-3.5" />
                          <span>PREDICTIVE ANALYTICS & MONITORING</span>
                        </div>
                        <h3 className="text-3xl font-display font-extrabold uppercase text-foreground mb-3 group-hover:text-primary transition-colors">
                          Predictive Solutions for Cement Plants
                        </h3>
                        <p className="text-sm text-secondary font-sans leading-relaxed">
                          Discover how MACPROTEC combines process expertise, predictive analytics, and intelligent monitoring technologies to improve equipment reliability, optimize plant performance, and reduce unplanned downtime.
                        </p>
                      </div>

                      {/* Download Buttons */}
                      <div className="pt-4 border-t border-neutral-200 space-y-3 font-mono text-xs">
                        <div className="text-[10px] text-neutral-400 uppercase font-extrabold tracking-wider">
                          Technical Whitepapers & Data Sheets:
                        </div>
                        <div className="flex flex-col sm:flex-row gap-3">
                          <button
                            onClick={() => handleDownload("Predictive Solutions for Cement Plants.pdf")}
                            className="bg-neutral-950 hover:bg-primary text-white font-bold px-5 py-3 flex items-center justify-between gap-3 transition-colors shadow-sm group/btn"
                          >
                            <div className="flex items-center gap-2.5">
                              <Activity className="w-4 h-4 text-primary group-hover/btn:text-white" />
                              <span>1. Predictive Solutions</span>
                            </div>
                            <Download className="w-4 h-4 opacity-70 group-hover/btn:opacity-100" />
                          </button>

                          <button
                            onClick={() => handleDownload("Kiln OCMS Technical Spec.pdf")}
                            className="bg-neutral-950 hover:bg-primary text-white font-bold px-5 py-3 flex items-center justify-between gap-3 transition-colors shadow-sm group/btn"
                          >
                            <div className="flex items-center gap-2.5">
                              <ShieldCheck className="w-4 h-4 text-primary group-hover/btn:text-white" />
                              <span>2. Kiln OCMS</span>
                            </div>
                            <Download className="w-4 h-4 opacity-70 group-hover/btn:opacity-100" />
                          </button>
                        </div>
                      </div>
                    </div>

                  </div>
                </SpotlightCard>
              </Reveal>
            </div>
          )}


        </section>

        {/* 4. FREQUENTLY ASKED QUESTIONS */}
        <section className="max-w-7xl mx-auto px-6 lg:px-8 border-t border-border pt-16">
          <Reveal className="mb-10">
            <div className="font-mono text-[10px] font-extrabold text-primary tracking-widest uppercase mb-2">
              ┌ TECHNICAL FAQ
            </div>
            <h2 className="text-3xl font-display font-extrabold uppercase text-foreground">
              Frequently Asked Questions
            </h2>
          </Reveal>

          <div className="space-y-4 max-w-4xl">
            {faqs.map((faq, idx) => (
              <Reveal key={faq.q}>
                <div className="bg-white border border-border overflow-hidden shadow-2xs">
                  <button
                    onClick={() => toggleFaq(idx)}
                    className="w-full p-5 text-left flex items-center justify-between gap-4 font-display font-extrabold text-sm uppercase text-foreground hover:text-primary transition-colors"
                  >
                    <span className="flex items-center gap-3">
                      <HelpCircle className="w-4 h-4 text-primary flex-shrink-0" />
                      {faq.q}
                    </span>
                    {activeFaq === idx ? (
                      <ChevronUp className="w-4 h-4 text-primary flex-shrink-0" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-neutral-400 flex-shrink-0" />
                    )}
                  </button>
                  {activeFaq === idx && (
                    <div className="p-5 pt-0 border-t border-neutral-100 font-sans text-xs text-secondary leading-relaxed bg-neutral-50/60">
                      {faq.a}
                    </div>
                  )}
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* 5. CONTACT US BANNER */}
        <section className="max-w-7xl mx-auto px-6 lg:px-8">
          <Reveal>
            <div className="bg-[#2d1b47] text-white p-10 sm:p-14 text-center relative overflow-hidden border-2 border-purple-500/40 shadow-2xl">
              <div className="absolute inset-0 blueprint-mesh opacity-20 pointer-events-none" />
              <div className="relative z-10 space-y-4">
                <div className="font-mono text-[11px] text-rose-400 font-extrabold uppercase tracking-widest flex items-center justify-center gap-2">
                  <span className="w-2 h-2 bg-rose-400 rounded-full animate-pulse" />
                  <span>NEED SPECIALIZED ENGINEERING DOCUMENTATION?</span>
                </div>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold uppercase text-white tracking-tight drop-shadow-sm">
                  Speak With Our Process Engineering Team
                </h2>
                <p className="text-sm sm:text-base text-purple-100 max-w-2xl mx-auto font-sans leading-relaxed opacity-95">
                  Our Houston-based engineering team is available to provide custom CFD studies, 3D laser scan reviews, and plant performance optimization proposals.
                </p>
                <div className="flex justify-center pt-3 font-mono text-xs">
                  <button
                    onClick={() => setContactModalOpen(true)}
                    className="bg-primary hover:bg-rose-700 text-white font-bold px-10 py-4 uppercase tracking-widest transition-all flex items-center gap-2.5 shadow-xl hover:shadow-rose-900/40"
                  >
                    <Send className="w-4 h-4" />
                    Contact Us
                  </button>
                </div>
              </div>
            </div>
          </Reveal>
        </section>

      </main>

      <Footer />
    </>
  );
}
