'use client';

import { useEffect, useRef } from 'react';

/**
 * MagnetLines — lines that react to mouse movement
 * Inspired by React Bits Magnet Lines.
 * Pure CSS + lightweight JS mouse tracking.
 */
export default function MagnetLines({
  rows = 8,
  columns = 20,
  containerWidth = '100%',
  containerHeight = '100%',
  lineColor = '#1565FF',
  lineWidth = 1,
  className = '',
}: {
  rows?: number;
  columns?: number;
  containerWidth?: string;
  containerHeight?: string;
  lineColor?: string;
  lineWidth?: number;
  className?: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      container.querySelectorAll<HTMLElement>('.magnet-line').forEach((line) => {
        const lineRect = line.getBoundingClientRect();
        const cx = lineRect.left - rect.left + lineRect.width / 2;
        const cy = lineRect.top - rect.top + lineRect.height / 2;
        const dx = x - cx;
        const dy = y - cy;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const influence = Math.max(0, 1 - dist / 200);
        const angle = Math.atan2(dy, dx) * (180 / Math.PI);
        line.style.transform = `rotate(${angle}deg) scaleX(${1 + influence * 0.5})`;
        line.style.opacity = String(0.15 + influence * 0.3);
      });
    };

    const handleMouseLeave = () => {
      container.querySelectorAll<HTMLElement>('.magnet-line').forEach((line) => {
        line.style.transform = '';
        line.style.opacity = '0.15';
      });
    };

    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mouseleave', handleMouseLeave);
    return () => {
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  const lines = [];
  for (let i = 0; i < rows * columns; i++) {
    lines.push(
      <div
        key={i}
        className="magnet-line absolute rounded-full transition-all duration-300 ease-out"
        style={{
          width: `${100 / columns}%`,
          height: `${lineWidth}px`,
          top: `${(Math.floor(i / columns) / rows) * 100}%`,
          left: `${((i % columns) / columns) * 100}%`,
          backgroundColor: lineColor,
          opacity: 0.15,
        }}
      />,
    );
  }

  return (
    <div
      ref={containerRef}
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
      style={{ width: containerWidth, height: containerHeight }}
    >
      {lines}
    </div>
  );
}
