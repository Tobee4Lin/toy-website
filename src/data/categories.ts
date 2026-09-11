// EXPORTS: ICategory, MOCK_CATEGORIES
// Data loaded from categories.json — replace that file when exporting from admin dashboard
import categoriesData from './categories.json';

export interface ICategory {
  id: string
  name: string
  slug: string
  description: string
  productCount: number
  heroImageUrl: string
  cardImageUrl: string
  accentColor: string
}

export const MOCK_CATEGORIES: ICategory[] = categoriesData as ICategory[];
