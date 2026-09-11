const STORAGE_KEY = 'toy_sourcing_selection';

export interface SelectionItem {
  productId: string;
  productName: string;
  itemNumber: string;
  category: string;
  image: string;
  quantity?: number;
  notes?: string;
  addedAt: number;
}

export function getSelection(): SelectionItem[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as SelectionItem[];
  } catch {
    return [];
  }
}

export function saveSelection(items: SelectionItem[]): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  } catch {
    // Silently fail – storage might be unavailable
  }
}

export function clearSelection(): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    // ignore
  }
}
