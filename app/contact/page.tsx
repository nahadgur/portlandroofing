import type { Metadata } from "next";
import { Award, BookOpen, Shield, ThumbsUp } from "lucide-react";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import LeadForm from "@/components/LeadForm";
import { SITE } from "@/lib/config";
import { localBusinessSchema, faqSchema, breadcrumbSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Contact Portland Roofing | Get a Free Quote",
  description:
    "Contact Portland Roofing for free roofing quotes across the Portland metro. Email or fill out our form. CCB-licensed Oregon contractors, no-obligation estimates.",
  alternates: { canonical: `${SITE.baseUrl}/contact` },
};

const CONTACT_FAQS = [
  {
    question: "How quickly will I hear back after submitting a quote request?",
    answer:
      "Most homeowners hear back within 1-2 business hours during normal business hours. We connect you with local, CCB-licensed contractors who are ready to help.",
  },
  {
    question: "Is the quote really free with no obligation?",
    answer:
      "Yes. Every quote through Portland Roofing is completely free with zero obligation. You are never pressured to commit, and your information is only shared with verified contractors in your area.",
  },
  {
    question: "What areas does Portland Roofing serve?",
    answer:
      "Portland Roofing connects homeowners with CCB-licensed contractors across the Portland metro, from inner-NE and SE neighborhoods to Beaverton, Hillsboro, Lake Oswego, Tigard, Gresham, and the surrounding suburbs.",
  },
  {
    question: "How do I know the contractors are legitimate?",
    answer:
      "Every contractor in our network is verified through our 47-point vetting process. This includes CCB license verification, insurance validation, reference checks, and ongoing performance monitoring.",
  },
  {
    question: "Can I request a specific type of roofing material?",
    answer:
      "Absolutely. When you submit your quote request, you can specify your preferred material -- whether that is asphalt shingles, metal roofing, cedar shake, or flat roofing. Your matched contractor will provide pricing for your chosen material.",
  },
];

const EEAT_CARDS = [
  {
    icon: BookOpen,
    title: "Experience",
    description:
      "10+ years connecting Portland homeowners with quality roofers",
  },
  {
    icon: Award,
    title: "Expertise",
    description:
      "Deep knowledge of PDX climate, building codes, and roofing materials",
  },
  {
    icon: Shield,
    title: "Authoritativeness",
    description:
      "CCB-verified contractor network across 50+ Portland metro neighborhoods",
  },
  {
    icon: ThumbsUp,
    title: "Trustworthiness",
    description:
      "Transparent pricing, no-obligation quotes, verified reviews",
  },
];

export default function ContactPage() {
  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Contact", href: "/contact" },
  ];

  return (
    <>
      <Nav />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(localBusinessSchema()),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema(CONTACT_FAQS)),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbSchema([
              { name: "Home", url: SITE.baseUrl },
              { name: "Contact", url: `${SITE.baseUrl}/contact` },
            ])
          ),
        }}
      />

      <PageHero
        breadcrumb={breadcrumbItems}
        eyebrow="CONTACT US"
        title={
          <>
            Get in Touch with{" "}
            <span style={{ color: "var(--amber-btn)" }}>Portland Roofing</span>
          </>
        }
        subtitle="Serving homeowners across the Portland metro. Whether you need a free quote, have a question about your roof, or want to learn more about our contractor network, we are here to help."
      />

      {/* Lead Form */}
      <section className="section-pad">
        <div className="content-wrap" style={{ maxWidth: 680, margin: "0 auto" }}>
          <h2
            className="text-2xl sm:text-3xl font-extrabold mb-3 text-center"
            style={{ color: "var(--text)" }}
          >
            Request a Free Quote
          </h2>
          <p
            className="text-sm text-center mb-8"
            style={{ color: "var(--muted)" }}
          >
            Tell us about your project and we&apos;ll match you with a
            CCB-licensed contractor in your area — no obligation, no spam.
          </p>
          <LeadForm source="contact" />
        </div>
      </section>

      {/* Google Maps Embed */}
      <section
        className="section-pad"
        style={{ background: "var(--bg2)" }}
      >
        <div className="content-wrap">
          <h2
            className="text-2xl sm:text-3xl font-extrabold mb-6 text-center"
            style={{ color: "var(--text)" }}
          >
            Our Service Area
          </h2>
          <p
            className="text-sm text-center mb-6"
            style={{ color: "var(--muted)", maxWidth: 600, margin: "0 auto 1.5rem" }}
          >
            Portland Roofing serves homeowners across the Portland metro,
            from inner-city neighborhoods to Beaverton, Hillsboro, Lake Oswego,
            Tigard, Gresham, and the surrounding suburbs.
          </p>
          <div className="rounded-lg overflow-hidden border" style={{ borderColor: "var(--bdr)" }}>
            <iframe
              src="https://maps.google.com/maps?q=Portland%2C+OR&z=10&output=embed"
              width="100%"
              height="400"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Portland Roofing service area map"
            />
          </div>
        </div>
      </section>

      {/* E-E-A-T Trust Signals */}
      <section className="section-pad">
        <div className="content-wrap">
          <h2
            className="text-2xl sm:text-3xl font-extrabold mb-3 text-center"
            style={{ color: "var(--text)" }}
          >
            Why Trust Portland Roofing?
          </h2>
          <p
            className="text-sm text-center mb-8"
            style={{ color: "var(--muted)", maxWidth: 600, margin: "0 auto 2rem" }}
          >
            Our commitment to experience, expertise, authority, and trust sets
            us apart in the PDX roofing industry.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {EEAT_CARDS.map((card) => {
              const Icon = card.icon;
              return (
                <div
                  key={card.title}
                  className="rounded-lg border p-6"
                  style={{
                    borderColor: "var(--bdr)",
                    borderTop: "3px solid var(--amber-btn)",
                    background: "var(--bg2)",
                  }}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div
                      className="flex h-10 w-10 items-center justify-center rounded-full"
                      style={{ background: "rgba(196,125,10,0.12)" }}
                    >
                      <Icon className="h-5 w-5" style={{ color: "var(--amber-btn)" }} />
                    </div>
                    <h3
                      className="text-base font-bold"
                      style={{ color: "var(--text)" }}
                    >
                      {card.title}
                    </h3>
                  </div>
                  <p
                    className="text-sm leading-relaxed"
                    style={{ color: "var(--muted)" }}
                  >
                    {card.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section
        className="section-pad"
        style={{ background: "var(--bg2)" }}
      >
        <div className="content-wrap">
          <h2
            className="text-2xl sm:text-3xl font-extrabold mb-8 text-center"
            style={{ color: "var(--text)" }}
          >
            Frequently Asked Questions
          </h2>
          <div className="flex flex-col gap-4">
            {CONTACT_FAQS.map((faq, i) => (
              <div
                key={i}
                className="rounded-lg border p-5"
                style={{
                  borderColor: "var(--bdr)",
                  background: "#fff",
                }}
              >
                <h3
                  className="text-sm font-bold mb-2"
                  style={{ color: "var(--text)" }}
                >
                  {faq.question}
                </h3>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: "var(--muted)" }}
                >
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
