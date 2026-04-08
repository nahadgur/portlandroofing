import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import LeadForm from "@/components/LeadForm";
import CitySelector from "@/components/CitySelector";
import LocalCostTruth from "@/components/LocalCostTruth";
import PermitComplexity from "@/components/PermitComplexity";
import RelatedCityServices from "@/components/RelatedCityServices";
import RegionAdvice from "@/components/RegionAdvice";
import PriceAlertBanner from "@/components/PriceAlertBanner";
import { cities, getCityBySlug } from "@/lib/cities";
import { services, getServiceBySlug } from "@/lib/services";
import { SITE } from "@/lib/config";
import {
  serviceSchema,
  faqSchema,
  breadcrumbSchema,
  howToSchema,
} from "@/lib/schema";

/* ---------- static params ---------- */
export function generateStaticParams() {
  return services.flatMap((svc) =>
    cities.map((city) => ({ service: svc.slug, city: city.slug }))
  );
}

/* ---------- metadata ---------- */
interface PageProps {
  params: Promise<{ service: string; city: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { service: svcSlug, city: citySlug } = await params;
  const svc = getServiceBySlug(svcSlug);
  const city = getCityBySlug(citySlug);
  if (!svc || !city) return {};

  const title = `${svc.name} in ${city.name}, Oregon ${city.zip} | Oregon Roofing`;
  const description = `Need ${svc.name} in ${city.name}? Expect to pay $${city.range[0].toLocaleString()}–$${city.range[1].toLocaleString()}. ${svc.intro.replace(/\{city\}/g, city.name)}`;

  return {
    title,
    description,
    alternates: { canonical: `${SITE.baseUrl}/${svc.slug}/${city.slug}` },
  };
}

/* ---------- helpers ---------- */
function fmt(n: number) {
  return "$" + n.toLocaleString();
}

function replaceCity(text: string, cityName: string) {
  return text.replace(/\{city\}/g, cityName);
}

/* ---------- page ---------- */
export default async function ServiceCityPage({ params }: PageProps) {
  const { service: svcSlug, city: citySlug } = await params;
  const svc = getServiceBySlug(svcSlug);
  const city = getCityBySlug(citySlug);
  if (!svc || !city) notFound();

  const breadcrumbItems = [
    { label: "Home",     href: "/" },
    { label: "Services", href: "/services" },
    { label: svc.name,   href: `/${svc.slug}` },
    { label: city.name,  href: `/${svc.slug}/${city.slug}` },
  ];

  const jsonLd = [
    serviceSchema(svc, city),
    faqSchema(svc.faqs),
    breadcrumbSchema(
      breadcrumbItems.map((b) => ({ name: b.label, url: `${SITE.baseUrl}${b.href}` }))
    ),
    howToSchema(
      `How we perform ${svc.name} in ${city.name}`,
      svc.processSteps
    ),
  ];

  /* Direct-answer subtitle for AEO / AI Overviews */
  const directAnswerSubtitle = `Need ${svc.name} in ${city.name}? Expect to pay between ${fmt(city.range[0])} and ${fmt(city.range[1])} for a standard residential installation. ${replaceCity(svc.intro, city.name)}`;

  return (
    <>
      {/* JSON-LD */}
      {jsonLd.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}

      {/* Price alert */}
      <PriceAlertBanner />

      {/* Hero */}
      <PageHero
        breadcrumb={breadcrumbItems}
        eyebrow={`${svc.shortName.toUpperCase()} IN ${city.name.toUpperCase()}`}
        title={
          <>
            {svc.name} in{" "}
            <span style={{ color: "#0066CC" }}>{city.name}</span>, Oregon
          </>
        }
        subtitle={directAnswerSubtitle}
        stats={[
          { value: `${fmt(city.range[0])}–${fmt(city.range[1])}`, label: "Local Range" },
          { value: `${city.indexPct}%`, label: "vs OR Average" },
          { value: svc.unit, label: "Pricing Unit" },
        ]}
        tall
      >
        <LeadForm source={`${svc.slug}-${city.slug}`} />
      </PageHero>

      {/* Local Cost Truth */}
      <LocalCostTruth city={city} service={svc} />

      {/* Permit Complexity */}
      <PermitComplexity city={city} />

      {/* Why Section */}
      <section className="section-pad">
        <div className="content-wrap">
          <h2 className="h-section" style={{ marginBottom: 12 }}>
            {replaceCity(svc.whySection.title, city.name)}
          </h2>
          <p className="body-main">
            {replaceCity(svc.whySection.body, city.name)}
          </p>
        </div>
      </section>

      {/* Region advice */}
      <RegionAdvice
        region={city.region}
        cityName={city.name}
        serviceName={svc.name}
      />

      {/* Process Steps */}
      <section className="section-pad" style={{ background: "var(--bg2)" }}>
        <div className="content-wrap">
          <h2 className="h-section" style={{ marginBottom: 20 }}>
            Our {svc.name} Process
          </h2>
          <ol className="flex flex-col gap-5">
            {svc.processSteps.map((step, i) => (
              <li key={step.title} className="flex gap-4">
                <span
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-bold text-white"
                  style={{ background: "#0066CC" }}
                >
                  {i + 1}
                </span>
                <div>
                  <h3 className="h-card" style={{ marginBottom: 4 }}>
                    {step.title}
                  </h3>
                  <p className="body-sm">{step.description}</p>
                </div>
              </li>
            ))}
          </ol>
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
            Ready to protect your {city.name} home?
          </h2>
          <p style={{ fontSize: "0.85rem", color: "#94A3B8", marginBottom: 20 }}>
            Get matched with CCB-licensed {svc.shortName.toLowerCase()} contractors in {city.name}.
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
              transition: "background 0.2s, transform 0.2s",
            }}
          >
            Get My {city.name} Estimate →
          </Link>
        </div>
      </section>

