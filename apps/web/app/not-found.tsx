"use client";

import Link from "next/link";
import TechnicalCursor from "@/components/ui/TechnicalCursor";
import { MoveLeft, LayoutDashboard, Home, AlertOctagon, Terminal } from "lucide-react";

export default function NotFound() {
  return (
    <>
      <TechnicalCursor />

      <main className="bg-slate-950 min-h-screen text-slate-100 flex items-center justify-center p-6 relative overflow-hidden font-mono">
        {/* Background Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-30 pointer-events-none" />

        {/* Floating Glowing Glows */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-xl w-full text-center space-y-8">
          {/* Header Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs font-bold uppercase tracking-widest">
            <AlertOctagon className="w-4 h-4 animate-pulse" />
            <span>ERROR 404 — ROUTE UNRESOLVED</span>
          </div>

          {/* 404 Number Graphic */}
          <div className="space-y-2">
            <h1 className="font-display font-black text-7xl sm:text-9xl tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white via-slate-200 to-slate-600 drop-shadow-2xl">
              404
            </h1>
            <p className="font-sans font-extrabold text-lg sm:text-xl text-slate-300 uppercase tracking-wider">
              System Disconnected or Route Non-Existent
            </p>
          </div>

          {/* Terminal Diagnostics Box */}
          <div className="bg-slate-900/90 border border-slate-800 p-4 rounded text-left space-y-2 shadow-2xl backdrop-blur-md">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2 text-[10px] text-slate-400">
              <span className="flex items-center gap-1.5 text-rose-400 font-bold">
                <Terminal className="w-3.5 h-3.5" />
                MACPROTEC_DIAGNOSTICS.LOG
              </span>
              <span>HTTP 404</span>
            </div>
            <div className="text-[11px] text-slate-400 space-y-1 font-mono">
              <p className="text-slate-300">$ resolve_route --path current_location</p>
              <p className="text-rose-400">[ERROR]: Specified URL path was not found in static or dynamic router manifest.</p>
              <p className="text-slate-400">[STATUS]: Redirecting user to core system node...</p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link
              href="/"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 font-bold text-xs uppercase tracking-wider transition-all"
            >
              <Home className="w-4 h-4 text-slate-400" />
              <span>Return Home</span>
            </Link>

            <Link
              href="/dashboard"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary hover:bg-rose-700 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-lg shadow-rose-900/30"
            >
              <LayoutDashboard className="w-4 h-4" />
              <span>Go to Dashboard</span>
            </Link>
          </div>

          <div className="text-[10px] text-slate-500 pt-6 border-t border-slate-900">
            MacProtec Engineering Ltd • Industrial Plant Solutions & Central DB
          </div>
        </div>
      </main>
    </>
  );
}
