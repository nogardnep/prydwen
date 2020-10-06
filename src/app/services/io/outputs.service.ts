import { SequencerOutputService } from './../mecanism/sequencer-output.service';
import { SequencerOutputs } from './../../../api/machine/SequencerOutputs';
import { SequencerService } from './../mecanism/sequencer.service';
import { AudioPlayer } from './../../../machine/AudioPlayer';
import { Sequencer } from './../../../machine/Sequencer';
import { AudioPlayer as IAudioPlayer } from './../../../api/machine/AudioPlayer';
import { Sequencer as ISequencer } from './../../../api/machine/Sequencer';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class OutputsService {
  private audioPlayer: IAudioPlayer;
  private sequencer: ISequencer;

  constructor(private sequencerOutputService: SequencerOutputService) {
    this.audioPlayer = new AudioPlayer();
    this.sequencer = new Sequencer(this.sequencerOutputService);
  }

  getAudioPlayer(): IAudioPlayer {
    return this.audioPlayer;
  }

  getSequencer(): ISequencer {
    return this.sequencer;
  }
}
