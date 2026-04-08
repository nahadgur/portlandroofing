import type { Metadata } from "next";
import Link from "next/link";
import { guides } from "@/lib/guides";
import PageHero from "@/components/PageHero";

export const metadata: Metadata = {
  title: "Roofing Guides | Oregon Roofing",
  description:
    "In-depth homeowner guides covering Oregon roofing topics including contractor selection, maintenance schedules, and cost breakdowns.",
};

export default function GuidesPage() {
  return (
    <>
      <PageHero
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: "Guides", href: "/guides" },
        ]}
        eyebrow="HOMEOWNER GUIDES"
        title={
          <>
            Oregon Roofing <span style={{ color: "#0066CC" }}>Guides</span>
          </>
        }
        subtitle="Practical, in-depth guides to help Oregon homeowners make informed roofing decisions. From hiring contractors to understanding costs, we cover what matters most."
      />

      <section className="section-pad">
        <div className="content-wrap">
          <div className="space-y-5">
            {guides.map((guide) => (
              <Link
                key={guide.slug}
                href={`/guides/${guide.slug}`}
                className="block rounded-lg border p-5 transition-colors hover:border-[#0066CC] hover:bg-[#F8FAFC]"
                style={{ borderColor: "#E2E8F0" }}
              >
                <h2
                  className="h-card mb-2"
                  style={{ color: "#0F172A" }}
                >
                  {guide.title}
                </h2>
                <p
                  className="body-sm"
                  style={{ color: "#475569" }}
                >
                  {guide.description}
                </p>
                <span
                  className="inline-block mt-3 text-sm font-semibold"
                  style={{ color: "#0066CC" }}
                >
                  Read Guide
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
