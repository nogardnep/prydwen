import { Event } from './Event';
import { Pattern } from './Pattern';

export interface SequenceEvent extends Event {
  pattern: Pattern;
}
