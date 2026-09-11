import type { Metadata } from 'next';

import AboutPageContent from '@/components/sections/AboutPageContent';
import { breadcrumbSchema } from '@/lib/structuredData';

export const metadata: Metadata = {
  title: 'About Us | Chenghai Toy Sourcing & Manufacturing Partner',
  description:
    'Learn about our Chenghai-based toy sourcing and manufacturing partnership. Industry knowledge, supply chain advantages, product development, factory cooperation and international customer support.',
  keywords: [
    'about toy sourcing',
    'Chenghai toy company',
    'toy supplier China',
    'toy sourcing partner',
    'toy export company',
  ],
  openGraph: {
    title: 'About Us | Chenghai Toy Sourcing & Manufacturing Partner',
    description:
      'Learn about our Chenghai-based toy sourcing and manufacturing partnership. Industry knowledge, supply chain advantages, product development, factory cooperation and international customer support.',
    url: '/about',
  },
};

export default function AboutPage() {
  const breadcrumbJsonLd = JSON.stringify(
    breadcrumbSchema([
      { name: 'Home', url: '/' },
      { name: 'About Us', url: '/about' },
    ]),
  );

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: breadcrumbJsonLd }} />
      <AboutPageContent />
    </>
  );
}
