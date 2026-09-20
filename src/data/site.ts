// EXPORTS: ISiteConfig, MOCK_SITE_CONFIG
export interface ISiteConfig {
  brandName: string
  slogan: string
  companyName: string
  email: string
  whatsapp: string
  phone: string
  address: string
  websiteUrl: string
  socialLinks: {
    facebook?: string
    linkedin?: string
    instagram?: string
    youtube?: string
  }
  defaultSEO: {
    title: string
    description: string
    keywords: string[]
  }
}

export const MOCK_SITE_CONFIG: ISiteConfig = {
  brandName: 'YOUR BRAND NAME',
  slogan: 'PLAY BEYOND LIMITS',
  companyName: 'YOUR COMPANY NAME',
  email: 'sales@yourbrand.com',
  whatsapp: '8613538618656',
  phone: '+86 754 0000 0000',
  address: 'Huafu Fuhua South Road, Guangyi Subdistrict, Chenghai District, Shantou City, Guangdong, China',
  websiteUrl: 'https://www.yourbrand.com',
  socialLinks: {
    facebook: 'https://facebook.com/yourbrand',
    linkedin: 'https://linkedin.com/company/yourbrand',
    instagram: 'https://instagram.com/yourbrand',
    youtube: 'https://youtube.com/@yourbrand',
  },
  defaultSEO: {
    title: 'Your Brand - Levich Toys in Chenghai, China',
    description:
      'Innovative toys, reliable manufacturing, global supply. Your trusted B2B toy manufacturer in Chenghai, China.',
    keywords: [
      'toy manufacturer',
      'toy manufacturing',
      'Chenghai toys',
      'OEM toys',
      'wholesale toys',
      'beach toys',
      'bubble toys',
      'RC toys',
      'building blocks',
    ],
  },
}