'use client';

/**
 * ShapeGrid — animated geometric shape grid
 * Inspired by React Bits Shape Grid.
 */
export default function ShapeGrid({
  color = '#1565FF',
  className = '',
}: {
  color?: string;
  className?: string;
}) {
  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
      {/* Hexagon-style grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage: `
            linear-gradient(30deg, ${color} 12%, transparent 12.5%, transparent 87%, ${color} 87%, ${color}),
            linear-gradient(150deg, ${color} 12%, transparent 12.5%, transparent 87%, ${color} 87%, ${color}),
            linear-gradient(30deg, ${color} 12%, transparent 12.5%, transparent 87%, ${color} 87%, ${color}),
            linear-gradient(150deg, ${color} 12%, transparent 12.5%, transparent 87%, ${color} 87%, ${color}),
            linear-gradient(60deg, ${color} 25%, transparent 25.5%, transparent 75%, ${color} 75%, ${color}),
            linear-gradient(120deg, ${color} 25%, transparent 25.5%, transparent 75%, ${color} 75%, ${color})
          `,
          backgroundSize: '80px 140px',
          backgroundPosition: '0 0, 0 0, 40px 70px, 40px 70px, 0 0, 40px 70px',
        }}
      />
    </div>
  );
}
