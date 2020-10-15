import { pages } from './../../../../config/pages';
import { Router } from '@angular/router';
import { ProjectManagerService } from './../../../services/managers/project-manager.service';
import { UIService } from './../../../services/ui/ui.service';
import { Pattern } from './../../../../models/entities/Pattern';
import { SequencesManagerService } from './../../../services/managers/sequences-manager.service';
import {
  Sequence,
  SequencePattern,
} from './../../../../models/entities/Sequence';
import { Subscription } from 'rxjs';
import { SelectionService } from './../../../services/control/selection.service';
import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-sequence-page',
  templateUrl: './sequence-page.component.html',
  styleUrls: ['./sequence-page.component.scss'],
})
export class SequencePageComponent implements OnInit, OnDestroy {
  sequence: Sequence = null;
  selectedPattern: Pattern = null;

  private sequenceSubscription: Subscription;
  private selectedPatternSubscription: Subscription;

  constructor(
    private selectionService: SelectionService,
    private sequencesManagerService: SequencesManagerService,
    private uiService: UIService,
    private router: Router,
    private projectManagerService: ProjectManagerService
  ) {}

  ngOnInit(): void {
    this.sequenceSubscription = this.selectionService.selectedSequenceSubject.subscribe(
      (sequence: Sequence) => {
        console.log(sequence);
        this.sequence = sequence;
      }
    );
    this.selectionService.emitSelectedSequence();

    this.selectedPatternSubscription = this.selectionService.selectedPatternSubject.subscribe(
      (pattern: Pattern) => {
        this.selectedPattern = pattern;
      }
    );
    this.selectionService.emitSelectedPattern();
  }

  ngOnDestroy(): void {
    this.sequenceSubscription.unsubscribe();
    this.selectedPatternSubscription.unsubscribe();
  }

  onClickAddPattern(): void {
    this.sequencesManagerService.addPattern(this.sequence);
  }

  onClickRemoveSequence(): void {
    this.sequencesManagerService.removeSequence(this.sequence);
    this.router.navigate(['/' + pages.sequences.path]);
  }

  onClickRemovePattern(sequencePattern: SequencePattern): void {
    this.uiService.askConfirmation((confirmed: boolean) => {
      if (confirmed) {
        this.sequencesManagerService.removePattern(
          sequencePattern,
          this.sequence
        );
      }
    });
  }

  makeIdForPattern(sequencePattern: SequencePattern, label: string): string {
    return (
      'sequence-' +
      this.sequence.id +
      '-pattern-' +
      sequencePattern.patternId +
      '-' +
      label
    );
  }

  getSequencePatterns(): SequencePattern[] {
    return this.sequence.patterns;
  }

  getPatternFor(sequencePattern: SequencePattern): Pattern {
    return this.sequencesManagerService.getPatternFor(sequencePattern);
  }
}
