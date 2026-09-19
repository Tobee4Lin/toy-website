import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Globe, Check, ArrowRight, FileText, Sparkles } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Image } from '@/components/ui/image';
import MarketWhatsAppButton from '@/components/markets/MarketWhatsAppButton';
import { getProducts, getCategories } from '@/lib/server-data';
import { MOCK_MARKETS, type IMarket } from '@/data/markets';
import { breadcrumbSchema, faqSchema } from '@/lib/structuredData';

export const revalidate = 3600;

export async function generateStaticParams() {
  return MOCK_MARKETS.map((m) => ({ country: m.slug }));
}

interface MarketPageProps {
  params: Promise<{ country: string }>;
}

export async function generateMetadata({ params }: MarketPageProps): Promise<Metadata> {
  const { country } = await params;
  const market = MOCK_MARKETS.find((m) => m.slug === country);

  if (!market) {
    return { title: 'Market Not Found' };
  }

  const title = `Toy Sourcing for the ${market.country} Market | ${market.region}`;
  const description = market.overview;

  return {
    title,
    description,
    keywords: [market.country, 'toy sourcing', market.region, 'toy import', 'wholesale toys'],
    alternates: {
      canonical: `/markets/${market.slug}`,
    },
    openGraph: {
      title,
      description,
      type: 'website',
      url: `/markets/${market.slug}`,
    },
  };
}

