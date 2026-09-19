'use client';

/**
 * LineWaves — animated horizontal wave lines
 * Inspired by React Bits Line Waves.
 */
export default function LineWaves({
  color = '#1565FF',
  rows = 5,
  className = '',
}: {
  color?: string;
  rows?: number;
  className?: string;
}) {
  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
      {Array.from({ length: rows }).map((_, i) => (
        <svg
          key={i}
          className="absolute w-full"
          style={{ top: `${(i / rows) * 100}%`, height: `${100 / rows}%` }}
          viewBox="0 0 1440 100"
          preserveAspectRatio="none"
        >
          <path
            d={`M0,${50 + i * 5} Q360,${20 - i * 10} 720,${50 + i * 5} T1440,${50 + i * 5}`}
            fill="none"
            stroke={color}
            strokeWidth="1"
            opacity={0.1 - i * 0.015}
            className="animate-wave"
            style={{ animationDelay: `${i * 0.5}s` }}
          />
        </svg>
      ))}
    </div>
  );
}
