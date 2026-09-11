import type { Metadata } from 'next';

import FactoryPageContent from '@/components/sections/FactoryPageContent';
import { serviceSchema, faqSchema, breadcrumbSchema } from '@/lib/structuredData';

export const metadata: Metadata = {
  title: 'Factory & Supply Chain | Chenghai Toy Manufacturing Network',
  description:
    "Access Chenghai's mature toy manufacturing supply chain. Factory cooperation, production coordination, injection molding, assembly, packaging and quality inspection for global toy buyers.",
  keywords: [
    'toy factory China',
    'Chenghai toy factory',
    'toy supply chain',
    'toy manufacturing',
    'injection molding toys',
    'toy assembly',
    'toy production China',
  ],
  openGraph: {
    title: 'Factory & Supply Chain | Chenghai Toy Manufacturing Network',
    description:
      "Access Chenghai's mature toy manufacturing supply chain. Factory cooperation, production coordination, injection molding, assembly, packaging and quality inspection.",
    url: '/factory',
  },
};

export default function FactoryPage() {
  const serviceJsonLd = JSON.stringify(
    serviceSchema({
      name: 'Toy Factory & Supply Chain Coordination',
      description:
        'Factory network cooperation, product sourcing, production coordination, injection molding, assembly, packaging and quality inspection in Chenghai, China.',
    }),
  );

  const faqJsonLd = JSON.stringify(
    faqSchema([
      {
        question: 'Do you own your own toy factory?',
        answer:
          "We operate as a sourcing and manufacturing partner with strong access to Chenghai's toy factory network. We coordinate production, quality control and packaging with verified partner factories.",
      },
      {
        question: 'Can I visit the factories in Chenghai?',
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
