import { useState, useEffect, useCallback } from 'react';
import {
  fetchProducts,
  fetchProductBySlug,
  fetchCategories,
  fetchBlogPosts,
  fetchBlogPostBySlug,
  type ApiProduct,
  type ApiCategory,
  type ApiBlogPost,
} from '@/lib/api';

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || process.env.API_BASE_URL || 'http://localhost:3000';

// Resolve relative URL to full API URL
function resolveUrl(url: string): string {
  if (!url) return '';
  if (url.startsWith('http://') || url.startsWith('https://') || url.startsWith('data:')) {
    return url;
  }
  // Local static assets in /images/ or /uploads/ should stay relative to frontend
  if (url.startsWith('/images/') || url.startsWith('/uploads/')) {
    return url;
  }
  return `${API_BASE}${url.startsWith('/') ? '' : '/'}${url}`;
}
import type { IProduct } from '@/data/products';
import type { ICategory } from '@/data/categories';
import type { IBlogPost } from '@/data/blog';
import { MOCK_PRODUCTS } from '@/data/products';
import { MOCK_CATEGORIES } from '@/data/categories';
import { MOCK_BLOG_POSTS } from '@/data/blog';

// Category slug to label mapping
const CATEGORY_LABELS: Record<string, string> = {
  'beach-toys': 'Beach Toys',
  'bubble-toys': 'Bubble Toys',
  'rc-toys': 'RC Toys',
  'building-blocks': 'Building Blocks',
};

// Normalize category slug
function normalizeCategory(cat: string): string {
  return cat.toLowerCase().replace(/\s+/g, '-');
}

// Adapt API product to frontend IProduct
function adaptProduct(api: ApiProduct): IProduct {
  const categorySlug = normalizeCategory(api.category);
  return {
    id: api.id,
    slug: api.slug,
    name: api.name,
    itemNumber: api.itemNumber,
    category: categorySlug as IProduct['category'],
    categoryLabel: CATEGORY_LABELS[categorySlug] || api.category,
    description: api.description,
    features: api.features || [],
    moq: api.moq,
    customizable: api.customizationAvailable,
    customizationOptions: api.customizationAvailable
      ? ['Color Customization', 'Logo Printing', 'Packaging Design']
      : [],
    packaging: api.packagingInfo || '',
    leadTime: api.leadTime || '',
    ageRange: api.ageRange || '3+',
    imageUrl: resolveUrl(api.imageUrl),
    galleryImages: (api.gallery || []).map(resolveUrl),
    certifications: api.certifications || [],
    isFeatured: api.isFeatured || false,
  };
}

// Default category images by slug
const DEFAULT_CATEGORY_IMAGES: Record<string, string> = {
  'beach-toys': '/images/categories/beach-toys.jpg',
  'bubble-toys': '/images/categories/bubble-toys.jpg',
  'building-blocks': '/images/categories/building-blocks.jpg',
  'rc-toys': '/images/categories/rc-toys.jpg',
};

// Adapt API category to frontend ICategory
function adaptCategory(api: ApiCategory): ICategory {
  const normalizedSlug = normalizeCategory(api.slug);
  const defaultImg = DEFAULT_CATEGORY_IMAGES[normalizedSlug] || '/images/categories/default.jpg';
  return {
    id: api.id,
    name: api.name,
    slug: normalizedSlug,
    description: api.description,
    productCount: api.productCount,
    heroImageUrl: api.heroImageUrl ? resolveUrl(api.heroImageUrl) : defaultImg,
    cardImageUrl: api.cardImageUrl ? resolveUrl(api.cardImageUrl) : defaultImg,
    accentColor: api.accentColor,
  };
}

// Adapt API blog post to frontend IBlogPost
function adaptBlogPost(api: ApiBlogPost): IBlogPost {
  return {
    id: api.id,
    slug: api.slug,
    title: api.title,
    excerpt: api.excerpt,
    category: api.category,
    author: api.author,
    authorAvatar: resolveUrl(api.authorAvatar),
    date: api.date,
    readingTime: api.readingTime,
    coverImage: resolveUrl(api.coverImage),
    content: api.content || [],
  };
}

// Hook: fetch all products with fallback to static data
export function useProducts(options?: { category?: string; search?: string }) {
  const [products, setProducts] = useState<IProduct[]>(MOCK_PRODUCTS);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetchProducts({ limit: 200, ...options });
      const adapted = res.items.map(adaptProduct);
      setProducts(adapted);
    } catch (err) {
      console.warn('[useProducts] API failed, using static data:', err);
      setError(err instanceof Error ? err.message : 'Unknown error');
      // Keep using static fallback data
    } finally {
      setLoading(false);
    }
  }, [options?.category, options?.search]);

  useEffect(() => {
    load();
  }, [load]);

  return { products, loading, error, reload: load };
}

// Hook: fetch single product by slug
export function useProduct(slug: string | undefined) {
  const [product, setProduct] = useState<IProduct | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) {
      setLoading(false);
      return;
    }
    let cancelled = false;
    const load = async () => {
      setLoading(true);
      try {
        const apiProduct = await fetchProductBySlug(slug);
        if (!cancelled) {
          if (apiProduct) {
            setProduct(adaptProduct(apiProduct));
          } else {
            // Fallback to static data
            const found = MOCK_PRODUCTS.find((p) => p.slug === slug);
            setProduct(found || null);
          }
        }
      } catch {
        if (!cancelled) {
          const found = MOCK_PRODUCTS.find((p) => p.slug === slug);
          setProduct(found || null);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    };
    load();
    return () => {
      cancelled = true;
    };
  }, [slug]);

  return { product, loading };
}

// Hook: fetch categories
export function useCategories() {
  const [categories, setCategories] = useState<ICategory[]>(MOCK_CATEGORIES);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      setLoading(true);
      try {
        const apiCats = await fetchCategories();
        if (!cancelled) {
          setCategories(apiCats.map(adaptCategory));
        }
      } catch (err) {
        console.warn('[useCategories] API failed, using static data:', err);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };
    load();
    return () => {
      cancelled = true;
    };
  }, []);

  return { categories, loading };
}

// Hook: fetch blog posts
export function useBlogPosts(options?: { category?: string; search?: string }) {
  const [posts, setPosts] = useState<IBlogPost[]>(MOCK_BLOG_POSTS);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetchBlogPosts({ limit: 100, ...options });
      setPosts(res.items.map(adaptBlogPost));
    } catch (err) {
      console.warn('[useBlogPosts] API failed, using static data:', err);
    } finally {
      setLoading(false);
    }
  }, [options?.category, options?.search]);

  useEffect(() => {
    load();
  }, [load]);

  return { posts, loading, reload: load };
}

// Hook: fetch single blog post by slug
export function useBlogPost(slug: string | undefined) {
  const [post, setPost] = useState<IBlogPost | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) {
      setLoading(false);
      return;
    }
    let cancelled = false;
    const load = async () => {
      setLoading(true);
      try {
        const apiPost = await fetchBlogPostBySlug(slug);
        if (!cancelled) {
          if (apiPost) {
            setPost(adaptBlogPost(apiPost));
          } else {
            const found = MOCK_BLOG_POSTS.find((p) => p.slug === slug);
            setPost(found || null);
          }
        }
      } catch {
        if (!cancelled) {
          const found = MOCK_BLOG_POSTS.find((p) => p.slug === slug);
          setPost(found || null);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    };
    load();
    return () => {
      cancelled = true;
    };
  }, [slug]);

  return { post, loading };
}
