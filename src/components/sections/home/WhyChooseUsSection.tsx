'use client';

import { motion } from 'framer-motion';
import { Factory, Lightbulb, Settings, Globe2 } from 'lucide-react';
import MagnetLines from '@/components/effects/MagnetLines';

const FEATURES = [
  {
    number: '01',
    title: 'Factory & Supply Chain Access',
    description:
      'Direct access to 80+ vetted Chenghai toy factories. We handle sourcing, pricing negotiation, and production coordination so you don\'t have to.',
    icon: Factory,
    accent: '#1565FF',
  },
  {
    number: '02',
    title: 'Creative Product Development',
    description:
      'From concept sketches to final production, our design team helps you develop unique toys that stand out in competitive markets.',
    icon: Lightbulb,
    accent: '#FF7A00',
  },
  {
    number: '03',
    title: 'OEM & ODM Capabilities',
    description:
      'Full customization: colors, logo printing, packaging design, custom molds, and complete product development tailored to your brand.',
    icon: Settings,
    accent: '#FFC400',
  },
  {
    number: '04',
    title: 'Global Export Experience',
    description:
      'Serving 50+ countries with EN71, ASTM, CPSIA and CE compliance support. We handle documentation, certification and shipping logistics.',
    icon: Globe2,
    accent: '#071A2D',
  },
];

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export default function WhyChooseUsSection() {
  return (
    <section className="relative w-full bg-white py-20 md:py-28">
      <MagnetLines rows={4} columns={15} lineColor="#1565FF" lineWidth={1} />
      <div className="relative mx-auto max-w-7xl px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center md:mb-16"
        >
          <span className="mb-3 block text-xs font-semibold uppercase tracking-widest text-[#1565FF]">
            Why Choose Us
          </span>
          <h2 className="text-3xl font-bold tracking-tight text-[#071A2D] md:text-4xl lg:text-5xl">
            Built for Global Toy Buyers
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base text-muted-foreground md:text-lg">
            We combine deep Chenghai supply chain expertise with international buyer
            standards — making toy sourcing simple, reliable and profitable.
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid gap-6 md:grid-cols-2 lg:grid-cols-4"
        >
          {FEATURES.map((f) => {
            const Icon = f.icon;
            return (
              <motion.div
                key={f.number}
                variants={item}
                whileHover={{ y: -6 }}
                transition={{ duration: 0.3 }}
                className="group relative overflow-hidden rounded-2xl border border-border/50 bg-white p-6 transition-all duration-300 hover:border-transparent hover:shadow-xl hover:shadow-[#071A2D]/5"
              >
                <div
                  className="absolute inset-x-0 top-0 h-1"
                  style={{ backgroundColor: f.accent }}
                />
                <div className="mb-4 text-5xl font-black text-[#071A2D]/5 transition-colors group-hover:text-[#071A2D]/10">
                  {f.number}
                </div>
                <div
                  className="mb-4 flex size-12 items-center justify-center rounded-xl"
                  style={{ backgroundColor: `${f.accent}15`, color: f.accent }}
                >
                  <Icon className="size-6" />
                </div>
                <h3 className="mb-2 text-lg font-bold text-[#071A2D]">
                  {f.title}
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {f.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
