"use client";

import { useState } from "react";
import {
  useGetFinanceRecordsQuery,
  useCreateFinanceRecordMutation,
  useUpdateFinanceRecordMutation,
  useDeleteFinanceRecordMutation,
} from "@/redux/api/financeApi";
import {
  Wallet,
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
  Activity,
  RefreshCw,
  X,
} from "lucide-react";
import { TransactionType, TransactionStatus } from "@repo/types";

export default function FinanceDashboardPage() {
  // Finance Data & RTK Query
  const { data: financeData, isLoading: isFinanceLoading, refetch } = useGetFinanceRecordsQuery();

  const [createRecord, { isLoading: isCreating }] = useCreateFinanceRecordMutation();
  const [updateRecord, { isLoading: isUpdating }] = useUpdateFinanceRecordMutation();
  const [deleteRecord, { isLoading: isDeleting }] = useDeleteFinanceRecordMutation();

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
  const paybackMonths =
    annualFuelSavings > 0 ? ((roiContractFee / annualFuelSavings) * 12).toFixed(1) : "0.0";

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
    const matchesType = typeFilter === "ALL" || rec.type.toLowerCase() === typeFilter.toLowerCase();
    const matchesSector = sectorFilter === "ALL" || rec.sector === sectorFilter;
    return matchesSearch && matchesType && matchesSector;
  });

  // KPI Calculations
  const grossRevenue = records
    .filter((r) => r.type.toLowerCase() === "income" && r.status !== "Pending")
    .reduce((sum, r) => sum + r.amount, 0);

  const totalExpenses = records
    .filter((r) => r.type.toLowerCase() === "expense")
    .reduce((sum, r) => sum + r.amount, 0);

  const netMargin = grossRevenue - totalExpenses;
  const pendingInflows = records
    .filter((r) => r.type.toLowerCase() === "income" && r.status === "Pending")
    .reduce((sum, r) => sum + r.amount, 0);

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
      type: rec.type,
      description: rec.description,
      category: rec.category,
      sector: rec.sector || "General",
      amount: rec.amount,
      client: rec.client || "",
      status: rec.status,
      date: rec.date
        ? new Date(rec.date).toISOString().split("T")[0]
        : new Date().toISOString().split("T")[0],
    });
    setErrorMsg("");
    setShowAddModal(true);
  };

  const handleCloseModal = () => {
    setShowAddModal(false);
    setEditingRecord(null);
    setErrorMsg("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    try {
      if (editingRecord) {
        await updateRecord({
          id: editingRecord.id,
          data: {
            type: formData.type,
            description: formData.description,
            category: formData.category,
            sector: formData.sector,
            amount: Number(formData.amount),
            client: formData.client || undefined,
            status: formData.status,
            date: new Date(formData.date).toISOString(),
          },
        }).unwrap();
        setSuccessMsg("Transaction record updated successfully!");
      } else {
        await createRecord({
          type: formData.type,
          description: formData.description,
          category: formData.category,
          sector: formData.sector,
          amount: Number(formData.amount),
          client: formData.client || undefined,
          status: formData.status,
          date: new Date(formData.date).toISOString(),
        }).unwrap();
        setSuccessMsg("Transaction record created successfully!");
      }
      handleCloseModal();
      refetch();
    } catch (err: any) {
      setErrorMsg(err?.data?.message || err?.message || "Failed to save transaction.");
    }
  };

  const handleDeleteRecord = async (id: string) => {
    if (confirm("Are you sure you want to permanently delete this financial ledger record?")) {
      try {
        await deleteRecord(id).unwrap();
        setSuccessMsg("Transaction deleted.");
        refetch();
      } catch (err) {
        console.error("[Delete Record Error]", err);
      }
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Top Header Title & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <h1 className="font-display font-extrabold text-2xl sm:text-3xl uppercase tracking-tight text-slate-900 mb-1">
            Financial <span className="text-primary">Ledger & Cashflow</span>
          </h1>
          <p className="font-mono text-xs text-slate-500">
            Track recognized engineering income, project disbursements, and industrial plant CFD ROI models.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => refetch()}
            className="p-2 bg-white hover:bg-slate-50 border border-slate-200 text-slate-600 rounded transition-colors shadow-sm"
            title="Refresh Ledger"
          >
            <RefreshCw className={`w-4 h-4 ${isFinanceLoading ? "animate-spin text-primary" : ""}`} />
          </button>
          <button
            onClick={handleOpenAddModal}
            className="inline-flex items-center gap-2 px-4 py-2 bg-primary hover:bg-rose-700 text-white font-mono text-xs font-bold uppercase transition-colors shadow-sm rounded"
          >
            <Plus className="w-4 h-4" />
            <span>Record Transaction</span>
          </button>
        </div>
      </div>

      {/* Success Notification Banner */}
      {successMsg && (
        <div className="bg-emerald-50 border border-emerald-200 text-emerald-700 font-mono text-xs p-4 flex items-center justify-between rounded shadow-sm">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{successMsg}</span>
          </div>
          <button onClick={() => setSuccessMsg("")} className="text-slate-400 hover:text-slate-700">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* KPI Stats Grid (White cards) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="bg-white border border-slate-200 p-5 shadow-sm rounded">
          <div className="flex justify-between items-start mb-3">
            <span className="font-mono text-[10px] font-bold text-slate-400 uppercase">
              Recognized Revenue
            </span>
            <TrendingUp className="w-5 h-5 text-emerald-600" />
          </div>
          <div className="font-display font-extrabold text-3xl text-emerald-600 tracking-tight">
            ${grossRevenue.toLocaleString()}
          </div>
          <div className="font-mono text-[10px] text-slate-400 mt-1">Completed Inflows</div>
        </div>

        <div className="bg-white border border-slate-200 p-5 shadow-sm rounded">
          <div className="flex justify-between items-start mb-3">
            <span className="font-mono text-[10px] font-bold text-slate-400 uppercase">
              Operational Expenses
            </span>
            <TrendingDown className="w-5 h-5 text-rose-600" />
          </div>
          <div className="font-display font-extrabold text-3xl text-rose-600 tracking-tight">
            ${totalExpenses.toLocaleString()}
          </div>
          <div className="font-mono text-[10px] text-slate-400 mt-1">Disbursements & R&D</div>
        </div>

        <div className="bg-white border border-slate-200 p-5 shadow-sm rounded">
          <div className="flex justify-between items-start mb-3">
            <span className="font-mono text-[10px] font-bold text-slate-400 uppercase">
              Net Operating Margin
            </span>
            <DollarSign className="w-5 h-5 text-primary" />
          </div>
          <div className="font-display font-extrabold text-3xl text-slate-900 tracking-tight">
            ${netMargin.toLocaleString()}
          </div>
          <div className="font-mono text-[10px] text-slate-400 mt-1">Operating Profitability</div>
        </div>

        <div className="bg-white border border-slate-200 p-5 shadow-sm rounded">
          <div className="flex justify-between items-start mb-3">
            <span className="font-mono text-[10px] font-bold text-slate-400 uppercase">
              Pending Inflows
            </span>
            <Activity className="w-5 h-5 text-amber-600" />
          </div>
          <div className="font-display font-extrabold text-3xl text-amber-600 tracking-tight">
            ${pendingInflows.toLocaleString()}
          </div>
          <div className="font-mono text-[10px] text-slate-400 mt-1">Awaiting Milestone Payment</div>
        </div>
      </div>

      {/* INDUSTRIAL ROI CALCULATOR (White Card) */}
      <div className="bg-white border border-slate-200 rounded p-6 shadow-sm">
        <div className="flex items-center gap-2.5 pb-4 mb-5 border-b border-slate-100">
          <Calculator className="w-5 h-5 text-primary" />
          <div>
            <h3 className="font-sans font-bold text-sm text-slate-900 uppercase tracking-wider">
              Industrial CFD Simulation ROI Calculator
            </h3>
            <p className="font-mono text-[11px] text-slate-500">
              Interactive plant optimization model to calculate client fuel cost reduction vs consulting contract fees.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-4 font-mono text-xs">
            <div>
              <label className="block text-[10px] text-slate-500 uppercase font-bold mb-1">
                Annual Plant Fuel Expense ($ USD): ${roiPlantFuelCost.toLocaleString()}
              </label>
              <input
                type="range"
                min="500000"
                max="10000000"
                step="250000"
                value={roiPlantFuelCost}
                onChange={(e) => setRoiPlantFuelCost(Number(e.target.value))}
                className="w-full accent-primary"
              />
            </div>
            <div>
              <label className="block text-[10px] text-slate-500 uppercase font-bold mb-1">
                Estimated CFD Thermal Gain (%): {roiCFDEfficiencyGain}%
              </label>
              <input
                type="range"
                min="1.0"
                max="12.0"
                step="0.5"
                value={roiCFDEfficiencyGain}
                onChange={(e) => setRoiCFDEfficiencyGain(Number(e.target.value))}
                className="w-full accent-primary"
              />
            </div>
            <div>
              <label className="block text-[10px] text-slate-500 uppercase font-bold mb-1">
                MACPROTEC Audit & CFD Fee ($): ${roiContractFee.toLocaleString()}
              </label>
              <input
                type="range"
                min="20000"
                max="250000"
                step="5000"
                value={roiContractFee}
                onChange={(e) => setRoiContractFee(Number(e.target.value))}
                className="w-full accent-primary"
              />
            </div>
          </div>

          <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 bg-slate-50 border border-slate-200 rounded flex flex-col justify-between">
              <span className="font-mono text-[10px] text-slate-500 uppercase font-bold">
                Projected Annual Savings
              </span>
              <div className="text-2xl font-display font-extrabold text-emerald-600 mt-2">
                ${annualFuelSavings.toLocaleString()}
              </div>
              <span className="font-mono text-[10px] text-slate-400 mt-2">Per Year Fuel Conservation</span>
            </div>

            <div className="p-4 bg-slate-50 border border-slate-200 rounded flex flex-col justify-between">
              <span className="font-mono text-[10px] text-slate-500 uppercase font-bold">
                Net 1st-Year Financial Gain
              </span>
              <div className="text-2xl font-display font-extrabold text-slate-900 mt-2">
                ${netFirstYearSavings.toLocaleString()}
              </div>
              <span className="font-mono text-[10px] text-slate-400 mt-2">After Full Consulting Cost</span>
            </div>

            <div className="p-4 bg-slate-50 border border-slate-200 rounded flex flex-col justify-between">
              <span className="font-mono text-[10px] text-slate-500 uppercase font-bold">
                Calculated Payback Period
              </span>
              <div className="text-2xl font-display font-extrabold text-primary mt-2">
                {paybackMonths} Mo.
              </div>
              <span className="font-mono text-[10px] text-slate-400 mt-2">Rapid Capital Breakeven</span>
            </div>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white border border-slate-200 rounded p-4 shadow-sm flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search transactions by description, client, or category..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 font-mono text-xs text-slate-800 placeholder:text-slate-400 rounded focus:outline-none focus:border-primary"
          />
        </div>

        {/* Type Filter */}
        <div className="flex flex-wrap items-center gap-1.5 font-mono text-xs">
          <Filter className="w-3.5 h-3.5 text-slate-400 mr-1 hidden sm:inline" />
          {["ALL", "Income", "Expense"].map((t) => (
            <button
              key={t}
              onClick={() => setTypeFilter(t)}
              className={`px-3 py-1.5 rounded text-[11px] font-bold transition-colors ${
                typeFilter.toLowerCase() === t.toLowerCase()
                  ? "bg-primary text-white"
                  : "bg-slate-50 hover:bg-slate-100 text-slate-600 border border-slate-200"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Ledger Data Table */}
      <div className="bg-white border border-slate-200 rounded shadow-sm overflow-hidden">
        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full text-left font-mono text-xs text-slate-700 min-w-[750px]">
            <thead className="bg-slate-50 border-b border-slate-200 text-[10px] uppercase font-bold text-slate-500 tracking-wider">
              <tr>
                <th className="py-3 px-4">Type</th>
                <th className="py-3 px-4">Transaction Details</th>
                <th className="py-3 px-4">Category / Sector</th>
                <th className="py-3 px-4">Amount ($ USD)</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Date</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {isFinanceLoading ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-slate-400">
                    <div className="flex items-center justify-center gap-2">
                      <RefreshCw className="w-4 h-4 animate-spin text-primary" />
                      <span>Loading corporate ledger...</span>
                    </div>
                  </td>
                </tr>
              ) : filteredRecords.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-slate-400">
                    No financial ledger transactions found matching criteria.
                  </td>
                </tr>
              ) : (
                filteredRecords.map((rec) => (
                  <tr key={rec.id} className="hover:bg-slate-50 transition-colors group">
                    <td className="py-3.5 px-4">
                      <span
                        className={`font-mono text-[9px] font-bold px-2 py-0.5 rounded ${
                          rec.type.toLowerCase() === "income"
                            ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                            : "bg-rose-50 text-rose-700 border border-rose-200"
                        }`}
                      >
                        {rec.type.toUpperCase()}
                      </span>
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="font-sans font-bold text-sm text-slate-900">{rec.description}</div>
                      {rec.client && (
                        <div className="flex items-center gap-1 text-[11px] text-slate-500 mt-0.5">
                          <Building className="w-3 h-3 text-slate-400" />
                          <span>{rec.client}</span>
                        </div>
                      )}
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="text-slate-900 font-semibold">{rec.category}</div>
                      {rec.sector && (
                        <div className="text-[10px] text-slate-500 font-mono mt-0.5">{rec.sector}</div>
                      )}
                    </td>
                    <td className="py-3.5 px-4">
                      <span
                        className={`font-bold text-sm ${
                          rec.type.toLowerCase() === "income" ? "text-emerald-600" : "text-rose-600"
                        }`}
                      >
                        {rec.type.toLowerCase() === "income" ? "+" : "-"}${rec.amount.toLocaleString()}
                      </span>
                    </td>
                    <td className="py-3.5 px-4">
                      <span
                        className={`font-mono text-[9px] font-bold px-2 py-0.5 rounded ${
                          rec.status === "Completed"
                            ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                            : "bg-amber-50 text-amber-700 border border-amber-200"
                        }`}
                      >
                        {rec.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-[11px] text-slate-500">
                      {new Date(rec.date).toLocaleDateString()}
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleOpenEditModal(rec)}
                          className="p-1.5 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded transition-colors"
                          title="Edit Transaction"
                        >
                          <Edit className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDeleteRecord(rec.id)}
                          className="p-1.5 text-slate-500 hover:text-rose-600 hover:bg-slate-100 rounded transition-colors"
                          title="Delete Transaction"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
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

      {/* ADD / EDIT TRANSACTION MODAL */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white border border-slate-200 rounded max-w-lg w-full p-6 shadow-2xl font-mono text-xs text-slate-800 space-y-4">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <h3 className="font-sans font-bold text-base uppercase text-slate-900 flex items-center gap-2">
                <Wallet className="w-4 h-4 text-primary" />
                <span>{editingRecord ? "Edit Ledger Entry" : "Record New Financial Transaction"}</span>
              </h3>
              <button onClick={handleCloseModal} className="text-slate-400 hover:text-slate-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            {errorMsg && (
              <div className="bg-rose-50 border border-rose-200 text-rose-700 p-3 rounded flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 text-primary" />
                <span>{errorMsg}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[9px] text-slate-500 uppercase font-bold mb-1">
                    Entry Type *
                  </label>
                  <select
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value as TransactionType })}
                    className="w-full bg-slate-50 border border-slate-200 p-2 text-slate-800 rounded focus:outline-none focus:border-primary"
                  >
                    <option value="Income">Income (+)</option>
                    <option value="Expense">Expense (-)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[9px] text-slate-500 uppercase font-bold mb-1">
                    Amount ($ USD) *
                  </label>
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    required
                    placeholder="45000"
                    value={formData.amount}
                    onChange={(e) => setFormData({ ...formData, amount: Number(e.target.value) })}
                    className="w-full bg-slate-50 border border-slate-200 p-2 text-slate-800 rounded focus:outline-none focus:border-primary"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[9px] text-slate-500 uppercase font-bold mb-1">
                  Description / Milestone Summary *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. CFD Kiln Aerodynamics Milestone 1"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 p-2 text-slate-800 rounded focus:outline-none focus:border-primary"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[9px] text-slate-500 uppercase font-bold mb-1">
                    Client / Vendor
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Holcim Cement Corp"
                    value={formData.client}
                    onChange={(e) => setFormData({ ...formData, client: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 p-2 text-slate-800 rounded focus:outline-none focus:border-primary"
                  />
                </div>
                <div>
                  <label className="block text-[9px] text-slate-500 uppercase font-bold mb-1">
                    Sector
                  </label>
                  <select
                    value={formData.sector}
                    onChange={(e) => setFormData({ ...formData, sector: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 p-2 text-slate-800 rounded focus:outline-none focus:border-primary"
                  >
                    <option value="Cement">Cement</option>
                    <option value="Steel">Steel</option>
                    <option value="Power & Energy">Power & Energy</option>
                    <option value="Oil & Gas">Oil & Gas</option>
                    <option value="Mining">Mining</option>
                    <option value="Heavy Engineering">Heavy Engineering</option>
                    <option value="General">General</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[9px] text-slate-500 uppercase font-bold mb-1">
                    Status
                  </label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value as TransactionStatus })}
                    className="w-full bg-slate-50 border border-slate-200 p-2 text-slate-800 rounded focus:outline-none focus:border-primary"
                  >
                    <option value="Completed">Completed</option>
                    <option value="Pending">Pending</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[9px] text-slate-500 uppercase font-bold mb-1">
                    Transaction Date
                  </label>
                  <input
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 p-2 text-slate-800 rounded focus:outline-none focus:border-primary"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs rounded transition-colors font-bold uppercase"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isCreating || isUpdating}
                  className="px-5 py-2 bg-primary hover:bg-rose-700 text-white font-bold text-xs uppercase rounded transition-colors shadow-sm disabled:opacity-50 flex items-center gap-1.5"
                >
                  {(isCreating || isUpdating) && <RefreshCw className="w-3.5 h-3.5 animate-spin" />}
                  <span>{editingRecord ? "Save Changes" : "Save Transaction"}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
