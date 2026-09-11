import type { Metadata } from 'next';

import ContactPageContent from '@/components/sections/ContactPageContent';
import { breadcrumbSchema } from '@/lib/structuredData';

export const metadata: Metadata = {
  title: 'Contact Us | Request a Toy Quote | Chenghai Sourcing',
  description:
    'Contact us for toy sourcing, OEM/ODM customization and wholesale quotations. Request a quote, send an inquiry or chat on WhatsApp. We respond within 24 hours.',
  keywords: [
    'contact toy supplier',
    'request toy quote',
    'toy wholesale inquiry',
    'Chenghai toy contact',
    'toy sourcing China',
  ],
  openGraph: {
    title: 'Contact Us | Request a Toy Quote | Chenghai Sourcing',
    description:
      'Contact us for toy sourcing, OEM/ODM customization and wholesale quotations. Request a quote, send an inquiry or chat on WhatsApp. We respond within 24 hours.',
    url: '/contact',
  },
};

export default function ContactPage() {
  const breadcrumbJsonLd = JSON.stringify(
    breadcrumbSchema([
      { name: 'Home', url: '/' },
      { name: 'Contact', url: '/contact' },
    ]),
  );

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: breadcrumbJsonLd }} />
      <ContactPageContent />
    </>
  );
}
