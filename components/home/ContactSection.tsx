"use client";

import { useState } from "react";
import { companyInfo } from "@/lib/constants";
import { Reveal } from "@/components/ui/Reveal";
import { Magnetic } from "@/components/ui/Magnetic";
import Link from "next/link";

export default function ContactSection() {
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    const form = new FormData(e.currentTarget);
    try {
      await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Object.fromEntries(form)),
      });
      setSent(true);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section id="lets-connect" className="py-xl bg-background blueprint-mesh border-t border-border">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 grid lg:grid-cols-2 gap-lg lg:gap-xl items-stretch">
        
        {/* Left Column: Contact Form */}
        <Reveal>
          <div className="font-mono text-[11px] font-bold text-primary tracking-widest uppercase mb-4">
            <span className="text-primary font-bold mr-1">┌</span> CONTACT FORM
          </div>
          <h2 className="mb-8 font-display font-extrabold text-3xl text-foreground uppercase">
            Get in touch
          </h2>
          <form className="space-y-5" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="name" className="block font-mono text-[10px] font-bold text-secondary tracking-widest uppercase mb-1.5 label-caps">
                Full Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                placeholder="Enter your full name"
                className="w-full px-5 py-3 rounded-none border border-border bg-card text-foreground font-sans focus:outline-none focus:border-primary focus:ring-1 focus:ring-ring transition-all duration-150 text-xs"
              />
            </div>
            <div>
              <label htmlFor="email" className="block font-mono text-[10px] font-bold text-secondary tracking-widest uppercase mb-1.5 label-caps">
                Email Address*
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                placeholder="Enter your email address"
                className="w-full px-5 py-3 rounded-none border border-border bg-card text-foreground font-sans focus:outline-none focus:border-primary focus:ring-1 focus:ring-ring transition-all duration-150 text-xs"
              />
            </div>
            <div>
              <label htmlFor="message" className="block font-mono text-[10px] font-bold text-secondary tracking-widest uppercase mb-1.5 label-caps">
                Message*
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={4}
                placeholder="Type your message here"
                className="w-full px-5 py-4 rounded-none border border-border bg-card text-foreground font-sans focus:outline-none focus:border-primary focus:ring-1 focus:ring-ring transition-all duration-150 text-xs"
              />
            </div>
            <div className="flex flex-wrap gap-4 items-center pt-2">
              <Magnetic strength={0.05}>
                <button
                  type="submit"
                  disabled={submitting}
                  className="button-primary px-8 py-3.5 disabled:opacity-60 text-xs uppercase"
                >
                  {submitting ? "Sending…" : sent ? "Sent ✓" : "Submit Message"}
                </button>
              </Magnetic>

              <Link
                href="/lets-connect?tab=proposal"
                className="button-outline px-8 py-3.5 text-xs uppercase text-center"
              >
                Request Proposal
              </Link>
            </div>
          </form>
        </Reveal>

        {/* Right Column: Contact Details, Language Selector & WhatsApp */}
        <Reveal delay={0.15} className="h-full">
          <div className="relative rounded-none h-full min-h-[26rem] flex flex-col justify-between p-lg text-foreground bg-white border border-border overflow-hidden">
            <div className="grain" />
            
            {/* Technical 3D scanning visualization image */}
            <div className="relative w-full aspect-[16/9] border border-border bg-slate-50 overflow-hidden mb-6">
              <img
                src="/images/contact_plant.png"
                alt="Plant laser scan point cloud"
                className="w-full h-full object-cover grayscale opacity-95"
              />
              <div className="absolute inset-0 bg-primary/5 pointer-events-none" />
            </div>

            <div className="space-y-6">
              <div>
                <p className="font-mono text-[11px] uppercase tracking-widest text-primary mb-2 relative font-bold label-caps">
                  <span className="text-primary font-bold mr-1">┌</span> OFFICE LOCATION
                </p>
                <p className="font-sans text-xs text-secondary relative leading-relaxed mb-4">
                  1000 Louisiana St, Suite 4300<br />
                  Houston, TX 77002, United States
                </p>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <p className="font-mono text-[9px] uppercase tracking-wider text-slate-400">EMAIL SUPPORT</p>
                  <p className="font-mono text-xs text-slate-900 font-bold mt-1">{companyInfo.email}</p>
                </div>
                <div>
                  <p className="font-mono text-[9px] uppercase tracking-wider text-slate-400">PHONE DIRECT</p>
                  <p className="font-mono text-xs text-slate-900 font-bold mt-1">{companyInfo.phone}</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-sm items-center border-t border-border pt-6">
                <a
                  href="https://linkedin.com/company/macprotec"
                  target="_blank"
                  rel="noreferrer"
                  className="font-mono text-[10px] text-primary font-bold uppercase hover:text-rose-700 tracking-wider flex items-center gap-1.5"
                >
                  <span>🔗</span> LinkedIn Profile
                </a>
                <a
                  href="https://wa.me/17135550199"
                  target="_blank"
                  rel="noreferrer"
                  className="font-mono text-[10px] text-emerald-600 font-bold uppercase hover:text-emerald-700 tracking-wider flex items-center gap-1.5"
                >
                  <span>💬</span> WhatsApp Direct
                </a>
                <Link
                  href="/lets-connect?tab=consultation"
                  className="font-mono text-[10px] text-slate-600 font-bold uppercase hover:text-slate-800 tracking-wider flex items-center gap-1.5 ml-auto"
                >
                  <span>📅</span> Book Technical Consultation
                </Link>
              </div>

            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
