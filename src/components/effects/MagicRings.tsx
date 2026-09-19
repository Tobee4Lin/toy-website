'use client';

import { motion } from 'framer-motion';

/**
 * MagicRings — rotating concentric rings
 * Inspired by React Bits Magic Rings.
 */
export default function MagicRings({
  color = '#1565FF',
  size = 200,
  className = '',
}: {
  color?: string;
  size?: number;
  className?: string;
}) {
  return (
    <div
      className={`pointer-events-none absolute flex items-center justify-center ${className}`}
      style={{ width: size, height: size }}
    >
      {[0, 1, 2, 3].map((i) => (
        <motion.div
          key={i}
          className="absolute rounded-full border"
          style={{
            width: size - i * 45,
            height: size - i * 45,
            borderColor: color,
            borderWidth: 1,
            opacity: 0.15 - i * 0.03,
            borderStyle: i % 2 === 0 ? 'solid' : 'dashed',
          }}
          animate={{ rotate: 360 }}
          transition={{
            duration: 20 + i * 8,
            repeat: Infinity,
            ease: 'linear',
            delay: i * -5,
          }}
        />
      ))}
      {/* Center dot */}
      <div
        className="absolute rounded-full"
        style={{
          width: 8,
          height: 8,
          backgroundColor: color,
          opacity: 0.6,
        }}
      />
    </div>
  );
}
