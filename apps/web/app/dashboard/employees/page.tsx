"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import TechnicalCursor from "@/components/ui/TechnicalCursor";
import { useGetMeQuery, useLogoutMutation } from "@/redux/api/authApi";
import {
  useGetEmployeesQuery,
  useGetEmployeeStatsQuery,
  useCreateEmployeeMutation,
  useUpdateEmployeeMutation,
  useUpdateEmployeeStatusMutation,
  useSendCredentialEmailMutation,
  useDeleteEmployeeMutation,
} from "@/redux/api/employeeApi";
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
  CheckCircle2,
  Trash2,
  Edit,
  Mail,
  Phone,
  UserCheck,
  UserX,
  ShieldCheck,
  Send,
  AlertTriangle,
  RefreshCw,
  BadgeCheck,
  Briefcase,
  KeyRound,
} from "lucide-react";
import { Employee, EmployeeStatus } from "@repo/types";

export default function EmployeeDashboardPage() {
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

  // Filters & State
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("ALL");

  // Modals state
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [credentialToast, setCredentialToast] = useState<{
    open: boolean;
    name: string;
    email: string;
    empId: string;
    tempPass: string;
  } | null>(null);

  // RTK Query API Hooks
  const {
    data: employeesData,
    isLoading: isEmployeesLoading,
    refetch,
  } = useGetEmployeesQuery({
    status: statusFilter,
    search: searchQuery,
  });

  const { data: statsData } = useGetEmployeeStatsQuery();

  const [createEmployee, { isLoading: isCreating }] = useCreateEmployeeMutation();
  const [updateEmployee, { isLoading: isUpdating }] = useUpdateEmployeeMutation();
  const [updateEmployeeStatus] = useUpdateEmployeeStatusMutation();
  const [sendCredentialEmail, { isLoading: isSendingEmail }] = useSendCredentialEmailMutation();
  const [deleteEmployee, { isLoading: isDeleting }] = useDeleteEmployeeMutation();

  const employees = employeesData?.data || [];
  const stats = statsData?.data;

  // Form State for Create/Edit Employee
  const [formName, setFormName] = useState("");
  const [formEmail, setFormEmail] = useState("");
  const [formDesignation, setFormDesignation] = useState("Staff Engineer");
  const [formPhone, setFormPhone] = useState("");
  const [formRole, setFormRole] = useState<"EMPLOYEE" | "ADMIN">("EMPLOYEE");
  const [formError, setFormError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const handleOpenCreate = () => {
    setEditingEmployee(null);
    setFormName("");
    setFormEmail("");
    setFormDesignation("Industrial Project Specialist");
    setFormPhone("");
    setFormRole("EMPLOYEE");
    setFormError("");
    setIsCreateModalOpen(true);
  };

  const handleOpenEdit = (emp: Employee) => {
    setEditingEmployee(emp);
    setFormName(emp.name);
    setFormEmail(emp.email);
    setFormDesignation(emp.designation || "Staff Member");
    setFormPhone(emp.phone || "");
    setFormRole(emp.role === "ADMIN" ? "ADMIN" : "EMPLOYEE");
    setFormError("");
    setIsCreateModalOpen(true);
  };

  const handleSubmitForm = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName || !formEmail) {
      setFormError("Staff full name and valid email are required.");
      return;
    }

    try {
      if (editingEmployee) {
        await updateEmployee({
          id: editingEmployee.id,
          data: {
            name: formName,
            email: formEmail,
            designation: formDesignation,
            phone: formPhone || undefined,
            role: formRole,
          },
        }).unwrap();
        setSuccessMsg(`Employee account for ${formName} updated successfully.`);
      } else {
        const result = await createEmployee({
          name: formName,
          email: formEmail,
          designation: formDesignation,
          phone: formPhone || undefined,
          role: formRole,
        }).unwrap();

        setSuccessMsg(`Employee ${formName} created successfully! Credentials sent to ${formEmail}.`);
        setCredentialToast({
          open: true,
          name: result.data.employee.name,
          email: result.data.employee.email,
          empId: result.data.employee.employeeId || "EMP",
          tempPass: result.data.tempPasswordRaw,
        });
      }

      setStatusFilter("ALL");
      setSearchQuery("");
      setIsCreateModalOpen(false);
      refetch();
    } catch (err: any) {
      setFormError(err?.data?.message || "Failed to save employee account");
    }
  };

  const handleStatusQuickChange = async (id: string, newStatus: EmployeeStatus) => {
    try {
      await updateEmployeeStatus({ id, status: newStatus }).unwrap();
      refetch();
    } catch (err) {
      console.error("Failed to update employee status", err);
    }
  };

  const handleResendCredentials = async (emp: Employee) => {
    try {
      const res = await sendCredentialEmail(emp.id).unwrap();
      setSuccessMsg(res.data.message);
      if (res.data.tempPassword) {
        setCredentialToast({
          open: true,
          name: emp.name,
          email: emp.email,
          empId: emp.employeeId || "EMP",
          tempPass: res.data.tempPassword,
        });
      }
      refetch();
    } catch (err) {
      setSuccessMsg("Failed to send credential email.");
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteEmployee(id).unwrap();
      setDeleteConfirmId(null);
      setSuccessMsg("Employee account deleted successfully.");
      refetch();
    } catch (err) {
      console.error("Failed to delete employee", err);
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
          <span>INITIALIZING MACPROTEC STAFF SYSTEM...</span>
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
                    className="w-full flex items-center justify-between px-3 py-2.5 text-xs font-mono rounded transition-all duration-150 group text-slate-400 hover:bg-slate-900 hover:text-slate-200"
                  >
                    <div className="flex items-center gap-3">
                      <Wallet className="w-4 h-4 text-slate-400 group-hover:text-slate-200" />
                      <span>Finance Ledger</span>
                    </div>
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

                  {/* ACTIVE TAB STYLING FOR EMPLOYEE DIRECTORY */}
                  <Link
                    href="/dashboard/employees"
                    className="w-full flex items-center justify-between px-3 py-2.5 text-xs font-mono rounded transition-all duration-150 group bg-rose-500/10 text-white font-bold border-l-2 border-primary"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <UserCheck className="w-4 h-4 shrink-0 text-primary" />
                      <span className="truncate">Employee Directory</span>
                    </div>
                    <ChevronRight className="w-3.5 h-3.5 text-primary shrink-0" />
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
                <span className="text-primary font-bold">Employee Directory</span>
              </span>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={handleOpenCreate}
                className="inline-flex items-center gap-2 px-4 py-2 bg-primary hover:bg-rose-700 text-white font-mono text-xs font-bold uppercase transition-colors shadow-sm"
              >
                <Plus className="w-4 h-4" />
                <span>Add New Employee</span>
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

            {/* Generated Credentials Popup Banner */}
            {credentialToast && credentialToast.open && (
              <div className="bg-slate-900 border border-slate-800 text-white p-5 rounded shadow-xl font-mono text-xs space-y-3">
                <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                  <div className="flex items-center gap-2 text-rose-400 font-bold">
                    <KeyRound className="w-4 h-4" />
                    <span>Employee Login Credentials Generated & Emailed</span>
                  </div>
                  <button onClick={() => setCredentialToast(null)} className="text-slate-400 hover:text-white">
                    <X className="w-4 h-4" />
                  </button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-slate-300">
                  <div>
                    Staff: <span className="text-white font-bold">{credentialToast.name}</span>
                  </div>
                  <div>
                    Emp ID: <span className="text-rose-400 font-bold">{credentialToast.empId}</span>
                  </div>
                  <div>
                    Email: <span className="text-slate-200">{credentialToast.email}</span>
                  </div>
                  <div>
                    Temp Password: <span className="bg-slate-800 text-emerald-400 px-2 py-0.5 rounded font-bold border border-slate-700">{credentialToast.tempPass}</span>
                  </div>
                </div>
              </div>
            )}

            {/* Header Title */}
            <div>
              <h1 className="font-display font-extrabold text-2xl sm:text-3xl uppercase tracking-tight text-slate-900 mb-1">
                Employee <span className="text-primary">& Staff Management</span>
              </h1>
              <p className="font-mono text-xs text-slate-500">
                Create employee accounts, generate Employee IDs & temporary passwords, and manage dashboard permissions.
              </p>
            </div>

            {/* KPI Cards (Light theme) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              <div className="bg-white border border-slate-200 p-5 shadow-sm rounded-none">
                <div className="flex justify-between items-start mb-3">
                  <span className="font-mono text-[10px] font-bold text-slate-400 uppercase">
                    Total Staff
                  </span>
                  <Users className="w-5 h-5 text-primary" />
                </div>
                <div className="font-display font-extrabold text-3xl text-slate-900">
                  {stats?.totalEmployees || employees.length}
                </div>
                <div className="font-mono text-[10px] text-slate-400 mt-1">
                  Registered User Accounts
                </div>
              </div>

              <div className="bg-white border border-slate-200 p-5 shadow-sm rounded-none">
                <div className="flex justify-between items-start mb-3">
                  <span className="font-mono text-[10px] font-bold text-slate-400 uppercase">
                    Active Staff
                  </span>
                  <UserCheck className="w-5 h-5 text-emerald-600" />
                </div>
                <div className="font-display font-extrabold text-3xl text-emerald-600">
                  {stats?.activeCount || employees.filter((e) => e.status === "ACTIVE" || !e.status).length}
                </div>
                <div className="font-mono text-[10px] text-slate-400 mt-1">
                  Active Access Granted
                </div>
              </div>

              <div className="bg-white border border-slate-200 p-5 shadow-sm rounded-none">
                <div className="flex justify-between items-start mb-3">
                  <span className="font-mono text-[10px] font-bold text-slate-400 uppercase">
                    Inactive Accounts
                  </span>
                  <UserX className="w-5 h-5 text-rose-600" />
                </div>
                <div className="font-display font-extrabold text-3xl text-rose-600">
                  {stats?.inactiveCount || employees.filter((e) => e.status === "INACTIVE").length}
                </div>
                <div className="font-mono text-[10px] text-slate-400 mt-1">
                  Suspended Access
                </div>
              </div>

              <div className="bg-white border border-slate-200 p-5 shadow-sm rounded-none">
                <div className="flex justify-between items-start mb-3">
                  <span className="font-mono text-[10px] font-bold text-slate-400 uppercase">
                    New This Month
                  </span>
                  <BadgeCheck className="w-5 h-5 text-cyan-600" />
                </div>
                <div className="font-display font-extrabold text-3xl text-cyan-600">
                  {stats?.newThisMonth || 0}
                </div>
                <div className="font-mono text-[10px] text-slate-400 mt-1">
                  Recently Onboarded
                </div>
              </div>
            </div>

            {/* Filter & Search Toolbar */}
            <div className="bg-white border border-slate-200 p-4 shadow-sm flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
              <div className="relative flex-1 max-w-md">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search staff name, email, Employee ID, or title..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 font-mono text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-primary"
                />
              </div>

              <div className="flex items-center gap-1 overflow-x-auto py-1 scrollbar-none">
                {["ALL", "ACTIVE", "INACTIVE"].map((st) => (
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
            </div>

            {/* Employee Directory Table */}
            <div className="bg-white border border-slate-200 shadow-sm rounded-none overflow-hidden">
              <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                <div className="flex items-center gap-2">
                  <UserCheck className="w-4 h-4 text-primary" />
                  <h3 className="font-display font-extrabold text-xs uppercase tracking-wider text-slate-900">
                    Employee Accounts Directory ({employees.length})
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

              {isEmployeesLoading ? (
                <div className="py-16 text-center font-mono text-slate-500 text-xs flex items-center justify-center gap-3">
                  <RefreshCw className="w-4 h-4 animate-spin text-primary" />
                  FETCHING STAFF RECORDS...
                </div>
              ) : employees.length === 0 ? (
                <div className="py-16 text-center font-mono text-slate-500 text-xs">
                  <Users className="w-10 h-10 mx-auto mb-3 text-slate-300" />
                  No employee records match current filters.
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left font-mono text-xs">
                    <thead className="bg-slate-50 text-slate-500 uppercase text-[9px] tracking-wider border-b border-slate-200">
                      <tr>
                        <th className="px-6 py-3.5">Emp ID</th>
                        <th className="px-6 py-3.5">Staff Member</th>
                        <th className="px-6 py-3.5">Designation & Role</th>
                        <th className="px-6 py-3.5">Contact</th>
                        <th className="px-6 py-3.5">Status</th>
                        <th className="px-6 py-3.5 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-slate-700">
                      {employees.map((emp) => (
                        <tr key={emp.id} className="hover:bg-slate-50 transition-colors group">
                          {/* Emp ID */}
                          <td className="px-6 py-4 font-bold text-primary">
                            {emp.employeeId || `EMP-${emp.id.substring(0, 6).toUpperCase()}`}
                          </td>

                          {/* Staff Name & Email */}
                          <td className="px-6 py-4">
                            <div className="font-bold text-slate-900">{emp.name}</div>
                            <div className="text-[11px] text-slate-500 flex items-center gap-1.5 mt-0.5">
                              <Mail className="w-3 h-3 text-slate-400" />
                              {emp.email}
                            </div>
                          </td>

                          {/* Designation & Role */}
                          <td className="px-6 py-4">
                            <div className="font-semibold text-slate-800">{emp.designation || "Staff Member"}</div>
                            <div className="mt-1">
                              <span
                                className={`px-2 py-0.5 text-[9px] font-bold uppercase border ${
                                  emp.role === "ADMIN"
                                    ? "bg-rose-50 text-rose-700 border-rose-200"
                                    : "bg-slate-100 text-slate-700 border-slate-200"
                                }`}
                              >
                                {emp.role}
                              </span>
                            </div>
                          </td>

                          {/* Contact */}
                          <td className="px-6 py-4 text-[11px]">
                            {emp.phone ? (
                              <div className="flex items-center gap-1.5 text-slate-600">
                                <Phone className="w-3 h-3 text-slate-400" />
                                {emp.phone}
                              </div>
                            ) : (
                              <span className="text-slate-400">—</span>
                            )}
                          </td>

                          {/* Status Badge with Select */}
                          <td className="px-6 py-4">
                            <select
                              value={emp.status || "ACTIVE"}
                              onChange={(e) =>
                                handleStatusQuickChange(emp.id, e.target.value as EmployeeStatus)
                              }
                              className={`px-2.5 py-1 text-[10px] font-bold uppercase border focus:outline-none cursor-pointer transition-colors ${
                                emp.status === "ACTIVE" || !emp.status
                                  ? "bg-emerald-50 text-emerald-700 border-emerald-300"
                                  : "bg-rose-50 text-rose-700 border-rose-300"
                              }`}
                            >
                              <option value="ACTIVE">ACTIVE</option>
                              <option value="INACTIVE">INACTIVE</option>
                            </select>
                          </td>

                          {/* Actions */}
                          <td className="px-6 py-4 text-right">
                            <div className="flex items-center justify-end gap-1.5">
                              {/* RESEND CREDENTIALS EMAIL BUTTON */}
                              <button
                                onClick={() => handleResendCredentials(emp)}
                                disabled={isSendingEmail}
                                className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 text-[10px] font-bold uppercase flex items-center gap-1 transition-colors"
                                title="Resend Credentials Email"
                              >
                                <Send className="w-3 h-3 text-primary" />
                                <span>Credentials</span>
                              </button>

                              <button
                                onClick={() => handleOpenEdit(emp)}
                                className="p-1.5 text-slate-500 hover:text-amber-600 hover:bg-slate-100 transition-colors"
                                title="Edit Staff Member"
                              >
                                <Edit className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => setDeleteConfirmId(emp.id)}
                                className="p-1.5 text-slate-500 hover:text-rose-600 hover:bg-slate-100 transition-colors"
                                title="Delete Account"
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

      {/* CREATE / EDIT EMPLOYEE MODAL */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white border border-slate-200 w-full max-w-xl shadow-xl overflow-hidden my-8 my-auto">
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
              <div className="flex items-center gap-2.5">
                <UserCheck className="w-5 h-5 text-primary" />
                <h3 className="font-display font-extrabold text-sm uppercase text-slate-900">
                  {editingEmployee ? `Edit Employee: ${editingEmployee.name}` : "Onboard New Employee"}
                </h3>
              </div>
              <button onClick={() => setIsCreateModalOpen(false)} className="text-slate-400 hover:text-slate-700 p-1">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmitForm} className="p-6 space-y-4 font-mono text-xs">
              {formError && (
                <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 shrink-0 text-primary" />
                  <span>{formError}</span>
                </div>
              )}

              {/* Info Notification */}
              {!editingEmployee && (
                <div className="p-3 bg-slate-50 border border-slate-200 text-slate-600 text-[11px] space-y-1">
                  <div className="font-bold text-slate-800 flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    <span>Automated Credentials & Welcome Email</span>
                  </div>
                  <p>
                    An Employee ID and secure temporary password will be auto-generated and dispatched directly to the employee's email address upon creation.
                  </p>
                </div>
              )}

              <div>
                <label className="block text-[9px] text-slate-500 uppercase tracking-wider mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  placeholder="e.g. David Vance"
                  className="w-full bg-white border border-slate-200 p-2.5 text-slate-800 focus:outline-none focus:border-primary"
                />
              </div>

              <div>
                <label className="block text-[9px] text-slate-500 uppercase tracking-wider mb-1">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  value={formEmail}
                  onChange={(e) => setFormEmail(e.target.value)}
                  placeholder="e.g. david.vance@macprotec.com"
                  className="w-full bg-white border border-slate-200 p-2.5 text-slate-800 focus:outline-none focus:border-primary"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[9px] text-slate-500 uppercase tracking-wider mb-1">
                    Designation / Title
                  </label>
                  <input
                    type="text"
                    value={formDesignation}
                    onChange={(e) => setFormDesignation(e.target.value)}
                    placeholder="e.g. CFD Simulation Specialist"
                    className="w-full bg-white border border-slate-200 p-2.5 text-slate-800 focus:outline-none focus:border-primary"
                  />
                </div>

                <div>
                  <label className="block text-[9px] text-slate-500 uppercase tracking-wider mb-1">
                    Phone Number
                  </label>
                  <input
                    type="text"
                    value={formPhone}
                    onChange={(e) => setFormPhone(e.target.value)}
                    placeholder="e.g. +1 (713) 984-2104"
                    className="w-full bg-white border border-slate-200 p-2.5 text-slate-800 focus:outline-none focus:border-primary"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[9px] text-slate-500 uppercase tracking-wider mb-1">
                  System Role
                </label>
                <select
                  value={formRole}
                  onChange={(e) => setFormRole(e.target.value as "EMPLOYEE" | "ADMIN")}
                  className="w-full bg-white border border-slate-200 p-2.5 text-slate-800 focus:outline-none focus:border-primary"
                >
                  <option value="EMPLOYEE">EMPLOYEE (Standard Dashboard & Tools Access)</option>
                  <option value="ADMIN">ADMINISTRATOR (Full System & User Control)</option>
                </select>
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
                  {editingEmployee ? "Update Account" : "Onboard & Send Credentials"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* DELETE CONFIRMATION MODAL */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 p-6 shadow-xl max-w-md w-full space-y-4 font-mono text-xs">
            <div className="flex items-center gap-3 text-primary">
              <AlertTriangle className="w-6 h-6" />
              <h3 className="font-bold text-sm text-slate-900">Confirm Employee Deletion</h3>
            </div>
            <p className="text-slate-600">
              Are you sure you want to delete this employee account from the database? They will no longer be able to log in to the dashboard.
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
                Delete Account
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
