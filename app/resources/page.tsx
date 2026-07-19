"use client";

import { useState } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import TechnicalCursor from "@/components/ui/TechnicalCursor";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { Magnetic } from "@/components/ui/Magnetic";
import Link from "next/link";

export default function ResourcesPage() {
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);
  
  // Interactive state for FAQ Accordion
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  // Kiln Calculator States
  const [kilnLength, setKilnLength] = useState<number>(60);
  const [kilnDiameter, setKilnDiameter] = useState<number>(4);
  const [shellTemp, setShellTemp] = useState<number>(320);
  const [fuelCost, setFuelCost] = useState<number>(8.5);

  // Calculations logic
  const tAmb = 25; // ambient °C
  const eps = 0.90; // emissivity
  const sigma = 5.67e-8; // Stefan-Boltzmann
  const hours = 8000;

  const area = Math.PI * kilnDiameter * kilnLength;
  const tShellK = shellTemp + 273.15;
  const tAmbK = tAmb + 273.15;

  // Radiation heat loss (Watts)
  const qRad = eps * sigma * area * (Math.pow(tShellK, 4) - Math.pow(tAmbK, 4));

  // Convection heat loss (hc approximation)
  const hc = 1.32 * Math.pow((shellTemp - tAmb) / (kilnDiameter || 1), 0.25);
  const qConv = hc * area * (shellTemp - tAmb);

  const qTotal = qRad + qConv; // Watts
  const gjPerYear = (qTotal * 3600 * hours) / 1e9; // GJ/year
  const lossCost = gjPerYear * fuelCost;

  // Projected savings assuming temperature reduction of 50°C
  const savedShellTemp = Math.max(tAmb + 10, shellTemp - 50);
  const tSavedK = savedShellTemp + 273.15;
  const qRadSaved = eps * sigma * area * (Math.pow(tSavedK, 4) - Math.pow(tAmbK, 4));
  const hcSaved = 1.32 * Math.pow((savedShellTemp - tAmb) / (kilnDiameter || 1), 0.25);
  const qConvSaved = hcSaved * area * (savedShellTemp - tAmb);
  const qTotalSaved = qRadSaved + qConvSaved;
  const gjSaved = (qTotalSaved * 3600 * hours) / 1e9;
  const lossCostSaved = gjSaved * fuelCost;
  const projectedSavings = Math.max(0, lossCost - lossCostSaved);

  const toggleFaq = (idx: number) => {
    setActiveFaq(activeFaq === idx ? null : idx);
  };

  const blogs = [
    { title: "Resolving Preheater Build-up", excerpt: "How chemical balance modifications reduce material coating in cement kiln bypasses." },
    { title: "Choosing CFD Solver Models", excerpt: "A guide to selecting multi-phase Eulerian solvers versus discrete phase tracking models." },
  ];

  const whitepapers = [
    { title: "Alternative Fuels Flame Optimization", desc: "Advanced combustion diagnostics under alternative fuel substitution rates up to 85%." },
    { title: "Reverse Engineering Coordinate Verification", desc: "Tolerances, point-cloud noise filters, and FEA validations for brownfield retrofits." },
  ];

  const guides = [
    { title: "Control Valve Sizing Guides", desc: "Detailed step-by-step calculations for gas, vapor, and liquid lines under ASME bounds." },
    { title: "Burner Swirl Design Formulas", desc: "Calculate swirl index numbers and momentum profiles for optimized flame lengths." },
  ];

  const articles = [
    { title: "Water Hammer Transient Auditing", desc: "Minimizing surge risks in piping systems through transient flow dynamics reviews." },
    { title: "Cement Kiln Heat Transfer Reviews", desc: "Reducing thermal losses through refractory thickness calibrations and shell stress audits." },
  ];

  const insights = [
    { title: "Alternative Fuel Trends in Cement Plants", desc: "Analyzing how changes in environmental regulations drive alternative fuel use in cement kilns." },
    { title: "3D Scanner Tech Updates", desc: "Reviewing how high-definition coordinate scanning changes spatial layout designs." },
  ];

  const brochures = [
    { title: "MACPROTEC Capability Profile", size: "2.4 MB" },
    { title: "Process Engineering Services Brochure", size: "1.8 MB" },
  ];

  const companyProfiles = [
    { title: "Company Profile Dossier 2026", size: "3.2 MB" },
    { title: "Technical Integration Standards", size: "4.1 MB" },
  ];

  const videos = [
    { title: "Kiln Preheater CFD Simulation", length: "4:22" },
    { title: "3D Laser Scanning Site Verification Walkthrough", length: "8:45" },
  ];

  const webinars = [
    { title: "Debottlenecking Grinding Mill Separators", date: "August 12, 2026 at 10:00 AM CST" },
    { title: "Transient Surge Analysis in Chemical Pipes", date: "September 8, 2026 at 2:00 PM CST" },
  ];

  const downloads = [
    { title: "Orifice Plate Calculation Spreadsheet", type: "XLSX" },
    { title: "FEA Pipe Stress Constraint Templates", type: "DWG" },
  ];

  const faqs = [
    { q: "What solvers do you use for process flow simulations?", a: "We primarily utilize ANSYS Fluent for complex, multi-phase CFD, and HYSYS for steady-state/dynamic process flowsheet mass balances." },
    { q: "Can you reverse-engineer as-built plants from laser scans?", a: "Yes. We deploy high-resolution scanners to generate millimeter-accurate coordinate point clouds, reconstruct CAD models, and verify tolerances." },
    { q: "Do your designs comply with standard engineering guidelines?", a: "Absolutely. All mechanical drafts and stress analyses comply with ASME Section VIII, API, and local environmental standards." },
  ];

  return (
    <>
      <TechnicalCursor />
      <Header />

      <main className="bg-background min-h-screen blueprint-mesh py-24 space-y-24">
        
        {/* Banner Title */}
        <section className="max-w-7xl mx-auto px-6 lg:px-8 relative">
          <Reveal>
            <div className="font-mono text-[11px] font-bold text-primary tracking-widest uppercase mb-4">
              <span className="text-primary font-bold mr-1">┌</span> KNOWLEDGE BANK
            </div>
            <h1 className="text-4xl sm:text-5xl font-display font-extrabold text-foreground uppercase tracking-tight leading-none">
              Resources & <span className="text-primary">Insights</span>
            </h1>
            <p className="body-md text-secondary mt-4 max-w-2xl">
              Access calculations, publications, guides, and corporate profiles compiled by MacProtec&apos;s process engineers.
            </p>
          </Reveal>
        </section>

        {/* 1. Technical Blogs */}
        <section className="max-w-7xl mx-auto px-6 lg:px-8">
          <Reveal className="mb-8">
            <div className="font-mono text-[10px] font-bold text-primary tracking-widest uppercase mb-3">
              <span className="text-primary font-bold mr-1">┌</span> TECHNICAL BLOGS // SEC-01
            </div>
            <h2 className="text-2xl font-display font-extrabold uppercase">Engineering Blogs</h2>
          </Reveal>
          <RevealGroup className="grid md:grid-cols-2 gap-lg" stagger={0.08}>
            {blogs.map((item) => (
              <RevealItem key={item.title}>
                <div className="card bg-white h-full flex flex-col justify-between">
                  <div>
                    <h3 className="font-display font-extrabold text-sm uppercase text-foreground mb-3">{item.title}</h3>
                    <p className="text-xs text-secondary leading-relaxed font-sans">{item.excerpt}</p>
                  </div>
                  <Link href="/resources/blogs" className="font-mono text-[9px] text-primary font-bold uppercase mt-6 tracking-widest hover:text-rose-700">
                    Read Article →
                  </Link>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </section>

        {/* 2. White Papers */}
        <section className="max-w-7xl mx-auto px-6 lg:px-8 border-t border-border pt-20">
          <Reveal className="mb-8">
            <div className="font-mono text-[10px] font-bold text-primary tracking-widest uppercase mb-3">
              <span className="text-primary font-bold mr-1">┌</span> WHITE PAPERS // SEC-02
            </div>
            <h2 className="text-2xl font-display font-extrabold uppercase">Research White Papers</h2>
          </Reveal>
          <RevealGroup className="grid md:grid-cols-2 gap-lg" stagger={0.08}>
            {whitepapers.map((item) => (
              <RevealItem key={item.title}>
                <div className="card bg-white h-full flex flex-col justify-between">
                  <div>
                    <h3 className="font-display font-extrabold text-sm uppercase text-foreground mb-3">{item.title}</h3>
                    <p className="text-xs text-secondary leading-relaxed font-sans">{item.desc}</p>
                  </div>
                  <Link href="/resources/white-papers" className="font-mono text-[9px] text-primary font-bold uppercase mt-6 tracking-widest hover:text-rose-700">
                    Download PDF →
                  </Link>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </section>

        {/* 3. Engineering Guides */}
        <section className="max-w-7xl mx-auto px-6 lg:px-8 border-t border-border pt-20">
          <Reveal className="mb-8">
            <div className="font-mono text-[10px] font-bold text-primary tracking-widest uppercase mb-3">
              <span className="text-primary font-bold mr-1">┌</span> ENGINEERING GUIDES // SEC-03
            </div>
            <h2 className="text-2xl font-display font-extrabold uppercase">Calculations & Guides</h2>
          </Reveal>
          <RevealGroup className="grid md:grid-cols-2 gap-lg" stagger={0.08}>
            {guides.map((item) => (
              <RevealItem key={item.title}>
                <div className="card bg-white h-full flex flex-col justify-between">
                  <div>
                    <h3 className="font-display font-extrabold text-sm uppercase text-foreground mb-3">{item.title}</h3>
                    <p className="text-xs text-secondary leading-relaxed font-sans">{item.desc}</p>
                  </div>
                  <Link href="/resources/guides" className="font-mono text-[9px] text-primary font-bold uppercase mt-6 tracking-widest hover:text-rose-700">
                    Explore Guide →
                  </Link>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </section>

        {/* 4. Technical Articles */}
        <section className="max-w-7xl mx-auto px-6 lg:px-8 border-t border-border pt-20">
          <Reveal className="mb-8">
            <div className="font-mono text-[10px] font-bold text-primary tracking-widest uppercase mb-3">
              <span className="text-primary font-bold mr-1">┌</span> TECHNICAL ARTICLES // SEC-04
            </div>
            <h2 className="text-2xl font-display font-extrabold uppercase">Brief Briefings</h2>
          </Reveal>
          <RevealGroup className="grid md:grid-cols-2 gap-lg" stagger={0.08}>
            {articles.map((item) => (
              <RevealItem key={item.title}>
                <div className="card bg-white h-full flex flex-col justify-between">
                  <div>
                    <h3 className="font-display font-extrabold text-sm uppercase text-foreground mb-3">{item.title}</h3>
                    <p className="text-xs text-secondary leading-relaxed font-sans">{item.desc}</p>
                  </div>
                  <Link href="/resources/articles" className="font-mono text-[9px] text-primary font-bold uppercase mt-6 tracking-widest hover:text-rose-700">
                    Read Article →
                  </Link>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </section>

        {/* 5. Industry Insights */}
        <section className="max-w-7xl mx-auto px-6 lg:px-8 border-t border-border pt-20">
          <Reveal className="mb-8">
            <div className="font-mono text-[10px] font-bold text-primary tracking-widest uppercase mb-3">
              <span className="text-primary font-bold mr-1">┌</span> INDUSTRY INSIGHTS // SEC-05
            </div>
            <h2 className="text-2xl font-display font-extrabold uppercase">Market & Tech Trends</h2>
          </Reveal>
          <RevealGroup className="grid md:grid-cols-2 gap-lg" stagger={0.08}>
            {insights.map((item) => (
              <RevealItem key={item.title}>
                <div className="card bg-white h-full flex flex-col justify-between">
                  <div>
                    <h3 className="font-display font-extrabold text-sm uppercase text-foreground mb-3">{item.title}</h3>
                    <p className="text-xs text-secondary leading-relaxed font-sans">{item.desc}</p>
                  </div>
                  <Link href="/resources/insights" className="font-mono text-[9px] text-primary font-bold uppercase mt-6 tracking-widest hover:text-rose-700">
                    Read Insight →
                  </Link>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </section>

        {/* 6. Brochures */}
        <section className="max-w-7xl mx-auto px-6 lg:px-8 border-t border-border pt-20">
          <Reveal className="mb-8">
            <div className="font-mono text-[10px] font-bold text-primary tracking-widest uppercase mb-3">
              <span className="text-primary font-bold mr-1">┌</span> BROCHURES // SEC-06
            </div>
            <h2 className="text-2xl font-display font-extrabold uppercase">Capabilities Brochures</h2>
          </Reveal>
          <RevealGroup className="grid md:grid-cols-2 gap-lg" stagger={0.08}>
            {brochures.map((item) => (
              <RevealItem key={item.title}>
                <div className="card bg-white h-full flex flex-col justify-between">
                  <div>
                    <h3 className="font-display font-extrabold text-sm uppercase text-foreground mb-2">{item.title}</h3>
                    <p className="text-xs font-mono text-slate-400">PDF Document · {item.size}</p>
                  </div>
                  <Link href="/resources/brochures" className="font-mono text-[9px] text-primary font-bold uppercase mt-6 tracking-widest hover:text-rose-700">
                    Download File →
                  </Link>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </section>

        {/* 7. Company Profile */}
        <section className="max-w-7xl mx-auto px-6 lg:px-8 border-t border-border pt-20">
          <Reveal className="mb-8">
            <div className="font-mono text-[10px] font-bold text-primary tracking-widest uppercase mb-3">
              <span className="text-primary font-bold mr-1">┌</span> COMPANY PROFILE // SEC-07
            </div>
            <h2 className="text-2xl font-display font-extrabold uppercase">Corporate Profile</h2>
          </Reveal>
          <RevealGroup className="grid md:grid-cols-2 gap-lg" stagger={0.08}>
            {companyProfiles.map((item) => (
              <RevealItem key={item.title}>
                <div className="card bg-white h-full flex flex-col justify-between">
                  <div>
                    <h3 className="font-display font-extrabold text-sm uppercase text-foreground mb-2">{item.title}</h3>
                    <p className="text-xs font-mono text-slate-400">PDF Document · {item.size}</p>
                  </div>
                  <Link href="/resources/profile" className="font-mono text-[9px] text-primary font-bold uppercase mt-6 tracking-widest hover:text-rose-700">
                    Download File →
                  </Link>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </section>

        {/* 8. Videos */}
        <section className="max-w-7xl mx-auto px-6 lg:px-8 border-t border-border pt-20">
          <Reveal className="mb-8">
            <div className="font-mono text-[10px] font-bold text-primary tracking-widest uppercase mb-3">
              <span className="text-primary font-bold mr-1">┌</span> VIDEOS // SEC-08
            </div>
            <h2 className="text-2xl font-display font-extrabold uppercase">Simulation Videos</h2>
          </Reveal>
          <RevealGroup className="grid md:grid-cols-2 gap-lg" stagger={0.08}>
            {videos.map((item) => (
              <RevealItem key={item.title}>
                <div className="card bg-white h-full flex flex-col justify-between">
                  <div>
                    {/* Visual mockup of video player */}
                    <div className="relative w-full aspect-[2/1] border border-border bg-slate-50 overflow-hidden mb-4 flex items-center justify-center font-mono text-[9px] text-slate-400">
                      <div className="absolute top-2 left-2 w-3 h-3 border-t border-l border-primary" />
                      <div className="absolute bottom-2 right-2 w-3 h-3 border-b border-r border-primary" />
                      [VIDEO RUNTIME // {item.length}]
                    </div>
                    <h3 className="font-display font-extrabold text-sm uppercase text-foreground">{item.title}</h3>
                  </div>
                  <Link href="/resources/videos" className="font-mono text-[9px] text-primary font-bold uppercase mt-6 tracking-widest hover:text-rose-700">
                    Watch Video →
                  </Link>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </section>

        {/* 9. Webinars */}
        <section className="max-w-7xl mx-auto px-6 lg:px-8 border-t border-border pt-20">
          <Reveal className="mb-8">
            <div className="font-mono text-[10px] font-bold text-primary tracking-widest uppercase mb-3">
              <span className="text-primary font-bold mr-1">┌</span> WEBINARS // SEC-09
            </div>
            <h2 className="text-2xl font-display font-extrabold uppercase">Online Presentations</h2>
          </Reveal>
          <RevealGroup className="grid md:grid-cols-2 gap-lg" stagger={0.08}>
            {webinars.map((item) => (
              <RevealItem key={item.title}>
                <div className="card bg-white h-full flex flex-col justify-between">
                  <div>
                    <h3 className="font-display font-extrabold text-sm uppercase text-foreground mb-2">{item.title}</h3>
                    <p className="text-xs font-mono text-emerald-600 font-bold uppercase">{item.date}</p>
                  </div>
                  <Link href="/resources/webinars" className="font-mono text-[9px] text-primary font-bold uppercase mt-6 tracking-widest hover:text-rose-700">
                    Register Online →
                  </Link>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </section>

        {/* 10. Downloads */}
        <section className="max-w-7xl mx-auto px-6 lg:px-8 border-t border-border pt-20">
          <Reveal className="mb-8">
            <div className="font-mono text-[10px] font-bold text-primary tracking-widest uppercase mb-3">
              <span className="text-primary font-bold mr-1">┌</span> TEMPLATES // SEC-10
            </div>
            <h2 className="text-2xl font-display font-extrabold uppercase">Calculators & Worksheets</h2>
          </Reveal>
          <RevealGroup className="grid md:grid-cols-2 gap-lg" stagger={0.08}>
            {downloads.map((item) => (
              <RevealItem key={item.title}>
                <div className="card bg-white h-full flex flex-col justify-between">
                  <div>
                    <h3 className="font-display font-extrabold text-sm uppercase text-foreground mb-2">{item.title}</h3>
                    <p className="text-xs font-mono text-slate-400">File Type · {item.type}</p>
                  </div>
                  <Link href="/resources/downloads" className="font-mono text-[9px] text-primary font-bold uppercase mt-6 tracking-widest hover:text-rose-700">
                    Download File →
                  </Link>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </section>

        {/* Kiln Heat Loss Calculator section */}
        <section className="max-w-7xl mx-auto px-6 lg:px-8 border-t border-border pt-20">
          <Reveal className="mb-8">
            <div className="font-mono text-[10px] font-bold text-primary tracking-widest uppercase mb-3">
              <span className="text-primary font-bold mr-1">┌</span> THERMAL CALCULATOR
            </div>
            <h2 className="text-2xl font-display font-extrabold uppercase text-foreground">
              Kiln Shell Heat Loss Calculator
            </h2>
            <p className="text-xs text-secondary mt-2 max-w-xl">
              Calculate convective and radiative heat loss based on kiln dimensions and average shell temperatures. Estimate cost savings using custom refractory alignments.
            </p>
          </Reveal>

          <div className="grid lg:grid-cols-3 gap-lg items-stretch">
            
            {/* Form Fields Card */}
            <Reveal className="lg:col-span-2">
              <div className="bg-white border border-border p-8 relative h-full flex flex-col justify-between">
                <div className="absolute top-4 right-4 font-mono text-[8px] text-slate-400">CALC-01 / PARAMETERS</div>
                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block font-mono text-[10px] font-bold text-secondary uppercase mb-1.5 label-caps">
                      Kiln Length (meters)
                    </label>
                    <input
                      type="number"
                      value={kilnLength}
                      onChange={(e) => setKilnLength(parseFloat(e.target.value) || 0)}
                      className="w-full px-4 py-3 border border-border bg-slate-50 text-foreground font-sans focus:outline-none focus:border-primary text-xs"
                    />
                  </div>
                  
                  <div>
                    <label className="block font-mono text-[10px] font-bold text-secondary uppercase mb-1.5 label-caps">
                      Outer Diameter (meters)
                    </label>
                    <input
                      type="number"
                      value={kilnDiameter}
                      onChange={(e) => setKilnDiameter(parseFloat(e.target.value) || 0)}
                      className="w-full px-4 py-3 border border-border bg-slate-50 text-foreground font-sans focus:outline-none focus:border-primary text-xs"
                    />
                  </div>

                  <div>
                    <label className="block font-mono text-[10px] font-bold text-secondary uppercase mb-1.5 label-caps">
                      Average Shell Temp (°C)
                    </label>
                    <input
                      type="number"
                      value={shellTemp}
                      onChange={(e) => setShellTemp(parseFloat(e.target.value) || 0)}
                      className="w-full px-4 py-3 border border-border bg-slate-50 text-foreground font-sans focus:outline-none focus:border-primary text-xs"
                    />
                  </div>

                  <div>
                    <label className="block font-mono text-[10px] font-bold text-secondary uppercase mb-1.5 label-caps">
                      Fuel Cost ($ / GJ)
                    </label>
                    <input
                      type="number"
                      step="0.1"
                      value={fuelCost}
                      onChange={(e) => setFuelCost(parseFloat(e.target.value) || 0)}
                      className="w-full px-4 py-3 border border-border bg-slate-50 text-foreground font-sans focus:outline-none focus:border-primary text-xs"
                    />
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-border font-mono text-[10px] text-slate-500 uppercase">
                  ASSUMPTIONS: Ambient Temp = 25°C · Operating Hours = 8000 hr/yr · Emissivity = 0.90
                </div>
              </div>
            </Reveal>

            {/* Calculations results display card */}
            <Reveal delay={0.08}>
              <div className="card relative h-full bg-white flex flex-col justify-between">
                <div>
                  <span className="font-mono text-[10px] text-primary font-bold">┌ CALC // RESULTS</span>
                  <h3 className="font-display font-extrabold text-base uppercase text-foreground mt-4 mb-4">
                    Thermal Loss Summary
                  </h3>
                  
                  <div className="space-y-4 font-mono text-xs text-secondary border-b border-border pb-4 mb-4">
                    <div className="flex justify-between">
                      <span>SHELL AREA:</span>
                      <span className="font-bold text-foreground">{Math.round(area)} m²</span>
                    </div>
                    <div className="flex justify-between">
                      <span>HEAT LOSS RATE:</span>
                      <span className="font-bold text-foreground">{Math.round(qTotal / 1000)} kW</span>
                    </div>
                    <div className="flex justify-between">
                      <span>ANNUAL LOSS:</span>
                      <span className="font-bold text-foreground">{Math.round(gjPerYear).toLocaleString()} GJ/yr</span>
                    </div>
                    <div className="flex justify-between text-rose-600 font-bold border-t border-slate-50 pt-2">
                      <span>ANNUAL FUEL COST:</span>
                      <span>${Math.round(lossCost).toLocaleString()}/yr</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="font-mono text-[9px] text-emerald-600 font-bold uppercase">
                      // PROJECTED SAVINGS (At -50°C shell reduction):
                    </div>
                    <div className="font-display font-extrabold text-xl text-emerald-600">
                      ${Math.round(projectedSavings).toLocaleString()} <span className="text-xs font-mono font-medium text-slate-500">/ yr</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => alert(`Calculations saved. ROI report generated for ${Math.round(projectedSavings).toLocaleString()}/yr savings.`)}
                  className="w-full mt-6 button-primary py-3 text-[10px] uppercase font-bold"
                >
                  Export Calculations PDF
                </button>
              </div>
            </Reveal>

          </div>
        </section>

        {/* 11. FAQs */}
        <section className="max-w-7xl mx-auto px-6 lg:px-8 border-t border-border pt-20">
          <Reveal className="mb-8">
            <div className="font-mono text-[10px] font-bold text-primary tracking-widest uppercase mb-3">
              <span className="text-primary font-bold mr-1">┌</span> FAQ // SEC-11
            </div>
            <h2 className="text-2xl font-display font-extrabold uppercase text-foreground">Frequently Asked Questions</h2>
          </Reveal>
          <div className="space-y-4 max-w-3xl">
            {faqs.map((item, idx) => {
              const isOpen = activeFaq === idx;
              return (
                <Reveal key={item.q} delay={idx * 0.05}>
                  <div className="bg-white border border-border rounded-none">
                    <button
                      onClick={() => toggleFaq(idx)}
                      className="w-full px-6 py-4 flex justify-between items-center text-left"
                    >
                      <span className="font-display font-bold text-xs uppercase text-foreground">{item.q}</span>
                      <span className="font-mono text-xs text-primary font-bold">{isOpen ? "[-]" : "[+]"}</span>
                    </button>
                    {isOpen && (
                      <div className="px-6 pb-6 pt-2 font-sans text-xs text-secondary leading-relaxed border-t border-slate-50">
                        {item.a}
                      </div>
                    )}
                  </div>
                </Reveal>
              );
            })}
          </div>
        </section>

        {/* 12. Newsletter */}
        <section className="max-w-7xl mx-auto px-6 lg:px-8 border-t border-border pt-20">
          <Reveal>
            <div className="font-mono text-[10px] font-bold text-primary tracking-widest uppercase mb-3">
              <span className="text-primary font-bold mr-1">┌</span> NEWSLETTER // SEC-12
            </div>
            <h2 className="text-2xl font-display font-extrabold uppercase text-foreground mb-4">Subscribe to Technical Logs</h2>
            <p className="text-xs text-secondary leading-relaxed font-sans max-w-xl mb-6">
              Stay updated with alternative fuel reviews, burner audits, and 3D laser-scanning case dossiers. Compiles once a month. No spam.
            </p>
            
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setNewsletterSubscribed(true);
              }}
              className="flex flex-col sm:flex-row gap-2 max-w-md"
            >
              <input
                type="email"
                required
                placeholder="Enter email address"
                className="px-4 py-3 border border-border text-xs font-sans rounded-none focus:outline-none focus:border-primary flex-1 bg-white text-foreground"
              />
              <Magnetic strength={0.05}>
                <button
                  type="submit"
                  className="button-primary px-6 py-3 text-xs uppercase"
                >
                  {newsletterSubscribed ? "Subscribed ✓" : "Subscribe"}
                </button>
              </Magnetic>
            </form>
          </Reveal>
        </section>

      </main>

      <Footer />
    </>
  );
}
