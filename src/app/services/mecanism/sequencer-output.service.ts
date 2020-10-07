import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { SequencerOutputs } from './../../../api/machine/SequencerOutputs';
import { Position } from './../../../api/utils/Position';
import { PositionWrapper } from './../../../api/wrappers/PositionWrapper';
import { RecorderService } from './recorder.service';

@Injectable({
  providedIn: 'root',
})
export class SequencerOutputService implements SequencerOutputs {
  private playing = false;
  private position: Position = null;
  private positionWrapper = new PositionWrapper(null, null);

  playingSubject = new Subject<boolean>();
  positionSubject = new Subject<Position>();

  constructor(private recorderService: RecorderService) {}

  setPosition(position: Position): void {
    this.position = position;

    this.positionWrapper.setPosition(position);

    if (this.positionWrapper.onMesure()) {
      this.recorderService.check();
    }

    this.emitPosition();
  }

  setPlaying(playing): void {
    this.playing = playing;
    this.emitPlaying();
  }

  emitPosition(): void {
    this.positionSubject.next(this.position);
  }

  emitPlaying(): void {
    this.playingSubject.next(this.playing);
  }
}
