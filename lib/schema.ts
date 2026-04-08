import { SITE } from "./config";
import type { City } from "./cities";
import type { Service } from "./services";

export function localBusinessSchema(city?: City) {
  return {
    "@context": "https://schema.org",
    "@type": "RoofingContractor",
    name: SITE.name,
    url: SITE.baseUrl,
    telephone: SITE.phone,
    email: SITE.email,
    areaServed: city
      ? {
          "@type": "City",
          name: city.name,
          addressRegion: "OR",
          postalCode: city.zip,
        }
      : {
          "@type": "State",
          name: "Oregon",
          addressRegion: "OR",
        },
    address: {
      "@type": "PostalAddress",
      addressRegion: "OR",
      addressCountry: "US",
      ...(city ? { addressLocality: city.name, postalCode: city.zip } : {}),
    },
    priceRange: city
      ? `$${city.range[0].toLocaleString()}-$${city.range[1].toLocaleString()}`
      : "$6,200-$30,000",
    image: `${SITE.baseUrl}/images/og-default.jpeg`,
  };
}

export function citySchema(city: City) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "Roofing",
    provider: {
      "@type": "RoofingContractor",
      name: SITE.name,
      url: SITE.baseUrl,
      telephone: SITE.phone,
    },
    areaServed: {
      "@type": "City",
      name: city.name,
      addressRegion: "OR",
      postalCode: city.zip,
    },
    description: city.description,
    offers: {
      "@type": "AggregateOffer",
      lowPrice: city.range[0],
      highPrice: city.range[1],
      priceCurrency: "USD",
    },
  };
}

export function serviceSchema(service: Service, city?: City) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: service.name,
    provider: {
      "@type": "RoofingContractor",
      name: SITE.name,
      url: SITE.baseUrl,
      telephone: SITE.phone,
    },
    ...(city
      ? {
          areaServed: {
            "@type": "City",
            name: city.name,
            addressRegion: "OR",
            postalCode: city.zip,
          },
        }
      : {
          areaServed: {
            "@type": "State",
            name: "Oregon",
            addressRegion: "OR",
          },
        }),
    description: service.intro,
    offers: {
      "@type": "AggregateOffer",
      lowPrice: service.avgLow,
      highPrice: service.avgHigh,
      priceCurrency: "USD",
    },
  };
}

export function faqSchema(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

export function breadcrumbSchema(
  items: { name: string; url: string }[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function howToSchema(
  name: string,
  steps: { title: string; description: string }[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name,
    step: steps.map((step, i) => ({
      "@type": "HowToStep",
      position: i + 1,
      name: step.title,
      itemListElement: [
        {
          "@type": "HowToDirection",
          text: step.description,
        },
      ],
    })),
  };
}
