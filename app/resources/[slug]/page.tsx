import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import TechnicalCursor from "@/components/ui/TechnicalCursor";
import { Reveal } from "@/components/ui/Reveal";

export default async function ResourceDetailPage({ params }: { params: Promise<{ slug: string }> }) {
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
              <span className="text-primary font-bold mr-1">┌</span> WHITE PAPER DOSSIER
            </div>
            <h1 className="text-3xl sm:text-4xl font-display font-extrabold text-foreground uppercase tracking-tight leading-none mb-6">
              {title}
            </h1>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="card relative mb-12">
              <p className="body-md text-secondary leading-relaxed">
                Full research publication, flow calculations, and detailed process guidelines for <strong>{title}</strong>. This dossier details flow simulation formulas, combustion thermodynamics, 3D laser-scanning coordinate verification thresholds, and engineering standards guidelines to support plant operations.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.16}>
            <div className="grid md:grid-cols-2 gap-lg">
              <div className="bg-white border border-border p-6 rounded-none relative">
                <h3 className="font-display font-extrabold text-sm text-foreground mb-4 uppercase tracking-tight">
                  Publication Details
                </h3>
                <ul className="space-y-3.5 font-mono text-[10px] text-secondary">
                  <li><span className="text-primary font-bold mr-1.5">//</span> CLASSIFICATION: Technical Guide</li>
                  <li><span className="text-primary font-bold mr-1.5">//</span> STANDARDS: ASME SEC VIII / API guides</li>
                  <li><span className="text-primary font-bold mr-1.5">//</span> COMPILER: MACPROTEC Engineering Board</li>
                  <li><span className="text-primary font-bold mr-1.5">//</span> REGISTRY: USA-TX-HOU-2026</li>
                </ul>
              </div>

              <div className="bg-white border border-border p-6 rounded-none relative">
                <h3 className="font-display font-extrabold text-sm text-foreground mb-4 uppercase tracking-tight">
                  Key Learnings Included
                </h3>
                <ul className="space-y-3.5 font-sans text-xs text-secondary">
                  <li className="flex gap-2 items-start">
                    <span className="text-primary font-mono text-[9px] mt-0.5">■</span>
                    <span>Optimizing alternative fuel burner nozzle velocity bounds</span>
                  </li>
                  <li className="flex gap-2 items-start">
                    <span className="text-primary font-mono text-[9px] mt-0.5">■</span>
                    <span>Laser scanning scan noise extraction guidelines</span>
                  </li>
                  <li className="flex gap-2 items-start">
                    <span className="text-primary font-mono text-[9px] mt-0.5">■</span>
                    <span>Piping stress FEA calculations under load variations</span>
                  </li>
                  <li className="flex gap-2 items-start">
                    <span className="text-primary font-mono text-[9px] mt-0.5">■</span>
                    <span>Digital twin SCADA tag integration schemas</span>
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
