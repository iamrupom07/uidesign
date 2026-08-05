import type { NavItem, Service, Expertise, Article } from "@/types/content";

export const primaryNav: NavItem[] = [
  { label: "Home", href: "/" },
  {
    label: "About us",
    href: "/about-us",
  },
  {
    label: "Solutions",
    href: "/solutions",
    children: [
      { label: "Engineering Design Services", href: "/solutions/design-services" },
      { label: "CFD Engineering", href: "/solutions/cfd-engineering" },
      { label: "Process Simulation & Digital Twin", href: "/solutions/process-simulation" },
      { label: "Plant Performance Optimization", href: "/solutions/plant-optimization" },
      { label: "3D Laser Scanning & Reverse Engineering", href: "/solutions/laser-scanning" },
      {
        label: "Predictive Monitoring & Asset Intelligence",
        href: "/solutions/predictive-monitoring",
      },
    ],
  },
  {
    label: "Our Expertise",
    href: "/industries",
    children: [
      { label: "Industry 4.0", href: "/industries/industry-40" },
      { label: "Cement", href: "/industries/cement" },
      { label: "Aggregate and SCM", href: "/industries/aggregate-and-scm" },
      { label: "Mining and Metals", href: "/industries/mining-and-metals" },
      { label: "Mine Tailing Management", href: "/industries/mine-tailing-management" },
      { label: "Petrochemical", href: "/industries/petrochemical" },
    ],
  },
  {
    label: "Training",
    href: "/training",
  },
  {
    label: "Resources",
    href: "/resources",
  },
  {
    label: "Projects",
    href: "/projects",
    children: [
      { label: "All Projects", href: "/projects/all" },
      { label: "Engineering Design", href: "/projects/design" },
      { label: "CFD Engineering", href: "/projects/cfd" },
      { label: "Process Simulation", href: "/projects/simulation" },
      { label: "Plant Optimization", href: "/projects/optimization" },
      { label: "Digital Twin", href: "/projects/digital-twin" },
      { label: "Laser Scanning", href: "/projects/laser-scanning" },
      { label: "Cement Plants", href: "/projects/cement-plants" },
      { label: "Cement Terminals", href: "/projects/cement-terminals" },
      { label: "Mining", href: "/projects/mining" },
      { label: "Bulk Material Handling", href: "/projects/bulk-handling" },
      { label: "Individual Case Study", href: "/projects/case-study" },
    ],
  },
];

export const services: Service[] = [
  {
    slug: "process-engineering",
    title: "Process Engineering",
    summary: "Design, optimize, and troubleshoot process systems across the plant lifecycle.",
    body: "",
    published: true,
    order: 1,
  },
  {
    slug: "system-integration-solutions",
    title: "System Integration Solutions",
    summary: "Connect controls, automation, and operational data into one coherent system.",
    body: "",
    published: false,
    order: 2,
  },
  {
    slug: "plant-operational-support",
    title: "Plant Operational Support",
    summary: "On-site and remote support to keep operations running reliably and safely.",
    body: "",
    published: false,
    order: 3,
  },
  {
    slug: "process-design-development-support",
    title: "Process Design Development Support",
    summary: "From concept to detailed design, supporting your team through every stage.",
    body: "",
    published: true,
    order: 4,
  },
  {
    slug: "project-management",
    title: "Project Management",
    summary: "Keep complex, multi-discipline projects on schedule and on budget.",
    body: "",
    published: true,
    order: 5,
  },
  {
    slug: "training-for-industry-professionals",
    title: "Training for Industry Professionals",
    summary: "Upskill teams with practical, industry-specific engineering training.",
    body: "",
    published: true,
    order: 6,
  },
];

export const expertiseAreas: Expertise[] = [
  {
    slug: "industry-40",
    title: "Industry 4.0",
    industry: "Industry 4.0",
    summary: "Accelerate smart manufacturing transformation using IoT sensors, AI predictive maintenance, and real-time digital twins.",
    body: "",
    heroImage: "/images/industry_40.png",
    published: true,
    order: 1,
  },
  {
    slug: "cement",
    title: "Cement",
    industry: "Cement",
    summary: "Maximize pyroprocessing thermal efficiency, optimize grinding circuit power consumption, and increase alternative fuel substitution.",
    body: "",
    heroImage: "/images/cement_industry.png",
    published: true,
    order: 2,
  },
  {
    slug: "aggregate-and-scm",
    title: "Aggregate & SCM",
    industry: "Aggregate & SCM",
    summary: "Optimize crushing, screening, grinding, and supplementary cementitious material (SCM) processing facilities.",
    body: "",
    heroImage: "/images/aggregate_scm.png",
    published: true,
    order: 3,
  },
  {
    slug: "mining-and-metals",
    title: "Mining and Metals",
    industry: "Mining and Metals",
    summary: "Enhance comminution circuit efficiency, pyrometallurgical furnace performance, and mineral processing recovery.",
    body: "",
    heroImage: "/images/mining_metals.png",
    published: true,
    order: 4,
  },
  {
    slug: "mine-tailing-management",
    title: "Mine Tailing Management",
    industry: "Mine Tailing Management",
    summary: "Design safe, sustainable tailing dewatering, paste backfill systems, and environmental compliance solutions.",
    body: "",
    heroImage: "/images/tailings_management.png",
    published: true,
    order: 5,
  },
  {
    slug: "petrochemical",
    title: "Petrochemical",
    industry: "Petrochemical",
    summary: "Optimize heat exchanger networks, fired heaters, distillation columns, and piping stress configurations.",
    body: "",
    heroImage: "/images/petrochemical_industry.png",
    published: true,
    order: 6,
  },
];

export const featuredArticles: Article[] = [
  {
    slug: "expert-insights-enhancing-efficiency-cement-mining",
    title: "Expert Insights: Enhancing Efficiency in Cement and Mining Industries",
    excerpt:
      "Discover the latest trends and strategies for optimizing operations in cement, mining, and petrochemical industries. Learn from our experienced team and stay ahead in the competitive market.",
    body: "",
    publishedAt: "2025-01-01",
    category: "Cement",
    readingTimeMinutes: 1,
  },
  {
    slug: "exploring-latest-innovations-cement-mining",
    title: "Exploring the Latest Innovations in Cement and Mining Industries",
    excerpt:
      "Discover the cutting-edge solutions and technologies revolutionizing the cement, mining, and petrochemical sectors, drawn from 65 years of combined engineering and system integration expertise.",
    body: "",
    publishedAt: "2025-01-01",
    category: "Mining",
    readingTimeMinutes: 1,
  },
];

export const companyInfo = {
  name: "MACPROTEC Engineering",
  tagline: "Excellence in Process",
  description:
    "Macprotec is a Houston-based engineering consulting and system integrating company specializing in cement, aggregate, mining, critical minerals, chemicals, petrochemicals, and heavy process industries.",
  yearsExperience: "65+",
  email: "process@macproteceng.com",
  phone: "346-550-0964",
};
