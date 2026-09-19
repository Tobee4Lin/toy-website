'use client';

/**
 * ShinyText — text with a moving shine gradient
 * Inspired by React Bits ShinyText.
 */
export default function ShinyText({
  text,
  className = '',
  speed = 4,
}: {
  text: string;
  className?: string;
  speed?: number;
}) {
  return (
    <span
      className={`inline-block shiny-text ${className}`}
      style={{
        animationDuration: `${speed}s`,
      }}
    >
      {text}
    </span>
  );
}
