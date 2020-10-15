import { ParameterUtils } from './../app/utils/ParameterUtils';
import {
  Sequence,
  sequenceParametersModel,
} from './../models/entities/Sequence';
import { Sequencer as ISequencer } from '../models/mecanisms/Sequencer';
import { Position } from '../models/utils/Position';
import { PositionWrapper } from '../models/wrappers/PositionWrapper';
import { config } from './../config/config';
import { AudioPlayer as IAudioPlayer } from './../models/mecanisms/AudioPlayer';
import { SequencerOutputs } from './../models/mecanisms/SequencerOutputs';
import { TimeSignature } from './../models/utils/TimeSignature';
import { Clock } from './Clock';
import { connectSignal } from 'tone';

export class Sequencer implements ISequencer {
  private clock: Clock; // TODO
  private positionWrapper: PositionWrapper;
  private playing = false;

  constructor(
    private audioPlayer: IAudioPlayer,
    private outputs: SequencerOutputs
  ) {
    this.positionWrapper = new PositionWrapper(
      {
        tick: 0,
        beat: 0,
        measure: 0,
        turn: 0,
      } as Position,
      {
        step: 4,
        beat: 4,
        measure: 1,
      } as TimeSignature
    );

    this.clock = new Clock(() => {
      this.move();
    });
    this.setBpm(100);

    this.sendPosition();
  }

  move(): void {
    this.sendPosition();

    this.audioPlayer.playMetronome(this.positionWrapper);

    this.positionWrapper.move({
      tick: 1,
    } as Position);
  }

  play(): void {
    this.stop();
    this.setPlaying(true);
    this.clock.start();
  }

  stop(): void {
    this.setPlaying(false);
    this.clock.stop();
    this.positionWrapper.initPosition();
    this.sendPosition();
  }

  pause(): void {
    this.setPlaying(false);
    this.clock.stop();
  }

  updateSequence(sequence: Sequence): void {
    this.setBpm(
      ParameterUtils.getParameter(sequence, sequenceParametersModel, 'bpm')
    );

    this.positionWrapper.setTimeSignature(sequence.timeSignature);
  }

  private setBpm(bpm: number): void {
    const interval = ((60 / bpm) * 1000) / config.sequencer.ticksByBeat;
    this.clock.setInterval(interval);
  }

  private setPlaying(playing: boolean): void {
    this.playing = playing;
    this.sendPlaying();
  }

  private sendPosition(): void {
    this.outputs.setPosition({ ...this.positionWrapper.getPosition() });
  }

  private sendPlaying(): void {
    this.outputs.setPlaying(this.playing);
  }
}
