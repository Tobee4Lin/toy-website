'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  FileText,
  Trash2,
  ShoppingBag,
  MessageCircle,
  X,
  ArrowLeft,
  Send,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Image } from '@/components/ui/image';
import { useApp } from '@/context/AppContext';
import { buildWhatsAppUrl } from '@/lib/utils';
import { trackEvent } from '@/lib/analytics';
import { toast } from 'sonner';
import RfqDialog from '@/components/forms/RfqDialog';

export default function MySelectionContent() {
  const {
    selection,
    removeFromSelection,
    updateSelectionItem,
    clearAllSelection,
    config,
  } = useApp();
  const router = useRouter();
  const [rfqOpen, setRfqOpen] = useState(false);

  const handleRemove = (id: string, name: string) => {
    removeFromSelection(id);
    trackEvent('remove_from_selection', { productId: id });
    toast.success(`${name} removed`);
  };

  const handleClearAll = () => {
    clearAllSelection();
    toast.success('Selection cleared');
  };

  const handleBulkQuote = () => {
    trackEvent('request_quote_click', {
      source: 'my_selection',
      productCount: selection.length,
    });
    setRfqOpen(true);
  };

  const handleWhatsApp = () => {
    trackEvent('whatsapp_click', {
      source: 'my_selection',
      productCount: selection.length,
    });
    const productLines = selection
      .map(
        (s) =>
          `- ${s.productName} (${s.itemNumber})${s.quantity ? ` × ${s.quantity}` : ''}${s.notes ? ` - ${s.notes}` : ''}`,
      )
      .join('\n');
    const message = `Hello! I would like to request a quote for the following products:\n${productLines}\n\nPlease send pricing, MOQ and packaging details. Thank you.`;
    window.open(
      buildWhatsAppUrl(config.whatsapp, message),
      '_blank',
      'noopener,noreferrer',
    );
  };

  const selectedProductsForRfq = selection.map((s) => ({
    productName: s.productName,
    itemNumber: s.itemNumber,
    category: s.category,
    quantity: s.quantity,
    notes: s.notes,
  }));

  return (
    <div className="min-h-screen bg-[#F5F7FA]">
      {/* Header bar */}
      <div className="w-full border-b border-border bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 md:px-6">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => router.back()}
              className="text-muted-foreground"
            >
              <ArrowLeft className="mr-1.5 size-4" />
              Back
            </Button>
            <div>
              <h1 className="text-xl font-bold text-[#071A2D] md:text-2xl">
                My Selection
              </h1>
              <p className="text-sm text-muted-foreground">
                {selection.length} product{selection.length !== 1 ? 's' : ''} selected
              </p>
            </div>
          </div>

          {selection.length > 0 && (
            <Button
              variant="outline"
              size="sm"
              onClick={handleClearAll}
              className="text-destructive hover:bg-destructive/10 hover:text-destructive"
            >
              <Trash2 className="mr-1.5 size-4" />
              Clear All
            </Button>
          )}
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-8 md:px-6">
        {selection.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-border bg-white py-20 text-center">
            <div className="mx-auto mb-4 flex size-16 items-center justify-center rounded-full bg-muted">
              <ShoppingBag className="size-8 text-muted-foreground" />
            </div>
            <h2 className="mb-2 text-xl font-bold text-[#071A2D]">
              Your selection is empty
            </h2>
            <p className="mx-auto mb-6 max-w-md text-sm text-muted-foreground">
              Browse our product catalog and add items to your selection to request
              a combined quote.
            </p>
            <Button asChild>
              <Link href="/products">
                <ShoppingBag className="mr-2 size-4" />
                Browse Products
              </Link>
            </Button>
          </div>
        ) : (
          <div className="grid gap-6 lg:grid-cols-[1fr_380px]">
            {/* Left: Item list */}
            <div className="space-y-4">
              {selection.map((item) => (
                <Card key={item.productId} className="overflow-hidden">
                  <CardContent className="p-0">
                    <div className="flex gap-4 p-4">
                      <Link
                        href={`/product/${item.productId}`}
                        className="relative shrink-0"
                      >
                        <Image
                          src={item.image}
                          alt={item.productName}
                          className="size-24 rounded-lg object-cover"
                        />
                      </Link>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <div className="min-w-0">
                            <Badge variant="outline" className="mb-1 text-xs">
                              {item.category}
                            </Badge>
                            <Link
                              href={`/product/${item.productId}`}
                              className="block"
                            >
                              <h3 className="truncate font-semibold text-[#071A2D] hover:text-[#1565FF]">
                                {item.productName}
                              </h3>
                            </Link>
                            <p className="mt-0.5 font-mono text-xs text-muted-foreground">
                              {item.itemNumber}
                            </p>
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() =>
                              handleRemove(item.productId, item.productName)
                            }
                            className="size-8 text-muted-foreground hover:text-destructive"
                            aria-label="Remove"
                          >
                            <X className="size-4" />
                          </Button>
                        </div>

                        <div className="mt-3 grid gap-2 sm:grid-cols-2">
                          <div>
                            <label className="mb-1 block text-xs text-muted-foreground">
                              Quantity
                            </label>
                            <Input
                              type="number"
                              min={1}
                              value={item.quantity || ''}
                              onChange={(e) =>
                                updateSelectionItem(item.productId, {
                                  quantity: parseInt(e.target.value) || 0,
                                })
                              }
                              placeholder="Est. Qty"
                              className="h-8 text-sm"
                            />
                          </div>
                          <div className="sm:hidden">
                            <label className="mb-1 block text-xs text-muted-foreground">
                              Notes
                            </label>
                            <Input
                              value={item.notes || ''}
                              onChange={(e) =>
                                updateSelectionItem(item.productId, {
                                  notes: e.target.value,
                                })
                              }
                              placeholder="Notes..."
                              className="h-8 text-sm"
                            />
                          </div>
                        </div>
                        <div className="mt-2 hidden sm:block">
                          <label className="mb-1 block text-xs text-muted-foreground">
                            Notes
                          </label>
                          <Textarea
                            value={item.notes || ''}
                            onChange={(e) =>
                              updateSelectionItem(item.productId, {
                                notes: e.target.value,
                              })
                            }
                            placeholder="Color, packaging, special requirements..."
                            className="h-16 text-sm"
                          />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Right: Summary */}
            <div className="lg:sticky lg:top-24 lg:h-fit">
              <Card className="border-2 border-[#1565FF]/20">
                <CardContent className="p-6">
                  <h2 className="mb-4 text-lg font-bold text-[#071A2D]">
                    Request Quote for Selection
                  </h2>

                  <div className="mb-4 space-y-2 border-y border-border py-4">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Products</span>
                      <span className="font-semibold text-[#071A2D]">
                        {selection.length}
                      </span>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Complete the form for a customized quote covering price, MOQ and
                      packaging.
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Button
                      onClick={handleBulkQuote}
                      className="w-full bg-[#FF7A00] text-white hover:bg-[#FF7A00]/90"
                    >
                      <Send className="mr-2 size-4" />
                      Request Quote
                    </Button>

                    <Button
                      onClick={handleWhatsApp}
                      variant="outline"
                      className="w-full border-[#25D366]/40 text-[#25D366] hover:bg-[#25D366]/5"
                    >
                      <MessageCircle className="mr-2 size-4" />
                      WhatsApp Inquiry
                    </Button>

                    <Button
                      asChild
                      variant="outline"
                      className="w-full"
                    >
                      <Link href="/products">
                        <FileText className="mr-2 size-4" />
                        Continue Browsing
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>

      <RfqDialog
        open={rfqOpen}
        onOpenChange={setRfqOpen}
        selectedProducts={selectedProductsForRfq}
        source="my_selection"
      />
    </div>
  );
}
