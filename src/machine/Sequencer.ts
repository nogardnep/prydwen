import { PositionWrapper } from '../api/wrappers/PositionWrapper';
import { Metronome } from './../api/machine/Metronome';
import { AudioPlayer } from './../api/machine/AudioPlayer';
import { Sequencer as ISequencer } from '../api/machine/Sequencer';
import { Position } from '../api/utils/Position';
import { SequencerOutputs } from './../api/machine/SequencerOutputs';
import { TimeSignature } from './../api/utils/TimeSignature';
import { Clock } from './Clock';

export class Sequencer implements ISequencer {
  private clock: Clock;
  private positionWrapper: PositionWrapper;
  private metronome: Metronome;
  private playing = false;

  constructor(
    private audioPlayer: AudioPlayer,
    private outputs: SequencerOutputs
  ) {
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

    this.metronome = {
      volume: 1,
      muted: false,
    };

    this.clock = new Clock(500, () => {
      this.move();
    });

    this.sendPosition();
  }

  move(): void {
    this.sendPosition();

    if (!this.metronome.muted) {
      if (this.positionWrapper.onMesure()) {
        this.audioPlayer.play('assets/metronome/metronome-mesure.wav');
      } else if (this.positionWrapper.onBeat()) {
        this.audioPlayer.play('assets/metronome/metronome-beat.wav');
      }
    }

    this.positionWrapper.move({
      tick: 12,
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

  switchMetronome(muted: boolean): void {
    this.metronome.muted = muted;
  }

  setMetronomeVolume(volume: number): void {
    this.metronome.volume = volume;
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
