import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import { Heart, RotateCcw, Sparkles, Send, ShieldCheck } from 'lucide-react';
import { loveConfig } from '../data/loveConfig';
import confetti from 'canvas-confetti';

interface SealedLetterProps {
  onRestart: () => void;
}

export const SealedLetter: React.FC<SealedLetterProps> = ({ onRestart }) => {
  useEffect(() => {
    // Gentle floating celebratory heart shower
    const duration = 2.5 * 1000;
    const end = Date.now() + duration;

    const frame = () => {
      try {
        confetti({
          particleCount: 2,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors: ['#f43f5e', '#fda4af', '#f472b6', '#fbbf24'],
        });
        confetti({
          particleCount: 2,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors: ['#f43f5e', '#fda4af', '#f472b6', '#fbbf24'],
        });

        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      } catch {
        // safe
      }
    };

    frame();
  }, []);

  return (
    <motion.div
      id="sealed-final-screen"
      initial={{ opacity: 0, scale: 0.92 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      className="relative flex flex-col items-center justify-center min-h-[90vh] px-4 py-8 max-w-xl mx-auto text-center z-10"
    >
      {/* Decorative Wax Seal Icon */}
      <motion.div
        initial={{ scale: 0, rotate: -20 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ delay: 0.2, type: 'spring', damping: 12 }}
        className="relative mb-8"
      >
        <div className="flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-tr from-rose-700 via-rose-600 to-rose-500 text-white shadow-2xl shadow-rose-600/30 border-2 border-rose-300/60 ring-8 ring-rose-200/50">
          <Heart className="w-12 h-12 fill-rose-100 text-rose-100" />
        </div>
        {/* Little badge */}
        <div className="absolute -bottom-2 inset-x-0 flex justify-center">
          <span className="inline-flex items-center gap-1 px-3 py-0.5 rounded-full bg-amber-100 border border-amber-300 text-[11px] font-semibold text-amber-900 shadow-xs">
            <ShieldCheck className="w-3 h-3 text-amber-700" />
            <span>Sealed</span>
          </span>
        </div>
      </motion.div>

      {/* Main Emotion Headline */}
      <motion.h1
        className="font-serif text-4xl sm:text-5xl text-rose-950 font-normal mb-4"
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35 }}
      >
        {loveConfig.sealedScreen.title}
      </motion.h1>

      {/* Appreciation Message */}
      <motion.p
        className="text-lg sm:text-xl text-rose-900/90 font-light leading-relaxed mb-6 max-w-md mx-auto"
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        "{loveConfig.sealedScreen.appreciation}"
      </motion.p>

      {/* Sweet Dedication Card */}
      <motion.div
        className="w-full bg-[#fffdfa]/95 backdrop-blur-md rounded-2xl p-6 border border-rose-200/70 shadow-lg shadow-rose-950/5 mb-8"
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.65 }}
      >
        <div className="flex items-center justify-center gap-2 text-rose-400 mb-2">
          <Sparkles className="w-4 h-4" />
          <span className="text-xs uppercase tracking-widest font-semibold text-rose-600">
            Eternal Keepsake
          </span>
          <Sparkles className="w-4 h-4" />
        </div>

        <p className="font-handwriting text-2xl sm:text-3xl text-rose-800 font-semibold mb-2">
          Forever dedicated to {loveConfig.recipientName}
        </p>

        <p className="text-xs text-rose-700/70">
          Made with all my love, by <span className="font-medium text-rose-900">{loveConfig.senderName}</span>
        </p>
      </motion.div>

      {/* Restart Button */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.85 }}
      >
        <motion.button
          id="read-again-btn"
          onClick={onRestart}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-white text-rose-800 border-2 border-rose-200/80 hover:bg-rose-50 hover:border-rose-300 font-medium text-sm sm:text-base shadow-md shadow-rose-950/5 transition-all cursor-pointer"
        >
          <RotateCcw className="w-4 h-4 text-rose-500" />
          <span>{loveConfig.sealedScreen.restartButton}</span>
        </motion.button>
      </motion.div>
    </motion.div>
  );
};
