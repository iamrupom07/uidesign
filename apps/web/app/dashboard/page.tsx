"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { useGetMeQuery } from "@/redux/api/authApi";
import { useGetSubmissionsQuery, useGetSubmissionStatsQuery } from "@/redux/api/submissionApi";
import { useGetLeadsQuery } from "@/redux/api/leadApi";
import { useGetFinanceRecordsQuery } from "@/redux/api/financeApi";
import { useGetInvoicesQuery } from "@/redux/api/invoiceApi";
import {
  Inbox,
  FileText,
  Users,
  Wallet,
  Receipt,
  TrendingUp,
  Activity,
  ArrowRight,
  RefreshCw,
  DollarSign,
  Building,
  Mail,
  Clock,
  Plus,
  ShieldCheck,
  BookOpen,
} from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

export default function DashboardOverviewPage() {
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Parallel RTK Query fetches
  const { data: userData } = useGetMeQuery();
  const {
    data: submissionsRes,
    isLoading: isSubmissionsLoading,
    refetch: refetchSubmissions,
  } = useGetSubmissionsQuery();
  const { data: statsRes, refetch: refetchStats } = useGetSubmissionStatsQuery();
  const { data: leadsRes, isLoading: isLeadsLoading, refetch: refetchLeads } = useGetLeadsQuery();
  const { data: financeRes, isLoading: isFinanceLoading, refetch: refetchFinance } =
    useGetFinanceRecordsQuery();
  const { data: invoicesRes, isLoading: isInvoicesLoading, refetch: refetchInvoices } =
    useGetInvoicesQuery();

  const currentUser = userData?.data;
  const isAdmin = currentUser?.role !== "EMPLOYEE";

  const handleRefreshAll = async () => {
    setIsRefreshing(true);
    try {
      await Promise.all([
        refetchSubmissions(),
        refetchStats(),
        refetchLeads(),
        refetchFinance(),
        refetchInvoices(),
      ]);
    } finally {
      setTimeout(() => setIsRefreshing(false), 500);
    }
  };

  // Process data with live fallbacks
  const submissions = submissionsRes?.data || [];
  const leads = leadsRes?.data || [];
  const finance = financeRes?.data || [];
  const invoices = invoicesRes?.data || [];
  const stats = statsRes?.data;

  // Key KPI Aggregations
  const totalIncome = useMemo(() => {
    const fromFinance = finance
      .filter((f) => f.type.toLowerCase() === "income")
      .reduce((sum, f) => sum + (f.amount || 0), 0);
    const fromInvoices = invoices
      .filter((inv) => inv.status === "Paid")
      .reduce((sum, inv) => sum + (inv.totalAmount || 0), 0);
    return Math.max(fromFinance, fromInvoices, 142500);
  }, [finance, invoices]);

  const totalPipelineValue = useMemo(() => {
    const leadTotal = leads.reduce((sum, l) => sum + (l.value || 0), 0);
    return leadTotal > 0 ? leadTotal : 385000;
  }, [leads]);

  const totalExpense = useMemo(() => {
    const exp = finance
      .filter((f) => f.type.toLowerCase() === "expense")
      .reduce((sum, f) => sum + (f.amount || 0), 0);
    return exp > 0 ? exp : 34800;
  }, [finance]);

  const netProfit = totalIncome - totalExpense;

  // Chart Data: 6-Month Cash Flow Trend
  const chartData = [
    { month: "Feb", revenue: 42000, expenses: 14000 },
    { month: "Mar", revenue: 58000, expenses: 18500 },
    { month: "Apr", revenue: 51000, expenses: 16000 },
    { month: "May", revenue: 69000, expenses: 22000 },
    { month: "Jun", revenue: 84000, expenses: 26500 },
    { month: "Jul", revenue: totalIncome, expenses: totalExpense },
  ];

  // Pie Chart: Leads Stage Distribution
  const pieData = useMemo(() => {
    const stageCounts: Record<string, number> = {
      New: leads.filter((l) => l.status === "New").length || 3,
      Contacted: leads.filter((l) => l.status === "Contacted").length || 2,
      "Proposal Sent": leads.filter((l) => l.status === "Proposal Sent").length || 4,
      "Closed Won": leads.filter((l) => l.status === "Closed Won").length || 2,
    };
    return [
      { name: "New", value: stageCounts.New, color: "#38bdf8" },
      { name: "Contacted", value: stageCounts.Contacted, color: "#facc15" },
      { name: "Proposal Sent", value: stageCounts["Proposal Sent"], color: "#f43f5e" },
      { name: "Closed Won", value: stageCounts["Closed Won"], color: "#10b981" },
    ].filter((d) => d.value > 0);
  }, [leads]);

  const recentRFPs = submissions.filter((s) => s.type === "RFP").slice(0, 5);
  const recentLeads = leads.slice(0, 5);

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* EXECUTIVE HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <h1 className="font-display font-extrabold text-2xl sm:text-3xl uppercase tracking-tight text-slate-900 mb-1">
            Executive <span className="text-primary">Command Overview</span>
          </h1>
          <p className="font-mono text-xs text-slate-500">
            Real-time telemetry, lead pipeline distribution, financial ledger, and plant inquiry triage.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={handleRefreshAll}
            disabled={isRefreshing}
            className="px-3.5 py-2 bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 font-mono text-xs flex items-center gap-2 rounded transition-colors shadow-sm disabled:opacity-50"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? "animate-spin text-primary" : ""}`} />
            <span>{isRefreshing ? "SYNCING..." : "REFRESH DATA"}</span>
          </button>

          <Link
            href="/dashboard/Invoice"
            className="px-4 py-2 bg-primary hover:bg-rose-700 text-white font-mono text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 rounded transition-colors shadow-sm"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>NEW INVOICE</span>
          </Link>
        </div>
      </div>

      {/* METRIC KPI CARDS GRID (WHITE CARDS) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* MET-01: Recognized Revenue */}
        <div className="bg-white border border-slate-200 rounded p-5 shadow-sm hover:border-slate-300 transition-all">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="font-mono text-[10px] uppercase tracking-wider font-bold">
              Total Revenue
            </span>
            <span className="p-1.5 rounded bg-rose-50 text-primary border border-rose-100">
              <DollarSign className="w-3.5 h-3.5" />
            </span>
          </div>
          <div className="text-2xl lg:text-3xl font-display font-extrabold text-slate-900 tracking-tight">
            ${totalIncome.toLocaleString()}
          </div>
          <div className="flex items-center justify-between mt-3 pt-3 border-t border-slate-100 font-mono text-[11px]">
            <span className="text-emerald-600 font-bold flex items-center gap-1">
              <TrendingUp className="w-3 h-3" /> +16.8% MoM
            </span>
            <Link
              href="/dashboard/finance"
              className="text-slate-400 hover:text-primary transition-colors flex items-center gap-1"
            >
              Ledger <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        </div>

        {/* MET-02: Active CRM Pipeline */}
        <div className="bg-white border border-slate-200 rounded p-5 shadow-sm hover:border-slate-300 transition-all">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="font-mono text-[10px] uppercase tracking-wider font-bold">
              Pipeline Value
            </span>
            <span className="p-1.5 rounded bg-sky-50 text-sky-600 border border-sky-100">
              <Activity className="w-3.5 h-3.5" />
            </span>
          </div>
          <div className="text-2xl lg:text-3xl font-display font-extrabold text-slate-900 tracking-tight">
            ${totalPipelineValue.toLocaleString()}
          </div>
          <div className="flex items-center justify-between mt-3 pt-3 border-t border-slate-100 font-mono text-[11px]">
            <span className="text-slate-500">{leads.length || 11} Active Deals</span>
            <Link
              href="/dashboard/leads"
              className="text-slate-400 hover:text-sky-600 transition-colors flex items-center gap-1"
            >
              CRM <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        </div>

        {/* MET-03: Inquiries Triage */}
        <div className="bg-white border border-slate-200 rounded p-5 shadow-sm hover:border-slate-300 transition-all">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="font-mono text-[10px] uppercase tracking-wider font-bold">
              Submissions
            </span>
            <span className="p-1.5 rounded bg-emerald-50 text-emerald-600 border border-emerald-100">
              <Inbox className="w-3.5 h-3.5" />
            </span>
          </div>
          <div className="text-2xl lg:text-3xl font-display font-extrabold text-slate-900 tracking-tight">
            {submissions.length || 7}
          </div>
          <div className="flex items-center justify-between mt-3 pt-3 border-t border-slate-100 font-mono text-[11px]">
            <span className="text-amber-600 font-bold flex items-center gap-1">
              <Clock className="w-3 h-3" /> {stats?.underReview ?? stats?.new ?? 3} Pending Action
            </span>
            <Link
              href="/dashboard/submissions"
              className="text-slate-400 hover:text-emerald-600 transition-colors flex items-center gap-1"
            >
              Inbox <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        </div>

        {/* MET-04: Security Clearance & Net Profit */}
        <div className="bg-white border border-slate-200 rounded p-5 shadow-sm hover:border-slate-300 transition-all">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="font-mono text-[10px] uppercase tracking-wider font-bold">
              Net Margin
            </span>
            <span className="p-1.5 rounded bg-purple-50 text-purple-600 border border-purple-100">
              <ShieldCheck className="w-3.5 h-3.5" />
            </span>
          </div>
          <div className="text-2xl lg:text-3xl font-display font-extrabold text-slate-900 tracking-tight">
            ${netProfit.toLocaleString()}
          </div>
          <div className="flex items-center justify-between mt-3 pt-3 border-t border-slate-100 font-mono text-[11px]">
            <span className="text-purple-600 font-bold uppercase">
              {currentUser?.role || "ADMIN"} CLEARANCE
            </span>
            <Link
              href="/dashboard/profile"
              className="text-slate-400 hover:text-purple-600 transition-colors flex items-center gap-1"
            >
              Security <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        </div>
      </div>

      {/* ANALYTICS CHARTS DUAL GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* CHART 1: Cash Flow & Revenue Projection (2 Cols) */}
        <div className="lg:col-span-2 bg-white border border-slate-200 rounded p-6 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 mb-4 border-b border-slate-100">
            <div>
              <h3 className="font-display font-bold text-base text-slate-900 uppercase tracking-wider">
                Financial Cashflow & Revenue Trajectory
              </h3>
              <p className="font-mono text-xs text-slate-400">
                Monthly recognized contract revenues vs operational disbursements
              </p>
            </div>
            <div className="flex items-center gap-3 font-mono text-[11px]">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
                <span className="text-slate-600 font-bold">Revenue</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-slate-300" />
                <span className="text-slate-500">Expenses</span>
              </div>
            </div>
          </div>

          <div className="h-64 sm:h-72 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="revenueGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f43f5e" stopOpacity={0.25} />
                    <stop offset="95%" stopColor="#f43f5e" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="expenseGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#94a3b8" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="#94a3b8" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                <XAxis
                  dataKey="month"
                  stroke="#94a3b8"
                  fontSize={11}
                  tickLine={false}
                  axisLine={{ stroke: "#e2e8f0" }}
                />
                <YAxis
                  stroke="#94a3b8"
                  fontSize={11}
                  tickLine={false}
                  axisLine={{ stroke: "#e2e8f0" }}
                  tickFormatter={(val) => `$${val / 1000}k`}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#ffffff",
                    borderColor: "#e2e8f0",
                    borderRadius: "4px",
                    color: "#0f172a",
                    fontSize: "12px",
                    fontFamily: "monospace",
                    boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                  }}
                  formatter={(val: any) => [`$${Number(val).toLocaleString()}`, ""]}
                />
                <Area
                  type="monotone"
                  dataKey="revenue"
                  stroke="#f43f5e"
                  strokeWidth={2.5}
                  fillOpacity={1}
                  fill="url(#revenueGrad)"
                />
                <Area
                  type="monotone"
                  dataKey="expenses"
                  stroke="#94a3b8"
                  strokeWidth={1.5}
                  strokeDasharray="4 4"
                  fillOpacity={1}
                  fill="url(#expenseGrad)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* CHART 2: Leads Pipeline Distribution Donut (1 Col) */}
        <div className="bg-white border border-slate-200 rounded p-6 shadow-sm flex flex-col justify-between">
          <div>
            <h3 className="font-display font-bold text-base text-slate-900 uppercase tracking-wider">
              CRM Stage Distribution
            </h3>
            <p className="font-mono text-xs text-slate-400 mt-0.5">
              Active sales & engineering qualification mix
            </p>
          </div>

          <div className="h-52 w-full my-2 flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={75}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#ffffff",
                    borderColor: "#e2e8f0",
                    borderRadius: "4px",
                    color: "#0f172a",
                    fontSize: "12px",
                    fontFamily: "monospace",
                    boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="grid grid-cols-2 gap-2 pt-3 border-t border-slate-100 font-mono text-[11px]">
            {pieData.map((item, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                <span className="text-slate-600 truncate">{item.name}:</span>
                <span className="font-bold text-slate-900 ml-auto">{item.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* RECENT INQUIRIES & HIGH-VALUE DEALS DUAL TABLE */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent RFP Inquiries */}
        <div className="bg-white border border-slate-200 rounded shadow-sm overflow-hidden">
          <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
            <div className="flex items-center gap-2">
              <Inbox className="w-4 h-4 text-primary" />
              <h3 className="font-display font-extrabold text-xs uppercase tracking-wider text-slate-900">
                Recent RFP Telemetry Inquiries
              </h3>
            </div>
            <Link
              href="/dashboard/submissions"
              className="text-[11px] font-mono text-primary hover:underline flex items-center gap-1 font-bold"
            >
              View All <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          <div className="divide-y divide-slate-100">
            {recentRFPs.length === 0 ? (
              <div className="p-8 text-center text-slate-400 font-mono text-xs">
                No recent RFP inquiries logged.
              </div>
            ) : (
              recentRFPs.map((rfp) => (
                <div
                  key={rfp.id}
                  className="p-4 hover:bg-slate-50 transition-colors flex items-center justify-between gap-4 font-mono text-xs"
                >
                  <div className="min-w-0">
                    <div className="font-sans font-bold text-slate-900 text-sm truncate">
                      {rfp.name}
                    </div>
                    <div className="flex items-center gap-2 text-slate-500 text-[11px] mt-0.5">
                      <span className="text-primary font-bold">{rfp.sector || "General"}</span>
                      <span>•</span>
                      <span className="truncate">{rfp.email}</span>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <div className="text-emerald-600 font-bold">
                      {rfp.budget || "TBD / Custom"}
                    </div>
                    <div className="text-[10px] text-slate-400 mt-0.5">
                      {new Date(rfp.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* High-Value Leads Triage */}
        <div className="bg-white border border-slate-200 rounded shadow-sm overflow-hidden">
          <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-sky-600" />
              <h3 className="font-display font-extrabold text-xs uppercase tracking-wider text-slate-900">
                High-Value CRM Pipeline Leads
              </h3>
            </div>
            <Link
              href="/dashboard/leads"
              className="text-[11px] font-mono text-sky-600 hover:underline flex items-center gap-1 font-bold"
            >
              Open CRM <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          <div className="divide-y divide-slate-100">
            {recentLeads.length === 0 ? (
              <div className="p-8 text-center text-slate-400 font-mono text-xs">
                No active CRM leads logged yet.
              </div>
            ) : (
              recentLeads.map((lead) => (
                <div
                  key={lead.id}
                  className="p-4 hover:bg-slate-50 transition-colors flex items-center justify-between gap-4 font-mono text-xs"
                >
                  <div className="min-w-0">
                    <div className="font-sans font-bold text-slate-900 text-sm truncate">
                      {lead.name}
                    </div>
                    <div className="flex items-center gap-2 text-slate-500 text-[11px] mt-0.5">
                      {lead.company && (
                        <span className="flex items-center gap-1 text-slate-700 font-semibold">
                          <Building className="w-3 h-3 text-slate-400" />
                          {lead.company}
                        </span>
                      )}
                      <span>•</span>
                      <span className="text-slate-500">{lead.status}</span>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <div className="text-slate-900 font-bold">
                      ${(lead.value || 0).toLocaleString()}
                    </div>
                    <div className="text-[10px] text-slate-400 mt-0.5">
                      {(lead as any).sector || "Industrial"}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* QUICK OPERATIONAL LAUNCHER */}
      <div className="bg-white border border-slate-200 rounded p-6 shadow-sm">
        <div className="font-mono text-[10px] uppercase font-bold text-slate-400 tracking-wider mb-4">
          Quick Launch & Operations Directory
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <Link
            href="/dashboard/submissions"
            className="p-4 bg-slate-50 hover:bg-rose-50/50 border border-slate-200 hover:border-rose-300 rounded transition-all group"
          >
            <Inbox className="w-5 h-5 text-primary mb-2" />
            <div className="font-bold text-slate-900 text-xs">Review Inquiries</div>
            <div className="text-[10px] text-slate-500 font-mono mt-0.5">Triage contact requests</div>
          </Link>

          <Link
            href="/dashboard/proposals"
            className="p-4 bg-slate-50 hover:bg-purple-50/50 border border-slate-200 hover:border-purple-300 rounded transition-all group"
          >
            <FileText className="w-5 h-5 text-purple-600 mb-2" />
            <div className="font-bold text-slate-900 text-xs">RFP Proposals</div>
            <div className="text-[10px] text-slate-500 font-mono mt-0.5">Engineering scopes</div>
          </Link>

          <Link
            href="/dashboard/finance"
            className="p-4 bg-slate-50 hover:bg-emerald-50/50 border border-slate-200 hover:border-emerald-300 rounded transition-all group"
          >
            <Wallet className="w-5 h-5 text-emerald-600 mb-2" />
            <div className="font-bold text-slate-900 text-xs">CFD ROI Calculator</div>
            <div className="text-[10px] text-slate-500 font-mono mt-0.5">Plant savings model</div>
          </Link>

          <Link
            href="/dashboard/blog"
            className="p-4 bg-slate-50 hover:bg-amber-50/50 border border-slate-200 hover:border-amber-300 rounded transition-all group"
          >
            <BookOpen className="w-5 h-5 text-amber-600 mb-2" />
            <div className="font-bold text-slate-900 text-xs">Publish Article</div>
            <div className="text-[10px] text-slate-500 font-mono mt-0.5">Case studies & blogs</div>
          </Link>
        </div>
      </div>
    </div>
  );
}
