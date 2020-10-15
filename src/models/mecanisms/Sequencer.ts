import { Metronome } from './../entities/Metronome';
export interface Sequencer {
  play(): void;
  stop(): void;
  pause(): void;
}
