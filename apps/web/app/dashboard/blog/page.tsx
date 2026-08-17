"use client";

import { useState, useMemo, useEffect } from "react";
import Link from "next/link";
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
  BookOpen,
  Search,
  Plus,
  CheckCircle2,
  Trash2,
  Edit,
  Eye,
  RefreshCw,
  Image as ImageIcon,
  Clock,
  ExternalLink,
  AlertTriangle,
  Globe,
  Upload,
  X,
  Sparkles,
  Printer,
  RotateCcw,
} from "lucide-react";
import { BlogPost, BlogImagePosition, BlogImageLayout } from "@repo/types";

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
  // Filters & State
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("ALL");
  const [categoryFilter, setCategoryFilter] = useState<string>("ALL");
  const [sectorFilter, setSectorFilter] = useState<string>("ALL");

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchQuery);
    }, 250);
    return () => clearTimeout(timer);
  }, [searchQuery]);

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
    status: statusFilter !== "ALL" ? statusFilter : undefined,
    category: categoryFilter !== "ALL" ? categoryFilter : undefined,
    sector: sectorFilter !== "ALL" ? sectorFilter : undefined,
    search: debouncedSearch || undefined,
  });

  const { data: statsData } = useGetBlogStatsQuery();

  const [createBlogPost, { isLoading: isCreating }] = useCreateBlogPostMutation();
  const [updateBlogPost, { isLoading: isUpdating }] = useUpdateBlogPostMutation();
  const [toggleBlogPostPublish] = useToggleBlogPostPublishMutation();
  const [deleteBlogPost, { isLoading: isDeleting }] = useDeleteBlogPostMutation();
  const [uploadCloudinaryImage, { isLoading: isUploadingImage }] =
    useUploadCloudinaryImageMutation();

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
  >([]);
  const [formError, setFormError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const handleOpenCreate = () => {
    setEditingPost(null);
    setModalActiveTab("edit");
    setFormTitle("");
    setFormSlug("");
    setFormCategory("Engineering Insights");
    setFormSector("Cement");
    setFormCoverImage(
      "https://images.unsplash.com/photo-1581092335397-9583fe92d232?q=80&w=1200"
    );
    setFormAuthorName("MacProtec Technical Desk");
    setFormAuthorTitle("Chief Process Engineer");
    setFormExcerpt(
      "Detailed engineering analysis on high-temperature clinker cooler optimization, thermal CFD velocity profiles, and refractory lifespan improvements."
    );
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
        const res = await uploadCloudinaryImage({
          image: base64Str,
          folder: "macprotec_blog",
        }).unwrap();
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

  const handleUploadInlinePhoto = async (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingTarget(`inline-${index}`);
    const reader = new FileReader();
    reader.onloadend = async () => {
      try {
        const base64Str = reader.result as string;
        const res = await uploadCloudinaryImage({
          image: base64Str,
          folder: "macprotec_blog",
        }).unwrap();
        if (res.data?.url) {
          const updated = [...formImages];
          updated[index] = { ...updated[index], url: res.data.url };
          setFormImages(updated);
          setSuccessMsg("Inline figure uploaded successfully!");
        }
      } catch (err: any) {
        setFormError(err?.data?.message || "Inline image upload failed");
      } finally {
        setUploadingTarget(null);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleAddImage = () => {
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

  const handleRemoveImage = (index: number) => {
    setFormImages(formImages.filter((_, i) => i !== index));
  };

  const handleImageChange = (
    index: number,
    field: keyof (typeof formImages)[0],
    value: any
  ) => {
    const updated = [...formImages];
    updated[index] = { ...updated[index], [field]: value };
    setFormImages(updated);
  };

  const handleSubmitForm = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formTitle || !formContent) {
      setFormError("Title and technical content are required.");
      return;
    }

    const computedExcerpt = formExcerpt.trim()
      ? formExcerpt.trim()
      : formContent.replace(/[#*`_]/g, "").slice(0, 160).trim() + "...";

    try {
      const payload = {
        title: formTitle,
        slug:
          formSlug ||
          formTitle
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/^-|-$/g, ""),
        excerpt: computedExcerpt,
        content: formContent,
        category: formCategory,
        sector: formSector,
        coverImage: formCoverImage,
        authorName: formAuthorName,
        authorTitle: formAuthorTitle,
        isPublished: formIsPublished,
        images: formImages.filter((img) => img.url.trim() !== ""),
      };

      if (editingPost) {
        await updateBlogPost({ id: editingPost.id, data: payload }).unwrap();
        setSuccessMsg(`Article "${formTitle}" updated successfully.`);
      } else {
        const created = await createBlogPost(payload).unwrap();
        setSuccessMsg(`Article "${created.data.title}" published successfully.`);
      }

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

  // Helper for quick markdown snippets
  const insertMarkdownSnippet = (snippet: string) => {
    setFormContent((prev) => prev + "\n" + snippet);
  };

  // Construct draft object for live preview inside modal
  const livePreviewDraft: BlogPost = useMemo(
    () => ({
      id: editingPost?.id || "draft-preview",
      title: formTitle || "Untitled Technical Article",
      slug: formSlug || "untitled-article",
      excerpt: formExcerpt || "Article abstract and executive summary will render here...",
      content:
        formContent ||
        "Article main technical content, formulas, and section headings will render here...",
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
    }),
    [
      editingPost,
      formTitle,
      formSlug,
      formExcerpt,
      formContent,
      formCategory,
      formSector,
      formCoverImage,
      formAuthorName,
      formAuthorTitle,
      formIsPublished,
      formImages,
    ]
  );

  return (
    <div className="space-y-6 sm:space-y-8 animate-in fade-in duration-200 text-left">
      {/* Top Header Title & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
        <div className="text-left">
          <h1 className="font-display font-extrabold text-2xl sm:text-3xl uppercase tracking-tight text-slate-900 mb-1">
            Blog & <span className="text-primary">Case Studies Manager</span>
          </h1>
          <p className="font-mono text-xs text-slate-500">
            Publish technical whitepapers, industrial revamps, and CFD simulation case studies to the public portal.
          </p>
        </div>

        <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
          <button
            onClick={() => refetch()}
            className="p-2.5 bg-white hover:bg-slate-50 border border-slate-200 text-slate-600 rounded transition-colors shadow-sm"
            title="Refresh articles"
          >
            <RefreshCw className={`w-4 h-4 ${isPostsLoading ? "animate-spin text-primary" : ""}`} />
          </button>
          <button
            onClick={handleOpenCreate}
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-primary hover:bg-rose-700 text-white font-mono text-xs font-bold uppercase transition-colors shadow-sm rounded"
          >
            <Plus className="w-4 h-4" />
            <span>Write New Article</span>
          </button>
        </div>
      </div>

      {/* Success Notification Banner */}
      {successMsg && (
        <div className="bg-emerald-50 border border-emerald-200 text-emerald-700 font-mono text-xs p-4 flex items-center justify-between rounded shadow-sm text-left">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{successMsg}</span>
          </div>
          <button onClick={() => setSuccessMsg("")} className="text-slate-400 hover:text-slate-700 p-1">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* KPI Stats Grid (Responsive 2-col on mobile, 4-col on desktop) */}
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">
        <div className="bg-white border border-slate-200 p-4 sm:p-5 shadow-sm rounded text-left">
          <div className="flex justify-between items-start mb-2 sm:mb-3">
            <span className="font-mono text-[9px] sm:text-[10px] font-bold text-slate-400 uppercase">
              Total Articles
            </span>
            <BookOpen className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
          </div>
          <div className="font-display font-extrabold text-2xl sm:text-3xl text-slate-900">
            {stats?.totalPosts || blogPosts.length}
          </div>
          <div className="font-mono text-[9px] sm:text-[10px] text-slate-400 mt-1 truncate">
            Authored Whitepapers
          </div>
        </div>

        <div className="bg-white border border-slate-200 p-4 sm:p-5 shadow-sm rounded text-left">
          <div className="flex justify-between items-start mb-2 sm:mb-3">
            <span className="font-mono text-[9px] sm:text-[10px] font-bold text-slate-400 uppercase">
              Published Live
            </span>
            <Globe className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-600" />
          </div>
          <div className="font-display font-extrabold text-2xl sm:text-3xl text-emerald-600">
            {stats?.publishedCount || blogPosts.filter((p) => p.isPublished).length}
          </div>
          <div className="font-mono text-[9px] sm:text-[10px] text-slate-400 mt-1 truncate">
            Publicly Discoverable
          </div>
        </div>

        <div className="bg-white border border-slate-200 p-4 sm:p-5 shadow-sm rounded text-left">
          <div className="flex justify-between items-start mb-2 sm:mb-3">
            <span className="font-mono text-[9px] sm:text-[10px] font-bold text-slate-400 uppercase">
              Drafts
            </span>
            <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-amber-600" />
          </div>
          <div className="font-display font-extrabold text-2xl sm:text-3xl text-amber-600">
            {stats?.draftCount || blogPosts.filter((p) => !p.isPublished).length}
          </div>
          <div className="font-mono text-[9px] sm:text-[10px] text-slate-400 mt-1 truncate">
            Editorial Queue
          </div>
        </div>

        <div className="bg-white border border-slate-200 p-4 sm:p-5 shadow-sm rounded text-left">
          <div className="flex justify-between items-start mb-2 sm:mb-3">
            <span className="font-mono text-[9px] sm:text-[10px] font-bold text-slate-400 uppercase">
              Impressions
            </span>
            <Eye className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600" />
          </div>
          <div className="font-display font-extrabold text-2xl sm:text-3xl text-purple-600">
            {stats?.totalViews?.toLocaleString() || "1,240"}
          </div>
          <div className="font-mono text-[9px] sm:text-[10px] text-slate-400 mt-1 truncate">
            Total Engineer Reads
          </div>
        </div>
      </div>

      {/* Filter and Search Toolbar */}
      <div className="bg-white border border-slate-200 p-4 shadow-sm flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3.5 rounded text-left">
        <div className="relative flex-1 min-w-0">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search articles by title, author, sector, or keyword..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 font-mono text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-primary rounded"
          />
        </div>

        {/* Status Pills */}
        <div className="flex items-center gap-1 overflow-x-auto pb-1 sm:pb-0 scrollbar-none font-mono text-xs">
          {["ALL", "Published", "Draft"].map((st) => (
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

        {/* Category & Sector Dropdowns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:flex items-center gap-2">
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="bg-slate-50 border border-slate-200 text-slate-700 font-mono text-xs px-3 py-2 focus:outline-none focus:border-primary rounded w-full lg:w-auto"
          >
            {CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {cat === "ALL" ? "All Categories" : cat}
              </option>
            ))}
          </select>

          <select
            value={sectorFilter}
            onChange={(e) => setSectorFilter(e.target.value)}
            className="bg-slate-50 border border-slate-200 text-slate-700 font-mono text-xs px-3 py-2 focus:outline-none focus:border-primary rounded w-full lg:w-auto"
          >
            {SECTORS.map((sec) => (
              <option key={sec} value={sec}>
                {sec === "ALL" ? "All Sectors" : sec}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* ARTICLES CONTAINER: RESPONSIVE DUAL VIEW */}
      <div className="bg-white border border-slate-200 shadow-sm rounded overflow-hidden">
        <div className="px-4 sm:px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <div className="flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-primary" />
            <h3 className="font-display font-extrabold text-xs uppercase tracking-wider text-slate-900">
              Published Technical Articles Directory ({blogPosts.length})
            </h3>
          </div>
          {(searchQuery || statusFilter !== "ALL" || categoryFilter !== "ALL" || sectorFilter !== "ALL") && (
            <button
              onClick={() => {
                setSearchQuery("");
                setStatusFilter("ALL");
                setCategoryFilter("ALL");
                setSectorFilter("ALL");
              }}
              className="text-[11px] font-mono text-primary hover:underline flex items-center gap-1 font-bold"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset Filters</span>
            </button>
          )}
        </div>

        {isPostsLoading ? (
          <div className="py-16 text-center font-mono text-slate-500 text-xs flex items-center justify-center gap-3">
            <RefreshCw className="w-4 h-4 animate-spin text-primary" />
            <span>FETCHING ARTICLES...</span>
          </div>
        ) : blogPosts.length === 0 ? (
          <div className="py-16 text-center font-mono text-slate-500 text-xs space-y-2">
            <BookOpen className="w-10 h-10 mx-auto text-slate-300" />
            <p className="font-bold text-slate-700">No articles match current filters.</p>
            <p className="text-[11px] text-slate-400">Try adjusting your search terms or category selections.</p>
          </div>
        ) : (
          <>
            {/* 1. DESKTOP & TABLET VIEW: FULL DATA TABLE (HIDDEN ON SMALL MOBILE) */}
            <div className="hidden md:block overflow-x-auto custom-scrollbar">
              <table className="w-full text-left font-mono text-xs min-w-[760px]">
                <thead className="bg-slate-50 text-slate-500 uppercase text-[9px] tracking-wider border-b border-slate-200">
                  <tr>
                    <th className="px-4 sm:px-6 py-3.5 text-left">Cover & Article Title</th>
                    <th className="px-4 sm:px-6 py-3.5 text-left">Category / Sector</th>
                    <th className="px-4 sm:px-6 py-3.5 text-left">Author</th>
                    <th className="px-4 sm:px-6 py-3.5 text-left">Read Time</th>
                    <th className="px-4 sm:px-6 py-3.5 text-center">Views</th>
                    <th className="px-4 sm:px-6 py-3.5 text-center">Status</th>
                    <th className="px-4 sm:px-6 py-3.5 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700">
                  {blogPosts.map((post) => (
                    <tr key={post.id} className="hover:bg-slate-50 transition-colors group">
                      {/* Cover & Title */}
                      <td className="px-4 sm:px-6 py-4 text-left align-middle">
                        <div className="flex items-center gap-3">
                          {post.coverImage ? (
                            <img
                              src={post.coverImage}
                              alt={post.title}
                              className="w-12 h-9 object-cover rounded border border-slate-200 shrink-0"
                            />
                          ) : (
                            <div className="w-12 h-9 bg-slate-100 text-slate-400 rounded flex items-center justify-center shrink-0">
                              <ImageIcon className="w-4 h-4" />
                            </div>
                          )}
                          <div className="min-w-0 max-w-xs sm:max-w-sm lg:max-w-md text-left">
                            <button
                              onClick={() => setPreviewPost(post)}
                              className="font-bold text-slate-900 hover:text-primary transition-colors text-left line-clamp-1 block"
                            >
                              {post.title}
                            </button>
                            <div className="text-[10px] text-slate-400 truncate mt-0.5 text-left">
                              /{post.slug}
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Category / Sector */}
                      <td className="px-4 sm:px-6 py-4 text-left align-middle">
                        <span className="px-2 py-0.5 text-[10px] font-bold uppercase bg-slate-100 text-slate-700 border border-slate-200 rounded inline-block">
                          {post.category}
                        </span>
                        {post.sector && (
                          <div className="text-[10px] text-slate-500 mt-1 text-left">Sector: {post.sector}</div>
                        )}
                      </td>

                      {/* Author */}
                      <td className="px-4 sm:px-6 py-4 text-left align-middle">
                        <div className="font-bold text-slate-900 text-left">{post.authorName}</div>
                        <div className="text-[10px] text-slate-400 text-left">{post.authorTitle}</div>
                      </td>

                      {/* Read Time */}
                      <td className="px-4 sm:px-6 py-4 text-slate-600 text-left align-middle">
                        <div className="flex items-center gap-1">
                          <Clock className="w-3 h-3 text-slate-400 shrink-0" />
                          <span className="truncate">{post.readTime || "5 min read"}</span>
                        </div>
                      </td>

                      {/* Views */}
                      <td className="px-4 sm:px-6 py-4 text-slate-600 text-center align-middle">
                        <div className="inline-flex items-center gap-1 font-bold">
                          <Eye className="w-3 h-3 text-slate-400 shrink-0" />
                          <span>{post.views || 0}</span>
                        </div>
                      </td>

                      {/* Status Badge */}
                      <td className="px-4 sm:px-6 py-4 text-center align-middle">
                        <button
                          onClick={() => handleTogglePublish(post.id, post.isPublished)}
                          className={`px-2.5 py-1 text-[10px] font-bold uppercase rounded border transition-colors inline-block ${
                            post.isPublished
                              ? "bg-emerald-50 text-emerald-700 border-emerald-300 hover:bg-emerald-100"
                              : "bg-amber-50 text-amber-700 border-amber-300 hover:bg-amber-100"
                          }`}
                          title="Click to toggle publication"
                        >
                          {post.isPublished ? "Published" : "Draft"}
                        </button>
                      </td>

                      {/* Actions */}
                      <td className="px-4 sm:px-6 py-4 text-right align-middle">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => setPreviewPost(post)}
                            className="p-1.5 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded transition-colors"
                            title="Preview Full Article"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <Link
                            href={`/resources/blog/${post.slug}`}
                            target="_blank"
                            className="p-1.5 text-slate-500 hover:text-cyan-600 hover:bg-slate-100 rounded transition-colors"
                            title="View Public Article Page"
                          >
                            <ExternalLink className="w-4 h-4" />
                          </Link>
                          <button
                            onClick={() => handleOpenEdit(post)}
                            className="p-1.5 text-slate-500 hover:text-amber-600 hover:bg-slate-100 rounded transition-colors"
                            title="Edit Article"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => setDeleteConfirmId(post.id)}
                            className="p-1.5 text-slate-500 hover:text-rose-600 hover:bg-slate-100 rounded transition-colors"
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

            {/* 2. MOBILE CARD VIEW (SHOWN ONLY ON SMALL SCREENS < 768px) */}
            <div className="md:hidden divide-y divide-slate-100 font-mono text-xs">
              {blogPosts.map((post) => (
                <div key={post.id} className="p-4 space-y-3 hover:bg-slate-50 transition-colors">
                  {/* Card Header: Badges & Status */}
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex flex-wrap items-center gap-1.5">
                      <span className="px-2 py-0.5 text-[9px] font-bold uppercase bg-slate-100 text-slate-700 border border-slate-200 rounded">
                        {post.category}
                      </span>
                      {post.sector && (
                        <span className="px-2 py-0.5 text-[9px] font-bold uppercase bg-rose-50 text-rose-700 border border-rose-200 rounded">
                          {post.sector}
                        </span>
                      )}
                    </div>
                    <button
                      onClick={() => handleTogglePublish(post.id, post.isPublished)}
                      className={`px-2 py-0.5 text-[9px] font-bold uppercase rounded border transition-colors shrink-0 ${
                        post.isPublished
                          ? "bg-emerald-50 text-emerald-700 border-emerald-300"
                          : "bg-amber-50 text-amber-700 border-amber-300"
                      }`}
                    >
                      {post.isPublished ? "Published" : "Draft"}
                    </button>
                  </div>

                  {/* Card Main: Image + Title */}
                  <div className="flex items-start gap-3">
                    {post.coverImage ? (
                      <img
                        src={post.coverImage}
                        alt={post.title}
                        className="w-16 h-14 object-cover rounded border border-slate-200 shrink-0"
                      />
                    ) : (
                      <div className="w-16 h-14 bg-slate-100 text-slate-400 rounded flex items-center justify-center shrink-0">
                        <ImageIcon className="w-5 h-5" />
                      </div>
                    )}
                    <div className="min-w-0 flex-1">
                      <button
                        onClick={() => setPreviewPost(post)}
                        className="font-bold text-slate-900 hover:text-primary transition-colors text-left line-clamp-2 text-xs leading-snug"
                      >
                        {post.title}
                      </button>
                      <div className="text-[10px] text-slate-400 truncate mt-1">
                        /{post.slug}
                      </div>
                    </div>
                  </div>

                  {/* Card Meta: Author, Read Time, Views */}
                  <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1 border-t border-slate-100">
                    <div className="truncate font-medium text-slate-700">
                      By {post.authorName}
                    </div>
                    <div className="flex items-center gap-3 shrink-0">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3 text-slate-400" />
                        {post.readTime || "5m"}
                      </span>
                      <span className="flex items-center gap-1 font-bold text-slate-700">
                        <Eye className="w-3 h-3 text-slate-400" />
                        {post.views || 0}
                      </span>
                    </div>
                  </div>

                  {/* Card Actions Footer */}
                  <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                    <button
                      onClick={() => setPreviewPost(post)}
                      className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded font-bold text-[10px] uppercase flex items-center gap-1 transition-colors"
                    >
                      <Eye className="w-3 h-3 text-primary" />
                      <span>Preview</span>
                    </button>

                    <div className="flex items-center gap-1.5">
                      <Link
                        href={`/resources/blog/${post.slug}`}
                        target="_blank"
                        className="p-1.5 text-slate-500 hover:text-cyan-600 hover:bg-slate-100 rounded transition-colors"
                        title="View Public Article Page"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </Link>
                      <button
                        onClick={() => handleOpenEdit(post)}
                        className="p-1.5 text-slate-500 hover:text-amber-600 hover:bg-slate-100 rounded transition-colors"
                        title="Edit Article"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => setDeleteConfirmId(post.id)}
                        className="p-1.5 text-slate-500 hover:text-rose-600 hover:bg-slate-100 rounded transition-colors"
                        title="Delete Article"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      {/* CREATE / EDIT ARTICLE MODAL WITH LIVE PREVIEW TAB */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4 overflow-y-auto text-left">
          <div className="bg-white border border-slate-200 w-full max-w-4xl shadow-2xl rounded overflow-hidden my-auto max-h-[94vh] flex flex-col text-left">
            {/* Modal Header with Tabs */}
            <div className="px-4 sm:px-6 py-3.5 sm:py-4 border-b border-slate-100 flex flex-wrap items-center justify-between gap-3 bg-slate-50 shrink-0">
              <div className="flex items-center gap-2.5 min-w-0">
                <BookOpen className="w-4 h-4 sm:w-5 sm:h-5 text-primary shrink-0" />
                <h3 className="font-display font-extrabold text-xs sm:text-sm uppercase text-slate-900 truncate">
                  {editingPost ? `Edit: ${editingPost.title}` : "Write & Publish Article"}
                </h3>
              </div>

              <div className="flex items-center gap-2">
                {/* Tab Switcher */}
                <div className="flex bg-slate-200 p-0.5 rounded font-mono text-[11px] sm:text-xs">
                  <button
                    type="button"
                    onClick={() => setModalActiveTab("edit")}
                    className={`px-2.5 sm:px-3 py-1 font-bold rounded transition-colors ${
                      modalActiveTab === "edit"
                        ? "bg-white text-slate-900 shadow-sm"
                        : "text-slate-600 hover:text-slate-900"
                    }`}
                  >
                    Edit Content
                  </button>
                  <button
                    type="button"
                    onClick={() => setModalActiveTab("preview")}
                    className={`px-2.5 sm:px-3 py-1 font-bold rounded transition-colors flex items-center gap-1.5 ${
                      modalActiveTab === "preview"
                        ? "bg-white text-slate-900 shadow-sm"
                        : "text-slate-600 hover:text-slate-900"
                    }`}
                  >
                    <Eye className="w-3.5 h-3.5 text-primary" />
                    <span>Live Preview</span>
                  </button>
                </div>

                <button
                  onClick={() => setIsCreateModalOpen(false)}
                  className="text-slate-400 hover:text-slate-700 p-1 ml-1"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-4 sm:p-6 overflow-y-auto custom-scrollbar flex-1 font-mono text-xs text-left">
              {formError && (
                <div className="p-3 mb-4 bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2 rounded text-left">
                  <AlertTriangle className="w-4 h-4 shrink-0 text-primary" />
                  <span>{formError}</span>
                </div>
              )}

              {modalActiveTab === "edit" ? (
                <form id="blog-form" onSubmit={handleSubmitForm} className="space-y-4 sm:space-y-5 text-left">
                  {/* Title & Slug */}
                  <div className="space-y-3 sm:space-y-4">
                    <div>
                      <label className="block text-[9px] text-slate-500 uppercase tracking-wider mb-1 font-bold text-left">
                        Article Headline Title *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. CFD Modeling for Rotary Kiln Preheater Tower Optimization"
                        value={formTitle}
                        onChange={(e) => {
                          setFormTitle(e.target.value);
                          if (!editingPost) {
                            setFormSlug(
                              e.target.value
                                .toLowerCase()
                                .replace(/[^a-z0-9]+/g, "-")
                                .replace(/^-|-$/g, "")
                            );
                          }
                        }}
                        className="w-full bg-white border border-slate-200 p-2 sm:p-2.5 text-slate-900 font-bold focus:outline-none focus:border-primary rounded text-left"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
                      <div>
                        <label className="block text-[9px] text-slate-500 uppercase tracking-wider mb-1 font-bold text-left">
                          URL Slug
                        </label>
                        <input
                          type="text"
                          value={formSlug}
                          onChange={(e) => setFormSlug(e.target.value)}
                          placeholder="cfd-rotary-kiln-optimization"
                          className="w-full bg-white border border-slate-200 p-2 text-slate-800 focus:outline-none focus:border-primary rounded text-left"
                        />
                      </div>

                      <div>
                        <label className="block text-[9px] text-slate-500 uppercase tracking-wider mb-1 font-bold text-left">
                          Category *
                        </label>
                        <select
                          value={formCategory}
                          onChange={(e) => setFormCategory(e.target.value)}
                          className="w-full bg-white border border-slate-200 p-2 text-slate-800 focus:outline-none focus:border-primary rounded text-left"
                        >
                          {CATEGORIES.filter((c) => c !== "ALL").map((cat) => (
                            <option key={cat} value={cat}>
                              {cat}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-[9px] text-slate-500 uppercase tracking-wider mb-1 font-bold text-left">
                          Target Sector
                        </label>
                        <select
                          value={formSector}
                          onChange={(e) => setFormSector(e.target.value)}
                          className="w-full bg-white border border-slate-200 p-2 text-slate-800 focus:outline-none focus:border-primary rounded text-left"
                        >
                          {SECTORS.filter((s) => s !== "ALL").map((sec) => (
                            <option key={sec} value={sec}>
                              {sec}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Author & Status */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
                    <div>
                      <label className="block text-[9px] text-slate-500 uppercase tracking-wider mb-1 font-bold text-left">
                        Author Name
                      </label>
                      <input
                        type="text"
                        value={formAuthorName}
                        onChange={(e) => setFormAuthorName(e.target.value)}
                        placeholder="e.g. Dr. Ronald Miller"
                        className="w-full bg-white border border-slate-200 p-2 text-slate-800 focus:outline-none focus:border-primary rounded text-left"
                      />
                    </div>
                    <div>
                      <label className="block text-[9px] text-slate-500 uppercase tracking-wider mb-1 font-bold text-left">
                        Author Designation
                      </label>
                      <input
                        type="text"
                        value={formAuthorTitle}
                        onChange={(e) => setFormAuthorTitle(e.target.value)}
                        placeholder="e.g. Lead Thermal Engineer"
                        className="w-full bg-white border border-slate-200 p-2 text-slate-800 focus:outline-none focus:border-primary rounded text-left"
                      />
                    </div>
                    <div>
                      <label className="block text-[9px] text-slate-500 uppercase tracking-wider mb-1 font-bold text-left">
                        Publishing Status
                      </label>
                      <select
                        value={formIsPublished ? "true" : "false"}
                        onChange={(e) => setFormIsPublished(e.target.value === "true")}
                        className="w-full bg-white border border-slate-200 p-2 text-slate-800 focus:outline-none focus:border-primary rounded text-left"
                      >
                        <option value="true">Published (Live Online)</option>
                        <option value="false">Draft (Internal Only)</option>
                      </select>
                    </div>
                  </div>

                  {/* Cover Photo with Cloudinary Upload */}
                  <div className="p-3.5 sm:p-4 bg-slate-50 border border-slate-200 rounded space-y-2 text-left">
                    <label className="block text-[9px] text-slate-600 uppercase tracking-wider font-bold text-left">
                      Main Header Cover Photo (Cloudinary Direct Uploader)
                    </label>
                    <div className="flex flex-col sm:flex-row gap-2">
                      <input
                        type="text"
                        placeholder="https://images.unsplash.com/... or upload directly"
                        value={formCoverImage}
                        onChange={(e) => setFormCoverImage(e.target.value)}
                        className="flex-1 bg-white border border-slate-200 p-2 text-slate-800 focus:outline-none focus:border-primary rounded text-left"
                      />
                      <label className="px-4 py-2 bg-primary hover:bg-rose-700 text-white font-bold uppercase text-[10px] rounded cursor-pointer flex items-center justify-center gap-1.5 transition-colors shrink-0 shadow-sm">
                        {uploadingTarget === "cover" ? (
                          <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                        ) : (
                          <Upload className="w-3.5 h-3.5" />
                        )}
                        <span>{uploadingTarget === "cover" ? "Uploading..." : "Upload Photo"}</span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleUploadCoverPhoto}
                          disabled={uploadingTarget !== null}
                          className="hidden"
                        />
                      </label>
                    </div>
                  </div>

                  {/* Abstract / Excerpt */}
                  <div>
                    <label className="block text-[9px] text-slate-500 uppercase tracking-wider mb-1 font-bold text-left">
                      Abstract / Executive Summary (Displayed on Blog Cards & Search) *
                    </label>
                    <textarea
                      rows={2}
                      required
                      value={formExcerpt}
                      onChange={(e) => setFormExcerpt(e.target.value)}
                      placeholder="Brief 2-3 sentence overview of this case study or engineering insight..."
                      className="w-full bg-white border border-slate-200 p-2.5 text-slate-800 focus:outline-none focus:border-primary rounded text-left"
                    />
                  </div>

                  {/* Markdown Content & Quick Format Toolbar */}
                  <div>
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-1 text-left">
                      <label className="block text-[9px] text-slate-500 uppercase tracking-wider font-bold text-left">
                        Technical Article Content (Markdown format) *
                      </label>
                      <div className="flex items-center gap-1.5">
                        <button
                          type="button"
                          onClick={() => insertMarkdownSnippet("## Section Heading Title")}
                          className="px-2 py-0.5 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded text-[10px] font-bold border border-slate-200"
                        >
                          + H2
                        </button>
                        <button
                          type="button"
                          onClick={() => insertMarkdownSnippet("- Bullet point parameter")}
                          className="px-2 py-0.5 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded text-[10px] font-bold border border-slate-200"
                        >
                          + List
                        </button>
                      </div>
                    </div>
                    <textarea
                      rows={8}
                      required
                      value={formContent}
                      onChange={(e) => setFormContent(e.target.value)}
                      placeholder="Write your complete engineering case study..."
                      className="w-full bg-white border border-slate-200 p-3 text-slate-900 font-mono text-xs focus:outline-none focus:border-primary rounded leading-relaxed text-left"
                    />
                  </div>

                  {/* Dynamic Inline Photos Section */}
                  <div className="border-t border-slate-200 pt-5 space-y-4 text-left">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <ImageIcon className="w-4 h-4 text-primary" />
                        <h4 className="font-bold text-xs uppercase text-slate-900">
                          Inline Technical Figures & Diagrams ({formImages.length})
                        </h4>
                      </div>
                      <button
                        type="button"
                        onClick={handleAddImage}
                        className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold uppercase text-[10px] rounded flex items-center gap-1.5 transition-colors border border-slate-200"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Add Figure</span>
                      </button>
                    </div>

                    <div className="space-y-3">
                      {formImages.map((img, idx) => (
                        <div
                          key={idx}
                          className="p-3 sm:p-4 bg-slate-50 border border-slate-200 rounded space-y-3 relative group text-left"
                        >
                          <button
                            type="button"
                            onClick={() => handleRemoveImage(idx)}
                            className="absolute top-3 right-3 p-1 text-slate-400 hover:text-rose-600 transition-colors"
                            title="Remove Figure"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pr-6 sm:pr-8">
                            <div>
                              <label className="block text-[9px] text-slate-500 uppercase tracking-wider mb-1 font-bold text-left">
                                Image URL / Upload *
                              </label>
                              <div className="flex flex-col sm:flex-row gap-1.5 sm:gap-2">
                                <input
                                  type="text"
                                  placeholder="https://..."
                                  value={img.url}
                                  onChange={(e) => handleImageChange(idx, "url", e.target.value)}
                                  className="flex-1 bg-white border border-slate-200 p-2 text-slate-800 text-xs rounded focus:outline-none focus:border-primary text-left"
                                />
                                <label className="px-3 py-1.5 sm:py-2 bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold text-[10px] rounded cursor-pointer flex items-center justify-center gap-1 shrink-0 transition-colors">
                                  {uploadingTarget === `inline-${idx}` ? (
                                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                                  ) : (
                                    <Upload className="w-3.5 h-3.5" />
                                  )}
                                  <span>{uploadingTarget === `inline-${idx}` ? "..." : "Upload"}</span>
                                  <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => handleUploadInlinePhoto(e, idx)}
                                    disabled={uploadingTarget !== null}
                                    className="hidden"
                                  />
                                </label>
                              </div>
                            </div>

                            <div>
                              <label className="block text-[9px] text-slate-500 uppercase tracking-wider mb-1 font-bold text-left">
                                Caption / Description
                              </label>
                              <input
                                type="text"
                                placeholder="e.g. Figure 1: Velocity contours inside calciner throat"
                                value={img.caption}
                                onChange={(e) => handleImageChange(idx, "caption", e.target.value)}
                                className="w-full bg-white border border-slate-200 p-2 text-slate-800 text-xs rounded focus:outline-none focus:border-primary text-left"
                              />
                            </div>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <div>
                              <label className="block text-[9px] text-slate-500 uppercase tracking-wider mb-1 font-bold text-left">
                                Placement In Article
                              </label>
                              <select
                                value={img.position}
                                onChange={(e) => handleImageChange(idx, "position", e.target.value)}
                                className="w-full bg-white border border-slate-200 p-2 text-slate-800 text-xs rounded focus:outline-none focus:border-primary text-left"
                              >
                                <option value="INTRO">Intro Section (Below Header)</option>
                                <option value="BODY_MID">Mid Article (Technical Body)</option>
                                <option value="BODY_END">Conclusion / Footer Area</option>
                              </select>
                            </div>

                            <div>
                              <label className="block text-[9px] text-slate-500 uppercase tracking-wider mb-1 font-bold text-left">
                                Layout Rendering
                              </label>
                              <select
                                value={img.layout}
                                onChange={(e) => handleImageChange(idx, "layout", e.target.value)}
                                className="w-full bg-white border border-slate-200 p-2 text-slate-800 text-xs rounded focus:outline-none focus:border-primary text-left"
                              >
                                <option value="FULL">Full Width Banner</option>
                                <option value="SIDE_LEFT">Side by Side (Left)</option>
                                <option value="SIDE_RIGHT">Side by Side (Right)</option>
                                <option value="GRID_2">Grid 2-Column</option>
                              </select>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </form>
              ) : (
                /* LIVE ARTICLE PREVIEW TAB */
                <div className="bg-white border border-slate-200 p-4 sm:p-6 rounded space-y-5 max-w-3xl mx-auto shadow-sm text-left">
                  {/* Header Meta */}
                  <div className="space-y-3 border-b border-slate-100 pb-5 text-left">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="px-2.5 py-0.5 text-[10px] font-bold uppercase bg-primary text-white rounded">
                        {livePreviewDraft.category}
                      </span>
                      {livePreviewDraft.sector && (
                        <span className="px-2.5 py-0.5 text-[10px] font-bold uppercase bg-slate-100 text-slate-700 border border-slate-200 rounded">
                          {livePreviewDraft.sector}
                        </span>
                      )}
                      <span className="text-slate-400 text-xs ml-auto flex items-center gap-1 font-mono">
                        <Clock className="w-3.5 h-3.5" />
                        {livePreviewDraft.readTime}
                      </span>
                    </div>

                    <h1 className="font-display font-extrabold text-xl sm:text-3xl text-slate-900 leading-tight text-left">
                      {livePreviewDraft.title}
                    </h1>

                    <p className="text-sm sm:text-base text-slate-600 font-sans leading-relaxed border-l-4 border-primary pl-4 py-1 italic bg-slate-50 rounded-r text-left">
                      {livePreviewDraft.excerpt}
                    </p>
                  </div>

                  {/* Author Card */}
                  <div className="flex items-center gap-3 py-3 border-y border-slate-100 font-mono text-xs text-left">
                    <div className="w-10 h-10 rounded-full bg-primary text-white font-bold flex items-center justify-center text-sm shadow-sm shrink-0">
                      {livePreviewDraft.authorName.charAt(0)}
                    </div>
                    <div className="min-w-0 text-left">
                      <div className="font-bold text-slate-900 truncate">{livePreviewDraft.authorName}</div>
                      <div className="text-slate-500 text-[11px] truncate">{livePreviewDraft.authorTitle}</div>
                    </div>
                    <div className="ml-auto text-slate-400 text-[11px] shrink-0 text-right">
                      Published: {new Date(livePreviewDraft.createdAt).toLocaleDateString()}
                    </div>
                  </div>

                  {/* Cover Photo */}
                  {livePreviewDraft.coverImage ? (
                    <div className="space-y-1.5 overflow-hidden text-left">
                      <img
                        src={livePreviewDraft.coverImage}
                        alt={livePreviewDraft.title}
                        className="w-full max-h-[380px] object-cover rounded border border-slate-200 shadow-sm"
                      />
                      <div className="text-[10px] font-mono text-slate-400 italic text-left">
                        Cover Figure: {livePreviewDraft.title}
                      </div>
                    </div>
                  ) : null}

                  {/* Intro Section Photos */}
                  {livePreviewDraft.images
                    .filter((img) => img.position === "INTRO" && Boolean(img.url && img.url.trim() !== ""))
                    .map((img, idx) => (
                      <div key={idx} className="my-4 space-y-1.5 overflow-hidden text-left">
                        <img
                          src={img.url}
                          alt={img.altText || img.caption || "Intro photo"}
                          className="w-full object-cover rounded border border-slate-200 shadow-sm"
                        />
                        {img.caption && (
                          <p className="text-[11px] font-mono text-slate-500 italic text-left">
                            {img.caption}
                          </p>
                        )}
                      </div>
                    ))}

                  {/* Content Markdown Formatted */}
                  <div className="prose prose-slate max-w-none text-slate-800 leading-relaxed font-sans text-sm space-y-3 text-left">
                    {livePreviewDraft.content.split("\n\n").map((paragraph, idx) => {
                      if (paragraph.startsWith("## ")) {
                        return (
                          <h2
                            key={idx}
                            className="font-display font-extrabold text-base sm:text-xl text-slate-900 mt-6 mb-2 uppercase tracking-tight border-b border-slate-200 pb-1 text-primary text-left"
                          >
                            {paragraph.replace("## ", "")}
                          </h2>
                        );
                      }
                      if (paragraph.startsWith("- ")) {
                        return (
                          <ul key={idx} className="list-disc pl-5 space-y-1 font-mono text-xs text-slate-700 text-left">
                            {paragraph.split("\n").map((item, i) => (
                              <li key={i}>{item.replace("- ", "")}</li>
                            ))}
                          </ul>
                        );
                      }
                      return <p key={idx} className="text-left">{paragraph}</p>;
                    })}
                  </div>

                  {/* Mid Body Section Photos */}
                  {livePreviewDraft.images
                    .filter((img) => img.position === "BODY_MID" && Boolean(img.url && img.url.trim() !== ""))
                    .map((img, idx) => (
                      <div key={idx} className="my-6 space-y-2 bg-slate-50 p-4 border border-slate-200 rounded overflow-hidden text-left">
                        <img
                          src={img.url}
                          alt={img.altText || img.caption || "Technical diagram"}
                          className="w-full object-cover rounded border border-slate-200"
                        />
                        {img.caption && (
                          <p className="text-[11px] font-mono text-slate-600 font-semibold text-left">
                            Figure {idx + 1}: {img.caption}
                          </p>
                        )}
                      </div>
                    ))}

                  {/* Conclusion Section Photos */}
                  {livePreviewDraft.images
                    .filter((img) => img.position === "BODY_END" && Boolean(img.url && img.url.trim() !== ""))
                    .map((img, idx) => (
                      <div key={idx} className="my-4 space-y-1.5 overflow-hidden text-left">
                        <img
                          src={img.url}
                          alt={img.altText || img.caption || "Conclusion photo"}
                          className="w-full object-cover rounded border border-slate-200"
                        />
                        {img.caption && (
                          <p className="text-[11px] font-mono text-slate-500 italic text-left">
                            {img.caption}
                          </p>
                        )}
                      </div>
                    ))}

                  {/* Bottom Contact CTA */}
                  <div className="p-4 sm:p-5 bg-slate-950 text-white font-mono text-xs space-y-2 rounded border border-slate-800 text-left">
                    <div className="font-bold text-rose-400 uppercase tracking-wider flex items-center gap-2">
                      <Sparkles className="w-4 h-4 shrink-0" />
                      <span>Process Plant Audit & CFD Support</span>
                    </div>
                    <p className="text-slate-300">
                      Request custom thermal modeling or 3D scanning from MacProtec's senior engineering team.
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Modal Footer Actions */}
            <div className="px-4 sm:px-6 py-3.5 sm:py-4 border-t border-slate-100 bg-slate-50 flex items-center justify-end gap-3 shrink-0">
              <button
                type="button"
                onClick={() => setIsCreateModalOpen(false)}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold uppercase text-xs rounded transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                form="blog-form"
                onClick={handleSubmitForm}
                disabled={isCreating || isUpdating}
                className="px-5 sm:px-6 py-2 bg-primary hover:bg-rose-700 text-white font-bold uppercase text-xs rounded transition-all shadow-sm flex items-center gap-2"
              >
                {(isCreating || isUpdating) && <RefreshCw className="w-4 h-4 animate-spin" />}
                <span>{editingPost ? "Update Article" : "Publish Article"}</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* DEDICATED FULL ARTICLE PREVIEW MODAL */}
      {previewPost && (
        <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4 overflow-y-auto text-left">
          <div className="bg-white border border-slate-200 w-full max-w-4xl shadow-2xl rounded overflow-hidden my-auto max-h-[94vh] flex flex-col text-left">
            {/* Top Bar */}
            <div className="px-4 sm:px-6 py-3.5 sm:py-4 bg-slate-100 border-b border-slate-200 flex flex-wrap items-center justify-between gap-3 shrink-0">
              <div className="flex items-center gap-2 min-w-0 max-w-[60%] sm:max-w-none text-left">
                <Globe className="w-4 h-4 sm:w-5 sm:h-5 text-primary shrink-0" />
                <span className="font-mono font-bold text-xs uppercase text-slate-900 truncate">
                  Preview: {previewPost.title}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => window.print()}
                  className="px-2.5 sm:px-3 py-1.5 bg-slate-200 hover:bg-slate-300 text-slate-800 font-mono text-xs font-bold uppercase rounded flex items-center gap-1.5 transition-colors"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Print</span>
                </button>
                <Link
                  href={`/blog/${previewPost.slug}`}
                  target="_blank"
                  className="px-2.5 sm:px-3 py-1.5 bg-primary hover:bg-rose-700 text-white font-mono text-xs font-bold uppercase rounded flex items-center gap-1.5 transition-colors shadow-sm"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">View Live</span>
                </Link>
                <button
                  onClick={() => setPreviewPost(null)}
                  className="p-1 text-slate-400 hover:text-slate-700 ml-1"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Document Body */}
            <div className="p-4 sm:p-8 space-y-5 sm:space-y-6 overflow-y-auto custom-scrollbar font-sans text-slate-800 max-w-3xl mx-auto w-full text-left">
              <div className="space-y-3 border-b border-slate-100 pb-5 text-left">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-2.5 py-0.5 text-[10px] font-bold uppercase bg-primary text-white rounded">
                    {previewPost.category}
                  </span>
                  {previewPost.sector && (
                    <span className="px-2.5 py-0.5 text-[10px] font-bold uppercase bg-slate-100 text-slate-700 border border-slate-200 rounded">
                      {previewPost.sector}
                    </span>
                  )}
                  <span className="text-slate-400 text-xs ml-auto flex items-center gap-1 font-mono">
                    <Clock className="w-3.5 h-3.5" />
                    {previewPost.readTime || "5 min read"}
                  </span>
                </div>

                <h1 className="font-display font-extrabold text-xl sm:text-3xl lg:text-4xl text-slate-900 leading-tight text-left">
                  {previewPost.title}
                </h1>

                <p className="text-sm sm:text-base lg:text-lg text-slate-600 font-sans leading-relaxed border-l-4 border-primary pl-4 py-1 italic bg-slate-50 rounded-r text-left">
                  {previewPost.excerpt}
                </p>
              </div>

              {/* Author Card */}
              <div className="flex items-center gap-3 py-3 border-y border-slate-100 font-mono text-xs text-left">
                <div className="w-10 h-10 rounded-full bg-primary text-white font-bold flex items-center justify-center text-sm shadow-sm shrink-0">
                  {previewPost.authorName.charAt(0)}
                </div>
                <div className="min-w-0 text-left">
                  <div className="font-bold text-slate-900 truncate">{previewPost.authorName}</div>
                  <div className="text-slate-500 text-[11px] truncate">{previewPost.authorTitle}</div>
                </div>
                <div className="ml-auto text-slate-400 text-[11px] shrink-0 text-right">
                  Published: {new Date(previewPost.createdAt).toLocaleDateString()}
                </div>
              </div>

              {/* Cover Banner Photo */}
              {previewPost.coverImage ? (
                <div className="space-y-2 overflow-hidden text-left">
                  <img
                    src={previewPost.coverImage}
                    alt={previewPost.title}
                    className="w-full max-h-[420px] object-cover rounded border border-slate-200 shadow-md"
                  />
                  <div className="text-[11px] font-mono text-slate-400 italic text-left">
                    Hero Cover Photo — {previewPost.title}
                  </div>
                </div>
              ) : null}

              {/* Intro Section Photos */}
              {previewPost.images
                .filter((img) => img.position === "INTRO" && Boolean(img.url && img.url.trim() !== ""))
                .map((img, idx) => (
                  <div key={idx} className="my-5 space-y-2 overflow-hidden text-left">
                    <img
                      src={img.url}
                      alt={img.altText || img.caption || "Intro photo"}
                      className="w-full object-cover rounded border border-slate-200"
                    />
                    {img.caption && (
                      <p className="text-[11px] font-mono text-slate-500 italic text-left">
                        {img.caption}
                      </p>
                    )}
                  </div>
                ))}

              {/* Article Content Rendered with Styled H2s */}
              <div className="prose prose-slate max-w-none text-slate-800 leading-relaxed font-sans text-sm sm:text-base space-y-4 text-left">
                {previewPost.content.split("\n\n").map((paragraph, idx) => {
                  if (paragraph.startsWith("## ")) {
                    return (
                      <h2
                        key={idx}
                        className="font-display font-extrabold text-lg sm:text-2xl text-slate-900 mt-6 mb-3 uppercase tracking-tight border-b border-slate-200 pb-2 text-primary text-left"
                      >
                        {paragraph.replace("## ", "")}
                      </h2>
                    );
                  }
                  if (paragraph.startsWith("- ")) {
                    return (
                      <ul key={idx} className="list-disc pl-5 space-y-1 font-mono text-xs sm:text-sm text-left">
                        {paragraph.split("\n").map((item, i) => (
                          <li key={i}>{item.replace("- ", "")}</li>
                        ))}
                      </ul>
                    );
                  }
                  return <p key={idx} className="text-left">{paragraph}</p>;
                })}
              </div>

              {/* Mid Body Section Photos */}
              {previewPost.images
                .filter((img) => img.position === "BODY_MID" && Boolean(img.url && img.url.trim() !== ""))
                .map((img, idx) => (
                  <div key={idx} className="my-6 space-y-2 bg-slate-50 p-4 border border-slate-200 rounded overflow-hidden text-left">
                    <img
                      src={img.url}
                      alt={img.altText || img.caption || "Technical diagram"}
                      className="w-full object-cover rounded border border-slate-200"
                    />
                    {img.caption && (
                      <p className="text-[11px] font-mono text-slate-600 font-semibold text-left">
                        Figure {idx + 1}: {img.caption}
                      </p>
                    )}
                  </div>
                ))}

              {/* Conclusion Section Photos */}
              {previewPost.images
                .filter((img) => img.position === "BODY_END" && Boolean(img.url && img.url.trim() !== ""))
                .map((img, idx) => (
                  <div key={idx} className="my-5 space-y-2 overflow-hidden text-left">
                    <img
                      src={img.url}
                      alt={img.altText || img.caption || "Conclusion photo"}
                      className="w-full object-cover rounded border border-slate-200"
                    />
                    {img.caption && (
                      <p className="text-[11px] font-mono text-slate-500 italic text-left">
                        {img.caption}
                      </p>
                    )}
                  </div>
                ))}

              {/* Article Footer CTA */}
              <div className="p-5 sm:p-6 bg-slate-950 text-white font-mono text-xs space-y-3 border border-slate-800 rounded text-left">
                <div className="font-bold text-rose-400 uppercase tracking-wider flex items-center gap-2">
                  <Sparkles className="w-4 h-4 shrink-0" />
                  <span>Engineering Audit & CFD Technical Support</span>
                </div>
                <p className="text-slate-300">
                  Request a custom Computational Fluid Dynamics analysis or 3D laser scanning audit for your process plant line.
                </p>
                <Link
                  href="/#contact"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-white font-bold uppercase text-[10px] tracking-wider hover:bg-rose-700 transition-colors rounded shadow-sm"
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
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 text-left">
          <div className="bg-white border border-slate-200 p-6 shadow-xl max-w-md w-full space-y-4 font-mono text-xs rounded text-left">
            <div className="flex items-center gap-3 text-primary">
              <AlertTriangle className="w-6 h-6 shrink-0" />
              <h3 className="font-bold text-sm text-slate-900">Confirm Article Deletion</h3>
            </div>
            <p className="text-slate-600">
              Are you sure you want to delete this technical article from the database? It will no longer be visible to website visitors.
            </p>
            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => setDeleteConfirmId(null)}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold uppercase text-xs rounded"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(deleteConfirmId)}
                disabled={isDeleting}
                className="px-4 py-2 bg-primary hover:bg-rose-700 text-white font-bold uppercase text-xs flex items-center gap-2 rounded shadow-sm"
              >
                {isDeleting && <RefreshCw className="w-3.5 h-3.5 animate-spin" />}
                <span>Delete Article</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
