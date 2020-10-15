import { RecorderService } from './../mecanism/recorder.service';
import { PatternsManagerService } from './patterns-manager.service';
import { AudioPlayerService } from './../mecanism/audio-player.service';
import { AudioTrack } from './../../../models/entities/AudioTrack';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TracksManagerService {
  constructor(private audioPlayerService: AudioPlayerService) {}

  update(track: AudioTrack): void {
    this.audioPlayerService.updateTrack(track);
  }

  play(track: AudioTrack, recording?: boolean): void {
    console.log(recording);
    if (recording === undefined || !recording || !track.armedForRecording) {
      console.log('playTrack', track.id);
      this.audioPlayerService.playTrack(track);
    }
  }

  pause(track: AudioTrack): void {
    this.audioPlayerService.pauseTrack(track);
  }

  stop(track: AudioTrack): void {
    this.audioPlayerService.stopTrack(track);
  }
}
