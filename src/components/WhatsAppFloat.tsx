'use client';

import { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';

import { useApp } from '@/context/AppContext';
import { buildWhatsAppUrl } from '@/lib/utils';
import { trackEvent } from '@/lib/analytics';
import { Button } from '@/components/ui/button';

interface WhatsAppFloatProps {
  productName?: string;
  itemNumber?: string;
}

export default function WhatsAppFloat({ productName, itemNumber }: WhatsAppFloatProps) {
  const { config, selection } = useApp();
  const [expanded, setExpanded] = useState(false);

  const buildMessage = (): string => {
    if (productName && itemNumber) {
      return `Hello, I am interested in ${productName}, Item No. ${itemNumber}. Please send me the price, MOQ, catalog and packaging details. Thank you.`;
    }
    if (selection.length > 0) {
      const productLines = selection
        .map(
          (s) =>
            `- ${s.productName} (${s.itemNumber})${s.quantity ? ` × ${s.quantity}` : ''}`,
        )
        .join('\n');
      return `Hello! I would like to request a quote for the following products:\n${productLines}\n\nPlease send pricing, MOQ and packaging details. Thank you.`;
    }
    return 'Hello! I am interested in your toy products. Please contact me with more information.';
  };

  const whatsappUrl = buildWhatsAppUrl(config.whatsapp, buildMessage());

  const handleClick = () => {
    trackEvent('whatsapp_click', {
      source: productName ? 'product_page' : 'floating_button',
      hasSelection: selection.length > 0,
    });
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {/* Tooltip bubble */}
      {expanded && (
        <div className="max-w-xs rounded-2xl rounded-br-sm bg-white p-4 shadow-xl">
          <div className="mb-2 flex items-center justify-between">
            <span className="text-sm font-semibold text-[#071A2D]">Chat with us</span>
            <Button
              variant="ghost"
              size="icon"
              className="!size-6 text-muted-foreground hover:text-foreground"
              onClick={() => setExpanded(false)}
            >
              <X className="size-3.5" />
            </Button>
          </div>
          <p className="text-xs leading-relaxed text-[#071A2D]/70">
            {productName
              ? 'Get a quote for this product on WhatsApp.'
              : 'Have a question? Our team responds within 24 hours.'}
          </p>
          <Button
            size="sm"
            className="mt-3 w-full bg-[#25D366] text-white hover:bg-[#25D366]/90"
            onClick={handleClick}
          >
            <MessageCircle className="mr-2 size-4" />
            Start Chat
          </Button>
        </div>
      )}

      {/* Main button */}
      <button
        onClick={() => (expanded ? handleClick() : setExpanded(true))}
        className="group relative flex size-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg shadow-[#25D366]/30 transition-all hover:scale-105 hover:shadow-xl"
        aria-label="WhatsApp"
      >
        <MessageCircle className="size-7" />
        <span className="absolute inset-0 animate-ping rounded-full bg-[#25D366]/40 group-hover:animate-none" />
      </button>
    </div>
  );
}
