import { TimeSignature } from './TimeSignature';

export interface Position {
  timeSignature: TimeSignature;
  mesure: number;
  beat: number;
  tick: number;
  turn: number;
  maxTurn: number;
}
