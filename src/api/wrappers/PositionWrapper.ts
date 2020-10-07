import { Position } from './../utils/Position';
import { TimeSignature } from '../utils/TimeSignature';
import { config } from '../../config/config';

export class PositionWrapper {
  constructor(
    private position: Position,
    private timeSignature?: TimeSignature
  ) {}

  initPosition(): void {
    this.position.tick = 0;
    this.position.beat = 0;
    this.position.mesure = 0;
    this.position.turn = 0;
  }

  onTick(): boolean {
    return true;
  }

  onBeat(): boolean {
    return this.position.tick === 0 && this.onTick();
  }

  onMesure(): boolean {
    return this.position.beat === 0 && this.onBeat();
  }

  onTurn(): boolean {
    return this.position.mesure === 0 && this.onMesure();
  }

  onEnd(): boolean {
    return (
      this.position.tick >= config.sequencer.ticksByBeat - 1 &&
      this.position.beat >= this.timeSignature.beat - 1 &&
      this.position.mesure >= this.timeSignature.mesure - 1
    );
  }

  move(progression: Position): void {
    // TODO: restore complex behaviour

    if (progression.tick !== undefined) {
      this.position.tick += progression.tick;
    }

    if (progression.beat !== undefined) {
      this.position.beat += progression.beat;
    }

    if (progression.mesure !== undefined) {
      this.position.mesure += progression.mesure;
    }

    if (this.position.tick < 0) {
      this.position.tick = config.sequencer.ticksByBeat - 1;
      this.position.beat--;
    } else if (this.position.tick === config.sequencer.ticksByBeat) {
      this.position.tick = 0;
      this.position.beat++;
    }

    if (this.position.beat < 0) {
      this.position.beat = this.timeSignature.beat - 1;
      this.position.mesure--;
    } else if (this.position.beat === this.timeSignature.beat) {
      this.position.beat = 0;
      this.position.mesure++;
    }

    if (this.position.mesure < 0) {
      this.position.mesure = this.timeSignature.mesure - 1;
      this.position.turn--;
    } else if (this.position.mesure === this.timeSignature.mesure) {
      this.position.mesure = 0;
      this.position.turn++;
    }
  }

  getPosition(): Position {
    return this.position;
  }

  setPosition(position: Position): void {
    this.position = position;
  }

  isSameAs(position: Position): boolean {
    return (
      this.position.tick === position.tick &&
      this.position.beat === position.beat &&
      this.position.mesure === position.mesure
    );
  }
}