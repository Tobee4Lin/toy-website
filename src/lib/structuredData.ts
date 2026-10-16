/**
 * Structured data generators (Schema.org JSON-LD)
 * Supports GEO (Generative Engine Optimization) and traditional SEO.
 */

import { SITE_URL, COMPANY, getFullAddress, getSocialLinks } from './site-config';

/** Organization Schema */
export function organizationSchema() {
  const socialLinks = getSocialLinks();
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: COMPANY.legalName,
    alternateName: COMPANY.name,
    url: SITE_URL,
    logo: `${SITE_URL}${COMPANY.logoUrl}`,
    description:
      'Toy manufacturer in Chenghai, China. Specializing in beach toys, bubble toys, remote control toys and building blocks. OEM/ODM, wholesale supply and global export.',
    address: {
      '@type': 'PostalAddress',
      streetAddress: COMPANY.address.street,
      addressLocality: COMPANY.address.city,
      addressRegion: COMPANY.address.region,
      addressCountry: COMPANY.address.country,
    },
    foundingDate: String(COMPANY.foundedYear),
    areaServed: 'Worldwide',
    knowsAbout: [
      'Beach Toys',
      'Bubble Toys',
      'Remote Control Toys',
      'Building Blocks',
      'Toy Manufacturing',
      'OEM ODM Toys',
      'Injection Molding',
      'BSCI Certified Toy Factory',
    ],
    hasCredential: COMPANY.certifications.map((cert) => ({
      '@type': 'EducationalOccupationalCredential',
      name: cert,
    })),
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'sales',
      email: COMPANY.email,
      availableLanguage: ['English', 'Chinese'],
    },
    ...(socialLinks.length > 0 ? { sameAs: socialLinks } : {}),
  };
}

/** WebSite Schema (with SearchAction) */
export function websiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: COMPANY.name,
    url: SITE_URL,
    description:
      'Toy manufacturer in Chenghai, China. Beach toys, bubble toys, remote control toys and building blocks.',
    inLanguage: 'en',
    publisher: {
      '@type': 'Organization',
      name: COMPANY.legalName,
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}${COMPANY.logoUrl}`,
      },
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${SITE_URL}/products?search={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };
}

/**
 * Product detail page schema (ItemPage).
 *
 * This is a B2B / wholesale inquiry site with no public price, reviews or
 * ratings. Google's Product rich result requires one of `offers` (with price),
 * `review` or `aggregateRating`, so emitting a bare `Product` would only
 * produce non-eligible "invalid product" reports in Search Console without
 * any ranking benefit. We instead describe the page as an ItemPage with the
 * key product facts (item number, MOQ) as named properties. The brand,
 * manufacturer and MPN are also present in the visible page content.
 */
export function productPageSchema(product: {
  name: string;
  description: string;
  image?: string;
  category?: string;
  itemNumber?: string;
  moq?: string;
  slug?: string;
}) {
  const imageUrl = product.image
    ? product.image.startsWith('http')
      ? product.image
      : `${SITE_URL}${product.image}`
    : undefined;
  const url = product.slug ? `${SITE_URL}/product/${product.slug}` : SITE_URL;

  const facts = [
    product.itemNumber
      ? { '@type': 'PropertyValue', name: 'Item Number', value: product.itemNumber }
      : null,
    product.moq
      ? {
          '@type': 'PropertyValue',
          name: 'Minimum Order Quantity',
          value: `${product.moq} pieces`,
        }
      : null,
    product.category
      ? { '@type': 'PropertyValue', name: 'Product Category', value: product.category }
      : null,
    {
      '@type': 'PropertyValue',
      name: 'Manufacturer',
      value: COMPANY.legalName,
    },
    {
      '@type': 'PropertyValue',
      name: 'Brand',
      value: COMPANY.name,
    },
  ].filter(Boolean);

  return {
    '@context': 'https://schema.org',
    '@type': 'ItemPage',
    name: product.name,
    description: product.description,
    url,
    ...(imageUrl ? { image: imageUrl } : {}),
    isPartOf: {
      '@type': 'WebSite',
      name: COMPANY.name,
      url: SITE_URL,
    },
    about: {
      '@type': 'Thing',
      name: product.name,
      ...(product.category ? { category: product.category } : {}),
      identifier: product.itemNumber
        ? { '@type': 'PropertyValue', name: 'Item Number', value: product.itemNumber }
        : undefined,
      additionalProperty: facts,
    },
  };
}

/** FAQPage Schema */
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
  slug?: string;
}) {
  const imageUrl = post.image
    ? post.image.startsWith('http')
      ? post.image
      : `${SITE_URL}${post.image}`
    : undefined;

  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.description,
    ...(imageUrl ? { image: imageUrl } : {}),
    ...(post.slug ? { mainEntityOfPage: `${SITE_URL}/blog/${post.slug}` } : {}),
    datePublished: post.datePublished || new Date().toISOString().split('T')[0],
    dateModified: post.dateModified || post.datePublished || new Date().toISOString().split('T')[0],
    author: {
      '@type': 'Organization',
      name: post.author || COMPANY.legalName,
    },
    publisher: {
      '@type': 'Organization',
      name: COMPANY.legalName,
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}${COMPANY.logoUrl}`,
      },
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
      item: item.url.startsWith('http') ? item.url : `${SITE_URL}${item.url}`,
    })),
  };
}

/** Service Schema */
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
      name: COMPANY.legalName,
    },
    areaServed: service.areaServed || 'Worldwide',
  };
}

/** CollectionPage Schema */
export function collectionPageSchema(category: {
  name: string;
  description: string;
  slug?: string;
  products?: Array<{ name: string; url: string }>;
}) {
  const slug = category.slug ?? category.name.toLowerCase().replace(/\s+/g, '-');
  const pageUrl = slug ? `${SITE_URL}/products/${slug}` : `${SITE_URL}/products`;
  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: category.name,
    description: category.description,
    url: pageUrl,
    hasPart: category.products?.map((p) => ({
      '@type': 'WebPage',
      name: p.name,
      url: p.url.startsWith('http') ? p.url : `${SITE_URL}${p.url}`,
    })),
  };
}

/** HowTo Schema */
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
