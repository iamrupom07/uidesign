"use client";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import TechnicalCursor from "@/components/ui/TechnicalCursor";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  CheckCircle2,
  Cpu,
  Factory,
  BarChart3,
  Layers,
  ShieldCheck,
  Wrench,
  TrendingUp,
  Sparkles,
  ChevronRight,
  Leaf,
  Droplets,
  Trees,
  Users,
  DollarSign,
  Truck,
  Scale,
  Award,
  Share2,
} from "lucide-react";

export default function MiningAndMetalsPage() {
  return (
    <>
      <TechnicalCursor />
      <Header />

      <main className="bg-slate-50 min-h-screen text-slate-800 font-sans selection:bg-rose-500 selection:text-white">
        {/* BREADCRUMB / DOSSIER TOP BAR */}
        <section className="bg-slate-900 border-b border-slate-800 text-white py-3 px-6 lg:px-8 font-mono text-xs">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-2 text-slate-400">
              <Link href="/" className="hover:text-white transition-colors">
                Home
              </Link>
              <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
              <Link href="/industries" className="hover:text-white transition-colors">
                Our Expertise
              </Link>
              <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
              <span className="text-primary font-bold">Mining and Metals</span>
            </div>
            <div className="hidden sm:flex items-center gap-3 text-[10px] text-slate-400">
              <span className="font-bold text-rose-400">SECTOR 04</span>
              <span>•</span>
              <span>MINING & METALS SUSTAINABILITY LEVERS</span>
            </div>
          </div>
        </section>

        {/* 1. HERO BANNER */}
        <section className="relative py-16 lg:py-24 bg-white border-b border-slate-200 overflow-hidden">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="grid lg:grid-cols-12 gap-10 items-center">
              <div className="lg:col-span-6 space-y-5">
                <Reveal>
                  <div className="inline-flex items-center gap-2 bg-rose-50 text-primary border border-rose-200/80 px-3.5 py-1.5 font-mono text-xs font-bold uppercase tracking-wider rounded-full shadow-xs">
                    <Sparkles className="w-3.5 h-3.5 text-primary" />
                    <span>OUR EXPERTISE // MINING & METALS</span>
                  </div>
                </Reveal>

                <Reveal>
                  <h1 className="font-display font-extrabold text-2xl sm:text-3xl lg:text-4xl text-slate-900 uppercase tracking-tight leading-[1.15]">
                    Mining & Metals <span className="text-primary">Sustainability Levers & Solutions</span>
                  </h1>
                </Reveal>

                <Reveal>
                  <p className="text-sm sm:text-base text-slate-600 font-sans leading-relaxed max-w-2xl">
                    In the mining and metals industries, sustainability levers refer to the key strategies, initiatives, and practices that companies can employ to promote environmental stewardship, social responsibility, and economic viability. These levers are instrumental in driving positive change and achieving sustainable outcomes across various facets of mining and metal production. The MACPROTEC team helps achieve critical sustainability levers across environmental, social, economic, and compliance domains.
                  </p>
                </Reveal>

                {/* Hero Badges */}
                <Reveal>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 pt-1">
                    <div className="bg-slate-50 border border-slate-200 p-2.5 rounded font-mono text-[11px] text-slate-800 font-bold flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-primary shrink-0" />
                      <span>Resource Efficiency</span>
                    </div>
                    <div className="bg-slate-50 border border-slate-200 p-2.5 rounded font-mono text-[11px] text-slate-800 font-bold flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-primary shrink-0" />
                      <span>Emissions Mitigation</span>
                    </div>
                    <div className="bg-slate-50 border border-slate-200 p-2.5 rounded font-mono text-[11px] text-slate-800 font-bold flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-primary shrink-0" />
                      <span>Water Management</span>
                    </div>
                    <div className="bg-slate-50 border border-slate-200 p-2.5 rounded font-mono text-[11px] text-slate-800 font-bold flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-primary shrink-0" />
                      <span>Innovation & Technology</span>
                    </div>
                    <div className="bg-slate-50 border border-slate-200 p-2.5 rounded font-mono text-[11px] text-slate-800 font-bold flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-primary shrink-0" />
                      <span>ICMM / GRI Standards</span>
                    </div>
                  </div>
                </Reveal>

                {/* Hero Action Buttons */}
                <Reveal>
                  <div className="flex flex-wrap items-center gap-4 pt-3">
                    <a
                      href="#environmental-sustainability"
                      className="px-6 py-3.5 bg-primary hover:bg-rose-700 text-white font-mono text-xs font-bold uppercase tracking-wider transition-all duration-150 shadow-md flex items-center gap-2 group"
                    >
                      <span>Explore Sustainability Levers</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </a>

                    <Link
                      href="/lets-connect"
                      className="px-6 py-3.5 bg-white border border-slate-300 hover:border-slate-900 text-slate-800 font-mono text-xs font-bold uppercase tracking-wider transition-all duration-150 flex items-center gap-2 hover:bg-slate-50"
                    >
                      <span>Consult Mining Specialists</span>
                      <ArrowRight className="w-4 h-4 text-slate-400" />
                    </Link>
                  </div>
                </Reveal>
              </div>

              {/* Right Hero Image */}
              <div className="lg:col-span-6 relative">
                <Reveal>
                  <div className="relative border-4 border-white shadow-2xl overflow-hidden group bg-slate-900">
                    <Image
                      src="/images/mining_metals.png"
                      alt="MACPROTEC Mining and Metals Quarry Site"
                      width={900}
                      height={650}
                      className="w-full h-[450px] sm:h-[520px] lg:h-[560px] object-cover group-hover:scale-105 transition-transform duration-500"
                      priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/20 to-transparent z-10" />

                    <div className="absolute bottom-5 left-5 right-5 z-20 bg-slate-950/90 border border-slate-800 p-4 backdrop-blur-md font-mono text-white flex items-center justify-between">
                      <div>
                        <div className="text-[10px] text-rose-400 font-bold uppercase tracking-wider">
                          CORE SECTOR HIGHLIGHT
                        </div>
                        <div className="text-sm font-extrabold font-display uppercase tracking-tight text-white mt-0.5">
                          MINING & METALS SUSTAINABILITY
                        </div>
                      </div>
                      <div className="w-10 h-10 rounded bg-primary/20 border border-primary/40 flex items-center justify-center text-primary shrink-0">
                        <Factory className="w-5 h-5" />
                      </div>
                    </div>
                  </div>
                </Reveal>
              </div>
            </div>
          </div>
        </section>

        {/* 2. ENVIRONMENTAL SUSTAINABILITY */}
        <section id="environmental-sustainability" className="py-20 bg-slate-50 border-b border-slate-200 scroll-mt-10">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 space-y-12">
            <div className="max-w-3xl space-y-4">
              <Reveal>
                <div className="inline-block font-mono text-xs font-bold text-primary uppercase tracking-widest bg-rose-50 border border-rose-200 px-3 py-1">
                  CATEGORY 01 // ENVIRONMENTAL STEWARDSHIP
                </div>
              </Reveal>
              <Reveal>
                <h2 className="font-display font-black text-3xl sm:text-4xl text-slate-900 uppercase tracking-tight">
                  Environmental Sustainability Levers
                </h2>
              </Reveal>
              <Reveal>
                <p className="text-slate-600 font-sans text-base leading-relaxed">
                  Key environmental strategies engineered to optimize resource utilization, minimize emissions, preserve ecosystems, and conserve water resources in mining operations.
                </p>
              </Reveal>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Resource Efficiency */}
              <Reveal>
                <div className="bg-white border border-slate-200 p-6 space-y-4 h-full flex flex-col justify-between hover:border-primary/60 transition-all duration-200 group">
                  <div className="space-y-3">
                    <div className="w-10 h-10 rounded bg-rose-50 border border-rose-200 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                      <Leaf className="w-5 h-5" />
                    </div>
                    <h3 className="font-display font-extrabold text-lg text-slate-900 uppercase tracking-tight">
                      Resource Efficiency
                    </h3>
                    <p className="text-xs text-slate-600 font-sans leading-relaxed">
                      Implementing measures to optimize resource utilization, reduce waste generation, and minimize energy and water consumption in mining and processing operations.
                    </p>
                  </div>
                  <div className="pt-3 border-t border-slate-100 font-mono text-[10px] font-bold text-rose-500">
                    RESOURCE & ENERGY OPTIMIZATION
                  </div>
                </div>
              </Reveal>

              {/* Emissions Reduction */}
              <Reveal>
                <div className="bg-white border border-slate-200 p-6 space-y-4 h-full flex flex-col justify-between hover:border-primary/60 transition-all duration-200 group">
                  <div className="space-y-3">
                    <div className="w-10 h-10 rounded bg-rose-50 border border-rose-200 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                      <TrendingUp className="w-5 h-5" />
                    </div>
                    <h3 className="font-display font-extrabold text-lg text-slate-900 uppercase tracking-tight">
                      Emissions Reduction
                    </h3>
                    <p className="text-xs text-slate-600 font-sans leading-relaxed">
                      Investing in technologies and processes to mitigate greenhouse gas emissions, air pollutants, and other harmful emissions associated with mining and metallurgical activities.
                    </p>
                  </div>
                  <div className="pt-3 border-t border-slate-100 font-mono text-[10px] font-bold text-rose-500">
                    GHG & AIR POLLUTANT MITIGATION
                  </div>
                </div>
              </Reveal>

              {/* Biodiversity Conservation */}
              <Reveal>
                <div className="bg-white border border-slate-200 p-6 space-y-4 h-full flex flex-col justify-between hover:border-primary/60 transition-all duration-200 group">
                  <div className="space-y-3">
                    <div className="w-10 h-10 rounded bg-rose-50 border border-rose-200 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                      <Trees className="w-5 h-5" />
                    </div>
                    <h3 className="font-display font-extrabold text-lg text-slate-900 uppercase tracking-tight">
                      Biodiversity Conservation
                    </h3>
                    <p className="text-xs text-slate-600 font-sans leading-relaxed">
                      Adopting practices to minimize habitat disruption, preserve biodiversity, and rehabilitate land impacted by mining activities through reforestation, habitat restoration, and land reclamation efforts.
                    </p>
                  </div>
                  <div className="pt-3 border-t border-slate-100 font-mono text-[10px] font-bold text-rose-500">
                    LAND RECLAMATION & RESTORATION
                  </div>
                </div>
              </Reveal>

              {/* Water Management */}
              <Reveal>
                <div className="bg-white border border-slate-200 p-6 space-y-4 h-full flex flex-col justify-between hover:border-primary/60 transition-all duration-200 group">
                  <div className="space-y-3">
                    <div className="w-10 h-10 rounded bg-rose-50 border border-rose-200 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                      <Droplets className="w-5 h-5" />
                    </div>
                    <h3 className="font-display font-extrabold text-lg text-slate-900 uppercase tracking-tight">
                      Water Management
                    </h3>
                    <p className="text-xs text-slate-600 font-sans leading-relaxed">
                      Implementing water conservation measures, recycling and reuse systems, and responsible water discharge practices to minimize the environmental footprint and mitigate water-related impacts of mining operations.
                    </p>
                  </div>
                  <div className="pt-3 border-t border-slate-100 font-mono text-[10px] font-bold text-rose-500">
                    RECYCLING & RESPONSIBLE DISCHARGE
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* 3. SOCIAL RESPONSIBILITY & ECONOMIC VIABILITY */}
        <section className="py-20 bg-white border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 space-y-12">
            <div className="max-w-3xl space-y-4">
              <Reveal>
                <div className="inline-block font-mono text-xs font-bold text-primary uppercase tracking-widest bg-rose-50 border border-rose-200 px-3 py-1">
                  CATEGORIES 02 & 03 // SOCIAL & ECONOMIC VIABILITY
                </div>
              </Reveal>
              <Reveal>
                <h2 className="font-display font-black text-3xl sm:text-4xl text-slate-900 uppercase tracking-tight">
                  Social Responsibility & Economic Viability
                </h2>
              </Reveal>
              <Reveal>
                <p className="text-slate-600 font-sans text-base leading-relaxed">
                  Building mutually beneficial community partnerships, technological resilience, transparent governance, and responsible supply chains.
                </p>
              </Reveal>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Community Engagement */}
              <Reveal>
                <div className="bg-slate-50 border border-slate-200 p-8 space-y-4 hover:border-primary/60 transition-all duration-200 group h-full flex flex-col justify-between">
                  <div className="space-y-4">
                    <div className="w-12 h-12 rounded bg-rose-50 border border-rose-200 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                      <Users className="w-6 h-6" />
                    </div>
                    <h3 className="font-display font-extrabold text-xl text-slate-900 uppercase tracking-tight">
                      Community Engagement
                    </h3>
                    <p className="text-slate-600 font-sans text-sm leading-relaxed">
                      Engaging with local communities, indigenous groups, and stakeholders to understand their concerns, address social issues, and build mutually beneficial partnerships through consultation, collaboration, and inclusive decision-making processes.
                    </p>
                  </div>
                  <div className="pt-4 border-t border-slate-200 font-mono text-[11px] font-bold text-primary">
                    INCLUSIVE STAKEHOLDER PARTNERSHIPS
                  </div>
                </div>
              </Reveal>

              {/* Financial Responsibility */}
              <Reveal>
                <div className="bg-slate-50 border border-slate-200 p-8 space-y-4 hover:border-primary/60 transition-all duration-200 group h-full flex flex-col justify-between">
                  <div className="space-y-4">
                    <div className="w-12 h-12 rounded bg-rose-50 border border-rose-200 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                      <DollarSign className="w-6 h-6" />
                    </div>
                    <h3 className="font-display font-extrabold text-xl text-slate-900 uppercase tracking-tight">
                      Financial Responsibility
                    </h3>
                    <p className="text-slate-600 font-sans text-sm leading-relaxed">
                      Advising transparent financial practices, sound governance structures, and risk management strategies to ensure the long-term financial viability and resilience of mining and metals companies.
                    </p>
                  </div>
                  <div className="pt-4 border-t border-slate-200 font-mono text-[11px] font-bold text-primary">
                    GOVERNANCE & RISK MANAGEMENT
                  </div>
                </div>
              </Reveal>

              {/* Innovation and Technology */}
              <Reveal>
                <div className="bg-slate-50 border border-slate-200 p-8 space-y-4 hover:border-primary/60 transition-all duration-200 group h-full flex flex-col justify-between">
                  <div className="space-y-4">
                    <div className="w-12 h-12 rounded bg-rose-50 border border-rose-200 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                      <Cpu className="w-6 h-6" />
                    </div>
                    <h3 className="font-display font-extrabold text-xl text-slate-900 uppercase tracking-tight">
                      Innovation and Technology
                    </h3>
                    <p className="text-slate-600 font-sans text-sm leading-relaxed">
                      Embracing innovation, digitalization, and technological advancements to improve operational efficiency, productivity, and cost-effectiveness, while reducing environmental impact and enhancing competitiveness.
                    </p>
                  </div>
                  <div className="pt-4 border-t border-slate-200 font-mono text-[11px] font-bold text-primary">
                    DIGITALIZATION & PRODUCTIVITY
                  </div>
                </div>
              </Reveal>

              {/* Supply Chain Management */}
              <Reveal>
                <div className="bg-slate-50 border border-slate-200 p-8 space-y-4 hover:border-primary/60 transition-all duration-200 group h-full flex flex-col justify-between">
                  <div className="space-y-4">
                    <div className="w-12 h-12 rounded bg-rose-50 border border-rose-200 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                      <Truck className="w-6 h-6" />
                    </div>
                    <h3 className="font-display font-extrabold text-xl text-slate-900 uppercase tracking-tight">
                      Supply Chain Management
                    </h3>
                    <p className="text-slate-600 font-sans text-sm leading-relaxed">
                      Promoting responsible sourcing, ethical procurement practices, and supply chain transparency to ensure the integrity and sustainability of raw materials and products throughout the value chain.
                    </p>
                  </div>
                  <div className="pt-4 border-t border-slate-200 font-mono text-[11px] font-bold text-primary">
                    RESPONSIBLE ETHICAL SOURCING
                  </div>
                </div>
              </Reveal>

              {/* Stakeholder Collaboration */}
              <Reveal className="md:col-span-2 lg:col-span-2">
                <div className="bg-slate-900 text-white border border-slate-800 p-8 space-y-4 hover:border-rose-500/50 transition-all duration-200 group h-full flex flex-col justify-between">
                  <div className="space-y-4">
                    <div className="w-12 h-12 rounded bg-rose-500/20 border border-rose-500/40 flex items-center justify-center text-rose-400">
                      <Share2 className="w-6 h-6" />
                    </div>
                    <h3 className="font-display font-extrabold text-xl text-white uppercase tracking-tight">
                      Stakeholder Collaboration
                    </h3>
                    <p className="text-slate-300 font-sans text-sm leading-relaxed">
                      Collaborating with industry partners, governments, civil society organizations, and academia to address common sustainability challenges, share best practices, and drive collective action towards shared goals and objectives.
                    </p>
                  </div>
                  <div className="pt-4 border-t border-slate-800 font-mono text-[11px] font-bold text-rose-400">
                    COLLECTIVE INDUSTRY ACTION
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* 4. REGULATORY COMPLIANCE AND STANDARDS */}
        <section className="py-20 bg-slate-50 border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 space-y-12">
            <div className="max-w-3xl space-y-4">
              <Reveal>
                <div className="inline-block font-mono text-xs font-bold text-primary uppercase tracking-widest bg-rose-50 border border-rose-200 px-3 py-1">
                  CATEGORY 04 // COMPLIANCE & STANDARDS
                </div>
              </Reveal>
              <Reveal>
                <h2 className="font-display font-black text-3xl sm:text-4xl text-slate-900 uppercase tracking-tight">
                  Regulatory Compliance & Industry Certification
                </h2>
              </Reveal>
              <Reveal>
                <p className="text-slate-600 font-sans text-base leading-relaxed">
                  Adhering strictly to local and international environmental standards while maintaining operational excellence.
                </p>
              </Reveal>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <Reveal>
                <div className="bg-white border border-slate-200 p-8 space-y-4 hover:border-primary/60 transition-all duration-200 group h-full flex flex-col justify-between">
                  <div className="space-y-4">
                    <div className="w-12 h-12 rounded bg-rose-50 border border-rose-200 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                      <Scale className="w-6 h-6" />
                    </div>
                    <h3 className="font-display font-extrabold text-2xl text-slate-900 uppercase tracking-tight">
                      Regulatory Compliance
                    </h3>
                    <p className="text-slate-600 font-sans text-sm leading-relaxed">
                      Adhering to environmental regulations, permitting requirements, and legal obligations at local, national, and international levels to ensure compliance with environmental, health, safety, and labor standards.
                    </p>
                  </div>
                  <div className="pt-4 border-t border-slate-100 font-mono text-[11px] font-bold text-primary">
                    EHS & PERMITTING AUDITS
                  </div>
                </div>
              </Reveal>

              <Reveal>
                <div className="bg-white border border-slate-200 p-8 space-y-4 hover:border-primary/60 transition-all duration-200 group h-full flex flex-col justify-between">
                  <div className="space-y-4">
                    <div className="w-12 h-12 rounded bg-rose-50 border border-rose-200 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                      <Award className="w-6 h-6" />
                    </div>
                    <h3 className="font-display font-extrabold text-2xl text-slate-900 uppercase tracking-tight">
                      Certification and Standards
                    </h3>
                    <p className="text-slate-600 font-sans text-sm leading-relaxed">
                      Seeking certification and adhering to industry standards, such as the International Council on Mining and Metals (ICMM) principles, Responsible Mining Initiative (RMI), and Global Reporting Initiative (GRI), to demonstrate commitment to sustainability, transparency, and corporate social responsibility.
                    </p>
                  </div>
                  <div className="pt-4 border-t border-slate-100 font-mono text-[11px] font-bold text-primary">
                    ICMM, RMI & GRI PRINCIPLES
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* 5. CLOSING COMMITMENT BANNER */}
        <section className="py-20 bg-slate-950 text-white border-b border-slate-800 overflow-hidden relative">
          <div className="absolute top-0 right-0 w-96 h-96 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="max-w-5xl mx-auto px-6 lg:px-8 relative z-10 text-center space-y-8">
            <Reveal>
              <div className="inline-block font-mono text-xs font-bold text-rose-400 tracking-widest uppercase bg-rose-500/20 border border-rose-500/40 px-3 py-1">
                VALUE CREATION FOR MINING & METALS
              </div>
            </Reveal>

            <Reveal>
              <h2 className="font-display font-black text-3xl sm:text-5xl text-white uppercase tracking-tight max-w-4xl mx-auto leading-tight">
                Enhance Economic Resilience & Responsible Resource Management
              </h2>
            </Reveal>

            <Reveal>
              <p className="text-slate-300 font-sans text-base sm:text-lg leading-relaxed max-w-3xl mx-auto">
                Sustainability levers in the mining and metals industries encompass a wide range of strategies and practices aimed at achieving environmental, social, and economic sustainability. By leveraging these levers, MACPROTEC brings value to mining and metals companies to mitigate their environmental footprint, promote social well-being, and enhance economic resilience, while contributing to sustainable development and responsible resource management globally.
              </p>
            </Reveal>

            <Reveal>
              <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
                <Link
                  href="/lets-connect"
                  className="px-8 py-4 bg-primary hover:bg-rose-700 text-white font-mono text-xs font-bold uppercase tracking-wider transition-all duration-150 shadow-xl flex items-center gap-2 group"
                >
                  <span>Consult Mining Specialists</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>

                <Link
                  href="/solutions"
                  className="px-8 py-4 bg-slate-900 border border-slate-700 hover:border-rose-500 text-slate-200 hover:text-white font-mono text-xs font-bold uppercase tracking-wider transition-all duration-150 flex items-center gap-2"
                >
                  <span>Explore Engineering Solutions</span>
                </Link>
              </div>
            </Reveal>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
