'use client';

import { motion } from 'framer-motion';
import { ClipboardList, Eye, PackageCheck, Ship, Award, CheckCircle2 } from 'lucide-react';

const QC_STAGES = [
  {
    icon: ClipboardList,
    step: '01',
    title: 'Incoming Material',
    desc: 'Raw material inspection and testing before production begins.',
  },
  {
    icon: Eye,
    step: '02',
    title: 'In-Process QC',
    desc: 'Continuous monitoring during production to catch issues early.',
  },
  {
    icon: PackageCheck,
    step: '03',
    title: 'Finished Product',
    desc: 'Comprehensive inspection of every finished product batch.',
  },
  {
    icon: Ship,
    step: '04',
    title: 'Pre-Shipment',
    desc: 'Final AQL inspection and packaging verification before shipping.',
  },
];

const CERTIFICATIONS = ['EN71', 'ASTM F963', 'CPSIA', 'CE', 'CPSC', 'RoHS'];

export default function QualitySection() {
  return (
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
            Quality & Certifications
          </span>
          <h2 className="text-3xl font-bold tracking-tight text-[#071A2D] md:text-4xl lg:text-5xl">
            Quality You Can Trust
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base text-muted-foreground md:text-lg">
            Four-stage quality control process ensures every product meets
            international safety standards and your brand&apos;s expectations.
          </p>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {QC_STAGES.map((stage, i) => {
            const Icon = stage.icon;
            return (
              <motion.div
                key={stage.step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="relative overflow-hidden rounded-2xl border border-border/50 bg-white p-6"
              >
                <div className="absolute right-4 top-4 text-5xl font-black text-[#071A2D]/5">
                  {stage.step}
                </div>
                <div className="mb-4 flex size-12 items-center justify-center rounded-xl bg-[#1565FF]/10 text-[#1565FF]">
                  <Icon className="size-6" />
                </div>
                <h3 className="mb-2 text-lg font-bold text-[#071A2D]">{stage.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{stage.desc}</p>
              </motion.div>
            );
          })}
        </div>

        {/* Certifications */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="mt-12 rounded-2xl border border-border/50 bg-white p-8"
        >
          <div className="flex items-center gap-3 mb-6">
            <Award className="size-6 text-[#FF7A00]" />
            <h3 className="text-xl font-bold text-[#071A2D]">Supported Certifications</h3>
          </div>
          <div className="flex flex-wrap gap-3">
            {CERTIFICATIONS.map((cert) => (
              <div
                key={cert}
                className="flex items-center gap-2 rounded-lg border border-border/50 bg-[#F5F7FA] px-4 py-2"
              >
                <CheckCircle2 className="size-4 text-green-500" />
                <span className="text-sm font-semibold text-[#071A2D]">{cert}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
