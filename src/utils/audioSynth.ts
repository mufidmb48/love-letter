/**
 * Romantic Ambient Music Box / Acoustic Chords generator using Web Audio API
 * Provides a graceful, lush musical experience without requiring large external audio downloads
 */

class RomanticAudioEngine {
  private ctx: AudioContext | null = null;
  private isPlaying: boolean = false;
  private currentTrackId: number = 1;
  private timerId: number | null = null;
  private gainNode: GainNode | null = null;
  private step: number = 0;

  // Romantic chord progressions for different mood tracks
  private trackThemes: Record<number, number[][]> = {
    // 1. Golden Hour Serenade (Cmaj7 -> Am7 -> Fmaj7 -> Gsus4)
    1: [
      [261.63, 329.63, 392.00, 493.88], // C E G B
      [220.00, 261.63, 329.63, 392.00], // A C E G
      [174.61, 220.00, 261.63, 329.63], // F A C E
      [196.00, 261.63, 293.66, 392.00], // G C D G
    ],
    // 2. Soft Whispers & Moonlight (Fmaj9 -> Dm9 -> Bbmaj7 -> Csus4)
    2: [
      [174.61, 220.00, 261.63, 329.63, 392.00],
      [146.83, 174.61, 220.00, 261.63, 329.63],
      [116.54, 146.83, 174.61, 220.00],
      [130.81, 196.00, 261.63, 293.66],
    ],
    // 3. Beautiful in White (Gmaj7 -> Em7 -> Cmaj7 -> D6)
    3: [
      [196.00, 246.94, 293.66, 369.99],
      [164.81, 196.00, 246.94, 293.66],
      [130.81, 164.81, 196.00, 246.94],
      [146.83, 185.00, 220.00, 293.66],
    ],
    // 4. Rest (Ebmaj7 -> Cm7 -> Abmaj7 -> Bb)
    4: [
      [155.56, 196.00, 233.08, 293.66],
      [130.81, 155.56, 196.00, 233.08],
      [103.83, 130.81, 155.56, 196.00],
      [116.54, 146.83, 174.61, 233.08],
    ]
  };

  private initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
      this.gainNode = this.ctx.createGain();
      this.gainNode.gain.setValueAtTime(0.3, this.ctx.currentTime);
      this.gainNode.connect(this.ctx.destination);
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  private playTone(freq: number, duration: number = 2.5, velocity: number = 0.25) {
    if (!this.ctx || !this.gainNode) return;
    try {
      const osc = this.ctx.createOscillator();
      const noteGain = this.ctx.createGain();
      
      // Warm sine + subtle triangle blend for music-box / rhodes sweetness
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

      // Gentle envelope: fast soft attack, sweet long decay
      const now = this.ctx.currentTime;
      noteGain.gain.setValueAtTime(0.0001, now);
      noteGain.gain.exponentialRampToValueAtTime(velocity, now + 0.08);
      noteGain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

      osc.connect(noteGain);
      noteGain.connect(this.gainNode);

      osc.start(now);
      osc.stop(now + duration);
    } catch {
      // Audio fallback handling
    }
  }

  public startTrack(trackId: number) {
    this.initContext();
    this.stop();
    this.isPlaying = true;
    this.currentTrackId = trackId;
    this.step = 0;

    const chords = this.trackThemes[trackId] || this.trackThemes[1];
    
    // Play an immediate chime
    this.playTone(523.25, 2.0, 0.2); // High C chime

    this.timerId = window.setInterval(() => {
      if (!this.isPlaying || !this.ctx) return;
      
      const chordIndex = Math.floor(this.step / 4) % chords.length;
      const currentChord = chords[chordIndex];
      const noteIndex = this.step % currentChord.length;
      
      const baseFreq = currentChord[noteIndex];
      // Occasional gentle octave sparkle
      const freq = (this.step % 3 === 0) ? baseFreq * 2 : baseFreq;
      
      this.playTone(freq, 2.2, 0.18);

      // Low bass root note on chord change
      if (this.step % 4 === 0) {
        this.playTone(currentChord[0] * 0.5, 3.5, 0.22);
      }

      this.step++;
    }, 450);
  }

  public stop() {
    this.isPlaying = false;
    if (this.timerId !== null) {
      clearInterval(this.timerId);
      this.timerId = null;
    }
  }

  public setVolume(vol: number) {
    if (this.gainNode && this.ctx) {
      this.gainNode.gain.setValueAtTime(Math.max(0, Math.min(1, vol * 0.4)), this.ctx.currentTime);
    }
  }
}

export const romanticAudio = new RomanticAudioEngine();
