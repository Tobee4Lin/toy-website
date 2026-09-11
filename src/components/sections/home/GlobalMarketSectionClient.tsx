'use client';

import dynamic from 'next/dynamic';

// Wrap in Client Component to allow ssr: false
const GlobalMarketSection = dynamic(
  () => import('./GlobalMarketSection'),
  { ssr: false },
);

export default GlobalMarketSection;
