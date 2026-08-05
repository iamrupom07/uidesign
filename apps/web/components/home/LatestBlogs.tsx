"use client";

import Link from "next/link";
import Image from "next/image";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { useGetBlogPostsQuery } from "@/redux/api/blogApi";
import { ArrowRight, Clock, User, Sparkles, ChevronRight } from "lucide-react";
import { BlogPost } from "@repo/types";

// Static fallback articles matching real database schema in case API call is pending or offline
const FALLBACK_BLOGS: Partial<BlogPost>[] = [
  {
    id: "fb-1",
    title: "Pyroprocessing Optimization & Alternative Fuel Combustion in Cement Kilns",
    excerpt:
      "Discover how CFD flow modeling and thermal heat balances increase alternative fuel substitution rates up to 65% while preserving kiln shell integrity.",
    category: "Engineering Insights",
    sector: "Cement",
    coverImage: "/images/cement_industry.png",
    authorName: "MacProtec Technical Desk",
    readTime: "6 min read",
    slug: "pyroprocessing-optimization-alternative-fuel",
    createdAt: new Date().toISOString(),
  },
  {
    id: "fb-2",
    title: "3D Laser Scanning & Reverse Engineering for Brownfield Plant Revamps",
    excerpt:
      "Capturing high-density point cloud spatial data eliminates clash errors during brownfield equipment replacements and piping retrofits.",
    category: "3D Laser Scanning",
    sector: "Heavy Engineering",
    coverImage: "/images/card_laser_scanning.png",
    authorName: "MacProtec Spatial Desk",
    readTime: "5 min read",
    slug: "3d-laser-scanning-reverse-engineering",
    createdAt: new Date().toISOString(),
  },
  {
    id: "fb-3",
    title: "Predictive Telemetry & AI Digital Twins for Heavy Industrial Equipment",
    excerpt:
      "Connecting real-time SCADA sensor streams to virtual digital twin replicas enables early detection of bearing defects and thermal anomalies.",
    category: "CFD & Thermal Simulation",
    sector: "Mining",
    coverImage: "/images/industry_40.png",
    authorName: "Chief Automation Engineer",
    readTime: "7 min read",
    slug: "predictive-telemetry-ai-digital-twins",
    createdAt: new Date().toISOString(),
  },
];

export default function LatestBlogs() {
  const { data: blogsResponse } = useGetBlogPostsQuery({ published: true });

  const fetchedBlogs = blogsResponse?.data || [];
  // Slice latest 3 blog articles
  const latestBlogs =
    fetchedBlogs.length >= 3
      ? fetchedBlogs.slice(0, 3)
      : fetchedBlogs.length > 0
        ? [...fetchedBlogs, ...FALLBACK_BLOGS.slice(fetchedBlogs.length, 3)]
        : FALLBACK_BLOGS;

  return (
    <section className="py-20 bg-white text-slate-800 border-t border-b border-slate-200 relative overflow-hidden blueprint-mesh">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10 space-y-12">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 border-b border-slate-200 pb-8">
          <div className="space-y-3">
            <Reveal>
              <div className="inline-flex items-center gap-2 bg-rose-50 border border-rose-200/80 px-3.5 py-1 text-primary font-mono text-xs font-bold uppercase tracking-wider rounded-full shadow-xs">
                <Sparkles className="w-3.5 h-3.5 text-primary" />
                <span>LATEST TECHNICAL INSIGHTS // BLOG & PUBLICATIONS</span>
              </div>
            </Reveal>

            <Reveal>
              <h2 className="font-display font-black text-3xl sm:text-5xl text-slate-900 uppercase tracking-tight">
                Latest <span className="text-primary">Engineering Articles</span>
              </h2>
            </Reveal>

            <Reveal>
              <p className="text-slate-600 font-sans text-sm sm:text-base max-w-2xl leading-relaxed">
                Data-driven technical insights, CFD case studies, and digital twin breakthroughs published by our Houston process engineering team.
              </p>
            </Reveal>
          </div>

          <Reveal>
            <Link
              href="/resources"
              className="px-6 py-3.5 bg-slate-100 hover:bg-primary text-slate-900 hover:text-white border border-slate-200 font-mono text-xs font-bold uppercase tracking-wider transition-all duration-150 flex items-center gap-2 shrink-0 group"
            >
              <span>View All Publications</span>
              <ArrowRight className="w-4 h-4 text-primary group-hover:text-white group-hover:translate-x-1 transition-all" />
            </Link>
          </Reveal>
        </div>

        {/* 3 Latest Blog Cards Grid (White Background Design) */}
        <RevealGroup className="grid md:grid-cols-3 gap-8" stagger={0.08}>
          {latestBlogs.map((blog, idx) => (
            <RevealItem key={blog.id || idx}>
              <div className="bg-white border border-slate-200 rounded-none overflow-hidden shadow-sm hover:shadow-xl hover:border-primary/60 transition-all duration-300 flex flex-col justify-between h-full group">
                <div>
                  {/* Article Cover Image */}
                  <div className="relative h-52 w-full overflow-hidden bg-slate-950">
                    <Image
                      src={blog.coverImage || "/images/hero_plant.png"}
                      alt={blog.title || "MacProtec Technical Article"}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent" />

                    {/* Category Badge Top Left */}
                    <div className="absolute top-4 left-4 bg-primary text-white font-mono text-[10px] font-extrabold uppercase px-2.5 py-1 tracking-wider shadow-md border border-white/20">
                      {blog.category || "Engineering"}
                    </div>

                    {/* Sector Tag Top Right */}
                    {blog.sector && (
                      <div className="absolute top-4 right-4 bg-slate-950/80 border border-slate-800 text-slate-200 font-mono text-[10px] font-bold uppercase px-2 py-0.5 backdrop-blur-xs">
                        {blog.sector}
                      </div>
                    )}
                  </div>

                  {/* Body Content */}
                  <div className="p-6 space-y-4">
                    {/* Meta info: Author & Read time */}
                    <div className="flex items-center justify-between text-[11px] font-mono text-slate-500 border-b border-slate-100 pb-3">
                      <div className="flex items-center gap-1.5 truncate max-w-[170px]">
                        <User className="w-3.5 h-3.5 text-primary shrink-0" />
                        <span className="truncate">{blog.authorName || "MacProtec Desk"}</span>
                      </div>
                      <div className="flex items-center gap-1 shrink-0 text-slate-500">
                        <Clock className="w-3.5 h-3.5 text-slate-400" />
                        <span>{blog.readTime || "5 min read"}</span>
                      </div>
                    </div>

                    {/* Title */}
                    <h3 className="font-display font-extrabold text-lg text-slate-900 uppercase tracking-tight group-hover:text-primary transition-colors leading-snug line-clamp-2">
                      {blog.title}
                    </h3>

                    {/* Excerpt */}
                    <p className="text-xs text-slate-600 font-sans leading-relaxed line-clamp-3">
                      {blog.excerpt}
                    </p>
                  </div>
                </div>

                {/* Footer Read Action */}
                <div className="p-6 pt-0">
                  <Link
                    href={`/resources/${blog.slug || "article"}`}
                    className="w-full py-3 bg-slate-50 hover:bg-primary text-slate-800 hover:text-white border border-slate-200 hover:border-primary font-mono text-xs font-bold uppercase tracking-wider transition-all duration-200 flex items-center justify-center gap-2 group/link"
                  >
                    <span>Read Full Article</span>
                    <ChevronRight className="w-4 h-4 text-primary group-hover/link:text-white group-hover/link:translate-x-1 transition-all" />
                  </Link>
                </div>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}

