import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Heart, Sparkles, Stamp } from 'lucide-react';
import { loveConfig } from '../data/loveConfig';
import confetti from 'canvas-confetti';

interface FinalLetterProps {
  onSealLetter: () => void;
}

export const FinalLetter: React.FC<FinalLetterProps> = ({ onSealLetter }) => {
  const [isSealing, setIsSealing] = useState(false);
  const [showStamp, setShowStamp] = useState(false);

  const handleSeal = () => {
    if (isSealing) return;
    setIsSealing(true);

    // Heart particles / kiss celebration
    try {
      confetti({
        particleCount: 60,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#e11d48', '#f43f5e', '#fb7185', '#fda4af', '#fbbf24'],
        scalar: 1.2,
      });
    } catch {
      // safe
    }

    setTimeout(() => {
      setShowStamp(true);
    }, 400);

    setTimeout(() => {
      onSealLetter();
    }, 2000);
  };

  return (
    <motion.section
      id="final-letter-section"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="relative flex flex-col items-center justify-center min-h-[85vh] px-4 py-8 max-w-2xl mx-auto text-center z-10"
    >
      {/* Top Eyebrow */}
      <motion.div
        className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-rose-100/90 text-rose-800 text-xs font-semibold tracking-wider uppercase mb-6"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Sparkles className="w-3.5 h-3.5 text-rose-500" />
        <span>{loveConfig.finalMessage.eyebrow}</span>
        <Sparkles className="w-3.5 h-3.5 text-rose-500" />
      </motion.div>

      {/* Parchment Box */}
      <div className="relative w-full bg-[#fffdfa] rounded-3xl p-8 sm:p-12 border-2 border-rose-200/90 shadow-2xl shadow-rose-950/10 paper-texture overflow-hidden">
        {/* Soft background radial shine */}
        <div className="absolute inset-0 bg-radial from-rose-100/40 via-transparent to-transparent pointer-events-none" />

        {/* Title */}
        <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl text-rose-950 font-normal mb-8 leading-tight">
          {loveConfig.finalMessage.title}
        </h2>

        {/* Quote Block */}
        <div className="my-8 px-4 py-6 rounded-2xl bg-gradient-to-r from-rose-50 via-pink-50/50 to-rose-50 border border-rose-100 shadow-inner">
          <p className="font-serif italic text-lg sm:text-2xl text-rose-900 leading-relaxed">
            {loveConfig.finalMessage.quote}
          </p>
        </div>

        {/* Personal Note & Affirmation */}
        <p className="text-base sm:text-lg text-rose-950/90 font-light leading-relaxed mb-6">
          {loveConfig.finalMessage.personalNote}
        </p>

        <div className="inline-block px-6 py-2.5 rounded-full bg-rose-100/80 text-rose-800 font-medium text-base sm:text-lg mb-8 shadow-xs border border-rose-200/60">
          {loveConfig.finalMessage.affirmation}
        </div>

        {/* Closing & Signature */}
        <div className="pt-6 border-t border-rose-100 flex flex-col items-center">
          <span className="text-sm text-rose-800/70 font-light mb-1">
            {loveConfig.finalMessage.closing}
          </span>
          <span className="font-handwriting text-3xl sm:text-4xl text-rose-700 font-semibold">
            {loveConfig.senderName}
          </span>
        </div>

        {/* Animated Stamp "SEALED WITH LOVE" */}
        {showStamp && (
          <motion.div
            id="wax-seal-stamp"
            initial={{ scale: 2.5, opacity: 0, rotate: -30 }}
            animate={{ scale: 1, opacity: 1, rotate: -12 }}
            transition={{ type: 'spring', damping: 14, stiffness: 200 }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-30"
          >
            <div className="flex flex-col items-center justify-center w-48 h-48 rounded-full border-4 border-dashed border-rose-700 bg-rose-600/90 text-white p-4 shadow-2xl backdrop-blur-xs">
              <Stamp className="w-8 h-8 text-amber-200 mb-1" />
              <span className="font-serif text-sm font-bold tracking-widest text-amber-100 uppercase">
                SEALED WITH LOVE
              </span>
              <span className="text-[10px] tracking-wider text-rose-200 font-mono mt-1">
                FOR {loveConfig.recipientName.toUpperCase()}
              </span>
              <Heart className="w-4 h-4 text-rose-200 fill-rose-200 mt-1" />
            </div>
          </motion.div>
        )}
      </div>

      {/* Seal Button Action */}
      <motion.div 
        className="mt-8"
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <motion.button
          id="seal-letter-btn"
          disabled={isSealing}
          onClick={handleSeal}
          whileHover={!isSealing ? { scale: 1.05, boxShadow: "0 15px 30px -5px rgba(244, 63, 94, 0.4)" } : {}}
          whileTap={!isSealing ? { scale: 0.95 } : {}}
          className={`inline-flex items-center gap-3 px-8 py-4 text-base sm:text-lg font-medium text-white rounded-full shadow-lg transition-all duration-300 ${
            isSealing
              ? 'bg-rose-400 cursor-not-allowed opacity-80'
              : 'bg-gradient-to-r from-rose-600 via-rose-700 to-pink-600 border border-rose-400/50 hover:border-rose-300 cursor-pointer shadow-rose-600/30'
          }`}
        >
          <Heart className={`w-5 h-5 ${isSealing ? 'animate-ping text-white' : 'fill-white'}`} />
          <span>{isSealing ? "Sealing with all my love..." : "Seal This Letter 💌"}</span>
        </motion.button>
      </motion.div>
    </motion.section>
  );
};
