import { Injectable } from '@angular/core';
import { Sequencer } from './../../../machine/Sequencer';
import { Sequence } from './../../../models/entities/Sequence';
import { AudioPlayerService } from './audio-player.service';
import { SequencerOutputService } from './sequencer-output.service';

@Injectable({
  providedIn: 'root',
})
export class SequencerService {
  private sequencer: Sequencer;

  constructor(
    private audioPlayerService: AudioPlayerService,
    private sequencerOutputService: SequencerOutputService
  ) {
    this.sequencer = new Sequencer(
      this.audioPlayerService.getAudioPlayer(),
      this.sequencerOutputService
    );
  }

  play(): void {
    this.sequencer.play();
  }

  pause(): void {
    this.sequencer.pause();
  }

  stop(): void {
    this.sequencer.stop();
  }

  updateSequence(sequence: Sequence): void {
    this.sequencer.updateSequence(sequence);
  }
}
