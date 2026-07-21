"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import TechnicalCursor from "@/components/ui/TechnicalCursor";
import { useGetMeQuery, useLogoutMutation } from "@/redux/api/authApi";
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
} from "lucide-react";

interface Submission {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  date: string;
}

export default function SubmissionsDashboardPage() {
  const router = useRouter();
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Auth Protection
  const { data: userData, isLoading: isAuthLoading, isError: isAuthError } = useGetMeQuery();
  const [logout] = useLogoutMutation();

  useEffect(() => {
    if (!isAuthLoading && (isAuthError || !userData?.data)) {
      router.push("/login");
    }
  }, [isAuthLoading, isAuthError, userData, router]);

  const currentUser = userData?.data;

  // Mock Submissions State
  const [submissions, setSubmissions] = useState<Submission[]>([
    {
      id: "SUB-101",
      name: "John Doe",
      email: "john.doe@holcim.com",
      subject: "Bypass Clinker Cooler Blockage",
      message:
        "We are facing localized material blockages on preheater bypass lines. Requesting CFD audit review.",
      date: "2026-07-19 14:22",
    },
    {
      id: "SUB-102",
      name: "Alice Smith",
      email: "alice.smith@cemex.com",
      subject: "Refractory Thermal Stress",
      message:
        "Burner nozzle adjustments are causing localized hot spots on kiln shell refractories. Need analysis.",
      date: "2026-07-18 10:15",
    },
    {
      id: "SUB-103",
      name: "Bob Miller",
      email: "bob@valero.com",
      subject: "Hydrodynamics FEA Audit",
      message: "Pipe vibration issues on gas lines. Please coordinate FEA structural checks.",
      date: "2026-07-17 16:45",
    },
    {
      id: "SUB-104",
      name: "David Zhang",
      email: "david.zhang@sinoma.cn",
      subject: "Cyclone Separation Efficiency Check",
      message: "Stage 4 cyclone pressure drop exceeded 1.8 kPa. Requesting simulation optimization.",
      date: "2026-07-16 11:30",
    },
  ]);

  // Edit & Confirm Modals State
  const [editModalItem, setEditModalItem] = useState<Submission | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [statusMsg, setStatusMsg] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editModalItem) return;
    setSubmissions((prev) =>
      prev.map((item) => (item.id === editModalItem.id ? editModalItem : item))
    );
    setEditModalItem(null);
    setStatusMsg({ type: "success", text: `Submission ${editModalItem.id} updated successfully!` });
  };

  const handleDelete = (id: string) => {
    setSubmissions((prev) => prev.filter((item) => item.id !== id));
    setDeleteId(null);
    setStatusMsg({ type: "success", text: `Submission ${id} deleted successfully!` });
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

  const filteredSubmissions = submissions.filter(
    (item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

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

                  {/* ACTIVE TAB HIGHLIGHT FOR SUBMISSIONS */}
                  <Link
                    href="/dashboard/submissions"
                    className="w-full flex items-center justify-between px-3 py-2.5 text-xs font-mono rounded transition-all duration-150 group bg-rose-500/10 text-white font-bold border-l-2 border-primary"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <Inbox className="w-4 h-4 shrink-0 text-primary" />
                      <span className="truncate">Submissions</span>
                    </div>
                    <span className="font-mono text-[9px] px-1.5 py-0.5 rounded border bg-primary text-white border-primary">
                      {submissions.length}
                    </span>
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
                <span className="text-primary font-bold">Submissions Records</span>
              </span>
            </div>
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

            {/* Header Title & Filter */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white border border-slate-200 p-5 shadow-sm">
              <div>
                <h1 className="font-display font-extrabold text-xl text-slate-900 uppercase tracking-tight">
                  Submissions Records ({submissions.length})
                </h1>
                <p className="font-mono text-xs text-slate-500 mt-0.5">
                  Direct website client inquiries, support requests & CFD audit consultations.
                </p>
              </div>

              <div className="relative w-full sm:w-64">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search sender, email, subject..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 font-mono text-xs text-slate-800 focus:outline-none focus:border-primary"
                />
              </div>
            </div>

            {/* Submissions Table */}
            <div className="bg-white border border-slate-200 shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse min-w-[700px]">
                  <thead>
                    <tr className="bg-slate-100 text-slate-600 font-mono text-[9px] uppercase border-b border-slate-200">
                      <th className="p-4">ID</th>
                      <th className="p-4">Sender Details</th>
                      <th className="p-4">Subject & Message</th>
                      <th className="p-4">Date</th>
                      <th className="p-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-sans text-xs text-slate-600">
                    {filteredSubmissions.length === 0 ? (
                      <tr>
                        <td colSpan={5} className="p-8 text-center font-mono text-slate-400 text-xs">
                          No submission records found matching query.
                        </td>
                      </tr>
                    ) : (
                      filteredSubmissions.map((item) => (
                        <tr key={item.id} className="hover:bg-slate-50/50 transition-colors">
                          <td className="p-4 font-mono font-bold text-primary">{item.id}</td>
                          <td className="p-4">
                            <div className="font-bold text-slate-900">{item.name}</div>
                            <div className="text-[10px] text-slate-400 font-mono">{item.email}</div>
                          </td>
                          <td className="p-4 max-w-sm">
                            <div className="font-bold text-slate-900 uppercase text-[10px]">
                              {item.subject}
                            </div>
                            <div className="text-slate-500 truncate mt-1">{item.message}</div>
                          </td>
                          <td className="p-4 font-mono text-[10px] text-slate-400">{item.date}</td>
                          <td className="p-4 text-right space-x-2 whitespace-nowrap">
                            <button
                              onClick={() => setEditModalItem(item)}
                              className="px-3 py-1.5 bg-slate-100 border border-slate-200 hover:bg-slate-200 hover:border-slate-300 font-mono text-[9px] uppercase font-bold text-slate-700 transition-colors"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => setDeleteId(item.id)}
                              className="px-3 py-1.5 bg-rose-50 border border-rose-100 hover:bg-rose-100 hover:border-rose-200 font-mono text-[9px] uppercase font-bold text-rose-600 transition-colors"
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* EDIT MODAL */}
      {editModalItem && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 w-full max-w-lg p-6 shadow-2xl space-y-4 font-mono text-xs">
            <div className="flex justify-between items-center border-b border-slate-100 pb-3">
              <h3 className="font-bold text-slate-900 uppercase text-sm">
                Edit Submission ({editModalItem.id})
              </h3>
              <button onClick={() => setEditModalItem(null)}>
                <X className="w-5 h-5 text-slate-400 hover:text-slate-700" />
              </button>
            </div>

            <form onSubmit={handleSaveEdit} className="space-y-4">
              <div>
                <label className="block text-[10px] text-slate-500 uppercase font-bold mb-1">
                  Sender Name
                </label>
                <input
                  type="text"
                  required
                  value={editModalItem.name}
                  onChange={(e) => setEditModalItem({ ...editModalItem, name: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 p-2.5 text-slate-900 focus:outline-none focus:border-primary"
                />
              </div>

              <div>
                <label className="block text-[10px] text-slate-500 uppercase font-bold mb-1">
                  Sender Email
                </label>
                <input
                  type="email"
                  required
                  value={editModalItem.email}
                  onChange={(e) => setEditModalItem({ ...editModalItem, email: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 p-2.5 text-slate-900 focus:outline-none focus:border-primary"
                />
              </div>

              <div>
                <label className="block text-[10px] text-slate-500 uppercase font-bold mb-1">
                  Subject
                </label>
                <input
                  type="text"
                  required
                  value={editModalItem.subject}
                  onChange={(e) => setEditModalItem({ ...editModalItem, subject: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 p-2.5 text-slate-900 focus:outline-none focus:border-primary"
                />
              </div>

              <div>
                <label className="block text-[10px] text-slate-500 uppercase font-bold mb-1">
                  Message Content
                </label>
                <textarea
                  rows={4}
                  required
                  value={editModalItem.message}
                  onChange={(e) => setEditModalItem({ ...editModalItem, message: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 p-2.5 text-slate-900 focus:outline-none focus:border-primary"
                />
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setEditModalItem(null)}
                  className="px-4 py-2 bg-slate-100 text-slate-600 font-bold uppercase hover:bg-slate-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-primary text-white font-bold uppercase hover:bg-rose-700"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* DELETE CONFIRM MODAL */}
      {deleteId && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 w-full max-w-md p-6 shadow-2xl space-y-4 font-mono text-xs">
            <h3 className="font-bold text-rose-600 uppercase text-sm">
              Confirm Delete Submission
            </h3>
            <p className="text-slate-600 font-sans">
              Are you sure you want to permanently delete submission record{" "}
              <strong className="font-mono text-slate-900">{deleteId}</strong>?
            </p>

            <div className="flex justify-end gap-3 pt-3 border-t border-slate-100">
              <button
                onClick={() => setDeleteId(null)}
                className="px-4 py-2 bg-slate-100 text-slate-600 font-bold uppercase hover:bg-slate-200"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(deleteId)}
                className="px-4 py-2 bg-rose-600 text-white font-bold uppercase hover:bg-rose-700"
              >
                Delete Record
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
