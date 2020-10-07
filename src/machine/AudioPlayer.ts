import { AudioPlayer as IAudioPlayer } from '../api/machine/AudioPlayer';

export type Channels = {
  [key: string]: GainNode;
};


export class AudioPlayer implements IAudioPlayer {
  private audioContext: AudioContext;

  channels: Channels = {
    master: null,
    metronome: null,
    patterns: null,
  };

  constructor() {
    this.audioContext = new AudioContext();

    // this.channels.master = this.audioContext.createGain();
    // this.channels.master.connect(this.audioContext.destination);
    // this.channels.metronome = this.audioContext.createGain();
    // this.channels.metronome.connect(this.channels.master);
    // this.channels.patterns = this.audioContext.createGain();
    // this.channels.patterns.connect(this.channels.master);
    // this.channels.metronome.connect(this.audioContext.destination);
  }

  play(src: string): void {
    this.load(src, (buffer: AudioBuffer) => {
      const source = this.makeSourceFor(buffer);
      source.start();
    });
  }

  // play(buffer: AudioBuffer, destination: GainNode): void {
  //   const source = this.audioContext.createBufferSource();
  //   source.buffer = buffer;
  //   source.connect(destination);
  //   source.start();
  // }

  // stopAll(): void {
  //   if (this.source !== null) {
  //     this.source.stop();
  //   }
  // }

  load(url: string, callback: (buffer: AudioBuffer) => void): void {
    const request = new XMLHttpRequest();
    request.open('GET', url);
    request.responseType = 'arraybuffer';
    request.onload = () => {
      const undecodedAudio = request.response;
      this.audioContext.decodeAudioData(undecodedAudio, (buffer) => {
        callback(buffer);
      });
    };
    request.send();
  }

  makeSourceFor(buffer: AudioBuffer): AudioBufferSourceNode {
    const source = this.audioContext.createBufferSource();
    source.buffer = buffer;
    source.connect(this.audioContext.destination);
    return source;
  }

  getAudioContext(): AudioContext {
    return this.audioContext;
  }
}
