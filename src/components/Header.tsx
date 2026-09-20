'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import {
  Download,
  MessageCircle,
  FileText,
  Menu,
  X,
  ChevronDown,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { useApp } from '@/context/AppContext';
import { buildWhatsAppUrl } from '@/lib/utils';
import { useCategories } from '@/hooks/useApiData';
import { trackEvent } from '@/lib/analytics';

const NAV_ITEMS = [
  { label: 'Home', path: '/' },
  { label: 'Products', path: '/products', hasDropdown: true },
  { label: 'OEM', path: '/oem' },
  { label: 'About Us', path: '/about' },
  { label: 'Blog', path: '/blog' },
  { label: 'Contact', path: '/contact' },
];

export default function Header() {
  const { config, selectionCount, openRfqDialog, openCatalogDialog } = useApp();
  const { categories } = useCategories();
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);

  const isActive = (path: string) => {
    if (path === '/') return pathname === '/';
    return pathname === path || pathname.startsWith(`${path}/`);
  };

  const handleRequestQuote = () => {
    trackEvent('request_quote_click', { source: 'header' });
    openRfqDialog();
  };

  const handleCatalogClick = () => {
    trackEvent('catalog_form_open', { source: 'header' });
    openCatalogDialog('header');
  };

  const handleWhatsAppClick = () => {
    trackEvent('whatsapp_click', { source: 'header' });
  };

  return (
    <header
      className="sticky top-0 z-50 w-full border-b border-white/10 bg-[#071A2D]/80 backdrop-blur-xl transition-all duration-300"
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 md:px-6">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 text-white"
          onClick={() => setMobileOpen(false)}
        >
          <Image
            src="/images/logo-horizontal-v2.png"
            alt="Levich Toys"
            width={180}
            height={48}
            className="h-10 w-auto object-contain"
            priority
          />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden items-center gap-1 lg:flex">
          {NAV_ITEMS.map((item) => (
            <div
              key={item.path}
              className="relative"
              onMouseEnter={() => item.hasDropdown && setProductsOpen(true)}
              onMouseLeave={() => item.hasDropdown && setProductsOpen(false)}
            >
              <Link
                href={item.path}
                className={`flex items-center rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                  isActive(item.path)
                    ? 'text-white'
                    : 'text-white/70 hover:text-white'
                }`}
              >
                {item.label}
                {item.hasDropdown && (
                  <ChevronDown className="ml-1 size-3" />
                )}
              </Link>

              {item.hasDropdown && productsOpen && (
                <div className="absolute left-0 top-full pt-2">
                  <div className="w-56 rounded-xl border border-white/10 bg-[#0A2340] p-2 shadow-xl">
                    <div className="p-2">
                      <Link
                        href="/products"
                        className="block rounded-lg px-3 py-2 text-sm font-medium text-white hover:bg-white/5"
                        onClick={() => setProductsOpen(false)}
                      >
                        All Products
                      </Link>
                      {categories.map((cat) => (
                        <Link
                          key={cat.slug}
                          href={`/products/${cat.slug}`}
                          className="block rounded-lg px-3 py-2 text-sm text-white/70 hover:bg-white/5 hover:text-white"
                          onClick={() => setProductsOpen(false)}
                        >
                          {cat.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* Right actions */}
        <div className="flex items-center gap-2">
          <Link
            href="/my-selection"
            className="relative hidden rounded-md p-2 text-white/70 transition-colors hover:text-white md:block"
            aria-label="My Selection"
          >
            <FileText className="size-5" />
            {selectionCount > 0 && (
              <span className="absolute -right-0.5 -top-0.5 flex size-4 items-center justify-center rounded-full bg-[#FF7A00] text-[10px] font-bold text-white">
                {selectionCount > 9 ? '9+' : selectionCount}
              </span>
            )}
          </Link>

          <Button
            size="sm"
            onClick={handleRequestQuote}
            className="hidden bg-[#FF7A00] text-white hover:bg-[#FF7A00]/90 md:inline-flex"
          >
            Request a Quote
          </Button>

          {/* Mobile menu trigger */}
          <Button
            variant="ghost"
            size="icon"
            className="text-white hover:bg-white/10 lg:hidden"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="border-t border-white/10 bg-[#071A2D] lg:hidden">
          <div className="space-y-1 px-4 py-4">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                onClick={() => setMobileOpen(false)}
                className={`block rounded-lg px-3 py-2 text-sm font-medium ${
                  isActive(item.path) ? 'bg-white/10 text-white' : 'text-white/70 hover:bg-white/5 hover:text-white'
                }`}
              >
                {item.label}
              </Link>
            ))}
            <div className="border-t border-white/10 pt-3">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => { handleCatalogClick(); setMobileOpen(false); }}
                className="w-full justify-start text-white/80 hover:bg-white/10 hover:text-white"
              >
                <Download className="mr-2 size-4" />
                Download Catalog
              </Button>
              <Button
                size="sm"
                onClick={() => { handleRequestQuote(); setMobileOpen(false); }}
                className="mt-2 w-full bg-[#FF7A00] text-white hover:bg-[#FF7A00]/90"
              >
                Request a Quote
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
