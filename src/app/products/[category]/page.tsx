import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Home } from 'lucide-react';

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Image } from '@/components/ui/image';
import ProductFilter from '@/components/products/ProductFilter';
import { getProducts, getCategories, getAllCategorySlugs } from '@/lib/server-data';
import { collectionPageSchema, breadcrumbSchema, faqSchema } from '@/lib/structuredData';

export const revalidate = 3600;

export async function generateStaticParams() {
  const slugs = await getAllCategorySlugs();
  return slugs.map((category) => ({ category }));
}

interface CategoryPageProps {
  params: Promise<{ category: string }>;
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { category } = await params;
  const categories = await getCategories();
  const cat = categories.find((c) => c.slug === category);

  if (!cat) {
    return {
      title: 'Category Not Found',
    };
  }

  const title = `${cat.name} Wholesale | Chenghai Toy Sourcing`;
  const description = `Source ${cat.name.toLowerCase()} directly from Chenghai, China. ${cat.description || 'Competitive wholesale prices, OEM/ODM customization and reliable export.'}`;

  return {
    title,
    description,
    keywords: [cat.name, cat.slug, 'wholesale', 'Chenghai', 'toy sourcing'],
    openGraph: {
      title,
      description,
      type: 'website',
    },
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category } = await params;
  const [products, categories] = await Promise.all([
    getProducts(),
    getCategories(),
  ]);

  const cat = categories.find((c) => c.slug === category);

  if (!cat) {
    notFound();
  }

  const categoryProducts = products.filter((p) => p.category === category);
  const categoryProductCount = categoryProducts.length;
  const hasCustomizable = categoryProducts.some((p) => p.customizable);

  const pageDesc = `Source ${cat.name.toLowerCase()} directly from Chenghai, China. ${cat.description || 'Competitive wholesale prices, OEM/ODM customization and reliable export.'}`;

  const collectionJsonLd = JSON.stringify(
    collectionPageSchema({
      name: cat.name,
      description: pageDesc,
      products: categoryProducts.map((p) => ({
        name: p.name,
        url: `/product/${p.slug}`,
      })),
    }),
  );
  const breadcrumbJsonLd = JSON.stringify(
    breadcrumbSchema([
      { name: 'Home', url: '/' },
      { name: 'Products', url: '/products' },
      { name: cat.name, url: `/products/${cat.slug}` },
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
      <section className="relative w-full overflow-hidden bg-[#071A2D] text-white">
        {cat.heroImageUrl && (
          <div className="absolute inset-0">
            <Image
              src={cat.heroImageUrl}
              alt={cat.name}
              className="h-full w-full object-cover opacity-25"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#071A2D] via-[#071A2D]/90 to-[#071A2D]/60" />
          </div>
        )}
        <div className="relative mx-auto max-w-7xl px-4 py-16 md:px-6 md:py-20">
          <Breadcrumb className="mb-4">
            <BreadcrumbList className="text-white/60">
              <BreadcrumbItem>
                <BreadcrumbLink href="/" className="text-white/60 hover:text-white">
                  <Home className="size-3" />
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="/products" className="text-white/60 hover:text-white">
                  Products
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <span className="text-white">{cat.name}</span>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          <h1 className="text-3xl font-bold md:text-5xl">
            {cat.name}
          </h1>
          <p className="mt-3 max-w-2xl text-white/70">
            {cat.description}
          </p>
          <div className="mt-6 flex gap-6 text-sm">
            <div>
              <span className="text-2xl font-bold text-white">
                {categoryProductCount > 10 ? `${categoryProductCount}+` : categoryProductCount}
              </span>
              <span className="ml-2 text-white/50">Products</span>
            </div>
            {hasCustomizable && (
              <div>
                <span className="text-2xl font-bold text-[#FF7A00]">OEM</span>
                <span className="ml-2 text-white/50">Available</span>
              </div>
            )}
          </div>
        </div>
      </section>

      <ProductFilter products={products} categories={categories} activeCategory={category} />
    </div>
  );
}
