import { Memory } from '../types';
import smileImg from '../assets/images/cute_couple_smile_1787941816591.jpg';
import coffeeImg from '../assets/images/cute_couple_coffee_1787941831850.jpg';
import stargazingImg from '../assets/images/cute_couple_stargazing_1787941844492.jpg';
import futureImg from '../assets/images/cute_couple_future_1787941858785.jpg';

export const memories: Memory[] = [
  {
    id: 1,
    image: smileImg,
    tag: "Memory 01",
    title: "The Way You Smile",
    date: "A moment I cherish",
    message: "Your smile somehow turns the simplest days into cherished memories. It radiates warmth that effortlessly softens any worry I carry.",
    highlight: "Your smile lights up my whole world."
  },
  {
    id: 2,
    image: coffeeImg,
    tag: "Memory 02",
    title: "The Little Things You Do",
    date: "In the quiet moments",
    message: "From how you tell stories with excitement to your gentle kindness towards everyone around you—it's the little details about you that I adore most.",
    highlight: "You make ordinary moments extraordinary."
  },
  {
    id: 3,
    image: stargazingImg,
    tag: "Memory 03",
    title: "Our Long Conversations",
    date: "Late night reflections",
    message: "Talking with you is my favorite time of the day. Hours feel like minutes when we share our dreams, laughter, and deepest thoughts together.",
    highlight: "Every word with you feels like home."
  },
  {
    id: 4,
    image: futureImg,
    tag: "Memory 04",
    title: "A Future With You",
    date: "Today & tomorrow",
    message: "Looking forward, the sweetest picture of tomorrow is one where I get to continue walking by your side, holding your hand, and cheering you on.",
    highlight: "My favorite journey is the one with you."
  }
];

