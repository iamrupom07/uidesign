"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import TechnicalCursor from "@/components/ui/TechnicalCursor";
import { useGetMeQuery, useLogoutMutation } from "@/redux/api/authApi";
import {
  useGetLeadsQuery,
  useCreateLeadMutation,
  useUpdateLeadMutation,
  useDeleteLeadMutation,
} from "@/redux/api/leadApi";
import Link from "next/link";
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
  Search,
  Plus,
  Filter,
  DollarSign,
  TrendingUp,
  FileCheck,
  CheckCircle2,
  Trash2,
  Edit,
  Building,
  Mail,
  Phone,
  AlertCircle,
} from "lucide-react";
import { LeadStatus } from "@repo/types";

export default function LeadsDashboardPage() {
  const router = useRouter();
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  // Auth Protection
  const { data: userData, isLoading: isAuthLoading, isError: isAuthError } = useGetMeQuery();
  const [logout] = useLogoutMutation();

  useEffect(() => {
    if (!isAuthLoading && (isAuthError || !userData?.data)) {
      router.push("/login");
    }
  }, [isAuthLoading, isAuthError, userData, router]);

  // Lead Data & RTK Query
  const { data: leadsData, isLoading: isLeadsLoading, refetch } = useGetLeadsQuery(undefined, {
    skip: !userData?.data,
  });

  const [createLead, { isLoading: isCreating }] = useCreateLeadMutation();
  const [updateLead] = useUpdateLeadMutation();
  const [deleteLead] = useDeleteLeadMutation();

  // State
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("ALL");
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingLead, setEditingLead] = useState<any>(null);

  // Form State
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    value: 0,
    status: "New" as LeadStatus,
    notes: "",
  });

  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const leads = leadsData?.data || [];

  // Filtered Leads
  const filteredLeads = leads.filter((lead) => {
    const matchesSearch =
      lead.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "ALL" || lead.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // KPI Calculations
  const totalLeads = leads.length;
  const pipelineValue = leads.reduce((sum, lead) => sum + (lead.value || 0), 0);
  const proposalSentCount = leads.filter((l) => l.status === "Proposal Sent").length;
  const closedWonCount = leads.filter((l) => l.status === "Closed Won").length;
  const winRate = totalLeads > 0 ? ((closedWonCount / totalLeads) * 100).toFixed(1) : "0.0";

  const handleLogout = async () => {
    try {
      await logout().unwrap();
    } catch (err) {
      console.error(err);
    } finally {
      router.push("/login");
    }
  };

  const handleOpenAddModal = () => {
    setEditingLead(null);
    setFormData({
      name: "",
      email: "",
      phone: "",
      company: "",
      value: 0,
      status: "New",
      notes: "",
    });
    setErrorMsg("");
    setShowAddModal(true);
  };

  const handleOpenEditModal = (lead: any) => {
    setEditingLead(lead);
    setFormData({
      name: lead.name,
      email: lead.email,
      phone: lead.phone || "",
      company: lead.company,
      value: lead.value || 0,
      status: lead.status as LeadStatus,
      notes: lead.notes || "",
    });
    setErrorMsg("");
    setShowAddModal(true);
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");

    try {
      if (editingLead) {
        await updateLead({
          id: editingLead.id,
          data: formData,
        }).unwrap();
        setSuccessMsg("Lead updated successfully!");
      } else {
        await createLead(formData).unwrap();
        setSuccessMsg("Lead created successfully!");
      }

      setShowAddModal(false);
      refetch();
    } catch (err: any) {
      console.error("[Lead Save Error]", err);
      setErrorMsg(err?.data?.message || "Failed to save lead. Please check your inputs.");
    }
  };

  const handleStatusChange = async (id: string, newStatus: LeadStatus) => {
    try {
      await updateLead({
        id,
        data: { status: newStatus },
      }).unwrap();
      refetch();
    } catch (err) {
      console.error("[Update Status Error]", err);
    }
  };

  const handleDeleteLead = async (id: string) => {
    if (confirm("Are you sure you want to delete this lead?")) {
      try {
        await deleteLead(id).unwrap();
        refetch();
      } catch (err) {
        console.error("[Delete Lead Error]", err);
      }
    }
  };

  if (isAuthLoading) {
    return (
      <main className="min-h-screen bg-slate-950 text-white flex items-center justify-center font-mono">
        <div className="flex items-center gap-3">
          <span className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin" />
          <span>AUTHENTICATING LEADS SYSTEM...</span>
        </div>
      </main>
    );
  }

  const currentUser = userData?.data;

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
                    className="w-full flex items-center justify-between px-3 py-2.5 text-xs font-mono rounded transition-all duration-150 group bg-rose-500/10 text-white font-bold border-l-2 border-primary"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <Users className="w-4 h-4 shrink-0 text-primary" />
                      <span className="truncate">Leads Database</span>
                    </div>
                    <ChevronRight className="w-3.5 h-3.5 text-primary shrink-0" />
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
            <div className="bg-slate-900/80 rounded-lg p-3 border border-slate-800/80 flex items-center justify-between">
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="w-8 h-8 rounded bg-rose-500 text-white font-mono font-bold text-xs flex items-center justify-center shrink-0">
                  {currentUser?.name?.charAt(0) || "A"}
                </div>
                <div className="min-w-0">
                  <div className="font-sans font-bold text-xs text-slate-200 truncate">
                    {currentUser?.name || "System Admin"}
                  </div>
                  <div className="font-mono text-[9px] text-slate-400 truncate">
                    {currentUser?.email || "admin@example.com"}
                  </div>
                </div>
              </div>
              <button
                onClick={handleLogout}
                className="p-1.5 text-slate-400 hover:text-rose-400 hover:bg-slate-800 rounded transition-colors"
                title="Logout"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          </div>
        </aside>

        {/* Main Content Area */}
        <div className="flex-1 min-w-0 overflow-y-auto">
          {/* Top Bar */}
          <header className="bg-white border-b border-slate-200 px-6 py-4 flex flex-wrap items-center justify-between gap-4 sticky top-0 z-20 shadow-sm">
            <div className="flex items-center gap-3">
              <span className="font-mono text-xs text-slate-500 flex items-center gap-1.5">
                <Link href="/dashboard" className="hover:underline text-slate-600">
                  Dashboard
                </Link>
                <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                <span className="text-primary font-bold">Leads Management</span>
              </span>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={handleOpenAddModal}
                className="inline-flex items-center gap-2 px-4 py-2 bg-primary hover:bg-rose-700 text-white font-mono text-xs font-bold uppercase transition-colors shadow-sm"
              >
                <Plus className="w-4 h-4" />
                <span>Add New Lead</span>
              </button>
            </div>
          </header>

          {/* Page Content */}
          <div className="p-6 lg:p-8 space-y-8 max-w-7xl mx-auto">
            {/* Success Banner */}
            {successMsg && (
              <div className="bg-emerald-50 border border-emerald-200 text-emerald-700 font-mono text-xs p-4 flex items-center justify-between rounded shadow-sm">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>{successMsg}</span>
                </div>
                <button onClick={() => setSuccessMsg("")}>
                  <X className="w-4 h-4" />
                </button>
              </div>
            )}

            {/* Header Title */}
            <div>
              <h1 className="font-display font-extrabold text-2xl sm:text-3xl uppercase tracking-tight text-slate-900 mb-1">
                Leads <span className="text-primary">Management & Pipeline</span>
              </h1>
              <p className="font-mono text-xs text-slate-500">
                Connected directly to PostgreSQL database via Express API backend.
              </p>
            </div>

            {/* KPI Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              <div className="bg-white border border-slate-200 p-5 shadow-sm rounded-none">
                <div className="flex justify-between items-start mb-3">
                  <span className="font-mono text-[10px] font-bold text-slate-400 uppercase">
                    Total Active Leads
                  </span>
                  <Users className="w-5 h-5 text-primary" />
                </div>
                <div className="font-display font-extrabold text-3xl text-slate-900">
                  {totalLeads}
                </div>
                <div className="font-mono text-[10px] text-slate-400 mt-1">
                  Live DB Records
                </div>
              </div>

              <div className="bg-white border border-slate-200 p-5 shadow-sm rounded-none">
                <div className="flex justify-between items-start mb-3">
                  <span className="font-mono text-[10px] font-bold text-slate-400 uppercase">
                    Pipeline Value
                  </span>
                  <DollarSign className="w-5 h-5 text-emerald-600" />
                </div>
                <div className="font-display font-extrabold text-3xl text-emerald-600">
                  ${pipelineValue.toLocaleString()}
                </div>
                <div className="font-mono text-[10px] text-slate-400 mt-1">
                  Estimated Deals Total
                </div>
              </div>

              <div className="bg-white border border-slate-200 p-5 shadow-sm rounded-none">
                <div className="flex justify-between items-start mb-3">
                  <span className="font-mono text-[10px] font-bold text-slate-400 uppercase">
                    Proposals Sent
                  </span>
                  <FileCheck className="w-5 h-5 text-amber-500" />
                </div>
                <div className="font-display font-extrabold text-3xl text-amber-500">
                  {proposalSentCount}
                </div>
                <div className="font-mono text-[10px] text-slate-400 mt-1">
                  Active RFC Reviews
                </div>
              </div>

              <div className="bg-white border border-slate-200 p-5 shadow-sm rounded-none">
                <div className="flex justify-between items-start mb-3">
                  <span className="font-mono text-[10px] font-bold text-slate-400 uppercase">
                    Win Conversion
                  </span>
                  <TrendingUp className="w-5 h-5 text-cyan-600" />
                </div>
                <div className="font-display font-extrabold text-3xl text-cyan-600">
                  {winRate}%
                </div>
                <div className="font-mono text-[10px] text-slate-400 mt-1">
                  Closed Deals Ratio
                </div>
              </div>
            </div>

            {/* Filter & Search Bar */}
            <div className="bg-white border border-slate-200 p-4 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="relative w-full md:w-96">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search lead, company, or email..."
                  className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 text-xs font-mono text-slate-800 focus:outline-none focus:border-primary"
                />
              </div>

              <div className="flex items-center gap-3 w-full md:w-auto">
                <Filter className="w-4 h-4 text-slate-400" />
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="bg-slate-50 border border-slate-200 text-xs font-mono text-slate-800 px-4 py-2 focus:outline-none focus:border-primary"
                >
                  <option value="ALL">All Statuses</option>
                  <option value="New">New</option>
                  <option value="Contacted">Contacted</option>
                  <option value="Proposal Sent">Proposal Sent</option>
                  <option value="Closed Won">Closed Won</option>
                  <option value="Closed Lost">Closed Lost</option>
                </select>
              </div>
            </div>

            {/* Data Table */}
            <div className="bg-white border border-slate-200 shadow-sm overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50 font-mono text-[10px] text-slate-500 uppercase">
                    <th className="p-4">Lead Name</th>
                    <th className="p-4">Company</th>
                    <th className="p-4">Contact</th>
                    <th className="p-4">Est. Value</th>
                    <th className="p-4">Pipeline Status</th>
                    <th className="p-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-sans text-xs">
                  {isLeadsLoading ? (
                    <tr>
                      <td colSpan={6} className="p-8 text-center font-mono text-slate-400">
                        Loading leads from database...
                      </td>
                    </tr>
                  ) : filteredLeads.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="p-8 text-center font-mono text-slate-400">
                        No leads found matching query.
                      </td>
                    </tr>
                  ) : (
                    filteredLeads.map((lead) => (
                      <tr key={lead.id} className="hover:bg-slate-50/80 transition-colors">
                        <td className="p-4">
                          <div className="font-bold text-slate-900 text-sm">{lead.name}</div>
                          {lead.notes && (
                            <div className="text-[11px] text-slate-500 truncate max-w-xs mt-0.5">
                              {lead.notes}
                            </div>
                          )}
                        </td>

                        <td className="p-4">
                          <div className="flex items-center gap-1.5 text-slate-700 font-medium">
                            <Building className="w-3.5 h-3.5 text-slate-400" />
                            <span>{lead.company}</span>
                          </div>
                        </td>

                        <td className="p-4 space-y-1">
                          <div className="flex items-center gap-1.5 text-slate-600 font-mono text-[11px]">
                            <Mail className="w-3 h-3 text-slate-400" />
                            <span>{lead.email}</span>
                          </div>
                          {lead.phone && (
                            <div className="flex items-center gap-1.5 text-slate-500 font-mono text-[11px]">
                              <Phone className="w-3 h-3 text-slate-400" />
                              <span>{lead.phone}</span>
                            </div>
                          )}
                        </td>

                        <td className="p-4 font-mono font-bold text-emerald-600">
                          ${(lead.value || 0).toLocaleString()}
                        </td>

                        <td className="p-4">
                          <select
                            value={lead.status}
                            onChange={(e) =>
                              handleStatusChange(lead.id, e.target.value as LeadStatus)
                            }
                            className={`px-3 py-1 font-mono text-[10px] font-bold uppercase border focus:outline-none ${
                              lead.status === "Closed Won"
                                ? "bg-emerald-50 text-emerald-700 border-emerald-300"
                                : lead.status === "Closed Lost"
                                ? "bg-rose-50 text-rose-700 border-rose-300"
                                : lead.status === "Proposal Sent"
                                ? "bg-amber-50 text-amber-700 border-amber-300"
                                : lead.status === "Contacted"
                                ? "bg-blue-50 text-blue-700 border-blue-300"
                                : "bg-slate-100 text-slate-700 border-slate-300"
                            }`}
                          >
                            <option value="New">New</option>
                            <option value="Contacted">Contacted</option>
                            <option value="Proposal Sent">Proposal Sent</option>
                            <option value="Closed Won">Closed Won</option>
                            <option value="Closed Lost">Closed Lost</option>
                          </select>
                        </td>

                        <td className="p-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() => handleOpenEditModal(lead)}
                              className="p-1.5 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded"
                            >
                              <Edit className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDeleteLead(lead.id)}
                              className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>

      {/* Add / Edit Lead Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 w-full max-w-lg p-6 relative shadow-xl rounded-none">
            <div className="flex justify-between items-center mb-6 pb-4 border-b border-slate-200">
              <h2 className="font-display font-extrabold text-lg uppercase text-slate-900">
                {editingLead ? "Edit Lead Dossier" : "Create New Lead"}
              </h2>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {errorMsg && (
              <div className="bg-rose-50 border border-rose-200 text-rose-700 text-xs font-mono p-3 mb-4 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            <form className="space-y-4" onSubmit={handleFormSubmit}>
              <div>
                <label className="block font-mono text-[10px] font-bold text-slate-500 uppercase mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Marcus Vance"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 text-xs font-mono text-slate-800 focus:outline-none focus:border-primary"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-mono text-[10px] font-bold text-slate-500 uppercase mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="name@company.com"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 text-xs font-mono text-slate-800 focus:outline-none focus:border-primary"
                  />
                </div>
                <div>
                  <label className="block font-mono text-[10px] font-bold text-slate-500 uppercase mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+1 (555) 000-0000"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 text-xs font-mono text-slate-800 focus:outline-none focus:border-primary"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-mono text-[10px] font-bold text-slate-500 uppercase mb-1">
                    Company Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    placeholder="e.g. Apex Cement Industries"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 text-xs font-mono text-slate-800 focus:outline-none focus:border-primary"
                  />
                </div>
                <div>
                  <label className="block font-mono text-[10px] font-bold text-slate-500 uppercase mb-1">
                    Est. Deal Value ($)
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={formData.value}
                    onChange={(e) =>
                      setFormData({ ...formData, value: parseFloat(e.target.value) || 0 })
                    }
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 text-xs font-mono text-slate-800 focus:outline-none focus:border-primary"
                  />
                </div>
              </div>

              <div>
                <label className="block font-mono text-[10px] font-bold text-slate-500 uppercase mb-1">
                  Status
                </label>
                <select
                  value={formData.status}
                  onChange={(e) =>
                    setFormData({ ...formData, status: e.target.value as LeadStatus })
                  }
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 text-xs font-mono text-slate-800 focus:outline-none focus:border-primary"
                >
                  <option value="New">New</option>
                  <option value="Contacted">Contacted</option>
                  <option value="Proposal Sent">Proposal Sent</option>
                  <option value="Closed Won">Closed Won</option>
                  <option value="Closed Lost">Closed Lost</option>
                </select>
              </div>

              <div>
                <label className="block font-mono text-[10px] font-bold text-slate-500 uppercase mb-1">
                  Notes / Engineering Scope
                </label>
                <textarea
                  rows={3}
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  placeholder="Details regarding CFD simulation scope or plant upgrade..."
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 text-xs font-mono text-slate-800 focus:outline-none focus:border-primary resize-none"
                />
              </div>

              <div className="pt-4 flex justify-end gap-3 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 bg-slate-100 text-slate-600 font-mono text-xs uppercase hover:bg-slate-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isCreating}
                  className="px-6 py-2 bg-primary text-white font-mono text-xs font-bold uppercase hover:bg-rose-700 disabled:opacity-50"
                >
                  {isCreating ? "Saving..." : editingLead ? "Save Changes" : "Create Lead"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
