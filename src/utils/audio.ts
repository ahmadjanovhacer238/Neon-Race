// Web Audio API Synthwave Sound Engine and Synthesizer

class AudioEngine {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = false;
  
  // Soundtrack variables
  private musicInterval: any = null;
  private isMusicPlaying: boolean = false;
  private currentBeat: number = 0;
  private tempo: number = 130; // BPM
  
  // Engine audio components
  private engineOsc: OscillatorNode | null = null;
  private engineGain: GainNode | null = null;
  private engineFilter: BiquadFilterNode | null = null;
  
  // Custom synth instruments
  private masterVolume: GainNode | null = null;

  constructor() {
    // AudioContext will be lazy-initialized upon user interaction
  }

  private initContext() {
    if (this.ctx) return;
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
        this.masterVolume = this.ctx.createGain();
        this.masterVolume.gain.setValueAtTime(this.isMuted ? 0 : 0.6, this.ctx.currentTime);
        this.masterVolume.connect(this.ctx.destination);
      }
    } catch (e) {
      console.error("Web Audio API not supported", e);
    }
  }

  public toggleMute(): boolean {
    this.isMuted = !this.isMuted;
    if (this.masterVolume && this.ctx) {
      this.masterVolume.gain.setValueAtTime(this.isMuted ? 0 : 0.6, this.ctx.currentTime);
    }
    return this.isMuted;
  }

  public getMuteStatus(): boolean {
    return this.isMuted;
  }

  // Play simple sound effects programmatically
  public playClick() {
    this.initContext();
    if (!this.ctx || this.isMuted) return;
    
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    
    osc.connect(gain);
    gain.connect(this.masterVolume || this.ctx.destination);
    
    osc.type = 'sine';
    osc.frequency.setValueAtTime(800, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(100, this.ctx.currentTime + 0.05);
    
    gain.gain.setValueAtTime(0.1, this.ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.01, this.ctx.currentTime + 0.05);
    
    osc.start();
    osc.stop(this.ctx.currentTime + 0.05);
  }

  public playCoin() {
    this.initContext();
    if (!this.ctx || this.isMuted) return;

    const time = this.ctx.currentTime;
    
    // Play dual vintage synthesizer chime (harmonized)
    const playNote = (pitch: number, delay: number) => {
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      
      osc.connect(gain);
      gain.connect(this.masterVolume || this.ctx.destination);
      
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(pitch, time + delay);
      osc.frequency.setValueAtTime(pitch * 1.5, time + delay + 0.08); // Perfect fifth high beep
      
      gain.gain.setValueAtTime(0, time + delay);
      gain.gain.linearRampToValueAtTime(0.12, time + delay + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, time + delay + 0.3);
      
      osc.start(time + delay);
      osc.stop(time + delay + 0.3);
    };

    playNote(523.25, 0); // C5
    playNote(659.25, 0.06); // E5
  }

  public playPowerup() {
    this.initContext();
    if (!this.ctx || this.isMuted) return;

    const time = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const osc2 = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.connect(gain);
    osc2.connect(gain);
    gain.connect(this.masterVolume || this.ctx.destination);

    osc.type = 'sawtooth';
    osc2.type = 'sine';

    // Uplifting sweet synth pitch sweep
    osc.frequency.setValueAtTime(220, time);
    osc.frequency.exponentialRampToValueAtTime(880, time + 0.4);

    osc2.frequency.setValueAtTime(440, time);
    osc2.frequency.exponentialRampToValueAtTime(1760, time + 0.45);

    gain.gain.setValueAtTime(0, time);
    gain.gain.linearRampToValueAtTime(0.08, time + 0.1);
    gain.gain.exponentialRampToValueAtTime(0.001, time + 0.5);

    osc.start(time);
    osc2.start(time);
    osc.stop(time + 0.5);
    osc2.stop(time + 0.5);
  }

  public playCrash() {
    this.initContext();
    if (!this.ctx || this.isMuted) return;

    const time = this.ctx.currentTime;
    
    // Low rumble boom
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    
    osc.connect(gain);
    gain.connect(this.masterVolume || this.ctx.destination);
    
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(120, time);
    osc.frequency.linearRampToValueAtTime(30, time + 0.6);
    
    gain.gain.setValueAtTime(0.3, time);
    gain.gain.exponentialRampToValueAtTime(0.001, time + 0.7);
    
    osc.start(time);
    osc.stop(time + 0.75);

    // White noise explosion blast
    try {
      const bufferSize = this.ctx.sampleRate * 0.5; // 0.5 seconds of noise
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
      }
      
      const noiseNode = this.ctx.createBufferSource();
      noiseNode.buffer = buffer;
      
      const noiseFilter = this.ctx.createBiquadFilter();
      noiseFilter.type = 'lowpass';
      noiseFilter.frequency.setValueAtTime(800, time);
      noiseFilter.frequency.exponentialRampToValueAtTime(80, time + 0.5);
      
      const noiseGain = this.ctx.createGain();
      noiseGain.gain.setValueAtTime(0.2, time);
      noiseGain.gain.exponentialRampToValueAtTime(0.001, time + 0.5);
      
      noiseNode.connect(noiseFilter);
      noiseFilter.connect(noiseGain);
      noiseGain.connect(this.masterVolume || this.ctx.destination);
      
      noiseNode.start(time);
      noiseNode.stop(time + 0.55);
    } catch (e) {
      console.warn("White noise crash generator failed", e);
    }
  }

  public playBrake() {
    this.initContext();
    if (!this.ctx || this.isMuted) return;

    const time = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(800, time);
    osc.frequency.linearRampToValueAtTime(750, time + 0.2);

    // Add high frequency screech
    const oscScreech = this.ctx.createOscillator();
    oscScreech.type = 'sine';
    oscScreech.frequency.setValueAtTime(2500, time);
    oscScreech.frequency.setValueAtTime(2400, time + 0.15);

    const screechGain = this.ctx.createGain();
    screechGain.gain.setValueAtTime(0.02, time);
    screechGain.gain.exponentialRampToValueAtTime(0.001, time + 0.2);

    osc.connect(gain);
    gain.connect(this.masterVolume || this.ctx.destination);

    oscScreech.connect(screechGain);
    screechGain.connect(this.masterVolume || this.ctx.destination);

    gain.gain.setValueAtTime(0.04, time);
    gain.gain.exponentialRampToValueAtTime(0.001, time + 0.2);

    osc.start(time);
    oscScreech.start(time);
    osc.stop(time + 0.2);
    oscScreech.stop(time + 0.2);
  }

  // Engine Continuous Synthesizer
  public startEngine() {
    this.initContext();
    if (!this.ctx || this.isMuted || this.engineOsc) return;

    try {
      const time = this.ctx.currentTime;
      this.engineOsc = this.ctx.createOscillator();
      this.engineGain = this.ctx.createGain();
      this.engineFilter = this.ctx.createBiquadFilter();

      this.engineOsc.type = 'sawtooth';
      
      // Starter speed low idle frequency
      this.engineOsc.frequency.setValueAtTime(55, time); // A1 note
      
      this.engineFilter.type = 'lowpass';
      this.engineFilter.frequency.setValueAtTime(180, time);
      this.engineFilter.Q.setValueAtTime(3, time);

      this.engineGain.gain.setValueAtTime(0.06, time);

      this.engineOsc.connect(this.engineFilter);
      this.engineFilter.connect(this.engineGain);
      this.engineGain.connect(this.masterVolume || this.ctx.destination);

      this.engineOsc.start(time);
    } catch (e) {
      console.error("Failed to start synthesizer engine", e);
    }
  }

  public setEngineSpeed(speedRatio: number) { // speedRatio ranges from 0 to 1
    if (!this.ctx || !this.engineOsc || !this.engineFilter) return;

    const targetFreq = 50 + speedRatio * 130;  // 50Hz (idle) to 180Hz (redline)
    const filterFreq = 160 + speedRatio * 450; // Dynamic filter follow the RPM screech

    const time = this.ctx.currentTime;
    
    // Smooth frequency adjustments to avoid clicking/popping
    this.engineOsc.frequency.setTargetAtTime(targetFreq, time, 0.1);
    this.engineFilter.frequency.setTargetAtTime(filterFreq, time, 0.1);
  }

  public stopEngine() {
    if (this.engineOsc) {
      try {
        this.engineOsc.stop();
        this.engineOsc.disconnect();
      } catch (e) {}
      this.engineOsc = null;
    }
    if (this.engineGain) {
      try { this.engineGain.disconnect(); } catch (e) {}
      this.engineGain = null;
    }
    if (this.engineFilter) {
      try { this.engineFilter.disconnect(); } catch (e) {}
      this.engineFilter = null;
    }
  }

  // Interactive Synthwave Track Generator
  public startMusic() {
    this.initContext();
    if (!this.ctx || this.isMusicPlaying) return;
    this.isMusicPlaying = true;
    this.currentBeat = 0;

    const intervalMs = (60 / this.tempo) * 1000 / 4; // 16th notes
    
    // Simple retro baseline notes loop (C, Eb, F, Bb Synthwave Bass)
    const bassPattern = [
      32.7, 32.7, 32.7, 32.7, // C1
      38.9, 38.9, 38.9, 38.9, // Eb1
      43.7, 43.7, 43.7, 43.7, // F1
      49.0, 49.0, 38.9, 43.7  // G1/Eb1/F1
    ];

    const leadPattern = [
      130.8, 0, 155.6, 196.0,  // C3, -, Eb3, G3
      196.0, 0, 155.6, 220.0,  // G3, -, Eb3, Bb3
      174.6, 0, 130.8, 174.6,  // F3, -, C3, F3
      233.1, 196.0, 174.6, 130.8 // Bb3, G3, F3, C3
    ];

    const hihatPattern = [
      1, 0, 0.5, 0,
      1, 0, 0.5, 1,
      0.5, 0, 1, 0,
      0.5, 1, 0.5, 0
    ];

    this.musicInterval = setInterval(() => {
      if (!this.ctx || this.isMuted) return;
      const time = this.ctx.currentTime;
      
      const bassIndex = Math.floor(this.currentBeat / 2) % bassPattern.length;
      const leadIndex = this.currentBeat % leadPattern.length;
      const hihatIndex = this.currentBeat % hihatPattern.length;

      // 1. Play retro analog bass synth
      if (this.currentBeat % 2 === 0) { // Eighth notes
        const bassOsc = this.ctx.createOscillator();
        const bassGain = this.ctx.createGain();
        bassOsc.connect(bassGain);
        bassGain.connect(this.masterVolume || this.ctx.destination);
        
        bassOsc.type = 'sawtooth';
        bassOsc.frequency.setValueAtTime(bassPattern[bassIndex], time);
        
        bassGain.gain.setValueAtTime(0.04, time);
        bassGain.gain.exponentialRampToValueAtTime(0.001, time + 0.15);
        
        bassOsc.start(time);
        bassOsc.stop(time + 0.18);
      }

      // 2. Play subtle neon synth lead arpeggio
      const leadNote = leadPattern[leadIndex];
      if (leadNote > 0 && this.currentBeat % 4 === 0) {
        const leadOsc = this.ctx.createOscillator();
        const leadGain = this.ctx.createGain();
        const leadFilter = this.ctx.createBiquadFilter();
        
        leadOsc.connect(leadFilter);
        leadFilter.connect(leadGain);
        leadGain.connect(this.masterVolume || this.ctx.destination);
        
        leadOsc.type = 'sine';
        leadOsc.frequency.setValueAtTime(leadNote * 2, time); // Shift high for lead range
        
        leadFilter.type = 'peaking';
        leadFilter.frequency.setValueAtTime(1000, time);
        
        leadGain.gain.setValueAtTime(0, time);
        leadGain.gain.linearRampToValueAtTime(0.03, time + 0.05);
        leadGain.gain.exponentialRampToValueAtTime(0.001, time + 0.35);
        
        leadOsc.start(time);
        leadOsc.stop(time + 0.4);
      }

      // 3. Play synthesized noise drum trigger (Retro Hi-Hat)
      if (hihatPattern[hihatIndex] > 0) {
        try {
          const hatOsc = this.ctx.createOscillator();
          const hatGain = this.ctx.createGain();
          
          hatOsc.connect(hatGain);
          hatGain.connect(this.masterVolume || this.ctx.destination);
          
          hatOsc.type = 'triangle';
          hatOsc.frequency.setValueAtTime(10000, time); // High noise approximation
          
          const volume = hihatPattern[hihatIndex] === 1 ? 0.007 : 0.003;
          hatGain.gain.setValueAtTime(volume, time);
          hatGain.gain.exponentialRampToValueAtTime(0.0001, time + 0.04);
          
          hatOsc.start(time);
          hatOsc.stop(time + 0.05);
        } catch (e) {}
      }

      this.currentBeat++;
    }, intervalMs);
  }

  public stopMusic() {
    this.isMusicPlaying = false;
    if (this.musicInterval) {
      clearInterval(this.musicInterval);
      this.musicInterval = null;
    }
  }
}

// Export singleton instance
export const audio = new AudioEngine();
