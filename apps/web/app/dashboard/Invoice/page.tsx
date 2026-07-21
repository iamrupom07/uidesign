"use client";

import { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import TechnicalCursor from "@/components/ui/TechnicalCursor";
import { useGetMeQuery, useLogoutMutation } from "@/redux/api/authApi";
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
  CheckCircle2,
  Trash2,
  Edit,
  Building,
  Printer,
  Send,
  Download,
  AlertTriangle,
  Clock,
  FileCheck,
  Eye,
  RefreshCw,
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

const SERVICE_CATEGORIES = [
  "CFD & Thermal Simulation",
  "3D Laser Scanning & Modeling",
  "Plant Revamp & EPC Project",
  "Vibration & Condition Monitoring",
  "Machinery Fabrication & Supply",
  "Technical Consulting & Audit",
];

export default function InvoiceDashboardPage() {
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
    status: statusFilter,
    sector: sectorFilter,
    search: searchQuery,
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
    setFormNotes("Payment due within specified terms. Bank transfer instructions included below.");
    setFormItems([{ description: "CFD Thermal Analysis & Airflow Modeling", quantity: 1, unitPrice: 4500 }]);
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
    return formItems.reduce((acc, curr) => acc + (Number(curr.quantity) || 0) * (Number(curr.unitPrice) || 0), 0);
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

      setStatusFilter("ALL");
      setSectorFilter("ALL");
      setSearchQuery("");
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
      alert("Error generating PDF. Opening browser print dialog instead.");
      window.print();
    } finally {
      setIsDownloadingPdf(false);
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

  if (isAuthLoading || !userData?.data) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center font-mono">
        <div className="flex items-center gap-3 text-rose-500">
          <RefreshCw className="w-5 h-5 animate-spin" />
          <span>INITIALIZING MACPROTEC INVOICE SYSTEM...</span>
        </div>
      </div>
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

        {/* Sidebar Nav (Identical to Leads & Finance sections) */}
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

                  {/* ACTIVE TAB STYLING FOR INVOICE CREATOR */}
                  <Link
                    href="/dashboard/Invoice"
                    className="w-full flex items-center justify-between px-3 py-2.5 text-xs font-mono rounded transition-all duration-150 group bg-rose-500/10 text-white font-bold border-l-2 border-primary"
                  >
                    <div className="flex items-center gap-3">
                      <Receipt className="w-4 h-4 text-primary shrink-0" />
                      <span className="truncate">Invoice Creator</span>
                    </div>
                    <ChevronRight className="w-3.5 h-3.5 text-primary shrink-0" />
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
                <span className="text-primary font-bold">Invoice & Billing Directory</span>
              </span>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={handleOpenCreate}
                className="inline-flex items-center gap-2 px-4 py-2 bg-primary hover:bg-rose-700 text-white font-mono text-xs font-bold uppercase transition-colors shadow-sm"
              >
                <Plus className="w-4 h-4" />
                <span>Create New Invoice</span>
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
                Invoice <span className="text-primary">& Billing Directory</span>
              </h1>
              <p className="font-mono text-xs text-slate-500">
                Connected directly to PostgreSQL database via Express API backend.
              </p>
            </div>

            {/* KPI Cards (Light theme) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              <div className="bg-white border border-slate-200 p-5 shadow-sm rounded-none">
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
                  {stats?.totalCount || 0} Total DB Records
                </div>
              </div>

              <div className="bg-white border border-slate-200 p-5 shadow-sm rounded-none">
                <div className="flex justify-between items-start mb-3">
                  <span className="font-mono text-[10px] font-bold text-slate-400 uppercase">
                    Paid Revenue
                  </span>
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                </div>
                <div className="font-display font-extrabold text-3xl text-emerald-600">
                  ${stats?.paidAmount?.toLocaleString() || "0"}
                </div>
                <div className="font-mono text-[10px] text-slate-400 mt-1">
                  Settled Accounts
                </div>
              </div>

              <div className="bg-white border border-slate-200 p-5 shadow-sm rounded-none">
                <div className="flex justify-between items-start mb-3">
                  <span className="font-mono text-[10px] font-bold text-slate-400 uppercase">
                    Outstanding Balance
                  </span>
                  <Clock className="w-5 h-5 text-amber-600" />
                </div>
                <div className="font-display font-extrabold text-3xl text-amber-600">
                  ${stats?.outstandingAmount?.toLocaleString() || "0"}
                </div>
                <div className="font-mono text-[10px] text-slate-400 mt-1">
                  Pending / Sent Statements
                </div>
              </div>

              <div className="bg-white border border-slate-200 p-5 shadow-sm rounded-none">
                <div className="flex justify-between items-start mb-3">
                  <span className="font-mono text-[10px] font-bold text-slate-400 uppercase">
                    Overdue Invoices
                  </span>
                  <AlertTriangle className="w-5 h-5 text-rose-600" />
                </div>
                <div className="font-display font-extrabold text-3xl text-rose-600">
                  {stats?.overdueCount || 0}
                </div>
                <div className="font-mono text-[10px] text-slate-400 mt-1">
                  Past Payment Date
                </div>
              </div>
            </div>

            {/* Filter & Search Toolbar */}
            <div className="bg-white border border-slate-200 p-4 shadow-sm flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
              <div className="relative flex-1 max-w-md">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search invoice #, client name, email, or company..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 font-mono text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-primary"
                />
              </div>

              <div className="flex items-center gap-1 overflow-x-auto py-1 scrollbar-none">
                {["ALL", "Draft", "Sent", "Paid", "Overdue", "Cancelled"].map((st) => (
                  <button
                    key={st}
                    onClick={() => setStatusFilter(st)}
                    className={`px-3 py-1.5 font-mono text-xs uppercase font-bold transition-all shrink-0 border ${
                      statusFilter === st
                        ? "bg-primary text-white border-primary"
                        : "bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100"
                    }`}
                  >
                    {st}
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-2">
                <Filter className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <select
                  value={sectorFilter}
                  onChange={(e) => setSectorFilter(e.target.value)}
                  className="bg-slate-50 border border-slate-200 text-slate-700 font-mono text-xs px-3 py-2 focus:outline-none focus:border-primary"
                >
                  {SECTORS.map((sec) => (
                    <option key={sec} value={sec}>
                      Sector: {sec}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Data Directory Table */}
            <div className="bg-white border border-slate-200 shadow-sm rounded-none overflow-hidden">
              <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                <div className="flex items-center gap-2">
                  <FileCheck className="w-4 h-4 text-primary" />
                  <h3 className="font-display font-extrabold text-xs uppercase tracking-wider text-slate-900">
                    Generated Invoices Directory ({invoices.length})
                  </h3>
                </div>
                <button
                  onClick={() => refetch()}
                  className="p-1.5 text-slate-400 hover:text-slate-700 transition-colors"
                  title="Refresh directory"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                </button>
              </div>

              {isInvoicesLoading ? (
                <div className="py-16 text-center font-mono text-slate-500 text-xs flex items-center justify-center gap-3">
                  <RefreshCw className="w-4 h-4 animate-spin text-primary" />
                  FETCHING DATABASE RECORDS...
                </div>
              ) : invoices.length === 0 ? (
                <div className="py-16 text-center font-mono text-slate-500 text-xs">
                  <Receipt className="w-10 h-10 mx-auto mb-3 text-slate-300" />
                  No invoice records match current filters.
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left font-mono text-xs">
                    <thead className="bg-slate-50 text-slate-500 uppercase text-[9px] tracking-wider border-b border-slate-200">
                      <tr>
                        <th className="px-6 py-3.5">Invoice #</th>
                        <th className="px-6 py-3.5">Client & Company</th>
                        <th className="px-6 py-3.5">Sector / Service</th>
                        <th className="px-6 py-3.5">Issue / Due Date</th>
                        <th className="px-6 py-3.5">Amount ($)</th>
                        <th className="px-6 py-3.5">Status</th>
                        <th className="px-6 py-3.5 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-slate-700">
                      {invoices.map((inv) => (
                        <tr key={inv.id} className="hover:bg-slate-50 transition-colors group">
                          {/* Invoice # */}
                          <td className="px-6 py-4 font-bold text-primary">
                            <button
                              onClick={() => setSelectedInvoice(inv)}
                              className="hover:underline flex items-center gap-1.5"
                            >
                              {inv.invoiceNumber}
                            </button>
                          </td>

                          {/* Client & Company */}
                          <td className="px-6 py-4">
                            <div className="font-bold text-slate-900">{inv.clientName}</div>
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

                          {/* Sector / Service */}
                          <td className="px-6 py-4">
                            <span className="px-2 py-0.5 text-[10px] font-bold uppercase bg-slate-100 text-slate-700 border border-slate-200">
                              {inv.sector || "General"}
                            </span>
                            <div className="text-[10px] text-slate-500 mt-1 truncate max-w-[180px]">
                              {inv.serviceCategory || "Engineering Services"}
                            </div>
                          </td>

                          {/* Date */}
                          <td className="px-6 py-4 text-[11px]">
                            <div>Issued: {new Date(inv.issueDate).toLocaleDateString()}</div>
                            {inv.dueDate ? (
                              <div className="text-slate-500 mt-0.5">
                                Due: {new Date(inv.dueDate).toLocaleDateString()}
                              </div>
                            ) : (
                              <div className="text-slate-400 mt-0.5">{inv.paymentTerms}</div>
                            )}
                          </td>

                          {/* Total Amount */}
                          <td className="px-6 py-4">
                            <div className="font-extrabold text-slate-900 text-sm">
                              ${inv.totalAmount.toLocaleString()}
                            </div>
                            <div className="text-[10px] text-slate-400">
                              Sub: ${inv.subtotal.toLocaleString()} + Tax({inv.taxRate}%)
                            </div>
                          </td>

                          {/* Status badge with drop select */}
                          <td className="px-6 py-4">
                            <select
                              value={inv.status}
                              onChange={(e) =>
                                handleStatusQuickChange(inv.id, e.target.value as InvoiceStatus)
                              }
                              className={`px-2.5 py-1 text-[10px] font-bold uppercase border focus:outline-none cursor-pointer transition-colors ${
                                inv.status === "Paid"
                                  ? "bg-emerald-50 text-emerald-700 border-emerald-300"
                                  : inv.status === "Sent"
                                    ? "bg-cyan-50 text-cyan-700 border-cyan-300"
                                    : inv.status === "Overdue"
                                      ? "bg-rose-50 text-rose-700 border-rose-300"
                                      : inv.status === "Cancelled"
                                        ? "bg-slate-100 text-slate-500 border-slate-300"
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

                          {/* Actions */}
                          <td className="px-6 py-4 text-right">
                            <div className="flex items-center justify-end gap-1.5">
                              {/* DIRECT PDF DOWNLOAD BUTTON */}
                              <button
                                onClick={() => handleDownloadPDF(inv)}
                                disabled={isDownloadingPdf}
                                className="px-2.5 py-1 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 text-[10px] font-bold uppercase flex items-center gap-1 transition-colors"
                                title="Download PDF directly to PC"
                              >
                                <Download className="w-3.5 h-3.5" />
                                <span>PDF</span>
                              </button>

                              <button
                                onClick={() => setSelectedInvoice(inv)}
                                className="p-1.5 text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-colors"
                                title="View Preview & Print"
                              >
                                <Eye className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => handleSendEmail(inv.id)}
                                disabled={isSendingEmail}
                                className="p-1.5 text-slate-500 hover:text-cyan-600 hover:bg-slate-100 transition-colors"
                                title="Send Email Notification"
                              >
                                <Send className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => handleOpenEdit(inv)}
                                className="p-1.5 text-slate-500 hover:text-amber-600 hover:bg-slate-100 transition-colors"
                                title="Edit Invoice"
                              >
                                <Edit className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => setDeleteConfirmId(inv.id)}
                                className="p-1.5 text-slate-500 hover:text-rose-600 hover:bg-slate-100 transition-colors"
                                title="Delete Invoice"
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
          </div>
        </div>
      </main>

      {/* CREATE / EDIT INVOICE MODAL */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white border border-slate-200 w-full max-w-3xl shadow-xl overflow-hidden my-8 my-auto">
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
              <div className="flex items-center gap-2.5">
                <Receipt className="w-5 h-5 text-primary" />
                <h3 className="font-display font-extrabold text-sm uppercase text-slate-900">
                  {editingInvoice ? `Edit Invoice: ${editingInvoice.invoiceNumber}` : "Generate New Technical Invoice"}
                </h3>
              </div>
              <button onClick={() => setIsCreateModalOpen(false)} className="text-slate-400 hover:text-slate-700 p-1">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmitForm} className="p-6 space-y-5 font-mono text-xs">
              {formError && (
                <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 shrink-0 text-primary" />
                  <span>{formError}</span>
                </div>
              )}

              {/* CRM Lead Selector Dropdown */}
              {!editingInvoice && leadsData?.data && leadsData.data.length > 0 && (
                <div className="p-3 bg-slate-50 border border-slate-200">
                  <label className="block text-[9px] text-slate-500 uppercase tracking-wider mb-1.5">
                    Autofill from CRM Lead (Optional)
                  </label>
                  <select
                    onChange={(e) => handleSelectLeadToAutofill(e.target.value)}
                    className="w-full bg-white border border-slate-200 text-slate-800 p-2 focus:outline-none focus:border-primary"
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
                  <label className="block text-[9px] text-slate-500 uppercase tracking-wider mb-1">
                    Client Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formClientName}
                    onChange={(e) => setFormClientName(e.target.value)}
                    placeholder="e.g. Dr. Aris Thorne"
                    className="w-full bg-white border border-slate-200 p-2.5 text-slate-800 focus:outline-none focus:border-primary"
                  />
                </div>

                <div>
                  <label className="block text-[9px] text-slate-500 uppercase tracking-wider mb-1">
                    Client Email *
                  </label>
                  <input
                    type="email"
                    required
                    value={formClientEmail}
                    onChange={(e) => setFormClientEmail(e.target.value)}
                    placeholder="e.g. aris@holcim-cement.com"
                    className="w-full bg-white border border-slate-200 p-2.5 text-slate-800 focus:outline-none focus:border-primary"
                  />
                </div>

                <div>
                  <label className="block text-[9px] text-slate-500 uppercase tracking-wider mb-1">
                    Company Name
                  </label>
                  <input
                    type="text"
                    value={formClientCompany}
                    onChange={(e) => setFormClientCompany(e.target.value)}
                    placeholder="e.g. Holcim Cement Ltd"
                    className="w-full bg-white border border-slate-200 p-2.5 text-slate-800 focus:outline-none focus:border-primary"
                  />
                </div>

                <div>
                  <label className="block text-[9px] text-slate-500 uppercase tracking-wider mb-1">
                    Billing Address
                  </label>
                  <input
                    type="text"
                    value={formClientAddress}
                    onChange={(e) => setFormClientAddress(e.target.value)}
                    placeholder="e.g. Industrial Area Sector 4, Zurich, Switzerland"
                    className="w-full bg-white border border-slate-200 p-2.5 text-slate-800 focus:outline-none focus:border-primary"
                  />
                </div>
              </div>

              {/* Project & Billing Config */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 border-t border-slate-100">
                <div>
                  <label className="block text-[9px] text-slate-500 uppercase tracking-wider mb-1">
                    Industrial Sector
                  </label>
                  <select
                    value={formSector}
                    onChange={(e) => setFormSector(e.target.value)}
                    className="w-full bg-white border border-slate-200 p-2.5 text-slate-800 focus:outline-none focus:border-primary"
                  >
                    {SECTORS.filter((s) => s !== "ALL").map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-[9px] text-slate-500 uppercase tracking-wider mb-1">
                    Service Classification
                  </label>
                  <select
                    value={formServiceCategory}
                    onChange={(e) => setFormServiceCategory(e.target.value)}
                    className="w-full bg-white border border-slate-200 p-2.5 text-slate-800 focus:outline-none focus:border-primary"
                  >
                    {SERVICE_CATEGORIES.map((sc) => (
                      <option key={sc} value={sc}>
                        {sc}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-[9px] text-slate-500 uppercase tracking-wider mb-1">
                    Due Date
                  </label>
                  <input
                    type="date"
                    value={formDueDate}
                    onChange={(e) => setFormDueDate(e.target.value)}
                    className="w-full bg-white border border-slate-200 p-2.5 text-slate-800 focus:outline-none focus:border-primary"
                  />
                </div>
              </div>

              {/* Line Items Table */}
              <div className="pt-2 border-t border-slate-100 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[9px] font-bold text-slate-500 uppercase tracking-wider">
                    Itemized Services / Deliverables
                  </span>
                  <button
                    type="button"
                    onClick={handleAddItemRow}
                    className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-primary font-bold uppercase text-[10px] flex items-center gap-1 transition-colors"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    Add Row
                  </button>
                </div>

                <div className="space-y-2">
                  {formItems.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2 bg-slate-50 p-2.5 border border-slate-200">
                      <input
                        type="text"
                        placeholder="Description of service / deliverable"
                        value={item.description}
                        onChange={(e) => handleItemChange(idx, "description", e.target.value)}
                        className="flex-1 bg-white border border-slate-200 px-2.5 py-1.5 text-slate-800 focus:outline-none focus:border-primary"
                      />
                      <input
                        type="number"
                        min="1"
                        placeholder="Qty"
                        value={item.quantity}
                        onChange={(e) => handleItemChange(idx, "quantity", parseInt(e.target.value, 10) || 1)}
                        className="w-16 bg-white border border-slate-200 px-2 py-1.5 text-slate-800 text-center focus:outline-none focus:border-primary"
                      />
                      <div className="relative w-28">
                        <span className="absolute left-2 top-1/2 -translate-y-1/2 text-slate-400">$</span>
                        <input
                          type="number"
                          min="0"
                          step="0.01"
                          placeholder="Price"
                          value={item.unitPrice}
                          onChange={(e) => handleItemChange(idx, "unitPrice", parseFloat(e.target.value) || 0)}
                          className="w-full bg-white border border-slate-200 pl-5 pr-2 py-1.5 text-slate-800 text-right focus:outline-none focus:border-primary"
                        />
                      </div>
                      <div className="w-24 text-right font-bold text-slate-900">
                        ${((Number(item.quantity) || 0) * (Number(item.unitPrice) || 0)).toLocaleString()}
                      </div>
                      {formItems.length > 1 && (
                        <button
                          type="button"
                          onClick={() => handleRemoveItemRow(idx)}
                          className="p-1.5 text-slate-400 hover:text-primary transition-colors"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Financial Calculation Summary */}
              <div className="p-4 bg-slate-50 border border-slate-200 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
                <div className="grid grid-cols-2 gap-4 flex-1">
                  <div>
                    <label className="block text-[9px] text-slate-500 uppercase tracking-wider mb-1">
                      Tax Rate (%)
                    </label>
                    <input
                      type="number"
                      step="0.1"
                      value={formTaxRate}
                      onChange={(e) => setFormTaxRate(parseFloat(e.target.value) || 0)}
                      className="w-full bg-white border border-slate-200 p-2 text-slate-800 focus:outline-none focus:border-primary"
                    />
                  </div>

                  <div>
                    <label className="block text-[9px] text-slate-500 uppercase tracking-wider mb-1">
                      Discount ($)
                    </label>
                    <input
                      type="number"
                      step="1"
                      value={formDiscount}
                      onChange={(e) => setFormDiscount(parseFloat(e.target.value) || 0)}
                      className="w-full bg-white border border-slate-200 p-2 text-slate-800 focus:outline-none focus:border-primary"
                    />
                  </div>
                </div>

                <div className="sm:text-right border-t sm:border-t-0 sm:border-l border-slate-200 sm:pl-6 pt-3 sm:pt-0 space-y-1">
                  <div className="text-slate-500 text-[11px]">
                    Subtotal: <span className="text-slate-900 font-bold">${calculatedSubtotal.toLocaleString()}</span>
                  </div>
                  <div className="text-slate-500 text-[11px]">
                    Tax ({formTaxRate}%): <span className="text-slate-900 font-bold">${calculatedTax.toLocaleString()}</span>
                  </div>
                  <div className="text-sm font-extrabold text-primary pt-1 border-t border-slate-200">
                    Grand Total: ${calculatedTotal.toLocaleString()}
                  </div>
                </div>
              </div>

              {/* Notes */}
              <div>
                <label className="block text-[9px] text-slate-500 uppercase tracking-wider mb-1">
                  Payment Instructions / Terms & Notes
                </label>
                <textarea
                  rows={2}
                  value={formNotes}
                  onChange={(e) => setFormNotes(e.target.value)}
                  placeholder="Additional payment wire instructions or project notes..."
                  className="w-full bg-white border border-slate-200 p-2.5 text-slate-800 focus:outline-none focus:border-primary"
                />
              </div>

              {/* Form Action Buttons */}
              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsCreateModalOpen(false)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold uppercase text-xs transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isCreating || isUpdating}
                  className="px-6 py-2.5 bg-primary hover:bg-rose-700 text-white font-bold uppercase text-xs transition-all shadow-sm flex items-center gap-2"
                >
                  {(isCreating || isUpdating) && <RefreshCw className="w-4 h-4 animate-spin" />}
                  {editingInvoice ? "Update Invoice" : "Generate Invoice"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* PRINTABLE / VIEW PDF INVOICE MODAL */}
      {selectedInvoice && (
        <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white border border-slate-200 w-full max-w-4xl shadow-2xl overflow-hidden my-8 my-auto print:m-0 print:border-none print:shadow-none print:bg-white print:text-black">
            {/* Top Toolbar */}
            <div className="px-6 py-4 bg-slate-100 border-b border-slate-200 flex flex-wrap items-center justify-between gap-3 print:hidden">
              <div className="flex items-center gap-2">
                <FileCheck className="w-5 h-5 text-primary" />
                <span className="font-mono font-bold text-sm text-slate-900">
                  Official Statement — {selectedInvoice.invoiceNumber}
                </span>
              </div>
              <div className="flex items-center gap-2">
                {/* DIRECT PDF DOWNLOAD BUTTON */}
                <button
                  onClick={() => handleDownloadPDF()}
                  disabled={isDownloadingPdf}
                  className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-mono text-xs font-bold uppercase flex items-center gap-2 shadow-sm transition-all active:scale-95 disabled:opacity-50"
                  title="Download PDF directly to PC local storage"
                >
                  {isDownloadingPdf ? (
                    <RefreshCw className="w-4 h-4 animate-spin" />
                  ) : (
                    <Download className="w-4 h-4" />
                  )}
                  {isDownloadingPdf ? "Generating PDF..." : "Download PDF"}
                </button>

                <button
                  onClick={() => window.print()}
                  className="px-3 py-1.5 bg-slate-200 hover:bg-slate-300 text-slate-800 font-mono text-xs font-bold uppercase flex items-center gap-2 transition-all"
                >
                  <Printer className="w-4 h-4" />
                  Print Dialog
                </button>

                <button
                  onClick={() => handleSendEmail(selectedInvoice.id)}
                  disabled={isSendingEmail}
                  className="px-3 py-1.5 bg-cyan-600 hover:bg-cyan-700 text-white font-mono text-xs font-bold uppercase flex items-center gap-2 transition-all"
                >
                  <Send className="w-4 h-4" />
                  Send Email
                </button>

                <button onClick={() => setSelectedInvoice(null)} className="p-1.5 text-slate-500 hover:text-slate-900 ml-2">
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Printable Document Body */}
            <div
              id={`printable-statement-${selectedInvoice.id}`}
              className="p-8 space-y-8 font-mono text-xs text-slate-800 bg-white print:p-6"
            >
              {/* Header Letterhead */}
              <div className="flex flex-col sm:flex-row justify-between items-start border-b border-slate-200 pb-6 gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 bg-primary text-white font-bold flex items-center justify-center">
                      M
                    </div>
                    <span className="text-xl font-bold tracking-widest text-slate-900">
                      MACPROTEC ENGINEERING
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-600 mt-2 max-w-sm">
                    Industrial Plants, Heavy Equipment, CFD Simulation & 3D Laser Scanning Solutions
                  </p>
                  <p className="text-[10px] text-slate-400 mt-1">
                    Tax ID / VAT: MP-984210-EU • Global EPC Support
                  </p>
                </div>

                <div className="sm:text-right space-y-1">
                  <div className="text-2xl font-extrabold text-primary">INVOICE</div>
                  <div className="text-sm font-bold text-slate-900">{selectedInvoice.invoiceNumber}</div>
                  <div className="text-[11px] text-slate-500">
                    Issue Date: {new Date(selectedInvoice.issueDate).toLocaleDateString()}
                  </div>
                  {selectedInvoice.dueDate && (
                    <div className="text-[11px] text-primary font-bold">
                      Due Date: {new Date(selectedInvoice.dueDate).toLocaleDateString()}
                    </div>
                  )}
                </div>
              </div>

              {/* Client & Metadata Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 bg-slate-50 p-4 border border-slate-200">
                <div>
                  <div className="text-[9px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                    Billed To:
                  </div>
                  <div className="text-sm font-bold text-slate-900">{selectedInvoice.clientName}</div>
                  {selectedInvoice.clientCompany && (
                    <div className="text-xs text-slate-700 font-semibold">{selectedInvoice.clientCompany}</div>
                  )}
                  <div className="text-xs text-slate-500 mt-0.5">{selectedInvoice.clientEmail}</div>
                  {selectedInvoice.clientAddress && (
                    <div className="text-xs text-slate-500 mt-1">{selectedInvoice.clientAddress}</div>
                  )}
                </div>

                <div className="sm:text-right space-y-1">
                  <div className="text-[9px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                    Project Specifications:
                  </div>
                  <div>
                    Sector: <span className="text-slate-900 font-bold">{selectedInvoice.sector}</span>
                  </div>
                  <div>
                    Classification: <span className="text-slate-900">{selectedInvoice.serviceCategory}</span>
                  </div>
                  <div>
                    Payment Terms: <span className="text-slate-900 font-bold">{selectedInvoice.paymentTerms}</span>
                  </div>
                  <div>
                    Status: <span className="text-primary font-bold uppercase">{selectedInvoice.status}</span>
                  </div>
                </div>
              </div>

              {/* Items Table */}
              <div className="border border-slate-200">
                <table className="w-full text-left font-mono text-xs">
                  <thead className="bg-slate-100 text-slate-600 uppercase text-[9px]">
                    <tr>
                      <th className="px-4 py-3">#</th>
                      <th className="px-4 py-3">Description</th>
                      <th className="px-4 py-3 text-center">Qty</th>
                      <th className="px-4 py-3 text-right">Unit Price</th>
                      <th className="px-4 py-3 text-right">Total ($)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 text-slate-800">
                    {selectedInvoice.items.map((item, idx) => (
                      <tr key={idx}>
                        <td className="px-4 py-3 text-slate-400">{idx + 1}</td>
                        <td className="px-4 py-3 font-medium">{item.description}</td>
                        <td className="px-4 py-3 text-center">{item.quantity}</td>
                        <td className="px-4 py-3 text-right">${item.unitPrice.toLocaleString()}</td>
                        <td className="px-4 py-3 text-right font-bold">${item.totalPrice.toLocaleString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Financial Totals & Bank Wire Box */}
              <div className="flex flex-col sm:flex-row justify-between items-start gap-6 pt-2">
                <div className="bg-slate-50 p-4 border border-slate-200 max-w-sm flex-1">
                  <div className="text-[9px] font-bold uppercase text-slate-500 mb-1">
                    Wire Transfer Information:
                  </div>
                  <div className="text-[11px] text-slate-700 space-y-0.5">
                    <div>Bank: Citibank International N.A.</div>
                    <div>Account Name: MacProtec Engineering Ltd</div>
                    <div>IBAN: US89 CITI 2000 1198 4402 11</div>
                    <div>SWIFT / BIC: CITIUS33XXX</div>
                  </div>
                  {selectedInvoice.notes && (
                    <div className="mt-3 pt-2 border-t border-slate-200 text-[10px] text-slate-500">
                      Note: {selectedInvoice.notes}
                    </div>
                  )}
                </div>

                <div className="w-full sm:w-64 space-y-2 text-right">
                  <div className="flex justify-between text-slate-600">
                    <span>Subtotal:</span>
                    <span className="font-bold text-slate-900">${selectedInvoice.subtotal.toLocaleString()}</span>
                  </div>
                  {selectedInvoice.discount > 0 && (
                    <div className="flex justify-between text-emerald-600">
                      <span>Discount:</span>
                      <span>-${selectedInvoice.discount.toLocaleString()}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-slate-600">
                    <span>Tax ({selectedInvoice.taxRate}%):</span>
                    <span className="font-bold text-slate-900">${selectedInvoice.taxAmount.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-base font-extrabold text-primary pt-2 border-t border-slate-200">
                    <span>TOTAL DUE:</span>
                    <span>${selectedInvoice.totalAmount.toLocaleString()} {selectedInvoice.currency}</span>
                  </div>
                </div>
              </div>

              <div className="text-center text-[10px] text-slate-400 pt-8 border-t border-slate-200">
                Thank you for entrusting MacProtec Engineering with your industrial plant project.
              </div>
            </div>
          </div>
        </div>
      )}

      {/* DELETE CONFIRMATION MODAL */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 p-6 shadow-xl max-w-md w-full space-y-4 font-mono text-xs">
            <div className="flex items-center gap-3 text-primary">
              <AlertTriangle className="w-6 h-6" />
              <h3 className="font-bold text-sm text-slate-900">Confirm Invoice Deletion</h3>
            </div>
            <p className="text-slate-600">
              Are you sure you want to delete this invoice record from the database? This action can be soft-deleted or purged by admin.
            </p>
            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => setDeleteConfirmId(null)}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold uppercase text-xs"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(deleteConfirmId)}
                disabled={isDeleting}
                className="px-4 py-2 bg-primary hover:bg-rose-700 text-white font-bold uppercase text-xs flex items-center gap-2"
              >
                {isDeleting && <RefreshCw className="w-3.5 h-3.5 animate-spin" />}
                Delete Record
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
