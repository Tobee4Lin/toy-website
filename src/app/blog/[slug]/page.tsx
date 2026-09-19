import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Home, Clock, Calendar } from 'lucide-react';

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Badge } from '@/components/ui/badge';
import { CardContent } from '@/components/ui/card';
import { Image } from '@/components/ui/image';
import BlogDetailActions from '@/components/blog/BlogDetailActions';
import { getBlogPostBySlug, getBlogPosts, getAllBlogSlugs } from '@/lib/server-data';
import { blogPostSchema, breadcrumbSchema } from '@/lib/structuredData';

export const revalidate = 3600;

export async function generateStaticParams() {
  const slugs = await getAllBlogSlugs();
  return slugs.map((slug) => ({ slug }));
}

interface BlogDetailPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: BlogDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);

  if (!post) {
    return { title: 'Article Not Found' };
  }

  const title = `${post.title} | Toy Manufacturing Blog`;
  const description = post.excerpt || post.content?.join(' ').slice(0, 160) || 'Toy industry articles';

  return {
    title,
    description,
    keywords: ['toy industry', 'manufacturing', post.category],
    alternates: {
      canonical: `/blog/${post.slug}`,
    },
    openGraph: {
      title,
      description,
      type: 'article',
      url: `/blog/${post.slug}`,
      images: post.coverImage ? [{ url: post.coverImage, alt: post.title }] : undefined,
      publishedTime: post.date,
      authors: post.author,
    },
  };
}

export default async function BlogDetailPage({ params }: BlogDetailPageProps) {
  const { slug } = await params;
  const [post, allPosts] = await Promise.all([
    getBlogPostBySlug(slug),
    getBlogPosts(),
  ]);

  if (!post) {
    notFound();
  }

  const relatedPosts = allPosts.filter(
    (p) => p.category === post.category && p.id !== post.id,
  );

  const blogJsonLd = JSON.stringify(
    blogPostSchema({
      title: post.title,
      description: post.excerpt || '',
      datePublished: post.date,
      image: post.coverImage,
      category: post.category,
      author: post.author,
    }),
  );
  const breadcrumbJsonLd = JSON.stringify(
    breadcrumbSchema([
      { name: 'Home', url: '/' },
      { name: 'Blog', url: '/blog' },
      { name: post.title, url: `/blog/${slug}` },
    ]),
  );

  // Join content paragraphs for markdown rendering
  const markdownContent = post.content.join('\n\n');

  return (
    <div className="min-h-screen bg-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: blogJsonLd }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: breadcrumbJsonLd }} />

      {/* Breadcrumb */}
      <div className="w-full border-b border-border bg-[#F5F7FA]">
        <div className="mx-auto max-w-4xl px-4 py-3 md:px-6">
          <Breadcrumb>
            <BreadcrumbList className="text-xs">
              <BreadcrumbItem>
                <BreadcrumbLink href="/">
                  <Home className="size-3" />
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="/blog">Blog</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <span className="font-medium text-[#071A2D]">{post.title}</span>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </div>

      {/* Article */}
      <article className="mx-auto max-w-3xl px-4 py-12 md:px-6 md:py-16">
        <BlogDetailActions post={post} />

        <Badge className="mb-4 bg-[#1565FF] text-white">{post.category}</Badge>
        <h1 className="text-3xl font-black leading-tight text-[#071A2D] md:text-4xl lg:text-5xl">
          {post.title}
        </h1>

        <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
          <span>By {post.author}</span>
          <span className="flex items-center gap-1">
            <Calendar className="size-3.5" />
            {post.date}
          </span>
          <span className="flex items-center gap-1">
            <Clock className="size-3.5" />
            {post.readingTime}
          </span>
        </div>

        {/* Cover */}
        <div className="my-8 overflow-hidden rounded-2xl">
          <Image
            src={post.coverImage || `https://picsum.photos/seed/${post.id}/1200/600`}
            alt={post.title}
            className="w-full object-cover"
          />
        </div>

        {/* Content */}
        <div className="prose prose-lg max-w-none prose-headings:text-[#071A2D] prose-p:text-foreground prose-p:leading-relaxed prose-a:text-[#1565FF] prose-strong:text-[#071A2D] prose-ul:list-disc prose-li:marker:text-[#1565FF]">
          {post.excerpt && (
            <p className="text-lg leading-relaxed text-muted-foreground">
              {post.excerpt}
            </p>
          )}

          {markdownContent ? (
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {markdownContent}
            </ReactMarkdown>
          ) : (
            <p className="text-muted-foreground">Article content coming soon...</p>
          )}
        </div>
      </article>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="w-full bg-[#F5F7FA] py-16">
          <div className="mx-auto max-w-7xl px-4 md:px-6">
            <h2 className="mb-8 text-2xl font-bold text-[#071A2D]">
              Related Articles
            </h2>
            <div className="grid gap-6 md:grid-cols-3">
              {relatedPosts.slice(0, 3).map((p) => (
                <Link
                  key={p.id}
                  href={`/blog/${p.slug}`}
                  className="group block overflow-hidden rounded-2xl border border-border/50 bg-white transition-all hover:-translate-y-1 hover:shadow-lg"
                >
                  <div className="aspect-[16/10] overflow-hidden bg-muted">
                    <Image
                      src={p.coverImage || `https://picsum.photos/seed/${p.id}/640/400`}
                      alt={p.title}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <CardContent className="p-5">
                    <Badge variant="outline" className="mb-2">
                      {p.category}
                    </Badge>
                    <h3 className="line-clamp-2 font-bold text-[#071A2D] transition-colors group-hover:text-[#1565FF]">
                      {p.title}
                    </h3>
                    <div className="mt-2 flex items-center gap-3 text-xs text-muted-foreground">
                      <span>{p.date}</span>
                      <span>{p.readingTime}</span>
                    </div>
                  </CardContent>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
