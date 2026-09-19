import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Toy Sourcing Partner | Chenghai Toy Manufacturer & Wholesale Supplier',
    short_name: 'Toy Sourcing',
    description:
      'Your trusted toy sourcing partner in Chenghai, China. Beach toys, bubble toys, RC toys, building blocks. OEM/ODM and wholesale supply.',
    start_url: '/',
    display: 'standalone',
    background_color: '#071A2D',
    theme_color: '#1565FF',
    icons: [
      {
        src: '/icon.png',
        sizes: '48x48',
        type: 'image/png',
      },
    ],
  };
}
