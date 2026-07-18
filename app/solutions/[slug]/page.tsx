import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import TechnicalCursor from "@/components/ui/TechnicalCursor";
import { Reveal } from "@/components/ui/Reveal";

export default async function SolutionDetailPage({ params }: { params: Promise<{ slug: string }> }) {
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
              <span className="text-primary font-bold mr-1">┌</span> CAPABILITIES SHEET
            </div>
            <h1 className="text-3xl sm:text-4xl font-display font-extrabold text-foreground uppercase tracking-tight leading-none mb-6">
              {title}
            </h1>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="card relative mb-12">
              <p className="body-md text-secondary leading-relaxed">
                Detailed technical specifications, process designs, and validation matrices for <strong>{title}</strong>. MacProtec provides expert process analysis, CFD modeling, 3D laser scanning, and instrumentation optimization to minimize plant downtime and ensure long-term structural and thermal efficiency.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.16}>
            <div className="grid md:grid-cols-2 gap-lg">
              <div className="bg-white border border-border p-6 rounded-none relative">
                <h3 className="font-display font-extrabold text-sm text-foreground mb-4 uppercase tracking-tight">
                  Technical Configurations
                </h3>
                <ul className="space-y-3.5 font-mono text-[10px] text-secondary">
                  <li><span className="text-primary font-bold mr-1.5">//</span> PLATFORMS: ANSYS Fluent / HYSYS / CAD</li>
                  <li><span className="text-primary font-bold mr-1.5">//</span> VERIFICATION: CFD thermal & FEA stress</li>
                  <li><span className="text-primary font-bold mr-1.5">//</span> COMPLIANCE: API / ASME SEC VIII guides</li>
                  <li><span className="text-primary font-bold mr-1.5">//</span> EXECUTION: Greenfield & brownfield SLA</li>
                </ul>
              </div>

              <div className="bg-white border border-border p-6 rounded-none relative">
                <h3 className="font-display font-extrabold text-sm text-foreground mb-4 uppercase tracking-tight">
                  Project Deliverables
                </h3>
                <ul className="space-y-3.5 font-sans text-xs text-secondary">
                  <li className="flex gap-2 items-start">
                    <span className="text-primary font-mono text-[9px] mt-0.5">■</span>
                    <span>As-built 3D model point clouds & CAD outputs</span>
                  </li>
                  <li className="flex gap-2 items-start">
                    <span className="text-primary font-mono text-[9px] mt-0.5">■</span>
                    <span>Detailed process flow diagrams (PFDs) & report sheets</span>
                  </li>
                  <li className="flex gap-2 items-start">
                    <span className="text-primary font-mono text-[9px] mt-0.5">■</span>
                    <span>Operational debottlenecking & burner config specifications</span>
                  </li>
                  <li className="flex gap-2 items-start">
                    <span className="text-primary font-mono text-[9px] mt-0.5">■</span>
                    <span>Digital twin dashboard configuration parameters</span>
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
