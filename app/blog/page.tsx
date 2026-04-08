import type { Metadata } from "next";
import Link from "next/link";
import { posts } from "@/lib/posts";
import PageHero from "@/components/PageHero";

export const metadata: Metadata = {
  title: "Blog | Oregon Roofing",
  description:
    "Oregon roofing tips, material comparisons, and homeowner advice from local roofing professionals.",
};

export default function BlogPage() {
  return (
    <>
      <PageHero
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: "Blog", href: "/blog" },
        ]}
        eyebrow="BLOG"
        title={
          <>
            Oregon Roofing <span style={{ color: "#0066CC" }}>Blog</span>
          </>
        }
        subtitle="Expert roofing insights, material comparisons, and practical advice for Oregon homeowners."
      />

      <section className="section-pad">
        <div className="content-wrap">
          <div className="space-y-5">
            {posts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="block rounded-lg border p-5 transition-colors hover:border-[#0066CC] hover:bg-[#F8FAFC]"
                style={{ borderColor: "#E2E8F0" }}
              >
                <div
                  className="flex flex-wrap items-center gap-3 text-xs font-medium mb-2"
                  style={{ color: "#94A3B8" }}
                >
                  <span>{post.date}</span>
                  <span aria-hidden="true">|</span>
                  <span>{post.readTime}</span>
                </div>
                <h2
                  className="h-card mb-2"
                  style={{ color: "#0F172A" }}
                >
                  {post.title}
                </h2>
                <p
                  className="body-sm"
                  style={{ color: "#475569" }}
                >
                  {post.description}
                </p>
                <span
                  className="inline-block mt-3 text-sm font-semibold"
                  style={{ color: "#0066CC" }}
                >
                  Read Article
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
