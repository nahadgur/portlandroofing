interface RegionAdviceProps {
  region: string;
  cityName: string;
  serviceName: string;
}

interface RegionConfig {
  icon: string;
  heading: string;
  body: string;
  badge: string;
  badgeColor: string;
  borderColor: string;
  bgColor: string;
}

function getRegionConfig(
  region: string,
  cityName: string,
  serviceName: string
): RegionConfig {
  switch (region) {
    case 'Coast':
    case 'South Coast':
      return {
        icon: '🌊',
        badge: 'Coastal Climate',
        badgeColor: '#0369A1',
        bgColor: '#F0F9FF',
        borderColor: '#BAE6FD',
        heading: `Salt Air and High Winds: What ${cityName} Homeowners Need to Know`,
        body: `Coastal Oregon averages 60–80 inches of rain per year, combined with salt-laden sea air that accelerates corrosion on standard roofing fasteners and flashings. For ${serviceName} in ${cityName}, we recommend wind-rated shingles certified to 130 mph or higher, stainless steel or hot-dipped galvanised fasteners, and a self-adhering underlayment rather than felt — it won't degrade under sustained moisture. Algae-resistant shingles are also worth the small premium: the damp coastal microclimate is ideal for moss and lichen growth, and prevention is far cheaper than treatment.`,
      };

    case 'Metro':
      return {
        icon: '🌧',
        badge: 'Portland Metro Climate',
        badgeColor: '#6D28D9',
        bgColor: '#F5F3FF',
        borderColor: '#DDD6FE',
        heading: `Portland Metro Roofing: Managing 37 Inches of Annual Rainfall`,
        body: `The Portland metro area receives an average of 37 inches of rain per year — most of it falling as persistent drizzle between October and April rather than heavy storms. For ${serviceName} in ${cityName}, the key risk is not impact damage but slow moisture infiltration: inadequate attic ventilation leads to condensation, rot, and mould in older homes. Ensure your contractor checks ridge and soffit ventilation as part of the scope. Architectural shingles with a Class 4 impact rating are now standard in the metro, and algae-resistant coatings are strongly recommended given the year-round damp conditions.`,
      };

    case 'Willamette Valley':
    case 'Wine Country':
      return {
        icon: '🌿',
        badge: 'Willamette Valley Climate',
        badgeColor: '#166534',
        bgColor: '#F0FDF4',
        borderColor: '#BBF7D0',
        heading: `Willamette Valley Roofing: Moss, Rain, and Mild Winters`,
        body: `The Willamette Valley receives 40–50 inches of rainfall annually with mild temperatures that rarely drop below freezing — ideal conditions for moss and algae. For ${serviceName} in ${cityName}, moss prevention should be built into the specification from day one: copper or zinc ridge strips slow biological growth significantly, and algae-resistant shingles with a 10-year warranty are widely available at modest cost. Unlike the coast, wind loads are lower here, so the focus shifts to drainage — proper valley flashing, adequate gutter sizing, and a secondary water barrier along eaves are the most important upgrades beyond the shingles themselves.`,
      };

    case 'Central Oregon':
      return {
        icon: '☀',
        badge: 'High Desert Climate',
        badgeColor: '#B45309',
        bgColor: '#FFFBEB',
        borderColor: '#FDE68A',
        heading: `High Desert Roofing in ${cityName}: UV, Fire Risk, and Temperature Swings`,
        body: `Central Oregon sits in the rain shadow of the Cascades, receiving just 11–12 inches of precipitation annually. For ${serviceName} in ${cityName}, the main threats are UV degradation from over 300 days of sunshine per year, dramatic temperature swings between day and night that cause shingles to expand and contract, and wildfire ember exposure. Specify shingles with a Class A fire rating — required by most Central Oregon jurisdictions — and look for products with enhanced UV stabilisers in the asphalt formulation. Metal roofing performs exceptionally well here: it handles thermal movement without cracking, reflects radiant heat to reduce cooling loads, and carries a Class A fire rating as standard.`,
      };

    case 'Eastern Oregon':
      return {
        icon: '🌵',
        badge: 'Eastern Oregon Climate',
        badgeColor: '#92400E',
        bgColor: '#FFF7ED',
        borderColor: '#FED7AA',
        heading: `Eastern Oregon Roofing: Extreme Temperatures and Low Humidity`,
        body: `Eastern Oregon experiences some of the most demanding roofing conditions in the state — summer temperatures above 100°F, winters that drop below 0°F, and annual rainfall as low as 7–9 inches in some areas. For ${serviceName} in ${cityName}, thermal movement is the primary concern: low-quality shingles will crack and cup within 5–7 years under these conditions. Specify a shingle with a minimum 50-year warranty and enhanced flexibility ratings. Metal standing-seam roofing is the highest-value long-term option in this climate, handling expansion and contraction without fastener pull-out. Ice dam prevention through adequate insulation and ventilation is also critical in areas that see hard freezes.`,
      };

    case 'Columbia Gorge':
      return {
        icon: '💨',
        badge: 'Columbia Gorge Climate',
        badgeColor: '#0F4C81',
        bgColor: '#EFF6FF',
        borderColor: '#BFDBFE',
        heading: `Columbia Gorge Wind Loads: Why Standard Shingles Aren't Enough`,
        body: `The Columbia River Gorge is one of the windiest corridors in the Pacific Northwest, with sustained winds regularly exceeding 40 mph and gusts reaching 75 mph or more during east wind events. For ${serviceName} in ${cityName}, wind resistance is the primary specification driver — standard 60 mph-rated shingles are insufficient. Look for products rated to 110 mph or above with six-nail fastening patterns rather than the standard four. Ridge caps are a particular vulnerability in high-wind zones and should be fastened with longer nails and additional adhesive. Metal roofing with concealed fasteners eliminates this weakness entirely and is worth serious consideration for exposed sites.`,
      };

    case 'Southern Oregon':
      return {
        icon: '🔥',
        badge: 'Southern Oregon Climate',
        badgeColor: '#9A1C1C',
        bgColor: '#FFF1F2',
        borderColor: '#FECDD3',
        heading: `Southern Oregon Roofing: Fire Season and Hot, Dry Summers`,
        body: `Southern Oregon combines a Mediterranean-style dry season with increasing wildfire risk — the region saw over 500,000 acres burn in recent years, and ember exposure is now a primary design consideration for any new roof. For ${serviceName} in ${cityName}, a Class A fire rating is the minimum acceptable specification, and many insurers in fire-risk zones are now requiring it for coverage. Metal roofing and concrete tile are the strongest performers; asphalt shingles should carry the highest available fire and impact ratings. Sealed soffits and metal valley flashing prevent ember intrusion at the most vulnerable points. Check with your local jurisdiction — Medford, Ashland, and Grants Pass all have specific requirements for roofing in the Wildland-Urban Interface.`,
      };

    default:
      return {
        icon: '🏠',
        badge: 'Oregon Climate',
        badgeColor: '#374151',
        bgColor: '#F9FAFB',
        borderColor: '#E5E7EB',
        heading: `Oregon Roofing Conditions: What to Specify for ${cityName}`,
        body: `Oregon's diverse climate means there is no one-size-fits-all roofing specification. For ${serviceName} in ${cityName}, your contractor should assess local rainfall levels, wind exposure, wildfire risk, and freeze-thaw cycles before recommending materials. At minimum, look for a shingle with a Class A fire rating, a minimum 30-year warranty, and algae resistance — these are sensible baselines for any Oregon climate. Request written confirmation that all flashings will be sealed with butyl tape or equivalent, and that ridge and soffit ventilation meets Oregon's current building code.`,
      };
  }
}

export default function RegionAdvice({
  region,
  cityName,
  serviceName,
}: RegionAdviceProps) {
  const config = getRegionConfig(region, cityName, serviceName);

  return (
    <section className="section-pad" style={{ background: config.bgColor }}>
      <div className="content-wrap">
        {/* Badge */}
        <div className="mb-4">
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.375rem',
              background: config.badgeColor,
              color: '#fff',
              fontSize: '0.7rem',
              fontWeight: 700,
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
              padding: '0.25rem 0.65rem',
              borderRadius: '999px',
            }}
          >
            <span>{config.icon}</span>
            {config.badge}
          </span>
        </div>

        {/* Heading */}
        <h2
          className="text-2xl sm:text-3xl font-extrabold mb-4"
          style={{ color: '#0F172A' }}
        >
          {config.heading}
        </h2>

        {/* Body */}
        <p
          className="text-base leading-relaxed"
          style={{
            color: '#475569',
            borderLeft: `3px solid ${config.borderColor}`,
            paddingLeft: '1rem',
          }}
        >
          {config.body}
        </p>
      </div>
    </section>
  );
}
