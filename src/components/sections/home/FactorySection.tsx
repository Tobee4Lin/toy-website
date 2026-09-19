'use client';

import { motion } from 'framer-motion';
import { Factory, Search, Monitor, Package, ShieldCheck, Warehouse } from 'lucide-react';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { Image } from '@/components/ui/image';

const FACTORY_IMAGE = '/images/factory/factory-building.png';

const CAPABILITIES = [
  { icon: Search, title: 'Custom Manufacturing', desc: 'Find the right factory at the right price.' },
  { icon: Monitor, title: 'Production Monitoring', desc: 'Real-time updates on your orders.' },
  { icon: Factory, title: 'Injection Molding', desc: 'Precision plastic manufacturing.' },
  { icon: Package, title: 'Assembly & Packaging', desc: 'End-to-end production coordination.' },
  { icon: Warehouse, title: 'Warehousing', desc: 'Consolidation and storage solutions.' },
  { icon: ShieldCheck, title: 'Quality Inspection', desc: 'Rigorous QC at every stage.' },
];

const STATS = [
  { value: '2015', label: 'Founded' },
  { value: '20,000㎡', label: 'Factory Area' },
  { value: '7 days', label: 'Sample Lead Time' },
  { value: 'BSCI', label: 'Audited' },
];

export default function FactorySection() {
  return (
    <section className="w-full bg-white py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 lg:items-center">
          {/* Left: Image + capabilities */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7 }}
          >
            <div className="relative mb-6 overflow-hidden rounded-2xl">
              <Image
                src={FACTORY_IMAGE}
                alt="Toy factory production line"
                className="aspect-[16/10] w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#071A2D]/60 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <div className="text-2xl font-bold text-white">
                  Our Own Factory Since 2015
                </div>
                <div className="text-sm text-white/70">
                  20,000㎡ facility · BSCI &amp; ISO9001 certified · Chenghai, China
                </div>
              </div>
            </div>

            {/* Stats bar */}
            <div className="grid grid-cols-4 gap-4 rounded-2xl border border-border/50 bg-[#F5F7FA] p-6">
              {STATS.map((s) => (
                <div key={s.label} className="text-center">
                  <div className="text-xl font-black text-[#071A2D] md:text-2xl">
                    {s.value}
                  </div>
                  <div className="mt-1 text-[10px] text-muted-foreground md:text-xs">
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right: Content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7 }}
          >
            <span className="mb-3 block text-xs font-semibold uppercase tracking-widest text-[#1565FF]">
              Our Factory
            </span>
            <h2 className="mb-4 text-3xl font-bold tracking-tight text-[#071A2D] md:text-4xl lg:text-5xl">
              Chenghai Our Factory
            </h2>
            <p className="mb-8 max-w-xl text-base text-muted-foreground md:text-lg">
              Operating a 20,000㎡ BSCI &amp; ISO9001 certified factory since 2015.
              7-day sampling, 20-25 day production lead times, and a 5,000㎡ warehouse
              for reliable toy manufacturing and global supply.
            </p>

            <div className="grid gap-4 sm:grid-cols-2">
              {CAPABILITIES.map((cap) => {
                const Icon = cap.icon;
                return (
                  <div
                    key={cap.title}
                    className="flex gap-3 rounded-xl border border-border/50 bg-white p-4"
                  >
                    <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-[#1565FF]/10 text-[#1565FF]">
                      <Icon className="size-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-[#071A2D]">{cap.title}</h4>
                      <p className="mt-0.5 text-xs text-muted-foreground">{cap.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-8">
              <Button asChild className="bg-[#1565FF] text-white hover:bg-[#1565FF]/90">
                <Link href="/about">Learn More About Our Factory</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
