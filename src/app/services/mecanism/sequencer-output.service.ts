import { SequencesManagerService } from './../managers/sequences-manager.service';
import { config } from 'src/config/config';
import { Pattern } from './../../../models/entities/Pattern';
import { PatternsManagerService } from './../managers/patterns-manager.service';
import { AudioPlayerService } from './audio-player.service';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { SequencerOutputs } from './../../../models/mecanisms/SequencerOutputs';
import { Position } from './../../../models/utils/Position';
import { PositionWrapper } from './../../../models/wrappers/PositionWrapper';
import { RecorderService } from './recorder.service';

@Injectable({
  providedIn: 'root',
})
export class SequencerOutputService implements SequencerOutputs {
  private playing = false;
  private position: Position = null;
  private newPositionWrapper = new PositionWrapper(null, null);
  private lastPositionWrapper = new PositionWrapper(null, null);
  private lastPosition: Position = null;

  playingSubject = new Subject<boolean>();
  positionSubject = new Subject<Position>();

  constructor(
    private recorderService: RecorderService,
    private patternsManagerService: PatternsManagerService
  ) {}

  setPosition(newPosition: Position): void {
    this.position = newPosition;

    this.newPositionWrapper.setPosition(newPosition);

    if (this.lastPosition !== null) {
      if (newPosition.turn > this.lastPosition.turn) {
        this.recorderService.decreaseCountdown();
      }

      if (
        newPosition.tick !== this.lastPosition.tick ||
        newPosition.beat !== this.lastPosition.beat ||
        newPosition.measure !== this.lastPosition.measure ||
        newPosition.turn !== this.lastPosition.turn
      ) {
        this.patternsManagerService.moveAll({
          tick: 1,
        } as Position);
      }
    }


    this.recorderService.check();

    this.emitPosition();
    this.lastPosition = newPosition;
    this.lastPositionWrapper.setPosition(this.lastPosition);
  }

  setPlaying(playing: boolean): void {
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
