import React from 'react';

export const RomanticBackground: React.FC = () => {
  return (
    <div 
      aria-hidden="true" 
      className="fixed inset-0 pointer-events-none overflow-hidden -z-10"
    >
      {/* Base warm romantic gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#fffbfb] via-[#fff5f7] to-[#faedf0]" />

      {/* Soft glowing ambient orbs */}
      <div 
        className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-rose-200/40 blur-3xl animate-romantic-pulse" 
        style={{ animationDuration: '8s' }}
      />
      <div 
        className="absolute top-1/3 -right-24 w-96 h-96 rounded-full bg-pink-200/40 blur-3xl animate-romantic-pulse" 
        style={{ animationDuration: '10s', animationDelay: '2s' }}
      />
      <div 
        className="absolute bottom-10 left-1/4 w-[28rem] h-[28rem] rounded-full bg-purple-200/30 blur-3xl animate-romantic-pulse" 
        style={{ animationDuration: '9s', animationDelay: '4s' }}
      />
      <div 
        className="absolute -bottom-20 right-10 w-80 h-80 rounded-full bg-amber-100/40 blur-3xl animate-romantic-pulse" 
        style={{ animationDuration: '11s', animationDelay: '1s' }}
      />

      {/* Subtle paper grain texture */}
      <div className="absolute inset-0 opacity-[0.035] mix-blend-multiply paper-texture" />
    </div>
  );
};
