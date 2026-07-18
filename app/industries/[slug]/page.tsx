import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import TechnicalCursor from "@/components/ui/TechnicalCursor";
import { Reveal } from "@/components/ui/Reveal";

export default async function IndustryDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  // Format title from slug
  const title = slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  return (
    <>
      <TechnicalCursor />
      <Header />
      <main className="bg-background min-h-screen py-24">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <Reveal>
            <div className="font-mono text-[11px] font-bold text-primary tracking-widest uppercase mb-4">
              <span className="text-primary font-bold mr-1">┌</span> INDUSTRY SPECIFICATION
            </div>
            <h1 className="text-3xl sm:text-4xl font-display font-extrabold text-foreground uppercase tracking-tight leading-none mb-6">
              {title} Sector
            </h1>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="card relative mb-12">
              <p className="body-md text-secondary leading-relaxed">
                MacProtec provides specialized process consulting for the <strong>{title}</strong> sector. Our engineers deliver custom kiln heat transfer modeling, pneumatic conveyor troubleshooting, pipe stress analysis, and digital twin analytics dashboards to ensure uptime and safety.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.16}>
            <div className="grid md:grid-cols-2 gap-lg">
              <div className="bg-white border border-border p-6 rounded-none relative">
                <h3 className="font-display font-extrabold text-sm text-foreground mb-4 uppercase tracking-tight">
                  Typical Problem Areas Solved
                </h3>
                <ul className="space-y-3.5 font-mono text-[10px] text-secondary">
                  <li><span className="text-primary font-bold mr-1.5">//</span> Thermal inefficiencies in preheaters</li>
                  <li><span className="text-primary font-bold mr-1.5">//</span> Material blocks in pneumatic transport</li>
                  <li><span className="text-primary font-bold mr-1.5">//</span> Localized overheating on burner zones</li>
                  <li><span className="text-primary font-bold mr-1.5">//</span> Coordinate errors in equipment retrofits</li>
                </ul>
              </div>

              <div className="bg-white border border-border p-6 rounded-none relative">
                <h3 className="font-display font-extrabold text-sm text-foreground mb-4 uppercase tracking-tight">
                  Applied Consulting Methods
                </h3>
                <ul className="space-y-3.5 font-sans text-xs text-secondary">
                  <li className="flex gap-2 items-start">
                    <span className="text-primary font-mono text-[9px] mt-0.5">■</span>
                    <span>CFD Flow & Thermal Simulation analysis</span>
                  </li>
                  <li className="flex gap-2 items-start">
                    <span className="text-primary font-mono text-[9px] mt-0.5">■</span>
                    <span>FEA Stress & Structural stress limits</span>
                  </li>
                  <li className="flex gap-2 items-start">
                    <span className="text-primary font-mono text-[9px] mt-0.5">■</span>
                    <span>3D Laser scanning & as-built CAD processing</span>
                  </li>
                  <li className="flex gap-2 items-start">
                    <span className="text-primary font-mono text-[9px] mt-0.5">■</span>
                    <span>Predictive maintenance dashboard dashboards</span>
                  </li>
                </ul>
              </div>
            </div>
          </Reveal>
        </div>
      </main>
      <Footer />
    </>
  );
}
