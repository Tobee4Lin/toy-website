'use client';

/**
 * Aurora — CSS-based animated aurora gradient background
 * Inspired by React Bits Aurora component.
 * Uses pure CSS animations (no WebGL) for performance.
 */
export default function Aurora({
  colorStops = ['#071A2D', '#1565FF', '#FF7A00'],
  speed = 0.5,
  className = '',
}: {
  colorStops?: string[];
  speed?: number;
  className?: string;
}) {
  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
      {/* Animated blobs */}
      <div
        className="absolute -left-[20%] top-[-20%] h-[80%] w-[80%] rounded-full opacity-30 blur-[100px] animate-aurora-1"
        style={{
          background: colorStops[1] || '#1565FF',
          animationDuration: `${20 / speed}s`,
        }}
      />
      <div
        className="absolute right-[-10%] top-[20%] h-[60%] w-[60%] rounded-full opacity-25 blur-[100px] animate-aurora-2"
        style={{
          background: colorStops[2] || '#FF7A00',
          animationDuration: `${25 / speed}s`,
        }}
      />
      <div
        className="absolute bottom-[-20%] left-[20%] h-[70%] w-[70%] rounded-full opacity-20 blur-[100px] animate-aurora-3"
        style={{
          background: colorStops[0] || '#071A2D',
          animationDuration: `${30 / speed}s`,
        }}
      />
    </div>
  );
}
