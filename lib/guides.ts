export interface GuideSection {
  title: string;
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
  description: string;
  heroDescription: string;
  category: GuideCategory;
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
    slug: "how-to-choose-roofing-contractor-oregon",
    category: "hiring" as const,
    title: "How to Choose a Roofing Contractor in Oregon",
    description:
      "Learn what to look for when hiring a roofing contractor in Oregon, from CCB licensing and insurance verification to evaluating bids, reading reviews, and avoiding common scams.",
    heroDescription:
      "Hiring the wrong roofing contractor can cost you thousands in poor workmanship, voided warranties, and unfinished projects. This guide walks Oregon homeowners through every step of finding, vetting, and hiring a qualified roofer you can trust.",
    sections: [
      {
        title: "Verify Oregon CCB Licensing",
        body: "Every roofing contractor working in Oregon must hold an active license from the Construction Contractors Board (CCB). The CCB license confirms that the contractor carries a surety bond, has workers' compensation insurance, and meets continuing education requirements. You can verify any contractor's license status for free on the CCB website by searching their name or license number. Never hire a contractor who cannot provide a valid CCB number. Unlicensed work leaves you without recourse if something goes wrong, and it may violate your homeowner's insurance policy.",
      },
      {
        title: "Confirm Insurance Coverage",
        body: "Beyond the CCB bond, a reputable roofing contractor should carry general liability insurance with a minimum of $1 million per occurrence and workers' compensation coverage for all employees. Ask for a certificate of insurance and verify it directly with the insurance carrier. General liability protects your property if the crew causes damage during the project. Workers' compensation protects you from liability if a worker is injured on your roof. If a contractor cannot produce current insurance certificates, move on to the next candidate regardless of how competitive their bid may be.",
      },
      {
        title: "Get Multiple Written Estimates",
        body: "Collect at least three written estimates from different contractors before making a decision. Each estimate should itemize the scope of work, materials to be used (including brand and product line), labor costs, timeline, payment schedule, and warranty terms. Be wary of estimates that are dramatically lower than others, as they often indicate corner-cutting on materials, unlicensed subcontractors, or hidden upcharges that appear after work begins. A detailed written estimate protects both parties and sets clear expectations for the project.",
      },
      {
        title: "Check References and Online Reviews",
        body: "Ask each contractor for at least three references from recent projects similar to yours in scope and roofing material. Call those references and ask about communication, timeline adherence, cleanup, and whether they would hire the contractor again. Supplement reference checks with online reviews on Google Business Profile, the Better Business Bureau, and Yelp. Look for patterns rather than individual reviews. A contractor with hundreds of reviews averaging 4.5 stars is generally a safer bet than one with five perfect reviews and no other online presence.",
      },
      {
        title: "Understand the Contract Before Signing",
        body: "Oregon law requires roofing contracts over $2,000 to be in writing. Your contract should include the full scope of work, material specifications, start and completion dates, total price with a payment schedule, warranty details for both materials and labor, and the contractor's CCB license number. Never sign a contract that requires more than one-third of the total price as a down payment. Oregon's Consumer Protection Act gives you three business days to cancel a home improvement contract signed at your residence, so take time to review everything carefully before committing.",
      },
      {
        title: "Evaluate Warranty Offerings",
        body: "Roofing warranties come in two parts: the manufacturer's warranty on materials and the contractor's warranty on workmanship. Manufacturer warranties typically range from 25 years to lifetime coverage depending on the product, but they only cover defective materials, not installation errors. The workmanship warranty from your contractor covers labor-related failures and typically ranges from 5 to 15 years. Some manufacturers offer enhanced warranties when their certified installers perform the work, which can extend coverage to include both materials and labor. Always get warranty terms in writing before work begins.",
      },
      {
        title: "Red Flags to Watch For",
        body: "Several warning signs should cause you to disqualify a contractor immediately. Door-to-door solicitation following a storm is a classic tactic used by storm chasers who do subpar work and leave town. Requests for full payment upfront, cash-only transactions, and reluctance to provide a written contract are all serious red flags. Contractors who pressure you to sign immediately, offer to waive your insurance deductible, or suggest filing inflated insurance claims are engaging in practices that can leave you legally and financially exposed. A trustworthy contractor will welcome your due diligence and answer questions patiently.",
      },
    ],
    faqs: [
      {
        question: "How do I verify an Oregon roofing contractor's CCB license?",
        answer:
          "Visit the Oregon CCB website at ccb.oregon.gov and use the license search tool. Enter the contractor's name or license number to check their status, bond information, complaint history, and insurance standing. All of this information is available to the public at no cost.",
      },
      {
        question: "How much should I pay upfront for a roofing project?",
        answer:
          "Oregon law does not cap down payments, but industry best practice recommends paying no more than one-third of the total project cost upfront. The remaining balance should be tied to project milestones or due upon satisfactory completion. Avoid contractors who demand full payment before starting work.",
      },
      {
        question: "What is the difference between a manufacturer warranty and a workmanship warranty?",
        answer:
          "A manufacturer warranty covers defects in the roofing materials themselves, such as premature shingle failure or delamination. A workmanship warranty from the contractor covers errors in installation, such as improper flashing or nailing. You need both warranties for complete protection, and you should get the terms of each in writing before the project begins.",
      },
      {
        question: "Should I choose the cheapest roofing bid?",
        answer:
          "Rarely. The cheapest bid often signals that the contractor is cutting corners on materials, using unlicensed subcontractors, or plans to charge extras once the project is underway. Compare bids line by line and make sure each contractor is quoting the same scope of work and material quality. The best value is usually found in the mid-range of competitive bids from licensed, insured contractors.",
      },
      {
        question: "How long should a roofing contractor's workmanship warranty last?",
        answer:
          "A reputable roofing contractor in Oregon should offer a minimum of 5 years on workmanship, with many quality contractors offering 10 to 15 years. Be cautious of lifetime workmanship warranties from small companies, as the warranty is only as reliable as the company standing behind it. Ask how long the contractor has been in business and whether the warranty is transferable if you sell your home.",
      },
    ],
  },
  {
    slug: "oregon-roof-maintenance-guide",
    category: "maintenance" as const,
    title: "Oregon Roof Maintenance Guide",
    description:
      "A comprehensive seasonal maintenance guide for Oregon homeowners covering gutter cleaning, moss prevention, inspection schedules, and proactive steps to extend your roof's lifespan.",
    heroDescription:
      "Oregon's wet climate, heavy tree cover, and seasonal storms create constant challenges for residential roofs. Regular maintenance is the single most effective way to extend your roof's lifespan, prevent costly repairs, and protect your home's interior from water damage.",
    sections: [
      {
        title: "Why Maintenance Matters in Oregon",
        body: "Oregon receives an average of 43 inches of rainfall annually in the Willamette Valley, with coastal areas exceeding 70 inches. This persistent moisture, combined with mild temperatures, creates ideal conditions for moss, algae, and lichen growth that can degrade roofing materials. Homes surrounded by Douglas fir, Western red cedar, and big-leaf maple trees face additional challenges from falling needles, leaves, and branches. Without regular maintenance, minor issues like a lifted shingle or a clogged gutter can escalate into deck rot, interior leaks, and mold growth within a single rainy season. Proactive maintenance costs a fraction of the emergency repairs that result from neglect.",
      },
      {
        title: "Spring Maintenance Checklist",
        body: "Spring is the best time to assess winter damage and prepare for the dry season ahead. Start with a ground-level visual inspection using binoculars to look for missing, cracked, or curling shingles. Check all visible flashing around chimneys, vents, and skylights for gaps or rust. Clean gutters and downspouts thoroughly, removing all debris and flushing with a hose to confirm proper flow. Trim tree branches that hang within six feet of the roof surface to reduce debris accumulation and discourage animal access. If you notice moss or algae growth, spring is the ideal time to apply a zinc sulfate or potassium salt treatment before the growth season accelerates.",
      },
      {
        title: "Summer Maintenance Tasks",
        body: "Oregon's dry summer months from July through September provide the best conditions for hands-on roof maintenance. Schedule a professional inspection if your roof is more than ten years old or if you noticed any concerns during your spring visual check. Address minor repairs such as replacing cracked caulk around flashings, resealing pipe boots, and replacing individual damaged shingles while the weather is dry and materials bond properly. Check attic ventilation to ensure ridge vents, soffit vents, and gable vents are unobstructed. Proper ventilation prevents heat buildup that accelerates shingle aging and reduces moisture condensation that leads to deck rot during the wet months.",
      },
      {
        title: "Fall Preparation for Rain Season",
        body: "Fall maintenance is critical in Oregon because it is your last opportunity to address issues before five to six months of steady rain. Clean gutters and downspouts again after leaf drop is complete, typically in late October or November. Inspect and clear all roof valleys where debris tends to collect and dam water. Check that all gutter seams are sealed and that downspouts direct water at least four feet away from the foundation. Apply moss prevention treatments if you did not do so in spring. Verify that attic insulation has not shifted or compressed, as proper insulation prevents ice dams in higher-elevation areas like Bend, Sisters, and Mount Hood communities.",
      },
      {
        title: "Winter Storm Response",
        body: "During Oregon's rainy season from November through March, avoid climbing on a wet roof. Instead, monitor for warning signs from inside your home: water stains on ceilings, musty odors in the attic, and daylight visible through the roof deck. After any significant storm with winds exceeding 50 mph, perform a ground-level inspection looking for missing shingles, dislodged flashing, or fallen branches on the roof surface. If you identify storm damage, document it with photographs and contact a licensed contractor for a professional assessment. Many contractors offer emergency tarping services to prevent further damage while you schedule permanent repairs.",
      },
      {
        title: "Moss and Algae Prevention",
        body: "Moss is the most common roof problem in western Oregon. It thrives on north-facing slopes and shaded areas where moisture persists. Left untreated, moss roots grow beneath shingle edges and lift them, allowing water penetration. Prevention is far more effective than removal. Install zinc or copper strips along the ridge line; rainwater carries dissolved metal ions down the roof surface, inhibiting moss growth. Apply granular zinc sulfate at a rate of three pounds per 600 square feet of roof area in early spring and again in late fall. Avoid pressure washing, which strips the protective granules from asphalt shingles and significantly shortens their lifespan.",
      },
      {
        title: "Gutter Maintenance and Drainage",
        body: "Gutters are an integral part of your roofing system and require year-round attention in Oregon. Clogged gutters cause water to back up under the roof edge, rotting fascia boards and saturating the soffit. Clean gutters at minimum twice a year, once in spring and once after fall leaf drop. Homes near coniferous trees may need quarterly cleaning due to needle accumulation. Inspect gutter slope to ensure water flows toward downspouts without pooling. Replace any sections with rust, cracks, or separated seams. Consider gutter guards if your home is heavily shaded, but understand that guards reduce cleaning frequency rather than eliminate it entirely. Extend downspouts to discharge water well away from your foundation.",
      },
      {
        title: "When to Call a Professional",
        body: "While homeowners can handle ground-level inspections, gutter cleaning, and moss treatment, certain maintenance tasks require a licensed professional. Schedule a professional inspection every three to five years for roofs under 15 years old and annually for older roofs. Call a professional immediately if you notice sagging in the roof deck, widespread shingle damage, persistent leaks despite visible repairs, or granule loss that exposes the shingle substrate. Any work that requires walking on the roof should be left to professionals who have proper safety equipment, insurance, and experience working on Oregon's steep and often wet roof surfaces.",
      },
    ],
    faqs: [
      {
        question: "How often should I have my roof professionally inspected in Oregon?",
        answer:
          "For roofs less than 15 years old, a professional inspection every three to five years is sufficient if you perform regular visual checks yourself. Roofs older than 15 years should be inspected annually. Always schedule an inspection after severe storms with high winds or hail.",
      },
      {
        question: "Is it safe to pressure wash moss off my roof?",
        answer:
          "No. Pressure washing strips the protective granules from asphalt shingles, dramatically reducing their lifespan. Use a soft wash method with a moss-killing solution, or apply zinc sulfate granules and allow the moss to die naturally over several weeks. A soft bristle brush can be used gently on stubborn patches after treatment.",
      },
      {
        question: "How do I prevent ice dams on my Oregon roof?",
        answer:
          "Ice dams form when heat escaping through the roof melts snow, which then refreezes at the colder eaves. Prevention starts in the attic: ensure insulation levels meet current Oregon code (R-49 for most zones), seal all air leaks around fixtures and ductwork, and verify that ventilation channels are clear from soffit to ridge. Homes in Bend, Sisters, and mountain communities should prioritize these measures.",
      },
      {
        question: "How much does annual roof maintenance cost in Oregon?",
        answer:
          "Basic annual maintenance including two gutter cleanings and a moss treatment typically costs between $300 and $600 for a standard single-family home. A professional inspection adds $150 to $350. These costs are modest compared to the $5,000 to $15,000 that deferred maintenance often produces in emergency repairs or premature replacement.",
      },
      {
        question: "Can I walk on my roof to inspect it myself?",
        answer:
          "It is not recommended for homeowners to walk on their roofs. Oregon roofs are frequently wet, steep, or covered with moss, all of which create serious fall hazards. Use binoculars from the ground for visual inspections and hire a licensed professional for any work that requires roof access. If you must access your roof, never do so alone, in wet conditions, or without proper fall protection.",
      },
    ],
  },
  {
    slug: "understanding-oregon-roofing-costs",
    category: "costs" as const,
    title: "Understanding Oregon Roofing Costs",
    description:
      "A detailed breakdown of roofing costs in Oregon, including material prices, labor rates, regional pricing differences, and factors that influence your total project cost.",
    heroDescription:
      "Roofing costs in Oregon vary significantly based on material choice, home size, roof complexity, and geographic location. This guide gives you realistic price ranges, explains what drives costs up or down, and helps you budget accurately for your roofing project.",
    sections: [
      {
        title: "Average Roofing Costs by Material",
        body: "Oregon homeowners have several proven roofing material options, each with distinct price ranges. Architectural asphalt shingles, the most common choice, cost between $350 and $500 per roofing square (100 square feet) installed. Standing seam metal roofing runs $700 to $1,200 per square and is increasingly popular in areas with heavy rain, snow, or wildfire risk. Cedar shake ranges from $600 to $900 per square and remains a signature Pacific Northwest choice for its natural beauty. Flat roofing membranes such as TPO and EPDM cost $350 to $700 per square, primarily used on low-slope residential sections and commercial buildings. These ranges include materials, labor, and standard waste factors for a typical Oregon residential project.",
      },
      {
        title: "Labor Rates Across Oregon",
        body: "Labor typically accounts for 40 to 60 percent of your total roofing cost. The Portland metro area commands the highest labor rates in the state due to high demand, cost of living, and the concentration of experienced contractors. Expect labor rates of $75 to $120 per roofing square in Portland, Lake Oswego, West Linn, and surrounding suburbs. Mid-market areas like Salem, Eugene, and Corvallis see rates of $55 to $90 per square. Coastal communities pay a premium of 10 to 20 percent above inland rates due to limited contractor availability and the additional time required for weather-resistant installation details. Eastern Oregon offers the lowest labor rates at $45 to $75 per square, reflecting the lower cost of living and reduced demand.",
      },
      {
        title: "Roof Size and Complexity Factors",
        body: "Your roof's total square footage is the primary cost driver, but complexity has an equally significant impact. A simple gable roof with two planes and no dormers is the least expensive to replace because it requires minimal cutting, flashing, and detail work. Each additional feature adds cost: dormers, valleys, hips, skylights, chimneys, and multi-level transitions all require more labor and materials. A complex roof with multiple dormers and steep pitches can cost 30 to 50 percent more per square foot than a simple roof of the same area. Roof pitch also matters, as anything steeper than 8:12 requires specialized safety equipment and slower work, adding 15 to 25 percent to labor costs.",
      },
      {
        title: "Regional Price Differences",
        body: "Oregon's geographic diversity creates meaningful regional price variations. The Portland metro area is the most expensive market, with average full replacement costs ranging from $10,000 to $18,000 for a standard home. Lake Oswego, West Linn, and Happy Valley sit at the top of this range due to larger homes and premium material expectations. The Willamette Valley from Salem to Eugene averages $8,500 to $15,000. Coastal cities from Astoria to Coos Bay average $9,000 to $16,000, with the premium reflecting limited contractor pools and harsh weather requirements. Central Oregon around Bend and Sisters averages $10,000 to $18,000 due to snow load engineering and a booming housing market. Eastern Oregon from Pendleton to Baker City offers the lowest costs at $7,000 to $13,000.",
      },
      {
        title: "Hidden Costs and Common Upcharges",
        body: "Several factors can increase your final cost beyond the initial estimate. Tear-off and disposal of existing materials adds $100 to $150 per square if not included in the base estimate. Deck repairs from rot or water damage are the most common surprise cost, averaging $50 to $100 per sheet of plywood replaced. Code-required upgrades such as adding ice and water shield in valleys and eaves, upgrading ventilation, or installing drip edge flashing may be necessary to pass inspection. Permit fees in Oregon range from $150 to $500 depending on the jurisdiction. Access difficulty from landscaping, multi-story elevation, or steep driveways can add 5 to 15 percent to labor costs. Always ask your contractor to identify potential additional costs before signing the contract.",
      },
      {
        title: "How to Get Accurate Estimates",
        body: "The most reliable way to understand your specific roofing cost is to get three written estimates from licensed Oregon contractors. Each estimate should include an itemized breakdown of materials, labor, tear-off, disposal, permits, and any anticipated additional work. Avoid phone or email-only estimates, as accurate roofing pricing requires an in-person inspection of your current roof condition, deck integrity, ventilation, and access situation. When comparing estimates, ensure each contractor is quoting the same material grade and scope of work. The lowest estimate is not automatically the best value if it specifies lower-quality materials or excludes work items that the other estimates include.",
      },
      {
        title: "Financing and Insurance Considerations",
        body: "Many Oregon roofing contractors offer financing through third-party lenders with terms ranging from 12 to 84 months. Interest rates vary, but promotional zero-percent financing for 12 to 18 months is common on projects over $10,000. Homeowner's insurance covers roof damage from covered perils such as windstorms, hail, and fallen trees, but does not cover normal wear and aging. If filing an insurance claim, your contractor can often meet with the adjuster to ensure the scope of damage is accurately assessed. Oregon homeowners should review their policy's actual cash value versus replacement cost provisions, as this distinction significantly affects the payout on an aging roof. Some insurers offer premium discounts for impact-resistant roofing materials, which can offset a portion of the higher upfront cost over time.",
      },
      {
        title: "Budgeting for Long-Term Value",
        body: "Choosing the cheapest roofing option rarely delivers the best long-term value. A standard architectural shingle roof costing $12,000 with a 25-year lifespan works out to roughly $480 per year. A standing seam metal roof at $20,000 with a 50-year lifespan costs approximately $400 per year and requires far less maintenance. Factor in energy savings from reflective metal coatings, reduced maintenance costs, and increased home resale value when comparing options. Oregon homeowners who plan to stay in their home for more than 15 years often find that investing in a premium roofing material delivers the lowest total cost of ownership. Discuss your timeline and budget with your contractor to find the material that best balances upfront cost with long-term performance.",
      },
    ],
    faqs: [
      {
        question: "What is the average cost to replace a roof in Oregon?",
        answer:
          "The average cost for a full roof replacement on a standard Oregon home ranges from $8,500 to $18,000 for architectural asphalt shingles, depending on the size of the home, roof complexity, and geographic location. Metal roofing averages $12,000 to $28,000, and cedar shake runs $15,000 to $30,000. These figures include materials, labor, tear-off, and disposal.",
      },
      {
        question: "Why do roofing costs vary so much between Oregon cities?",
        answer:
          "Cost variation reflects differences in contractor labor rates, local permitting requirements, material delivery costs, and regional demand. Portland metro areas have the highest costs due to the concentration of demand and higher cost of living. Eastern Oregon and smaller rural communities have lower labor rates and less competition for contractor time, resulting in lower overall project costs.",
      },
      {
        question: "Does a new roof increase my home's value in Oregon?",
        answer:
          "Yes. According to national remodeling data, a new asphalt shingle roof recovers approximately 60 to 70 percent of its cost in increased home value at resale. In competitive Oregon markets like Portland, Bend, and the coast, a new roof can recover even more because buyers are reluctant to purchase homes with aging roofs that will need near-term replacement.",
      },
      {
        question: "Should I repair or replace my Oregon roof?",
        answer:
          "If your roof is less than 15 years old and the damage is localized to a specific area, repair is usually the more cost-effective option. If the roof is approaching 20 years old, has widespread granule loss, or has experienced multiple repairs in recent years, full replacement is generally the better investment. A licensed contractor can inspect your roof and provide a professional recommendation based on its actual condition.",
      },
      {
        question: "Are permits required for roofing work in Oregon?",
        answer:
          "Oregon requires permits for full roof replacements in most jurisdictions. Some areas also require permits for significant repairs. Permit fees typically range from $150 to $500. Your roofing contractor should handle the permit application and any required inspections as part of the project. Always confirm permit responsibility is included in your contract.",
      },
    ],
  },
