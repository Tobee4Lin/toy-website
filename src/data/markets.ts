// EXPORTS: IMarket, MOCK_MARKETS
export interface IMarket {
  id: string
  country: string
  countryCode: string
  slug: string
  region: 'North America' | 'Europe' | 'Middle East' | 'South America' | 'Asia Pacific'
  flag: string
  overview: string
  buyerRequirements: string[]
  safetyStandards: string[]
  importNotes: string[]
  recommendedCategories: string[]
  faqs: { question: string; answer: string }[]
  ctaTitle: string
}

export const MOCK_MARKETS: IMarket[] = [
  {
    id: '1',
    country: 'United States',
    countryCode: 'US',
    slug: 'usa',
    region: 'North America',
    flag: '🇺🇸',
    overview: 'The US is the largest toy market globally. Buyers prioritize safety compliance, innovative designs, and reliable supply chains. We help US importers source quality toys from Chenghai with full ASTM/CPSIA compliance support.',
    buyerRequirements: [
      'ASTM F963 safety certification',
      'CPSIA compliance and testing reports',
      'Competitive MOQ for wholesale',
      'Reliable ocean freight options',
      'Private label and OEM capabilities',
    ],
    safetyStandards: ['ASTM F963', 'CPSIA', 'CPSC', 'Lead & Phthalate Testing'],
    importNotes: [
      'All toys must meet CPSC requirements',
      'Tracking label compliance required',
      'Third-party lab testing recommended',
      'Customs clearance assistance available',
    ],
    recommendedCategories: ['beach-toys', 'bubble-toys', 'rc-toys', 'building-blocks'],
    faqs: [
      {
        question: 'Do you provide ASTM F963 testing reports?',
        answer: 'Yes, we can arrange third-party testing through accredited laboratories and provide full compliance documentation for US import.',
      },
      {
        question: 'What is the typical lead time for US shipments?',
        answer: 'Standard production lead time is 25-45 days, plus 20-30 days for ocean freight to West Coast and 30-40 days to East Coast ports.',
      },
    ],
    ctaTitle: 'Source Toys for the US Market',
  },
  {
    id: '2',
    country: 'Saudi Arabia',
    countryCode: 'SA',
    slug: 'saudi-arabia',
    region: 'Middle East',
    flag: '🇸🇦',
    overview: 'Saudi Arabia is a fast-growing toy market in the GCC region. With a young population and growing retail sector, there is strong demand for quality toys, educational products, and outdoor play items.',
    buyerRequirements: [
      'SASO / SABER certification',
      'Arabic labeling and packaging',
      'Halal considerations where applicable',
      'Jeddah/ Riyadh port delivery',
      'Seasonal promotional items',
    ],
    safetyStandards: ['SASO', 'SABER', 'GCC Conformity', 'EN71 (accepted)'],
    importNotes: [
      'SABER e-certification system required',
      'Product registration before shipment',
      'Arabic language on packaging recommended',
      'We handle documentation support',
    ],
    recommendedCategories: ['beach-toys', 'bubble-toys', 'building-blocks'],
    faqs: [
      {
        question: 'Can you help with SABER certification for Saudi Arabia?',
        answer: 'Yes, we work with accredited testing labs and can assist with SABER registration and Product Certificates of Conformity for Saudi market entry.',
      },
      {
        question: 'Do you offer Arabic packaging?',
        answer: 'Absolutely. We provide OEM packaging services including Arabic labeling, dual-language packaging, and custom designs for the Middle Eastern market.',
      },
    ],
    ctaTitle: 'Grow Your Toy Business in KSA',
  },
  {
    id: '3',
    country: 'Brazil',
    countryCode: 'BR',
    slug: 'brazil',
    region: 'South America',
    flag: '🇧🇷',
    overview: 'Brazil is South America\'s largest toy market. Buyers seek durable, affordable toys with strong safety standards. We support Brazilian importers with INMETRO compliance and efficient logistics.',
    buyerRequirements: [
      'INMETRO certification',
      'Portuguese labeling',
      'Competitive pricing for mass market',
      'Durable products for tropical climate',
      'OEM and private label options',
    ],
    safetyStandards: ['INMETRO', 'NM 300-1', 'ABNT Standards', 'EN71 (reference)'],
    importNotes: [
      'INMETRO certification mandatory for toys',
      'Local representation may be required',
      'Portuguese packaging is essential',
      'We assist with documentation flow',
    ],
    recommendedCategories: ['beach-toys', 'bubble-toys', 'rc-toys', 'building-blocks'],
    faqs: [
      {
        question: 'Is INMETRO certification required for toy imports to Brazil?',
        answer: 'Yes, all toys imported into Brazil must have INMETRO certification. We can coordinate the testing and certification process through our partner labs.',
      },
      {
        question: 'What are the payment terms for Brazilian buyers?',
        answer: 'We offer flexible payment terms including T/T, L/C at sight, and other options. Contact our team to discuss terms that work for your business.',
      },
    ],
    ctaTitle: 'Source Quality Toys for Brazil',
  },
]