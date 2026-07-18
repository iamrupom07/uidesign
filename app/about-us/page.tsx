"use client";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import TechnicalCursor from "@/components/ui/TechnicalCursor";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { expertiseAreas } from "@/lib/constants";
import Link from "next/link";

export default function AboutUs() {
  const leadership = [
    { name: "John Doe", role: "Principal Process Engineer", exp: "28 Years Experience", avatar: "/images/avatar_john.png" },
    { name: "Jane Smith", role: "Chief CFD Specialist", exp: "20 Years Experience", avatar: "/images/avatar_jane.png" },
  ];

  const whyChooseUs = [
    {
      title: "Engineering-First Approach",
      desc: "Every recommendation is backed by detailed CFD, thermal, and stress simulation modeling, not off-the-shelf templates.",
    },
    {
      title: "Multi-Discipline Teams",
      desc: "Process, piping, mechanical, structural, and electrical engineers work under one unified dossier on every project.",
    },
    {
      title: "Proactive Site Monitoring",
      desc: "We focus on prevention. Deploying digital twin dashboards and telemetry KPI analytics to capture blocks early.",
    },
    {
      title: "Scalable Engagement SLAs",
      desc: "Flexible collaboration models ranging from project-based FEED packages to long-term site support SLAs.",
    },
  ];

  return (
    <>
      <TechnicalCursor />
      <Header />
      
      <main className="bg-background min-h-screen py-24 space-y-24">
        
        {/* 1. Company Overview Section */}
        <section className="max-w-7xl mx-auto px-6 lg:px-8 relative">
          <div className="absolute top-0 right-0 w-32 h-32 border-b border-l border-primary/20 opacity-20 pointer-events-none" />
          <Reveal>
            <div className="font-mono text-[11px] font-bold text-primary tracking-widest uppercase mb-4">
              <span className="text-primary font-bold mr-1">┌</span> ABOUT US / SECTION 01
            </div>
            <h1 className="text-4xl sm:text-5xl font-display font-extrabold text-foreground uppercase tracking-tight leading-none mb-6">
              Company <span className="text-primary">Overview</span>
            </h1>
          </Reveal>
          
          <div className="grid lg:grid-cols-2 gap-lg items-center mt-8">
            <Reveal delay={0.08}>
              <p className="body-md text-secondary leading-relaxed font-sans">
                MacProtec is a Houston-based engineering consulting and system integrating company specializing in cement, aggregate, mining, critical minerals, chemicals, petrochemicals, and heavy process industries. We combine deep process chemistry knowledge with detailed mechanical, piping, and automation layouts.
              </p>
              <p className="body-md text-secondary leading-relaxed font-sans mt-4">
                Operating out of Houston, Texas, our teams support brownfield retrofits, emission reviews, energy debottlenecking, and green energy combustion upgrades worldwide.
              </p>
            </Reveal>
            
            <Reveal delay={0.16}>
              <div className="bg-white border border-border p-8 rounded-none relative">
                <div className="absolute top-4 right-4 font-mono text-[8px] text-slate-400">LOC-COORD / TX</div>
                <div className="space-y-4 font-mono text-xs text-secondary">
                  <div className="flex justify-between border-b border-border pb-2">
                    <span>HEADQUARTERS:</span>
                    <span className="text-foreground font-bold">HOUSTON, TX</span>
                  </div>
                  <div className="flex justify-between border-b border-border pb-2">
                    <span>COORDINATES:</span>
                    <span className="text-foreground font-bold">29.76°N 95.37°W</span>
                  </div>
                  <div className="flex justify-between border-b border-border pb-2">
                    <span>ESTABLISHED EXPERIENCE:</span>
                    <span className="text-foreground font-bold">65+ COMBINED YEARS</span>
                  </div>
                  <div className="flex justify-between">
                    <span>PRIMARY FOCUS:</span>
                    <span className="text-foreground font-bold">HEAVY PROCESS PLANTS</span>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* 2. Mission & Vision Section */}
        <section className="max-w-7xl mx-auto px-6 lg:px-8">
          <Reveal className="mb-10">
            <div className="font-mono text-[11px] font-bold text-primary tracking-widest uppercase mb-4">
              <span className="text-primary font-bold mr-1">┌</span> CORE VALUES / SECTION 02
            </div>
            <h2 className="font-display font-extrabold text-3xl text-foreground uppercase tracking-tight">
              Mission & <span className="text-primary">Vision</span>
            </h2>
          </Reveal>

          <div className="grid md:grid-cols-2 gap-lg">
            <Reveal>
              <div className="card relative h-full">
                <div className="font-mono text-[11px] font-bold text-primary tracking-widest uppercase mb-4">
                  <span className="text-primary font-bold mr-1">┌</span> MISSION STATEMENT
                </div>
                <h3 className="font-display font-extrabold text-xl text-foreground mb-4 uppercase">
                  Drive Plant Efficiency
                </h3>
                <p className="text-xs text-secondary leading-relaxed font-sans">
                  Our mission is to deliver exceptional engineering designs, process optimizations, and digital twins that help our industrial partners maximize plant throughput while integrating green fuels and decreasing emissions.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="card relative h-full">
                <div className="font-mono text-[11px] font-bold text-primary tracking-widest uppercase mb-4">
                  <span className="text-primary font-bold mr-1">┌</span> VISION TARGET
                </div>
                <h3 className="font-display font-extrabold text-xl text-foreground mb-4 uppercase">
                  Pioneer Digital Twin Technology
                </h3>
                <p className="text-xs text-secondary leading-relaxed font-sans">
                  Our vision is to be the premier engineering consulting partner globally for heavy process industries, setting standard methods for laser scanning reverse-engineering and predictive machine-learning dashboards.
                </p>
              </div>
            </Reveal>
          </div>
        </section>

        {/* 3. Engineering Philosophy Section */}
        <section className="max-w-7xl mx-auto px-6 lg:px-8">
          <Reveal className="mb-6">
            <div className="font-mono text-[11px] font-bold text-primary tracking-widest uppercase mb-4">
              <span className="text-primary font-bold mr-1">┌</span> SYSTEM DESIGN / SECTION 03
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <div className="grid lg:grid-cols-[1fr_2fr] gap-lg items-center bg-white border border-border p-8 sm:p-12 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 border-b border-l border-primary/20 opacity-20 pointer-events-none">
                <div className="absolute top-4 right-4 font-mono text-[9px] text-slate-400">PHIL-01 / CORE</div>
              </div>
              <div className="border-l-4 border-primary pl-6">
                <div className="font-mono text-[10px] font-bold text-primary tracking-widest uppercase mb-1">
                  Engineering Philosophy
                </div>
                <h3 className="font-display font-extrabold text-2xl text-foreground uppercase tracking-tight leading-none">
                  Data-Driven <br /> Precision
                </h3>
              </div>
              <div>
                <p className="text-foreground text-base sm:text-lg font-bold leading-relaxed font-display uppercase">
                  We believe process designs must be verified mathematically before physical components are fabricated. That is why advanced CFD flow and thermal simulations guide every recommendation we make.
                </p>
              </div>
            </div>
          </Reveal>
        </section>

        {/* 4. Industry Expertise Section */}
        <section className="max-w-7xl mx-auto px-6 lg:px-8">
          <Reveal className="mb-10">
            <div className="font-mono text-[11px] font-bold text-primary tracking-widest uppercase mb-4">
              <span className="text-primary font-bold mr-1">┌</span> APPLIED SECTORS / SECTION 04
            </div>
            <h2 className="font-display font-extrabold text-3xl text-foreground uppercase tracking-tight">
              Industry <span className="text-primary">Expertise</span>
            </h2>
          </Reveal>

          <RevealGroup className="grid sm:grid-cols-2 lg:grid-cols-3 gap-lg" stagger={0.06}>
            {expertiseAreas.map((area, i) => (
              <RevealItem key={area.slug}>
                <div className="card relative h-full flex flex-col justify-between">
                  <div>
                    <div className="font-mono text-[10px] font-bold text-primary tracking-wider uppercase mb-4">
                      EXP&#8209;{String(i + 1).padStart(2, "0")}
                    </div>
                    <h3 className="font-display font-extrabold text-base text-foreground mb-3 uppercase leading-snug">
                      {area.title}
                    </h3>
                    <p className="text-xs text-secondary font-sans leading-relaxed">
                      Optimizing process limits, combustion velocities, stress loads, and layout configurations custom-fit for {area.title}.
                    </p>
                  </div>
                  <div className="mt-6 pt-4 border-t border-border">
                    <Link
                      href={`/industries/${area.slug}`}
                      className="font-mono text-[10px] font-bold text-primary hover:text-rose-700 uppercase tracking-widest flex items-center gap-1.5"
                    >
                      Read Specifications →
                    </Link>
                  </div>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </section>

        {/* 5. Leadership Section */}
        <section className="max-w-7xl mx-auto px-6 lg:px-8">
          <Reveal className="mb-10">
            <div className="font-mono text-[11px] font-bold text-primary tracking-widest uppercase mb-4">
              <span className="text-primary font-bold mr-1">┌</span> ORG DOSSIER / SECTION 05
            </div>
            <h2 className="font-display font-extrabold text-3xl text-foreground uppercase tracking-tight">
              Leadership
            </h2>
          </Reveal>

          <RevealGroup className="grid sm:grid-cols-2 gap-lg" stagger={0.08}>
            {leadership.map((member) => (
              <RevealItem key={member.name}>
                <div className="card relative flex flex-col justify-between h-full">
                  <div>
                    {/* Technical 3D scanning visualization avatar */}
                    <div className="relative w-full aspect-[4/3] border border-border bg-slate-50 overflow-hidden mb-6">
                      <img
                        src={member.avatar}
                        alt={`${member.name} avatar`}
                        className="w-full h-full object-cover grayscale opacity-95"
                      />
                      <div className="absolute inset-0 bg-primary/5 pointer-events-none" />
                    </div>

                    <h3 className="font-display font-extrabold text-lg text-foreground uppercase">
                      {member.name}
                    </h3>
                    <p className="font-mono text-[10px] font-semibold text-primary tracking-wider uppercase mt-1">
                      {member.role}
                    </p>
                    <p className="text-xs text-secondary font-sans mt-4">
                      Dedicated lead engineer guiding layout designs, client relations, and quality checks.
                    </p>
                  </div>
                  <div className="mt-8 pt-4 border-t border-border font-mono text-[9px] text-slate-400 uppercase tracking-widest">
                    {member.exp}
                  </div>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </section>

        {/* 6. Why MACPROTEC Section */}
        <section className="max-w-7xl mx-auto px-6 lg:px-8">
          <Reveal className="mb-10">
            <div className="font-mono text-[11px] font-bold text-primary tracking-widest uppercase mb-4">
              <span className="text-primary font-bold mr-1">┌</span> SERVICE CREDENTIALS / SECTION 06
            </div>
            <h2 className="font-display font-extrabold text-3xl text-foreground uppercase tracking-tight">
              Why <span className="text-primary">MACPROTEC</span>
            </h2>
          </Reveal>

          <RevealGroup className="grid sm:grid-cols-2 lg:grid-cols-4 gap-lg" stagger={0.08}>
            {whyChooseUs.map((item, i) => (
              <RevealItem key={item.title}>
                <div className="card relative h-full flex flex-col justify-between">
                  <div>
                    <div className="w-8 h-8 bg-rose-50 border border-rose-100 flex items-center justify-center font-mono text-xs font-bold text-primary rounded-none mb-4 shrink-0">
                      0{i + 1}
                    </div>
                    <h3 className="font-display font-extrabold text-sm text-foreground mb-3 uppercase leading-tight">
                      {item.title}
                    </h3>
                    <p className="text-xs text-secondary leading-relaxed font-sans">
                      {item.desc}
                    </p>
                  </div>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </section>

      </main>

      <Footer />
    </>
  );
}
