'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { Search, Filter, Clock, Calendar, ArrowRight } from 'lucide-react';

import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { CardContent } from '@/components/ui/card';
import { Image } from '@/components/ui/image';
import { trackEvent } from '@/lib/analytics';
import type { IBlogPost } from '@/data/blog';

interface BlogFilterProps {
  posts: IBlogPost[];
}

export default function BlogFilter({ posts }: BlogFilterProps) {
  const [keyword, setKeyword] = useState('');
  const [category, setCategory] = useState('all');

  const categories = useMemo(
    () => [...new Set(posts.map((p) => p.category))],
    [posts],
  );

  const filtered = useMemo(() => {
    let items = [...posts];
    if (category !== 'all') {
      items = items.filter((p) => p.category === category);
    }
    if (keyword.trim()) {
      const kw = keyword.toLowerCase();
      items = items.filter(
        (p) =>
          p.title.toLowerCase().includes(kw) ||
          p.excerpt.toLowerCase().includes(kw),
      );
    }
    return items;
  }, [keyword, category, posts]);

  const featured = posts[0];
  const showFeatured = category === 'all' && !keyword && featured;

  return (
    <>
      {/* Search + Filter */}
      <section className="w-full border-b border-border bg-white py-6">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search articles..."
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                className="pl-9"
              />
            </div>

            <div className="flex items-center gap-2">
              <Filter className="size-4 text-muted-foreground shrink-0" />
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger className="h-10 w-[200px]">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {categories.map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      {cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="w-full py-12 md:py-16">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          {/* Featured post */}
          {showFeatured && (
            <div className="mb-12">
              <Link href={`/blog/${featured.slug}`} className="group block">
                <div className="grid gap-6 overflow-hidden rounded-2xl border border-border/50 bg-[#F5F7FA] md:grid-cols-2">
                  <div className="relative aspect-[16/10] overflow-hidden bg-muted md:aspect-auto">
                    <Image
                      src={featured.coverImage || `https://picsum.photos/seed/${featured.id}/800/500`}
                      alt={featured.title}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="flex flex-col justify-center p-6 md:p-8">
                    <h2 className="mb-3 text-2xl font-bold text-[#071A2D] transition-colors group-hover:text-[#1565FF] md:text-3xl">
                      {featured.title}
                    </h2>
                    <p className="mb-4 line-clamp-3 text-muted-foreground">
                      {featured.excerpt}
                    </p>
                    <div className="mb-4 flex items-center gap-4 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Calendar className="size-3" />
                        {featured.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="size-3" />
                        {featured.readingTime}
                      </span>
                    </div>
                    <span className="inline-flex items-center gap-1 text-sm font-semibold text-[#1565FF]">
                      Read article
                      <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                    </span>
                  </div>
                </div>
              </Link>
            </div>
          )}

          {/* Article grid */}
          {filtered.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-border bg-muted/30 py-20 text-center">
              <div className="mx-auto mb-4 flex size-16 items-center justify-center rounded-full bg-muted">
                <Search className="size-6 text-muted-foreground" />
              </div>
              <h3 className="mb-2 text-lg font-semibold text-[#071A2D]">
                No articles found
              </h3>
              <p className="text-sm text-muted-foreground">
                Try adjusting your search or filter.
              </p>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filtered
                .filter((p) => !showFeatured || p.id !== featured.id)
                .map((post) => (
                  <article key={post.id}>
                    <Link
                      href={`/blog/${post.slug}`}
                      className="group block overflow-hidden rounded-2xl border border-border/50 bg-white transition-all hover:-translate-y-1 hover:border-[#1565FF]/30 hover:shadow-lg"
                      onClick={() =>
                        trackEvent('product_view', {
                          type: 'blog',
                          slug: post.slug,
                          source: 'blog_list',
                        })
                      }
                    >
                      <div className="relative aspect-[16/10] overflow-hidden bg-muted">
                        <Image
                          src={post.coverImage || `https://picsum.photos/seed/${post.id}/640/400`}
                          alt={post.title}
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>
                      <CardContent className="p-5">
                        <div className="mb-2 flex items-center gap-4 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Calendar className="size-3" />
                            {post.date}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="size-3" />
                            {post.readingTime}
                          </span>
                        </div>
                        <h3 className="mb-2 line-clamp-2 font-bold text-[#071A2D] transition-colors group-hover:text-[#1565FF]">
                          {post.title}
                        </h3>
                        <p className="line-clamp-2 text-sm text-muted-foreground">
                          {post.excerpt}
                        </p>
                        <div className="mt-4 flex items-center justify-between">
                          <span className="text-xs text-muted-foreground">
                            By {post.author}
                          </span>
                          <span className="text-xs font-semibold text-[#1565FF]">
                            Read more →
                          </span>
                        </div>
                      </CardContent>
                    </Link>
                  </article>
                ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
