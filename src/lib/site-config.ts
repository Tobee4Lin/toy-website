/**
 * Site-wide configuration
 * Centralize domain, company info, and SEO constants to avoid hardcoding across files.
 */

export const SITE_URL = 'https://www.levichtoys.com';

export const COMPANY = {
  name: 'Levich Toys',
  legalName: 'Guangdong Levich Toys Co., Ltd.',
  shortName: 'Levich Toys',
  foundedYear: 2015,
  email: 'sales@levichtoys.com',
  phone: '+86 13538618656',
  whatsapp: '+86 13538618656',
  address: {
    street: 'Huafu Fuhua South Road, Guangyi Subdistrict',
    district: 'Chenghai District',
    city: 'Shantou City',
    region: 'Guangdong',
    postalCode: '',
    country: 'CN',
  },
  logoUrl: '/images/logo-icon.png',
  logoHorizontal: '/images/logo-horizontal-v2.png',
  ogImage: '/og-image.svg',
  // Social media profile links
  social: {
    facebook: 'https://www.facebook.com/profile.php?id=61594233811356',
    linkedin: '',
    youtube: '',
    instagram: '',
  },
  certifications: ['BSCI', 'ISO 9001'],
  // Factory details
  factorySize: '20,000 m²',
  warehouseSize: '5,000 m²',
  samplingTime: '7 days',
  leadTime: '20-25 days',
} as const;

export const CATEGORIES = [
  { slug: 'beach-toys', name: 'Beach Toys' },
  { slug: 'bubble-toys', name: 'Bubble Toys' },
  { slug: 'rc-toys', name: 'RC Toys' },
  { slug: 'building-blocks', name: 'Building Blocks' },
] as const;

export function getFullAddress(): string {
  const { street, district, city, region, country } = COMPANY.address;
  return `${street}, ${district}, ${city}, ${region}, ${country}`;
}

export function getSocialLinks(): string[] {
  return Object.values(COMPANY.social).filter(Boolean) as string[];
}
