import { SelectionService } from './../../../services/control/selection.service';
import { ParametersModel } from './../../../../api/parameters/Parameter';
import {
  Sequence,
  sequenceParametersModel,
} from './../../../../api/entities/Sequence';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-sequence',
  templateUrl: './sequence.component.html',
  styleUrls: ['./sequence.component.scss'],
})
export class SequenceComponent implements OnInit {
  @Input() sequence: Sequence;

  constructor(private selectionService: SelectionService) {}

  ngOnInit(): void {}

  getParametersModel(): ParametersModel {
    return sequenceParametersModel;
  }

  onClickSelect(): void {
    this.selectionService.setSelectedSequence(this.sequence);
  }
}
