"use client";

import { useState } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import TechnicalCursor from "@/components/ui/TechnicalCursor";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import Link from "next/link";
import Image from "next/image";
import {
  PROJECT_CATEGORIES,
  CASE_STUDIES_LIST,
  ProjectExperienceCategory,
} from "@/lib/projects-data";
import {
  Globe2,
  Cpu,
  Layers,
  ShieldCheck,
  Award,
  Users,
  Factory,
  ArrowRight,
  Sparkles,
  Target,
  CheckCircle2,
  Flame,
  Activity,
  Workflow,
  LineChart,
  Compass,
  FileText,
  MapPin,
  ChevronDown,
  ChevronUp,
  Building2,
  ExternalLink,
  ChevronRight,
} from "lucide-react";
import LatestBlogs from "@/components/home/LatestBlogs";

export default function ProjectsPage() {
  const [expandedCards, setExpandedCards] = useState<Record<string, boolean>>({
    "01": true,
    "02": false,
    "03": false,
    "04": false,
    "05": false,
  });

  const toggleExpand = (id: string) => {
    setExpandedCards((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <>
      <TechnicalCursor />
      <Header />

      <main className="bg-slate-50 min-h-screen text-slate-800 font-sans selection:bg-rose-500 selection:text-white space-y-20 pb-20">
        {/* BREADCRUMB / TOP DOSSIER BAR (Matching /industries design) */}
        <section className="bg-[#2d1b47] border-b border-[#3e2663] text-white py-3 px-6 lg:px-8 font-mono text-xs">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-2 text-slate-400">
              <Link href="/" className="hover:text-white transition-colors">
                Home
              </Link>
              <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
              <span className="text-primary font-bold">Projects & Case Studies</span>
            </div>
            <div className="hidden sm:flex items-center gap-4 text-[10px] text-slate-400">
              <span className="uppercase font-bold tracking-wider">
                PROJECT TRACK RECORD // GLOBAL PORTFOLIO
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-emerald-400 font-bold uppercase">
                25+ Countries Active
              </span>
            </div>
          </div>
        </section>

        {/* SECTION 1: FULL-WIDTH HERO SECTION (Matching /industries Hero Style) */}
        <section className="w-full relative bg-black border-b-2 border-primary/30 py-16 sm:py-20 lg:py-24 overflow-hidden group">
          {/* Full-width Background Image */}
          <div className="absolute inset-0 w-full h-full pointer-events-none">
            <Image
              src="/images/projects/hero_stacker_conveyor.jpg"
              alt="MacProtec Industrial Mining & Material Handling Stacker Conveyor"
              fill
              priority
              className="object-cover object-center opacity-100 group-hover:scale-105 transition-transform duration-1000 ease-out"
            />
            {/* Transparent Black Gradient Overlay for High Background Picture Visibility */}
            <div className="absolute inset-0 bg-black/50 bg-gradient-to-b from-black/70 via-black/40 to-black/80" />
            <div className="absolute inset-0 bg-[radial-gradient(#e11d48_1px,transparent_1px)] [background-size:24px_24px] opacity-15 pointer-events-none" />
          </div>

          {/* Centered Overlay Content */}
          <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
            <Reveal>
              <div className="max-w-4xl mx-auto flex flex-col items-center text-center space-y-6">
                {/* Category Badge Ticker */}
                <div className="inline-flex items-center gap-2 bg-[#2d1b47]/90 border border-primary/40 px-4 py-1.5 font-mono text-[11px] font-extrabold text-primary tracking-widest uppercase shadow-md backdrop-blur-xs">
                  <Sparkles className="w-3.5 h-3.5 text-primary animate-pulse" />
                  <span>PROJECT DOSSIER // REAL PLANT CHALLENGES</span>
                </div>

                {/* Main Hero Title */}
                <div className="flex justify-center w-full">
                  <h1 className="text-4xl sm:text-6xl lg:text-7xl font-display font-black uppercase tracking-tight text-white drop-shadow-2xl">
                    Engineering Projects <br />
                    <span className="text-primary">& Case Studies</span>
                  </h1>
                </div>

                {/* Subtitle Description with High Contrast */}
                <p className="text-slate-200 font-sans text-base sm:text-lg leading-relaxed max-w-3xl mx-auto drop-shadow-md">
                  Engineering solutions developed around real plant challenges, operational constraints, and performance objectives.
                </p>

                {/* Hero Action Buttons */}
                <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
                  <a
                    href="#project-experience"
                    className="px-8 py-4 bg-primary hover:bg-rose-700 text-white font-mono text-xs font-bold uppercase tracking-wider transition-all duration-150 shadow-xl flex items-center gap-2 group"
                  >
                    <span>Explore 5 Project Disciplines</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </a>

                  <a
                    href="#case-studies"
                    className="px-8 py-4 bg-[#201235] border border-white/20 hover:border-white text-white font-mono text-xs font-bold uppercase tracking-wider transition-all duration-150 flex items-center gap-2 hover:bg-[#2d1b47]"
                  >
                    <span>View Case Studies</span>
                    <ArrowRight className="w-4 h-4 text-slate-400" />
                  </a>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* 2. Global Industry Experience Behind MACPROTEC */}
        <section className="max-w-7xl mx-auto px-6 lg:px-8">
          <Reveal>
            <div className="bg-[#2d1b47] text-white p-8 sm:p-12 border border-[#3e2663] relative overflow-hidden shadow-2xl space-y-8">
              <div className="absolute top-0 right-0 w-64 h-64 border-b border-l border-primary/20 opacity-20 pointer-events-none" />

              <div className="grid lg:grid-cols-12 gap-8 items-center">
                {/* Metrics */}
                <div className="lg:col-span-6 grid grid-cols-3 gap-4 sm:gap-6 border-b lg:border-b-0 lg:border-r border-[#3e2663] pb-8 lg:pb-0 lg:pr-8">
                  <div className="space-y-1">
                    <div className="font-display font-black text-4xl sm:text-5xl text-primary">
                      25+
                    </div>
                    <div className="font-mono text-xs font-bold text-slate-300 uppercase tracking-widest">
                      Countries
                    </div>
                  </div>

                  <div className="space-y-1">
                    <div className="font-display font-black text-4xl sm:text-5xl text-primary">
                      5
                    </div>
                    <div className="font-mono text-xs font-bold text-slate-300 uppercase tracking-widest">
                      Continents
                    </div>
                  </div>

                  <div className="space-y-1">
                    <div className="font-display font-black text-4xl sm:text-5xl text-primary">
                      20+
                    </div>
                    <div className="font-mono text-xs font-bold text-slate-300 uppercase tracking-widest">
                      Years Industry Exp.
                    </div>
                  </div>
                </div>

                {/* Qualifier Text */}
                <div className="lg:col-span-6 space-y-3">
                  <div className="font-mono text-xs font-bold text-primary tracking-widest uppercase flex items-center gap-2">
                    <Globe2 className="w-4 h-4 text-primary" />
                    GLOBAL INDUSTRY EXPERIENCE BEHIND MACPROTEC
                  </div>
                  <p className="text-slate-200 text-sm sm:text-base leading-relaxed font-sans font-medium">
                    MACPROTEC is backed by leadership experience gained through
                    engineering, optimization, commissioning, and technical assignments
                    across cement and process industries worldwide.
                  </p>
                </div>
              </div>
            </div>
          </Reveal>
        </section>

        {/* 3. Overall Project Experience (5 Large Cards with Pictures & Collapsible Lists) */}
        <section
          id="project-experience"
          className="max-w-7xl mx-auto px-6 lg:px-8 space-y-10 scroll-mt-10"
        >
          <Reveal>
            <div className="font-mono text-[11px] font-bold text-primary tracking-widest uppercase mb-2">
              <span className="text-primary font-bold mr-1">┌</span> OVERALL PROJECT EXPERIENCE
            </div>
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-foreground uppercase tracking-tight">
              Project <span className="text-primary">Track Record</span>
            </h2>
            <p className="font-mono text-sm font-semibold text-secondary max-w-3xl mt-2">
              Click into any of the 5 engineering disciplines below to view the comprehensive list of field assignments, plant retrofits, and global commissioning projects.
            </p>
          </Reveal>

          <div className="space-y-8">
            {PROJECT_CATEGORIES.map((cat) => {
              const isExpanded = expandedCards[cat.id];
              return (
                <Reveal key={cat.id}>
                  <div className="bg-white border border-border overflow-hidden shadow-sm hover:border-primary/60 transition-all duration-200">
                    {/* Card Header with Picture */}
                    <div className="grid lg:grid-cols-12 items-center">
                      {/* Image Thumbnail */}
                      <div className="lg:col-span-4 relative h-64 lg:h-full min-h-[220px] bg-slate-900 overflow-hidden border-b lg:border-b-0 lg:border-r border-border group">
                        <Image
                          src={cat.image}
                          alt={cat.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                        <div className="absolute top-3 left-3 font-mono text-[10px] font-bold px-2 py-0.5 bg-primary text-white uppercase tracking-wider">
                          CATEGORY {cat.id} / {cat.badge}
                        </div>
                      </div>

                      {/* Content Area */}
                      <div className="lg:col-span-8 p-6 sm:p-8 flex flex-col justify-between space-y-4">
                        <div className="space-y-2">
                          <div className="font-mono text-[10px] font-bold text-primary uppercase tracking-widest">
                            DISCIPLINE {cat.id} ({cat.projects.length} PROJECTS)
                          </div>
                          <h3 className="font-display font-extrabold text-2xl sm:text-3xl text-foreground uppercase tracking-tight">
                            {cat.title}
                          </h3>
                          <p className="text-sm text-secondary font-sans leading-relaxed">
                            {cat.description}
                          </p>
                        </div>

                        {/* Interactive Expand / Collapse Button */}
                        <div className="pt-4 border-t border-border/80 flex items-center justify-between">
                          <button
                            onClick={() => toggleExpand(cat.id)}
                            className="font-mono text-xs font-bold text-primary hover:text-rose-700 uppercase tracking-wider flex items-center gap-2 py-1 transition-colors cursor-pointer"
                          >
                            <span>
                              {isExpanded
                                ? `Hide Project List (${cat.projects.length})`
                                : `Show Project Experience List (${cat.projects.length})`}
                            </span>
                            {isExpanded ? (
                              <ChevronUp className="w-4 h-4" />
                            ) : (
                              <ChevronDown className="w-4 h-4" />
                            )}
                          </button>

                          <span className="font-mono text-[10px] text-slate-400 font-semibold">
                            {cat.projects.length} ASSIGNMENTS RECORDED
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Expandable Project List View */}
                    {isExpanded && (
                      <div className="border-t border-border bg-slate-50 p-6 sm:p-8 space-y-4">
                        <div className="font-mono text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-2">
                          <Building2 className="w-4 h-4 text-primary" />
                          <span>DOCUMENTED PLANT PROJECTS & TECHNICAL STUDIES:</span>
                        </div>

                        <div className="grid sm:grid-cols-2 gap-3 pt-2">
                          {cat.projects.map((proj, idx) => (
                            <div
                              key={idx}
                              className="p-4 bg-white border border-border hover:border-primary/40 transition-colors shadow-2xs space-y-1.5"
                            >
                              <div className="flex items-start gap-2">
                                <span className="w-2 h-2 rounded-full bg-primary shrink-0 mt-1.5" />
                                <h4 className="font-display font-extrabold text-sm text-foreground uppercase leading-snug">
                                  {proj.name}
                                </h4>
                              </div>
                              <div className="pl-4 space-y-0.5 font-mono text-[11px] text-secondary">
                                <div className="font-semibold text-slate-700">
                                  {proj.client}
                                </div>
                                <div className="text-slate-500 flex items-center gap-1">
                                  <MapPin className="w-3 h-3 text-primary shrink-0" />
                                  <span>{proj.location}</span>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </Reveal>
              );
            })}
          </div>
        </section>

        {/* 4. Case Studies Section */}
        <section id="case-studies" className="max-w-7xl mx-auto px-6 lg:px-8 space-y-10 scroll-mt-10">
          <Reveal>
            <div className="font-mono text-[11px] font-bold text-primary tracking-widest uppercase mb-2">
              <span className="text-primary font-bold mr-1">┌</span> FEATURED CASE STUDIES
            </div>
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-foreground uppercase tracking-tight">
              Case <span className="text-primary">Studies</span>
            </h2>
            <p className="font-mono text-sm font-semibold text-secondary">
              In-depth technical investigations demonstrating measurable energy, reliability, and throughput outcomes.
            </p>
          </Reveal>

          <RevealGroup
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8"
            stagger={0.08}
          >
            {CASE_STUDIES_LIST.map((study) => (
              <RevealItem key={study.slug}>
                <div className="bg-white border border-border p-8 rounded-none relative h-full flex flex-col justify-between hover:border-primary transition-all duration-300 hover:shadow-lg shadow-sm">
                  <div className="space-y-4">
                    <div className="inline-block bg-rose-50 text-primary border border-rose-100 px-2.5 py-1 font-mono text-[10px] font-bold uppercase tracking-wider">
                      {study.category}
                    </div>

                    <h3 className="font-display font-extrabold text-lg text-foreground uppercase leading-snug">
                      {study.title}
                    </h3>

                    <div className="p-2.5 bg-emerald-50 border border-emerald-200 text-emerald-800 font-mono text-xs font-bold uppercase">
                      {study.highlight}
                    </div>

                    <p className="text-xs text-secondary font-sans leading-relaxed">
                      {study.summary}
                    </p>
                  </div>

                  <div className="mt-8 pt-4 border-t border-border flex items-center justify-between">
                    <Link
                      href={`/projects/${study.slug}`}
                      className="font-mono text-xs font-bold text-primary hover:text-rose-700 uppercase tracking-widest flex items-center gap-1.5 group"
                    >
                      <span>Read Case Study</span>
                      <ChevronRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </section>

        {/* 5. Engineering Articles (Same as Home page info) */}
        <section className="border-t border-border pt-10">
          <LatestBlogs />
        </section>

        {/* 6. Contact CTA Section */}
        <section className="max-w-7xl mx-auto px-6 lg:px-8">
          <Reveal>
            <div className="bg-[#2d1b47] text-white p-10 sm:p-14 border border-[#3e2663] relative overflow-hidden shadow-2xl flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="absolute top-0 right-0 w-48 h-48 border-b border-l border-primary/20 pointer-events-none" />
              <div className="max-w-2xl">
                <div className="font-mono text-xs font-bold text-primary tracking-widest uppercase mb-3 flex items-center gap-2">
                  <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                  INITIATE INDUSTRIAL ENGAGEMENT
                </div>
                <h2 className="font-display font-extrabold text-3xl sm:text-4xl uppercase tracking-tight leading-tight text-white">
                  Have a Complex Plant <br />
                  <span className="text-primary">Upgrade or Engineering Challenge?</span>
                </h2>
                <p className="text-slate-200 text-sm sm:text-base font-sans mt-4 leading-relaxed">
                  Leverage our 20+ years of global plant experience across 25+ countries. Connect with our principal engineers to review your project scope.
                </p>
              </div>

              <div className="shrink-0">
                <Link
                  href="/lets-connect"
                  className="inline-flex items-center gap-3 px-8 py-4 bg-primary text-white font-mono text-xs font-bold tracking-widest uppercase hover:bg-rose-700 transition-colors shadow-lg"
                >
                  <span>CONTACT ENGINEERING TEAM</span>
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
