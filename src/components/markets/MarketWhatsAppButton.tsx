'use client';

import { MessageCircle } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { useApp } from '@/context/AppContext';
import { buildWhatsAppUrl } from '@/lib/utils';
import { trackEvent } from '@/lib/analytics';

interface MarketWhatsAppButtonProps {
  country: string;
  fullName: string;
  variant?: 'default' | 'outline-light';
  label?: string;
}

export default function MarketWhatsAppButton({
  country,
  fullName,
  variant = 'default',
  label = 'Discuss Your Market Needs',
}: MarketWhatsAppButtonProps) {
  const { config } = useApp();

  const handleClick = () => {
    trackEvent('whatsapp_click', { source: `market_${country}` });
    const msg = `Hello! I am a buyer from ${fullName} and I'm interested in manufacturing toys for the ${country} market. I'd like to discuss product options, certifications, and pricing.`;
    window.open(
      buildWhatsAppUrl(config.whatsapp, msg),
      '_blank',
      'noopener,noreferrer',
    );
  };

  if (variant === 'outline-light') {
    return (
      <Button
        onClick={handleClick}
        className="bg-[#FF7A00] text-white hover:bg-[#FF7A00]/90"
      >
        <MessageCircle className="mr-2 size-4" />
        {label}
      </Button>
    );
  }

  return (
    <Button
      onClick={handleClick}
      className="bg-[#FF7A00] text-white hover:bg-[#FF7A00]/90"
    >
      <MessageCircle className="mr-2 size-4" />
      {label}
    </Button>
  );
}
