'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Search, HelpCircle, MessageCircle, Package, Truck, Shield, Settings, FileText } from 'lucide-react';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { useApp } from '@/context/AppContext';
import { buildWhatsAppUrl } from '@/lib/utils';
import { trackEvent } from '@/lib/analytics';

interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

const FAQ_ITEMS: FAQItem[] = [
  // General
  {
    question: 'Where is your company located?',
    answer: 'We are based in Chenghai District, Shantou, Guangdong — known as China\'s "Toy Capital." Chenghai is home to thousands of toy manufacturers and a complete toy industry supply chain, allowing us to source and coordinate production efficiently.',
    category: 'general',
  },
  {
    question: 'Do you own all the factories?',
    answer: 'We work with a carefully selected network of our production lines in the Chenghai area. This model gives our clients access to a broader range of products and production capabilities than any single factory could provide. We handle quality control, production coordination, and communication so you only need one point of contact.',
    category: 'general',
  },
  {
    question: 'What is your typical response time?',
    answer: 'We respond to all inquiries within 24 business hours. For urgent matters, we recommend reaching us via WhatsApp for the fastest response.',
    category: 'general',
  },
  // Products
  {
    question: 'What types of toys do you supply?',
    answer: 'We specialize in plastic toys across four main categories: beach and sand toys, bubble toys, remote control toys, and building/construction block toys. We also source other plastic toy categories upon request.',
    category: 'products',
  },
  {
    question: 'What is the minimum order quantity (MOQ)?',
    answer: 'MOQ varies by product. Standard stock items typically start from 1-5 cartons. Customized products (logo, color, packaging) usually require 500-2,000 pieces per SKU. Fully custom OEM projects have higher MOQs depending on mold complexity. Contact us for specific product MOQs.',
    category: 'products',
  },
  {
    question: 'Can I order samples before placing a bulk order?',
    answer: 'Yes, we offer sample orders. Standard samples are typically available with sample fees and shipping costs covered by the buyer. Sample fees are often refundable or deductible from your first bulk order. Sample lead time is usually 3-7 days.',
    category: 'products',
  },
  {
    question: 'Are your products safe? What certifications do you have?',
    answer: 'Product safety is our priority. Our our production lines produce toys that comply with international safety standards. Many of our products meet EN71, ASTM F963, CPSIA, and CE standards depending on the specific item and target market. Certification availability varies by product — please ask for specific product certifications.',
    category: 'products',
  },
  // OEM / Custom
  {
    question: 'What customization options do you offer?',
    answer: 'We offer a full range of customization options: color changes, logo printing (pad printing, heat transfer, etc.), custom packaging design, custom molds for completely new products, and product development from concept to production.',
    category: 'oem',
  },
  {
    question: 'How long does OEM product development take?',
    answer: 'Timeline depends on complexity. Logo/color customization: 15-25 days. Custom packaging: 20-30 days. New mold and product development: typically 45-90 days from design confirmation to first production. We provide detailed timelines after understanding your specific requirements.',
    category: 'oem',
  },
  {
    question: 'Do you provide design services?',
    answer: 'Yes, we can assist with product design, 3D modeling, packaging design, and graphic design. Our team can work from your sketches, reference images, or detailed specifications to develop custom products.',
    category: 'oem',
  },
  // Order & Shipping
  {
    question: 'What are your payment terms?',
    answer: 'Standard terms are 30% deposit upon order confirmation and 70% balance before shipment. For established clients and certain order types, terms can be discussed. We accept T/T bank transfer, and other methods can be arranged on a case-by-case basis.',
    category: 'order',
  },
  {
    question: 'What shipping options are available?',
    answer: 'We offer sea freight (LCL and FCL), air freight, and express courier (DHL, FedEx, UPS) for samples and small orders. We ship from ports in Shenzhen, Guangzhou, and Shantou. We can also work with your designated freight forwarder.',
    category: 'order',
  },
  {
    question: 'What is the typical production lead time?',
    answer: 'For stock items, usually 7-15 days. For standard orders with existing tooling, 25-40 days. For custom orders requiring new molds, 45-90 days. Actual timelines depend on order quantity, customization level, and factory scheduling.',
    category: 'order',
  },
  // Quality
  {
    question: 'How do you ensure product quality?',
    answer: 'We implement multi-stage quality control: incoming material inspection, in-process production checks, finished product inspection, and pre-shipment inspection. We can also arrange third-party inspection services such as SGS, Intertek, or BV upon request.',
    category: 'quality',
  },
  {
    question: 'What happens if there are quality issues?',
    answer: 'We stand behind the products we supply. If quality issues arise, we work with you and the factory to resolve them promptly — whether through replacement, rework, or appropriate compensation. Our goal is long-term partnership, not one-time transactions.',
    category: 'quality',
  },
];

const CATEGORIES = [
  { id: 'all', label: 'All Questions', icon: HelpCircle },
  { id: 'general', label: 'General', icon: FileText },
  { id: 'products', label: 'Products', icon: Package },
  { id: 'oem', label: 'OEM / Custom', icon: Settings },
  { id: 'order', label: 'Order & Shipping', icon: Truck },
  { id: 'quality', label: 'Quality', icon: Shield },
];

