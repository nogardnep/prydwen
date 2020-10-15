import { Pattern } from './Pattern';
import { Song } from './Song';
import { EntityWithId } from './EntityWithId';
import { Metronome } from './Metronome';
import { Sequence } from './Sequence';
import { AudioTrack } from './AudioTrack';

export interface Project extends EntityWithId {
  name: string;
  audioTracks: AudioTrack[];
  sequences: Sequence[];
  patterns: Pattern[];
  songs: Song[];
  recording: {
    countdown: number;
  };
  metronome: Metronome;
}