export default async function MarketPage({ params }: MarketPageProps) {
  const { country } = await params;
  const market: IMarket | undefined = MOCK_MARKETS.find((m) => m.slug === country);

  if (!market) {
    notFound();
  }

  const [products, categories] = await Promise.all([
    getProducts(),
    getCategories(),
  ]);

  // Get relevant category data
  const relevantCats = categories.filter((c) =>
    market.recommendedCategories.includes(c.slug),
  );

  // Get recommended products (from recommended categories, first 6)
  const featuredProducts = products
    .filter((p) => market.recommendedCategories.includes(p.category))
    .slice(0, 6);

  const breadcrumbJsonLd = JSON.stringify(
    breadcrumbSchema([
      { name: 'Home', url: '/' },
      { name: 'Markets', url: '/markets' },
      { name: market.country, url: `/markets/${market.slug}` },
    ]),
  );
  const faqJsonLd = JSON.stringify(faqSchema(market.faqs));

  return (
    <div className="min-h-screen bg-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: breadcrumbJsonLd }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: faqJsonLd }} />

      {/* Hero */}
      <section className="relative w-full overflow-hidden bg-[#071A2D] text-white">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(21_101_255_0.3),transparent_50%)]" />
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />
        <div className="relative mx-auto max-w-6xl px-4 py-20 md:px-6 md:py-24">
          <div className="flex items-center gap-3">
            <span className="text-4xl">{market.flag}</span>
            <div>
              <Badge className="mb-2 bg-[#1565FF] text-white">
                <Globe className="mr-1 size-3" />
                {market.region}
              </Badge>
              <h1 className="text-3xl font-black md:text-5xl">
                Toy Sourcing for the{' '}
                <span className="bg-gradient-to-r from-[#1565FF] to-[#FFC400] bg-clip-text text-transparent">
                  {market.country}
                </span>{' '}
                Market
              </h1>
            </div>
          </div>
          <p className="mt-6 max-w-3xl text-white/80">
            {market.overview}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <MarketWhatsAppButton
              country={market.country}
              fullName={market.country}
              label={market.ctaTitle}
            />
            <Button variant="outline" className="border-white/20 text-white hover:bg-white/10">
              <FileText className="mr-2 size-4" />
              Download Catalog
            </Button>
          </div>
        </div>
      </section>

      {/* Buyer requirements + Safety */}
      <section className="w-full bg-[#F5F7FA] py-16">
        <div className="mx-auto max-w-6xl px-4 md:px-6">
          <div className="grid gap-8 lg:grid-cols-2">
            {/* Buyer Requirements */}
            <div>
              <h2 className="mb-4 text-xl font-bold text-[#071A2D]">
                What {market.country} Buyers Look For
              </h2>
              <Card className="h-full">
                <CardContent className="p-6">
                  <ul className="space-y-3">
                    {market.buyerRequirements.map((req, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <div className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-[#1565FF]/10 text-[#1565FF]">
                          <Check className="size-3" />
                        </div>
                        <span className="text-sm text-foreground">{req}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>

            {/* Safety Standards */}
            <div>
              <h2 className="mb-4 text-xl font-bold text-[#071A2D]">
                Key Safety Standards & Certifications
              </h2>
              <Card className="h-full">
                <CardContent className="p-6">
                  <div className="flex flex-wrap gap-2">
                    {market.safetyStandards.map((std) => (
                      <Badge
                        key={std}
                        className="border-[#1565FF]/20 bg-[#1565FF]/5 text-[#1565FF]"
                      >
                        {std}
                      </Badge>
                    ))}
                  </div>
                  <p className="mt-4 text-xs text-muted-foreground">
                    We coordinate with factories and testing labs to ensure
                    products meet the required standards for the {market.country}{' '}
                    market. Certification availability varies by product —
                    contact us for details on specific items.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Relevant Categories */}
      <section className="w-full py-16">
        <div className="mx-auto max-w-6xl px-4 md:px-6">
          <div className="mb-8 text-center">
            <Badge className="mb-3">Popular Categories</Badge>
            <h2 className="text-2xl font-bold text-[#071A2D] md:text-3xl">
              Top Toy Categories for {market.country}
            </h2>
            <p className="mx-auto mt-2 max-w-xl text-sm text-muted-foreground">
              These categories are particularly well-suited to the{' '}
              {market.country} market based on consumer preferences and demand trends.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {relevantCats.map((cat) => (
              <Link key={cat.id} href={`/products/${cat.slug}`} className="block h-full">
                <Card className="h-full overflow-hidden transition-all hover:-translate-y-1 hover:shadow-lg">
                  <div
                    className="aspect-[4/3] w-full"
                    style={{ backgroundColor: cat.accentColor }}
                  />
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-[#071A2D]">
                      {cat.name}
                    </h3>
                    <p className="mt-1 text-xs text-muted-foreground line-clamp-2">
                      {cat.description}
                    </p>
                    <div className="mt-3 flex items-center text-[#1565FF]">
                      <span className="text-sm font-medium">
                        Explore {cat.name}
                      </span>
                      <ArrowRight className="ml-1 size-3.5" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Import Considerations */}
      <section className="w-full bg-[#F5F7FA] py-16">
        <div className="mx-auto max-w-4xl px-4 md:px-6">
          <div className="mb-8 text-center">
            <Badge className="mb-3">Import Guide</Badge>
            <h2 className="text-2xl font-bold text-[#071A2D] md:text-3xl">
              Importing Toys to {market.country}: Key Considerations
            </h2>
          </div>

          <Card>
            <CardContent className="p-6 md:p-8">
              <ul className="space-y-4">
                {market.importNotes.map((note, i) => (
                  <li key={i} className="flex items-start gap-4">
                    <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-[#FF7A00]/10 font-bold text-[#FF7A00]">
                      {i + 1}
                    </div>
                    <p className="pt-1 text-sm text-foreground">{note}</p>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* FAQ */}
      {market.faqs.length > 0 && (
        <section className="w-full py-16">
          <div className="mx-auto max-w-4xl px-4 md:px-6">
            <div className="mb-8 text-center">
              <Badge className="mb-3">FAQ</Badge>
              <h2 className="text-2xl font-bold text-[#071A2D] md:text-3xl">
                Frequently Asked Questions — {market.country}
              </h2>
            </div>
            <div className="space-y-4">
              {market.faqs.map((faq, i) => (
                <div
                  key={i}
                  className="rounded-xl border border-border/50 bg-white p-6"
                >
                  <div className="font-semibold text-[#071A2D]">{faq.question}</div>
                  <p className="mt-2 text-sm text-muted-foreground">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Recommended Products */}
      {featuredProducts.length > 0 && (
        <section className="w-full py-16">
          <div className="mx-auto max-w-6xl px-4 md:px-6">
            <div className="mb-8 flex items-end justify-between">
              <div>
                <Badge className="mb-3">Recommended</Badge>
                <h2 className="text-2xl font-bold text-[#071A2D] md:text-3xl">
                  Popular Products for {market.country}
                </h2>
              </div>
              <Button variant="outline" asChild className="hidden sm:inline-flex">
                <Link href="/products">
                  View All Products
                  <ArrowRight className="ml-2 size-4" />
                </Link>
              </Button>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {featuredProducts.map((product) => (
                <Link key={product.id} href={`/product/${product.slug}`} className="block h-full">
                  <Card className="h-full overflow-hidden transition-all hover:-translate-y-1 hover:shadow-lg">
                    <div className="aspect-square w-full bg-muted">
                      <Image
                        src={product.imageUrl}
                        alt={product.name}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <CardContent className="p-4">
                      <Badge variant="outline" className="mb-2 text-xs">
                        {product.categoryLabel}
                      </Badge>
                      <h3 className="font-semibold text-[#071A2D] line-clamp-2">
                        {product.name}
                      </h3>
                      <p className="mt-1 text-xs text-muted-foreground">
                        Item No. {product.itemNumber} · {product.categoryLabel}
                      </p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="w-full bg-[#071A2D] py-16 text-white">
        <div className="mx-auto max-w-4xl px-4 text-center md:px-6">
          <Badge className="mb-4 bg-[#FF7A00] text-white">
            <Sparkles className="mr-1 size-3" />
            Sourcing Partner
          </Badge>
          <h2 className="text-2xl font-black md:text-4xl">
            Ready to Source Toys for the {market.country} Market?
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-white/70">
            Tell us about your business and the products you&apos;re looking for.
            We&apos;ll help you find the right toys from Chenghai&apos;s
            manufacturing base.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <MarketWhatsAppButton
              country={market.country}
              fullName={market.country}
              label="Chat on WhatsApp"
            />
            <Button
              variant="outline"
              className="border-white/20 text-white hover:bg-white/10"
              asChild
            >
              <Link href="/contact">Send Inquiry</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
