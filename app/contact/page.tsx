import type { Metadata } from "next";
import { Award, BookOpen, Shield, ThumbsUp } from "lucide-react";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import LeadForm from "@/components/LeadForm";
import { SITE } from "@/lib/config";
import { localBusinessSchema, faqSchema, breadcrumbSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Contact Oregon Roofing | Get a Free Quote",
  description:
    "Contact Oregon Roofing for free roofing quotes across 40 Oregon cities. Call, email, or fill out our form. CCB-licensed contractors, no-obligation estimates.",
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
      "Yes. Every quote through Oregon Roofing is completely free with zero obligation. You are never pressured to commit, and your information is only shared with verified contractors in your area.",
  },
  {
    question: "What areas does Oregon Roofing serve?",
    answer:
      "Oregon Roofing connects homeowners with contractors across 40 cities statewide, from Portland and Eugene to Bend, Medford, Astoria, and everywhere in between.",
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
      "10+ years connecting Oregon homeowners with quality roofers",
  },
  {
    icon: Award,
    title: "Expertise",
    description:
      "Deep knowledge of Oregon's climate, building codes, and materials",
  },
  {
    icon: Shield,
    title: "Authoritativeness",
    description:
      "CCB-verified contractor network across 40 cities",
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
            <span style={{ color: "#0066CC" }}>Oregon Roofing</span>
          </>
        }
        subtitle="Serving homeowners across all 40 Oregon cities. Whether you need a free quote, have a question about your roof, or want to learn more about our contractor network -- we are here to help."
      />

      {/* Lead Form */}
      <section className="section-pad">
        <div className="content-wrap" style={{ maxWidth: 680, margin: "0 auto" }}>
          <h2
            className="text-2xl sm:text-3xl font-extrabold mb-3 text-center"
            style={{ color: "#0F172A" }}
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
            style={{ color: "#0F172A" }}
          >
            Our Service Area
          </h2>
          <p
            className="text-sm text-center mb-6"
            style={{ color: "var(--muted)", maxWidth: 600, margin: "0 auto 1.5rem" }}
          >
            Oregon Roofing serves homeowners across the entire state of Oregon,
            from the Pacific Coast to the high desert of Eastern Oregon.
          </p>
          <div className="rounded-lg overflow-hidden border" style={{ borderColor: "var(--bdr)" }}>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2924974.1!2d-122.0!3d44.0!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x54950b0b7da97427%3A0x1c36b9e6f6d18591!2sOregon!5e0!3m2!1sen!2sus!4v1700000000000!5m2!1sen!2sus"
              width="100%"
              height="400"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Oregon Roofing service area map"
            />
          </div>
        </div>
      </section>

      {/* E-E-A-T Trust Signals */}
      <section className="section-pad">
        <div className="content-wrap">
          <h2
            className="text-2xl sm:text-3xl font-extrabold mb-3 text-center"
            style={{ color: "#0F172A" }}
          >
            Why Trust Oregon Roofing?
          </h2>
          <p
            className="text-sm text-center mb-8"
            style={{ color: "var(--muted)", maxWidth: 600, margin: "0 auto 2rem" }}
          >
            Our commitment to experience, expertise, authority, and trust sets
            us apart in the Oregon roofing industry.
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
                    borderTop: "3px solid #0066CC",
                    background: "var(--bg2)",
                  }}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div
                      className="flex h-10 w-10 items-center justify-center rounded-full"
                      style={{ background: "#DBEAFE" }}
                    >
                      <Icon className="h-5 w-5" style={{ color: "#0066CC" }} />
                    </div>
                    <h3
                      className="text-base font-bold"
                      style={{ color: "#0F172A" }}
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
            style={{ color: "#0F172A" }}
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
                  style={{ color: "#0F172A" }}
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
