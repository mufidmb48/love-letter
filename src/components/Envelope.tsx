import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, Sparkles } from 'lucide-react';
import { loveConfig } from '../data/loveConfig';
import confetti from 'canvas-confetti';

interface EnvelopeProps {
  onEnvelopeOpened: () => void;
}

export const Envelope: React.FC<EnvelopeProps> = ({ onEnvelopeOpened }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpening, setIsOpening] = useState(false);

  const handleOpen = () => {
    if (isOpening || isOpen) return;
    setIsOpening(true);

    try {
      confetti({
        particleCount: 30,
        spread: 50,
        origin: { y: 0.6 },
        colors: ['#fda4af', '#f43f5e', '#fbcfe8', '#fbbf24'],
        scalar: 1,
      });
    } catch {
      // fallback
    }

    // Sequence the flap open, letter slide-up, and next stage
    setTimeout(() => {
      setIsOpen(true);
    }, 400);

    setTimeout(() => {
      onEnvelopeOpened();
    }, 1800);
  };

  return (
    <div 
      id="envelope-wrapper"
      className="flex flex-col items-center justify-center min-h-[85vh] px-4 py-8 max-w-lg mx-auto text-center"
    >
      {/* Header Info */}
      <motion.div
        className="mb-8"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-100/80 text-rose-700 text-xs tracking-wider uppercase font-semibold mb-3">
          <Sparkles className="w-3 h-3 text-rose-500" />
          <span>A letter, just for you</span>
        </div>
        <h2 className="font-serif text-2xl sm:text-3xl text-rose-950 font-normal">
          For {loveConfig.recipientName}
        </h2>
        <p className="text-sm text-rose-900/70 mt-1 font-light">
          {isOpen ? "Unfolding your letter..." : "Tap the envelope to break the seal & open it"}
        </p>
      </motion.div>

      {/* 3D Envelope Container */}
      <motion.div
        id="interactive-envelope"
        role="button"
        tabIndex={0}
        aria-label="Tap to open the love letter envelope"
        onClick={handleOpen}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleOpen();
          }
        }}
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        whileHover={!isOpening ? { scale: 1.02, y: -4 } : {}}
        transition={{ duration: 0.6 }}
        className={`relative w-full max-w-[340px] sm:max-w-[400px] h-[220px] sm:h-[250px] cursor-pointer select-none perspective-1000 ${
          isOpening ? 'pointer-events-none' : ''
        }`}
      >
        {/* Ambient shadow glow */}
        <div className="absolute inset-x-4 -bottom-6 h-10 bg-rose-950/15 rounded-full blur-xl transform scale-90" />

        {/* Envelope Backing Base */}
        <div className="absolute inset-0 bg-[#e8a5b2] rounded-2xl shadow-xl overflow-hidden border border-rose-300/40">
          {/* Inner envelope pattern lining */}
          <div className="absolute inset-0 bg-gradient-to-br from-rose-100 to-pink-200 opacity-90" />
        </div>

        {/* The Letter preview sliding out */}
        <motion.div
          id="sliding-letter-preview"
          className="absolute inset-x-4 top-2 bg-[#fffdfa] rounded-xl p-5 shadow-md border border-rose-100 flex flex-col justify-between"
          initial={{ y: 0, height: '90%' }}
          animate={
            isOpen
              ? { y: -120, scale: 1.03, opacity: 1 }
              : { y: 0, opacity: 0.9 }
          }
          transition={{ duration: 1.0, ease: [0.34, 1.56, 0.64, 1] }}
        >
          <div className="flex items-center justify-between border-b border-rose-100 pb-2">
            <span className="font-handwriting text-xl text-rose-700 font-semibold">
              {loveConfig.letter.greeting}
            </span>
            <Heart className="w-4 h-4 text-rose-400 fill-rose-300" />
          </div>

          <div className="space-y-2 py-2">
            <div className="h-2 bg-rose-100/70 rounded-full w-full" />
            <div className="h-2 bg-rose-100/70 rounded-full w-5/6" />
            <div className="h-2 bg-rose-100/70 rounded-full w-4/6" />
          </div>

          <div className="text-right">
            <span className="font-handwriting text-base text-rose-600">
              {loveConfig.letter.closing}
            </span>
          </div>
        </motion.div>

        {/* Envelope Side Flaps (HTML/CSS Geometry) */}
        <div 
          className="absolute inset-0 pointer-events-none rounded-2xl overflow-hidden"
          style={{ zIndex: 10 }}
        >
          {/* Left triangle flap */}
          <div 
            className="absolute left-0 bottom-0 top-0 w-1/2 bg-gradient-to-r from-[#f8bcc8] to-[#f4abb9] origin-bottom-left shadow-sm"
            style={{
              clipPath: 'polygon(0 0, 0 100%, 100% 100%)'
            }}
          />
          {/* Right triangle flap */}
          <div 
            className="absolute right-0 bottom-0 top-0 w-1/2 bg-gradient-to-l from-[#f8bcc8] to-[#f4abb9] origin-bottom-right shadow-sm"
            style={{
              clipPath: 'polygon(100% 0, 0 100%, 100% 100%)'
            }}
          />
          {/* Bottom triangle flap */}
          <div 
            className="absolute bottom-0 inset-x-0 h-3/5 bg-gradient-to-t from-[#f19fb0] to-[#f6b7c4] shadow-md border-b border-rose-300/30"
            style={{
              clipPath: 'polygon(0 100%, 100% 100%, 50% 15%)'
            }}
          />
        </div>

        {/* Envelope Top Flap (Animated opening with 3D rotateX) */}
        <motion.div
          id="envelope-top-flap"
          className="absolute top-0 inset-x-0 h-3/5 origin-top pointer-events-none"
          style={{ zIndex: isOpen ? 5 : 20 }}
          initial={{ rotateX: 0 }}
          animate={{ rotateX: isOpen || isOpening ? -180 : 0 }}
          transition={{ duration: 0.75, ease: [0.4, 0, 0.2, 1] }}
        >
          <div 
            className="w-full h-full bg-gradient-to-b from-[#f8bcc8] to-[#f09caf] shadow-md rounded-t-2xl"
            style={{
              clipPath: 'polygon(0 0, 100% 0, 50% 100%)'
            }}
          />
        </motion.div>

        {/* Wax Heart Seal (Disappears / breaks on click) */}
        <AnimatePresence>
          {!isOpen && (
            <motion.div
              id="wax-heart-seal"
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none flex items-center justify-center"
              style={{ zIndex: 30 }}
              exit={{ scale: 1.4, opacity: 0, rotate: 15 }}
              transition={{ duration: 0.35 }}
            >
              <div className="relative flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-tr from-rose-700 via-rose-600 to-rose-500 shadow-lg border border-rose-300/60 ring-4 ring-rose-300/30">
                <Heart className="w-7 h-7 text-rose-100 fill-rose-100 drop-shadow-xs" />
                {/* Gold ring accent */}
                <div className="absolute inset-0.5 rounded-full border border-amber-300/40" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Tap Instruction Indicator */}
      <motion.div
        className="mt-8 flex items-center gap-2 text-xs font-medium text-rose-700/80 tracking-wide"
        animate={{ y: [0, 4, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      >
        <span className="w-1.5 h-1.5 rounded-full bg-rose-400" />
        <span>{isOpening ? "Opening envelope..." : "Click or tap the envelope to open"}</span>
        <span className="w-1.5 h-1.5 rounded-full bg-rose-400" />
      </motion.div>
    </div>
  );
};
