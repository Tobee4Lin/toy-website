'use client';

import { useState, useRef, useEffect } from 'react';
import { Sparkles, ChevronLeft, ChevronRight, X, ZoomIn } from 'lucide-react';

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
  const [showModal, setShowModal] = useState(false);
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

  // 模态框中 ESC 关闭
  useEffect(() => {
    if (!showModal) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setShowModal(false);
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
    };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [showModal]);

  return (
    <div className="grid gap-6 md:grid-cols-[120px_1fr]">
      {/* 缩略图 */}
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

      {/* 主图：hover 放大镜 + 点击模态框 */}
      <div
        ref={containerRef}
        className="relative select-none overflow-hidden rounded-2xl border border-border/50 bg-white cursor-zoom-in"
        onMouseEnter={() => setZooming(true)}
        onMouseLeave={() => setZooming(false)}
        onMouseMove={handleMouseMove}
        onClick={() => setShowModal(true)}
      >
        <Image
          src={images[activeImage]}
          alt={productName}
          className="aspect-square w-full object-contain p-4 transition-transform duration-200"
          style={zooming ? { transform: 'scale(2.5)', transformOrigin: `${hoverPos.x}% ${hoverPos.y}%` } : undefined}
        />

        {/* 放大提示图标 */}
        <div className="pointer-events-none absolute bottom-4 right-4 flex items-center gap-1.5 rounded-full bg-black/50 px-3 py-1.5 text-xs text-white opacity-0 transition-opacity group-hover:opacity-100">
          <ZoomIn className="size-3.5" />
          点击放大
        </div>

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
            <button
              onClick={(e) => { e.stopPropagation(); prev(); }}
              className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-black/50 p-2 text-white hover:bg-black/70"
              aria-label="Previous"
            >
              <ChevronLeft className="size-5" />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); next(); }}
              className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-black/50 p-2 text-white hover:bg-black/70"
              aria-label="Next"
            >
              <ChevronRight className="size-5" />
            </button>
          </>
        )}

        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-black/60 px-4 py-1.5 text-xs text-white">
          {activeImage + 1} / {images.length}
        </div>
      </div>

      {/* 放大模态框 */}
      {showModal && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-4"
          onClick={() => setShowModal(false)}
        >
          <button
            className="absolute right-4 top-4 rounded-full bg-white/10 p-2 text-white hover:bg-white/20"
            onClick={() => setShowModal(false)}
            aria-label="Close"
          >
            <X className="size-6" />
          </button>

          {images.length > 1 && (
            <>
              <button
                className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white hover:bg-white/20"
                onClick={(e) => { e.stopPropagation(); prev(); }}
                aria-label="Previous"
              >
                <ChevronLeft className="size-7" />
              </button>
              <button
                className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white hover:bg-white/20"
                onClick={(e) => { e.stopPropagation(); next(); }}
                aria-label="Next"
              >
                <ChevronRight className="size-7" />
              </button>
            </>
          )}

          <div
            className="relative max-h-[85vh] max-w-[90vw]"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={images[activeImage]}
              alt={productName}
              className="max-h-[85vh] max-w-[90vw] rounded-lg object-contain"
            />
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-black/60 px-4 py-1.5 text-sm text-white">
              {activeImage + 1} / {images.length}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
