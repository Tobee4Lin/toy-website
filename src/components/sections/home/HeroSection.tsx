'use client';

import { useRouter } from 'next/navigation';
import { ArrowRight, ChevronDown, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

import { Button } from '@/components/ui/button';
import { useApp } from '@/context/AppContext';
import { Image } from '@/components/ui/image';
import { trackEvent } from '@/lib/analytics';
import Aurora from '@/components/effects/Aurora';
import BlurText from '@/components/effects/BlurText';
import ShinyText from '@/components/effects/ShinyText';

const HERO_IMAGE = '/images/hero-bg.jpg';

// Floating decorative shapes (pure CSS, no WebGL)
function FloatingShapes() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* Large central glow orb (moved right to avoid left edge boundary) */}
      <div className="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,_rgba(21_101_255_0.25),_rgba(255_122_0_0.1)_50%,_transparent_70%)] blur-2xl" />

      {/* Large gradient orbs */}
      <div className="absolute -right-10 top-5 h-80 w-80 rounded-full bg-[#1565FF]/25 blur-3xl animate-float-slow" />
      <div className="absolute right-32 bottom-10 h-72 w-72 rounded-full bg-[#FF7A00]/20 blur-3xl animate-float-medium" />
      <div className="absolute left-30 top-1/3 h-56 w-56 rounded-full bg-[#FFC400]/15 blur-3xl animate-float-fast" />

      {/* Big building block (top right) */}
      <div className="absolute right-16 top-12 animate-float-medium">
        <div className="relative h-28 w-28 rounded-xl bg-gradient-to-br from-[#FF7A00] to-[#FF5500] shadow-2xl shadow-[#FF7A00]/40">
          <div className="absolute -top-3 left-1/2 h-6 w-6 -translate-x-1/2 rounded-full bg-[#FF7A00] shadow-md" />
          <div className="absolute -top-3 left-5 h-6 w-6 rounded-full bg-[#FF7A00] shadow-md" />
          <div className="absolute -top-3 right-5 h-6 w-6 rounded-full bg-[#FF7A00] shadow-md" />
          <div className="absolute inset-2 rounded-lg bg-gradient-to-br from-white/20 to-transparent" />
        </div>
      </div>

      {/* Big bubble cluster (middle left) */}
      <div className="absolute left-8 top-1/4 animate-float-fast">
        <div className="relative h-40 w-40">
          <div className="absolute left-0 top-4 h-20 w-20 rounded-full border-2 border-white/25 bg-white/5 backdrop-blur-sm" />
          <div className="absolute right-0 top-0 h-16 w-16 rounded-full border-2 border-[#00D4FF]/40 bg-[#00D4FF]/10" />
          <div className="absolute bottom-0 left-8 h-14 w-14 rounded-full border-2 border-white/20 bg-white/5" />
          <div className="absolute right-4 bottom-2 h-10 w-10 rounded-full border border-[#FFC400]/40 bg-[#FFC400]/10" />
          <div className="absolute left-12 top-10 h-8 w-8 rounded-full border border-[#FF7A00]/30 bg-[#FF7A00]/10" />
        </div>
      </div>

      {/* Big bubble cluster 2 (middle left) */}
      <div className="absolute left-1/3 top-1/3 animate-float-fast">
        <div className="relative h-40 w-40">
          <div className="absolute left-10 top-14 h-20 w-20 rounded-full border-2 border-white/25 bg-white/5 backdrop-blur-sm" />
          <div className="absolute right-10 top-0 h-16 w-16 rounded-full border-2 border-[#00D4FF]/40 bg-[#00D4FF]/10" />
          <div className="absolute bottom-0 left-8 h-14 w-14 rounded-full border-2 border-white/20 bg-white/5" />
          <div className="absolute right-0 bottom-2 h-10 w-10 rounded-full border border-[#FFC400]/40 bg-[#FFC400]/10" />
          <div className="absolute left-12 top-10 h-8 w-8 rounded-full border border-[#FF7A00]/30 bg-[#FF7A00]/10" />
        </div>
      </div>

      {/* Big RC car (center right) */}
      <div className="absolute right-8 top-1/2 -translate-y-1/2 animate-float-slow">
        <svg width="280" height="140" viewBox="0 0 280 140" fill="none" className="drop-shadow-2xl">
          <rect x="20" y="55" width="240" height="48" rx="8" fill="url(#carGrad)" />
          <path d="M55 55 L75 20 L205 20 L225 55 Z" fill="url(#carGrad2)" />
          <rect x="82" y="26" width="48" height="24" rx="4" fill="#0A4FD0" opacity="0.8" />
          <rect x="150" y="26" width="48" height="24" rx="4" fill="#0A4FD0" opacity="0.8" />
          <circle cx="65" cy="108" r="22" fill="#071A2D" stroke="#444" strokeWidth="5" />
          <circle cx="65" cy="108" r="9" fill="#666" />
          <circle cx="215" cy="108" r="22" fill="#071A2D" stroke="#444" strokeWidth="5" />
          <circle cx="215" cy="108" r="9" fill="#666" />
          <rect x="225" y="62" width="18" height="10" rx="2" fill="#FFC400" />
          <rect x="22" y="62" width="12" height="10" rx="2" fill="#FF3D3D" />
          <defs>
            <linearGradient id="carGrad" x1="20" y1="55" x2="260" y2="103" gradientUnits="userSpaceOnUse">
              <stop stopColor="#1565FF" />
              <stop offset="1" stopColor="#0A4FD0" />
            </linearGradient>
            <linearGradient id="carGrad2" x1="55" y1="20" x2="225" y2="55" gradientUnits="userSpaceOnUse">
              <stop stopColor="#1A73FF" />
              <stop offset="1" stopColor="#0D55E0" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Big beach bucket + shovel (bottom left) */}
      <div className="absolute bottom-16 left-20 animate-float-medium">
        <div className="relative">
          <svg width="110" height="120" viewBox="0 0 110 120" fill="none">
            <path d="M20 20 L90 20 L82 110 L28 110 Z" fill="url(#bucketGrad)" />
            <ellipse cx="55" cy="20" rx="35" ry="7" fill="#FF9933" />
            <path d="M20 20 Q55 -5 90 20" stroke="#FFC400" strokeWidth="5" fill="none" strokeLinecap="round" />
            <ellipse cx="55" cy="20" rx="30" ry="5" fill="#FFB366" opacity="0.5" />
            <defs>
              <linearGradient id="bucketGrad" x1="20" y1="20" x2="90" y2="110" gradientUnits="userSpaceOnUse">
                <stop stopColor="#FF7A00" />
                <stop offset="1" stopColor="#E65C00" />
              </linearGradient>
            </defs>
          </svg>
          {/* Shovel */}
          <svg width="40" height="90" viewBox="0 0 40 90" fill="none" className="absolute -right-6 top-2 -rotate-12">
            <rect x="16" y="0" width="8" height="55" rx="2" fill="#8B4513" />
            <ellipse cx="20" cy="72" rx="16" ry="14" fill="#1565FF" />
            <ellipse cx="20" cy="70" rx="12" ry="10" fill="#1A73FF" />
          </svg>
        </div>
      </div>

      {/* Big toy ball (bottom right) */}
      <div className="absolute bottom-20 right-40 animate-float-fast">
        <div className="relative h-20 w-20 rounded-full bg-gradient-to-br from-[#FF3D8A] to-[#C41E6A] shadow-2xl shadow-[#FF3D8A]/40">
          <div className="absolute inset-0 rounded-full border-4 border-white/30" />
          <div className="absolute left-1/2 top-0 h-full w-1 -translate-x-1/2 bg-white/40" />
          <div className="absolute left-0 top-1/2 h-1 w-full -translate-y-1/2 bg-white/40" />
          <div className="absolute left-3 top-3 h-4 w-4 rounded-full bg-white/50" />
        </div>
      </div>

      {/* Large floating cubes scattered */}
      <div className="absolute left-1/4 top-10 h-14 w-14 rotate-12 rounded-xl bg-gradient-to-br from-[#FFC400] to-[#E6A800] shadow-xl animate-float-fast" />
      <div className="absolute right-1/3 top-1/4 h-12 w-12 -rotate-12 rounded-xl bg-gradient-to-br from-[#00D4FF] to-[#00A8CC] shadow-xl animate-float-medium" />
      <div className="absolute left-1/3 bottom-1/4 h-10 w-10 rotate-45 rounded-lg bg-gradient-to-br from-[#4ADE80] to-[#22C55E] shadow-lg animate-float-slow" />
      <div className="absolute right-1/4 bottom-8 h-11 w-11 -rotate-6 rounded-xl bg-gradient-to-br from-[#A855F7] to-[#7C3AED] shadow-xl animate-float-fast" />
      <div className="absolute left-16 top-1/2 h-9 w-9 rotate-6 rounded-lg bg-gradient-to-br from-[#FF7A00] to-[#E65C00] shadow-lg animate-float-medium" />

      {/* Star sparkles */}
      <div className="absolute right-1/3 top-16 animate-pulse">
        <svg width="28" height="28" viewBox="0 0 16 16" fill="#FFC400">
          <path d="M8 0 L9.5 6.5 L16 8 L9.5 9.5 L8 16 L6.5 9.5 L0 8 L6.5 6.5 Z" />
        </svg>
      </div>
      <div className="absolute left-1/4 top-1/3 animate-pulse" style={{ animationDelay: '0.7s' }}>
        <svg width="20" height="20" viewBox="0 0 16 16" fill="#00D4FF">
          <path d="M8 0 L9.5 6.5 L16 8 L9.5 9.5 L8 16 L6.5 9.5 L0 8 L6.5 6.5 Z" />
        </svg>
      </div>
      <div className="absolute right-20 bottom-1/3 animate-pulse" style={{ animationDelay: '1.2s' }}>
        <svg width="24" height="24" viewBox="0 0 16 16" fill="#FF3D8A">
          <path d="M8 0 L9.5 6.5 L16 8 L9.5 9.5 L8 16 L6.5 9.5 L0 8 L6.5 6.5 Z" />
        </svg>
      </div>

      {/* Small dots filling gaps */}
      {[
        { top: '15%', left: '40%', color: '#FFC400', size: 'h-3 w-3' },
        { top: '60%', left: '55%', color: '#00D4FF', size: 'h-2 w-2' },
        { top: '30%', left: '70%', color: '#FF7A00', size: 'h-4 w-4' },
        { top: '75%', left: '35%', color: '#1565FF', size: 'h-2 w-2' },
        { top: '45%', left: '25%', color: '#FF3D8A', size: 'h-3 w-3' },
        { top: '85%', left: '60%', color: '#4ADE80', size: 'h-2 w-2' },
      ].map((dot, i) => (
        <div
          key={i}
          className={`absolute rounded-full ${dot.size} animate-pulse`}
          style={{ top: dot.top, left: dot.left, backgroundColor: dot.color, animationDelay: `${i * 0.3}s` }}
        />
      ))}

      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
          backgroundSize: '50px 50px',
        }}
      />
    </div>
  );
}

