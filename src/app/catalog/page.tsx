import type { Metadata } from 'next';

import CatalogPageContent from '@/components/sections/CatalogPageContent';
import { breadcrumbSchema } from '@/lib/structuredData';

export const metadata: Metadata = {
  title: 'Toy Catalog | Product Catalogue | Chenghai Toy Factory',
  description:
    'Explore our toy product catalog featuring beach toys, bubble toys, remote control toys and building blocks manufactured in our Chenghai factory.',
  keywords: [
    'toy catalog',
    'product catalogue',
    'toy product list',
    'wholesale toy catalog',
    'Chenghai toy factory',
  ],
  openGraph: {
    title: 'Toy Catalog | Product Catalogue | Chenghai Toy Factory',
    description:
      'Explore our toy product catalog featuring beach toys, bubble toys, remote control toys and building blocks.',
    url: '/catalog',
  },
};

export default function CatalogPage() {
  const breadcrumbJsonLd = JSON.stringify(
    breadcrumbSchema([
      { name: 'Home', url: '/' },
      { name: 'Catalog', url: '/catalog' },
    ]),
  );

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: breadcrumbJsonLd }} />
      <CatalogPageContent />
    </>
  );
}
