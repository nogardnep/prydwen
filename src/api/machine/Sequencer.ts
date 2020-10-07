export interface Sequencer {
  play(): void;
  stop(): void;
  pause(): void;
  switchMetronome(muted: boolean): void;
  setMetronomeVolume(volume: number): void;
}
