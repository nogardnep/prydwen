import { TimeSignature } from './TimeSignature';

export interface Position {
  timeSignature: TimeSignature;
  measure: number;
  beat: number;
  tick: number;
  turn: number;
  maxTurn: number;
}
