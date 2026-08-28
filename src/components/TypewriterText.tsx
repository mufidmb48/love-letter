import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';

interface TypewriterParagraphProps {
  text: string;
  highlights?: string[];
  delay?: number;
  onComplete?: () => void;
  speed?: number;
}

export const TypewriterParagraph: React.FC<TypewriterParagraphProps> = ({
  text,
  highlights = [],
  delay = 0,
  onComplete,
  speed = 20,
}) => {
  const [displayedLength, setDisplayedLength] = useState(0);
  const [isStarted, setIsStarted] = useState(false);

  useEffect(() => {
    const startTimer = setTimeout(() => {
      setIsStarted(true);
    }, delay * 1000);

    return () => clearTimeout(startTimer);
  }, [delay]);

  useEffect(() => {
    if (!isStarted) return;

    if (displayedLength < text.length) {
      const charTimer = setTimeout(() => {
        setDisplayedLength((prev) => prev + 1);
      }, speed);

      return () => clearTimeout(charTimer);
    } else if (onComplete) {
      onComplete();
    }
  }, [isStarted, displayedLength, text.length, speed, onComplete]);

  const currentText = text.slice(0, displayedLength);

  // Helper to render text with elegant highlights
  const renderHighlightedText = (content: string) => {
    if (!highlights || highlights.length === 0) {
      return content;
    }

    // Sort highlights by length descending to match longer strings first
    const sortedHighlights = [...highlights].sort((a, b) => b.length - a.length);

    let parts: Array<{ text: string; isHighlight: boolean }> = [{ text: content, isHighlight: false }];

    sortedHighlights.forEach((hl) => {
      const nextParts: Array<{ text: string; isHighlight: boolean }> = [];

      parts.forEach((part) => {
        if (part.isHighlight) {
          nextParts.push(part);
          return;
        }

        const idx = part.text.indexOf(hl);
        if (idx !== -1) {
          if (idx > 0) {
            nextParts.push({ text: part.text.substring(0, idx), isHighlight: false });
          }
          nextParts.push({ text: hl, isHighlight: true });
          const remaining = part.text.substring(idx + hl.length);
          if (remaining.length > 0) {
            nextParts.push({ text: remaining, isHighlight: false });
          }
        } else {
          nextParts.push(part);
        }
      });

      parts = nextParts;
    });

    return parts.map((part, index) => {
      if (part.isHighlight) {
        return (
          <span
            key={index}
            className="font-medium text-rose-800 bg-rose-100/60 px-1.5 py-0.5 rounded-md border-b border-rose-300/60 transition-colors"
          >
            {part.text}
          </span>
        );
      }
      return <span key={index}>{part.text}</span>;
    });
  };

  return (
    <motion.p
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: isStarted ? 1 : 0, y: isStarted ? 0 : 8 }}
      transition={{ duration: 0.5 }}
      className="text-base sm:text-lg leading-relaxed text-rose-950/90 font-light"
    >
      {renderHighlightedText(currentText)}
      {displayedLength < text.length && isStarted && (
        <span className="inline-block w-1.5 h-4 ml-1 bg-rose-400 animate-pulse align-middle" />
      )}
    </motion.p>
  );
};
