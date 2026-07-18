"use client";

export default function Marquee() {
  const items = [
    "CEMENT PLANTS",
    "FEASIBILITY STUDIES",
    "COMBUSTION OPTIMIZATION",
    "PROCESS DESIGN",
    "DIGITAL TWIN & AI",
    "PIPING STRESS ANALYSIS",
    "CFD SIMULATION",
    "BULK MATERIAL HANDLING",
    "KILN PERFORMANCE MONITORING",
    "REVERSE ENGINEERING",
  ];

  return (
    <div className="relative w-full overflow-hidden bg-white border-y border-border py-4 z-10 select-none">
      <div className="flex animate-marquee gap-12 items-center">
        {[...items, ...items].map((item, index) => (
          <div key={index} className="flex items-center gap-12">
            <span className="font-mono text-xs font-bold text-foreground tracking-widest uppercase">
              {item}
            </span>
            <span className="font-mono text-xs font-bold text-primary">//</span>
          </div>
        ))}
      </div>
    </div>
  );
}
