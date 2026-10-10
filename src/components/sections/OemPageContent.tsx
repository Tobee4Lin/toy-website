'use client';

import { motion } from 'framer-motion';
import {
  Lightbulb,
  Palette,
  Printer,
  Package as PackageIcon,
  Layers,
  Factory,
  ShieldCheck,
  Truck,
  Check,
  Send,
  Download,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useApp } from '@/context/AppContext';
import { trackEvent } from '@/lib/analytics';

const PROCESS_STEPS = [
  {
    icon: Lightbulb,
    step: '01',
    title: 'Idea & Concept',
    desc: 'Share your vision, target market, and requirements. We analyze feasibility and provide expert guidance.',
    accent: '#1565FF',
  },
  {
    icon: Palette,
    step: '02',
    title: 'Design & Engineering',
    desc: '3D modeling, engineering drawings, material selection. Iterate until the design is perfect.',
    accent: '#FF7A00',
  },
  {
    icon: Layers,
    step: '03',
    title: 'Prototype & Sample',
    desc: 'Physical sample production for review and testing. Refine before tooling and mass production.',
    accent: '#FFC400',
  },
  {
    icon: Factory,
    step: '04',
    title: 'Tooling & Production',
    desc: 'Mold making, pilot run, then full-scale manufacturing with rigorous in-process QC.',
    accent: '#1565FF',
  },
  {
    icon: ShieldCheck,
    step: '05',
    title: 'Quality Control',
    desc: 'Incoming, in-process, finished product, and pre-shipment inspections. Full testing support.',
    accent: '#FF7A00',
  },
  {
    icon: Truck,
    step: '06',
    title: 'Global Delivery',
    desc: 'Packaging, logistics coordination, shipping by sea/air/express. Door-to-door options.',
    accent: '#FFC400',
  },
];

const CUSTOMIZATION_OPTIONS = [
  {
    icon: Palette,
    title: 'Color Customization',
    desc: 'Match your brand colors with Pantone or custom color specifications for plastic parts and packaging.',
    items: ['Pantone color matching', 'Custom plastic colors', 'Gradient and special effects', 'Transparent / matte / glossy'],
  },
  {
    icon: Printer,
    title: 'Logo Printing',
    desc: 'Multiple printing technologies available to showcase your brand on the product and packaging.',
    items: ['Pad printing', 'Silk screen printing', 'Heat transfer', 'UV printing', 'Embossing / debossing'],
  },
  {
    icon: PackageIcon,
    title: 'Packaging Design',
    desc: 'Full packaging design service — from concept to production-ready files. Stand out on retail shelves.',
    items: ['Color box design', 'Blister packaging', 'Gift boxes', 'Display boxes', 'PDQ / counter displays'],
  },
  {
    icon: Layers,
    title: 'Custom Molds',
    desc: 'Complete new product development with custom mold design. Bring your unique product idea to life.',
    items: ['New mold design', '3D prototyping', 'Mold flow analysis', 'Mold modification', 'Multi-cavity molds'],
  },
];

