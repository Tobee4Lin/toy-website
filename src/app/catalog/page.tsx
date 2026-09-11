import type { Metadata } from 'next';

import CatalogPageContent from '@/components/sections/CatalogPageContent';
import { breadcrumbSchema } from '@/lib/structuredData';

export const metadata: Metadata = {
  title: 'Download Toy Catalog | Product Catalogue | Chenghai Toys',
  description:
    'Download our latest toy product catalog featuring beach toys, bubble toys, remote control toys and building blocks. Free catalog download for toy importers and wholesalers.',
  keywords: [
    'toy catalog download',
    'product catalogue',
    'toy product list',
    'wholesale toy catalog',
    'Chenghai toy catalog',
  ],
  openGraph: {
    title: 'Download Toy Catalog | Product Catalogue | Chenghai Toys',
    description:
      'Download our latest toy product catalog featuring beach toys, bubble toys, remote control toys and building blocks. Free catalog download for toy importers and wholesalers.',
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
