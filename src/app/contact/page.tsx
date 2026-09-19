import type { Metadata } from 'next';

import ContactPageContent from '@/components/sections/ContactPageContent';
import { breadcrumbSchema } from '@/lib/structuredData';

export const metadata: Metadata = {
  title: 'Contact Us | Request a Toy Quote | Chenghai Toy Factory',
  description:
    'Contact our toy factory for OEM/ODM customization and wholesale quotations. Request a quote, send an inquiry or chat on WhatsApp. We respond within 24 hours.',
  keywords: [
    'contact toy factory',
    'request toy quote',
    'toy wholesale inquiry',
    'Chenghai toy factory contact',
    'toy manufacturer China',
  ],
  openGraph: {
    title: 'Contact Us | Request a Toy Quote | Chenghai Toy Factory',
    description:
      'Contact our toy factory for OEM/ODM customization and wholesale quotations. Request a quote, send an inquiry or chat on WhatsApp.',
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
