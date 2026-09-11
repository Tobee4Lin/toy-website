import type { Metadata } from 'next';
import { Badge } from '@/components/ui/badge';
import BlogFilter from '@/components/blog/BlogFilter';
import { getBlogPosts } from '@/lib/server-data';
import { breadcrumbSchema } from '@/lib/structuredData';

export const revalidate = 3600;

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Blog | Toy Industry Insights, Sourcing Guides & Market Trends',
    description:
      'Toy industry insights, sourcing guides, product trends, safety standards and China sourcing tips. Learn how to import toys from Chenghai, China.',
    keywords: ['toy industry blog', 'toy sourcing guide', 'China toy import', 'toy market trends', 'toy safety standards', 'Chenghai toy market'],
    openGraph: {
      title: 'Blog | Toy Industry Insights, Sourcing Guides & Market Trends',
      description:
        'Toy industry insights, sourcing guides, product trends, safety standards and China sourcing tips.',
      type: 'website',
    },
  };
}

export default async function BlogPage() {
  const posts = await getBlogPosts();

  const breadcrumbJsonLd = JSON.stringify(
    breadcrumbSchema([
      { name: 'Home', url: '/' },
      { name: 'Blog', url: '/blog' },
    ]),
  );

  return (
    <div className="min-h-screen bg-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: breadcrumbJsonLd }} />

      {/* Hero */}
      <section className="w-full bg-[#F5F7FA] py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <div className="text-center">
            <Badge className="mb-3 bg-[#1565FF] text-white">Blog & Insights</Badge>
            <h1 className="text-4xl font-black text-[#071A2D] md:text-5xl">
              Toy Industry Insights
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
              Expert guides, market trends, safety standards, and sourcing tips
              for toy importers and brands worldwide.
            </p>
          </div>
        </div>
      </section>

      <BlogFilter posts={posts} />
    </div>
  );
}
