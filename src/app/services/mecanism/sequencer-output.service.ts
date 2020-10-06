import { Position } from './../../../api/utils/Position';
import { Subject } from 'rxjs';
import { SequencerOutputs } from './../../../api/machine/SequencerOutputs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SequencerOutputService implements SequencerOutputs {
  private position: Position = null;

  positionSubject = new Subject<Position>();

  constructor() {}

  setPosition(position: Position): void {
    this.position = position;
    this.emitPosition();
  }

  emitPosition(): void {
    this.positionSubject.next(this.position);
  }
}
