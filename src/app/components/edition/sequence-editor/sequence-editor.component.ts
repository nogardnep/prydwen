import { ParametersModel } from './../../../../api/parameters/Parameter';
import { SelectionService } from './../../../services/control/selection.service';
import { Subscription } from 'rxjs';
import { Sequence, sequenceParametersModel } from './../../../../api/entities/Sequence';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-sequence-editor',
  templateUrl: './sequence-editor.component.html',
  styleUrls: ['./sequence-editor.component.scss'],
})
export class SequenceEditorComponent implements OnInit, OnDestroy {
  sequence: Sequence = null;

  private selectedSequenceSubscription: Subscription;

  constructor(private selectionService: SelectionService) {}

  ngOnInit(): void {
    this.selectedSequenceSubscription = this.selectionService.selectedSequenceSubject.subscribe(
      (sequence: Sequence) => {
        this.sequence = sequence;
      }
    );
    this.selectionService.emitSelectedSequence();
  }

  ngOnDestroy(): void {
    this.selectedSequenceSubscription.unsubscribe();
  }

  getParametersModel(): ParametersModel {
    return sequenceParametersModel;
  }

  makeIdFor(label: string): string {
    return 'sequence-' + this.sequence.id + '-' + label;
  }
}
