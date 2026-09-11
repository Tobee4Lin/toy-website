/**
 * 结构化数据生成器（Schema.org JSON-LD）
 * 用于 GEO（Generative Engine Optimization）和传统 SEO
 * 帮助 AI 搜索引擎（ChatGPT、Perplexity、Google AI Overview）理解页面内容
 */

const SITE_URL = 'https://www.toysourcingpartner.com';
const COMPANY_NAME = 'Toy Sourcing Partner';
const COMPANY_DESC = 'Your trusted toy sourcing partner in Chenghai, China. Specializing in beach toys, bubble toys, remote control toys and building blocks. OEM/ODM, wholesale supply and global export.';

/** Organization Schema */
export function organizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: COMPANY_NAME,
    url: SITE_URL,
    description: COMPANY_DESC,
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Chenghai, Shantou',
      addressRegion: 'Guangdong',
      addressCountry: 'CN',
    },
    areaServed: 'Worldwide',
    knowsAbout: [
      'Beach Toys',
      'Bubble Toys',
      'Remote Control Toys',
      'Building Blocks',
      'Toy Sourcing',
      'OEM ODM Toys',
      'Toy Manufacturing',
      'Chenghai Toy Supply Chain',
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'sales',
      email: 'sales@toysourcingpartner.com',
      availableLanguage: ['English', 'Chinese'],
    },
  };
}

/** WebSite Schema（含搜索功能） */
export function websiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: COMPANY_NAME,
    url: SITE_URL,
    description: COMPANY_DESC,
    inLanguage: 'en',
    publisher: {
      '@type': 'Organization',
      name: COMPANY_NAME,
    },
  };
}

/** Product Schema */
export function productSchema(product: {
  name: string;
  description: string;
  image?: string;
  category?: string;
  itemNumber?: string;
  moq?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description,
    image: product.image ? `${SITE_URL}${product.image}` : undefined,
    category: product.category,
    mpn: product.itemNumber,
    brand: {
      '@type': 'Brand',
      name: COMPANY_NAME,
    },
    additionalProperty: [
      product.itemNumber ? { '@type': 'PropertyValue', name: 'Item Number', value: product.itemNumber } : null,
      product.moq ? { '@type': 'PropertyValue', name: 'Minimum Order Quantity', value: product.moq } : null,
    ].filter(Boolean),
    offers: {
      '@type': 'Offer',
      availability: 'https://schema.org/InStock',
      priceCurrency: 'USD',
      eligibleQuantity: {
        '@type': 'QuantitativeValue',
        value: product.moq ? parseInt(product.moq) || 100 : 100,
      },
    },
  };
}

/** FAQPage Schema — GEO 最重要的格式，AI 搜索引擎优先提取 */
export function faqSchema(faqs: Array<{ question: string; answer: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

/** BlogPosting Schema */
export function blogPostSchema(post: {
  title: string;
  description: string;
  author?: string;
  datePublished?: string;
  dateModified?: string;
  image?: string;
  category?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.description,
    image: post.image ? `${SITE_URL}${post.image}` : undefined,
    datePublished: post.datePublished || new Date().toISOString(),
    dateModified: post.dateModified || post.datePublished || new Date().toISOString(),
    author: {
      '@type': 'Organization',
      name: post.author || COMPANY_NAME,
    },
    publisher: {
      '@type': 'Organization',
      name: COMPANY_NAME,
      url: SITE_URL,
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': SITE_URL,
    },
    articleSection: post.category,
  };
}

/** BreadcrumbList Schema */
export function breadcrumbSchema(items: Array<{ name: string; url: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${SITE_URL}${item.url}`,
    })),
  };
}

/** Service Schema — 用于 OEM/服务页面 */
export function serviceSchema(service: {
  name: string;
  description: string;
  areaServed?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.name,
    description: service.description,
    provider: {
      '@type': 'Organization',
      name: COMPANY_NAME,
    },
    areaServed: service.areaServed || 'Worldwide',
  };
}

/** CollectionPage Schema — 用于产品分类页 */
export function collectionPageSchema(category: {
  name: string;
  description: string;
  products?: Array<{ name: string; url: string }>;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: category.name,
    description: category.description,
    url: `${SITE_URL}/products/${category.name.toLowerCase().replace(/\s+/g, '-')}`,
    hasPart: category.products?.map((p) => ({
      '@type': 'Product',
      name: p.name,
      url: `${SITE_URL}${p.url}`,
    })),
  };
}

/** HowTo Schema — 用于采购流程类内容（GEO 友好） */
export function howToSchema(title: string, steps: Array<{ name: string; text: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: title,
    step: steps.map((step, index) => ({
      '@type': 'HowToStep',
      position: index + 1,
      name: step.name,
      text: step.text,
    })),
  };
}
