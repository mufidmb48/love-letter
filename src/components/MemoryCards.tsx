import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Heart, Sparkles, CheckCircle2, ArrowRight, RotateCw } from 'lucide-react';
import { memories } from '../data/memories';
import confetti from 'canvas-confetti';

interface MemoryCardsProps {
  onAllMemoriesUnlocked: () => void;
}

export const MemoryCards: React.FC<MemoryCardsProps> = ({ onAllMemoriesUnlocked }) => {
  const [flippedCards, setFlippedCards] = useState<Record<number, boolean>>({});
  const [hasCelebrated, setHasCelebrated] = useState(false);

  const totalCards = memories.length;
  const openedCount = Object.values(flippedCards).filter(Boolean).length;
  const isAllOpened = openedCount === totalCards;

  const toggleCard = (id: number) => {
    setFlippedCards((prev) => {
      const next = { ...prev, [id]: !prev[id] };
      const nextCount = Object.values(next).filter(Boolean).length;

      // When reaching 100% for the first time, celebrate
      if (nextCount === totalCards && !hasCelebrated) {
        setHasCelebrated(true);
        try {
          confetti({
            particleCount: 50,
            spread: 70,
            origin: { y: 0.7 },
            colors: ['#f43f5e', '#fda4af', '#f472b6', '#fbbf24'],
          });
        } catch {
          // safe
        }
      }

      return next;
    });
  };

  return (
    <section 
      id="memories-section"
      className="w-full max-w-4xl mx-auto my-16 px-4"
    >
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-rose-100/80 text-rose-800 text-xs font-semibold tracking-wider uppercase mb-2.5">
          <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
          <span>Our Little Memories</span>
        </div>
        <h3 className="font-serif text-3xl sm:text-4xl text-rose-950 font-normal">
          Moments I Hold Dear 💕
        </h3>
        <p className="text-sm text-rose-900/70 mt-1 max-w-md mx-auto font-light">
          A few little things I love about us. Tap each card to uncover the memory inside.
        </p>

        {/* Progress Tracker Bar */}
        <div className="mt-6 max-w-xs mx-auto">
          <div className="flex items-center justify-between text-xs font-medium text-rose-800/80 mb-1.5">
            <span>Discovered Memories</span>
            <span className="flex items-center gap-1">
              {openedCount} of {totalCards}
              {isAllOpened && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 inline" />}
            </span>
          </div>
          <div className="w-full h-2 bg-rose-200/50 rounded-full overflow-hidden p-0.5 border border-rose-200">
            <motion.div
              className="h-full bg-gradient-to-r from-rose-500 to-pink-500 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${(openedCount / totalCards) * 100}%` }}
              transition={{ duration: 0.4 }}
            />
          </div>
        </div>
      </div>

      {/* Responsive Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 max-w-2xl mx-auto">
        {memories.map((card) => {
          const isFlipped = !!flippedCards[card.id];

          return (
            <div
              key={card.id}
              className="perspective-1000 h-[340px] sm:h-[360px] w-full"
            >
              <motion.div
                id={`memory-card-${card.id}`}
                role="button"
                tabIndex={0}
                aria-label={`Memory card: ${card.title}. ${isFlipped ? 'Showing message' : 'Tap to reveal'}`}
                onClick={() => toggleCard(card.id)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    toggleCard(card.id);
                  }
                }}
                className="relative w-full h-full transform-style-3d cursor-pointer select-none rounded-3xl"
                animate={{ rotateY: isFlipped ? 180 : 0 }}
                transition={{ duration: 0.65, ease: [0.4, 0, 0.2, 1] }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {/* FRONT OF CARD */}
                <div className="absolute inset-0 backface-hidden bg-[#fffdfa] rounded-3xl p-5 border border-rose-200/80 shadow-lg shadow-rose-950/5 flex flex-col justify-between overflow-hidden">
                  {/* Card Image */}
                  <div className="relative w-full h-44 rounded-2xl overflow-hidden bg-gradient-to-br from-rose-100/80 to-pink-50 border border-rose-100 flex items-center justify-center">
                    <img
                      src={card.image}
                      alt={card.title}
                      className="w-full h-full object-cover"
                      loading="lazy"
                      referrerPolicy="no-referrer"
                    />
                    {/* Badge */}
                    <div className="absolute top-2.5 left-2.5 px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-xs text-[11px] font-semibold text-rose-800 shadow-xs">
                      {card.tag || `Memory 0${card.id}`}
                    </div>
                    {/* Heart badge */}
                    <div className="absolute top-2.5 right-2.5 w-7 h-7 rounded-full bg-rose-500/90 backdrop-blur-xs text-white flex items-center justify-center shadow-xs">
                      <Heart className="w-3.5 h-3.5 fill-white" />
                    </div>
                  </div>

                  {/* Title & Prompt */}
                  <div className="pt-2">
                    <h4 className="font-serif text-xl text-rose-950 font-medium">
                      {card.title}
                    </h4>
                    {card.date && (
                      <p className="text-xs text-rose-800/60 font-light mt-0.5">{card.date}</p>
                    )}
                  </div>

                  {/* Flip Prompt Footer */}
                  <div className="pt-2 border-t border-rose-100 flex items-center justify-between text-xs text-rose-600/80 font-medium">
                    <span className="flex items-center gap-1">
                      <Sparkles className="w-3 h-3 text-rose-400" />
                      <span>Tap to read memory</span>
                    </span>
                    <RotateCw className="w-3.5 h-3.5 text-rose-400" />
                  </div>
                </div>

                {/* BACK OF CARD (Flipped 180 deg) */}
                <div className="absolute inset-0 backface-hidden rotate-y-180 bg-gradient-to-br from-[#fff7f9] to-[#ffeef2] rounded-3xl p-6 border-2 border-rose-300/70 shadow-xl shadow-rose-950/10 flex flex-col justify-between">
                  <div>
                    {/* Top Tag */}
                    <div className="flex items-center justify-between border-b border-rose-200/60 pb-3 mb-4">
                      <span className="text-xs font-semibold uppercase tracking-wider text-rose-600">
                        {card.title}
                      </span>
                      <Heart className="w-4 h-4 text-rose-500 fill-rose-500" />
                    </div>

                    {/* Romantic Message */}
                    <p className="text-sm sm:text-base text-rose-950/90 leading-relaxed font-light">
                      "{card.message}"
                    </p>
                  </div>

                  {/* Bottom Highlight Quote */}
                  <div className="pt-3 border-t border-rose-200/60">
                    <p className="font-handwriting text-lg text-rose-700 font-semibold">
                      {card.highlight}
                    </p>
                    <p className="text-[10px] text-rose-400 text-right mt-1">Tap to flip back</p>
                  </div>
                </div>
              </motion.div>
            </div>
          );
        })}
      </div>

      {/* 100% Unlocked Action Button */}
      {isAllOpened && (
        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.button
            id="read-one-more-thing-btn"
            onClick={onAllMemoriesUnlocked}
            whileHover={{ scale: 1.05, boxShadow: "0 15px 30px -5px rgba(244, 63, 94, 0.35)" }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-3 px-8 py-4 text-base font-medium text-white bg-gradient-to-r from-rose-500 via-rose-600 to-pink-600 rounded-full shadow-lg shadow-rose-500/25 border border-rose-400/40 cursor-pointer"
          >
            <span>Read One More Thing 💌</span>
            <ArrowRight className="w-5 h-5 text-rose-100" />
          </motion.button>
          <p className="text-xs text-rose-800/60 mt-2 font-light">
            You've unlocked every memory. There is one last message for you.
          </p>
        </motion.div>
      )}
    </section>
  );
};
