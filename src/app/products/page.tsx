import type { Metadata } from 'next';
import { Home } from 'lucide-react';

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import ProductFilter from '@/components/products/ProductFilter';
import { getProducts, getCategories } from '@/lib/server-data';
import { collectionPageSchema, breadcrumbSchema, faqSchema } from '@/lib/structuredData';

export const revalidate = 3600;

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'All Products | Chenghai Toy Sourcing and Wholesale',
    description:
      'Browse our complete toy product range from Chenghai, China: beach toys, bubble toys, remote control toys and building blocks. Request quotes, download catalog and source directly.',
    keywords: ['all toys', 'beach toys', 'bubble toys', 'RC toys', 'building blocks', 'wholesale', 'Chenghai'],
    alternates: { canonical: '/products' },
    openGraph: {
      title: 'All Products | Chenghai Toy Sourcing and Wholesale',
      description:
        'Browse our complete toy product range from Chenghai, China: beach toys, bubble toys, remote control toys and building blocks.',
      type: 'website',
    },
  };
}

export default async function ProductsPage() {
  const [products, categories] = await Promise.all([
    getProducts(),
    getCategories(),
  ]);

  const pageDesc =
    'Browse our complete toy product range from Chenghai, China: beach toys, bubble toys, remote control toys and building blocks. Request quotes, download catalog and source directly.';

  const collectionJsonLd = JSON.stringify(
    collectionPageSchema({ name: 'All Products', description: pageDesc }),
  );
  const breadcrumbJsonLd = JSON.stringify(
    breadcrumbSchema([
      { name: 'Home', url: '/' },
      { name: 'Products', url: '/products' },
    ]),
  );
  const faqJsonLd = JSON.stringify(
    faqSchema([
      { question: 'Can I customize toys with my own logo?', answer: 'Yes, we support OEM customization including logo printing, custom packaging, color changes and selected product development. Contact us for customization options and MOQ requirements.' },
      { question: 'What is the typical lead time for toy orders?', answer: 'Standard products usually ship within 15-25 days. Customized products with new tooling may require 30-45 days. Exact lead times depend on order quantity and customization complexity.' },
    ]),
  );

  return (
    <div className="min-h-screen bg-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: collectionJsonLd }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: breadcrumbJsonLd }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: faqJsonLd }} />

      {/* Hero / Breadcrumb */}
      <section className="w-full bg-[#F5F7FA] py-12 md:py-16">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <Breadcrumb className="mb-4">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">
                  <Home className="size-3" />
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <span className="font-medium text-[#071A2D]">Products</span>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <h1 className="text-3xl font-bold text-[#071A2D] md:text-4xl">
            All Products
          </h1>
          <p className="mt-2 max-w-2xl text-muted-foreground">
            Explore our complete range of quality toys. Use filters to find exactly
            what you need.
          </p>
        </div>
      </section>

      <ProductFilter products={products} categories={categories} activeCategory="all" />
    </div>
  );
}
