import { Sequence } from './../../../../models/entities/Sequence';
import { Pattern } from './../../../../models/entities/Pattern';
import { SelectionService } from './../../../services/control/selection.service';
import { Subscription } from 'rxjs';
import { Track } from './../../../../models/entities/Track';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-selection-section',
  templateUrl: './selection-section.component.html',
  styleUrls: ['./selection-section.component.scss'],
})
export class SelectionSectionComponent implements OnInit, OnDestroy {
  selectedTrack: Track = null;
  selectedPattern: Pattern = null;
  selectedSequence: Sequence = null;

  private selectedTrackSubscription: Subscription;
  private selectedPatternSubscription: Subscription;
  private selectedSequenceSubscription: Subscription;

  constructor(private selectionService: SelectionService) {}

  ngOnInit(): void {
    this.selectedSequenceSubscription = this.selectionService.selectedSequenceSubject.subscribe(
      (sequence: Sequence) => {
        console.log(sequence);
        this.selectedSequence = sequence;
      }
    );
    this.selectionService.emitSelectedSequence();

    this.selectedTrackSubscription = this.selectionService.selectedTrackSubject.subscribe(
      (track: Track) => {
        this.selectedTrack = track;
      }
    );
    this.selectionService.emitSelectedTrack();

    this.selectedPatternSubscription = this.selectionService.selectedPatternSubject.subscribe(
      (pattern: Pattern) => {
        this.selectedPattern = pattern;
      }
    );
    this.selectionService.emitSelectedPattern();
  }

  ngOnDestroy(): void {
    this.selectedTrackSubscription.unsubscribe();
    this.selectedPatternSubscription.unsubscribe();
    this.selectedSequenceSubscription.unsubscribe();
  }
}
