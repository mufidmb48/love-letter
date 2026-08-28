import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import { Play, Pause, SkipBack, SkipForward, Music2, Volume2, VolumeX, Sparkles } from 'lucide-react';
import { songs } from '../data/songs';
import { Song } from '../types';
import { romanticAudio } from '../utils/audioSynth';

export const MusicPlayer: React.FC = () => {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(165); // 2:45 default duration in seconds
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0.8);
  const [useSynth, setUseSynth] = useState(true);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const progressTimerRef = useRef<number | null>(null);

  const currentSong: Song = songs[currentTrackIndex] || songs[0];

  // Helper to format seconds into mm:ss
  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  // Toggle Play / Pause
  const togglePlay = () => {
    if (isPlaying) {
      pauseAudio();
    } else {
      playAudio();
    }
  };

  const playAudio = () => {
    setIsPlaying(true);

    if (audioRef.current && currentSong.audio && !useSynth) {
      audioRef.current.play().catch(() => {
        // Fallback to Web Audio romantic synth
        setUseSynth(true);
        romanticAudio.startTrack(currentSong.id);
      });
    } else {
      // Use romantic ambient audio engine
      romanticAudio.startTrack(currentSong.id);
    }
  };

  const pauseAudio = () => {
    setIsPlaying(false);
    if (audioRef.current) {
      audioRef.current.pause();
    }
    romanticAudio.stop();
  };

  const handleNext = () => {
    const nextIdx = (currentTrackIndex + 1) % songs.length;
    switchTrack(nextIdx);
  };

  const handlePrev = () => {
    const prevIdx = (currentTrackIndex - 1 + songs.length) % songs.length;
    switchTrack(prevIdx);
  };

  const switchTrack = (index: number) => {
    pauseAudio();
    setCurrentTrackIndex(index);
    setCurrentTime(0);
    
    // Set track duration estimate
    const track = songs[index];
    if (track.duration) {
      const parts = track.duration.split(':');
      if (parts.length === 2) {
        setDuration(parseInt(parts[0]) * 60 + parseInt(parts[1]));
      }
    }

    // Auto-resume if user was already playing
    setTimeout(() => {
      setIsPlaying(true);
      romanticAudio.startTrack(songs[index].id);
    }, 150);
  };

  // Simulated playback time advancement
  useEffect(() => {
    if (isPlaying) {
      progressTimerRef.current = window.setInterval(() => {
        setCurrentTime((prev) => {
          if (prev >= duration) {
            handleNext();
            return 0;
          }
          return prev + 1;
        });
      }, 1000);
    } else {
      if (progressTimerRef.current) {
        clearInterval(progressTimerRef.current);
      }
    }

    return () => {
      if (progressTimerRef.current) {
        clearInterval(progressTimerRef.current);
      }
    };
  }, [isPlaying, duration, currentTrackIndex]);

  // Cleanup on component unmount
  useEffect(() => {
    return () => {
      romanticAudio.stop();
      if (progressTimerRef.current) {
        clearInterval(progressTimerRef.current);
      }
    };
  }, []);

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const targetTime = Number(e.target.value);
    setCurrentTime(targetTime);
    if (audioRef.current) {
      audioRef.current.currentTime = targetTime;
    }
  };

  const toggleMute = () => {
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);
    if (nextMuted) {
      romanticAudio.setVolume(0);
      if (audioRef.current) audioRef.current.volume = 0;
    } else {
      romanticAudio.setVolume(volume);
      if (audioRef.current) audioRef.current.volume = volume;
    }
  };

  return (
    <section 
      id="our-songs-section"
      className="w-full max-w-xl mx-auto my-12 px-4"
    >
      <div className="bg-[#fffdfa]/95 backdrop-blur-md rounded-3xl p-6 sm:p-8 border border-rose-200/70 shadow-xl shadow-rose-950/5">
        {/* Section Header */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-100/80 text-rose-800 text-xs font-semibold tracking-wider uppercase mb-2">
            <Music2 className="w-3.5 h-3.5 text-rose-500" />
            <span>Our Songs</span>
          </div>
          <h3 className="font-serif text-2xl sm:text-3xl text-rose-950 font-normal">
            Melodies for You 🎵
          </h3>
          <p className="text-xs sm:text-sm text-rose-900/70 mt-1 max-w-md mx-auto font-light">
            Some songs just sound a little different when they remind me of you.
          </p>
        </div>

        {/* Current Active Song Card */}
        <div className="flex flex-col sm:flex-row items-center gap-5 p-4 rounded-2xl bg-gradient-to-br from-rose-50/80 to-pink-50/60 border border-rose-100/80 mb-6">
          {/* Song Cover Art */}
          <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden shadow-md flex-shrink-0 border border-rose-200/60 group">
            <img
              src={currentSong.image}
              alt={currentSong.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
              onError={(e) => {
                // Fallback gradient if unsplash rate-limits or fails
                e.currentTarget.style.display = 'none';
              }}
            />
            {/* Overlay icon */}
            <div className="absolute inset-0 bg-gradient-to-t from-rose-950/30 via-transparent to-transparent flex items-end justify-end p-2">
              <Sparkles className="w-4 h-4 text-white/80" />
            </div>
          </div>

          {/* Song Info & Equalizer */}
          <div className="flex-1 text-center sm:text-left min-w-0">
            <div className="flex items-center justify-center sm:justify-between gap-2 mb-1">
              <h4 className="font-serif text-lg sm:text-xl text-rose-950 font-medium truncate">
                {currentSong.title}
              </h4>
              {/* Equalizer animation when playing */}
              {isPlaying && (
                <div className="flex items-end gap-0.5 h-4 px-1" aria-label="Audio playing equalizer">
                  <span className="w-1 bg-rose-500 rounded-full animate-[bounce_0.6s_infinite_ease-in-out]" style={{ height: '60%' }} />
                  <span className="w-1 bg-rose-500 rounded-full animate-[bounce_0.8s_infinite_ease-in-out_0.2s]" style={{ height: '100%' }} />
                  <span className="w-1 bg-rose-500 rounded-full animate-[bounce_0.5s_infinite_ease-in-out_0.4s]" style={{ height: '80%' }} />
                  <span className="w-1 bg-rose-500 rounded-full animate-[bounce_0.7s_infinite_ease-in-out_0.1s]" style={{ height: '40%' }} />
                </div>
              )}
            </div>

            <p className="text-xs font-medium text-rose-700/80 mb-2">
              {currentSong.artist}
            </p>
            <p className="text-xs text-rose-900/70 italic leading-relaxed line-clamp-2">
              "{currentSong.description}"
            </p>
          </div>
        </div>

        {/* Progress Bar & Timers */}
        <div className="space-y-1.5 mb-6">
          <input
            type="range"
            min={0}
            max={duration}
            value={currentTime}
            onChange={handleSeek}
            aria-label="Track progress slider"
            className="w-full h-1.5 bg-rose-200/70 rounded-lg appearance-none cursor-pointer accent-rose-500 focus:outline-none"
          />
          <div className="flex justify-between text-[11px] text-rose-800/70 font-mono">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>

        {/* Playback Controls */}
        <div className="flex items-center justify-between pt-1">
          {/* Mute button */}
          <button
            onClick={toggleMute}
            aria-label={isMuted ? "Unmute audio" : "Mute audio"}
            className="p-2.5 rounded-full text-rose-700 hover:bg-rose-100/70 transition-colors cursor-pointer"
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </button>

          {/* Prev / Play-Pause / Next */}
          <div className="flex items-center gap-3 sm:gap-4">
            <button
              onClick={handlePrev}
              aria-label="Previous track"
              className="p-2.5 rounded-full text-rose-800 hover:bg-rose-100/80 active:scale-95 transition-all cursor-pointer"
            >
              <SkipBack className="w-5 h-5 fill-rose-800/20" />
            </button>

            <motion.button
              id="main-play-btn"
              onClick={togglePlay}
              aria-label={isPlaying ? "Pause music" : "Play music"}
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.94 }}
              className="p-4 rounded-full bg-gradient-to-tr from-rose-600 to-pink-500 text-white shadow-md shadow-rose-500/30 hover:shadow-lg hover:shadow-rose-500/40 transition-all cursor-pointer"
            >
              {isPlaying ? (
                <Pause className="w-6 h-6 fill-white" />
              ) : (
                <Play className="w-6 h-6 fill-white translate-x-0.5" />
              )}
            </motion.button>

            <button
              onClick={handleNext}
              aria-label="Next track"
              className="p-2.5 rounded-full text-rose-800 hover:bg-rose-100/80 active:scale-95 transition-all cursor-pointer"
            >
              <SkipForward className="w-5 h-5 fill-rose-800/20" />
            </button>
          </div>

          {/* Track counter indicator */}
          <div className="text-xs font-medium text-rose-700/80 px-2 py-1 rounded-md bg-rose-50 border border-rose-100">
            {currentTrackIndex + 1} / {songs.length}
          </div>
        </div>

        {/* Playlist Selector Pills */}
        <div className="mt-6 pt-5 border-t border-rose-100/80 flex gap-2 overflow-x-auto pb-1 scrollbar-none">
          {songs.map((song, idx) => (
            <button
              key={song.id}
              onClick={() => switchTrack(idx)}
              className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs whitespace-nowrap transition-all cursor-pointer flex-shrink-0 ${
                currentTrackIndex === idx
                  ? 'bg-rose-500 text-white shadow-xs font-medium'
                  : 'bg-rose-50/80 text-rose-800 hover:bg-rose-100 border border-rose-100/60'
              }`}
            >
              <span>{idx + 1}.</span>
              <span className="truncate max-w-[120px]">{song.title}</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};
