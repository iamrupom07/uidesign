import type { ComponentType } from "react";
import Link from "next/link";
import { expertiseAreas } from "@/lib/constants";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import {
  IconIndustry40,
  IconCement,
  IconAggregate,
  IconMining,
  IconTailing,
  IconPetrochem,
} from "@/components/ui/Icons";

const industryIcons: Record<string, ComponentType<{ className?: string }>> = {
  "industry-40": IconIndustry40,
  cement: IconCement,
  "aggregate-and-scm": IconAggregate,
  "mining-and-metals": IconMining,
  "mine-tailing-management": IconTailing,
  petrochemicals: IconPetrochem,
};

export default function IndustriesGrid() {
  return (
    <section className="py-xl bg-background blueprint-mesh border-t border-border">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <Reveal className="max-w-2xl mb-14">
          <div className="font-mono text-[11px] font-bold text-primary tracking-widest uppercase mb-4">
            <span className="text-primary font-bold mr-1">┌</span> INDUSTRIES
          </div>
          <h2 className="mb-4 font-display font-extrabold text-3xl text-foreground uppercase">
            Deep experience across <span className="text-primary">heavy-process</span> sectors
          </h2>
        </Reveal>

        <RevealGroup
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-lg"
          stagger={0.06}
        >
          {expertiseAreas.map((area) => {
            const Icon = industryIcons[area.slug] ?? IconIndustry40;
            return (
            <RevealItem key={area.slug}>
              <SpotlightCard className="h-full">
                <Link
                  href={`/our-expertise/${area.slug}`}
                  className="relative flex items-center gap-4 p-6 sm:p-8 h-full group"
                >
                  <span className="w-10 h-10 flex items-center justify-center bg-rose-50 border border-rose-100 text-primary rounded-none shrink-0">
                    <Icon className="w-5 h-5" />
                  </span>
                  <p className="font-display font-bold text-foreground text-[14px] uppercase group-hover:text-primary transition-colors">
                    {area.title}
                  </p>
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 20 20"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2.5}
                    className="ml-auto text-secondary opacity-60 group-hover:text-primary group-hover:opacity-100 group-hover:translate-x-1 transition-all shrink-0"
                  >
                    <path d="M4 10h12M12 5l5 5-5 5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </Link>
              </SpotlightCard>
            </RevealItem>
            );
          })}
        </RevealGroup>
      </div>
    </section>
  );
}
