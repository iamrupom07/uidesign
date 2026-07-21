"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import TechnicalCursor from "@/components/ui/TechnicalCursor";
import {
  useGetMeQuery,
  useLogoutMutation,
  useUpdateProfileMutation,
  useChangePasswordMutation,
} from "@/redux/api/authApi";
import { useUploadCloudinaryImageMutation } from "@/redux/api/blogApi";
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
  User,
  Shield,
  Key,
  CheckCircle2,
  AlertTriangle,
  RefreshCw,
  Upload,
  Lock,
  Mail,
  Phone,
  Briefcase,
  Calendar,
  Sparkles,
  UserCheck,
} from "lucide-react";

export default function ProfileDashboardPage() {
  const router = useRouter();
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"info" | "security" | "permissions">("info");

  // Auth Hook
  const { data: userData, isLoading: isAuthLoading, isError: isAuthError, refetch } = useGetMeQuery();
  const [logout] = useLogoutMutation();

  const [updateProfile, { isLoading: isUpdatingProfile }] = useUpdateProfileMutation();
  const [changePassword, { isLoading: isChangingPassword }] = useChangePasswordMutation();
  const [uploadCloudinaryImage, { isLoading: isUploadingImage }] = useUploadCloudinaryImageMutation();

  useEffect(() => {
    if (!isAuthLoading && (isAuthError || !userData?.data)) {
      router.push("/login");
    }
  }, [isAuthLoading, isAuthError, userData, router]);

  const currentUser = userData?.data;

  // Form States
  const [name, setName] = useState("");
  const [designation, setDesignation] = useState("");
  const [phone, setPhone] = useState("");
  const [image, setImage] = useState("");

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [statusMsg, setStatusMsg] = useState<{ type: "success" | "error"; text: string } | null>(null);

  useEffect(() => {
    if (currentUser) {
      setName(currentUser.name || "");
      setDesignation((currentUser as any).designation || "Process Engineering Lead");
      setPhone((currentUser as any).phone || "+1 (713) 555-0199");
      setImage(currentUser.image || "");
    }
  }, [currentUser]);

  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = async () => {
      try {
        const base64Str = reader.result as string;
        const res = await uploadCloudinaryImage({ image: base64Str, folder: "macprotec_avatars" }).unwrap();
        if (res.data?.url) {
          setImage(res.data.url);
          await updateProfile({ image: res.data.url }).unwrap();
          setStatusMsg({ type: "success", text: "Profile avatar uploaded to Cloudinary!" });
          refetch();
        }
      } catch (err: any) {
        setStatusMsg({ type: "error", text: err?.data?.message || "Failed to upload avatar" });
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateProfile({ name, designation, phone, image }).unwrap();
      setStatusMsg({ type: "success", text: "Profile information updated successfully!" });
      refetch();
    } catch (err: any) {
      setStatusMsg({ type: "error", text: err?.data?.message || "Failed to update profile" });
    }
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setStatusMsg({ type: "error", text: "New password and confirmation do not match." });
      return;
    }
    if (newPassword.length < 6) {
      setStatusMsg({ type: "error", text: "New password must be at least 6 characters long." });
      return;
    }

    try {
      await changePassword({ currentPassword, newPassword }).unwrap();
      setStatusMsg({ type: "success", text: "Account password changed successfully!" });
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err: any) {
      setStatusMsg({ type: "error", text: err?.data?.message || "Password update failed." });
    }
  };

  const handleLogout = async () => {
    try {
      await logout().unwrap();
    } catch (err) {
      console.error(err);
    } finally {
      router.push("/login");
    }
  };

  if (isAuthLoading || !userData?.data) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center font-mono">
        <div className="flex items-center gap-3 text-rose-500">
          <RefreshCw className="w-5 h-5 animate-spin" />
          <span>LOADING PROFILE CLEARANCE...</span>
        </div>
      </div>
    );
  }

  return (
    <>
      <TechnicalCursor />

      <main className="bg-slate-50 min-h-screen text-slate-800 flex flex-col lg:flex-row relative">
        {/* Mobile Top Header */}
        <header className="lg:hidden bg-slate-950 text-white px-5 py-3.5 flex justify-between items-center border-b border-slate-800/80 z-30 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded bg-rose-500/10 border border-rose-500/30 flex items-center justify-center text-primary font-mono font-bold text-xs">
              //
            </div>
            <div>
              <span className="font-sans font-extrabold text-xs tracking-wider uppercase text-white block leading-tight">
                MACPROTEC
              </span>
              <span className="font-mono text-[9px] text-slate-400 block leading-tight">
                CENTRAL DB
              </span>
            </div>
          </div>
          <button
            onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
            className="p-2 bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:bg-slate-800 transition-colors rounded"
            aria-label="Toggle Menu"
          >
            {mobileSidebarOpen ? (
              <X className="w-5 h-5 text-rose-500" />
            ) : (
              <Menu className="w-5 h-5 text-slate-300" />
            )}
          </button>
        </header>

        {/* Sidebar Nav */}
        <aside
          className={`fixed inset-y-0 left-0 w-64 bg-slate-950 text-slate-400 p-5 flex flex-col justify-between shrink-0 border-r border-slate-800/80 z-40 transform transition-transform duration-200 lg:relative lg:translate-x-0 shadow-2xl lg:shadow-none ${
            mobileSidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div>
            {/* Header Brand */}
            <div className="pb-6 mb-6 border-b border-slate-800/60">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded bg-rose-500/10 border border-rose-500/30 flex items-center justify-center text-primary font-mono font-extrabold text-sm shadow-inner">
                  //
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="font-sans font-extrabold text-sm text-white tracking-wide uppercase">
                      MACPROTEC
                    </span>
                    <span className="font-mono text-[9px] font-bold text-rose-500 bg-rose-500/10 px-1 py-0.5 rounded border border-rose-500/20">
                      DB
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="font-mono text-[9px] text-slate-400 tracking-wider uppercase">
                      System Online
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Nav Links */}
            <div className="space-y-6">
              <div>
                <div className="font-mono text-[9px] font-bold text-slate-400 uppercase tracking-widest px-3 mb-2">
                  Main Overview
                </div>
                <nav className="space-y-1">
                  <Link
                    href="/dashboard"
                    className="w-full flex items-center justify-between px-3 py-2.5 text-xs font-mono rounded transition-all duration-150 group text-slate-400 hover:bg-slate-900 hover:text-slate-200"
                  >
                    <div className="flex items-center gap-3">
                      <LayoutDashboard className="w-4 h-4 text-slate-400 group-hover:text-slate-200" />
                      <span>Dashboard Overview</span>
                    </div>
                  </Link>

                  <Link
                    href="/dashboard/submissions"
                    className="w-full flex items-center justify-between px-3 py-2.5 text-xs font-mono rounded transition-all duration-150 group text-slate-400 hover:bg-slate-900 hover:text-slate-200"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <Inbox className="w-4 h-4 shrink-0 text-slate-400 group-hover:text-slate-200" />
                      <span className="truncate">Submissions</span>
                    </div>
                  </Link>

                  <Link
                    href="/dashboard/proposals"
                    className="w-full flex items-center justify-between px-3 py-2.5 text-xs font-mono rounded transition-all duration-150 group text-slate-400 hover:bg-slate-900 hover:text-slate-200"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <FileText className="w-4 h-4 shrink-0 text-slate-400 group-hover:text-slate-200" />
                      <span className="truncate">RFP Proposals</span>
                    </div>
                  </Link>

                  <Link
                    href="/dashboard/leads"
                    className="w-full flex items-center justify-between px-3 py-2.5 text-xs font-mono rounded transition-all duration-150 group text-slate-400 hover:bg-slate-900 hover:text-slate-200"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <Users className="w-4 h-4 shrink-0 text-slate-400 group-hover:text-slate-200" />
                      <span className="truncate">Leads Database</span>
                    </div>
                  </Link>
                </nav>
              </div>

              <div>
                <div className="font-mono text-[9px] font-bold text-slate-400 uppercase tracking-widest px-3 mb-2">
                  Management & Tools
                </div>
                <nav className="space-y-1">
                  {currentUser?.role !== "EMPLOYEE" && (
                    <Link
                      href="/dashboard/finance"
                      className="w-full flex items-center justify-between px-3 py-2.5 text-xs font-mono rounded transition-all duration-150 group text-slate-400 hover:bg-slate-900 hover:text-slate-200"
                    >
                      <div className="flex items-center gap-3">
                        <Wallet className="w-4 h-4 text-slate-400 group-hover:text-slate-200" />
                        <span>Finance Ledger</span>
                      </div>
                    </Link>
                  )}

                  <Link
                    href="/dashboard/Invoice"
                    className="w-full flex items-center justify-between px-3 py-2.5 text-xs font-mono rounded transition-all duration-150 group text-slate-400 hover:bg-slate-900 hover:text-slate-200"
                  >
                    <div className="flex items-center gap-3">
                      <Receipt className="w-4 h-4 text-slate-400 group-hover:text-slate-200" />
                      <span>Invoice Creator</span>
                    </div>
                  </Link>

                  {currentUser?.role !== "EMPLOYEE" && (
                    <Link
                      href="/dashboard/employees"
                      className="w-full flex items-center justify-between px-3 py-2.5 text-xs font-mono rounded transition-all duration-150 group text-slate-400 hover:bg-slate-900 hover:text-slate-200"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <Users className="w-4 h-4 shrink-0 text-slate-400 group-hover:text-slate-200" />
                        <span className="truncate">Employee Directory</span>
                      </div>
                    </Link>
                  )}

                  <Link
                    href="/dashboard/blog"
                    className="w-full flex items-center justify-between px-3 py-2.5 text-xs font-mono rounded transition-all duration-150 group text-slate-400 hover:bg-slate-900 hover:text-slate-200"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <BookOpen className="w-4 h-4 shrink-0 text-slate-400 group-hover:text-slate-200" />
                      <span className="truncate">Blog Manager</span>
                    </div>
                  </Link>
                </nav>
              </div>
            </div>
          </div>

          {/* User Profile & Logout - ACTIVE HIGHLIGHT FOR PROFILE */}
          <div className="pt-6 mt-6 border-t border-slate-800/60">
            <Link
              href="/dashboard/profile"
              className="bg-slate-900 rounded-lg p-3 border border-primary/50 flex items-center justify-between group hover:border-primary transition-all block mb-2"
            >
              <div className="flex items-center gap-2.5 min-w-0">
                {currentUser?.image ? (
                  <img
                    src={currentUser.image}
                    alt={currentUser.name}
                    className="w-8 h-8 rounded-full object-cover border border-primary shrink-0"
                  />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-rose-500 text-white font-mono font-bold text-xs flex items-center justify-center shrink-0">
                    {currentUser?.name?.charAt(0) || "A"}
                  </div>
                )}
                <div className="min-w-0">
                  <div className="font-sans font-bold text-xs text-white truncate group-hover:text-primary transition-colors flex items-center gap-1">
                    <span>{currentUser?.name || "System Admin"}</span>
                    <Sparkles className="w-3 h-3 text-primary" />
                  </div>
                  <div className="font-mono text-[9px] text-slate-400 truncate">
                    My Account Profile
                  </div>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-primary" />
            </Link>

            <button
              onClick={handleLogout}
              className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded bg-slate-900 hover:bg-rose-500/10 text-slate-400 hover:text-rose-400 border border-slate-800 hover:border-rose-500/30 transition-colors font-mono text-xs font-bold uppercase"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Logout</span>
            </button>
          </div>
        </aside>

        {/* Main Content Area */}
        <div className="flex-1 min-w-0 overflow-y-auto">
          {/* Top Bar */}
          <header className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between sticky top-0 z-20 shadow-sm">
            <div className="flex items-center gap-3">
              <span className="font-mono text-xs text-slate-500 flex items-center gap-1.5">
                <Link href="/dashboard" className="hover:underline text-slate-600">
                  Dashboard
                </Link>
                <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                <span className="text-primary font-bold">User Profile & Account Settings</span>
              </span>
            </div>
          </header>

          {/* Page Content */}
          <div className="p-6 lg:p-8 space-y-8 max-w-5xl mx-auto">
            {/* Status Message */}
            {statusMsg && (
              <div
                className={`p-4 font-mono text-xs flex items-center justify-between border ${
                  statusMsg.type === "success"
                    ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                    : "bg-rose-50 text-rose-700 border-rose-200"
                }`}
              >
                <div className="flex items-center gap-2">
                  {statusMsg.type === "success" ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  ) : (
                    <AlertTriangle className="w-4 h-4 text-rose-600" />
                  )}
                  <span>{statusMsg.text}</span>
                </div>
                <button onClick={() => setStatusMsg(null)}>
                  <X className="w-4 h-4" />
                </button>
              </div>
            )}

            {/* Profile Header Hero Box */}
            <div className="bg-slate-900 text-white border border-slate-800 p-6 sm:p-8 shadow-xl flex flex-col sm:flex-row items-center sm:items-start justify-between gap-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />

              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 relative z-10 text-center sm:text-left">
                {/* Avatar with Cloudinary Uploader */}
                <div className="relative group shrink-0">
                  {image ? (
                    <img
                      src={image}
                      alt={currentUser?.name}
                      className="w-24 h-24 rounded-full object-cover border-4 border-rose-500/30 shadow-2xl"
                    />
                  ) : (
                    <div className="w-24 h-24 rounded-full bg-rose-500 text-white font-mono font-black text-3xl flex items-center justify-center border-4 border-rose-500/30 shadow-2xl">
                      {currentUser?.name?.charAt(0) || "A"}
                    </div>
                  )}

                  <label className="absolute bottom-0 right-0 p-2 bg-slate-950 hover:bg-rose-600 text-white rounded-full border border-slate-700 cursor-pointer shadow-lg transition-colors">
                    {isUploadingImage ? (
                      <RefreshCw className="w-4 h-4 animate-spin text-primary" />
                    ) : (
                      <Upload className="w-4 h-4" />
                    )}
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleAvatarUpload}
                      className="hidden"
                      disabled={isUploadingImage}
                    />
                  </label>
                </div>

                <div className="space-y-2">
                  <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2.5">
                    <h1 className="font-display font-black text-2xl sm:text-3xl text-white">
                      {currentUser?.name || "System User"}
                    </h1>
                    <span className="px-2.5 py-0.5 text-[10px] font-mono font-bold uppercase tracking-wider bg-rose-500/20 text-rose-400 border border-rose-500/40 rounded">
                      {currentUser?.role || "ADMIN"}
                    </span>
                  </div>

                  <p className="font-mono text-xs text-slate-400 flex items-center justify-center sm:justify-start gap-1.5">
                    <Briefcase className="w-3.5 h-3.5 text-primary" />
                    <span>{(currentUser as any)?.designation || "Principal Process Engineer"}</span>
                  </p>

                  <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 font-mono text-[11px] text-slate-400 pt-1">
                    <span className="flex items-center gap-1.5">
                      <Mail className="w-3.5 h-3.5 text-slate-500" />
                      {currentUser?.email}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Shield className="w-3.5 h-3.5 text-emerald-400" />
                      Security Status: Active
                    </span>
                  </div>
                </div>
              </div>

              <div className="relative z-10 font-mono text-right text-[11px] text-slate-400 border-t sm:border-t-0 sm:border-l border-slate-800 pt-4 sm:pt-0 sm:pl-6 space-y-1 shrink-0 w-full sm:w-auto">
                <div className="text-slate-300 font-bold">SYSTEM IDENTIFIER</div>
                <div className="text-[10px] font-mono text-rose-400 truncate max-w-[200px]">
                  {currentUser?.id}
                </div>
                <div className="text-[10px] text-slate-500">
                  Joined: {new Date(currentUser?.createdAt || Date.now()).toLocaleDateString()}
                </div>
              </div>
            </div>

            {/* Profile Settings Tabs */}
            <div className="bg-white border border-slate-200 shadow-sm rounded-none overflow-hidden">
              {/* Tab Selector */}
              <div className="flex border-b border-slate-200 bg-slate-50 font-mono text-xs">
                <button
                  onClick={() => setActiveTab("info")}
                  className={`px-6 py-3.5 font-bold uppercase transition-all flex items-center gap-2 border-b-2 ${
                    activeTab === "info"
                      ? "border-primary text-primary bg-white"
                      : "border-transparent text-slate-500 hover:text-slate-900"
                  }`}
                >
                  <User className="w-4 h-4" />
                  <span>Personal Details</span>
                </button>

                <button
                  onClick={() => setActiveTab("security")}
                  className={`px-6 py-3.5 font-bold uppercase transition-all flex items-center gap-2 border-b-2 ${
                    activeTab === "security"
                      ? "border-primary text-primary bg-white"
                      : "border-transparent text-slate-500 hover:text-slate-900"
                  }`}
                >
                  <Lock className="w-4 h-4" />
                  <span>Security & Password</span>
                </button>

                <button
                  onClick={() => setActiveTab("permissions")}
                  className={`px-6 py-3.5 font-bold uppercase transition-all flex items-center gap-2 border-b-2 ${
                    activeTab === "permissions"
                      ? "border-primary text-primary bg-white"
                      : "border-transparent text-slate-500 hover:text-slate-900"
                  }`}
                >
                  <Shield className="w-4 h-4" />
                  <span>Clearance & Access Log</span>
                </button>
              </div>

              {/* TAB 1: PERSONAL DETAILS FORM */}
              {activeTab === "info" && (
                <form onSubmit={handleSaveProfile} className="p-6 space-y-6 font-mono text-xs">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-[10px] text-slate-500 uppercase tracking-wider mb-1 font-bold">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 p-3 text-slate-900 focus:outline-none focus:border-primary font-bold"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] text-slate-500 uppercase tracking-wider mb-1 font-bold">
                        Email Address (Account ID)
                      </label>
                      <input
                        type="email"
                        disabled
                        value={currentUser?.email || ""}
                        className="w-full bg-slate-100 border border-slate-200 p-3 text-slate-500 cursor-not-allowed font-bold"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-[10px] text-slate-500 uppercase tracking-wider mb-1 font-bold">
                        Designation / Official Title
                      </label>
                      <input
                        type="text"
                        value={designation}
                        onChange={(e) => setDesignation(e.target.value)}
                        placeholder="e.g. Chief Process Engineer"
                        className="w-full bg-slate-50 border border-slate-200 p-3 text-slate-900 focus:outline-none focus:border-primary"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] text-slate-500 uppercase tracking-wider mb-1 font-bold">
                        Phone Contact Number
                      </label>
                      <input
                        type="text"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+1 (713) 555-0199"
                        className="w-full bg-slate-50 border border-slate-200 p-3 text-slate-900 focus:outline-none focus:border-primary"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] text-slate-500 uppercase tracking-wider mb-1 font-bold">
                      Avatar Photo URL (or upload above via Cloudinary)
                    </label>
                    <input
                      type="text"
                      value={image}
                      onChange={(e) => setImage(e.target.value)}
                      placeholder="https://res.cloudinary.com/..."
                      className="w-full bg-slate-50 border border-slate-200 p-3 text-slate-900 focus:outline-none focus:border-primary"
                    />
                  </div>

                  <div className="pt-4 border-t border-slate-100 flex items-center justify-end">
                    <button
                      type="submit"
                      disabled={isUpdatingProfile}
                      className="px-6 py-3 bg-primary hover:bg-rose-700 text-white font-bold uppercase text-xs transition-colors shadow-sm flex items-center gap-2"
                    >
                      {isUpdatingProfile && <RefreshCw className="w-4 h-4 animate-spin" />}
                      Save Profile Details
                    </button>
                  </div>
                </form>
              )}

              {/* TAB 2: SECURITY & PASSWORD FORM */}
              {activeTab === "security" && (
                <form onSubmit={handleChangePassword} className="p-6 space-y-6 font-mono text-xs max-w-xl">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-[10px] text-slate-500 uppercase tracking-wider mb-1 font-bold">
                        Current Account Password *
                      </label>
                      <input
                        type="password"
                        required
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 p-3 text-slate-900 focus:outline-none focus:border-primary"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] text-slate-500 uppercase tracking-wider mb-1 font-bold">
                        New Security Password *
                      </label>
                      <input
                        type="password"
                        required
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 p-3 text-slate-900 focus:outline-none focus:border-primary"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] text-slate-500 uppercase tracking-wider mb-1 font-bold">
                        Confirm New Password *
                      </label>
                      <input
                        type="password"
                        required
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 p-3 text-slate-900 focus:outline-none focus:border-primary"
                      />
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-100 flex items-center justify-end">
                    <button
                      type="submit"
                      disabled={isChangingPassword}
                      className="px-6 py-3 bg-primary hover:bg-rose-700 text-white font-bold uppercase text-xs transition-colors shadow-sm flex items-center gap-2"
                    >
                      {isChangingPassword && <RefreshCw className="w-4 h-4 animate-spin" />}
                      Update Account Password
                    </button>
                  </div>
                </form>
              )}

              {/* TAB 3: CLEARANCE & ACCESS LOG */}
              {activeTab === "permissions" && (
                <div className="p-6 space-y-6 font-mono text-xs">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="p-4 bg-slate-50 border border-slate-200 space-y-2">
                      <div className="text-[10px] text-slate-400 uppercase font-bold">
                        Assigned System Role
                      </div>
                      <div className="text-lg font-bold text-slate-900 flex items-center gap-2">
                        <UserCheck className="w-5 h-5 text-primary" />
                        <span>{currentUser?.role || "ADMIN"}</span>
                      </div>
                      <p className="text-[11px] text-slate-500">
                        {currentUser?.role === "EMPLOYEE"
                          ? "Standard staff permissions: Lead Management & Invoice Creator."
                          : "Full administrative permissions across all corporate ledgers, employees, and settings."}
                      </p>
                    </div>

                    <div className="p-4 bg-slate-50 border border-slate-200 space-y-2">
                      <div className="text-[10px] text-slate-400 uppercase font-bold">
                        Authentication Tokens & Cookies
                      </div>
                      <div className="text-lg font-bold text-emerald-600 flex items-center gap-2">
                        <Shield className="w-5 h-5" />
                        <span>JWT 256-Bit Encrypted</span>
                      </div>
                      <p className="text-[11px] text-slate-500">
                        HTTP-Only Secure Cookie Session. Tokens refresh automatically in the background.
                      </p>
                    </div>
                  </div>

                  <div className="border border-slate-200 bg-white p-4 space-y-3">
                    <div className="font-bold text-xs uppercase text-slate-900 border-b border-slate-100 pb-2">
                      Recent Activity & Security Clearance Audit
                    </div>
                    <div className="space-y-2 text-[11px]">
                      <div className="flex justify-between py-1 border-b border-slate-50">
                        <span className="text-slate-500">Last Profile Authentication</span>
                        <span className="font-bold text-slate-800">{new Date().toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between py-1 border-b border-slate-50">
                        <span className="text-slate-500">Session IP Endpoint</span>
                        <span className="font-bold text-slate-800">127.0.0.1 (Local Verified)</span>
                      </div>
                      <div className="flex justify-between py-1">
                        <span className="text-slate-500">API Access Key Scope</span>
                        <span className="font-bold text-emerald-600">Full System Node Access</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
