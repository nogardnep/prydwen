import { configuration } from 'src/app/config/config';
import { Subject } from 'rxjs';
import { Pattern } from 'src/app/models/entity/Pattern.model';
import {
  PatternEvent,
  PatternEventActions,
} from 'src/app/models/entity/PatternEvent.model';
import { Position } from 'src/app/models/entity/Position.model';
import { Track } from 'src/app/models/entity/Track.model';
import { PositionWrapper } from './PositionWrapper.model';

export class PatternWrapper {
  private playing: boolean;
  private looping: boolean;
  private armedForPlaying: boolean;
  private armedForStopping: boolean;
  private positionWrapper: PositionWrapper;
  id: number; // TODO: temp

  positionWrapperSubject = new Subject<PositionWrapper>();

  constructor(private pattern: Pattern) {
    this.id = Math.ceil(Math.random() * 10000);
    this.playing = false;
    this.armedForPlaying = false;
    this.armedForStopping = false;
    this.looping = false;
    this.positionWrapper = new PositionWrapper(
      {
        tick: 0,
        beat: 0,
        mesure: 0,
        turn: 0,
      } as Position,
      pattern.timeSignature
    );
  }

  emitPositionWrapper(): void {
    this.positionWrapperSubject.next(this.positionWrapper);
  }

  move(progression: Position): void {
    this.getPositionWrapper().move(progression);
    this.emitPositionWrapper();

    if (!this.looping && this.positionWrapper.onEnd()) {
      console.log('stop');
      this.stop();
    }
  }

  launch(): void {
    this.initPosition();
    this.setArmedForPlaying(false);
    this.setArmedForStopping(false);
    this.setPlaying(true);
  }

  stop(): void {
    this.setPlaying(false);
    this.setArmedForPlaying(false);
    this.setArmedForStopping(false);
    this.setLooping(false);
  }

  initPosition(): void {
    this.positionWrapper.initPosition();
  }

  isSameAs(pattern: Pattern): boolean {
    return (
      this.pattern.bank === pattern.bank && this.pattern.num === pattern.num
    );
  }

  setPlaying(playing: boolean): void {
    this.playing = playing;
  }

  isPlaying(): boolean {
    return this.playing;
  }

  setLooping(looping: boolean): void {
    this.looping = looping;
  }

  isLooping(): boolean {
    return this.looping;
  }

  setArmedForPlaying(armed: boolean): void {
    this.armedForPlaying = armed;
  }

  isArmedForPlaying(): boolean {
    return this.armedForPlaying;
  }

  setArmedForStopping(armed: boolean): void {
    this.armedForStopping = armed;
  }

  isArmedForStopping(): boolean {
    return this.armedForStopping;
  }

  getPositionWrapper(): PositionWrapper {
    return this.positionWrapper;
  }

  getPattern(): Pattern {
    return this.pattern;
  }

  getEvent(position: Position, track: Track): PatternEvent {
    let found: PatternEvent = null;

    if (track !== null) {
      const searchedPosition = new PositionWrapper(position, null);

      this.pattern.events.forEach((event: PatternEvent) => {
        if (
          track.num === event.trackNum &&
          track.bank === event.bankNum &&
          searchedPosition.isSameAs(event.position)
        ) {
          found = event;
        }
      });
    }

    return found;
  }

  createPatternEvent(
    position: Position,
    pattern: Pattern,
    trackNum: number,
    bankNum: number
  ): PatternEvent {
    const newEvent = {
      action: 0,
      position,
      trackNum,
      bankNum,
      parameters: {
        velocity: 1,
      },
    } as PatternEvent;

    pattern.events.push(newEvent);

    return newEvent;
  }
}
