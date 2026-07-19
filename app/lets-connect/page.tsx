"use client";

import { useState } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import TechnicalCursor from "@/components/ui/TechnicalCursor";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { Magnetic } from "@/components/ui/Magnetic";
import { companyInfo } from "@/lib/constants";

export default function ContactPage() {
  // States for interactive behaviors
  const [selectedDate, setSelectedDate] = useState("July 20, 2026");
  const [selectedTime, setSelectedTime] = useState("");
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [messageSent, setMessageSent] = useState(false);
  const [proposalSent, setProposalSent] = useState(false);

  // FEED ROI Calculator States
  const [capacity, setCapacity] = useState<number>(1000000);
  const [afSub, setAfSub] = useState<number>(40);
  const [rfpScope, setRfpScope] = useState<string>("");

  const fuelSavings = capacity * 0.003 * (afSub / 100) * 12.5;
  const estPayback = Math.max(4, Math.round(180000 / (fuelSavings / 12 || 1)));

  const autofillRoiMetrics = () => {
    setRfpScope(
      `TARGET: Increase alternative fuel substitution rate to ${afSub}%\n` +
      `ANNUAL CAPACITY: ${capacity.toLocaleString()} Tons/year\n` +
      `ESTIMATED FUEL SAVINGS: $${Math.round(fuelSavings).toLocaleString()}/year\n` +
      `ESTIMATED PAYBACK PERIOD: ${estPayback} months\n` +
      `Please prepare a FEED proposal scope based on these metrics.`
    );
  };

  // Time Slots for Scheduler
  const timeSlots = ["09:00 AM", "11:00 AM", "01:30 PM", "03:30 PM", "04:30 PM"];

  // File upload handler
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setUploadedFiles(Array.from(e.target.files));
    }
  };

  const handleMessageSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setMessageSent(true);
  };

  const handleProposalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setProposalSent(true);
  };

  return (
    <>
      <TechnicalCursor />
      <Header />

      <main className="bg-background min-h-screen blueprint-mesh py-24 space-y-24">
        
        {/* Banner Section */}
        <section className="max-w-7xl mx-auto px-6 lg:px-8 relative">
          <Reveal>
            <div className="font-mono text-[11px] font-bold text-primary tracking-widest uppercase mb-4">
              <span className="text-primary font-bold mr-1">┌</span> CONTACT DOSSIER
            </div>
            <h1 className="text-4xl sm:text-5xl font-display font-extrabold text-foreground uppercase tracking-tight leading-none">
              Let&apos;s <span className="text-primary">Connect</span>
            </h1>
            <p className="body-md text-secondary mt-4 max-w-2xl">
              Initiate contact, request project proposals, upload process layouts, or schedule virtual design reviews with our Houston consulting engineers.
            </p>
          </Reveal>
        </section>

        {/* 1. Contact Form Section */}
        <section className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-lg items-stretch">
            <div className="lg:col-span-2">
              <Reveal>
                <div className="font-mono text-[10px] font-bold text-primary tracking-widest uppercase mb-4">
                  <span className="text-primary font-bold mr-1">┌</span> FORM // SEC-01
                </div>
                <h2 className="text-2xl font-display font-extrabold uppercase mb-6">
                  Contact Form
                </h2>
                
                <form className="space-y-5 bg-white border border-border p-8 relative" onSubmit={handleMessageSubmit}>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="msg-name" className="block font-mono text-[10px] font-bold text-secondary uppercase mb-1.5 label-caps">
                        Full Name
                      </label>
                      <input
                        id="msg-name"
                        type="text"
                        required
                        placeholder="Enter your name"
                        className="w-full px-4 py-3 border border-border bg-card text-foreground font-sans focus:outline-none focus:border-primary text-xs"
                      />
                    </div>
                    <div>
                      <label htmlFor="msg-email" className="block font-mono text-[10px] font-bold text-secondary uppercase mb-1.5 label-caps">
                        Email Address*
                      </label>
                      <input
                        id="msg-email"
                        type="email"
                        required
                        placeholder="Enter your email"
                        className="w-full px-4 py-3 border border-border bg-card text-foreground font-sans focus:outline-none focus:border-primary text-xs"
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="msg-subject" className="block font-mono text-[10px] font-bold text-secondary uppercase mb-1.5 label-caps">
                      Subject
                    </label>
                    <input
                      id="msg-subject"
                      type="text"
                      placeholder="General inquiry topic"
                      className="w-full px-4 py-3 border border-border bg-card text-foreground font-sans focus:outline-none focus:border-primary text-xs"
                    />
                  </div>
                  <div>
                    <label htmlFor="msg-text" className="block font-mono text-[10px] font-bold text-secondary uppercase mb-1.5 label-caps">
                      Message Details*
                    </label>
                    <textarea
                      id="msg-text"
                      rows={5}
                      required
                      placeholder="Detail your plant challenges or feedback..."
                      className="w-full px-4 py-3 border border-border bg-card text-foreground font-sans focus:outline-none focus:border-primary text-xs"
                    />
                  </div>
                  
                  <Magnetic strength={0.05}>
                    <button
                      type="submit"
                      className="button-primary px-8 py-3 text-xs uppercase"
                    >
                      {messageSent ? "Message Sent ✓" : "Send Message"}
                    </button>
                  </Magnetic>
                </form>
              </Reveal>
            </div>

            {/* Quick overview detail card */}
            <div className="card relative h-full flex flex-col justify-between">
              <div>
                <span className="font-mono text-[10px] text-slate-400">INFO-01 / ADDR</span>
                <h3 className="font-display font-extrabold text-base uppercase text-foreground mt-4 mb-3">
                  Houston Office
                </h3>
                <p className="text-xs text-secondary leading-relaxed font-sans mb-6">
                  Houston-based process engineering consulting and system integration for heavy process industries.
                </p>
                <div className="space-y-2.5 font-mono text-[10px] text-secondary">
                  <div>EMAIL: {companyInfo.email}</div>
                  <div>PHONE: {companyInfo.phone}</div>
                  <div>HOURS: 8:00 AM – 5:00 PM CST</div>
                </div>
              </div>
              <div className="pt-4 border-t border-border font-mono text-[9px] text-slate-400 uppercase tracking-widest">
                ESTABLISHED IN TEXAS
              </div>
            </div>
          </div>
        </section>

        {/* 2. Book Consultation Section */}
        <section className="max-w-7xl mx-auto px-6 lg:px-8">
          <Reveal className="mb-6">
            <div className="font-mono text-[10px] font-bold text-primary tracking-widest uppercase mb-4">
              <span className="text-primary font-bold mr-1">┌</span> BOOKING // SEC-02
            </div>
            <h2 className="text-2xl font-display font-extrabold uppercase mb-2">
              Book a Consultation
            </h2>
            <p className="text-xs text-secondary max-w-xl">
              Select an available time slot below to calendar a virtual design and flowsheet audit review with our process team.
            </p>
          </Reveal>

          <div className="grid lg:grid-cols-3 gap-lg items-start">
            {/* Calendar widget mockup */}
            <Reveal className="lg:col-span-2">
              <div className="bg-white border border-border p-6 rounded-none">
                <div className="flex justify-between items-center mb-6 border-b border-border pb-4">
                  <span className="font-display font-extrabold text-sm uppercase">July 2026</span>
                  <div className="flex gap-2">
                    <button className="p-1.5 border border-border hover:bg-slate-50 text-[10px] font-bold font-mono">‹</button>
                    <button className="p-1.5 border border-border hover:bg-slate-50 text-[10px] font-bold font-mono">›</button>
                  </div>
                </div>
                <div className="grid grid-cols-7 gap-2 text-center font-mono text-[9px] font-bold text-slate-400 uppercase mb-3">
                  <span>Sun</span><span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span>
                </div>
                <div className="grid grid-cols-7 gap-2">
                  {[...Array(31)].map((_, i) => {
                    const dayNum = i + 1;
                    const isSelectable = dayNum >= 20 && dayNum <= 24;
                    const dateStr = `July ${dayNum}, 2026`;
                    const isSelected = selectedDate === dateStr;
                    return (
                      <button
                        key={i}
                        onClick={() => isSelectable && setSelectedDate(dateStr)}
                        disabled={!isSelectable}
                        className={`py-3 text-xs font-mono border rounded-none transition-all duration-150 ${
                          isSelected
                            ? "bg-primary border-primary text-white font-bold"
                            : isSelectable
                            ? "bg-white border-border text-foreground hover:border-primary/50"
                            : "bg-slate-50 border-slate-100 text-slate-300 cursor-not-allowed"
                        }`}
                      >
                        {dayNum}
                      </button>
                    );
                  })}
                </div>
              </div>
            </Reveal>

            {/* Time Slot Picker */}
            <Reveal delay={0.1}>
              <div className="bg-white border border-border p-6 rounded-none">
                <h3 className="font-display font-extrabold text-xs uppercase mb-4 border-b border-border pb-3">
                  Available Slots for {selectedDate}
                </h3>
                <div className="space-y-3">
                  {timeSlots.map((time) => {
                    const isSelected = selectedTime === time;
                    return (
                      <button
                        key={time}
                        onClick={() => setSelectedTime(time)}
                        className={`w-full py-3 text-xs font-mono border text-center transition-all duration-150 ${
                          isSelected
                            ? "bg-primary border-primary text-white font-bold"
                            : "bg-white border-border text-foreground hover:border-primary/50"
                        }`}
                      >
                        {time}
                      </button>
                    );
                  })}
                </div>
                
                {selectedTime && (
                  <div className="mt-6">
                    <p className="font-mono text-[9px] text-slate-400 uppercase">Selected review:</p>
                    <p className="font-display font-bold text-xs uppercase text-foreground mt-1">
                      {selectedDate} at {selectedTime} (CST)
                    </p>
                    <button
                      onClick={() => alert(`Review scheduled for ${selectedDate} at ${selectedTime}. Confirmation email sent.`)}
                      className="w-full mt-4 button-primary py-2.5 text-[10px] uppercase font-bold"
                    >
                      Confirm Schedule
                    </button>
                  </div>
                )}
              </div>
            </Reveal>
          </div>
        </section>

        {/* 3. Request Proposal Section */}
        <section className="max-w-7xl mx-auto px-6 lg:px-8 border-t border-border pt-20">
          <div className="grid lg:grid-cols-3 gap-lg items-stretch">
            
            {/* Overview dossier text */}
            <div className="card relative h-full flex flex-col justify-between">
              <div>
                <span className="font-mono text-[10px] text-primary font-bold">┌ RFP // SEC-03</span>
                <h3 className="font-display font-extrabold text-xl uppercase text-foreground mt-4 mb-4">
                  Request a Proposal
                </h3>
                <p className="text-xs text-secondary leading-relaxed font-sans">
                  Submit basic project parameters, targeted launch dates, and rough budget limits. Our mechanical engineering leads will compile a FEED scope statement and feedback within 48 business hours.
                </p>
              </div>
              <div className="pt-4 border-t border-border font-mono text-[9px] text-slate-400 uppercase tracking-widest">
                FORM COMPLIANCE / PARTNER PORTAL
              </div>
            </div>

            <div className="lg:col-span-2">
              <Reveal delay={0.08}>
                <form className="space-y-5 bg-white border border-border p-8 relative" onSubmit={handleProposalSubmit}>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="rfp-sector" className="block font-mono text-[10px] font-bold text-secondary uppercase mb-1.5 label-caps">
                        Plant Sector
                      </label>
                      <select
                        id="rfp-sector"
                        className="w-full px-4 py-3 border border-border bg-white text-foreground font-sans focus:outline-none focus:border-primary text-xs rounded-none"
                      >
                        <option>Cement Manufacturing</option>
                        <option>Mining & Minerals</option>
                        <option>Petrochemicals & Gas</option>
                        <option>Bulk Material Handling</option>
                        <option>Other Process Facility</option>
                      </select>
                    </div>
                    <div>
                      <label htmlFor="rfp-budget" className="block font-mono text-[10px] font-bold text-secondary uppercase mb-1.5 label-caps">
                        Estimated Budget
                      </label>
                      <select
                        id="rfp-budget"
                        className="w-full px-4 py-3 border border-border bg-white text-foreground font-sans focus:outline-none focus:border-primary text-xs rounded-none"
                      >
                        <option>Under $50,000</option>
                        <option>$50,000 – $150,000</option>
                        <option>Above $150,000</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label htmlFor="rfp-date" className="block font-mono text-[10px] font-bold text-secondary uppercase mb-1.5 label-caps">
                      Targeted Start Date
                    </label>
                    <input
                      id="rfp-date"
                      type="date"
                      className="w-full px-4 py-3 border border-border bg-white text-foreground font-sans focus:outline-none focus:border-primary text-xs rounded-none"
                    />
                  </div>
                  {/* FEED ROI Calculator Inputs inside RFP form */}
                  <div className="bg-slate-50 border border-slate-200/60 p-5 space-y-4">
                    <div className="font-mono text-[9px] font-bold text-slate-400 uppercase flex justify-between">
                      <span>FEED ROI ESTIMATOR</span>
                      <span className="text-primary font-bold">● ACTIVE</span>
                    </div>
                    
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block font-mono text-[9px] font-bold text-slate-600 uppercase mb-1">
                          Annual Capacity (Tons/yr)
                        </label>
                        <input
                          type="number"
                          value={capacity}
                          onChange={(e) => setCapacity(parseFloat(e.target.value) || 0)}
                          className="w-full px-3 py-2 border border-slate-200 bg-white text-foreground text-xs rounded-none focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block font-mono text-[9px] font-bold text-slate-600 uppercase mb-1">
                          Alternative Fuel Substitution (%)
                        </label>
                        <input
                          type="number"
                          value={afSub}
                          onChange={(e) => setAfSub(parseFloat(e.target.value) || 0)}
                          className="w-full px-3 py-2 border border-slate-200 bg-white text-foreground text-xs rounded-none focus:outline-none"
                        />
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center bg-white border border-slate-200 p-3 font-mono text-[9px] uppercase gap-2">
                      <div className="space-y-1">
                        <div className="text-slate-400">EST. SAVINGS: <span className="font-bold text-emerald-600">${Math.round(fuelSavings).toLocaleString()}/yr</span></div>
                        <div className="text-slate-400">EST. PAYBACK: <span className="font-bold text-slate-700">{estPayback} months</span></div>
                      </div>
                      <button
                        type="button"
                        onClick={autofillRoiMetrics}
                        className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white font-bold transition-colors"
                      >
                        Auto-Fill Scope Details
                      </button>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="rfp-scope" className="block font-mono text-[10px] font-bold text-secondary uppercase mb-1.5 label-caps">
                      Project Scope & Goals
                    </label>
                    <textarea
                      id="rfp-scope"
                      rows={5}
                      required
                      value={rfpScope}
                      onChange={(e) => setRfpScope(e.target.value)}
                      placeholder="Outline mechanical constraints, heat targets, or scan files needed..."
                      className="w-full px-4 py-3 border border-border bg-card text-foreground font-sans focus:outline-none focus:border-primary text-xs"
                    />
                  </div>

                  <div>
                    <label className="block font-mono text-[10px] font-bold text-secondary uppercase mb-1.5 label-caps">
                      Project Files (PDF, CAD - Max 120MB)
                    </label>
                    <div className="border-2 border-dashed border-slate-200 bg-white p-6 text-center relative flex flex-col items-center justify-center">
                      <input
                        id="rfp-file"
                        type="file"
                        multiple
                        className="absolute inset-0 opacity-0 cursor-pointer"
                        onChange={handleFileChange}
                      />
                      
                      <div className="w-8 h-8 border border-border flex items-center justify-center font-mono text-xs font-bold text-primary rounded-none mb-2">
                        ↑
                      </div>
                      <p className="font-display font-bold text-xs uppercase text-foreground">
                        Drag and drop your project folders or files here
                      </p>
                      <p className="text-[10px] text-secondary mt-0.5">
                        or click to browse local storage
                      </p>
                      
                      {uploadedFiles.length > 0 && (
                        <div className="mt-4 w-full bg-slate-50 border border-border p-3 text-left">
                          <p className="font-mono text-[8px] text-slate-400 uppercase border-b border-border pb-1.5 mb-1.5">Selected files:</p>
                          <ul className="space-y-1 text-[10px] text-foreground font-mono">
                            {uploadedFiles.map((file) => (
                              <li key={file.name} className="flex justify-between">
                                <span className="truncate max-w-[180px]">{file.name}</span>
                                <span className="text-slate-400">({(file.size / (1024 * 1024)).toFixed(2)} MB)</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <Magnetic strength={0.05}>
                    <button
                      type="submit"
                      className="button-primary px-8 py-3 text-xs uppercase"
                    >
                      {proposalSent ? "RFP Submitted ✓" : "Submit RFP"}
                    </button>
                  </Magnetic>
                </form>
              </Reveal>
            </div>

          </div>
        </section>

        {/* 5. Office Locations Section */}
        <section className="max-w-7xl mx-auto px-6 lg:px-8 border-t border-border pt-20">
          <Reveal className="mb-10">
            <div className="font-mono text-[10px] font-bold text-primary tracking-widest uppercase mb-4">
              <span className="text-primary font-bold mr-1">┌</span> GEOLOCATION // SEC-05
            </div>
            <h2 className="text-2xl font-display font-extrabold uppercase text-foreground">
              Office Locations
            </h2>
          </Reveal>

          <RevealGroup className="grid md:grid-cols-2 gap-lg" stagger={0.08}>
            <RevealItem>
              <div className="card relative h-full flex flex-col justify-between">
                <div>
                  <div className="font-mono text-[9px] text-primary uppercase font-bold">Houston Headquarters</div>
                  <h3 className="font-display font-extrabold text-base uppercase text-foreground mt-2 mb-3">
                    Houston, TX
                  </h3>
                  <p className="text-xs text-secondary leading-relaxed font-sans mb-6">
                    Located in central Houston, supporting executive project scopes, flowsheet calculations, and simulation meshing.
                  </p>
                  <div className="space-y-2 font-mono text-[10px] text-secondary">
                    <div>COORDINATES: 29.76°N, 95.37°W</div>
                    <div>TELEPHONE: +1 (713) 555-0190</div>
                    <div>EMAIL: houston@macprotec.com</div>
                  </div>
                </div>
                
                {/* Tech coordinates box representation */}
                <div className="relative w-full aspect-[2/1] border border-border bg-slate-50 overflow-hidden mt-6">
                  <div className="absolute inset-0 flex items-center justify-center font-mono text-[9px] text-slate-300">
                    // HOUSTON TELEMETRY MAP
                  </div>
                  <div className="absolute top-2 left-2 w-3 h-3 border-t border-l border-primary" />
                  <div className="absolute bottom-2 right-2 w-3 h-3 border-b border-r border-primary" />
                </div>
              </div>
            </RevealItem>

            <RevealItem>
              <div className="card relative h-full flex flex-col justify-between">
                <div>
                  <div className="font-mono text-[9px] text-primary uppercase font-bold">Regional Operations Support</div>
                  <h3 className="font-display font-extrabold text-base uppercase text-foreground mt-2 mb-3">
                    Denver, CO
                  </h3>
                  <p className="text-xs text-secondary leading-relaxed font-sans mb-6">
                    Managing regional on-site scanner deployment, reverse-engineering coordinate checks, and mill alignment monitoring.
                  </p>
                  <div className="space-y-2 font-mono text-[10px] text-secondary">
                    <div>COORDINATES: 39.73°N, 104.99°W</div>
                    <div>TELEPHONE: +1 (303) 555-0144</div>
                    <div>EMAIL: denver@macprotec.com</div>
                  </div>
                </div>
                
                <div className="relative w-full aspect-[2/1] border border-border bg-slate-50 overflow-hidden mt-6">
                  <div className="absolute inset-0 flex items-center justify-center font-mono text-[9px] text-slate-300">
                    // DENVER TELEMETRY MAP
                  </div>
                  <div className="absolute top-2 left-2 w-3 h-3 border-t border-l border-primary" />
                  <div className="absolute bottom-2 right-2 w-3 h-3 border-b border-r border-primary" />
                </div>
              </div>
            </RevealItem>
          </RevealGroup>
        </section>

        {/* 6. General Enquiry Section */}
        <section className="max-w-7xl mx-auto px-6 lg:px-8 border-t border-border pt-20">
          <div className="grid lg:grid-cols-3 gap-lg items-stretch">
            
            <div className="card relative h-full flex flex-col justify-between bg-white">
              <div>
                <span className="font-mono text-[10px] text-primary font-bold">┌ GENERAL INFO // SEC-06</span>
                <h3 className="font-display font-extrabold text-lg uppercase text-foreground mt-4 mb-4">
                  General Enquiry
                </h3>
                <p className="text-xs text-secondary leading-relaxed font-sans">
                  For vendor registrations, careers, media kit downloads, and billing, please reach out to our general services desk.
                </p>
              </div>
            </div>

            <div className="lg:col-span-2">
              <RevealGroup className="grid sm:grid-cols-2 gap-4 h-full" stagger={0.08}>
                <RevealItem>
                  <div className="card relative bg-white border border-border p-6 h-full flex flex-col justify-between">
                    <div>
                      <h4 className="font-display font-extrabold text-xs uppercase text-foreground mb-3">Careers & Talent</h4>
                      <p className="text-xs text-secondary leading-relaxed font-sans mb-4">
                        Join our engineering teams. Send resume dossiers directly.
                      </p>
                    </div>
                    <a href="mailto:careers@macprotec.com" className="font-mono text-[9px] text-primary font-bold uppercase hover:text-rose-700">
                      careers@macprotec.com →
                    </a>
                  </div>
                </RevealItem>

                <RevealItem>
                  <div className="card relative bg-white border border-border p-6 h-full flex flex-col justify-between">
                    <div>
                      <h4 className="font-display font-extrabold text-xs uppercase text-foreground mb-3">Billing & Admin</h4>
                      <p className="text-xs text-secondary leading-relaxed font-sans mb-4">
                        Accounts payable, invoice verification, and purchase orders.
                      </p>
                    </div>
                    <a href="mailto:admin@macprotec.com" className="font-mono text-[9px] text-primary font-bold uppercase hover:text-rose-700">
                      admin@macprotec.com →
                    </a>
                  </div>
                </RevealItem>
              </RevealGroup>
            </div>

          </div>
        </section>

      </main>

      <Footer />
    </>
  );
}
