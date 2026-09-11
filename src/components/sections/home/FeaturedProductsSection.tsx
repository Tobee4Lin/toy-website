'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

import ProductCard from '@/components/products/ProductCard';
import { Button } from '@/components/ui/button';
import type { IProduct } from '@/data/products';

interface FeaturedProductsSectionProps {
  products: IProduct[];
}

export default function FeaturedProductsSection({ products }: FeaturedProductsSectionProps) {
  const featured = products.filter((p) => p.isFeatured).slice(0, 8);

  return (
    <section className="w-full bg-white py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="mb-12 flex items-end justify-between md:mb-16"
        >
          <div>
            <span className="mb-3 block text-xs font-semibold uppercase tracking-widest text-[#1565FF]">
              Featured Products
            </span>
            <h2 className="text-3xl font-bold tracking-tight text-[#071A2D] md:text-4xl lg:text-5xl">
              Our Bestsellers
            </h2>
            <p className="mt-3 max-w-xl text-muted-foreground">
              Hand-picked products proven in global markets. High quality, competitive
              pricing, and fast sample turnaround.
            </p>
          </div>
          <Button asChild variant="outline" className="hidden md:inline-flex">
            <Link href="/products">
              View All Products
              <ArrowRight className="ml-2 size-4" />
            </Link>
          </Button>
        </motion.div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((product, i) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
