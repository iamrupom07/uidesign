"use client";

import { useState } from "react";
import {
  useGetEmployeesQuery,
  useCreateEmployeeMutation,
  useUpdateEmployeeMutation,
  useDeleteEmployeeMutation,
} from "@/redux/api/employeeApi";
import {
  Users,
  Search,
  Plus,
  ShieldCheck,
  CheckCircle2,
  Trash2,
  Edit,
  Mail,
  Phone,
  Briefcase,
  Key,
  Copy,
  Check,
  AlertCircle,
  RefreshCw,
  X,
} from "lucide-react";
import { Employee, EmployeeStatus } from "@repo/types";

export default function EmployeesDashboardPage() {
  // Employee Data & RTK Query
  const {
    data: employeesData,
    isLoading: isEmployeesLoading,
    refetch,
  } = useGetEmployeesQuery();

  const [createEmployee, { isLoading: isCreating }] = useCreateEmployeeMutation();
  const [updateEmployee, { isLoading: isUpdating }] = useUpdateEmployeeMutation();
  const [deleteEmployee, { isLoading: isDeleting }] = useDeleteEmployeeMutation();

  // State
  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState<string>("ALL");
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null);
  const [generatedCredentials, setGeneratedCredentials] = useState<{
    email: string;
    tempPass: string;
    name: string;
  } | null>(null);
  const [copied, setCopied] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "EMPLOYEE" as "ADMIN" | "EMPLOYEE",
    designation: "Senior Thermal CFD Engineer",
    phone: "",
    status: "ACTIVE" as EmployeeStatus,
  });

  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const employees = employeesData?.data || [];

  // Filtered Employees
  const filteredEmployees = employees.filter((emp) => {
    const matchesSearch =
      emp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      emp.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (emp.designation && emp.designation.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesRole = roleFilter === "ALL" || emp.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  // KPI Calculations
  const totalStaff = employees.length;
  const adminClearanceCount = employees.filter((e) => e.role === "ADMIN").length;
  const activeStaffCount = employees.filter((e) => e.status === "ACTIVE").length;

  const handleOpenAddModal = () => {
    setEditingEmployee(null);
    setFormData({
      name: "",
      email: "",
      role: "EMPLOYEE",
      designation: "Senior Process Engineer",
      phone: "",
      status: "ACTIVE",
    });
    setErrorMsg("");
    setShowAddModal(true);
  };

  const handleOpenEditModal = (emp: Employee) => {
    setEditingEmployee(emp);
    setFormData({
      name: emp.name,
      email: emp.email,
      role: (emp.role === "ADMIN" ? "ADMIN" : "EMPLOYEE"),
      designation: emp.designation || "",
      phone: emp.phone || "",
      status: emp.status,
    });
    setErrorMsg("");
    setShowAddModal(true);
  };

  const handleCloseModal = () => {
    setShowAddModal(false);
    setEditingEmployee(null);
    setErrorMsg("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    try {
      if (editingEmployee) {
        await updateEmployee({
          id: editingEmployee.id,
          data: {
            name: formData.name,
            email: formData.email,
            role: formData.role,
            designation: formData.designation,
            phone: formData.phone || undefined,
            status: formData.status,
          },
        }).unwrap();
        setSuccessMsg("Employee record updated successfully!");
      } else {
        const res = await createEmployee({
          name: formData.name,
          email: formData.email,
          role: formData.role,
          designation: formData.designation,
          phone: formData.phone || undefined,
        }).unwrap();

        if (res.data?.tempPasswordRaw) {
          setGeneratedCredentials({
            email: formData.email,
            tempPass: res.data.tempPasswordRaw,
            name: formData.name,
          });
        }
        setSuccessMsg("Employee provisioned with portal credentials!");
      }
      handleCloseModal();
      refetch();
    } catch (err: any) {
      setErrorMsg(err?.data?.message || err?.message || "Failed to save employee.");
    }
  };

  const handleDeleteEmployee = async (id: string) => {
    if (confirm("Are you sure you want to revoke and delete this employee?")) {
      try {
        await deleteEmployee(id).unwrap();
        setSuccessMsg("Employee record removed.");
        refetch();
      } catch (err) {
        console.error("[Delete Employee Error]", err);
      }
    }
  };

  const handleCopyCredentials = () => {
    if (!generatedCredentials) return;
    const text = `MACPROTEC Console Credentials:\nPortal: ${window.location.origin}/login\nEmail: ${generatedCredentials.email}\nTemp Password: ${generatedCredentials.tempPass}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Top Header Title & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <h1 className="font-display font-extrabold text-2xl sm:text-3xl uppercase tracking-tight text-slate-900 mb-1">
            Employee <span className="text-primary">& Staff Directory</span>
          </h1>
          <p className="font-mono text-xs text-slate-500">
            Manage engineering staff, access clearance roles, and automated console security provisioning.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => refetch()}
            className="p-2 bg-white hover:bg-slate-50 border border-slate-200 text-slate-600 rounded transition-colors shadow-sm"
            title="Refresh Staff"
          >
            <RefreshCw className={`w-4 h-4 ${isEmployeesLoading ? "animate-spin text-primary" : ""}`} />
          </button>
          <button
            onClick={handleOpenAddModal}
            className="inline-flex items-center gap-2 px-4 py-2 bg-primary hover:bg-rose-700 text-white font-mono text-xs font-bold uppercase transition-colors shadow-sm rounded"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Employee</span>
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

      {/* NEW CREDENTIALS MODAL/BANNER */}
      {generatedCredentials && (
        <div className="bg-white border-2 border-primary p-6 rounded shadow-lg space-y-4 font-mono text-xs text-slate-800">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2 text-primary font-bold text-sm">
              <Key className="w-5 h-5" />
              <span>Temporary Console Security Credentials Generated</span>
            </div>
            <button onClick={() => setGeneratedCredentials(null)} className="text-slate-400 hover:text-slate-700">
              <X className="w-4 h-4" />
            </button>
          </div>
          <p className="text-slate-600">
            Credentials for <strong>{generatedCredentials.name}</strong>. Share these initial credentials securely:
          </p>
          <div className="p-4 bg-slate-50 border border-slate-200 rounded space-y-1.5 font-bold">
            <div>Email: <span className="text-rose-600">{generatedCredentials.email}</span></div>
            <div>Temp Password: <span className="text-emerald-600 font-mono">{generatedCredentials.tempPass}</span></div>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={handleCopyCredentials}
              className="px-4 py-2 bg-primary hover:bg-rose-700 text-white font-bold uppercase rounded flex items-center gap-2 transition-colors shadow-sm"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-300" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? "Copied to Clipboard!" : "Copy Access Details"}</span>
            </button>
            <button
              onClick={() => setGeneratedCredentials(null)}
              className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold uppercase rounded"
            >
              Dismiss
            </button>
          </div>
        </div>
      )}

      {/* KPI Stats Grid (White cards) */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div className="bg-white border border-slate-200 p-5 shadow-sm rounded">
          <div className="flex justify-between items-start mb-3">
            <span className="font-mono text-[10px] font-bold text-slate-400 uppercase">
              Total Engineering Staff
            </span>
            <Users className="w-5 h-5 text-primary" />
          </div>
          <div className="font-display font-extrabold text-3xl text-slate-900">
            {totalStaff}
          </div>
          <div className="font-mono text-[10px] text-slate-400 mt-1">Active Corporate Personnel</div>
        </div>

        <div className="bg-white border border-slate-200 p-5 shadow-sm rounded">
          <div className="flex justify-between items-start mb-3">
            <span className="font-mono text-[10px] font-bold text-slate-400 uppercase">
              Admin Clearance
            </span>
            <ShieldCheck className="w-5 h-5 text-purple-600" />
          </div>
          <div className="font-display font-extrabold text-3xl text-purple-600">
            {adminClearanceCount}
          </div>
          <div className="font-mono text-[10px] text-slate-400 mt-1">Full System Authority</div>
        </div>

        <div className="bg-white border border-slate-200 p-5 shadow-sm rounded">
          <div className="flex justify-between items-start mb-3">
            <span className="font-mono text-[10px] font-bold text-slate-400 uppercase">
              Active Status
            </span>
            <CheckCircle2 className="w-5 h-5 text-emerald-600" />
          </div>
          <div className="font-display font-extrabold text-3xl text-emerald-600">
            {activeStaffCount}
          </div>
          <div className="font-mono text-[10px] text-slate-400 mt-1">Currently Operational</div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white border border-slate-200 p-4 shadow-sm flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 rounded">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search staff by name, email, or designation..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 font-mono text-xs text-slate-800 placeholder:text-slate-400 rounded focus:outline-none focus:border-primary"
          />
        </div>

        {/* Role Filter */}
        <div className="flex items-center gap-1.5 font-mono text-xs">
          {["ALL", "ADMIN", "EMPLOYEE"].map((r) => (
            <button
              key={r}
              onClick={() => setRoleFilter(r)}
              className={`px-3 py-1.5 rounded text-[11px] font-bold transition-colors ${
                roleFilter === r
                  ? "bg-primary text-white"
                  : "bg-slate-50 hover:bg-slate-100 text-slate-600 border border-slate-200"
              }`}
            >
              {r}
            </button>
          ))}
        </div>
      </div>

      {/* Staff Table */}
      <div className="bg-white border border-slate-200 rounded shadow-sm overflow-hidden">
        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full text-left font-mono text-xs text-slate-700 min-w-[750px]">
            <thead className="bg-slate-50 border-b border-slate-200 text-[10px] uppercase font-bold text-slate-500 tracking-wider">
              <tr>
                <th className="py-3 px-4">Staff Member</th>
                <th className="py-3 px-4">Clearance Role</th>
                <th className="py-3 px-4">Designation</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Added Date</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {isEmployeesLoading ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-slate-400">
                    <div className="flex items-center justify-center gap-2">
                      <RefreshCw className="w-4 h-4 animate-spin text-primary" />
                      <span>Loading staff directory...</span>
                    </div>
                  </td>
                </tr>
              ) : filteredEmployees.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-slate-400">
                    No staff records match current filters.
                  </td>
                </tr>
              ) : (
                filteredEmployees.map((emp) => (
                  <tr key={emp.id} className="hover:bg-slate-50 transition-colors group">
                    <td className="py-3.5 px-4">
                      <div className="font-sans font-bold text-sm text-slate-900">{emp.name}</div>
                      <div className="text-[11px] text-slate-500 flex items-center gap-3 mt-0.5">
                        <span className="flex items-center gap-1">
                          <Mail className="w-3 h-3 text-slate-400" />
                          {emp.email}
                        </span>
                        {emp.phone && (
                          <span className="flex items-center gap-1">
                            <Phone className="w-3 h-3 text-slate-400" />
                            {emp.phone}
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="py-3.5 px-4">
                      <span
                        className={`font-mono text-[9px] font-bold px-2.5 py-1 rounded ${
                          emp.role === "ADMIN"
                            ? "bg-purple-50 text-purple-700 border border-purple-200"
                            : "bg-slate-100 text-slate-700 border border-slate-200"
                        }`}
                      >
                        {emp.role}
                      </span>
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="text-slate-900 font-semibold">{emp.designation || "Senior Engineer"}</div>
                    </td>
                    <td className="py-3.5 px-4">
                      <span
                        className={`font-mono text-[9px] font-bold px-2 py-0.5 rounded ${
                          emp.status === "ACTIVE"
                            ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                            : "bg-slate-100 text-slate-600 border border-slate-200"
                        }`}
                      >
                        {emp.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-[11px] text-slate-500">
                      {new Date(emp.createdAt).toLocaleDateString()}
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleOpenEditModal(emp)}
                          className="p-1.5 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded transition-colors"
                          title="Edit Staff Record"
                        >
                          <Edit className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDeleteEmployee(emp.id)}
                          className="p-1.5 text-slate-500 hover:text-rose-600 hover:bg-slate-100 rounded transition-colors"
                          title="Revoke Staff Member"
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

      {/* ADD / EDIT EMPLOYEE MODAL */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white border border-slate-200 rounded max-w-lg w-full p-6 shadow-2xl font-mono text-xs text-slate-800 space-y-4">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <h3 className="font-sans font-bold text-base uppercase text-slate-900 flex items-center gap-2">
                <Users className="w-4 h-4 text-primary" />
                <span>{editingEmployee ? "Edit Employee Record" : "Provision New Employee"}</span>
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
                    Staff Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Ronald Miller"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 p-2 text-slate-800 rounded focus:outline-none focus:border-primary"
                  />
                </div>
                <div>
                  <label className="block text-[9px] text-slate-500 uppercase font-bold mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="r.miller@macprotec.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 p-2 text-slate-800 rounded focus:outline-none focus:border-primary"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[9px] text-slate-500 uppercase font-bold mb-1">
                    Clearance Role
                  </label>
                  <select
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value as "ADMIN" | "EMPLOYEE" })}
                    className="w-full bg-slate-50 border border-slate-200 p-2 text-slate-800 rounded focus:outline-none focus:border-primary"
                  >
                    <option value="EMPLOYEE">EMPLOYEE (Standard Staff)</option>
                    <option value="ADMIN">ADMIN (Full Console Clearance)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[9px] text-slate-500 uppercase font-bold mb-1">
                    Designation
                  </label>
                  <input
                    type="text"
                    placeholder="Lead Thermal CFD Engineer"
                    value={formData.designation}
                    onChange={(e) => setFormData({ ...formData, designation: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 p-2 text-slate-800 rounded focus:outline-none focus:border-primary"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[9px] text-slate-500 uppercase font-bold mb-1">
                    Status
                  </label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value as EmployeeStatus })}
                    className="w-full bg-slate-50 border border-slate-200 p-2 text-slate-800 rounded focus:outline-none focus:border-primary"
                  >
                    <option value="ACTIVE">ACTIVE</option>
                    <option value="INACTIVE">INACTIVE</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[9px] text-slate-500 uppercase font-bold mb-1">
                    Phone Number
                  </label>
                  <input
                    type="text"
                    placeholder="+1 (555) 0184"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
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
                  <span>{editingEmployee ? "Save Changes" : "Provision Employee"}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
