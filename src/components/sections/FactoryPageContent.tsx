'use client';

import { motion } from 'framer-motion';
import {
  Factory as FactoryIcon,
  Search,
  Settings,
  Wrench,
  Package as PackageIcon,
  Warehouse,
  ClipboardCheck,
  Users,
  Globe,
  Check,
  Send,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useApp } from '@/context/AppContext';
import { trackEvent } from '@/lib/analytics';

const CAPABILITIES = [
  {
    icon: Search,
    title: 'Custom Manufacturing',
    desc: 'Browse our in-house product range. Every item is manufactured, quality-checked and packaged on our production lines.',
  },
  {
    icon: Settings,
    title: 'Injection Molding',
    desc: 'High-precision plastic injection molding with our production lines. Multi-cavity molds, fast cycle times, consistent quality.',
  },
  {
    icon: Wrench,
    title: 'Assembly & Testing',
    desc: 'Skilled assembly lines with trained workers. Functional testing, aging tests, and safety verification at every stage.',
  },
  {
    icon: PackageIcon,
    title: 'Packaging Production',
    desc: 'Integrated packaging supply chain — color boxes, blister packs, gift boxes, display boxes, custom retail packaging.',
  },
  {
    icon: Warehouse,
    title: 'Warehouse & Logistics',
    desc: 'Consolidation warehousing, inventory management, and shipping coordination by sea, air, and express worldwide.',
  },
  {
    icon: ClipboardCheck,
    title: 'Quality Inspection',
    desc: 'Multi-stage quality control: incoming material, in-process, finished product, and pre-shipment inspections.',
  },
];

const STATS = [
  { value: '2015', label: 'Founded' },
  { value: '10+', label: 'Years Experience' },
  { value: '20,000㎡', label: 'Factory Area' },
  { value: '5,000㎡', label: 'Warehouse' },
];

const PRODUCTION_STATS = [
  { value: '7 days', label: 'Sample Lead Time' },
  { value: '20-25 days', label: 'Mass Production' },
  { value: 'BSCI', label: 'Audited Factory' },
  { value: 'ISO9001', label: 'Quality Certified' },
];

const GALLERY = [
  { src: '/images/factory/factory-building.png', label: 'Factory Building', desc: 'Modern factory facility in Chenghai' },
  { src: '/images/factory/injection-molding.png', label: 'Injection Molding', desc: 'High-precision injection molding machines' },
  { src: '/images/factory/workshop-crane.png', label: 'Production Workshop', desc: 'Organized workshop with overhead crane' },
  { src: '/images/factory/raw-material-warehouse.png', label: 'Raw Material Storage', desc: 'Selected virgin plastic materials' },
  { src: '/images/factory/finished-goods-warehouse.png', label: 'Finished Goods Warehouse', desc: '5,000㎡ finished goods storage' },
  { src: '/images/factory/showroom-reception.png', label: 'Product Showroom', desc: 'Modern showroom with latest collections' },
  { src: '/images/factory/showroom-wall.png', label: 'Showroom Display', desc: 'Curated product walls for buyer selection' },
  { src: '/images/factory/certifications.png', label: 'Certifications', desc: 'BSCI, ISO9001 and product test reports' },
];

