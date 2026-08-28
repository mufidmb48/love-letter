import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Heart, Sparkles, ScrollText, Calendar } from 'lucide-react';
import { loveConfig } from '../data/loveConfig';
import { TypewriterParagraph } from './TypewriterText';
import { MusicPlayer } from './MusicPlayer';
import { MemoryCards } from './MemoryCards';

interface LoveLetterProps {
  onProceedToFinal: () => void;
}

export const LoveLetter: React.FC<LoveLetterProps> = ({ onProceedToFinal }) => {
  const [activeParagraphIndex, setActiveParagraphIndex] = useState(0);

  return (
    <motion.div
      id="love-letter-story-container"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      className="w-full flex flex-col items-center z-10 py-6"
    >
      {/* The Romantic Letter Parchment */}
      <section 
        id="main-love-letter-paper"
        className="relative w-full max-w-2xl mx-auto px-4"
      >
        <div className="relative bg-[#fffdfa] rounded-3xl p-7 sm:p-12 shadow-2xl shadow-rose-950/10 border border-rose-200/90 paper-texture overflow-hidden">
          {/* Subtle Vintage Postmark Stamp in Top-Right */}
          <div className="absolute top-6 right-6 hidden sm:flex flex-col items-center justify-center w-20 h-20 rounded-full border-2 border-rose-300/60 rotate-12 pointer-events-none select-none text-rose-400">
            <Heart className="w-5 h-5 fill-rose-300/40 text-rose-400" />
            <span className="text-[9px] font-mono uppercase tracking-widest mt-1 text-rose-500/70 font-semibold">Special Mail</span>
            <span className="text-[8px] font-mono text-rose-400/60">Air Mail</span>
          </div>

          {/* Letter Date & Tag Header */}
          <div className="flex items-center gap-2 text-xs text-rose-800/70 mb-8 border-b border-rose-100 pb-4">
            <Calendar className="w-3.5 h-3.5 text-rose-500" />
            <span className="font-medium tracking-wide">{loveConfig.specialDate || "Today & Always"}</span>
            <span className="mx-2 text-rose-300">•</span>
            <span className="italic text-rose-600">Personal Love Letter</span>
          </div>

          {/* Greeting */}
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-6"
          >
            <h2 className="font-serif text-3xl sm:text-4xl text-rose-950 font-normal flex items-center gap-2">
              <span>{loveConfig.letter.greeting}</span>
              <Heart className="w-6 h-6 text-rose-500 fill-rose-400 inline" />
            </h2>
            <div className="font-handwriting text-2xl text-rose-700 mt-1">
              For my beloved {loveConfig.recipientName} ({loveConfig.nickname})
            </div>
          </motion.div>

          {/* Body Paragraphs with Typewriter Flow */}
          <div className="space-y-6 my-8">
            {loveConfig.letter.paragraphs.map((p, idx) => (
              <TypewriterParagraph
                key={idx}
                text={p.text}
                highlights={p.highlights}
                delay={idx * 0.4}
                speed={15}
                onComplete={() => {
                  if (idx >= activeParagraphIndex) {
                    setActiveParagraphIndex(idx + 1);
                  }
                }}
              />
            ))}
          </div>

          {/* Postscript note if present */}
          {loveConfig.letter.postscript && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5, duration: 0.8 }}
              className="my-6 p-3.5 rounded-2xl bg-rose-50/70 border border-rose-100 text-xs sm:text-sm text-rose-900/80 italic font-serif"
            >
              {loveConfig.letter.postscript}
            </motion.div>
          )}

          {/* Sign-off and Handwritten Signature */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.8, duration: 0.7 }}
            className="mt-10 pt-6 border-t border-rose-100 flex flex-col items-end"
          >
            <p className="text-sm text-rose-900/70 font-light mb-1">
              {loveConfig.letter.closing}
            </p>
            <div className="font-handwriting text-3xl sm:text-4xl text-rose-700 font-semibold tracking-wide flex items-center gap-2">
              <span>{loveConfig.senderName}</span>
              <span className="text-rose-400">♥</span>
            </div>
          </motion.div>

          {/* Bottom decorative flourish */}
          <div className="mt-8 flex justify-center items-center gap-2 text-rose-300">
            <span className="w-12 h-px bg-rose-200" />
            <Sparkles className="w-4 h-4 text-rose-400" />
            <span className="w-12 h-px bg-rose-200" />
          </div>
        </div>
      </section>

      {/* Part 2: Interactive Playlist Section */}
      <MusicPlayer />

      {/* Part 3: Interactive Memories Flip Cards Section */}
      <MemoryCards onAllMemoriesUnlocked={onProceedToFinal} />
    </motion.div>
  );
};
