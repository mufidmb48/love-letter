export interface Song {
  id: number;
  title: string;
  artist: string;
  description: string;
  image: string;
  audio?: string;
  duration?: string;
  themeColor?: string;
}

export interface Memory {
  id: number;
  image: string;
  tag?: string;
  title: string;
  date?: string;
  message: string;
  highlight?: string;
}

export interface LoveLetterConfig {
  senderName: string;
  recipientName: string;
  nickname: string;
  specialDate?: string;
  
  opening: {
    eyebrow: string;
    title: string;
    subtitle: string;
    button: string;
  };

  letter: {
    greeting: string;
    paragraphs: Array<{
      text: string;
      highlights?: string[];
    }>;
    closing: string;
    postscript?: string;
  };

  finalMessage: {
    eyebrow: string;
    title: string;
    quote: string;
    personalNote: string;
    affirmation: string;
    closing: string;
  };

  sealedScreen: {
    title: string;
    subtitle: string;
    appreciation: string;
    signatureNote: string;
    restartButton: string;
  };
}