export default function FaqPageContent() {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const { config } = useApp();

  const filtered = useMemo(() => {
    return FAQ_ITEMS.filter((item) => {
      const matchesCategory =
        activeCategory === 'all' || item.category === activeCategory;
      const matchesSearch =
        !search ||
        item.question.toLowerCase().includes(search.toLowerCase()) ||
        item.answer.toLowerCase().includes(search.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [search, activeCategory]);

  const handleWhatsApp = () => {
    trackEvent('whatsapp_click', { source: 'faq_page' });
    window.open(
      buildWhatsAppUrl(config.whatsapp, 'Hello! I have a question about your toy products.'),
      '_blank',
      'noopener,noreferrer',
    );
  };

  // Group by category when showing all
  const grouped = useMemo(() => {
    if (activeCategory !== 'all') return null;
    const groups: Record<string, FAQItem[]> = {};
    for (const item of filtered) {
      if (!groups[item.category]) groups[item.category] = [];
      groups[item.category].push(item);
    }
    return groups;
  }, [filtered, activeCategory]);

  const getCategoryLabel = (id: string) =>
    CATEGORIES.find((c) => c.id === id)?.label || id;

  return (
    <div className="min-h-screen bg-[#F5F7FA]">
      {/* Hero */}
      <section className="relative w-full overflow-hidden bg-[#071A2D] text-white">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(21_101_255_0.3),transparent_50%)]" />
        <div className="relative mx-auto max-w-5xl px-4 py-16 md:px-6 md:py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <Badge className="mb-4 bg-[#1565FF] text-white">FAQ</Badge>
            <h1 className="text-4xl font-black md:text-5xl">
              Frequently Asked Questions
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-white/70">
              Find answers to common questions about our products, services,
              ordering process, and quality assurance.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Search + categories */}
      <section className="w-full py-10">
        <div className="mx-auto max-w-5xl px-4 md:px-6">
          <div className="mb-6">
            <div className="relative">
              <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search for answers..."
                className="h-12 border-border/50 bg-white pl-9 shadow-sm"
              />
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((cat) => {
              const Icon = cat.icon;
              return (
                <Button
                  key={cat.id}
                  variant={activeCategory === cat.id ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setActiveCategory(cat.id)}
                  className={
                    activeCategory === cat.id
                      ? 'bg-[#1565FF] text-white hover:bg-[#1565FF]/90'
                      : ''
                  }
                >
                  <Icon className="mr-1.5 size-3.5" />
                  {cat.label}
                </Button>
              );
            })}
          </div>
        </div>
      </section>

      {/* FAQ content */}
      <section className="w-full pb-16">
        <div className="mx-auto max-w-4xl px-4 md:px-6">
          {filtered.length === 0 ? (
            <Card>
              <CardContent className="py-12 text-center">
                <HelpCircle className="mx-auto mb-3 size-10 text-muted-foreground" />
                <h3 className="mb-1 font-semibold text-[#071A2D]">
                  No matching questions
                </h3>
                <p className="mb-4 text-sm text-muted-foreground">
                  Try a different search term or category.
                </p>
                <Button
                  onClick={handleWhatsApp}
                  className="bg-[#25D366] text-white hover:bg-[#25D366]/90"
                >
                  <MessageCircle className="mr-2 size-4" />
                  Ask us directly
                </Button>
              </CardContent>
            </Card>
          ) : grouped ? (
            <div className="space-y-8">
              {Object.entries(grouped).map(([catId, items]) => (
                <motion.div
                  key={catId}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4 }}
                >
                  <h2 className="mb-3 text-lg font-semibold text-[#071A2D]">
                    {getCategoryLabel(catId)}
                  </h2>
                  <Card className="overflow-hidden border-border/50">
                    <Accordion type="single" collapsible className="divide-y divide-border/50">
                      {items.map((item, i) => (
                        <AccordionItem
                          key={`${catId}-${i}`}
                          value={`${catId}-${i}`}
                          className="border-0 px-6 first:pt-2 last:pb-2"
                        >
                          <AccordionTrigger className="py-4 text-left text-sm font-semibold text-[#071A2D] hover:no-underline">
                            <span className="pr-4">{item.question}</span>
                          </AccordionTrigger>
                          <AccordionContent className="pb-4 text-sm leading-relaxed text-muted-foreground">
                            {item.answer}
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </Card>
                </motion.div>
              ))}
            </div>
          ) : (
            <Card className="overflow-hidden border-border/50">
              <Accordion type="single" collapsible className="divide-y divide-border/50">
                {filtered.map((item, i) => (
                  <AccordionItem
                    key={i}
                    value={`item-${i}`}
                    className="border-0 px-6 first:pt-2 last:pb-2"
                  >
                    <AccordionTrigger className="py-4 text-left text-sm font-semibold text-[#071A2D] hover:no-underline">
                      <span className="pr-4">{item.question}</span>
                    </AccordionTrigger>
                    <AccordionContent className="pb-4 text-sm leading-relaxed text-muted-foreground">
                      {item.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </Card>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="w-full bg-white py-16">
        <div className="mx-auto max-w-3xl px-4 text-center md:px-6">
          <h2 className="mb-2 text-2xl font-bold text-[#071A2D]">
            Still have questions?
          </h2>
          <p className="mb-6 text-muted-foreground">
            Our team is ready to help. Reach out directly and we&apos;ll get back
            to you within 24 hours.
          </p>
          <div className="flex flex-col justify-center gap-3 sm:flex-row">
            <Button
              onClick={handleWhatsApp}
              className="bg-[#25D366] text-white hover:bg-[#25D366]/90"
            >
              <MessageCircle className="mr-2 size-4" />
              Chat on WhatsApp
            </Button>
            <Button variant="outline" asChild>
              <Link href="/contact">Send Email Inquiry</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
