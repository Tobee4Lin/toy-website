import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Home, Check, Package, Box } from 'lucide-react';

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import ProductGallery from '@/components/products/ProductGallery';
import ProductInquiryCard from '@/components/products/ProductInquiryCard';
import ProductCard from '@/components/products/ProductCard';
import WhatsAppFloat from '@/components/WhatsAppFloat';
import { getProductBySlug, getProducts, getAllProductSlugs } from '@/lib/server-data';
import { productSchema, breadcrumbSchema } from '@/lib/structuredData';

export const revalidate = 3600;

export async function generateStaticParams() {
  const slugs = await getAllProductSlugs();
  return slugs.map((slug) => ({ slug }));
}

interface ProductDetailPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: ProductDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    return { title: 'Product Not Found' };
  }

  const title = `${product.name} | ${product.categoryLabel} Wholesale`;
  const description = product.description || `${product.name} - Source directly from Chenghai, China. Request quote, check MOQ and customization options.`;

  return {
    title,
    description,
    keywords: [product.name, product.itemNumber, product.categoryLabel, 'wholesale', 'Chenghai', 'toy sourcing'],
    alternates: {
      canonical: `/product/${product.slug}`,
    },
    openGraph: {
      title,
      description,
      type: 'website',
      url: `/product/${product.slug}`,
      images: product.imageUrl ? [{ url: product.imageUrl, alt: product.name }] : undefined,
    },
  };
}

