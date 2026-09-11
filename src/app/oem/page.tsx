import type { Metadata } from 'next';

import OemPageContent from '@/components/sections/OemPageContent';
import { serviceSchema, faqSchema, breadcrumbSchema } from '@/lib/structuredData';

export const metadata: Metadata = {
  title: 'OEM & ODM Toy Customization | Chenghai Toy Manufacturing',
  description:
    'Professional OEM and ODM toy customization services from Chenghai, China. Custom logo, packaging, colors, molds and product development for toy importers and brands worldwide.',
  keywords: [
    'OEM toys',
    'ODM toys',
    'custom toy manufacturing',
    'private label toys',
    'toy product development',
    'custom mold toys',
    'Chenghai OEM',
  ],
  openGraph: {
    title: 'OEM & ODM Toy Customization | Chenghai Toy Manufacturing',
    description:
      'Professional OEM and ODM toy customization services from Chenghai, China. Custom logo, packaging, colors, molds and product development.',
    url: '/oem',
  },
};

export default function OemPage() {
  const serviceJsonLd = JSON.stringify(
    serviceSchema({
      name: 'OEM & ODM Toy Customization',
      description:
        'Custom logo printing, packaging design, color customization, custom molds and product development for toys from Chenghai, China.',
    }),
  );

  const faqJsonLd = JSON.stringify(
    faqSchema([
      {
        question: 'What OEM services do you offer for toys?',
        answer:
          'We offer logo printing, custom packaging, color changes, custom barcodes, and selected product development. Our team coordinates with Chenghai factories to deliver customized toy products.',
      },
      {
        question: 'Can you develop a completely new toy product?',
        answer:
          'Yes, we support ODM product development including 3D design, prototyping, mold making and production. Lead time for new molds is typically 30-45 days depending on complexity.',
      },
      {
        question: 'What is the MOQ for customized toys?',
        answer:
          'MOQ for logo printing is typically 500-1000 pieces per item. New mold projects may require 2000-5000 pieces. Contact us for specific quotations.',
      },
    ]),
  );

  const breadcrumbJsonLd = JSON.stringify(
    breadcrumbSchema([
      { name: 'Home', url: '/' },
      { name: 'OEM & ODM', url: '/oem' },
    ]),
  );

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serviceJsonLd }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: faqJsonLd }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: breadcrumbJsonLd }} />
      <OemPageContent />
    </>
  );
}
