import { Position } from './../utils/Position';

export interface SequencerOutputs {
  setPosition(position: Position): void;
}