,
  {
    slug: "oregon-moss-removal-roof-guide",
    category: "maintenance" as const,
    title: "Moss Removal & Prevention for Oregon Roofs",
    description:
      "A complete guide to identifying, removing, and preventing moss and algae on Oregon roofs. Covers safe removal methods, zinc and copper treatments, and city-by-city risk levels across the state.",
    heroDescription:
      "Oregon's damp climate makes moss the single most common threat to residential roofs in the state. Left unchecked, moss roots lift shingle edges, trap moisture against the deck, and can shorten a roof's lifespan by a decade or more. This guide covers every step of identification, safe removal, and long-term prevention — whether you are in Portland, Astoria, or Bend.",
    sections: [
      {
        title: "Why Oregon Roofs Are Especially Vulnerable",
        body: "Oregon's Willamette Valley averages over 43 inches of rain annually, with the Coast Range exceeding 70 inches. Mild winters that rarely drop below freezing mean moisture persists on roof surfaces for months at a time without the freeze-thaw cycles that naturally slow moss growth in colder climates. Add the dense canopy of Douglas fir, Western red cedar, and big-leaf maple that shades roofs throughout much of western Oregon, and you have near-perfect conditions for moss, algae, and lichen. North and west-facing roof slopes are highest risk, as they receive the least direct sun and stay wet the longest. Coastal cities like Astoria, Seaside, and Newport see the most aggressive growth, while eastern Oregon cities like Bend and Pendleton have significantly lower moss risk due to their drier climates.",
      },
      {
        title: "Identifying Moss vs. Algae vs. Lichen",
        body: "Accurate identification matters because each organism requires a different treatment approach. Moss appears as a thick, green, carpet-like growth that stands up from the shingle surface. It actively roots into the granule layer and can lift shingle tabs when growth is significant. Algae presents as black or dark gray streaking — often mistaken for dirt or weathering — and is caused by Gloeocapsa magma bacteria feeding on the limestone filler in asphalt shingles. It does not root as deeply as moss but discolors the roof and can retain moisture. Lichen is the hardest to remove: a symbiotic organism combining algae and fungi that bonds to the shingle surface with root-like structures called rhizines. Lichen removal requires more aggressive treatment and longer dwell times than moss or algae.",
      },
      {
        title: "Safe DIY Removal Methods",
        body: "If growth is caught early, homeowners can address moss and algae without professional intervention. The safest method is a low-pressure spray of a purpose-formulated roof cleaning solution — either a sodium hypochlorite blend at a 50:50 dilution with water or a commercially available oxygen bleach product. Apply on a cool, overcast day to prevent rapid evaporation, spray from the ridge down to avoid lifting shingles, and allow the solution to dwell for 20 to 30 minutes before rinsing with a garden hose at low pressure. Never use a pressure washer on asphalt shingles: the high-pressure stream strips protective granules, voids manufacturer warranties, and can force water under the shingle layer. For heavy moss, a soft bristle brush can be used to gently dislodge growth after the cleaning solution has done its work — always brush down the slope, never against the shingle direction.",
      },
      {
        title: "When to Call a Professional",
        body: "Professional roof cleaning is the right call when moss or lichen covers more than 30 percent of the roof surface, when the roof is older than 15 years, or when the slope is steep enough to make safe DIY access impossible. Licensed Oregon roofing contractors use commercial-grade low-pressure soft wash systems that apply treatments more evenly than DIY methods and can treat hard-to-reach valleys and ridge areas safely. Professional cleaning typically costs $250 to $600 for a standard Oregon home, depending on roof size and growth severity. Combine cleaning with a treatment application during the same visit for maximum efficiency. Ask contractors whether they carry a surety bond and general liability insurance before any work begins.",
      },
      {
        title: "Zinc and Copper Prevention Strips",
        body: "The most effective long-term prevention method is the installation of zinc or copper strip along the ridge line. When rain falls on the metal strip, it carries dissolved zinc or copper ions down the roof surface. These metal ions are toxic to moss, algae, and lichen at very low concentrations. Zinc is the more cost-effective option at $1.50 to $3.00 per linear foot installed, while copper is more durable and aesthetically neutral on dark roofs. The strips work best on slopes where the treated water can flow the full length of the roof without interruption. For complex roof designs with multiple hips, valleys, and dormers, additional strip sections placed below each ridge segment improve coverage. Expect noticeable results within one to two full rainy seasons as residual growth dies back and new growth is inhibited.",
      },
      {
        title: "Granular Zinc Sulfate Treatments",
        body: "For homeowners seeking a seasonal maintenance product without permanent hardware installation, granular zinc sulfate is available at most Oregon hardware stores and garden centers. Apply at a rate of approximately three pounds per 600 square feet of roof area by broadcasting granules along the ridge and upper third of each slope. Fall application before the rainy season begins is the most effective timing. Rain dissolves the granules slowly, carrying zinc sulfate down the slope throughout the wet months. A spring application provides additional protection as growth accelerates with warming temperatures. Granular treatments are not a substitute for cleaning an already heavily affected roof but are an excellent preventive tool when used on a clean surface. Keep product away from gutters that drain to vegetable gardens or water features, as zinc can be harmful to aquatic life in concentrated runoff.",
      },
      {
        title: "Maintenance Schedule for Oregon Homeowners",
        body: "A consistent annual schedule is the lowest-cost way to manage moss in Oregon. In early October, before the rainy season begins, perform a visual inspection from ground level and apply granular zinc sulfate treatment to the ridge and upper slopes. In late March or April, after the bulk of rain has passed, inspect for new growth and assess whether spot treatment or professional cleaning is warranted. Every three to five years, budget for a professional soft wash to reset the roof surface and follow immediately with a ridge strip installation or granular treatment. Homes in Portland, Corvallis, Eugene, and coastal communities should be on the shorter three-year cycle. Homes in Bend, Medford, and eastern Oregon communities can typically extend to a five-year professional cleaning interval given their lower annual rainfall.",
      },
    ],
    faqs: [
      {
        question: "Is moss on my roof actually damaging it?",
        answer:
          "Yes. Moss roots penetrate the granule layer of asphalt shingles and grow beneath shingle tabs, lifting and separating them from the roof deck. This allows water to infiltrate under the shingles, leading to deck rot, interior leaks, and mold growth in the attic. In advanced cases, moss-damaged roofs may need full replacement years ahead of their expected lifespan. Early removal and consistent prevention are far less expensive than the repairs that moss damage causes.",
      },
      {
        question: "Can I use bleach to kill moss on my roof?",
        answer:
          "A diluted sodium hypochlorite solution is effective at killing moss and algae and is widely used by professional roof cleaners. Mix one part household bleach with one part water, apply with a low-pressure sprayer, allow to dwell for 20 to 30 minutes, and rinse thoroughly. Protect landscaping below gutters during application and rinse the surrounding area with clean water afterward. Avoid full-strength bleach, which can accelerate granule loss on asphalt shingles.",
      },
      {
        question: "How often should I treat my Oregon roof for moss?",
        answer:
          "In western Oregon, annual preventive treatment is recommended for most homes. Apply granular zinc sulfate in early fall and again in spring. Professional cleaning every three to five years resets the surface and removes accumulated growth that preventive treatments cannot address. Homes in Portland, Corvallis, and coastal areas should treat more frequently than homes in drier eastern Oregon cities.",
      },
      {
        question: "Will a zinc strip prevent moss on my entire roof?",
        answer:
          "Zinc strips installed at the ridge are highly effective for the upper half to two-thirds of a roof slope on a typical single-story home. On longer slopes or complex roof designs, the zinc concentration diminishes before reaching the lower sections of the roof. For full coverage, install additional strips below dormers and along lower ridges, or supplement with granular zinc sulfate treatments on lower roof sections.",
      },
      {
        question: "What is the difference between moss removal and moss prevention?",
        answer:
          "Removal addresses existing growth that is already on the roof, using cleaning solutions and soft brushing to eliminate live and dead organisms. Prevention stops new growth from establishing on a clean or recently treated surface, using zinc strips or granular treatments that release metal ions in rainwater. Both are necessary: removal without follow-up prevention results in regrowth within one to two seasons in Oregon's climate.",
      },
    ],
  },
  {
    slug: "storm-damage-roof-insurance-oregon",
    category: "damage" as const,
    title: "Storm Damage & Insurance Claims for Oregon Roofs",
    description:
      "Step-by-step guidance for Oregon homeowners on documenting storm damage, navigating insurance claims, understanding coverage limits, and hiring the right contractor for repairs.",
    heroDescription:
      "Oregon's weather events — from Willamette Valley windstorms to Cascades snowload and coastal gales — can damage roofs with little warning. The decisions you make in the first 24 to 72 hours after a storm directly affect your insurance settlement and the quality of repairs you receive. This guide walks you through every stage, from initial documentation to final contractor sign-off.",
    sections: [
      {
        title: "Immediate Steps After a Storm",
        body: "Your first priority is safety. Do not access the roof while it is wet, icy, or while wind is still active. From ground level, photograph the exterior of your home from all four corners using a phone camera with location data enabled — the timestamp and geolocation strengthen your insurance documentation. Look for obvious visible damage: missing shingles, displaced ridge cap, damaged gutters, fallen branches on the roof surface, and any debris. Inside the home, inspect the attic with a flashlight for daylight penetrating through the deck, water staining on the sheathing, or active drips. Place buckets as needed and photograph all interior water infiltration with a timestamp. If the roof has a large breach from a fallen tree or structural damage, contact your insurer immediately to ask about emergency tarping coverage before nightfall.",
      },
      {
        title: "Documenting Damage for Your Claim",
        body: "Thorough documentation is the single most important factor in a successful insurance claim. Photograph every area of visible damage in close-up and contextual shots. Shoot from multiple angles so adjusters can understand the scope without requiring an immediate site visit. If it is safe to do so and you have a drone or can access a second-floor window, capture aerial or elevated shots of the roof surface. Create a written log with the date and time of the storm, a description of weather conditions (reference NOAA storm records or local weather service data for your zip code), a room-by-room inventory of interior damage, and the estimated age of any damaged items. Keep all receipts for emergency materials like tarps, buckets, or temporary plywood sheathing. These emergency mitigation costs are typically reimbursable under your homeowner's policy.",
      },
      {
        title: "Understanding Your Oregon Homeowner's Policy",
        body: "Most standard Oregon homeowner's policies cover storm damage from wind and hail under the dwelling coverage section, subject to your deductible. Policies differ significantly on two critical points: actual cash value versus replacement cost value, and how your deductible is calculated. An actual cash value policy pays the depreciated value of damaged materials — a 15-year-old shingle roof may receive significantly less than replacement cost. A replacement cost value policy pays what it actually costs to replace the damaged portion with materials of like kind and quality. In high-wind areas of Oregon, some insurers apply a separate wind or named-storm deductible that is a percentage of your dwelling coverage rather than a flat dollar amount. Review your declarations page carefully before filing a claim. If you do not understand your coverage, an independent insurance agent can review it with you at no cost.",
      },
      {
        title: "Filing the Claim: Step by Step",
        body: "Contact your insurer as soon as possible after the storm — most policies require prompt notification and may deny claims for damage reported long after the event. When you call, have your policy number, the date and nature of the event, and your preliminary documentation ready. The insurer will assign a claim number and schedule an adjuster inspection, typically within five to ten business days for standard claims and within 24 to 48 hours for major declared weather events. You have the right to have your own licensed roofing contractor present during the adjuster inspection. This is strongly recommended, as contractors can identify damage that adjusters miss, particularly on complex roofs or when hail damage is subtle. Once the adjuster issues a scope of loss and settlement estimate, review it carefully against a contractor estimate before accepting.",
      },
      {
        title: "Working With a Roofing Contractor on an Insurance Claim",
        body: "Choose your roofing contractor independently rather than accepting unsolicited offers from contractors who appear door-to-door after a storm. Storm chasers follow weather events across the country and typically leave the area before warranty claims can be addressed. Select a contractor from our CCB-verified network who can provide local references, a physical Oregon business address, and documentation of active general liability and workers' compensation insurance. A reputable contractor will provide a detailed written estimate that matches the scope of the insurance settlement or documents additional damage not captured in the adjuster's assessment. They should never ask you to sign an assignment of benefits form that transfers control of your insurance proceeds to the contractor. Payment is typically structured as an initial draw when materials are delivered, with the balance due upon satisfactory completion.",
      },
      {
        title: "Supplementing a Low Insurance Settlement",
        body: "If the adjuster's settlement appears lower than the actual cost of repair, you have options. First, obtain a detailed written estimate from a licensed contractor that itemizes all necessary work. Present this to your insurer as a formal supplement request, identifying specific line items where the adjuster's estimate is insufficient. Insurers routinely issue supplements when presented with documented evidence of undervalued or overlooked damage. If the gap is significant and supplementing does not resolve it, most Oregon homeowner's policies include an appraisal clause that allows each party to hire an independent appraiser, with disputes resolved by an agreed umpire. As a last resort, the Oregon Division of Financial Regulation handles complaints against insurance companies and can intervene in bad-faith claim handling situations.",
      },
      {
        title: "Preventing Future Storm Damage",
        body: "The most effective protection against storm damage is a well-maintained roof with intact flashing, sealed penetrations, and no pre-existing vulnerabilities that storms can exploit. After completing repairs, ask your contractor to inspect all flashing at chimneys, skylights, vents, and valleys for early signs of failure. In high-wind coastal areas like Astoria, Newport, and Lincoln City, consider impact-resistant shingles rated Class 4 for hail and Class F for wind when replacing damaged sections. In the Cascades and higher-elevation communities like Sisters and Hood River, ensure attic insulation and ventilation meet current standards to prevent ice dam formation during freeze-thaw cycles. Keep trees trimmed to prevent branch contact with the roof surface, and install gutter guards to prevent debris accumulation that causes water backup during heavy rainfall events.",
      },
    ],
    faqs: [
      {
        question: "Does homeowner's insurance cover moss and algae damage in Oregon?",
        answer:
          "No. Insurance policies cover sudden and accidental damage from storm events, not gradual deterioration from moss, algae, or lack of maintenance. If an adjuster determines that pre-existing moss damage contributed to a storm claim, they may reduce or deny that portion of the claim on the basis of maintenance neglect. Keeping your roof clean and treated is not just good practice — it protects your coverage.",
      },
      {
        question: "How long do I have to file a roof damage claim in Oregon?",
        answer:
          "Oregon law gives homeowners one year from the date of loss to file a claim under most standard homeowner's policies, but individual policies may have shorter notification requirements. File as soon as you identify storm damage — delays can result in claim denial and make it harder to document that damage is storm-related rather than from wear over time. When in doubt, call your insurer to ask about notification requirements before deciding whether to file.",
      },
      {
        question: "Should I get a contractor estimate before calling my insurer?",
        answer:
          "It is helpful to have a rough contractor assessment before calling, but do not wait to notify your insurer while waiting for estimates. Notify the insurer first to establish the claim date, then schedule your contractor assessment before or during the adjuster inspection. Having a contractor present during the adjuster visit is generally the most effective approach for ensuring all damage is captured in the initial settlement.",
      },
      {
        question: "What is an assignment of benefits form and should I sign one?",
        answer:
          "An assignment of benefits (AOB) form transfers your rights to the insurance proceeds directly to the contractor, removing you from the claims process. Oregon has seen significant fraud associated with AOB arrangements. Avoid signing them. A legitimate contractor will provide their services and be paid after the work is completed and you are satisfied, not through a transfer of your insurance rights. If a contractor insists on an AOB before starting work, find a different contractor.",
      },
      {
        question: "How do I know if I have hail damage on my roof?",
        answer:
          "Hail damage on asphalt shingles presents as random circular impact marks that remove the protective granule layer, exposing the dark asphalt substrate beneath. Unlike wear-related granule loss which appears uniform across the slope, hail impacts are scattered randomly across the surface. Check metal surfaces — gutters, downspouts, fascia, and AC units — for fresh dents, which confirm hail was present. Soft metal flashing dents easily and is a reliable hail indicator. If you see these signs after a storm, contact a licensed contractor for an inspection before contacting your insurer.",
      },
    ],
  },
  {
    slug: "commercial-flat-roof-maintenance-oregon",
    category: "commercial" as const,
    title: "Commercial & Flat Roof Maintenance in Oregon",
    description:
      "A practical maintenance guide for Oregon commercial property owners and facility managers covering TPO, EPDM, and modified bitumen flat roofing systems, inspection schedules, drainage management, and finding qualified Oregon contractors.",
    heroDescription:
      "Flat and low-slope roofs are the most common commercial roofing system in Oregon, and they require a fundamentally different maintenance approach than residential sloped roofs. Without the natural drainage of a pitched surface, flat roofs depend entirely on proper membrane integrity, functioning drains, and regular inspection to prevent water infiltration. This guide gives Oregon commercial property owners and facility managers the knowledge to maintain their roofing systems cost-effectively.",
    sections: [
      {
        title: "Understanding Flat Roof Systems Used in Oregon",
        body: "Commercial flat roofing in Oregon is dominated by three primary membrane systems, each with distinct maintenance requirements. TPO (thermoplastic polyolefin) is the most widely installed new commercial membrane in Oregon due to its energy efficiency, heat-welded seams, and relatively low installed cost of $5 to $8 per square foot. It performs well in Oregon's wet climate but can be vulnerable to UV degradation over time if the reflective surface is not kept clean. EPDM (ethylene propylene diene terpolymer), commonly called rubber roofing, is the incumbent system on most commercial buildings installed before 2000. EPDM is highly durable, typically lasting 25 to 30 years with proper maintenance, but its adhesive seams and flashing details require regular inspection as the adhesive ages. Modified bitumen is an asphalt-based system applied in layers and is often found on older Oregon commercial and multi-family buildings. It is repairable with compatible materials and tolerant of ponding water but requires more frequent professional inspection than TPO or EPDM.",
      },
      {
        title: "Bi-Annual Inspection Schedule",
        body: "Commercial flat roofs in Oregon should receive a formal inspection twice per year: once in spring after the rainy season to assess winter damage, and once in fall before the rains begin to address any vulnerabilities before months of sustained moisture exposure. Spring inspections focus on identifying membrane damage caused by debris, hail, or wind-lifted flashings over winter. Fall inspections prioritize drain clearing, seam integrity, and flashing condition to ensure the system can handle six months of continuous rain. Each inspection should be documented with photographs and a written condition report, which creates a maintenance record that is essential for insurance claims and future roof assessments. For facilities with rooftop HVAC units, restaurant exhaust, or heavy foot traffic from maintenance personnel, quarterly spot inspections of high-traffic areas are advisable.",
      },
      {
        title: "Drainage: The Most Critical Maintenance Factor",
        body: "Flat roofs do not drain by gravity the way pitched roofs do. Oregon's high annual rainfall means standing water — ponding — is a constant risk on any flat roof where drains are partially blocked or where the roof surface has settled unevenly. Ponding water adds significant structural load: a one-inch deep pool of water across a 5,000 square foot roof adds over 25,000 pounds of weight. More critically, standing water degrades membrane seams and adhesives over time and provides an ideal environment for vegetation growth that roots into the membrane. Clear all internal roof drains and scuppers before each rainy season. Inspect drain screens quarterly and remove debris after major storms. If ponding water persists for more than 48 hours after rain stops in areas away from drains, the roof may need tapered insulation installed to correct the slope and improve drainage.",
      },
      {
        title: "Seam and Flashing Inspection",
        body: "The vast majority of flat roof leaks in Oregon originate at seams and flashings rather than through the field of the membrane. For TPO roofs, inspect all heat-welded seams for separation, lifting edges, or punctures. Probe seams gently with a dull tool — any seam that opens under light pressure needs immediate repair. For EPDM, inspect adhesive lap seams for edge lifting and check all pitch pockets and curb flashings around rooftop equipment penetrations. Modified bitumen flashings at parapet walls are a common failure point: inspect the termination bar where the flashing is mechanically fastened to the wall and ensure sealant at the termination edge is continuous and not cracking. All penetrations — pipes, conduit, HVAC curbs, and skylights — should be individually inspected each season, as differential movement between the building structure and rooftop equipment causes flashing stress that leads to leaks.",
      },
      {
        title: "Preventive Repairs vs. Full Replacement",
        body: "Oregon's wet climate means that deferred maintenance on a commercial flat roof compounds quickly. Small seam separations that might be stable in a dry climate become active leaks within a single rainy season here. As a general rule, a flat roof membrane in good overall condition with isolated damage affecting less than 25 percent of its surface area is a good candidate for targeted repair. When damage is widespread, when the membrane has reached the end of its expected service life (typically 15 to 20 years for TPO, 25 to 30 years for EPDM), or when repair costs in a single year exceed 25 percent of replacement cost, full or sectional replacement is the better investment. Before committing to replacement, have an infrared moisture scan conducted by a qualified contractor. Infrared scanning identifies wet insulation beneath the membrane that cannot be detected visually, allowing you to determine whether the existing substrate can be retained as a base for a recover system, which costs 20 to 40 percent less than a full tear-off replacement.",
      },
      {
        title: "Rooftop Equipment and Foot Traffic Management",
        body: "Rooftop HVAC units, solar panel arrays, and communication equipment are significant contributors to flat roof deterioration in Oregon. Maintenance personnel accessing rooftop equipment are a leading cause of punctures, scuff marks, and displaced ballast on membrane systems. Install designated walk pads — rubber or TPO-coated walkway boards — on all regular maintenance paths between roof access points and rooftop equipment. Ensure all HVAC condensate lines drain away from the membrane and do not pool. Inspect equipment curb flashings every time the rooftop is accessed for maintenance. Coordinate with HVAC contractors and other service vendors to ensure they understand the membrane system they are working around and that they report any damage they observe during service visits. A simple photo log submitted after each rooftop service call creates accountability and catches membrane damage before it becomes a leak.",
      },
      {
        title: "Hiring a Qualified Oregon Commercial Roofing Contractor",
        body: "Commercial roofing requires specialized skills and licensing beyond what standard residential contractors possess. In Oregon, verify that any commercial roofing contractor holds an active CCB license with a commercial endorsement and carries commercial general liability coverage of at least $1 million per occurrence, plus workers' compensation for all employees and subcontractors. Request evidence that their technicians are trained and certified on the specific membrane system on your building — TPO and EPDM manufacturers offer certification programs for installers, and certified installers are typically required to issue manufacturer-backed warranties. Ask for a project list of similar commercial properties in Oregon with references you can contact. For buildings over 10,000 square feet or with complex roof assemblies, request that the contractor provide a written maintenance plan with each inspection, not just a verbal summary. Documented maintenance plans are increasingly required by commercial property insurers and create a clear record for property transactions.",
      },
    ],
    faqs: [
      {
        question: "How often should a commercial flat roof in Oregon be professionally inspected?",
        answer:
          "At minimum, twice per year — once in spring and once in fall. Buildings with heavy rooftop equipment, active drainage issues, or membranes older than 15 years should add a summer inspection to stay ahead of developing problems. Oregon's long rainy season makes fall the most critical inspection, as any unaddressed vulnerability will be tested by six months of continuous rainfall.",
      },
      {
        question: "What is the best flat roofing system for Oregon's climate?",
        answer:
          "TPO is the most widely recommended new installation for Oregon commercial buildings due to its heat-welded seams, which are more watertight than the adhesive seams of EPDM, and its resistance to the biological growth that thrives in Oregon's damp climate. EPDM remains an excellent performer when its seams are properly maintained. The best system for your specific building depends on roof slope, rooftop equipment loads, and budget — a licensed commercial roofing contractor can assess your current system and recommend the most appropriate solution.",
      },
      {
        question: "What causes most flat roof leaks in Oregon?",
        answer:
          "The majority of flat roof leaks in Oregon originate at seams, flashings, and penetrations rather than through the body of the membrane. Flashing failures at parapet walls, HVAC curbs, and pipe penetrations are the most common source. Debris accumulation at drains causes ponding water that stresses seams over time. Regular inspection of these specific areas catches the vast majority of developing leaks before they cause interior damage.",
      },
      {
        question: "Can I coat my existing flat roof instead of replacing it?",
        answer:
          "Fluid-applied coatings can extend the life of a sound flat roof membrane by five to ten years and are a cost-effective alternative to full replacement when the existing membrane is structurally intact but showing surface wear. Coatings are not appropriate over wet or delaminated insulation, failed seams, or membranes with widespread damage. An infrared moisture scan before coating is essential to confirm the substrate is dry. Silicone coatings perform best in Oregon due to their resistance to ponding water, while acrylic coatings are not recommended for western Oregon's wet climate.",
      },
      {
        question: "Does Oregon require permits for commercial roofing work?",
        answer:
          "Yes. Oregon requires building permits for commercial roofing replacements in all jurisdictions. Some jurisdictions also require permits for re-covering an existing membrane. Permit requirements vary by city and county, but your licensed commercial roofing contractor should handle all permit applications, inspections, and final approvals as part of the project scope. Confirm this responsibility is clearly stated in your contract before work begins.",
      },
    ],
  },
];

export function getGuideBySlug(slug: string): Guide | undefined {
  return guides.find((g) => g.slug === slug);
}

export function getStaticGuidePaths() {
  return guides.map((g) => ({ slug: g.slug }));
}
