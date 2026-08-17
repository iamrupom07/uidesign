"use client";

import { useState } from "react";
import {
  useGetLeadsQuery,
  useCreateLeadMutation,
  useUpdateLeadMutation,
  useDeleteLeadMutation,
} from "@/redux/api/leadApi";
import {
  Users,
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
  X,
  RefreshCw,
} from "lucide-react";
import { LeadStatus } from "@repo/types";

export default function LeadsDashboardPage() {
  // Lead Data & RTK Query
  const { data: leadsData, isLoading: isLeadsLoading, refetch } = useGetLeadsQuery();

  const [createLead, { isLoading: isCreating }] = useCreateLeadMutation();
  const [updateLead, { isLoading: isUpdating }] = useUpdateLeadMutation();
  const [deleteLead, { isLoading: isDeleting }] = useDeleteLeadMutation();

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
      value: lead.value,
      status: lead.status,
      notes: lead.notes || "",
    });
    setErrorMsg("");
    setShowAddModal(true);
  };

  const handleCloseModal = () => {
    setShowAddModal(false);
    setEditingLead(null);
    setErrorMsg("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    try {
      if (editingLead) {
        await updateLead({
          id: editingLead.id,
          data: {
            name: formData.name,
            email: formData.email,
            phone: formData.phone || undefined,
            company: formData.company,
            value: Number(formData.value),
            status: formData.status,
            notes: formData.notes || undefined,
          },
        }).unwrap();
        setSuccessMsg("Lead updated successfully!");
      } else {
        await createLead({
          name: formData.name,
          email: formData.email,
          phone: formData.phone || undefined,
          company: formData.company,
          value: Number(formData.value),
          status: formData.status,
          notes: formData.notes || undefined,
        }).unwrap();
        setSuccessMsg("Lead created successfully!");
      }
      handleCloseModal();
      refetch();
    } catch (err: any) {
      setErrorMsg(err?.data?.message || err?.message || "Failed to save lead.");
    }
  };

  const handleDeleteLead = async (id: string) => {
    if (confirm("Are you sure you want to delete this lead?")) {
      try {
        await deleteLead(id).unwrap();
        setSuccessMsg("Lead deleted.");
        refetch();
      } catch (err) {
        console.error("[Delete Lead Error]", err);
      }
    }
  };

  const getStatusBadge = (status: LeadStatus) => {
    switch (status) {
      case "New":
        return "bg-sky-50 text-sky-700 border border-sky-300";
      case "Contacted":
        return "bg-amber-50 text-amber-700 border border-amber-300";
      case "Proposal Sent":
        return "bg-rose-50 text-rose-700 border border-rose-300";
      case "Closed Won":
        return "bg-emerald-50 text-emerald-700 border border-emerald-300";
      case "Closed Lost":
        return "bg-slate-100 text-slate-600 border border-slate-300";
      default:
        return "bg-slate-100 text-slate-600 border border-slate-300";
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Top Header Title & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <h1 className="font-display font-extrabold text-2xl sm:text-3xl uppercase tracking-tight text-slate-900 mb-1">
            Leads <span className="text-primary">& Pipeline Management</span>
          </h1>
          <p className="font-mono text-xs text-slate-500">
            Track industrial plant prospects, contract opportunity values, and conversion milestones.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => refetch()}
            className="p-2 bg-white hover:bg-slate-50 border border-slate-200 text-slate-600 rounded transition-colors shadow-sm"
            title="Refresh Leads"
          >
            <RefreshCw className={`w-4 h-4 ${isLeadsLoading ? "animate-spin text-primary" : ""}`} />
          </button>
          <button
            onClick={handleOpenAddModal}
            className="inline-flex items-center gap-2 px-4 py-2 bg-primary hover:bg-rose-700 text-white font-mono text-xs font-bold uppercase transition-colors shadow-sm rounded"
          >
            <Plus className="w-4 h-4" />
            <span>Create New Lead</span>
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
              Total Prospects
            </span>
            <Users className="w-5 h-5 text-primary" />
          </div>
          <div className="font-display font-extrabold text-3xl text-slate-900">
            {totalLeads}
          </div>
          <div className="font-mono text-[10px] text-slate-400 mt-1">Total Plant Leads</div>
        </div>

        <div className="bg-white border border-slate-200 p-5 shadow-sm rounded">
          <div className="flex justify-between items-start mb-3">
            <span className="font-mono text-[10px] font-bold text-slate-400 uppercase">
              Pipeline Value
            </span>
            <TrendingUp className="w-5 h-5 text-sky-600" />
          </div>
          <div className="font-display font-extrabold text-3xl text-sky-600">
            ${pipelineValue.toLocaleString()}
          </div>
          <div className="font-mono text-[10px] text-slate-400 mt-1">Active Deal Worth</div>
        </div>

        <div className="bg-white border border-slate-200 p-5 shadow-sm rounded">
          <div className="flex justify-between items-start mb-3">
            <span className="font-mono text-[10px] font-bold text-slate-400 uppercase">
              Proposals Sent
            </span>
            <FileCheck className="w-5 h-5 text-rose-500" />
          </div>
          <div className="font-display font-extrabold text-3xl text-rose-500">
            {proposalSentCount}
          </div>
          <div className="font-mono text-[10px] text-slate-400 mt-1">Pending Client Approval</div>
        </div>

        <div className="bg-white border border-slate-200 p-5 shadow-sm rounded">
          <div className="flex justify-between items-start mb-3">
            <span className="font-mono text-[10px] font-bold text-slate-400 uppercase">
              Closed Won
            </span>
            <CheckCircle2 className="w-5 h-5 text-emerald-600" />
          </div>
          <div className="font-display font-extrabold text-3xl text-emerald-600">
            {closedWonCount}
          </div>
          <div className="font-mono text-[10px] text-slate-400 mt-1">Converted Contracts</div>
        </div>
      </div>

      {/* Filter & Search Toolbar */}
      <div className="bg-white border border-slate-200 p-4 shadow-sm flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 rounded">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search leads by name, company, or email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 font-mono text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-primary rounded"
          />
        </div>

        <div className="flex items-center gap-1 overflow-x-auto py-1 scrollbar-none font-mono text-xs">
          {["ALL", "New", "Contacted", "Proposal Sent", "Closed Won", "Closed Lost"].map(
            (st) => (
              <button
                key={st}
                onClick={() => setStatusFilter(st)}
                className={`px-3 py-1.5 font-mono text-xs uppercase font-bold transition-all shrink-0 border rounded ${
                  statusFilter === st
                    ? "bg-primary text-white border-primary"
                    : "bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100"
                }`}
              >
                {st}
              </button>
            )
          )}
        </div>
      </div>

      {/* Leads Table */}
      <div className="bg-white border border-slate-200 shadow-sm rounded overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-primary" />
            <h3 className="font-display font-extrabold text-xs uppercase tracking-wider text-slate-900">
              Active CRM Leads Directory ({filteredLeads.length})
            </h3>
          </div>
        </div>

        {isLeadsLoading ? (
          <div className="py-16 text-center font-mono text-slate-500 text-xs flex items-center justify-center gap-3">
            <RefreshCw className="w-4 h-4 animate-spin text-primary" />
            FETCHING LEADS DATA...
          </div>
        ) : filteredLeads.length === 0 ? (
          <div className="py-16 text-center font-mono text-slate-500 text-xs">
            <Users className="w-10 h-10 mx-auto mb-3 text-slate-300" />
            No leads match current criteria.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left font-mono text-xs">
              <thead className="bg-slate-50 text-slate-500 uppercase text-[9px] tracking-wider border-b border-slate-200">
                <tr>
                  <th className="px-6 py-3.5">Lead Contact</th>
                  <th className="px-6 py-3.5">Company / Org</th>
                  <th className="px-6 py-3.5">Opportunity Value</th>
                  <th className="px-6 py-3.5">Pipeline Stage</th>
                  <th className="px-6 py-3.5">Created Date</th>
                  <th className="px-6 py-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {filteredLeads.map((lead) => (
                  <tr key={lead.id} className="hover:bg-slate-50 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="font-bold text-slate-900">{lead.name}</div>
                      <div className="text-[11px] text-slate-500 flex items-center gap-3 mt-0.5">
                        <span className="flex items-center gap-1">
                          <Mail className="w-3 h-3 text-slate-400" />
                          {lead.email}
                        </span>
                        {lead.phone && (
                          <span className="flex items-center gap-1">
                            <Phone className="w-3 h-3 text-slate-400" />
                            {lead.phone}
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1.5 font-bold text-slate-800">
                        <Building className="w-3.5 h-3.5 text-slate-400" />
                        <span>{lead.company}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 font-bold text-sm text-slate-900">
                      ${(lead.value || 0).toLocaleString()}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`font-mono text-[10px] font-bold px-2.5 py-1 rounded ${getStatusBadge(
                          lead.status
                        )}`}
                      >
                        {lead.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-slate-500 text-[11px]">
                      {new Date(lead.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => handleOpenEditModal(lead)}
                          className="p-1.5 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded transition-colors"
                          title="Edit Lead"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteLead(lead.id)}
                          className="p-1.5 text-slate-500 hover:text-rose-600 hover:bg-slate-100 rounded transition-colors"
                          title="Delete Lead"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* ADD / EDIT LEAD MODAL */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white border border-slate-200 max-w-lg w-full p-6 shadow-2xl rounded font-mono text-xs space-y-4">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <h3 className="font-sans font-bold text-base uppercase text-slate-900 flex items-center gap-2">
                <Users className="w-4 h-4 text-primary" />
                <span>{editingLead ? "Edit Lead Opportunity" : "Create New Lead"}</span>
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
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[9px] text-slate-500 uppercase font-bold mb-1">
                    Contact Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Johnathan Davis"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 p-2 text-slate-800 rounded focus:outline-none focus:border-primary"
                  />
                </div>
                <div>
                  <label className="block text-[9px] text-slate-500 uppercase font-bold mb-1">
                    Company Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Heidelberg Materials"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 p-2 text-slate-800 rounded focus:outline-none focus:border-primary"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[9px] text-slate-500 uppercase font-bold mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="j.davis@company.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 p-2 text-slate-800 rounded focus:outline-none focus:border-primary"
                  />
                </div>
                <div>
                  <label className="block text-[9px] text-slate-500 uppercase font-bold mb-1">
                    Phone Number
                  </label>
                  <input
                    type="text"
                    placeholder="+1 (555) 0192"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 p-2 text-slate-800 rounded focus:outline-none focus:border-primary"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[9px] text-slate-500 uppercase font-bold mb-1">
                    Estimated Deal Value ($ USD) *
                  </label>
                  <input
                    type="number"
                    min="0"
                    required
                    value={formData.value}
                    onChange={(e) => setFormData({ ...formData, value: Number(e.target.value) })}
                    className="w-full bg-slate-50 border border-slate-200 p-2 text-slate-800 rounded focus:outline-none focus:border-primary"
                  />
                </div>
                <div>
                  <label className="block text-[9px] text-slate-500 uppercase font-bold mb-1">
                    Pipeline Stage
                  </label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value as LeadStatus })}
                    className="w-full bg-slate-50 border border-slate-200 p-2 text-slate-800 rounded focus:outline-none focus:border-primary"
                  >
                    <option value="New">New</option>
                    <option value="Contacted">Contacted</option>
                    <option value="Proposal Sent">Proposal Sent</option>
                    <option value="Closed Won">Closed Won</option>
                    <option value="Closed Lost">Closed Lost</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[9px] text-slate-500 uppercase font-bold mb-1">
                  Opportunity Notes
                </label>
                <textarea
                  rows={3}
                  placeholder="Record scope notes or requirements..."
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 p-2 text-slate-800 rounded focus:outline-none focus:border-primary"
                />
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
                  <span>{editingLead ? "Save Changes" : "Create Lead"}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
