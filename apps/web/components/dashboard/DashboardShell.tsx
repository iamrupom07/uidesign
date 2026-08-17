"use client";

import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { useGetMeQuery, useLogoutMutation } from "@/redux/api/authApi";
import TechnicalCursor from "@/components/ui/TechnicalCursor";
import {
  LayoutDashboard,
  Inbox,
  FileText,
  Users,
  Wallet,
  Receipt,
  BookOpen,
  LogOut,
  ChevronRight,
  Menu,
  X,
  ShieldCheck,
  Activity,
  Sparkles,
  User,
  ExternalLink,
  Layers,
} from "lucide-react";

interface DashboardShellProps {
  children: React.ReactNode;
}

export default function DashboardShell({ children }: DashboardShellProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  const { data: userData, isLoading: isAuthLoading, isError } = useGetMeQuery();
  const [logout, { isLoading: isLoggingOut }] = useLogoutMutation();

  useEffect(() => {
    setMounted(true);
  }, []);

  // Redirect if unauthenticated
  useEffect(() => {
    if (!isAuthLoading && (isError || !userData?.data)) {
      router.push("/login");
    }
  }, [isAuthLoading, isError, userData, router]);

  // Close mobile drawer on route change
  useEffect(() => {
    setMobileDrawerOpen(false);
  }, [pathname]);

  const currentUser = userData?.data;
  const isAdmin = currentUser?.role !== "EMPLOYEE";

  const handleLogout = async () => {
    try {
      await logout().unwrap();
    } catch (err) {
      console.error("[Logout Error]", err);
    } finally {
      router.push("/login");
    }
  };

  const navGroups = [
    {
      title: "Command & Intelligence",
      items: [
        {
          label: "Dashboard Overview",
          href: "/dashboard",
          icon: LayoutDashboard,
          active: pathname === "/dashboard",
        },
        {
          label: "Submissions & Inbox",
          href: "/dashboard/submissions",
          icon: Inbox,
          active: pathname.startsWith("/dashboard/submissions"),
        },
        {
          label: "RFP Proposals",
          href: "/dashboard/proposals",
          icon: FileText,
          active: pathname.startsWith("/dashboard/proposals"),
        },
        {
          label: "Leads Management",
          href: "/dashboard/leads",
          icon: Users,
          active: pathname.startsWith("/dashboard/leads"),
        },
      ],
    },
    {
      title: "Operations & Tools",
      items: [
        ...(isAdmin
          ? [
              {
                label: "Finance Ledger",
                href: "/dashboard/finance",
                icon: Wallet,
                active: pathname.startsWith("/dashboard/finance"),
              },
            ]
          : []),
        {
          label: "Invoice & Billing",
          href: "/dashboard/Invoice",
          icon: Receipt,
          active: pathname.startsWith("/dashboard/Invoice"),
        },
        ...(isAdmin
          ? [
              {
                label: "Employee Directory",
                href: "/dashboard/employees",
                icon: ShieldCheck,
                active: pathname.startsWith("/dashboard/employees"),
              },
            ]
          : []),
        {
          label: "Blog Manager",
          href: "/dashboard/blog",
          icon: BookOpen,
          active: pathname.startsWith("/dashboard/blog"),
        },
      ],
    },
    {
      title: "Account & Clearance",
      items: [
        {
          label: "Profile & Security",
          href: "/dashboard/profile",
          icon: User,
          active: pathname.startsWith("/dashboard/profile"),
        },
      ],
    },
  ];

  // Breadcrumb label helper
  const getBreadcrumb = () => {
    if (pathname === "/dashboard") return "Dashboard Overview";
    if (pathname.startsWith("/dashboard/submissions")) return "Submissions & Telemetry";
    if (pathname.startsWith("/dashboard/proposals")) return "RFP Proposals";
    if (pathname.startsWith("/dashboard/leads")) return "Leads Management";
    if (pathname.startsWith("/dashboard/finance")) return "Finance Ledger";
    if (pathname.startsWith("/dashboard/Invoice")) return "Invoice & Billing";
    if (pathname.startsWith("/dashboard/employees")) return "Employee Directory";
    if (pathname.startsWith("/dashboard/blog")) return "Blog Manager";
    if (pathname.startsWith("/dashboard/profile")) return "User Profile & Security";
    return "Dashboard";
  };

  if (!mounted || isAuthLoading) {
    return (
      <div className="min-h-screen bg-slate-50 text-slate-800 flex items-center justify-center font-mono">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
          <span className="text-xs tracking-widest uppercase text-slate-500 font-bold">
            INITIALIZING MACPROTEC CONSOLE...
          </span>
        </div>
      </div>
    );
  }

  return (
    <>
      <TechnicalCursor />

      <div className="min-h-screen bg-slate-50 text-slate-800 antialiased">
        {/* DESKTOP STATIC / FIXED SIDEBAR */}
        <aside className="hidden lg:flex flex-col fixed top-0 bottom-0 left-0 w-64 xl:w-72 bg-slate-950 border-r border-slate-800 h-screen shrink-0 z-40 select-none">
          {/* Brand Header */}
          <div className="p-5 border-b border-slate-800 flex items-center justify-between shrink-0">
            <Link href="/dashboard" className="flex items-center gap-3 group">
              <div className="w-8 h-8 bg-rose-500/10 border border-rose-500/30 rounded flex items-center justify-center text-primary group-hover:scale-105 transition-transform">
                <Layers className="w-4 h-4 text-primary" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-sans font-extrabold text-sm text-white tracking-wide uppercase">
                    MACPROTEC
                  </span>
                  <span className="font-mono text-[9px] font-bold text-rose-400 bg-rose-500/10 px-1 py-0.2 rounded border border-rose-500/20">
                    CONSOLE
                  </span>
                </div>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="font-mono text-[9px] text-slate-400 tracking-wider uppercase">
                    System Online
                  </span>
                </div>
              </div>
            </Link>

            <Link
              href="/"
              target="_blank"
              title="View Public Portal"
              className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-900 border border-transparent hover:border-slate-800 rounded transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Navigation Groups */}
          <div className="flex-1 overflow-y-auto p-4 space-y-6 custom-scrollbar">
            {navGroups.map((group, gIdx) => (
              <div key={gIdx} className="space-y-1.5">
                <div className="font-mono text-[9px] font-bold text-slate-400 uppercase tracking-widest px-3 mb-1.5">
                  {group.title}
                </div>
                <nav className="space-y-1">
                  {group.items.map((item, iIdx) => {
                    const Icon = item.icon;
                    return (
                      <Link
                        key={iIdx}
                        href={item.href}
                        className={`w-full flex items-center justify-between px-3 py-2.5 text-xs font-mono rounded transition-all duration-150 group ${
                          item.active
                            ? "bg-rose-500/15 text-white font-bold border-l-2 border-primary shadow-sm"
                            : "text-slate-400 hover:bg-slate-900/90 hover:text-slate-100"
                        }`}
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <Icon
                            className={`w-4 h-4 shrink-0 transition-colors ${
                              item.active
                                ? "text-primary"
                                : "text-slate-400 group-hover:text-slate-200"
                            }`}
                          />
                          <span className="truncate">{item.label}</span>
                        </div>
                        {item.active && (
                          <ChevronRight className="w-3.5 h-3.5 text-primary shrink-0" />
                        )}
                      </Link>
                    );
                  })}
                </nav>
              </div>
            ))}
          </div>

          {/* User Profile & Quick Logout Footer */}
          <div className="p-4 border-t border-slate-800 bg-slate-950/80 space-y-2.5 shrink-0">
            <Link
              href="/dashboard/profile"
              className="p-2.5 bg-slate-900/90 hover:bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-md flex items-center justify-between group transition-all"
            >
              <div className="flex items-center gap-2.5 min-w-0">
                {currentUser?.image ? (
                  <img
                    src={currentUser.image}
                    alt={currentUser.name}
                    className="w-8 h-8 rounded-full object-cover border border-rose-500/40 shrink-0"
                  />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-rose-500/20 text-rose-400 border border-rose-500/30 font-mono font-bold text-xs flex items-center justify-center shrink-0">
                    {currentUser?.name?.charAt(0) || "U"}
                  </div>
                )}
                <div className="min-w-0">
                  <div className="font-sans font-bold text-xs text-white truncate group-hover:text-primary transition-colors flex items-center gap-1">
                    <span>{currentUser?.name || "MACPROTEC User"}</span>
                    <Sparkles className="w-3 h-3 text-primary shrink-0" />
                  </div>
                  <div className="font-mono text-[9px] text-slate-400 truncate uppercase">
                    {currentUser?.role || "ADMIN"}
                  </div>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-primary transition-colors shrink-0" />
            </Link>

            <button
              onClick={handleLogout}
              disabled={isLoggingOut}
              className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded bg-slate-900 hover:bg-rose-500/10 text-slate-400 hover:text-rose-400 border border-slate-800 hover:border-rose-500/30 transition-all font-mono text-[11px] font-bold uppercase disabled:opacity-50"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>{isLoggingOut ? "SIGNING OUT..." : "LOGOUT"}</span>
            </button>
          </div>
        </aside>

        {/* MOBILE TOP HEADER BAR */}
        <header className="lg:hidden bg-slate-950 border-b border-slate-800 px-4 py-3 sticky top-0 z-40 flex items-center justify-between shrink-0">
          <Link href="/dashboard" className="flex items-center gap-2.5">
            <div className="w-7 h-7 bg-rose-500/10 border border-rose-500/30 rounded flex items-center justify-center text-primary">
              <Layers className="w-4 h-4 text-primary" />
            </div>
            <div>
              <span className="font-sans font-extrabold text-xs tracking-wider uppercase text-white block leading-tight">
                MACPROTEC
              </span>
              <span className="font-mono text-[9px] text-slate-400 block leading-tight">
                CENTRAL CONSOLE
              </span>
            </div>
          </Link>

          <div className="flex items-center gap-2">
            <Link
              href="/dashboard/profile"
              className="p-1.5 rounded bg-slate-900 border border-slate-800 text-slate-300"
            >
              <User className="w-4 h-4" />
            </Link>
            <button
              onClick={() => setMobileDrawerOpen(!mobileDrawerOpen)}
              className="p-2 bg-slate-900 border border-slate-800 text-slate-200 hover:text-white rounded transition-colors"
              aria-label="Toggle navigation menu"
            >
              {mobileDrawerOpen ? (
                <X className="w-5 h-5 text-rose-500" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </header>

        {/* MOBILE SLIDING DRAWER & BACKDROP */}
        {mobileDrawerOpen && (
          <div className="fixed inset-0 z-50 lg:hidden flex">
            {/* Backdrop */}
            <div
              onClick={() => setMobileDrawerOpen(false)}
              className="fixed inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
            />

            {/* Slide-out Drawer Panel */}
            <div className="relative w-4/5 max-w-xs bg-slate-950 border-r border-slate-800 h-full flex flex-col justify-between p-5 z-10 shadow-2xl animate-in slide-in-from-left duration-200">
              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 bg-rose-500/10 border border-rose-500/30 rounded flex items-center justify-center text-primary">
                    <Layers className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <span className="font-sans font-extrabold text-xs tracking-wider uppercase text-white block">
                      MACPROTEC
                    </span>
                    <span className="font-mono text-[9px] text-rose-400 block font-bold">
                      CENTRAL CONSOLE
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => setMobileDrawerOpen(false)}
                  className="p-1 text-slate-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Drawer Links */}
              <div className="flex-1 overflow-y-auto py-4 space-y-6">
                {navGroups.map((group, gIdx) => (
                  <div key={gIdx} className="space-y-1">
                    <div className="font-mono text-[9px] font-bold text-slate-400 uppercase tracking-widest px-3 mb-1">
                      {group.title}
                    </div>
                    <nav className="space-y-1">
                      {group.items.map((item, iIdx) => {
                        const Icon = item.icon;
                        return (
                          <Link
                            key={iIdx}
                            href={item.href}
                            onClick={() => setMobileDrawerOpen(false)}
                            className={`w-full flex items-center justify-between px-3 py-2.5 text-xs font-mono rounded transition-colors ${
                              item.active
                                ? "bg-rose-500/15 text-white font-bold border-l-2 border-primary"
                                : "text-slate-400 hover:bg-slate-900 hover:text-slate-100"
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              <Icon
                                className={`w-4 h-4 ${
                                  item.active ? "text-primary" : "text-slate-400"
                                }`}
                              />
                              <span>{item.label}</span>
                            </div>
                            {item.active && (
                              <ChevronRight className="w-3.5 h-3.5 text-primary shrink-0" />
                            )}
                          </Link>
                        );
                      })}
                    </nav>
                  </div>
                ))}
              </div>

              {/* Drawer User & Logout */}
              <div className="pt-4 border-t border-slate-800 space-y-2">
                <div className="p-2 bg-slate-900 border border-slate-800 rounded flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-full bg-rose-500/20 text-rose-400 font-mono font-bold text-xs flex items-center justify-center shrink-0">
                    {currentUser?.name?.charAt(0) || "U"}
                  </div>
                  <div className="min-w-0">
                    <div className="font-bold text-xs text-white truncate">
                      {currentUser?.name || "MACPROTEC User"}
                    </div>
                    <div className="font-mono text-[9px] text-slate-400 uppercase">
                      {currentUser?.role || "ADMIN"}
                    </div>
                  </div>
                </div>
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded bg-slate-900 hover:bg-rose-500/10 text-slate-400 hover:text-rose-400 border border-slate-800 font-mono text-[11px] font-bold uppercase"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>LOGOUT</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* MAIN WORKSPACE CONTENT AREA (OFFSET BY STATIC SIDEBAR ON DESKTOP) */}
        <div className="lg:pl-64 xl:pl-72 flex flex-col min-w-0 bg-slate-50 text-slate-800 min-h-screen">
          {/* Top Status Bar (Desktop Sticky Header) */}
          <div className="hidden lg:flex items-center justify-between px-8 py-4 border-b border-slate-200 bg-white sticky top-0 z-30 shrink-0 shadow-sm">
            <div className="flex items-center gap-2 text-xs font-mono">
              <Link href="/dashboard" className="text-slate-400 hover:text-slate-700">
                CONSOLE
              </Link>
              <span className="text-slate-300">/</span>
              <span className="text-slate-900 font-bold uppercase tracking-wider">
                {getBreadcrumb()}
              </span>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 px-2.5 py-1 rounded bg-emerald-50 border border-emerald-200 font-mono text-[10px] text-emerald-700 font-bold">
                <Activity className="w-3 h-3 text-emerald-600 animate-pulse" />
                <span>DATABASE ONLINE</span>
              </div>
              <div className="font-mono text-[10px] text-slate-500 uppercase">
                CLEARANCE:{" "}
                <span className="text-primary font-bold">{currentUser?.role || "ADMIN"}</span>
              </div>
            </div>
          </div>

          {/* Child Page Content Container */}
          <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
            {children}
          </main>
        </div>
      </div>
    </>
  );
}
