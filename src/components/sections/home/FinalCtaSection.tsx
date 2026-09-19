'use client';

import { motion } from 'framer-motion';
import { Download, MessageCircle, Send } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { useApp } from '@/context/AppContext';
import { buildWhatsAppUrl } from '@/lib/utils';
import { trackEvent } from '@/lib/analytics';
import Ribbons from '@/components/effects/Ribbons';
import LineWaves from '@/components/effects/LineWaves';

export default function FinalCtaSection() {
  const { openRfqDialog, openCatalogDialog, config } = useApp();

  const handleQuote = () => {
    trackEvent('request_quote_click', { source: 'final_cta' });
    openRfqDialog();
  };

  const handleCatalog = () => {
    trackEvent('catalog_form_open', { source: 'final_cta' });
    openCatalogDialog('final_cta');
  };

  const handleWhatsApp = () => {
    trackEvent('whatsapp_click', { source: 'final_cta' });
    const url = buildWhatsAppUrl(
      config.whatsapp,
      "Hello! I'd like to discuss toy manufacturing for my business.",
    );
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <section className="relative w-full overflow-hidden bg-[#071A2D] py-20 md:py-28">
      {/* Background decorations */}
      <Ribbons color1="#1565FF" color2="#FF7A00" />
      <LineWaves color="#1565FF" rows={4} />
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      <div className="relative mx-auto max-w-4xl px-4 text-center md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7 }}
        >
          <span className="mb-4 inline-block rounded-full border border-[#FF7A00]/30 bg-[#FF7A00]/10 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-[#FF7A00]">
            Ready to Get Started?
          </span>
          <h2 className="mb-6 text-4xl font-black leading-tight tracking-tight text-white md:text-5xl lg:text-6xl">
            LET&apos;S BUILD THE NEXT
            <br />
            <span className="bg-gradient-to-r from-[#FF7A00] to-[#FFC400] bg-clip-text text-transparent">
              BESTSELLER.
            </span>
          </h2>
          <p className="mx-auto mb-10 max-w-xl text-base text-white/60 md:text-lg">
            Tell us what you are looking for. We will help you find suitable products and customization solutions from Chenghai&apos;s toy supply chain.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <Button
              size="lg"
              onClick={handleQuote}
              className="bg-[#FF7A00] text-white hover:bg-[#FF7A00]/90"
            >
              <Send className="mr-2 size-4" />
              Request a Quote
            </Button>
            <Button
              size="lg"
              onClick={handleCatalog}
              variant="outline"
              className="border-white/20 bg-white/5 text-white hover:bg-white/10"
            >
              <Download className="mr-2 size-4" />
              Download Catalog
            </Button>
            <Button
              size="lg"
              onClick={handleWhatsApp}
              variant="outline"
              className="border-[#25D366]/40 text-[#25D366] hover:bg-[#25D366]/10"
            >
              <MessageCircle className="mr-2 size-4" />
              Chat on WhatsApp
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
