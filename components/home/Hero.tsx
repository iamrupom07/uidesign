"use client";

import Link from "next/link";
import { Magnetic } from "@/components/ui/Magnetic";
import { Reveal } from "@/components/ui/Reveal";

export default function Hero() {
  return (
    <section className="bg-white py-24 px-4 sm:px-6 lg:px-8 overflow-hidden blueprint-mesh relative">
      {/* Drafting sheet border outlines representing engineering precision */}
      <div className="absolute top-8 left-8 right-8 bottom-8 border border-slate-200/55 pointer-events-none select-none hidden md:block">
        <div className="absolute top-2 left-3 font-mono text-[8px] text-slate-400/80 tracking-widest uppercase">DRAFTING DOSSIER / SHEET 01 / REV.A</div>
        <div className="absolute bottom-2 right-3 font-mono text-[8px] text-slate-400/80 tracking-widest uppercase">MACPROTEC / Houston, TX</div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-[1.1fr_1fr] gap-lg lg:gap-xl items-center">
          {/* Left Column: Headline and CTAs */}
          <div>
            <Reveal>
              {/* Eyebrow tag in sentence case with active indicator dot */}
              <div className="inline-flex items-center gap-2 mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shrink-0" />
                <span className="font-mono text-[11px] font-bold text-secondary tracking-widest uppercase label-caps">
                  Reliable Engineering for Heavy Industries
                </span>
              </div>
            </Reveal>

            <Reveal delay={0.08}>
              <h1 className="text-4xl sm:text-5xl lg:text-[3.25rem] font-extrabold tracking-tight text-foreground leading-[1.1] font-display uppercase">
                Where process <br /> meets <span className="text-primary">innovation.</span>
            </h1>
            </Reveal>

            <Reveal delay={0.16}>
              <p className="mt-6 text-secondary text-base max-w-md leading-relaxed font-sans body-md">
                Houston-based process engineering consulting and system integration for cement,
                mining, aggregate, and petrochemical plants — from concept design through
                commissioning.
              </p>
            </Reveal>

            <Reveal delay={0.24}>
              <div className="mt-10 flex flex-wrap gap-sm">
                <Magnetic strength={0.05}>
                  <Link
                    href="/lets-connect"
                    className="button-primary inline-block text-center"
                  >
                    Book Consultation
                  </Link>
                </Magnetic>
                <Magnetic strength={0.05}>
                  <Link
                    href="#our-services"
                    className="button-outline inline-block text-center"
                  >
                    Explore Services
                  </Link>
                </Magnetic>
              </div>
            </Reveal>
          </div>

          {/* Right Column: Hero Media bounded by Red Crop Marks */}
          <Reveal delay={0.2} className="relative w-full max-w-lg lg:max-w-none mx-auto">
            <div className="relative p-4 w-full">
              {/* Rose-red corner brackets */}
              <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-primary" />
              <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-primary" />
              <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-primary" />
              <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-primary" />

              {/* Bounded Image wrapper */}
              <div className="relative rounded-none overflow-hidden border border-border bg-card aspect-[4/3] w-full">
                <img
                  src="/images/hero_plant.png"
                  alt="Process Engineering Facility"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
