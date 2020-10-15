import { Injectable } from '@angular/core';
import { EntityUtils } from 'src/app/utils/EntityUtils';
import { Pattern } from './../../../models/entities/Pattern';
import { Sequence, SequencePattern } from './../../../models/entities/Sequence';
import { PatternWrapper } from './../../../models/wrappers/PatternWrapper';
import { SelectionService } from './../control/selection.service';
import { SequencerService } from './../mecanism/sequencer.service';
import { PatternsManagerService } from './patterns-manager.service';
import { ProjectManagerService } from './project-manager.service';

@Injectable({
  providedIn: 'root',
})
export class SequencesManagerService {
  constructor(
    private selectionService: SelectionService,
    private projectManagerService: ProjectManagerService,
    private patternsManagerService: PatternsManagerService,
    private sequencerService: SequencerService
  ) {
    this.selectionService.selectedSequenceSubject.subscribe(
      (sequence: Sequence) => {
        if (sequence !== null) {
          this.sequencerService.updateSequence(sequence);
        }
      }
    );
  }

  start(): void {
    const playingSequence = this.selectionService.getSelectedSequence();

    const patternWrappers: PatternWrapper[] = [];

    playingSequence.patterns.forEach((sequencePattern: SequencePattern) => {
      if (sequencePattern.armed) {
        const pattern = this.getPatternFor(sequencePattern);
        console.log(sequencePattern.looping);
        patternWrappers.push(
          new PatternWrapper(pattern, sequencePattern.looping)
        );
      }
    });

    this.patternsManagerService.setPatternWrappers(patternWrappers);
    this.patternsManagerService.startAll();
  }

  stop(): void {
    this.patternsManagerService.stopAll();
  }

  update(sequence: Sequence): void {
    if (this.selectionService.sequenceIsSelected(sequence)) {
      this.sequencerService.updateSequence(sequence);
    }
  }

  addPattern(sequence: Sequence): void {
    const newPattern = this.projectManagerService.addPattern();

    sequence.patterns.push({
      id: EntityUtils.makeId(),
      num: EntityUtils.makeNum(sequence.patterns),
      patternId: newPattern.id,
      looping: true,
      armed: true,
    });
  }

  removeSequence(sequence: Sequence): void {
    this.projectManagerService.removeSequence(sequence);

    // TODO: remove all patterns inside
  }

  removePattern(sequencePattern: SequencePattern, sequence: Sequence): void {
    sequence.patterns.forEach((looked: SequencePattern) => {
      if (looked.patternId === sequencePattern.patternId) {
        EntityUtils.removeFrom(looked, sequence.patterns);
      }
    });

    this.projectManagerService.removePattern(
      this.getPatternFor(sequencePattern)
    );
  }

  getPatternFor(sequencePattern: SequencePattern): Pattern {
    return EntityUtils.getEntityById(
      this.projectManagerService.getCurrentProject().patterns,
      sequencePattern.patternId
    ) as Pattern;
  }
}