export default function HeroSection() {
  const router = useRouter();
  const { config, openRfqDialog } = useApp();

  const handleExplore = () => {
    trackEvent('request_quote_click', { source: 'hero_explore' });
    router.push('/products');
  };

  const handleQuote = () => {
    trackEvent('request_quote_click', { source: 'hero_cta' });
    openRfqDialog();
  };

  return (
    <section className="relative w-full overflow-hidden bg-[#071A2D] text-white">
      {/* Background gradient + image + Aurora */}
      <div className="absolute inset-0">
        <Image
          src={HERO_IMAGE}
          alt="Toy manufacturing hero"
          className="h-full w-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-[#071A2D] via-[#071A2D]/90 to-[#071A2D]" />
        <Aurora colorStops={['#071A2D', '#1565FF', '#FF7A00']} speed={0.4} />
      </div>

      {/* Floating decorative shapes (right side) */}
      <div className="pointer-events-none absolute right-0 top-0 hidden h-full w-1/2 lg:block">
        <FloatingShapes />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 py-24 md:px-6 md:py-32 lg:py-40">
        <div className="max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-medium text-white/80 backdrop-blur-sm">
              <Sparkles className="size-3.5 text-[#FFC400]" />
              <ShinyText text="Your Levich Toys in Chenghai, China" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7 }}
            className="mb-6 text-4xl font-black leading-[1.05] tracking-tight md:text-6xl lg:text-7xl"
          >
            <BlurText text="PLAY BEYOND" />
            <br />
            <motion.span
              initial={{ opacity: 0, filter: 'blur(12px)' }}
              animate={{ opacity: 1, filter: 'blur(0px)' }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="bg-gradient-to-r from-[#1565FF] via-[#FF7A00] to-[#FFC400] bg-clip-text text-transparent"
            >
              LIMITS.
            </motion.span>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="mb-8 max-w-xl text-base leading-relaxed text-white/70 md:text-lg"
          >
            <span className="font-semibold text-white">Innovative Toys.</span>{' '}
            <span className="font-semibold text-white">Reliable Manufacturing.</span>{' '}
            <span className="font-semibold text-white">Global Supply.</span>
            <br className="hidden md:block" />
            We connect international buyers with the best Chenghai toy factories —
            delivering quality products, OEM flexibility, and dependable logistics.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-wrap gap-3"
          >
            <Button
              size="lg"
              onClick={handleExplore}
              className="bg-white text-[#071A2D] hover:bg-white/90"
            >
              Explore Products
              <ArrowRight className="ml-2 size-4" />
            </Button>
            <Button
              size="lg"
              onClick={handleQuote}
              className="bg-[#FF7A00] text-white hover:bg-[#FF7A00]/90"
            >
              Request a Quote
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.55 }}
            className="mt-12 grid max-w-md grid-cols-3 gap-6 text-center"
          >
            {[
              { value: '2015', label: 'Founded' },
              { value: '10+', label: 'Years Experience' },
              { value: '20,000㎡', label: 'Factory Area' },
            ].map((stat) => (
              <div key={stat.label} className="border-l border-white/10 first:border-l-0">
                <div className="text-2xl font-bold text-white md:text-3xl">
                  {stat.value}
                </div>
                <div className="mt-1 text-xs text-white/50">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.8 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2"
      >
        <div className="flex flex-col items-center text-white/40">
          <span className="mb-2 text-[10px] uppercase tracking-widest">Scroll</span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          >
            <ChevronDown className="size-5" />
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
