'use client';

import { memo, useState } from 'react';
import Link from 'next/link';
import {
  Heart,
  MessageCircle,
  FileText,
  Check,
  Package,
  Sparkles,
} from 'lucide-react';

import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Image } from '@/components/ui/image';
import { useApp } from '@/context/AppContext';
import { buildWhatsAppUrl } from '@/lib/utils';
import { trackEvent } from '@/lib/analytics';
import { toast } from 'sonner';
import type { IProduct } from '@/data/products';

interface ProductCardProps {
  product: IProduct;
  variant?: 'default' | 'compact';
}

function ProductCard({ product, variant = 'default' }: ProductCardProps) {
  const { addToSelection, removeFromSelection, isInSelection, openRfqDialog, config } =
    useApp();
  const [hovered, setHovered] = useState(false);
  const selected = isInSelection(product.id);

  const handleAddToSelection = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (selected) {
      removeFromSelection(product.id);
      trackEvent('remove_from_selection', { productId: product.id, itemNumber: product.itemNumber });
      toast.success('Removed from selection');
    } else {
      addToSelection({
        productId: product.id,
        productName: product.name,
        itemNumber: product.itemNumber,
        category: product.categoryLabel,
        image: product.imageUrl,
      });
      trackEvent('add_to_selection', { productId: product.id, itemNumber: product.itemNumber });
      toast.success('Added to My Selection');
    }
  };

  const handleQuickInquiry = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    trackEvent('quick_inquiry_open', { productId: product.id, itemNumber: product.itemNumber });
    openRfqDialog({
      productName: product.name,
      itemNumber: product.itemNumber,
      category: product.categoryLabel,
    });
  };

  const handleWhatsAppClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const message = `Hello, I am interested in ${product.name}, Item No. ${product.itemNumber}. Please send me the price, MOQ, catalog and packaging details. Thank you.`;
    const url = buildWhatsAppUrl(config.whatsapp, message);
    trackEvent('whatsapp_click', { source: 'product_card', productId: product.id });
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <Card
      className="group overflow-hidden border border-border/50 bg-card transition-all duration-300 hover:border-[#1565FF]/30 hover:shadow-lg hover:shadow-[#1565FF]/5"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Link href={`/product/${product.slug}`} className="block">
        <div className="relative aspect-square overflow-hidden bg-muted">
          <Image
            src={product.imageUrl}
            alt={product.name}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />

          {/* Top badges */}
          <div className="absolute left-3 top-3 flex flex-col gap-1.5">
            {product.isFeatured && (
              <Badge className="bg-[#FF7A00] text-white hover:bg-[#FF7A00]">
                <Sparkles className="mr-1 size-3" />
                Featured
              </Badge>
            )}
            {product.customizable && (
              <Badge variant="outline" className="border-white/30 bg-white/90 text-[#071A2D]">
                <Package className="mr-1 size-3" />
                OEM Available
              </Badge>
            )}
          </div>

          {/* Hover action buttons */}
          <div
            className={`absolute inset-0 flex items-end justify-center bg-gradient-to-t from-[#071A2D]/60 via-transparent to-transparent p-3 transition-opacity duration-300 ${
              hovered ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <div className="flex w-full gap-2">
              <Button
                size="sm"
                variant="secondary"
                onClick={handleQuickInquiry}
                className="flex-1 bg-white/90 text-[#071A2D] hover:bg-white"
              >
                <FileText className="mr-1.5 size-3.5" />
                Quick Inquiry
              </Button>
              <Button
                size="icon"
                variant="secondary"
                onClick={handleWhatsAppClick}
                className="bg-white/90 text-[#25D366] hover:bg-white"
                aria-label="WhatsApp"
              >
                <MessageCircle className="size-4" />
              </Button>
            </div>
          </div>

          {/* Add to selection */}
          <button
            onClick={handleAddToSelection}
            className={`absolute right-3 top-3 flex size-9 items-center justify-center rounded-full transition-all ${
              selected
                ? 'bg-[#FF7A00] text-white'
                : 'bg-white/90 text-[#071A2D]/60 hover:bg-white hover:text-[#FF7A00]'
            }`}
            aria-label={selected ? 'Remove from selection' : 'Add to selection'}
          >
            {selected ? <Check className="size-4" /> : <Heart className="size-4" />}
          </button>
        </div>

        <div className="p-4">
          <div className="mb-2 flex items-center justify-between gap-2">
            <Badge variant="outline" className="text-xs">
              {product.categoryLabel}
            </Badge>
            <span className="font-mono text-xs text-muted-foreground">
              {product.itemNumber}
            </span>
          </div>

          <h3 className="mb-2 line-clamp-2 min-h-[2.5rem] text-sm font-semibold text-foreground transition-colors group-hover:text-[#1565FF]">
            {product.name}
          </h3>

          {variant === 'default' && (
            <p className="mb-3 line-clamp-2 text-xs text-muted-foreground">
              {product.description}
            </p>
          )}

          <div className="flex items-center justify-between border-t border-border/50 pt-3 text-xs">
            <div>
              <span className="text-muted-foreground">MOQ: </span>
              <span className="font-semibold text-[#071A2D]">
                {product.moq.toLocaleString()} pcs
              </span>
            </div>
            <span className="text-[#1565FF] font-medium">
              View Details →
            </span>
          </div>
        </div>
      </Link>
    </Card>
  );
}

export default memo(ProductCard);
