import type { Metadata } from 'next';

import QualityPageContent from '@/components/sections/QualityPageContent';
import { serviceSchema, faqSchema, breadcrumbSchema } from '@/lib/structuredData';

export const metadata: Metadata = {
  title: 'Quality Control & Certifications | Toy Safety Standards',
  description:
    'Professional toy quality assurance including material inspection, in-process inspection, finished product inspection and pre-shipment inspection. EN71, ASTM, CPSIA, CE certification support for toy exports.',
  keywords: [
    'toy quality control',
    'toy safety standards',
    'EN71',
    'ASTM',
    'CPSIA',
    'CE certification toys',
    'toy inspection China',
    'pre-shipment inspection',
  ],
  openGraph: {
    title: 'Quality Control & Certifications | Toy Safety Standards',
    description:
      'Professional toy quality assurance including material inspection, in-process inspection, finished product inspection and pre-shipment inspection. EN71, ASTM, CPSIA, CE certification support.',
    url: '/quality',
  },
};

export default function QualityPage() {
  const serviceJsonLd = JSON.stringify(
    serviceSchema({
      name: 'Toy Quality Control & Certification Support',
      description:
        'Four-stage quality inspection process: incoming material, in-process, finished product and pre-shipment. Certification support for EN71, ASTM, CPSIA, CE and other market standards.',
    }),
  );

  const faqJsonLd = JSON.stringify(
    faqSchema([
      {
        question: 'What toy safety certifications do you support?',
        answer:
          'We support EN71 (EU), ASTM F963 (US), CPSIA (US), CE (EU) and other market-specific certifications. Certification requirements vary by product and destination market. Contact us for specific certification options.',
      },
      {
        question: 'How do you ensure product quality?',
        answer:
          'We follow a four-stage inspection process: incoming material inspection, in-process production inspection, finished product inspection, and pre-shipment inspection. We coordinate with factory QC teams and can arrange third-party inspections.',
      },
    ]),
  );

  const breadcrumbJsonLd = JSON.stringify(
    breadcrumbSchema([
      { name: 'Home', url: '/' },
      { name: 'Quality', url: '/quality' },
    ]),
  );

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serviceJsonLd }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: faqJsonLd }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: breadcrumbJsonLd }} />
      <QualityPageContent />
    </>
  );
}
