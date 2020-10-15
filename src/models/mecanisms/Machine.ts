import { AudioPlayer } from './AudioPlayer';
import { Sequencer } from './Sequencer';

export interface Machine {
  getSequencer(): Sequencer;
  getAudioPlayer(): AudioPlayer;
}
