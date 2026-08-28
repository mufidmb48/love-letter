import React from 'react';
import { motion } from 'motion/react';
import { Heart, Sparkles } from 'lucide-react';
import { loveConfig } from '../data/loveConfig';
import confetti from 'canvas-confetti';

interface LoveHeroProps {
  onOpen: () => void;
}

export const LoveHero: React.FC<LoveHeroProps> = ({ onOpen }) => {
  const handleOpenClick = () => {
    // Trigger sweet heart-shaped & rose confetti
    try {
      confetti({
        particleCount: 40,
        spread: 60,
        origin: { y: 0.65 },
        colors: ['#f43f5e', '#fda4af', '#f472b6', '#fbbf24', '#fbcfe8'],
        shapes: ['circle'],
        scalar: 1.2,
      });
    } catch {
      // safe fallback
    }

    onOpen();
  };

  return (
    <motion.section 
      id="love-hero-section"
      className="relative flex flex-col items-center justify-center min-h-[90vh] px-4 text-center z-10 max-w-2xl mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20, scale: 0.96 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Decorative Top Heart Badge */}
      <motion.div
        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-100/70 border border-rose-200/80 text-rose-800 text-sm font-medium mb-8 shadow-xs"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2, duration: 0.6 }}
      >
        <Sparkles className="w-3.5 h-3.5 text-rose-500" />
        <span>{loveConfig.opening.eyebrow}</span>
        <Sparkles className="w-3.5 h-3.5 text-rose-500" />
      </motion.div>

      {/* Main Headline */}
      <motion.h1
        id="hero-main-title"
        className="font-serif text-4xl sm:text-5xl md:text-6xl text-rose-950 font-normal tracking-tight leading-[1.15] mb-6"
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35, duration: 0.7 }}
      >
        {loveConfig.opening.title}
      </motion.h1>

      {/* Subtitle */}
      <motion.p
        className="text-base sm:text-lg text-rose-900/80 max-w-lg mx-auto mb-10 leading-relaxed font-light"
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.7 }}
      >
        {loveConfig.opening.subtitle}
      </motion.p>

      {/* Interactive Button */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.65, duration: 0.6 }}
      >
        <motion.button
          id="open-heart-btn"
          onClick={handleOpenClick}
          whileHover={{ scale: 1.04, boxShadow: "0 15px 30px -5px rgba(244, 63, 94, 0.35)" }}
          whileTap={{ scale: 0.96 }}
          className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 text-base sm:text-lg font-medium text-white bg-gradient-to-r from-rose-500 via-rose-600 to-pink-600 rounded-full shadow-lg shadow-rose-500/25 transition-all duration-300 cursor-pointer overflow-hidden border border-rose-400/40"
        >
          {/* Subtle button sheen */}
          <span 
            aria-hidden="true"
            className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out"
          />
          
          <span>{loveConfig.opening.button}</span>
          <Heart className="w-5 h-5 text-rose-100 fill-rose-100 group-hover:scale-125 transition-transform duration-300" />
        </motion.button>
      </motion.div>

      {/* Delicate recipient tag */}
      <motion.div
        className="mt-12 text-xs uppercase tracking-widest text-rose-700/60 font-medium"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9, duration: 0.8 }}
      >
        Written with pure affection for {loveConfig.recipientName}
      </motion.div>
    </motion.section>
  );
};
