import { Position } from './../../../../api/utils/Position';
import { Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Sequence } from './../../../../api/entities/Sequence';
import { SelectionService } from './../../../services/control/selection.service';
import { SequencerOutputService } from './../../../services/mecanism/sequencer-output.service';
import { SequencerService } from './../../../services/mecanism/sequencer.service';

@Component({
  selector: 'app-sequencer-player',
  templateUrl: './sequencer-player.component.html',
  styleUrls: ['./sequencer-player.component.scss'],
})
export class SequencerPlayerComponent implements OnInit, OnDestroy {
  selectedSequence: Sequence = null;
  sequencerPosition: Position = null;

  sequencerPositionSubscription: Subscription;
  selectedSequenceSubscription: Subscription;

  constructor(
    private sequencerService: SequencerService,
    private sequencerOutputService: SequencerOutputService,
    private selectionService: SelectionService
  ) {}

  ngOnInit(): void {
    this.sequencerPositionSubscription = this.sequencerOutputService.positionSubject.subscribe(
      (position: Position) => {
        console.log(position)
        this.sequencerPosition = position;
      }
    );

    this.sequencerOutputService.emitPosition();

    this.selectedSequenceSubscription = this.selectionService.selectedSequenceSubject.subscribe(
      (sequence: Sequence) => {
        this.selectedSequence = sequence;
      }
    );

    this.selectionService.emitSelectedSequence();
  }

  ngOnDestroy(): void {
    this.sequencerPositionSubscription.unsubscribe();
    this.selectedSequenceSubscription.unsubscribe();
  }

  onClickPlay(): void {
    this.sequencerService.play();
  }

  onClickPause(): void {
    this.sequencerService.pause();
  }

  onClickStop(): void {
    this.sequencerService.stop();
  }
}
