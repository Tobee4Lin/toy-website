import type { Metadata } from 'next';

import FaqPageContent from '@/components/sections/FaqPageContent';
import { faqSchema, breadcrumbSchema } from '@/lib/structuredData';

export const metadata: Metadata = {
  title: 'FAQ | Toy Manufacturing, OEM, Shipping & Payment Questions',
  description:
    'Frequently asked questions about toy manufacturing from Chenghai, China. MOQ, lead times, OEM/ODM, payment terms, shipping methods, certifications and sample policies.',
  keywords: [
    'toy manufacturing FAQ',
    'toy wholesale questions',
    'OEM toy FAQ',
    'shipping toys from China',
    'toy payment terms',
  ],
  openGraph: {
    title: 'FAQ | Toy Manufacturing, OEM, Shipping & Payment Questions',
    description:
      'Frequently asked questions about toy manufacturing from Chenghai, China. MOQ, lead times, OEM/ODM, payment terms, shipping methods, certifications and sample policies.',
    url: '/faq',
  },
};

export default function FaqPage() {
  const faqJsonLd = JSON.stringify(
    faqSchema([
      {
        question: 'What is the minimum order quantity?',
        answer:
          'MOQ varies by product. Standard items typically start from 100-500 pieces per item. Customized products may require higher MOQ. Contact us for specific product quotations.',
      },
      {
        question: 'What payment terms do you accept?',
        answer:
          'We typically accept T/T (30% deposit, 70% before shipment), L/C at sight for larger orders, and other negotiable terms. Contact our sales team for details.',
      },
      {
        question: 'How long does production and shipping take?',
        answer:
          'Standard products: 15-25 days production. Sea freight: 20-35 days depending on destination. Air freight: 5-10 days. Total lead time varies by order size and customization.',
      },
      {
        question: 'Can I get samples before placing a bulk order?',
        answer:
          'Yes, we can provide samples. Sample fees may apply and are typically refundable upon bulk order confirmation. Sample delivery takes 5-10 days via express courier.',
      },
    ]),
  );

  const breadcrumbJsonLd = JSON.stringify(
    breadcrumbSchema([
      { name: 'Home', url: '/' },
      { name: 'FAQ', url: '/faq' },
    ]),
  );

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: faqJsonLd }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: breadcrumbJsonLd }} />
      <FaqPageContent />
    </>
  );
}
