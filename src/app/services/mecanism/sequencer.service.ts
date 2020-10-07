import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { OutputsService } from './../io/outputs.service';

@Injectable({
  providedIn: 'root',
})
export class SequencerService {
  metronomeMuted = false;

  private metronomeMutedSubject = new Subject<boolean>();

  constructor(private outputsService: OutputsService) {}

  switchMetronome(muted: boolean): void {
    this.outputsService.getSequencer().switchMetronome(muted);
  }

  setMetronomeVolume(volume: number): void {
    this.outputsService.getSequencer().setMetronomeVolume(volume);
  }

  play(): void {
    this.outputsService.getSequencer().play();
  }

  pause(): void {
    this.outputsService.getSequencer().pause();
  }

  stop(): void {
    this.outputsService.getSequencer().stop();
  }
}
