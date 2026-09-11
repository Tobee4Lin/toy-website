'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Globe, ArrowRight, Plane, Package, TrendingUp } from 'lucide-react';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { MOCK_MARKETS } from '@/data/markets';
import { trackEvent } from '@/lib/analytics';

const REGIONS = [
  { id: 'na', name: 'North America', markets: ['usa'], top: '18%', left: '12%' },
  { id: 'eu', name: 'Europe', markets: [], top: '22%', left: '46%' },
  { id: 'me', name: 'Middle East', markets: ['saudi-arabia'], top: '38%', left: '56%' },
  { id: 'sa', name: 'South America', markets: ['brazil'], top: '62%', left: '28%' },
  { id: 'ap', name: 'Asia Pacific', markets: [], top: '48%', left: '78%' },
];

// Deterministic pseudo-random for stable SSR/CSR output (no hydration mismatch)
function seededRandom(seed: number): number {
  const x = Math.sin(seed * 9999) * 10000;
  return x - Math.floor(x);
}

// Simplified world map dots pattern — deterministic, no Math.random() during render
const MAP_DOTS = Array.from({ length: 120 }, (_, i) => ({
  id: i,
  x: (i % 20) * 5 + 2 + seededRandom(i + 1) * 2,
  y: Math.floor(i / 20) * 12 + 8 + seededRandom(i + 100) * 4,
  size: seededRandom(i + 200) > 0.7 ? 3 : 2,
  opacity: 0.15 + seededRandom(i + 300) * 0.25,
}));

export default function GlobalMarketSection() {
  const [activeRegion, setActiveRegion] = useState<string>('na');
  const [hoveredMarket, setHoveredMarket] = useState<string | null>(null);

  const handleMarketClick = (slug: string) => {
    trackEvent('market_page_view', { market: slug, source: 'home_global_map' });
  };

  const activeMarkets = MOCK_MARKETS.filter((m) => {
    const region = REGIONS.find((r) => r.id === activeRegion);
    return region?.markets.includes(m.slug);
  });

  return (
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
            Global Market
          </span>
          <h2 className="text-3xl font-bold tracking-tight text-[#071A2D] md:text-4xl lg:text-5xl">
            Serving 50+ Countries
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base text-muted-foreground md:text-lg">
            From North America to Southeast Asia, we help buyers worldwide source
            quality toys with confidence.
          </p>
        </motion.div>

        <div className="grid gap-8 lg:grid-cols-3 lg:gap-12">
          {/* World map */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-2"
          >
            <div className="relative aspect-[2/1] overflow-hidden rounded-2xl border border-border/50 bg-gradient-to-br from-[#071A2D] via-[#0A2340] to-[#071A2D]">
              {/* Dot pattern world map */}
              <div className="absolute inset-0">
                {MAP_DOTS.map((dot) => (
                  <div
                    key={dot.id}
                    className="absolute rounded-full bg-[#1565FF]"
                    style={{
                      left: `${dot.x}%`,
                      top: `${dot.y}%`,
                      width: `${dot.size}px`,
                      height: `${dot.size}px`,
                      opacity: dot.opacity,
                    }}
                  />
                ))}
              </div>

              {/* Central globe with rotation */}
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
                  className="relative"
                >
                  <Globe className="size-48 text-[#1565FF]/15" strokeWidth={1} />
                </motion.div>
                <div className="absolute size-32 rounded-full bg-[#1565FF]/5 blur-2xl" />
              </div>

              {/* Connection lines from center to regions */}
              <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 50" preserveAspectRatio="none">
                {REGIONS.map((region) => {
                  const x = parseFloat(region.left.replace('%', '')) / 100 * 100;
                  const y = parseFloat(region.top.replace('%', '')) / 100 * 50;
                  return (
                    <line
                      key={region.id}
                      x1="50"
                      y1="25"
                      x2={x}
                      y2={y}
                      stroke="#1565FF"
                      strokeWidth="0.15"
                      strokeDasharray="1 1"
                      opacity={activeRegion === region.id ? 0.6 : 0.2}
                    />
                  );
                })}
              </svg>

              {/* Floating decorative icons */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute left-[8%] top-[15%] text-[#FF7A00]/40"
              >
                <Plane className="size-5" />
              </motion.div>
              <motion.div
                animate={{ y: [0, 6, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                className="absolute right-[10%] top-[20%] text-[#FFC400]/40"
              >
                <Package className="size-5" />
              </motion.div>
              <motion.div
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
                className="absolute bottom-[18%] right-[15%] text-[#10B981]/40"
              >
                <TrendingUp className="size-5" />
              </motion.div>

              {/* Region buttons */}
              <div className="absolute inset-0">
                {REGIONS.map((region) => (
                  <button
                    key={region.id}
                    onClick={() => setActiveRegion(region.id)}
                    className={`absolute flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition-all duration-300 ${
                      activeRegion === region.id
                        ? 'bg-[#1565FF] text-white shadow-lg shadow-[#1565FF]/30 scale-105'
                        : 'bg-white/90 text-[#071A2D] hover:bg-white hover:scale-105 backdrop-blur-sm'
                    }`}
                    style={{
                      top: region.top,
                      left: region.left,
                      transform: 'translate(-50%, -50%)',
                    }}
                  >
                    <span className={`relative flex size-2 ${activeRegion === region.id ? '' : ''}`}>
                      {activeRegion === region.id && (
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-75" />
                      )}
                      <span className={`relative inline-flex size-2 rounded-full ${activeRegion === region.id ? 'bg-white' : 'bg-[#1565FF]'}`} />
                    </span>
                    {region.name}
                  </button>
                ))}
              </div>

              {/* Stats overlay at bottom */}
              <div className="absolute bottom-0 left-0 right-0 flex items-center justify-around border-t border-white/10 bg-black/20 px-6 py-3 backdrop-blur-sm">
                <div className="text-center">
                  <div className="text-lg font-bold text-white">50+</div>
                  <div className="text-[10px] text-white/50">Countries</div>
                </div>
                <div className="h-8 w-px bg-white/10" />
                <div className="text-center">
                  <div className="text-lg font-bold text-white">5</div>
                  <div className="text-[10px] text-white/50">Regions</div>
                </div>
                <div className="h-8 w-px bg-white/10" />
                <div className="text-center">
                  <div className="text-lg font-bold text-white">10M+</div>
                  <div className="text-[10px] text-white/50">Units/Year</div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Region info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7 }}
          >
            <h3 className="mb-4 text-xl font-bold text-[#071A2D]">
              {REGIONS.find((r) => r.id === activeRegion)?.name}
            </h3>
            <p className="mb-6 text-sm text-muted-foreground">
              Select a region to explore key markets and sourcing opportunities.
            </p>
            {activeMarkets.length > 0 ? (
              <div className="space-y-3">
                {activeMarkets.map((market) => (
                  <Link
                    key={market.slug}
                    href={`/markets/${market.slug}`}
                    onClick={() => handleMarketClick(market.slug)}
                    className="flex items-center justify-between rounded-xl border border-border/50 bg-white p-4 transition-colors hover:border-[#1565FF]/30 hover:bg-[#1565FF]/5"
                  >
                    <div>
                      <div className="font-semibold text-[#071A2D]">{market.country}</div>
                      <div className="text-xs text-muted-foreground">{market.overview.substring(0, 80)}...</div>
                    </div>
                    <ArrowRight className="size-4 text-[#1565FF]" />
                  </Link>
                ))}
              </div>
            ) : (
              <div className="rounded-xl border border-dashed border-border/50 p-6 text-center text-sm text-muted-foreground">
                More markets coming soon. Contact us for details.
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
