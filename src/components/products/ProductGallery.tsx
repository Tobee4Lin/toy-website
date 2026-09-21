'use client';

import { useState, useRef } from 'react';
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
  const [hoverPos, setHoverPos] = useState({ x: 50, y: 50 });
  const [zooming, setZooming] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const prev = () => setActiveImage(i => (i - 1 + images.length) % images.length);
  const next = () => setActiveImage(i => (i + 1) % images.length);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setHoverPos({ x, y });
  };

  return (
    <div className="grid gap-6 md:grid-cols-[120px_1fr]">
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

      <div
        ref={containerRef}
        className="relative select-none overflow-hidden rounded-2xl border border-border/50 bg-white cursor-zoom-in"
        onMouseEnter={() => setZooming(true)}
        onMouseLeave={() => setZooming(false)}
        onMouseMove={handleMouseMove}
      >
        <Image
          src={images[activeImage]}
          alt={productName}
          className="aspect-square w-full object-contain p-4 transition-transform duration-200"
          style={zooming ? { transform: 'scale(2.5)', transformOrigin: `${hoverPos.x}% ${hoverPos.y}%` } : undefined}
        />

        {isFeatured && (
          <Badge className="absolute left-4 top-4 bg-[#FF7A00] text-white">
            <Sparkles className="mr-1 size-3" />
            Featured
          </Badge>
        )}
        <div className="absolute right-4 top-4 flex gap-2">
          {certifications.slice(0, 3).map((cert) => (
            <Badge key={cert} variant="outline" className="border-white/30 bg-white/90 text-[#071A2D]">
              {cert}
            </Badge>
          ))}
        </div>

        {images.length > 1 && (
          <>
            <button onClick={prev} className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-black/50 p-2 text-white hover:bg-black/70" aria-label="Previous">
              <ChevronLeft className="size-5" />
            </button>
            <button onClick={next} className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-black/50 p-2 text-white hover:bg-black/70" aria-label="Next">
              <ChevronRight className="size-5" />
            </button>
          </>
        )}

        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-black/60 px-4 py-1.5 text-xs text-white">
          {activeImage + 1} / {images.length}
        </div>
      </div>
    </div>
  );
}
