'use client';

import { useState } from 'react';
import { Sparkles, ChevronLeft, ChevronRight } from 'lucide-react';

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

  const prev = () => setActiveImage(i => (i - 1 + images.length) % images.length);
  const next = () => setActiveImage(i => (i + 1) % images.length);

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

      {/* Main image */}
      <div className="relative select-none overflow-hidden rounded-2xl border border-border/50 bg-muted">
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

        {/* Prev/Next arrows */}
        {images.length > 1 && (
          <>
            <button
              onClick={prev}
              className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-black/50 p-2 text-white hover:bg-black/70 transition-colors"
              aria-label="Previous image"
            >
              <ChevronLeft className="size-5" />
            </button>
            <button
              onClick={next}
              className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-black/50 p-2 text-white hover:bg-black/70 transition-colors"
              aria-label="Next image"
            >
              <ChevronRight className="size-5" />
            </button>
          </>
        )}

        {/* Counter */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-black/60 px-4 py-1.5 text-xs text-white backdrop-blur-sm">
          {activeImage + 1} / {images.length}
        </div>
      </div>
    </div>
  );
}
