import { companyInfo, services, expertiseAreas } from "@/lib/constants";
import { Counter } from "@/components/ui/Counter";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";

export default function StatsBar() {
  const stats = [
    {
      value: parseInt(companyInfo.yearsExperience, 10) || 65,
      label: "Combined Experience",
    },
    { value: services.length || 6, label: "Core Engineering Services" },
    { value: expertiseAreas.length || 6, label: "Heavy-Process Sectors" },
  ];

  return (
    <section className="bg-background py-xl border-t border-border blueprint-mesh">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <RevealGroup
          className="grid md:grid-cols-3 border border-border bg-white divide-y md:divide-y-0 md:divide-x divide-border rounded-none"
          stagger={0.08}
        >
          {stats.map((stat, i) => (
            <RevealItem
              key={stat.label}
              className="p-8 relative group hover:bg-slate-50/50 transition-colors duration-150"
            >
              {/* Technical stat code identifier */}
              <div className="absolute top-4 right-4 font-mono text-[8px] text-slate-400 notranslate" translate="no">
                ST&#8209;{String(i + 1).padStart(2, "0")}
              </div>
              <div className="flex items-center gap-2 justify-center md:justify-start">
                <span className="w-1.5 h-1.5 bg-primary shrink-0" />
                <p className="font-sans font-extrabold text-4xl sm:text-5xl text-foreground tracking-tight notranslate" translate="no">
                  <Counter value={stat.value} />
                  <span>+</span>
                </p>
              </div>
              <p className="text-secondary text-[11px] font-sans font-bold tracking-wider mt-3.5 uppercase text-center md:text-left">
                {stat.label}
              </p>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
