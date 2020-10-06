import { TimeSignature } from './../utils/TimeSignature';
import { Entity } from './Entity';

export interface Sheet extends Entity {
  timeSignature: TimeSignature;
}
