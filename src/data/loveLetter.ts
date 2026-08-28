import { loveConfig } from './loveConfig';

export interface LoveLetterData {
  recipient: string;
  greeting: string;
  paragraphs: string[];
  closing: string;
  signature: string;
  date: string;
}

export const loveLetter: LoveLetterData = {
  recipient: loveConfig.recipientName,
  greeting: loveConfig.letter.greeting,
  paragraphs: [
    "You came into my life quietly, but somehow you became one of the most beautiful parts of it. In a world that moves so fast, having you by my side makes everything feel gentle, warm, and meaningful.",
    "I love the way you laugh at the smallest jokes, the way your eyes sparkle when you talk about things you care about, and how effortlessly you bring comfort into my heart on even the heaviest days.",
    "Every conversation with you feels like a place I never want to leave. Thank you for being my favorite person to talk to, my happiest thought, and the sweetest surprise life has ever given me."
  ],
  closing: loveConfig.letter.closing,
  signature: loveConfig.senderName,
  date: "Today & Always"
};
