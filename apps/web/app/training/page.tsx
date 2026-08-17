"use client";

import { useState } from "react";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import TechnicalCursor from "@/components/ui/TechnicalCursor";
import { Reveal } from "@/components/ui/Reveal";
import { Flame, Bell, CheckCircle2, ArrowLeft, Sparkles } from "lucide-react";
import { useCreateSubmissionMutation } from "@/redux/api/submissionApi";

export default function TrainingPage() {
  const [email, setEmail] = useState("");
  const [notified, setNotified] = useState(false);
  const [createSubmission, { isLoading: submitting }] = useCreateSubmissionMutation();

  const handleNotify = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    try {
      await createSubmission({
        type: "TRAINING",
        name: "Training Waitlist Subscriber",
        email,
        subject: "CementX LMS Priority Waitlist",
        message: "User joined priority waitlist for CementX Technical Training & LMS Platform.",
      }).unwrap();
      setNotified(true);
    } catch (err) {
      console.error("Training subscription error:", err);
    }
  };

  return (
    <>
      <TechnicalCursor />
      <Header />

      <main className="bg-slate-950 min-h-[calc(100vh-140px)] text-white font-sans flex flex-col justify-center relative overflow-hidden blueprint-mesh">
        {/* Background Radial Heat Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-rose-600/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/4 right-1/4 w-72 h-72 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* SINGLE CENTERED SECTION */}
        <section className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 py-16 lg:py-24 text-center space-y-8 my-auto">
          
          {/* PRESSURE COOKER HIGH-TECH VISUAL */}
          <Reveal>
            <div className="relative w-48 h-48 sm:w-56 sm:h-56 mx-auto flex items-center justify-center">
              {/* Flame Ember Glow Underneath */}
              <div className="absolute -bottom-4 w-32 h-8 bg-rose-500/40 rounded-full blur-md animate-pulse" />
              <div className="absolute -bottom-6 w-24 h-6 bg-amber-400/50 rounded-full blur-sm" />

              {/* Steam Particle Effects Rising */}
              <div className="absolute -top-10 left-1/2 -translate-x-1/2 flex items-center gap-2 pointer-events-none">
                <div className="w-2 h-8 bg-slate-300/40 rounded-full blur-xs animate-bounce delay-75" />
                <div className="w-3 h-12 bg-slate-200/50 rounded-full blur-xs animate-pulse" />
                <div className="w-2 h-7 bg-slate-300/40 rounded-full blur-xs animate-bounce delay-150" />
              </div>

              {/* INDUSTRIAL PRESSURE COOKER SVG */}
              <svg
                viewBox="0 0 200 200"
                className="w-full h-full drop-shadow-[0_10px_25px_rgba(225,29,72,0.4)]"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Pot Handles */}
                <rect x="15" y="95" width="20" height="12" rx="3" fill="#334155" stroke="#475569" strokeWidth="2" />
                <rect x="165" y="95" width="20" height="12" rx="3" fill="#334155" stroke="#475569" strokeWidth="2" />

                {/* Main Stainless Cooker Body */}
                <rect x="35" y="70" width="130" height="90" rx="16" fill="url(#bodyGradient)" stroke="#64748b" strokeWidth="3" />

                {/* Cooker Lid */}
                <path
                  d="M 32 70 C 32 45, 168 45, 168 70 Z"
                  fill="url(#lidGradient)"
                  stroke="#94a3b8"
                  strokeWidth="3"
                />

                {/* Lid Lock Rim */}
                <rect x="30" y="66" width="140" height="8" rx="2" fill="#1e293b" stroke="#e2e8f0" strokeWidth="1.5" />

                {/* Pressure Release Steam Whistle / Valve */}
                <rect x="94" y="25" width="12" height="20" rx="2" fill="#e11d48" stroke="#ffffff" strokeWidth="1.5" />
                <circle cx="100" cy="22" r="6" fill="#fbbf24" stroke="#ffffff" strokeWidth="1.5" className="animate-ping" />
                <circle cx="100" cy="22" r="5" fill="#e11d48" />

                {/* Cooker Handle Top */}
                <path d="M 85 45 C 85 32, 115 32, 115 45" fill="none" stroke="#0f172a" strokeWidth="7" strokeLinecap="round" />

                {/* Pressure Gauge Dial (Front Center) */}
                <circle cx="100" cy="115" r="24" fill="#0f172a" stroke="#e11d48" strokeWidth="2.5" />
                <circle cx="100" cy="115" r="20" fill="#1e293b" />
                
                {/* Gauge Tick Marks */}
                <line x1="88" y1="115" x2="92" y2="115" stroke="#94a3b8" strokeWidth="1.5" />
                <line x1="108" y1="115" x2="112" y2="115" stroke="#94a3b8" strokeWidth="1.5" />
                <line x1="100" y1="103" x2="100" y2="107" stroke="#e11d48" strokeWidth="2" />

                {/* Animated Pressure Needle */}
                <line
                  x1="100"
                  y1="115"
                  x2="114"
                  y2="104"
                  stroke="#f43f5e"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  className="origin-[100px_115px] animate-pulse"
                />
                <circle cx="100" cy="115" r="3" fill="#ffffff" />

                {/* Digital "COOKING" Label */}
                <rect x="75" y="146" width="50" height="10" rx="2" fill="#0f172a" stroke="#334155" />
                <text x="100" y="153" textAnchor="middle" fill="#e11d48" fontSize="6.5" fontFamily="monospace" fontWeight="bold">
                  COOKING
                </text>

                {/* Gradients */}
                <defs>
                  <linearGradient id="bodyGradient" x1="35" y1="70" x2="165" y2="160" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#475569" />
                    <stop offset="0.5" stopColor="#1e293b" />
                    <stop offset="1" stopColor="#0f172a" />
                  </linearGradient>
                  <linearGradient id="lidGradient" x1="32" y1="45" x2="168" y2="70" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#64748b" />
                    <stop offset="0.7" stopColor="#334155" />
                    <stop offset="1" stopColor="#1e293b" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
          </Reveal>

          {/* STATUS BADGE */}
          <Reveal>
            <div className="inline-flex items-center gap-2 bg-rose-500/15 border border-rose-500/40 px-4 py-1.5 font-mono text-[11px] font-extrabold text-primary tracking-widest uppercase rounded-full">
              <Flame className="w-4 h-4 text-primary animate-pulse" />
              <span>HIGH PRESSURE IN PROGRESS // CEMENTX LMS</span>
            </div>
          </Reveal>

          {/* MAIN HEADLINE */}
          <Reveal>
            <h1 className="text-4xl sm:text-6xl font-display font-black uppercase tracking-tight text-white leading-tight">
              Something is <span className="text-primary">Cooking...</span>
              <br />
              <span className="text-slate-200">Coming Soon</span>
            </h1>
          </Reveal>

          {/* SUBTITLE */}
          <Reveal>
            <p className="text-slate-300 font-sans text-base sm:text-lg leading-relaxed max-w-xl mx-auto">
              Our CementX training platform is currently building up pressure. Stay tuned as we prepare to launch our interactive technical LMS.
            </p>
          </Reveal>

          {/* EMAIL NOTIFICATION FORM */}
          <Reveal>
            <div className="max-w-md mx-auto pt-2">
              {notified ? (
                <div className="bg-emerald-950/80 border border-emerald-500/50 p-4 font-mono text-xs text-emerald-300 flex items-center justify-center gap-2.5 shadow-xl">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                  <span>You&apos;re on the priority notification list! We will notify you at launch.</span>
                </div>
              ) : (
                <form onSubmit={handleNotify} className="flex flex-col sm:flex-row gap-2">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter corporate email..."
                    className="bg-slate-900 border border-slate-700 text-white placeholder:text-slate-500 font-mono text-xs px-4 py-3.5 focus:outline-none focus:border-primary flex-1"
                  />
                  <button
                    type="submit"
                    disabled={submitting}
                    className="px-6 py-3.5 bg-primary hover:bg-rose-700 text-white font-mono text-xs font-bold uppercase tracking-wider transition-all shadow-xl flex items-center justify-center gap-2 shrink-0"
                  >
                    {submitting ? (
                      <span>Saving...</span>
                    ) : (
                      <>
                        <span>Get Notified</span>
                        <Bell className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </Reveal>

          {/* BACK TO HOMEPAGE ACTION */}
          <Reveal>
            <div className="pt-4">
              <Link
                href="/"
                className="inline-flex items-center gap-2 font-mono text-xs font-bold text-slate-400 hover:text-white transition-colors uppercase tracking-wider"
              >
                <ArrowLeft className="w-4 h-4 text-primary" />
                <span>Return to Homepage</span>
              </Link>
            </div>
          </Reveal>

        </section>
      </main>

      <Footer />
    </>
  );
}
