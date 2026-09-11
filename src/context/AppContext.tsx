'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';

import {
  clearSelection,
  getSelection,
  saveSelection,
  type SelectionItem,
} from '@/lib/selection';
import { MOCK_SITE_CONFIG, type ISiteConfig } from '@/data/site';

interface AppContextValue {
  config: ISiteConfig;
  selection: SelectionItem[];
  addToSelection: (item: Omit<SelectionItem, 'addedAt'>) => void;
  removeFromSelection: (productId: string) => void;
  updateSelectionItem: (productId: string, updates: Partial<SelectionItem>) => void;
  clearAllSelection: () => void;
  isInSelection: (productId: string) => boolean;
  selectionCount: number;
  rfqDialogOpen: boolean;
  openRfqDialog: (prefill?: { productName?: string; itemNumber?: string; category?: string }) => void;
  closeRfqDialog: () => void;
  catalogDialogOpen: boolean;
  openCatalogDialog: (source?: string) => void;
  closeCatalogDialog: () => void;
  catalogSource?: string;
  rfqPrefill?: { productName?: string; itemNumber?: string; category?: string };
}

const AppContext = createContext<AppContextValue | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [selection, setSelection] = useState<SelectionItem[]>([]);
  const [rfqDialogOpen, setRfqDialogOpen] = useState(false);
  const [rfqPrefill, setRfqPrefill] = useState<
    { productName?: string; itemNumber?: string; category?: string } | undefined
  >();
  const [catalogDialogOpen, setCatalogDialogOpen] = useState(false);
  const [catalogSource, setCatalogSource] = useState<string | undefined>();

  // Load selection from storage on mount
  useEffect(() => {
    setSelection(getSelection());
  }, []);

  const addToSelection = useCallback((item: Omit<SelectionItem, 'addedAt'>) => {
    setSelection((prev) => {
      const existing = prev.find((i) => i.productId === item.productId);
      if (existing) return prev;
      const next = [...prev, { ...item, addedAt: Date.now() }];
      saveSelection(next);
      return next;
    });
  }, []);

  const removeFromSelection = useCallback((productId: string) => {
    setSelection((prev) => {
      const next = prev.filter((i) => i.productId !== productId);
      saveSelection(next);
      return next;
    });
  }, []);

  const updateSelectionItem = useCallback(
    (productId: string, updates: Partial<SelectionItem>) => {
      setSelection((prev) => {
        const next = prev.map((i) =>
          i.productId === productId ? { ...i, ...updates } : i,
        );
        saveSelection(next);
        return next;
      });
    },
    [],
  );

  const clearAllSelection = useCallback(() => {
    setSelection([]);
    clearSelection();
  }, []);

  const isInSelection = useCallback(
    (productId: string) => selection.some((i) => i.productId === productId),
    [selection],
  );

  const openRfqDialog = useCallback(
    (prefill?: { productName?: string; itemNumber?: string; category?: string }) => {
      setRfqPrefill(prefill);
      setRfqDialogOpen(true);
    },
    [],
  );

  const closeRfqDialog = useCallback(() => {
    setRfqDialogOpen(false);
  }, []);

  const openCatalogDialog = useCallback((source?: string) => {
    setCatalogSource(source);
    setCatalogDialogOpen(true);
  }, []);

  const closeCatalogDialog = useCallback(() => {
    setCatalogDialogOpen(false);
  }, []);

  const value = useMemo<AppContextValue>(
    () => ({
      config: MOCK_SITE_CONFIG,
      selection,
      addToSelection,
      removeFromSelection,
      updateSelectionItem,
      clearAllSelection,
      isInSelection,
      selectionCount: selection.length,
      rfqDialogOpen,
      openRfqDialog,
      closeRfqDialog,
      catalogDialogOpen,
      openCatalogDialog,
      closeCatalogDialog,
      catalogSource,
      rfqPrefill,
    }),
    [
      selection,
      addToSelection,
      removeFromSelection,
      updateSelectionItem,
      clearAllSelection,
      isInSelection,
      rfqDialogOpen,
      openRfqDialog,
      closeRfqDialog,
      catalogDialogOpen,
      openCatalogDialog,
      closeCatalogDialog,
      catalogSource,
      rfqPrefill,
    ],
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) {
    throw new Error('useApp must be used within AppProvider');
  }
  return ctx;
}
