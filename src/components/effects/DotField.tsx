'use client';

/**
 * DotField — animated dot grid background
 * Inspired by React Bits DotField.
 * Pure CSS, deterministic pattern.
 */
export default function DotField({
  color = '#1565FF',
  dotSize = 3,
  gap = 30,
  opacity = 0.15,
  className = '',
}: {
  color?: string;
  dotSize?: number;
  gap?: number;
  opacity?: number;
  className?: string;
}) {
  return (
    <div
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
      style={{
        backgroundImage: `radial-gradient(${color} ${dotSize}px, transparent ${dotSize}px)`,
        backgroundSize: `${gap}px ${gap}px`,
        opacity,
      }}
    />
  );
}
