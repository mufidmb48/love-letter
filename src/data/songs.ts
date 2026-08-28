import { Song } from '../types';

export const songs: Song[] = [
  {
    id: 1,
    title: "Just The Way You Are",
    artist: "Bruno Mars",
    description: "When I see your face, there's not a thing that I would change, 'cause you're amazing just the way you are.",
    image: "https://images.unsplash.com/photo-1518199266791-5375a83190b7?q=80&w=800&auto=format&fit=crop",
    audio: "/assets/music1.mp3",
    duration: "3:40",
    themeColor: "from-rose-400 to-pink-500"
  },
  {
    id: 2,
    title: "Woke Up In Love (Acoustic)",
    artist: "Kygo",
    description: "A soft acoustic melody that feels like waking up right next to you.",
    image: "https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=800&auto=format&fit=crop",
    audio: "/assets/music2.mp3",
    duration: "3:15",
    themeColor: "from-purple-400 to-rose-400"
  },
  {
    id: 3,
    title: "Beautiful in White",
    artist: "Shane Filan",
    description: "So as long as I live I'll love you, will have and hold you.",
    image: "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=800&auto=format&fit=crop",
    audio: "/assets/music3.mp3",
    duration: "3:52",
    themeColor: "from-pink-400 to-rose-500"
  },
  {
    id: 4,
    title: "Rest",
    artist: "Dean Lewis & Sasha Alex Sloan",
    description: "Finally found the place where my heart can rest peacefully—with you.",
    image: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?q=80&w=800&auto=format&fit=crop",
    audio: "/assets/music4.mp3",
    duration: "3:24",
    themeColor: "from-amber-400 to-rose-500"
  }
];
