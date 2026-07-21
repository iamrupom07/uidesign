"use client";

import { use } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import TechnicalCursor from "@/components/ui/TechnicalCursor";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import Link from "next/link";
import { cfdIndustries, cfdCoreServices } from "@/lib/cfd-data";
import {
  ArrowRight,
  CheckCircle2,
  Cpu,
  Layers,
  ShieldCheck,
  Workflow,
  Factory,
  FileText,
  Activity,
  Zap,
} from "lucide-react";

export default function CfdDetailPage({
  params,
}: {
  params: Promise<{ industrySlug: string }>;
}) {
  const { industrySlug } = use(params);

  const industry = cfdIndustries[industrySlug];
  const service = cfdCoreServices.find((s) => s.slug === industrySlug);

  return (
    <>
      <TechnicalCursor />
      <Header />

      <main className="bg-background min-h-screen py-20 lg:py-24 space-y-24">
        {/* Industry View */}
        {industry && (
          <>
            {/* Header Hero */}
            <section className="max-w-7xl mx-auto px-6 lg:px-8 pt-10">
              <div className="border border-border p-10 sm:p-14 bg-white relative overflow-hidden shadow-sm">
                <div className="absolute top-0 right-0 w-40 h-40 border-b border-l border-primary/20 opacity-20 pointer-events-none" />
                <div className="absolute top-4 right-4 font-mono text-[9px] text-slate-400">
                  SECTOR DOSSIER / {industry.slug.toUpperCase()}
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
                    <span>{industry.name.toUpperCase()}</span>
                  </div>
                  <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-extrabold text-foreground uppercase tracking-tight leading-tight max-w-4xl mb-6">
                    {industry.name} <br />
                    <span className="text-primary">Engineering Applications</span>
                  </h1>
                  <p className="body-md text-secondary max-w-3xl leading-relaxed font-sans mb-8">
                    {industry.description}
                  </p>
                </Reveal>
              </div>
            </section>

            {/* Engineering Services List */}
            <section className="max-w-7xl mx-auto px-6 lg:px-8">
              <Reveal className="mb-8">
                <div className="font-mono text-[11px] font-bold text-primary tracking-widest uppercase mb-4">
                  <span className="text-primary font-bold mr-1">┌</span> APPLIED DISCIPLINES
                </div>
                <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-foreground uppercase tracking-tight mb-2">
                  Engineering <span className="text-primary">Services</span>
                </h2>
                <p className="font-mono text-sm font-semibold text-secondary">
                  Specialized engineering simulation services applied to {industry.name} operations.
                </p>
              </Reveal>

              <Reveal delay={0.08}>
                <div className="bg-white border border-border p-8 rounded-none shadow-sm">
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {industry.engineeringServices.map((svcName, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-3 p-4 border border-border bg-slate-50 hover:border-primary/50 transition-colors"
                      >
                        <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
                        <span className="font-display font-extrabold text-sm text-foreground uppercase">
                          {svcName}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </Reveal>
            </section>

            {/* Engineering Applications Cards */}
            <section className="max-w-7xl mx-auto px-6 lg:px-8">
              <Reveal className="mb-8">
                <div className="font-mono text-[11px] font-bold text-primary tracking-widest uppercase mb-4">
                  <span className="text-primary font-bold mr-1">┌</span> EQUIPMENT & PROCESS APPLICATIONS
                </div>
                <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-foreground uppercase tracking-tight mb-2">
                  Engineering <span className="text-primary">Applications</span>
                </h2>
                <p className="font-mono text-sm font-semibold text-secondary">
                  Clickable engineering application modules for {industry.name}.
                </p>
              </Reveal>

              <RevealGroup className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6" stagger={0.05}>
                {industry.engineeringApplications.map((appTitle, idx) => (
                  <RevealItem key={idx}>
                    <div className="bg-white border border-border p-6 rounded-none relative h-full flex flex-col justify-between hover:border-primary transition-colors shadow-sm">
                      <div>
                        <div className="font-mono text-[10px] font-bold text-primary tracking-wider uppercase mb-3">
                          APP&#8209;{String(idx + 1).padStart(2, "0")}
                        </div>
                        <h3 className="font-display font-extrabold text-lg text-foreground mb-3 uppercase">
                          {appTitle}
                        </h3>
                        <p className="text-xs text-secondary font-sans leading-relaxed">
                          Advanced physics modeling, thermal analysis, and velocity distribution for{" "}
                          {appTitle}.
                        </p>
                      </div>
                      <div className="pt-4 mt-6 border-t border-border">
                        <Link
                          href="/lets-connect"
                          className="font-mono text-[10px] font-bold text-primary hover:text-rose-700 uppercase tracking-widest flex items-center gap-1.5"
                        >
                          <span>Request App Dossier</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                      </div>
                    </div>
                  </RevealItem>
                ))}
              </RevealGroup>
            </section>
          </>
        )}

        {/* Core Service View */}
        {service && (
          <>
            {/* Service Hero */}
            <section className="max-w-7xl mx-auto px-6 lg:px-8 pt-10">
              <div className="border border-border p-10 sm:p-14 bg-white relative overflow-hidden shadow-sm">
                <div className="absolute top-0 right-0 w-40 h-40 border-b border-l border-primary/20 opacity-20 pointer-events-none" />
                <div className="absolute top-4 right-4 font-mono text-[9px] text-slate-400">
                  SERVICE PACKAGE / {service.slug.toUpperCase()}
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
                    <span>{service.title.toUpperCase()}</span>
                  </div>
                  <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-extrabold text-foreground uppercase tracking-tight leading-tight max-w-4xl mb-6">
                    {service.title}
                  </h1>
                  <p className="body-md text-secondary max-w-3xl leading-relaxed font-sans mb-6">
                    {service.description}
                  </p>
                </Reveal>
              </div>
            </section>

            {/* Extended Description */}
            <section className="max-w-7xl mx-auto px-6 lg:px-8">
              <Reveal>
                <div className="bg-white border border-border p-8 sm:p-12 rounded-none space-y-6 shadow-sm">
                  {service.extendedDescription.map((para, i) => (
                    <p key={i} className="text-secondary text-base leading-relaxed font-sans">
                      {para}
                    </p>
                  ))}
                </div>
              </Reveal>
            </section>

            {/* Engineering Approach & Deliverables */}
            <section className="max-w-7xl mx-auto px-6 lg:px-8">
              <div className="grid lg:grid-cols-2 gap-8">
                {/* Engineering Approach */}
                <Reveal>
                  <div className="bg-slate-900 text-white border border-slate-800 p-8 sm:p-10 rounded-none h-full shadow-xl">
                    <div className="font-mono text-xs font-bold text-primary tracking-widest uppercase mb-6 flex items-center gap-2">
                      <Workflow className="w-4 h-4 text-primary" /> ENGINEERING APPROACH
                    </div>
                    <div className="space-y-4">
                      {service.engineeringApproach.map((step, idx) => (
                        <div
                          key={idx}
                          className="flex items-center gap-4 p-3 border border-slate-800 bg-slate-950 font-mono text-xs text-slate-200"
                        >
                          <span className="w-6 h-6 bg-primary text-white flex items-center justify-center font-bold text-[10px]">
                            0{idx + 1}
                          </span>
                          <span>{step.replace(/^\d+\.\s*/, "")}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </Reveal>

                {/* Deliverables */}
                <Reveal delay={0.1}>
                  <div className="bg-white border border-border p-8 sm:p-10 rounded-none h-full shadow-sm">
                    <div className="font-mono text-xs font-bold text-primary tracking-widest uppercase mb-6 flex items-center gap-2">
                      <FileText className="w-4 h-4 text-primary" /> ENGINEERING DELIVERABLES
                    </div>
                    <div className="space-y-3">
                      {service.deliverables.map((item, idx) => (
                        <div key={idx} className="flex items-center gap-3 font-sans text-xs text-foreground font-semibold">
                          <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </Reveal>
              </div>
            </section>

            {/* Key Benefits */}
            <section className="max-w-7xl mx-auto px-6 lg:px-8">
              <Reveal className="mb-8">
                <div className="font-mono text-[11px] font-bold text-primary tracking-widest uppercase mb-4">
                  <span className="text-primary font-bold mr-1">┌</span> BUSINESS VALUE
                </div>
                <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-foreground uppercase tracking-tight mb-2">
                  Key <span className="text-primary">Benefits</span>
                </h2>
              </Reveal>

              <RevealGroup className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6" stagger={0.05}>
                {service.keyBenefits.map((benefit, idx) => (
                  <RevealItem key={idx}>
                    <div className="bg-white border border-border p-6 rounded-none relative h-full flex items-center gap-4 hover:border-primary transition-colors shadow-sm">
                      <div className="w-8 h-8 bg-rose-50 border border-rose-100 flex items-center justify-center text-primary shrink-0 font-mono text-xs font-bold">
                        0{idx + 1}
                      </div>
                      <span className="font-display font-extrabold text-xs sm:text-sm text-foreground uppercase">
                        {benefit}
                      </span>
                    </div>
                  </RevealItem>
                ))}
              </RevealGroup>
            </section>
          </>
        )}

        {/* Fallback if slug not found */}
        {!industry && !service && (
          <section className="max-w-7xl mx-auto px-6 lg:px-8 pt-10 text-center py-20">
            <Reveal>
              <h1 className="text-3xl font-display font-extrabold uppercase text-foreground mb-4">
                Module <span className="text-primary">Not Found</span>
              </h1>
              <p className="text-secondary text-sm mb-6">
                The requested CFD industry or engineering service dossier could not be located.
              </p>
              <Link
                href="/solutions/cfd-engineering"
                className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white font-mono text-xs font-bold uppercase"
              >
                <span>Return to CFD Solutions Index</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Reveal>
          </section>
        )}

        {/* Contact CTA */}
        <section className="max-w-7xl mx-auto px-6 lg:px-8">
          <Reveal>
            <div className="bg-slate-900 text-white p-10 sm:p-14 border border-slate-800 relative overflow-hidden shadow-2xl flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="max-w-2xl">
                <div className="font-mono text-xs font-bold text-primary tracking-widest uppercase mb-3 flex items-center gap-2">
                  <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                  CONSULT SENIOR ENGINEERING TEAM
                </div>
                <h2 className="font-display font-extrabold text-3xl sm:text-4xl uppercase tracking-tight leading-tight">
                  Have a Project in Mind? <br />
                  <span className="text-primary">Get a Simulation Proposal</span>
                </h2>
                <p className="text-slate-300 text-sm sm:text-base font-sans mt-4 leading-relaxed">
                  Connect with our team to review your plant operating conditions, CAD geometry, and
                  performance objectives.
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
