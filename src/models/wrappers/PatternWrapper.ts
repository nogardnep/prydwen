import { PositionWrapper } from './PositionWrapper';
import { Pattern } from './../entities/Pattern';
import { Position } from './../utils/Position';

export class PatternWrapper {
  positionWrapper: PositionWrapper;

  constructor(public pattern: Pattern, public looping: boolean) {
    this.initPosition();
  }

  initPosition(): void {
    const position = {
      timeSignature: this.pattern.timeSignature,
      tick: 0,
      beat: 0,
      measure: 0,
      turn: 0,
      maxTurn: 100,
    };

    console.log(this.pattern.timeSignature);

    this.positionWrapper = new PositionWrapper(
      position,
      this.pattern.timeSignature
    );
  }

  move(progression: Position): void {
    this.positionWrapper.move(progression);
  }

  reachedEnd(): boolean {
    return this.positionWrapper.getPosition().turn > 0;
  }
}
