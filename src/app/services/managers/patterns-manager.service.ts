import { SequencerService } from './../mecanism/sequencer.service';
import { Pattern } from './../../../api/entities/Pattern';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PatternsManagerService {
  constructor(
    // private sequencerService: SequencerService
    ) {}

  updateAudio(pattern: Pattern): void {
    // TODO
    console.log('TODO');

    // this.sequencerService.updatePatternAudio(pattern);
  }

  play(pattern: Pattern): void {
    // TODO
    console.log('TODO');
    // this.sequencerService.playPattern(pattern);
  }
}
