'use client';

import { useState, type FormEvent } from 'react';
import { z } from 'zod';
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
import {
  nameField,
  companyField,
  countryField,
  emailField,
  whatsappOptionalField,
} from '@/lib/validation';
import { trackEvent } from '@/lib/analytics';
import { toast } from 'sonner';

interface CatalogDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  source?: string;
  category?: string;
}

type CatalogFields = {
  name: string;
  company: string;
  country: string;
  email: string;
  whatsapp: string;
  productInterest: string;
};

type FieldErrors = Partial<Record<keyof CatalogFields, string>>;

export default function CatalogDialog({
  open,
  onOpenChange,
  source = 'catalog_dialog',
  category,
}: CatalogDialogProps) {
  const { closeCatalogDialog, config } = useApp();
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [form, setForm] = useState<CatalogFields>({
    name: '',
    company: '',
    country: '',
    email: '',
    whatsapp: '',
    productInterest: category || '',
  });

  const updateField = (key: keyof CatalogFields, value: string) => {
    setForm((f) => ({ ...f, [key]: value }));
    setErrors((e) => ({ ...e, [key]: undefined }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (submitting) return;

    // Validate required customer fields.
    const catalogSchema = z.object({
      name: nameField,
      company: companyField,
      country: countryField,
      email: emailField,
      whatsapp: whatsappOptionalField,
    });
    const parsed = catalogSchema.safeParse(form);
    if (!parsed.success) {
      const next: FieldErrors = {};
      for (const issue of parsed.error.issues) {
        const key = issue.path[0] as keyof CatalogFields;
        if (key && !next[key]) next[key] = issue.message;
      }
      setErrors(next);
      toast.error('Please correct the highlighted fields.');
      return;
    }
    const clean = parsed.data;

    setSubmitting(true);
    try {
      const payload: LeadPayload = {
        ...clean,
        productInterest: form.productInterest,
        sourcePage: source,
        category,
      };

      const res = await submitLead(payload);

      if (res.success) {
        trackEvent('catalog_download', { source, success: true });
        setSubmitted(true);
        toast.success('Catalog is ready for download!');
        // Trigger download in new tab
        if (res.downloadUrl) {
          window.open(res.downloadUrl, '_blank', 'noopener,noreferrer');
        }
      } else {
        trackEvent('catalog_download', { source, success: false });
        toast.error(res.message);
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
      setErrors({});
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

  const errorClass = (key: keyof CatalogFields) =>
    errors[key] ? 'border-red-500 focus-visible:ring-red-500/30' : '';

  const FieldError = ({ k }: { k: keyof CatalogFields }) =>
    errors[k] ? <p className="text-xs text-red-500">{errors[k]}</p> : null;

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
          <form onSubmit={handleSubmit} className="space-y-3.5" noValidate>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label htmlFor="cat-name">Name *</Label>
                <Input
                  id="cat-name"
                  className={errorClass('name')}
                  value={form.name}
                  onChange={(e) => updateField('name', e.target.value)}
                  placeholder="Your name"
                />
                <FieldError k="name" />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="cat-company">Company *</Label>
                <Input
                  id="cat-company"
                  className={errorClass('company')}
                  value={form.company}
                  onChange={(e) => updateField('company', e.target.value)}
                  placeholder="Company name"
                />
                <FieldError k="company" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label htmlFor="cat-country">Country *</Label>
                <Input
                  id="cat-country"
                  className={errorClass('country')}
                  value={form.country}
                  onChange={(e) => updateField('country', e.target.value)}
                  placeholder="Your country"
                />
                <FieldError k="country" />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="cat-email">Email *</Label>
                <Input
                  id="cat-email"
                  type="email"
                  className={errorClass('email')}
                  value={form.email}
                  onChange={(e) => updateField('email', e.target.value)}
                  placeholder="you@company.com"
                />
                <FieldError k="email" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label htmlFor="cat-whatsapp">WhatsApp</Label>
                <Input
                  id="cat-whatsapp"
                  className={errorClass('whatsapp')}
                  value={form.whatsapp}
                  onChange={(e) => updateField('whatsapp', e.target.value)}
                  placeholder="+86 138 ..."
                />
                <FieldError k="whatsapp" />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="cat-interest">Product Interest</Label>
                <Input
                  id="cat-interest"
                  value={form.productInterest}
                  onChange={(e) => updateField('productInterest', e.target.value)}
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
