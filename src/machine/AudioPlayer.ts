import { PositionWrapper } from './../models/wrappers/PositionWrapper';
import { Metronome } from './../models/entities/Metronome';
import * as Tone from 'tone';
import { AudioPlayer as IAudioPlayer } from '../models/mecanisms/AudioPlayer';
import { ParameterUtils } from './../app/utils/ParameterUtils';
import {
  AudioTrack,
  audioTrackParametersModel,
  Reverse,
} from './../models/entities/AudioTrack';

type PlayerTracks = {
  [id: number]: PlayerTrack;
};

type PlayerTrack = {
  entity: AudioTrack;
  player: Tone.Player;
};

type MetronomePlayer = {
  beat: Tone.Player;
  measure: Tone.Player;
};

export class AudioPlayer implements IAudioPlayer {
  private audioContext: AudioContext;
  private tracks: PlayerTracks = {};
  private metronomePlayer: MetronomePlayer;
  private metronome: Metronome;

  constructor() {
    this.initMetronomePlayer();
    this.audioContext = new AudioContext();
    window.addEventListener('click', this.init);
  }

  private init = (): void => {
    Tone.start().then(() => {
      console.log('audio is ready');

    });

    window.removeEventListener('click', this.init);
  };

  playMetronome(positionWrapper: PositionWrapper): void {
    if (!this.metronome.muted) {
      if (positionWrapper.onMeasure()) {
        this.metronomePlayer.measure.start();
      } else if (positionWrapper.onBeat()) {
        this.metronomePlayer.beat.start();
      }
    }
  }

  updateMetronome(metronome: Metronome): void {
    this.metronome = metronome;
  }

  updateTrack(track: AudioTrack, src: string): void {
    console.log('updateTrack');
    if (src !== null) {
      const player = new Tone.Player();

      this.tracks[track.id] = {
        entity: track,
        player,
      };

      player.toDestination();
      player.load(src);
      this.applyParameters(this.tracks[track.id]);
    } else {
      this.tracks[track.id] = null;
    }
  }

  private applyParameters(playerTrack: PlayerTrack): void {
    playerTrack.player.fadeIn = ParameterUtils.getParameter(
      playerTrack.entity,
      audioTrackParametersModel,
      'fadein'
    );

    playerTrack.player.fadeOut = ParameterUtils.getParameter(
      playerTrack.entity,
      audioTrackParametersModel,
      'fadeout'
    );

    playerTrack.player.loopStart = ParameterUtils.getParameter(
      playerTrack.entity,
      audioTrackParametersModel,
      'loopStart'
    );

    playerTrack.player.loopEnd = ParameterUtils.getParameter(
      playerTrack.entity,
      audioTrackParametersModel,
      'loopEnd'
    );

    playerTrack.player.reverse =
      ParameterUtils.getParameter(
        playerTrack.entity,
        audioTrackParametersModel,
        'reverse'
      ) === Reverse.Reverse
        ? true
        : false;
  }

  playTrack(track: AudioTrack): void {
    if (this.tracks[track.id] !== null) {
      this.tracks[track.id].player.start(0);
    }
  }

  pauseTrack(track: AudioTrack): void {
    if (this.tracks[track.id] !== null) {
      this.tracks[track.id].player.stop();
    }
  }

  stopTrack(track: AudioTrack): void {
    if (this.tracks[track.id] !== null) {
      this.tracks[track.id].player.stop();
      this.tracks[track.id].player.restart();
    }
  }

  playSimpleAudio(src: string): void {
    this.load(src, (buffer: AudioBuffer) => {
      const source = this.makeSourceFor(buffer);
      source.start();
    });
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

  private initMetronomePlayer(): void {
    this.metronomePlayer = {
      beat: new Tone.Player(
        'assets/metronome/metronome-beat.wav'
      ).toDestination(),
      measure: new Tone.Player(
        'assets/metronome/metronome-measure.wav'
      ).toDestination(),
    };
  }
}
