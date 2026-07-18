"use client";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import TechnicalCursor from "@/components/ui/TechnicalCursor";
import ContactSection from "@/components/home/ContactSection";
import { Reveal } from "@/components/ui/Reveal";

export default function ContactPage() {
  return (
    <>
      <TechnicalCursor />
      <Header />
      
      <main className="bg-background min-h-screen py-16">
        <section className="max-w-7xl mx-auto px-6 lg:px-8 mb-4 relative">
          <Reveal>
            <div className="font-mono text-[11px] font-bold text-primary tracking-widest uppercase mb-4">
              <span className="text-primary font-bold mr-1">┌</span> DIRECT CONNECT
            </div>
            <h1 className="text-4xl sm:text-5xl font-display font-extrabold text-foreground uppercase tracking-tight leading-none">
              Let&apos;s <span className="text-primary">Connect</span>
            </h1>
          </Reveal>
        </section>

        <ContactSection />
      </main>

      <Footer />
    </>
  );
}
