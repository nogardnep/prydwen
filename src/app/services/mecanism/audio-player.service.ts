import { Metronome } from './../../../models/entities/Metronome';
import { Injectable } from '@angular/core';
import { AudioPlayer } from './../../../machine/AudioPlayer';
import { AudioTrack } from './../../../models/entities/AudioTrack';
import { AudioPlayer as IAudioPlayer } from './../../../models/mecanisms/AudioPlayer';
import { ResourcesDataService } from './../data/resources-data.service';

@Injectable({
  providedIn: 'root',
})
export class AudioPlayerService {
  private audioPlayer: IAudioPlayer;

  constructor(
    private resourcesDataService: ResourcesDataService // private projectManagerService: ProjectManagerService
  ) {
    this.audioPlayer = new AudioPlayer();
  }

  updateMetronome(metronome: Metronome): void {
    this.audioPlayer.updateMetronome(metronome);
  }

  updateTrack(track: AudioTrack): void {
    let src: string;

    if (track.resource !== null) {
      src = this.resourcesDataService.makeSrc(track.resource);
    } else {
      src = null;
    }

    this.audioPlayer.updateTrack(track, src);
  }

  playTrack(track: AudioTrack): void {
    this.audioPlayer.playTrack(track);
  }

  pauseTrack(track: AudioTrack): void {
    this.audioPlayer.pauseTrack(track);
  }

  stopTrack(track: AudioTrack): void {
    this.audioPlayer.stopTrack(track);
  }

  playSimpleAudio(src: string): void {
    this.audioPlayer.playSimpleAudio(src);
  }

  getAudioPlayer(): IAudioPlayer {
    return this.audioPlayer;
  }
}
