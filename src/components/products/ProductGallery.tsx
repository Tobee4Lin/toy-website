'use client';

import { useState } from 'react';
import { Sparkles } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Image } from '@/components/ui/image';

interface ProductGalleryProps {
  images: string[];
  productName: string;
  isFeatured?: boolean;
  certifications?: string[];
}

export default function ProductGallery({
  images,
  productName,
  isFeatured = false,
  certifications = [],
}: ProductGalleryProps) {
  const [activeImage, setActiveImage] = useState(0);
  const [dragStartX, setDragStartX] = useState<number | null>(null);
  const [dragStartImage, setDragStartImage] = useState(0);

  const handleDragStart = (e: React.MouseEvent | React.TouchEvent) => {
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    setDragStartX(clientX);
    setDragStartImage(activeImage);
  };

  const handleDragMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (dragStartX === null || images.length <= 1) return;
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const delta = clientX - dragStartX;
    const steps = Math.round(delta / 50);
    const total = images.length;
    const next = ((dragStartImage + steps) % total + total) % total;
    setActiveImage(next);
  };

  const handleDragEnd = () => {
    setDragStartX(null);
  };

  return (
    <div className="grid gap-6 md:grid-cols-[120px_1fr]">
      {/* Thumbnails */}
      <div className="flex gap-2 md:flex-col">
        {images.map((img, i) => (
          <button
            key={i}
            onClick={() => setActiveImage(i)}
            className={`relative aspect-square shrink-0 overflow-hidden rounded-lg border-2 transition-all ${
              activeImage === i
                ? 'border-[#1565FF] ring-2 ring-[#1565FF]/20'
                : 'border-border hover:border-[#1565FF]/50'
            }`}
          >
            <Image src={img} alt={`View ${i + 1}`} className="h-full w-full object-cover" />
          </button>
        ))}
      </div>

      {/* Main image with drag-to-rotate */}
      <div
        className="relative select-none overflow-hidden rounded-2xl border border-border/50 bg-muted"
        onMouseMove={handleDragMove}
        onTouchMove={handleDragMove}
      >
        <Image
          src={images[activeImage]}
          alt={productName}
          className="aspect-square w-full object-cover"
        />
        {isFeatured && (
          <Badge className="absolute left-4 top-4 bg-[#FF7A00] text-white">
            <Sparkles className="mr-1 size-3" />
            Featured
          </Badge>
        )}
        <div className="absolute right-4 top-4 flex gap-2">
          {certifications.slice(0, 3).map((cert) => (
            <Badge
              key={cert}
              variant="outline"
              className="border-white/30 bg-white/90 text-[#071A2D]"
            >
              {cert}
            </Badge>
          ))}
        </div>
        {/* Drag-to-rotate hint */}
        <div
          onMouseDown={handleDragStart}
          onTouchStart={handleDragStart}
          onMouseUp={handleDragEnd}
          onMouseLeave={handleDragEnd}
          onTouchEnd={handleDragEnd}
          className="absolute bottom-4 left-1/2 flex -translate-x-1/2 cursor-grab items-center gap-1.5 rounded-full bg-black/60 px-4 py-1.5 text-xs text-white backdrop-blur-sm active:cursor-grabbing"
        >
          <svg
            className="size-3"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M9 18l6-6-6-6" />
            <path d="M15 18l6-6-6-6" />
          </svg>
          Drag to rotate · {images.length} views
        </div>
      </div>
    </div>
  );
}
