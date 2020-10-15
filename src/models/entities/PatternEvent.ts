import { AudioTrack } from './AudioTrack';
import { Event } from './Event';

export interface PatternEvent extends Event {
  audioTrack: AudioTrack;
}
