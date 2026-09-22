// EXPORTS: IProduct, MOCK_PRODUCTS
// Data loaded from products.json — replace that file when exporting from admin dashboard
import productsData from './products.json';

export interface IProduct {
  id: string
  slug: string
  name: string
  itemNumber: string
  category: 'beach-toys' | 'bubble-toys' | 'rc-toys' | 'building-blocks'
  categoryLabel: string
  description: string
  features: string[]
  moq: number
  customizable: boolean
  customizationOptions: string[]
  packaging: string
  leadTime: string
  ageRange: string
  imageUrl: string
  galleryImages: string[]
  certifications: string[]
  specifications?: Record<string, string>
  isFeatured: boolean
}

export const MOCK_PRODUCTS: IProduct[] = productsData as IProduct[];
