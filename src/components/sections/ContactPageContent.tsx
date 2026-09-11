'use client';

import { motion } from 'framer-motion';
import {
  Mail,
  Phone,
  MapPin,
  MessageCircle,
  Clock,
} from 'lucide-react';

import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useApp } from '@/context/AppContext';
import { buildWhatsAppUrl } from '@/lib/utils';
import { trackEvent } from '@/lib/analytics';
import ContactForm from '@/components/forms/ContactForm';

const CONTACT_INFO = [
  {
    icon: Mail,
    title: 'Email',
    value: 'sales@yourbrand.com',
    desc: 'Response within 24 hours',
    href: 'mailto:sales@yourbrand.com',
  },
  {
    icon: MessageCircle,
    title: 'WhatsApp',
    value: '+86 138 0000 0000',
    desc: 'Quick chat with our team',
    href: 'https://wa.me/8613538618656',
  },
  {
    icon: Phone,
    title: 'Phone',
    value: '+86 754 0000 0000',
    desc: 'Mon - Sat, 9:00 - 18:00 CST',
    href: 'tel:+867540000000',
  },
  {
    icon: MapPin,
    title: 'Office',
    value: 'Chenghai, Shantou, Guangdong, China',
    desc: 'In the heart of China\'s toy industry',
    href: '#',
  },
];

export default function ContactPageContent() {
  const { config } = useApp();

  const handleWhatsApp = () => {
    trackEvent('whatsapp_click', { source: 'contact_page' });
    window.open(
      buildWhatsAppUrl(config.whatsapp, 'Hello! I would like to discuss toy sourcing opportunities.'),
      '_blank',
      'noopener,noreferrer',
    );
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="relative w-full overflow-hidden bg-[#071A2D] text-white">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(21_101_255_0.3),transparent_50%)]" />
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
            <Badge className="mb-4 bg-[#FF7A00] text-white">Contact Us</Badge>
            <h1 className="text-4xl font-black md:text-5xl lg:text-6xl">
              Let&apos;s Build Something Great
              <br />
              <span className="bg-gradient-to-r from-[#1565FF] to-[#FFC400] bg-clip-text text-transparent">
                Together.
              </span>
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-white/70">
              Have a question, a project idea, or want to discuss sourcing
              options? Our team is here to help.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact info cards */}
      <section className="w-full bg-[#F5F7FA] py-12 -mt-px">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {CONTACT_INFO.map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                >
                  <a
                    href={item.href}
                    className="block h-full rounded-xl border border-border/50 bg-white p-5 transition-all hover:-translate-y-0.5 hover:border-[#1565FF]/30 hover:shadow-md"
                  >
                    <div className="mb-3 flex size-10 items-center justify-center rounded-lg bg-[#1565FF]/10 text-[#1565FF]">
                      <Icon className="size-5" />
                    </div>
                    <div className="text-sm font-semibold text-[#071A2D]">
                      {item.title}
                    </div>
                    <div className="mt-0.5 text-sm font-medium text-[#1565FF]">
                      {item.value}
                    </div>
                    <div className="mt-1 text-xs text-muted-foreground">
                      {item.desc}
                    </div>
                  </a>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Form */}
      <section className="w-full py-16 md:py-20">
        <div className="mx-auto max-w-4xl px-4 md:px-6">
          <ContactForm />
          <div className="mt-6 flex items-center justify-center gap-2 border-t border-border pt-6">
            <Clock className="size-4 text-muted-foreground" />
            <span className="text-xs text-muted-foreground">
              Average response time: within 24 hours
            </span>
          </div>
        </div>
      </section>

      {/* Quick WhatsApp */}
      <section className="w-full bg-[#F5F7FA] py-12">
        <div className="mx-auto max-w-4xl px-4 text-center md:px-6">
          <h3 className="mb-2 text-xl font-bold text-[#071A2D]">
            Prefer a quick chat?
          </h3>
          <p className="mb-6 text-sm text-muted-foreground">
            Reach us directly on WhatsApp for instant responses.
          </p>
          <Button
            onClick={handleWhatsApp}
            className="bg-[#25D366] text-white hover:bg-[#25D366]/90"
          >
            <MessageCircle className="mr-2 size-4" />
            Chat on WhatsApp
          </Button>
        </div>
      </section>
    </div>
  );
}
