"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import TechnicalCursor from "@/components/ui/TechnicalCursor";
import { useGetMeQuery, useLogoutMutation } from "@/redux/api/authApi";
import {
  useGetFinanceRecordsQuery,
  useCreateFinanceRecordMutation,
  useUpdateFinanceRecordMutation,
  useDeleteFinanceRecordMutation,
} from "@/redux/api/financeApi";
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
  TrendingDown,
  Calculator,
  CheckCircle2,
  Trash2,
  Edit,
  Building,
  AlertCircle,
  Zap,
  Activity,
} from "lucide-react";
import { TransactionType, TransactionStatus } from "@repo/types";

export default function FinanceDashboardPage() {
  const router = useRouter();
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  // Auth Protection
  const { data: userData, isLoading: isAuthLoading, isError: isAuthError } = useGetMeQuery();
  const [logout] = useLogoutMutation();

  useEffect(() => {
    if (!isAuthLoading && (isAuthError || !userData?.data)) {
      router.push("/login");
    } else if (!isAuthLoading && userData?.data && userData.data.role === "EMPLOYEE") {
      router.push("/dashboard");
    }
  }, [isAuthLoading, isAuthError, userData, router]);

  // Finance Data & RTK Query
  const { data: financeData, isLoading: isFinanceLoading, refetch } = useGetFinanceRecordsQuery(
    undefined,
    { skip: !userData?.data }
  );

  const [createRecord, { isLoading: isCreating }] = useCreateFinanceRecordMutation();
  const [updateRecord] = useUpdateFinanceRecordMutation();
  const [deleteRecord] = useDeleteFinanceRecordMutation();

  // State
  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState<string>("ALL");
  const [sectorFilter, setSectorFilter] = useState<string>("ALL");
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingRecord, setEditingRecord] = useState<any>(null);

  // Industrial ROI Calculator State
  const [roiPlantFuelCost, setRoiPlantFuelCost] = useState(2500000); // $2.5M/yr default
  const [roiCFDEfficiencyGain, setRoiCFDEfficiencyGain] = useState(4.5); // 4.5% efficiency
  const [roiContractFee, setRoiContractFee] = useState(65000); // $65,000 contract

  // Calculated ROI values
  const annualFuelSavings = roiPlantFuelCost * (roiCFDEfficiencyGain / 100);
  const netFirstYearSavings = annualFuelSavings - roiContractFee;
  const paybackMonths = annualFuelSavings > 0 ? ((roiContractFee / annualFuelSavings) * 12).toFixed(1) : "0.0";

  // Form State
  const [formData, setFormData] = useState({
    type: "Income" as TransactionType,
    description: "",
    category: "CFD Simulation Contract",
    sector: "Cement",
    amount: 0,
    client: "",
    status: "Completed" as TransactionStatus,
    date: new Date().toISOString().split("T")[0],
  });

  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const records = financeData?.data || [];

  // Filtered Records
  const filteredRecords = records.filter((rec) => {
    const matchesSearch =
      rec.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      rec.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (rec.client && rec.client.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesType = typeFilter === "ALL" || rec.type === typeFilter;
    const matchesSector = sectorFilter === "ALL" || rec.sector === sectorFilter;
    return matchesSearch && matchesType && matchesSector;
  });

  // KPI Calculations
  const grossRevenue = records
    .filter((r) => r.type === "Income" && r.status !== "Pending")
    .reduce((sum, r) => sum + r.amount, 0);

  const totalExpenses = records
    .filter((r) => r.type === "Expense")
    .reduce((sum, r) => sum + r.amount, 0);

  const netMargin = grossRevenue - totalExpenses;
  const marginPercentage = grossRevenue > 0 ? ((netMargin / grossRevenue) * 100).toFixed(1) : "0.0";

  const outstandingInvoices = records
    .filter((r) => r.status === "Invoiced" || r.status === "Pending")
    .reduce((sum, r) => sum + r.amount, 0);

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
    setEditingRecord(null);
    setFormData({
      type: "Income",
      description: "",
      category: "CFD Simulation Contract",
      sector: "Cement",
      amount: 0,
      client: "",
      status: "Completed",
      date: new Date().toISOString().split("T")[0],
    });
    setErrorMsg("");
    setShowAddModal(true);
  };

  const handleOpenEditModal = (rec: any) => {
    setEditingRecord(rec);
    setFormData({
      type: rec.type as TransactionType,
      description: rec.description,
      category: rec.category,
      sector: rec.sector,
      amount: rec.amount,
      client: rec.client || "",
      status: rec.status as TransactionStatus,
      date: rec.date ? rec.date.split("T")[0] : new Date().toISOString().split("T")[0],
    });
    setErrorMsg("");
    setShowAddModal(true);
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");

    try {
      if (editingRecord) {
        await updateRecord({
          id: editingRecord.id,
          data: formData,
        }).unwrap();
        setSuccessMsg("Transaction updated successfully!");
      } else {
        await createRecord(formData).unwrap();
        setSuccessMsg("Transaction added successfully!");
      }

      setShowAddModal(false);
      refetch();
    } catch (err: any) {
      console.error("[Finance Save Error]", err);
      setErrorMsg(err?.data?.message || "Failed to save record. Please check inputs.");
    }
  };

  const handleStatusChange = async (id: string, newStatus: TransactionStatus) => {
    try {
      await updateRecord({
        id,
        data: { status: newStatus },
      }).unwrap();
      refetch();
    } catch (err) {
      console.error("[Update Status Error]", err);
    }
  };

  const handleDeleteRecord = async (id: string) => {
    if (confirm("Are you sure you want to delete this financial record?")) {
      try {
        await deleteRecord(id).unwrap();
        refetch();
      } catch (err) {
        console.error("[Delete Record Error]", err);
      }
    }
  };

  if (isAuthLoading) {
    return (
      <main className="min-h-screen bg-slate-950 text-white flex items-center justify-center font-mono">
        <div className="flex items-center gap-3">
          <span className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin" />
          <span>AUTHENTICATING FINANCIAL CONTROL SYSTEM...</span>
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
                FINANCE CONTROL
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
                      FIN
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
                  <Link
                    href="/dashboard/finance"
                    className="w-full flex items-center justify-between px-3 py-2.5 text-xs font-mono rounded transition-all duration-150 group bg-rose-500/10 text-white font-bold border-l-2 border-primary"
                  >
                    <div className="flex items-center gap-3">
                      <Wallet className="w-4 h-4 text-primary" />
                      <span>Finance Ledger</span>
                    </div>
                    <ChevronRight className="w-3.5 h-3.5 text-primary shrink-0" />
                  </Link>

                  <Link
                    href="/dashboard/Invoice"
                    className="w-full flex items-center justify-between px-3 py-2.5 text-xs font-mono rounded transition-all duration-150 group text-slate-400 hover:bg-slate-900 hover:text-slate-200"
                  >
                    <div className="flex items-center gap-3">
                      <Receipt className="w-4 h-4 text-slate-400 group-hover:text-slate-200" />
                      <span>Invoice Creator</span>
                    </div>
                  </Link>

                  <Link
                    href="/dashboard/employees"
                    className="w-full flex items-center justify-between px-3 py-2.5 text-xs font-mono rounded transition-all duration-150 group text-slate-400 hover:bg-slate-900 hover:text-slate-200"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <Users className="w-4 h-4 shrink-0 text-slate-400 group-hover:text-slate-200" />
                      <span className="truncate">Employee Directory</span>
                    </div>
                  </Link>

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
                <span className="text-primary font-bold">Finance & Industrial ROI</span>
              </span>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={handleOpenAddModal}
                className="inline-flex items-center gap-2 px-4 py-2 bg-primary hover:bg-rose-700 text-white font-mono text-xs font-bold uppercase transition-colors shadow-sm"
              >
                <Plus className="w-4 h-4" />
                <span>Record Transaction</span>
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
                Industrial Engineering <span className="text-primary">Finance & Operations</span>
              </h1>
              <p className="font-mono text-xs text-slate-500">
                Tracking CFD engineering contracts, 3D laser scanning projects, and plant optimization revenue in Neon Cloud PostgreSQL.
              </p>
            </div>

            {/* KPI Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              <div className="bg-white border border-slate-200 p-5 shadow-sm rounded-none">
                <div className="flex justify-between items-start mb-3">
                  <span className="font-mono text-[10px] font-bold text-slate-400 uppercase">
                    Gross Revenue YTD
                  </span>
                  <DollarSign className="w-5 h-5 text-emerald-600" />
                </div>
                <div className="font-display font-extrabold text-3xl text-emerald-600">
                  ${grossRevenue.toLocaleString()}
                </div>
                <div className="font-mono text-[10px] text-slate-400 mt-1 flex items-center gap-1">
                  <TrendingUp className="w-3 h-3 text-emerald-500" />
                  <span>Completed Contracts</span>
                </div>
              </div>

              <div className="bg-white border border-slate-200 p-5 shadow-sm rounded-none">
                <div className="flex justify-between items-start mb-3">
                  <span className="font-mono text-[10px] font-bold text-slate-400 uppercase">
                    Operating Expenses
                  </span>
                  <TrendingDown className="w-5 h-5 text-rose-500" />
                </div>
                <div className="font-display font-extrabold text-3xl text-rose-600">
                  ${totalExpenses.toLocaleString()}
                </div>
                <div className="font-mono text-[10px] text-slate-400 mt-1">
                  Software, Software & Staff
                </div>
              </div>

              <div className="bg-white border border-slate-200 p-5 shadow-sm rounded-none">
                <div className="flex justify-between items-start mb-3">
                  <span className="font-mono text-[10px] font-bold text-slate-400 uppercase">
                    Net Operating Profit
                  </span>
                  <Zap className="w-5 h-5 text-primary" />
                </div>
                <div className="font-display font-extrabold text-3xl text-slate-900">
                  ${netMargin.toLocaleString()}
                </div>
                <div className="font-mono text-[10px] text-primary font-bold mt-1">
                  {marginPercentage}% Net Margin
                </div>
              </div>

              <div className="bg-white border border-slate-200 p-5 shadow-sm rounded-none">
                <div className="flex justify-between items-start mb-3">
                  <span className="font-mono text-[10px] font-bold text-slate-400 uppercase">
                    Accounts Receivable
                  </span>
                  <Wallet className="w-5 h-5 text-amber-500" />
                </div>
                <div className="font-display font-extrabold text-3xl text-amber-500">
                  ${outstandingInvoices.toLocaleString()}
                </div>
                <div className="font-mono text-[10px] text-slate-400 mt-1">
                  Invoiced / Pending Review
                </div>
              </div>
            </div>

            {/* Industrial CFD & Energy Savings ROI Calculator */}
            <div className="bg-slate-900 text-white p-6 sm:p-8 border border-slate-800 shadow-xl relative overflow-hidden">
              <div className="font-mono text-[10px] font-bold text-primary uppercase tracking-widest mb-2 flex items-center gap-2">
                <Calculator className="w-4 h-4 text-primary" /> INDUSTRIAL CLIENT ROI SIMULATOR
              </div>
              <h2 className="font-display font-extrabold text-xl sm:text-2xl uppercase tracking-tight text-white mb-2">
                Plant Energy Savings vs <span className="text-primary">CFD Simulation Cost</span>
              </h2>
              <p className="font-sans text-xs text-slate-300 max-w-3xl mb-6">
                Estimate client payback period and annual fuel savings when pitching MACPROTEC CFD Simulation & Calciner Optimization contracts to Cement, Steel, and Power plants.
              </p>

              <div className="grid md:grid-cols-3 gap-6 pt-4 border-t border-slate-800">
                <div>
                  <label className="block font-mono text-[10px] text-slate-400 uppercase mb-2">
                    Client Annual Energy/Fuel Cost ($)
                  </label>
                  <input
                    type="number"
                    value={roiPlantFuelCost}
                    onChange={(e) => setRoiPlantFuelCost(parseFloat(e.target.value) || 0)}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 font-mono text-xs text-emerald-400 focus:outline-none focus:border-primary"
                  />
                  <div className="font-mono text-[9px] text-slate-500 mt-1">
                    e.g. $2.5M/yr for 5,000 tpd cement plant
                  </div>
                </div>

                <div>
                  <label className="block font-mono text-[10px] text-slate-400 uppercase mb-2">
                    CFD Thermal/Flow Gain (%)
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    value={roiCFDEfficiencyGain}
                    onChange={(e) => setRoiCFDEfficiencyGain(parseFloat(e.target.value) || 0)}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 font-mono text-xs text-cyan-400 focus:outline-none focus:border-primary"
                  />
                  <div className="font-mono text-[9px] text-slate-500 mt-1">
                    Typical 2.5% - 6.0% efficiency boost
                  </div>
                </div>

                <div>
                  <label className="block font-mono text-[10px] text-slate-400 uppercase mb-2">
                    MACPROTEC Simulation Fee ($)
                  </label>
                  <input
                    type="number"
                    value={roiContractFee}
                    onChange={(e) => setRoiContractFee(parseFloat(e.target.value) || 0)}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 font-mono text-xs text-primary focus:outline-none focus:border-primary"
                  />
                  <div className="font-mono text-[9px] text-slate-500 mt-1">
                    Turnkey 3D CFD modeling package
                  </div>
                </div>
              </div>

              {/* Calculator Output */}
              <div className="mt-6 pt-6 border-t border-slate-800/80 grid sm:grid-cols-3 gap-4 font-mono text-center">
                <div className="bg-slate-950 p-4 border border-slate-800">
                  <div className="text-[10px] text-slate-400 uppercase">Estimated Annual Fuel Savings</div>
                  <div className="text-xl font-bold text-emerald-400 mt-1">
                    ${annualFuelSavings.toLocaleString()} / yr
                  </div>
                </div>

                <div className="bg-slate-950 p-4 border border-slate-800">
                  <div className="text-[10px] text-slate-400 uppercase">Net 1st-Year Client Profit</div>
                  <div className="text-xl font-bold text-cyan-400 mt-1">
                    ${netFirstYearSavings.toLocaleString()}
                  </div>
                </div>

                <div className="bg-slate-950 p-4 border border-slate-800">
                  <div className="text-[10px] text-slate-400 uppercase">Payback Period</div>
                  <div className="text-xl font-bold text-amber-400 mt-1">
                    {paybackMonths} Months
                  </div>
                </div>
              </div>
            </div>

            {/* Filter & Search Bar */}
            <div className="bg-white border border-slate-200 p-4 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="relative w-full md:w-80">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search contract, client, or category..."
                  className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 text-xs font-mono text-slate-800 focus:outline-none focus:border-primary"
                />
              </div>

              <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
                <div className="flex items-center gap-2">
                  <Filter className="w-4 h-4 text-slate-400" />
                  <select
                    value={typeFilter}
                    onChange={(e) => setTypeFilter(e.target.value)}
                    className="bg-slate-50 border border-slate-200 text-xs font-mono text-slate-800 px-3 py-2 focus:outline-none focus:border-primary"
                  >
                    <option value="ALL">All Types</option>
                    <option value="Income">Income (+)</option>
                    <option value="Expense">Expense (-)</option>
                  </select>
                </div>

                <select
                  value={sectorFilter}
                  onChange={(e) => setSectorFilter(e.target.value)}
                  className="bg-slate-50 border border-slate-200 text-xs font-mono text-slate-800 px-3 py-2 focus:outline-none focus:border-primary"
                >
                  <option value="ALL">All Sectors</option>
                  <option value="Cement">Cement</option>
                  <option value="Steel">Steel & Metallurgy</option>
                  <option value="Power">Power Generation</option>
                  <option value="Oil & Gas">Oil & Gas / Chemical</option>
                  <option value="Mining">Mining & Bulk Handling</option>
                  <option value="Corporate">Corporate / Internal</option>
                </select>
              </div>
            </div>

            {/* Data Table */}
            <div className="bg-white border border-slate-200 shadow-sm overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50 font-mono text-[10px] text-slate-500 uppercase">
                    <th className="p-4">Description & Scope</th>
                    <th className="p-4">Category</th>
                    <th className="p-4">Sector</th>
                    <th className="p-4">Client</th>
                    <th className="p-4">Amount</th>
                    <th className="p-4">Status</th>
                    <th className="p-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-sans text-xs">
                  {isFinanceLoading ? (
                    <tr>
                      <td colSpan={7} className="p-8 text-center font-mono text-slate-400">
                        Loading financial records from database...
                      </td>
                    </tr>
                  ) : filteredRecords.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="p-8 text-center font-mono text-slate-400">
                        No transactions found matching query.
                      </td>
                    </tr>
                  ) : (
                    filteredRecords.map((rec) => (
                      <tr key={rec.id} className="hover:bg-slate-50/80 transition-colors">
                        <td className="p-4">
                          <div className="font-bold text-slate-900 text-sm flex items-center gap-2">
                            <span
                              className={`px-1.5 py-0.5 font-mono text-[9px] font-bold uppercase rounded ${
                                rec.type === "Income"
                                  ? "bg-emerald-100 text-emerald-800"
                                  : "bg-rose-100 text-rose-800"
                              }`}
                            >
                              {rec.type}
                            </span>
                            <span>{rec.description}</span>
                          </div>
                          <div className="text-[10px] font-mono text-slate-400 mt-1">
                            Date: {rec.date ? new Date(rec.date).toLocaleDateString() : "N/A"}
                          </div>
                        </td>

                        <td className="p-4">
                          <span className="font-mono text-[11px] font-semibold text-slate-700 bg-slate-100 px-2 py-1 border border-slate-200">
                            {rec.category}
                          </span>
                        </td>

                        <td className="p-4">
                          <div className="flex items-center gap-1.5 text-slate-700 font-medium">
                            <Building className="w-3.5 h-3.5 text-slate-400" />
                            <span>{rec.sector}</span>
                          </div>
                        </td>

                        <td className="p-4 font-mono text-slate-600">
                          {rec.client || "N/A"}
                        </td>

                        <td className="p-4 font-mono font-bold">
                          <span
                            className={rec.type === "Income" ? "text-emerald-600" : "text-rose-600"}
                          >
                            {rec.type === "Income" ? "+" : "-"}${rec.amount.toLocaleString()}
                          </span>
                        </td>

                        <td className="p-4">
                          <select
                            value={rec.status}
                            onChange={(e) =>
                              handleStatusChange(rec.id, e.target.value as TransactionStatus)
                            }
                            className={`px-3 py-1 font-mono text-[10px] font-bold uppercase border focus:outline-none ${
                              rec.status === "Completed"
                                ? "bg-emerald-50 text-emerald-700 border-emerald-300"
                                : rec.status === "Pending"
                                ? "bg-amber-50 text-amber-700 border-amber-300"
                                : "bg-blue-50 text-blue-700 border-blue-300"
                            }`}
                          >
                            <option value="Completed">Completed</option>
                            <option value="Invoiced">Invoiced</option>
                            <option value="Pending">Pending</option>
                          </select>
                        </td>

                        <td className="p-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() => handleOpenEditModal(rec)}
                              className="p-1.5 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded"
                            >
                              <Edit className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDeleteRecord(rec.id)}
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

      {/* Add / Edit Transaction Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 w-full max-w-lg p-6 relative shadow-xl rounded-none">
            <div className="flex justify-between items-center mb-6 pb-4 border-b border-slate-200">
              <h2 className="font-display font-extrabold text-lg uppercase text-slate-900">
                {editingRecord ? "Edit Financial Record" : "Record New Transaction"}
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
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-mono text-[10px] font-bold text-slate-500 uppercase mb-1">
                    Transaction Type *
                  </label>
                  <select
                    value={formData.type}
                    onChange={(e) =>
                      setFormData({ ...formData, type: e.target.value as TransactionType })
                    }
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 text-xs font-mono text-slate-800 focus:outline-none focus:border-primary"
                  >
                    <option value="Income">Income (+)</option>
                    <option value="Expense">Expense (-)</option>
                  </select>
                </div>
                <div>
                  <label className="block font-mono text-[10px] font-bold text-slate-500 uppercase mb-1">
                    Amount ($) *
                  </label>
                  <input
                    type="number"
                    required
                    min="0.01"
                    step="0.01"
                    value={formData.amount}
                    onChange={(e) =>
                      setFormData({ ...formData, amount: parseFloat(e.target.value) || 0 })
                    }
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 text-xs font-mono text-slate-800 focus:outline-none focus:border-primary"
                  />
                </div>
              </div>

              <div>
                <label className="block font-mono text-[10px] font-bold text-slate-500 uppercase mb-1">
                  Description / Contract Title *
                </label>
                <input
                  type="text"
                  required
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="e.g. Kiln Burner CFD Optimization Contract"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 text-xs font-mono text-slate-800 focus:outline-none focus:border-primary"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-mono text-[10px] font-bold text-slate-500 uppercase mb-1">
                    Category *
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 text-xs font-mono text-slate-800 focus:outline-none focus:border-primary"
                  >
                    <option value="CFD Simulation Contract">CFD Simulation Contract</option>
                    <option value="3D Laser Scanning Project">3D Laser Scanning Project</option>
                    <option value="Process Optimization EPC">Process Optimization EPC</option>
                    <option value="FEA Structural Analysis">FEA Structural Analysis</option>
                    <option value="Software License Fee">Software License Fee</option>
                    <option value="Engineering Salaries">Engineering Salaries</option>
                    <option value="Operational Expense">Operational Expense</option>
                  </select>
                </div>
                <div>
                  <label className="block font-mono text-[10px] font-bold text-slate-500 uppercase mb-1">
                    Industrial Sector *
                  </label>
                  <select
                    value={formData.sector}
                    onChange={(e) => setFormData({ ...formData, sector: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 text-xs font-mono text-slate-800 focus:outline-none focus:border-primary"
                  >
                    <option value="Cement">Cement</option>
                    <option value="Steel">Steel & Metallurgy</option>
                    <option value="Power">Power Generation</option>
                    <option value="Oil & Gas">Oil & Gas / Chemical</option>
                    <option value="Mining">Mining & Bulk Handling</option>
                    <option value="Corporate">Corporate / Internal</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-mono text-[10px] font-bold text-slate-500 uppercase mb-1">
                    Client Name / Supplier
                  </label>
                  <input
                    type="text"
                    value={formData.client}
                    onChange={(e) => setFormData({ ...formData, client: e.target.value })}
                    placeholder="e.g. Holcim Cement Corp"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 text-xs font-mono text-slate-800 focus:outline-none focus:border-primary"
                  />
                </div>
                <div>
                  <label className="block font-mono text-[10px] font-bold text-slate-500 uppercase mb-1">
                    Status
                  </label>
                  <select
                    value={formData.status}
                    onChange={(e) =>
                      setFormData({ ...formData, status: e.target.value as TransactionStatus })
                    }
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 text-xs font-mono text-slate-800 focus:outline-none focus:border-primary"
                  >
                    <option value="Completed">Completed</option>
                    <option value="Invoiced">Invoiced</option>
                    <option value="Pending">Pending</option>
                  </select>
                </div>
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
                  {isCreating ? "Saving..." : editingRecord ? "Save Changes" : "Record Transaction"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
