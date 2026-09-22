// API client for fetching data from backend admin system
// Falls back to local static JSON when API is unavailable

const API_BASE = process.env.API_BASE_URL || 'http://localhost:3000';

export interface ApiProduct {
  id: string;
  name: string;
  slug: string;
  itemNumber: string;
  category: string;
  description: string;
  features: string[];
  specifications?: Record<string, string>;
  moq: number;
  customizationAvailable: boolean;
  imageUrl: string;
  gallery: string[];
  packagingInfo: string;
  leadTime: string;
  ageRange?: string;
  certifications?: string[];
  isFeatured?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface ApiCategory {
  id: string;
  name: string;
  slug: string;
  description: string;
  productCount: number;
  heroImageUrl: string;
  cardImageUrl: string;
  accentColor: string;
}

export interface ApiBlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  category: string;
  author: string;
  authorAvatar: string;
  date: string;
  readingTime: string;
  coverImage: string;
  content: string[];
}

interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
}

async function fetchJson<T>(url: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${API_BASE}${url}`, {
    headers: { 'Content-Type': 'application/json' },
    // Data is managed in the admin backend and changes frequently; do not cache.
    cache: 'no-store',
    ...options,
  });
  if (!res.ok) {
    throw new Error(`API error: ${res.status} ${res.statusText}`);
  }
  return res.json();
}

// Products
export async function fetchProducts(params?: {
  category?: string;
  search?: string;
  page?: number;
  limit?: number;
}): Promise<PaginatedResponse<ApiProduct>> {
  const query = new URLSearchParams();
  if (params?.category) query.set('category', params.category);
  if (params?.search) query.set('search', params.search);
  if (params?.page) query.set('page', String(params.page));
  if (params?.limit) query.set('pageSize', String(params.limit));
  const qs = query.toString();
  return fetchJson<PaginatedResponse<ApiProduct>>(`/api/products${qs ? `?${qs}` : ''}`);
}

export async function fetchProductBySlug(slug: string): Promise<ApiProduct | null> {
  try {
    const all = await fetchProducts({ limit: 100 });
    return all.items.find((p) => p.slug === slug) || null;
  } catch {
    return null;
  }
}

export async function fetchProductById(id: string): Promise<ApiProduct | null> {
  try {
    return await fetchJson<ApiProduct>(`/api/products/${id}`);
  } catch {
    return null;
  }
}

// Categories
export async function fetchCategories(): Promise<ApiCategory[]> {
  return fetchJson<ApiCategory[]>('/api/categories');
}

// Blog
export async function fetchBlogPosts(params?: {
  category?: string;
  search?: string;
  page?: number;
  limit?: number;
}): Promise<PaginatedResponse<ApiBlogPost>> {
  const query = new URLSearchParams();
  if (params?.category) query.set('category', params.category);
  if (params?.search) query.set('search', params.search);
  if (params?.page) query.set('page', String(params.page));
  if (params?.limit) query.set('pageSize', String(params.limit));
  const qs = query.toString();
  return fetchJson<PaginatedResponse<ApiBlogPost>>(`/api/blog-posts${qs ? `?${qs}` : ''}`);
}

export async function fetchBlogPostBySlug(slug: string): Promise<ApiBlogPost | null> {
  try {
    const all = await fetchBlogPosts({ limit: 100 });
    return all.items.find((p) => p.slug === slug) || null;
  } catch {
    return null;
  }
}

// Inquiries (for frontend RFQ form submission)
export async function submitInquiry(data: Record<string, unknown>): Promise<{ success: boolean }> {
  const res = await fetch(`${API_BASE}/api/inquiries`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    throw new Error(`Submit error: ${res.status}`);
  }
  return res.json();
}
