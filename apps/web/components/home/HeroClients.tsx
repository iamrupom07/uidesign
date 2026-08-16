"use client";

import React from "react";
import { Reveal } from "@/components/ui/Reveal";

interface ClientItem {
  id: string;
  name: string;
  category: string;
  logo: string;
  layer1: string;
  layer2: string;
  imgClass?: string;
}

const clients: ClientItem[] = [
  {
    id: "gcc",
    name: "GCC",
    category: "Cement & Building Materials",
    logo: "/images/clients/gcc.png",
    layer1: "bg-blue-100/80 border-blue-300",
    layer2: "bg-red-50 border-red-200",
    imgClass: "h-20 sm:h-24 max-w-[96%] scale-125 sm:scale-135",
  },
  {
    id: "mgi",
    name: "MGI",
    category: "Meghna Group of Industries",
    logo: "/images/clients/mgi.png",
    layer1: "bg-sky-100/80 border-sky-300",
    layer2: "bg-blue-50 border-blue-200",
    imgClass: "h-16 sm:h-20 max-w-[90%]",
  },
  {
    id: "quikrete",
    name: "QUIKRETE",
    category: "Packaged Concrete Solutions",
    logo: "/images/clients/quikrete.svg",
    layer1: "bg-amber-100/80 border-amber-300",
    layer2: "bg-lime-100/80 border-lime-300",
    imgClass: "h-16 sm:h-20 max-w-[90%]",
  },
  {
    id: "swirl",
    name: "SAXUM",
    category: "Mining & Heavy Materials",
    logo: "/images/clients/swirl.svg",
    layer1: "bg-purple-100/80 border-purple-300",
    layer2: "bg-rose-100/80 border-rose-300",
    imgClass: "h-16 sm:h-20 max-w-[90%]",
  },
];

// Duplicate clients to create a seamless infinite scrolling marquee loop
const marqueeItems = [...clients, ...clients, ...clients, ...clients];

export default function HeroClients() {
  return (
    <section className="w-full py-16 sm:py-20 bg-slate-50/50 border-t border-slate-200/80 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
            <div>
              <div className="inline-flex items-center gap-2 mb-2">
                <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse shrink-0" />
                <span className="font-mono text-[11px] font-bold text-secondary tracking-widest uppercase label-caps">
                  Trusted Global Partners
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground font-display uppercase">
                Our Key <span className="text-primary">Clients</span>
              </h2>
            </div>
            <p className="text-xs sm:text-sm font-mono text-slate-500 max-w-sm">
              Engineering precision & process solutions for market leaders worldwide.
            </p>
          </div>
        </Reveal>
      </div>

      {/* Infinite Scrolling Logo Cards Marquee Container */}
      <div className="relative w-full overflow-hidden py-4 select-none">
        {/* Left & Right Fade Overlays */}
        <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-12 sm:w-24 bg-gradient-to-r from-white to-transparent z-20" />
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-12 sm:w-24 bg-gradient-to-l from-white to-transparent z-20" />

        {/* Marquee Track */}
        <div className="flex animate-marquee gap-8 items-center w-max hover:[animation-play-state:paused] cursor-pointer">
          {marqueeItems.map((client, index) => (
            <div
              key={`${client.id}-${index}`}
              className="group relative w-[260px] sm:w-[300px] shrink-0"
            >
              {/* Backmost Layer 2 (Stacked Card Layer) */}
              <div
                className={`absolute -top-2.5 -right-2.5 inset-0 rounded-2xl border transition-all duration-300 transform group-hover:-translate-y-1.5 group-hover:translate-x-1.5 ${client.layer2}`}
              />

              {/* Middle Layer 1 (Stacked Card Layer) */}
              <div
                className={`absolute -top-1.2 -right-1.2 inset-0 rounded-2xl border transition-all duration-300 transform group-hover:-translate-y-1 group-hover:translate-x-1 ${client.layer1}`}
              />

              {/* Main Foreground Card Container */}
              <div className="relative rounded-2xl border border-slate-200/90 bg-white p-4 shadow-sm transition-all duration-300 group-hover:shadow-xl group-hover:border-slate-300">
                {/* Logo Box */}
                <div className="h-28 sm:h-32 w-full rounded-xl bg-slate-50/80 border border-slate-100 flex items-center justify-center p-3 sm:p-4 relative overflow-hidden group-hover:bg-white transition-colors duration-300">
                  {/* Subtle Blueprint Mesh overlay */}
                  <div className="absolute inset-0 blueprint-mesh opacity-20 pointer-events-none" />

                  {/* Client Logo Image */}
                  <img
                    src={client.logo}
                    alt={client.name}
                    className={`w-auto object-contain mix-blend-multiply filter drop-shadow-xs transition-transform duration-300 group-hover:scale-110 ${
                      client.imgClass || "h-16 sm:h-20 max-w-[90%]"
                    }`}
                  />
                </div>

                {/* Card Title & Subtitle Below */}
                <div className="mt-3 px-1">
                  <div className="flex items-center justify-between">
                    <h3 className="text-base font-bold text-slate-900 font-sans tracking-tight">
                      {client.name}
                    </h3>
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-300 group-hover:bg-primary transition-colors" />
                  </div>
                  <p className="text-[11px] font-mono text-slate-500 uppercase tracking-wider mt-0.5 truncate">
                    {client.category}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
