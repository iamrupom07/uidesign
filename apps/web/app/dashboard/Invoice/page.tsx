"use client";

import { useState, useMemo } from "react";
import {
  useGetInvoicesQuery,
  useGetInvoiceStatsQuery,
  useCreateInvoiceMutation,
  useUpdateInvoiceMutation,
  useUpdateInvoiceStatusMutation,
  useSendInvoiceEmailMutation,
  useDeleteInvoiceMutation,
} from "@/redux/api/invoiceApi";
import { useGetLeadsQuery } from "@/redux/api/leadApi";
import {
  Receipt,
  Search,
  Plus,
  Filter,
  DollarSign,
  CheckCircle2,
  Trash2,
  Edit,
  Building,
  Printer,
  Send,
  Download,
  AlertTriangle,
  Clock,
  Eye,
  RefreshCw,
  X,
  FileCheck,
} from "lucide-react";
import { Invoice, InvoiceStatus, CreateInvoiceItemInput } from "@repo/types";

const SECTORS = [
  "ALL",
  "Cement",
  "Steel",
  "Power & Energy",
  "Oil & Gas",
  "Mining",
  "Heavy Engineering",
  "Corporate",
];

export default function InvoiceDashboardPage() {
  // Filters & State
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("ALL");
  const [sectorFilter, setSectorFilter] = useState<string>("ALL");

  // Modals state
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [editingInvoice, setEditingInvoice] = useState<Invoice | null>(null);
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [isDownloadingPdf, setIsDownloadingPdf] = useState(false);

  // RTK Query API Hooks
  const {
    data: invoicesData,
    isLoading: isInvoicesLoading,
    refetch,
  } = useGetInvoicesQuery({
    status: statusFilter !== "ALL" ? statusFilter : undefined,
    sector: sectorFilter !== "ALL" ? sectorFilter : undefined,
    search: searchQuery || undefined,
  });

  const { data: statsData } = useGetInvoiceStatsQuery();
  const { data: leadsData } = useGetLeadsQuery();

  const [createInvoice, { isLoading: isCreating }] = useCreateInvoiceMutation();
  const [updateInvoice, { isLoading: isUpdating }] = useUpdateInvoiceMutation();
  const [updateInvoiceStatus] = useUpdateInvoiceStatusMutation();
  const [sendInvoiceEmail, { isLoading: isSendingEmail }] = useSendInvoiceEmailMutation();
  const [deleteInvoice, { isLoading: isDeleting }] = useDeleteInvoiceMutation();

  const invoices = invoicesData?.data || [];
  const stats = statsData?.data;

  // Form State for Create/Edit Invoice
  const [formClientName, setFormClientName] = useState("");
  const [formClientEmail, setFormClientEmail] = useState("");
  const [formClientCompany, setFormClientCompany] = useState("");
  const [formClientAddress, setFormClientAddress] = useState("");
  const [formDueDate, setFormDueDate] = useState("");
  const [formSector, setFormSector] = useState("Cement");
  const [formServiceCategory, setFormServiceCategory] = useState("CFD & Thermal Simulation");
  const [formPaymentTerms, setFormPaymentTerms] = useState("Net 30");
  const [formTaxRate, setFormTaxRate] = useState<number>(15.0);
  const [formDiscount, setFormDiscount] = useState<number>(0.0);
  const [formNotes, setFormNotes] = useState("");
  const [formItems, setFormItems] = useState<CreateInvoiceItemInput[]>([
    { description: "CFD Thermal Analysis & Airflow Modeling", quantity: 1, unitPrice: 4500 },
  ]);
  const [formError, setFormError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const handleOpenCreate = () => {
    setEditingInvoice(null);
    setFormClientName("");
    setFormClientEmail("");
    setFormClientCompany("");
    setFormClientAddress("");
    setFormDueDate("");
    setFormSector("Cement");
    setFormServiceCategory("CFD & Thermal Simulation");
    setFormPaymentTerms("Net 30");
    setFormTaxRate(15.0);
    setFormDiscount(0.0);
    setFormNotes("Payment due within specified terms. Wire transfer coordinates included.");
    setFormItems([
      { description: "CFD Thermal Analysis & Airflow Modeling", quantity: 1, unitPrice: 4500 },
    ]);
    setFormError("");
    setIsCreateModalOpen(true);
  };

  const handleOpenEdit = (inv: Invoice) => {
    setEditingInvoice(inv);
    setFormClientName(inv.clientName);
    setFormClientEmail(inv.clientEmail);
    setFormClientCompany(inv.clientCompany || "");
    setFormClientAddress(inv.clientAddress || "");
    setFormDueDate(inv.dueDate ? new Date(inv.dueDate).toISOString().split("T")[0] : "");
    setFormSector(inv.sector || "Cement");
    setFormServiceCategory(inv.serviceCategory || "CFD & Thermal Simulation");
    setFormPaymentTerms(inv.paymentTerms || "Net 30");
    setFormTaxRate(inv.taxRate);
    setFormDiscount(inv.discount);
    setFormNotes(inv.notes || "");
    setFormItems(
      inv.items.map((item) => ({
        description: item.description,
        quantity: item.quantity,
        unitPrice: item.unitPrice,
      }))
    );
    setFormError("");
    setIsCreateModalOpen(true);
  };

  const handleSelectLeadToAutofill = (leadId: string) => {
    if (!leadId || !leadsData?.data) return;
    const found = leadsData.data.find((l) => l.id === leadId);
    if (found) {
      setFormClientName(found.name);
      setFormClientEmail(found.email);
      setFormClientCompany(found.company || "");
    }
  };

  const handleAddItemRow = () => {
    setFormItems([...formItems, { description: "", quantity: 1, unitPrice: 0 }]);
  };

  const handleRemoveItemRow = (index: number) => {
    if (formItems.length === 1) return;
    setFormItems(formItems.filter((_, i) => i !== index));
  };

  const handleItemChange = (index: number, field: keyof CreateInvoiceItemInput, value: any) => {
    const updated = [...formItems];
    updated[index] = { ...updated[index], [field]: value };
    setFormItems(updated);
  };

  const calculatedSubtotal = useMemo(() => {
    return formItems.reduce(
      (acc, curr) => acc + (Number(curr.quantity) || 0) * (Number(curr.unitPrice) || 0),
      0
    );
  }, [formItems]);

  const calculatedTax = useMemo(() => {
    const afterDiscount = Math.max(0, calculatedSubtotal - (Number(formDiscount) || 0));
    return (afterDiscount * (Number(formTaxRate) || 0)) / 100;
  }, [calculatedSubtotal, formDiscount, formTaxRate]);

  const calculatedTotal = useMemo(() => {
    const afterDiscount = Math.max(0, calculatedSubtotal - (Number(formDiscount) || 0));
    return afterDiscount + calculatedTax;
  }, [calculatedSubtotal, formDiscount, calculatedTax]);

  const handleSubmitForm = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formClientName || !formClientEmail) {
      setFormError("Client name and valid email are required.");
      return;
    }

    if (formItems.some((it) => !it.description.trim() || it.unitPrice < 0)) {
      setFormError("All line items must have a description and valid price.");
      return;
    }

    try {
      const payload = {
        clientName: formClientName,
        clientEmail: formClientEmail,
        clientCompany: formClientCompany,
        clientAddress: formClientAddress,
        dueDate: formDueDate || undefined,
        sector: formSector,
        serviceCategory: formServiceCategory,
        paymentTerms: formPaymentTerms,
        taxRate: Number(formTaxRate),
        discount: Number(formDiscount),
        notes: formNotes,
        items: formItems.map((it) => ({
          description: it.description,
          quantity: Number(it.quantity) || 1,
          unitPrice: Number(it.unitPrice) || 0,
        })),
      };

      if (editingInvoice) {
        await updateInvoice({ id: editingInvoice.id, data: payload }).unwrap();
        setSuccessMsg(`Invoice ${editingInvoice.invoiceNumber} updated successfully.`);
      } else {
        const created = await createInvoice(payload).unwrap();
        setSuccessMsg(`Invoice ${created.data.invoiceNumber} created successfully.`);
        if (created.data) {
          setSelectedInvoice(created.data);
        }
      }

      setIsCreateModalOpen(false);
      refetch();
    } catch (err: any) {
      setFormError(err?.data?.message || "Failed to save invoice");
    }
  };

  const handleStatusQuickChange = async (id: string, newStatus: InvoiceStatus) => {
    try {
      await updateInvoiceStatus({ id, status: newStatus }).unwrap();
      refetch();
    } catch (err) {
      console.error("Failed to update status", err);
    }
  };

  const handleSendEmail = async (id: string) => {
    try {
      const res = await sendInvoiceEmail(id).unwrap();
      setSuccessMsg(res.data.message);
      setTimeout(() => setSuccessMsg(""), 5000);
      refetch();
    } catch (err) {
      setSuccessMsg("Failed to dispatch invoice email.");
      setTimeout(() => setSuccessMsg(""), 5000);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteInvoice(id).unwrap();
      setDeleteConfirmId(null);
      if (selectedInvoice?.id === id) setSelectedInvoice(null);
      setSuccessMsg("Invoice deleted successfully.");
      refetch();
    } catch (err) {
      console.error("Failed to delete invoice", err);
    }
  };

  // PDF DOWNLOAD FUNCTION - DIRECT TO PC
  const handleDownloadPDF = async (invToDownload?: Invoice) => {
    const inv = invToDownload || selectedInvoice;
    if (!inv) return;
    setIsDownloadingPdf(true);

    try {
      if (!selectedInvoice || selectedInvoice.id !== inv.id) {
        setSelectedInvoice(inv);
        await new Promise((r) => setTimeout(r, 150));
      }

      const element = document.getElementById(`printable-statement-${inv.id}`);
      if (!element) {
        alert("Invoice DOM container not found for rendering PDF.");
        return;
      }

      const html2pdf = (await import("html2pdf.js")).default;
      const opt = {
        margin: 10,
        filename: `${inv.invoiceNumber}_MacProtec_Invoice.pdf`,
        image: { type: "jpeg" as const, quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true, logging: false },
        jsPDF: { unit: "mm" as const, format: "a4" as const, orientation: "portrait" as const },
      };

      await html2pdf().set(opt).from(element).save();
    } catch (err) {
      console.error("Failed to download PDF locally:", err);
      window.print();
    } finally {
      setIsDownloadingPdf(false);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Top Header Title & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <h1 className="font-display font-extrabold text-2xl sm:text-3xl uppercase tracking-tight text-slate-900 mb-1">
            Invoice <span className="text-primary">& Billing Directory</span>
          </h1>
          <p className="font-mono text-xs text-slate-500">
            Issue milestone invoices, download official PDF statements directly to PC, and track payment receipts.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => refetch()}
            className="p-2 bg-white hover:bg-slate-50 border border-slate-200 text-slate-600 rounded transition-colors shadow-sm"
            title="Refresh Invoices"
          >
            <RefreshCw className={`w-4 h-4 ${isInvoicesLoading ? "animate-spin text-primary" : ""}`} />
          </button>
          <button
            onClick={handleOpenCreate}
            className="inline-flex items-center gap-2 px-4 py-2 bg-primary hover:bg-rose-700 text-white font-mono text-xs font-bold uppercase transition-colors shadow-sm rounded"
          >
            <Plus className="w-4 h-4" />
            <span>Generate Invoice</span>
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
              Total Invoiced
            </span>
            <DollarSign className="w-5 h-5 text-primary" />
          </div>
          <div className="font-display font-extrabold text-3xl text-slate-900">
            ${stats?.totalInvoiced?.toLocaleString() || "0"}
          </div>
          <div className="font-mono text-[10px] text-slate-400 mt-1">
            {stats?.totalCount || invoices.length} Total DB Records
          </div>
        </div>

        <div className="bg-white border border-slate-200 p-5 shadow-sm rounded">
          <div className="flex justify-between items-start mb-3">
            <span className="font-mono text-[10px] font-bold text-slate-400 uppercase">
              Paid Revenue
            </span>
            <CheckCircle2 className="w-5 h-5 text-emerald-600" />
          </div>
          <div className="font-display font-extrabold text-3xl text-emerald-600">
            ${stats?.paidAmount?.toLocaleString() || "0"}
          </div>
          <div className="font-mono text-[10px] text-slate-400 mt-1">Settled Accounts</div>
        </div>

        <div className="bg-white border border-slate-200 p-5 shadow-sm rounded">
          <div className="flex justify-between items-start mb-3">
            <span className="font-mono text-[10px] font-bold text-slate-400 uppercase">
              Outstanding Balance
            </span>
            <Clock className="w-5 h-5 text-amber-600" />
          </div>
          <div className="font-display font-extrabold text-3xl text-amber-600">
            ${stats?.outstandingAmount?.toLocaleString() || "0"}
          </div>
          <div className="font-mono text-[10px] text-slate-400 mt-1">Pending / Dispatched</div>
        </div>

        <div className="bg-white border border-slate-200 p-5 shadow-sm rounded">
          <div className="flex justify-between items-start mb-3">
            <span className="font-mono text-[10px] font-bold text-slate-400 uppercase">
              Overdue Invoices
            </span>
            <AlertTriangle className="w-5 h-5 text-rose-600" />
          </div>
          <div className="font-display font-extrabold text-3xl text-rose-600">
            {stats?.overdueCount || 0}
          </div>
          <div className="font-mono text-[10px] text-slate-400 mt-1">Past Due Date</div>
        </div>
      </div>

      {/* Filter and Search Toolbar */}
      <div className="bg-white border border-slate-200 p-4 shadow-sm flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 rounded">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search invoice #, client name, email, or company..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 font-mono text-xs text-slate-800 placeholder:text-slate-400 rounded focus:outline-none focus:border-primary"
          />
        </div>

        {/* Status Pills */}
        <div className="flex items-center gap-1 overflow-x-auto py-1 scrollbar-none font-mono text-xs">
          {["ALL", "Draft", "Sent", "Paid", "Overdue", "Cancelled"].map((st) => (
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
          ))}
        </div>

        {/* Sector dropdown */}
        <div className="flex items-center gap-2 font-mono text-xs">
          <Filter className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          <select
            value={sectorFilter}
            onChange={(e) => setSectorFilter(e.target.value)}
            className="bg-slate-50 border border-slate-200 text-slate-700 text-xs px-3 py-2 rounded focus:outline-none focus:border-primary"
          >
            {SECTORS.map((sec) => (
              <option key={sec} value={sec}>
                {sec === "ALL" ? "All Sectors" : sec}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Invoice Data Table */}
      <div className="bg-white border border-slate-200 rounded shadow-sm overflow-hidden">
        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full text-left font-mono text-xs text-slate-700 min-w-[800px]">
            <thead className="bg-slate-50 border-b border-slate-200 text-[10px] uppercase font-bold text-slate-500 tracking-wider">
              <tr>
                <th className="py-3 px-4">Invoice #</th>
                <th className="py-3 px-4">Client & Company</th>
                <th className="py-3 px-4">Sector / Category</th>
                <th className="py-3 px-4">Issue / Due Date</th>
                <th className="py-3 px-4">Total Amount</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {isInvoicesLoading ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-slate-400">
                    <div className="flex items-center justify-center gap-2">
                      <RefreshCw className="w-4 h-4 animate-spin text-primary" />
                      <span>Loading invoices from database...</span>
                    </div>
                  </td>
                </tr>
              ) : invoices.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-slate-400">
                    No invoice records match current filters.
                  </td>
                </tr>
              ) : (
                invoices.map((inv) => (
                  <tr key={inv.id} className="hover:bg-slate-50 transition-colors group">
                    <td className="py-3.5 px-4 font-bold text-primary">
                      <button
                        onClick={() => setSelectedInvoice(inv)}
                        className="hover:underline flex items-center gap-1.5"
                      >
                        {inv.invoiceNumber}
                      </button>
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="font-sans font-bold text-sm text-slate-900">{inv.clientName}</div>
                      <div className="text-[11px] text-slate-500 flex items-center gap-2 mt-0.5">
                        {inv.clientCompany && (
                          <span className="flex items-center gap-1">
                            <Building className="w-3 h-3 text-slate-400" />
                            {inv.clientCompany}
                          </span>
                        )}
                        <span>• {inv.clientEmail}</span>
                      </div>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="px-2 py-0.5 text-[10px] font-bold uppercase bg-slate-100 text-slate-700 border border-slate-200 rounded">
                        {inv.sector || "General"}
                      </span>
                      <div className="text-[10px] text-slate-500 mt-1 truncate max-w-[180px]">
                        {inv.serviceCategory || "Engineering Services"}
                      </div>
                    </td>
                    <td className="py-3.5 px-4 text-[11px]">
                      <div className="text-slate-800">
                        Issued: {new Date(inv.issueDate).toLocaleDateString()}
                      </div>
                      {inv.dueDate && (
                        <div className="text-slate-400 mt-0.5">
                          Due: {new Date(inv.dueDate).toLocaleDateString()}
                        </div>
                      )}
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="font-extrabold text-slate-900 text-sm">
                        ${inv.totalAmount.toLocaleString()}
                      </div>
                      <div className="text-[10px] text-slate-400">
                        Sub: ${inv.subtotal.toLocaleString()} + Tax({inv.taxRate}%)
                      </div>
                    </td>
                    <td className="py-3.5 px-4">
                      <select
                        value={inv.status}
                        onChange={(e) =>
                          handleStatusQuickChange(inv.id, e.target.value as InvoiceStatus)
                        }
                        className={`px-2.5 py-1 text-[10px] font-bold uppercase rounded border focus:outline-none cursor-pointer transition-colors ${
                          inv.status === "Paid"
                            ? "bg-emerald-50 text-emerald-700 border-emerald-300"
                            : inv.status === "Sent"
                              ? "bg-sky-50 text-sky-700 border-sky-300"
                              : inv.status === "Overdue"
                                ? "bg-rose-50 text-rose-700 border-rose-300"
                                : "bg-amber-50 text-amber-700 border-amber-300"
                        }`}
                      >
                        <option value="Draft">Draft</option>
                        <option value="Sent">Sent</option>
                        <option value="Paid">Paid</option>
                        <option value="Overdue">Overdue</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => handleDownloadPDF(inv)}
                          disabled={isDownloadingPdf}
                          className="px-2.5 py-1 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 text-[10px] font-bold uppercase rounded flex items-center gap-1 transition-colors"
                          title="Download PDF directly to PC"
                        >
                          <Download className="w-3 h-3" />
                          <span>PDF</span>
                        </button>
                        <button
                          onClick={() => setSelectedInvoice(inv)}
                          className="p-1.5 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded transition-colors"
                          title="View Statement & Print"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleSendEmail(inv.id)}
                          disabled={isSendingEmail}
                          className="p-1.5 text-slate-500 hover:text-sky-600 hover:bg-slate-100 rounded transition-colors"
                          title="Dispatch Email"
                        >
                          <Send className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleOpenEdit(inv)}
                          className="p-1.5 text-slate-500 hover:text-amber-600 hover:bg-slate-100 rounded transition-colors"
                          title="Edit Invoice"
                        >
                          <Edit className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => setDeleteConfirmId(inv.id)}
                          className="p-1.5 text-slate-500 hover:text-rose-600 hover:bg-slate-100 rounded transition-colors"
                          title="Delete Invoice"
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

      {/* CREATE / EDIT INVOICE MODAL */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white border border-slate-200 rounded max-w-3xl w-full p-6 shadow-2xl max-h-[90vh] overflow-y-auto custom-scrollbar font-mono text-xs text-slate-800">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-5">
              <div className="flex items-center gap-2.5">
                <Receipt className="w-5 h-5 text-primary" />
                <h3 className="font-sans font-bold text-base uppercase text-slate-900 tracking-wider">
                  {editingInvoice ? `Edit Invoice: ${editingInvoice.invoiceNumber}` : "Generate Technical Invoice"}
                </h3>
              </div>
              <button onClick={() => setIsCreateModalOpen(false)} className="text-slate-400 hover:text-slate-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmitForm} className="space-y-4">
              {formError && (
                <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 rounded flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 shrink-0 text-primary" />
                  <span>{formError}</span>
                </div>
              )}

              {/* CRM Lead Selector Dropdown */}
              {!editingInvoice && leadsData?.data && leadsData.data.length > 0 && (
                <div className="p-3 bg-slate-50 border border-slate-200 rounded">
                  <label className="block text-[9px] text-slate-500 uppercase tracking-wider mb-1.5 font-bold">
                    Autofill from CRM Lead (Optional)
                  </label>
                  <select
                    onChange={(e) => handleSelectLeadToAutofill(e.target.value)}
                    className="w-full bg-white border border-slate-200 text-slate-800 p-2 rounded focus:outline-none focus:border-primary"
                  >
                    <option value="">Select a Lead to populate Client info...</option>
                    {leadsData.data.map((ld) => (
                      <option key={ld.id} value={ld.id}>
                        {ld.name} — {ld.company || "No Company"} ({ld.email})
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {/* Client Info Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[9px] text-slate-500 uppercase tracking-wider mb-1 font-bold">
                    Client Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Marcus Vance"
                    value={formClientName}
                    onChange={(e) => setFormClientName(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 p-2.5 text-slate-800 rounded focus:outline-none focus:border-primary"
                  />
                </div>
                <div>
                  <label className="block text-[9px] text-slate-500 uppercase tracking-wider mb-1 font-bold">
                    Client Corporate Email *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="e.g. client@company.com"
                    value={formClientEmail}
                    onChange={(e) => setFormClientEmail(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 p-2.5 text-slate-800 rounded focus:outline-none focus:border-primary"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[9px] text-slate-500 uppercase tracking-wider mb-1 font-bold">
                    Company / Organization
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Holcim Cement Corp"
                    value={formClientCompany}
                    onChange={(e) => setFormClientCompany(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 p-2.5 text-slate-800 rounded focus:outline-none focus:border-primary"
                  />
                </div>
                <div>
                  <label className="block text-[9px] text-slate-500 uppercase tracking-wider mb-1 font-bold">
                    Due Date
                  </label>
                  <input
                    type="date"
                    value={formDueDate}
                    onChange={(e) => setFormDueDate(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 p-2.5 text-slate-800 rounded focus:outline-none focus:border-primary"
                  />
                </div>
              </div>

              {/* Items Table Builder */}
              <div className="space-y-3 pt-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-xs uppercase text-slate-900">Line Items & Milestones</span>
                  <button
                    type="button"
                    onClick={handleAddItemRow}
                    className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 border border-slate-200 text-primary font-bold text-[10px] uppercase rounded flex items-center gap-1"
                  >
                    <Plus className="w-3 h-3" />
                    <span>Add Item</span>
                  </button>
                </div>

                <div className="space-y-2">
                  {formItems.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2 bg-slate-50 p-2 border border-slate-200 rounded">
                      <input
                        type="text"
                        placeholder="Item description / milestone"
                        value={item.description}
                        onChange={(e) => handleItemChange(idx, "description", e.target.value)}
                        className="flex-1 bg-white border border-slate-200 p-2 text-slate-800 text-xs rounded focus:outline-none focus:border-primary"
                      />
                      <input
                        type="number"
                        min="1"
                        placeholder="Qty"
                        value={item.quantity}
                        onChange={(e) => handleItemChange(idx, "quantity", Number(e.target.value))}
                        className="w-16 bg-white border border-slate-200 p-2 text-slate-800 text-xs rounded text-center focus:outline-none focus:border-primary"
                      />
                      <input
                        type="number"
                        min="0"
                        placeholder="Unit $"
                        value={item.unitPrice}
                        onChange={(e) => handleItemChange(idx, "unitPrice", Number(e.target.value))}
                        className="w-24 bg-white border border-slate-200 p-2 text-slate-800 text-xs rounded text-right focus:outline-none focus:border-primary"
                      />
                      <button
                        type="button"
                        onClick={() => handleRemoveItemRow(idx)}
                        disabled={formItems.length === 1}
                        className="p-2 text-slate-400 hover:text-rose-600 disabled:opacity-30"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Subtotal / Tax Summary Box */}
              <div className="p-3 bg-slate-50 border border-slate-200 rounded grid grid-cols-3 gap-4 text-center">
                <div>
                  <span className="text-[9px] text-slate-500 uppercase font-bold block">Subtotal</span>
                  <span className="text-slate-900 font-bold text-sm">${calculatedSubtotal.toLocaleString()}</span>
                </div>
                <div>
                  <span className="text-[9px] text-slate-500 uppercase font-bold block">Tax ({formTaxRate}%)</span>
                  <span className="text-slate-900 font-bold text-sm">${calculatedTax.toLocaleString()}</span>
                </div>
                <div>
                  <span className="text-[9px] text-slate-500 uppercase font-bold block">Total Amount</span>
                  <span className="text-emerald-600 font-bold text-base">${calculatedTotal.toLocaleString()}</span>
                </div>
              </div>

              {/* Notes */}
              <div>
                <label className="block text-[9px] text-slate-500 uppercase tracking-wider mb-1 font-bold">
                  Payment Instructions & Project Notes
                </label>
                <textarea
                  rows={2}
                  value={formNotes}
                  onChange={(e) => setFormNotes(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 p-2.5 text-slate-800 rounded focus:outline-none focus:border-primary"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsCreateModalOpen(false)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-700 rounded text-xs font-bold uppercase"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isCreating || isUpdating}
                  className="px-5 py-2 bg-primary hover:bg-rose-700 text-white font-bold text-xs uppercase rounded transition-colors shadow-sm disabled:opacity-50 flex items-center gap-1.5"
                >
                  {(isCreating || isUpdating) && <RefreshCw className="w-3.5 h-3.5 animate-spin" />}
                  <span>{editingInvoice ? "Update Invoice" : "Generate Invoice"}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* PRINTABLE / VIEW PDF INVOICE MODAL */}
      {selectedInvoice && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white border border-slate-200 rounded max-w-4xl w-full p-6 shadow-2xl max-h-[90vh] overflow-y-auto custom-scrollbar font-mono text-xs text-slate-900">
            {/* Top Bar for statement */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-200 mb-6">
              <div className="flex items-center gap-2">
                <FileCheck className="w-5 h-5 text-primary" />
                <span className="font-bold text-sm uppercase">Statement: {selectedInvoice.invoiceNumber}</span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleDownloadPDF(selectedInvoice)}
                  disabled={isDownloadingPdf}
                  className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold uppercase text-xs rounded flex items-center gap-1.5 shadow-sm"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download PDF</span>
                </button>
                <button
                  onClick={() => window.print()}
                  className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold uppercase text-xs rounded flex items-center gap-1.5 border border-slate-200"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Print</span>
                </button>
                <button onClick={() => setSelectedInvoice(null)} className="p-1 text-slate-400 hover:text-slate-700 ml-2">
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Document Body */}
            <div id={`printable-statement-${selectedInvoice.id}`} className="space-y-6">
              <div className="flex flex-col sm:flex-row justify-between items-start border-b border-slate-200 pb-6 gap-4">
                <div>
                  <img src="/images/logo-horizontal.png" alt="MACPROTEC" className="h-10 w-auto mb-2 object-contain" />
                  <p className="text-[11px] text-slate-600 max-w-sm">
                    Industrial Process Optimization, Heavy Equipment Revamp & CFD Solutions
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-extrabold text-primary">INVOICE</div>
                  <div className="text-sm font-bold text-slate-900">{selectedInvoice.invoiceNumber}</div>
                  <div className="text-[11px] text-slate-500">
                    Issued: {new Date(selectedInvoice.issueDate).toLocaleDateString()}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 p-4 bg-slate-50 border border-slate-200 rounded">
                <div>
                  <span className="text-[9px] uppercase font-bold text-slate-400 block mb-1">Billed To</span>
                  <div className="font-bold text-sm text-slate-900">{selectedInvoice.clientName}</div>
                  {selectedInvoice.clientCompany && <div className="text-slate-700">{selectedInvoice.clientCompany}</div>}
                  <div className="text-slate-500">{selectedInvoice.clientEmail}</div>
                </div>
                <div className="text-right">
                  <span className="text-[9px] uppercase font-bold text-slate-400 block mb-1">Details</span>
                  <div>Sector: <span className="font-bold text-slate-900">{selectedInvoice.sector}</span></div>
                  <div>Terms: <span className="font-bold text-slate-900">{selectedInvoice.paymentTerms}</span></div>
                  <div>Status: <span className="font-bold text-primary uppercase">{selectedInvoice.status}</span></div>
                </div>
              </div>

              {/* Items Table */}
              <table className="w-full text-left font-mono text-xs border border-slate-200">
                <thead className="bg-slate-100 text-slate-600 uppercase text-[9px]">
                  <tr>
                    <th className="p-3">#</th>
                    <th className="p-3">Description</th>
                    <th className="p-3 text-center">Qty</th>
                    <th className="p-3 text-right">Unit Price</th>
                    <th className="p-3 text-right">Total ($)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 text-slate-800">
                  {selectedInvoice.items.map((item, i) => (
                    <tr key={i}>
                      <td className="p-3 text-slate-400">{i + 1}</td>
                      <td className="p-3 font-medium">{item.description}</td>
                      <td className="p-3 text-center">{item.quantity}</td>
                      <td className="p-3 text-right">${item.unitPrice.toLocaleString()}</td>
                      <td className="p-3 text-right font-bold">${item.totalPrice.toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className="flex justify-end">
                <div className="w-64 space-y-1 text-right">
                  <div className="flex justify-between text-slate-600">
                    <span>Subtotal:</span>
                    <span className="font-bold text-slate-900">${selectedInvoice.subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <span>Tax ({selectedInvoice.taxRate}%):</span>
                    <span className="font-bold text-slate-900">${selectedInvoice.taxAmount.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-base font-extrabold text-primary pt-2 border-t border-slate-200">
                    <span>TOTAL:</span>
                    <span>${selectedInvoice.totalAmount.toLocaleString()} {selectedInvoice.currency}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* DELETE CONFIRMATION MODAL */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded max-w-sm w-full p-6 shadow-2xl font-mono text-xs text-center">
            <div className="w-12 h-12 rounded-full bg-rose-50 border border-rose-200 text-rose-600 flex items-center justify-center mx-auto mb-4">
              <Trash2 className="w-6 h-6" />
            </div>
            <h3 className="font-sans font-bold text-base uppercase text-slate-900 mb-2">
              Confirm Delete
            </h3>
            <p className="text-slate-600 text-xs mb-6 font-sans">
              Are you sure you want to permanently delete this invoice record?
            </p>
            <div className="flex items-center justify-center gap-3">
              <button
                onClick={() => setDeleteConfirmId(null)}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-700 rounded text-xs font-bold uppercase"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(deleteConfirmId)}
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