export default async function ProductDetailPage({ params }: ProductDetailPageProps) {
  const { slug } = await params;
  const [product, allProducts] = await Promise.all([
    getProductBySlug(slug),
    getProducts(),
  ]);

  if (!product) {
    notFound();
  }

  const galleryImages =
    product.galleryImages.length > 0 ? product.galleryImages : [product.imageUrl];

  const relatedProducts = allProducts.filter(
    (p) => p.category === product.category && p.id !== product.id,
  );

  const productJsonLd = JSON.stringify(
    productSchema({
      name: product.name,
      description: product.description || product.name,
      image: product.imageUrl,
      category: product.categoryLabel,
      itemNumber: product.itemNumber,
      moq: String(product.moq),
    }),
  );
  const breadcrumbJsonLd = JSON.stringify(
    breadcrumbSchema([
      { name: 'Home', url: '/' },
      { name: 'Products', url: '/products' },
      { name: product.categoryLabel, url: `/products/${product.category}` },
      { name: product.name, url: `/product/${slug}` },
    ]),
  );

  return (
    <div className="min-h-screen bg-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: productJsonLd }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: breadcrumbJsonLd }} />

      {/* Breadcrumb */}
      <div className="w-full border-b border-border bg-[#F5F7FA]">
        <div className="mx-auto max-w-7xl px-4 py-3 md:px-6">
          <Breadcrumb>
            <BreadcrumbList className="text-xs">
              <BreadcrumbItem>
                <BreadcrumbLink href="/">
                  <Home className="size-3" />
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="/products">Products</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href={`/products/${product.category}`}>
                  {product.categoryLabel}
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <span className="font-medium text-[#071A2D]">{product.name}</span>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </div>

      {/* Main */}
      <div className="mx-auto max-w-7xl px-4 py-8 md:px-6 md:py-12">
        <div className="grid gap-8 lg:grid-cols-[1fr_400px]">
          {/* Left: Gallery + Info */}
          <div>
            <ProductGallery
              images={galleryImages}
              productName={product.name}
              isFeatured={product.isFeatured}
              certifications={product.certifications}
            />

            {/* Tabs */}
            <div className="mt-8">
              <Tabs defaultValue="description">
                <TabsList className="w-full justify-start overflow-x-auto">
                  <TabsTrigger value="description">Description</TabsTrigger>
                  <TabsTrigger value="features">Features</TabsTrigger>
                  <TabsTrigger value="specifications">Specifications</TabsTrigger>
                  <TabsTrigger value="packaging">Packaging</TabsTrigger>
                  <TabsTrigger value="customization">Customization</TabsTrigger>
                  <TabsTrigger value="faq">FAQ</TabsTrigger>
                </TabsList>

                <TabsContent value="description" className="pt-6">
                  <h3 className="mb-3 text-lg font-bold text-[#071A2D]">
                    Product Description
                  </h3>
                  <p className="leading-relaxed text-muted-foreground">
                    {product.description}
                  </p>
                  <p className="mt-4 leading-relaxed text-muted-foreground">
                    This product is manufactured in Chenghai, China — the world&apos;s
                    toy capital. We ensure rigorous quality control at every stage of
                    production and support full OEM customization to meet your
                    brand&apos;s specific requirements.
                  </p>
                </TabsContent>

                <TabsContent value="features" className="pt-6">
                  <h3 className="mb-3 text-lg font-bold text-[#071A2D]">
                    Key Features
                  </h3>
                  <ul className="grid gap-3 sm:grid-cols-2">
                    {product.features.map((f, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <Check className="mt-0.5 size-4 shrink-0 text-[#1565FF]" />
                        <span className="text-sm text-foreground">{f}</span>
                      </li>
                    ))}
                  </ul>
                </TabsContent>

                <TabsContent value="specifications" className="pt-6">
                  <h3 className="mb-3 text-lg font-bold text-[#071A2D]">
                    Specifications
                  </h3>
                  <div className="overflow-hidden rounded-lg border border-border">
                    <table className="w-full text-sm">
                      <tbody className="divide-y divide-border">
                        <tr>
                          <td className="bg-muted/30 px-4 py-2.5 font-medium text-muted-foreground">
                            Item Number
                          </td>
                          <td className="px-4 py-2.5 font-mono">{product.itemNumber}</td>
                        </tr>
                        <tr>
                          <td className="bg-muted/30 px-4 py-2.5 font-medium text-muted-foreground">
                            Category
                          </td>
                          <td className="px-4 py-2.5">{product.categoryLabel}</td>
                        </tr>
                        <tr>
                          <td className="bg-muted/30 px-4 py-2.5 font-medium text-muted-foreground">
                            MOQ
                          </td>
                          <td className="px-4 py-2.5">
                            {product.moq.toLocaleString()} pcs
                          </td>
                        </tr>
                        <tr>
                          <td className="bg-muted/30 px-4 py-2.5 font-medium text-muted-foreground">
                            Age Range
                          </td>
                          <td className="px-4 py-2.5">{product.ageRange}</td>
                        </tr>
                        <tr>
                          <td className="bg-muted/30 px-4 py-2.5 font-medium text-muted-foreground">
                            Lead Time
                          </td>
                          <td className="px-4 py-2.5">{product.leadTime}</td>
                        </tr>
                        <tr>
                          <td className="bg-muted/30 px-4 py-2.5 font-medium text-muted-foreground">
                            Customizable
                          </td>
                          <td className="px-4 py-2.5">
                            {product.customizable ? (
                              <span className="text-[#1565FF]">Yes — OEM available</span>
                            ) : (
                              'Limited (logo only)'
                            )}
                          </td>
                        </tr>
                        <tr>
                          <td className="bg-muted/30 px-4 py-2.5 font-medium text-muted-foreground">
                            Certifications
                          </td>
                          <td className="px-4 py-2.5">
                            {product.certifications.join(' · ')}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </TabsContent>

                <TabsContent value="packaging" className="pt-6">
                  <h3 className="mb-3 text-lg font-bold text-[#071A2D]">
                    Packaging Details
                  </h3>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <Card>
                      <CardContent className="p-5">
                        <Package className="mb-2 size-6 text-[#1565FF]" />
                        <div className="text-sm font-semibold text-[#071A2D]">
                          Primary Package
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {product.packaging}
                        </div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-5">
                        <Box className="mb-2 size-6 text-[#FF7A00]" />
                        <div className="text-sm font-semibold text-[#071A2D]">
                          Carton Packaging
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Standard export carton, customizable
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                  <p className="mt-4 text-sm text-muted-foreground">
                    OEM packaging available: custom color boxes, blister cards, gift
                    boxes, display boxes, and more. Contact us for packaging design
                    services.
                  </p>
                </TabsContent>

                <TabsContent value="customization" className="pt-6">
                  <h3 className="mb-3 text-lg font-bold text-[#071A2D]">
                    Customization Options
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {product.customizationOptions.map((opt) => (
                      <span
                        key={opt}
                        className="rounded-md border border-border px-3 py-1 text-sm"
                      >
                        {opt}
                      </span>
                    ))}
                  </div>
                  <p className="mt-4 text-sm text-muted-foreground">
                    We offer comprehensive OEM and ODM services. From simple logo
                    printing to full product development, our team can bring your
                    ideas to production.{' '}
                    <Link href="/oem" className="text-[#1565FF] hover:underline">
                      Learn more about OEM service →
                    </Link>
                  </p>
                </TabsContent>

                <TabsContent value="faq" className="pt-6">
                  <h3 className="mb-3 text-lg font-bold text-[#071A2D]">
                    Common Questions
                  </h3>
                  <div className="space-y-4">
                    {[
                      {
                        q: 'What is the minimum order quantity?',
                        a: `The standard MOQ for this product is ${product.moq.toLocaleString()} pieces. We can sometimes accommodate lower quantities for sample orders — contact our team to discuss.`,
                      },
                      {
                        q: 'Can I get a sample before placing an order?',
                        a: 'Yes, samples are available. Sample fees may apply depending on the product and customization level, and are often refundable on bulk orders.',
                      },
                      {
                        q: 'What certifications does this product have?',
                        a: `This product is tested to meet ${product.certifications.join(', ')} standards. We can provide test reports from accredited third-party laboratories.`,
                      },
                    ].map((faq, i) => (
                      <div
                        key={i}
                        className="rounded-xl border border-border/50 bg-white p-4"
                      >
                        <div className="font-semibold text-[#071A2D]">{faq.q}</div>
                        <p className="mt-2 text-sm text-muted-foreground">{faq.a}</p>
                      </div>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>

          {/* Right: Sticky inquiry card */}
          <ProductInquiryCard product={product} />
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-16">
            <h2 className="mb-6 text-2xl font-bold text-[#071A2D]">
              Related Products
            </h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} variant="compact" />
              ))}
            </div>
          </div>
        )}
      </div>

      <WhatsAppFloat productName={product.name} itemNumber={product.itemNumber} />
    </div>
  );
}
