'use client';

/**
 * Ribbons — flowing ribbon SVG background
 * Inspired by React Bits Ribbons.
 * Pure SVG + CSS animation.
 */
export default function Ribbons({
  color1 = '#1565FF',
  color2 = '#FF7A00',
  className = '',
}: {
  color1?: string;
  color2?: string;
  className?: string;
}) {
  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 1440 400"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="ribbon-grad-1" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={color1} stopOpacity="0.3" />
            <stop offset="50%" stopColor={color2} stopOpacity="0.2" />
            <stop offset="100%" stopColor={color1} stopOpacity="0.1" />
          </linearGradient>
          <linearGradient id="ribbon-grad-2" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={color2} stopOpacity="0.15" />
            <stop offset="50%" stopColor={color1} stopOpacity="0.25" />
            <stop offset="100%" stopColor={color2} stopOpacity="0.1" />
          </linearGradient>
        </defs>
        <path
          d="M0,100 C360,200 720,0 1080,150 C1260,225 1380,100 1440,120 L1440,0 L0,0 Z"
          fill="url(#ribbon-grad-1)"
          className="animate-ribbon-1"
        />
        <path
          d="M0,200 C480,100 840,280 1200,180 C1320,146 1400,200 1440,180 L1440,400 L0,400 Z"
          fill="url(#ribbon-grad-2)"
          className="animate-ribbon-2"
        />
      </svg>
    </div>
  );
}
