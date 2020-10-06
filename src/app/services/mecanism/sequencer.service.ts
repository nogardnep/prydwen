import { Position } from './../../../api/utils/Position';
import { SequencerOutputs } from './../../../api/machine/SequencerOutputs';
import { OutputsService } from './../io/outputs.service';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SequencerService {

  constructor(
    private outputsService: OutputsService
    ) {}

  play(): void {
    console.log(this.outputsService);
    this.outputsService.getSequencer().play();
  }

  pause(): void {
    this.outputsService.getSequencer().pause();
  }

  stop(): void {
    this.outputsService.getSequencer().stop();
  }
}
