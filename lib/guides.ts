export interface GuideSection {
  title: string;
  heading?: string;
  body: string;
}

export interface GuideFaq {
  question: string;
  answer: string;
}

export type GuideCategory = 'hiring' | 'maintenance' | 'costs' | 'damage' | 'commercial'

export interface Guide {
  slug: string;
  title: string;
  headline: string;
  description: string;
  heroDescription: string;
  category: GuideCategory;
  featured?: boolean;
  published: string;
  updated?: string;
  readTime: number;
  sections: GuideSection[];
  faqs: GuideFaq[];
}

export const categoryLabels: Record<GuideCategory, string> = {
  hiring:      'Hiring',
  maintenance: 'Maintenance',
  costs:       'Costs',
  damage:      'Storm Damage',
  commercial:  'Commercial',
}

export const guides: Guide[] = [
  {
    "slug": "how-to-choose-roofing-contractor-oregon",
    "category": "hiring",
    "headline": "How to Choose a Roofing Contractor",
    "published": "2024-03-01",
    "readTime": 2,
    "title": "How to Choose a Roofing Contractor in Oregon",
    "description": "Practical questions, written scopes, and sources to help you plan contractor selection.",
    "heroDescription": "Practical questions, written scopes, and sources to help you plan contractor selection.",
    "sections": [
      {
        "title": "Identify the business you are hiring",
        "body": "Ask for the legal business name and Oregon CCB number before comparing bids. [Check the license record](/blog/how-to-check-an-oregon-ccb-license/) and match it to the contract. If a salesperson uses a brand or trading name, ask which legal entity will take payment and perform the work."
      },
      {
        "title": "Check insurance and relevant experience",
        "body": "Request current insurance documentation and ask how it covers the proposed work. Ask who employs or supervises the crew and who handles subcontractors. Request references for projects with a similar roof assembly, access constraints, and scope; a photograph alone cannot tell you how the job went."
      },
      {
        "title": "Make the estimates comparable",
        "body": "Ask every bidder to price the same measurements, material specifications, tear-off, decking, flashing, ventilation, cleanup, and disposal. Compare exclusions alongside the total. A [quote comparison checklist](/blog/portland-roofing-quote-data-2026/) can help you identify where the scopes differ."
      },
      {
        "title": "Agree on changes, payments, and scheduling",
        "body": "Get the scope, payment stages, proposed dates, and change-approval process in writing. Ask how the contractor will document hidden damage and obtain your approval for extra work. Confirm the plan for protecting exposed areas if weather interrupts installation. Avoid relying on verbal promises that do not appear in the agreement."
      },
      {
        "title": "Assign permit responsibilities",
        "body": "Check [whether the project needs permits](/blog/do-you-need-a-permit-to-replace-a-roof-in-portland/) before setting the start date. Agree who will submit applications, pay applicable fees, arrange inspections, and give you the completion records. Verify any historic or other property-specific review separately."
      },
      {
        "title": "Read both warranties",
        "body": "Compare the installer warranty with the manufacturer warranty. Ask about exclusions, claim procedures, transfer terms, and registration. [Manufacturer certification](/blog/why-gaf-owens-corning-certification-matters/) can affect eligibility for some warranties, but the bid must identify the actual coverage being offered."
      },
      {
        "title": "Take time to resolve unanswered questions",
        "body": "Pressure to sign, unclear payment instructions, and missing documentation warrant a pause. Our [contractor warning signs](/blog/red-flags-of-a-bad-roofing-contractor/) explain questions to ask without judging a business solely by its size or address. Keep the bid, contract, changes, photos, and completion documents together."
      }
    ],
    "faqs": [],
    "updated": "2026-10-02"
  },
  {
    "slug": "oregon-roof-maintenance-guide",
    "category": "maintenance",
    "headline": "Oregon Roof Maintenance Guide",
    "published": "2024-04-01",
    "readTime": 2,
    "title": "Oregon Roof Maintenance Guide",
    "description": "Practical questions, written scopes, and sources to help you plan roof maintenance.",
    "heroDescription": "Practical questions, written scopes, and sources to help you plan roof maintenance.",
    "sections": [
      {
        "title": "Start with the roof you have",
        "body": "Keep the installation date if known, material details, warranty, past repair records, and inspection photos together. Ask the installer or manufacturer which maintenance methods suit the actual product. Adjust the inspection schedule to the condition and site rather than assuming every roof needs the same treatment."
      },
      {
        "title": "Look from a safe location",
        "body": "From the ground, look for displaced coverings, debris, blocked drainage, or changes after a storm. Indoors, note new stains or damp areas. Do not climb onto a wet or damaged roof to investigate. Ask a qualified contractor to inspect areas you cannot safely assess."
      },
      {
        "title": "Plan drainage and debris removal",
        "body": "Check whether gutters and downspouts discharge as intended. Ask a maintenance contractor to clear debris and check drainage routes without damaging the roof surface. For a membrane roof, the [flat-roof maintenance guide](/guides/commercial-flat-roof-maintenance-oregon/) covers drains, seams, and penetrations."
      },
      {
        "title": "Choose cleaning methods for the material",
        "body": "Before treating growth, consult the manufacturer instructions and discuss the roof condition with the contractor. The [moss maintenance guide](/guides/oregon-moss-removal-roof-guide/) explains questions about treatment, runoff, and avoiding damage. Do not use appearance alone to decide that a roof needs replacement."
      },
      {
        "title": "Respond to a leak with a defined scope",
        "body": "Record where and when water appears, take photos from a safe location, and request a [roof repair assessment](/services/roof-repair/). Ask the contractor to identify the cause, describe the affected area, and explain the limits of the proposed repair."
      },
      {
        "title": "Keep records after the work",
        "body": "Save the inspection report, photographs, invoices, and any product information. Confirm who handles follow-up if the same problem returns. After storm damage, organize those records before speaking with the insurer using the [storm damage guide](/guides/storm-damage-roof-insurance-oregon/)."
      }
    ],
    "faqs": [],
    "updated": "2026-10-02"
  },
  {
    "slug": "understanding-oregon-roofing-costs",
    "category": "costs",
    "headline": "Understanding Portland Roofing Costs",
    "published": "2024-04-15",
    "readTime": 2,
    "title": "Understanding Portland Roofing Costs",
    "description": "Practical questions, written scopes, and sources to help you plan a roofing budget.",
    "heroDescription": "Practical questions, written scopes, and sources to help you plan a roofing budget.",
    "sections": [
      {
        "title": "A quote needs a scope",
        "body": "Roof size, assembly, access, damage, and the proposed work determine what a bidder prices. This site does not have a verified local quote dataset to support neighborhood averages. Compare your own written bids using the [Portland cost worksheets](/pdx-cost-index/)."
      },
      {
        "title": "Separate the major items",
        "body": "Ask for material specifications, labor, tear-off, disposal, decking, underlayment, flashing, and ventilation. Record quantities and exclusions. Compare [replacement proposals](/services/roof-replacement/) on the same basis before deciding that a lower total represents better value."
      },
      {
        "title": "Price unknown work before it starts",
        "body": "Ask how extra decking or other hidden damage will be documented and priced. Agree on unit prices where possible and require your approval before additional work. Keep optional upgrades separate so the base scope remains comparable."
      },
      {
        "title": "Confirm approval costs for the property",
        "body": "Check [whether permits apply](/blog/do-you-need-a-permit-to-replace-a-roof-in-portland/) and obtain project-specific fee information from the permitting office. Do not assume every full reroof needs a permit or budget a fee based only on the neighborhood."
      },
      {
        "title": "Understand calculator assumptions",
        "body": "The [cost calculator](/tools/cost-calculator/) uses illustrative unit costs and repair allowances. It demonstrates a calculation, not a measured local market price. Use actual measurements and bids before deciding how much work to authorize."
      },
      {
        "title": "Compare payment and ownership terms",
        "body": "Review payment stages, financing charges if offered, warranty exclusions, and maintenance requirements. Ask for the full written terms of any financing proposal. Use the [lifecycle worksheet](/tools/lifecycle-cost/) to test assumptions without treating its result as a guaranteed saving."
      }
    ],
    "faqs": [],
    "updated": "2026-10-02"
  },
  {
    "slug": "oregon-moss-removal-roof-guide",
    "category": "maintenance",
    "headline": "Moss Removal & Prevention for Oregon Roofs",
    "published": "2024-05-01",
    "readTime": 2,
    "title": "Moss Removal & Prevention for Oregon Roofs",
    "description": "Practical questions, written scopes, and sources to help you plan roof maintenance.",
    "heroDescription": "Practical questions, written scopes, and sources to help you plan roof maintenance.",
    "sections": [
      {
        "title": "Identify the condition before choosing a treatment",
        "body": "Ask a contractor to identify the growth, roof material, and condition. Request photos of the affected areas. Decide whether the job is cleaning, repair, or both; a stained roof and a damaged roof need different scopes."
      },
      {
        "title": "Follow the product instructions",
        "body": "Ask which cleaning method the roof manufacturer permits and which treatment product the contractor proposes. Request the label and discuss runoff, landscaping, nearby drainage, and surface protection. Do not mix cleaning products or apply a treatment without following its instructions."
      },
      {
        "title": "Avoid damage during access and cleaning",
        "body": "Do not climb onto a wet or fragile roof. Ask the contractor how they will access the roof, avoid damaging the covering, and document any existing defects. Pressure, scraping, and walking can affect different materials differently; choose the method for the product and condition."
      },
      {
        "title": "Plan the follow-up",
        "body": "Record the treatment, expected appearance changes, and any inspection or repeat treatment the product requires. Keep drainage and debris management in your [roof maintenance plan](/guides/oregon-roof-maintenance-guide/). For a wood roof, discuss [cedar maintenance requirements](/services/cedar-shake-roofing/) with the installer."
      },
      {
        "title": "Separate maintenance from repairs",
        "body": "If the inspection finds displaced coverings, leaks, or damaged flashing, request a separate [repair scope](/services/roof-repair/). Ask what the cleaning price covers and what would require your approval as additional work."
      }
    ],
    "faqs": [],
    "updated": "2026-10-02"
  },
  {
    "slug": "storm-damage-roof-insurance-oregon",
    "category": "damage",
    "headline": "Storm Damage & Insurance Claims",
    "published": "2024-05-15",
    "readTime": 2,
    "title": "Storm Damage & Insurance Claims for Oregon Roofs",
    "description": "Practical questions, written scopes, and sources to help you plan a storm damage assessment.",
    "heroDescription": "Practical questions, written scopes, and sources to help you plan a storm damage assessment.",
    "sections": [
      {
        "title": "Start with safety and documentation",
        "body": "Keep clear of downed power lines, unstable trees, and damaged structures. Photograph visible damage from a safe location and note when you first observed it. Ask a qualified contractor about any work needed to protect the building without climbing onto the roof yourself."
      },
      {
        "title": "Check the policy before assuming coverage",
        "body": "Oregon’s [storm insurance guidance](https://dfr.oregon.gov/insure/home/storm/pages/index.aspx) advises asking your insurer about coverage, exclusions, and deductibles. Damage to part of a roof does not establish that the policy will pay for a whole replacement. Ask how the insurer wants damage and temporary work documented."
      },
      {
        "title": "Define the contractor assessment",
        "body": "Request photos, measurements, and a written description of the affected areas. A [repair proposal](/services/roof-repair/) should explain the cause and scope. If the contractor recommends replacement, ask what findings support it and keep that explanation with the other claim records."
      },
      {
        "title": "Keep quotes separate from coverage decisions",
        "body": "The contractor can price the work; confirm coverage with the insurer. Ask for written explanations of disputed items and maintain an organized record of communications, receipts, and reports. Oregon DFR provides consumer assistance if you need help understanding the claims process."
      },
      {
        "title": "Check the company and approvals",
        "body": "[Verify the contractor’s license](/blog/how-to-check-an-oregon-ccb-license/) and review the agreement before signing. Ask who is responsible for any [required permits](/blog/do-you-need-a-permit-to-replace-a-roof-in-portland/). Confirm availability and scope directly; a storm event does not establish that a referral service has crews ready to dispatch."
      }
    ],
    "faqs": [],
    "updated": "2026-10-02"
  },
  {
    "slug": "commercial-flat-roof-maintenance-oregon",
    "category": "commercial",
    "headline": "Commercial & Flat Roof Maintenance",
    "published": "2024-06-01",
    "readTime": 2,
    "title": "Commercial & Flat Roof Maintenance in Oregon",
    "description": "Practical questions, written scopes, and sources to help you plan commercial roof work.",
    "heroDescription": "Practical questions, written scopes, and sources to help you plan commercial roof work.",
    "sections": [
      {
        "title": "Build a roof record",
        "body": "Keep roof plans, installation records, warranty documents, repairs, and inspection reports together. Identify who can authorize work and who holds the warranty. Ask the building manager to record roof access by equipment service providers as well as roofing contractors."
      },
      {
        "title": "Inspect the assembly and drainage",
        "body": "Ask the maintenance contractor to assess the membrane, seams, penetrations, parapets, drains, and scuppers. For suspected trapped moisture, ask whether testing is appropriate and how the findings will affect the scope. Use the [flat-roof service guide](/services/flat-roofing/) to prepare installation and repair questions."
      },
      {
        "title": "Plan access around occupants",
        "body": "For a shared building in the [Pearl District](/portland/pearl-district/), coordinate access, staging, noise, material storage, and debris removal with management. Ask who communicates schedule changes and protects the occupied areas during work."
      },
      {
        "title": "Get approval requirements for the building",
        "body": "Ask the permitting office which classification and reviews apply to the property and proposed work. The [permit planning guide](/tools/permit-lookup/) helps you organize the information. A roof material or story count alone does not establish the permit class."
      },
      {
        "title": "Compare maintenance and replacement proposals",
        "body": "Request written scopes for routine service, isolated repairs, and any proposed replacement. Separate immediate work from future recommendations. Review warranty requirements before another contractor modifies the assembly, and save photos and reports after each visit."
      }
    ],
    "faqs": [],
    "updated": "2026-10-02"
  }
]

export function getGuideBySlug(slug: string): Guide | undefined {
  return guides.find((g) => g.slug === slug);
}

export function getStaticGuidePaths() {
  return guides.map((g) => ({ slug: g.slug }));
}
