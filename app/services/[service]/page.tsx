import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { services, getServiceBySlug } from "@/lib/services";
import { SITE } from "@/lib/config";
import { serviceSchema, faqSchema, breadcrumbSchema } from "@/lib/schema";
import PageHero from "@/components/PageHero";
import PriceAlertBanner from "@/components/PriceAlertBanner";
import CitiesGrid from "@/components/CitiesGrid";
import ComparisonEngine from "@/components/ComparisonEngine";
import LeadForm from "@/components/LeadForm";
import Link from "next/link";

interface PageProps {
  params: Promise<{ service: string }>;
}

export function generateStaticParams() {
  return services.map((s) => ({ service: s.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { service: slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) return { title: "Not Found" };
  return {
    title: `${service.name} in Oregon | Costs & Local Contractors | Oregon Roofing`,
    description: `${service.name} in Oregon costs $${service.avgLow.toLocaleString()}–$${service.avgHigh.toLocaleString()} on average. Compare vetted CCB-licensed contractors, see local pricing, and get free quotes. ${service.intro}`,
  };
}

export default async function ServicePage({ params }: PageProps) {
  const { service: slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) notFound();

  const whyTitle = service.whySection.title.replace(/{city}/g, "Oregon");
  const whyBody = service.whySection.body.replace(/{city}/g, "Oregon");

  const crumbs = [
    { name: "Home", url: SITE.baseUrl },
    { name: "Services", url: `${SITE.baseUrl}/services` },
    { name: service.name, url: `${SITE.baseUrl}/services/${service.slug}` },
  ];

  const jsonLd = [
    serviceSchema(service),
    faqSchema(service.faqs),
    breadcrumbSchema(crumbs),
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <PriceAlertBanner />

      <PageHero
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: "Services", href: "/services" },
          { label: service.name, href: `/services/${service.slug}` },
        ]}
        eyebrow={service.name.toUpperCase()}
        title={
          <>
            {service.name} in{" "}
            <span style={{ color: "#0066CC" }}>Oregon</span>
          </>
        }
        subtitle={`Need ${service.name} in Oregon? Most homeowners pay $${service.avgLow.toLocaleString()}–$${service.avgHigh.toLocaleString()} depending on roof size, material, and location. ${service.intro}`}
        stats={[
          { value: `$${service.avgLow.toLocaleString()}–$${service.avgHigh.toLocaleString()}`, label: "Oregon Range" },
          { value: `$${service.avgMid.toLocaleString()}`, label: "Avg Cost" },
          { value: service.unit, label: "Pricing Unit" },
        ]}
        tall
      >
        <LeadForm source={`service-${service.slug}`} />
      </PageHero>

      {/* Why Section */}
      <section className="section-pad">
        <div className="content-wrap">
          <h2
            className="h-section mb-4"
            style={{ color: "#0F172A" }}
          >
            {whyTitle}
          </h2>
          <p
            className="body-main"
            style={{ color: "#475569" }}
          >
            {whyBody}
          </p>
          {service.warningNote && (
            <div
              className="mt-6 rounded-md border-l-4 p-4"
              style={{
                borderColor: "#EAB308",
                background: "#FEFCE8",
                color: "#854D0E",
                fontSize: 14,
              }}
            >
              <strong>Important:</strong> {service.warningNote}
            </div>
          )}
        </div>
      </section>

      {/* Process Steps */}
      <section className="section-pad" style={{ background: "#F8FAFC" }}>
        <div className="content-wrap">
          <h2
            className="h-section mb-6"
            style={{ color: "#0F172A" }}
          >
            Our {service.name} Process
          </h2>
          <div className="space-y-4">
            {service.processSteps.map((step, i) => (
              <div
                key={step.title}
                className="flex gap-4 items-start"
              >
                <div
                  className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold"
                  style={{ background: "#0066CC", color: "#fff" }}
                >
                  {i + 1}
                </div>
                <div>
                  <h3
                    className="h-card mb-1"
                    style={{ color: "#0F172A" }}
                  >
                    {step.title}
                  </h3>
                  <p
                    className="body-sm"
                    style={{ color: "#475569" }}
                  >
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* Mid-page CTA */}
      <section
        style={{
          background: "#0F172A",
          padding: "2.5rem 1.5rem",
          textAlign: "center",
        }}
      >
        <div className="content-wrap">
          <h2
            style={{
              fontSize: "1.25rem",
              fontWeight: 800,
              color: "#fff",
              letterSpacing: "-0.02em",
              marginBottom: 8,
            }}
          >
            Get {service.name} quotes from vetted Oregon contractors
          </h2>
          <p style={{ fontSize: "0.85rem", color: "#94A3B8", marginBottom: 20 }}>
            CCB-licensed · Local to your area · Free estimates
          </p>
          <Link
            href="/contact"
            style={{
              display: "inline-block",
              background: "#0066CC",
              color: "#fff",
              fontWeight: 700,
              fontSize: "0.9rem",
              padding: "12px 28px",
              borderRadius: 8,
              textDecoration: "none",
            }}
          >
            Get Free Quotes →
          </Link>
        </div>
      </section>

      {/* Materials Comparison */}
      <section className="section-pad">
        <div className="content-wrap">
          <h2
            className="h-section mb-6"
            style={{ color: "#0F172A" }}
          >
            Materials Comparison
          </h2>
          <div className="space-y-6">
            {service.materials.map((mat) => (
              <div
                key={mat.name}
                className="rounded-lg border p-5"
                style={{ borderColor: "#E2E8F0" }}
              >
                <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1 mb-3">
                  <h3
                    className="h-card"
                    style={{ color: "#0F172A" }}
                  >
                    {mat.name}
                  </h3>
                  <span
                    className="text-sm font-semibold"
                    style={{ color: "#0066CC" }}
                  >
                    {mat.priceRange}
                  </span>
                  <span
                    className="text-xs"
                    style={{ color: "#94A3B8" }}
                  >
                    Lifespan: {mat.lifespan}
                  </span>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <h4
                      className="text-xs font-semibold mb-2"
                      style={{ color: "#16A34A" }}
                    >
                      PROS
                    </h4>
                    <ul className="space-y-1">
                      {mat.pros.map((pro) => (
                        <li
                          key={pro}
                          className="text-sm"
                          style={{ color: "#475569" }}
                        >
                          + {pro}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4
                      className="text-xs font-semibold mb-2"
                      style={{ color: "#DC2626" }}
                    >
                      CONS
                    </h4>
                    <ul className="space-y-1">
                      {mat.cons.map((con) => (
                        <li
                          key={con}
                          className="text-sm"
                          style={{ color: "#475569" }}
                        >
                          - {con}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* Metal vs Asphalt Comparison */}
      <section className="section-pad" style={{ background: "#F8FAFC" }}>
        <div className="content-wrap-wide">
          <h2 className="h-section" style={{ marginBottom: 6 }}>
            Metal vs Asphalt: Which Is Right for Oregon?
          </h2>
          <p className="body-sm" style={{ marginBottom: 24 }}>
            Compare the two most popular Oregon roofing materials across cost, lifespan, and maintenance.
          </p>
          <ComparisonEngine />
        </div>
      </section>

      {/* Cities Grid */}
      <section className="section-pad" style={{ background: "#F8FAFC" }}>
        <div className="content-wrap-wide">
          <h2
            className="h-section mb-6"
            style={{ color: "#0F172A" }}
          >
            Get {service.name} in Your City
          </h2>
          <CitiesGrid />
        </div>
      </section>

      {/* FAQ */}
      <section className="section-pad">
        <div className="content-wrap">
          <h2
            className="h-section mb-6"
            style={{ color: "#0F172A" }}
          >
            Frequently Asked Questions
          </h2>
          <div className="space-y-5">
            {service.faqs.map((faq) => (
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

      {/* Bottom CTA */}
      <section
        className="section-pad"
        style={{ background: "#F8FAFC", borderTop: "2px solid #0066CC" }}
      >
        <div className="content-wrap">
          <div style={{ textAlign: "center", marginBottom: 24 }}>
            <h2 className="h-section" style={{ marginBottom: 8 }}>
              Get {service.name} Quotes in Your Oregon City
            </h2>
            <p className="body-sm">
              CCB-licensed contractors · Transparent pricing · No obligation
            </p>
          </div>
          <LeadForm source={`service-${service.slug}-bottom`} />
        </div>
      </section>

    </>
  );
}
