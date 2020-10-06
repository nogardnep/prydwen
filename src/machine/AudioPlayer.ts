import { AudioPlayer as IAudioPlayer } from '../api/machine/AudioPlayer';

export class AudioPlayer implements IAudioPlayer {
  private audioContext: AudioContext;
  private source: AudioBufferSourceNode = null;
  private channels: {
    metronome: AudioContext;
    patterns: AudioContext;
  };

  constructor() {
    this.audioContext = new AudioContext();
  }

  play(src: string): void {
    console.log('play ' + src);

    this.load(src, (buffer: AudioBuffer) => {
      this.stopAll();
      this.source = this.makeSourceFor(buffer);
      this.source.start();
    });
  }

  stopAll(): void {
    if (this.source !== null) {
      this.source.stop();
    }
  }

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
