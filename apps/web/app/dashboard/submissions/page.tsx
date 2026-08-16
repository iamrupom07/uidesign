"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import TechnicalCursor from "@/components/ui/TechnicalCursor";
import { useGetMeQuery, useLogoutMutation } from "@/redux/api/authApi";
import {
  useGetSubmissionsQuery,
  useUpdateSubmissionMutation,
  useDeleteSubmissionMutation,
  useGetSubmissionStatsQuery,
} from "@/redux/api/submissionApi";
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
  Sparkles,
  RefreshCw,
  Search,
  CheckCircle2,
  AlertTriangle,
  Mail,
  Phone,
  Building,
  Calendar,
  DollarSign,
  FileCode,
  Tag,
  Eye,
  Trash2,
  Edit3,
} from "lucide-react";
import { Submission, SubmissionStatus } from "@repo/types";

export default function SubmissionsDashboardPage() {
  const router = useRouter();
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [selectedType, setSelectedType] = useState<string>("ALL");
  const [selectedStatus, setSelectedStatus] = useState<string>("ALL");

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchQuery);
    }, 250);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Auth Protection
  const { data: userData, isLoading: isAuthLoading, isError: isAuthError } = useGetMeQuery();
  const [logout] = useLogoutMutation();

  useEffect(() => {
    if (!isAuthLoading && (isAuthError || !userData?.data)) {
      router.push("/login");
    }
  }, [isAuthLoading, isAuthError, userData, router]);

  const currentUser = userData?.data;

  // Real Submissions Data from RTK Query (using debounced query & cached data)
  const {
    data: submissionsResponse,
    isLoading: isSubmissionsLoading,
    refetch,
  } = useGetSubmissionsQuery(
    {
      type: selectedType,
      status: selectedStatus,
      search: debouncedSearch || undefined,
    },
    { skip: !userData?.data }
  );

  const { data: statsResponse } = useGetSubmissionStatsQuery(undefined, {
    skip: !userData?.data,
  });

  const [updateSubmission, { isLoading: isUpdating }] = useUpdateSubmissionMutation();
  const [deleteSubmission, { isLoading: isDeleting }] = useDeleteSubmissionMutation();

  const submissions = submissionsResponse?.data || [];
  const stats = statsResponse?.data;

  // Modals State
  const [activeDossier, setActiveDossier] = useState<Submission | null>(null);
  const [editModalItem, setEditModalItem] = useState<Submission | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [statusMsg, setStatusMsg] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const handleSaveEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editModalItem) return;
    try {
      await updateSubmission({
        id: editModalItem.id,
        data: {
          status: editModalItem.status,
          notes: editModalItem.notes || undefined,
        },
      }).unwrap();
      setEditModalItem(null);
      setStatusMsg({ type: "success", text: `Submission updated successfully!` });
    } catch (err: any) {
      console.error(err);
      setStatusMsg({ type: "error", text: err?.data?.message || "Failed to update submission." });
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteSubmission(id).unwrap();
      setDeleteId(null);
      if (activeDossier?.id === id) setActiveDossier(null);
      setStatusMsg({ type: "success", text: "Submission deleted successfully!" });
    } catch (err: any) {
      console.error(err);
      setStatusMsg({ type: "error", text: err?.data?.message || "Failed to delete submission." });
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

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case "NEW":
        return "bg-rose-100 text-rose-800 border-rose-200";
      case "UNDER_REVIEW":
        return "bg-amber-100 text-amber-800 border-amber-200";
      case "RESPONDED":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "CONVERTED":
        return "bg-emerald-100 text-emerald-800 border-emerald-200";
      case "ARCHIVED":
        return "bg-slate-100 text-slate-600 border-slate-200";
      default:
        return "bg-slate-100 text-slate-800 border-slate-200";
    }
  };

  const getTypeBadgeClass = (type: string) => {
    switch (type) {
      case "RFP":
        return "bg-purple-100 text-purple-800 border-purple-200";
      case "CONSULTATION":
      case "AUDIT":
        return "bg-indigo-100 text-indigo-800 border-indigo-200";
      case "TRAINING":
        return "bg-amber-100 text-amber-800 border-amber-200";
      case "RESOURCE":
        return "bg-cyan-100 text-cyan-800 border-cyan-200";
      default:
        return "bg-slate-100 text-slate-700 border-slate-200";
    }
  };

  if (isAuthLoading || !userData?.data) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center font-mono">
        <div className="flex items-center gap-3 text-rose-500">
          <RefreshCw className="w-5 h-5 animate-spin" />
          <span>AUTHENTICATING ACCESS CLEARANCE...</span>
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
            <img src="/images/logo-icon.png" alt="MACPROTEC Logo" className="w-7 h-7 object-contain" />
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
            className="p-1.5 border border-slate-800 rounded text-slate-300 hover:text-white"
          >
            {mobileSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </header>

        {/* Sidebar Navigation */}
        <aside
          className={`fixed lg:sticky top-0 left-0 h-screen w-72 bg-slate-950 border-r border-slate-800/80 z-40 flex flex-col justify-between p-6 transition-transform duration-200 ease-in-out ${
            mobileSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
          }`}
        >
          <div className="space-y-8 overflow-y-auto">
            {/* Logo Brand Header */}
            <div className="flex items-center gap-3 pb-6 border-b border-slate-800/60">
              <img src="/images/logo-icon.png" alt="MACPROTEC Logo" className="w-9 h-9 object-contain" />
              <div>
                <span className="font-sans font-extrabold text-sm tracking-wider uppercase text-white block leading-tight">
                  MACPROTEC
                </span>
                <span className="font-mono text-[9px] text-rose-500 font-bold tracking-widest block leading-tight mt-0.5">
                  OPERATIONS DESK
                </span>
              </div>
            </div>

            {/* Nav Groups */}
            <div className="space-y-6">
              <div>
                <div className="font-mono text-[9px] font-bold text-slate-400 uppercase tracking-widest px-3 mb-2">
                  Telemetry & Inquiries
                </div>
                <nav className="space-y-1">
                  <Link
                    href="/dashboard"
                    className="w-full flex items-center justify-between px-3 py-2.5 text-xs font-mono rounded transition-all duration-150 group text-slate-400 hover:bg-slate-900 hover:text-slate-200"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <LayoutDashboard className="w-4 h-4 shrink-0 text-slate-400 group-hover:text-slate-200" />
                      <span className="truncate">Overview</span>
                    </div>
                  </Link>

                  <Link
                    href="/dashboard/submissions"
                    className="w-full flex items-center justify-between px-3 py-2.5 text-xs font-mono rounded transition-all duration-150 group bg-rose-500/10 text-rose-400 border border-rose-500/30"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <Inbox className="w-4 h-4 shrink-0 text-rose-400" />
                      <span className="truncate">Submissions</span>
                    </div>
                    {stats?.new ? (
                      <span className="bg-rose-500 text-white font-mono text-[9px] font-bold px-1.5 py-0.5 rounded-full">
                        {stats.new}
                      </span>
                    ) : null}
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

          {/* User Profile & Logout */}
          <div className="pt-6 mt-6 border-t border-slate-800/60">
            <Link
              href="/dashboard/profile"
              className="bg-slate-900 rounded-lg p-3 border border-slate-800 flex items-center justify-between group hover:border-primary transition-all block mb-2"
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
                <span className="text-primary font-bold">Submissions & Inquiries</span>
              </span>
            </div>

            <button
              onClick={() => refetch()}
              className="px-3 py-1.5 bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 font-mono text-xs flex items-center gap-1.5"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Refresh</span>
            </button>
          </header>

          {/* Workspace Body */}
          <div className="p-6 lg:p-10 space-y-6 max-w-6xl mx-auto">
            {/* Status Feedback Banner */}
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

            {/* KPI Counter Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-white border border-slate-200 p-4 shadow-sm">
                <div className="font-mono text-[10px] uppercase text-slate-400 font-bold">
                  Total Submissions
                </div>
                <div className="font-display font-extrabold text-2xl text-slate-900 mt-1">
                  {stats?.total ?? submissions.length}
                </div>
              </div>
              <div className="bg-white border border-slate-200 p-4 shadow-sm border-l-4 border-l-rose-500">
                <div className="font-mono text-[10px] uppercase text-rose-600 font-bold">
                  New Unread
                </div>
                <div className="font-display font-extrabold text-2xl text-rose-600 mt-1">
                  {stats?.new ?? 0}
                </div>
              </div>
              <div className="bg-white border border-slate-200 p-4 shadow-sm border-l-4 border-l-purple-500">
                <div className="font-mono text-[10px] uppercase text-purple-600 font-bold">
                  RFP Scopes
                </div>
                <div className="font-display font-extrabold text-2xl text-purple-700 mt-1">
                  {stats?.rfpCount ?? 0}
                </div>
              </div>
              <div className="bg-white border border-slate-200 p-4 shadow-sm border-l-4 border-l-emerald-500">
                <div className="font-mono text-[10px] uppercase text-emerald-600 font-bold">
                  Responded
                </div>
                <div className="font-display font-extrabold text-2xl text-emerald-600 mt-1">
                  {stats?.responded ?? 0}
                </div>
              </div>
            </div>

            {/* Filter & Search Bar */}
            <div className="bg-white border border-slate-200 p-4 shadow-sm space-y-3">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                <div className="flex flex-wrap gap-2">
                  {["ALL", "CONTACT", "RFP", "CONSULTATION", "TRAINING", "RESOURCE"].map((t) => (
                    <button
                      key={t}
                      onClick={() => setSelectedType(t)}
                      className={`px-3 py-1.5 font-mono text-[10px] font-bold uppercase transition-all ${
                        selectedType === t
                          ? "bg-slate-900 text-white"
                          : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>

                <div className="relative w-full sm:w-64">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Search name, email, subject..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-9 pr-4 py-1.5 bg-slate-50 border border-slate-200 font-mono text-xs text-slate-800 focus:outline-none focus:border-primary"
                  />
                </div>
              </div>

              {/* Status Filter Sub-Bar */}
              <div className="flex items-center gap-2 pt-2 border-t border-slate-100 text-xs font-mono">
                <span className="text-slate-400 text-[10px] uppercase font-bold">Status:</span>
                {["ALL", "NEW", "UNDER_REVIEW", "RESPONDED", "CONVERTED", "ARCHIVED"].map((s) => (
                  <button
                    key={s}
                    onClick={() => setSelectedStatus(s)}
                    className={`px-2 py-0.5 text-[10px] font-mono rounded ${
                      selectedStatus === s
                        ? "bg-rose-500 text-white font-bold"
                        : "text-slate-500 hover:text-slate-800 hover:bg-slate-100"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Submissions Table */}
            <div className="bg-white border border-slate-200 shadow-sm overflow-hidden">
              {isSubmissionsLoading ? (
                <div className="p-12 text-center font-mono text-xs text-slate-400 flex items-center justify-center gap-2">
                  <RefreshCw className="w-4 h-4 animate-spin text-rose-500" />
                  <span>LOADING SUBMISSIONS TELEMETRY...</span>
                </div>
              ) : submissions.length === 0 ? (
                <div className="p-12 text-center font-mono text-slate-400 text-xs">
                  No submission records found matching current filters.
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse min-w-[750px]">
                    <thead>
                      <tr className="bg-slate-100 text-slate-600 font-mono text-[9px] uppercase border-b border-slate-200">
                        <th className="p-3.5">Type & Status</th>
                        <th className="p-3.5">Client Dossier</th>
                        <th className="p-3.5">Subject & Preview</th>
                        <th className="p-3.5">Sector / Budget</th>
                        <th className="p-3.5">Date</th>
                        <th className="p-3.5 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 font-sans text-xs text-slate-600">
                      {submissions.map((item) => (
                        <tr key={item.id} className="hover:bg-slate-50/70 transition-colors">
                          <td className="p-3.5 align-top">
                            <div className="space-y-1">
                              <span
                                className={`inline-block px-2 py-0.5 text-[9px] font-mono font-bold uppercase border ${getTypeBadgeClass(
                                  item.type
                                )}`}
                              >
                                {item.type}
                              </span>
                              <div>
                                <span
                                  className={`inline-block px-2 py-0.5 text-[8px] font-mono font-bold uppercase border ${getStatusBadgeClass(
                                    item.status
                                  )}`}
                                >
                                  {item.status}
                                </span>
                              </div>
                            </div>
                          </td>

                          <td className="p-3.5 align-top">
                            <div className="font-bold text-slate-900">{item.name}</div>
                            <div className="text-[11px] text-blue-600 font-mono">
                              <a href={`mailto:${item.email}`} className="hover:underline">
                                {item.email}
                              </a>
                            </div>
                            {item.company && (
                              <div className="text-[10px] text-slate-500 font-mono flex items-center gap-1 mt-0.5">
                                <Building className="w-3 h-3" />
                                <span>{item.company}</span>
                              </div>
                            )}
                            {item.phone && (
                              <div className="text-[10px] text-slate-400 font-mono flex items-center gap-1">
                                <Phone className="w-3 h-3" />
                                <span>{item.phone}</span>
                              </div>
                            )}
                          </td>

                          <td className="p-3.5 align-top max-w-xs">
                            <div className="font-bold text-slate-900 uppercase text-[10px] line-clamp-1">
                              {item.subject || "Inquiry Submission"}
                            </div>
                            <div className="text-slate-500 line-clamp-2 mt-1 font-sans text-xs leading-relaxed">
                              {item.message}
                            </div>
                            {item.notes && (
                              <div className="mt-1 text-[10px] text-amber-700 bg-amber-50 p-1 border border-amber-200 line-clamp-1">
                                Note: {item.notes}
                              </div>
                            )}
                          </td>

                          <td className="p-3.5 align-top font-mono text-[10px] text-slate-600">
                            {item.sector ? (
                              <div className="font-bold text-slate-800">{item.sector}</div>
                            ) : (
                              <span className="text-slate-400">—</span>
                            )}
                            {item.budget && (
                              <div className="text-emerald-600 font-bold mt-0.5">{item.budget}</div>
                            )}
                          </td>

                          <td className="p-3.5 align-top font-mono text-[10px] text-slate-400 whitespace-nowrap">
                            {new Date(item.createdAt).toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            })}
                          </td>

                          <td className="p-3.5 align-top text-right space-x-1.5 whitespace-nowrap">
                            <button
                              onClick={() => setActiveDossier(item)}
                              title="View Full Dossier"
                              className="p-1.5 bg-slate-100 hover:bg-slate-200 border border-slate-300 text-slate-700"
                            >
                              <Eye className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => setEditModalItem(item)}
                              title="Edit Status & Notes"
                              className="p-1.5 bg-slate-100 hover:bg-slate-200 border border-slate-300 text-slate-700"
                            >
                              <Edit3 className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => setDeleteId(item.id)}
                              title="Delete Submission"
                              className="p-1.5 bg-rose-50 hover:bg-rose-100 border border-rose-200 text-rose-600"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Full Dossier View Modal */}
      {activeDossier && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 animate-fadeIn">
          <div className="bg-white border-2 border-slate-900 max-w-2xl w-full p-6 sm:p-8 max-h-[90vh] overflow-y-auto space-y-6 shadow-2xl">
            <div className="flex justify-between items-start border-b border-slate-200 pb-4">
              <div>
                <span className="font-mono text-[10px] text-primary font-bold uppercase tracking-wider">
                  [{activeDossier.type}] INQUIRY DOSSIER
                </span>
                <h2 className="font-display font-extrabold text-xl uppercase text-slate-900 mt-1">
                  {activeDossier.subject || "Project Submission"}
                </h2>
              </div>
              <button
                onClick={() => setActiveDossier(null)}
                className="p-1.5 text-slate-400 hover:text-slate-900"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 font-mono text-xs bg-slate-50 p-4 border border-slate-200">
              <div>
                <span className="text-slate-400 uppercase text-[9px] block">Sender Name:</span>
                <span className="font-bold text-slate-900">{activeDossier.name}</span>
              </div>
              <div>
                <span className="text-slate-400 uppercase text-[9px] block">Email:</span>
                <a href={`mailto:${activeDossier.email}`} className="text-blue-600 hover:underline">
                  {activeDossier.email}
                </a>
              </div>
              {activeDossier.company && (
                <div>
                  <span className="text-slate-400 uppercase text-[9px] block">Company:</span>
                  <span className="text-slate-800">{activeDossier.company}</span>
                </div>
              )}
              {activeDossier.phone && (
                <div>
                  <span className="text-slate-400 uppercase text-[9px] block">Phone:</span>
                  <span className="text-slate-800">{activeDossier.phone}</span>
                </div>
              )}
              {activeDossier.sector && (
                <div>
                  <span className="text-slate-400 uppercase text-[9px] block">Sector:</span>
                  <span className="text-slate-800">{activeDossier.sector}</span>
                </div>
              )}
              {activeDossier.budget && (
                <div>
                  <span className="text-slate-400 uppercase text-[9px] block">Target Budget:</span>
                  <span className="font-bold text-emerald-600">{activeDossier.budget}</span>
                </div>
              )}
              {activeDossier.startDate && (
                <div>
                  <span className="text-slate-400 uppercase text-[9px] block">Target Start:</span>
                  <span className="text-slate-800">{activeDossier.startDate}</span>
                </div>
              )}
              <div>
                <span className="text-slate-400 uppercase text-[9px] block">Received On:</span>
                <span className="text-slate-800">{new Date(activeDossier.createdAt).toLocaleString()}</span>
              </div>
            </div>

            {activeDossier.scope && (
              <div>
                <h4 className="font-mono text-[10px] uppercase font-bold text-slate-500 mb-1.5">
                  RFP Scope & Calculations:
                </h4>
                <div className="bg-slate-50 p-4 border border-slate-200 font-mono text-xs text-slate-800 whitespace-pre-line leading-relaxed">
                  {activeDossier.scope}
                </div>
              </div>
            )}

            <div>
              <h4 className="font-mono text-[10px] uppercase font-bold text-slate-500 mb-1.5">
                Full Message Content:
              </h4>
              <div className="bg-white p-4 border border-slate-200 font-sans text-xs text-slate-800 whitespace-pre-line leading-relaxed">
                {activeDossier.message}
              </div>
            </div>

            {activeDossier.files && (
              <div>
                <h4 className="font-mono text-[10px] uppercase font-bold text-slate-500 mb-1.5">
                  Attached Project Files:
                </h4>
                <div className="bg-slate-50 p-3 border border-slate-200 font-mono text-xs text-slate-700">
                  {activeDossier.files}
                </div>
              </div>
            )}

            <div className="flex justify-between items-center pt-4 border-t border-slate-200 font-mono text-xs">
              <a
                href={`mailto:${activeDossier.email}?subject=Re: ${encodeURIComponent(
                  activeDossier.subject || "MacProtec Engineering Inquiry"
                )}`}
                className="button-primary py-2.5 px-4 text-[10px] uppercase font-bold flex items-center gap-1.5"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>Direct Email Reply</span>
              </a>

              <button
                onClick={() => {
                  setEditModalItem(activeDossier);
                  setActiveDossier(null);
                }}
                className="button-outline py-2.5 px-4 text-[10px] uppercase font-bold"
              >
                Edit Status / Notes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Status & Notes Modal */}
      {editModalItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 animate-fadeIn">
          <div className="bg-white border-2 border-slate-900 max-w-lg w-full p-6 sm:p-8 space-y-5 shadow-2xl">
            <div className="flex justify-between items-start border-b border-slate-200 pb-3">
              <div>
                <span className="font-mono text-[10px] text-primary font-bold uppercase">
                  MANAGE INQUIRY STATUS
                </span>
                <h3 className="font-display font-extrabold text-base uppercase text-slate-900">
                  {editModalItem.name} — {editModalItem.subject || editModalItem.type}
                </h3>
              </div>
              <button
                onClick={() => setEditModalItem(null)}
                className="p-1 text-slate-400 hover:text-slate-900"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveEdit} className="space-y-4 font-mono text-xs">
              <div>
                <label className="block text-[10px] uppercase font-bold text-slate-600 mb-1">
                  Status Stage
                </label>
                <select
                  value={editModalItem.status}
                  onChange={(e) =>
                    setEditModalItem({
                      ...editModalItem,
                      status: e.target.value as SubmissionStatus,
                    })
                  }
                  className="w-full bg-slate-50 border border-slate-300 p-2.5 text-xs text-slate-900 focus:outline-none focus:border-primary"
                >
                  <option value="NEW">NEW</option>
                  <option value="UNDER_REVIEW">UNDER_REVIEW</option>
                  <option value="RESPONDED">RESPONDED</option>
                  <option value="CONVERTED">CONVERTED</option>
                  <option value="ARCHIVED">ARCHIVED</option>
                </select>
              </div>

              <div>
                <label className="block text-[10px] uppercase font-bold text-slate-600 mb-1">
                  Internal Process Engineer Notes
                </label>
                <textarea
                  rows={4}
                  value={editModalItem.notes || ""}
                  onChange={(e) =>
                    setEditModalItem({ ...editModalItem, notes: e.target.value })
                  }
                  placeholder="Record follow-up notes, assigned engineer, or scope feedback..."
                  className="w-full bg-slate-50 border border-slate-300 p-2.5 text-xs text-slate-900 focus:outline-none focus:border-primary"
                />
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setEditModalItem(null)}
                  className="px-4 py-2 border border-slate-300 hover:bg-slate-100 font-bold uppercase text-[10px]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isUpdating}
                  className="px-5 py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold uppercase text-[10px]"
                >
                  {isUpdating ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 animate-fadeIn">
          <div className="bg-white border-2 border-rose-600 max-w-sm w-full p-6 space-y-4 shadow-2xl">
            <h3 className="font-display font-extrabold text-base uppercase text-slate-900 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-rose-600" />
              <span>Confirm Deletion</span>
            </h3>
            <p className="font-sans text-xs text-slate-600">
              Are you sure you want to delete this submission record? This action will archive it from active operations.
            </p>
            <div className="flex justify-end gap-3 pt-3 border-t border-slate-200 font-mono text-xs">
              <button
                onClick={() => setDeleteId(null)}
                className="px-4 py-2 border border-slate-300 hover:bg-slate-100 uppercase text-[10px] font-bold"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(deleteId)}
                disabled={isDeleting}
                className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white uppercase text-[10px] font-bold"
              >
                {isDeleting ? "Deleting..." : "Confirm Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
