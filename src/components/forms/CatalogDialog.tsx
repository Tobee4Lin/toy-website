'use client';

import { useState, type FormEvent } from 'react';
import { Download, Loader2, CheckCircle } from 'lucide-react';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useApp } from '@/context/AppContext';
import { submitLead, type LeadPayload } from '@/lib/api/lead';
import { trackEvent } from '@/lib/analytics';
import { toast } from 'sonner';

interface CatalogDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  source?: string;
  category?: string;
}

export default function CatalogDialog({
  open,
  onOpenChange,
  source = 'catalog_dialog',
  category,
}: CatalogDialogProps) {
  const { closeCatalogDialog, config } = useApp();
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: '',
    company: '',
    country: '',
    email: '',
    whatsapp: '',
    productInterest: category || '',
  });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (submitting) return;

    setSubmitting(true);
    try {
      const payload: LeadPayload = {
        ...form,
        sourcePage: source,
        category,
      };

      const result = await submitLead(payload);

      if (result.success) {
        trackEvent('catalog_download', { source, success: true });
        setSubmitted(true);
        toast.success('Catalog is ready for download!');
        // Trigger download in new tab
        if (result.downloadUrl) {
          window.open(result.downloadUrl, '_blank', 'noopener,noreferrer');
        }
      } else {
        trackEvent('catalog_download', { source, success: false });
        toast.error(result.message);
      }
    } catch {
      toast.error('Failed to process. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleClose = () => {
    onOpenChange(false);
    setTimeout(() => {
      setSubmitted(false);
      setForm({
        name: '',
        company: '',
        country: '',
        email: '',
        whatsapp: '',
        productInterest: category || '',
      });
      closeCatalogDialog();
    }, 200);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-[#071A2D]">
            Download 2026 Toy Catalog
          </DialogTitle>
          <DialogDescription className="text-sm">
            Get our complete product catalog with 500+ toys across 4 categories.
          </DialogDescription>
        </DialogHeader>

        {submitted ? (
          <div className="py-6 text-center">
            <div className="mx-auto mb-4 flex size-16 items-center justify-center rounded-full bg-[#1565FF]/10">
              <CheckCircle className="size-8 text-[#1565FF]" />
            </div>
            <h3 className="mb-2 text-lg font-semibold text-[#071A2D]">
              Thank you!
            </h3>
            <p className="mb-6 text-sm text-muted-foreground">
              Your catalog download should start automatically. If not,{' '}
              <button
                onClick={() => {
                  toast.info('Connect your catalog PDF in src/lib/api/lead.ts');
                }}
                className="text-[#1565FF] hover:underline"
              >
                click here
              </button>
              . We&apos;ve also sent a copy to your email.
            </p>
            <Button onClick={handleClose}>Close</Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-3.5">
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label htmlFor="cat-name">Name *</Label>
                <Input
                  id="cat-name"
                  required
                  value={form.name}
                  onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                  placeholder="Your name"
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="cat-company">Company *</Label>
                <Input
                  id="cat-company"
                  required
                  value={form.company}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, company: e.target.value }))
                  }
                  placeholder="Company name"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label htmlFor="cat-country">Country *</Label>
                <Input
                  id="cat-country"
                  required
                  value={form.country}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, country: e.target.value }))
                  }
                  placeholder="Your country"
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="cat-email">Email *</Label>
                <Input
                  id="cat-email"
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                  placeholder="you@company.com"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label htmlFor="cat-whatsapp">WhatsApp</Label>
                <Input
                  id="cat-whatsapp"
                  value={form.whatsapp}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, whatsapp: e.target.value }))
                  }
                  placeholder="+86 138 ..."
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="cat-interest">Product Interest</Label>
                <Input
                  id="cat-interest"
                  value={form.productInterest}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, productInterest: e.target.value }))
                  }
                  placeholder="e.g. Beach Toys"
                />
              </div>
            </div>

            <p className="text-xs text-muted-foreground">
              By submitting, you agree to receive our catalog and occasional product
              updates. We respect your privacy and never share your data.
            </p>

            <Button
              type="submit"
              disabled={submitting}
              className="w-full bg-[#1565FF] text-white hover:bg-[#1565FF]/90"
            >
              {submitting ? (
                <>
                  <Loader2 className="mr-2 size-4 animate-spin" />
                  Preparing...
                </>
              ) : (
                <>
                  <Download className="mr-2 size-4" />
                  Download Catalog
                </>
              )}
            </Button>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
