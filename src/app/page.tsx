import type { Metadata } from 'next';

import HeroSection from '@/components/sections/home/HeroSection';
import WhyChooseUsSection from '@/components/sections/home/WhyChooseUsSection';
import ProductUniverseSection from '@/components/sections/home/ProductUniverseSection';
import FeaturedProductsSection from '@/components/sections/home/FeaturedProductsSection';
import OemSection from '@/components/sections/home/OemSection';
import FactorySection from '@/components/sections/home/FactorySection';
import QualitySection from '@/components/sections/home/QualitySection';
import GlobalMarketSection from '@/components/sections/home/GlobalMarketSectionClient';
import BlogPreviewSection from '@/components/sections/home/BlogPreviewSection';
import FinalCtaSection from '@/components/sections/home/FinalCtaSection';
import { faqSchema, howToSchema } from '@/lib/structuredData';
import { getProducts, getCategories, getBlogPosts } from '@/lib/server-data';

export const metadata: Metadata = {
  title: 'Levich Toys | Chenghai Toy Manufacturer & Wholesale Supplier',
  description:
    'Your trusted toy manufacturer in Chenghai, China. Manufacture beach toys, bubble toys, remote control toys and building blocks directly from China\'s toy capital. OEM/ODM, wholesale supply and global export.',
  keywords: [
    'toy manufacturing',
    'Chenghai toys',
    'beach toys',
    'bubble toys',
    'RC toys',
    'building blocks',
    'toy manufacturer',
    'toy wholesale',
    'China toy supplier',
    'OEM toys',
  ],
  openGraph: {
    title: 'Levich Toys | Chenghai Toy Manufacturer & Wholesale Supplier',
    description:
      'Your trusted toy manufacturer in Chenghai, China. Manufacture beach toys, bubble toys, remote control toys and building blocks directly from China\'s toy capital.',
    url: '/',
  },
};

export default async function HomePage() {
  const [products, categories, posts] = await Promise.all([
    getProducts(),
    getCategories(),
    getBlogPosts(),
  ]);

  const faqJsonLd = JSON.stringify(
    faqSchema([
      {
        question: 'What products does Levich Toys manufacture?',
        answer:
          'We manufacture four main toy categories at our factory: beach toys (sand toys, beach buckets, shovels), bubble toys (bubble wands, bubble guns, bubble machines), remote control toys (RC cars, stunt cars, RC helicopters) and plastic building blocks (educational blocks, STEM blocks, creative construction sets).',
      },
      {
        question: 'Where is Levich Toys located?',
        answer:
          'We are based in Chenghai District, Shantou, Guangdong, China — known as China\'s toy capital and the world\'s largest toy manufacturing cluster, with thousands of toy factories and a mature supply chain.',
      },
      {
        question: 'Do you offer OEM and ODM services?',
        answer:
          'Yes. We support OEM (custom logo, packaging, colors) and ODM (product development, custom molds) at our factory, with flexible support for different order requirements.',
      },
      {
        question: 'What is the minimum order quantity for toys?',
        answer:
          'MOQ varies by product category. Standard items typically start from 100-500 pieces per item. Customized products with new molds may require higher MOQ. Contact us for specific product quotations.',
      },
      {
        question: 'How do I request a quote?',
        answer:
          'Use the Request a Quote button on any product page, or visit the Contact page. We typically respond within 24 hours.',
      },
    ]),
  );

  const howToJsonLd = JSON.stringify(
    howToSchema('How to Order Toys from Our Factory', [
      { name: 'Browse Products', text: 'Explore our manufactured product categories: beach toys, bubble toys, RC toys and building blocks.' },
      { name: 'Request a Quote', text: 'Submit an inquiry with product details, quantity and customization requirements.' },
      { name: 'Confirm Samples', text: 'We prepare samples within 7 days so you can verify quality before bulk orders.' },
      { name: 'Production & QC', text: 'Our factory handles production and multi-stage quality inspection.' },
      { name: 'Shipping & Delivery', text: 'We arrange sea/air freight and prepare export documentation.' },
    ]),
  );

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: faqJsonLd }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: howToJsonLd }} />
      <div className="min-h-screen bg-white">
        <HeroSection />
        <WhyChooseUsSection />
        <ProductUniverseSection categories={categories} products={products} />
        <FeaturedProductsSection products={products} />
        <OemSection />
        <FactorySection />
        <QualitySection />
        <GlobalMarketSection />
        <BlogPreviewSection posts={posts} />
        <FinalCtaSection />
      </div>
    </>
  );
}
