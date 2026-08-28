import React, { useMemo } from 'react';
import { motion } from 'motion/react';

interface Particle {
  id: number;
  x: number;
  size: number;
  duration: number;
  delay: number;
  opacity: number;
  type: 'heart' | 'sparkle' | 'circle';
  color: string;
}

export const FloatingHearts: React.FC = () => {
  const particles: Particle[] = useMemo(() => {
    const colors = ['#f43f5e', '#fb7185', '#fda4af', '#f472b6', '#fbcfe8', '#e879f9', '#fbbf24'];
    const types: Array<'heart' | 'sparkle' | 'circle'> = ['heart', 'heart', 'sparkle', 'circle'];

    return Array.from({ length: 24 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100, // percentage across screen
      size: Math.random() * 14 + 10,
      duration: Math.random() * 12 + 10,
      delay: Math.random() * 8,
      opacity: Math.random() * 0.4 + 0.2,
      type: types[i % types.length],
      color: colors[i % colors.length]
    }));
  }, []);

  return (
    <div 
      aria-hidden="true" 
      className="fixed inset-0 pointer-events-none overflow-hidden z-0"
    >
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute"
          style={{
            left: `${p.x}%`,
            bottom: '-40px',
            color: p.color,
            fontSize: `${p.size}px`,
          }}
          initial={{ y: 0, opacity: 0, scale: 0.6 }}
          animate={{
            y: [0, -window.innerHeight - 100],
            opacity: [0, p.opacity, p.opacity, 0],
            x: [0, Math.sin(p.id) * 30, -Math.sin(p.id) * 25, 0],
            rotate: [0, (p.id % 2 === 0 ? 1 : -1) * 45, 0],
            scale: [0.8, 1.1, 0.9],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: 'easeInOut',
          }}
        >
          {p.type === 'heart' && (
            <span>♥</span>
          )}
          {p.type === 'sparkle' && (
            <span>✦</span>
          )}
          {p.type === 'circle' && (
            <div 
              className="rounded-full blur-[1px]"
              style={{
                width: `${p.size * 0.5}px`,
                height: `${p.size * 0.5}px`,
                backgroundColor: p.color,
                opacity: 0.6
              }} 
            />
          )}
        </motion.div>
      ))}
    </div>
  );
};
