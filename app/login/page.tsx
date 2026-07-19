"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import TechnicalCursor from "@/components/ui/TechnicalCursor";
import { Reveal } from "@/components/ui/Reveal";
import { Magnetic } from "@/components/ui/Magnetic";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // Simulate authentication
    setTimeout(() => {
      if (email === "admin@macprotec.com" && password === "admin123") {
        // Mock token check
        localStorage.setItem("admin_auth", "true");
        router.push("/dashboard");
      } else {
        setError("Invalid email or password parameters. Use admin@macprotec.com / admin123");
        setLoading(false);
      }
    }, 800);
  };

  return (
    <>
      <TechnicalCursor />

      <main className="bg-background min-h-screen blueprint-mesh flex items-center justify-center py-20 px-6">
        <div className="w-full max-w-md">
          <Reveal>
            <div className="card bg-white relative p-8">
              <div className="absolute top-4 right-4 font-mono text-[8px] text-slate-400">AUTH-01 / PORTAL</div>
              
              <div className="font-mono text-[10px] font-bold text-primary tracking-widest uppercase mb-4">
                <span className="text-primary font-bold mr-1">┌</span> ADMIN CONTROLS
              </div>
              
              <h1 className="text-2xl font-display font-extrabold uppercase text-foreground mb-2">
                Login Portal
              </h1>
              <p className="text-xs text-secondary mb-6 font-sans">
                Access submissions logs, RFP proposal files, and site calendars.
              </p>

              {error && (
                <div className="bg-rose-50 border border-rose-200 text-rose-600 text-xs font-mono p-3 mb-4">
                  {error}
                </div>
              )}

              <form className="space-y-5" onSubmit={handleLogin}>
                <div>
                  <label htmlFor="email" className="block font-mono text-[9px] font-bold text-secondary uppercase mb-1.5 label-caps">
                    Admin Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="e.g. admin@macprotec.com"
                    className="w-full px-4 py-2.5 border border-border bg-white text-xs font-sans rounded-none focus:outline-none focus:border-primary focus:ring-1 focus:ring-ring"
                  />
                </div>
                
                <div>
                  <div className="flex justify-between items-center mb-1.5">
                    <label htmlFor="password" className="block font-mono text-[9px] font-bold text-secondary uppercase label-caps">
                      Password
                    </label>
                  </div>
                  <input
                    id="password"
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter password"
                    className="w-full px-4 py-2.5 border border-border bg-white text-xs font-sans rounded-none focus:outline-none focus:border-primary focus:ring-1 focus:ring-ring"
                  />
                </div>

                <div className="bg-slate-50 border border-border p-3 text-[10px] text-slate-500 font-mono space-y-1">
                  <div>HINT CREDENTIALS:</div>
                  <div>EMAIL: <span className="font-bold text-foreground">admin@macprotec.com</span></div>
                  <div>PASS: <span className="font-bold text-foreground">admin123</span></div>
                </div>

                <Magnetic strength={0.03}>
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full button-primary py-3 text-xs uppercase"
                  >
                    {loading ? "Authenticating..." : "Sign In"}
                  </button>
                </Magnetic>
              </form>

            </div>
          </Reveal>
        </div>
      </main>
    </>
  );
}
