import type { Metadata } from 'next';

import PrivacyPolicyContent from '@/components/sections/PrivacyPolicyContent';
import { breadcrumbSchema } from '@/lib/structuredData';

export const metadata: Metadata = {
  title: 'Privacy Policy | Toy Sourcing Partner',
  description:
    'Our privacy policy explains how we collect, use, and protect your personal information when you use our toy sourcing website and services.',
  keywords: ['privacy policy', 'data protection', 'toy sourcing privacy'],
  openGraph: {
    title: 'Privacy Policy | Toy Sourcing Partner',
    description:
      'Our privacy policy explains how we collect, use, and protect your personal information.',
    url: '/privacy-policy',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function PrivacyPolicyPage() {
  const breadcrumbJsonLd = JSON.stringify(
    breadcrumbSchema([
      { name: 'Home', url: '/' },
      { name: 'Privacy Policy', url: '/privacy-policy' },
    ]),
  );

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: breadcrumbJsonLd }} />
      <PrivacyPolicyContent />
    </>
  );
}
