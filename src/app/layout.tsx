import type { Metadata } from 'next';
import './globals.css';
import Providers from './providers';
import { organizationSchema, websiteSchema } from '@/lib/structuredData';

const SITE_URL = 'https://www.toysourcingpartner.com';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Toy Sourcing Partner | Chenghai Toy Manufacturer & Wholesale Supplier',
    template: '%s | Toy Sourcing Partner',
  },
  description:
    'Your trusted toy sourcing partner in Chenghai, China. Source beach toys, bubble toys, remote control toys and building blocks directly from China\'s toy capital. OEM/ODM, wholesale supply and global export.',
  keywords: [
    'toy sourcing',
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
  authors: [{ name: 'Toy Sourcing Partner' }],
  creator: 'Toy Sourcing Partner',
  publisher: 'Toy Sourcing Partner',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: SITE_URL,
    siteName: 'Toy Sourcing Partner',
    title: 'Toy Sourcing Partner | Chenghai Toy Manufacturer & Wholesale Supplier',
    description:
      'Your trusted toy sourcing partner in Chenghai, China. Source beach toys, bubble toys, remote control toys and building blocks directly from China\'s toy capital.',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'Toy Sourcing Partner' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Toy Sourcing Partner | Chenghai Toy Manufacturer & Wholesale Supplier',
    description:
      'Your trusted toy sourcing partner in Chenghai, China. Source beach toys, bubble toys, remote control toys and building blocks directly from China\'s toy capital.',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: SITE_URL,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const orgJsonLd = JSON.stringify(organizationSchema());
  const websiteJsonLd = JSON.stringify(websiteSchema());

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: orgJsonLd }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: websiteJsonLd }}
        />
      </head>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
