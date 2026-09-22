'use client';

import { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion } from 'framer-motion';
import { Send, Upload, Check } from 'lucide-react';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { submitInquiry } from '@/lib/api/inquiry';
import {
  nameField,
  companyField,
  countryField,
  emailField,
  whatsappField,
} from '@/lib/validation';
import { trackEvent } from '@/lib/analytics';
import { toast } from 'sonner';

const formSchema = z.object({
  name: nameField,
  company: companyField,
  country: countryField,
  email: emailField,
  whatsapp: whatsappField,
  category: z.string().optional(),
  quantity: z.string().optional(),
  customization: z.string().optional(),
  message: z.string().trim().min(10, 'Message must be at least 10 characters').max(3000, 'Message is too long'),
});

type FormValues = z.infer<typeof formSchema>;

const CATEGORIES = [
  'All Categories',
  'Beach Toys',
  'Bubble Toys',
  'RC Toys',
  'Building Blocks',
  'OEM / Custom',
];

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [submitted, setSubmitted] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      company: '',
      country: '',
      email: '',
      whatsapp: '',
      category: 'all-categories',
      quantity: '',
      customization: '',
      message: '',
    },
  });

  const onSubmit = async (values: FormValues) => {
    setIsSubmitting(true);
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

      await submitInquiry({
        ...values,
        estimatedQuantity: values.quantity,
        customizationRequirement: values.customization,
        attachments,
        source: 'contact_page',
        pageUrl: typeof window !== 'undefined' ? window.location.href : '',
      });
      trackEvent('inquiry_submit', { source: 'contact_page' });
      setSubmitted(true);
      toast.success('Message sent successfully!');
    } catch (error) {
      console.error('Contact form submission failed:', String(error));
      toast.error('Failed to send message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="overflow-hidden rounded-2xl border border-border/50 bg-white shadow-sm">
      <div className="p-6 md:p-10">
        {submitted ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="py-12 text-center"
          >
            <div className="mx-auto mb-6 flex size-16 items-center justify-center rounded-full bg-[#1565FF]/10">
              <Check className="size-8 text-[#1565FF]" />
            </div>
            <h2 className="mb-2 text-2xl font-bold text-[#071A2D]">
              Message Sent!
            </h2>
            <p className="mx-auto mb-8 max-w-md text-muted-foreground">
              Thank you for reaching out. Our team will get back to you
              within 24 business hours.
            </p>
            <Button
              onClick={() => {
                setSubmitted(false);
                form.reset();
                setSelectedFiles([]);
              }}
              variant="outline"
            >
              Send Another Message
            </Button>
          </motion.div>
        ) : (
          <>
            <h2 className="mb-1 text-2xl font-bold text-[#071A2D]">
              Send Us a Message
            </h2>
            <p className="mb-8 text-sm text-muted-foreground">
              Fill out the form below and we&apos;ll get back to you shortly.
            </p>

            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-5"
                noValidate
              >
                <div className="grid gap-5 md:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Name <span className="text-red-500">*</span></FormLabel>
                        <FormControl>
                          <Input placeholder="John Smith" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="company"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Company Name <span className="text-red-500">*</span></FormLabel>
                        <FormControl>
                          <Input placeholder="Your Company Ltd." {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid gap-5 md:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="country"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Country <span className="text-red-500">*</span></FormLabel>
                        <FormControl>
                          <Input placeholder="United States" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email <span className="text-red-500">*</span></FormLabel>
                        <FormControl>
                          <Input
                            type="email"
                            placeholder="john@company.com"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid gap-5 md:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="whatsapp"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>WhatsApp <span className="text-red-500">*</span></FormLabel>
                        <FormControl>
                          <Input placeholder="+1 555 000 0000" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid gap-5 md:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="category"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Product Category</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select category" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {CATEGORIES.map((cat) => (
                              <SelectItem
                                key={cat}
                                value={cat.toLowerCase().replace(/ /g, '-')}
                              >
                                {cat}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="customization"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Customization Needed?</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value || 'not-sure'}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select option" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="not-sure">Not sure yet</SelectItem>
                            <SelectItem value="Logo printing">Logo printing</SelectItem>
                            <SelectItem value="Color change">Color change</SelectItem>
                            <SelectItem value="Custom packaging">Custom packaging</SelectItem>
                            <SelectItem value="Full OEM / custom mold">Full OEM / custom mold</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Your Message <span className="text-red-500">*</span></FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Tell us about your project, product interests, timeline, or any questions you have..."
                          rows={5}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* File upload */}
                <div>
                  <input
                    ref={fileInputRef}
                    type="file"
                    multiple
                    className="hidden"
                    accept="image/*,.pdf,.doc,.docx"
                    onChange={(e) => {
                      const files = Array.from(e.target.files || []);
                      setSelectedFiles((prev) => [...prev, ...files].slice(0, 5));
                    }}
                  />
                  <div
                    onClick={() => fileInputRef.current?.click()}
                    className="cursor-pointer rounded-xl border border-dashed border-border bg-muted/30 p-6 text-center transition-colors hover:border-[#1565FF]/50 hover:bg-muted/50"
                  >
                    <Upload className="mx-auto mb-2 size-6 text-muted-foreground" />
                    <p className="text-sm font-medium text-[#071A2D]">
                      Attach files (optional)
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Reference images, sketches, spec sheets. Max 10MB each.
                    </p>
                  </div>
                  {selectedFiles.length > 0 && (
                    <div className="mt-2 space-y-1">
                      {selectedFiles.map((file, i) => (
                        <div key={i} className="flex items-center justify-between rounded-md bg-muted/50 px-3 py-1.5 text-xs">
                          <span className="truncate">{file.name}</span>
                          <button
                            type="button"
                            onClick={() => setSelectedFiles((prev) => prev.filter((_, idx) => idx !== i))}
                            className="ml-2 text-muted-foreground hover:text-red-500"
                          >
                            &times;
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <p className="text-xs text-muted-foreground">
                    By submitting, you agree to our{' '}
                    <Link href="/privacy-policy" className="underline">
                      Privacy Policy
                    </Link>
                    .
                  </p>
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-[#FF7A00] text-white hover:bg-[#FF7A00]/90 sm:w-auto"
                  >
                    {isSubmitting ? (
                      <>
                        <span className="mr-2 inline-block size-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="mr-2 size-4" />
                        Send Message
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </Form>
          </>
        )}
      </div>
    </div>
  );
}
