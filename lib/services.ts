export interface Service { slug:string; name:string; shortName:string; urgency:string; intro:string; description:string; sections:{heading:string;body:string}[] }
export const services: Service[] = [
  {
    "slug": "roof-replacement",
    "name": "Roof Replacement",
    "shortName": "Replacement",
    "urgency": "standard",
    "intro": "Ask each bidder to use the same roof measurements and list tear-off, decking, underlayment, flashing, ventilation, disposal, and cleanup. Record product names and quantities. A single total makes it hard to see what one contractor has included and another has left out.",
    "description": "Compare roof replacement scopes, materials, property requirements, and contractor questions in Portland.",
    "sections": [
      {
        "heading": "Compare the whole assembly",
        "body": "Ask each bidder to use the same roof measurements and list tear-off, decking, underlayment, flashing, ventilation, disposal, and cleanup. Record product names and quantities. A single total makes it hard to see what one contractor has included and another has left out.\n\nWhen [comparing roofing quotes](/blog/portland-roofing-quote-data-2026/), request a unit price for hidden deck repairs and agree how the crew will document them before you authorize extra work."
      },
      {
        "heading": "Decide whether replacement is justified",
        "body": "Ask for photographs and an explanation of the roof condition. An isolated leak may call for a [targeted repair](/services/roof-repair/); widespread damage or an assembly that cannot support a durable repair needs a different discussion. Roof age alone is not a diagnosis."
      },
      {
        "heading": "Match the bid to the property",
        "body": "A [Pearl District](/portland/pearl-district/) building may need coordination with management for access to a shared roof. For a [Sellwood-Moreland](/portland/sellwood-moreland/) house with additions, make sure the quote identifies each roof section and its transitions. Ask which work the contractor excludes."
      },
      {
        "heading": "Confirm permits and warranties",
        "body": "Check [whether your reroof needs a permit](/blog/do-you-need-a-permit-to-replace-a-roof-in-portland/) using the building type and proposed work. Put responsibility for any applications and inspections in the contract. Read the material warranty and the installer warranty separately, and confirm registration requirements before paying for an upgrade."
      }
    ]
  },
  {
    "slug": "roof-repair",
    "name": "Roof Repair",
    "shortName": "Repair",
    "urgency": "high",
    "intro": "Ask the roofer to identify the entry point, the affected roof area, and any interior or deck damage they can assess. Request photographs and a written repair scope. Sealing the visible stain location is not a substitute for finding where water entered.",
    "description": "Compare roof repair scopes, materials, property requirements, and contractor questions in Portland.",
    "sections": [
      {
        "heading": "Find the cause before choosing the repair",
        "body": "Ask the roofer to identify the entry point, the affected roof area, and any interior or deck damage they can assess. Request photographs and a written repair scope. Sealing the visible stain location is not a substitute for finding where water entered."
      },
      {
        "heading": "Compare repair and replacement recommendations",
        "body": "Ask what condition the surrounding roof is in and whether the proposed repair can tie into it. If a contractor recommends [full replacement](/services/roof-replacement/), ask what evidence makes a limited repair unsuitable. Compare the warranty and exclusions for each option."
      },
      {
        "heading": "Account for the roof type and location",
        "body": "For a membrane roof in the [Pearl District](/portland/pearl-district/), include seams, drains, parapets, and penetrations in the assessment. On a [St. Johns](/portland/st-johns/) home, ask whether the bid includes adjoining flashing or only the damaged covering. Use the roof assembly and inspection findings to define the work."
      },
      {
        "heading": "Document storm damage and approvals",
        "body": "If damage follows a storm, organize photos, dates, and the contractor assessment before discussing a claim. Our [storm damage guide](/guides/storm-damage-roof-insurance-oregon/) covers that process. Confirm the [permit requirements](/blog/do-you-need-a-permit-to-replace-a-roof-in-portland/) for the actual repair scope rather than using an assumed percentage-of-roof rule."
      }
    ]
  },
  {
    "slug": "metal-roofing",
    "name": "Metal Roofing",
    "shortName": "Metal Roofing",
    "urgency": "standard",
    "intro": "Ask for the panel profile, metal specification, finish, fastening system, underlayment, and flashing details in writing. Compare bids for the same assembly. Discuss penetrations, transitions, and how the crew will address expansion and contraction.",
    "description": "Compare metal roofing scopes, materials, property requirements, and contractor questions in Portland.",
    "sections": [
      {
        "heading": "Specify the metal roofing system",
        "body": "Ask for the panel profile, metal specification, finish, fastening system, underlayment, and flashing details in writing. Compare bids for the same assembly. Discuss penetrations, transitions, and how the crew will address expansion and contraction."
      },
      {
        "heading": "Plan installation access",
        "body": "Long panels and roof access can affect installation logistics. For a [West Hills](/portland/west-hills/) property with a steep approach or limited staging, ask the installer to walk through delivery and lifting arrangements. Confirm who is responsible for protecting landscaping and adjacent surfaces."
      },
      {
        "heading": "Compare ownership costs using your own assumptions",
        "body": "Use the [lifecycle worksheet](/tools/lifecycle-cost/) to compare installation and maintenance assumptions, then replace them with actual bids and product guidance. Do not treat a modeled lifespan or resale value as a guaranteed return. Ask the installer to explain maintenance and warranty exclusions."
      },
      {
        "heading": "Check approvals before ordering",
        "body": "For a material change, check the property and scope through the [permit planning guide](/tools/permit-lookup/). If solar is part of the project, [coordinate roofing and solar installation](/guides/solar-ready-roofing-oregon-incentives/) with both contractors. Ask which manufacturer approves the proposed system."
      }
    ]
  },
  {
    "slug": "cedar-shake-roofing",
    "name": "Cedar Shake Roofing",
    "shortName": "Cedar Shake",
    "urgency": "standard",
    "intro": "Ask whether the bid specifies shakes or shingles, the product grade and treatment, and the proposed underlayment, spacing, flashing, and fastening. Request the manufacturer installation instructions and written maintenance requirements.",
    "description": "Compare cedar shake roofing scopes, materials, property requirements, and contractor questions in Portland.",
    "sections": [
      {
        "heading": "Define the product and installation scope",
        "body": "Ask whether the bid specifies shakes or shingles, the product grade and treatment, and the proposed underlayment, spacing, flashing, and fastening. Request the manufacturer installation instructions and written maintenance requirements."
      },
      {
        "heading": "Check the property before changing materials",
        "body": "For an [Irvington](/portland/irvington/) or [Eastmoreland](/portland/eastmoreland/) property, confirm the designation and proposed work with the city before assuming that a particular material or review process applies. The [historic roofing guide](/guides/portland-historic-district-roofing-codes/) explains what information to gather."
      },
      {
        "heading": "Include maintenance in the decision",
        "body": "Discuss inspection, debris removal, drainage, and treatment compatibility with the installer. Use the [roof maintenance guide](/guides/oregon-roof-maintenance-guide/) to organize a schedule, then adjust it to the product and roof condition. Avoid choosing a cleaning method solely on a promise to make the roof look new."
      },
      {
        "heading": "Compare alternatives on equal terms",
        "body": "If you are comparing cedar with [metal roofing](/services/metal-roofing/), use the same measurements and include any changes to decking and flashing. For a [Lake Oswego](/portland/lake-oswego/) property, check any applicable private approvals separately from city requirements."
      }
    ]
  },
  {
    "slug": "flat-roofing",
    "name": "Flat Roof & TPO",
    "shortName": "Flat Roofing",
    "urgency": "high",
    "intro": "Ask the contractor to identify the existing membrane, insulation, deck, drainage routes, and edge details. A low-slope roof proposal should explain how water reaches drains or scuppers and how the new work connects to walls and penetrations.",
    "description": "Compare flat roof & tpo scopes, materials, property requirements, and contractor questions in Portland.",
    "sections": [
      {
        "heading": "Start with drainage and the roof assembly",
        "body": "Ask the contractor to identify the existing membrane, insulation, deck, drainage routes, and edge details. A low-slope roof proposal should explain how water reaches drains or scuppers and how the new work connects to walls and penetrations."
      },
      {
        "heading": "Compare a localized repair with replacement",
        "body": "Request the findings that support a seam repair, flashing replacement, or a new membrane. If moisture testing is proposed, ask what area it covers and how the results will change the scope. An isolated [repair](/services/roof-repair/) and a [replacement](/services/roof-replacement/) should have distinct scopes and warranties."
      },
      {
        "heading": "Coordinate shared buildings and additions",
        "body": "For a [Pearl District](/portland/pearl-district/) condominium, establish who authorizes the roof work and how contractors will access shared areas. For a low-slope addition in the [Alberta Arts District](/portland/alberta-arts-district/), ask about the junction with the main roof and the wall above it."
      },
      {
        "heading": "Check the building classification",
        "body": "Ask the permitting office which rules apply to the building and proposed work. Do not classify a building from its roof material or number of stories alone. Use the [permit planning guide](/tools/permit-lookup/) to prepare that conversation and the [commercial roofing guide](/guides/commercial-flat-roof-maintenance-oregon/) for questions about project coordination."
      }
    ]
  }
]
export function getServiceBySlug(slug:string) { return services.find(s=>s.slug===slug) }
export function getStaticServicePaths() { return services.map(s=>({service:s.slug})) }
