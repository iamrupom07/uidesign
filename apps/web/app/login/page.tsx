"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import TechnicalCursor from "@/components/ui/TechnicalCursor";
import { Reveal } from "@/components/ui/Reveal";
import { Magnetic } from "@/components/ui/Magnetic";
import { useLoginMutation } from "@/redux/api/authApi";
import Link from "next/link";
import { Lock, Mail, AlertCircle, CheckCircle2 } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const [login, { isLoading }] = useLoginMutation();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    try {
      const response = await login({
        email,
        password,
        rememberMe,
      }).unwrap();

      if (response.success) {
        router.push("/dashboard");
      }
    } catch (err: any) {
      console.error("[Login Error]", err);
      const message =
        err?.data?.message || err?.message || "Invalid credentials. Please check your login details.";
      setErrorMsg(message);
    }
  };

  return (
    <>
      <TechnicalCursor />

      <main className="bg-background min-h-screen blueprint-mesh flex items-center justify-center py-20 px-6">
        <div className="w-full max-w-md">
          <Reveal>
            <div className="card bg-white relative p-8 border border-border shadow-xl">
              <div className="absolute top-4 right-4 font-mono text-[8px] text-slate-400">
                SECURE AUTH / PORTAL
              </div>

              <div className="font-mono text-[10px] font-bold text-primary tracking-widest uppercase mb-4 flex items-center gap-1.5">
                <span className="text-primary font-bold">┌</span>
                <Lock className="w-3.5 h-3.5 text-primary" />
                <span>AUTHENTICATION SYSTEM</span>
              </div>

              <h1 className="text-2xl font-display font-extrabold uppercase text-foreground mb-2">
                Login Portal
              </h1>
              <p className="text-xs text-secondary mb-6 font-sans">
                Sign in to your MACPROTEC account to access dashboard analytics and plant controls.
              </p>

              {errorMsg && (
                <div className="bg-rose-50 border border-rose-200 text-rose-600 text-xs font-mono p-3 mb-6 flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                  <span>{errorMsg}</span>
                </div>
              )}

              <form className="space-y-5" onSubmit={handleLogin}>
                <div>
                  <label
                    htmlFor="email"
                    className="block font-mono text-[9px] font-bold text-secondary uppercase mb-1.5"
                  >
                    Email Address
                  </label>
                  <div className="relative">
                    <input
                      id="email"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="name@macprotec.com"
                      className="w-full pl-9 pr-4 py-2.5 border border-border bg-white text-xs font-sans rounded-none focus:outline-none focus:border-primary focus:ring-1 focus:ring-ring"
                    />
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-1.5">
                    <label
                      htmlFor="password"
                      className="block font-mono text-[9px] font-bold text-secondary uppercase"
                    >
                      Password
                    </label>
                  </div>
                  <div className="relative">
                    <input
                      id="password"
                      type="password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full pl-9 pr-4 py-2.5 border border-border bg-white text-xs font-sans rounded-none focus:outline-none focus:border-primary focus:ring-1 focus:ring-ring"
                    />
                    <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  </div>
                </div>

                <div className="flex items-center justify-between font-mono text-xs text-secondary">
                  <label className="flex items-center gap-2 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="rounded-none border-border text-primary focus:ring-primary"
                    />
                    <span className="text-[11px]">Remember me</span>
                  </label>
                </div>

                <Magnetic strength={0.03}>
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full button-primary py-3 text-xs uppercase flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    {isLoading ? (
                      <>
                        <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>AUTHENTICATING...</span>
                      </>
                    ) : (
                      <span>SIGN IN TO DASHBOARD</span>
                    )}
                  </button>
                </Magnetic>
              </form>

              <div className="mt-6 pt-4 border-t border-border text-center font-mono text-[10px] text-slate-400 uppercase">
                Protected by HTTP-Only Cookie Session Security
              </div>
            </div>
          </Reveal>
        </div>
      </main>
    </>
  );
}
