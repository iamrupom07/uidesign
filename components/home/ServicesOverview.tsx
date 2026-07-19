"use client";

import Link from "next/link";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { Magnetic } from "@/components/ui/Magnetic";
import {
  IconProcessEngineering,
  IconSystemIntegration,
  IconOperationalSupport,
  IconDesignSupport,
  IconProjectManagement,
  IconTraining,
} from "@/components/ui/Icons";

const expertiseCards = [
  {
    title: "Engineering Design",
    description: "Complete engineering solutions from concept to detailed design.",
    icon: IconDesignSupport,
    code: "EXP-01",
    slug: "engineering-design",
    image: "/images/card_engineering_design.png",
  },
  {
    title: "Simulation & Analysis",
    description: "Advanced simulations for better engineering decisions.",
    icon: IconProcessEngineering,
    code: "EXP-02",
    slug: "simulation-and-analysis",
    image: "/images/card_cfd_simulation.png",
  },
  {
    title: "Digital Twin & Smart Plant",
    description: "Transforming plant data into intelligent operational insights.",
    icon: IconSystemIntegration,
    code: "EXP-03",
    slug: "digital-twin-smart-plant",
    image: "/images/card_digital_twin.png",
  },
  {
    title: "Plant Performance Optimization",
    description: "Improving efficiency, reliability, and plant performance.",
    icon: IconOperationalSupport,
    code: "EXP-04",
    slug: "plant-performance-optimization",
    image: "/images/card_plant_optimization.png",
  },
  {
    title: "3D Laser Scanning",
    description: "Accurate digital capture for retrofit and engineering projects.",
    icon: IconProjectManagement,
    code: "EXP-05",
    slug: "3d-laser-scanning",
    image: "/images/card_laser_scanning.png",
  },
  {
    title: "Training & Knowledge Transfer",
    description: "Developing engineering capability through practical learning.",
    icon: IconTraining,
    code: "EXP-06",
    slug: "training-knowledge-transfer",
    image: "/images/card_training.png",
  },
];

export default function ServicesOverview() {
  return (
    <section id="our-services" className="py-xl bg-background blueprint-mesh border-t border-border">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-2xl mb-14">
          <Reveal>
            <div className="font-mono text-[11px] font-bold text-primary tracking-widest uppercase mb-4">
              <span className="text-primary font-bold mr-1">┌</span> OUR ENGINEERING EXPERTISE
            </div>
            <h2 className="mb-4 font-display font-extrabold text-3xl text-foreground uppercase">
              Engineering Excellence. Digital Advantage.
            </h2>
            <p className="body-md text-secondary mt-2">
              Delivering multidisciplinary engineering expertise to design, optimize, digitalize, and improve industrial plants.
            </p>
          </Reveal>
        </div>

        {/* 6 Cards Grid */}
        <RevealGroup className="grid sm:grid-cols-2 lg:grid-cols-3 gap-lg" stagger={0.06}>
          {expertiseCards.map((card) => {
            const Icon = card.icon;
            return (
              <RevealItem key={card.slug}>
                <Link href={`/solutions/${card.slug}`} className="block h-full">
                  <SpotlightCard className="h-full p-0 flex flex-col justify-between cursor-pointer group/card overflow-hidden">
                    <div>
                      {/* Thumbnail Image Header */}
                      <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-100 border-b border-border">
                        <img
                          src={card.image}
                          alt={card.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover/card:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent opacity-80" />
                        <span className="absolute top-3 right-3 font-mono text-[9px] font-bold text-white bg-slate-900/80 px-2 py-0.5 border border-white/20 uppercase tracking-widest">
                          {card.code}
                        </span>
                        <span className="absolute bottom-3 left-3 w-9 h-9 flex items-center justify-center bg-white border border-slate-200 text-primary shadow-sm">
                          <Icon className="w-4 h-4" />
                        </span>
                      </div>

                      {/* Card Content Body */}
                      <div className="p-6">
                        <h3 className="font-display font-extrabold text-base text-foreground group-hover/card:text-primary transition-colors leading-snug uppercase">
                          {card.title}
                        </h3>
                        <p className="text-xs text-secondary mt-2.5 leading-relaxed font-sans">
                          {card.description}
                        </p>
                      </div>
                    </div>
                  </SpotlightCard>
                </Link>
              </RevealItem>
            );
          })}
        </RevealGroup>

        {/* Center-aligned Explore Solutions CTA */}
        <div className="flex justify-center mt-12">
          <Reveal delay={0.1}>
            <Magnetic strength={0.05}>
              <Link
                href="/solutions"
                className="button-primary inline-flex items-center gap-2 text-xs uppercase font-bold"
              >
                Explore Our Solutions
              </Link>
            </Magnetic>
          </Reveal>
        </div>

      </div>
    </section>
  );
}
