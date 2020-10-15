import { RecorderService } from './recorder.service';
import { Injectable } from '@angular/core';
import { Machine } from './../../../machine/Machine';
import { AudioPlayer as IAudioPlayer } from './../../../models/mecanisms/AudioPlayer';
import { Machine as IMachine } from './../../../models/mecanisms/Machine';
import { Sequencer as ISequencer } from './../../../models/mecanisms/Sequencer';
import { SequencerOutputService } from './sequencer-output.service';

@Injectable({
  providedIn: 'root',
})
export class MachineService {
  private machine: IMachine;

  constructor() {
    this.machine = new Machine(null); // TODO
  }

  getSequencer(): ISequencer {
    return this.machine.getSequencer();
  }

  getAudioPlayer(): IAudioPlayer {
    return this.machine.getAudioPlayer();
  }
}
