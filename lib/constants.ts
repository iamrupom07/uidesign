import type { NavItem, Service, Expertise, Article } from "@/types/content";

export const primaryNav: NavItem[] = [
  { label: "Home", href: "/" },
  {
    label: "Our Services",
    href: "/our-services",
    children: [
      { label: "Process Engineering", href: "/our-services/process-engineering" },
      { label: "System Integration Solutions", href: "/our-services/system-integration-solutions" },
      { label: "Plant Operational Support", href: "/our-services/plant-operational-support" },
      { label: "Process Design Development Support", href: "/our-services/process-design-development-support" },
      { label: "Project Management", href: "/our-services/project-management" },
      { label: "Training for Industry Professionals", href: "/our-services/training-for-industry-professionals" },
    ],
  },
  {
    label: "Our Expertise",
    href: "/our-expertise",
    children: [
      { label: "Industry 4.0", href: "/our-expertise/industry-40" },
      { label: "Cement", href: "/our-expertise/cement" },
      { label: "Aggregate and SCM", href: "/our-expertise/aggregate-and-scm" },
      { label: "Mining and Metals", href: "/our-expertise/mining-and-metals" },
      { label: "Mine Tailing Management", href: "/our-expertise/mine-tailing-management" },
      { label: "Petrochemicals", href: "/our-expertise/petrochemicals" },
    ],
  },
  { label: "Resources", href: "/resources" },
  { label: "Let's Connect", href: "/lets-connect" },
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
  { slug: "industry-40", title: "Industry 4.0", industry: "Industry 4.0", summary: "", body: "", published: true, order: 1 },
  { slug: "cement", title: "Cement", industry: "Cement", summary: "", body: "", published: true, order: 2 },
  { slug: "aggregate-and-scm", title: "Aggregate and SCM", industry: "Aggregate and SCM", summary: "", body: "", published: true, order: 3 },
  { slug: "mining-and-metals", title: "Mining and Metals", industry: "Mining and Metals", summary: "", body: "", published: true, order: 4 },
  { slug: "mine-tailing-management", title: "Mine Tailing Management", industry: "Mine Tailing Management", summary: "", body: "", published: true, order: 5 },
  { slug: "petrochemicals", title: "Petrochemicals", industry: "Petrochemicals", summary: "", body: "", published: true, order: 6 },
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
