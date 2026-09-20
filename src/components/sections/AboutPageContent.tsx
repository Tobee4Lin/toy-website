'use client';

import { motion } from 'framer-motion';
import {
  ShieldCheck,
  Lightbulb,
  Target,
  Heart,
  Send,
  Check,
  Briefcase,
  Factory as FactoryIcon,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useApp } from '@/context/AppContext';
import { trackEvent } from '@/lib/analytics';

const VALUES = [
  {
    icon: Target,
    title: 'Reliability First',
    desc: 'We deliver what we promise. Clear communication, realistic timelines, and honest assessment of every project.',
  },
  {
    icon: ShieldCheck,
    title: 'Quality Obsessed',
    desc: 'We treat every order as if it were going to our own customers. Zero compromise on safety and quality.',
  },
  {
    icon: Lightbulb,
    title: 'Solution-Driven',
    desc: "We don't just take orders — we solve problems. Our team proactively finds better ways to make your products.",
  },
  {
    icon: Heart,
    title: 'Long-Term Partnerships',
    desc: 'We grow with our clients. Many of our customers have been with us for years, not just one order.',
  },
];

const FACTORY_STATS = [
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

export default function AboutPageContent() {
  const { openRfqDialog } = useApp();

  const handleQuote = () => {
    trackEvent('request_quote_click', { source: 'about_page' });
    openRfqDialog();
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="relative w-full overflow-hidden bg-[#071A2D] text-white">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(255_122_0_0.25),transparent_50%)]" />
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
            <Badge className="mb-4 bg-[#FF7A00] text-white">
              <FactoryIcon className="mr-1 size-3" />
              About Our Factory
            </Badge>
            <h1 className="text-4xl font-black leading-tight md:text-5xl lg:text-6xl">
              Toy Manufacturing Since
              <br />
              <span className="bg-gradient-to-r from-[#FF7A00] to-[#FFC400] bg-clip-text text-transparent">
                2015 — in Chenghai.
              </span>
            </h1>
            <p className="mt-6 max-w-2xl text-lg text-white/70">
              A 20,000㎡ BSCI &amp; ISO9001 certified factory in Shantou&apos;s
              toy capital. We help brands worldwide source quality toys with
              7-day sampling, 20-25 day production, and end-to-end quality control.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button
                size="lg"
                onClick={handleQuote}
                className="bg-[#FF7A00] text-white hover:bg-[#FF7A00]/90"
              >
                <Send className="mr-2 size-4" />
                Get in Touch
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="w-full border-b border-border bg-white py-12">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
            {FACTORY_STATS.map((stat, i) => (
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

      {/* Story */}
      <section className="w-full bg-white py-20 md:py-28">
        <div className="mx-auto max-w-4xl px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6 }}
          >
            <span className="mb-3 block text-xs font-semibold uppercase tracking-widest text-[#1565FF]">
              Our Story
            </span>
            <h2 className="text-3xl font-bold tracking-tight text-[#071A2D] md:text-4xl">
              Born in the World&apos;s Toy Capital
            </h2>
            <div className="mt-6 space-y-4 text-muted-foreground">
              <p>
                Located in Chenghai, Shantou — widely known as the &quot;Toy City of
                China&quot; — we&apos;ve been manufacturing toys since 2015. What
                started as a single injection molding line has grown into a
                20,000㎡ factory with a 5,000㎡ warehouse, a product showroom, and
                a team of engineers and QC specialists.
              </p>
              <p>
                We started with a simple belief: that toy manufacturing should
                be transparent, reliable, and actually enjoyable. Too many buyers
                have been burned by quality issues, communication problems, and
                broken promises. We set out to do it differently.
              </p>
              <p>
                Today, we work with partners across North America, Europe, the
                Middle East, and beyond. We don&apos;t just sell products — we
                coordinate the entire process, from product selection and
                customization to production monitoring, quality control, and
                shipping.
              </p>
              <p className="font-medium text-[#071A2D]">
                Our mission is simple: help great toy companies build great
                products, at scale, with zero surprises.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Factory Gallery */}
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
              Inside Our Factory
            </span>
            <h2 className="text-3xl font-bold tracking-tight text-[#071A2D] md:text-4xl">
              Take a Look Around
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
              Injection molding, assembly lines, raw material and finished goods
              warehouses, plus a dedicated product showroom.
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
                className="group relative overflow-hidden rounded-xl bg-white"
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

      {/* Values */}
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
              What We Stand For
            </span>
            <h2 className="text-3xl font-bold tracking-tight text-[#071A2D] md:text-4xl">
              Our Values
            </h2>
          </motion.div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {VALUES.map((v, i) => {
              const Icon = v.icon;
              return (
                <motion.div
                  key={v.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                >
                  <Card className="h-full transition-all hover:-translate-y-1 hover:shadow-lg">
                    <CardContent className="p-6">
                      <div className="mb-4 flex size-12 items-center justify-center rounded-xl bg-[#1565FF]/10 text-[#1565FF]">
                        <Icon className="size-6" />
                      </div>
                      <h3 className="mb-2 text-lg font-bold text-[#071A2D]">
                        {v.title}
                      </h3>
                      <p className="text-sm text-muted-foreground">{v.desc}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* What We Do */}
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
              What We Do
            </span>
            <h2 className="text-3xl font-bold tracking-tight text-[#071A2D] md:text-4xl">
              More Than a Supplier
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
              We&apos;re an extension of your team in China. Here&apos;s how we add
              value at every step.
            </p>
          </motion.div>

          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                icon: Briefcase,
                title: 'Custom Manufacturing',
                desc: 'Manufacture quality toys in-house. From mold design to finished packaging under one roof.',
                items: [
                  'Custom mold development',
                  'Color & material selection',
                  'In-house quality control',
                  'Flexible MOQ support',
                ],
              },
              {
                icon: Lightbulb,
                title: 'Product Development',
                desc: 'Bring new ideas to life. From concept sketches to production-ready products with our engineering team.',
                items: [
                  'Concept & feasibility',
                  '3D design & prototyping',
                  'Mold making coordination',
                  'Pilot runs & testing',
                ],
              },
              {
                icon: ShieldCheck,
                title: 'Quality Assurance',
                desc: 'Protect your brand reputation. Our QC team inspects at every stage so only good product ships.',
                items: [
                  'IQC / IPQC / FQC / OQC',
                  'AQL standard inspections',
                  'Third-party lab testing',
                  'Certification support',
                ],
              },
            ].map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                >
                  <Card className="h-full transition-all hover:border-[#1565FF]/30 hover:shadow-md">
                    <CardContent className="p-6">
                      <div className="mb-4 flex size-12 items-center justify-center rounded-xl bg-[#FF7A00]/10 text-[#FF7A00]">
                        <Icon className="size-6" />
                      </div>
                      <h3 className="mb-2 text-lg font-bold text-[#071A2D]">
                        {item.title}
                      </h3>
                      <p className="mb-4 text-sm text-muted-foreground">{item.desc}</p>
                      <ul className="space-y-1.5">
                        {item.items.map((s) => (
                          <li key={s} className="flex items-center gap-2 text-sm">
                            <Check className="size-4 shrink-0 text-[#1565FF]" />
                            <span>{s}</span>
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
            Ready to Work With a Factory You Can Trust?
          </h2>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Button
              size="lg"
              onClick={handleQuote}
              className="bg-[#FF7A00] text-white hover:bg-[#FF7A00]/90"
            >
              <Send className="mr-2 size-4" />
              Contact Us Today
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
