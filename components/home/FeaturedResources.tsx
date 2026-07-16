import Link from "next/link";
import { featuredArticles } from "@/lib/constants";

const gradients = [
  "linear-gradient(135deg,#7C8399,#4C5265)",
  "linear-gradient(135deg,#2B1B4E,#D6266B)",
];

export default function FeaturedResources() {
  return (
    <section className="py-20 lg:py-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="max-w-xl mb-14">
          <p className="text-sm font-semibold uppercase tracking-widest text-brand mb-3">Resources</p>
          <h2 className="text-3xl sm:text-4xl font-bold">Expert insights and analysis</h2>
        </div>

        <div className="grid sm:grid-cols-2 gap-8">
          {featuredArticles.map((article, i) => (
            <Link
              key={article.slug}
              href={`/resources/${article.slug}`}
              className="rounded-2xl overflow-hidden border border-gray-100 transition-transform hover:-translate-y-1 hover:shadow-lg block"
            >
              <div className="h-52" style={{ background: gradients[i % gradients.length] }} />
              <div className="p-7">
                <p className="font-bold text-lg leading-snug">{article.title}</p>
                <p className="text-sm text-body mt-3">{article.excerpt}</p>
                <p className="text-xs text-body mt-5">
                  {new Date(article.publishedAt).toLocaleDateString()} · {article.readingTimeMinutes} min read
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
