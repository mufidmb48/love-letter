import React, { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { FloatingHearts } from './components/FloatingHearts';
import { RomanticBackground } from './components/RomanticBackground';
import { LoveHero } from './components/LoveHero';
import { Envelope } from './components/Envelope';
import { LoveLetter } from './components/LoveLetter';
import { FinalLetter } from './components/FinalLetter';
import { SealedLetter } from './components/SealedLetter';

type ExperienceStage = 'hero' | 'envelope' | 'letter' | 'final' | 'sealed';

export default function App() {
  const [stage, setStage] = useState<ExperienceStage>('hero');

  // Handle stage transitions
  const handleOpenHero = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setStage('envelope');
  };

  const handleEnvelopeOpened = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setStage('letter');
  };

  const handleProceedToFinal = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setStage('final');
  };

  const handleSealLetter = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setStage('sealed');
  };

  const handleRestart = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setStage('hero');
  };

  return (
    <main 
      id="love-letter-app"
      className="relative min-h-screen w-full flex flex-col justify-between overflow-x-hidden selection:bg-rose-200 selection:text-rose-950 font-sans"
    >
      {/* Dreamy Ambient Background & Floating Particles */}
      <RomanticBackground />
      <FloatingHearts />

      {/* Main Content Router with Smooth Fade & Scale Transitions */}
      <div className="flex-1 flex flex-col items-center justify-center w-full px-4 py-8 sm:py-12 z-10">
        <AnimatePresence mode="wait">
          {stage === 'hero' && (
            <motion.div
              key="stage-hero"
              className="w-full flex items-center justify-center"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.5 }}
            >
              <LoveHero onOpen={handleOpenHero} />
            </motion.div>
          )}

          {stage === 'envelope' && (
            <motion.div
              key="stage-envelope"
              className="w-full flex items-center justify-center"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.6 }}
            >
              <Envelope onEnvelopeOpened={handleEnvelopeOpened} />
            </motion.div>
          )}

          {stage === 'letter' && (
            <motion.div
              key="stage-letter"
              className="w-full flex flex-col items-center"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.7 }}
            >
              <LoveLetter onProceedToFinal={handleProceedToFinal} />
            </motion.div>
          )}

          {stage === 'final' && (
            <motion.div
              key="stage-final"
              className="w-full flex items-center justify-center"
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.6 }}
            >
              <FinalLetter onSealLetter={handleSealLetter} />
            </motion.div>
          )}

          {stage === 'sealed' && (
            <motion.div
              key="stage-sealed"
              className="w-full flex items-center justify-center"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.7 }}
            >
              <SealedLetter onRestart={handleRestart} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Subtle Intimate Footer (Clean, No Business CTA, No Crown/Princess) */}
      <footer className="w-full py-4 text-center text-xs text-rose-800/40 tracking-wider font-light z-10 pointer-events-none">
        <span>A private digital love letter • Forever yours</span>
      </footer>
    </main>
  );
}
