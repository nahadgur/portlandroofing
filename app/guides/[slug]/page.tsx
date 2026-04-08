import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { guides, getGuideBySlug } from "@/lib/guides";
import { SITE } from "@/lib/config";
import { faqSchema, breadcrumbSchema } from "@/lib/schema";
import PageHero from "@/components/PageHero";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return guides.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const guide = getGuideBySlug(slug);
  if (!guide) return { title: "Not Found" };
  return {
    title: `${guide.title} | Oregon Roofing`,
    description: guide.description,
  };
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export default async function GuidePage({ params }: PageProps) {
  const { slug } = await params;
  const guide = getGuideBySlug(slug);
  if (!guide) notFound();

  const crumbs = [
    { name: "Home", url: SITE.baseUrl },
    { name: "Guides", url: `${SITE.baseUrl}/guides` },
    { name: guide.title, url: `${SITE.baseUrl}/guides/${guide.slug}` },
  ];

  const jsonLd = [
    faqSchema(guide.faqs),
    breadcrumbSchema(crumbs),
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <PageHero
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: "Guides", href: "/guides" },
          { label: guide.title, href: `/guides/${guide.slug}` },
        ]}
        title={guide.title}
        subtitle={guide.heroDescription}
      />

      {/* Table of Contents */}
      <section className="section-pad" style={{ background: "#F8FAFC" }}>
        <div className="content-wrap">
          <h2
            className="h-card mb-4"
            style={{ color: "#0F172A" }}
          >
            Table of Contents
          </h2>
          <nav aria-label="Table of contents">
            <ol className="space-y-2">
              {guide.sections.map((section, i) => (
                <li key={section.title}>
                  <Link
                    href={`#${slugify(section.title)}`}
                    className="text-sm font-medium hover:underline"
                    style={{ color: "#0066CC" }}
                  >
                    {i + 1}. {section.title}
                  </Link>
                </li>
              ))}
              {guide.faqs.length > 0 && (
                <li>
                  <Link
                    href="#faq"
                    className="text-sm font-medium hover:underline"
                    style={{ color: "#0066CC" }}
                  >
                    {guide.sections.length + 1}. Frequently Asked Questions
                  </Link>
                </li>
              )}
            </ol>
          </nav>
        </div>
      </section>

      {/* Content Sections */}
      {guide.sections.map((section) => (
        <section
          key={section.title}
          id={slugify(section.title)}
          className="section-pad"
        >
          <div className="content-wrap">
            <h2
              className="h-section mb-4"
              style={{ color: "#0F172A" }}
            >
              {section.title}
            </h2>
            <p
              className="body-main"
              style={{ color: "#475569" }}
            >
              {section.body}
            </p>
          </div>
        </section>
      ))}

      {/* FAQ */}
      {guide.faqs.length > 0 && (
        <section id="faq" className="section-pad" style={{ background: "#F8FAFC" }}>
          <div className="content-wrap">
            <h2
              className="h-section mb-6"
              style={{ color: "#0F172A" }}
            >
              Frequently Asked Questions
            </h2>
            <div className="space-y-5">
              {guide.faqs.map((faq) => (
                <div key={faq.question}>
                  <h3
                    className="h-card mb-2"
                    style={{ color: "#0F172A" }}
                  >
                    {faq.question}
                  </h3>
                  <p
                    className="body-sm"
                    style={{ color: "#475569" }}
                  >
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
