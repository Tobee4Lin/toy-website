// Server-side data fetching with ISR revalidate
// Adapts API data to frontend types, falls back to static JSON

import { fetchProducts, fetchProductBySlug, fetchCategories, fetchBlogPosts, fetchBlogPostBySlug, type ApiProduct, type ApiCategory, type ApiBlogPost } from './api';
import type { IProduct } from '@/data/products';
import type { ICategory } from '@/data/categories';
import type { IBlogPost } from '@/data/blog';
import { MOCK_PRODUCTS } from '@/data/products';
import { MOCK_CATEGORIES } from '@/data/categories';
import { MOCK_BLOG_POSTS } from '@/data/blog';

const API_BASE = process.env.API_BASE_URL || 'http://localhost:3000';
const REVALIDATE = 3600;

// Resolve relative URL to full API URL
function resolveUrl(url: string): string {
  if (!url) return '';
  if (url.startsWith('http://') || url.startsWith('https://') || url.startsWith('data:')) {
    return url;
  }
  if (url.startsWith('/images/') || url.startsWith('/uploads/')) {
    return url;
  }
  return `${API_BASE}${url.startsWith('/') ? '' : '/'}${url}`;
}

const CATEGORY_LABELS: Record<string, string> = {
  'beach-toys': 'Beach Toys',
  'bubble-toys': 'Bubble Toys',
  'rc-toys': 'RC Toys',
  'building-blocks': 'Building Blocks',
};

function normalizeCategory(cat: string): string {
  return cat.toLowerCase().replace(/\s+/g, '-');
}

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
    specifications: api.specifications || {},
    isFeatured: api.isFeatured || false,
  };
}

const DEFAULT_CATEGORY_IMAGES: Record<string, string> = {
  'beach-toys': '/images/categories/beach-toys.jpg',
  'bubble-toys': '/images/categories/bubble-toys.jpg',
  'building-blocks': '/images/categories/building-blocks.jpg',
  'rc-toys': '/images/categories/rc-toys.jpg',
};

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

// Server: fetch all products with fallback to static data
export async function getProducts(options?: { category?: string; search?: string }): Promise<IProduct[]> {
  try {
    const res = await fetchProducts({ limit: 200, ...options });
    return res.items.map(adaptProduct);
  } catch (err) {
    console.warn('[getProducts] API failed, using static data:', err);
    return MOCK_PRODUCTS;
  }
}

// Server: fetch single product by slug
export async function getProductBySlug(slug: string): Promise<IProduct | null> {
  try {
    const apiProduct = await fetchProductBySlug(slug);
    if (apiProduct) return adaptProduct(apiProduct);
    return MOCK_PRODUCTS.find((p) => p.slug === slug) || null;
  } catch {
    return MOCK_PRODUCTS.find((p) => p.slug === slug) || null;
  }
}

// Server: fetch categories
export async function getCategories(): Promise<ICategory[]> {
  try {
    const apiCats = await fetchCategories();
    return apiCats.map(adaptCategory);
  } catch (err) {
    console.warn('[getCategories] API failed, using static data:', err);
    return MOCK_CATEGORIES;
  }
}

// Server: fetch blog posts
export async function getBlogPosts(options?: { category?: string; search?: string }): Promise<IBlogPost[]> {
  try {
    const res = await fetchBlogPosts({ limit: 100, ...options });
    return res.items.map(adaptBlogPost);
  } catch (err) {
    console.warn('[getBlogPosts] API failed, using static data:', err);
    return MOCK_BLOG_POSTS;
  }
}

// Server: fetch single blog post by slug
export async function getBlogPostBySlug(slug: string): Promise<IBlogPost | null> {
  try {
    const apiPost = await fetchBlogPostBySlug(slug);
    if (apiPost) return adaptBlogPost(apiPost);
    return MOCK_BLOG_POSTS.find((p) => p.slug === slug) || null;
  } catch {
    return MOCK_BLOG_POSTS.find((p) => p.slug === slug) || null;
  }
}

// Get all product slugs for generateStaticParams
export async function getAllProductSlugs(): Promise<string[]> {
  const products = await getProducts();
  return products.map((p) => p.slug);
}

// Get all blog slugs for generateStaticParams
export async function getAllBlogSlugs(): Promise<string[]> {
  const posts = await getBlogPosts();
  return posts.map((p) => p.slug);
}

// Get all category slugs for generateStaticParams
export async function getAllCategorySlugs(): Promise<string[]> {
  const categories = await getCategories();
  return categories.map((c) => c.slug);
}
