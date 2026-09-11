'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

import { Image } from '@/components/ui/image';
import type { ICategory } from '@/data/categories';
import type { IProduct } from '@/data/products';

interface ProductUniverseSectionProps {
  categories: ICategory[];
  products: IProduct[];
}

export default function ProductUniverseSection({ categories, products }: ProductUniverseSectionProps) {
  // Count real products per category
  const getProductCount = (slug: string) => {
    return products.filter((p) => p.category === slug).length;
  };

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
            Product Universe
          </span>
          <h2 className="text-3xl font-bold tracking-tight text-[#071A2D] md:text-4xl lg:text-5xl">
            Four Core Categories
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base text-muted-foreground md:text-lg">
            From beach fun to creative building, explore our curated product lines —
            each backed by reliable Chenghai manufacturing.
          </p>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-2">
          {categories.map((cat, i) => {
            const count = getProductCount(cat.slug);
            return (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
            >
              <Link
                href={`/products/${cat.slug}`}
                className="group relative block aspect-[4/3] overflow-hidden rounded-2xl bg-[#071A2D] md:aspect-[16/10]"
              >
                <Image
                  src={cat.cardImageUrl}
                  alt={cat.name}
                  className="absolute inset-0 h-full w-full object-cover opacity-50 transition-transform duration-700 group-hover:scale-105 group-hover:opacity-40"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#071A2D] via-[#071A2D]/60 to-transparent" />

                <div className="absolute inset-0 flex flex-col justify-end p-8">
                  <div
                    className="mb-3 inline-block w-fit rounded-full px-3 py-1 text-xs font-semibold text-white"
                    style={{ backgroundColor: cat.accentColor }}
                  >
                    {count > 10 ? `${count}+ Products` : `${count} Products`}
                  </div>
                  <h3 className="mb-2 text-2xl font-bold text-white md:text-3xl">
                    {cat.name}
                  </h3>
                  <p className="mb-4 max-w-md text-sm text-white/70 md:text-base">
                    {cat.description}
                  </p>
                  <div className="flex items-center text-sm font-medium text-white">
                    Explore Collection
                    <ArrowRight className="ml-2 size-4 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </Link>
            </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
