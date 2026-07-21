import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import TechnicalCursor from "@/components/ui/TechnicalCursor";
import { Reveal } from "@/components/ui/Reveal";

export default async function ProjectDetailPage({ params }: { params: Promise<{ slug: string }> }) {
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
              <span className="text-primary font-bold mr-1">┌</span> CASE DOSSIER
            </div>
            <h1 className="text-3xl sm:text-4xl font-display font-extrabold text-foreground uppercase tracking-tight leading-none mb-6">
              {title}
            </h1>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="card relative mb-12">
              <p className="body-md text-secondary leading-relaxed">
                Project summary, client goals, mechanical designs, and flow simulation parameters
                for <strong>{title}</strong>. MacProtec applied CFD, FEA, and laser scanning
                workflows to bypass on-site trial periods, troubleshoot thermal states, and verify
                tolerances before mechanical assembly.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.16}>
            <div className="grid md:grid-cols-2 gap-lg">
              <div className="bg-white border border-border p-6 rounded-none relative">
                <h3 className="font-display font-extrabold text-sm text-foreground mb-4 uppercase tracking-tight">
                  Applied Tools
                </h3>
                <ul className="space-y-3.5 font-mono text-[10px] text-secondary">
                  <li>
                    <span className="text-primary font-bold mr-1.5">//</span> SOLVER: ANSYS Fluent
                    multi-phase thermal
                  </li>
                  <li>
                    <span className="text-primary font-bold mr-1.5">//</span> SCANNING: 3D laser
                    scanner point clouds
                  </li>
                  <li>
                    <span className="text-primary font-bold mr-1.5">//</span> MODELING: Autodesk
                    Plant 3D coordinate checks
                  </li>
                  <li>
                    <span className="text-primary font-bold mr-1.5">//</span> METRICS: SCADA
                    dashboard telemetry logs
                  </li>
                </ul>
              </div>

              <div className="bg-white border border-border p-6 rounded-none relative">
                <h3 className="font-display font-extrabold text-sm text-foreground mb-4 uppercase tracking-tight">
                  Engineering Results
                </h3>
                <ul className="space-y-3.5 font-sans text-xs text-secondary">
                  <li className="flex gap-2 items-start">
                    <span className="text-primary font-mono text-[9px] mt-0.5">■</span>
                    <span>100% clash-free installation validated on-site</span>
                  </li>
                  <li className="flex gap-2 items-start">
                    <span className="text-primary font-mono text-[9px] mt-0.5">■</span>
                    <span>Thermal efficiency increased by 14% on alternative fuels</span>
                  </li>
                  <li className="flex gap-2 items-start">
                    <span className="text-primary font-mono text-[9px] mt-0.5">■</span>
                    <span>Drafting drawing accuracy held within 2.5mm tolerance</span>
                  </li>
                  <li className="flex gap-2 items-start">
                    <span className="text-primary font-mono text-[9px] mt-0.5">■</span>
                    <span>Commissioning completed 4 days ahead of scheduled timeline</span>
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
