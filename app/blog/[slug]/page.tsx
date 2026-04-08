import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { posts, getPostBySlug } from "@/lib/posts";
import { SITE } from "@/lib/config";
import { breadcrumbSchema } from "@/lib/schema";
import PageHero from "@/components/PageHero";
import RoofChecklistTool from "@/components/RoofChecklistTool";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return { title: "Not Found" };
  return {
    title: `${post.title} | Oregon Roofing`,
    description: post.description,
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const crumbs = [
    { name: "Home", url: SITE.baseUrl },
    { name: "Blog", url: `${SITE.baseUrl}/blog` },
    { name: post.title, url: `${SITE.baseUrl}/blog/${post.slug}` },
  ];

  const jsonLd = [breadcrumbSchema(crumbs)];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <PageHero
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: "Blog", href: "/blog" },
          { label: post.title, href: `/blog/${post.slug}` },
        ]}
        title={post.title}
        subtitle={post.description}
        stats={[
          { value: post.date, label: "Published" },
          { value: post.author, label: "Author" },
          { value: post.readTime, label: "Read Time" },
        ]}
      />

      {/* Content Sections */}
      {post.sections.map((section) => (
        <section key={section.title} className="section-pad">
          <div className="content-wrap">
            <h2
              className="text-xl font-bold mb-4"
              style={{ color: "#0F172A" }}
            >
              {section.title}
            </h2>
            <p
              className="text-base leading-relaxed"
              style={{ color: "#475569" }}
            >
              {section.body}
            </p>
          </div>
        </section>
      ))}

      {/* Interactive checklist — only on the when-to-replace post */}
      {post.slug === "when-to-replace-your-roof-warning-signs" && (
        <RoofChecklistTool />
      )}
    </>
  );
}
