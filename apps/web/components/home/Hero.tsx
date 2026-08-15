"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Reveal } from "@/components/ui/Reveal";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Sparkles, ChevronRight } from "lucide-react";

const HERO_SLIDES = [
  {
    id: 1,
    src: "/images/hero_industrial.png",
    alt: "MACPROTEC Engineering Industrial Plant Solutions",
  },
  {
    id: 2,
    src: "/images/hero_slide_1.jpg",
    alt: "Cement & Process Facility Landscape",
  },
  {
    id: 3,
    src: "/images/hero_slide_2.jpg",
    alt: "High-Temperature Preheater Tower",
  },
];

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 7000);
    return () => clearInterval(timer);
  }, []);

  return (
    <>
      {/* TOP DOSSIER BREADCRUMB STRIP */}
      <section className="bg-[#2d1b47] border-b border-[#3e2663] text-white py-3 px-6 lg:px-8 font-mono text-xs">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2 text-slate-400">
            <span className="text-slate-400 font-medium">MACPROTEC</span>
            <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
            <span className="text-primary font-bold">Process Engineering & Plant Solutions</span>
          </div>
          <div className="hidden sm:flex items-center gap-4 text-[10px] text-slate-400">
            <span>MULTIDISCIPLINARY ENGINEERING CONSULTING</span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-emerald-400 font-bold uppercase">System Operational</span>
          </div>
        </div>
      </section>

      {/* FULL-WIDTH HERO SECTION (Solutions Style with Dark Overlay) */}
      <section className="w-full relative bg-black border-b-2 border-primary/30 py-16 sm:py-20 lg:py-28 overflow-hidden group">
        {/* Full-width Background Image Slideshow */}
        <div className="absolute inset-0 w-full h-full pointer-events-none">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, scale: 1.04 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
              className="relative w-full h-full"
            >
              <Image
                src={HERO_SLIDES[currentSlide].src}
                alt={HERO_SLIDES[currentSlide].alt}
                fill
                priority
                className="object-cover object-center opacity-100 group-hover:scale-105 transition-transform duration-1000 ease-out"
              />
            </motion.div>
          </AnimatePresence>

          {/* Transparent Black Gradient Overlay for High Background Picture Visibility */}
          <div className="absolute inset-0 bg-black/40 bg-gradient-to-b from-black/60 via-black/30 to-black/75" />
          <div className="absolute inset-0 bg-[radial-gradient(#e11d48_1px,transparent_1px)] [background-size:24px_24px] opacity-15 pointer-events-none" />
        </div>

        {/* Centered Overlay Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
          <Reveal>
            <div className="max-w-4xl mx-auto flex flex-col items-center text-center space-y-6">
              {/* Category Badge Ticker */}
              <div className="inline-flex items-center gap-2 bg-[#2d1b47]/90 border border-primary/40 px-4 py-1.5 font-mono text-[11px] font-extrabold text-primary tracking-widest uppercase shadow-md backdrop-blur-xs">
                <Sparkles className="w-3.5 h-3.5 text-primary animate-pulse" />
                <span>RELIABLE ENGINEERING FOR HEAVY INDUSTRIES</span>
              </div>

              {/* Main Hero Title */}
              <div className="flex justify-center w-full">
                <h1 className="text-4xl sm:text-6xl lg:text-7xl font-display font-black uppercase tracking-tight text-white drop-shadow-2xl">
                  Where process <br className="hidden sm:block" /> meets <span className="text-primary">innovation.</span>
                </h1>
              </div>

              {/* Subtitle Description */}
              <p className="text-slate-200 font-sans text-base sm:text-lg leading-relaxed max-w-2xl mx-auto drop-shadow-md">
                Houston-based process engineering consulting and system integration for cement,
                mining, aggregate, and petrochemical plants — from concept design through
                commissioning.
              </p>

              {/* Hero Action Buttons */}
              <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
                <Link
                  href="/lets-connect"
                  className="px-8 py-4 bg-primary hover:bg-rose-700 text-white font-mono text-xs font-bold uppercase tracking-wider transition-all duration-150 shadow-xl flex items-center gap-2 group"
                >
                  <span>Book Consultation</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>

                <Link
                  href="/solutions"
                  className="px-8 py-4 bg-[#201235] border border-white/20 hover:border-white text-white font-mono text-xs font-bold uppercase tracking-wider transition-all duration-150 flex items-center gap-2 hover:bg-[#2d1b47]"
                >
                  <span>Explore Services</span>
                  <ArrowRight className="w-4 h-4 text-slate-400" />
                </Link>
              </div>

              {/* Slide Navigation Dots */}
              <div className="flex items-center gap-2 pt-6">
                {HERO_SLIDES.map((slide, idx) => (
                  <button
                    key={slide.id}
                    onClick={() => setCurrentSlide(idx)}
                    aria-label={`Go to slide ${idx + 1}`}
                    className={`h-1.5 transition-all duration-300 ${
                      currentSlide === idx ? "w-10 bg-primary" : "w-4 bg-white/40 hover:bg-white/70"
                    }`}
                  />
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}


