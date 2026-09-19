'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion } from 'framer-motion';
import { Download, Check, Sparkles, BookOpen, Box, Award } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
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
import { Badge } from '@/components/ui/badge';
import { submitLead } from '@/lib/api/lead';
import { trackEvent } from '@/lib/analytics';
import { toast } from 'sonner';

const formSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  company: z.string().min(2, 'Company name is required'),
  country: z.string().min(2, 'Country is required'),
  email: z.string().email('Please enter a valid email'),
  whatsapp: z.string().optional(),
  interest: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

const HIGHLIGHTS = [
  { icon: Box, title: '200+ Products', desc: 'Across 4 major toy categories' },
  { icon: Award, title: 'Certified Quality', desc: 'EN71, ASTM, CPSIA, CE ready' },
  { icon: Sparkles, title: 'OEM Capable', desc: 'Full customization options' },
];

const CATEGORIES = [
  'Not sure yet',
  'Beach Toys',
  'Bubble Toys',
  'RC Toys',
  'Building Blocks',
  'All categories',
];

export default function CatalogPageContent() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [downloaded, setDownloaded] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      company: '',
      country: '',
      email: '',
      whatsapp: '',
      interest: 'not-sure',
    },
  });

  const onSubmit = async (values: FormValues) => {
    setIsSubmitting(true);
    try {
      await submitLead({
        name: values.name,
        company: values.company,
        country: values.country,
        email: values.email,
        whatsapp: values.whatsapp,
        productInterest: values.interest,
        sourcePage: 'catalog_page',
      });
      trackEvent('catalog_download', { source: 'catalog_page' });
      setDownloaded(true);
      toast.success('Catalog is ready to download!');
    } catch (error) {
      console.error('Catalog lead capture failed:', String(error));
      toast.error('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDownload = () => {
    toast.success('Download started!');
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="relative w-full overflow-hidden bg-[#071A2D] text-white">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_rgba(255_122_0_0.2),transparent_50%)]" />
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />
        <div className="relative mx-auto max-w-7xl px-4 py-20 md:px-6 md:py-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <Badge className="mb-4 bg-[#FF7A00] text-white">
              <Download className="mr-1 size-3" />
              2026 Toy Catalog
            </Badge>
            <h1 className="text-4xl font-black md:text-5xl lg:text-6xl">
              Download Our Complete
              <br />
              <span className="bg-gradient-to-r from-[#FF7A00] to-[#FFC400] bg-clip-text text-transparent">
                Toy Catalog
              </span>
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-white/70">
              Hundreds of products across beach toys, bubble toys, RC toys and
              building blocks — all in one comprehensive catalog.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main content */}
      <section className="w-full py-16 md:py-20">
        <div className="mx-auto max-w-6xl px-4 md:px-6">
          <div className="grid gap-12 lg:grid-cols-[1fr_450px] lg:items-start">
            {/* Left: Catalog highlights */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.6 }}
            >
              {/* Catalog mockup */}
              <div className="relative mb-10">
                <div className="aspect-[3/4] overflow-hidden rounded-2xl border border-border/50 bg-gradient-to-br from-[#071A2D] to-[#1a3654] shadow-xl">
                  <div className="flex h-full flex-col justify-between p-8">
                    <div>
                      <Badge className="mb-4 bg-[#FF7A00] text-white">
                        2026 Edition
                      </Badge>
                      <h2 className="text-3xl font-black text-white md:text-4xl">
                        TOY
                        <br />
                        MANUFACTURING
                        <br />
                        CATALOG
                      </h2>
                      <p className="mt-3 text-white/60">
                        Your complete guide to quality toys from Chenghai, China
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <div className="h-16 w-12 rounded-md bg-[#1565FF]/30" />
                      <div className="h-16 w-12 rounded-md bg-[#FF7A00]/30" />
                      <div className="h-16 w-12 rounded-md bg-[#FFC400]/30" />
                      <div className="h-16 w-12 rounded-md bg-white/10" />
                    </div>
                    <div className="text-xs text-white/40">
                      © {new Date().getFullYear()} Levich Toys
                    </div>
                  </div>
                </div>
              </div>

              {/* What's inside */}
              <h2 className="mb-6 text-2xl font-bold text-[#071A2D]">
                What&apos;s Inside the Catalog?
              </h2>

              <div className="mb-8 grid gap-4 sm:grid-cols-3">
                {HIGHLIGHTS.map((item, i) => {
                  const Icon = item.icon;
                  return (
                    <Card key={item.title} className="h-full">
                      <CardContent className="p-5">
                        <div className="mb-3 flex size-10 items-center justify-center rounded-lg bg-[#1565FF]/10 text-[#1565FF]">
                          <Icon className="size-5" />
                        </div>
                        <div className="font-semibold text-[#071A2D]">
                          {item.title}
                        </div>
                        <p className="mt-1 text-xs text-muted-foreground">
                          {item.desc}
                        </p>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>

              {/* Category list */}
              <div className="rounded-xl border border-border/50 bg-[#F5F7FA] p-6">
                <h3 className="mb-4 font-semibold text-[#071A2D]">
                  Catalog includes:
                </h3>
                <div className="grid gap-2 sm:grid-cols-2">
                  {[
                    'Beach & Sand Toys Collection',
                    'Bubble Toys - Manual & Electric',
                    'Remote Control Vehicles',
                    'Building & Construction Blocks',
                    'OEM Customization Options',
                    'Packaging & MOQ Details',
                    'Quality & Certification Info',
                  ].map((item) => (
                    <div key={item} className="flex items-center gap-2 text-sm">
                      <Check className="size-4 shrink-0 text-[#1565FF]" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Right: Lead capture form */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.6 }}
              className="lg:sticky lg:top-24"
            >
              <Card className="border-2 border-[#1565FF]/20 shadow-lg">
                <CardContent className="p-6 md:p-8">
                  {downloaded ? (
                    <div className="py-8 text-center">
                      <div className="mx-auto mb-4 flex size-16 items-center justify-center rounded-full bg-[#1565FF]/10">
                        <Check className="size-8 text-[#1565FF]" />
                      </div>
                      <h3 className="mb-2 text-xl font-bold text-[#071A2D]">
                        Thank You!
                      </h3>
                      <p className="mb-6 text-sm text-muted-foreground">
                        Your catalog is ready. We&apos;ve also sent a copy to your
                        email.
                      </p>
                      <Button
                        onClick={handleDownload}
                        className="w-full bg-[#FF7A00] text-white hover:bg-[#FF7A00]/90"
                      >
                        <Download className="mr-2 size-4" />
                        Download PDF Now
                      </Button>
                      <p className="mt-4 text-xs text-muted-foreground">
                        Our team will also reach out shortly to discuss your needs.
                      </p>
                    </div>
                  ) : (
                    <>
                      <div className="mb-6 text-center">
                        <div className="mx-auto mb-3 flex size-12 items-center justify-center rounded-full bg-[#1565FF]/10">
                          <BookOpen className="size-6 text-[#1565FF]" />
                        </div>
                        <h3 className="text-xl font-bold text-[#071A2D]">
                          Get Your Free Catalog
                        </h3>
                        <p className="mt-1 text-sm text-muted-foreground">
                          Fill in your details to download instantly
                        </p>
                      </div>

                      <Form {...form}>
                        <form
                          onSubmit={form.handleSubmit(onSubmit)}
                          className="space-y-4"
                          noValidate
                        >
                          <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Full Name *</FormLabel>
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
                                <FormLabel>Company *</FormLabel>
                                <FormControl>
                                  <Input placeholder="Your Company" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="country"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Country *</FormLabel>
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
                                <FormLabel>Email *</FormLabel>
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

                          <FormField
                            control={form.control}
                            name="whatsapp"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>WhatsApp (optional)</FormLabel>
                                <FormControl>
                                  <Input placeholder="+1 555 000 0000" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="interest"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Primary Interest</FormLabel>
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
                                        value={cat
                                          .toLowerCase()
                                          .replace(/ /g, '-')}
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

                          <Button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full bg-[#FF7A00] text-white hover:bg-[#FF7A00]/90"
                            size="lg"
                          >
                            {isSubmitting ? (
                              <>
                                <span className="mr-2 inline-block size-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
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
                      </Form>

                      <p className="mt-4 text-center text-xs text-muted-foreground">
                        Free for qualified B2B buyers. No credit card required.
                      </p>
                    </>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
