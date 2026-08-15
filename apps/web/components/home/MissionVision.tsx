"use client";

import { Reveal } from "@/components/ui/Reveal";
import { motion } from "framer-motion";
import { Compass, Target, Sparkles, ShieldCheck } from "lucide-react";

export default function MissionVision() {
  return (
    <section className="py-xl bg-background border-t border-border blueprint-mesh relative overflow-hidden">
      {/* Background Subtle Animated Beam */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 grid md:grid-cols-2 gap-lg lg:gap-xl">
        {/* MISSION CARD WITH CUSTOM MOTION & HOVER GLOW */}
        <Reveal>
          <motion.div
            whileHover={{ y: -6, scale: 1.01 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="card relative bg-white border border-border hover:border-primary/60 shadow-sm hover:shadow-2xl transition-all duration-300 p-8 group overflow-hidden"
          >
            {/* Top Right Animated Radar Dot */}
            <div className="absolute top-4 right-4 flex items-center gap-1.5 font-mono text-[9px] text-slate-400">
              <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
              <span className="uppercase font-bold tracking-widest text-primary">MISSION DOSSIER</span>
            </div>

            {/* Icon Header */}
            <div className="w-12 h-12 rounded bg-rose-50 border border-rose-200 text-primary flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-white transition-colors duration-300 shadow-sm">
              <Target className="w-6 h-6 animate-pulse" />
            </div>

            <div className="font-mono text-[11px] font-bold text-primary tracking-widest uppercase mb-3 flex items-center gap-1">
              <span className="text-primary font-bold">┌</span> OUR MISSION
            </div>

            <h3 className="font-display font-extrabold text-2xl mb-4 text-foreground uppercase tracking-tight group-hover:text-primary transition-colors">
              BE LEADING
            </h3>

            <p className="body-md text-secondary leading-relaxed font-sans">
              Our mission is to deliver exceptional engineering design, process optimization, and
              hands-on commissioning support that increases plant efficiency, enhances safety, and
              integrates green energy alternatives across heavy industries.
            </p>

            {/* Bottom Animated Line Accent */}
            <div className="mt-8 h-1 w-full bg-slate-100 overflow-hidden rounded-full">
              <motion.div
                initial={{ x: "-100%" }}
                whileInView={{ x: "0%" }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                className="h-full bg-primary w-full"
              />
            </div>
          </motion.div>
        </Reveal>

        {/* VISION CARD WITH CUSTOM MOTION & HOVER GLOW */}
        <Reveal delay={0.1}>
          <motion.div
            whileHover={{ y: -6, scale: 1.01 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="card relative bg-white border border-border hover:border-primary/60 shadow-sm hover:shadow-2xl transition-all duration-300 p-8 group overflow-hidden"
          >
            {/* Top Right Animated Radar Dot */}
            <div className="absolute top-4 right-4 flex items-center gap-1.5 font-mono text-[9px] text-slate-400">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
              <span className="uppercase font-bold tracking-widest text-emerald-600">VISION DOSSIER</span>
            </div>

            {/* Icon Header */}
            <div className="w-12 h-12 rounded bg-slate-100 border border-slate-200 text-slate-700 flex items-center justify-center mb-6 group-hover:bg-slate-900 group-hover:text-white transition-colors duration-300 shadow-sm">
              <Compass className="w-6 h-6" />
            </div>

            <div className="font-mono text-[11px] font-bold text-primary tracking-widest uppercase mb-3 flex items-center gap-1">
              <span className="text-primary font-bold">┌</span> OUR VISION
            </div>

            <h3 className="font-display font-extrabold text-2xl mb-4 text-foreground uppercase tracking-tight group-hover:text-primary transition-colors">
              INTEGRATION
            </h3>

            <p className="body-md text-secondary leading-relaxed font-sans">
              Our vision is to be the premier engineering consulting partner globally, pioneering
              digital twin technology, 3D laser scanning systems, and advanced CFD simulations to
              drive the future of process industrial automation.
            </p>

            {/* Bottom Animated Line Accent */}
            <div className="mt-8 h-1 w-full bg-slate-100 overflow-hidden rounded-full">
              <motion.div
                initial={{ x: "-100%" }}
                whileInView={{ x: "0%" }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
                className="h-full bg-[#201235] w-full"
              />
            </div>
          </motion.div>
        </Reveal>
      </div>
    </section>
  );
}

