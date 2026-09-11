import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center py-24">
      <h1 className="text-6xl font-bold mb-4 text-[#071A2D]">404</h1>
      <p className="text-lg text-muted-foreground mb-8">Page not found</p>
      <Link
        href="/"
        className="rounded-lg bg-[#FF7A00] px-6 py-2.5 text-sm font-medium text-white hover:bg-[#FF7A00]/90"
      >
        Back to Home
      </Link>
    </div>
  );
}
