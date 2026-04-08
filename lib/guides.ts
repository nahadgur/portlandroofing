export interface GuideSection {
  title: string;
  body: string;
}

export interface GuideFaq {
  question: string;
  answer: string;
}

export interface Guide {
  slug: string;
  title: string;
  description: string;
  heroDescription: string;
  sections: GuideSection[];
  faqs: GuideFaq[];
}

export const guides: Guide[] = [
  {
    slug: "how-to-choose-roofing-contractor-oregon",
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
  {
    slug: "oregon-regional-roofing-guide",
    title: "Oregon Regional Roofing Guide: Coast vs Valley vs Desert",
    description: "Oregon has five distinct roofing climates. What works in Portland fails on the coast, and what is specified in Bend would be over-engineered in Eugene. This guide maps the right materials and maintenance approach to each Oregon region.",
    heroDescription: "Oregon is not one climate — it is five. The same roof specification that performs well in the Willamette Valley will fail prematurely on the coast and be over-specified for Eastern Oregon. This guide breaks down exactly what each Oregon region demands from a roofing system, and what homeowners in each area need to know before hiring a contractor.",
    sections: [
      {
        title: "The Oregon Coast: Salt, Wind, and Maximum Moisture",
        body: "Coastal Oregon from Astoria south to Coos Bay is the most demanding roofing environment in the state. Annual rainfall exceeds 60 inches in most coastal communities and reaches 80 inches in the northern coast around Astoria. That rainfall arrives alongside consistent onshore winds — sustained winds of 40 to 60 miles per hour during winter storms are common, with gusts exceeding 80 miles per hour during major events. Salt-laden air accelerates corrosion on standard roofing fasteners and flashings, turning a 30-year specification into a 15-year failure when the wrong materials are used. Roofing on the Oregon coast demands wind-rated shingles certified to 130 miles per hour or higher, stainless steel or hot-dipped galvanised fasteners rather than standard zinc-coated nails, a self-adhering underlayment rather than felt, and marine-grade specifications on any metal components. Standing seam metal roofing in marine-grade aluminium or Galvalume steel is the highest-performing choice in coastal communities — it eliminates the fastener corrosion problem entirely and handles wind uplift far better than any shingle system. Expect to replace standard asphalt shingles every 18 to 22 years on the coast even with maintenance; metal installed to coastal specifications should last 40 to 50 years.",
      },
      {
        title: "Portland Metro: Rain, Shade, and Biological Growth",
        body: "The Portland metropolitan area — Portland, Beaverton, Hillsboro, Gresham, Lake Oswego, Tigard, and surrounding communities — receives 37 inches of annual rainfall over more than 150 days of measurable precipitation. The challenge is not the volume but the persistence: continuous dampness keeps roofing surfaces wet far more days per year than the total rainfall suggests, and Portland's famous tree canopy adds shade that dramatically accelerates moss and algae growth. Architectural asphalt shingles with algae-resistant granules and a Class 4 impact rating are the baseline specification for the Portland market. The impact rating matters not just for hail but for the debris and branch strikes that Portland's tree canopy makes common during windstorms. Attic ventilation is the single most underspecified element in Portland roofing: inadequate ridge-to-soffit ventilation ratios cause condensation during the moisture-heavy wet season, leading to deck rot that can add $3,000 to $7,000 to replacement costs. Moss prevention through zinc or copper ridge strips and biannual treatment is not optional in shaded Portland locations — it is part of the maintenance cost of any asphalt installation in the metro area.",
      },
      {
        title: "Willamette Valley: Moderate but Wet",
        body: "The Willamette Valley corridor from Portland south through Salem, Corvallis, Eugene, and Springfield shares many characteristics with the Portland Metro but with lower average costs and slightly less extreme conditions. Annual rainfall ranges from 40 to 50 inches, with Eugene typically at the wetter end and the mid-valley slightly drier. The valley sits in rain shadow relative to the Coast Range and is sheltered from the most severe coastal winds, reducing wind load requirements compared to coastal specifications. The dominant material throughout the valley is architectural asphalt shingles — they provide strong cost-to-performance for the climate — with cedar shake remaining popular in Eugene's historically eco-conscious market. Moss is the primary maintenance concern throughout the valley, particularly on north-facing slopes and under tree canopy. Wine country areas in the Chehalem Mountains and around McMinnville and Newberg offer more sun exposure and somewhat lower moss pressure than the valley floor. The Willamette Valley's mild freezing temperatures mean ice damming is rare and thermal cycling stress is low, which contributes to asphalt shingles achieving the upper end of their warranty life in valley locations with proper maintenance.",
      },
      {
        title: "Central Oregon High Desert: UV, Snow, and Fire",
        body: "The eastern slope of the Cascades produces a dramatically different roofing environment. Bend, Sisters, Redmond, and the surrounding communities sit at 3,600 feet elevation or higher, receiving only 11 to 12 inches of precipitation annually but facing conditions that challenge roofing in entirely different ways. UV intensity at elevation is significantly higher than at sea level, accelerating asphalt degradation and shortening effective shingle life. Snow loads are a structural concern that must be specified at installation — local engineers set the design snow load, and roofing materials and deck systems must be rated accordingly. Wildfire risk is the third factor: Central Oregon has seen significant fire activity, and Class A fire-rated materials are increasingly required by local jurisdictions and insurance carriers. Metal roofing is the most rational choice for Central Oregon on multiple grounds simultaneously: it handles thermal expansion and contraction between cold nights and warm sunny days without cracking; it reflects radiant heat reducing summer cooling loads; and it carries a Class A fire rating as standard without additional treatment. Asphalt shingles remain common in Bend and Redmond due to lower upfront cost, but should be specified with UV-stabilised formulations and high-wind ratings for the plateau's exposed sites.",
      },
      {
        title: "Southern Oregon and Eastern Oregon: Heat, Fire, and Extremes",
        body: "Southern Oregon — the Medford-Ashland corridor, Grants Pass, Roseburg, and Klamath Falls — combines the wildfire risk of Central Oregon with the humidity of western Oregon during the wet season, creating a demanding dual-season challenge. Fire-rated specifications are not optional in Southern Oregon WUI zones: Jackson and Josephine counties require Class A roofing assemblies for properties in designated wildfire risk areas, and insurance carriers are increasingly declining coverage on non-compliant properties regardless of local code. Metal roofing, concrete tile, and Class A-rated asphalt shingles are the appropriate choices. Eastern Oregon — Pendleton, La Grande, Baker City — presents the state's most extreme thermal cycling, with summer highs above 100 degrees Fahrenheit and winter lows that regularly drop below zero. Low annual rainfall of 7 to 12 inches means biological growth is minimal, but the temperature range stresses roofing materials through expansion and contraction cycles that crack and cup lower-specification products within 5 to 7 years. High-specification architectural shingles with flexibility ratings for extreme temperatures, or standing seam metal roofing, are the appropriate choices for Eastern Oregon's continental climate.",
      },
    ],
    faqs: [
      {
        question: "Does my Oregon region affect what roofing material I should choose?",
        answer: "Yes, significantly. Coastal Oregon requires marine-grade specifications and wind-rated materials that would be unnecessary in the Willamette Valley. Central and Southern Oregon prioritise fire ratings and UV resistance. Eastern Oregon's extreme temperature range demands materials with high flexibility ratings. The right material for your home depends on your specific location and microclimate, not just the state average.",
      },
      {
        question: "Is moss a problem everywhere in Oregon?",
        answer: "Moss is a serious concern west of the Cascades — the Portland Metro, Willamette Valley, and Oregon Coast all have the sustained moisture and shade conditions that promote moss growth. East of the Cascades in Central, Southern, and Eastern Oregon, the drier climate significantly reduces moss pressure. Bend, Pendleton, and Medford homeowners rarely deal with the moss maintenance cycles that are standard in Portland or Eugene.",
      },
      {
        question: "Should I choose metal roofing for my Oregon home?",
        answer: "Metal roofing is the strongest long-term choice in several Oregon contexts: coastal communities where salt air demands marine-grade specifications, Central and Southern Oregon where wildfire risk makes Class A fire ratings a priority, and heavily shaded western Oregon locations where asphalt requires ongoing moss management. For most Willamette Valley homeowners on a standard budget, quality architectural asphalt shingles remain the most practical choice and perform well with appropriate maintenance.",
      },
    ],
  },
  {
    slug: "oregon-roofing-contractor-checklist",
    title: "Oregon Roofing Contractor Checklist: 10 Questions to Ask Before Hiring",
    description: "Ten specific questions that Oregon homeowners should ask every roofing contractor before signing a contract, with explanation of what good and bad answers look like.",
    heroDescription: "Hiring a roofing contractor is one of the largest home improvement decisions most Oregon homeowners make. These ten questions — and what to listen for in the answers — will help you identify qualified, trustworthy contractors and avoid the ones who will cause problems.",
    sections: [
      {
        title: "Question 1: What is Your Current CCB Number?",
        body: "This is your first and most important question. Every contractor performing roofing work in Oregon must hold an active Construction Contractors Board licence. A legitimate contractor will provide their CCB number without hesitation. Once you have it, verify the status yourself at oregon.gov/ccb — check that the licence is current and active, that it has not been suspended or allowed to lapse, and that the category covers the type of work you need. Also review the complaint history section: a contractor with multiple unresolved complaints is a contractor to avoid regardless of how competitive their bid appears. If a contractor cannot provide a CCB number or is evasive about it, stop the conversation and move on. There is no legitimate reason a licensed contractor would be reluctant to share this information.",
      },
      {
        title: "Question 2: Can You Provide a Certificate of Insurance?",
        body: "Oregon CCB licencing requires contractors to carry both general liability insurance and workers compensation coverage. A certificate of insurance is a one-page document from the insurance carrier that confirms the policy is current, lists the coverage amounts, and names you as a certificate holder if you request it. Ask for this document and verify it directly with the carrier listed — it takes one phone call and confirms the policy has not lapsed since the certificate was issued. The minimum you should accept is $1 million per occurrence on general liability. Workers compensation coverage must cover all employees working on your property. A contractor who subcontracts labour must ensure subcontractors also carry their own coverage — ask specifically whether any subcontractors will be used and whether they are insured.",
      },
      {
        title: "Question 3: Will You Pull the Permit?",
        body: "Oregon requires permits for full roof replacements in virtually all jurisdictions. The permit should be pulled in the contractor's name, not yours. When the permit is in the contractor's name, they are accountable to the building department for the quality of the installation — it creates a professional obligation that protects you. A contractor who suggests pulling the permit in your name, or who proposes skipping the permit to save money, is transferring liability to you and removing one of your most important protections. The permit cost, typically $150 to $400 for a residential replacement in Oregon, should be included in the contractor's estimate and handled by them as part of the project scope. Ask which jurisdiction the permit will be filed with and what the expected processing time is — this affects project scheduling.",
      },
      {
        title: "Question 4: What Materials Will You Use and From Which Manufacturer?",
        body: "A professional estimate specifies the exact materials to be installed — not just 'architectural shingles' but the manufacturer, product line, and colour. This specificity matters for several reasons: warranty claims require the specific product to be documented; the quality difference between budget shingles and premium products is real and affects lifespan; and it allows you to compare estimates accurately when multiple contractors are using different specifications. Ask for the specific product data sheet, which lists the wind rating, fire rating, and warranty terms. If a contractor is evasive about the specific materials — using language like 'a quality shingle' without specifics — ask directly until you get a manufacturer and product name. Any hesitation to provide material specifics is a red flag.",
      },
      {
        title: "Question 5: What Warranty Do You Offer on Your Workmanship?",
        body: "Material warranties from manufacturers cover defective products, not installation errors. The workmanship warranty from your contractor covers labour-related failures — improper flashing, incorrect nailing patterns, missed penetrations. Workmanship warranty terms in the Oregon market range from one year for budget operators to ten or fifteen years for established contractors with certified installer programmes. Manufacturer-certified installers, such as GAF Master Elite or CertainTeed ShingleMaster contractors, can offer enhanced warranties that combine material and labour coverage. Ask for the workmanship warranty in writing before signing the contract. A contractor who does not offer a written workmanship warranty is not standing behind their installation.",
      },
      {
        title: "Question 6: Who Will Be On-Site Managing the Crew?",
        body: "Understand who will actually be present and responsible during your roof installation. Large contracting companies sometimes win the job and then subcontract the installation to a different crew, with minimal oversight from the estimator you met. This is not inherently problematic — skilled subcontractors can do excellent work — but you deserve to know who will be on your property and whether a supervisor from the company will be present. Ask directly: will the crew performing the work be your employees or subcontractors? Who will be on-site as the project supervisor? Will the estimator or a manager be available to address questions during the installation? A contractor who commits a senior person to be on-site for at least the critical phases — underlayment inspection, flashing installation — is demonstrating quality control commitment.",
      },
      {
        title: "Question 7: How Do You Handle Unexpected Deck Damage?",
        body: "When shingles are removed, the contractor may find rotted or damaged deck boards that need replacement before the new roofing is installed. How a contractor handles this scenario tells you a great deal about their integrity. The right answer is: they stop and show you the damage, explain the extent and cause, provide a written change order for the additional cost, and obtain your approval before proceeding. The wrong answer is: they replace it and tell you about it afterwards, presenting a surprise bill. Ask this question directly before work begins and get the process documented in writing: what triggers a change order, how will you be notified, and how will additional work be priced. A common pricing method is a per-sheet rate for additional decking, typically $70 to $150 per sheet installed in Oregon's current market.",
      },
      {
        title: "Question 8: What Is the Payment Schedule?",
        body: "Oregon law and industry standards support a specific payment structure: a deposit of no more than one-third of the total contract price at signing, a progress payment at a defined project milestone such as materials delivered and underlayment installed, and the final payment upon completion and your inspection and approval. Be cautious of contractors who request more than one-third upfront — this creates a cash flow imbalance that gives them leverage and reduces yours. Never pay in full before the job is complete and you have inspected the work. Cash-only payment requests are a serious red flag. Payment by cheque or card creates a paper trail; cash payments do not, which becomes important if a dispute arises later.",
      },
      {
        title: "Question 9: What Is the Cleanup and Disposal Plan?",
        body: "A full roof replacement generates significant waste — old shingles, underlayment, fasteners, and debris. Ask specifically what the disposal plan is and whether waste removal is included in the price. In Oregon, roofing materials must be disposed of in accordance with DEQ regulations — dumping old shingles in an unauthorised location is an environmental violation, and some contractors pass this cost to homeowners through surprise charges after the fact. Verify that daily cleanup is included: shingles and fasteners falling into garden beds, gutters, and driveways are both a safety issue and a source of post-project frustration. Ask whether a magnetic roller will be used on driveways and lawn areas to collect fallen fasteners — this is a standard practice for conscientious contractors and an easy quality signal to check.",
      },
      {
        title: "Question 10: Can You Provide References From Similar Projects?",
        body: "Ask for three references from projects similar to yours in scope, material, and recency — within the past two years is ideal. When you call those references, ask specifically about communication during the project, how surprises or changes were handled, whether the timeline was met, how the site was left at the end of each day, and whether they would hire the contractor again. The last question is the most important: homeowners who have had a bad experience almost never say they would hire the contractor again, even if they give diplomatic answers to everything else. Also ask whether the contractor completed a final walkthrough with them after the job was done. Contractors who do a completion inspection demonstrate that they stand behind their work and are willing to be accountable for what was installed.",
      },
    ],
    faqs: [
      {
        question: "How many estimates should I get for a roof replacement?",
        answer: "Get at least three written estimates from different contractors. This gives you a baseline for what the market price is, allows you to compare material specifications, and helps identify outliers — both unusually high bids and suspiciously low ones. If one bid is 40 percent lower than the others, ask the contractor to explain specifically where they are saving money.",
      },
      {
        question: "Should I be concerned if a contractor has any CCB complaints?",
        answer: "One or two resolved complaints over many years of operation is not necessarily disqualifying — contractors who do enough volume will occasionally have disputes. What to look for are unresolved complaints, disciplinary actions from the CCB, patterns of the same type of complaint, and recent complaints within the last two years. Multiple unresolved complaints are a serious warning sign.",
      },
      {
        question: "What happens if I hire an unlicensed contractor in Oregon?",
        answer: "Hiring an unlicensed contractor removes all of the legal protections the CCB system provides: there is no bond to claim against, no licence to file a complaint against, and typically no insurance for damage caused. Unpermitted work done by unlicensed contractors can also create problems at resale, void homeowner's insurance, and result in stop-work orders from building departments.",
      },
    ],
  },
  {
    slug: "oregon-roof-insurance-claims-guide",
    title: "Oregon Homeowner's Guide to Roof Insurance Claims",
    description: "What Oregon homeowners need to know about filing a roof insurance claim: what damage is covered, how the claims process works, how to document damage, and how to avoid common mistakes that reduce or deny your payout.",
    heroDescription: "A roof insurance claim in Oregon is one of the largest single claims most homeowners file. The difference between a fully paid claim and a denied or underpaid one often comes down to documentation, timing, and knowing what your policy actually covers. This guide walks you through the process from first damage to final settlement.",
    sections: [
      {
        title: "What Roof Damage Oregon Home Insurance Typically Covers",
        body: "Standard homeowner's insurance policies in Oregon cover roof damage caused by sudden, accidental events — wind, hail, falling trees, ice damming, and fire. The key word is sudden: insurance is designed to cover events, not gradual deterioration. Wind damage from a named storm event is typically covered; wear and tear on shingles from years of exposure is not. This distinction matters for moss damage, which is considered maintenance neglect in most policy language, and for shingles that are curling or failing due to age. Oregon's most common covered roof claims are storm-related: wind damage from winter storms that remove shingles or damage flashing, hail damage particularly in the Portland Metro and Willamette Valley during spring convective events, and damage from falling trees or large branches. The Oregon coast sees significant wind claims during winter storm season. Wildfire damage in Southern and Central Oregon is covered under most policies, though premiums and available coverage in high-risk WUI zones have become a significant issue as carriers have reduced their Oregon exposure.",
      },
      {
        title: "How to Document Damage Before Calling Your Insurer",
        body: "Documentation is the foundation of a successful roof insurance claim. Before you call your insurance company, gather as much evidence of the damage as you can — both of the event that caused it and the resulting condition of the roof. For storm damage, screenshot and save weather records showing wind speeds, hail reports, or storm severity for your ZIP code on the date of the event. The National Weather Service maintains historical records, and services like Weather Underground provide hyperlocal station data that can document the severity of a storm at your specific address. Photograph the damage from the ground and, if safe, from the roof itself — capture wide shots showing the roof area and close shots showing specific damage points. Photograph the interior as well: water stains on ceilings, damaged insulation in the attic, and any standing water. Date-stamp all photographs. Save any pieces of roofing that have blown off — these can serve as evidence. If the damage occurred during a storm and you have neighbours with similar damage, their claims can corroborate your timeline.",
      },
      {
        title: "The Oregon Claims Process: What to Expect",
        body: "After you file a claim, your insurance company will assign an adjuster to assess the damage. In Oregon, adjusters have a statutory obligation to respond to claims within a reasonable timeframe, and insurers must accept or deny coverage within a defined period under the Oregon Insurance Code. The adjuster's visit is the critical step: they will inspect the roof, document what they find, and prepare an estimate for the covered repair or replacement cost. Be present for this inspection if at all possible. You have the right to have your own contractor present, and for significant claims, having a CCB-licensed contractor who has already assessed the damage on-site alongside the adjuster can significantly affect the scope of what is documented. If the adjuster's estimate seems low or misses damage that your contractor identified, you can request a re-inspection or supplement the claim with your contractor's written assessment. Oregon homeowners also have the right to hire a public adjuster — an independent adjuster who represents your interests rather than the insurance company's.",
      },
      {
        title: "Understanding Actual Cash Value vs Replacement Cost Value",
        body: "The single most impactful coverage distinction in a roof insurance claim is whether your policy pays Actual Cash Value or Replacement Cost Value. Replacement Cost Value policies pay the full cost of replacing your damaged roof with a new equivalent system at current material and labour prices — this is what most homeowners expect when they file a claim. Actual Cash Value policies deduct depreciation from the replacement cost, based on the age and condition of your existing roof. A 20-year-old roof might be depreciated by 60 to 70 percent, meaning the insurer pays only 30 to 40 cents on the dollar of the replacement cost. If you are not sure which coverage you have, check your declarations page or call your agent now rather than when you are filing a claim. Many policies that pay ACV on initial settlement will release the depreciation holdback once the replacement is complete and you submit receipts — this is called recoverable depreciation, and failing to claim it is one of the most common and costly mistakes Oregon homeowners make.",
      },
      {
        title: "Common Mistakes That Reduce or Deny Oregon Roof Claims",
        body: "Several patterns consistently lead to reduced or denied roof insurance claims in Oregon. Filing too late is the first: most Oregon policies require claims to be filed within a reasonable time of the damage occurring, and some specify a maximum period. If you discover storm damage weeks or months after a major weather event, the insurer may argue that delay prevented them from assessing the original damage and that subsequent weather changes complicate the cause-of-loss determination. Making repairs before the adjuster inspects is another common mistake: emergency tarping and temporary repairs are appropriate and expected, but major repairs completed before the adjuster's visit remove evidence and can complicate coverage. Deferred maintenance is a claim denial trigger — if the adjuster finds a roof with significant pre-existing deterioration, the insurer can deny the claim on the grounds that the damage resulted from maintenance neglect rather than the storm event. Finally, working with contractors who directly bill insurers and discourage homeowner involvement can result in settlements that benefit the contractor rather than ensuring the homeowner's property is properly restored.",
      },
    ],
    faqs: [
      {
        question: "Will my insurance rates go up if I file a roof claim?",
        answer: "Filing a claim can affect your future premiums, but the impact varies significantly by insurer and claims history. In Oregon, insurers cannot non-renew a policy solely because you filed one weather-related claim. However, multiple claims within a short period, or a claims history that makes you a higher risk, can lead to premium increases or non-renewal at the end of your policy term. Weigh the claim benefit against your deductible and potential premium impact for smaller damage amounts.",
      },
      {
        question: "Can I choose my own roofing contractor for an insurance claim?",
        answer: "Yes. Oregon homeowners have the right to choose their own CCB-licensed contractor for insurance repair work. Your insurer may have a preferred contractor network, but you are not required to use it. The insurer pays the contractor's invoice up to the approved claim amount. If your chosen contractor's estimate exceeds the insurer's approved amount, you and your contractor can work together to supplement the claim with additional documentation.",
      },
      {
        question: "What is an insurance deductible and how does it affect my claim?",
        answer: "Your deductible is the amount you pay out of pocket before insurance pays the remainder. If your roof replacement costs $14,000 and your deductible is $2,500, the insurer pays $11,500. Oregon law prohibits contractors from waiving or paying your deductible on your behalf — a contractor who offers to cover your deductible is engaging in insurance fraud, and homeowners who participate can face legal exposure. Pay your deductible directly and keep documentation.",
      },
    ],
  },
  {
    slug: "solar-ready-roofing-oregon",
    title: "Solar-Ready Roofing in Oregon: What to Spec Before You Install Panels",
    description: "If you plan to add solar within the next 10 years, your roofing decisions today matter significantly. This guide covers what to specify, what to avoid, and how Oregon's new HB 4029 solar consumer protection law affects homeowners who are re-roofing ahead of a solar installation.",
    heroDescription: "Re-roofing and solar installation are increasingly planned together in Oregon. The decisions you make on your roof today — material, pitch orientation, penetration placement, structural load — directly affect what your solar installation will cost and how well it will perform. This guide covers what to get right the first time.",
    sections: [
      {
        title: "Why Re-Roofing Before Solar Makes Sense",
        body: "Most solar installers require the roof they are mounting on to have at least 10 to 15 years of remaining useful life. Panels that are installed on a roof approaching end-of-life will need to be removed and reinstalled when the roof is replaced — a process that typically costs $3,000 to $8,000 in Oregon's current labour market, depending on the system size, in addition to the roof replacement cost. Homeowners who plan their roofing and solar projects together avoid this cost entirely and can coordinate both systems for optimal performance. The roof replacement becomes an investment in the solar system's foundation rather than a standalone expense. Oregon's mild climate and relatively strong solar resource — particularly east of the Cascades and in the southern part of the state — make solar economically viable for a wide range of homeowners, and the planning horizon for solar has shortened as panel costs have fallen and Oregon incentive programmes have expanded through the Energy Trust of Oregon.",
      },
      {
        title: "Material Choices That Work Best With Solar",
        body: "Not all roofing materials accommodate solar panel installation equally. Standing seam metal roofing is the most solar-compatible material available: clamp-based solar mounting systems attach directly to the seams without any penetrations into the roof surface, eliminating leak risk entirely and simplifying installation. This mounting advantage, combined with metal's 40 to 70 year lifespan, makes it the optimal substrate for homeowners planning solar. Architectural asphalt shingles are compatible with standard rail-and-bracket mounting systems and work well for most residential solar installations — they are the most common substrate for rooftop solar in Oregon. Specify asphalt shingles with a lifespan that extends well beyond your planned solar installation period: if you plan to install solar in 5 years, a 30-year shingle installed today gives you 25 years of life after installation, comfortably above the 10-year minimum most solar installers require. Cedar shake is problematic for solar: the material's texture makes sealing penetrations difficult, and the additional weight of racking on older shake can exceed load limits. Concrete and clay tile require specialised mounting equipment that increases installation cost. If you have tile and are planning solar, discuss the mounting approach with your solar installer before re-roofing.",
      },
      {
        title: "Structural and Orientation Considerations",
        body: "Solar panels add load to your roof structure — typically 3 to 5 pounds per square foot for a standard panel array. Most Oregon homes built to current code have adequate structural capacity for a standard residential solar system, but older homes with undersized rafters or deteriorated framing may require reinforcement before panels can be added. When re-roofing an older home you plan to install solar on, ask your roofing contractor to assess the attic framing and note any areas where rafters are damaged, undersized, or inadequately supported. Addressing structural issues during the re-roofing project is significantly less expensive than doing it separately when the solar installer identifies them. Panel orientation is largely determined by roof geometry, but if you have any flexibility during a re-roofing project — such as adding a new dormer, changing a pitch, or rebuilding a flat section — a south-facing orientation between 15 and 35 degrees from horizontal produces the highest annual energy output for most Oregon locations. West-facing orientations are increasingly specified in Oregon as utilities shift more generation to the morning, making afternoon production from west-facing panels more valuable.",
      },
      {
        title: "What HB 4029 Means for Your Re-Roofing and Solar Plan",
        body: "Oregon's House Bill 4029, signed March 5, 2026, and effective June 5, 2026, is the state's first solar consumer protection law. It requires solar contractors to provide a written plain-language disclosure before any contract is signed — the disclosure must itemise all costs, financing terms, estimated energy production, and all conditions of any lease or power purchase agreement. For homeowners planning a roofing and solar project together, HB 4029 has several practical implications. First, it means your solar contractor must be able to provide the full financial picture of your solar system before you commit — this allows you to coordinate the total cost of both projects accurately. Second, it strengthens the licensing requirements for solar contractors, which means the pool of compliant installers is being clarified as the law takes effect. Third, the law does not cover situations where contractors fail to respond after installation — a limitation that emphasises the importance of verifying CCB licence status and checking complaint history before signing with any contractor. Ask your roofing contractor whether they work with or can recommend solar installers who are already operating in compliance with HB 4029 requirements.",
      },
      {
        title: "Planning the Conduit and Wiring Route During Re-Roofing",
        body: "One of the most cost-effective solar-ready preparations you can make during a re-roofing project is planning the electrical conduit route. Solar installations require conduit runs from the panels on the roof down to the inverter, which is typically installed near the electrical panel — often in a garage or utility room. If the conduit path runs through finished interior spaces, retrofitting it after the fact can require cutting and patching drywall, which adds $500 to $2,000 to the solar installation cost. During re-roofing, your contractor has access to the attic and roof penetration points, making it straightforward to install a sleeve or conduit pathway for future wiring at minimal cost — typically $100 to $300 added to the roofing contract. Similarly, confirm with your roofing contractor that penetrations for future conduit runs will be flashed and sealed correctly. Solar conduit penetrations that are not properly flashed are a leading cause of water intrusion complaints after solar installation. Discuss specifically which roof areas are planned for panels and which side of the roof the conduit will exit — your roofing contractor can pre-stage the flashing for minimum disruption when the solar installation occurs.",
      },
    ],
    faqs: [
      {
        question: "How long does a roof need to last before solar can be installed?",
        answer: "Most Oregon solar installers require at least 10 to 15 years of remaining roof life before they will mount panels. Some installers will work with 8 to 10 years for homeowners who understand the removal cost risk. If your roof is approaching 15 years old or showing significant wear, replacing it before installing solar eliminates the risk of a costly panel removal mid-system life.",
      },
      {
        question: "Does the type of roofing material affect my solar system cost?",
        answer: "Yes. Standing seam metal roofing reduces solar installation cost because clamp-based mounting requires no penetrations. Standard asphalt shingles are straightforward and most solar installers work with them routinely. Cedar shake, concrete tile, and clay tile all require specialised mounting that increases installation cost. If you are re-roofing specifically to prepare for solar, the material choice is worth discussing with your solar installer before you commit.",
      },
      {
        question: "What does HB 4029 require my solar contractor to give me?",
        answer: "From June 5, 2026, Oregon solar contractors must provide a written plain-language disclosure before any contract is signed. This disclosure must include all costs, financing terms including the full interest cost of any loan, estimated annual energy production, and all terms of any lease or power purchase agreement. If your contractor cannot or will not provide this disclosure before asking you to sign, they are in violation of Oregon law.",
      },
    ],
  },
  {
    slug: "oregon-roofing-building-codes",
    title: "Oregon Building Codes for Roofing: State vs Local Requirements",
    description: "Oregon roofing is governed by state code, but local jurisdictions layer their own requirements on top. This guide explains what the Oregon Residential Specialty Code requires, how local amendments work, and what to check before starting any roofing project.",
    heroDescription: "Oregon has a statewide residential building code, but it is not the whole picture. Local jurisdictions can and do amend it — sometimes significantly. Understanding which rules apply to your property determines what materials are required, what permits are needed, and what inspectors will check. This guide covers both layers.",
    sections: [
      {
        title: "The Oregon Residential Specialty Code",
        body: "Oregon's primary residential building code is the Oregon Residential Specialty Code, which adopts and modifies the International Residential Code for statewide use. The ORSC establishes minimum standards for roofing construction throughout the state, including requirements for underlayment, flashing, ventilation, fastening patterns, and material ratings. Key roofing provisions include: a minimum Class C fire rating for roofing assemblies in most areas, with Class A required in designated wildfire interface zones; a minimum one-quarter inch per foot slope for asphalt shingles; specific ice and water shield underlayment requirements at eaves and valleys in areas with potential for ice dam formation; and ventilation ratios for attic spaces based on the ceiling and roof geometry. The ORSC is adopted and enforced by local building departments, which have the authority to adopt additional local amendments — meaning the ORSC is a floor, not a ceiling, and local requirements can be more stringent.",
      },
      {
        title: "How Local Amendments Work in Oregon",
        body: "Oregon building code law allows local jurisdictions to adopt amendments to the ORSC that address local conditions, provided those amendments are at least as protective as the state minimum. In practice, this means several categories of local amendments are common in Oregon. Wildfire interface requirements: communities in Josephine, Jackson, Klamath, and Deschutes counties often require Class A fire-rated assemblies in WUI zones where the state code requires only Class C. Wind load requirements: coastal communities from Astoria to Coos Bay frequently adopt enhanced wind resistance standards, requiring higher-rated shingle products and more frequent fastening patterns than the state baseline. Historic district requirements: cities including Jacksonville, Astoria, and portions of Portland require design review for roofing projects in historic districts, which can restrict material choices, colours, and profile. Energy code amendments: some jurisdictions have adopted enhanced insulation and ventilation requirements beyond the ORSC baseline, affecting attic assembly design.",
      },
      {
        title: "What Oregon Permits Require for Roofing",
        body: "Oregon requires building permits for all full roof replacements throughout the state — this is a statewide requirement with no local opt-out. Permits are also required for structural repairs to the roof deck, adding penetrations such as skylights or vents, and reroofing over an existing layer where local code limits layers. Minor repairs — replacing a few shingles, resealing flashings, patching small areas — generally do not require permits, though the threshold varies by jurisdiction. The permit application process requires the property address, a description of the work, the roofing materials being installed including manufacturer and product, the CCB licence number of the contractor, and the estimated project value. Some jurisdictions require a simple plan showing the roof geometry. Permit fees are calculated as a percentage of project value in most Oregon cities, typically resulting in fees of $150 to $500 for a standard residential replacement. Processing times range from same-day for online applications in larger cities to two weeks in smaller jurisdictions with limited staffing.",
      },
      {
        title: "Inspection Requirements by Jurisdiction Type",
        body: "Oregon roofing inspections verify code compliance at the installation level. What inspectors look for varies by jurisdiction but consistently includes: proper underlayment installation with specified laps and ice and water shield at valleys and eaves; correct fastening pattern for the material and wind zone; flashing installation at all penetrations, valleys, walls, and transitions; ventilation compliance including ridge vent and soffit vent area; and starter strip and ridge cap installation. Most residential roof replacements require a single final inspection after installation is complete. Some jurisdictions — particularly those with enhanced wind or fire requirements — may require a mid-project inspection of the underlayment before finish materials are applied. Portland specifically inspects attic ventilation as part of roofing inspections, which can result in required ventilation upgrades as a condition of permit approval on older homes with inadequate ridge-to-soffit ratios. Failure to schedule required inspections can result in the permit being declared inactive and the work being considered unpermitted.",
      },
      {
        title: "Special Code Requirements by Oregon Region",
        body: "Beyond the standard ORSC provisions, Oregon's diverse geography creates regionally specific code environments. Coastal communities from Astoria to Coos Bay apply enhanced wind design requirements: shingles must be rated for higher wind speeds, fastening patterns require more nails per shingle, and ridge cap specifications are tightened. The Oregon Building Codes Division publishes the wind speed maps used for coastal design, which contractors and engineers use to specify appropriate products. Central Oregon communities including Bend, Redmond, and Sisters require compliance with snow load design standards set by structural engineering analysis for each county and sub-region — roof decks must be sized to carry the specified design snow load, which affects deck thickness requirements and rafter spacing. Southern Oregon WUI jurisdictions require Class A fire-rated roofing assemblies for properties in mapped wildfire interface zones, with compliance verified at permit inspection. Historic district requirements in cities including Jacksonville, Astoria, and Portland's Irvington and Ladd's Addition neighbourhoods require design review approval that may mandate specific materials, colours, or profiles to match the district's historic character.",
      },
    ],
    faqs: [
      {
        question: "How do I find out what codes apply to my Oregon property?",
        answer: "Contact your local building department with your property address. Ask specifically whether the property is in a wildfire interface zone, a historic district, a coastal high-wind zone, or a snow country zone, and what roofing-specific requirements apply to each designation. Many Oregon cities and counties publish their local amendments to the state code online, though the building department is the authoritative source.",
      },
      {
        question: "Can I reroof without pulling a permit in Oregon?",
        answer: "No. Oregon requires permits for full roof replacements statewide. Unpermitted work creates problems at resale, can void homeowner's insurance coverage for roof-related claims, and may require the work to be exposed for inspection if discovered. The permit process also provides legal protection: if permitted work fails inspection, the contractor is responsible for correction at no additional cost to the homeowner.",
      },
      {
        question: "What happens if I disagree with an inspector's finding?",
        answer: "Oregon homeowners and contractors have the right to appeal an inspector's decision through the building department's formal appeals process. The Oregon Building Codes Division also has an appeals board for state code interpretations. In practice, most inspection disagreements are resolved through conversation with the inspector or the building official — identifying the specific code section at issue and either correcting the installation or demonstrating code compliance resolves most disputes without formal appeal.",
      },
    ],
  },
];

export function getGuideBySlug(slug: string): Guide | undefined {
  return guides.find((g) => g.slug === slug);
}
