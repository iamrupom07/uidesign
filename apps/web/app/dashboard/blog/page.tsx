"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import TechnicalCursor from "@/components/ui/TechnicalCursor";
import { useGetMeQuery, useLogoutMutation } from "@/redux/api/authApi";
import {
  useGetBlogPostsQuery,
  useGetBlogStatsQuery,
  useCreateBlogPostMutation,
  useUpdateBlogPostMutation,
  useToggleBlogPostPublishMutation,
  useDeleteBlogPostMutation,
  useUploadCloudinaryImageMutation,
} from "@/redux/api/blogApi";
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
  Building,
  Printer,
  Send,
  Eye,
  RefreshCw,
  Image as ImageIcon,
  Sparkles,
  Layers,
  Clock,
  User,
  ExternalLink,
  AlertTriangle,
  Globe,
  Grid,
  AlignLeft,
  AlignRight,
  Maximize2,
  Upload,
} from "lucide-react";
import {
  BlogPost,
  BlogImage,
  BlogImagePosition,
  BlogImageLayout,
} from "@repo/types";

const CATEGORIES = [
  "ALL",
  "Engineering Insights",
  "CFD & Thermal Simulation",
  "3D Laser Scanning",
  "Plant Revamp & EPC",
  "Case Study",
];

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

export default function BlogDashboardPage() {
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
  const [categoryFilter, setCategoryFilter] = useState<string>("ALL");
  const [sectorFilter, setSectorFilter] = useState<string>("ALL");

  // Modals state
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [modalActiveTab, setModalActiveTab] = useState<"edit" | "preview">("edit");
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [previewPost, setPreviewPost] = useState<BlogPost | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  // RTK Query API Hooks
  const {
    data: blogPostsData,
    isLoading: isPostsLoading,
    refetch,
  } = useGetBlogPostsQuery({
    status: statusFilter,
    category: categoryFilter,
    sector: sectorFilter,
    search: searchQuery,
  });

  const { data: statsData } = useGetBlogStatsQuery();

  const [createBlogPost, { isLoading: isCreating }] = useCreateBlogPostMutation();
  const [updateBlogPost, { isLoading: isUpdating }] = useUpdateBlogPostMutation();
  const [toggleBlogPostPublish] = useToggleBlogPostPublishMutation();
  const [deleteBlogPost, { isLoading: isDeleting }] = useDeleteBlogPostMutation();
  const [uploadCloudinaryImage, { isLoading: isUploadingImage }] = useUploadCloudinaryImageMutation();

  const blogPosts = blogPostsData?.data || [];
  const stats = statsData?.data;

  // Form State for Create/Edit Article
  const [formTitle, setFormTitle] = useState("");
  const [formSlug, setFormSlug] = useState("");
  const [formCategory, setFormCategory] = useState("Engineering Insights");
  const [formSector, setFormSector] = useState("Cement");
  const [formCoverImage, setFormCoverImage] = useState("");
  const [formAuthorName, setFormAuthorName] = useState("MacProtec Technical Desk");
  const [formAuthorTitle, setFormAuthorTitle] = useState("Chief Process Engineer");
  const [formExcerpt, setFormExcerpt] = useState("");
  const [formContent, setFormContent] = useState("");
  const [formIsPublished, setFormIsPublished] = useState(true);
  const [uploadingTarget, setUploadingTarget] = useState<string | null>(null);
  const [formImages, setFormImages] = useState<
    {
      url: string;
      caption: string;
      altText: string;
      position: BlogImagePosition;
      layout: BlogImageLayout;
    }[]
  >([
    {
      url: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=1200",
      caption: "3D Laser Scan Cloud Data of Preheater Tower Base",
      altText: "3D Laser Scan",
      position: "BODY_MID",
      layout: "FULL",
    },
  ]);
  const [formError, setFormError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const handleOpenCreate = () => {
    setEditingPost(null);
    setModalActiveTab("edit");
    setFormTitle("");
    setFormSlug("");
    setFormCategory("Engineering Insights");
    setFormSector("Cement");
    setFormCoverImage("https://images.unsplash.com/photo-1581092335397-9583fe92d232?q=80&w=1200");
    setFormAuthorName("MacProtec Technical Desk");
    setFormAuthorTitle("Chief Process Engineer");
    setFormExcerpt("");
    setFormContent(
      "High temperature clinker cooler efficiency is paramount for reducing specific heat consumption in modern cement manufacturing plants.\n\n## Technical Problem Statement\nThermal stress and material build-up in preheater bypass lines frequently cause unscheduled plant shutdowns. Traditional thermal modeling fails to account for non-uniform airflow distributions across refractory walls.\n\n## CFD & Laser Scanning Solution\nBy capturing high-density 3D spatial laser scans combined with 3-phase Computational Fluid Dynamics (CFD), MacProtec engineers mapped gas velocity vectors and localized pressure drops across the cooler throat.\n\n## Results & Energy Recovery\n- Reduced overall pressure drop by 18%\n- Increased tertiary air temperature recovery by 42°C\n- Extended refractory lifespan by 2.5x"
    );
    setFormIsPublished(true);
    setFormImages([
      {
        url: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=1200",
        caption: "CFD Thermal Airflow Velocity Map inside Kiln Hood",
        altText: "CFD Thermal Airflow",
        position: "BODY_MID",
        layout: "FULL",
      },
    ]);
    setFormError("");
    setIsCreateModalOpen(true);
  };

  const handleOpenEdit = (post: BlogPost) => {
    setEditingPost(post);
    setModalActiveTab("edit");
    setFormTitle(post.title);
    setFormSlug(post.slug);
    setFormCategory(post.category);
    setFormSector(post.sector || "Cement");
    setFormCoverImage(post.coverImage || "");
    setFormAuthorName(post.authorName || "MacProtec Technical Desk");
    setFormAuthorTitle(post.authorTitle || "Chief Process Engineer");
    setFormExcerpt(post.excerpt);
    setFormContent(post.content);
    setFormIsPublished(post.isPublished);
    setFormImages(
      post.images.map((img) => ({
        url: img.url,
        caption: img.caption || "",
        altText: img.altText || "",
        position: (img.position as BlogImagePosition) || "BODY_MID",
        layout: (img.layout as BlogImageLayout) || "FULL",
      }))
    );
    setFormError("");
    setIsCreateModalOpen(true);
  };

  // Cloudinary Image Upload Handlers
  const handleUploadCoverPhoto = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingTarget("cover");
    const reader = new FileReader();
    reader.onloadend = async () => {
      try {
        const base64Str = reader.result as string;
        const res = await uploadCloudinaryImage({ image: base64Str, folder: "macprotec_blog" }).unwrap();
        if (res.data?.url) {
          setFormCoverImage(res.data.url);
          setSuccessMsg("Cover image uploaded to Cloudinary successfully!");
        }
      } catch (err: any) {
        setFormError(err?.data?.message || "Cloudinary image upload failed");
      } finally {
        setUploadingTarget(null);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleUploadInlinePhoto = async (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingTarget(`inline-${index}`);
    const reader = new FileReader();
    reader.onloadend = async () => {
      try {
        const base64Str = reader.result as string;
        const res = await uploadCloudinaryImage({ image: base64Str, folder: "macprotec_blog" }).unwrap();
        if (res.data?.url) {
          handleImageChange(index, "url", res.data.url);
          setSuccessMsg(`Inline Photo #${index + 1} uploaded to Cloudinary!`);
        }
      } catch (err: any) {
        setFormError(err?.data?.message || "Cloudinary image upload failed");
      } finally {
        setUploadingTarget(null);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleAddImageRow = () => {
    setFormImages([
      ...formImages,
      {
        url: "",
        caption: "",
        altText: "",
        position: "BODY_MID",
        layout: "FULL",
      },
    ]);
  };

  const handleRemoveImageRow = (index: number) => {
    setFormImages(formImages.filter((_, i) => i !== index));
  };

  const handleImageChange = (index: number, field: string, value: any) => {
    const updated = [...formImages];
    updated[index] = { ...updated[index], [field]: value };
    setFormImages(updated);
  };

  const handleSubmitForm = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formTitle || !formExcerpt || !formContent) {
      setFormError("Article title, excerpt summary, and body content are required.");
      return;
    }

    try {
      const payload = {
        title: formTitle,
        slug: formSlug || undefined,
        category: formCategory,
        sector: formSector,
        coverImage: formCoverImage || undefined,
        authorName: formAuthorName,
        authorTitle: formAuthorTitle,
        excerpt: formExcerpt,
        content: formContent,
        isPublished: formIsPublished,
        images: formImages
          .filter((img) => img.url.trim() !== "")
          .map((img) => ({
            url: img.url,
            caption: img.caption || undefined,
            altText: img.altText || undefined,
            position: img.position,
            layout: img.layout,
          })),
      };

      if (editingPost) {
        await updateBlogPost({ id: editingPost.id, data: payload }).unwrap();
        setSuccessMsg(`Article "${formTitle}" updated successfully.`);
      } else {
        const created = await createBlogPost(payload).unwrap();
        setSuccessMsg(`Article "${created.data.title}" published successfully.`);
      }

      setStatusFilter("ALL");
      setCategoryFilter("ALL");
      setSearchQuery("");
      setIsCreateModalOpen(false);
      refetch();
    } catch (err: any) {
      setFormError(err?.data?.message || "Failed to save blog article");
    }
  };

  const handleTogglePublish = async (id: string, currentStatus: boolean) => {
    try {
      await toggleBlogPostPublish({ id, isPublished: !currentStatus }).unwrap();
      refetch();
    } catch (err) {
      console.error("Failed to update status", err);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteBlogPost(id).unwrap();
      setDeleteConfirmId(null);
      if (previewPost?.id === id) setPreviewPost(null);
      setSuccessMsg("Blog article deleted successfully.");
      refetch();
    } catch (err) {
      console.error("Failed to delete blog article", err);
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
          <span>INITIALIZING MACPROTEC BLOG SYSTEM...</span>
        </div>
      </div>
    );
  }

  const currentUser = userData?.data;

  // Construct draft object for live preview inside modal
  const livePreviewDraft: BlogPost = {
    id: editingPost?.id || "draft-preview",
    title: formTitle || "Untitled Technical Article",
    slug: formSlug || "untitled-article",
    excerpt: formExcerpt || "Article abstract and summary will render here...",
    content: formContent || "Article main content paragraphs and section headings will render here...",
    category: formCategory,
    sector: formSector,
    coverImage: formCoverImage,
    authorName: formAuthorName || "MacProtec Technical Desk",
    authorTitle: formAuthorTitle || "Chief Process Engineer",
    readTime: "5 min read",
    isPublished: formIsPublished,
    views: editingPost?.views || 0,
    createdAt: editingPost?.createdAt || new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    images: formImages.map((img, i) => ({
      id: `img-${i}`,
      blogPostId: editingPost?.id || "draft-preview",
      url: img.url,
      caption: img.caption,
      altText: img.altText,
      position: img.position,
      layout: img.layout,
    })),
  };

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

                  <Link
                    href="/dashboard/Invoice"
                    className="w-full flex items-center justify-between px-3 py-2.5 text-xs font-mono rounded transition-all duration-150 group text-slate-400 hover:bg-slate-900 hover:text-slate-200"
                  >
                    <div className="flex items-center gap-3">
                      <Receipt className="w-4 h-4 text-slate-400 group-hover:text-slate-200" />
                      <span>Invoice Creator</span>
                    </div>
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

                  {/* ACTIVE TAB STYLING FOR BLOG MANAGER */}
                  <Link
                    href="/dashboard/blog"
                    className="w-full flex items-center justify-between px-3 py-2.5 text-xs font-mono rounded transition-all duration-150 group bg-rose-500/10 text-white font-bold border-l-2 border-primary"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <BookOpen className="w-4 h-4 shrink-0 text-primary" />
                      <span className="truncate">Blog Manager</span>
                    </div>
                    <ChevronRight className="w-3.5 h-3.5 text-primary shrink-0" />
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
                <span className="text-primary font-bold">Blog & Technical Articles</span>
              </span>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={handleOpenCreate}
                className="inline-flex items-center gap-2 px-4 py-2 bg-primary hover:bg-rose-700 text-white font-mono text-xs font-bold uppercase transition-colors shadow-sm"
              >
                <Plus className="w-4 h-4" />
                <span>Write New Article</span>
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
                Blog <span className="text-primary">& Technical Article Manager</span>
              </h1>
              <p className="font-mono text-xs text-slate-500">
                Draft, upload photos via Cloudinary, structure placements, live-preview, and publish engineering insights.
              </p>
            </div>

            {/* KPI Cards (Light theme) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              <div className="bg-white border border-slate-200 p-5 shadow-sm rounded-none">
                <div className="flex justify-between items-start mb-3">
                  <span className="font-mono text-[10px] font-bold text-slate-400 uppercase">
                    Total Articles
                  </span>
                  <BookOpen className="w-5 h-5 text-primary" />
                </div>
                <div className="font-display font-extrabold text-3xl text-slate-900">
                  {stats?.totalPosts || blogPosts.length}
                </div>
                <div className="font-mono text-[10px] text-slate-400 mt-1">
                  Database Records
                </div>
              </div>

              <div className="bg-white border border-slate-200 p-5 shadow-sm rounded-none">
                <div className="flex justify-between items-start mb-3">
                  <span className="font-mono text-[10px] font-bold text-slate-400 uppercase">
                    Published Posts
                  </span>
                  <Globe className="w-5 h-5 text-emerald-600" />
                </div>
                <div className="font-display font-extrabold text-3xl text-emerald-600">
                  {stats?.publishedCount || blogPosts.filter((p) => p.isPublished).length}
                </div>
                <div className="font-mono text-[10px] text-slate-400 mt-1">
                  Live on Website
                </div>
              </div>

              <div className="bg-white border border-slate-200 p-5 shadow-sm rounded-none">
                <div className="flex justify-between items-start mb-3">
                  <span className="font-mono text-[10px] font-bold text-slate-400 uppercase">
                    Draft Articles
                  </span>
                  <FileText className="w-5 h-5 text-amber-600" />
                </div>
                <div className="font-display font-extrabold text-3xl text-amber-600">
                  {stats?.draftCount || blogPosts.filter((p) => !p.isPublished).length}
                </div>
                <div className="font-mono text-[10px] text-slate-400 mt-1">
                  In Editing Pipeline
                </div>
              </div>

              <div className="bg-white border border-slate-200 p-5 shadow-sm rounded-none">
                <div className="flex justify-between items-start mb-3">
                  <span className="font-mono text-[10px] font-bold text-slate-400 uppercase">
                    Total Readership
                  </span>
                  <Sparkles className="w-5 h-5 text-cyan-600" />
                </div>
                <div className="font-display font-extrabold text-3xl text-cyan-600">
                  {stats?.totalViews?.toLocaleString() || "0"}
                </div>
                <div className="font-mono text-[10px] text-slate-400 mt-1">
                  Client & Reader Views
                </div>
              </div>
            </div>

            {/* Filter & Search Toolbar */}
            <div className="bg-white border border-slate-200 p-4 shadow-sm flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
              <div className="relative flex-1 max-w-md">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search title, excerpt, category, author..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 font-mono text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-primary"
                />
              </div>

              <div className="flex items-center gap-1 overflow-x-auto py-1 scrollbar-none">
                {["ALL", "Published", "Draft"].map((st) => (
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
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                  className="bg-slate-50 border border-slate-200 text-slate-700 font-mono text-xs px-3 py-2 focus:outline-none focus:border-primary"
                >
                  {CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>
                      Category: {cat}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Articles Directory Table */}
            <div className="bg-white border border-slate-200 shadow-sm rounded-none overflow-hidden">
              <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                <div className="flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-primary" />
                  <h3 className="font-display font-extrabold text-xs uppercase tracking-wider text-slate-900">
                    Articles Directory ({blogPosts.length})
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

              {isPostsLoading ? (
                <div className="py-16 text-center font-mono text-slate-500 text-xs flex items-center justify-center gap-3">
                  <RefreshCw className="w-4 h-4 animate-spin text-primary" />
                  FETCHING ARTICLE RECORDS...
                </div>
              ) : blogPosts.length === 0 ? (
                <div className="py-16 text-center font-mono text-slate-500 text-xs">
                  <BookOpen className="w-10 h-10 mx-auto mb-3 text-slate-300" />
                  No blog articles match current filters.
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left font-mono text-xs">
                    <thead className="bg-slate-50 text-slate-500 uppercase text-[9px] tracking-wider border-b border-slate-200">
                      <tr>
                        <th className="px-6 py-3.5">Article Title</th>
                        <th className="px-6 py-3.5">Category & Sector</th>
                        <th className="px-6 py-3.5">Author & Read Time</th>
                        <th className="px-6 py-3.5">Photos</th>
                        <th className="px-6 py-3.5">Status</th>
                        <th className="px-6 py-3.5 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-slate-700">
                      {blogPosts.map((post) => (
                        <tr key={post.id} className="hover:bg-slate-50 transition-colors group">
                          {/* Title & Cover */}
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              {Boolean(post.coverImage && post.coverImage.trim() !== "") ? (
                                <img
                                  src={post.coverImage!}
                                  alt={post.title}
                                  className="w-12 h-12 object-cover border border-slate-200 shrink-0"
                                />
                              ) : (
                                <div className="w-12 h-12 bg-slate-100 border border-slate-200 flex items-center justify-center shrink-0 text-slate-400">
                                  <ImageIcon className="w-5 h-5" />
                                </div>
                              )}
                              <div className="min-w-0">
                                <button
                                  onClick={() => setPreviewPost(post)}
                                  className="font-bold text-slate-900 hover:text-primary transition-colors text-left line-clamp-1"
                                >
                                  {post.title}
                                </button>
                                <div className="text-[10px] text-slate-400 font-mono line-clamp-1 mt-0.5">
                                  /{post.slug}
                                </div>
                              </div>
                            </div>
                          </td>

                          {/* Category & Sector */}
                          <td className="px-6 py-4">
                            <span className="px-2 py-0.5 text-[10px] font-bold uppercase bg-slate-100 text-slate-700 border border-slate-200">
                              {post.category}
                            </span>
                            <div className="text-[10px] text-slate-500 mt-1">
                              Sector: {post.sector || "General"}
                            </div>
                          </td>

                          {/* Author & Read Time */}
                          <td className="px-6 py-4 text-[11px]">
                            <div className="font-semibold text-slate-800">{post.authorName}</div>
                            <div className="text-slate-400 text-[10px] flex items-center gap-1 mt-0.5">
                              <Clock className="w-3 h-3" />
                              {post.readTime}
                            </div>
                          </td>

                          {/* Photo Count & Placements */}
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-1.5 text-xs font-bold text-slate-700">
                              <ImageIcon className="w-4 h-4 text-primary" />
                              <span>{post.images?.length || 0} Inline</span>
                            </div>
                            <div className="text-[9px] text-slate-400 mt-0.5">
                              Universal Placements
                            </div>
                          </td>

                          {/* Status Badge Select */}
                          <td className="px-6 py-4">
                            <button
                              onClick={() => handleTogglePublish(post.id, post.isPublished)}
                              className={`px-2.5 py-1 text-[10px] font-bold uppercase border transition-colors ${
                                post.isPublished
                                  ? "bg-emerald-50 text-emerald-700 border-emerald-300 hover:bg-emerald-100"
                                  : "bg-amber-50 text-amber-700 border-amber-300 hover:bg-amber-100"
                              }`}
                            >
                              {post.isPublished ? "Published" : "Draft"}
                            </button>
                          </td>

                          {/* Actions */}
                          <td className="px-6 py-4 text-right">
                            <div className="flex items-center justify-end gap-1.5">
                              {/* LIVE READER PREVIEW BUTTON */}
                              <button
                                onClick={() => setPreviewPost(post)}
                                className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 text-[10px] font-bold uppercase flex items-center gap-1 transition-colors"
                                title="Open Live Reader Preview"
                              >
                                <Eye className="w-3.5 h-3.5 text-primary" />
                                <span>Preview</span>
                              </button>

                              <button
                                onClick={() => handleOpenEdit(post)}
                                className="p-1.5 text-slate-500 hover:text-amber-600 hover:bg-slate-100 transition-colors"
                                title="Edit Article & Photos"
                              >
                                <Edit className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => setDeleteConfirmId(post.id)}
                                className="p-1.5 text-slate-500 hover:text-rose-600 hover:bg-slate-100 transition-colors"
                                title="Delete Article"
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

      {/* CREATE / EDIT ARTICLE MODAL (WITH CLOUDINARY UPLOADER & IN-EDITOR LIVE PREVIEW TAB) */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white border border-slate-200 w-full max-w-5xl shadow-2xl overflow-hidden my-8 my-auto max-h-[92vh] flex flex-col">
            {/* Modal Header & Dual Tab Bar */}
            <div className="px-6 py-4 border-b border-slate-200 flex flex-wrap items-center justify-between gap-4 bg-slate-900 text-white shrink-0">
              <div className="flex items-center gap-2.5">
                <BookOpen className="w-5 h-5 text-primary" />
                <h3 className="font-display font-extrabold text-sm uppercase">
                  {editingPost ? `Edit Article: ${editingPost.title}` : "Compose Technical Engineering Article"}
                </h3>
              </div>

              {/* IN-EDITOR LIVE PREVIEW TAB SWITCHER */}
              <div className="flex items-center bg-slate-800 p-1 rounded border border-slate-700">
                <button
                  type="button"
                  onClick={() => setModalActiveTab("edit")}
                  className={`px-3 py-1 font-mono text-xs font-bold uppercase transition-all flex items-center gap-1.5 rounded ${
                    modalActiveTab === "edit"
                      ? "bg-primary text-white shadow-sm"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  <Edit className="w-3.5 h-3.5" />
                  <span>Article & Photos Editor</span>
                </button>

                <button
                  type="button"
                  onClick={() => setModalActiveTab("preview")}
                  className={`px-3 py-1 font-mono text-xs font-bold uppercase transition-all flex items-center gap-1.5 rounded ${
                    modalActiveTab === "preview"
                      ? "bg-emerald-600 text-white shadow-sm"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Live Reader Preview</span>
                </button>
              </div>

              <button onClick={() => setIsCreateModalOpen(false)} className="text-slate-400 hover:text-white p-1">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* TAB CONTENT 1: EDITOR FORM */}
            {modalActiveTab === "edit" && (
              <form onSubmit={handleSubmitForm} className="p-6 space-y-6 font-mono text-xs overflow-y-auto flex-1 bg-white">
                {formError && (
                  <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 shrink-0 text-primary" />
                    <span>{formError}</span>
                  </div>
                )}

                {/* Title & Slug */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="sm:col-span-2">
                    <label className="block text-[9px] text-slate-500 uppercase tracking-wider mb-1">
                      Article Title *
                    </label>
                    <input
                      type="text"
                      required
                      value={formTitle}
                      onChange={(e) => setFormTitle(e.target.value)}
                      placeholder="e.g. CFD Optimization of Preheater Bypass Duct in 5000 TPD Cement Line"
                      className="w-full bg-white border border-slate-200 p-2.5 text-slate-800 focus:outline-none focus:border-primary font-bold"
                    />
                  </div>

                  <div>
                    <label className="block text-[9px] text-slate-500 uppercase tracking-wider mb-1">
                      Custom Slug (Optional)
                    </label>
                    <input
                      type="text"
                      value={formSlug}
                      onChange={(e) => setFormSlug(e.target.value)}
                      placeholder="e.g. cfd-preheater-duct-optimization"
                      className="w-full bg-white border border-slate-200 p-2.5 text-slate-800 focus:outline-none focus:border-primary"
                    />
                  </div>
                </div>

                {/* Category, Sector, Cover Image with Cloudinary Upload */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-[9px] text-slate-500 uppercase tracking-wider mb-1">
                      Category Classification
                    </label>
                    <select
                      value={formCategory}
                      onChange={(e) => setFormCategory(e.target.value)}
                      className="w-full bg-white border border-slate-200 p-2.5 text-slate-800 focus:outline-none focus:border-primary"
                    >
                      {CATEGORIES.filter((c) => c !== "ALL").map((c) => (
                        <option key={c} value={c}>
                          {c}
                        </option>
                      ))}
                    </select>
                  </div>

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

                  {/* COVER IMAGE & CLOUDINARY UPLOADER BUTTON */}
                  <div>
                    <label className="block text-[9px] text-slate-500 uppercase tracking-wider mb-1">
                      Cover Banner Photo URL
                    </label>
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        value={formCoverImage}
                        onChange={(e) => setFormCoverImage(e.target.value)}
                        placeholder="https://res.cloudinary.com/..."
                        className="w-full bg-white border border-slate-200 p-2.5 text-slate-800 focus:outline-none focus:border-primary"
                      />
                      <label className="px-3 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-[10px] font-bold uppercase cursor-pointer flex items-center gap-1.5 shrink-0 transition-colors">
                        {uploadingTarget === "cover" ? (
                          <RefreshCw className="w-3.5 h-3.5 animate-spin text-primary" />
                        ) : (
                          <Upload className="w-3.5 h-3.5 text-primary" />
                        )}
                        <span>Upload Cloudinary</span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleUploadCoverPhoto}
                          className="hidden"
                          disabled={isUploadingImage}
                        />
                      </label>
                    </div>
                  </div>
                </div>

                {/* Author Info */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-slate-100">
                  <div>
                    <label className="block text-[9px] text-slate-500 uppercase tracking-wider mb-1">
                      Author Name
                    </label>
                    <input
                      type="text"
                      value={formAuthorName}
                      onChange={(e) => setFormAuthorName(e.target.value)}
                      placeholder="e.g. Dr. Aris Thorne"
                      className="w-full bg-white border border-slate-200 p-2.5 text-slate-800 focus:outline-none focus:border-primary"
                    />
                  </div>

                  <div>
                    <label className="block text-[9px] text-slate-500 uppercase tracking-wider mb-1">
                      Author Title / Designation
                    </label>
                    <input
                      type="text"
                      value={formAuthorTitle}
                      onChange={(e) => setFormAuthorTitle(e.target.value)}
                      placeholder="e.g. Principal CFD & Thermal Systems Specialist"
                      className="w-full bg-white border border-slate-200 p-2.5 text-slate-800 focus:outline-none focus:border-primary"
                    />
                  </div>
                </div>

                {/* Excerpt Summary */}
                <div>
                  <label className="block text-[9px] text-slate-500 uppercase tracking-wider mb-1">
                    Article Excerpt / Abstract Summary *
                  </label>
                  <textarea
                    rows={2}
                    required
                    value={formExcerpt}
                    onChange={(e) => setFormExcerpt(e.target.value)}
                    placeholder="A concise executive summary of the technical case study or engineering insight..."
                    className="w-full bg-white border border-slate-200 p-2.5 text-slate-800 focus:outline-none focus:border-primary"
                  />
                </div>

                {/* Main Body Content */}
                <div>
                  <label className="block text-[9px] text-slate-500 uppercase tracking-wider mb-1">
                    Main Body Content * (Markdown supported with ## Headings, - Bullets)
                  </label>
                  <textarea
                    rows={8}
                    required
                    value={formContent}
                    onChange={(e) => setFormContent(e.target.value)}
                    placeholder="Write main technical content..."
                    className="w-full bg-white border border-slate-200 p-3 text-slate-800 focus:outline-none focus:border-primary font-mono"
                  />
                </div>

                {/* UNIVERSAL PHOTO PLACEMENT ENGINE BUILDER WITH CLOUDINARY UPLOADER */}
                <div className="pt-4 border-t border-slate-200 space-y-3">
                  <div className="flex items-center justify-between bg-slate-50 p-3 border border-slate-200">
                    <div className="flex items-center gap-2">
                      <ImageIcon className="w-4 h-4 text-primary" />
                      <span className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                        Universal Photo Placement Engine ({formImages.length} Photos)
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={handleAddImageRow}
                      className="px-3 py-1 bg-primary hover:bg-rose-700 text-white font-bold uppercase text-[10px] flex items-center gap-1 transition-colors"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      Add Inline Photo
                    </button>
                  </div>

                  <div className="space-y-3">
                    {formImages.map((img, idx) => (
                      <div key={idx} className="bg-slate-50 p-4 border border-slate-200 space-y-3">
                        <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                          <span className="font-bold text-slate-700 text-xs">
                            Photo #{idx + 1} Placement Configuration
                          </span>
                          <button
                            type="button"
                            onClick={() => handleRemoveImageRow(idx)}
                            className="text-slate-400 hover:text-rose-600 transition-colors p-1"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div>
                            <label className="block text-[9px] text-slate-500 uppercase tracking-wider mb-1">
                              Image URL / Cloudinary Photo *
                            </label>
                            <div className="flex items-center gap-2">
                              <input
                                type="text"
                                placeholder="https://res.cloudinary.com/..."
                                value={img.url}
                                onChange={(e) => handleImageChange(idx, "url", e.target.value)}
                                className="w-full bg-white border border-slate-200 p-2 text-slate-800 focus:outline-none focus:border-primary"
                              />
                              <label className="px-2.5 py-2 bg-slate-900 hover:bg-slate-800 text-white text-[10px] font-bold uppercase cursor-pointer flex items-center gap-1 shrink-0 transition-colors">
                                {uploadingTarget === `inline-${idx}` ? (
                                  <RefreshCw className="w-3 h-3 animate-spin text-primary" />
                                ) : (
                                  <Upload className="w-3 h-3 text-primary" />
                                )}
                                <span>Upload</span>
                                <input
                                  type="file"
                                  accept="image/*"
                                  onChange={(e) => handleUploadInlinePhoto(e, idx)}
                                  className="hidden"
                                  disabled={isUploadingImage}
                                />
                              </label>
                            </div>
                          </div>

                          <div>
                            <label className="block text-[9px] text-slate-500 uppercase tracking-wider mb-1">
                              Caption Description
                            </label>
                            <input
                              type="text"
                              placeholder="e.g. CFD Thermal Velocity Contour Plot across Throat"
                              value={img.caption}
                              onChange={(e) => handleImageChange(idx, "caption", e.target.value)}
                              className="w-full bg-white border border-slate-200 p-2 text-slate-800 focus:outline-none focus:border-primary"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                          <div>
                            <label className="block text-[9px] text-slate-500 uppercase tracking-wider mb-1">
                              Placement Section
                            </label>
                            <select
                              value={img.position}
                              onChange={(e) => handleImageChange(idx, "position", e.target.value)}
                              className="w-full bg-white border border-slate-200 p-2 text-slate-800 focus:outline-none focus:border-primary"
                            >
                              <option value="INTRO">Introduction Section (Top)</option>
                              <option value="BODY_MID">Mid-Article Section (Center)</option>
                              <option value="BODY_END">Conclusion Section (Bottom)</option>
                              <option value="GALLERY">Technical Photo Gallery</option>
                            </select>
                          </div>

                          <div>
                            <label className="block text-[9px] text-slate-500 uppercase tracking-wider mb-1">
                              Layout Style & Alignment
                            </label>
                            <select
                              value={img.layout}
                              onChange={(e) => handleImageChange(idx, "layout", e.target.value)}
                              className="w-full bg-white border border-slate-200 p-2 text-slate-800 focus:outline-none focus:border-primary"
                            >
                              <option value="FULL">Full Width Banner (Centered)</option>
                              <option value="FLOAT_LEFT">Float Left (Text Wrap)</option>
                              <option value="FLOAT_RIGHT">Float Right (Text Wrap)</option>
                              <option value="DUAL_GRID">Dual Comparative Grid</option>
                            </select>
                          </div>

                          <div>
                            <label className="block text-[9px] text-slate-500 uppercase tracking-wider mb-1">
                              Alt Text / Accessibility
                            </label>
                            <input
                              type="text"
                              placeholder="e.g. CFD Diagram"
                              value={img.altText}
                              onChange={(e) => handleImageChange(idx, "altText", e.target.value)}
                              className="w-full bg-white border border-slate-200 p-2 text-slate-800 focus:outline-none focus:border-primary"
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Publish Toggle */}
                <div className="flex items-center gap-3 pt-2">
                  <input
                    type="checkbox"
                    id="formIsPublished"
                    checked={formIsPublished}
                    onChange={(e) => setFormIsPublished(e.target.checked)}
                    className="w-4 h-4 accent-primary cursor-pointer"
                  />
                  <label htmlFor="formIsPublished" className="text-xs font-bold text-slate-800 cursor-pointer">
                    Publish article live to website immediately
                  </label>
                </div>

                {/* Form Action Buttons */}
                <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => setModalActiveTab("preview")}
                    className="px-4 py-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-300 font-bold uppercase text-xs transition-colors flex items-center gap-1.5"
                  >
                    <Eye className="w-4 h-4" />
                    <span>Check Live Reader Preview</span>
                  </button>

                  <div className="flex items-center gap-3">
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
                      {editingPost ? "Update Article" : "Publish Article"}
                    </button>
                  </div>
                </div>
              </form>
            )}

            {/* TAB CONTENT 2: LIVE READER PREVIEW SHEET INSIDE EDITOR */}
            {modalActiveTab === "preview" && (
              <div className="p-8 space-y-8 font-sans overflow-y-auto bg-white flex-1">
                <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-3 font-mono text-xs flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Eye className="w-4 h-4 text-emerald-600" />
                    <span>IN-EDITOR LIVE READER PREVIEW MODE — Updates dynamically as you compose.</span>
                  </div>
                  <button
                    onClick={() => setModalActiveTab("edit")}
                    className="px-3 py-1 bg-emerald-600 text-white font-bold uppercase text-[10px] hover:bg-emerald-700 transition-colors"
                  >
                    Return to Editor
                  </button>
                </div>

                {/* Category & Metadata */}
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <span className="px-3 py-1 bg-rose-50 text-primary border border-rose-200 text-xs font-mono font-bold uppercase tracking-wider">
                      {livePreviewDraft.category}
                    </span>
                    {livePreviewDraft.sector && (
                      <span className="px-3 py-1 bg-slate-100 text-slate-700 border border-slate-200 text-xs font-mono font-bold uppercase">
                        Sector: {livePreviewDraft.sector}
                      </span>
                    )}
                    <span className="text-xs font-mono text-slate-400 flex items-center gap-1 ml-auto">
                      <Clock className="w-3.5 h-3.5" />
                      {livePreviewDraft.readTime}
                    </span>
                  </div>

                  <h1 className="font-display font-extrabold text-2xl sm:text-4xl text-slate-900 leading-tight">
                    {livePreviewDraft.title}
                  </h1>

                  <p className="text-base sm:text-lg text-slate-600 font-sans leading-relaxed border-l-4 border-primary pl-4 py-1 italic bg-slate-50">
                    {livePreviewDraft.excerpt}
                  </p>
                </div>

                {/* Author Card */}
                <div className="flex items-center gap-3 py-3 border-y border-slate-100 font-mono text-xs">
                  <div className="w-10 h-10 rounded-full bg-primary text-white font-bold flex items-center justify-center text-sm">
                    {livePreviewDraft.authorName.charAt(0)}
                  </div>
                  <div>
                    <div className="font-bold text-slate-900">{livePreviewDraft.authorName}</div>
                    <div className="text-slate-500 text-[11px]">{livePreviewDraft.authorTitle}</div>
                  </div>
                  <div className="ml-auto text-slate-400 text-[11px]">
                    Published: {new Date().toLocaleDateString()}
                  </div>
                </div>

                {/* Cover Banner Photo */}
                {Boolean(livePreviewDraft.coverImage && livePreviewDraft.coverImage.trim() !== "") ? (
                  <div className="space-y-2">
                    <img
                      src={livePreviewDraft.coverImage!}
                      alt={livePreviewDraft.title}
                      className="w-full max-h-[420px] object-cover border border-slate-200 shadow-md"
                    />
                    <div className="text-[11px] font-mono text-slate-400 text-center italic">
                      Hero Cover Photo — {livePreviewDraft.title}
                    </div>
                  </div>
                ) : null}

                {/* Intro Section Photos */}
                {livePreviewDraft.images
                  .filter((img) => img.position === "INTRO" && Boolean(img.url && img.url.trim() !== ""))
                  .map((img, idx) => (
                    <div key={idx} className="my-6 space-y-2">
                      <img
                        src={img.url}
                        alt={img.altText || img.caption || "Intro photo"}
                        className="w-full object-cover border border-slate-200"
                      />
                      {img.caption && (
                        <p className="text-[11px] font-mono text-slate-500 text-center italic">
                          {img.caption}
                        </p>
                      )}
                    </div>
                  ))}

                {/* Article Content Rendered with Styled H2s */}
                <div className="prose prose-slate max-w-none text-slate-800 leading-relaxed font-sans text-base space-y-4">
                  {livePreviewDraft.content.split("\n\n").map((paragraph, idx) => {
                    if (paragraph.startsWith("## ")) {
                      return (
                        <h2
                          key={idx}
                          className="font-display font-extrabold text-xl sm:text-2xl text-slate-900 mt-6 mb-3 uppercase tracking-tight border-b border-slate-200 pb-2 text-primary"
                        >
                          {paragraph.replace("## ", "")}
                        </h2>
                      );
                    }
                    if (paragraph.startsWith("- ")) {
                      return (
                        <ul key={idx} className="list-disc pl-5 space-y-1 font-mono text-sm">
                          {paragraph.split("\n").map((item, i) => (
                            <li key={i}>{item.replace("- ", "")}</li>
                          ))}
                        </ul>
                      );
                    }
                    return <p key={idx}>{paragraph}</p>;
                  })}
                </div>

                {/* Mid Body Section Photos */}
                {livePreviewDraft.images
                  .filter((img) => img.position === "BODY_MID" && Boolean(img.url && img.url.trim() !== ""))
                  .map((img, idx) => (
                    <div key={idx} className="my-8 space-y-2 bg-slate-50 p-4 border border-slate-200">
                      <img
                        src={img.url}
                        alt={img.altText || img.caption || "Technical diagram"}
                        className="w-full object-cover border border-slate-200"
                      />
                      {img.caption && (
                        <p className="text-[11px] font-mono text-slate-600 text-center font-semibold">
                          Figure {idx + 1}: {img.caption}
                        </p>
                      )}
                    </div>
                  ))}

                {/* Conclusion Section Photos */}
                {livePreviewDraft.images
                  .filter((img) => img.position === "BODY_END" && Boolean(img.url && img.url.trim() !== ""))
                  .map((img, idx) => (
                    <div key={idx} className="my-6 space-y-2">
                      <img
                        src={img.url}
                        alt={img.altText || img.caption || "Conclusion photo"}
                        className="w-full object-cover border border-slate-200"
                      />
                      {img.caption && (
                        <p className="text-[11px] font-mono text-slate-500 text-center italic">
                          {img.caption}
                        </p>
                      )}
                    </div>
                  ))}

                {/* Article Footer CTA */}
                <div className="p-6 bg-slate-950 text-white font-mono text-xs space-y-3 border border-slate-800">
                  <div className="font-bold text-rose-400 uppercase tracking-wider flex items-center gap-2">
                    <Sparkles className="w-4 h-4" />
                    <span>Engineering Audit & CFD Technical Support</span>
                  </div>
                  <p className="text-slate-300">
                    Request a custom Computational Fluid Dynamics analysis or 3D laser scanning audit for your process plant line.
                  </p>
                  <Link
                    href="/#contact"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-white font-bold uppercase text-[10px] tracking-wider hover:bg-rose-700 transition-colors"
                  >
                    Contact Technical Engineering Team
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* STANDALONE TABLE LIVE READER PREVIEW MODAL */}
      {previewPost && (
        <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white border border-slate-200 w-full max-w-4xl shadow-2xl overflow-hidden my-8 my-auto max-h-[92vh] flex flex-col">
            {/* Top Preview Bar */}
            <div className="px-6 py-3.5 bg-slate-900 text-white flex items-center justify-between shrink-0 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-emerald-400 animate-pulse" />
                <span className="font-mono font-bold text-xs uppercase tracking-wider">
                  Live Reader Preview Mode — Website Post View
                </span>
              </div>
              <div className="flex items-center gap-3">
                <span className="font-mono text-[10px] text-slate-400 bg-slate-800 px-2.5 py-1 rounded border border-slate-700">
                  Status: {previewPost.isPublished ? "PUBLISHED" : "DRAFT"}
                </span>
                <button onClick={() => setPreviewPost(null)} className="text-slate-400 hover:text-white p-1">
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Formatted Reader View Article Sheet */}
            <div className="p-8 space-y-8 font-sans overflow-y-auto bg-white flex-1">
              {/* Category & Metadata */}
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <span className="px-3 py-1 bg-rose-50 text-primary border border-rose-200 text-xs font-mono font-bold uppercase tracking-wider">
                    {previewPost.category}
                  </span>
                  {previewPost.sector && (
                    <span className="px-3 py-1 bg-slate-100 text-slate-700 border border-slate-200 text-xs font-mono font-bold uppercase">
                      Sector: {previewPost.sector}
                    </span>
                  )}
                  <span className="text-xs font-mono text-slate-400 flex items-center gap-1 ml-auto">
                    <Clock className="w-3.5 h-3.5" />
                    {previewPost.readTime}
                  </span>
                </div>

                <h1 className="font-display font-extrabold text-2xl sm:text-4xl text-slate-900 leading-tight">
                  {previewPost.title}
                </h1>

                <p className="text-base sm:text-lg text-slate-600 font-sans leading-relaxed border-l-4 border-primary pl-4 py-1 italic bg-slate-50">
                  {previewPost.excerpt}
                </p>
              </div>

              {/* Author Card */}
              <div className="flex items-center gap-3 py-3 border-y border-slate-100 font-mono text-xs">
                <div className="w-10 h-10 rounded-full bg-primary text-white font-bold flex items-center justify-center text-sm">
                  {previewPost.authorName.charAt(0)}
                </div>
                <div>
                  <div className="font-bold text-slate-900">{previewPost.authorName}</div>
                  <div className="text-slate-500 text-[11px]">{previewPost.authorTitle}</div>
                </div>
                <div className="ml-auto text-slate-400 text-[11px]">
                  Published: {new Date(previewPost.createdAt).toLocaleDateString()}
                </div>
              </div>

              {/* Cover Banner Photo */}
              {Boolean(previewPost.coverImage && previewPost.coverImage.trim() !== "") ? (
                <div className="space-y-2">
                  <img
                    src={previewPost.coverImage!}
                    alt={previewPost.title}
                    className="w-full max-h-[420px] object-cover border border-slate-200 shadow-md"
                  />
                  <div className="text-[11px] font-mono text-slate-400 text-center italic">
                    Hero Cover Photo — {previewPost.title}
                  </div>
                </div>
              ) : null}

              {/* Intro Section Photos */}
              {previewPost.images
                .filter((img) => img.position === "INTRO" && Boolean(img.url && img.url.trim() !== ""))
                .map((img, idx) => (
                  <div key={idx} className="my-6 space-y-2">
                    <img
                      src={img.url}
                      alt={img.altText || img.caption || "Intro photo"}
                      className="w-full object-cover border border-slate-200"
                    />
                    {img.caption && (
                      <p className="text-[11px] font-mono text-slate-500 text-center italic">
                        {img.caption}
                      </p>
                    )}
                  </div>
                ))}

              {/* Article Content Rendered with Styled H2s */}
              <div className="prose prose-slate max-w-none text-slate-800 leading-relaxed font-sans text-base space-y-4">
                {previewPost.content.split("\n\n").map((paragraph, idx) => {
                  if (paragraph.startsWith("## ")) {
                    return (
                      <h2
                        key={idx}
                        className="font-display font-extrabold text-xl sm:text-2xl text-slate-900 mt-6 mb-3 uppercase tracking-tight border-b border-slate-200 pb-2 text-primary"
                      >
                        {paragraph.replace("## ", "")}
                      </h2>
                    );
                  }
                  if (paragraph.startsWith("- ")) {
                    return (
                      <ul key={idx} className="list-disc pl-5 space-y-1 font-mono text-sm">
                        {paragraph.split("\n").map((item, i) => (
                          <li key={i}>{item.replace("- ", "")}</li>
                        ))}
                      </ul>
                    );
                  }
                  return <p key={idx}>{paragraph}</p>;
                })}
              </div>

              {/* Mid Body Section Photos */}
              {previewPost.images
                .filter((img) => img.position === "BODY_MID" && Boolean(img.url && img.url.trim() !== ""))
                .map((img, idx) => (
                  <div key={idx} className="my-8 space-y-2 bg-slate-50 p-4 border border-slate-200">
                    <img
                      src={img.url}
                      alt={img.altText || img.caption || "Technical diagram"}
                      className="w-full object-cover border border-slate-200"
                    />
                    {img.caption && (
                      <p className="text-[11px] font-mono text-slate-600 text-center font-semibold">
                        Figure {idx + 1}: {img.caption}
                      </p>
                    )}
                  </div>
                ))}

              {/* Conclusion Section Photos */}
              {previewPost.images
                .filter((img) => img.position === "BODY_END" && Boolean(img.url && img.url.trim() !== ""))
                .map((img, idx) => (
                  <div key={idx} className="my-6 space-y-2">
                    <img
                      src={img.url}
                      alt={img.altText || img.caption || "Conclusion photo"}
                      className="w-full object-cover border border-slate-200"
                    />
                    {img.caption && (
                      <p className="text-[11px] font-mono text-slate-500 text-center italic">
                        {img.caption}
                      </p>
                    )}
                  </div>
                ))}

              {/* Article Footer CTA */}
              <div className="p-6 bg-slate-950 text-white font-mono text-xs space-y-3 border border-slate-800">
                <div className="font-bold text-rose-400 uppercase tracking-wider flex items-center gap-2">
                  <Sparkles className="w-4 h-4" />
                  <span>Engineering Audit & CFD Technical Support</span>
                </div>
                <p className="text-slate-300">
                  Request a custom Computational Fluid Dynamics analysis or 3D laser scanning audit for your process plant line.
                </p>
                <Link
                  href="/#contact"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-white font-bold uppercase text-[10px] tracking-wider hover:bg-rose-700 transition-colors"
                >
                  Contact Technical Engineering Team
                </Link>
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
              <h3 className="font-bold text-sm text-slate-900">Confirm Article Deletion</h3>
            </div>
            <p className="text-slate-600">
              Are you sure you want to delete this technical article from the database? It will no longer be visible to website visitors.
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
                Delete Article
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
