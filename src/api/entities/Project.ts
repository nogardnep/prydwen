import { Song } from './Song';
import { EntityWithId } from './EntityWithId';
import { Metronome } from './Metronome';
import { Sequence } from './Sequence';

export interface Project extends EntityWithId {
  name: string;
  sequences: Sequence[];
  songs: Song[];
  recording: {
    countdown: number;
  };
  metronome: Metronome;
}
