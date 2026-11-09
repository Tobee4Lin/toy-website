import Link from 'next/link';
import { Home, Search, Package, BookOpen, Mail } from 'lucide-react';

export const metadata = {
  title: 'Page Not Found',
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto max-w-3xl px-4 py-16 md:py-24 text-center">
        <h1 className="text-7xl font-bold text-[#071A2D]">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-[#071A2D]">Page Not Found</h2>
        <p className="mt-3 text-muted-foreground">
          Sorry, the page you are looking for does not exist or may have been moved.
        </p>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 max-w-lg mx-auto">
          <Link
            href="/products"
            className="flex items-center gap-3 rounded-xl border border-border p-4 text-left hover:border-[#1565FF] hover:bg-[#F5F7FA] transition-colors"
          >
            <Package className="size-5 text-[#1565FF]" />
            <div>
              <div className="font-semibold text-sm text-[#071A2D]">Browse Products</div>
              <div className="text-xs text-muted-foreground">Toy catalog by category</div>
            </div>
          </Link>
          <Link
            href="/blog"
            className="flex items-center gap-3 rounded-xl border border-border p-4 text-left hover:border-[#1565FF] hover:bg-[#F5F7FA] transition-colors"
          >
            <BookOpen className="size-5 text-[#1565FF]" />
            <div>
              <div className="font-semibold text-sm text-[#071A2D]">Blog</div>
              <div className="text-xs text-muted-foreground">Toy industry insights</div>
            </div>
          </Link>
          <Link
            href="/about"
            className="flex items-center gap-3 rounded-xl border border-border p-4 text-left hover:border-[#1565FF] hover:bg-[#F5F7FA] transition-colors"
          >
            <Home className="size-5 text-[#1565FF]" />
            <div>
              <div className="font-semibold text-sm text-[#071A2D]">About Us</div>
              <div className="text-xs text-muted-foreground">Our factory & team</div>
            </div>
          </Link>
          <Link
            href="/contact"
            className="flex items-center gap-3 rounded-xl border border-border p-4 text-left hover:border-[#1565FF] hover:bg-[#F5F7FA] transition-colors"
          >
            <Mail className="size-5 text-[#1565FF]" />
            <div>
              <div className="font-semibold text-sm text-[#071A2D]">Contact</div>
              <div className="text-xs text-muted-foreground">Get a quote</div>
            </div>
          </Link>
        </div>

        <Link
          href="/"
          className="mt-10 inline-flex items-center gap-2 rounded-lg bg-[#FF7A00] px-6 py-2.5 text-sm font-medium text-white hover:bg-[#FF7A00]/90"
        >
          <Search className="size-4" />
          Back to Home
        </Link>
      </div>
    </div>
  );
}
