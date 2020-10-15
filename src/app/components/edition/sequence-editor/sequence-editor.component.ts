import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import {
  Sequence,
  sequenceParametersModel,
} from './../../../../models/entities/Sequence';
import { ParametersModel } from './../../../../models/parameters/Parameter';
import { SequencesManagerService } from './../../../services/managers/sequences-manager.service';

@Component({
  selector: 'app-sequence-editor',
  templateUrl: './sequence-editor.component.html',
  styleUrls: ['./sequence-editor.component.scss'],
})
export class SequenceEditorComponent implements OnInit, OnDestroy {
  @Input() sequence: Sequence = null;

  constructor(private sequencesManagerService: SequencesManagerService) {}

  ngOnInit(): void {}

  ngOnDestroy(): void {}

  getParametersModel(): ParametersModel {
    return sequenceParametersModel;
  }

  makeIdFor(label: string): string {
    return 'sequence-' + this.sequence.id + '-' + label;
  }

  onChangeParameter(): void {
    this.sequencesManagerService.update(this.sequence);
  }

  onChangeTimeSignature(): void {
    this.sequencesManagerService.update(this.sequence);
  }
}
