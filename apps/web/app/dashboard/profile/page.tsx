"use client";

import { useState, useEffect } from "react";
import {
  useGetMeQuery,
  useUpdateProfileMutation,
  useChangePasswordMutation,
} from "@/redux/api/authApi";
import { useUploadCloudinaryImageMutation } from "@/redux/api/blogApi";
import {
  User,
  Shield,
  CheckCircle2,
  AlertTriangle,
  RefreshCw,
  Upload,
  Lock,
  Mail,
  Phone,
  Briefcase,
  Sparkles,
  UserCheck,
  X,
} from "lucide-react";

export default function ProfileDashboardPage() {
  const [activeTab, setActiveTab] = useState<"info" | "security" | "permissions">("info");

  // Auth Hook
  const { data: userData, isLoading: isAuthLoading, refetch } = useGetMeQuery();

  const [updateProfile, { isLoading: isUpdatingProfile }] = useUpdateProfileMutation();
  const [changePassword, { isLoading: isChangingPassword }] = useChangePasswordMutation();
  const [uploadCloudinaryImage, { isLoading: isUploadingImage }] =
    useUploadCloudinaryImageMutation();

  const currentUser = userData?.data;

  // Form States
  const [name, setName] = useState("");
  const [designation, setDesignation] = useState("");
  const [phone, setPhone] = useState("");
  const [image, setImage] = useState("");

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [statusMsg, setStatusMsg] = useState<{ type: "success" | "error"; text: string } | null>(
    null
  );

  useEffect(() => {
    if (currentUser) {
      setName(currentUser.name || "");
      setDesignation((currentUser as any).designation || "Process Engineering Lead");
      setPhone((currentUser as any).phone || "+1 (713) 555-0199");
      setImage(currentUser.image || "");
    }
  }, [currentUser]);

  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = async () => {
      try {
        const base64Str = reader.result as string;
        const res = await uploadCloudinaryImage({
          image: base64Str,
          folder: "macprotec_avatars",
        }).unwrap();
        if (res.data?.url) {
          setImage(res.data.url);
          await updateProfile({ image: res.data.url }).unwrap();
          setStatusMsg({ type: "success", text: "Profile avatar uploaded successfully!" });
          refetch();
        }
      } catch (err: any) {
        setStatusMsg({
          type: "error",
          text: err?.data?.message || err?.message || "Failed to upload avatar",
        });
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateProfile({ name, designation, phone, image }).unwrap();
      setStatusMsg({ type: "success", text: "Profile information updated successfully!" });
      refetch();
    } catch (err: any) {
      setStatusMsg({
        type: "error",
        text: err?.data?.message || err?.message || "Failed to update profile",
      });
    }
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setStatusMsg({ type: "error", text: "New passwords do not match." });
      return;
    }

    try {
      await changePassword({ currentPassword, newPassword }).unwrap();
      setStatusMsg({ type: "success", text: "Security credentials updated successfully!" });
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err: any) {
      setStatusMsg({
        type: "error",
        text: err?.data?.message || err?.message || "Failed to change password",
      });
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Top Header Title & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <h1 className="font-display font-extrabold text-2xl sm:text-3xl uppercase tracking-tight text-slate-900 mb-1">
            User Profile <span className="text-primary">& Security Clearance</span>
          </h1>
          <p className="font-mono text-xs text-slate-500">
            Manage your account credentials, security access levels, and personal profile details.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => refetch()}
            className="px-3.5 py-2 bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 font-mono text-xs flex items-center gap-2 rounded transition-colors shadow-sm"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isAuthLoading ? "animate-spin text-primary" : ""}`} />
            <span>SYNC PROFILE</span>
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

      {/* Profile Overview Card (White Card) */}
      <div className="bg-white border border-slate-200 rounded p-6 shadow-sm flex flex-col sm:flex-row items-center gap-6">
        <div className="relative group">
          {image ? (
            <img
              src={image}
              alt={currentUser?.name || "User Avatar"}
              className="w-24 h-24 rounded-full object-cover border-2 border-rose-500 shadow-md"
            />
          ) : (
            <div className="w-24 h-24 rounded-full bg-rose-50 border border-rose-200 text-primary flex items-center justify-center font-bold text-3xl shadow-md">
              {currentUser?.name?.charAt(0) || "U"}
            </div>
          )}

          <label className="absolute inset-0 bg-black/60 rounded-full flex flex-col items-center justify-center text-white text-[10px] font-mono opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
            <Upload className="w-5 h-5 mb-1 text-primary" />
            <span>Change Photo</span>
            <input
              type="file"
              accept="image/*"
              onChange={handleAvatarUpload}
              disabled={isUploadingImage}
              className="hidden"
            />
          </label>
        </div>

        <div className="text-center sm:text-left flex-1 font-mono text-xs">
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-1">
            <h2 className="font-sans font-bold text-xl text-slate-900">{currentUser?.name}</h2>
            <span className="inline-block px-2.5 py-0.5 rounded bg-rose-50 text-rose-700 border border-rose-200 font-bold text-[10px] uppercase w-fit mx-auto sm:mx-0">
              {currentUser?.role || "ADMIN"} CLEARANCE
            </span>
          </div>
          <div className="text-slate-500 mb-2">{currentUser?.email}</div>
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 text-[11px] text-slate-600">
            <span className="flex items-center gap-1">
              <Briefcase className="w-3.5 h-3.5 text-slate-400" />
              {designation}
            </span>
            <span className="flex items-center gap-1">
              <Phone className="w-3.5 h-3.5 text-slate-400" />
              {phone}
            </span>
            <span className="flex items-center gap-1 text-emerald-600 font-bold">
              <UserCheck className="w-3.5 h-3.5" />
              Active Clearance
            </span>
          </div>
        </div>
      </div>

      {/* Tabs Switcher */}
      <div className="flex border-b border-slate-200 font-mono text-xs">
        <button
          onClick={() => setActiveTab("info")}
          className={`px-4 py-3 font-bold uppercase transition-colors border-b-2 flex items-center gap-2 ${
            activeTab === "info"
              ? "border-primary text-primary"
              : "border-transparent text-slate-500 hover:text-slate-900"
          }`}
        >
          <User className="w-4 h-4" />
          <span>Profile Details</span>
        </button>
        <button
          onClick={() => setActiveTab("security")}
          className={`px-4 py-3 font-bold uppercase transition-colors border-b-2 flex items-center gap-2 ${
            activeTab === "security"
              ? "border-primary text-primary"
              : "border-transparent text-slate-500 hover:text-slate-900"
          }`}
        >
          <Lock className="w-4 h-4" />
          <span>Security & Password</span>
        </button>
        <button
          onClick={() => setActiveTab("permissions")}
          className={`px-4 py-3 font-bold uppercase transition-colors border-b-2 flex items-center gap-2 ${
            activeTab === "permissions"
              ? "border-primary text-primary"
              : "border-transparent text-slate-500 hover:text-slate-900"
          }`}
        >
          <Shield className="w-4 h-4" />
          <span>Access Clearance</span>
        </button>
      </div>

      {/* TAB CONTENT: PROFILE INFO */}
      {activeTab === "info" && (
        <form
          onSubmit={handleSaveProfile}
          className="bg-white border border-slate-200 rounded p-6 shadow-sm max-w-2xl font-mono text-xs space-y-4"
        >
          <h3 className="font-sans font-bold text-sm uppercase text-slate-900 pb-3 border-b border-slate-100">
            Personal Information
          </h3>

          <div>
            <label className="block text-[10px] text-slate-500 uppercase font-bold mb-1">
              Full Name *
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 p-2.5 text-slate-800 rounded focus:outline-none focus:border-primary"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[10px] text-slate-500 uppercase font-bold mb-1">
                Designation / Position
              </label>
              <input
                type="text"
                value={designation}
                onChange={(e) => setDesignation(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 p-2.5 text-slate-800 rounded focus:outline-none focus:border-primary"
              />
            </div>
            <div>
              <label className="block text-[10px] text-slate-500 uppercase font-bold mb-1">
                Contact Phone
              </label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 p-2.5 text-slate-800 rounded focus:outline-none focus:border-primary"
              />
            </div>
          </div>

          <div>
            <label className="block text-[10px] text-slate-500 uppercase font-bold mb-1">
              Registered Email (Read Only)
            </label>
            <input
              type="email"
              disabled
              value={currentUser?.email || ""}
              className="w-full bg-slate-100 border border-slate-200 p-2.5 text-slate-500 rounded cursor-not-allowed"
            />
          </div>

          <div className="pt-4 border-t border-slate-100 flex justify-end">
            <button
              type="submit"
              disabled={isUpdatingProfile}
              className="px-6 py-2.5 bg-primary hover:bg-rose-700 text-white font-bold text-xs uppercase rounded transition-colors shadow-sm flex items-center gap-2 disabled:opacity-50"
            >
              {isUpdatingProfile && <RefreshCw className="w-3.5 h-3.5 animate-spin" />}
              <span>Save Profile Changes</span>
            </button>
          </div>
        </form>
      )}

      {/* TAB CONTENT: SECURITY & PASSWORD */}
      {activeTab === "security" && (
        <form
          onSubmit={handleChangePassword}
          className="bg-white border border-slate-200 rounded p-6 shadow-sm max-w-2xl font-mono text-xs space-y-4"
        >
          <h3 className="font-sans font-bold text-sm uppercase text-slate-900 pb-3 border-b border-slate-100 flex items-center gap-2">
            <Lock className="w-4 h-4 text-primary" />
            <span>Update Account Password</span>
          </h3>

          <div>
            <label className="block text-[10px] text-slate-500 uppercase font-bold mb-1">
              Current Password *
            </label>
            <input
              type="password"
              required
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              placeholder="••••••••••••"
              className="w-full bg-slate-50 border border-slate-200 p-2.5 text-slate-800 rounded focus:outline-none focus:border-primary"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[10px] text-slate-500 uppercase font-bold mb-1">
                New Password *
              </label>
              <input
                type="password"
                required
                minLength={6}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full bg-slate-50 border border-slate-200 p-2.5 text-slate-800 rounded focus:outline-none focus:border-primary"
              />
            </div>
            <div>
              <label className="block text-[10px] text-slate-500 uppercase font-bold mb-1">
                Confirm New Password *
              </label>
              <input
                type="password"
                required
                minLength={6}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full bg-slate-50 border border-slate-200 p-2.5 text-slate-800 rounded focus:outline-none focus:border-primary"
              />
            </div>
          </div>

          <div className="p-4 bg-slate-50 border border-slate-200 rounded text-slate-600 text-[11px] space-y-1">
            <div className="font-bold text-slate-900 uppercase">Security Requirements:</div>
            <div>• Minimum 6 characters</div>
            <div>• Must include a combination of letters and numbers</div>
            <div>• Will invalidate old session tokens upon update</div>
          </div>

          <div className="pt-4 border-t border-slate-100 flex justify-end">
            <button
              type="submit"
              disabled={isChangingPassword}
              className="px-6 py-2.5 bg-primary hover:bg-rose-700 text-white font-bold text-xs uppercase rounded transition-colors shadow-sm flex items-center gap-2 disabled:opacity-50"
            >
              {isChangingPassword && <RefreshCw className="w-3.5 h-3.5 animate-spin" />}
              <span>Update Password</span>
            </button>
          </div>
        </form>
      )}

      {/* TAB CONTENT: CLEARANCE & PERMISSIONS */}
      {activeTab === "permissions" && (
        <div className="bg-white border border-slate-200 rounded p-6 shadow-sm max-w-2xl font-mono text-xs space-y-4">
          <h3 className="font-sans font-bold text-sm uppercase text-slate-900 pb-3 border-b border-slate-100 flex items-center gap-2">
            <Shield className="w-4 h-4 text-primary" />
            <span>Console Clearance Level & Privileges</span>
          </h3>

          <div className="p-4 bg-slate-50 border border-slate-200 rounded space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-bold text-slate-900">User Role:</span>
              <span className="px-2.5 py-1 rounded bg-purple-50 text-purple-700 border border-purple-200 font-bold uppercase">
                {currentUser?.role || "ADMIN"}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="font-bold text-slate-900">Database Clearance:</span>
              <span className="text-emerald-600 font-bold">Read / Write / Delete</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="font-bold text-slate-900">Financial Records Access:</span>
              <span className="text-emerald-600 font-bold">Unrestricted</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="font-bold text-slate-900">Staff Management:</span>
              <span className="text-emerald-600 font-bold">Admin Level Access</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