export default function FactoryPageContent() {
  const { openRfqDialog } = useApp();

  const handleQuote = () => {
    trackEvent('request_quote_click', { source: 'factory_page' });
    openRfqDialog();
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="relative w-full overflow-hidden bg-[#071A2D] text-white">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_rgba(255_122_0_0.25),transparent_50%)]" />
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />
        <div className="relative mx-auto max-w-7xl px-4 py-20 md:px-6 md:py-28">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <Badge className="mb-4 bg-[#1565FF] text-white">Our Factory</Badge>
            <h1 className="text-4xl font-black leading-tight md:text-5xl lg:text-6xl">
              Chenghai Toy Manufacturing
              <br />
              <span className="bg-gradient-to-r from-[#1565FF] to-[#FF7A00] bg-clip-text text-transparent">
                At Your Fingertips.
              </span>
            </h1>
            <p className="mt-6 max-w-2xl text-lg text-white/70">
              Based in Chenghai, Shantou — the world&apos;s toy manufacturing
              capital. Our own 20,000sqm factory delivers quality toys at
              competitive prices.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button
                size="lg"
                onClick={handleQuote}
                className="bg-[#FF7A00] text-white hover:bg-[#FF7A00]/90"
              >
                <Send className="mr-2 size-4" />
                Factory Visit Request
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="w-full border-b border-border bg-white py-12">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
            {STATS.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="text-center"
              >
                <div className="text-2xl font-black text-[#1565FF] md:text-4xl">
                  {stat.value}
                </div>
                <div className="mt-1 text-sm text-muted-foreground">{stat.label}</div>
              </motion.div>
            ))}
          </div>
          <div className="mt-8 grid grid-cols-2 gap-6 border-t border-border/50 pt-8 md:grid-cols-4">
            {PRODUCTION_STATS.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="text-center"
              >
                <div className="text-xl font-black text-[#FF7A00] md:text-2xl">
                  {stat.value}
                </div>
                <div className="mt-1 text-sm text-muted-foreground">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Factory Gallery */}
      <section className="w-full bg-white py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
            className="mb-12 text-center md:mb-16"
          >
            <span className="mb-3 block text-xs font-semibold uppercase tracking-widest text-[#1565FF]">
              Our Facility
            </span>
            <h2 className="text-3xl font-bold tracking-tight text-[#071A2D] md:text-4xl lg:text-5xl">
              Inside Our Factory
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base text-muted-foreground md:text-lg">
              A 20,000㎡ modern factory with injection molding, assembly lines,
              a 5,000㎡ warehouse, and a dedicated product showroom.
            </p>
          </motion.div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {GALLERY.map((item, i) => (
              <motion.div
                key={item.src}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5, delay: (i % 4) * 0.08 }}
                className="group relative overflow-hidden rounded-xl bg-[#F5F7FA]"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={item.src}
                  alt={item.label}
                  className="aspect-[4/3] w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#071A2D]/80 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <div className="text-sm font-bold text-white">{item.label}</div>
                  <div className="mt-0.5 text-xs text-white/70">{item.desc}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Capabilities */}
      <section className="w-full bg-[#F5F7FA] py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
            className="mb-12 text-center md:mb-16"
          >
            <span className="mb-3 block text-xs font-semibold uppercase tracking-widest text-[#FF7A00]">
              Capabilities
            </span>
            <h2 className="text-3xl font-bold tracking-tight text-[#071A2D] md:text-4xl">
              Production Capabilities
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
              A comprehensive manufacturing ecosystem covering the entire toy
              production process, from raw material to finished product.
            </p>
          </motion.div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {CAPABILITIES.map((cap, i) => {
              const Icon = cap.icon;
              return (
                <motion.div
                  key={cap.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                >
                  <Card className="h-full transition-all hover:-translate-y-1 hover:shadow-lg">
                    <CardContent className="p-6">
                      <div className="mb-4 flex size-12 items-center justify-center rounded-xl bg-[#1565FF]/10 text-[#1565FF]">
                        <Icon className="size-6" />
                      </div>
                      <h3 className="mb-2 text-lg font-bold text-[#071A2D]">
                        {cap.title}
                      </h3>
                      <p className="text-sm text-muted-foreground">{cap.desc}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Supply Chain Coordination */}
      <section className="w-full bg-white py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.6 }}
            >
              <span className="mb-3 block text-xs font-semibold uppercase tracking-widest text-[#1565FF]">
                Our Approach
              </span>
              <h2 className="text-3xl font-bold tracking-tight text-[#071A2D] md:text-4xl">
                In-House Production
                <br />
                That Actually Works.
              </h2>
              <p className="mt-4 text-muted-foreground">
                We don&apos;t just introduce you to factories — we manage the entire
                production process on your behalf. Our on-the-ground team in
                Chenghai ensures every order meets specifications, quality
                standards, and delivery timelines.
              </p>

              <ul className="mt-6 space-y-3">
                {[
                  'Our own production lines with verified track records',
                  'On-site production monitoring and progress reporting',
                  'Multi-stage quality inspections before, during, and after production',
                  'Consolidation services for multi-supplier orders',
                  'Transparent pricing — no hidden fees',
                  'Dedicated project manager for every client',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-[#1565FF]/10 text-[#1565FF]">
                      <Check className="size-3" />
                    </div>
                    <span className="text-sm">{item}</span>
                  </li>
                ))}
              </ul>

              <Button
                onClick={handleQuote}
                className="mt-6 bg-[#FF7A00] text-white hover:bg-[#FF7A00]/90"
              >
                <Send className="mr-2 size-4" />
                Discuss Your Project
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.6 }}
              className="grid grid-cols-2 gap-4"
            >
              <Card className="aspect-square bg-gradient-to-br from-[#1565FF] to-[#0d47a1] text-white">
                <CardContent className="flex h-full flex-col justify-center p-6">
                  <Users className="mb-3 size-8" />
                  <div className="text-2xl font-bold">On-Site Team</div>
                  <div className="text-sm text-white/70">
                    Engineers & QC specialists in Chenghai
                  </div>
                </CardContent>
              </Card>
              <Card className="aspect-square bg-gradient-to-br from-[#FF7A00] to-[#e65100] text-white">
                <CardContent className="flex h-full flex-col justify-center p-6">
                  <Globe className="mb-3 size-8" />
                  <div className="text-2xl font-bold">Global Export</div>
                  <div className="text-sm text-white/70">
                    50+ countries, all major shipping routes
                  </div>
                </CardContent>
              </Card>
              <Card className="aspect-square bg-[#F5F7FA]">
                <CardContent className="flex h-full flex-col justify-center p-6">
                  <FactoryIcon className="mb-3 size-8 text-[#071A2D]" />
                  <div className="text-2xl font-bold text-[#071A2D]">
                    Partner Network
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Our own 20,000sqm factory across toy categories
                  </div>
                </CardContent>
              </Card>
              <Card className="aspect-square bg-[#F5F7FA]">
                <CardContent className="flex h-full flex-col justify-center p-6">
                  <ClipboardCheck className="mb-3 size-8 text-[#1565FF]" />
                  <div className="text-2xl font-bold text-[#071A2D]">QC Pass Rate</div>
                  <div className="text-sm text-muted-foreground">
                    Rigorous inspection at every production stage
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
