'use client';

import { AppProvider } from '@/context/AppContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WhatsAppFloat from '@/components/WhatsAppFloat';
import RfqDialog from '@/components/forms/RfqDialog';
import CatalogDialog from '@/components/forms/CatalogDialog';
import { useApp } from '@/context/AppContext';
import { Toaster } from 'sonner';
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

function ScrollToTop() {
  const pathname = usePathname();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  }, [pathname]);
  return null;
}

function LayoutContent({ children }: { children: React.ReactNode }) {
  const {
    rfqDialogOpen,
    closeRfqDialog,
    rfqPrefill,
    catalogDialogOpen,
    closeCatalogDialog,
    catalogSource,
  } = useApp();

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <ScrollToTop />
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
      <WhatsAppFloat />
      <RfqDialog
        open={rfqDialogOpen}
        onOpenChange={closeRfqDialog}
        prefill={rfqPrefill}
      />
      <CatalogDialog
        open={catalogDialogOpen}
        onOpenChange={closeCatalogDialog}
        source={catalogSource}
      />
      <Toaster
        position="top-right"
        toastOptions={{
          classNames: {
            toast: 'bg-card text-foreground border border-border',
          },
        }}
      />
    </div>
  );
}

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AppProvider>
      <LayoutContent>{children}</LayoutContent>
    </AppProvider>
  );
}
