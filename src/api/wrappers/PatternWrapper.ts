import { Pattern } from './../entities/Pattern';

export class PatternWrapper {
  // armedForRecording = false;
  armedForPlaying = false;
  private looping = false;

  constructor(public pattern: Pattern) {}

  // TODO: remove?
  // isArmedForRecording(): boolean {
  //   return this.armedForRecording;
  // }

  // setArmedForRecording(armed: boolean): void {
  //   this.armedForRecording = armed;
  // }

  isArmedForPlaying(): boolean {
    return this.armedForPlaying;
  }

  setArmedForPlaying(playing: boolean): void {
    this.armedForPlaying = playing;
  }

  isLooping(): boolean {
    return this.looping;
  }

  setLooping(looping: boolean): void {
    this.looping = looping;
  }
}
