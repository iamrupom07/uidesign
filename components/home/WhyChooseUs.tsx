import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { IconLicensed, IconMonitoring, IconTeam, IconScalable } from "@/components/ui/Icons";

const reasons = [
  {
    icon: IconLicensed,
    title: "Engineering-First Approach",
    description:
      "Every deliverable is grounded in verified process engineering — from feasibility studies through detail design — not off-the-shelf templates.",
  },
  {
    icon: IconTeam,
    title: "Licensed, Multi-Discipline Team",
    description:
      "Process, mechanical, piping, civil, electrical, and I&C engineers work as one integrated team on every project, backed by 65+ years of combined experience.",
  },
  {
    icon: IconMonitoring,
    title: "Proactive Plant Monitoring",
    description:
      "MacProtec operates on prevention, not reaction. Digital twin dashboards and predictive analytics flag issues before they become downtime.",
  },
  {
    icon: IconScalable,
    title: "Scalable Engagement Models",
    description:
      "Whether it's a single FEED package or a long-term operational support SLA, our services scale with the size and complexity of your plant.",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="py-xl bg-background border-t border-border blueprint-mesh">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <Reveal className="max-w-2xl mb-14">
          <div className="font-mono text-[11px] font-bold text-primary tracking-widest uppercase mb-4">
            <span className="text-primary font-bold mr-1">┌</span> WHY CHOOSE US
          </div>
          <h2 className="mb-4 font-display font-extrabold text-3xl text-foreground uppercase">
            Why Choose <span className="text-primary">MACPROTEC</span>
          </h2>
          <p className="body-md text-secondary mt-4">
            More than a consultant — a process-engineering partner invested in the safety,
            uptime, and efficiency of your plant.
          </p>
        </Reveal>

        <RevealGroup className="grid sm:grid-cols-2 lg:grid-cols-4 gap-lg" stagger={0.08}>
          {reasons.map((reason) => (
            <RevealItem key={reason.title}>
              <div className="bg-white border border-border p-6 sm:p-7 h-full rounded-none">
                <span className="w-11 h-11 flex items-center justify-center bg-rose-50 border border-rose-100 text-primary rounded-none mb-5">
                  <reason.icon className="w-5 h-5" />
                </span>
                <h3 className="font-display font-extrabold text-sm text-foreground mb-2.5 uppercase leading-snug">
                  {reason.title}
                </h3>
                <p className="text-xs text-secondary leading-relaxed font-sans">
                  {reason.description}
                </p>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
