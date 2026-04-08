import type { Metadata } from "next";
import Link from "next/link";
import { services } from "@/lib/services";
import PageHero from "@/components/PageHero";
import ServiceLocationSelect from "@/components/ServiceLocationSelect";

export const metadata: Metadata = {
  title: "Roofing Services | Oregon Roofing",
  description:
    "Professional roofing services across Oregon including roof replacement, repair, metal roofing, cedar shake, and flat roofing. Get free quotes from CCB-licensed contractors.",
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: "Services", href: "/services" },
        ]}
        eyebrow="OUR SERVICES"
        title={
          <>
            Professional Roofing{" "}
            <span style={{ color: "#0066CC" }}>Services</span> Across Oregon
          </>
        }
        subtitle="Compare Oregon roofing services, estimated costs, and materials. Select a service below to learn more or pick a city to get local quotes."
      />

      <section className="section-pad">
        <div className="content-wrap-wide">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <div
                key={service.slug}
                className="rounded-lg border overflow-hidden flex flex-col"
                style={{ borderColor: "#E2E8F0", background: "#fff" }}
              >
                <div
                  className="h-1"
                  style={{ background: "#0066CC" }}
                />
                <div className="p-5 flex flex-col flex-1">
                  <h2
                    className="h-card mb-2"
                    style={{ color: "#0F172A" }}
                  >
                    {service.name}
                  </h2>
                  <p
                    className="body-sm mb-4 flex-1"
                    style={{ color: "#475569" }}
                  >
                    {service.intro}
                  </p>
                  <div
                    className="rounded-md p-3 mb-4"
                    style={{ background: "#F8FAFC" }}
                  >
                    <div
                      className="text-xs font-semibold mb-1"
                      style={{ color: "#94A3B8" }}
                    >
                      ESTIMATED PRICE RANGE
                    </div>
                    <div
                      className="h-card"
                      style={{ color: "#0066CC" }}
                    >
                      ${service.avgLow.toLocaleString()} &ndash; $
                      {service.avgHigh.toLocaleString()}
                    </div>
                    <div
                      className="text-xs mt-0.5"
                      style={{ color: "#94A3B8" }}
                    >
                      {service.unit}
                    </div>
                  </div>
                  <div className="mb-3">
                    <label
                      className="block text-xs font-semibold mb-1.5"
                      style={{ color: "#475569" }}
                    >
                      Get quotes in your city
                    </label>
                    <ServiceLocationSelect serviceSlug={service.slug} />
                  </div>
                  <Link
                    href={`/services/${service.slug}`}
                    className="btn-primary text-center block mt-auto"
                  >
                    Get Quotes
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
