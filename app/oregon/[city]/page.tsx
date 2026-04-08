import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import LeadForm from "@/components/LeadForm";
import PriceAlertBanner from "@/components/PriceAlertBanner";
import HB4029Callout from "@/components/HB4029Callout";
import RegionAdvice from "@/components/RegionAdvice";
import PermitComplexity from "@/components/PermitComplexity";
import NearbyCities from "@/components/NearbyCities";
import { cities, getCityBySlug } from "@/lib/cities";
import { services } from "@/lib/services";
import { SITE } from "@/lib/config";
import {
  localBusinessSchema,
  citySchema,
  faqSchema,
  breadcrumbSchema,
} from "@/lib/schema";

/* ---------- static params ---------- */
export function generateStaticParams() {
  return cities.map((c) => ({ city: c.slug }));
}

/* ---------- metadata ---------- */
interface PageProps {
  params: Promise<{ city: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { city: slug } = await params;
  const city = getCityBySlug(slug);
  if (!city) return {};

  return {
    title: `${city.name} Roofing Contractors & Costs (${city.zip}) | Oregon Roofing`,
    description: `Roofing costs in ${city.name} average $${city.avgCost.toLocaleString()}, ranging from $${city.range[0].toLocaleString()}–$${city.range[1].toLocaleString()}. Find CCB-licensed contractors in ${city.name}, OR ${city.zip}. ${city.description}`,
    alternates: { canonical: `${SITE.baseUrl}/oregon/${city.slug}` },
  };
}

/* ---------- helpers ---------- */
function fmt(n: number) {
  return "$" + n.toLocaleString();
}

/* Data-driven FAQs — unique per city */
function generateCityFaqs(city: ReturnType<typeof getCityBySlug>) {
  if (!city) return [];

  const marketPosition =
    city.indexPct >= 70
      ? "above the Oregon median"
      : city.indexPct >= 60
      ? "near the Oregon median"
      : "below the Oregon median";

  const permitDifficulty =
    city.permitScore <= 2
      ? "straightforward"
      : city.permitScore === 3
      ? "moderate"
      : "more involved";

  const materialContext =
    city.region === "Coast" || city.region === "South Coast"
      ? `In ${city.name}'s coastal environment, salt-air corrosion is a key factor — most local contractors recommend wind-rated shingles and stainless or hot-dipped galvanised fasteners alongside ${city.commonMaterial}.`
      : city.region === "Central Oregon"
      ? `In ${city.name}'s high desert climate, UV resistance and Class A fire ratings are the priority. ${city.commonMaterial} is widely used, though standing seam metal roofing handles the thermal swings particularly well.`
      : city.region === "Eastern Oregon"
      ? `${city.name}'s extreme temperature range demands flexible, high-specification materials. ${city.commonMaterial} is the most common choice, but metal roofing is increasingly preferred for its longevity in continental climates.`
      : city.region === "Columbia Gorge"
      ? `${city.name}'s wind exposure is among the highest in Oregon. ${city.commonMaterial} is standard, but six-nail fastening patterns and 110 mph-rated products are strongly recommended.`
      : city.region === "Southern Oregon"
      ? `Wildfire risk makes Class A fire-rated materials essential in ${city.name}. ${city.commonMaterial} is the most common choice when fire-rated; metal and concrete tile are the strongest alternatives.`
      : `${city.commonMaterial} is the most common roofing material in ${city.name}, and performs well in the ${city.region} climate. Your contractor can advise on whether algae-resistant variants are worth the small premium.`;

  return [
    {
      question: `How much does a new roof cost in ${city.name}?`,
      answer: `The average roof replacement in ${city.name} (${city.zip}) costs around ${fmt(city.avgCost)}, with most projects falling between ${fmt(city.range[0])} and ${fmt(city.range[1])}. At ${city.indexPct}% of the Oregon statewide average, ${city.name} is ${marketPosition}. Final cost depends on roof size, pitch, material, and the condition of the existing structure.`,
    },
    {
      question: `What roofing material is best for ${city.name} homes?`,
      answer: materialContext,
    },
    {
      question: `How complex is the permit process for roofing in ${city.name}?`,
      answer: `The permit process in ${city.name} is ${permitDifficulty} (${city.permitScore}/5 on our complexity scale). ${city.permitNotes} CCB-licensed contractors handle all municipal permit applications on your behalf as part of the project.`,
    },
    {
      question: `How do I find a licensed roofer in ${city.name}?`,
      answer: `All contractors in our ${city.name} network hold an active Oregon CCB licence and carry liability insurance. Request at least three written estimates before committing — price variation of 15–25% between quotes is normal in ${city.name}'s market, especially for ${city.commonMaterial.toLowerCase()} installations.`,
    },
  ];
}

/* ---------- page ---------- */
export default async function CityPage({ params }: PageProps) {
  const { city: slug } = await params;
  const city = getCityBySlug(slug);
  if (!city) notFound();

  const faqs = generateCityFaqs(city);

  const breadcrumbItems = [
    { label: "Home",   href: "/" },
    { label: "Cities", href: "/oregon" },
    { label: city.name, href: `/oregon/${city.slug}` },
  ];

  const jsonLd = [
    localBusinessSchema(city),
    citySchema(city),
    faqSchema(faqs),
    breadcrumbSchema(
      breadcrumbItems.map((b) => ({ name: b.label, url: `${SITE.baseUrl}${b.href}` }))
    ),
  ];

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

      {/* Scheduled banners */}
      <PriceAlertBanner />
      <HB4029Callout />

      {/* Hero */}
      <PageHero
        breadcrumb={breadcrumbItems}
        eyebrow={`${city.region.toUpperCase()} · ${city.zip}`}
        title={
          <>
            {city.name} Roofing{" "}
            <span style={{ color: "#0066CC" }}>Costs & Contractors</span>
          </>
        }
        subtitle={`In ${city.name}, a typical roof replacement costs between ${fmt(city.range[0])} and ${fmt(city.range[1])}. ${city.description}`}
        stats={[
          { value: fmt(city.avgCost),                           label: "Avg Cost" },
          { value: `${fmt(city.range[0])}–${fmt(city.range[1])}`, label: "Typical Range" },
          { value: `${city.indexPct}%`,                         label: "vs OR Average" },
          { value: `${city.permitScore}/5`,                     label: "Permit Score" },
        ]}
        tall
      >
        <>
          {/* City badge */}
          {city.badge && (
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                background: "#0066CC",
                color: "#fff",
                fontSize: "0.7rem",
                fontWeight: 700,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                padding: "4px 12px",
                borderRadius: 999,
                marginBottom: 12,
              }}
            >
              ★ {city.badge}
            </div>
          )}
          <LeadForm source={`city-${city.slug}`} />
        </>
      </PageHero>

      {/* City highlights */}
      <section className="section-pad">
        <div className="content-wrap">
          <h2 className="h-section" style={{ marginBottom: 16 }}>
            {city.name} at a Glance
          </h2>
          <ul className="flex flex-col gap-3">
            {city.highlights.map((h) => (
              <li
                key={h}
                className="flex items-start gap-3"
                style={{ color: "#475569" }}
              >
                <span
                  style={{
                    marginTop: 7,
                    width: 8,
                    height: 8,
                    borderRadius: "50%",
                    background: "#0066CC",
                    flexShrink: 0,
                    display: "block",
                  }}
                />
                <span className="body-main">{h}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Region-specific climate advice */}
      <RegionAdvice
        region={city.region}
        cityName={city.name}
        serviceName="Roofing"
      />

      {/* Roofing services for this city */}
      <section className="section-pad" style={{ background: "var(--bg2)" }}>
        <div className="content-wrap-wide">
          <h2 className="h-section" style={{ marginBottom: 6 }}>
            Roofing Services in {city.name}
          </h2>
          <p className="body-sm" style={{ marginBottom: 20 }}>
            Compare pricing and find vetted contractors for each service type in {city.name}.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {services.map((svc) => (
              <Link
                key={svc.slug}
                href={`/${svc.slug}/${city.slug}`}
                className="card-hover"
                style={{
                  display: "block",
                  background: "#fff",
                  border: "1.5px solid var(--bdr)",
                  borderRadius: 10,
                  padding: "18px 20px",
                  textDecoration: "none",
                }}
              >
                <h3 className="h-card" style={{ marginBottom: 4 }}>
                  {svc.name}
                </h3>
                <p className="body-sm" style={{ marginBottom: 10 }}>
                  {fmt(svc.avgLow)}–{fmt(svc.avgHigh)}{" "}
                  <span style={{ color: "#94A3B8" }}>{svc.unit}</span>
                </p>
                <span
                  style={{
                    fontSize: "0.75rem",
                    fontWeight: 600,
                    color: "#0066CC",
                  }}
                >
                  View {city.name} pricing →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Cost breakdown */}
      <section className="section-pad">
        <div className="content-wrap">
          <h2 className="h-section" style={{ marginBottom: 12 }}>
            Roofing Costs in {city.name}
          </h2>
          <p className="body-main" style={{ marginBottom: 20 }}>
            The average roof replacement in {city.name} costs{" "}
            <strong style={{ color: "#0F172A" }}>{fmt(city.avgCost)}</strong>,
            with most homeowners paying between{" "}
            <strong style={{ color: "#0F172A" }}>
              {fmt(city.range[0])} and {fmt(city.range[1])}
            </strong>
            . At {city.indexPct}% of the Oregon average, {city.name} sits{" "}
            {city.indexPct >= 70
              ? "in the higher end of Oregon markets — reflecting strong local demand and higher labour rates"
              : city.indexPct >= 60
              ? "in the mid-range for Oregon"
              : "in the more affordable tier for Oregon, making it a good market for value-conscious homeowners"}
            .
          </p>

          <div
            className="overflow-x-auto rounded-lg border"
            style={{ borderColor: "var(--bdr)" }}
          >
            <table className="w-full text-sm" style={{ minWidth: 380 }}>
              <thead>
                <tr style={{ background: "var(--bg2)" }}>
                  <th className="text-left px-4 py-3 font-semibold" style={{ color: "#0F172A" }}>
                    Metric
                  </th>
                  <th className="text-left px-4 py-3 font-semibold" style={{ color: "#0F172A" }}>
                    {city.name}
                  </th>
                </tr>
              </thead>
              <tbody>
                {[
                  { label: "Average Cost",           value: fmt(city.avgCost),                              color: "#0066CC" },
                  { label: "Typical Range",          value: `${fmt(city.range[0])} – ${fmt(city.range[1])}`, color: "#0F172A" },
                  { label: "vs Oregon Average",      value: `${city.indexPct}%`,                             color: "#0F172A" },
                  { label: "Most Common Material",   value: city.commonMaterial,                             color: "#0F172A" },
                ].map((row) => (
                  <tr key={row.label} style={{ borderTop: "1px solid var(--bdr)" }}>
                    <td className="px-4 py-3 body-sm">{row.label}</td>
                    <td className="px-4 py-3 font-bold" style={{ color: row.color }}>
                      {row.value}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Permit complexity */}
      <PermitComplexity city={city} />

      {/* Nearby cities */}
      <NearbyCities currentCity={city} allCities={cities} />

      {/* FAQ */}
      <section className="section-pad">
        <div className="content-wrap">
          <h2 className="h-section" style={{ marginBottom: 20 }}>
            {city.name} Roofing FAQ
          </h2>
          <div className="flex flex-col gap-5">
            {faqs.map((faq) => (
              <div key={faq.question}>
                <h3 className="h-card" style={{ marginBottom: 6 }}>
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
              Get Free Roofing Quotes in {city.name}
            </h2>
            <p className="body-sm">
              CCB-licensed contractors · {city.name} local specialists · No obligation
            </p>
          </div>
          <LeadForm source={`city-${city.slug}-bottom`} />
        </div>
      </section>
    </>
  );
}
