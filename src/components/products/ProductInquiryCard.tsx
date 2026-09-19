'use client';

import { FileText, Heart, MessageCircle, Check, Package, Clock, ShieldCheck } from 'lucide-react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { useApp } from '@/context/AppContext';
import { buildWhatsAppUrl } from '@/lib/utils';
import { trackEvent } from '@/lib/analytics';
import type { IProduct } from '@/data/products';

interface ProductInquiryCardProps {
  product: IProduct;
}

export default function ProductInquiryCard({ product }: ProductInquiryCardProps) {
  const { addToSelection, removeFromSelection, isInSelection, openRfqDialog, config } = useApp();

  const selected = isInSelection(product.id);

  const handleAddToSelection = () => {
    if (selected) {
      removeFromSelection(product.id);
      trackEvent('remove_from_selection', {
        productId: product.id,
        itemNumber: product.itemNumber,
      });
      toast.success('Removed from selection');
    } else {
      addToSelection({
        productId: product.id,
        productName: product.name,
        itemNumber: product.itemNumber,
        category: product.categoryLabel,
        image: product.imageUrl,
      });
      trackEvent('add_to_selection', {
        productId: product.id,
        itemNumber: product.itemNumber,
      });
      toast.success('Added to My Selection');
    }
  };

  const handleQuote = () => {
    trackEvent('quick_inquiry_open', {
      productId: product.id,
      source: 'product_detail',
    });
    openRfqDialog({
      productName: product.name,
      itemNumber: product.itemNumber,
      category: product.categoryLabel,
    });
  };

  const handleWhatsApp = () => {
    trackEvent('whatsapp_click', { source: 'product_detail' });
    const msg = `Hello, I am interested in ${product.name}, Item No. ${product.itemNumber}. Please send me the price, MOQ, catalog and packaging details. Thank you.`;
    window.open(
      buildWhatsAppUrl(config.whatsapp, msg),
      '_blank',
      'noopener,noreferrer',
    );
  };

  return (
    <div className="lg:sticky lg:top-24 lg:h-fit">
      <Card className="border-2 border-[#1565FF]/20">
        <CardContent className="p-6">
          <Badge variant="outline" className="mb-3">
            {product.categoryLabel}
          </Badge>
          <h2 className="mb-2 text-xl font-bold text-[#071A2D]">
            {product.name}
          </h2>
          <div className="mb-4 text-sm text-muted-foreground">
            Item No.{' '}
            <span className="font-mono font-semibold text-[#071A2D]">
              {product.itemNumber}
            </span>
          </div>

          <div className="mb-6 space-y-3 border-y border-border py-4">
            <div className="flex items-center justify-between text-sm">
              <span className="flex items-center gap-2 text-muted-foreground">
                <Package className="size-4" />
                MOQ
              </span>
              <span className="font-semibold text-[#071A2D]">
                {product.moq.toLocaleString()} pcs
              </span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="flex items-center gap-2 text-muted-foreground">
                <Clock className="size-4" />
                Lead Time
              </span>
              <span className="font-semibold text-[#071A2D]">
                {product.leadTime}
              </span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="flex items-center gap-2 text-muted-foreground">
                <ShieldCheck className="size-4" />
                Certifications
              </span>
              <span className="font-medium text-[#1565FF]">
                {product.certifications.slice(0, 2).join(', ')}
              </span>
            </div>
          </div>

          <div className="space-y-3">
            <Button
              onClick={handleQuote}
              className="w-full bg-[#FF7A00] text-white hover:bg-[#FF7A00]/90"
            >
              <FileText className="mr-2 size-4" />
              Request a Quote
            </Button>

            <Button
              onClick={handleAddToSelection}
              variant={selected ? 'default' : 'outline'}
              className={`w-full ${
                selected
                  ? 'bg-[#1565FF] text-white hover:bg-[#1565FF]/90'
                  : ''
              }`}
            >
              {selected ? (
                <>
                  <Check className="mr-2 size-4" />
                  Added to Selection
                </>
              ) : (
                <>
                  <Heart className="mr-2 size-4" />
                  Add to My Selection
                </>
              )}
            </Button>

            <Button
              onClick={handleWhatsApp}
              variant="outline"
              className="w-full border-[#25D366]/40 text-[#25D366] hover:bg-[#25D366]/5"
            >
              <MessageCircle className="mr-2 size-4" />
              WhatsApp Inquiry
            </Button>
          </div>

          <p className="mt-4 text-center text-xs text-muted-foreground">
            Response within 24 business hours
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
