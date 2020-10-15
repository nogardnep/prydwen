import { RecorderService } from './recorder.service';
import { SequencerService } from './sequencer.service';
import { SequencesManagerService } from './../managers/sequences-manager.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PlayerService {
  constructor(
    private sequencerService: SequencerService,
    private sequencesManagerService: SequencesManagerService,
    private recorderService: RecorderService
  ) {
  }

  play(): void {
    this.sequencerService.play();
    this.sequencesManagerService.start();
  }

  pause(): void {
    this.sequencerService.pause();
  }

  stop(): void {
    this.sequencerService.stop();
    this.recorderService.stop();
    this.sequencesManagerService.stop();
  }
}
