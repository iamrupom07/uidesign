import { Reveal } from "@/components/ui/Reveal";

const tools = [
  "ANSYS Fluent",
  "AutoCAD Plant 3D",
  "Aspen HYSYS",
  "SolidWorks",
  "AVEVA E3D",
  "Bentley OpenPlant",
  "MATLAB / Simulink",
];

export default function CapabilitiesStrip() {
  return (
    <section className="bg-muted py-lg border-y border-border">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <Reveal>
          <p className="font-mono text-[10px] font-bold text-secondary tracking-widest uppercase text-center mb-8">
            Engineered With Industry-Standard Platforms
          </p>
        </Reveal>
        <Reveal delay={0.08}>
          <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
            {tools.map((tool) => (
              <span
                key={tool}
                className="font-display font-bold text-sm sm:text-base text-secondary/70 uppercase tracking-wide hover:text-primary transition-colors duration-150"
              >
                {tool}
              </span>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
