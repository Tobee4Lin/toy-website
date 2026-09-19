'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Calendar, Clock } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Image } from '@/components/ui/image';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import type { IBlogPost } from '@/data/blog';

interface BlogPreviewSectionProps {
  posts: IBlogPost[];
}

export default function BlogPreviewSection({ posts }: BlogPreviewSectionProps) {
  const recentPosts = posts.slice(0, 3);
  return (
    <section className="w-full bg-[#F5F7FA] py-20 md:py-28">
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
              Insights & Guides
            </span>
            <h2 className="text-3xl font-bold tracking-tight text-[#071A2D] md:text-4xl lg:text-5xl">
              Latest from Our Blog
            </h2>
            <p className="mt-3 max-w-xl text-muted-foreground">
              Expert insights on toy manufacturing, safety standards, market trends and
              industry best practices.
            </p>
          </div>
          <Button asChild variant="outline" className="hidden md:inline-flex">
            <Link href="/blog">
              View All Articles
              <ArrowRight className="ml-2 size-4" />
            </Link>
          </Button>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-3">
          {recentPosts.map((post, i) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group overflow-hidden rounded-2xl border border-border/50 bg-white"
            >
              <Link href={`/blog/${post.slug}`} className="block">
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image
                    src={post.coverImage}
                    alt={post.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute left-4 top-4">
                    <Badge className="bg-[#1565FF] text-white hover:bg-[#1565FF]">
                      {post.category}
                    </Badge>
                  </div>
                </div>
                <div className="p-6">
                  <div className="mb-3 flex items-center gap-4 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Calendar className="size-3" />
                      {post.date ? new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : 'Recent'}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="size-3" />
                      {post.readingTime || 5} min read
                    </span>
                  </div>
                  <h3 className="mb-2 text-lg font-bold text-[#071A2D] group-hover:text-[#1565FF] transition-colors">
                    {post.title}
                  </h3>
                  <p className="mb-4 line-clamp-2 text-sm text-muted-foreground">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center gap-2">
                    <Avatar className="size-8">
                      <AvatarImage src={post.authorAvatar} alt={post.author || 'Author'} />
                      <AvatarFallback>{(post.author || 'A').charAt(0)}</AvatarFallback>
                    </Avatar>
                    <span className="text-xs font-medium text-[#071A2D]">{post.author || 'Author'}</span>
                  </div>
                </div>
              </Link>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
