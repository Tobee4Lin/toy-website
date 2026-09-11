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
    desc: 'We don\'t just take orders — we solve problems. Our team proactively finds better ways to make your products.',
  },
  {
    icon: Heart,
    title: 'Long-Term Partnerships',
    desc: 'We grow with our clients. Many of our customers have been with us for years, not just one order.',
  },
];

const TEAM = [
  { name: 'Michael Chen', role: 'Founder & CEO', avatar: 'MC' },
  { name: 'Sarah Zhang', role: 'Head of Sourcing', avatar: 'SZ' },
  { name: 'David Wang', role: 'Engineering Manager', avatar: 'DW' },
  { name: 'Emily Liu', role: 'Quality Director', avatar: 'EL' },
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
            <Badge className="mb-4 bg-[#FF7A00] text-white">About Us</Badge>
            <h1 className="text-4xl font-black leading-tight md:text-5xl lg:text-6xl">
              Your Toy Sourcing Partner
              <br />
              <span className="bg-gradient-to-r from-[#FF7A00] to-[#FFC400] bg-clip-text text-transparent">
                in Chenghai, China.
              </span>
            </h1>
            <p className="mt-6 max-w-2xl text-lg text-white/70">
              We help toy brands, importers, and wholesalers worldwide source
              quality toys from China&apos;s toy capital. With deep industry
              knowledge, a vetted factory network, and a commitment to quality,
              we make international toy sourcing simple and reliable.
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
                China&quot; — we grew up surrounded by toy factories, plastic
                molding machines, and creative product developers. This unique
                vantage point gives us an insider&apos;s perspective on the toy
                industry that you simply can&apos;t get from an office halfway around
                the world.
              </p>
              <p>
                We started with a simple belief: that toy sourcing should be
                transparent, reliable, and actually enjoyable. Too many buyers
                have been burned by quality issues, communication problems, and
                broken promises. We set out to do it differently.
              </p>
              <p>
                Today, we work with partners across North America, Europe, the
                Middle East, and beyond. We don&apos;t just sell products — we
                coordinate the entire process, from product selection and
                customization to production monitoring, quality control, and
                shipping. We&apos;re your eyes, ears, and hands on the ground in
                China.
              </p>
              <p className="font-medium text-[#071A2D]">
                Our mission is simple: help great toy companies build great
                products, at scale, with zero surprises.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Values */}
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
                title: 'Product Sourcing',
                desc: 'Find the right products from the right factories. We leverage our deep Chenghai network to source efficiently.',
                items: [
                  'Product search & factory matching',
                  'Sample procurement',
                  'Price negotiation',
                  'Factory vetting & audits',
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

      {/* Team */}
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
              Meet the Team
            </span>
            <h2 className="text-3xl font-bold tracking-tight text-[#071A2D] md:text-4xl">
              People Behind the Products
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
              An experienced team of toy industry professionals, ready to help
              your business succeed.
            </p>
          </motion.div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {TEAM.map((member, i) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <Card className="text-center transition-all hover:-translate-y-1 hover:shadow-lg">
                  <CardContent className="p-6">
                    <div className="mx-auto mb-4 flex size-20 items-center justify-center rounded-full bg-gradient-to-br from-[#1565FF] to-[#0d47a1] text-2xl font-bold text-white">
                      {member.avatar}
                    </div>
                    <h3 className="font-bold text-[#071A2D]">{member.name}</h3>
                    <p className="text-sm text-muted-foreground">{member.role}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="w-full bg-[#071A2D] py-16">
        <div className="mx-auto max-w-4xl px-4 text-center md:px-6">
          <h2 className="text-3xl font-bold text-white md:text-4xl">
            Ready to Work With a Sourcing Partner You Can Trust?
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