      {/* Materials Comparison */}
      <section className="section-pad">
        <div className="content-wrap-wide">
          <h2 className="h-section" style={{ marginBottom: 20 }}>
            Materials Comparison
          </h2>
          <div
            className="overflow-x-auto rounded-lg border"
            style={{ borderColor: "var(--bdr)" }}
          >
            <table className="w-full text-sm" style={{ minWidth: 640 }}>
              <thead>
                <tr style={{ background: "var(--bg2)" }}>
                  {["Material", "Price Range", "Lifespan", "Pros", "Cons"].map((h) => (
                    <th
                      key={h}
                      className="text-left px-4 py-3 font-semibold"
                      style={{ color: "#0F172A" }}
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {svc.materials.map((mat) => (
                  <tr key={mat.name} style={{ borderTop: "1px solid var(--bdr)" }}>
                    <td className="px-4 py-3 font-bold" style={{ color: "#0F172A" }}>
                      {mat.name}
                    </td>
                    <td className="px-4 py-3 font-semibold" style={{ color: "#0066CC" }}>
                      {mat.priceRange}
                    </td>
                    <td className="px-4 py-3" style={{ color: "#475569" }}>
                      {mat.lifespan}
                    </td>
                    <td className="px-4 py-3" style={{ color: "#475569" }}>
                      <ul className="list-disc pl-4 space-y-0.5">
                        {mat.pros.map((p) => <li key={p}>{p}</li>)}
                      </ul>
                    </td>
                    <td className="px-4 py-3" style={{ color: "#475569" }}>
                      <ul className="list-disc pl-4 space-y-0.5">
                        {mat.cons.map((c) => <li key={c}>{c}</li>)}
                      </ul>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Related services for this city */}
      <RelatedCityServices
        city={city}
        currentServiceSlug={svc.slug}
        allServices={services}
      />

      {/* City Selector */}
      <section className="section-pad" style={{ background: "var(--bg2)" }}>
        <div className="content-wrap">
          <h2 className="h-section" style={{ marginBottom: 6 }}>
            {svc.name} in Other Oregon Cities
          </h2>
          <p className="body-sm" style={{ marginBottom: 20 }}>
            Compare {svc.shortName.toLowerCase()} pricing across Oregon.
          </p>
          <CitySelector currentService={svc.slug} currentCity={city.slug} />
        </div>
      </section>

      {/* FAQ */}
      <section className="section-pad">
        <div className="content-wrap">
          <h2 className="h-section" style={{ marginBottom: 20 }}>
            {svc.name} FAQ
          </h2>
          <div className="flex flex-col gap-5">
            {svc.faqs.map((faq) => (
              <div key={faq.question}>
                <h3 className="h-card" style={{ marginBottom: 4 }}>
                  {faq.question}
                </h3>
                <p className="body-sm">{faq.answer}</p>
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
              Start Your {city.name} Project Today
            </h2>
            <p className="body-sm">
              CCB-licensed contractors · Transparent pricing · No obligation
            </p>
          </div>
          <LeadForm source={`${svc.slug}-${city.slug}-bottom`} />
        </div>
      </section>
    </>
  );
}
