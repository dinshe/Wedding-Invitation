import { useState, useEffect, useRef, useCallback } from 'react';
import { weddingConfig } from '../config/wedding';

class AmbientSynthAudio {
  private ctx: AudioContext | null = null;
  private isPlaying: boolean = false;
  private timer: any = null;

  start() {
    if (this.isPlaying) return;
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;
      this.ctx = new AudioCtx();
      this.isPlaying = true;

      // Romantic harp-like chord progressions: F major, C major, D minor, Bb major
      const notes = [
        [349.23, 440.0, 523.25, 698.46], // F maj
        [261.63, 329.63, 392.0, 523.25], // C maj
        [293.66, 349.23, 440.0, 587.33], // D min
        [233.08, 293.66, 349.23, 466.16], // Bb maj
      ];
      
      let chordIndex = 0;
      const playArpeggio = () => {
        if (!this.isPlaying || !this.ctx) return;
        const currentChord = notes[chordIndex % notes.length];
        chordIndex++;

        currentChord.forEach((freq, idx) => {
          if (!this.ctx) return;
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();

          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq, this.ctx.currentTime + idx * 0.4);

          gain.gain.setValueAtTime(0.001, this.ctx.currentTime + idx * 0.4);
          gain.gain.exponentialRampToValueAtTime(0.04, this.ctx.currentTime + idx * 0.4 + 0.08);
          gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + idx * 0.4 + 2.5);

          osc.connect(gain);
          gain.connect(this.ctx.destination);

          osc.start(this.ctx.currentTime + idx * 0.4);
          osc.stop(this.ctx.currentTime + idx * 0.4 + 2.6);
        });

        this.timer = setTimeout(playArpeggio, 3600);
      };

      playArpeggio();
    } catch (e) {
      console.warn('Web Audio Ambient Synth unavailable', e);
    }
  }

  stop() {
    this.isPlaying = false;
    if (this.timer) clearTimeout(this.timer);
    if (this.ctx) {
      try {
        this.ctx.close();
      } catch (e) {}
      this.ctx = null;
    }
  }
}

export function useMusic() {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const synthRef = useRef<AmbientSynthAudio | null>(null);

  useEffect(() => {
    // Create audio element
    const audio = new Audio();
    audio.src = weddingConfig.audio.src;
    audio.loop = true;
    audio.preload = 'auto';
    audioRef.current = audio;
    synthRef.current = new AmbientSynthAudio();

    return () => {
      audio.pause();
      audio.src = '';
      if (synthRef.current) synthRef.current.stop();
    };
  }, []);

  const playMusic = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch(() => {
          // If mp3 is not present or failed, fallback gracefully to Ambient Synth
          if (synthRef.current) {
            synthRef.current.start();
            setIsPlaying(true);
          }
        });
    }
  }, []);

  const pauseMusic = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
    }
    if (synthRef.current) {
      synthRef.current.stop();
    }
    setIsPlaying(false);
  }, []);

  const toggleMusic = useCallback(() => {
    if (isPlaying) {
      pauseMusic();
    } else {
      playMusic();
    }
  }, [isPlaying, pauseMusic, playMusic]);

  return {
    isPlaying,
    isMuted,
    playMusic,
    pauseMusic,
    toggleMusic,
  };
}

export default useMusic;
