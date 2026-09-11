'use client';

import { motion } from 'framer-motion';
import {
  ShieldCheck,
  Package as PackageIcon,
  Eye,
  Truck,
  Award,
  FlaskConical,
  Check,
  Send,
  FileCheck,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useApp } from '@/context/AppContext';
import { trackEvent } from '@/lib/analytics';

const QC_STAGES = [
  {
    icon: PackageIcon,
    step: 'IQC',
    title: 'Incoming Material',
    desc: 'Raw material inspection upon arrival. Verification of plastic resin, electronic components, paint, and packaging materials against specifications.',
    items: ['Material certification review', 'Color and dimension check', 'Supplier quality grading', 'Non-conforming material handling'],
  },
  {
    icon: Eye,
    step: 'IPQC',
    title: 'In-Process QC',
    desc: 'Continuous monitoring during production. First-piece inspection, in-line checks, and process parameter verification at each production stage.',
    items: ['First article inspection', 'In-line sampling', 'Dimension verification', 'Process audit & SOP adherence'],
  },
  {
    icon: ShieldCheck,
    step: 'FQC',
    title: 'Finished Product',
    desc: 'Complete inspection after production. AQL-based sampling for appearance, function, safety, and packaging verification.',
    items: ['AQL 2.5 / 4.0 sampling', 'Functional testing', 'Appearance inspection', 'Packaging & labeling check'],
  },
  {
    icon: Truck,
    step: 'Pre-Shipment',
    title: 'Pre-Shipment Inspection',
    desc: 'Final inspection before loading. Random sampling from finished cartons to verify everything meets your requirements before dispatch.',
    items: ['Container loading supervision', 'Carton drop test', 'Quantity verification', 'Shipping mark confirmation'],
  },
];

const CERTIFICATIONS = [
  { name: 'EN71', region: 'EU', desc: 'European toy safety standard — Parts 1, 2, 3' },
  { name: 'ASTM F963', region: 'USA', desc: 'American toy safety standard' },
  { name: 'CPSIA', region: 'USA', desc: 'Consumer Product Safety Improvement Act' },
  { name: 'CE', region: 'EU', desc: 'CE marking for European market access' },
  { name: 'ISO 9001', region: 'Global', desc: 'Quality management system standard' },
  { name: 'ICTI', region: 'Global', desc: 'International Council of Toy Industries' },
];

const STANDARDS = [
  'Mechanical & physical properties testing',
  'Flammability testing',
  'Heavy metals analysis (lead, cadmium, etc.)',
  'Phthalates testing (DEHP, DBP, BBP, etc.)',
  'BPA and migration testing',
  'Small parts choking hazard assessment',
  'Sharp point / edge testing',
  'Age grading and labeling verification',
];

export default function QualityPageContent() {
  const { openRfqDialog } = useApp();

  const handleQuote = () => {
    trackEvent('request_quote_click', { source: 'quality_page' });
    openRfqDialog();
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="relative w-full overflow-hidden bg-[#071A2D] text-white">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(21_101_255_0.3),transparent_60%)]" />
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
            <Badge className="mb-4 bg-[#1565FF] text-white">Quality Assurance</Badge>
            <h1 className="text-4xl font-black leading-tight md:text-5xl lg:text-6xl">
              Quality That You Can
              <br />
              <span className="bg-gradient-to-r from-[#1565FF] to-[#FFC400] bg-clip-text text-transparent">
                Trust.
              </span>
            </h1>
            <p className="mt-6 max-w-2xl text-lg text-white/70">
              Every product we ship passes through a rigorous multi-stage quality
              control process. Because your reputation depends on every single unit
              that reaches your customer.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button
                size="lg"
                onClick={handleQuote}
                className="bg-[#FF7A00] text-white hover:bg-[#FF7A00]/90"
              >
                <Send className="mr-2 size-4" />
                Request Quality Report
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 4 QC Stages */}
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
              Quality Control Process
            </span>
            <h2 className="text-3xl font-bold tracking-tight text-[#071A2D] md:text-4xl">
              4-Stage Quality Assurance
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
              Systematic quality control at every stage of the production process,
              from raw material to final shipment.
            </p>
          </motion.div>

          <div className="grid gap-6 lg:grid-cols-2">
            {QC_STAGES.map((stage, i) => {
              const Icon = stage.icon;
              return (
                <motion.div
                  key={stage.step}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                >
                  <Card className="h-full overflow-hidden transition-all hover:-translate-y-1 hover:shadow-lg">
                    <CardContent className="p-6">
                      <div className="mb-4 flex items-center gap-4">
                        <div className="flex size-14 items-center justify-center rounded-xl bg-[#1565FF]/10 text-[#1565FF]">
                          <Icon className="size-7" />
                        </div>
                        <div>
                          <div className="text-xs font-bold uppercase tracking-wider text-[#FF7A00]">
                            {stage.step}
                          </div>
                          <h3 className="text-xl font-bold text-[#071A2D]">
                            {stage.title}
                          </h3>
                        </div>
                      </div>
                      <p className="mb-4 text-sm text-muted-foreground">{stage.desc}</p>
                      <ul className="space-y-1.5">
                        {stage.items.map((item) => (
                          <li key={item} className="flex items-center gap-2 text-sm">
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

      {/* Testing Standards */}
      <section className="w-full bg-white py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.6 }}
            >
              <span className="mb-3 block text-xs font-semibold uppercase tracking-widest text-[#FF7A00]">
                Testing Capabilities
              </span>
              <h2 className="text-3xl font-bold tracking-tight text-[#071A2D] md:text-4xl">
                Comprehensive Testing Standards
              </h2>
              <p className="mt-4 text-muted-foreground">
                We coordinate with accredited third-party testing laboratories to
                ensure products meet all applicable safety standards for your
                target market.
              </p>

              <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                {STANDARDS.map((s, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <FlaskConical className="mt-0.5 size-4 shrink-0 text-[#1565FF]" />
                    <span className="text-sm">{s}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.6 }}
              className="grid gap-4 sm:grid-cols-2"
            >
              {CERTIFICATIONS.map((cert, i) => (
                <Card
                  key={cert.name}
                  className="transition-all hover:-translate-y-0.5 hover:border-[#1565FF]/30 hover:shadow-md"
                >
                  <CardContent className="p-5">
                    <div className="mb-2 flex items-center justify-between">
                      <Award className="size-5 text-[#FF7A00]" />
                      <Badge variant="outline" className="text-xs">
                        {cert.region}
                      </Badge>
                    </div>
                    <div className="text-lg font-bold text-[#071A2D]">
                      {cert.name}
                    </div>
                    <div className="mt-1 text-xs text-muted-foreground">
                      {cert.desc}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="w-full bg-[#071A2D] py-16">
        <div className="mx-auto max-w-4xl px-4 text-center md:px-6">
          <FileCheck className="mx-auto mb-4 size-10 text-[#FFC400]" />
          <h2 className="text-3xl font-bold text-white md:text-4xl">
            Need Certification Support?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-white/60">
            We can coordinate all required testing and certification for your
            target markets. Let us handle compliance while you focus on sales.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Button
              size="lg"
              onClick={handleQuote}
              className="bg-[#FF7A00] text-white hover:bg-[#FF7A00]/90"
            >
              <Send className="mr-2 size-4" />
              Talk to Our QC Team
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
