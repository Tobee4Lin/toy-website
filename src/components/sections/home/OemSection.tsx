'use client';

import { motion } from 'framer-motion';
import {
  Lightbulb,
  PenTool,
  Box,
  Factory,
  ShieldCheck,
  Truck,
  Palette,
  Printer,
  Package,
  Layers,
  Wrench,
} from 'lucide-react';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import MagicRings from '@/components/effects/MagicRings';

const PROCESS_STEPS = [
  { icon: Lightbulb, title: 'Idea', desc: 'Share your concept or product brief.' },
  { icon: PenTool, title: 'Design', desc: '3D renders and technical drawings.' },
  { icon: Box, title: 'Prototype', desc: 'Sample development and approval.' },
  { icon: Factory, title: 'Production', desc: 'Mass manufacturing with QC.' },
  { icon: ShieldCheck, title: 'Quality Control', desc: 'Final inspection and testing.' },
  { icon: Truck, title: 'Global Delivery', desc: 'Shipping, docs, and logistics.' },
];

const CUSTOM_OPTIONS = [
  { icon: Palette, label: 'Color Customization' },
  { icon: Printer, label: 'Logo Printing' },
  { icon: Package, label: 'Packaging Design' },
  { icon: Layers, label: 'Custom Molds' },
  { icon: Wrench, label: 'Product Development' },
];

export default function OemSection() {
  return (
    <section className="relative w-full overflow-hidden bg-[#071A2D] py-20 text-white md:py-28">
      <MagicRings color="#FF7A00" size={300} className="left-[-80px] top-1/2 -translate-y-1/2" />
      <MagicRings color="#1565FF" size={200} className="right-[-40px] bottom-10" />
      <div className="relative mx-auto max-w-7xl px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center md:mb-16"
        >
          <span className="mb-3 block text-xs font-semibold uppercase tracking-widest text-[#FF7A00]">
            OEM & ODM
          </span>
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl">
            Your Vision, Our Manufacturing
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base text-white/60 md:text-lg">
            From a simple sketch to mass production, we guide you through every step
            with expert OEM and ODM services.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative mb-16">
          <div className="hidden md:block">
            <div className="absolute left-0 right-0 top-10 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
          </div>
          <div className="grid gap-8 md:grid-cols-6">
            {PROCESS_STEPS.map((step, i) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  className="relative text-center"
                >
                  <div className="relative z-10 mx-auto mb-4 flex size-20 items-center justify-center rounded-full border-2 border-[#FF7A00]/30 bg-[#0A2340]">
                    <Icon className="size-8 text-[#FF7A00]" />
                  </div>
                  <div className="text-xs font-bold text-[#FF7A00]">
                    Step {i + 1}
                  </div>
                  <h3 className="mt-1 text-sm font-bold">{step.title}</h3>
                  <p className="mt-1 text-xs text-white/50">{step.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Customization options */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="rounded-2xl border border-white/10 bg-white/[0.03] p-8 md:p-10"
        >
          <h3 className="mb-6 text-xl font-bold md:text-2xl">Customization Options</h3>
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-5">
            {CUSTOM_OPTIONS.map((opt) => {
              const Icon = opt.icon;
              return (
                <div
                  key={opt.label}
                  className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.02] p-4"
                >
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-[#1565FF]/20 text-[#1565FF]">
                    <Icon className="size-5" />
                  </div>
                  <span className="text-sm font-medium">{opt.label}</span>
                </div>
              );
            })}
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button
              asChild
              className="bg-[#FF7A00] text-white hover:bg-[#FF7A00]/90"
            >
              <Link href="/oem">Learn About OEM Service</Link>
            </Button>
            <Button asChild variant="outline" className="border-white/20 text-white hover:bg-white/10">
              <Link href="/contact">Talk to Our Team</Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
