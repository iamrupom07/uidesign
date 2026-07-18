import type { ComponentType } from "react";
import Link from "next/link";
import { services } from "@/lib/constants";
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

const codes = ["PE", "SI", "PO", "PD", "PM", "TR"];
const serviceIcons: Record<string, ComponentType<{ className?: string }>> = {
  "process-engineering": IconProcessEngineering,
  "system-integration-solutions": IconSystemIntegration,
  "plant-operational-support": IconOperationalSupport,
  "process-design-development-support": IconDesignSupport,
  "project-management": IconProjectManagement,
  "training-for-industry-professionals": IconTraining,
};

export default function ServicesOverview() {
  const sorted = [...services].sort((a, b) => a.order - b.order);

  return (
    <section id="our-services" className="py-xl bg-background blueprint-mesh border-t border-border">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex flex-wrap items-end justify-between gap-6 mb-14">
          <Reveal className="max-w-xl">
            <div className="font-mono text-[11px] font-bold text-primary tracking-widest uppercase mb-4">
              <span className="text-primary font-bold mr-1">┌</span> SERVICES
            </div>
            <h2 className="mb-4 font-display font-extrabold text-3xl text-foreground uppercase">
              What we <span className="text-primary">do</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <Magnetic strength={0.05}>
              <Link
                href="/lets-connect"
                className="button-outline inline-block"
              >
                Request a Consultation
              </Link>
            </Magnetic>
          </Reveal>
        </div>

        <RevealGroup className="grid sm:grid-cols-2 lg:grid-cols-3 gap-lg" stagger={0.06}>
          {sorted.map((service, i) => {
            const Icon = serviceIcons[service.slug] ?? IconProcessEngineering;
            const card = (
              <SpotlightCard className="h-full p-lg flex flex-col justify-between cursor-pointer group/card">
                <div>
                  <div className="relative flex items-start justify-between mb-8">
                    <span className="w-10 h-10 flex items-center justify-center bg-rose-50 border border-rose-100 text-primary rounded-none">
                      <Icon className="w-5 h-5" />
                    </span>
                    <div className="flex flex-col items-end gap-1.5">
                      <span className="font-mono text-[10px] font-bold text-secondary tracking-wider">
                        {codes[i % codes.length]}&#8209;{String(service.order).padStart(2, "0")}
                      </span>
                      {!service.published && (
                        <span className="font-mono text-[9px] font-semibold uppercase tracking-wider text-muted-foreground bg-muted border border-border px-2 py-0.5 rounded-none">
                          Coming soon
                        </span>
                      )}
                    </div>
                  </div>
                  <p className="relative font-display font-extrabold text-base text-foreground group-hover/card:text-primary transition-colors leading-snug uppercase">
                    {service.title}
                  </p>
                  <p className="relative text-xs text-secondary mt-3 leading-relaxed">
                    {service.summary}
                  </p>
                </div>
              </SpotlightCard>
            );

            return (
              <RevealItem key={service.slug}>
                {service.published ? (
                  <Link href={`/our-services/${service.slug}`} className="block h-full">
                    {card}
                  </Link>
                ) : (
                  <div className="h-full">{card}</div>
                )}
              </RevealItem>
            );
          })}
        </RevealGroup>
      </div>
    </section>
  );
}
