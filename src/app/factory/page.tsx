import type { Metadata } from 'next';

import FactoryPageContent from '@/components/sections/FactoryPageContent';
import { serviceSchema, faqSchema, breadcrumbSchema } from '@/lib/structuredData';

export const metadata: Metadata = {
  title: 'Our Factory | Chenghai Toy Manufacturer',
  description:
    'Our own 20,000sqm toy factory in Chenghai, Shantou. Injection molding, assembly, packaging and quality inspection. BSCI & ISO9001 certified. 7-day sampling, 20-25 day production.',
  keywords: [
    'toy factory China',
    'Chenghai toy factory',
    'toy manufacturer',
    'toy manufacturing',
    'injection molding toys',
    'toy assembly',
    'OEM toy factory',
  ],
  openGraph: {
    title: 'Our Factory | Chenghai Toy Manufacturer',
    description:
      'Our own 20,000sqm toy factory in Chenghai. Injection molding, assembly, packaging and quality inspection. BSCI & ISO9001 certified.',
    url: '/factory',
  },
};

export default function FactoryPage() {
  const serviceJsonLd = JSON.stringify(
    serviceSchema({
      name: 'Toy Manufacturing',
      description:
        'Our own factory: injection molding, assembly, packaging and quality inspection in Chenghai, China.',
    }),
  );

  const faqJsonLd = JSON.stringify(
    faqSchema([
      {
        question: 'Do you own your own toy factory?',
        answer:
          'Yes — we own and operate our own 20,000sqm toy factory in Chenghai, Shantou. We handle injection molding, assembly, quality control and packaging in-house. BSCI and ISO9001 certified.',
      },
      {
        question: 'Can I visit your factory?',
        answer:
          'Yes, we welcome factory visits. Chenghai is easily accessible via Shantou airport or high-speed rail. We can arrange factory tours and product inspections for serious buyers.',
      },
    ]),
  );

  const breadcrumbJsonLd = JSON.stringify(
    breadcrumbSchema([
      { name: 'Home', url: '/' },
      { name: 'Factory', url: '/factory' },
    ]),
  );

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serviceJsonLd }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: faqJsonLd }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: breadcrumbJsonLd }} />
      <FactoryPageContent />
    </>
  );
}
