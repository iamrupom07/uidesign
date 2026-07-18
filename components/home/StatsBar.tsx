import { companyInfo, services, expertiseAreas } from "@/lib/constants";
import { Counter } from "@/components/ui/Counter";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";

export default function StatsBar() {
  const stats = [
    {
      value: parseInt(companyInfo.yearsExperience, 10),
      label: "Combined Experience",
    },
    { value: services.length, label: "Core Engineering Services" },
    { value: expertiseAreas.length, label: "Heavy-Process Sectors" },
  ];

  return (
    <section className="bg-muted py-xl border-y border-border">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <RevealGroup className="grid grid-cols-2 md:grid-cols-3 gap-lg text-center md:text-left" stagger={0.08}>
          {stats.map((stat, i) => (
            <RevealItem
              key={stat.label}
              className={`${
                i === stats.length - 1 ? "col-span-2 md:col-span-1" : ""
              }`}
            >
              <p className="font-sans font-extrabold text-4xl sm:text-5xl text-foreground flex items-center justify-center md:justify-start">
                <Counter value={stat.value} />
                <span>+</span>
              </p>
              <p className="text-secondary text-[11px] font-sans font-bold tracking-wider mt-2.5 uppercase">
                {stat.label}
              </p>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