export default function OemPageContent() {
  const { openRfqDialog, openCatalogDialog } = useApp();

  const handleQuote = () => {
    trackEvent('request_quote_click', { source: 'oem_page' });
    openRfqDialog();
  };

  const handleCatalog = () => {
    trackEvent('catalog_form_open', { source: 'oem_page' });
    openCatalogDialog('oem_page');
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="relative w-full overflow-hidden bg-[#071A2D] text-white">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: 'url(/images/factory/injection-molding.png)' }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#071A2D]/90 via-[#071A2D]/75 to-[#071A2D]/50" />
        <div className="relative mx-auto max-w-7xl px-4 py-20 md:px-6 md:py-28">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <Badge className="mb-4 bg-[#FF7A00] text-white">OEM / ODM Service</Badge>
            <h1 className="text-4xl font-black leading-tight md:text-5xl lg:text-6xl">
              Design It Your Way.
              <br />
              <span className="bg-gradient-to-r from-[#FF7A00] to-[#FFC400] bg-clip-text text-transparent">
                We&apos;ll Build It.
              </span>
            </h1>
            <p className="mt-6 max-w-2xl text-lg text-white/70">
              From concept to production — our experienced engineering team
              brings your toy ideas to life with reliable manufacturing in
              Chenghai, China.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button
                size="lg"
                onClick={handleQuote}
                className="bg-[#FF7A00] text-white hover:bg-[#FF7A00]/90"
              >
                <Send className="mr-2 size-4" />
                Discuss Your Project
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Process Timeline */}
      <section className="w-full bg-[#F5F7FA] py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
            className="mb-12 text-center md:mb-16"
          >
            <span className="mb-3 block text-xs font-semibold uppercase tracking-widest text-[#1565FF]">
              Our Process
            </span>
            <h2 className="text-3xl font-bold tracking-tight text-[#071A2D] md:text-4xl">
              From Idea to Delivery
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
              A proven 6-step development process designed to de-risk your product
              launch and ensure quality at every stage.
            </p>
          </motion.div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {PROCESS_STEPS.map((step, i) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.step}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                >
                  <Card className="group h-full border-0 bg-white shadow-sm ring-1 ring-slate-200 transition-all hover:-translate-y-1 hover:shadow-xl">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div
                          className="flex size-12 items-center justify-center rounded-xl transition-transform group-hover:scale-110"
                          style={{ backgroundColor: `${step.accent}15`, color: step.accent }}
                        >
                          <Icon className="size-6" />
                        </div>
                        <span
                          className="text-5xl font-black leading-none"
                          style={{ color: `${step.accent}15` }}
                        >
                          {step.step}
                        </span>
                      </div>
                      <h3 className="mt-5 text-lg font-bold text-[#071A2D]">
                        {step.title}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-slate-500">
                        {step.desc}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Customization Options */}
      <section className="w-full bg-white py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
            className="mb-12 text-center md:mb-16"
          >
            <span className="mb-3 block text-xs font-semibold uppercase tracking-widest text-[#FF7A00]">
              Customization
            </span>
            <h2 className="text-3xl font-bold tracking-tight text-[#071A2D] md:text-4xl">
              Make It Truly Yours
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
              Comprehensive customization capabilities to match your brand identity
              and market requirements.
            </p>
          </motion.div>

          <div className="grid gap-6 md:grid-cols-2">
            {CUSTOMIZATION_OPTIONS.map((opt, i) => {
              const Icon = opt.icon;
              return (
                <motion.div
                  key={opt.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                >
                  <Card className="h-full transition-all hover:border-[#1565FF]/30 hover:shadow-md">
                    <CardContent className="p-6">
                      <div className="mb-4 flex size-12 items-center justify-center rounded-xl bg-[#1565FF]/10 text-[#1565FF]">
                        <Icon className="size-6" />
                      </div>
                      <h3 className="mb-2 text-xl font-bold text-[#071A2D]">
                        {opt.title}
                      </h3>
                      <p className="mb-4 text-sm text-muted-foreground">{opt.desc}</p>
                      <ul className="space-y-2">
                        {opt.items.map((item) => (
                          <li
                            key={item}
                            className="flex items-center gap-2 text-sm"
                          >
                            <Check className="size-4 shrink-0 text-[#1565FF]" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="w-full bg-[#071A2D] py-16">
        <div className="mx-auto max-w-4xl px-4 text-center md:px-6">
          <h2 className="text-3xl font-bold text-white md:text-4xl">
            Have a Product Idea? Let&apos;s Build It Together.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-white/60">
            Tell us about your project and we&apos;ll get back to you with a
            detailed proposal within 24 hours.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Button
              size="lg"
              onClick={handleQuote}
              className="bg-[#FF7A00] text-white hover:bg-[#FF7A00]/90"
            >
              <Send className="mr-2 size-4" />
              Start Your OEM Project
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
