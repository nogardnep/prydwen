import { Metronome } from './../entities/Metronome';
import { PositionWrapper } from './../wrappers/PositionWrapper';
import { AudioTrack } from './../entities/AudioTrack';

export interface AudioPlayer {
  playSimpleAudio(src: string): void;
  playTrack(track: AudioTrack): void;
  pauseTrack(track: AudioTrack): void;
  stopTrack(track: AudioTrack): void;
  updateTrack(track: AudioTrack, src: string): void;
  updateMetronome(metronome: Metronome): void;
  playMetronome(positionWrapper: PositionWrapper): void;
}
