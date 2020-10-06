import { Sequencer as ISequencer } from '../api/machine/Sequencer';
import { Position } from '../api/utils/Position';
import { SequencerOutputs } from './../api/machine/SequencerOutputs';
import { TimeSignature } from './../api/utils/TimeSignature';
import { PositionWrapper } from './../api/wrappers/PositionWrapper.model';
import { Clock } from './Clock';

export class Sequencer implements ISequencer {
  private clock: Clock;
  private positionWrapper: PositionWrapper;

  constructor(private outputs: SequencerOutputs) {
    this.positionWrapper = new PositionWrapper(
      {
        tick: 0,
        beat: 0,
        mesure: 0,
        turn: 0,
      } as Position,
      {
        step: 4,
        beat: 4,
        mesure: 1,
      } as TimeSignature
    );

    this.clock = new Clock(500, () => {
      console.log('tick');
      this.move();
    });
  }

  move(): void {
    this.positionWrapper.move({
      tick: 12,
    } as Position);

    this.sendPosition();
  }

  play(): void {
    this.clock.start();
  }

  stop(): void {
    this.clock.stop();
    this.positionWrapper.initPosition();
    this.sendPosition();
  }

  pause(): void {
    this.clock.stop();
  }

  switchMetronome(muted: boolean): void {
    // TODO
  }

  private sendPosition(): void {
    this.outputs.setPosition({ ...this.positionWrapper.getPosition() });
  }
}
