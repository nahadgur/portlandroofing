import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import CitiesGrid from "@/components/CitiesGrid";
import { getCitiesByRegion } from "@/lib/cities";
import { SITE } from "@/lib/config";

export const metadata: Metadata = {
  title: "Oregon Roofing Contractors by City | Oregon Roofing",
  description:
    "Find trusted roofing contractors in 40 Oregon cities. Compare costs, read reviews, and get free quotes from CCB-licensed roofers across every region of Oregon.",
  alternates: { canonical: `${SITE.baseUrl}/oregon` },
};

const REGION_ORDER = [
  "Metro",
  "Willamette Valley",
  "Wine Country",
  "Coast",
  "South Coast",
  "Columbia Gorge",
  "Central Oregon",
  "Southern Oregon",
  "Eastern Oregon",
];

export default function OregonCitiesPage() {
  const grouped = getCitiesByRegion();

  return (
    <>
      <PageHero
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: "Oregon Cities", href: "/oregon" },
        ]}
        eyebrow="40 OREGON CITIES"
        title={
          <>
            Find Roofing Contractors in Your{" "}
            <span style={{ color: "#0066CC" }}>Oregon City</span>
          </>
        }
        subtitle="Statewide coverage from the coast to eastern Oregon. Browse roofing costs, contractor availability, and permit requirements for every major city in the state."
      />

      {/* Full grid of all cities */}
      <section className="section-pad">
        <div className="content-wrap-wide">
          <h2
            className="h-section mb-6"
            style={{ color: "#0F172A" }}
          >
            All 40 Oregon Cities
          </h2>
          <CitiesGrid />
        </div>
      </section>

      {/* Cities grouped by region */}
      <section className="section-pad" style={{ background: "var(--bg2)" }}>
        <div className="content-wrap-wide">
          <h2
            className="h-section mb-8"
            style={{ color: "#0F172A" }}
          >
            Browse by Region
          </h2>

          <div className="flex flex-col gap-10">
            {REGION_ORDER.map((region) => {
              const regionCities = grouped[region];
              if (!regionCities || regionCities.length === 0) return null;

              return (
                <div key={region}>
                  <h3
                    className="h-card mb-4"
                    style={{ color: "#0066CC" }}
                  >
                    {region}
                  </h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
                    {regionCities.map((city) => (
                      <a
                        key={city.slug}
                        href={`/oregon/${city.slug}`}
                        className="city-card block"
                      >
                        <div
                          className="body-sm font-bold"
                          style={{ color: "#0F172A" }}
                        >
                          {city.name}
                        </div>
                        <div
                          className="mt-0.5"
                          style={{ color: "#94A3B8", fontSize: 10 }}
                        >
                          {city.zip}
                        </div>
                        <div
                          className="h-card mt-1"
                          style={{ color: "#0066CC", fontSize: 13 }}
                        >
                          ${city.avgCost.toLocaleString()} avg
                        </div>
                      </a>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
