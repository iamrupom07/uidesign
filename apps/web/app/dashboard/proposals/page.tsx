"use client";

import { useState, useEffect } from "react";
import {
  useGetSubmissionsQuery,
  useUpdateSubmissionMutation,
  useDeleteSubmissionMutation,
} from "@/redux/api/submissionApi";
import {
  FileText,
  RefreshCw,
  Search,
  CheckCircle2,
  AlertTriangle,
  Building,
  Calendar,
  Eye,
  Trash2,
  Edit3,
  X,
} from "lucide-react";
import { Submission, SubmissionStatus } from "@repo/types";

export default function ProposalsDashboardPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("ALL");

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchQuery);
    }, 250);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Real RFP Submissions via RTK Query
  const {
    data: rfpResponse,
    isLoading: isRfpLoading,
    refetch,
  } = useGetSubmissionsQuery({
    type: "RFP",
    search: debouncedSearch || undefined,
  });

  const [updateSubmission, { isLoading: isUpdating }] = useUpdateSubmissionMutation();
  const [deleteSubmission, { isLoading: isDeleting }] = useDeleteSubmissionMutation();

  const allProposals = rfpResponse?.data || [];
  const proposals = allProposals.filter(
    (p) => statusFilter === "ALL" || p.status === statusFilter
  );

  // Modals State
  const [activeDossier, setActiveDossier] = useState<Submission | null>(null);
  const [editModalItem, setEditModalItem] = useState<Submission | null>(null);
  const [archiveId, setArchiveId] = useState<string | null>(null);
  const [statusMsg, setStatusMsg] = useState<{ type: "success" | "error"; text: string } | null>(
    null
  );

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
      setStatusMsg({ type: "success", text: "RFP Proposal updated successfully!" });
      refetch();
    } catch (err: any) {
      console.error(err);
      setStatusMsg({ type: "error", text: err?.data?.message || "Failed to update RFP proposal." });
    }
  };

  const handleArchive = async (id: string) => {
    try {
      await deleteSubmission(id).unwrap();
      setArchiveId(null);
      if (activeDossier?.id === id) setActiveDossier(null);
      setStatusMsg({ type: "success", text: "Proposal archived successfully!" });
      refetch();
    } catch (err: any) {
      console.error(err);
      setStatusMsg({ type: "error", text: err?.data?.message || "Failed to archive proposal." });
    }
  };

  const getStatusBadge = (status: SubmissionStatus | string) => {
    switch (status) {
      case "NEW":
        return "bg-rose-50 text-rose-700 border border-rose-300";
      case "UNDER_REVIEW":
        return "bg-amber-50 text-amber-700 border border-amber-300";
      case "RESPONDED":
        return "bg-sky-50 text-sky-700 border border-sky-300";
      case "CONVERTED":
        return "bg-emerald-50 text-emerald-700 border border-emerald-300";
      case "ARCHIVED":
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
            RFP <span className="text-primary">Proposals Ledger</span>
          </h1>
          <p className="font-mono text-xs text-slate-500">
            Review industrial RFP scopes, timeline requirements, target budgets, and process parameters.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => refetch()}
            className="px-3.5 py-2 bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 font-mono text-xs flex items-center gap-2 rounded transition-colors shadow-sm"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isRfpLoading ? "animate-spin text-primary" : ""}`} />
            <span>SYNC RFPS</span>
          </button>
        </div>
      </div>

      {/* Status Feedback Banner */}
      {statusMsg && (
        <div
          className={`p-4 rounded font-mono text-xs flex items-center justify-between border ${
            statusMsg.type === "success"
              ? "bg-emerald-50 text-emerald-700 border-emerald-200"
              : "bg-rose-50 text-rose-700 border-rose-200"
          }`}
        >
          <div className="flex items-center gap-2">
            {statusMsg.type === "success" ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            ) : (
              <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0" />
            )}
            <span>{statusMsg.text}</span>
          </div>
          <button onClick={() => setStatusMsg(null)} className="text-slate-400 hover:text-slate-700">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* KPI Stats Summary (White cards) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="bg-white border border-slate-200 rounded p-5 shadow-sm">
          <div className="font-mono text-[10px] uppercase text-slate-400 font-bold">
            Total RFP Scopes
          </div>
          <div className="font-display font-extrabold text-3xl text-slate-900 mt-1">
            {allProposals.length}
          </div>
          <div className="font-mono text-[10px] text-slate-400 mt-1">Project Opportunities</div>
        </div>

        <div className="bg-white border border-slate-200 rounded p-5 shadow-sm border-l-4 border-l-rose-500">
          <div className="font-mono text-[10px] uppercase text-rose-600 font-bold">
            Pending Review
          </div>
          <div className="font-display font-extrabold text-3xl text-rose-600 mt-1">
            {allProposals.filter((p) => p.status === "NEW" || p.status === "UNDER_REVIEW").length}
          </div>
          <div className="font-mono text-[10px] text-slate-400 mt-1">Awaiting Evaluation</div>
        </div>

        <div className="bg-white border border-slate-200 rounded p-5 shadow-sm border-l-4 border-l-sky-500">
          <div className="font-mono text-[10px] uppercase text-sky-600 font-bold">
            In Discussion
          </div>
          <div className="font-display font-extrabold text-3xl text-sky-600 mt-1">
            {allProposals.filter((p) => p.status === "RESPONDED").length}
          </div>
          <div className="font-mono text-[10px] text-slate-400 mt-1">Technical Clarifications</div>
        </div>

        <div className="bg-white border border-slate-200 rounded p-5 shadow-sm border-l-4 border-l-emerald-500">
          <div className="font-mono text-[10px] uppercase text-emerald-600 font-bold">
            Contracted RFPs
          </div>
          <div className="font-display font-extrabold text-3xl text-emerald-600 mt-1">
            {allProposals.filter((p) => p.status === "CONVERTED").length}
          </div>
          <div className="font-mono text-[10px] text-slate-400 mt-1">Proposal Accepted</div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white border border-slate-200 rounded p-4 shadow-sm flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search proposals by sector, company, name, or keywords..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 font-mono text-xs text-slate-800 placeholder:text-slate-400 rounded focus:outline-none focus:border-primary"
          />
        </div>

        {/* Status Pills */}
        <div className="flex flex-wrap items-center gap-1.5 font-mono text-xs">
          {["ALL", "NEW", "UNDER_REVIEW", "RESPONDED", "CONVERTED"].map((status) => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={`px-3 py-1.5 rounded text-[11px] font-bold transition-colors ${
                statusFilter === status
                  ? "bg-primary text-white"
                  : "bg-slate-50 hover:bg-slate-100 text-slate-600 border border-slate-200"
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* RFP Table */}
      <div className="bg-white border border-slate-200 rounded shadow-sm overflow-hidden">
        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full text-left font-mono text-xs text-slate-700 min-w-[750px]">
            <thead className="bg-slate-50 border-b border-slate-200 text-[10px] uppercase font-bold text-slate-500 tracking-wider">
              <tr>
                <th className="py-3 px-4">Client Contact</th>
                <th className="py-3 px-4">Plant Sector</th>
                <th className="py-3 px-4">Target Budget</th>
                <th className="py-3 px-4">Start Timeline</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {isRfpLoading ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-slate-400">
                    <div className="flex items-center justify-center gap-2">
                      <RefreshCw className="w-4 h-4 animate-spin text-primary" />
                      <span>Loading engineering proposals...</span>
                    </div>
                  </td>
                </tr>
              ) : proposals.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-slate-400">
                    No RFP proposals matching this criteria.
                  </td>
                </tr>
              ) : (
                proposals.map((rfp) => (
                  <tr key={rfp.id} className="hover:bg-slate-50 transition-colors group">
                    <td className="py-3.5 px-4">
                      <div className="font-sans font-bold text-sm text-slate-900">{rfp.name}</div>
                      <div className="text-[11px] text-slate-500 mt-0.5">{rfp.email}</div>
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-1.5 text-slate-900 font-bold">
                        <Building className="w-3.5 h-3.5 text-primary" />
                        <span>{rfp.sector || "General Process"}</span>
                      </div>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="text-emerald-600 font-bold">
                        {rfp.budget || "TBD / Custom"}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-slate-600">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3 h-3 text-slate-400" />
                        <span>{rfp.startDate || "Immediate"}</span>
                      </div>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className={`font-mono text-[10px] font-bold px-2.5 py-1 rounded ${getStatusBadge(rfp.status)}`}>
                        {rfp.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => setActiveDossier(rfp)}
                          className="p-1.5 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded transition-colors"
                          title="Inspect Proposal Scope"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => setEditModalItem(rfp)}
                          className="p-1.5 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded transition-colors"
                          title="Update Status"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => setArchiveId(rfp.id)}
                          className="p-1.5 text-slate-500 hover:text-rose-600 hover:bg-slate-100 rounded transition-colors"
                          title="Archive Proposal"
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

      {/* DOSSIER INSPECTOR MODAL */}
      {activeDossier && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white border border-slate-200 rounded max-w-2xl w-full p-6 shadow-2xl max-h-[90vh] overflow-y-auto custom-scrollbar font-mono text-xs text-slate-800">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-5">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-primary" />
                <span className="font-sans font-bold text-sm uppercase text-slate-900 tracking-wider">
                  RFP Specification Dossier #{activeDossier.id.substring(0, 8)}
                </span>
              </div>
              <button onClick={() => setActiveDossier(null)} className="text-slate-400 hover:text-slate-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-4 bg-slate-50 border border-slate-200 rounded">
                <div>
                  <span className="text-[10px] text-slate-400 uppercase block font-bold">Contact Client</span>
                  <span className="text-slate-900 font-bold text-sm">{activeDossier.name}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 uppercase block font-bold">Email Address</span>
                  <span className="text-rose-600 font-semibold">{activeDossier.email}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 uppercase block font-bold">Industrial Sector</span>
                  <span className="text-slate-800 font-bold">{activeDossier.sector || "General Process"}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 uppercase block font-bold">Allocated Budget</span>
                  <span className="text-emerald-600 font-bold">{activeDossier.budget || "TBD"}</span>
                </div>
              </div>

              <div>
                <span className="text-[10px] text-slate-400 uppercase block font-bold mb-1">Target Start Timeline</span>
                <div className="p-3 bg-slate-50 border border-slate-200 rounded text-slate-800 font-bold">
                  {activeDossier.startDate || "Immediate / Within 30 days"}
                </div>
              </div>

              <div>
                <span className="text-[10px] text-slate-400 uppercase block font-bold mb-1">Detailed Technical Scope</span>
                <div className="p-4 bg-slate-50 border border-slate-200 rounded text-slate-700 font-sans text-xs leading-relaxed whitespace-pre-wrap">
                  {activeDossier.message}
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-5 border-t border-slate-100 mt-6">
              <button
                onClick={() => {
                  setActiveDossier(null);
                  setEditModalItem(activeDossier);
                }}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-700 rounded text-xs font-bold uppercase"
              >
                Update Review Status
              </button>
              <button
                onClick={() => setActiveDossier(null)}
                className="px-4 py-2 bg-primary hover:bg-rose-700 text-white font-bold text-xs uppercase rounded shadow-sm"
              >
                Close Spec
              </button>
            </div>
          </div>
        </div>
      )}

      {/* EDIT MODAL */}
      {editModalItem && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white border border-slate-200 rounded max-w-md w-full p-6 shadow-2xl font-mono text-xs text-slate-800">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-4">
              <h3 className="font-sans font-bold text-sm uppercase text-slate-900 tracking-wider">
                Update Proposal #{editModalItem.id.substring(0, 8)}
              </h3>
              <button onClick={() => setEditModalItem(null)} className="text-slate-400 hover:text-slate-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveEdit} className="space-y-4">
              <div>
                <label className="block text-[10px] text-slate-500 uppercase font-bold mb-1">
                  Evaluation Stage
                </label>
                <select
                  value={editModalItem.status}
                  onChange={(e) =>
                    setEditModalItem({ ...editModalItem, status: e.target.value as SubmissionStatus })
                  }
                  className="w-full bg-slate-50 border border-slate-200 px-3 py-2 text-slate-800 rounded focus:outline-none focus:border-primary"
                >
                  <option value="NEW">NEW</option>
                  <option value="UNDER_REVIEW">UNDER_REVIEW</option>
                  <option value="RESPONDED">RESPONDED</option>
                  <option value="CONVERTED">CONVERTED</option>
                  <option value="ARCHIVED">ARCHIVED</option>
                </select>
              </div>

              <div>
                <label className="block text-[10px] text-slate-500 uppercase font-bold mb-1">
                  Engineering Notes
                </label>
                <textarea
                  rows={4}
                  placeholder="Record scope assessment, feasibility notes, or quote delivery..."
                  value={editModalItem.notes || ""}
                  onChange={(e) =>
                    setEditModalItem({ ...editModalItem, notes: e.target.value })
                  }
                  className="w-full bg-slate-50 border border-slate-200 px-3 py-2 text-slate-800 rounded focus:outline-none focus:border-primary"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setEditModalItem(null)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded text-xs font-bold uppercase"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isUpdating}
                  className="px-5 py-2 bg-primary hover:bg-rose-700 text-white font-bold text-xs uppercase rounded transition-colors shadow-sm disabled:opacity-50 flex items-center gap-1.5"
                >
                  {isUpdating && <RefreshCw className="w-3.5 h-3.5 animate-spin" />}
                  <span>Save Proposal</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ARCHIVE CONFIRMATION MODAL */}
      {archiveId && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded max-w-sm w-full p-6 shadow-2xl font-mono text-xs text-center">
            <div className="w-12 h-12 rounded-full bg-rose-50 border border-rose-200 text-rose-600 flex items-center justify-center mx-auto mb-4">
              <Trash2 className="w-6 h-6" />
            </div>
            <h3 className="font-sans font-bold text-base uppercase text-slate-900 mb-2">
              Archive Proposal
            </h3>
            <p className="text-slate-600 text-xs mb-6 font-sans">
              Are you sure you want to permanently archive RFP <strong>{archiveId}</strong>?
            </p>
            <div className="flex items-center justify-center gap-3">
              <button
                onClick={() => setArchiveId(null)}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded text-xs font-bold uppercase"
              >
                Cancel
              </button>
              <button
                onClick={() => handleArchive(archiveId)}
                disabled={isDeleting}
                className="px-5 py-2 bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs uppercase rounded transition-colors shadow-sm"
              >
                {isDeleting ? "Archiving..." : "Confirm Archive"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
