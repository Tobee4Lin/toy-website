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
  brandName: 'Levich Toys',
  slogan: 'PLAY BEYOND LIMITS',
  companyName: 'Guangdong Levich Toys Co., Ltd.',
  email: 'felix@levichtoys.com',
  whatsapp: '8613538618656',
  phone: '+86 13538618656',
  address: 'Huafu Fuhua South Road, Guangyi Subdistrict, Chenghai District, Shantou City, Guangdong, China',
  websiteUrl: 'https://www.levichtoys.com',
  socialLinks: {
    facebook: 'https://www.facebook.com/profile.php?id=61594233811356',
    linkedin: '',
    instagram: '',
    youtube: '',
  },
  defaultSEO: {
    title: 'Levich Toys - Toy Manufacturer in Chenghai, China',
    description:
      'Innovative toys, reliable manufacturing, global supply. Your trusted toy manufacturer in Chenghai, China.',
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