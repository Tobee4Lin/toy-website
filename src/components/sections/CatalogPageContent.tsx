'use client';

import { motion } from 'framer-motion';
import { Check, Sparkles, Box, Award } from 'lucide-react';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const HIGHLIGHTS = [
  { icon: Box, title: '200+ Products', desc: 'Across 4 major toy categories' },
  { icon: Award, title: 'Certified Quality', desc: 'BSCI and ISO9001 audited factory' },
  { icon: Sparkles, title: 'OEM Capable', desc: 'Full customization options' },
];

export default function CatalogPageContent() {
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
            <Badge className="mb-4 bg-[#FF7A00] text-white">2026 Toy Catalog</Badge>
            <h1 className="text-4xl font-black md:text-5xl lg:text-6xl">
              Our Complete
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
                      <Badge className="mb-4 bg-[#FF7A00] text-white">2026 Edition</Badge>
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
                {HIGHLIGHTS.map((item) => {
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

            {/* Right: Contact CTA */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.6 }}
              className="lg:sticky lg:top-24"
            >
              <Card className="border-2 border-[#1565FF]/20 shadow-lg">
                <CardContent className="p-6 md:p-8">
                  <h3 className="text-xl font-bold text-[#071A2D]">
                    Request the Catalog
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Send us your product requirements and our team will share the
                    latest catalog and quotation with you.
                  </p>

                  <ul className="mt-6 space-y-3 text-sm">
                    <li className="flex items-start gap-2">
                      <Check className="mt-0.5 size-4 shrink-0 text-[#1565FF]" />
                      <span>Full product range with photos and specifications</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="mt-0.5 size-4 shrink-0 text-[#1565FF]" />
                      <span>OEM &amp; packaging customization details</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="mt-0.5 size-4 shrink-0 text-[#1565FF]" />
                      <span>Direct factory pricing and MOQ information</span>
                    </li>
                  </ul>

                  <Link href="/contact" className="mt-6 block">
                    <Button className="w-full bg-[#1565FF] hover:bg-[#0b4fd6]">
                      Contact Our Sales Team
                    </Button>
                  </Link>

                  <p className="mt-4 text-center text-xs text-muted-foreground">
                    We typically reply within 24 hours.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
