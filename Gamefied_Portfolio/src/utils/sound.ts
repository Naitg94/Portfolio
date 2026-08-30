// Web Audio API Synthesizer for NAITIK.OS Cyber Sound Effects

class SoundSystem {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = false;
  private hasUserInteracted: boolean = false;

  constructor() {
    if (typeof window !== 'undefined') {
      const markUserInteraction = () => {
        this.hasUserInteracted = true;
        window.removeEventListener('click', markUserInteraction);
        window.removeEventListener('keydown', markUserInteraction);
        window.removeEventListener('touchstart', markUserInteraction);
      };

      window.addEventListener('click', markUserInteraction, { once: true });
      window.addEventListener('keydown', markUserInteraction, { once: true });
      window.addEventListener('touchstart', markUserInteraction, { once: true });
    }
  }

  private initCtx(): boolean {
    if (this.isMuted || typeof window === 'undefined') return false;
    
    // Only initialize AudioContext after an explicit user interaction
    if (!this.hasUserInteracted) {
      return false;
    }

    try {
      if (!this.ctx) {
        const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        if (AudioCtx) {
          this.ctx = new AudioCtx();
        }
      }
      if (this.ctx && this.ctx.state === 'suspended') {
        this.ctx.resume().catch(() => {
          // Autoplay policy prevented resume
        });
      }
      return this.ctx !== null && this.ctx.state === 'running';
    } catch {
      return false;
    }
  }

  public toggleMute(): boolean {
    this.isMuted = !this.isMuted;
    if (!this.isMuted) {
      this.playBeep(880, 'sine', 0.05, 0.05);
    }
    return this.isMuted;
  }

  public getMutedState(): boolean {
    return this.isMuted;
  }

  public playBeep(freq = 440, type: OscillatorType = 'sine', duration = 0.1, volume = 0.05) {
    if (this.isMuted) return;
    try {
      this.hasUserInteracted = true; // Calling sound via action counts as user gesture
      if (!this.initCtx() || !this.ctx) return;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

      gain.gain.setValueAtTime(volume, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + duration);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + duration);
    } catch {
      // Audio context error fallback - fail gracefully
    }
  }

  public playClick() {
    this.playBeep(1200, 'sine', 0.04, 0.03);
  }

  public playHover() {
    this.playBeep(600, 'triangle', 0.02, 0.015);
  }

  public playBootStep() {
    // Only play if user has already interacted, otherwise skip without warning
    if (!this.hasUserInteracted) return;
    this.playBeep(800, 'sawtooth', 0.06, 0.02);
  }

  public playSystemReady() {
    if (this.isMuted || !this.hasUserInteracted) return;
    try {
      if (!this.initCtx() || !this.ctx) return;

      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(440, now);
      osc.frequency.exponentialRampToValueAtTime(880, now + 0.3);

      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.35);
    } catch {
      // Audio fallback
    }
  }

  public playUnlock() {
    if (this.isMuted) return;
    try {
      this.hasUserInteracted = true;
      if (!this.initCtx() || !this.ctx) return;

      const now = this.ctx.currentTime;
      [523.25, 659.25, 783.99, 1046.50].forEach((freq, idx) => {
        const osc = this.ctx!.createOscillator();
        const gain = this.ctx!.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + idx * 0.06);

        gain.gain.setValueAtTime(0.04, now + idx * 0.06);
        gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.06 + 0.15);

        osc.connect(gain);
        gain.connect(this.ctx!.destination);

        osc.start(now + idx * 0.06);
        osc.stop(now + idx * 0.06 + 0.15);
      });
    } catch {
      // Audio fallback
    }
  }
}

export const soundFx = new SoundSystem();
