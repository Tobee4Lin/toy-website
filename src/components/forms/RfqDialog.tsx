'use client';

import { useState, useRef, type FormEvent } from 'react';
import { Loader2, Send, X, Upload, Paperclip } from 'lucide-react';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useApp } from '@/context/AppContext';
import { submitInquiry, type InquiryPayload } from '@/lib/api/inquiry';
import { trackEvent } from '@/lib/analytics';
import { toast } from 'sonner';

interface RfqDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  prefill?: {
    productName?: string;
    itemNumber?: string;
    category?: string;
  };
  selectedProducts?: Array<{
    productName: string;
    itemNumber: string;
    category: string;
    quantity?: number;
    notes?: string;
  }>;
  source?: string;
}

export default function RfqDialog({
  open,
  onOpenChange,
  prefill,
  selectedProducts,
  source = 'rfq_dialog',
}: RfqDialogProps) {
  const { closeRfqDialog, config } = useApp();
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [form, setForm] = useState({
    name: '',
    company: '',
    country: '',
    email: '',
    whatsapp: '',
    message: '',
  });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (submitting) return;

    setSubmitting(true);
    try {
      // Upload attachments first
      const attachments: Array<{ name: string; url: string }> = [];
      for (const file of selectedFiles) {
        const fd = new FormData();
        fd.append('file', file);
        const base = process.env.NEXT_PUBLIC_API_BASE_URL || '';
        const res = await fetch(`${base}/api/upload`, { method: 'POST', body: fd });
        if (res.ok) {
          const data = await res.json();
          attachments.push({ name: file.name, url: data.url });
        }
      }

      const payload: InquiryPayload = {
        ...form,
        productName: prefill?.productName,
        itemNumber: prefill?.itemNumber,
        category: prefill?.category,
        pageUrl: typeof window !== 'undefined' ? window.location.href : undefined,
        selectedProducts,
        attachments,
        source,
      };

      const result = await submitInquiry(payload);

      if (result.success) {
        trackEvent('inquiry_submit', { source, success: true });
        setSubmitted(true);
        toast.success('Inquiry submitted successfully!');
      } else {
        trackEvent('inquiry_submit', { source, success: false });
        toast.error(result.message);
      }
    } catch {
      toast.error('Failed to submit. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleClose = () => {
    onOpenChange(false);
    setTimeout(() => {
      setSubmitted(false);
      setSelectedFiles([]);
      setForm({
        name: '',
        company: '',
        country: '',
        email: '',
        whatsapp: '',
        message: '',
      });
      closeRfqDialog();
    }, 200);
  };

  const redStar = <span className="text-red-500">*</span>;

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-[#071A2D]">
            Request a Quote
          </DialogTitle>
          <DialogDescription className="text-sm">
            Fill in the form and our team will get back to you within 24 hours.
          </DialogDescription>
        </DialogHeader>

        {submitted ? (
          <div className="py-8 text-center">
            <div className="mx-auto mb-4 flex size-16 items-center justify-center rounded-full bg-[#1565FF]/10">
              <Send className="size-8 text-[#1565FF]" />
            </div>
            <h3 className="mb-2 text-lg font-semibold text-[#071A2D]">
              Thank you for your inquiry!
            </h3>
            <p className="mb-6 text-sm text-muted-foreground">
              Our sales team will review your request and contact you within 24
              business hours. You can also reach us directly at{' '}
              <a
                href={`mailto:${config.email}`}
                className="text-[#1565FF] hover:underline"
              >
                {config.email}
              </a>
              .
            </p>
            <Button onClick={handleClose}>Close</Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {prefill?.productName && (
              <div className="rounded-lg border border-border bg-muted/30 p-3 text-sm">
                <span className="text-muted-foreground">Product: </span>
                <span className="font-medium text-foreground">
                  {prefill.productName}
                </span>
                {prefill.itemNumber && (
                  <>
                    <span className="mx-2 text-muted-foreground">|</span>
                    <span className="text-muted-foreground">Item No. </span>
                    <span className="font-mono text-foreground">
                      {prefill.itemNumber}
                    </span>
                  </>
                )}
              </div>
            )}

            {selectedProducts && selectedProducts.length > 0 && (
              <div className="rounded-lg border border-border bg-muted/30 p-3 text-sm">
                <div className="mb-2 font-medium text-foreground">
                  Selected Products ({selectedProducts.length})
                </div>
                <div className="max-h-32 space-y-1 overflow-y-auto">
                  {selectedProducts.map((p, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs">
                      <span className="text-muted-foreground">{i + 1}.</span>
                      <div className="flex-1 min-w-0">
                        <div className="truncate font-medium text-foreground">
                          {p.productName}
                        </div>
                        <div className="text-muted-foreground">
                          {p.itemNumber}
                          {p.quantity ? ` × ${p.quantity}` : ''}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label htmlFor="rfq-name">Name {redStar}</Label>
                <Input
                  id="rfq-name"
                  required
                  value={form.name}
                  onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                  placeholder="Your name"
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="rfq-company">Company {redStar}</Label>
                <Input
                  id="rfq-company"
                  required
                  value={form.company}
                  onChange={(e) => setForm((f) => ({ ...f, company: e.target.value }))}
                  placeholder="Company name"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label htmlFor="rfq-country">Country {redStar}</Label>
                <Input
                  id="rfq-country"
                  required
                  value={form.country}
                  onChange={(e) => setForm((f) => ({ ...f, country: e.target.value }))}
                  placeholder="Your country"
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="rfq-email">Email {redStar}</Label>
                <Input
                  id="rfq-email"
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                  placeholder="you@company.com"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="rfq-whatsapp">WhatsApp {redStar}</Label>
              <Input
                id="rfq-whatsapp"
                required
                value={form.whatsapp}
                onChange={(e) =>
                  setForm((f) => ({ ...f, whatsapp: e.target.value }))
                }
                placeholder="+86 138 ..."
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="rfq-message">Message</Label>
              <Textarea
                id="rfq-message"
                rows={3}
                value={form.message}
                onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                placeholder="Tell us about your requirements..."
              />
            </div>

            {/* File upload */}
            <div className="space-y-2">
              <input
                ref={fileInputRef}
                type="file"
                multiple
                accept="image/*,.pdf,.doc,.docx"
                className="hidden"
                onChange={(e) => {
                  const files = Array.from(e.target.files || []);
                  setSelectedFiles((prev) => [...prev, ...files].slice(0, 5));
                  if (fileInputRef.current) fileInputRef.current.value = '';
                }}
              />
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="flex w-full cursor-pointer flex-col items-center justify-center gap-1 rounded-xl border border-dashed border-border bg-muted/30 p-6 text-center transition-colors hover:border-[#1565FF]/50 hover:bg-muted/50"
              >
                <Upload className="size-5 text-muted-foreground" />
                <span className="text-sm font-medium">Attach files (optional)</span>
                <span className="text-xs text-muted-foreground">
                  Reference images, sketches, spec sheets. Max 10MB each.
                </span>
              </button>
              {selectedFiles.length > 0 && (
                <div className="space-y-1">
                  {selectedFiles.map((file, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-2 rounded bg-muted/50 px-3 py-1.5 text-sm"
                    >
                      <Paperclip className="size-3.5 text-muted-foreground" />
                      <span className="flex-1 truncate">{file.name}</span>
                      <button
                        type="button"
                        onClick={() => setSelectedFiles((prev) => prev.filter((_, idx) => idx !== i))}
                        className="text-muted-foreground hover:text-red-500"
                      >
                        <X className="size-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <Button
              type="submit"
              disabled={submitting}
              className="w-full bg-[#FF7A00] text-white hover:bg-[#FF7A00]/90"
            >
              {submitting ? (
                <>
                  <Loader2 className="mr-2 size-4 animate-spin" />
                  Submitting...
                </>
              ) : (
                <>
                  <Send className="mr-2 size-4" />
                  Send Inquiry
                </>
              )}
            </Button>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
