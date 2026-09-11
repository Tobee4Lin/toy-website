// EXPORTS: IBlogPost, MOCK_BLOG_POSTS
// Data loaded from blog.json — replace that file when exporting from admin dashboard
import blogData from './blog.json';

export interface IBlogPost {
  id: string
  slug: string
  title: string
  excerpt: string
  category: string
  author: string
  authorAvatar: string
  date: string
  readingTime: string
  coverImage: string
  content: string[]
}

export const MOCK_BLOG_POSTS: IBlogPost[] = blogData as IBlogPost[];
