"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import TechnicalCursor from "@/components/ui/TechnicalCursor";
import { Reveal } from "@/components/ui/Reveal";
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
  ShieldCheck,
  Activity,
  Mail,
  Phone,
} from "lucide-react";
import {
  AreaChart,

  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

interface Submission {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  date: string;
}

interface Proposal {
  id: string;
  sector: string;
  budget: string;
  startDate: string;
  scope: string;
  date: string;
}

interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  value: number;
  status: "New" | "Contacted" | "Proposal Sent" | "Closed Won" | "Closed Lost";
  date: string;
}

interface LedgerEntry {
  id: string;
  type: "income" | "expense";
  description: string;
  amount: number;
  date: string;
}

interface InvoiceItem {
  description: string;
  quantity: number;
  price: number;
}

interface Invoice {
  id: string;
  clientName: string;
  clientEmail: string;
  date: string;
  items: InvoiceItem[];
  taxRate: number;
  total: number;
}

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage: string;
  date: string;
  published: boolean;
}

export default function DashboardPage() {
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  // --- MOCK DATABASE STATES ---
  const [submissions, setSubmissions] = useState<Submission[]>([
    {
      id: "SUB-101",
      name: "John Doe",
      email: "john.doe@holcim.com",
      subject: "Bypass Clinker Cooler Blockage",
      message: "We are facing localized material blockages on preheater bypass lines. Requesting CFD audit review.",
      date: "2026-07-19 14:22",
    },
    {
      id: "SUB-102",
      name: "Alice Smith",
      email: "alice.smith@cemex.com",
      subject: "Refractory Thermal Stress",
      message: "Burner nozzle adjustments are causing localized hot spots on kiln shell refractories. Need analysis.",
      date: "2026-07-18 10:15",
    },
    {
      id: "SUB-103",
      name: "Bob Miller",
      email: "bob@valero.com",
      subject: "Hydrodynamics FEA Audit",
      message: "Pipe vibration issues on gas lines. Please coordinate FEA structural checks.",
      date: "2026-07-17 16:45",
    },
  ]);

  const [proposals, setProposals] = useState<Proposal[]>([
    {
      id: "RFP-201",
      sector: "Cement Manufacturing",
      budget: "Above $150,000",
      startDate: "2026-10-01",
      scope: "Upgrade burner combustion system to support 85% alternative fuel substitution rates.",
      date: "2026-07-19 15:10",
    },
    {
      id: "RFP-202",
      sector: "Mining & Minerals",
      budget: "$50,000 – $150,000",
      startDate: "2026-11-15",
      scope: "Slurry pipeline drag calculation and thickener classification retrofits.",
      date: "2026-07-18 09:30",
    },
  ]);

  const [leads, setLeads] = useState<Lead[]>([
    {
      id: "LD-501",
      name: "Hiroshi Sato",
      email: "sato@nippon.co.jp",
      phone: "+81 3 5555 0142",
      company: "Nippon Cement",
      value: 85000,
      status: "Proposal Sent",
      date: "2026-07-19",
    },
    {
      id: "LD-502",
      name: "Carlos Vance",
      email: "c.vance@cemex.com",
      phone: "+52 81 8328 1000",
      company: "Cemex Monterrey",
      value: 120000,
      status: "New",
      date: "2026-07-18",
    },
    {
      id: "LD-503",
      name: "Elena Rostova",
      email: "elena.rostova@holcim.com",
      phone: "+41 58 858 8600",
      company: "Holcim EU",
      value: 45000,
      status: "Closed Won",
      date: "2026-07-15",
    },
  ]);

  const [ledger, setLedger] = useState<LedgerEntry[]>([
    { id: "TX-901", type: "income", description: "FEED Phase 1 - Nippon Cement", amount: 42500, date: "2026-07-19" },
    { id: "TX-902", type: "income", description: "Holcim Audit Milestone", amount: 45000, date: "2026-07-18" },
    { id: "TX-903", type: "expense", description: "ANSYS CFD Server Licensing", amount: 12500, date: "2026-07-15" },
    { id: "TX-904", type: "expense", description: "Houston Office Rent", amount: 4500, date: "2026-07-01" },
  ]);

  const [invoices, setInvoices] = useState<Invoice[]>([
    {
      id: "INV-001",
      clientName: "Nippon Cement Corp",
      clientEmail: "sato@nippon.co.jp",
      date: "2026-07-19",
      items: [{ description: "CFD Thermal preheater design checkouts", quantity: 1, price: 42500 }],
      taxRate: 8,
      total: 45900,
    },
  ]);

  // Blogs database array state
  const [blogs, setBlogs] = useState<BlogPost[]>([
    {
      id: "BLG-301",
      title: "Resolving Preheater Build-up",
      slug: "resolving-preheater-buildup",
      excerpt: "How chemical balance modifications reduce material coating in cement kiln bypasses.",
      content: "Material coat auditing, volatile gas extractions, and simulation feedback bypass calculations...",
      coverImage: "/images/hero_plant.png",
      date: "2026-07-19",
      published: true,
    },
    {
      id: "BLG-302",
      title: "Choosing CFD Solver Models",
      slug: "choosing-cfd-solvers",
      excerpt: "A guide to selecting multi-phase Eulerian solvers versus discrete phase tracking models.",
      content: "Computational turbulence indexing, k-epsilon grid alignments, and velocity tolerances...",
      coverImage: "/images/plant_reactor.png",
      date: "2026-07-18",
      published: true,
    },
  ]);

  // --- CREATOR STATE WORKFLOWS ---
  const [newLeadName, setNewLeadName] = useState("");
  const [newLeadCompany, setNewLeadCompany] = useState("");
  const [newLeadValue, setNewLeadValue] = useState("");
  const [newLeadStatus, setNewLeadStatus] = useState<Lead["status"]>("New");

  const [ledgerType, setLedgerType] = useState<"income" | "expense">("income");
  const [ledgerDesc, setLedgerDesc] = useState("");
  const [ledgerAmt, setLedgerAmt] = useState("");

  const [invClient, setInvClient] = useState("");
  const [invEmail, setInvEmail] = useState("");
  const [invDesc, setInvDesc] = useState("");
  const [invQty, setInvQty] = useState("1");
  const [invPrice, setInvPrice] = useState("");
  const [invTaxRate, setInvTaxRate] = useState("8.0");
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);

  // Blog creator state
  const [blogTitle, setBlogTitle] = useState("");
  const [blogSlug, setBlogSlug] = useState("");
  const [blogExcerpt, setBlogExcerpt] = useState("");
  const [blogContent, setBlogContent] = useState("");
  const [blogCoverImage, setBlogCoverImage] = useState("/images/hero_plant.png");
  const [blogPublished, setBlogPublished] = useState(true);

  // File reader for local blog photo upload
  const handleBlogPhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setBlogCoverImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Confirmation Modal
  const [confirmModal, setConfirmModal] = useState<{
    show: boolean;
    title: string;
    message: string;
    action: () => void;
  }>({
    show: false,
    title: "",
    message: "",
    action: () => {},
  });

  // Edit Modal
  const [editModal, setEditModal] = useState<{
    show: boolean;
    type: "submission" | "proposal" | "lead" | "blog";
    id: string;
    field1: string;
    field2: string;
    field3: string;
  }>({
    show: false,
    type: "submission",
    id: "",
    field1: "",
    field2: "",
    field3: "",
  });

  // Auth & Mounted checks
  useEffect(() => {
    setMounted(true);
    const auth = localStorage.getItem("admin_auth");
    if (auth !== "true") {
      router.push("/login");
    } else {
      setAuthorized(true);
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("admin_auth");
    router.push("/login");
  };

  // --- ACTIONS WITH CONFIRMATIONS ---
  const triggerDeleteSubmission = (id: string) => {
    setConfirmModal({
      show: true,
      title: "Confirm Delete Submission",
      message: `Are you sure you want to permanently delete submission ${id}?`,
      action: () => {
        setSubmissions((prev) => prev.filter((item) => item.id !== id));
        setConfirmModal((prev) => ({ ...prev, show: false }));
      },
    });
  };

  const triggerDeleteProposal = (id: string) => {
    setConfirmModal({
      show: true,
      title: "Confirm Archive Proposal",
      message: `Are you sure you want to permanently archive proposal ${id}?`,
      action: () => {
        setProposals((prev) => prev.filter((item) => item.id !== id));
        setConfirmModal((prev) => ({ ...prev, show: false }));
      },
    });
  };

  const triggerDeleteLead = (id: string) => {
    setConfirmModal({
      show: true,
      title: "Confirm Delete Lead",
      message: `Are you sure you want to delete Lead ${id}?`,
      action: () => {
        setLeads((prev) => prev.filter((item) => item.id !== id));
        setConfirmModal((prev) => ({ ...prev, show: false }));
      },
    });
  };

  const triggerDeleteBlog = (id: string) => {
    setConfirmModal({
      show: true,
      title: "Confirm Delete Blog Post",
      message: `Are you sure you want to permanently delete blog post ${id}? This will remove it from the main website.`,
      action: () => {
        setBlogs((prev) => prev.filter((item) => item.id !== id));
        setConfirmModal((prev) => ({ ...prev, show: false }));
      },
    });
  };

  const addLead = (e: React.FormEvent) => {
    e.preventDefault();
    setConfirmModal({
      show: true,
      title: "Confirm Add Lead",
      message: `Are you sure you want to add lead valued at $${newLeadValue}?`,
      action: () => {
        const nextId = `LD-${Math.floor(Math.random() * 900) + 600}`;
        const valNum = parseFloat(newLeadValue) || 0;
        setLeads((prev) => [
          ...prev,
          {
            id: nextId,
            name: newLeadName,
            company: newLeadCompany,
            value: valNum,
            status: newLeadStatus,
            date: new Date().toISOString().split("T")[0],
          },
        ]);
        setNewLeadName("");
        setNewLeadCompany("");
        setNewLeadValue("");
        setConfirmModal((prev) => ({ ...prev, show: false }));
      },
    });
  };

  const addLedgerTx = (e: React.FormEvent) => {
    e.preventDefault();
    setConfirmModal({
      show: true,
      title: "Confirm Add Transaction",
      message: `Confirm adding this ${ledgerType} entry of $${ledgerAmt}?`,
      action: () => {
        const nextId = `TX-${Math.floor(Math.random() * 900) + 910}`;
        const amtNum = parseFloat(ledgerAmt) || 0;
        setLedger((prev) => [
          ...prev,
          {
            id: nextId,
            type: ledgerType,
            description: ledgerDesc,
            amount: amtNum,
            date: new Date().toISOString().split("T")[0],
          },
        ]);
        setLedgerDesc("");
        setLedgerAmt("");
        setConfirmModal((prev) => ({ ...prev, show: false }));
      },
    });
  };

  const createInvoice = (e: React.FormEvent) => {
    e.preventDefault();
    setConfirmModal({
      show: true,
      title: "Confirm Generate Invoice",
      message: `Generate invoice for client ${invClient}?`,
      action: () => {
        const nextId = `INV-00${invoices.length + 1}`;
        const qtyNum = parseInt(invQty) || 1;
        const priceNum = parseFloat(invPrice) || 0;
        const taxRateNum = parseFloat(invTaxRate) || 0;
        const subtotal = qtyNum * priceNum;
        const tax = subtotal * (taxRateNum / 100);
        const grandTotal = subtotal + tax;

        const newInv: Invoice = {
          id: nextId,
          clientName: invClient,
          clientEmail: invEmail,
          date: new Date().toISOString().split("T")[0],
          items: [{ description: invDesc, quantity: qtyNum, price: priceNum }],
          taxRate: taxRateNum,
          total: grandTotal,
        };

        setInvoices((prev) => [...prev, newInv]);
        setInvClient("");
        setInvEmail("");
        setInvDesc("");
        setInvPrice("");
        setSelectedInvoice(newInv);
        setConfirmModal((prev) => ({ ...prev, show: false }));
      },
    });
  };

  const publishBlogPost = (e: React.FormEvent) => {
    e.preventDefault();
    setConfirmModal({
      show: true,
      title: "Confirm Publish Blog Post",
      message: `Are you sure you want to publish the blog post "${blogTitle}"? It will become visible on the main resources archive page.`,
      action: () => {
        const nextId = `BLG-${Math.floor(Math.random() * 900) + 310}`;
        setBlogs((prev) => [
          ...prev,
          {
            id: nextId,
            title: blogTitle,
            slug: blogSlug,
            excerpt: blogExcerpt,
            content: blogContent,
            coverImage: blogCoverImage,
            date: new Date().toISOString().split("T")[0],
            published: blogPublished,
          },
        ]);
        setBlogTitle("");
        setBlogSlug("");
        setBlogExcerpt("");
        setBlogContent("");
        setConfirmModal((prev) => ({ ...prev, show: false }));
      },
    });
  };

  // Open Edit Modals
  const openEditSubmission = (item: Submission) => {
    setEditModal({
      show: true,
      type: "submission",
      id: item.id,
      field1: item.name,
      field2: item.subject,
      field3: item.message,
    });
  };

  const openEditProposal = (item: Proposal) => {
    setEditModal({
      show: true,
      type: "proposal",
      id: item.id,
      field1: item.sector,
      field2: item.budget,
      field3: item.scope,
    });
  };

  const openEditLead = (item: Lead) => {
    setEditModal({
      show: true,
      type: "lead",
      id: item.id,
      field1: item.name,
      field2: item.company,
      field3: item.status,
    });
  };

  const openEditBlog = (item: BlogPost) => {
    setEditModal({
      show: true,
      type: "blog",
      id: item.id,
      field1: item.title,
      field2: item.slug,
      field3: item.excerpt,
    });
  };

  const saveEditChanges = (e: React.FormEvent) => {
    e.preventDefault();
    setConfirmModal({
      show: true,
      title: "Confirm Save Changes",
      message: "Are you sure you want to save these modifications?",
      action: () => {
        if (editModal.type === "submission") {
          setSubmissions((prev) =>
            prev.map((item) =>
              item.id === editModal.id
                ? { ...item, name: editModal.field1, subject: editModal.field2, message: editModal.field3 }
                : item
            )
          );
        } else if (editModal.type === "proposal") {
          setProposals((prev) =>
            prev.map((item) =>
              item.id === editModal.id
                ? { ...item, sector: editModal.field1, budget: editModal.field2, scope: editModal.field3 }
                : item
            )
          );
        } else if (editModal.type === "lead") {
          setLeads((prev) =>
            prev.map((item) =>
              item.id === editModal.id
                ? { ...item, name: editModal.field1, company: editModal.field2, status: editModal.field3 as Lead["status"] }
                : item
            )
          );
        } else {
          setBlogs((prev) =>
            prev.map((item) =>
              item.id === editModal.id
                ? { ...item, title: editModal.field1, slug: editModal.field2, excerpt: editModal.field3 }
                : item
            )
          );
        }
        setEditModal((prev) => ({ ...prev, show: false }));
        setConfirmModal((prev) => ({ ...prev, show: false }));
      },
    });
  };

  // --- CALCULATE VALUES ---
  const totalRevenue = ledger
    .filter((tx) => tx.type === "income")
    .reduce((sum, tx) => sum + tx.amount, 0);

  const totalExpense = ledger
    .filter((tx) => tx.type === "expense")
    .reduce((sum, tx) => sum + tx.amount, 0);

  const netProfit = totalRevenue - totalExpense;

  // Recharts ledger details area chart mock data
  const revenueHistory = [
    { name: "Jan", revenue: 20000, expenses: 11000 },
    { name: "Feb", revenue: 25000, expenses: 12000 },
    { name: "Mar", revenue: 35000, expenses: 15000 },
    { name: "Apr", revenue: 30000, expenses: 14000 },
    { name: "May", revenue: 45000, expenses: 18000 },
    { name: "Jun", revenue: 50000, expenses: 22000 },
    { name: "Jul", revenue: totalRevenue, expenses: totalExpense },
  ];

  // Recharts leads pie chart dynamic formatting
  const pieData = [
    { name: "New Leads", value: leads.filter((l) => l.status === "New").length },
    { name: "Contacted", value: leads.filter((l) => l.status === "Contacted").length },
    { name: "Proposal Sent", value: leads.filter((l) => l.status === "Proposal Sent").length },
    { name: "Closed Won", value: leads.filter((l) => l.status === "Closed Won").length },
  ].filter((d) => d.value > 0);

  const COLORS = ["#3b82f6", "#eab308", "#f97316", "#10b981"];

  if (!authorized) {
    return (
      <div className="bg-background min-h-screen flex items-center justify-center font-mono text-xs text-secondary">
        Verifying authorization credentials...
      </div>
    );
  }

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
              <span className="font-sans font-extrabold text-xs tracking-wider uppercase text-white block leading-tight">MACPROTEC</span>
              <span className="font-mono text-[9px] text-slate-400 block leading-tight">CENTRAL DB</span>
            </div>
          </div>
          <button
            onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
            className="p-2 bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:bg-slate-800 transition-colors rounded"
            aria-label="Toggle Menu"
          >
            {mobileSidebarOpen ? <X className="w-5 h-5 text-rose-500" /> : <Menu className="w-5 h-5 text-slate-300" />}
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
                    <span className="font-sans font-extrabold text-sm text-white tracking-wide uppercase">MACPROTEC</span>
                    <span className="font-mono text-[9px] font-bold text-rose-500 bg-rose-500/10 px-1 py-0.5 rounded border border-rose-500/20">DB</span>
                  </div>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="font-mono text-[9px] text-slate-400 tracking-wider uppercase">System Online</span>
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
                  <button
                    onClick={() => { setActiveTab("overview"); setMobileSidebarOpen(false); }}
                    className={`w-full flex items-center justify-between px-3 py-2.5 text-xs font-mono rounded transition-all duration-150 group ${
                      activeTab === "overview"
                        ? "bg-rose-500/10 text-white font-bold border-l-2 border-primary"
                        : "text-slate-400 hover:bg-slate-900 hover:text-slate-200"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <LayoutDashboard className={`w-4 h-4 transition-colors ${activeTab === "overview" ? "text-primary" : "text-slate-400 group-hover:text-slate-200"}`} />
                      <span>Dashboard Overview</span>
                    </div>
                    {activeTab === "overview" && <ChevronRight className="w-3.5 h-3.5 text-primary shrink-0" />}
                  </button>

                  <button
                    onClick={() => { setActiveTab("submissions"); setMobileSidebarOpen(false); }}
                    className={`w-full flex items-center justify-between px-3 py-2.5 text-xs font-mono rounded transition-all duration-150 group ${
                      activeTab === "submissions"
                        ? "bg-rose-500/10 text-white font-bold border-l-2 border-primary"
                        : "text-slate-400 hover:bg-slate-900 hover:text-slate-200"
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <Inbox className={`w-4 h-4 shrink-0 transition-colors ${activeTab === "submissions" ? "text-primary" : "text-slate-400 group-hover:text-slate-200"}`} />
                      <span className="truncate">Submissions</span>
                    </div>
                    <span className={`font-mono text-[9px] px-1.5 py-0.5 rounded border transition-colors ${
                      activeTab === "submissions"
                        ? "bg-primary text-white border-primary"
                        : "bg-slate-900 text-slate-400 border-slate-800 group-hover:border-slate-700"
                    }`}>
                      {submissions.length}
                    </span>
                  </button>

                  <button
                    onClick={() => { setActiveTab("proposals"); setMobileSidebarOpen(false); }}
                    className={`w-full flex items-center justify-between px-3 py-2.5 text-xs font-mono rounded transition-all duration-150 group ${
                      activeTab === "proposals"
                        ? "bg-rose-500/10 text-white font-bold border-l-2 border-primary"
                        : "text-slate-400 hover:bg-slate-900 hover:text-slate-200"
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <FileText className={`w-4 h-4 shrink-0 transition-colors ${activeTab === "proposals" ? "text-primary" : "text-slate-400 group-hover:text-slate-200"}`} />
                      <span className="truncate">RFP Proposals</span>
                    </div>
                    <span className={`font-mono text-[9px] px-1.5 py-0.5 rounded border transition-colors ${
                      activeTab === "proposals"
                        ? "bg-primary text-white border-primary"
                        : "bg-slate-900 text-slate-400 border-slate-800 group-hover:border-slate-700"
                    }`}>
                      {proposals.length}
                    </span>
                  </button>

                  <button
                    onClick={() => { setActiveTab("leads"); setMobileSidebarOpen(false); }}
                    className={`w-full flex items-center justify-between px-3 py-2.5 text-xs font-mono rounded transition-all duration-150 group ${
                      activeTab === "leads"
                        ? "bg-rose-500/10 text-white font-bold border-l-2 border-primary"
                        : "text-slate-400 hover:bg-slate-900 hover:text-slate-200"
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <Users className={`w-4 h-4 shrink-0 transition-colors ${activeTab === "leads" ? "text-primary" : "text-slate-400 group-hover:text-slate-200"}`} />
                      <span className="truncate">Leads Pipeline</span>
                    </div>
                    <span className={`font-mono text-[9px] px-1.5 py-0.5 rounded border transition-colors ${
                      activeTab === "leads"
                        ? "bg-primary text-white border-primary"
                        : "bg-slate-900 text-slate-400 border-slate-800 group-hover:border-slate-700"
                    }`}>
                      {leads.length}
                    </span>
                  </button>
                </nav>
              </div>

              <div>
                <div className="font-mono text-[9px] font-bold text-slate-400 uppercase tracking-widest px-3 mb-2">
                  Management & Tools
                </div>
                <nav className="space-y-1">
                  <button
                    onClick={() => { setActiveTab("finance-ledger"); setMobileSidebarOpen(false); }}
                    className={`w-full flex items-center justify-between px-3 py-2.5 text-xs font-mono rounded transition-all duration-150 group ${
                      activeTab === "finance-ledger"
                        ? "bg-rose-500/10 text-white font-bold border-l-2 border-primary"
                        : "text-slate-400 hover:bg-slate-900 hover:text-slate-200"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Wallet className={`w-4 h-4 transition-colors ${activeTab === "finance-ledger" ? "text-primary" : "text-slate-400 group-hover:text-slate-200"}`} />
                      <span>Finance Ledger</span>
                    </div>
                    {activeTab === "finance-ledger" && <ChevronRight className="w-3.5 h-3.5 text-primary shrink-0" />}
                  </button>

                  <button
                    onClick={() => { setActiveTab("invoice-creator"); setMobileSidebarOpen(false); }}
                    className={`w-full flex items-center justify-between px-3 py-2.5 text-xs font-mono rounded transition-all duration-150 group ${
                      activeTab === "invoice-creator"
                        ? "bg-rose-500/10 text-white font-bold border-l-2 border-primary"
                        : "text-slate-400 hover:bg-slate-900 hover:text-slate-200"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Receipt className={`w-4 h-4 transition-colors ${activeTab === "invoice-creator" ? "text-primary" : "text-slate-400 group-hover:text-slate-200"}`} />
                      <span>Invoice Creator</span>
                    </div>
                    {activeTab === "invoice-creator" && <ChevronRight className="w-3.5 h-3.5 text-primary shrink-0" />}
                  </button>

                  <button
                    onClick={() => { setActiveTab("blog-manager"); setMobileSidebarOpen(false); }}
                    className={`w-full flex items-center justify-between px-3 py-2.5 text-xs font-mono rounded transition-all duration-150 group ${
                      activeTab === "blog-manager"
                        ? "bg-rose-500/10 text-white font-bold border-l-2 border-primary"
                        : "text-slate-400 hover:bg-slate-900 hover:text-slate-200"
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <BookOpen className={`w-4 h-4 shrink-0 transition-colors ${activeTab === "blog-manager" ? "text-primary" : "text-slate-400 group-hover:text-slate-200"}`} />
                      <span className="truncate">Blog Manager</span>
                    </div>
                    <span className={`font-mono text-[9px] px-1.5 py-0.5 rounded border transition-colors ${
                      activeTab === "blog-manager"
                        ? "bg-primary text-white border-primary"
                        : "bg-slate-900 text-slate-400 border-slate-800 group-hover:border-slate-700"
                    }`}>
                      {blogs.length}
                    </span>
                  </button>
                </nav>
              </div>
            </div>
          </div>

          <div className="pt-6 mt-6 border-t border-slate-800/80">
            <button
              onClick={handleLogout}
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded bg-slate-900 hover:bg-rose-500/10 text-slate-300 hover:text-rose-400 border border-slate-800 hover:border-rose-500/30 transition-all duration-150 font-mono text-[11px] uppercase font-bold tracking-wider group"
            >
              <LogOut className="w-4 h-4 group-hover:text-rose-400 transition-colors" />
              <span>Sign Out</span>
            </button>
            <div className="font-mono text-[8px] text-slate-400 text-center uppercase tracking-widest mt-3">
              MACPROTEC DB v2.4 • HOUSTON, TX
            </div>
          </div>
        </aside>

        {mobileSidebarOpen && (
          <div onClick={() => setMobileSidebarOpen(false)} className="fixed inset-0 bg-black/40 z-30 lg:hidden" />
        )}

        {/* Workspace content container */}
        <div className="flex-1 p-6 lg:p-10 flex flex-col justify-between overflow-y-auto">
          <div className="max-w-5xl w-full mx-auto">
            
            <div className="flex justify-between items-center mb-8 pb-4 border-b border-slate-200">
              <div>
                <h1 className="text-xl lg:text-2xl font-display font-extrabold uppercase text-slate-900">
                  {activeTab === "overview" && "Console Overview"}
                  {activeTab === "submissions" && "Submissions Records"}
                  {activeTab === "proposals" && "RFP Proposals Ledger"}
                  {activeTab === "leads" && "Sales & Leads pipeline"}
                  {activeTab === "finance-ledger" && "Business Finance Ledger"}
                  {activeTab === "invoice-creator" && "Invoice Receipt Creator"}
                  {activeTab === "blog-manager" && "Blog Manager & Publisher"}
                </h1>
                <p className="text-[10px] text-slate-500 mt-1 font-mono">
                  ROLE: ADMINISTRATOR // CENTRAL DB
                </p>
              </div>
            </div>

            <Reveal>

              {/* 1. OVERVIEW VIEW */}
              {activeTab === "overview" && (
                <div className="space-y-6">
                  {/* Overview Widgets */}
                  <div className="grid sm:grid-cols-4 gap-4">
                    <div className="bg-white border border-slate-200 p-6 shadow-sm">
                      <span className="font-mono text-[9px] text-slate-400">MET-01 / REVENUE</span>
                      <h3 className="font-display font-bold text-xs uppercase text-slate-500 mt-1">Total Revenue</h3>
                      <p className="text-2xl font-display font-extrabold text-slate-900 mt-2">
                        ${totalRevenue.toLocaleString()}
                      </p>
                    </div>
                    
                    <div className="bg-white border border-slate-200 p-6 shadow-sm">
                      <span className="font-mono text-[9px] text-slate-400">MET-02 / PIPELINE</span>
                      <h3 className="font-display font-bold text-xs uppercase text-slate-500 mt-1">Active Pipeline</h3>
                      <p className="text-2xl font-display font-extrabold text-slate-900 mt-2">
                        ${leads.reduce((sum, item) => sum + item.value, 0).toLocaleString()}
                      </p>
                    </div>

                    <div className="bg-white border border-slate-200 p-6 shadow-sm">
                      <span className="font-mono text-[9px] text-slate-400">MET-03 / EXPENSE</span>
                      <h3 className="font-display font-bold text-xs uppercase text-slate-500 mt-1">Total Expenses</h3>
                      <p className="text-2xl font-display font-extrabold text-rose-600 mt-2">
                        ${totalExpense.toLocaleString()}
                      </p>
                    </div>

                    {/* NEW OPTIONS: Server status tracker */}
                    <div className="bg-white border border-slate-200 p-6 shadow-sm">
                      <span className="font-mono text-[9px] text-slate-400">MET-04 / STATUS</span>
                      <h3 className="font-display font-bold text-xs uppercase text-slate-500 mt-1">API HEALTH</h3>
                      <p className="text-xs font-mono font-bold text-emerald-600 mt-3 flex items-center gap-1">
                        ● CONNECTED (24ms)
                      </p>
                    </div>
                  </div>

                  {/* RECHARTS DATA CHART GRAPHS */}
                  {mounted && (
                    <div className="grid md:grid-cols-3 gap-6">
                      
                      {/* Financial trend area chart */}
                      <div className="bg-white border border-slate-200 p-6 shadow-sm md:col-span-2">
                        <h3 className="font-display font-extrabold text-xs uppercase text-slate-900 mb-4 border-b border-slate-100 pb-2">
                          Financial Performance Trend
                        </h3>
                        <div className="w-full h-64">
                          <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={revenueHistory}>
                              <defs>
                                <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                                  <stop offset="5%" stopColor="#e11d48" stopOpacity={0.2}/>
                                  <stop offset="95%" stopColor="#e11d48" stopOpacity={0}/>
                                </linearGradient>
                              </defs>
                              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                              <XAxis dataKey="name" stroke="#94a3b8" fontSize={9} />
                              <YAxis stroke="#94a3b8" fontSize={9} />
                              <Tooltip contentStyle={{ background: "#1e293b", color: "#f8fafc", fontSize: 10 }} />
                              <Area type="monotone" dataKey="revenue" stroke="#e11d48" fillOpacity={1} fill="url(#colorRev)" />
                            </AreaChart>
                          </ResponsiveContainer>
                        </div>
                      </div>

                      {/* Leads Pipeline Pie Chart */}
                      <div className="bg-white border border-slate-200 p-6 shadow-sm md:col-span-1">
                        <h3 className="font-display font-extrabold text-xs uppercase text-slate-900 mb-4 border-b border-slate-100 pb-2">
                          Leads Stage Mix
                        </h3>
                        <div className="w-full h-64 flex flex-col justify-between">
                          <div className="h-44">
                            <ResponsiveContainer width="100%" height="100%">
                              <PieChart>
                                <Pie
                                  data={pieData}
                                  cx="50%"
                                  cy="50%"
                                  innerRadius={40}
                                  outerRadius={60}
                                  paddingAngle={3}
                                  dataKey="value"
                                >
                                  {pieData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                  ))}
                                </Pie>
                                <Tooltip contentStyle={{ fontSize: 9 }} />
                              </PieChart>
                            </ResponsiveContainer>
                          </div>
                          
                          {/* Legend list */}
                          <div className="space-y-1 font-mono text-[9px] text-slate-500 uppercase border-t border-slate-50 pt-2">
                            {pieData.map((d, i) => (
                              <div key={d.name} className="flex justify-between items-center">
                                <span className="flex items-center gap-1.5">
                                  <span className="w-2 h-2 inline-block" style={{ backgroundColor: COLORS[i % COLORS.length] }} />
                                  {d.name}
                                </span>
                                <span>{d.value}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                    </div>
                  )}

                  {/* Extra Overview Options Cards */}
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div className="bg-white border border-slate-200 p-6 shadow-sm">
                      <h4 className="font-display font-extrabold text-xs uppercase text-slate-900 mb-3">Recent proposals checks</h4>
                      <p className="text-xs text-slate-500 leading-relaxed font-sans mb-4">
                        Ensure all alternative fuel calculations match calculated Calciner residency timings.
                      </p>
                      <button onClick={() => setActiveTab("proposals")} className="font-mono text-[9px] text-primary font-bold uppercase hover:text-rose-700">
                        View RFPs ({proposals.length}) →
                      </button>
                    </div>

                    <div className="bg-white border border-slate-200 p-6 shadow-sm">
                      <h4 className="font-display font-extrabold text-xs uppercase text-slate-900 mb-3">Published logs count</h4>
                      <p className="text-xs text-slate-500 leading-relaxed font-sans mb-4">
                        Articles, white papers, and guides are currently active on the resources route.
                      </p>
                      <button onClick={() => setActiveTab("blog-manager")} className="font-mono text-[9px] text-primary font-bold uppercase hover:text-rose-700">
                        Manage Blogs ({blogs.length}) →
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* 2. SUBMISSIONS TAB */}
              {activeTab === "submissions" && (
                <div className="bg-white border border-slate-200 shadow-sm overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse min-w-[700px]">
                      <thead>
                        <tr className="bg-slate-100 text-slate-600 font-mono text-[9px] uppercase border-b border-slate-200">
                          <th className="p-4">ID</th>
                          <th className="p-4">Sender Details</th>
                          <th className="p-4">Subject & Message</th>
                          <th className="p-4">Date</th>
                          <th className="p-4 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 font-sans text-xs text-slate-600">
                        {submissions.map((item) => (
                          <tr key={item.id} className="hover:bg-slate-50/50 transition-colors">
                            <td className="p-4 font-mono font-bold text-primary">{item.id}</td>
                            <td className="p-4">
                              <div className="font-bold text-slate-900">{item.name}</div>
                              <div className="text-[10px] text-slate-400 font-mono">{item.email}</div>
                            </td>
                            <td className="p-4 max-w-sm">
                              <div className="font-bold text-slate-900 uppercase text-[10px]">{item.subject}</div>
                              <div className="text-slate-500 truncate mt-1">{item.message}</div>
                            </td>
                            <td className="p-4 font-mono text-[10px] text-slate-400">{item.date}</td>
                            <td className="p-4 text-right space-x-2 whitespace-nowrap">
                              <button
                                onClick={() => openEditSubmission(item)}
                                className="px-3 py-1.5 bg-slate-100 border border-slate-200 hover:bg-slate-200 hover:border-slate-300 font-mono text-[9px] uppercase font-bold text-slate-700 transition-colors"
                              >
                                Edit
                              </button>
                              <button
                                onClick={() => triggerDeleteSubmission(item.id)}
                                className="px-3 py-1.5 bg-rose-50 border border-rose-100 hover:bg-rose-100 hover:border-rose-200 font-mono text-[9px] uppercase font-bold text-rose-600 transition-colors"
                              >
                                Delete
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* 3. PROPOSALS TAB */}
              {activeTab === "proposals" && (
                <div className="bg-white border border-slate-200 shadow-sm overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse min-w-[700px]">
                      <thead>
                        <tr className="bg-slate-100 text-slate-600 font-mono text-[9px] uppercase border-b border-slate-200">
                          <th className="p-4">ID</th>
                          <th className="p-4">Project Parameters</th>
                          <th className="p-4">Scope Description</th>
                          <th className="p-4">Date</th>
                          <th className="p-4 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 font-sans text-xs text-slate-600">
                        {proposals.map((item) => (
                          <tr key={item.id} className="hover:bg-slate-50/50 transition-colors">
                            <td className="p-4 font-mono font-bold text-primary">{item.id}</td>
                            <td className="p-4">
                              <div className="font-bold text-slate-900">{item.sector}</div>
                              <div className="text-[10px] text-slate-400 font-mono">BUDGET: {item.budget}</div>
                              <div className="text-[10px] text-emerald-600 font-mono font-semibold">START: {item.startDate}</div>
                            </td>
                            <td className="p-4 max-w-sm">
                              <div className="text-slate-500 truncate">{item.scope}</div>
                            </td>
                            <td className="p-4 font-mono text-[10px] text-slate-400">{item.date}</td>
                            <td className="p-4 text-right space-x-2 whitespace-nowrap">
                              <button
                                onClick={() => openEditProposal(item)}
                                className="px-3 py-1.5 bg-slate-100 border border-slate-200 hover:bg-slate-200 hover:border-slate-300 font-mono text-[9px] uppercase font-bold text-slate-700 transition-colors"
                              >
                                Edit
                              </button>
                              <button
                                onClick={() => triggerDeleteProposal(item.id)}
                                className="px-3 py-1.5 bg-rose-50 border border-rose-100 hover:bg-rose-100 hover:border-rose-200 font-mono text-[9px] uppercase font-bold text-rose-600 transition-colors"
                              >
                                Archive
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* 4. LEADS PIPELINE TAB */}
              {activeTab === "leads" && (
                <div className="space-y-6">
                  {/* Lead Creator Form Card */}
                  <div className="bg-white border border-slate-200 p-6 shadow-sm">
                    <h3 className="font-display font-extrabold text-sm uppercase text-slate-900 mb-4">Add New Sales Lead</h3>
                    <form onSubmit={addLead} className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
                      <div>
                        <label className="block font-mono text-[9px] text-slate-400 uppercase mb-1">Contact Name</label>
                        <input
                          type="text"
                          required
                          value={newLeadName}
                          onChange={(e) => setNewLeadName(e.target.value)}
                          placeholder="Lead Name"
                          className="w-full px-3 py-2 border border-slate-200 text-xs font-sans rounded-none focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block font-mono text-[9px] text-slate-400 uppercase mb-1">Company</label>
                        <input
                          type="text"
                          required
                          value={newLeadCompany}
                          onChange={(e) => setNewLeadCompany(e.target.value)}
                          placeholder="Company name"
                          className="w-full px-3 py-2 border border-slate-200 text-xs font-sans rounded-none focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block font-mono text-[9px] text-slate-400 uppercase mb-1">Deal Value ($)</label>
                        <input
                          type="number"
                          required
                          value={newLeadValue}
                          onChange={(e) => setNewLeadValue(e.target.value)}
                          placeholder="e.g. 50000"
                          className="w-full px-3 py-2 border border-slate-200 text-xs font-sans rounded-none focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block font-mono text-[9px] text-slate-400 uppercase mb-1">Status</label>
                        <select
                          value={newLeadStatus}
                          onChange={(e) => setNewLeadStatus(e.target.value as Lead["status"])}
                          className="w-full px-3 py-2 border border-slate-200 text-xs font-sans rounded-none bg-white focus:outline-none"
                        >
                          <option value="New">New</option>
                          <option value="Contacted">Contacted</option>
                          <option value="Proposal Sent">Proposal Sent</option>
                          <option value="Closed Won">Closed Won</option>
                          <option value="Closed Lost">Closed Lost</option>
                        </select>
                      </div>
                      <div className="sm:col-span-2 md:col-span-4 flex justify-end mt-2">
                        <button type="submit" className="button-primary px-6 py-2.5 text-xs uppercase">
                          Create Lead
                        </button>
                      </div>
                    </form>
                  </div>

                  {/* Leads Data Table */}
                  <div className="bg-white border border-slate-200 shadow-sm overflow-hidden">
                    <div className="overflow-x-auto">
                      <table className="w-full text-left border-collapse min-w-[700px]">
                        <thead>
                          <tr className="bg-slate-100 text-slate-600 font-mono text-[9px] uppercase border-b border-slate-200">
                            <th className="p-4">Lead ID</th>
                            <th className="p-4">Client Detail</th>
                            <th className="p-4">Deal Value ($)</th>
                            <th className="p-4">Sales Stage</th>
                            <th className="p-4">Date Added</th>
                            <th className="p-4 text-right">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 font-sans text-xs text-slate-600">
                          {leads.map((item) => (
                            <tr key={item.id} className="hover:bg-slate-50/50 transition-colors">
                              <td className="p-4 font-mono font-bold text-primary">{item.id}</td>
                              <td className="p-4">
                                <div className="font-bold text-slate-900">{item.name}</div>
                                <div className="text-[10px] text-slate-400 font-mono">{item.company}</div>
                              </td>
                              <td className="p-4 font-mono font-semibold text-slate-900">
                                ${item.value.toLocaleString()}
                              </td>
                              <td className="p-4">
                                <span className={`px-2 py-1 text-[9px] font-mono font-bold uppercase ${
                                  item.status === "Closed Won" ? "bg-emerald-50 text-emerald-700 border border-emerald-100" :
                                  item.status === "Closed Lost" ? "bg-rose-50 text-rose-700 border border-rose-100" :
                                  item.status === "Proposal Sent" ? "bg-amber-50 text-amber-700 border border-amber-100" :
                                  "bg-blue-50 text-blue-700 border border-blue-100"
                                }`}>
                                  {item.status}
                                </span>
                              </td>
                              <td className="p-4 font-mono text-[10px] text-slate-400">{item.date}</td>
                              <td className="p-4 text-right space-x-2 whitespace-nowrap">
                                <button
                                  onClick={() => openEditLead(item)}
                                  className="px-3 py-1.5 bg-slate-100 border border-slate-200 hover:bg-slate-200 hover:border-slate-300 font-mono text-[9px] uppercase font-bold text-slate-700 transition-colors"
                                >
                                  Edit
                                </button>
                                <button
                                  onClick={() => triggerDeleteLead(item.id)}
                                  className="px-3 py-1.5 bg-rose-50 border border-rose-100 hover:bg-rose-100 hover:border-rose-200 font-mono text-[9px] uppercase font-bold text-rose-600 transition-colors"
                                >
                                  Remove
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}

              {/* 5. FINANCE LEDGER VIEW */}
              {activeTab === "finance-ledger" && (
                <div className="space-y-6">
                  <div className="grid md:grid-cols-3 gap-6">
                    
                    {/* Add Tx Form */}
                    <div className="bg-white border border-slate-200 p-6 shadow-sm md:col-span-1">
                      <h3 className="font-display font-extrabold text-xs uppercase text-slate-900 mb-4 border-b border-slate-100 pb-2">Record Transaction</h3>
                      <form onSubmit={addLedgerTx} className="space-y-4">
                        <div>
                          <label className="block font-mono text-[9px] text-slate-400 uppercase mb-1">Tx Type</label>
                          <select
                            value={ledgerType}
                            onChange={(e) => setLedgerType(e.target.value as "income" | "expense")}
                            className="w-full px-3 py-2 border border-slate-200 text-xs font-sans rounded-none bg-white focus:outline-none"
                          >
                            <option value="income">Income / Gain</option>
                            <option value="expense">Expense / Cost</option>
                          </select>
                        </div>
                        <div>
                          <label className="block font-mono text-[9px] text-slate-400 uppercase mb-1">Description</label>
                          <input
                            type="text"
                            required
                            value={ledgerDesc}
                            onChange={(e) => setLedgerDesc(e.target.value)}
                            placeholder="e.g. Office supplies"
                            className="w-full px-3 py-2 border border-slate-200 text-xs font-sans rounded-none focus:outline-none"
                          />
                        </div>
                        <div>
                          <label className="block font-mono text-[9px] text-slate-400 uppercase mb-1">Amount ($)</label>
                          <input
                            type="number"
                            required
                            value={ledgerAmt}
                            onChange={(e) => setLedgerAmt(e.target.value)}
                            placeholder="e.g. 1500"
                            className="w-full px-3 py-2 border border-slate-200 text-xs font-sans rounded-none focus:outline-none"
                          />
                        </div>
                        <button type="submit" className="w-full button-primary py-2.5 text-xs uppercase">
                          Record Entry
                        </button>
                      </form>
                    </div>

                    {/* Tx List */}
                    <div className="bg-white border border-slate-200 shadow-sm md:col-span-2 overflow-hidden flex flex-col justify-between">
                      <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                          <thead>
                            <tr className="bg-slate-100 text-slate-600 font-mono text-[9px] uppercase border-b border-slate-200">
                              <th className="p-3">ID</th>
                              <th className="p-3">Description</th>
                              <th className="p-3">Type</th>
                              <th className="p-3">Amount</th>
                              <th className="p-3">Date</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-100 font-sans text-xs text-slate-600">
                            {ledger.map((item) => (
                              <tr key={item.id}>
                                <td className="p-3 font-mono font-bold text-slate-400">{item.id}</td>
                                <td className="p-3 font-bold text-slate-900">{item.description}</td>
                                <td className="p-3 uppercase">
                                  <span className={`px-1.5 py-0.5 text-[8px] font-mono font-bold ${
                                    item.type === "income" ? "text-emerald-700 bg-emerald-50" : "text-rose-700 bg-rose-50"
                                  }`}>
                                    {item.type}
                                  </span>
                                </td>
                                <td className={`p-3 font-mono font-semibold ${item.type === "income" ? "text-emerald-600" : "text-rose-600"}`}>
                                  {item.type === "income" ? "+" : "-"}${item.amount.toLocaleString()}
                                </td>
                                <td className="p-3 font-mono text-[9px] text-slate-400">{item.date}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                      
                      <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-between font-mono text-[10px] text-slate-600">
                        <span className="font-bold text-emerald-600">INCOME: +${totalRevenue.toLocaleString()}</span>
                        <span className="font-bold text-rose-600">EXPENSE: -${totalExpense.toLocaleString()}</span>
                        <span className="font-bold text-slate-900 border-l border-slate-200 pl-4">NET: ${netProfit.toLocaleString()}</span>
                      </div>
                    </div>

                  </div>
                </div>
              )}

              {/* 6. INVOICE CREATOR VIEW */}
              {activeTab === "invoice-creator" && (
                <div className="space-y-6">
                  {/* Invoice Creator Form */}
                  <div className="bg-white border border-slate-200 p-6 shadow-sm">
                    <h3 className="font-display font-extrabold text-sm uppercase text-slate-900 mb-6 border-b border-slate-100 pb-3">
                      Generate New Invoice Receipt
                    </h3>
                    
                    <form onSubmit={createInvoice} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                      <div>
                        <label className="block font-mono text-[9px] text-slate-400 uppercase mb-1">Client Name</label>
                        <input
                          type="text"
                          required
                          value={invClient}
                          onChange={(e) => setInvClient(e.target.value)}
                          placeholder="e.g. Cemex Monterrey"
                          className="w-full px-3 py-2 border border-slate-200 text-xs font-sans rounded-none focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block font-mono text-[9px] text-slate-400 uppercase mb-1">Client Email</label>
                        <input
                          type="email"
                          required
                          value={invEmail}
                          onChange={(e) => setInvEmail(e.target.value)}
                          placeholder="billing@cemex.com"
                          className="w-full px-3 py-2 border border-slate-200 text-xs font-sans rounded-none focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block font-mono text-[9px] text-slate-400 uppercase mb-1">Item Description</label>
                        <input
                          type="text"
                          required
                          value={invDesc}
                          onChange={(e) => setInvDesc(e.target.value)}
                          placeholder="Piping design validation fee"
                          className="w-full px-3 py-2 border border-slate-200 text-xs font-sans rounded-none focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block font-mono text-[9px] text-slate-400 uppercase mb-1">Quantity</label>
                        <input
                          type="number"
                          required
                          value={invQty}
                          onChange={(e) => setInvQty(e.target.value)}
                          className="w-full px-3 py-2 border border-slate-200 text-xs font-sans rounded-none focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block font-mono text-[9px] text-slate-400 uppercase mb-1">Item Price ($)</label>
                        <input
                          type="number"
                          required
                          value={invPrice}
                          onChange={(e) => setInvPrice(e.target.value)}
                          placeholder="e.g. 45000"
                          className="w-full px-3 py-2 border border-slate-200 text-xs font-sans rounded-none focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block font-mono text-[9px] text-slate-400 uppercase mb-1">Tax Rate (%)</label>
                        <input
                          type="text"
                          required
                          value={invTaxRate}
                          onChange={(e) => setInvTaxRate(e.target.value)}
                          className="w-full px-3 py-2 border border-slate-200 text-xs font-sans rounded-none focus:outline-none"
                        />
                      </div>
                      
                      <div className="sm:col-span-2 lg:col-span-3 flex justify-end mt-4">
                        <button type="submit" className="button-primary px-8 py-3 text-xs uppercase font-bold">
                          Create & Print Invoice
                        </button>
                      </div>
                    </form>
                  </div>

                  {/* Generated Invoices */}
                  <div className="bg-white border border-slate-200 shadow-sm p-6">
                    <h3 className="font-display font-extrabold text-sm uppercase text-slate-900 mb-4 border-b border-slate-100 pb-3">Generated Invoices Log</h3>
                    <div className="space-y-2">
                      {invoices.map((inv) => (
                        <div key={inv.id} className="flex justify-between items-center border border-slate-200 p-4 hover:bg-slate-50 transition-colors">
                          <div className="font-mono text-xs text-slate-600">
                            <span className="font-bold text-primary">{inv.id}</span> · {inv.clientName} (${inv.total.toLocaleString()})
                          </div>
                          <button
                            onClick={() => setSelectedInvoice(inv)}
                            className="px-3 py-1 bg-slate-100 hover:bg-slate-200 border border-slate-200 font-mono text-[9px] uppercase font-bold"
                          >
                            [Print View]
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* 7. NEW BLOG MANAGER TAB */}
              {activeTab === "blog-manager" && (
                <div className="space-y-6">
                  {/* Blog Publisher Form */}
                  <div className="bg-white border border-slate-200 p-6 shadow-sm">
                    <h3 className="font-display font-extrabold text-sm uppercase text-slate-900 mb-4 border-b border-slate-100 pb-2">Publish New Blog Post</h3>
                    <form onSubmit={publishBlogPost} className="space-y-4">
                      <div className="grid sm:grid-cols-3 gap-4">
                        <div>
                          <label className="block font-mono text-[9px] text-slate-400 uppercase mb-1">Article Title</label>
                          <input
                            type="text"
                            required
                            value={blogTitle}
                            onChange={(e) => setBlogTitle(e.target.value)}
                            placeholder="e.g. Resolving Preheater Build-up"
                            className="w-full px-3 py-2 border border-slate-200 text-xs font-sans rounded-none focus:outline-none"
                          />
                        </div>
                        <div>
                          <label className="block font-mono text-[9px] text-slate-400 uppercase mb-1">URL Slug</label>
                          <input
                            type="text"
                            required
                            value={blogSlug}
                            onChange={(e) => setBlogSlug(e.target.value)}
                            placeholder="e.g. resolving-preheater-buildup"
                            className="w-full px-3 py-2 border border-slate-200 text-xs font-sans rounded-none focus:outline-none"
                          />
                        </div>
                        <div>
                          <label className="block font-mono text-[9px] text-slate-400 uppercase mb-1">Cover Photo</label>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleBlogPhotoUpload}
                            className="w-full px-3 py-1.5 border border-slate-200 text-xs font-mono bg-white focus:outline-none"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block font-mono text-[9px] text-slate-400 uppercase mb-1">Brief Excerpt</label>
                        <input
                          type="text"
                          required
                          value={blogExcerpt}
                          onChange={(e) => setBlogExcerpt(e.target.value)}
                          placeholder="Brief 1-sentence summary"
                          className="w-full px-3 py-2 border border-slate-200 text-xs font-sans rounded-none focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="block font-mono text-[9px] text-slate-400 uppercase mb-1">Content (Markdown / Text)</label>
                        <textarea
                          rows={6}
                          required
                          value={blogContent}
                          onChange={(e) => setBlogContent(e.target.value)}
                          placeholder="Type your markdown post contents here..."
                          className="w-full px-3 py-2 border border-slate-200 text-xs font-sans rounded-none focus:outline-none"
                        />
                      </div>

                      <div className="flex items-center gap-2">
                        <input
                          id="blog-publish-check"
                          type="checkbox"
                          checked={blogPublished}
                          onChange={(e) => setBlogPublished(e.target.checked)}
                          className="h-4 w-4 rounded-none border-slate-200 text-primary"
                        />
                        <label htmlFor="blog-publish-check" className="font-mono text-[10px] text-slate-600 uppercase">
                          Publish immediately to main website
                        </label>
                      </div>

                      <div className="flex justify-end">
                        <button type="submit" className="button-primary px-8 py-3 text-xs uppercase font-bold">
                          Publish Article
                        </button>
                      </div>
                    </form>
                  </div>

                  {/* Active Blogs List */}
                  <div className="bg-white border border-slate-200 shadow-sm overflow-hidden">
                    <div className="overflow-x-auto">
                      <table className="w-full text-left border-collapse min-w-[700px]">
                        <thead>
                          <tr className="bg-slate-100 text-slate-600 font-mono text-[9px] uppercase border-b border-slate-200">
                            <th className="p-4">Blog ID</th>
                            <th className="p-4">Cover Photo</th>
                            <th className="p-4">Article Title & Slug</th>
                            <th className="p-4">Excerpt Summary</th>
                            <th className="p-4">Date</th>
                            <th className="p-4 text-right">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 font-sans text-xs text-slate-600">
                          {blogs.map((item) => (
                            <tr key={item.id} className="hover:bg-slate-50/50 transition-colors">
                              <td className="p-4 font-mono font-bold text-primary">{item.id}</td>
                              <td className="p-4">
                                <div className="relative w-12 h-9 border border-slate-200 overflow-hidden bg-slate-50 shrink-0">
                                  <img
                                    src={item.coverImage}
                                    alt=""
                                    className="w-full h-full object-cover grayscale"
                                  />
                                </div>
                              </td>
                              <td className="p-4">
                                <div className="font-bold text-slate-900">{item.title}</div>
                                <div className="text-[10px] text-slate-400 font-mono">/{item.slug}</div>
                              </td>
                              <td className="p-4 max-w-sm">
                                <div className="text-slate-500 truncate">{item.excerpt}</div>
                              </td>
                              <td className="p-4 font-mono text-[10px] text-slate-400">{item.date}</td>
                              <td className="p-4 text-right space-x-2 whitespace-nowrap">
                                <button
                                  onClick={() => openEditBlog(item)}
                                  className="px-3 py-1.5 bg-slate-100 border border-slate-200 hover:bg-slate-200 hover:border-slate-300 font-mono text-[9px] uppercase font-bold text-slate-700 transition-colors"
                                >
                                  Edit
                                </button>
                                <button
                                  onClick={() => triggerDeleteBlog(item.id)}
                                  className="px-3 py-1.5 bg-rose-50 border border-rose-100 hover:bg-rose-100 hover:border-rose-200 font-mono text-[9px] uppercase font-bold text-rose-600 transition-colors"
                                >
                                  Remove
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}

            </Reveal>
          </div>

          {/* Footer admin footer */}
          <div className="text-center font-mono text-[10px] text-slate-400 mt-12 border-t border-slate-200 pt-6 shrink-0">
            © {new Date().getFullYear()} MACPROTEC Admin Dashboard. All system actions logged.
          </div>
        </div>

        {/* CUSTOM CONFIRMATION ACTION MODAL */}
        {confirmModal.show && (
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-6">
            <div className="bg-white border border-border p-6 max-w-md w-full relative shadow-xl">
              <h3 className="font-display font-extrabold text-sm uppercase text-slate-900 border-b border-slate-100 pb-3">
                {confirmModal.title}
              </h3>
              <p className="text-xs text-slate-500 font-sans leading-relaxed mt-4">
                {confirmModal.message}
              </p>
              
              <div className="mt-6 flex justify-end gap-3 font-mono text-[10px] uppercase font-bold">
                <button
                  onClick={() => setConfirmModal((prev) => ({ ...prev, show: false }))}
                  className="px-4 py-2 border border-slate-200 hover:bg-slate-50 text-slate-700 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmModal.action}
                  className="px-4 py-2 bg-primary hover:bg-rose-700 text-white transition-colors"
                >
                  Confirm Action
                </button>
              </div>
            </div>
          </div>
        )}

        {/* CUSTOM EDIT DATA DIALOG MODAL */}
        {editModal.show && (
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-6">
            <div className="bg-white border border-border p-6 max-w-lg w-full relative shadow-xl">
              <h3 className="font-display font-extrabold text-sm uppercase text-slate-900 border-b border-slate-100 pb-3">
                Edit {editModal.type.toUpperCase()} Details ({editModal.id})
              </h3>
              
              <form onSubmit={saveEditChanges} className="space-y-4 mt-4">
                {editModal.type === "lead" ? (
                  <>
                    <div>
                      <label className="block font-mono text-[9px] font-bold text-slate-400 uppercase mb-1">Lead Name</label>
                      <input
                        type="text"
                        required
                        value={editModal.field1}
                        onChange={(e) => setEditModal((prev) => ({ ...prev, field1: e.target.value }))}
                        className="w-full px-3 py-2 border border-slate-200 text-xs font-sans rounded-none focus:outline-none focus:border-primary"
                      />
                    </div>
                    <div>
                      <label className="block font-mono text-[9px] font-bold text-slate-400 uppercase mb-1">Company</label>
                      <input
                        type="text"
                        required
                        value={editModal.field2}
                        onChange={(e) => setEditModal((prev) => ({ ...prev, field2: e.target.value }))}
                        className="w-full px-3 py-2 border border-slate-200 text-xs font-sans rounded-none focus:outline-none focus:border-primary"
                      />
                    </div>
                    <div>
                      <label className="block font-mono text-[9px] font-bold text-slate-400 uppercase mb-1">Status</label>
                      <select
                        value={editModal.field3}
                        onChange={(e) => setEditModal((prev) => ({ ...prev, field3: e.target.value }))}
                        className="w-full px-3 py-2 border border-slate-200 text-xs font-sans rounded-none bg-white focus:outline-none"
                      >
                        <option value="New">New</option>
                        <option value="Contacted">Contacted</option>
                        <option value="Proposal Sent">Proposal Sent</option>
                        <option value="Closed Won">Closed Won</option>
                        <option value="Closed Lost">Closed Lost</option>
                      </select>
                    </div>
                  </>
                ) : editModal.type === "blog" ? (
                  <>
                    <div>
                      <label className="block font-mono text-[9px] font-bold text-slate-400 uppercase mb-1">Article Title</label>
                      <input
                        type="text"
                        required
                        value={editModal.field1}
                        onChange={(e) => setEditModal((prev) => ({ ...prev, field1: e.target.value }))}
                        className="w-full px-3 py-2 border border-slate-200 text-xs font-sans rounded-none focus:outline-none focus:border-primary"
                      />
                    </div>
                    <div>
                      <label className="block font-mono text-[9px] font-bold text-slate-400 uppercase mb-1">Slug URL</label>
                      <input
                        type="text"
                        required
                        value={editModal.field2}
                        onChange={(e) => setEditModal((prev) => ({ ...prev, field2: e.target.value }))}
                        className="w-full px-3 py-2 border border-slate-200 text-xs font-sans rounded-none focus:outline-none focus:border-primary"
                      />
                    </div>
                    <div>
                      <label className="block font-mono text-[9px] font-bold text-slate-400 uppercase mb-1">Excerpt Summary</label>
                      <input
                        type="text"
                        required
                        value={editModal.field3}
                        onChange={(e) => setEditModal((prev) => ({ ...prev, field3: e.target.value }))}
                        className="w-full px-3 py-2 border border-slate-200 text-xs font-sans rounded-none focus:outline-none focus:border-primary"
                      />
                    </div>
                  </>
                ) : (
                  <>
                    <div>
                      <label className="block font-mono text-[9px] font-bold text-slate-400 uppercase mb-1">
                        {editModal.type === "submission" ? "Sender Name" : "Plant Sector"}
                      </label>
                      <input
                        type="text"
                        required
                        value={editModal.field1}
                        onChange={(e) => setEditModal((prev) => ({ ...prev, field1: e.target.value }))}
                        className="w-full px-3 py-2 border border-slate-200 text-xs font-sans rounded-none focus:outline-none focus:border-primary"
                      />
                    </div>

                    <div>
                      <label className="block font-mono text-[9px] font-bold text-slate-400 uppercase mb-1">
                        {editModal.type === "submission" ? "Inquiry Subject" : "Budget Estimate"}
                      </label>
                      <input
                        type="text"
                        required
                        value={editModal.field2}
                        onChange={(e) => setEditModal((prev) => ({ ...prev, field2: e.target.value }))}
                        className="w-full px-3 py-2 border border-slate-200 text-xs font-sans rounded-none focus:outline-none focus:border-primary"
                      />
                    </div>

                    <div>
                      <label className="block font-mono text-[9px] font-bold text-slate-400 uppercase mb-1">
                        {editModal.type === "submission" ? "Message Text" : "Project Scope"}
                      </label>
                      <textarea
                        rows={4}
                        required
                        value={editModal.field3}
                        onChange={(e) => setEditModal((prev) => ({ ...prev, field3: e.target.value }))}
                        className="w-full px-3 py-2 border border-slate-200 text-xs font-sans rounded-none focus:outline-none focus:border-primary"
                      />
                    </div>
                  </>
                )}

                <div className="flex justify-end gap-3 font-mono text-[10px] uppercase font-bold pt-4 border-t border-slate-100 mt-6">
                  <button
                    type="button"
                    onClick={() => setEditModal((prev) => ({ ...prev, show: false }))}
                    className="px-4 py-2 border border-slate-200 hover:bg-slate-50 text-slate-700 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-primary hover:bg-rose-700 text-white transition-colors"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* PRINT VIEW MODAL FOR INVOICES */}
        {selectedInvoice && (
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-6">
            <div className="bg-white border border-slate-400 p-8 max-w-2xl w-full relative shadow-2xl font-sans text-xs text-slate-800">
              
              <div className="flex justify-between border-b-2 border-slate-900 pb-4 mb-6">
                <div>
                  <div className="font-display font-extrabold text-base tracking-wider uppercase text-slate-900">// MACPROTEC INVOICE</div>
                  <div className="text-[10px] text-slate-400 mt-1 font-mono">Houston Consulting Engineers</div>
                </div>
                <div className="text-right font-mono">
                  <div className="font-bold text-primary">{selectedInvoice.id}</div>
                  <div className="text-[10px] mt-1">DATE: {selectedInvoice.date}</div>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4 mb-6">
                <div>
                  <p className="font-mono text-[9px] text-slate-400 uppercase">BILL TO:</p>
                  <p className="font-bold text-slate-900 text-sm mt-1">{selectedInvoice.clientName}</p>
                  <p className="text-slate-500 mt-0.5">{selectedInvoice.clientEmail}</p>
                </div>
                <div className="sm:text-right">
                  <p className="font-mono text-[9px] text-slate-400 uppercase">TERMS:</p>
                  <p className="font-bold text-slate-900 mt-1">Due on Receipt</p>
                </div>
              </div>

              <table className="w-full text-left border-collapse mb-6">
                <thead>
                  <tr className="border-b border-slate-300 font-mono text-[9px] text-slate-400 uppercase">
                    <th className="py-2">Description</th>
                    <th className="py-2 text-center">Qty</th>
                    <th className="py-2 text-right">Unit Price</th>
                    <th className="py-2 text-right">Amount</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {selectedInvoice.items.map((item, i) => (
                    <tr key={i}>
                      <td className="py-3 font-bold text-slate-900">{item.description}</td>
                      <td className="py-3 text-center">{item.quantity}</td>
                      <td className="py-3 text-right font-mono">${item.price.toLocaleString()}</td>
                      <td className="py-3 text-right font-mono">${(item.quantity * item.price).toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className="flex flex-col items-end gap-1.5 border-t border-slate-300 pt-4 font-mono">
                {selectedInvoice.items.map((item, i) => {
                  const subtotal = item.quantity * item.price;
                  const tax = subtotal * (selectedInvoice.taxRate / 100);
                  return (
                    <div key={i} className="w-64 space-y-1">
                      <div className="flex justify-between text-slate-400">
                        <span>SUBTOTAL:</span>
                        <span>${subtotal.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between text-slate-400">
                        <span>TAX ({selectedInvoice.taxRate}%):</span>
                        <span>${tax.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between text-slate-900 font-bold border-t border-slate-200 pt-1.5">
                        <span>TOTAL DUE:</span>
                        <span>${selectedInvoice.total.toLocaleString()}</span>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="flex justify-end gap-3 mt-8 pt-4 border-t border-slate-200 font-mono text-[9px] uppercase font-bold">
                <button
                  onClick={() => setSelectedInvoice(null)}
                  className="px-4 py-2 border border-slate-200 hover:bg-slate-50 text-slate-700 transition-colors"
                >
                  Close Receipt
                </button>
                <button
                  onClick={() => window.print()}
                  className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white transition-colors"
                >
                  Print Invoice
                </button>
              </div>

            </div>
          </div>
        )}

      </main>
    </>
  );
}
