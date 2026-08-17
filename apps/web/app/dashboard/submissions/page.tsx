"use client";

import { useState, useEffect } from "react";
import {
  useGetSubmissionsQuery,
  useUpdateSubmissionMutation,
  useDeleteSubmissionMutation,
  useGetSubmissionStatsQuery,
} from "@/redux/api/submissionApi";
import {
  Inbox,
  RefreshCw,
  Search,
  CheckCircle2,
  AlertTriangle,
  Eye,
  Trash2,
  Edit3,
  X,
  Filter,
} from "lucide-react";
import { Submission, SubmissionStatus } from "@repo/types";

export default function SubmissionsDashboardPage() {
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

  // Real Submissions Data from RTK Query (debounced search)
  const {
    data: submissionsResponse,
    isLoading: isSubmissionsLoading,
    refetch,
  } = useGetSubmissionsQuery({
    type: selectedType !== "ALL" ? selectedType : undefined,
    status: selectedStatus !== "ALL" ? selectedStatus : undefined,
    search: debouncedSearch || undefined,
  });

  const { data: statsResponse } = useGetSubmissionStatsQuery();
  const [updateSubmission, { isLoading: isUpdating }] = useUpdateSubmissionMutation();
  const [deleteSubmission, { isLoading: isDeleting }] = useDeleteSubmissionMutation();

  const submissions = submissionsResponse?.data || [];
  const stats = statsResponse?.data;

  // Modals State
  const [activeDossier, setActiveDossier] = useState<Submission | null>(null);
  const [editModalItem, setEditModalItem] = useState<Submission | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [statusMsg, setStatusMsg] = useState<{ type: "success" | "error"; text: string } | null>(
    null
  );

  // Edit Form state
  const [editNotes, setEditNotes] = useState("");
  const [editStatus, setEditStatus] = useState<SubmissionStatus>("NEW");

  const openDossier = (item: Submission) => {
    setActiveDossier(item);
    if (item.status === "NEW") {
      updateSubmission({
        id: item.id,
        data: { status: "UNDER_REVIEW" },
      }).catch((err) => console.error(err));
    }
  };

  const openEditModal = (item: Submission) => {
    setEditModalItem(item);
    setEditNotes(item.notes || "");
    setEditStatus((item.status as SubmissionStatus) || "NEW");
  };

  const handleSaveEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editModalItem) return;

    try {
      await updateSubmission({
        id: editModalItem.id,
        data: {
          status: editStatus,
          notes: editNotes,
        },
      }).unwrap();
      setStatusMsg({ type: "success", text: "Submission records updated successfully." });
      setEditModalItem(null);
      refetch();
    } catch (err: any) {
      setStatusMsg({ type: "error", text: err?.data?.message || "Failed to update record." });
    }
  };

  const confirmDelete = async () => {
    if (!deleteId) return;

    try {
      await deleteSubmission(deleteId).unwrap();
      setStatusMsg({ type: "success", text: `Record ${deleteId} permanently purged.` });
      setDeleteId(null);
      refetch();
    } catch (err: any) {
      setStatusMsg({ type: "error", text: err?.data?.message || "Failed to delete record." });
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
            Submissions & <span className="text-primary">Inquiries Telemetry</span>
          </h1>
          <p className="font-mono text-xs text-slate-500">
            Triage customer general contact requests, engineering audits, and plant proposal inquiries.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => refetch()}
            className="px-3.5 py-2 bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 font-mono text-xs flex items-center gap-2 rounded transition-colors shadow-sm"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isSubmissionsLoading ? "animate-spin text-primary" : ""}`} />
            <span>REFRESH FEED</span>
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

      {/* KPI Counters Grid (White cards) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="bg-white border border-slate-200 rounded p-5 shadow-sm">
          <div className="font-mono text-[10px] uppercase text-slate-400 font-bold">
            Total Submissions
          </div>
          <div className="font-display font-extrabold text-3xl text-slate-900 mt-1">
            {stats?.total ?? submissions.length}
          </div>
          <div className="font-mono text-[10px] text-slate-400 mt-1">All Recorded Inquiries</div>
        </div>

        <div className="bg-white border border-slate-200 rounded p-5 shadow-sm border-l-4 border-l-rose-500">
          <div className="font-mono text-[10px] uppercase text-rose-600 font-bold">
            New Unread
          </div>
          <div className="font-display font-extrabold text-3xl text-rose-600 mt-1">
            {stats?.new ?? 0}
          </div>
          <div className="font-mono text-[10px] text-slate-400 mt-1">Pending Initial Review</div>
        </div>

        <div className="bg-white border border-slate-200 rounded p-5 shadow-sm border-l-4 border-l-purple-500">
          <div className="font-mono text-[10px] uppercase text-purple-600 font-bold">
            RFP Scopes
          </div>
          <div className="font-display font-extrabold text-3xl text-purple-600 mt-1">
            {stats?.rfpCount ?? submissions.filter((s) => s.type === "RFP").length}
          </div>
          <div className="font-mono text-[10px] text-slate-400 mt-1">Engineering Proposals</div>
        </div>

        <div className="bg-white border border-slate-200 rounded p-5 shadow-sm border-l-4 border-l-emerald-500">
          <div className="font-mono text-[10px] uppercase text-emerald-600 font-bold">
            Converted Leads
          </div>
          <div className="font-display font-extrabold text-3xl text-emerald-600 mt-1">
            {stats?.converted ?? 0}
          </div>
          <div className="font-mono text-[10px] text-slate-400 mt-1">Client Engagement Initiated</div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white border border-slate-200 rounded p-4 shadow-sm flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search inquiries by name, subject, or message keyword..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 font-mono text-xs text-slate-800 placeholder:text-slate-400 rounded focus:outline-none focus:border-primary"
          />
        </div>

        {/* Type Filter */}
        <div className="flex flex-wrap items-center gap-1.5 font-mono text-xs">
          <Filter className="w-3.5 h-3.5 text-slate-400 mr-1 hidden sm:inline" />
          {["ALL", "CONTACT", "RFP", "INQUIRY"].map((t) => (
            <button
              key={t}
              onClick={() => setSelectedType(t)}
              className={`px-3 py-1.5 rounded text-[11px] font-bold transition-colors ${
                selectedType === t
                  ? "bg-primary text-white"
                  : "bg-slate-50 hover:bg-slate-100 text-slate-600 border border-slate-200"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Data Table */}
      <div className="bg-white border border-slate-200 rounded shadow-sm overflow-hidden">
        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full text-left font-mono text-xs text-slate-700 min-w-[750px]">
            <thead className="bg-slate-50 border-b border-slate-200 text-[10px] uppercase font-bold text-slate-500 tracking-wider">
              <tr>
                <th className="py-3 px-4">Contact / Sender</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Subject & Excerpt</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Date Logged</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {isSubmissionsLoading ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-slate-400">
                    <div className="flex items-center justify-center gap-2">
                      <RefreshCw className="w-4 h-4 animate-spin text-primary" />
                      <span>Loading telemetry inbox...</span>
                    </div>
                  </td>
                </tr>
              ) : submissions.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-slate-400">
                    No submissions found matching the criteria.
                  </td>
                </tr>
              ) : (
                submissions.map((sub) => (
                  <tr key={sub.id} className="hover:bg-slate-50 transition-colors group">
                    <td className="py-3.5 px-4">
                      <div className="font-sans font-bold text-sm text-slate-900">{sub.name}</div>
                      <div className="text-[11px] text-slate-500 mt-0.5">{sub.email}</div>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="font-mono text-[9px] font-bold px-2 py-0.5 rounded bg-rose-50 text-rose-700 border border-rose-200">
                        {sub.type}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 max-w-xs">
                      <div className="font-sans font-bold text-xs text-slate-900 truncate">
                        {sub.subject || sub.type}
                      </div>
                      <div className="text-[11px] text-slate-500 truncate mt-0.5">
                        {sub.message}
                      </div>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className={`font-mono text-[10px] font-bold px-2.5 py-1 rounded ${getStatusBadge(sub.status)}`}>
                        {sub.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-[11px] text-slate-500">
                      {new Date(sub.createdAt).toLocaleDateString()}
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => openDossier(sub)}
                          className="p-1.5 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded transition-colors"
                          title="Inspect Dossier"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => openEditModal(sub)}
                          className="p-1.5 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded transition-colors"
                          title="Update Status"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => setDeleteId(sub.id)}
                          className="p-1.5 text-slate-500 hover:text-rose-600 hover:bg-slate-100 rounded transition-colors"
                          title="Delete Record"
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
                <Inbox className="w-4 h-4 text-primary" />
                <span className="font-sans font-bold text-sm uppercase text-slate-900 tracking-wider">
                  Submission Dossier #{activeDossier.id.substring(0, 8)}
                </span>
              </div>
              <button onClick={() => setActiveDossier(null)} className="text-slate-400 hover:text-slate-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-4 bg-slate-50 border border-slate-200 rounded">
                <div>
                  <span className="text-[10px] text-slate-400 uppercase block font-bold">Contact Name</span>
                  <span className="text-slate-900 font-bold text-sm">{activeDossier.name}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 uppercase block font-bold">Email Address</span>
                  <span className="text-rose-600 font-semibold">{activeDossier.email}</span>
                </div>
                {activeDossier.phone && (
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase block font-bold">Phone Number</span>
                    <span className="text-slate-800">{activeDossier.phone}</span>
                  </div>
                )}
                {activeDossier.company && (
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase block font-bold">Company / Org</span>
                    <span className="text-slate-800">{activeDossier.company}</span>
                  </div>
                )}
              </div>

              {activeDossier.sector && (
                <div className="grid grid-cols-2 gap-3 p-3 bg-slate-50 border border-slate-200 rounded">
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase block font-bold">Plant Sector</span>
                    <span className="text-slate-800 font-bold">{activeDossier.sector}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase block font-bold">Target Budget</span>
                    <span className="text-emerald-600 font-bold">{activeDossier.budget || "TBD"}</span>
                  </div>
                </div>
              )}

              <div>
                <span className="text-[10px] text-slate-400 uppercase block font-bold mb-1">Subject Title</span>
                <div className="p-3 bg-slate-50 border border-slate-200 rounded text-slate-900 font-bold">
                  {activeDossier.subject || activeDossier.type}
                </div>
              </div>

              <div>
                <span className="text-[10px] text-slate-400 uppercase block font-bold mb-1">Message / Scope Description</span>
                <div className="p-4 bg-slate-50 border border-slate-200 rounded text-slate-700 font-sans text-xs leading-relaxed whitespace-pre-wrap">
                  {activeDossier.message}
                </div>
              </div>

              {activeDossier.notes && (
                <div>
                  <span className="text-[10px] text-slate-400 uppercase block font-bold mb-1">Internal Review Notes</span>
                  <div className="p-3 bg-amber-50 border border-amber-200 rounded text-amber-800 text-xs">
                    {activeDossier.notes}
                  </div>
                </div>
              )}
            </div>

            <div className="flex items-center justify-end gap-3 pt-5 border-t border-slate-100 mt-6">
              <button
                onClick={() => {
                  setActiveDossier(null);
                  openEditModal(activeDossier);
                }}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-700 rounded text-xs font-bold uppercase"
              >
                Edit Status & Notes
              </button>
              <button
                onClick={() => setActiveDossier(null)}
                className="px-4 py-2 bg-primary hover:bg-rose-700 text-white font-bold text-xs uppercase rounded shadow-sm"
              >
                Close Dossier
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
                Update Record #{editModalItem.id.substring(0, 8)}
              </h3>
              <button onClick={() => setEditModalItem(null)} className="text-slate-400 hover:text-slate-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveEdit} className="space-y-4">
              <div>
                <label className="block text-[10px] text-slate-500 uppercase font-bold mb-1">
                  Status State
                </label>
                <select
                  value={editStatus}
                  onChange={(e) => setEditStatus(e.target.value as SubmissionStatus)}
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
                  Internal Engineering Notes
                </label>
                <textarea
                  rows={4}
                  placeholder="Record resolution notes, audit dispatch notes, etc..."
                  value={editNotes}
                  onChange={(e) => setEditNotes(e.target.value)}
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
                  <span>Save Record</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* DELETE CONFIRMATION MODAL */}
      {deleteId && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded max-w-sm w-full p-6 shadow-2xl font-mono text-xs text-center">
            <div className="w-12 h-12 rounded-full bg-rose-50 border border-rose-200 text-rose-600 flex items-center justify-center mx-auto mb-4">
              <Trash2 className="w-6 h-6" />
            </div>
            <h3 className="font-sans font-bold text-base uppercase text-slate-900 mb-2">
              Confirm Delete
            </h3>
            <p className="text-slate-600 text-xs mb-6 font-sans">
              Are you sure you want to permanently delete submission record <strong>{deleteId}</strong>? This cannot be undone.
            </p>
            <div className="flex items-center justify-center gap-3">
              <button
                onClick={() => setDeleteId(null)}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded text-xs font-bold uppercase"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                disabled={isDeleting}
                className="px-5 py-2 bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs uppercase rounded transition-colors shadow-sm"
              >
                {isDeleting ? "Deleting..." : "Permanently Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
