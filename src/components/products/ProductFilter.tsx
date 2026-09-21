'use client';

import { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { Search, Filter } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import ProductCard from '@/components/products/ProductCard';
import type { IProduct } from '@/data/products';
import type { ICategory } from '@/data/categories';

const AGE_GROUPS = ['0-3 years', '3+ years', '6+ years', '8+ years', '12+ years'];

interface ProductFilterProps {
  products: IProduct[];
  categories: ICategory[];
  activeCategory: string;
}

export default function ProductFilter({ products, categories, activeCategory }: ProductFilterProps) {
  const router = useRouter();

  const [keyword, setKeyword] = useState('');
  const [sortBy, setSortBy] = useState('default');

  const filtered = useMemo(() => {
    let items: IProduct[] = [...products];

    if (activeCategory !== 'all') {
      items = items.filter((p) => p.category === activeCategory);
    }

    if (keyword.trim()) {
      const kw = keyword.toLowerCase();
      items = items.filter(
        (p) =>
          p.name.toLowerCase().includes(kw) ||
          p.itemNumber.toLowerCase().includes(kw) ||
          p.description.toLowerCase().includes(kw),
      );
    }

    switch (sortBy) {
      case 'moq-asc':
        items.sort((a, b) => a.moq - b.moq);
        break;
      case 'moq-desc':
        items.sort((a, b) => b.moq - a.moq);
        break;
      case 'name':
        items.sort((a, b) => a.name.localeCompare(b.name));
        break;
      default:
        break;
    }

    return items;
  }, [products, activeCategory, keyword, sortBy]);

  const FilterContent = (
    <div className="space-y-6">
      {/* Categories */}
      <div>
        <h3 className="mb-3 text-sm font-semibold text-[#071A2D]">Categories</h3>
        <div className="space-y-2">
          <button
            onClick={() => router.push('/products')}
            className={`w-full rounded-lg px-3 py-2 text-left text-sm transition-colors ${
              activeCategory === 'all'
                ? 'bg-[#1565FF] text-white'
                : 'text-muted-foreground hover:bg-muted'
            }`}
          >
            All Products ({products.length})
          </button>
          {categories.map((cat) => {
            const count = products.filter((p) => p.category === cat.slug).length;
            return (
              <button
                key={cat.id}
                onClick={() => router.push(`/products/${cat.slug}`)}
                className={`w-full rounded-lg px-3 py-2 text-left text-sm transition-colors ${
                  activeCategory === cat.slug
                    ? 'bg-[#1565FF] text-white'
                    : 'text-muted-foreground hover:bg-muted'
                }`}
              >
                {cat.name} ({count})
              </button>
            );
          })}
        </div>
      </div>

    </div>
  );

  return (
    <section className="w-full py-8 md:py-12">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        {/* Top bar */}
        <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-1 items-center gap-3">
            <div className="relative flex-1 max-w-md">
              <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search products or item number..."
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                className="pl-9"
              />
            </div>

            {/* Mobile filter */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" className="md:hidden">
                  <Filter className="mr-2 size-4" />
                  Filters
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[300px] overflow-y-auto">
                <SheetHeader>
                  <SheetTitle>Filters</SheetTitle>
                </SheetHeader>
                <div className="mt-6">{FilterContent}</div>
              </SheetContent>
            </Sheet>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-sm text-muted-foreground">
              {filtered.length} products
            </span>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[160px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="default">Default</SelectItem>
                <SelectItem value="moq-asc">MOQ: Low to High</SelectItem>
                <SelectItem value="moq-desc">MOQ: High to Low</SelectItem>
                <SelectItem value="name">Name A-Z</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex gap-8">
          {/* Desktop sidebar filter */}
          <aside className="sticky top-24 hidden h-fit w-64 shrink-0 md:block">
            {FilterContent}
          </aside>

          {/* Product grid */}
          <div className="flex-1 min-w-0">
            {filtered.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-border bg-muted/30 py-20 text-center">
                <div className="mx-auto mb-4 flex size-16 items-center justify-center rounded-full bg-muted">
                  <Search className="size-6 text-muted-foreground" />
                </div>
                <h3 className="mb-2 text-lg font-semibold text-[#071A2D]">
                  No products found
                </h3>
                <p className="text-sm text-muted-foreground">
                  Try adjusting your filters or search keywords.
                </p>
              </div>
            ) : (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {filtered.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
