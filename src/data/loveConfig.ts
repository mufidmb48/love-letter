import { LoveLetterConfig } from '../types';

export const loveConfig: LoveLetterConfig = {
  senderName: "Mufid",
  recipientName: "Tata",
  nickname: "My Starshine",
  specialDate: "Always & Forever",

  opening: {
    eyebrow: "A little something for you...",
    title: "I wrote you a love letter. 💌",
    subtitle: "Because some feelings are better written than spoken.",
    button: "Open My Heart ❤️",
  },

  letter: {
    greeting: "My Dearest,",
    paragraphs: [
      {
        text: "You came into my life quietly, but somehow you became one of the most beautiful parts of it. In a world that moves so fast, having you by my side makes everything feel gentle, warm, and meaningful.",
        highlights: ["one of the most beautiful parts of it", "gentle, warm, and meaningful"]
      },
      {
        text: "I love the way you laugh at the smallest jokes, the way your eyes sparkle when you talk about things you care about, and how effortlessly you bring comfort into my heart on even the heaviest days.",
        highlights: ["effortlessly you bring comfort", "my heart"]
      },
      {
        text: "Every conversation with you feels like a place I never want to leave. Thank you for being my favorite person to talk to, my happiest thought, and the sweetest surprise life has ever given me.",
        highlights: ["my favorite person", "sweetest surprise"]
      }
    ],
    closing: "Forever yours,",
    postscript: "P.S. You make every ordinary day feel like poetry."
  },

  finalMessage: {
    eyebrow: "One Last Thing...",
    title: "If I could write one thing forever...",
    quote: "«If I could keep one feeling forever, it would be the feeling of having you in my life.»",
    personalNote: "No matter where life leads or how the seasons turn, my heart will always choose you.",
    affirmation: "You are loved. More than you know. ❤️",
    closing: "Forever yours,"
  },

  sealedScreen: {
    title: "For You, Always. ❤️",
    subtitle: "A digital keepsake sealed in time.",
    appreciation: "Thank you for being one of the most beautiful parts of my story.",
    signatureNote: "Made with love for you",
    restartButton: "Read It Again 💌"
  }
};
