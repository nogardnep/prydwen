import { Subject } from 'rxjs';
import {
  Sequence,
  sequenceParametersModel,
} from './../../../api/entities/Sequence';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SelectionService {
  private selectedSequence: Sequence = null;

  selectedSequenceSubject = new Subject<Sequence>();

  constructor() {}

  setSelectedSequence(sequence: Sequence): void {
    this.selectedSequence = sequence;
    this.emitSelectedSequence();
  }

  getSelectedSequence(): Sequence {
    return this.selectedSequence;
  }

  emitSelectedSequence(): void {
    this.selectedSequenceSubject.next(this.selectedSequence);
  }
}
